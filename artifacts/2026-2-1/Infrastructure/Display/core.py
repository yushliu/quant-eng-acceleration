"""Core container API for Stage 2 and Stage 3."""

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
        versions: dict[str, np.ndarray],
        *,
        active_dtype: str = "fp64",
    ) -> "DTCArray":
        """Build a container directly from per-dtype operation outputs."""
        obj = cls.__new__(cls)
        obj._validate_versions(versions)
        obj.versions = {key: np.asarray(value, dtype=np.float64) for key, value in versions.items()}
        obj.raw_fp64 = obj.versions["fp64"]
        obj.active_dtype = active_dtype
        obj.shape = obj.raw_fp64.shape
        obj._validate_dtype(active_dtype)
        return obj

    @staticmethod
    def _validate_dtype(dtype: str) -> None:
        if dtype not in SUPPORTED_DTYPES:
            raise ValueError(f"Unsupported dtype '{dtype}'. Supported dtypes: {SUPPORTED_DTYPES}")

    @staticmethod
    def _validate_versions(versions: dict[str, np.ndarray]) -> None:
        missing = [dtype for dtype in SUPPORTED_DTYPES if dtype not in versions]
        extra = [dtype for dtype in versions if dtype not in SUPPORTED_DTYPES]
        if missing or extra:
            raise ValueError(
                "versions must contain exactly the supported dtypes. "
                f"missing={missing}, extra={extra}"
            )
        shapes = {np.asarray(value).shape for value in versions.values()}
        if len(shapes) != 1:
            raise ValueError("All per-dtype versions must share the same shape.")

    def get(self, dtype: str | None = None) -> np.ndarray:
        selected = self.active_dtype if dtype is None else dtype
        self._validate_dtype(selected)
        return self.versions[selected]

    def astype(self, dtype: str) -> "DTCArray":
        self._validate_dtype(dtype)
        return DTCArray.from_versions(self.versions, active_dtype=dtype)

    def reshape(self, newshape: int | tuple[int, ...]) -> "DTCArray":
        from .ops import reshape

        return reshape(self, newshape)

    def transpose(self, axes: tuple[int, ...] | None = None) -> "DTCArray":
        from .ops import transpose

        return transpose(self, axes=axes)

    @property
    def T(self) -> "DTCArray":
        return self.transpose()


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
