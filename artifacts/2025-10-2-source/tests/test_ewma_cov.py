import unittest
import warnings

import numpy as np

from risk_pipeline.models.ewma_cov import ewma_covariance

warnings.filterwarnings("error", category=RuntimeWarning)


class TestEwmaCovariance(unittest.TestCase):
    def test_shape_and_symmetry(self):
        rng = np.random.default_rng(123)
        returns = rng.normal(0, 0.01, size=(120, 3))
        cov = ewma_covariance(returns, decay_lambda=0.94, init_window=60)

        self.assertEqual(cov.shape, (3, 3))
        self.assertTrue(np.allclose(cov, cov.T, atol=1e-12))


if __name__ == "__main__":
    unittest.main()
