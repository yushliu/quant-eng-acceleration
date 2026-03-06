import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import pandas as pd

from risk_pipeline.data.download_patch import (
    download_prices_chunked,
    generate_chunk_windows,
    merge_ticker_frames,
    stitch_ticker_chunks,
)


class TestDownloadPatch(unittest.TestCase):
    def test_generate_chunk_windows_three_months(self):
        windows = generate_chunk_windows(start="2021-01-01", end="2022-01-01", chunk_months=3)
        self.assertEqual(
            windows,
            [
                ("2021-01-01", "2021-04-01"),
                ("2021-04-01", "2021-07-01"),
                ("2021-07-01", "2021-10-01"),
                ("2021-10-01", "2022-01-01"),
            ],
        )

    def test_stitch_ticker_chunks_deduplicates_index(self):
        idx1 = pd.to_datetime(["2021-01-01", "2021-01-04", "2021-01-05"])
        idx2 = pd.to_datetime(["2021-01-05", "2021-01-06"])
        a = pd.DataFrame({"SPY": [100.0, 101.0, 102.0]}, index=idx1)
        b = pd.DataFrame({"SPY": [103.0, 104.0]}, index=idx2)
        a.index.name = "date"
        b.index.name = "date"

        stitched = stitch_ticker_chunks("SPY", [a, b])
        self.assertEqual(list(stitched.index.astype(str)), ["2021-01-01", "2021-01-04", "2021-01-05", "2021-01-06"])
        self.assertEqual(float(stitched.loc[pd.Timestamp("2021-01-05"), "SPY"]), 103.0)

    def test_chunk_cache_behavior(self):
        call_count = {"n": 0}

        def _fake_download(*, tickers, start, end, **kwargs):
            call_count["n"] += 1
            idx = pd.date_range(start=start, periods=3, freq="B")
            return pd.DataFrame({"Close": [100.0, 101.0, 102.0]}, index=idx)

        with tempfile.TemporaryDirectory() as tmp:
            cache_root = Path(tmp) / "cache"
            with patch("risk_pipeline.data.download_patch.yf.download", side_effect=_fake_download):
                prices1, _, _, report1 = download_prices_chunked(
                    tickers=["SPY"],
                    start="2021-01-01",
                    end="2021-07-01",
                    cache_root=cache_root,
                    chunk_months=3,
                    retries=0,
                    use_cache=True,
                    offline=False,
                )
                prices2, _, _, report2 = download_prices_chunked(
                    tickers=["SPY"],
                    start="2021-01-01",
                    end="2021-07-01",
                    cache_root=cache_root,
                    chunk_months=3,
                    retries=0,
                    use_cache=True,
                    offline=True,
                )

        self.assertEqual(call_count["n"], 2)
        self.assertFalse(any(row["cache_hit"] for row in report1["chunks"]))
        self.assertTrue(all(row["cache_hit"] for row in report2["chunks"]))
        self.assertEqual(list(prices1.columns), ["SPY"])
        self.assertEqual(list(prices2.columns), ["SPY"])

    def test_multi_asset_merge_wide(self):
        def _fake_download(*, tickers, start, end, **kwargs):
            idx = pd.date_range(start=start, periods=4, freq="B")
            base = 100.0 if tickers == "SPY" else 200.0
            return pd.DataFrame({"Close": [base + i for i in range(4)]}, index=idx)

        with tempfile.TemporaryDirectory() as tmp:
            with patch("risk_pipeline.data.download_patch.yf.download", side_effect=_fake_download):
                prices, _, _, report = download_prices_chunked(
                    tickers=["SPY", "QQQ", "TLT"],
                    start="2021-01-01",
                    end="2022-01-01",
                    cache_root=Path(tmp) / "cache",
                    chunk_months=3,
                    retries=0,
                    use_cache=False,
                    offline=False,
                )

        self.assertEqual(list(prices.columns), ["SPY", "QQQ", "TLT"])
        self.assertEqual(report["summary"]["total_chunks"], 12)
        self.assertEqual(report["summary"]["failed"], 0)

    def test_merge_ticker_frames_wide(self):
        idx = pd.to_datetime(["2021-01-01", "2021-01-04"])
        a = pd.DataFrame({"SPY": [100.0, 101.0]}, index=idx)
        b = pd.DataFrame({"QQQ": [200.0, 201.0]}, index=idx)
        a.index.name = "date"
        b.index.name = "date"

        merged = merge_ticker_frames({"SPY": a, "QQQ": b}, tickers=["SPY", "QQQ"])
        self.assertEqual(list(merged.columns), ["SPY", "QQQ"])
        self.assertEqual(merged.index.name, "date")


if __name__ == "__main__":
    unittest.main()
