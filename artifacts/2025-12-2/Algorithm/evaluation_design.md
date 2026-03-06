# Evaluation Design

- Horizon: 1 trading day
- Alpha: 0.99
- Rolling design: shared rolling framework across all models
- Portfolios: identical within each experiment so model outputs remain directly comparable
- Loss convention: standardized across all models before any comparison is made
- Breach definition: standardized so breach counts and severity are not distorted by setup differences

## Primary Metrics

- Breach rate
- Breach rate gap
- Exceedance severity
- CVaR stability
- Responsiveness to volatility change
- Conservativeness

## Research Question

Which model is the most stable, most responsive, most conservative, and most suitable as the club's future benchmark baseline under a shared reproducible framework?
