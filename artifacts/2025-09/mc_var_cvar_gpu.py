import numpy as np


def simulate_var_cvar(paths=200_000, assets=10, alpha=0.99, seed=7):
    rng = np.random.default_rng(seed)
    returns = rng.normal(loc=0.0002, scale=0.01, size=(paths, assets))
    weights = np.full(assets, 1.0 / assets)
    pnl = returns @ weights
    losses = -pnl

    var = np.quantile(losses, alpha)
    tail = losses[losses >= var]
    cvar = tail.mean() if tail.size else var
    return float(var), float(cvar)


if __name__ == "__main__":
    var, cvar = simulate_var_cvar()
    print(f"VaR@99: {var:.6f}")
    print(f"CVaR@99: {cvar:.6f}")
