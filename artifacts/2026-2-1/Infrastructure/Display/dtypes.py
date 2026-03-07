"""Dtype conversion helpers for Stage 2 semantic simulation."""

from __future__ import annotations

from typing import Iterable

import numpy as np

SUPPORTED_DTYPES: tuple[str, ...] = (
    "fp64",
    "fp32",
    "fp16",
    "bf16",
    "tf32",
    "int8",
    "int16",
    "int32",
)

_INT_QMAX: dict[str, int] = {
    "int8": 127,
    "int16": 32767,
    "int32": 2147483647,
}

_MANTISSA_TRUNCATION_BITS: dict[str, int] = {
    "bf16": 16,
    "tf32": 13,
}


def _as_float64_array(x: Iterable[float] | np.ndarray) -> np.ndarray:
    return np.asarray(x, dtype=np.float64)


def _truncate_float32_mantissa(x: Iterable[float] | np.ndarray, *, kind: str) -> np.ndarray:
    """Approximate reduced-precision float formats via float32 bit truncation."""
    x32 = np.asarray(x, dtype=np.float32)
    bits = x32.view(np.uint32)
    truncate_bits = _MANTISSA_TRUNCATION_BITS[kind]
    mask = np.uint32(~((1 << truncate_bits) - 1) & 0xFFFFFFFF)
    truncated = (bits & mask).view(np.float32)
    return truncated.astype(np.float64)


def _quantize_dequantize(x: Iterable[float] | np.ndarray, *, dtype: str) -> np.ndarray:
    """Apply symmetric quantize/dequantize semantics for integer comparisons."""
    values = _as_float64_array(x)
    qmax = _INT_QMAX[dtype]
    max_abs = float(np.max(np.abs(values))) if values.size else 0.0
    scale = 1.0 if max_abs == 0.0 else max_abs / qmax

    if scale == 0.0:
        return values.copy()

    q = np.rint(values / scale)
    q = np.clip(q, -qmax, qmax)
    return (q * scale).astype(np.float64)


def to_fp64(x: Iterable[float] | np.ndarray) -> np.ndarray:
    return _as_float64_array(x)


def to_fp32(x: Iterable[float] | np.ndarray) -> np.ndarray:
    return np.asarray(x, dtype=np.float32).astype(np.float64)


def to_fp16(x: Iterable[float] | np.ndarray) -> np.ndarray:
    return np.asarray(x, dtype=np.float16).astype(np.float64)


def to_bf16(x: Iterable[float] | np.ndarray) -> np.ndarray:
    # BF16 is approximated by truncating float32 to 7 explicit mantissa bits.
    return _truncate_float32_mantissa(x, kind="bf16")


def to_tf32(x: Iterable[float] | np.ndarray) -> np.ndarray:
    # TF32 is approximated by truncating float32 to 10 explicit mantissa bits.
    return _truncate_float32_mantissa(x, kind="tf32")


def to_int8(x: Iterable[float] | np.ndarray) -> np.ndarray:
    return _quantize_dequantize(x, dtype="int8")


def to_int16(x: Iterable[float] | np.ndarray) -> np.ndarray:
    return _quantize_dequantize(x, dtype="int16")


def to_int32(x: Iterable[float] | np.ndarray) -> np.ndarray:
    return _quantize_dequantize(x, dtype="int32")


_CONVERTERS = {
    "fp64": to_fp64,
    "fp32": to_fp32,
    "fp16": to_fp16,
    "bf16": to_bf16,
    "tf32": to_tf32,
    "int8": to_int8,
    "int16": to_int16,
    "int32": to_int32,
}


def convert_to_dtype(x: Iterable[float] | np.ndarray, dtype: str) -> np.ndarray:
    """Convert array-like input to a simulated dtype result stored as float64."""
    if dtype not in SUPPORTED_DTYPES:
        raise ValueError(f"Unsupported dtype '{dtype}'. Supported dtypes: {SUPPORTED_DTYPES}")
    return _CONVERTERS[dtype](x)
