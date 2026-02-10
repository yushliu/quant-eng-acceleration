import tempfile
import unittest
import json
from pathlib import Path
from unittest.mock import patch

import numpy as np
import pandas as pd

from risk_pipeline.cli.run_pricing import main


class TestPricingPipelineSmoke(unittest.TestCase):
    def test_run_pricing_writes_required_artifacts(self):
        dates = pd.date_range("2025-01-01", periods=90, freq="B")
        rng = np.random.default_rng(7)
        rets = rng.normal(0.0002, 0.01, size=len(dates))
        prices = 500.0 * np.exp(np.cumsum(rets))
        prices_df = pd.DataFrame({"SPY": prices}, index=dates)
        prices_df.index.name = "date"

        fake_metadata = {"cache_hit": True, "yfinance_version": "mock"}
        fake_download_report = {
            "chunks": [],
            "summary": {
                "total_chunks": 0,
                "succeeded": 0,
                "failed": 0,
                "cache_hits": 0,
                "total_retries": 0,
            },
        }

        with tempfile.TemporaryDirectory() as tmp:
            outdir = Path(tmp) / "results"
            with patch(
                "risk_pipeline.cli.run_pricing.download_prices_chunked",
                return_value=(prices_df, fake_metadata, Path(tmp) / "cache", fake_download_report),
            ):
                rc = main(
                    [
                        "--ticker",
                        "SPY",
                        "--start",
                        "2025-01-01",
                        "--end",
                        "2025-06-01",
                        "--option-type",
                        "call",
                        "--strike",
                        "500",
                        "--maturity-days",
                        "30",
                        "--sigma-mode",
                        "hist",
                        "--hist-vol-window",
                        "60",
                        "--annualization",
                        "252",
                        "--paths",
                        "30000",
                        "--seed",
                        "42",
                        "--backend",
                        "cpu",
                        "--repeat",
                        "1",
                        "--binomial-steps",
                        "200",
                        "--run-id",
                        "smoke_pricing",
                        "--outdir",
                        str(outdir),
                    ]
                )

            self.assertEqual(rc, 0)
            expected = [
                "params.json",
                "download_report.json",
                "prices_aligned.csv",
                "returns.csv",
                "hist_vol.json",
                "price.json",
                "greeks.json",
                "bench.json",
                "logs.txt",
                "summary.md",
            ]
            for name in expected:
                self.assertTrue((outdir / name).exists(), msg=f"missing {name}")

            with (outdir / "params.json").open("r", encoding="utf-8") as f:
                params = json.load(f)
            self.assertEqual(params["ticker"], "SPY")

            with (outdir / "hist_vol.json").open("r", encoding="utf-8") as f:
                hist = json.load(f)
            self.assertIn("sigma_annual", hist)
            self.assertIn("window_used", hist)

            with (outdir / "price.json").open("r", encoding="utf-8") as f:
                price = json.load(f)
            self.assertIn("bs", price)
            self.assertIn("binomial", price)
            self.assertIn("mc", price)
            self.assertIn("no_arbitrage", price)

            with (outdir / "bench.json").open("r", encoding="utf-8") as f:
                bench = json.load(f)
            self.assertIn("black_scholes", bench)
            self.assertIn("binomial", bench)
            self.assertIn("mc_cpu", bench)


if __name__ == "__main__":
    unittest.main()
