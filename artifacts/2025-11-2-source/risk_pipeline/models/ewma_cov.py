from __future__ import annotations

import numpy as np


def ewma_covariance(
    returns: np.ndarray,
    decay_lambda: float = 0.94,
    init_window: int = 60,
    mean_mode: str = "zero",
    jitter_eps: float = 1e-10,
) -> np.ndarray:
    """Estimate next-step covariance using EWMA recursion.

    returns: shape (T, N)
    """
    r = np.asarray(returns, dtype=float)
    if r.ndim != 2:
        raise ValueError("returns must have shape (T, N)")
    non_finite_count = int(np.sum(~np.isfinite(r)))
    if non_finite_count > 0:
        raise ValueError(f"returns contains non-finite values: count={non_finite_count}")

    t_obs, n_assets = r.shape
    if t_obs < 2:
        raise ValueError("Need at least 2 observations")

    w = min(max(2, init_window), t_obs)
    base = r[:w]

    if mean_mode == "sample":
        base = base - base.mean(axis=0, keepdims=True)
    elif mean_mode != "zero":
        raise ValueError("mean_mode must be 'zero' or 'sample'")

    s_t = np.cov(base, rowvar=False, ddof=1)
    if s_t.shape == ():
        s_t = np.array([[float(s_t)]])

    for idx in range(w, t_obs):
        x = r[idx]
        if mean_mode == "sample":
            x = x - r[: idx + 1].mean(axis=0)
        outer = np.outer(x, x)
        s_t = decay_lambda * s_t + (1.0 - decay_lambda) * outer

    # Keep covariance numerically symmetric and add tiny diagonal jitter.
    # This improves conditioning for downstream Cholesky.
    s_t = 0.5 * (s_t + s_t.T)
    s_t = s_t + jitter_eps * np.eye(n_assets, dtype=float)
    if not np.isfinite(s_t).all():
        raise FloatingPointError("EWMA covariance contains non-finite values")
    if s_t.shape != (n_assets, n_assets):
        raise ValueError("Covariance shape mismatch")
    return s_t
