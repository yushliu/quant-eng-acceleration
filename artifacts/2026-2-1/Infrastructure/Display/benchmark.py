"""Stage 4 benchmark orchestration and artifact writing."""

from __future__ import annotations

import csv
import json
from pathlib import Path
from typing import Any

import numpy as np

from .core import array
from .report import render_stage4_report
from .workflow import WorkflowRun, einsum_then_mean, matmul_clip_sum, matmul_then_mean, outer_then_quantile


def build_benchmark_inputs() -> dict[str, dict[str, Any]]:
    """Build fixed, deterministic inputs for the Stage 4 workflows."""
    matrix_a = array(np.array([[1.125, -2.75], [3.5, 4.125], [-1.875, 0.625]], dtype=np.float64))
    matrix_b = array(np.array([[0.25, -1.5, 2.0], [1.75, 0.5, -0.125]], dtype=np.float64))
    vector_x = array(np.array([1.001, -2.002, 3.003, -4.004], dtype=np.float64))
    vector_y = array(np.array([0.333, -0.666, 1.999], dtype=np.float64))
    einsum_matrix = array(np.array([[1.125, 2.25, -0.75], [0.5, -1.75, 3.25]], dtype=np.float64))
    einsum_vector = array(np.array([0.125, -2.5, 1.75], dtype=np.float64))

    return {
        "matmul_then_mean": {"A": matrix_a, "B": matrix_b},
        "matmul_clip_sum": {"A": matrix_a, "B": matrix_b, "min_value": -1.5, "max_value": 1.5},
        "outer_then_quantile": {"x": vector_x, "y": vector_y, "q": 0.75},
        "einsum_then_mean": {"A": einsum_matrix, "x": einsum_vector},
    }


def run_all_workflows() -> list[WorkflowRun]:
    inputs = build_benchmark_inputs()
    return [
        matmul_then_mean(**inputs["matmul_then_mean"]),
        matmul_clip_sum(**inputs["matmul_clip_sum"]),
        outer_then_quantile(**inputs["outer_then_quantile"]),
        einsum_then_mean(**inputs["einsum_then_mean"]),
    ]


def _write_summary_csv(rows: list[dict[str, Any]], path: Path) -> None:
    fieldnames = [
        "workflow",
        "dtype",
        "output_kind",
        "abs_error",
        "rel_error",
        "mean_abs_error",
        "max_abs_error",
        "rmse",
        "finite_ratio",
        "same_shape",
    ]
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def _write_details_json(runs: list[WorkflowRun], path: Path) -> None:
    payload = [run.to_detail_payload() for run in runs]
    with path.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, indent=2)


def write_benchmark_outputs(output_dir: str | Path, runs: list[WorkflowRun]) -> dict[str, Path]:
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    summary_rows = [row for run in runs for row in run.to_summary_rows()]
    summary_csv = output_path / "stage4_benchmark_summary.csv"
    details_json = output_path / "stage4_workflow_details.json"
    report_md = output_path / "stage4_report.md"

    _write_summary_csv(summary_rows, summary_csv)
    _write_details_json(runs, details_json)
    report_md.write_text(render_stage4_report(runs), encoding="utf-8")

    return {
        "summary_csv": summary_csv,
        "details_json": details_json,
        "report_md": report_md,
    }


def run_stage4_benchmarks(output_dir: str | Path = "stage4_outputs") -> dict[str, Any]:
    """Run all fixed Stage 4 workflows and write the standard artifacts."""
    runs = run_all_workflows()
    files = write_benchmark_outputs(output_dir, runs)
    return {"runs": runs, "files": files}
