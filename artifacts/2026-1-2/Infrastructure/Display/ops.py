"""Stage 3 numeric ops.

Stage 3 compares numerical operation outputs only. It does not simulate
hardware execution or Tensor Core scheduling. Integer support remains
quantize/dequantize semantics only, and einsum is intentionally limited.
"""

from __future__ import annotations

from typing import Any, Callable

import numpy as np

from .core import DTCArray, asarray
from .dtypes import SUPPORTED_DTYPES

_ArrayOp = Callable[..., Any]

_SUPPORTED_EINSUM_PATTERNS = {"ij,j->i", "ij,kj->ki"}


def _materialize_result(result: Any) -> np.ndarray:
    return np.asarray(result, dtype=np.float64)


def _unary_op(x: Any, op_fn: _ArrayOp, **kwargs: Any) -> DTCArray:
    arr = asarray(x)
    versions = {
        dtype: _materialize_result(op_fn(arr.get(dtype), **kwargs)) for dtype in SUPPORTED_DTYPES
    }
    return DTCArray.from_versions(versions, active_dtype=arr.active_dtype)


def _resolve_operand(value: Any, dtype: str) -> Any:
    if isinstance(value, DTCArray):
        return value.get(dtype)
    return value


def _binary_op(x: Any, y: Any, op_fn: _ArrayOp, **kwargs: Any) -> DTCArray:
    left = asarray(x)
    active_dtype = left.active_dtype
    if isinstance(y, DTCArray):
        active_dtype = left.active_dtype
    versions = {
        dtype: _materialize_result(
            op_fn(left.get(dtype), _resolve_operand(y, dtype), **kwargs)
        )
        for dtype in SUPPORTED_DTYPES
    }
    return DTCArray.from_versions(versions, active_dtype=active_dtype)


def sum(x: Any, axis: int | tuple[int, ...] | None = None, keepdims: bool = False) -> DTCArray:
    return _unary_op(x, np.sum, axis=axis, keepdims=keepdims)


def mean(x: Any, axis: int | tuple[int, ...] | None = None, keepdims: bool = False) -> DTCArray:
    return _unary_op(x, np.mean, axis=axis, keepdims=keepdims)


def std(
    x: Any,
    axis: int | tuple[int, ...] | None = None,
    ddof: int = 0,
    keepdims: bool = False,
) -> DTCArray:
    return _unary_op(x, np.std, axis=axis, ddof=ddof, keepdims=keepdims)


def quantile(
    x: Any,
    q: float | np.ndarray,
    axis: int | tuple[int, ...] | None = None,
    keepdims: bool = False,
    method: str = "linear",
) -> DTCArray:
    return _unary_op(x, np.quantile, q=q, axis=axis, keepdims=keepdims, method=method)


def dot(x: Any, y: Any) -> DTCArray:
    return _binary_op(x, y, np.dot)


def matmul(x: Any, y: Any) -> DTCArray:
    return _binary_op(x, y, np.matmul)


def outer(x: Any, y: Any) -> DTCArray:
    return _binary_op(x, y, np.outer)


def reshape(x: Any, newshape: int | tuple[int, ...]) -> DTCArray:
    return _unary_op(x, np.reshape, newshape=newshape)


def transpose(x: Any, axes: tuple[int, ...] | None = None) -> DTCArray:
    return _unary_op(x, np.transpose, axes=axes)


def diag(x: Any, k: int = 0) -> DTCArray:
    return _unary_op(x, np.diag, k=k)


def eye(n: int, m: int | None = None, k: int = 0) -> DTCArray:
    from .core import array

    return array(np.eye(N=n, M=m, k=k, dtype=np.float64))


def clip(x: Any, a_min: Any, a_max: Any) -> DTCArray:
    arr = asarray(x)
    versions = {}
    for dtype in SUPPORTED_DTYPES:
        min_value = _resolve_operand(a_min, dtype)
        max_value = _resolve_operand(a_max, dtype)
        versions[dtype] = _materialize_result(np.clip(arr.get(dtype), min_value, max_value))
    return DTCArray.from_versions(versions, active_dtype=arr.active_dtype)


def isfinite(x: Any) -> dict[str, np.ndarray]:
    """Return per-dtype boolean masks instead of wrapping booleans in DTCArray."""
    arr = asarray(x)
    return {dtype: np.isfinite(arr.get(dtype)) for dtype in SUPPORTED_DTYPES}


def einsum(subscripts: str, *operands: Any, **kwargs: Any) -> DTCArray:
    if subscripts not in _SUPPORTED_EINSUM_PATTERNS:
        raise NotImplementedError(
            f"einsum pattern '{subscripts}' is not supported in Stage 3"
        )
    wrapped = [asarray(operand) for operand in operands]
    active_dtype = wrapped[0].active_dtype if wrapped else "fp64"
    versions = {
        dtype: _materialize_result(
            np.einsum(subscripts, *(operand.get(dtype) for operand in wrapped), **kwargs)
        )
        for dtype in SUPPORTED_DTYPES
    }
    return DTCArray.from_versions(versions, active_dtype=active_dtype)
