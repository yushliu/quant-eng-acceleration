// Single source of truth for both pages:
// - latest: concise version used by Home > Latest Updates
// - detail: full version used by Plan > meeting detail cards
window.COMMUNITY_MEETINGS = [

  {
    "id": "2025-11",
    "ym": "2025-11",
    "shortTag": "RISK",
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
