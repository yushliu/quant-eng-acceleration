from __future__ import annotations

import logging
from pathlib import Path
from typing import Any

import pandas as pd

from risk_pipeline.io_utils import read_json

logger = logging.getLogger(__name__)


def _normalize_prices_frame(
    prices: pd.DataFrame,
    tickers: list[str],
    date_col: str = "date",
) -> pd.DataFrame:
    frame = prices.copy()
    if date_col in frame.columns:
        idx = pd.to_datetime(frame[date_col], errors="coerce")
        if idx.isna().any():
            raise ValueError(f"Date column '{date_col}' contains invalid values")
        frame = frame.drop(columns=[date_col])
        frame.index = idx
    else:
        idx = pd.to_datetime(frame.index, errors="coerce")
        if idx.isna().any():
            raise ValueError(
                f"Input data has no '{date_col}' column and index is not fully datetime-convertible"
            )
        frame.index = idx

    frame.index.name = "date"
    frame = frame.sort_index()
    available_cols = [str(c) for c in frame.columns]
    missing = [t for t in tickers if t not in frame.columns]
    if missing:
        raise ValueError(
            f"Missing ticker columns in local data: {missing}. Available columns: {available_cols}"
        )
    return frame[tickers].copy()


def load_prices_local_csv(path: str, tickers: list[str], date_col: str = "date") -> pd.DataFrame:
    """Load local prices from CSV/parquet in wide format date,<TICKER...>."""
    src = Path(path)
    if not src.exists():
        raise FileNotFoundError(f"Local data file not found: {src}")
    if src.suffix.lower() in {".parquet", ".pq"}:
        prices = pd.read_parquet(src)
    else:
        prices = pd.read_csv(src)
    return _normalize_prices_frame(prices=prices, tickers=tickers, date_col=date_col)


def load_prices_from_cache_dir(cache_dir: str, tickers: list[str]) -> pd.DataFrame:
    """Load cached prices.csv from a cache folder and validate with metadata when available."""
    root = Path(cache_dir)
    price_path = root / "prices.csv"
    metadata_path = root / "metadata.json"
    if not price_path.exists():
        raise FileNotFoundError(f"Cache prices file not found: {price_path}")

    metadata: dict[str, Any] = {}
    if metadata_path.exists():
        metadata = read_json(metadata_path)
    else:
        logger.warning("Cache metadata missing at %s; proceeding with prices.csv only", metadata_path)

    meta_tickers = metadata.get("tickers")
    if isinstance(meta_tickers, list) and meta_tickers:
        missing_meta = sorted(set(tickers) - set(meta_tickers))
        if missing_meta:
            raise ValueError(
                f"Requested tickers not declared in cache metadata: {missing_meta}. "
                f"Metadata tickers: {meta_tickers}"
            )

    return load_prices_local_csv(path=str(price_path), tickers=tickers, date_col="date")
