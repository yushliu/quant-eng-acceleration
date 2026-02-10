from __future__ import annotations

from datetime import datetime


FAST_PATHS = 20_000
FULL_PATHS = 200_000
FAST_BINOMIAL_STEPS = 150
FULL_BINOMIAL_STEPS = 500
FAST_REPEAT = 1
FULL_REPEAT = 3


def parse_bool(raw: str) -> bool:
    val = raw.strip().lower()
    if val in {"true", "1", "yes", "y"}:
        return True
    if val in {"false", "0", "no", "n"}:
        return False
    raise ValueError(f"Invalid boolean value: {raw}")


def default_run_id() -> str:
    return datetime.utcnow().strftime("%Y%m%dT%H%M%SZ")
