from __future__ import annotations

from risk_pipeline.pricing.engines.black_scholes import bs_price


def bs_greeks_finite_diff(
    spot: float,
    strike: float,
    maturity: float,
    rate: float,
    dividend_yield: float,
    sigma: float,
    option_type: str,
    spot_bump: float = 1e-2,
    vol_bump: float = 1e-4,
    rate_bump: float = 1e-4,
    time_bump_days: float = 1.0,
) -> dict[str, float]:
    base = bs_price(spot, strike, maturity, rate, dividend_yield, sigma, option_type)

    up = bs_price(spot + spot_bump, strike, maturity, rate, dividend_yield, sigma, option_type)
    down = bs_price(max(spot - spot_bump, 1e-8), strike, maturity, rate, dividend_yield, sigma, option_type)
    delta = (up - down) / (2.0 * spot_bump)
    gamma = (up - 2.0 * base + down) / (spot_bump * spot_bump)

    vega = (
        bs_price(spot, strike, maturity, rate, dividend_yield, sigma + vol_bump, option_type)
        - bs_price(spot, strike, maturity, rate, dividend_yield, max(sigma - vol_bump, 1e-8), option_type)
    ) / (2.0 * vol_bump)

    rho = (
        bs_price(spot, strike, maturity, rate + rate_bump, dividend_yield, sigma, option_type)
        - bs_price(spot, strike, maturity, rate - rate_bump, dividend_yield, sigma, option_type)
    ) / (2.0 * rate_bump)

    dt = time_bump_days / 365.0
    shorter_t = max(maturity - dt, 1e-8)
    theta = (bs_price(spot, strike, shorter_t, rate, dividend_yield, sigma, option_type) - base) / dt

    return {
        "delta": float(delta),
        "gamma": float(gamma),
        "vega": float(vega),
        "theta": float(theta),
        "rho": float(rho),
        "step": {
            "spot_bump": float(spot_bump),
            "vol_bump": float(vol_bump),
            "rate_bump": float(rate_bump),
            "time_bump_days": float(time_bump_days),
        },
    }
