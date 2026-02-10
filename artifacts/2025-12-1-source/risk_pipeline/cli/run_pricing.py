from __future__ import annotations

import argparse
import logging
import time
from pathlib import Path
from typing import Any

import numpy as np

from risk_pipeline.config import (
    FAST_BINOMIAL_STEPS,
    FAST_PATHS,
    FAST_REPEAT,
    FULL_BINOMIAL_STEPS,
    FULL_PATHS,
    FULL_REPEAT,
    default_run_id,
    parse_bool,
)
from risk_pipeline.data.download_patch import download_prices_chunked
from risk_pipeline.data.preprocess import align_prices, compute_log_returns, dataset_stats
from risk_pipeline.io_utils import ensure_dir, write_json, write_text
from risk_pipeline.pricing.engines.binomial_crr import crr_price
from risk_pipeline.pricing.engines.black_scholes import bs_price
from risk_pipeline.pricing.engines.mc_cpu import mc_price_cpu
from risk_pipeline.pricing.engines.mc_gpu import mc_price_gpu_cupy
from risk_pipeline.pricing.greeks.bs_analytic import bs_greeks
from risk_pipeline.pricing.greeks.finite_diff import bs_greeks_finite_diff
from risk_pipeline.pricing.no_arbitrage.checks import bounds_check_call_put, put_call_parity_check
from risk_pipeline.volatility.historical import estimate_hist_vol

logger = logging.getLogger(__name__)


def _bench(fn, repeat: int) -> dict[str, Any]:
    timings: list[float] = []
    result: Any = None
    for _ in range(repeat):
        t0 = time.perf_counter()
        result = fn()
        timings.append(time.perf_counter() - t0)
    arr = np.asarray(timings, dtype=float)
    return {
        "repeat": int(repeat),
        "timings_sec": [float(x) for x in arr.tolist()],
        "mean_sec": float(arr.mean()),
        "min_sec": float(arr.min()),
        "max_sec": float(arr.max()),
        "result": result,
    }


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(description="Run derivatives pricing + no-arbitrage pipeline")
    p.add_argument("--run-id", type=str, default=None)
    p.add_argument("--ticker", type=str, default="SPY")
    p.add_argument("--start", type=str, required=True)
    p.add_argument("--end", type=str, required=True)
    p.add_argument("--mode", choices=["fast", "full"], default="full")

    p.add_argument("--enable-download-patch", type=str, default="true")
    p.add_argument("--chunk-months", type=int, default=3)
    p.add_argument("--cache-dir", type=str, default=None)
    p.add_argument("--download-retries", type=int, default=3)
    p.add_argument("--download-base-sleep", type=float, default=1.0)
    p.add_argument("--download-jitter", type=float, default=0.3)
    p.add_argument("--offline", action="store_true")
    p.add_argument("--use-cache", type=str, default="true")

    p.add_argument("--option-type", choices=["call", "put"], default="call")
    p.add_argument("--strike", type=float, required=True)
    p.add_argument("--maturity-days", type=int, required=True)
    p.add_argument("--risk-free-rate", type=float, default=0.03)
    p.add_argument("--dividend-yield", type=float, default=0.0)
    p.add_argument("--sigma-mode", choices=["hist", "fixed", "implied_stub"], default="hist")
    p.add_argument("--sigma", type=float, default=None)
    p.add_argument("--hist-vol-window", type=int, default=60)
    p.add_argument("--annualization", type=int, default=252)
    p.add_argument("--min-returns-rows", type=int, default=30)

    p.add_argument("--paths", type=int, default=None)
    p.add_argument("--seed", type=int, default=9)
    p.add_argument("--backend", choices=["cpu", "gpu", "both"], default="cpu")
    p.add_argument("--gpu-backend", choices=["cupy"], default="cupy")

    p.add_argument("--repeat", type=int, default=None)
    p.add_argument("--binomial-steps", type=int, default=None)
    p.add_argument("--outdir", type=str, default=None)
    p.add_argument("--debug", action="store_true")
    return p


def _resolve_mode_defaults(args: argparse.Namespace) -> tuple[int, int, int]:
    if args.mode == "fast":
        paths = args.paths if args.paths is not None else FAST_PATHS
        steps = args.binomial_steps if args.binomial_steps is not None else FAST_BINOMIAL_STEPS
        repeat = args.repeat if args.repeat is not None else FAST_REPEAT
    else:
        paths = args.paths if args.paths is not None else FULL_PATHS
        steps = args.binomial_steps if args.binomial_steps is not None else FULL_BINOMIAL_STEPS
        repeat = args.repeat if args.repeat is not None else FULL_REPEAT
    return int(paths), int(steps), int(repeat)


def _validate_inputs(args: argparse.Namespace, maturity: float, paths: int, steps: int, repeat: int) -> None:
    if args.strike <= 0.0:
        raise ValueError("--strike must be positive")
    if args.maturity_days <= 0:
        raise ValueError("--maturity-days must be > 0")
    if maturity <= 0.0:
        raise ValueError("Computed maturity must be > 0")
    if args.hist_vol_window <= 0:
        raise ValueError("--hist-vol-window must be > 0")
    if args.annualization <= 0:
        raise ValueError("--annualization must be > 0")
    if args.min_returns_rows <= 1:
        raise ValueError("--min-returns-rows must be > 1")
    if paths <= 1:
        raise ValueError("--paths must be > 1")
    if steps <= 0:
        raise ValueError("--binomial-steps must be > 0")
    if repeat <= 0:
        raise ValueError("--repeat must be > 0")


def _select_sigma(
    args: argparse.Namespace,
    returns_series,
) -> tuple[float, dict[str, Any]]:
    if args.sigma_mode == "hist":
        hist = estimate_hist_vol(
            returns=returns_series,
            window=args.hist_vol_window,
            annualization=args.annualization,
            min_returns_rows=args.min_returns_rows,
        )
        return float(hist["sigma_annual"]), hist

    if args.sigma_mode == "fixed":
        if args.sigma is None or args.sigma <= 0.0:
            raise ValueError("--sigma must be provided and > 0 when --sigma-mode fixed")
        return float(args.sigma), {
            "sigma_daily": None,
            "sigma_annual": float(args.sigma),
            "window_used": 0,
            "annualization": int(args.annualization),
            "num_returns": int(returns_series.dropna().shape[0]),
            "returns_start": str(returns_series.index.min().date()),
            "returns_end": str(returns_series.index.max().date()),
            "note": "fixed_sigma_input",
        }

    if args.sigma_mode == "implied_stub":
        if args.sigma is None or args.sigma <= 0.0:
            raise ValueError("implied_stub is a placeholder. Provide --sigma > 0 for now")
        return float(args.sigma), {
            "sigma_daily": None,
            "sigma_annual": float(args.sigma),
            "window_used": 0,
            "annualization": int(args.annualization),
            "num_returns": int(returns_series.dropna().shape[0]),
            "returns_start": str(returns_series.index.min().date()),
            "returns_end": str(returns_series.index.max().date()),
            "note": "implied_stub_placeholder_uses_sigma_input",
        }

    raise ValueError(f"Unknown sigma_mode={args.sigma_mode}")


def run_pipeline(args: argparse.Namespace) -> Path:
    run_id = args.run_id or default_run_id()
    root = Path.cwd()
    outdir = Path(args.outdir) if args.outdir else (root / "results" / "pricing" / run_id)
    outdir = ensure_dir(outdir)

    use_cache = parse_bool(args.use_cache)
    enable_download_patch = parse_bool(args.enable_download_patch)
    ticker = args.ticker.strip().upper()
    if not ticker:
        raise ValueError("--ticker cannot be empty")

    paths, steps, repeat = _resolve_mode_defaults(args)
    maturity = args.maturity_days / 365.0
    _validate_inputs(args, maturity=maturity, paths=paths, steps=steps, repeat=repeat)

    cache_dir_arg = Path(args.cache_dir) if args.cache_dir else (root / "datasets" / "yfinance_cache")

    if not enable_download_patch:
        raise ValueError("This pipeline requires the chunked download patch; set --enable-download-patch true")

    prices_raw, cache_metadata, cache_dir, download_report = download_prices_chunked(
        tickers=[ticker],
        start=args.start,
        end=args.end,
        cache_root=cache_dir_arg,
        chunk_months=args.chunk_months,
        interval="1d",
        auto_adjust=True,
        use_cache=use_cache,
        offline=bool(args.offline),
        retries=args.download_retries,
        base_sleep=args.download_base_sleep,
        jitter=args.download_jitter,
    )

    prices = align_prices(prices_raw, [ticker])
    returns_df = compute_log_returns(prices)
    if returns_df.shape[0] < args.min_returns_rows:
        raise ValueError(
            f"Insufficient return rows: got={returns_df.shape[0]} required={args.min_returns_rows}"
        )

    s0 = float(prices[ticker].iloc[-1])
    if s0 <= 0.0:
        raise ValueError(f"Invalid S0 from latest close: {s0}")

    sigma_used, hist_vol = _select_sigma(args=args, returns_series=returns_df[ticker])

    bs_call = bs_price(s0, args.strike, maturity, args.risk_free_rate, args.dividend_yield, sigma_used, "call")
    bs_put = bs_price(s0, args.strike, maturity, args.risk_free_rate, args.dividend_yield, sigma_used, "put")

    bench_bs = _bench(
        lambda: bs_price(
            s0,
            args.strike,
            maturity,
            args.risk_free_rate,
            args.dividend_yield,
            sigma_used,
            args.option_type,
        ),
        repeat=repeat,
    )
    bench_bin = _bench(
        lambda: crr_price(
            s0,
            args.strike,
            maturity,
            args.risk_free_rate,
            args.dividend_yield,
            sigma_used,
            args.option_type,
            steps,
        ),
        repeat=repeat,
    )

    bench_mc_cpu = _bench(
        lambda: mc_price_cpu(
            s0,
            args.strike,
            maturity,
            args.risk_free_rate,
            args.dividend_yield,
            sigma_used,
            args.option_type,
            paths,
            args.seed,
        ),
        repeat=repeat,
    )

    gpu_note = ""
    bench_mc_gpu: dict[str, Any] | None = None
    if args.backend in {"gpu", "both"}:
        if args.gpu_backend != "cupy":
            raise ValueError(f"Unsupported gpu backend={args.gpu_backend}")

        bench_mc_gpu = _bench(
            lambda: mc_price_gpu_cupy(
                s0,
                args.strike,
                maturity,
                args.risk_free_rate,
                args.dividend_yield,
                sigma_used,
                args.option_type,
                paths,
                args.seed,
            ),
            repeat=repeat,
        )

        if not bool(bench_mc_gpu["result"].get("available", False)) and args.backend == "gpu":
            gpu_note = "GPU unavailable; auto-fell back to CPU Monte Carlo"

    selected_mc = bench_mc_cpu["result"]
    selected_mc_engine = "mc_cpu"
    if args.backend == "gpu" and bench_mc_gpu is not None and bool(bench_mc_gpu["result"].get("available", False)):
        selected_mc = bench_mc_gpu["result"]
        selected_mc_engine = "mc_gpu"
    elif args.backend == "both" and bench_mc_gpu is not None and bool(bench_mc_gpu["result"].get("available", False)):
        selected_mc_engine = "mc_cpu"

    bs_selected = bs_call if args.option_type == "call" else bs_put
    bin_selected = float(bench_bin["result"])
    mc_selected = float(selected_mc["price"])

    abs_err_bin = abs(bin_selected - bs_selected)
    rel_err_bin = abs_err_bin / max(1e-12, abs(bs_selected))
    abs_err_mc = abs(mc_selected - bs_selected)
    rel_err_mc = abs_err_mc / max(1e-12, abs(bs_selected))

    parity = put_call_parity_check(
        call=bs_call,
        put=bs_put,
        spot=s0,
        strike=args.strike,
        rate=args.risk_free_rate,
        dividend_yield=args.dividend_yield,
        maturity=maturity,
    )
    bounds = bounds_check_call_put(
        call=bs_call,
        put=bs_put,
        spot=s0,
        strike=args.strike,
        rate=args.risk_free_rate,
        dividend_yield=args.dividend_yield,
        maturity=maturity,
    )

    greeks_payload = {
        "option_type": args.option_type,
        "bs_analytic": bs_greeks(
            s0,
            args.strike,
            maturity,
            args.risk_free_rate,
            args.dividend_yield,
            sigma_used,
            args.option_type,
        ),
        "finite_diff": bs_greeks_finite_diff(
            s0,
            args.strike,
            maturity,
            args.risk_free_rate,
            args.dividend_yield,
            sigma_used,
            args.option_type,
        ),
    }

    prices.to_csv(outdir / "prices_aligned.csv")
    returns_df.to_csv(outdir / "returns.csv")
    write_json(outdir / "download_report.json", download_report)
    write_json(outdir / "hist_vol.json", hist_vol)

    price_payload = {
        "option_type": args.option_type,
        "bs": {
            "call": float(bs_call),
            "put": float(bs_put),
            "selected": float(bs_selected),
        },
        "binomial": {
            "steps": int(steps),
            "selected": float(bin_selected),
            "abs_error_vs_bs": float(abs_err_bin),
            "rel_error_vs_bs": float(rel_err_bin),
        },
        "mc": {
            "engine": selected_mc_engine,
            "selected": {
                "price": float(mc_selected),
                "stderr": float(selected_mc["stderr"]),
                "ci_low": float(selected_mc["ci_low"]),
                "ci_high": float(selected_mc["ci_high"]),
                "paths": int(paths),
            },
            "abs_error_vs_bs": float(abs_err_mc),
            "rel_error_vs_bs": float(rel_err_mc),
            "cpu": bench_mc_cpu["result"],
            "gpu": None if bench_mc_gpu is None else bench_mc_gpu["result"],
        },
        "no_arbitrage": {
            "put_call_parity": parity,
            "bounds": bounds,
        },
    }
    write_json(outdir / "price.json", price_payload)
    write_json(outdir / "greeks.json", greeks_payload)

    bench_payload = {
        "black_scholes": {
            "repeat": bench_bs["repeat"],
            "timings_sec": bench_bs["timings_sec"],
            "mean_sec": bench_bs["mean_sec"],
            "min_sec": bench_bs["min_sec"],
            "max_sec": bench_bs["max_sec"],
        },
        "binomial": {
            "repeat": bench_bin["repeat"],
            "timings_sec": bench_bin["timings_sec"],
            "mean_sec": bench_bin["mean_sec"],
            "min_sec": bench_bin["min_sec"],
            "max_sec": bench_bin["max_sec"],
            "steps": int(steps),
        },
        "mc_cpu": {
            "repeat": bench_mc_cpu["repeat"],
            "timings_sec": bench_mc_cpu["timings_sec"],
            "mean_sec": bench_mc_cpu["mean_sec"],
            "min_sec": bench_mc_cpu["min_sec"],
            "max_sec": bench_mc_cpu["max_sec"],
        },
        "mc_gpu": None,
        "selected_backend": args.backend,
        "gpu_backend": args.gpu_backend,
    }
    if bench_mc_gpu is not None:
        bench_payload["mc_gpu"] = {
            "repeat": bench_mc_gpu["repeat"],
            "timings_sec": bench_mc_gpu["timings_sec"],
            "mean_sec": bench_mc_gpu["mean_sec"],
            "min_sec": bench_mc_gpu["min_sec"],
            "max_sec": bench_mc_gpu["max_sec"],
            "available": bool(bench_mc_gpu["result"].get("available", False)),
            "device": bench_mc_gpu["result"].get("device", None),
            "reason": bench_mc_gpu["result"].get("reason", None),
        }
    write_json(outdir / "bench.json", bench_payload)

    stats = dataset_stats(prices, returns_df)
    params_payload = {
        "run_id": run_id,
        "ticker": ticker,
        "start": args.start,
        "end": args.end,
        "spot": float(s0),
        "strike": float(args.strike),
        "maturity_days": int(args.maturity_days),
        "maturity_years": float(maturity),
        "risk_free_rate": float(args.risk_free_rate),
        "dividend_yield": float(args.dividend_yield),
        "option_type": args.option_type,
        "sigma_mode": args.sigma_mode,
        "sigma_input": None if args.sigma is None else float(args.sigma),
        "sigma_used": float(sigma_used),
        "hist_vol_window": int(args.hist_vol_window),
        "annualization": int(args.annualization),
        "min_returns_rows": int(args.min_returns_rows),
        "paths": int(paths),
        "seed": int(args.seed),
        "backend": args.backend,
        "gpu_backend": args.gpu_backend,
        "binomial_steps": int(steps),
        "repeat": int(repeat),
        "download_patch": {
            "enabled": bool(enable_download_patch),
            "chunk_months": int(args.chunk_months),
            "cache_dir": str(cache_dir_arg),
            "use_cache": bool(use_cache),
            "offline": bool(args.offline),
            "download_retries": int(args.download_retries),
            "download_base_sleep": float(args.download_base_sleep),
            "download_jitter": float(args.download_jitter),
        },
        "cache": {
            "cache_dir": str(cache_dir),
            "metadata": cache_metadata,
        },
        "dataset_stats": stats,
    }
    write_json(outdir / "params.json", params_payload)

    summary_lines = [
        f"ticker={ticker}",
        f"range={args.start}..{args.end}",
        f"price_field=Close(auto_adjust=True)",
        f"rows_prices={prices.shape[0]} rows_returns={returns_df.shape[0]}",
        f"S0={s0:.6f}",
        f"K={args.strike:.6f} T={maturity:.6f} r={args.risk_free_rate:.6f} q={args.dividend_yield:.6f}",
        f"sigma_mode={args.sigma_mode} sigma_used={sigma_used:.8f}",
        f"bs_{args.option_type}={bs_selected:.8f}",
        f"binomial_{args.option_type}={bin_selected:.8f}",
        f"mc_{selected_mc_engine}_{args.option_type}={mc_selected:.8f} stderr={selected_mc['stderr']:.8f}",
        f"mc_ci95=[{selected_mc['ci_low']:.8f},{selected_mc['ci_high']:.8f}]",
        f"put_call_parity_abs_error={parity['abs_error']:.8e}",
        f"bounds_call_ok={bounds['call_within_bounds']} bounds_put_ok={bounds['put_within_bounds']}",
    ]
    if gpu_note:
        summary_lines.append(gpu_note)
    summary_lines.append(f"outdir={outdir}")

    write_text(outdir / "logs.txt", "\n".join(summary_lines) + "\n")

    summary_md = "\n".join(
        [
            "# Derivatives Pricing Report",
            "",
            f"- Run ID: `{run_id}`",
            f"- Ticker: `{ticker}`",
            f"- Date range: `{args.start}` to `{args.end}`",
            f"- Price source: `Close` from chunked yfinance download patch (`auto_adjust=True`)",
            f"- S0: `{s0:.6f}`",
            f"- K/T/r/q: `{args.strike:.6f}` / `{maturity:.6f}` / `{args.risk_free_rate:.6f}` / `{args.dividend_yield:.6f}`",
            f"- Sigma mode: `{args.sigma_mode}`",
            f"- Sigma used: `{sigma_used:.8f}`",
            "",
            "## Prices",
            f"- Black-Scholes ({args.option_type}): `{bs_selected:.8f}`",
            f"- Binomial CRR ({args.option_type}, steps={steps}): `{bin_selected:.8f}`",
            f"- Monte Carlo {selected_mc_engine} ({args.option_type}, paths={paths}): `{mc_selected:.8f}`",
            f"- Monte Carlo stderr: `{selected_mc['stderr']:.8f}`",
            f"- Monte Carlo 95% CI: `[{selected_mc['ci_low']:.8f}, {selected_mc['ci_high']:.8f}]`",
            "",
            "## No-Arbitrage",
            f"- Put-call parity abs error (BS call/put): `{parity['abs_error']:.8e}`",
            f"- Bounds check: `call_ok={bounds['call_within_bounds']}`, `put_ok={bounds['put_within_bounds']}`",
            "",
        ]
    )
    if gpu_note:
        summary_md += f"- Note: `{gpu_note}`\n"
    write_text(outdir / "summary.md", summary_md)

    logger.info("Derivatives pricing pipeline")
    for line in summary_lines:
        logger.info(line)
    return outdir


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    logging.basicConfig(
        level=logging.DEBUG if args.debug else logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s - %(message)s",
    )
    try:
        run_pipeline(args)
        return 0
    except Exception as exc:
        logger.error(str(exc))
        if args.debug:
            logger.exception("pricing pipeline failed")
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
