import time

def get_xp(prefer_gpu: bool = True):
    """
    Return (xp, on_gpu).
    xp: cupy or numpy module
    on_gpu: bool
    """
    if not prefer_gpu:
        import numpy as np
        return np, False

    try:
        import cupy as cp
        _ = cp.cuda.runtime.getDeviceCount()
        return cp, True
    except Exception:
        import numpy as np
        return np, False

def build_cov_from_vol_corr(xp, vol, rho, dtype):
    """
    Build covariance matrix from vol vector and constant correlation rho.
    cov = diag(vol) * corr * diag(vol)
    """
    vol = xp.asarray(vol, dtype=dtype)
    n = vol.shape[0]
    corr = xp.full((n, n), rho, dtype=dtype)
    
    idx = xp.arange(n)
    corr[idx, idx] = xp.asarray(1.0, dtype=dtype)
    cov = (vol.reshape(-1, 1) * corr) * vol.reshape(1, -1)
    return cov

def simulate_returns_mvn(xp, n_assets, n_paths, mu, vol, rho=0.3, seed=42, dtype="float32"):
    """
    Simulate one-period returns with multivariate normal:
    r = mu + Z @ L^T  (where L is Cholesky(cov))
    returns shape: (n_paths, n_assets)
    """
    dt = xp.dtype(dtype)
    rng = xp.random.default_rng(seed)

    mu = xp.asarray(mu, dtype=dt)
    vol = xp.asarray(vol, dtype=dt)

    cov = build_cov_from_vol_corr(xp, vol, rho, dt)
    L = xp.linalg.cholesky(cov) 

    Z = rng.standard_normal((n_paths, n_assets), dtype=dt)
    
    returns = mu + Z @ L.T
    return returns

def portfolio_pnl(xp, returns, weights, dtype):
    """
    Compute portfolio return for each path.
    returns shape: (n_paths, n_assets)
    weights shape: (n_assets,)
    """
    dt = xp.dtype(dtype)
    w = xp.asarray(weights, dtype=dt)
    w = w / xp.sum(w)  
    return returns @ w

def var_cvar(xp, pnl, alpha=0.99, dtype="float32"):
    """
    Define loss = -pnl. VaR = alpha-quantile(loss), CVaR = mean(loss | loss >= VaR)
    """
    dt = xp.dtype(dtype)
    pnl = xp.asarray(pnl, dtype=dt)
    loss = -pnl

    var = xp.quantile(loss, alpha)
    tail = loss[loss >= var]
    cvar = tail.mean() if tail.size > 0 else var
    return var, cvar

def run_mc_var_cvar(
    n_assets=10,
    n_paths=200_000,
    alpha=0.99,
    seed=42,
    rho=0.30,
    mu_value=0.0002,
    vol_value=0.01,
    weights=None,
    use_gpu=True,
    dtype="float32",
):
    """
    Full pipeline: simulate returns -> portfolio pnl -> VaR/CVaR
    Returns: (var_float, cvar_float, on_gpu_bool, elapsed_sec)
    """
    xp, on_gpu = get_xp(prefer_gpu=use_gpu)
    dt = xp.dtype(dtype)

    mu = xp.full((n_assets,), mu_value, dtype=dt)
    vol = xp.full((n_assets,), vol_value, dtype=dt)

    if weights is None:
        weights = xp.full((n_assets,), 1.0 / n_assets, dtype=dt)

    t0 = time.time()
    rets = simulate_returns_mvn(
        xp, n_assets=n_assets, n_paths=n_paths,
        mu=mu, vol=vol, rho=rho, seed=seed, dtype=dtype
    )
    pnl = portfolio_pnl(xp, rets, weights, dtype=dtype)
    var, cvar = var_cvar(xp, pnl, alpha=alpha, dtype=dtype)

    if on_gpu:
        var = float(var.get())
        cvar = float(cvar.get())
    else:
        var = float(var)
        cvar = float(cvar)

    t1 = time.time()
    return var, cvar, on_gpu, (t1 - t0)

n_assets = 10
n_paths = 200_000
alpha = 0.99

var, cvar, on_gpu, elapsed = run_mc_var_cvar(
    n_assets=n_assets,
    n_paths=n_paths,
    alpha=alpha,
    seed=42,
    rho=0.30,
    mu_value=0.0002,
    vol_value=0.01,
    use_gpu=True,  
    dtype="float32",
)

print("Device:", "CUDA (CuPy)" if on_gpu else "CPU (NumPy)")
print(f"Assets: {n_assets}, Paths: {n_paths}, alpha: {alpha}")
print(f"VaR:  {var:.6f}")
print(f"CVaR: {cvar:.6f}")
print(f"Elapsed: {elapsed:.3f} sec")