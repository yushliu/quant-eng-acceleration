import argparse
import tempfile
import unittest
from pathlib import Path

import pandas as pd

from risk_pipeline.cli.run_comparison import run_comparison


class TestComparisonWorkflow(unittest.TestCase):
    def test_comparison_outputs_are_created(self):
        root = Path(__file__).resolve().parents[1]
        returns_file = root / "results" / "daily" / "20260306T215509Z" / "returns.csv"

        with tempfile.TemporaryDirectory() as tmpdir:
            args = argparse.Namespace(
                alpha=0.99,
                window=60,
                decay_lambda=0.94,
                mc_paths=200,
                seed=9,
                run_id="test",
                returns_file=str(returns_file),
                outdir=tmpdir,
            )

            outdir, summary_df = run_comparison(args)

            self.assertEqual(len(summary_df), 3)
            self.assertEqual(set(summary_df["model"]), {"Historical Simulation", "Parametric Normal", "EWMA + Monte Carlo"})

            expected_files = {
                "portfolio_returns.csv",
                "historical_daily_risk.csv",
                "parametric_daily_risk.csv",
                "ewma_mc_daily_risk.csv",
                "comparison_summary.csv",
                "comparison_analysis.md",
            }
            self.assertTrue(expected_files.issubset({p.name for p in outdir.iterdir()}))

            history = pd.read_csv(outdir / "historical_daily_risk.csv")
            parametric = pd.read_csv(outdir / "parametric_daily_risk.csv")
            ewma = pd.read_csv(outdir / "ewma_mc_daily_risk.csv")
            self.assertEqual(len(history), len(parametric))
            self.assertEqual(len(history), len(ewma))
            self.assertTrue((history["breach_indicator"].isin([0, 1])).all())


if __name__ == "__main__":
    unittest.main()
