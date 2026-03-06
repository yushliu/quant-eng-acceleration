import unittest
import warnings

import numpy as np

from risk_pipeline.risk.var_cvar import compute_var_cvar

warnings.filterwarnings("error", category=RuntimeWarning)


class TestVarCvar(unittest.TestCase):
    def test_cvar_greater_or_equal_var(self):
        rng = np.random.default_rng(7)
        losses = rng.normal(loc=0.0, scale=1.0, size=50_000)
        var, cvar = compute_var_cvar(losses, alpha=0.99)
        self.assertGreaterEqual(cvar, var)


if __name__ == "__main__":
    unittest.main()
