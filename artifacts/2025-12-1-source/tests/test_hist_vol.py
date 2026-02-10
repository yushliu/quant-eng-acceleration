import unittest

import numpy as np
import pandas as pd

from risk_pipeline.volatility.historical import estimate_hist_vol


class TestHistVol(unittest.TestCase):
    def test_annualization_scaling_and_window(self):
        rng = np.random.default_rng(123)
        returns = pd.Series(rng.normal(0.0, 0.01, size=120), index=pd.date_range("2024-01-01", periods=120, freq="B"))

        out = estimate_hist_vol(returns=returns, window=60, annualization=252, min_returns_rows=30)
        expected_daily = float(returns.iloc[-60:].std(ddof=1))
        expected_annual = expected_daily * np.sqrt(252)

        self.assertAlmostEqual(out["sigma_daily"], expected_daily, places=12)
        self.assertAlmostEqual(out["sigma_annual"], expected_annual, places=12)
        self.assertEqual(out["window_used"], 60)
        self.assertEqual(out["num_returns"], 120)


if __name__ == "__main__":
    unittest.main()
