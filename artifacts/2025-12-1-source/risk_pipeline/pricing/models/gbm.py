from __future__ import annotations

import numpy as np


def terminal_price_gbm(spot: float, rate: float, dividend_yield: float, sigma: float, maturity: float, z: np.ndarray) -> np.ndarray:
    drift = (rate - dividend_yield - 0.5 * sigma * sigma) * maturity
    diffusion = sigma * np.sqrt(maturity) * z
    return spot * np.exp(drift + diffusion)
