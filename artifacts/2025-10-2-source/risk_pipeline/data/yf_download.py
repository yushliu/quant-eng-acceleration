from __future__ import annotations

import logging
import time
from pathlib import Path
from typing import Any

import pandas as pd
import yfinance as yf

from risk_pipeline.io_utils import ensure_dir, make_cache_key, read_json, utc_now_iso, write_json

logger = logging.getLogger(__name__)


def _extract_adjusted_close(raw: pd.DataFrame, tickers: list[str], auto_adjust: bool) -> pd.DataFrame:
    if raw.empty:
        raise RuntimeError("empty_download")

    if isinstance(raw.columns, pd.MultiIndex):
        level0 = set(raw.columns.get_level_values(0))
        price_key = "Close" if auto_adjust else ("Adj Close" if "Adj Close" in level0 else "Close")
        if price_key not in level0:
            raise ValueError(f"Unable to find {price_key} in downloaded columns")
        close = raw[price_key].copy()
    else:
        if "Adj Close" in raw.columns:
            close = raw[["Adj Close"]].copy()
            close.columns = [tickers[0]]
        elif "Close" in raw.columns:
            close = raw[["Close"]].copy()
            close.columns = [tickers[0]]
        else:
            raise ValueError("Unable to find Close/Adj Close in downloaded columns")

    close = close.sort_index()
    close.index = pd.to_datetime(close.index)
    close.index.name = "date"
    close = close[[t for t in tickers if t in close.columns]]
    if close.shape[1] != len(tickers):
        missing = sorted(set(tickers) - set(close.columns))
        raise ValueError(f"Missing ticker columns from download: {missing}")
    return close


def _cache_payload(tickers: list[str], start: str, end: str, interval: str, auto_adjust: bool) -> dict[str, Any]:
    return {
        "tickers": tickers,
        "start": start,
        "end": end,
        "interval": interval,
        "auto_adjust": auto_adjust,
    }


def _load_cached_prices(cache_dir: Path) -> tuple[pd.DataFrame, dict[str, Any]] | None:
    price_path = cache_dir / "prices.csv"
    metadata_path = cache_dir / "metadata.json"
    if not price_path.exists():
        return None
    prices = pd.read_csv(price_path, index_col="date", parse_dates=["date"])
    metadata = read_json(metadata_path) if metadata_path.exists() else {}
    metadata["cache_hit"] = True
    return prices, metadata


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


def load_or_download_prices(
    cache_root: Path,
    tickers: list[str],
    start: str,
    end: str,
    interval: str = "1d",
    auto_adjust: bool = True,
    use_cache: bool = True,
    offline: bool = False,
    retries: int = 3,
    base_sleep: float = 2.0,
) -> tuple[pd.DataFrame, dict[str, Any], Path]:
    payload = _cache_payload(tickers, start, end, interval, auto_adjust)
    cache_key = make_cache_key(payload)
    cache_dir = ensure_dir(cache_root / cache_key)
    price_path = cache_dir / "prices.csv"
    metadata_path = cache_dir / "metadata.json"

    cached = _load_cached_prices(cache_dir)
    if offline:
        if cached is not None:
            return cached[0], cached[1], cache_dir
        tickers_str = ",".join(tickers)
        raise RuntimeError(
            f"Offline mode: no cache available for tickers={tickers_str} . "
            "Run once without --offline to populate cache."
        )
    if use_cache and cached is not None:
        return cached[0], cached[1], cache_dir

    prices: pd.DataFrame | None = None
    last_error: Exception | None = None
    for attempt in range(retries):
        try:
            raw = yf.download(
                tickers=tickers,
                start=start,
                end=end,
                interval=interval,
                auto_adjust=auto_adjust,
                progress=False,
                threads=False,
                group_by="column",
            )
            prices = _extract_adjusted_close(raw, tickers, auto_adjust=auto_adjust)
            break
        except Exception as exc:
            last_error = exc
            transient = _is_transient_download_error(exc)
            is_last = attempt == retries - 1
            if not transient:
                break
            if is_last:
                break
            sleep_s = base_sleep * (2**attempt) + 0.1 * (attempt + 1)
            logger.warning(
                "yfinance transient failure (attempt %s/%s): %s. Retrying in %.1fs",
                attempt + 1,
                retries,
                exc.__class__.__name__,
                sleep_s,
            )
            time.sleep(sleep_s)

    if prices is None:
        if cached is not None:
            logger.warning(
                "yfinance download failed; using cached prices from %s (%s)",
                cache_dir,
                last_error.__class__.__name__ if last_error else "unknown_error",
            )
            return cached[0], cached[1], cache_dir
        logger.error("yfinance download failed and cache is unavailable")
        raise RuntimeError(
            "yfinance download failed (rate limited). No cache available. "
            "Try again later or use cached data."
        ) from None

    prices.to_csv(price_path)

    metadata = {
        "cache_key": cache_key,
        "cache_hit": False,
        "download_timestamp_utc": utc_now_iso(),
        "yfinance_version": getattr(yf, "__version__", "unknown"),
        "columns": list(prices.columns),
        "index_name": prices.index.name,
        **payload,
    }
    write_json(metadata_path, metadata)
    return prices, metadata, cache_dir
