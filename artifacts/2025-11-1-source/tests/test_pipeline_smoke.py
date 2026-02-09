import tempfile
import unittest
import warnings
from pathlib import Path
from unittest.mock import patch

import numpy as np
import pandas as pd

from risk_pipeline.cli.run_daily import main

warnings.filterwarnings("error", category=RuntimeWarning)


class TestPipelineSmoke(unittest.TestCase):
    def test_run_daily_fast_writes_artifacts(self):
        dates = pd.date_range("2021-01-01", periods=120, freq="B")
        rng = np.random.default_rng(100)
        rets = rng.normal(0.0002, 0.01, size=(len(dates), 3))
        prices = 100 * np.exp(np.cumsum(rets, axis=0))
        prices_df = pd.DataFrame(prices, index=dates, columns=["SPY", "QQQ", "TLT"])
        prices_df.index.name = "date"

        fake_metadata = {
            "cache_hit": True,
            "yfinance_version": "mock",
        }

        with tempfile.TemporaryDirectory() as tmp:
            outdir = Path(tmp) / "results"
            with patch("risk_pipeline.cli.run_daily._load_prices_yfinance", return_value=(prices_df, fake_metadata, Path(tmp) / "cache")):
                rc = main(
                    [
                        "--tickers",
                        "SPY,QQQ,TLT",
                        "--mode",
                        "fast",
                        "--offline",
                        "--start",
                        "2021-01-01",
                        "--end",
                        "2021-07-01",
                        "--alpha",
                        "0.99",
                        "--mc-paths",
                        "3000",
                        "--backtest-mc-paths",
                        "500",
                        "--seed",
                        "42",
                        "--run-id",
                        "smoke",
                        "--outdir",
                        str(outdir),
                    ]
                )

            self.assertEqual(rc, 0)
            expected = [
                "params.json",
                "var_cvar.json",
                "backtest.json",
                "backtest_detail.csv",
                "logs.txt",
                "cov.npy",
                "tickers.csv",
            ]
            for name in expected:
                self.assertTrue((outdir / name).exists(), msg=f"missing {name}")


if __name__ == "__main__":
    unittest.main()
