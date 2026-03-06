# Meeting Record - Stage 2 Implementation and Preliminary Results

- Reused the existing `returns.csv` dataset and built a shared equal-weight portfolio using SPY, QQQ, TLT, and GLD.
- Ran Historical Simulation, Parametric Normal, and EWMA + Monte Carlo on the same aligned dates under a shared 1-day, 99 percent, 60-day rolling setup.
- Generated a preliminary comparison package for the baseline portfolio first run and deferred final interpretation to Stage 3.
- Main implementation entrypoint: `risk_pipeline/cli/run_comparison.py`.
- Workflow verification test: `tests/test_comparison_workflow.py`.
