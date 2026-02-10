# Derivatives Pricing + No-Arbitrage Pipeline

## Install
```bash
python3 -m pip install -r requirements.txt
```

## Run Pricing (Historical Sigma)
```bash
python3 -m risk_pipeline.cli.run_pricing \
  --ticker SPY \
  --start 2025-01-01 \
  --end 2026-01-01 \
  --strike 500 \
  --maturity-days 30 \
  --sigma-mode hist \
  --hist-vol-window 60 \
  --paths 200000 \
  --backend cpu \
  --run-id demo_pricing_hist
```

You can also use `python3 -m risk_pipeline.cli.run_daily ...`; it now routes to the same pricing pipeline.

## What It Does
- Downloads prices with the existing chunked yfinance download patch (`download_report.json` preserved).
- Computes log returns and historical volatility baseline sigma.
- Prices a European vanilla option with:
  - Black-Scholes closed form
  - Binomial CRR tree
  - Monte Carlo CPU
  - Monte Carlo GPU (CuPy), with graceful fallback when unavailable
- Runs no-arbitrage checks (put-call parity and static bounds).
- Writes run artifacts under `results/pricing/<run_id>/`.

## Sigma Modes
- `hist`: estimate sigma from SPY log returns (annualized).
- `fixed`: use `--sigma` directly.
- `implied_stub`: placeholder interface for future options-chain integration; currently requires `--sigma` input.

## Key CLI Arguments
- Data/download patch:
  - `--ticker`, `--start`, `--end`
  - `--enable-download-patch`, `--chunk-months`, `--cache-dir`
  - `--download-retries`, `--download-base-sleep`, `--download-jitter`
- Pricing:
  - `--option-type`, `--strike`, `--maturity-days`, `--risk-free-rate`, `--dividend-yield`
  - `--sigma-mode`, `--sigma`, `--hist-vol-window`, `--annualization`, `--min-returns-rows`
- Monte Carlo/benchmark:
  - `--paths`, `--seed`, `--backend`, `--gpu-backend`
  - `--repeat`, `--binomial-steps`

## Artifacts
Each run writes:
- `params.json`
- `download_report.json`
- `prices_aligned.csv`
- `returns.csv`
- `hist_vol.json`
- `price.json`
- `greeks.json`
- `bench.json`
- `logs.txt`
- `summary.md`
