# yfinance Rate Limit Patch + Multi-Asset Download Stitching

Patch scope: chunked download + retry + cache + stitching for multi-asset inputs
Chunk rule: 1 ticker x 3 months
Verification run: tickers=SPY,QQQ,TLT range=2025-01-01..2026-01-01
Expected chunks: 12 (3 tickers x 4 windows)
Validation: tests/test_download_patch.py -> 5 passed

Artifacts focus:
- Added `download_report.json` support in the pipeline for per-chunk outcomes.
- Kept VaR/CVaR/backtest compute path unchanged (data layer patch only).
- Preserved wide-table outputs for `prices_aligned.csv` and `returns.csv`.
