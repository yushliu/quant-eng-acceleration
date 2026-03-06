# Model Cards

## Historical Simulation VaR/CVaR

- Type: empirical rolling-window model
- Inputs: aligned portfolio returns, rolling window definition, alpha
- Outputs: daily VaR series, daily CVaR series, breach indicators, breach statistics
- Strengths: intuitive, assumption-light, easy to explain
- Weaknesses: slow to react after sudden volatility regime shifts, depends heavily on recent sample history
- Expected behavior: relatively stable estimates in calm periods, with lagged adaptation during stress

## Parametric VaR/CVaR

- Type: moment-based model with approximate normality assumption
- Inputs: portfolio mean, covariance estimate, alpha
- Outputs: daily VaR series, daily CVaR series, breach indicators, breach statistics
- Strengths: smooth estimates, computationally efficient, easy to scale
- Weaknesses: may understate tail risk under fat-tailed or skewed return behavior
- Expected behavior: stable and efficient baseline, but potentially optimistic in stressed markets

## EWMA + Monte Carlo VaR/CVaR

- Type: volatility-sensitive scenario model
- Inputs: aligned returns, EWMA lambda, scenario count, alpha
- Outputs: daily VaR series, daily CVaR series, breach indicators, scenario-based tail metrics
- Strengths: responds faster to volatility changes, flexible scenario-based framework
- Weaknesses: more computationally expensive, requires simulation and parameter controls
- Expected behavior: quicker stress response and potentially more conservative tail estimates during volatility spikes
