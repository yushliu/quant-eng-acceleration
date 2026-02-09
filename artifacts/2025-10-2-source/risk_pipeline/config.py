from __future__ import annotations

from dataclasses import asdict, dataclass
from datetime import datetime
from pathlib import Path
from typing import Any


DEFAULT_TICKERS = ["SPY", "QQQ", "TLT"]
FAST_MC_PATHS = 3_000
FAST_BACKTEST_MC_PATHS = 500
FULL_MC_PATHS = 200_000
FULL_BACKTEST_MC_PATHS = 20_000
FULL_LOOKBACK_DAYS = 365 * 10


@dataclass(frozen=True)
class RunConfig:
    tickers: list[str]
    start: str
    end: str
    decay_lambda: float
    alpha: float
    mc_paths: int
    backtest_mc_paths: int
    mode: str
    seed: int
    debug: bool
    weights: list[float]
    run_id: str
    use_cache: bool
    outdir: Path
    cache_dir: Path
    init_window: int
    auto_adjust: bool
    interval: str

    def to_dict(self) -> dict[str, Any]:
        data = asdict(self)
        data["outdir"] = str(self.outdir)
        data["cache_dir"] = str(self.cache_dir)
        return data


def parse_tickers(raw: str | None) -> list[str]:
    if not raw:
        return DEFAULT_TICKERS.copy()
    tickers = [x.strip().upper() for x in raw.split(",") if x.strip()]
    if not tickers:
        raise ValueError("Ticker list is empty after parsing")
    return tickers


def parse_weights(raw: str | None, n_assets: int) -> list[float]:
    if raw is None:
        return [1.0 / n_assets] * n_assets
    weights = [float(x.strip()) for x in raw.split(",") if x.strip()]
    if len(weights) != n_assets:
        raise ValueError(f"Expected {n_assets} weights, got {len(weights)}")
    total = sum(weights)
    if total == 0:
        raise ValueError("Weights sum to zero")
    return [w / total for w in weights]


def parse_bool(raw: str) -> bool:
    val = raw.strip().lower()
    if val in {"true", "1", "yes", "y"}:
        return True
    if val in {"false", "0", "no", "n"}:
        return False
    raise ValueError(f"Invalid boolean value: {raw}")


def default_run_id() -> str:
    return datetime.utcnow().strftime("%Y%m%dT%H%M%SZ")
