from __future__ import annotations

import logging
import numpy as np

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
    return bool(xp.isfinite(a).all())


def _stable_cholesky(cov: np.ndarray, xp=np, eps: float = 1e-10, min_eig: float = 1e-12):
    cov_np = np.asarray(cov, dtype=float)
    cov_np = 0.5 * (cov_np + cov_np.T)
    if not np.isfinite(cov_np).all():
        raise FloatingPointError("cov contains non-finite values before cholesky")

    eye = np.eye(cov_np.shape[0], dtype=float)
    try:
        chol_np = np.linalg.cholesky(cov_np + eps * eye)
        if not np.isfinite(chol_np).all():
            raise FloatingPointError("chol contains non-finite values after cholesky")
    except np.linalg.LinAlgError:
        # Fallback for nearly-indefinite matrices: clip tiny/negative eigenvalues.
        eigvals, eigvecs = np.linalg.eigh(cov_np)
        eigvals = np.clip(eigvals, min_eig, None)
        cov_psd = eigvecs @ np.diag(eigvals) @ eigvecs.T
        cov_psd = 0.5 * (cov_psd + cov_psd.T)
        chol_np = np.linalg.cholesky(cov_psd + eps * eye)
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
) -> np.ndarray:
    cov_arr = xp.asarray(cov, dtype=float)
    n_assets = cov_arr.shape[0]

    if xp is np:
        rng = np.random.default_rng(seed)
        z = rng.standard_normal(size=(num_paths, n_assets))
    else:
        rng = xp.random.RandomState(seed)
        z = rng.standard_normal(size=(num_paths, n_assets))

    chol = _stable_cholesky(cov_arr, xp=xp)

    if xp is np:
        _dbg("cov", cov_arr, debug=debug)
        _dbg("chol", chol, debug=debug)

    if not _all_finite(cov_arr, xp=xp):
        raise FloatingPointError("cov contains inf/nan")
    if not _all_finite(chol, xp=xp):
        raise FloatingPointError("chol contains inf/nan")
    # Use einsum instead of matmul to avoid backend-specific matmul warnings
    # while keeping deterministic linear transformation semantics.
    if xp is np:
        scenarios = np.einsum("ij,kj->ki", chol, z, optimize=True)
    else:
        scenarios = xp.einsum("ij,kj->ki", chol, z)
    if not _all_finite(scenarios, xp=xp):
        raise FloatingPointError("Non-finite scenarios")
    return scenarios


def simulate_portfolio_losses(
    cov: np.ndarray,
    weights: np.ndarray,
    num_paths: int,
    seed: int,
    debug: bool = False,
    xp=np,
) -> np.ndarray:
    scenarios = simulate_returns(cov=cov, num_paths=num_paths, seed=seed, debug=debug, xp=xp)
    w = xp.asarray(weights, dtype=float)
    if xp is np:
        portfolio_returns = np.einsum("ij,j->i", scenarios, w, optimize=True)
    else:
        portfolio_returns = xp.einsum("ij,j->i", scenarios, w)
    if not _all_finite(portfolio_returns, xp=xp):
        raise FloatingPointError("Non-finite portfolio_returns")
    losses = -portfolio_returns
    return losses
