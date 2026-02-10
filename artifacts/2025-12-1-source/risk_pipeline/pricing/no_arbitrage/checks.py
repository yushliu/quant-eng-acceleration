from __future__ import annotations

import math


def put_call_parity_check(call: float, put: float, spot: float, strike: float, rate: float, dividend_yield: float, maturity: float) -> dict[str, float]:
    lhs = call - put
    rhs = spot * math.exp(-dividend_yield * maturity) - strike * math.exp(-rate * maturity)
    abs_error = abs(lhs - rhs)
    rel_error = abs_error / max(1e-12, abs(rhs))
    return {
        "lhs_call_minus_put": float(lhs),
        "rhs_discounted_spot_minus_strike": float(rhs),
        "abs_error": float(abs_error),
        "rel_error": float(rel_error),
    }


def bounds_check_call_put(call: float, put: float, spot: float, strike: float, rate: float, dividend_yield: float, maturity: float) -> dict[str, float | bool]:
    call_lb = max(0.0, spot * math.exp(-dividend_yield * maturity) - strike * math.exp(-rate * maturity))
    call_ub = spot * math.exp(-dividend_yield * maturity)
    put_lb = max(0.0, strike * math.exp(-rate * maturity) - spot * math.exp(-dividend_yield * maturity))
    put_ub = strike * math.exp(-rate * maturity)
    return {
        "call_lower_bound": float(call_lb),
        "call_upper_bound": float(call_ub),
        "put_lower_bound": float(put_lb),
        "put_upper_bound": float(put_ub),
        "call_within_bounds": bool(call_lb - 1e-10 <= call <= call_ub + 1e-10),
        "put_within_bounds": bool(put_lb - 1e-10 <= put <= put_ub + 1e-10),
    }
