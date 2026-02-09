from __future__ import annotations

import time
from typing import Any

import numpy as np

from risk_pipeline.compute.backend import Backend
from risk_pipeline.risk.mc_sim import simulate_portfolio_losses


def _run_once(backend: Backend, cov, w, num_paths: int, seed: int) -> Any:
    return simulate_portfolio_losses(
        cov=cov,
        weights=w,
        num_paths=num_paths,
        seed=seed,
        backend=backend,
    )


def time_mc_once(
    backend: Backend,
    cov,
    w,
    num_paths: int,
    seed: int,
    warmup: int = 3,
    repeat: int = 10,
) -> dict[str, Any]:
    if warmup < 0:
        raise ValueError("warmup must be >= 0")
    if repeat <= 0:
        raise ValueError("repeat must be > 0")

    cov_arr = backend.asarray(cov, dtype=float)
    w_arr = backend.asarray(w, dtype=float)
    dim = int(cov_arr.shape[0])

    for idx in range(warmup):
        _run_once(backend, cov_arr, w_arr, num_paths=num_paths, seed=seed + idx)
    backend.synchronize()

    elapsed_ms_samples: list[float] = []
    if backend.is_gpu:
        cp = backend.xp
        for idx in range(repeat):
            start_event = cp.cuda.Event()
            end_event = cp.cuda.Event()
            start_event.record()
            _ = _run_once(backend, cov_arr, w_arr, num_paths=num_paths, seed=seed + warmup + idx)
            end_event.record()
            end_event.synchronize()
            elapsed_ms_samples.append(float(cp.cuda.get_elapsed_time(start_event, end_event)))
    else:
        for idx in range(repeat):
            t0 = time.perf_counter()
            _ = _run_once(backend, cov_arr, w_arr, num_paths=num_paths, seed=seed + warmup + idx)
            backend.synchronize()
            elapsed_ms_samples.append((time.perf_counter() - t0) * 1000.0)

    elapsed_ms = float(np.mean(np.asarray(elapsed_ms_samples, dtype=float)))
    paths_per_sec = float(num_paths / (elapsed_ms / 1000.0)) if elapsed_ms > 0 else float("inf")
    return {
        "backend": backend.name,
        "device_id": backend.device_id,
        "num_paths": int(num_paths),
        "dim": dim,
        "dtype": str(cov_arr.dtype),
        "warmup": int(warmup),
        "repeat": int(repeat),
        "elapsed_ms": elapsed_ms,
        "paths_per_sec": paths_per_sec,
        "elapsed_ms_samples": elapsed_ms_samples,
    }
