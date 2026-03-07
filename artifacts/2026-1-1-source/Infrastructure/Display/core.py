"""Core Stage 2 container API."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

import numpy as np

from .dtypes import SUPPORTED_DTYPES, convert_to_dtype


@dataclass(slots=True)
class DTCArray:
    """Minimal container that stores simulated dtype versions of one input."""

    raw_fp64: np.ndarray
    versions: dict[str, np.ndarray] = field(init=False)
    active_dtype: str = "fp64"
    shape: tuple[int, ...] = field(init=False)

    def __post_init__(self) -> None:
        self.raw_fp64 = np.asarray(self.raw_fp64, dtype=np.float64)
        self.shape = self.raw_fp64.shape
        self.versions = {
            dtype: convert_to_dtype(self.raw_fp64, dtype) for dtype in SUPPORTED_DTYPES
        }
        self._validate_dtype(self.active_dtype)

    @classmethod
    def from_versions(
        cls,
        raw_fp64: np.ndarray,
        versions: dict[str, np.ndarray],
        *,
        active_dtype: str,
    ) -> "DTCArray":
        """Build a new container while reusing precomputed versions."""
        obj = cls.__new__(cls)
        obj.raw_fp64 = np.asarray(raw_fp64, dtype=np.float64)
        obj.versions = {key: np.asarray(value, dtype=np.float64) for key, value in versions.items()}
        obj.active_dtype = active_dtype
        obj.shape = obj.raw_fp64.shape
        obj._validate_dtype(active_dtype)
        return obj

    def _validate_dtype(self, dtype: str) -> None:
        if dtype not in SUPPORTED_DTYPES:
            raise ValueError(f"Unsupported dtype '{dtype}'. Supported dtypes: {SUPPORTED_DTYPES}")

    def get(self, dtype: str | None = None) -> np.ndarray:
        selected = self.active_dtype if dtype is None else dtype
        self._validate_dtype(selected)
        return self.versions[selected]

    def astype(self, dtype: str) -> "DTCArray":
        self._validate_dtype(dtype)
        return DTCArray.from_versions(self.raw_fp64.copy(), self.versions, active_dtype=dtype)


def array(obj: Any) -> DTCArray:
    """Always create a new DTCArray."""
    if isinstance(obj, DTCArray):
        return DTCArray(obj.raw_fp64.copy())
    return DTCArray(obj)


def asarray(obj: Any) -> DTCArray:
    """Return DTCArray unchanged or wrap new input."""
    if isinstance(obj, DTCArray):
        return obj
    return DTCArray(obj)
