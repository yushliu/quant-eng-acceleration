"""Lightweight quant-style dtcnumpy examples."""

from __future__ import annotations

import dtcnumpy as dnp


def section(title: str) -> None:
    print(f"\n=== {title} ===")


def main() -> None:
    section("Portfolio Weighted Return")
    print("This shows how dtype semantics can change a portfolio-style aggregation.")
    weights = dnp.array([0.15, 0.20, 0.25, 0.40])
    asset_returns = dnp.array([0.0115, -0.0062, 0.0048, 0.0131])
    portfolio_return = dnp.dot(weights, asset_returns)
    dnp.print(portfolio_return)

    section("Tail-Style Quantile Check")
    print("This highlights how reduced precision can move a downside quantile.")
    scenario_pnl = dnp.array([-0.031, 0.014, -0.022, -0.087, 0.009, -0.041, 0.003, -0.065])
    tail_quantile = dnp.quantile(scenario_pnl, 0.10)
    dnp.print(tail_quantile)

    section("Small Matrix Aggregation")
    print("This is a compact matrix example relevant to factor-style transformations.")
    exposures = dnp.array([[1.10, -0.25], [0.80, 0.40], [1.35, -0.10]])
    shocks = dnp.array([[0.015, -0.020, 0.010], [-0.005, 0.012, 0.018]])
    aggregated = dnp.mean(dnp.matmul(exposures, shocks))
    dnp.print(aggregated)


if __name__ == "__main__":
    main()
