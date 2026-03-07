"""Stage 4 comparison metrics against the fp64 reference."""

from __future__ import annotations

from typing import Any

import numpy as np


def _as_float64_array(x: Any) -> np.ndarray:
    return np.asarray(x, dtype=np.float64)


def _safe_rel(abs_diff: np.ndarray, reference: np.ndarray) -> np.ndarray:
    denom = np.where(np.abs(reference) > 0.0, np.abs(reference), 1.0)
    return abs_diff / denom


def same_shape(reference: Any, tested: Any) -> bool:
    """Return whether tested output matches the fp64 reference shape."""
    return _as_float64_array(reference).shape == _as_float64_array(tested).shape


def finite_ratio(tested: Any) -> float:
    """Return the proportion of finite values in the tested output."""
    values = _as_float64_array(tested)
    if values.size == 0:
        return 1.0
    return float(np.mean(np.isfinite(values)))


def abs_error(reference: Any, tested: Any) -> float:
    """Return scalar absolute error or L1 absolute error for arrays."""
    ref = _as_float64_array(reference)
    tst = _as_float64_array(tested)
    if ref.shape != tst.shape:
        return float("nan")
    diff = np.abs(tst - ref)
    if ref.ndim == 0:
        return float(diff)
    return float(np.sum(diff))


def rel_error(reference: Any, tested: Any) -> float:
    """Return scalar relative error or mean relative error for arrays."""
    ref = _as_float64_array(reference)
    tst = _as_float64_array(tested)
    if ref.shape != tst.shape:
        return float("nan")
    abs_diff = np.abs(tst - ref)
    rel = _safe_rel(abs_diff, ref)
    if ref.ndim == 0:
        return float(rel)
    return float(np.mean(rel))


def mean_abs_error(reference: Any, tested: Any) -> float:
    ref = _as_float64_array(reference)
    tst = _as_float64_array(tested)
    if ref.shape != tst.shape:
        return float("nan")
    return float(np.mean(np.abs(tst - ref)))


def max_abs_error(reference: Any, tested: Any) -> float:
    ref = _as_float64_array(reference)
    tst = _as_float64_array(tested)
    if ref.shape != tst.shape:
        return float("nan")
    return float(np.max(np.abs(tst - ref)))


def rmse(reference: Any, tested: Any) -> float:
    ref = _as_float64_array(reference)
    tst = _as_float64_array(tested)
    if ref.shape != tst.shape:
        return float("nan")
    return float(np.sqrt(np.mean(np.square(tst - ref))))


def compare_against_reference(reference: Any, tested: Any) -> dict[str, Any]:
    """Build the standard Stage 4 metric payload."""
    ref = _as_float64_array(reference)
    tst = _as_float64_array(tested)
    output_kind = "scalar" if ref.ndim == 0 else "array"

    return {
        "output_kind": output_kind,
        "abs_error": abs_error(ref, tst),
        "rel_error": rel_error(ref, tst),
        "mean_abs_error": mean_abs_error(ref, tst),
        "max_abs_error": max_abs_error(ref, tst),
        "rmse": rmse(ref, tst),
        "finite_ratio": finite_ratio(tst),
        "same_shape": same_shape(ref, tst),
    }
