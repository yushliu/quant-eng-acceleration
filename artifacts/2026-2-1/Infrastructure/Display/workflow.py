"""Stage 4 fixed workflow execution.

The workflow layer compares numerical outputs only. It does not simulate
hardware execution, Tensor Core scheduling, or advanced linalg behavior.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from .core import DTCArray, asarray
from .dtypes import SUPPORTED_DTYPES
from .metrics import compare_against_reference
from .ops import clip, einsum, matmul, mean, outer, quantile, sum


@dataclass(slots=True)
class WorkflowRun:
    workflow: str
    output: DTCArray
    input_shapes: dict[str, tuple[int, ...]]
    metrics: dict[str, dict[str, Any]]
    reference_dtype: str = "fp64"

    def to_summary_rows(self) -> list[dict[str, Any]]:
        rows = []
        for dtype in SUPPORTED_DTYPES:
            row = {"workflow": self.workflow, "dtype": dtype}
            row.update(self.metrics[dtype])
            rows.append(row)
        return rows

    def to_detail_payload(self) -> dict[str, Any]:
        return {
            "workflow": self.workflow,
            "input_shapes": {key: list(value) for key, value in self.input_shapes.items()},
            "reference_dtype": self.reference_dtype,
            "compared_dtypes": list(SUPPORTED_DTYPES),
            "metrics": self.metrics,
        }


def _collect_metrics(output: DTCArray) -> dict[str, dict[str, Any]]:
    reference = output.get("fp64")
    return {
        dtype: compare_against_reference(reference, output.get(dtype)) for dtype in SUPPORTED_DTYPES
    }


def _as_input_shapes(**inputs: Any) -> dict[str, tuple[int, ...]]:
    return {name: asarray(value).shape for name, value in inputs.items()}


def matmul_then_mean(A: Any, B: Any) -> WorkflowRun:
    output = mean(matmul(asarray(A), asarray(B)))
    return WorkflowRun(
        workflow="matmul_then_mean",
        output=output,
        input_shapes=_as_input_shapes(A=A, B=B),
        metrics=_collect_metrics(output),
    )


def matmul_clip_sum(A: Any, B: Any, min_value: float, max_value: float) -> WorkflowRun:
    output = sum(clip(matmul(asarray(A), asarray(B)), min_value, max_value))
    return WorkflowRun(
        workflow="matmul_clip_sum",
        output=output,
        input_shapes=_as_input_shapes(A=A, B=B),
        metrics=_collect_metrics(output),
    )


def outer_then_quantile(x: Any, y: Any, q: float) -> WorkflowRun:
    output = quantile(outer(asarray(x), asarray(y)), q)
    return WorkflowRun(
        workflow="outer_then_quantile",
        output=output,
        input_shapes=_as_input_shapes(x=x, y=y),
        metrics=_collect_metrics(output),
    )


def einsum_then_mean(A: Any, x: Any) -> WorkflowRun:
    output = mean(einsum("ij,j->i", asarray(A), asarray(x)))
    return WorkflowRun(
        workflow="einsum_then_mean",
        output=output,
        input_shapes=_as_input_shapes(A=A, x=x),
        metrics=_collect_metrics(output),
    )


def run_workflow(name: str, **kwargs: Any) -> WorkflowRun:
    workflows = {
        "matmul_then_mean": matmul_then_mean,
        "matmul_clip_sum": matmul_clip_sum,
        "outer_then_quantile": outer_then_quantile,
        "einsum_then_mean": einsum_then_mean,
    }
    if name not in workflows:
        raise ValueError(f"Unknown workflow '{name}'")
    return workflows[name](**kwargs)
