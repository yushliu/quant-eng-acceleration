"""Reporting utilities for Stage 2 dtype comparisons."""

from __future__ import annotations

import builtins

import numpy as np

from .core import DTCArray, asarray
from .dtypes import SUPPORTED_DTYPES


def _safe_rel_diff_percent(diff: np.ndarray, reference: np.ndarray) -> np.ndarray:
    denom = np.where(np.abs(reference) > 0.0, np.abs(reference), 1.0)
    return (np.abs(diff) / denom) * 100.0


def print_table(x: DTCArray) -> None:
    """Print a readable comparison table against the FP64 reference."""
    arr = asarray(x)
    reference = arr.versions["fp64"]
    is_scalar = reference.ndim == 0

    if is_scalar:
        builtins.print(f"{'datatype':<10} {'value':>16} {'diff_vs_fp64':>16} {'diff_pct_vs_fp64':>18}")
        ref_value = float(reference)
        for dtype in SUPPORTED_DTYPES:
            value = float(arr.versions[dtype])
            diff = value - ref_value
            rel_pct = float(_safe_rel_diff_percent(np.asarray(diff), np.asarray(ref_value)))
            builtins.print(f"{dtype:<10} {value:>16.8g} {diff:>16.8g} {rel_pct:>18.8g}")
        return

    builtins.print(
        f"{'datatype':<10} {'shape':>12} {'mean_abs_diff_vs_fp64':>24} "
        f"{'max_abs_diff_vs_fp64':>22} {'mean_rel_diff_pct_vs_fp64':>27}"
    )
    for dtype in SUPPORTED_DTYPES:
        values = arr.versions[dtype]
        diff = values - reference
        rel_pct = _safe_rel_diff_percent(diff, reference)
        builtins.print(
            f"{dtype:<10} {str(values.shape):>12} "
            f"{float(np.mean(np.abs(diff))):>24.8g} "
            f"{float(np.max(np.abs(diff))):>22.8g} "
            f"{float(np.mean(rel_pct)):>27.8g}"
        )
