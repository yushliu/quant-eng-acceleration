from __future__ import annotations

import argparse
import logging
from datetime import datetime, timedelta, timezone
from pathlib import Path

import numpy as np

from risk_pipeline.backtest.var_backtest import rolling_var_backtest
from risk_pipeline.bench.bench_mc import time_mc_once
from risk_pipeline.compute.backend import BackendError, get_backend
from risk_pipeline.config import (
    FAST_BACKTEST_MC_PATHS,
    FAST_MC_PATHS,
    FULL_BACKTEST_MC_PATHS,
    FULL_LOOKBACK_DAYS,
    FULL_MC_PATHS,
    default_run_id,
    parse_bool,
    parse_tickers,
    parse_weights,
)
from risk_pipeline.data.preprocess import align_prices, compute_log_returns, dataset_stats, returns_to_numpy
from risk_pipeline.data.local_loader import load_prices_from_cache_dir, load_prices_local_csv
from risk_pipeline.io_utils import ensure_dir, read_json, write_json, write_text
from risk_pipeline.models.ewma_cov import ewma_covariance
from risk_pipeline.report.summarize import write_summary_artifacts
from risk_pipeline.risk.mc_sim import simulate_portfolio_losses
from risk_pipeline.risk.var_cvar import compute_var_cvar

logger = logging.getLogger(__name__)


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(description="Run daily EWMA + Monte Carlo VaR/CVaR pipeline")
    p.add_argument("--tickers", type=str, default="SPY,QQQ,TLT")
    p.add_argument("--start", type=str, default=None)
    p.add_argument("--end", type=str, default=None)
    p.add_argument("--lambda", dest="decay_lambda", type=float, default=0.94)
    p.add_argument("--alpha", type=float, default=0.99)
    p.add_argument("--mc-paths", type=int, default=None)
    p.add_argument("--backtest-mc-paths", type=int, default=None)
    p.add_argument("--seed", type=int, default=9)
    p.add_argument("--weights", type=str, default=None)
    p.add_argument("--run-id", type=str, default=None)
    p.add_argument("--mode", choices=["fast", "full"], default="fast")
    p.add_argument("--debug", action="store_true")
    p.add_argument("--offline", action="store_true")
    p.add_argument("--use-cache", type=str, default="true")
    p.add_argument("--data-source", choices=["yfinance", "local", "cache"], default="yfinance")
    p.add_argument("--data-path", type=str, default=None)
    p.add_argument("--cache-dir", type=str, default=None)
    p.add_argument("--outdir", type=str, default=None)
    p.add_argument("--progress-every", type=int, default=50)
    p.add_argument("--init-window", type=int, default=60)
    p.add_argument("--backend", choices=["cpu", "gpu"], default="cpu")
    p.add_argument("--gpu-device", type=int, default=0)
    p.add_argument("--bench", action="store_true")
    p.add_argument("--bench-warmup", type=int, default=3)
    p.add_argument("--bench-repeat", type=int, default=10)
    p.add_argument("--fast", action="store_true", help="Deprecated alias for --mode fast")
    return p


def _load_prices_yfinance(
    *,
    root: Path,
    tickers: list[str],
    resolved_start: str,
    resolved_end: str,
    use_cache: bool,
    offline: bool,
):
    from risk_pipeline.data.yf_download import load_or_download_prices

    return load_or_download_prices(
        cache_root=root / "datasets" / "yfinance_cache",
        tickers=tickers,
        start=resolved_start,
        end=resolved_end,
        interval="1d",
        auto_adjust=True,
        use_cache=use_cache,
        offline=offline,
    )


def _resolve_dates(start_arg: str | None, end_arg: str | None, mode: str) -> tuple[str, str]:
    today = datetime.now(timezone.utc).date()
    end_date = datetime.strptime(end_arg, "%Y-%m-%d").date() if end_arg else today
    if start_arg:
        start_date = datetime.strptime(start_arg, "%Y-%m-%d").date()
    elif mode == "full":
        start_date = end_date - timedelta(days=FULL_LOOKBACK_DAYS)
    else:
        start_date = end_date - timedelta(days=180)
    return start_date.isoformat(), end_date.isoformat()


def run_pipeline(args: argparse.Namespace) -> Path:
    tickers = parse_tickers(args.tickers)
    run_id = args.run_id or default_run_id()
    root = Path.cwd()
    outdir = Path(args.outdir) if args.outdir else (root / "results" / "daily" / run_id)
    outdir = ensure_dir(outdir)

    use_cache = parse_bool(args.use_cache)
    mode = "fast" if args.fast else args.mode
    resolved_start, resolved_end = _resolve_dates(args.start, args.end, mode)

    mc_paths = args.mc_paths if args.mc_paths is not None else (FAST_MC_PATHS if mode == "fast" else FULL_MC_PATHS)
    backtest_mc_paths = (
        args.backtest_mc_paths
        if args.backtest_mc_paths is not None
        else (FAST_BACKTEST_MC_PATHS if mode == "fast" else FULL_BACKTEST_MC_PATHS)
    )

    weights = parse_weights(args.weights, len(tickers))

    if args.data_source == "yfinance":
        logger.info("Data source: yfinance")
        prices, cache_metadata, cache_dir = _load_prices_yfinance(
            root=root,
            tickers=tickers,
            resolved_start=resolved_start,
            resolved_end=resolved_end,
            use_cache=use_cache,
            offline=bool(args.offline),
        )
    elif args.data_source == "local":
        if not args.data_path:
            raise ValueError("--data-path is required when --data-source local")
        logger.info("Data source: local file %s", args.data_path)
        prices = load_prices_local_csv(path=args.data_path, tickers=tickers)
        cache_dir = Path(args.data_path).resolve().parent
        cache_metadata = {
            "cache_hit": True,
            "source": "local",
            "path": str(Path(args.data_path)),
        }
    else:
        if not args.cache_dir:
            raise ValueError("--cache-dir is required when --data-source cache")
        logger.info("Data source: cache dir %s", args.cache_dir)
        prices = load_prices_from_cache_dir(cache_dir=args.cache_dir, tickers=tickers)
        metadata_path = Path(args.cache_dir) / "metadata.json"
        cache_metadata = {"cache_hit": True, "source": "cache_dir", "path": str(Path(args.cache_dir))}
        if metadata_path.exists():
            cache_metadata.update(read_json(metadata_path))
            cache_metadata["cache_hit"] = True
        cache_dir = Path(args.cache_dir)

    aligned_prices = align_prices(prices, tickers)
    returns_df = compute_log_returns(aligned_prices)
    if returns_df.shape[0] < args.init_window + 2:
        raise ValueError("Insufficient return rows after preprocessing")

    returns = returns_to_numpy(returns_df)
    weights_arr = np.asarray(weights, dtype=float)
    backend = get_backend(args.backend, device_id=args.gpu_device)

    cov = ewma_covariance(
        returns=returns,
        decay_lambda=args.decay_lambda,
        init_window=args.init_window,
    )
    cov_backend = backend.asarray(cov, dtype=np.float64) if backend.is_gpu else cov

    if args.bench:
        bench_payload = time_mc_once(
            backend=backend,
            cov=cov_backend,
            w=weights_arr,
            num_paths=mc_paths,
            seed=args.seed,
            warmup=args.bench_warmup,
            repeat=args.bench_repeat,
        )
        write_json(outdir / "bench.json", bench_payload)
        bench_md = "\n".join(
            [
                "# Monte Carlo Benchmark",
                "",
                f"- backend: `{bench_payload['backend']}`",
                f"- device_id: `{bench_payload['device_id']}`",
                f"- num_paths: `{bench_payload['num_paths']}`",
                f"- dim: `{bench_payload['dim']}`",
                f"- dtype: `{bench_payload['dtype']}`",
                f"- elapsed_ms: `{bench_payload['elapsed_ms']:.6f}`",
                f"- paths_per_sec: `{bench_payload['paths_per_sec']:.2f}`",
                f"- warmup: `{bench_payload['warmup']}`",
                f"- repeat: `{bench_payload['repeat']}`",
                "",
            ]
        )
        write_text(outdir / "bench.md", bench_md)

    losses = simulate_portfolio_losses(
        cov=cov_backend,
        weights=weights_arr,
        num_paths=mc_paths,
        seed=args.seed,
        debug=args.debug,
        backend=backend,
    )
    var, cvar = compute_var_cvar(losses=backend.to_numpy(losses), alpha=args.alpha)

    backtest = rolling_var_backtest(
        returns_df=returns_df,
        weights=weights_arr,
        decay_lambda=args.decay_lambda,
        alpha=args.alpha,
        mc_paths=backtest_mc_paths,
        seed=args.seed,
        init_window=args.init_window,
        progress_every=args.progress_every,
        debug=args.debug,
    )

    np.save(outdir / "cov.npy", cov)
    np.savetxt(outdir / "cov.csv", cov, delimiter=",")
    returns_df.to_csv(outdir / "returns.csv")
    aligned_prices.to_csv(outdir / "prices_aligned.csv")
    (outdir / "tickers.csv").write_text("ticker\n" + "\n".join(tickers) + "\n", encoding="utf-8")

    var_cvar_payload = {
        "alpha": args.alpha,
        "mc_paths": mc_paths,
        "VaR": float(var),
        "CVaR": float(cvar),
        "seed": int(args.seed),
        "weights": [float(x) for x in weights],
        "tickers": tickers,
        "run_id": run_id,
    }
    write_json(outdir / "var_cvar.json", var_cvar_payload)
    write_json(outdir / "backtest.json", backtest.to_dict())
    backtest.detail_df().to_csv(
        outdir / "backtest_detail.csv",
        columns=["date", "var", "realized_loss", "breach"],
        index=False,
    )

    stats = dataset_stats(aligned_prices, returns_df)
    params_payload = {
        "run_id": run_id,
        "args": {
            "tickers": tickers,
            "start": resolved_start,
            "end": resolved_end,
            "mode": mode,
            "decay_lambda": args.decay_lambda,
            "alpha": args.alpha,
            "mc_paths": mc_paths,
            "backtest_mc_paths": backtest_mc_paths,
            "seed": args.seed,
            "weights": weights,
            "debug": bool(args.debug),
            "offline": bool(args.offline),
            "progress_every": int(args.progress_every),
            "use_cache": use_cache,
            "data_source": args.data_source,
            "data_path": args.data_path,
            "cache_dir": args.cache_dir,
            "init_window": args.init_window,
            "backend": args.backend,
            "gpu_device": args.gpu_device,
            "bench": bool(args.bench),
            "bench_warmup": int(args.bench_warmup),
            "bench_repeat": int(args.bench_repeat),
            "auto_adjust": True,
            "interval": "1d",
        },
        "dataset_stats": stats,
        "cache": {
            "cache_dir": str(cache_dir),
            "metadata": cache_metadata,
        },
    }
    write_json(outdir / "params.json", params_payload)

    summary_lines = [
        f"tickers={','.join(tickers)}",
        f"rows={stats['return_rows']}",
        f"mode={mode}",
        f"lambda={args.decay_lambda}",
        f"alpha={args.alpha}",
        f"mc_paths={mc_paths}",
        f"backtest_mc_paths={backtest_mc_paths}",
        f"VaR={var:.8f}",
        f"CVaR={cvar:.8f}",
        f"backend={args.backend}",
        f"breach_rate={backtest.breach_rate:.6f}",
        f"expected_rate={backtest.expected_rate:.6f}",
        f"outdir={outdir}",
    ]
    summary_text = "\n".join(summary_lines) + "\n"

    write_text(outdir / "logs.txt", summary_text)
    write_summary_artifacts(
        outdir=outdir,
        summary={
            "data": f"tickers={','.join(tickers)} rows={stats['return_rows']} range={stats['return_start']}..{stats['return_end']}",
            "model": f"EWMA lambda={args.decay_lambda} init_window={args.init_window}",
            "mc": f"paths={mc_paths} alpha={args.alpha} seed={args.seed}",
            "backtest": f"breach_rate={backtest.breach_rate:.6f} expected_rate={backtest.expected_rate:.6f} obs={backtest.num_obs}",
        },
    )

    logger.info("Daily EWMA -> MC VaR Backtest")
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
    except (RuntimeError, BackendError) as exc:
        logger.error(str(exc))
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
