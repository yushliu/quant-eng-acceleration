from __future__ import annotations

from dataclasses import dataclass
from types import ModuleType
from typing import Any

import numpy as np


class BackendError(RuntimeError):
    """Raised when the requested compute backend is unavailable."""


@dataclass(frozen=True)
class Backend:
    name: str
    xp: ModuleType
    is_gpu: bool
    device_id: int | None = None

    def asarray(self, x: Any, dtype=float):
        return self.xp.asarray(x, dtype=dtype)

    def to_numpy(self, x: Any) -> np.ndarray:
        if self.is_gpu:
            return self.xp.asnumpy(x)
        return np.asarray(x)

    def synchronize(self) -> None:
        if self.is_gpu:
            self.xp.cuda.Stream.null.synchronize()


def get_backend(name: str, device_id: int = 0) -> Backend:
    normalized = name.strip().lower()
    if normalized == "cpu":
        return Backend(name="cpu", xp=np, is_gpu=False, device_id=None)
    if normalized != "gpu":
        raise ValueError(f"Unknown backend '{name}', expected one of: cpu, gpu")

    try:
        import cupy as cp  # type: ignore[import-not-found]
    except Exception as exc:
        raise BackendError(
            "GPU backend requested but CuPy is not installed. Install a compatible cupy-cuda package."
        ) from exc

    try:
        device_count = int(cp.cuda.runtime.getDeviceCount())
    except Exception as exc:
        raise BackendError(f"GPU backend requested but CUDA runtime is unavailable: {exc}") from exc
    if device_count <= 0:
        raise BackendError("GPU backend requested but no CUDA devices were found.")
    if device_id < 0 or device_id >= device_count:
        raise BackendError(f"GPU device {device_id} is out of range; available devices: 0..{device_count - 1}")

    try:
        cp.cuda.Device(device_id).use()
    except Exception as exc:
        raise BackendError(f"Failed to select CUDA device {device_id}: {exc}") from exc

    return Backend(name="gpu", xp=cp, is_gpu=True, device_id=device_id)
