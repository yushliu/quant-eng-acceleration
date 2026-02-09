import unittest
import warnings

import numpy as np

from risk_pipeline.compute.backend import BackendError, get_backend
from risk_pipeline.models.ewma_cov import ewma_covariance
from risk_pipeline.risk.mc_sim import simulate_portfolio_losses
from risk_pipeline.risk.var_cvar import compute_var_cvar

warnings.filterwarnings("error", category=RuntimeWarning)


class TestGpuOptional(unittest.TestCase):
    def setUp(self):
        try:
            self.backend = get_backend("gpu", device_id=0)
        except BackendError as exc:
            self.skipTest(str(exc))

    def test_gpu_losses_finite_and_shape(self):
        rng = np.random.default_rng(11)
        returns = rng.normal(0.0001, 0.01, size=(120, 3))
        cov = ewma_covariance(returns, decay_lambda=0.94, init_window=40)
        w = np.array([0.4, 0.3, 0.3], dtype=float)

        losses_gpu = simulate_portfolio_losses(
            cov=self.backend.asarray(cov, dtype=np.float64),
            weights=w,
            num_paths=256,
            seed=9,
            backend=self.backend,
        )
        losses_np = self.backend.to_numpy(losses_gpu)
        self.assertEqual(losses_np.shape, (256,))
        self.assertTrue(np.isfinite(losses_np).all())

    def test_gpu_cpu_metrics_consistent(self):
        rng = np.random.default_rng(13)
        returns = rng.normal(0.0001, 0.01, size=(160, 3))
        cov = ewma_covariance(returns, decay_lambda=0.94, init_window=60)
        w = np.array([0.34, 0.33, 0.33], dtype=float)

        losses_cpu = simulate_portfolio_losses(cov=cov, weights=w, num_paths=20_000, seed=23)
        losses_gpu = simulate_portfolio_losses(
            cov=self.backend.asarray(cov, dtype=np.float64),
            weights=w,
            num_paths=20_000,
            seed=23,
            backend=self.backend,
        )
        var_cpu, cvar_cpu = compute_var_cvar(losses_cpu, alpha=0.99)
        var_gpu, cvar_gpu = compute_var_cvar(self.backend.to_numpy(losses_gpu), alpha=0.99)

        self.assertGreaterEqual(cvar_gpu, var_gpu)
        rel_var = abs(var_cpu - var_gpu) / max(abs(var_cpu), 1e-12)
        rel_cvar = abs(cvar_cpu - cvar_gpu) / max(abs(cvar_cpu), 1e-12)
        self.assertLess(rel_var, 0.10)
        self.assertLess(rel_cvar, 0.10)


if __name__ == "__main__":
    unittest.main()
