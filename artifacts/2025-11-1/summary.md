# Daily EWMA -> MC VaR Backtest

Data: tickers=SPY rows=130 range=2025-08-04..2026-02-06
Model: EWMA lambda=0.94 init_window=60
MC: paths=3000 alpha=0.99 seed=9
Backtest: breach_rate=0.014493 expected_rate=0.010000 obs=69

GPU run: run_id=20260209T183326Z backend=gpu device=0
GPU result: VaR=0.01877217 CVaR=0.02096967
CPU baseline (same data/params): VaR=0.01922933 CVaR=0.02183821
