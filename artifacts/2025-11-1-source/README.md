# Daily EWMA -> MC VaR Backtest

## Install
```bash
python3 -m pip install -r requirements.txt
```

## GPU setup (optional)
GPU support is optional and requires a CUDA-compatible CuPy build installed separately.
```bash
python3 -m pip install cupy-cuda12x
```
Pick the `cupy-cudaXX` package matching your CUDA runtime/driver.

## Offline / Local dataset
In cloud/CI environments, yfinance can return rate-limit errors (for example `YFRateLimitError: Too Many Requests`).
When this happens, use local cached files to avoid network calls.

CPU run from a local prices file:
```bash
python -m risk_pipeline.cli.run_daily \
  --mode fast \
  --tickers "SPY" \
  --data-source local \
  --data-path datasets/yfinance_cache/004ea406ea8b109c/prices.csv \
  --backend cpu
```

GPU run from a local prices file:
```bash
python -m risk_pipeline.cli.run_daily \
  --mode fast \
  --tickers "SPY" \
  --data-source local \
  --data-path datasets/yfinance_cache/004ea406ea8b109c/prices.csv \
  --backend gpu \
  --gpu-device 0 \
  --bench --bench-warmup 1 --bench-repeat 3
```

Run directly from a cache folder containing `prices.csv` and optional `metadata.json`:
```bash
python -m risk_pipeline.cli.run_daily \
  --mode fast \
  --tickers "SPY" \
  --data-source cache \
  --cache-dir datasets/yfinance_cache/004ea406ea8b109c \
  --backend cpu
```

## Run (Fast mode, CI-like)
Fast mode is the default and uses small Monte Carlo path counts for quick feedback.
```bash
python -m risk_pipeline.cli.run_daily \
  --mode fast \
  --tickers "SPY,QQQ,TLT" \
  --alpha 0.99 \
  --backend cpu
```

## Run with GPU + benchmark
```bash
python -m risk_pipeline.cli.run_daily \
  --mode fast \
  --tickers "SPY" \
  --backend gpu \
  --gpu-device 0 \
  --bench \
  --bench-warmup 3 \
  --bench-repeat 10
```

## Run (Full mode, release-like)
Full mode defaults to a 10-year daily window ending today, with larger MC settings.
```bash
python -m risk_pipeline.cli.run_daily \
  --mode full \
  --tickers "SPY,QQQ,TLT" \
  --alpha 0.99
```

You can still override explicit values (for example `--start`, `--end`, `--mc-paths`, `--backtest-mc-paths`).

## Debug output
By default, no `[DBG]` lines are printed.
To enable numerical debug traces from Monte Carlo internals:
```bash
python -m risk_pipeline.cli.run_daily --mode fast --debug
```

## Backtest artifacts
Each run writes under `results/daily/<run_id>/` and includes:
- `backtest.json`: summary metrics (breach rate, Kupiec POF, clustering stats)
- `backtest_detail.csv`: per-day rows with `date,var,realized_loss,breach`

## Kupiec POF interpretation
`kupiec_p_value` tests whether observed breach frequency matches expected VaR coverage.
A low p-value suggests the VaR model coverage is likely miscalibrated.
