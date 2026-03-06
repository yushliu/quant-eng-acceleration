# Quantitative Engineering Acceleration Club

# Risk Team Meeting Record

## Meeting Record - Stage 2 Implementation and Preliminary Results

**Meeting Type**
Risk Team Progress Review

**Stage**
Stage 2 - Implementation + Preliminary Results

**Project Title**
Risk Model Comparison under a Reproducible Multi-Asset Framework

**Date**
2026-03-06

**Status**
Completed for baseline portfolio first run

---

# 1. Meeting Objective

This meeting recorded the completion of Stage 2 for the Risk Team project. The purpose of Stage 2 was to move from the Stage 1 design specification into an implementation-ready comparison workflow using a shared input dataset and a shared portfolio definition.

This meeting was limited to confirming that the shared `returns.csv` dataset was reused, that a common equal-weight portfolio series was constructed, that all three selected models ran successfully on the same aligned dates, that output artifacts were generated, and that the preliminary comparison table was recorded for later Stage 3 interpretation.

This meeting does not provide the final recommendation or final interpretation. Those items will be handled in Stage 3.

---

# 2. Completed Implementation Scope

## Shared Input Data

The team reused the existing `returns.csv` from the risk pipeline output and did not re-download market data.

## Shared Portfolio Construction

A common equal-weight portfolio was constructed using SPY, QQQ, TLT, and GLD with weights of 0.25 each.

## Models Implemented in Stage 2

1. Historical Simulation VaR/CVaR
2. Parametric Normal VaR/CVaR
3. EWMA + Monte Carlo VaR/CVaR

## Implementation Files

The Stage 2 comparison runner was implemented in `risk_pipeline/cli/run_comparison.py`.
The workflow verification test was added in `tests/test_comparison_workflow.py`.

The runner reuses the existing `returns.csv`, builds the equal-weight `SPY/QQQ/TLT/GLD` portfolio series, runs Historical Simulation, Parametric Normal, and repo-based EWMA + Monte Carlo on the same aligned dates, and writes the required CSV/Markdown artifacts.

---

# 3. Shared Experimental Setup

| Item | Setting |
| --- | --- |
| Input file | `returns.csv` |
| Portfolio | SPY / QQQ / TLT / GLD |
| Weighting rule | Equal weight |
| Horizon | 1-day |
| Confidence level | 0.99 |
| Rolling / init window | 60 trading days |
| Loss definition | portfolio_loss = - portfolio_return |
| Breach definition | realized loss > estimated VaR |
| Number of aligned observations | 189 |

---

# 4. Generated Output Artifacts

The Stage 2 workflow generated the following files:

- `portfolio_returns.csv`
- `historical_daily_risk.csv`
- `parametric_daily_risk.csv`
- `ewma_mc_daily_risk.csv`
- `comparison_summary.csv`
- `comparison_analysis.md`

Output directory recorded for the baseline run:

`results/comparison/20260306T220658Z`

---

# 5. Summary Comparison Table

| Model | Avg VaR | Avg CVaR | Breach Rate | Breach Gap | Exceedance Severity | CVaR Stability Proxy | N Obs | N Breaches |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Historical Simulation | 0.016231 | 0.018748 | 0.037037 | 0.027037 | 0.005207 | 0.001666 | 189 | 7 |
| Parametric Normal | 0.016414 | 0.018950 | 0.031746 | 0.021746 | 0.006153 | 0.001046 | 189 | 6 |
| EWMA + Monte Carlo | 0.017063 | 0.019541 | 0.015873 | 0.005873 | 0.008273 | 0.001979 | 189 | 3 |

---

# 6. Stage 2 Completion Check

- Reuse existing `returns.csv`: Completed
- Build equal-weight baseline portfolio: Completed
- Run Historical Simulation: Completed
- Run Parametric Normal: Completed
- Run EWMA + Monte Carlo: Completed
- Align model outputs on shared dates: Completed
- Generate summary comparison table: Completed
- Save machine-readable artifacts: Completed
- Prepare Stage 3-ready results package: Completed

---

# 7. How To Use

- Use `summary.md` when you want a very short overview of the Stage 2 run.
- Use `stage2_meeting_record.md` when you want the complete meeting-style project record.
- Use `comparison_summary.csv` for structured metrics that can be imported into charts, tables, or later analysis notebooks.
- Use `comparison_analysis.md` for a short preliminary interpretation note before Stage 3.
- Use `params.json` to confirm the shared portfolio, model set, alpha, horizon, and rolling-window configuration.

---

# 8. Verification

The implementation workflow test passed successfully.

- Verification item: comparison workflow unit test
- Command used: `./.venv/bin/python -m unittest tests.test_comparison_workflow`

---

# 9. Notes for Next Stage

Stage 3 will be responsible for interpretation of model differences, discussion of tradeoffs, evaluation on the second portfolio if required, and the final recommendation for benchmark baseline selection.

No final model recommendation is made in this Stage 2 record.

---

# 10. Meeting Outcome

Stage 2 was completed successfully for the baseline portfolio first run. The team now has a shared comparison result package that can be used as the input for Stage 3 interpretation and final comparison work.
