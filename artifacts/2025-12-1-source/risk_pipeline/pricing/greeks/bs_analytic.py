from __future__ import annotations

import math

from risk_pipeline.pricing.engines.black_scholes import bs_norm_terms, d1_d2


_EPS = 1e-12


def bs_greeks(spot: float, strike: float, maturity: float, rate: float, dividend_yield: float, sigma: float, option_type: str) -> dict[str, float]:
    if spot <= 0.0 or strike <= 0.0:
        raise ValueError("spot and strike must be positive")

    t = max(maturity, _EPS)
    vol = max(sigma, _EPS)
    d1, d2 = d1_d2(spot=spot, strike=strike, maturity=t, rate=rate, dividend_yield=dividend_yield, sigma=vol)
    n_d1, pdf_d1 = bs_norm_terms(d1)
    n_d2, _ = bs_norm_terms(d2)
    exp_qt = math.exp(-dividend_yield * t)
    exp_rt = math.exp(-rate * t)

    if option_type == "call":
        delta = exp_qt * n_d1
        theta = (
            -(spot * exp_qt * pdf_d1 * vol) / (2.0 * math.sqrt(t))
            - rate * strike * exp_rt * n_d2
            + dividend_yield * spot * exp_qt * n_d1
        )
        rho = strike * t * exp_rt * n_d2
    elif option_type == "put":
        delta = exp_qt * (n_d1 - 1.0)
        theta = (
            -(spot * exp_qt * pdf_d1 * vol) / (2.0 * math.sqrt(t))
            + rate * strike * exp_rt * (1.0 - n_d2)
            - dividend_yield * spot * exp_qt * (1.0 - n_d1)
        )
        rho = -strike * t * exp_rt * (1.0 - n_d2)
    else:
        raise ValueError(f"Unsupported option_type={option_type}")

    gamma = exp_qt * pdf_d1 / (spot * vol * math.sqrt(t))
    vega = spot * exp_qt * pdf_d1 * math.sqrt(t)

    return {
        "delta": float(delta),
        "gamma": float(gamma),
        "vega": float(vega),
        "theta": float(theta),
        "rho": float(rho),
    }
