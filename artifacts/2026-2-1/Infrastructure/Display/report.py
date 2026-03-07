"""Reporting utilities for Stage 2, Stage 3, and Stage 4 summaries."""

from __future__ import annotations

import builtins

import numpy as np

from .core import DTCArray, asarray
from .dtypes import SUPPORTED_DTYPES


def _safe_rel_diff_percent(diff: np.ndarray, reference: np.ndarray) -> np.ndarray:
    denom = np.where(np.abs(reference) > 0.0, np.abs(reference), 1.0)
    return (np.abs(diff) / denom) * 100.0


def print_table(x: DTCArray) -> None:
    """Print a readable comparison table against the FP64 reference."""
    arr = asarray(x)
    reference = arr.versions["fp64"]
    is_scalar = reference.ndim == 0

    if is_scalar:
        builtins.print(f"{'datatype':<10} {'value':>16} {'diff_vs_fp64':>16} {'diff_pct_vs_fp64':>18}")
        ref_value = float(reference)
        for dtype in SUPPORTED_DTYPES:
            value = float(arr.versions[dtype])
            diff = value - ref_value
            rel_pct = float(_safe_rel_diff_percent(np.asarray(diff), np.asarray(ref_value)))
            builtins.print(f"{dtype:<10} {value:>16.8g} {diff:>16.8g} {rel_pct:>18.8g}")
        return

    builtins.print(
        f"{'datatype':<10} {'shape':>12} {'mean_abs_diff_vs_fp64':>24} "
        f"{'max_abs_diff_vs_fp64':>22} {'mean_rel_diff_pct_vs_fp64':>27}"
    )
    for dtype in SUPPORTED_DTYPES:
        values = arr.versions[dtype]
        diff = values - reference
        rel_pct = _safe_rel_diff_percent(diff, reference)
        builtins.print(
            f"{dtype:<10} {str(values.shape):>12} "
            f"{float(np.mean(np.abs(diff))):>24.8g} "
            f"{float(np.max(np.abs(diff))):>22.8g} "
            f"{float(np.mean(rel_pct)):>27.8g}"
        )


def render_stage4_report(runs: list[object]) -> str:
    """Render the Stage 4 benchmark summary as markdown."""
    lines = [
        "# Stage 4 Benchmark Report",
        "",
        "## Objective",
        "Stage 4 compares short fixed numerical workflows against the fp64 reference.",
        "",
        "## Workflows Included",
        "- `matmul_then_mean`",
        "- `matmul_clip_sum`",
        "- `outer_then_quantile`",
        "- `einsum_then_mean`",
        "",
        "## Reference Policy",
        "- `fp64` is the reference output for all comparisons.",
        "",
        "## Input Overview",
    ]

    for run in runs:
        shape_summary = ", ".join(f"{name}: {shape}" for name, shape in run.input_shapes.items())
        lines.append(f"- `{run.workflow}`: {shape_summary}")

    lines.extend(["", "## Workflow Summaries"])

    best_rows: list[tuple[str, str, float]] = []
    worst_rows: list[tuple[str, str, float]] = []
    integer_rows: list[tuple[str, str, float]] = []

    for run in runs:
        lines.extend(
            [
                "",
                f"### `{run.workflow}`",
                "",
                "| dtype | abs_error | rel_error | mean_abs_error | max_abs_error | rmse | finite_ratio | same_shape |",
                "| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |",
            ]
        )
        for dtype in SUPPORTED_DTYPES:
            metrics = run.metrics[dtype]
            lines.append(
                f"| {dtype} | {metrics['abs_error']:.8g} | {metrics['rel_error']:.8g} | "
                f"{metrics['mean_abs_error']:.8g} | {metrics['max_abs_error']:.8g} | "
                f"{metrics['rmse']:.8g} | {metrics['finite_ratio']:.8g} | {metrics['same_shape']} |"
            )

        non_reference = [(dtype, run.metrics[dtype]["rmse"]) for dtype in SUPPORTED_DTYPES if dtype != "fp64"]
        best_dtype, best_rmse = min(non_reference, key=lambda item: item[1])
        worst_dtype, worst_rmse = max(non_reference, key=lambda item: item[1])
        best_rows.append((run.workflow, best_dtype, best_rmse))
        worst_rows.append((run.workflow, worst_dtype, worst_rmse))
        integer_scores = [(dtype, run.metrics[dtype]["rmse"]) for dtype in ("int8", "int16", "int32")]
        integer_rows.append(max(integer_scores, key=lambda item: item[1]))

    lines.extend(
        [
            "",
            "## Interpretation",
            "Dtypes with lower RMSE stayed closest to the fp64 reference within each workflow.",
        ]
    )
    for workflow, dtype, score in best_rows:
        lines.append(f"- `{workflow}` stayed closest with `{dtype}` (rmse={score:.8g}).")
    for workflow, dtype, score in worst_rows:
        lines.append(f"- `{workflow}` was least stable for `{dtype}` (rmse={score:.8g}).")
    for dtype, score in integer_rows:
        lines.append(f"- Integer quantize/dequantize paths can degrade more strongly; worst integer rmse observed for `{dtype}` was {score:.8g}.")

    lines.extend(
        [
            "",
            "## Notes",
            "- Stage 4 compares workflow outputs only.",
            "- It does not simulate hardware execution.",
            "- It does not simulate Tensor Core scheduling.",
            "- Integer support remains quantize/dequantize semantics only.",
            "- Advanced linalg, random sampling, and general einsum are still excluded.",
        ]
    )
    return "\n".join(lines) + "\n"
