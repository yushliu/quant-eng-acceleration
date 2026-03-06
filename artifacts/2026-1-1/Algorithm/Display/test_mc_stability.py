import unittest
import warnings

import numpy as np

from risk_pipeline.models.ewma_cov import ewma_covariance
from risk_pipeline.risk.mc_sim import simulate_returns, simulate_portfolio_losses
from risk_pipeline.risk.var_cvar import compute_var_cvar

warnings.filterwarnings("error", category=RuntimeWarning)


class TestMcStability(unittest.TestCase):
    def test_finite_scenarios_and_metrics(self):
        rng = np.random.default_rng(321)
        returns = rng.normal(0.0001, 0.01, size=(100, 3))
        cov = ewma_covariance(returns, decay_lambda=0.94, init_window=40)

        self.assertTrue(np.allclose(cov, cov.T, atol=1e-12))

        scenarios = simulate_returns(cov=cov, num_paths=1000, seed=9)
        self.assertTrue(np.isfinite(scenarios).all())

        w = np.array([0.34, 0.33, 0.33], dtype=float)
        losses = simulate_portfolio_losses(cov=cov, weights=w, num_paths=1000, seed=9)
        var, cvar = compute_var_cvar(losses, alpha=0.99)

        self.assertTrue(np.isfinite(var))
        self.assertTrue(np.isfinite(cvar))


if __name__ == "__main__":
    unittest.main()
