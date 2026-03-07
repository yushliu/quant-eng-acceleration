"""Operation-level dtcnumpy examples for meeting demos."""

from __future__ import annotations

import dtcnumpy as dnp


def section(title: str) -> None:
    print(f"\n=== {title} ===")


def main() -> None:
    section("Mean on a Small Vector")
    x = dnp.array([1.001, 1.002, 1.003, 1.004])
    mean_result = dnp.mean(x)
    dnp.print(mean_result)

    section("Dot Product Drift")
    weights = dnp.array([0.10, 0.25, 0.30, 0.35])
    returns = dnp.array([0.0123, -0.0045, 0.0088, 0.0151])
    dot_result = dnp.dot(weights, returns)
    dnp.print(dot_result)

    section("Quantile on a Loss-Like Vector")
    losses = dnp.array([-0.02, 0.01, -0.05, 0.03, -0.08, 0.00, -0.015])
    tail_cut = dnp.quantile(losses, 0.10)
    dnp.print(tail_cut)


if __name__ == "__main__":
    main()
