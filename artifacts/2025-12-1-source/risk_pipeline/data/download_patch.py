from __future__ import annotations

import logging
import random
import time
from pathlib import Path
from typing import Any

import pandas as pd
import yfinance as yf

from risk_pipeline.io_utils import ensure_dir, utc_now_iso

logger = logging.getLogger(__name__)


def generate_chunk_windows(start: str, end: str, chunk_months: int = 3) -> list[tuple[str, str]]:
    if chunk_months <= 0:
        raise ValueError("chunk_months must be > 0")

    start_ts = pd.Timestamp(start).normalize()
    end_ts = pd.Timestamp(end).normalize()
    if end_ts <= start_ts:
        raise ValueError(f"end must be after start: start={start} end={end}")

    windows: list[tuple[str, str]] = []
    cur = start_ts
    while cur < end_ts:
        nxt = min(cur + pd.DateOffset(months=chunk_months), end_ts)
        windows.append((cur.date().isoformat(), nxt.date().isoformat()))
        cur = nxt
    return windows


def _chunk_cache_path(cache_root: Path, ticker: str, chunk_start: str, chunk_end: str) -> Path:
    return cache_root / ticker / f"{chunk_start}_{chunk_end}.csv"


def _extract_single_ticker_close(raw: pd.DataFrame, ticker: str, auto_adjust: bool) -> pd.DataFrame:
    if raw.empty:
        raise RuntimeError("empty_download")

    if isinstance(raw.columns, pd.MultiIndex):
        level0 = set(raw.columns.get_level_values(0))
        price_key = "Close" if auto_adjust else ("Adj Close" if "Adj Close" in level0 else "Close")
        if price_key not in level0:
            raise ValueError(f"Unable to find {price_key} in downloaded columns")
        close = raw[price_key].copy()
        if ticker not in close.columns:
            raise ValueError(f"Missing ticker column from download: {ticker}")
        close = close[[ticker]]
    else:
        if "Adj Close" in raw.columns and not auto_adjust:
            close = raw[["Adj Close"]].copy()
        elif "Close" in raw.columns:
            close = raw[["Close"]].copy()
        elif "Adj Close" in raw.columns:
            close = raw[["Adj Close"]].copy()
        else:
            raise ValueError("Unable to find Close/Adj Close in downloaded columns")
        close.columns = [ticker]

    close = close.sort_index()
    close.index = pd.to_datetime(close.index)
    close.index.name = "date"
    return close


def stitch_ticker_chunks(ticker: str, chunk_frames: list[pd.DataFrame]) -> pd.DataFrame:
    if not chunk_frames:
        return pd.DataFrame(columns=[ticker], dtype=float)

    stitched = pd.concat(chunk_frames, axis=0)
    stitched = stitched[~stitched.index.duplicated(keep="last")]
    stitched = stitched.sort_index()
    stitched.index.name = "date"
    return stitched[[ticker]]


def merge_ticker_frames(ticker_frames: dict[str, pd.DataFrame], tickers: list[str]) -> pd.DataFrame:
    merged = pd.concat([ticker_frames[t] for t in tickers], axis=1, join="outer")
    merged = merged.sort_index()
    merged.index = pd.to_datetime(merged.index)
    merged.index.name = "date"
    return merged[tickers]


def _is_transient_download_error(exc: Exception) -> bool:
    name = exc.__class__.__name__.lower()
    msg = str(exc).lower()
    transient_tokens = [
        "ratelimit",
        "too many requests",
        "timeout",
        "temporarily unavailable",
        "connection",
        "network",
        "empty_download",
    ]
    return any(token in name or token in msg for token in transient_tokens)


def download_prices_chunked(
    tickers: list[str],
    start: str,
    end: str,
    cache_root: Path,
    chunk_months: int = 3,
    interval: str = "1d",
    auto_adjust: bool = True,
    use_cache: bool = True,
    offline: bool = False,
    retries: int = 3,
    base_sleep: float = 1.0,
    jitter: float = 0.3,
    rng_seed: int = 17,
) -> tuple[pd.DataFrame, dict[str, Any], Path, dict[str, Any]]:
    windows = generate_chunk_windows(start=start, end=end, chunk_months=chunk_months)
    cache_root = ensure_dir(cache_root)
    rng = random.Random(rng_seed)

    ticker_frames: dict[str, pd.DataFrame] = {}
    chunk_reports: list[dict[str, Any]] = []

    for ticker in tickers:
        parts: list[pd.DataFrame] = []
        for chunk_start, chunk_end in windows:
            cache_path = _chunk_cache_path(cache_root=cache_root, ticker=ticker, chunk_start=chunk_start, chunk_end=chunk_end)
            chunk_report: dict[str, Any] = {
                "ticker": ticker,
                "chunk_start": chunk_start,
                "chunk_end": chunk_end,
                "cache_hit": False,
                "retries": 0,
                "rows": 0,
                "error": None,
            }

            if use_cache and cache_path.exists():
                chunk_df = pd.read_csv(cache_path, index_col="date", parse_dates=["date"])
                chunk_df.index.name = "date"
                parts.append(chunk_df[[ticker]])
                chunk_report["cache_hit"] = True
                chunk_report["rows"] = int(chunk_df.shape[0])
                chunk_reports.append(chunk_report)
                continue

            if offline:
                chunk_report["error"] = "offline_cache_miss"
                chunk_reports.append(chunk_report)
                continue

            chunk_df: pd.DataFrame | None = None
            last_error: Exception | None = None

            for attempt in range(retries + 1):
                try:
                    raw = yf.download(
                        tickers=ticker,
                        start=chunk_start,
                        end=chunk_end,
                        interval=interval,
                        auto_adjust=auto_adjust,
                        progress=False,
                        threads=False,
                        group_by="column",
                    )
                    chunk_df = _extract_single_ticker_close(raw=raw, ticker=ticker, auto_adjust=auto_adjust)
                    break
                except Exception as exc:
                    last_error = exc
                    chunk_report["retries"] = attempt + 1
                    if attempt == retries or not _is_transient_download_error(exc):
                        break
                    sleep_s = base_sleep * (2**attempt) + rng.uniform(0.0, max(0.0, jitter))
                    logger.warning(
                        "chunk download transient failure ticker=%s [%s,%s) attempt=%s/%s err=%s retry_in=%.2fs",
                        ticker,
                        chunk_start,
                        chunk_end,
                        attempt + 1,
                        retries + 1,
                        exc.__class__.__name__,
                        sleep_s,
                    )
                    time.sleep(sleep_s)

            if chunk_df is None:
                chunk_report["error"] = last_error.__class__.__name__ if last_error else "download_failed"
                chunk_reports.append(chunk_report)
                continue

            ensure_dir(cache_path.parent)
            chunk_df.to_csv(cache_path)
            parts.append(chunk_df[[ticker]])
            chunk_report["rows"] = int(chunk_df.shape[0])
            chunk_reports.append(chunk_report)

        stitched = stitch_ticker_chunks(ticker=ticker, chunk_frames=parts)
        if stitched.empty:
            raise RuntimeError(f"All chunks failed for ticker={ticker}")
        ticker_frames[ticker] = stitched

    prices = merge_ticker_frames(ticker_frames=ticker_frames, tickers=tickers)

    total_chunks = len(chunk_reports)
    failed = sum(1 for row in chunk_reports if row["error"] is not None)
    cache_hits = sum(1 for row in chunk_reports if bool(row["cache_hit"]))
    total_retries = int(sum(int(row["retries"]) for row in chunk_reports))
    summary = {
        "total_chunks": int(total_chunks),
        "succeeded": int(total_chunks - failed),
        "failed": int(failed),
        "cache_hits": int(cache_hits),
        "total_retries": int(total_retries),
    }

    if failed > 0:
        failed_tags = [
            f"{row['ticker']}:{row['chunk_start']}..{row['chunk_end']}({row['error']})"
            for row in chunk_reports
            if row["error"] is not None
        ]
        raise RuntimeError("Chunked download had failures: " + ", ".join(failed_tags))

    metadata = {
        "download_timestamp_utc": utc_now_iso(),
        "yfinance_version": getattr(yf, "__version__", "unknown"),
        "tickers": tickers,
        "start": start,
        "end": end,
        "interval": interval,
        "auto_adjust": auto_adjust,
        "chunk_months": chunk_months,
        "cache_root": str(cache_root),
    }
    report = {
        "chunks": chunk_reports,
        "summary": summary,
    }
    return prices, metadata, cache_root, report
