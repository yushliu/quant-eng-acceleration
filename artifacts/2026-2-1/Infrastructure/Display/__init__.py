"""Public API for dtcnumpy Stage 2 through Stage 4."""

from .core import DTCArray, array, asarray
from .metrics import compare_against_reference
from .ops import clip, diag, dot, einsum, eye, isfinite, matmul, mean, outer, quantile, reshape, std, sum, transpose
from .workflow import run_workflow
from .benchmark import run_stage4_benchmarks
from .report import print_table as print

__all__ = [
    "DTCArray",
    "array",
    "asarray",
    "clip",
    "compare_against_reference",
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
    "run_stage4_benchmarks",
    "run_workflow",
    "std",
    "sum",
    "transpose",
]
