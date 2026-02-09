from __future__ import annotations

import numpy as np


def compute_var_cvar(losses: np.ndarray, alpha: float = 0.99) -> tuple[float, float]:
    arr = np.asarray(losses, dtype=float)
    if arr.ndim != 1:
        raise ValueError("losses must be a 1D array")
    if not (0.0 < alpha < 1.0):
        raise ValueError("alpha must be in (0, 1)")

    var = float(np.quantile(arr, alpha, method="linear"))
    tail = arr[arr >= var]
    cvar = float(tail.mean()) if tail.size else var
    return var, cvar
