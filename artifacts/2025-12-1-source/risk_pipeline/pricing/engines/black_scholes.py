from __future__ import annotations

import math


_EPS = 1e-12


def _norm_pdf(x: float) -> float:
    return math.exp(-0.5 * x * x) / math.sqrt(2.0 * math.pi)


def _norm_cdf(x: float) -> float:
    return 0.5 * (1.0 + math.erf(x / math.sqrt(2.0)))


def _deterministic_price(spot: float, strike: float, maturity: float, rate: float, dividend_yield: float, option_type: str) -> float:
    forward = spot * math.exp((rate - dividend_yield) * maturity)
    discount = math.exp(-rate * maturity)
    if option_type == "call":
        return discount * max(forward - strike, 0.0)
    if option_type == "put":
        return discount * max(strike - forward, 0.0)
    raise ValueError(f"Unsupported option_type={option_type}")


def d1_d2(spot: float, strike: float, maturity: float, rate: float, dividend_yield: float, sigma: float) -> tuple[float, float]:
    t = max(maturity, _EPS)
    vol = max(sigma, _EPS)
    denom = vol * math.sqrt(t)
    d1 = (math.log(spot / strike) + (rate - dividend_yield + 0.5 * vol * vol) * t) / denom
    d2 = d1 - denom
    return d1, d2


def bs_price(spot: float, strike: float, maturity: float, rate: float, dividend_yield: float, sigma: float, option_type: str) -> float:
    if spot <= 0.0 or strike <= 0.0:
        raise ValueError("spot and strike must be positive")
    if maturity <= _EPS:
        if option_type == "call":
            return max(spot - strike, 0.0)
        if option_type == "put":
            return max(strike - spot, 0.0)
        raise ValueError(f"Unsupported option_type={option_type}")
    if sigma <= _EPS:
        return _deterministic_price(spot, strike, maturity, rate, dividend_yield, option_type)

    d1, d2 = d1_d2(spot=spot, strike=strike, maturity=maturity, rate=rate, dividend_yield=dividend_yield, sigma=sigma)
    discount_q = math.exp(-dividend_yield * maturity)
    discount_r = math.exp(-rate * maturity)

    if option_type == "call":
        return spot * discount_q * _norm_cdf(d1) - strike * discount_r * _norm_cdf(d2)
    if option_type == "put":
        return strike * discount_r * _norm_cdf(-d2) - spot * discount_q * _norm_cdf(-d1)
    raise ValueError(f"Unsupported option_type={option_type}")


def bs_norm_terms(x: float) -> tuple[float, float]:
    return _norm_cdf(x), _norm_pdf(x)
