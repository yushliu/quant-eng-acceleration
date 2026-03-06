// Single source of truth for both pages:
// - latest: concise version used by Home > Latest Updates
// - detail: full version used by Plan > meeting detail cards
window.COMMUNITY_MEETINGS = [
  {
    "id": "2026-01-1",
    "ym": "2026-01",
    "shortTag": "ALGORITHM",
    "status": "COMPLETED",
    "downloadItemId": "risk-model-comparison-stage2-2026-01-1",
    "detailViews": [
      {
        "id": "infrastructure",
        "label": "Infrastructure",
        "detail": {
          "title": "Model Comparison Stage 2 - Infrastructure",
          "cards": []
        }
      },
      {
        "id": "algorithm",
        "label": "Algorithm",
        "detail": {
          "title": "Meeting Record - Stage 2 Implementation and Preliminary Results",
          "cards": [
            {
              "heading": "Meeting Objective",
              "bullets": [
                "Recorded the completion of Stage 2 for the Risk Team project under the shared multi-asset comparison framework.",
                "Moved from the Stage 1 design specification into an implementation-ready workflow using a shared input dataset and a shared portfolio definition.",
                "This stage does not provide a final recommendation or final interpretation; those are reserved for Stage 3."
              ]
            },
            {
              "heading": "Implementation Build",
              "bullets": [
                "Implemented the Stage 2 comparison runner in risk_pipeline/cli/run_comparison.py.",
                "Added a workflow verification test in tests/test_comparison_workflow.py.",
                "The workflow reuses the existing returns.csv, builds an equal-weight SPY/QQQ/TLT/GLD portfolio, runs Historical Simulation, Parametric Normal, and repo-based EWMA + Monte Carlo on the same aligned dates, and writes CSV/Markdown artifacts."
              ]
            },
            {
              "heading": "Completed Implementation Scope",
              "bullets": [
                "Reused the existing returns.csv dataset from the risk pipeline output without re-downloading market data.",
                "Constructed a common equal-weight baseline portfolio using SPY, QQQ, TLT, and GLD.",
                "Ran all three selected models successfully: Historical Simulation VaR/CVaR, Parametric Normal VaR/CVaR, and EWMA + Monte Carlo VaR/CVaR."
              ]
            },
            {
              "heading": "Shared Experimental Setup",
              "bullets": [
                "Input file: returns.csv. Portfolio: SPY / QQQ / TLT / GLD. Weighting rule: equal weight.",
                "Horizon: 1-day. Confidence level: 0.99. Rolling/init window: 60 trading days.",
                "Loss definition: portfolio_loss = - portfolio_return. Breach definition: realized loss > estimated VaR. Number of aligned observations: 189."
              ]
            },
            {
              "heading": "Generated Output Artifacts",
              "bullets": [
                "Generated portfolio_returns.csv, historical_daily_risk.csv, parametric_daily_risk.csv, ewma_mc_daily_risk.csv, comparison_summary.csv, and comparison_analysis.md.",
                "Output directory recorded for the baseline run: results/comparison/20260306T220658Z.",
                "Prepared the workflow output package for later Stage 3 interpretation."
              ]
            },
            {
              "heading": "Summary Comparison Table",
              "bullets": [
                "Historical Simulation: avg VaR 0.016231, avg CVaR 0.018748, breach rate 0.037037, n breaches 7.",
                "Parametric Normal: avg VaR 0.016414, avg CVaR 0.018950, breach rate 0.031746, n breaches 6.",
                "EWMA + Monte Carlo: avg VaR 0.017063, avg CVaR 0.019541, breach rate 0.015873, n breaches 3."
              ]
            },
            {
              "heading": "How To Use",
              "bullets": [
                "Use stage2_meeting_record.md for the full meeting-style write-up and project record.",
                "Use comparison_summary.csv when you want the machine-readable model comparison table for later plotting, analysis, or website integration.",
                "Use comparison_analysis.md for the short internal interpretation note, and use params.json plus summary.md to understand the shared run setup quickly."
              ]
            },
            {
              "heading": "How To Run",
              "bullets": [
                "Run the Stage 2 workflow through risk_pipeline/cli/run_comparison.py inside the project environment so all three models share the same input and output schema.",
                "Expected baseline input is the existing returns.csv; the workflow should construct the equal-weight SPY/QQQ/TLT/GLD portfolio series and then write the comparison outputs under results/comparison/<run_id>/.",
                "Verification command used in this stage: ./.venv/bin/python -m unittest tests.test_comparison_workflow."
              ]
            },
            {
              "heading": "Main Findings",
              "bullets": [
                "EWMA + Monte Carlo was the most conservative in average VaR/CVaR and also closest to the expected 1 percent breach rate in this baseline run.",
                "Parametric Normal was the smoothest model by the CVaR stability proxy.",
                "Historical Simulation was less conservative than EWMA + Monte Carlo and recorded the highest breach count in the current baseline run."
              ]
            },
            {
              "heading": "Stage 2 Completion Check",
              "bullets": [
                "Completed: reuse existing returns.csv, build equal-weight baseline portfolio, run all three models, align outputs on shared dates, generate summary comparison table, and save machine-readable artifacts.",
                "Prepared a Stage 3-ready results package for interpretation and final comparison work.",
                "Status: completed for baseline portfolio first run."
              ]
            },
            {
              "heading": "Verification",
              "bullets": [
                "Implementation workflow test passed successfully.",
                "Verification item: comparison workflow unit test.",
                "Command used: ./.venv/bin/python -m unittest tests.test_comparison_workflow."
              ]
            },
            {
              "heading": "Notes for Next Stage",
              "bullets": [
                "Stage 3 will handle interpretation of model differences, discussion of tradeoffs, evaluation on the second portfolio if required, and the final recommendation for benchmark baseline selection.",
                "No final model recommendation is made in this Stage 2 record.",
                "The current output package is intended to serve as the direct input to Stage 3."
              ]
            },
            {
              "heading": "Meeting Outcome",
              "bullets": [
                "Stage 2 was completed successfully for the baseline portfolio first run.",
                "The team now has a shared comparison result package that can be used as the input for Stage 3 interpretation and final comparison work."
              ]
            }
          ]
        }
      }
    ],
    "latest": {
      "date": "2026-01",
      "title": "Meeting Record - Stage 2 Implementation and Preliminary Results",
      "points": [
        "Completed the first baseline-portfolio implementation pass using a shared equal-weight SPY, QQQ, TLT, GLD portfolio built from the existing returns.csv dataset.",
        "Ran Historical Simulation, Parametric Normal, and EWMA + Monte Carlo under the same 1-day, 99 percent, 60-day rolling setup and generated a shared comparison package.",
        "Recorded preliminary comparison outputs without making a final recommendation; interpretation and baseline selection are deferred to Stage 3."
      ]
    },
    "detail": {
      "title": "Meeting Record - Stage 2 Implementation and Preliminary Results",
      "cards": []
    }
  },

  {
    "id": "2025-12-2",
    "ym": "2025-12",
    "shortTag": "COMPARISON",
    "status": "COMPLETED",
    "downloadItemId": "risk-model-comparison-stage1-2025-12-2",
    "detailViews": [
      {
        "id": "infrastructure",
        "label": "Infrastructure",
        "detail": {
          "title": "Model Comparison Stage 1 - Infrastructure",
          "cards": []
        }
      },
      {
        "id": "algorithm",
        "label": "Algorithm",
        "detail": {
          "title": "Meeting Record - Stage 1 Research Design + Specification",
          "cards": [
            {
              "heading": "Report",
              "bullets": [
                "Risk",
                "Model Comparison Stage 1 - Research Design + Specification",
                "Report"
              ]
            },
            {
              "heading": "What This Build Did",
              "bullets": [
                "Defined the first formal comparison framework for the club's Risk Team under the existing reproducible multi-asset pipeline.",
                "Selected three Phase 1 risk models for comparison: Historical Simulation VaR/CVaR, Parametric VaR/CVaR, and EWMA + Monte Carlo VaR/CVaR.",
                "Converted the club's prior infrastructure progress into a research-oriented benchmark design by locking the model set, portfolio structure, and evaluation criteria."
              ]
            },
            {
              "heading": "Project Objective",
              "bullets": [
                "The goal of this stage is not to produce final model rankings yet, but to define what a meaningful risk-model comparison should look like under a shared framework.",
                "The project asks which model is the most stable, most responsive, most conservative, and most suitable as the club's future benchmark baseline.",
                "This stage establishes the design rules needed before implementation and interpretation can begin in later updates."
              ]
            },
            {
              "heading": "Phase 1 Model Set",
              "bullets": [
                "Historical Simulation VaR/CVaR: empirical rolling-window baseline using realized portfolio returns directly.",
                "Parametric VaR/CVaR: moment-based model using estimated mean/covariance with an approximate normality assumption.",
                "EWMA + Monte Carlo VaR/CVaR: volatility-sensitive scenario model aligned with the club's existing reproducible risk pipeline."
              ]
            },
            {
              "heading": "Portfolio Design",
              "bullets": [
                "Baseline portfolio: SPY, QQQ, TLT, GLD with equal weights.",
                "Comparison portfolio: SPY, QQQ, IWM, TLT with equal weights.",
                "The two-portfolio setup was chosen to test whether model behavior remains consistent across a more balanced allocation and a more equity-heavy allocation."
              ]
            },
            {
              "heading": "Evaluation Framework",
              "bullets": [
                "Locked the common comparison rules across models: 1-day horizon, alpha = 0.99, shared rolling design, and identical portfolio definitions within each experiment.",
                "Defined the main evaluation metrics: breach rate, breach rate gap, exceedance severity, CVaR stability, responsiveness to volatility change, and conservativeness.",
                "Standardized the loss convention and breach definition so later results reflect model behavior rather than inconsistent setup choices."
              ]
            },
            {
              "heading": "Expected Hypotheses",
              "bullets": [
                "Historical Simulation is expected to be intuitive and relatively stable, but slower to react during sharp volatility changes.",
                "Parametric VaR/CVaR is expected to be smooth and efficient, but may understate tail risk under fat-tailed market behavior.",
                "EWMA + Monte Carlo is expected to respond more quickly to changing volatility and may provide more conservative tail estimates in stressed periods."
              ]
            },
            {
              "heading": "Stage 1 Deliverables",
              "bullets": [
                "Completed a Stage 1 design report covering project objective, research questions, scope, model definitions, portfolio definitions, and evaluation criteria.",
                "Drafted model cards for all three Phase 1 models, including assumptions, inputs, outputs, strengths, weaknesses, and expected behavior.",
                "Established the implementation handoff for later stages so all models can be connected to the same reproducible artifact workflow."
              ]
            },
            {
              "heading": "What You Can Use It For",
              "bullets": [
                "A formal blueprint for implementing the club's first true multi-model risk benchmark study.",
                "A shared design standard so later portfolio runs and backtests can be interpreted consistently.",
                "A clean transition from infrastructure milestones to a research-style comparison project with an eventual model recommendation."
              ]
            },
            {
              "heading": "Next Step",
              "bullets": [
                "Implement the three selected models under the same output schema and run them on the baseline portfolio first.",
                "Generate preliminary daily VaR/CVaR series and backtest metrics before extending the comparison to the second portfolio.",
                "Use the next update to verify that all models run correctly under the shared design and to review the first cross-model differences."
              ]
            },
            {
              "heading": "Published Artifacts",
              "bullets": [
                "Saved Stage 1 documentation: stage1_report.md, model_cards.md, evaluation_design.md, portfolio_definition.md.",
                "Saved design traceability outputs: params.json and summary.md for the selected model set, portfolio setup, and evaluation rules.",
                "Prepared the project for Stage 2 implementation under the existing reproducible artifact pipeline.",
                "Independent student community. Not affiliated with or endorsed by any University. No live trading; no exchange connectivity."
              ]
            }
          ]
        }
      }
    ],
    "latest": {
      "date": "2025-12 (2nd)",
      "title": "Meeting Record - Stage 1 Research Design + Specification",
      "points": [
        "Defined the first formal comparison framework for the Risk Team under the club's reproducible multi-asset pipeline and locked the initial model set, portfolio setup, and evaluation rules.",
        "Selected three Phase 1 models for comparison: Historical Simulation VaR/CVaR, Parametric VaR/CVaR, and EWMA + Monte Carlo VaR/CVaR.",
        "Published Stage 1 research artifacts including the design report, model cards, evaluation design, portfolio definition, and traceability files for later implementation."
      ]
    },
    "detail": {
      "title": "Meeting Record - Stage 1 Research Design + Specification",
      "cards": []
    }
  },

  {
    "id": "2025-12",
    "ym": "2025-12",
    "shortTag": "CUDA",
    "status": "COMPLETED",
    "downloadItemId": "pricing-no-arbitrage-cpu-vs-gpu-2025-12",
    "latest": {
      "date": "2025-12",
      "title": "Derivatives Pricing + No-Arbitrage Checks (SPY, CPU vs GPU T4)",
      "points": [
        "Built a reproducible derivatives pricing pipeline that reuses the existing yfinance download patch, estimates sigma via 60-day historical volatility, and prices a European call via Black–Scholes, Binomial CRR, and Monte Carlo.",
        "Validated correctness against the Black–Scholes oracle and no-arbitrage checks: CRR (1000 steps) matched BS to numerical precision, put-call parity error was near zero, and both CPU and GPU Monte Carlo 95% CIs contained the BS price.",
        "Benchmarked Monte Carlo on NVIDIA Tesla T4 (CuPy): steady-state GPU runs were about 4.5× faster than CPU for 100,000 paths, while the first GPU run included one-time CUDA initialization overhead."
      ]
    },
    "detail": {
      "title": "Derivatives Pricing + No-Arbitrage Checks (SPY, CPU vs GPU T4)",
      "cards": [
        {
          "heading": "What This Build Did",
          "bullets": [
            "Reused the existing yfinance download patch to fetch and align SPY prices, then computed log returns for volatility estimation.",
            "Estimated sigma using a 60-day historical volatility baseline (annualization 252) and used it consistently across all pricers.",
            "Priced a European option using three engines: Black–Scholes (analytic), Binomial CRR (tree), and Monte Carlo (CPU and GPU backends)."
          ]
        },
        {
          "heading": "Data and Run Snapshot",
          "bullets": [
            "Underlying: SPY. Date range: 2025-01-01..2026-01-01. rows_prices=250, rows_returns=249.",
            "Option: European call. S0=681.919983, K=500, T=0.082192 years (30 days), r=0.03, q=0.0.",
            "Sigma (hist vol): window=60, sigma_annual=0.13008054 (annualization=252)."
          ]
        },
        {
          "heading": "Correctness Check: BS vs CRR vs Monte Carlo",
          "bullets": [
            "Black–Scholes call price: 183.1513408860.",
            "Binomial CRR (steps=1000): matched BS to numerical precision (abs_error_vs_bs ≈ 3.7e-11).",
            "Monte Carlo (paths=100000): CPU price=183.22539960 (CI95 [183.06722407, 183.38357514]); GPU(T4) price=183.14226308 (CI95 [182.98490125, 183.29962491]); BS lies within both CIs."
          ]
        },
        {
          "heading": "No-Arbitrage Validation",
          "bullets": [
            "Put-call parity: abs_error ≈ 2.84e-14 (numerical noise level).",
            "Bounds checks: call_within_bounds=true and put_within_bounds=true for the configured inputs."
          ]
        },
        {
          "heading": "Performance: CPU vs GPU (NVIDIA Tesla T4)",
          "bullets": [
            "CPU Monte Carlo timing (mean over 3): 0.005485 s for 100,000 paths.",
            "GPU Monte Carlo timing (T4, CuPy): first run included CUDA initialization (2.0775 s); steady-state runs were 0.001534 s and 0.000933 s.",
            "Steady-state speedup: about 4.5× faster on GPU than CPU for the same path count, after warm-up."
          ]
        },
        {
          "heading": "Published Artifacts",
          "bullets": [
            "Saved pricing outputs: price.json (BS/CRR/MC + CI + errors) and greeks.json (analytic/finite-diff as configured).",
            "Saved volatility baseline: hist_vol.json with sigma_annual and window_used for traceability.",
            "Saved benchmarking and reproducibility: bench.json, params.json, download_report.json, logs.txt, and summary.md."
          ]
        }
      ]
    }
  },  
  {
    "id": "2025-11",
    "ym": "2025-11",
    "shortTag": "RISK",
    "status": "COMPLETED",
    "downloadItemId": "yfinance-rate-limit-patch-2025-11",
    "latest": {
      "date": "2025-11",
      "title": "yfinance Rate Limit Patch + Multi-Asset Download Stitching (1 ticker × 3 months)",
      "points": [
        "Added a modular download patch that splits yfinance requests into small chunks (1 ticker × 3 months), retries with exponential backoff + jitter, caches each chunk on disk, and stitches results back into a single wide price table.",
        "Kept the core VaR/CVaR/backtest compute path unchanged. Only the data download layer and the CLI entry wiring were updated to support patch-based downloads and multi-ticker inputs.",
        "Added a new artifact download_report.json that records per-chunk status (cache_hit, retries, rows, error) plus summary totals, and validated the stitching/merge logic with fast unit tests (5 passed)."
      ]
    },
    "detail": {
      "title": "yfinance Rate Limit Patch + Multi-Asset Download Stitching (1 ticker × 3 months)",
      "cards": [
        {
          "heading": "What This Build Did",
          "bullets": [
            "Implemented a chunked download module that splits a (ticker, date-range) request into 3-month windows, downloads each window separately, and reassembles the full series in chronological order.",
            "Added chunk-level caching at data/cache/yfinance/{ticker}/{start}_{end}.csv so reruns reuse cached data instead of re-downloading.",
            "Added per-chunk retry logic using exponential backoff with jitter to reduce transient failures caused by yfinance rate limits."
          ]
        },
        {
          "heading": "New Feature: Chunking and Stitching",
          "bullets": [
            "Chunk rule: 1 ticker × 3 months is the atomic unit, controlled by chunk_months for easy tuning.",
            "Stitching rule: concatenate chunk outputs, sort by date, and deduplicate the date index so boundary overlaps do not create duplicate rows.",
            "Multi-ticker merge: stitch each ticker independently, then merge into a wide price table with columns = tickers for downstream alignment and return generation."
          ]
        },
        {
          "heading": "New Feature: Multi-Asset Baseline Wiring",
          "bullets": [
            "Expanded the CLI entrypoint to accept a comma-separated tickers list and run the same pipeline on multi-asset inputs.",
            "Kept prices_aligned.csv and returns.csv in wide format (columns = tickers) for transparency and reuse.",
            "Aggregated wide returns into a baseline PORTFOLIO return series using equal weights (1/N) and fed that series into the existing EWMA/MC/backtest path without changing the core compute functions."
          ]
        },
        {
          "heading": "New Feature: Download Reporting and Reproducibility",
          "bullets": [
            "Added a new artifact download_report.json to record chunk-level outcomes: ticker, chunk_start, chunk_end, cache_hit, retries, rows, and error if any.",
            "Extended params.json to include tickers, chunk_months, cache_dir, retry settings, and weights_mode (equal/custom) so each run is fully traceable.",
            "Designed the patch to be modular so cached data can be reused and the rest of the risk pipeline remains stable across releases."
          ]
        },
        {
          "heading": "How To Run",
          "bullets": [
            "Example verification run: SPY,QQQ,TLT over 2025-01-01..2026-01-01 with chunk_months=3 to produce 12 chunks total (3 tickers × 4 windows).",
            "CLI flags: --enable-download-patch --chunk-months --cache-dir --download-retries --download-base-sleep --download-jitter.",
            "Expected outputs: download_report.json plus the existing risk artifacts and wide tables for prices and returns."
          ]
        },
        {
          "heading": "Validation",
          "bullets": [
            "Added unit tests for window generation, stitching dedupe, caching behavior (with yfinance mocked), and multi-asset merge with a 3 tickers × 12 months chunk count check.",
            "Confirmed tests pass locally using a one-shot command without changing system settings: PYTHONPATH=. pytest -q tests/test_download_patch.py (5 passed).",
            "Performed a syntax compile check on risk_pipeline and tests to ensure clean imports and packaging consistency."
          ]
        }
      ]
    }
  },
  {
    "id": "2025-11",
    "ym": "2025-11",
    "shortTag": "CUDA",
    "status": "COMPLETED",
    "downloadItemId": "ewma-mcvar-backtest-2025-11",
    "latest": {
      "date": "2025-11",
      "title": "Daily EWMA \u2192 Monte Carlo VaR/CVaR Backtest (SPY, GPU T4)",
      "points": [
        "Added a GPU backend (NVIDIA T4) for the Daily EWMA covariance \u2192 Monte Carlo VaR/CVaR pipeline, keeping the data window and parameters aligned with the CPU baseline for a fair accuracy check.",
        "On SPY (2025-08-04..2026-02-06), EWMA lambda 0.94 and MC paths 3000 produced VaR 0.018772 and CVaR 0.020970 on GPU, with the same breach_rate 0.014493 over 69 observations as the CPU run.",
        "Both CPU and GPU runs experienced frequent yfinance rate limiting. The next update will add a small download patch component that automatically splits requests and re-assembles results to reduce rate-limit failures."
      ]
    },
    "detail": {
      "title": "Daily EWMA \u2192 Monte Carlo VaR/CVaR Backtest (SPY, GPU T4)",
      "cards": [
        {
          "heading": "What This Build Did",
          "bullets": [
            "Ran the same daily risk pipeline as the CPU version, but executed Monte Carlo sampling and portfolio-loss computation on a GPU backend.",
            "Kept the EWMA covariance and Cholesky-stabilized scenario generation workflow unchanged to preserve the production-like architecture.",
            "Generated 1-day tail risk metrics (VaR and CVaR at alpha 0.99) and evaluated coverage via the same rolling backtest procedure."
          ]
        },
        {
          "heading": "What You Can Use It For",
          "bullets": [
            "A GPU-capable baseline for a daily risk engine that can later scale to multi-asset portfolios and larger Monte Carlo settings.",
            "A reproducible artifact workflow for GitHub Pages that supports side-by-side CPU vs GPU accuracy and performance comparisons.",
            "A clean stepping stone toward CUDA-focused optimization, with the current GPU backend serving as the first acceleration milestone."
          ]
        },
        {
          "heading": "Data and Run Snapshot",
          "bullets": [
            "Data matches the prior CPU baseline: ticker SPY, date range 2025-08-04..2026-02-06, rows 130, backtest observations 69.",
            "Model/MC: EWMA lambda 0.94, init_window 60, alpha 0.99, paths 3000, seed 9 (fast-mode).",
            "GPU (NVIDIA T4) results: VaR 0.01877217, CVaR 0.02096967, breach_rate 0.014493 (expected 0.010000).",
            "CPU baseline reference on the same data/params: VaR 0.01922933, CVaR 0.02183821, breach_rate 0.014493."
          ]
        },
        {
          "heading": "Operational Note: yfinance Rate Limits",
          "bullets": [
            "Both the CPU and GPU pipelines can hit yfinance rate limits during downloads, causing transient failures even for small ticker sets.",
            "To reduce failures, the next update will introduce a small download patch component that splits large requests into smaller calls and then re-combines the aligned results.",
            "This patch will stay modular so the rest of the risk pipeline does not change, and cached data can still be used when available."
          ]
        },
        {
          "heading": "Published Artifacts",
          "bullets": [
            "Saved machine-readable outputs for the website: summary.json, var_cvar.json, backtest.json, params.json.",
            "Saved analysis tables for transparency and reuse: backtest_detail.csv, prices_aligned.csv, returns.csv, cov.csv.",
            "Saved reproducibility logs and a human summary: logs.txt and summary.md."
          ]
        }
      ]
    }
  },

  {
    "id": "2025-10",
    "ym": "2025-10",
    "shortTag": "RISK",
    "status": "COMPLETED",
    "downloadItemId": "ewma-mcvar-backtest-2025-10",
    "latest": {
      "date": "2025-10",
      "title": "Daily EWMA → Monte Carlo VaR/CVaR Backtest (SPY)",
      "points": [
        "Built a production-like daily risk pipeline that estimates EWMA covariance and computes 1-day 99% VaR and CVaR via Monte Carlo simulation, then backtests coverage on realized returns.",
        "Ran a fast-mode backtest on SPY (2025-08-04..2026-02-06) with EWMA lambda 0.94 and MC paths 3000, producing VaR 0.019229 and CVaR 0.021838 with breach_rate 0.014493 over 69 observations."
      ]
    },
    "detail": {
      "title": "Daily EWMA → Monte Carlo VaR/CVaR Backtest (SPY)",
      "cards": [
        {
          "heading": "What This Build Did",
          "bullets": [
            "Downloaded and aligned daily price data and converted it to log returns for a consistent risk input stream.",
            "Estimated a time-varying EWMA covariance (lambda 0.94) and generated Monte Carlo return scenarios using a stabilized Cholesky pipeline.",
            "Computed 1-day tail risk metrics (VaR and CVaR at alpha 0.99) and evaluated coverage via a rolling backtest."
          ]
        },
        {
          "heading": "What You Can Use It For",
          "bullets": [
            "A clean baseline for a daily risk engine that can be extended to multi-asset portfolios and longer horizons without changing the core architecture.",
            "A reproducible artifact pipeline for publishing results to GitHub Pages (summary + JSON + CSV) and later comparing CPU vs CUDA implementations.",
            "A testable foundation for adding more formal backtest diagnostics and scaling from fast-mode to full-mode runs."
          ]
        },
        {
          "heading": "Data and Run Snapshot",
          "bullets": [
            "Ticker: SPY. Date range: 2025-08-04..2026-02-06. Rows: 130. Backtest observations: 69.",
            "Model/MC: EWMA lambda 0.94, init_window 60, alpha 0.99, paths 3000, seed 9 (fast-mode).",
            "Results: VaR 0.01922933, CVaR 0.02183821, breach_rate 0.014493 (expected 0.010000)."
          ]
        },
        {
          "heading": "Published Artifacts",
          "bullets": [
            "Saved machine-readable outputs for the website: summary.json, var_cvar.json, backtest.json, params.json.",
            "Saved analysis tables for transparency and reuse: backtest_detail.csv, prices_aligned.csv, returns.csv, cov.csv.",
            "Saved reproducibility logs and a human summary: logs.txt and summary.md."
          ]
        }
      ]
    }
  },
  
  {
    "id": "2025-10",
    "ym": "2025-10",
    "shortTag": "CUDA",
    "status": "COMPLETED",
    "downloadItemId": "intro-cuda-2025-10",
    "latest": {
      "date": "2025-10",
      "title": "Intro to CUDA with Monte Carlo Risk",
      "points": [
        "Introduced CUDA basics and the GPU execution model for array workloads.",
        "Ported the Monte Carlo VaR and CVaR baseline to GPU using CuPy on CUDA and logged VaR 0.014019 and CVaR 0.016107."
      ]
    },
    "detail": {
      "title": "Intro to CUDA with Monte Carlo Risk",
      "cards": [
        {
          "heading": "CUDA Track Kickoff",
          "bullets": [
            "Explained what CUDA is and why GPUs help with parallel sampling.",
            "Mapped NumPy style arrays to CuPy arrays on the GPU.",
            "Confirmed the run executed on CUDA with CuPy."
          ]
        },
        {
          "heading": "Baseline Kernel",
          "bullets": [
            "Used the same Monte Carlo VaR and CVaR workflow as the Python intro.",
            "Kept the portfolio setup consistent with 10 assets and equal weights.",
            "Ran 200000 paths at alpha 0.99 for tail risk."
          ]
        },
        {
          "heading": "Results Snapshot",
          "bullets": [
            "Recorded VaR 0.014019 and CVaR 0.016107 on the GPU run.",
            "Recorded 3.463 seconds elapsed time for the GPU run.",
            "Saved the numbers for later CPU and GPU consistency checks."
          ]
        },
        {
          "heading": "Next Steps for Visibility",
          "bullets": [
            "Export a small results file and commit it with a clear timestamp.",
            "Tag a repo release so the run is easy to reference in a resume.",
            "Add a short reproduction guide for Kaggle GPU runs."
          ]
        }
      ]
    }
  },

  {
    "id": "2025-09",
    "ym": "2025-09",
    "shortTag": "Risk",
    "status": "COMPLETED",
    "downloadItemId": "meeting-2025-09",
    "latest": {
      "date": "2025-09",
      "title": "Monte Carlo VaR CVaR Intro",
      "points": [
        "Introduced portfolio risk with Monte Carlo VaR and CVaR in Python.",
        "Ran a GPU baseline with CuPy on CUDA and recorded VaR 0.014019 and CVaR 0.016107 at alpha 0.99."
      ]
    },
    "detail": {
      "title": "Monte Carlo VaR CVaR Intro",
      "cards": [
        {
          "heading": "What We Built",
          "showCodeLink": true,
          "bullets": [
            "Simulated portfolio returns and converted them to losses.",
            "Computed 99 percent VaR from the loss quantile.",
            "Computed 99 percent CVaR from the average tail loss."
          ]
        },
        {
          "heading": "Run Setup",
          "bullets": [
            "Used 10 assets with equal weights.",
            "Used 200000 Monte Carlo paths.",
            "Used alpha 0.99 for tail risk."
          ]
        },
        {
          "heading": "Acceleration Result",
          "bullets": [
            "Executed on GPU with CuPy on CUDA.",
            "Observed elapsed time 3.463 seconds on the GPU run.",
            "Produced VaR 0.014019 and CVaR 0.016107."
          ]
        },
        {
          "heading": "Reproducibility Notes",
          "bullets": [
            "Keep parameters and seed fixed for comparisons.",
            "Record device type and runtime for each run.",
            "Save results as a versioned artifact in the repo."
          ]
        }
      ]
    }
  },
];
