from __future__ import annotations

import math
from typing import Any


def mc_price_gpu_cupy(
    spot: float,
    strike: float,
    maturity: float,
    rate: float,
    dividend_yield: float,
    sigma: float,
    option_type: str,
    paths: int,
    seed: int,
) -> dict[str, Any]:
    if paths <= 1:
        raise ValueError("paths must be > 1")

    try:
        import cupy as cp
    except ImportError:
        return {
            "available": False,
            "reason": "cupy_not_installed",
        }

    cp.random.seed(seed)
    z = cp.random.standard_normal(paths, dtype=cp.float64)
    drift = (rate - dividend_yield - 0.5 * sigma * sigma) * maturity
    diffusion = sigma * math.sqrt(maturity) * z
    s_t = spot * cp.exp(drift + diffusion)

    if option_type == "call":
        payoff = cp.maximum(s_t - strike, 0.0)
    elif option_type == "put":
        payoff = cp.maximum(strike - s_t, 0.0)
    else:
        raise ValueError(f"Unsupported option_type={option_type}")

    disc_payoff = math.exp(-rate * maturity) * payoff
    mean = float(cp.mean(disc_payoff).item())
    std = float(cp.std(disc_payoff, ddof=1).item())
    stderr = std / math.sqrt(paths)
    ci_half = 1.96 * stderr

    try:
        device = cp.cuda.Device()
        device_name = cp.cuda.runtime.getDeviceProperties(device.id)["name"].decode("utf-8")
    except Exception:
        device_name = "unknown"

    return {
        "available": True,
        "price": mean,
        "stderr": float(stderr),
        "ci_low": float(mean - ci_half),
        "ci_high": float(mean + ci_half),
        "paths": int(paths),
        "gpu_backend": "cupy",
        "device": device_name,
    }
