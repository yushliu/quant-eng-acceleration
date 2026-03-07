"""Public API for dtcnumpy Stage 2 and Stage 3."""

from .core import DTCArray, array, asarray
from .ops import clip, diag, dot, einsum, eye, isfinite, matmul, mean, outer, quantile, reshape, std, sum, transpose
from .report import print_table as print

__all__ = [
    "DTCArray",
    "array",
    "asarray",
    "clip",
    "diag",
    "dot",
    "einsum",
    "eye",
    "isfinite",
    "matmul",
    "mean",
    "outer",
    "print",
    "quantile",
    "reshape",
    "std",
    "sum",
    "transpose",
]
