# Risk

## Model Comparison Stage 1 - Research Design + Specification

## What This Build Did

- Defined the first formal comparison framework for the club's Risk Team under the existing reproducible multi-asset pipeline.
- Selected three Phase 1 risk models for comparison: Historical Simulation VaR/CVaR, Parametric VaR/CVaR, and EWMA + Monte Carlo VaR/CVaR.
- Converted the club's prior infrastructure progress into a research-oriented benchmark design by locking the model set, portfolio structure, and evaluation criteria.

## Project Objective

- The goal of this stage is not to produce final model rankings yet, but to define what a meaningful risk-model comparison should look like under a shared framework.
- The project asks which model is the most stable, most responsive, most conservative, and most suitable as the club's future benchmark baseline.
- This stage establishes the design rules needed before implementation and interpretation can begin in later updates.

## Phase 1 Model Set

- Historical Simulation VaR/CVaR: empirical rolling-window baseline using realized portfolio returns directly.
- Parametric VaR/CVaR: moment-based model using estimated mean/covariance with an approximate normality assumption.
- EWMA + Monte Carlo VaR/CVaR: volatility-sensitive scenario model aligned with the club's existing reproducible risk pipeline.

## Portfolio Design

- Baseline portfolio: SPY, QQQ, TLT, GLD with equal weights.
- Comparison portfolio: SPY, QQQ, IWM, TLT with equal weights.
- The two-portfolio setup was chosen to test whether model behavior remains consistent across a more balanced allocation and a more equity-heavy allocation.

## Evaluation Framework

- Locked the common comparison rules across models: 1-day horizon, alpha = 0.99, shared rolling design, and identical portfolio definitions within each experiment.
- Defined the main evaluation metrics: breach rate, breach rate gap, exceedance severity, CVaR stability, responsiveness to volatility change, and conservativeness.
- Standardized the loss convention and breach definition so later results reflect model behavior rather than inconsistent setup choices.

## Expected Hypotheses

- Historical Simulation is expected to be intuitive and relatively stable, but slower to react during sharp volatility changes.
- Parametric VaR/CVaR is expected to be smooth and efficient, but may understate tail risk under fat-tailed market behavior.
- EWMA + Monte Carlo is expected to respond more quickly to changing volatility and may provide more conservative tail estimates in stressed periods.

## Stage 1 Deliverables

- Completed a Stage 1 design report covering project objective, research questions, scope, model definitions, portfolio definitions, and evaluation criteria.
- Drafted model cards for all three Phase 1 models, including assumptions, inputs, outputs, strengths, weaknesses, and expected behavior.
- Established the implementation handoff for later stages so all models can be connected to the same reproducible artifact workflow.

## What You Can Use It For

- A formal blueprint for implementing the club's first true multi-model risk benchmark study.
- A shared design standard so later portfolio runs and backtests can be interpreted consistently.
- A clean transition from infrastructure milestones to a research-style comparison project with an eventual model recommendation.

## Next Step

- Implement the three selected models under the same output schema and run them on the baseline portfolio first.
- Generate preliminary daily VaR/CVaR series and backtest metrics before extending the comparison to the second portfolio.
- Use the next update to verify that all models run correctly under the shared design and to review the first cross-model differences.

## Published Artifacts

- Saved Stage 1 documentation: `stage1_report.md`, `model_cards.md`, `evaluation_design.md`, `portfolio_definition.md`.
- Saved design traceability outputs: `params.json` and `summary.md` for the selected model set, portfolio setup, and evaluation rules.
- Prepared the project for Stage 2 implementation under the existing reproducible artifact pipeline.

Independent student community. Not affiliated with or endorsed by any University. No live trading; no exchange connectivity.
