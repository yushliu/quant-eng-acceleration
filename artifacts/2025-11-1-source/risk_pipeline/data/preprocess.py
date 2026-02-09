from __future__ import annotations

import numpy as np
import pandas as pd


def align_prices(prices: pd.DataFrame, tickers: list[str]) -> pd.DataFrame:
    aligned = prices[tickers].copy()
    aligned = aligned.dropna(how="any")
    return aligned


def compute_log_returns(aligned_prices: pd.DataFrame) -> pd.DataFrame:
    returns = np.log(aligned_prices / aligned_prices.shift(1))
    returns = returns.replace([np.inf, -np.inf], np.nan).dropna(how="any")
    returns.index.name = "date"
    return returns


def returns_to_numpy(returns_df: pd.DataFrame) -> np.ndarray:
    cleaned = returns_df.replace([np.inf, -np.inf], np.nan).dropna(how="any")
    r = cleaned.to_numpy(dtype=float)
    non_finite_count = int(np.sum(~np.isfinite(r)))
    if non_finite_count > 0:
        raise ValueError(f"Non-finite returns exist: count={non_finite_count}")
    return r


def dataset_stats(prices: pd.DataFrame, returns: pd.DataFrame) -> dict[str, object]:
    return {
        "num_assets": int(prices.shape[1]),
        "price_rows": int(prices.shape[0]),
        "return_rows": int(returns.shape[0]),
        "price_start": str(prices.index.min().date()) if not prices.empty else None,
        "price_end": str(prices.index.max().date()) if not prices.empty else None,
        "return_start": str(returns.index.min().date()) if not returns.empty else None,
        "return_end": str(returns.index.max().date()) if not returns.empty else None,
    }
