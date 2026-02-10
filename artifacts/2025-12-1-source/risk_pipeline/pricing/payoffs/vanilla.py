from __future__ import annotations

import numpy as np


def vanilla_payoff(spot: np.ndarray, strike: float, option_type: str) -> np.ndarray:
    if option_type == "call":
        return np.maximum(spot - strike, 0.0)
    if option_type == "put":
        return np.maximum(strike - spot, 0.0)
    raise ValueError(f"Unsupported option_type={option_type}")
