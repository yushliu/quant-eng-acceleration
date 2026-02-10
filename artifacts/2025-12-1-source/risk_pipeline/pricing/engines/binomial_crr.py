from __future__ import annotations

import math

import numpy as np


_EPS = 1e-12


def crr_price(
    spot: float,
    strike: float,
    maturity: float,
    rate: float,
    dividend_yield: float,
    sigma: float,
    option_type: str,
    steps: int,
) -> float:
    if steps <= 0:
        raise ValueError("steps must be > 0")
    if spot <= 0.0 or strike <= 0.0:
        raise ValueError("spot and strike must be positive")

    if maturity <= _EPS:
        if option_type == "call":
            return max(spot - strike, 0.0)
        if option_type == "put":
            return max(strike - spot, 0.0)
        raise ValueError(f"Unsupported option_type={option_type}")

    if sigma <= _EPS:
        forward = spot * math.exp((rate - dividend_yield) * maturity)
        payoff = max(forward - strike, 0.0) if option_type == "call" else max(strike - forward, 0.0)
        return math.exp(-rate * maturity) * payoff

    dt = maturity / steps
    u = math.exp(sigma * math.sqrt(dt))
    d = 1.0 / u
    growth = math.exp((rate - dividend_yield) * dt)
    p = (growth - d) / (u - d)
    if p < 0.0 or p > 1.0:
        raise ValueError(f"Invalid risk-neutral probability p={p:.6f}. Increase steps or validate inputs")

    j = np.arange(steps + 1)
    spot_t = spot * (u ** j) * (d ** (steps - j))
    if option_type == "call":
        values = np.maximum(spot_t - strike, 0.0)
    elif option_type == "put":
        values = np.maximum(strike - spot_t, 0.0)
    else:
        raise ValueError(f"Unsupported option_type={option_type}")

    disc = math.exp(-rate * dt)
    for _ in range(steps, 0, -1):
        values = disc * (p * values[1:] + (1.0 - p) * values[:-1])

    return float(values[0])
