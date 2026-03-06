# Risk

## Model Comparison Stage 1 - Research Design + Specification

Stage 1 defines the club's first formal multi-model risk benchmark framework under the reproducible multi-asset pipeline.

- Locked the Phase 1 model set: Historical Simulation VaR/CVaR, Parametric VaR/CVaR, and EWMA + Monte Carlo VaR/CVaR.
- Locked the portfolio setup: baseline portfolio `SPY,QQQ,TLT,GLD` and comparison portfolio `SPY,QQQ,IWM,TLT`, both equal weight.
- Locked the evaluation framework: 1-day horizon, `alpha = 0.99`, shared rolling design, identical portfolio definitions, and common loss/breach conventions.
- Defined the comparison metrics: breach rate, breach rate gap, exceedance severity, CVaR stability, responsiveness to volatility change, and conservativeness.
- Prepared the implementation handoff for Stage 2 so all models can be run under the same artifact workflow and interpreted on a consistent basis.

Independent student community. Not affiliated with or endorsed by any University. No live trading; no exchange connectivity.
