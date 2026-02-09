import tempfile
import unittest
import warnings
from pathlib import Path
from unittest.mock import patch

import pandas as pd

from risk_pipeline.cli.run_daily import main
from risk_pipeline.data.local_loader import load_prices_from_cache_dir, load_prices_local_csv

warnings.filterwarnings("error", category=RuntimeWarning)


FIXTURES = Path(__file__).parent / "fixtures"


class TestLocalLoader(unittest.TestCase):
    def test_load_prices_local_csv_single_ticker(self):
        prices = load_prices_local_csv(
            path=str(FIXTURES / "prices_single.csv"),
            tickers=["SPY"],
        )
        self.assertEqual(list(prices.columns), ["SPY"])
        self.assertTrue(pd.api.types.is_datetime64_any_dtype(prices.index))
        self.assertEqual(prices.index.name, "date")
        self.assertEqual(prices.shape[0], 8)

    def test_load_prices_local_csv_multi_ticker(self):
        prices = load_prices_local_csv(
            path=str(FIXTURES / "prices_multi.csv"),
            tickers=["SPY", "QQQ", "TLT"],
        )
        self.assertEqual(list(prices.columns), ["SPY", "QQQ", "TLT"])
        self.assertEqual(prices.shape, (8, 3))

    def test_load_prices_local_csv_missing_ticker(self):
        with self.assertRaisesRegex(ValueError, "Missing ticker columns"):
            load_prices_local_csv(
                path=str(FIXTURES / "prices_single.csv"),
                tickers=["SPY", "QQQ"],
            )

    def test_cache_dir_mode_cli_avoids_yfinance_path(self):
        cache_dir = FIXTURES / "cache_dir"
        prices = load_prices_from_cache_dir(str(cache_dir), tickers=["SPY", "QQQ"])
        self.assertEqual(prices.shape, (8, 2))

        with tempfile.TemporaryDirectory() as tmp:
            outdir = Path(tmp) / "results"
            with patch("risk_pipeline.cli.run_daily._load_prices_yfinance", side_effect=AssertionError("network path must not be used")) as mocked:
                rc = main(
                    [
                        "--tickers",
                        "SPY,QQQ",
                        "--mode",
                        "fast",
                        "--data-source",
                        "cache",
                        "--cache-dir",
                        str(cache_dir),
                        "--init-window",
                        "2",
                        "--mc-paths",
                        "500",
                        "--backtest-mc-paths",
                        "200",
                        "--run-id",
                        "cache-smoke",
                        "--outdir",
                        str(outdir),
                    ]
                )
                self.assertEqual(mocked.call_count, 0)

            self.assertEqual(rc, 0)
            self.assertTrue((outdir / "backtest.json").exists())
            self.assertTrue((outdir / "backtest_detail.csv").exists())


if __name__ == "__main__":
    unittest.main()
