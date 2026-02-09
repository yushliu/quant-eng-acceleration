from __future__ import annotations

import logging
import math
import time
from dataclasses import dataclass
from datetime import datetime, timedelta

import numpy as np
import pandas as pd
from scipy.stats import chi2

from risk_pipeline.models.ewma_cov import ewma_covariance
from risk_pipeline.risk.mc_sim import simulate_portfolio_losses
from risk_pipeline.risk.var_cvar import compute_var_cvar

logger = logging.getLogger(__name__)


@dataclass
class BacktestResult:
    num_obs: int
    breach_count: int
    breach_rate: float
    expected_rate: float
    kupiec_lr: float
    kupiec_p_value: float
    max_consecutive_breaches: int
    breach_runs: int
    detail_rows: list[dict[str, object]]
    recent_rows: list[dict[str, object]]

    def to_dict(self) -> dict[str, object]:
        return {
            "num_obs": self.num_obs,
            "breaches": self.breach_count,
            "breach_count": self.breach_count,
            "breach_rate": self.breach_rate,
            "expected_rate": self.expected_rate,
            "kupiec_lr": self.kupiec_lr,
            "kupiec_p_value": self.kupiec_p_value,
            "kupiec_stat": self.kupiec_lr,
            "kupiec_pvalue": self.kupiec_p_value,
            "max_consecutive_breaches": self.max_consecutive_breaches,
            "breach_runs": self.breach_runs,
            "recent_rows": self.recent_rows,
        }

    def detail_df(self) -> pd.DataFrame:
        return pd.DataFrame(self.detail_rows)


def kupiec_pof(num_obs: int, breach_count: int, expected_rate: float) -> tuple[float, float]:
    if num_obs <= 0:
        return 0.0, 1.0

    x = breach_count
    n = num_obs
    p = expected_rate
    p_hat = x / n if n else 0.0

    eps = 1e-12
    p = min(max(p, eps), 1.0 - eps)
    p_hat = min(max(p_hat, eps), 1.0 - eps)

    ll_null = (n - x) * math.log(1.0 - p) + x * math.log(p)
    ll_alt = (n - x) * math.log(1.0 - p_hat) + x * math.log(p_hat)
    lr = -2.0 * (ll_null - ll_alt)

    pvalue = float(chi2.sf(max(lr, 0.0), df=1))
    return float(lr), float(pvalue)


def _breach_run_stats(breaches: list[int]) -> tuple[int, int]:
    max_run = 0
    run_count = 0
    current = 0
    for b in breaches:
        if b == 1:
            current += 1
            if current == 1:
                run_count += 1
            max_run = max(max_run, current)
        else:
            current = 0
    return max_run, run_count


def rolling_var_backtest(
    returns_df: pd.DataFrame,
    weights: np.ndarray,
    decay_lambda: float,
    alpha: float,
    mc_paths: int,
    seed: int,
    init_window: int,
    progress_every: int = 50,
    debug: bool = False,
) -> BacktestResult:
    arr = returns_df.to_numpy(dtype=float)
    non_finite_count = int(np.sum(~np.isfinite(arr)))
    if non_finite_count > 0:
        raise ValueError(f"Non-finite returns in backtest input: count={non_finite_count}")
    idx = returns_df.index
    t_obs = arr.shape[0]

    if t_obs < init_window + 2:
        raise ValueError("Not enough data for rolling backtest")

    records: list[dict[str, object]] = []
    breach_count = 0
    total_days = t_obs - 1 - init_window
    start_ts = time.perf_counter()

    for iter_idx, t in enumerate(range(init_window, t_obs - 1), start=1):
        train = arr[: t + 1]
        cov = ewma_covariance(train, decay_lambda=decay_lambda, init_window=init_window)
        losses = simulate_portfolio_losses(
            cov=cov,
            weights=weights,
            num_paths=mc_paths,
            seed=seed + t,
            debug=debug,
        )
        var_t, cvar_t = compute_var_cvar(losses=losses, alpha=alpha)

        realized_loss = float(-(arr[t + 1] @ weights))
        breached = realized_loss > var_t
        breach_count += int(breached)

        records.append(
            {
                "date": str(idx[t + 1].date()),
                "var": float(var_t),
                "cvar": float(cvar_t),
                "realized_loss": realized_loss,
                "breach": int(breached),
            }
        )

        if progress_every > 0 and (iter_idx % progress_every == 0 or iter_idx == total_days):
            elapsed = max(time.perf_counter() - start_ts, 1e-12)
            avg_sec = elapsed / iter_idx
            remain_days = total_days - iter_idx
            eta_seconds = remain_days * avg_sec
            eta_ts = datetime.now() + timedelta(seconds=eta_seconds)
            paths_per_sec = (iter_idx * mc_paths) / elapsed
            logger.info(
                "Backtest progress %s/%s elapsed=%.2fs avg=%.4fs/day eta=%.2fs (~%s) paths_per_sec=%.1f var=%.8f",
                iter_idx,
                total_days,
                elapsed,
                avg_sec,
                eta_seconds,
                eta_ts.strftime("%Y-%m-%d %H:%M:%S"),
                paths_per_sec,
                var_t,
            )
            if debug:
                logger.debug(
                    "Backtest detail day=%s breach=%s realized_loss=%.8f cvar=%.8f",
                    idx[t + 1].date(),
                    int(breached),
                    realized_loss,
                    cvar_t,
                )

    num_obs = len(records)
    expected_rate = 1.0 - alpha
    breach_rate = breach_count / num_obs if num_obs else 0.0
    kupiec_lr, kupiec_p_value = kupiec_pof(num_obs=num_obs, breach_count=breach_count, expected_rate=expected_rate)
    max_consecutive_breaches, breach_runs = _breach_run_stats([int(r["breach"]) for r in records])

    return BacktestResult(
        num_obs=num_obs,
        breach_count=breach_count,
        breach_rate=float(breach_rate),
        expected_rate=float(expected_rate),
        kupiec_lr=kupiec_lr,
        kupiec_p_value=kupiec_p_value,
        max_consecutive_breaches=max_consecutive_breaches,
        breach_runs=breach_runs,
        detail_rows=records,
        recent_rows=records[-10:],
    )
