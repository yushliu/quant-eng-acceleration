from __future__ import annotations

import math

import pandas as pd


def estimate_hist_vol(returns: pd.Series, window: int, annualization: int, min_returns_rows: int = 30) -> dict[str, float | int | str]:
    cleaned = returns.dropna().astype(float)
    n = int(cleaned.shape[0])
    if n < min_returns_rows:
        raise ValueError(
            f"Not enough return rows for historical volatility: num_returns={n} min_required={min_returns_rows}"
        )

    if n >= window:
        used = cleaned.iloc[-window:]
        window_used = int(window)
    else:
        used = cleaned
        window_used = int(n)

    sigma_daily = float(used.std(ddof=1))
    sigma_annual = sigma_daily * math.sqrt(annualization)

    return {
        "sigma_daily": float(sigma_daily),
        "sigma_annual": float(sigma_annual),
        "window_used": int(window_used),
        "annualization": int(annualization),
        "num_returns": int(n),
        "returns_start": str(used.index.min().date()),
        "returns_end": str(used.index.max().date()),
    }
