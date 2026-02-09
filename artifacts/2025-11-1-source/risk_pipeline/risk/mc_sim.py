from __future__ import annotations

import logging
import numpy as np

from risk_pipeline.compute.backend import Backend

logger = logging.getLogger(__name__)


class BackendAdapter:
    """Thin backend wrapper so numpy can be replaced by cupy later."""

    def __init__(self, xp=np):
        self.xp = xp

    def asarray(self, x, dtype=float):
        return self.xp.asarray(x, dtype=dtype)


def _dbg(name, a, *, debug: bool = False):
    if not debug:
        return
    logger.debug(
        f"[DBG] {name}: shape={a.shape}, finite={np.isfinite(a).all()}, "
        f"min={np.nanmin(a)}, max={np.nanmax(a)}"
    )


def _all_finite(a, xp=np) -> bool:
    if xp is np:
        return bool(np.isfinite(a).all())
    return bool(np.asarray(xp.asnumpy(xp.isfinite(a).all())))


def _stable_cholesky(cov: np.ndarray, xp=np, eps: float = 1e-10, min_eig: float = 1e-12):
    cov_arr = xp.asarray(cov, dtype=float)
    cov_arr = 0.5 * (cov_arr + cov_arr.T)
    if not _all_finite(cov_arr, xp=xp):
        raise FloatingPointError("cov contains non-finite values before cholesky")

    eye = xp.eye(cov_arr.shape[0], dtype=float)
    try:
        chol = xp.linalg.cholesky(cov_arr + eps * eye)
        if not _all_finite(chol, xp=xp):
            raise FloatingPointError("chol contains non-finite values after cholesky")
        return chol
    except Exception:
        # Fallback for nearly-indefinite matrices: clip tiny/negative eigenvalues.
        cov_np = np.asarray(cov_arr if xp is np else xp.asnumpy(cov_arr), dtype=float)
        eigvals, eigvecs = np.linalg.eigh(cov_np)
        eigvals = np.clip(eigvals, min_eig, None)
        cov_psd = eigvecs @ np.diag(eigvals) @ eigvecs.T
        cov_psd = 0.5 * (cov_psd + cov_psd.T)
        chol_np = np.linalg.cholesky(cov_psd + eps * np.eye(cov_np.shape[0], dtype=float))
        if not np.isfinite(chol_np).all():
            raise FloatingPointError("chol contains non-finite values after eigen clipping")

    if xp is np:
        return chol_np
    return xp.asarray(chol_np, dtype=float)


def simulate_returns(
    cov: np.ndarray,
    num_paths: int,
    seed: int,
    debug: bool = False,
    xp=np,
    backend: Backend | None = None,
) -> np.ndarray:
    xp_mod = backend.xp if backend is not None else xp
    cov_arr = xp_mod.asarray(cov, dtype=float)
    n_assets = cov_arr.shape[0]

    if xp_mod is np:
        rng = np.random.default_rng(seed)
        z = rng.standard_normal(size=(num_paths, n_assets))
    else:
        rng = xp_mod.random.RandomState(seed)
        z = rng.standard_normal(size=(num_paths, n_assets))

    chol = _stable_cholesky(cov_arr, xp=xp_mod)

    if xp_mod is np:
        _dbg("cov", cov_arr, debug=debug)
        _dbg("chol", chol, debug=debug)

    if not _all_finite(cov_arr, xp=xp_mod):
        raise FloatingPointError("cov contains inf/nan")
    if not _all_finite(chol, xp=xp_mod):
        raise FloatingPointError("chol contains inf/nan")
    scenarios = z @ chol.T
    if not _all_finite(scenarios, xp=xp_mod):
        raise FloatingPointError("Non-finite scenarios")
    return scenarios


def simulate_portfolio_losses(
    cov: np.ndarray,
    weights: np.ndarray,
    num_paths: int,
    seed: int,
    debug: bool = False,
    xp=np,
    backend: Backend | None = None,
) -> np.ndarray:
    xp_mod = backend.xp if backend is not None else xp
    scenarios = simulate_returns(cov=cov, num_paths=num_paths, seed=seed, debug=debug, xp=xp_mod, backend=backend)
    w = xp_mod.asarray(weights, dtype=float)
    portfolio_returns = scenarios @ w
    if not _all_finite(portfolio_returns, xp=xp_mod):
        raise FloatingPointError("Non-finite portfolio_returns")
    losses = -portfolio_returns
    return losses
