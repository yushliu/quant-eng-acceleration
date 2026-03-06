# Quantitative Engineering Acceleration Club

# Risk Team Meeting Record

## Meeting Record - Stage 3 Final Comparison and Recommendation

**Meeting Type**  
Risk Team Final Review

**Stage**  
Stage 3 - Final Comparison + Recommendation

**Project Title**  
Risk Model Comparison under a Reproducible Multi-Asset Framework

**Date**  
2026-03-06

**Status**  
Completed

---

# 1. Meeting Objective

This meeting completed Stage 3 of the Risk Team project. The purpose of Stage 3 was to interpret the completed Stage 2 outputs and produce a final model comparison under the shared multi-asset framework.

The scope of this meeting included:

- reviewing the final comparison outputs,
- comparing model behavior under the shared portfolio setup,
- evaluating conservativeness, breach behavior, exceedance severity, and stability,
- identifying tradeoffs across the models,
- selecting the most appropriate benchmark baseline for future club releases.

---

# 2. Inputs Reviewed

| Input Artifact | Purpose |
| --- | --- |
| `portfolio_returns.csv` | Shared portfolio return and loss series |
| `historical_daily_risk.csv` | Daily Historical Simulation output |
| `parametric_daily_risk.csv` | Daily Parametric Normal output |
| `ewma_mc_daily_risk.csv` | Daily EWMA + Monte Carlo output |
| `comparison_summary.csv` | Combined metric summary |
| `comparison_analysis.md` | Stage 2 preliminary note |

---

# 3. Final Comparison Scope

## Models Compared

1. Historical Simulation VaR/CVaR
2. Parametric Normal VaR/CVaR
3. EWMA + Monte Carlo VaR/CVaR

## Portfolio Setup

### Baseline Portfolio

- SPY
- QQQ
- TLT
- GLD
- Equal weight

## Shared Evaluation Rules

| Item | Setting |
| --- | --- |
| Horizon | 1-day |
| Confidence level | 0.99 |
| Rolling / init window | 60 trading days |
| Loss definition | `portfolio_loss = - portfolio_return` |
| Breach definition | `realized loss > estimated VaR` |
| Number of aligned observations | 189 |

---

# 4. Final Comparison Summary Table

| Model | Avg VaR | Avg CVaR | Breach Rate | Breach Gap | Exceedance Severity | CVaR Stability Proxy | N Obs | N Breaches |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Historical Simulation | 0.016231 | 0.018748 | 0.037037 | 0.027037 | 0.005207 | 0.001666 | 189 | 7 |
| Parametric Normal | 0.016414 | 0.018950 | 0.031746 | 0.021746 | 0.006153 | 0.001046 | 189 | 6 |
| EWMA + Monte Carlo | 0.017063 | 0.019541 | 0.015873 | 0.005873 | 0.008273 | 0.001979 | 189 | 3 |

---

# 5. Metric Ranking Table

| Metric | Most Favorable | Middle | Least Favorable |
| --- | --- | --- | --- |
| Conservativeness (Avg VaR) | EWMA + Monte Carlo | Parametric Normal | Historical Simulation |
| Conservativeness (Avg CVaR) | EWMA + Monte Carlo | Parametric Normal | Historical Simulation |
| Coverage closeness (smallest breach gap) | EWMA + Monte Carlo | Parametric Normal | Historical Simulation |
| Smoothness (smallest CVaR stability proxy) | Parametric Normal | Historical Simulation | EWMA + Monte Carlo |
| Smallest exceedance severity | Historical Simulation | Parametric Normal | EWMA + Monte Carlo |

---

# 6. Text Graphs

## 6.1 Average VaR

```text
Historical Simulation  0.016231  ██████████████████
Parametric Normal      0.016414  ███████████████████
EWMA + Monte Carlo     0.017063  █████████████████████
```

## 6.2 Average CVaR

```text
Historical Simulation  0.018748  ██████████████████
Parametric Normal      0.018950  ███████████████████
EWMA + Monte Carlo     0.019541  █████████████████████
```

## 6.3 Breach Rate

Expected breach rate at alpha = 0.99 is 0.010000.

```text
Historical Simulation  0.037037  █████████████████████████████████
Parametric Normal      0.031746  ████████████████████████████
EWMA + Monte Carlo     0.015873  ██████████████
Expected               0.010000  █████████
```

## 6.4 Breach Gap

```text
Historical Simulation  0.027037  ███████████████████████████
Parametric Normal      0.021746  ██████████████████████
EWMA + Monte Carlo     0.005873  ██████
```

## 6.5 Exceedance Severity

```text
Historical Simulation  0.005207  ███████████
Parametric Normal      0.006153  █████████████
EWMA + Monte Carlo     0.008273  █████████████████
```

## 6.6 CVaR Stability Proxy

Lower is smoother.

```text
Parametric Normal      0.001046  █████████
Historical Simulation  0.001666  ███████████████
EWMA + Monte Carlo     0.001979  █████████████████
```

## 6.7 Number of Breaches

```text
Historical Simulation  7  ███████
Parametric Normal      6  ██████
EWMA + Monte Carlo     3  ███
```

---

# 7. Interpretation by Model

## 7.1 Historical Simulation

| Category | Observation |
| --- | --- |
| Average VaR / CVaR | Lowest among the three |
| Coverage | Highest breach rate and highest breach count |
| Strength | Direct empirical baseline and lowest exceedance severity |
| Weakness | Least conservative and furthest from the expected 1% breach target |
| Role | Useful reference baseline, but not the strongest primary benchmark candidate |

## 7.2 Parametric Normal

| Category | Observation |
| --- | --- |
| Average VaR / CVaR | Slightly above Historical Simulation |
| Coverage | Better than Historical Simulation, but still materially above target |
| Strength | Smoothest output path and smallest CVaR stability proxy |
| Weakness | Likely still understates tail behavior relative to the dynamic model |
| Role | Best smooth reference model |

## 7.3 EWMA + Monte Carlo

| Category | Observation |
| --- | --- |
| Average VaR / CVaR | Highest among the three |
| Coverage | Closest breach behavior to the intended 1% rate |
| Strength | Most conservative and strongest coverage behavior |
| Weakness | Highest exceedance severity and least smooth CVaR path |
| Role | Strongest primary benchmark candidate under the tested setup |

---

# 8. Stage 1 Hypothesis Review

| Stage 1 Hypothesis | Final Observation | Status |
| --- | --- | --- |
| Historical Simulation may react more slowly | Highest breach count and lowest VaR/CVaR | Supported |
| Parametric Normal may be smoother but understate tail risk | Smoothest output, but breach rate still above target | Supported |
| EWMA + Monte Carlo may be more responsive and more conservative | Highest VaR/CVaR and closest breach behavior to 1% | Supported |
| The models may differ in breach behavior and severity | Clear differences appeared in both metrics | Supported |

---

# 9. Tradeoff Discussion

## 9.1 Conservativeness vs Smoothness

EWMA + Monte Carlo was the most conservative model, but Parametric Normal was the smoothest. This showed a clear tradeoff between dynamic responsiveness and output stability.

## 9.2 Coverage Accuracy vs Simplicity

Historical Simulation and Parametric Normal are easier to explain, but both produced breach rates much higher than the expected level. EWMA + Monte Carlo is more complex, but delivered the closest coverage behavior.

## 9.3 Empirical Baseline vs Dynamic Baseline

Historical Simulation remains useful as an empirical benchmark, while EWMA + Monte Carlo behaves more like a dynamic production-style risk engine.

---

# 10. Final Recommendation

## Recommended Benchmark Baseline

**EWMA + Monte Carlo**

### Why

- Highest average VaR and CVaR
- Lowest breach count
- Smallest breach gap
- Best alignment with the intended 99% coverage target

## Recommended Smooth Reference Model

**Parametric Normal**

### Why

- Smallest CVaR stability proxy
- Most stable output path
- Useful as a clean and interpretable benchmark reference

## Recommended Empirical Baseline

**Historical Simulation**

### Why

- Direct and intuitive empirical method
- Useful as a transparent comparison model
- Appropriate as a baseline reference, but not as the primary benchmark release candidate under the tested setup

---

# 11. Final Decision Table

| Category | Recommended Model | Rationale |
| --- | --- | --- |
| Primary benchmark baseline | EWMA + Monte Carlo | Best conservativeness and closest breach behavior to target |
| Smoothest reference model | Parametric Normal | Lowest stability proxy |
| Best empirical baseline | Historical Simulation | Most direct empirical comparison method |
| Most conservative model | EWMA + Monte Carlo | Highest average VaR/CVaR |

---

# 12. Limitations

| Limitation | Why It Matters |
| --- | --- |
| Only one portfolio tested | Results may depend on this portfolio composition |
| Fixed parameter setup | Alternative windows or MC sizes may change relative behavior |
| Limited breach count for some models | Exceedance severity should be interpreted with caution |
| No second-portfolio robustness check yet | Cross-allocation stability remains untested |

---

# 13. How To Use

| File | How To Use It |
| --- | --- |
| `stage3_meeting_record.md` | Read the full final-review narrative with tables, rankings, recommendation, and text graphs |
| `stage3_comparison_summary.csv` | Import the final model metrics into charts, dashboards, or later analysis scripts |
| `stage3_ranking_table.csv` | Use the recommendation-oriented ranking table for summary slides or milestone recaps |
| `summary.md` | Read the short top-level outcome quickly |

---

# 14. Meeting Outcome

Stage 3 completed the first full risk-model comparison cycle for the Risk Team project. The team reviewed the final outputs, interpreted the main differences, and selected a recommended baseline for future club benchmark releases.

Under the current tested setup, EWMA + Monte Carlo is the strongest candidate for the club's primary benchmark baseline, Parametric Normal is the smoothest reference model, and Historical Simulation remains the main empirical baseline.
