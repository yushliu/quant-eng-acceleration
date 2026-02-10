from __future__ import annotations

from pathlib import Path

from risk_pipeline.io_utils import write_json, write_text


def write_summary_artifacts(outdir: Path, summary: dict[str, object]) -> None:
    write_json(outdir / "summary.json", summary)

    md = "\n".join(
        [
            "# Daily EWMA -> MC VaR Backtest",
            "",
            f"Data: {summary['data']}",
            f"Model: {summary['model']}",
            f"MC: {summary['mc']}",
            f"Backtest: {summary['backtest']}",
            "",
        ]
    )
    write_text(outdir / "summary.md", md)
