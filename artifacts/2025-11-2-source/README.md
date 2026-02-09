# Daily EWMA -> MC VaR Backtest

## Install
```bash
python3 -m pip install -r requirements.txt
```

## Run (Fast mode, CI-like)
Fast mode is the default and uses small Monte Carlo path counts for quick feedback.
```bash
python -m risk_pipeline.cli.run_daily \
  --mode fast \
  --tickers "SPY,QQQ,TLT" \
  --alpha 0.99
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
