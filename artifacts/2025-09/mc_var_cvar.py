import numpy as np

def simulate_returns(n_assets: int, n_paths: int, seed: int = 42):
    """
    Simulate one-period returns using a synthetic multivariate normal model.
    Returns shape: (n_paths, n_assets)
    """
    rng = np.random.default_rng(seed)

    mu = np.full(n_assets, 0.0002)
    vol = np.full(n_assets, 0.01)

    rho = 0.30
    corr = np.full((n_assets, n_assets), rho)
    np.fill_diagonal(corr, 1.0)

    cov = np.outer(vol, vol) * corr

    returns = rng.multivariate_normal(mean=mu, cov=cov, size=n_paths)
    return returns


def portfolio_pnl(weights: np.ndarray, returns: np.ndarray):
    """
    Compute portfolio PnL (here, portfolio return) for each path.
    weights shape: (n_assets,)
    returns shape: (n_paths, n_assets)
    output shape: (n_paths,)
    """
    weights = np.asarray(weights, dtype=float)
    weights = weights / np.sum(weights)
    return returns @ weights


def var_cvar(pnl: np.ndarray, alpha: float = 0.99):
    """
    Compute VaR and CVaR from PnL distribution.
    Define loss = -PnL. VaR is alpha-quantile of loss.
    """
    pnl = np.asarray(pnl, dtype=float)
    loss = -pnl

    var = np.quantile(loss, alpha)
    tail = loss[loss >= var]
    cvar = tail.mean() if tail.size > 0 else var
    return var, cvar


if __name__ == "__main__":
    n_assets = 10
    n_paths = 200_000
    alpha = 0.99

    rets = simulate_returns(n_assets, n_paths, seed=42)
    w = np.ones(n_assets)
    pnl = portfolio_pnl(w, rets)
    var, cvar = var_cvar(pnl, alpha=alpha)

    print(f"Assets: {n_assets}, Paths: {n_paths}, alpha: {alpha}")
    print(f"VaR:  {var:.6f}")
    print(f"CVaR: {cvar:.6f}")
