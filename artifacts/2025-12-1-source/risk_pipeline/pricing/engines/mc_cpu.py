from __future__ import annotations

import math

import numpy as np

from risk_pipeline.pricing.models.gbm import terminal_price_gbm
from risk_pipeline.pricing.payoffs.vanilla import vanilla_payoff


def mc_price_cpu(
    spot: float,
    strike: float,
    maturity: float,
    rate: float,
    dividend_yield: float,
    sigma: float,
    option_type: str,
    paths: int,
    seed: int,
) -> dict[str, float]:
    if paths <= 1:
        raise ValueError("paths must be > 1")

    rng = np.random.default_rng(seed)
    z = rng.standard_normal(paths)
    s_t = terminal_price_gbm(spot=spot, rate=rate, dividend_yield=dividend_yield, sigma=sigma, maturity=maturity, z=z)
    payoff = vanilla_payoff(spot=s_t, strike=strike, option_type=option_type)
    disc_payoff = math.exp(-rate * maturity) * payoff

    mean = float(np.mean(disc_payoff))
    std = float(np.std(disc_payoff, ddof=1))
    stderr = std / math.sqrt(paths)
    ci_half = 1.96 * stderr

    return {
        "price": mean,
        "stderr": float(stderr),
        "ci_low": float(mean - ci_half),
        "ci_high": float(mean + ci_half),
        "paths": int(paths),
    }
