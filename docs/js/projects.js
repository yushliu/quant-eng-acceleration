const PROJECTS_CATALOG = [
  {
    id: "mc-var-cvar-foundations",
    title: "Monte Carlo VaR/CVaR Baseline and CUDA Acceleration",
    summary: "Establishes a reproducible Monte Carlo workflow for portfolio tail-risk estimation and extends the same framework into a first-pass CUDA/CuPy implementation for GPU-based execution.",
    cardSummary: "This project builds the club’s first shared Monte Carlo VaR/CVaR benchmark and carries the same controlled setup into GPU execution, creating a foundation for later consistency checks, model comparisons, and larger-scale scenario studies.",
    tags: ["Algorithm", "Curated", "Completed"],
    overview: "This project establishes the club’s first reusable Monte Carlo workflow for portfolio tail-risk estimation and then extends that same workflow into a CUDA/CuPy environment for GPU execution. Rather than treating the baseline model and the acceleration layer as separate efforts, the project frames them as one continuous benchmark line: first define a stable and interpretable VaR/CVaR pipeline, then evaluate how the same structure performs under parallel GPU computation.",
    why: "In financial engineering, risk estimates are only useful when the underlying assumptions and reporting logic remain consistent across implementations. A faster system is not automatically a better one if the methodology changes at the same time. This project matters because it creates a controlled Monte Carlo VaR/CVaR baseline and then carries that same design into GPU execution, making later comparisons in speed, consistency, and scalability much more meaningful.",
    approachIntro: "We organized the project around one fixed Monte Carlo configuration and reused it across both the baseline and CUDA stages.",
    approach: [
      "defined a 10-asset portfolio with equal weights",
      "simulated portfolio return paths under a shared Monte Carlo setup",
      "converted simulated returns into loss realizations",
      "estimated 99% VaR from the loss quantile",
      "estimated 99% CVaR from the average tail loss beyond the VaR cutoff",
      "held the core assumptions fixed at 200,000 paths and alpha = 0.99",
      "mapped the same array-based workflow from NumPy logic into CuPy for GPU execution"
    ],
    workflowSteps: [
      {
        label: "Step 1",
        title: "Portfolio Setup",
        bullets: [
          "Define a 10-asset equal-weight portfolio under a shared benchmark specification."
        ]
      },
      {
        label: "Step 2",
        title: "Monte Carlo Scenario Generation",
        bullets: [
          "Generate simulated portfolio return paths under the controlled baseline setup."
        ]
      },
      {
        label: "Step 3",
        title: "Loss Conversion",
        bullets: [
          "Transform simulated returns into loss values for tail-risk analysis."
        ]
      },
      {
        label: "Step 4",
        title: "VaR / CVaR Estimation",
        bullets: [
          "Compute 99% VaR and 99% CVaR from the simulated loss distribution."
        ]
      },
      {
        label: "Step 5",
        title: "CUDA / CuPy Execution",
        bullets: [
          "Translate the array-based workflow into CuPy and execute the same logic in a CUDA environment."
        ]
      }
    ],
    constraints: [
      "tail-risk estimates remain sensitive to simulation count, random seed policy, and portfolio assumptions",
      "CPU/GPU comparisons are only meaningful when the benchmark configuration remains unchanged",
      "the initial workflow was intentionally kept simple so it could serve as a stable base for later extensions"
    ],
    resultsPrimaryHeading: "Project Outcomes",
    results: [
      "established the club’s first shared Monte Carlo benchmark for VaR/CVaR estimation",
      "confirmed end-to-end GPU execution using CuPy on CUDA",
      "preserved a controlled setup suitable for later CPU/GPU comparison",
      "created reusable outputs for downstream benchmarking and reporting work"
    ],
    resultsSecondaryHeading: "Recorded Benchmark Outputs",
    resultsSecondary: [
      "VaR = 0.014019",
      "CVaR = 0.016107",
      "GPU runtime = 3.463 seconds"
    ],
    runSummary: {
      configuration: [
        ["Execution Environment", "CUDA with CuPy"],
        ["Portfolio Size", "10 assets"],
        ["Weight Scheme", "Equal weights"],
        ["Monte Carlo Paths", "200,000"],
        ["Tail-Risk Alpha", "0.99"]
      ],
      outputs: [
        ["VaR", "0.014019"],
        ["CVaR", "0.016107"],
        ["Runtime", "3.463 seconds"]
      ]
    },
    nextStep: "The next step is to treat this completed build as a benchmark foundation rather than an endpoint. From here, the project can support direct CPU/GPU consistency checks under identical assumptions, larger scenario sweeps, and integration with later project lines such as EWMA-based risk modeling and cross-model comparison studies.",
    artifacts: [
      { label: "Open Plan Context", href: "./plan.html" },
      { label: "Open Download Files", href: "./download.html" },
      { label: "Open Legacy Release", href: "./archive.html" }
    ]
  },
  {
    id: "ewma-monte-carlo-backtest",
    title: "EWMA Monte Carlo Backtest",
    summary: "Develops a dynamic tail-risk workflow by combining EWMA covariance estimation, Monte Carlo scenario generation, and rolling backtest validation under a controlled benchmark structure.",
    cardSummary: "This project extends the club’s baseline Monte Carlo risk workflow by introducing time-varying EWMA covariance updates and rolling backtesting, creating a more realistic framework for evaluating tail-risk stability across changing market conditions.",
    tags: ["Algorithm", "In Progress", "Backtest"],
    overview: "This project extends the club’s baseline Monte Carlo risk workflow by replacing static covariance assumptions with an EWMA-based covariance process and embedding the resulting model in a rolling backtest framework. Rather than treating risk estimation as a one-shot simulation exercise, the project evaluates how a dynamic VaR/CVaR engine behaves over time under changing market conditions. The result is a more realistic benchmark line for studying tail-risk stability, coverage behavior, and implementation consistency across CPU and GPU environments.",
    why: "In financial engineering, static covariance assumptions can become unreliable when volatility regimes shift or correlations change over time. A tail-risk model is more useful when it not only produces VaR and CVaR estimates, but can also be evaluated through rolling backtests against realized outcomes. This project matters because it moves the club’s Monte Carlo risk workflow closer to a production-style validation setting: covariance is updated dynamically, risk estimates are tested over time, and model credibility can be judged through observed breach behavior rather than through one-off outputs alone.",
    approachIntro: "We structured the project around one reproducible daily risk-engine workflow and held the evaluation logic consistent across implementation stages.",
    approach: [
      "downloaded and aligned daily price data for a shared risk input stream",
      "converted prices into log returns for model estimation and simulation",
      "estimated a time-varying EWMA covariance matrix with lambda = 0.94",
      "used a stabilized Cholesky-based pipeline to generate Monte Carlo return scenarios",
      "computed 1-day VaR and CVaR at alpha = 0.99",
      "evaluated model coverage through a rolling backtest over held-out observations",
      "preserved the same data, parameters, and reporting logic for later CPU/GPU comparison"
    ],
    workflowSteps: [
      {
        label: "Step 1",
        title: "Data Alignment",
        bullets: [
          "Download and align daily market data, then convert prices into a consistent return series."
        ]
      },
      {
        label: "Step 2",
        title: "EWMA Covariance Estimation",
        bullets: [
          "Estimate a time-varying covariance structure using EWMA updates under fixed model parameters."
        ]
      },
      {
        label: "Step 3",
        title: "Monte Carlo Scenario Generation",
        bullets: [
          "Generate simulated return paths from the evolving covariance estimate using a stabilized Cholesky pipeline."
        ]
      },
      {
        label: "Step 4",
        title: "Tail-Risk Estimation",
        bullets: [
          "Compute 1-day VaR and CVaR at the selected tail probability level."
        ]
      },
      {
        label: "Step 5",
        title: "Rolling Backtest Validation",
        bullets: [
          "Evaluate breach behavior and coverage performance across rolling out-of-sample windows."
        ]
      }
    ],
    constraints: [
      "tail-risk results remain sensitive to EWMA decay choice, Monte Carlo path count, and backtest window design",
      "breach-rate interpretation is limited when the sample is short or when the run is executed in fast-mode settings",
      "CPU/GPU comparisons only remain meaningful when the data, seed policy, and risk-estimation logic are held fixed",
      "external data-download issues such as yfinance rate limits can create operational instability even when the risk model itself is unchanged"
    ],
    resultsPrimaryHeading: "Project Outcomes",
    results: [
      "extended the club’s baseline Monte Carlo workflow into a dynamic covariance setting",
      "established a reproducible rolling backtest structure for evaluating daily tail-risk estimates",
      "produced comparable CPU and GPU runs under the same data and parameter configuration",
      "created reusable machine-readable outputs, logs, and analysis tables for later benchmarking work"
    ],
    benchmarkChartsHeading: "Benchmark Charts",
    benchmarkChartsIntro: "These charts summarize comparability, backtest behavior, and coverage performance under the current benchmark configuration.",
    benchmarkCharts: [
      {
        title: "CPU vs GPU Risk Metrics",
        description: "A compact grouped comparison of VaR, CVaR, and breach rate across CPU and GPU runs under the same setup.",
        caption: "Outputs remain close under the same data and parameter configuration, supporting implementation comparability across CPU and GPU environments."
      },
      {
        title: "Rolling Backtest: Realized Loss vs VaR Threshold",
        description: "Time-series view of realized daily loss against the model-implied 1-day VaR threshold, with exceedance points marked.",
        caption: "The rolling backtest plot shows how the EWMA Monte Carlo VaR estimate evolves over time relative to realized daily losses, with exceedances marked directly on the timeline."
      },
      {
        title: "Observed vs Expected Breach Rate",
        description: "Coverage diagnostic comparing observed breach behavior against the nominal 1% exceedance target at alpha = 0.99.",
        caption: "Observed breach behavior is compared against the nominal 1% exceedance benchmark, giving a direct summary of backtest coverage under the current run configuration."
      }
    ],
    chartData: {
      cpuGpuMetrics: {
        cpu: { var: 0.01922933, cvar: 0.02183821, breachRate: 0.014493 },
        gpu: { var: 0.01877217, cvar: 0.02096967, breachRate: 0.014493 }
      },
      breachRates: {
        observed: 0.014493,
        expected: 0.010000
      },
      rollingBacktest: {
        csvPath: "./artifacts/2025-11-2/backtest_detail.csv",
        fallbackSeries: [
          { date: "2026-01-10", var: 0.0137641819307714, loss: 0.0068017121988471, breach: 0 },
          { date: "2026-01-13", var: 0.0138722330245025, loss: -0.0059660302232018, breach: 0 },
          { date: "2026-01-14", var: 0.0142726792203197, loss: 0.0025320236843318, breach: 0 },
          { date: "2026-01-15", var: 0.0153049905883226, loss: -0.0148589821682668, breach: 0 },
          { date: "2026-01-16", var: 0.014100191302664, loss: -0.0065702128232284, breach: 0 },
          { date: "2026-01-20", var: 0.0109470007751044, loss: 0.0205668143829452, breach: 1 },
          { date: "2026-01-21", var: 0.015449803559567, loss: 0.0008750913538686, breach: 0 },
          { date: "2026-01-22", var: 0.0166291882994639, loss: -0.0116511330809886, breach: 0 },
          { date: "2026-01-23", var: 0.0173440214559245, loss: -0.0049317270666864, breach: 0 },
          { date: "2026-01-27", var: 0.0148670711233682, loss: -0.0039763343857142, breach: 0 },
          { date: "2026-02-03", var: 0.0145972060318149, loss: 0.0084913125002977, breach: 0 },
          { date: "2026-02-06", var: 0.0177647009726283, loss: -0.0190030861556809, breach: 0 }
        ]
      }
    },
    resultsSecondaryHeading: "Recorded Benchmark Outputs",
    resultsGroups: [
      {
        heading: "CPU baseline (SPY, daily data, fast-mode)",
        items: [
          "VaR = 0.01922933",
          "CVaR = 0.02183821",
          "breach rate = 0.014493",
          "expected breach rate = 0.010000"
        ]
      },
      {
        heading: "GPU run on the same data and parameters",
        items: [
          "VaR = 0.01877217",
          "CVaR = 0.02096967",
          "breach rate = 0.014493"
        ]
      }
    ],
    runSummary: {
      sections: [
        {
          heading: "Configuration",
          rows: [
            ["Asset", "SPY"],
            ["Date Range", "2025-08-04 to 2026-02-06"],
            ["Rows", "130"],
            ["Backtest Observations", "69"],
            ["EWMA Lambda", "0.94"],
            ["Initial Window", "60"],
            ["Tail-Risk Alpha", "0.99"],
            ["Monte Carlo Paths", "3000"],
            ["Random Seed", "9"],
            ["Run Mode", "Fast-mode"]
          ]
        },
        {
          heading: "CPU Baseline Outputs",
          rows: [
            ["VaR", "0.01922933"],
            ["CVaR", "0.02183821"],
            ["Breach Rate", "0.014493"],
            ["Expected Breach Rate", "0.010000"]
          ]
        },
        {
          heading: "GPU Outputs",
          rows: [
            ["VaR", "0.01877217"],
            ["CVaR", "0.02096967"],
            ["Breach Rate", "0.014493"]
          ]
        }
      ]
    },
    nextStep: "The next step is to deepen the benchmark rather than simply rerun it. From here, the project can add direct comparisons against static-covariance baselines, introduce richer backtest diagnostics and plots, expand from single-asset to multi-asset settings, and use the same artifact pipeline to document how daily tail-risk behavior changes across model choices and computational environments.",
    artifacts: [
      { label: "summary.json" },
      { label: "var_cvar.json" },
      { label: "backtest.json" },
      { label: "params.json" },
      { label: "backtest_detail.csv" },
      { label: "prices_aligned.csv" },
      { label: "returns.csv" },
      { label: "cov.csv" },
      { label: "logs.txt" },
      { label: "summary.md" }
    ]
  },
  {
    id: "derivatives-pricing-arbitrage-checks",
    title: "Derivatives Pricing and No-Arbitrage Checks",
    summary: "Develops a controlled pricing-validation workflow that compares analytic, tree-based, and simulation-based option pricing under explicit no-arbitrage diagnostics and implementation benchmarks.",
    cardSummary: "This project builds a reusable derivatives pricing benchmark by combining Black–Scholes, Binomial CRR, and Monte Carlo pricing with no-arbitrage checks, numerical consistency tests, and CPU/GPU benchmarking.",
    tags: ["Algorithm", "Curated", "In Progress"],
    overview: "This project develops a reusable pricing-validation workflow for option-oriented project lines by combining multiple pricing engines with explicit no-arbitrage diagnostics. Rather than relying on a single pricing output, the project compares analytic, tree-based, and Monte Carlo methods under a shared market-input setup, then tests the resulting prices against boundary conditions and parity relationships. The result is a more reliable derivatives benchmark that can support later risk comparisons, implementation checks, and pricing-oriented extensions.",
    why: "In financial engineering, a derivatives price is only useful if it is both numerically credible and economically consistent. Agreement across pricing engines improves confidence in implementation correctness, while no-arbitrage checks help detect invalid assumptions or broken numerical behavior before those outputs flow into downstream analyses. This project matters because it creates a controlled validation layer for derivatives workflows: prices are compared across methods, simulation results are checked against stronger references, and basic arbitrage relations are enforced before results are reused elsewhere.",
    approachIntro: "We structured this project as a controlled pricing-validation workflow in which multiple option-pricing methods were evaluated under a shared market-input setup and then tested against financial-consistency checks and implementation benchmarks.",
    approach: [
      "fixed the market-input and volatility assumptions before comparing methods",
      "priced the same European option with Black–Scholes, Binomial CRR, and Monte Carlo",
      "validated simulation outputs against analytic references and confidence-interval checks",
      "applied no-arbitrage diagnostics before reusing results downstream",
      "recorded CPU/GPU benchmark outputs and reproducibility artifacts for later review"
    ],
    workflowSteps: [
      {
        label: "Step 1",
        title: "Market Input Setup",
        bullets: [
          "Reuse aligned SPY market data and define the shared option-pricing input configuration."
        ]
      },
      {
        label: "Step 2",
        title: "Volatility Baseline",
        bullets: [
          "Estimate sigma from a 60-day historical-volatility window and annualize it with factor 252."
        ]
      },
      {
        label: "Step 3",
        title: "Multi-Method Pricing",
        bullets: [
          "Price the same European option with Black–Scholes, Binomial CRR, and Monte Carlo methods under shared assumptions."
        ]
      },
      {
        label: "Step 4",
        title: "Validation and Diagnostics",
        bullets: [
          "Compare simulation outputs against analytic references and apply no-arbitrage checks such as put-call parity and option bounds."
        ]
      },
      {
        label: "Step 5",
        title: "Benchmark and Reproducibility",
        bullets: [
          "Compare CPU and GPU Monte Carlo behavior under the same setup and save reproducible benchmark outputs for later review."
        ]
      }
    ],
    resultsPrimaryHeading: "Project Outcomes",
    constraints: [
      "pricing diagnostics remain sensitive to volatility estimation choices, contract setup, and input quality",
      "historical-volatility baselines may differ materially from implied-volatility assumptions used in market practice",
      "Monte Carlo benchmarking must distinguish initialization overhead from steady-state runtime",
      "thin-liquidity symbols or noisy option inputs can make no-arbitrage diagnostics less informative unless preprocessing is carefully controlled"
    ],
    results: [
      "established a reusable derivatives pricing benchmark under shared market-input assumptions",
      "confirmed close agreement between analytic, tree-based, and simulation-based pricing outputs",
      "passed core no-arbitrage checks including put-call parity and option bounds",
      "produced side-by-side CPU and GPU Monte Carlo results for correctness and performance comparison",
      "created reusable pricing, Greeks, volatility, and benchmarking artifacts for later project lines"
    ],
    benchmarkChartsHeading: "Benchmark Charts",
    benchmarkChartsIntro: "These charts summarize pricing consistency, no-arbitrage validation, and implementation benchmarking under the current derivatives setup.",
    benchmarkCharts: [
      {
        kind: "pricingMethodComparison",
        title: "Pricing Method Comparison",
        description: "Compact comparison of option prices across Black–Scholes, Binomial CRR, Monte Carlo CPU, and Monte Carlo GPU under the same pricing setup.",
        caption: "Pricing outputs remain closely aligned across analytic, lattice-based, and simulation-based methods, supporting implementation credibility under the shared setup."
      },
      {
        kind: "mcCiVsReference",
        title: "Monte Carlo Confidence Intervals vs Black–Scholes Reference",
        description: "Comparison of the CPU and GPU Monte Carlo 95% confidence intervals against the Black–Scholes reference price.",
        caption: "The Black–Scholes reference price lies within both Monte Carlo confidence intervals, supporting the numerical consistency of the simulation-based implementations."
      },
      {
        kind: "noArbitrageDiagnostics",
        title: "No-Arbitrage Diagnostics Summary",
        description: "Compact diagnostics view covering put-call parity error and configured option-bound checks.",
        caption: "No-arbitrage diagnostics confirm that the configured pricing outputs satisfy core economic consistency checks at numerical-noise levels."
      },
      {
        kind: "runtimeComparison",
        title: "CPU vs GPU Monte Carlo Runtime",
        description: "Benchmark view comparing CPU timing, GPU first-run timing, and GPU steady-state timing for the same Monte Carlo path count.",
        caption: "GPU timing includes a warm-up effect from CUDA initialization, but steady-state Monte Carlo runs are materially faster than the CPU baseline under the same path count."
      }
    ],
    chartData: {
      methodPrices: {
        blackScholes: 183.1513408860,
        crr: 183.1513408860,
        mcCpu: 183.22539960,
        mcGpu: 183.14226308
      },
      mcConfidenceIntervals: {
        reference: 183.1513408860,
        cpu: { low: 183.06722407, high: 183.38357514 },
        gpu: { low: 182.98490125, high: 183.29962491 }
      },
      noArbitrageDiagnostics: {
        parityError: 2.84e-14,
        callWithinBounds: true,
        putWithinBounds: true
      },
      runtimeComparison: {
        cpuMean: 0.005485,
        gpuFirst: 2.0775,
        gpuSteady1: 0.001534,
        gpuSteady2: 0.000933
      }
    },
    resultsSecondaryHeading: "Recorded Benchmark Outputs",
    resultsGroups: [
      {
        heading: "Pricing Accuracy",
        items: [
          "Black–Scholes call price = 183.1513408860",
          "Binomial CRR (steps = 1000) matched Black–Scholes to numerical precision",
          "abs error vs BS ≈ 3.7e-11"
        ]
      },
      {
        heading: "Monte Carlo Pricing",
        items: [
          "CPU Monte Carlo (100,000 paths): price = 183.22539960; 95% CI = [183.06722407, 183.38357514]",
          "GPU Monte Carlo (NVIDIA Tesla T4, 100,000 paths): price = 183.14226308; 95% CI = [182.98490125, 183.29962491]"
        ]
      },
      {
        heading: "No-Arbitrage Validation",
        items: [
          "put-call parity abs error ≈ 2.84e-14",
          "call within bounds = true",
          "put within bounds = true"
        ]
      },
      {
        heading: "Performance",
        items: [
          "CPU Monte Carlo mean over 3 runs = 0.005485 s",
          "GPU first run with CUDA initialization = 2.0775 s",
          "GPU steady-state run 1 = 0.001534 s",
          "GPU steady-state run 2 = 0.000933 s",
          "steady-state speedup ≈ 4.5× vs CPU after warm-up"
        ]
      }
    ],
    runSummary: {
      sections: [
        {
          heading: "Configuration",
          rows: [
            ["Underlying", "SPY"],
            ["Volatility Window", "60 days"],
            ["Annualization", "252"],
            ["Option Type", "European"],
            ["Binomial Steps", "1000"],
            ["Monte Carlo Paths", "100,000"],
            ["Monte Carlo Backends", "CPU and GPU (T4)"]
          ]
        },
        {
          heading: "Key Outputs",
          rows: [
            ["Black–Scholes Price", "183.1513408860"],
            ["CRR Price Error vs BS", "~3.7e-11"],
            ["CPU MC Price", "183.22539960"],
            ["GPU MC Price", "183.14226308"],
            ["Put-Call Parity Error", "~2.84e-14"]
          ]
        }
      ]
    },
    nextStep: "The next step is to extend this validation layer into a broader derivatives benchmark. From here, the project can add implied-volatility inputs, richer Greeks comparisons, larger contract sets, and project-level dashboards that connect pricing accuracy, arbitrage diagnostics, and implementation performance under one shared reporting structure.",
    artifactsIntro: "Machine-readable outputs and reproducibility files for derivatives pricing, validation, and benchmarking.",
    artifacts: [
      { label: "price.json" },
      { label: "greeks.json" },
      { label: "hist_vol.json" },
      { label: "bench.json" },
      { label: "params.json" },
      { label: "download_report.json" },
      { label: "logs.txt" },
      { label: "summary.md" }
    ],
  },
  {
    id: "risk-model-comparison",
    title: "Risk Model Comparison",
    summary: "Develops the club’s first formal comparison benchmark for evaluating multiple VaR/CVaR model families under consistent data, portfolio construction, and reporting rules.",
    cardSummary: "This project builds a quantitative benchmark for comparing Historical Simulation, Parametric Normal, and EWMA + Monte Carlo VaR/CVaR models under shared data, portfolio, and evaluation rules, creating a clearer basis for model selection and future club releases.",
    tags: ["Algorithm", "Curated", "Comparison"],
    overview: "This project develops the club’s first formal risk-model comparison benchmark by evaluating multiple VaR/CVaR model families under a shared multi-asset framework. Rather than comparing models through isolated runs or anecdotal impressions, the project locks the dataset, portfolio structure, loss convention, and evaluation rules before implementation begins. Historical Simulation, Parametric Normal, and EWMA + Monte Carlo are then compared through common metrics such as breach behavior, exceedance severity, conservativeness, and stability. The result is a more rigorous basis for selecting a benchmark model for future club releases.",
    why: "In financial engineering, model comparisons are only meaningful when the underlying assumptions remain fixed. If portfolios, loss definitions, rolling windows, or reporting logic vary across runs, apparent model differences may reflect setup inconsistency rather than true behavior. This project matters because it creates a controlled comparison benchmark for VaR/CVaR workflows: all selected models are evaluated under the same data and portfolio design, interpreted through the same metrics, and reviewed through a shared recommendation framework. That makes the final model-selection result more reproducible and easier to defend.",
    approachIntro: "We structured this project as a staged quantitative comparison workflow in which multiple VaR/CVaR model families were evaluated under one locked benchmark configuration before moving to final interpretation and recommendation.",
    approach: [
      "fixed the model set, portfolio definitions, and evaluation criteria before implementation",
      "reused a shared multi-asset returns dataset and aligned portfolio construction across all models",
      "ran Historical Simulation, Parametric Normal, and EWMA + Monte Carlo under the same benchmark rules",
      "compared outputs through common metrics including breach rate, breach gap, exceedance severity, CVaR stability, and conservativeness",
      "used the final comparison results to recommend a primary benchmark baseline and supporting reference models"
    ],
    workflowSteps: [
      {
        label: "Step 1",
        title: "Research Design and Specification",
        bullets: [
          "Define the model set, portfolio definitions, loss convention, and evaluation criteria before any model comparison is run."
        ]
      },
      {
        label: "Step 2",
        title: "Shared Dataset and Portfolio Construction",
        bullets: [
          "Reuse the common returns dataset and construct aligned equal-weight portfolios for consistent cross-model evaluation."
        ]
      },
      {
        label: "Step 3",
        title: "Multi-Model Risk Execution",
        bullets: [
          "Run Historical Simulation, Parametric Normal, and EWMA + Monte Carlo VaR/CVaR under the same 1-day horizon, alpha level, and rolling design."
        ]
      },
      {
        label: "Step 4",
        title: "Quantitative Comparison and Ranking",
        bullets: [
          "Compare model behavior through breach rate, breach gap, exceedance severity, CVaR stability, responsiveness, and conservativeness."
        ]
      },
      {
        label: "Step 5",
        title: "Recommendation and Benchmark Selection",
        bullets: [
          "Interpret the full comparison results and select the most appropriate benchmark baseline for future club releases."
        ]
      }
    ],
    resultsPrimaryHeading: "Project Outcomes",
    results: [
      "established the club’s first formal quantitative comparison benchmark for VaR/CVaR model selection",
      "completed a staged workflow covering design, implementation, and final recommendation",
      "compared three selected model families under a shared multi-asset setup",
      "produced a ranking framework covering conservativeness, coverage closeness, and smoothness",
      "selected EWMA + Monte Carlo as the strongest primary benchmark candidate under the tested setup"
    ],
    resultsSecondaryHeading: "Comparison Stages",
    resultsSecondary: [
      "Stage 1 — Research Design + Specification: locked the model set, portfolio definitions, and evaluation framework before implementation; defined two equal-weight portfolio designs and standardized comparison rules including 1-day horizon, alpha = 0.99, rolling design, loss convention, and breach definition.",
      "Stage 2 — Implementation and Preliminary Results: implemented the comparison runner, reused the existing returns.csv dataset, constructed the equal-weight SPY/QQQ/TLT/GLD baseline portfolio, and ran all three selected models successfully under the same aligned dates.",
      "Stage 3 — Final Comparison and Recommendation: reviewed completed outputs, compared tradeoffs across conservativeness, breach behavior, exceedance severity, and stability, and selected the recommended benchmark baseline for future club releases."
    ],
    benchmarkChartsHeading: "Benchmark Charts",
    benchmarkChartsIntro: "These charts summarize the model-selection logic, quantitative tradeoffs, and final recommendation under the shared multi-asset benchmark setup.",
    benchmarkCharts: [
      {
        kind: "riskModelAvgVarCvar",
        title: "Average VaR and CVaR by Model",
        description: "Compare average VaR and average CVaR across Historical Simulation, Parametric Normal, and EWMA + Monte Carlo.",
        caption: "EWMA + Monte Carlo produced the highest average VaR and CVaR under the tested setup, making it the most conservative model in the final comparison."
      },
      {
        kind: "riskModelBreachStats",
        title: "Breach Rate and Number of Breaches",
        description: "Compare breach rate and number of breaches across all three model families.",
        caption: "Coverage behavior differed materially across models, with EWMA + Monte Carlo recording the lowest breach count and the breach rate closest to the intended 1 percent target."
      },
      {
        kind: "riskModelRankingSummary",
        title: "Ranking Summary by Comparison Dimension",
        description: "Summarize rankings across conservativeness, coverage closeness, and smoothness.",
        caption: "The ranking view makes the tradeoff structure explicit: EWMA + Monte Carlo led on conservativeness and coverage closeness, while Parametric Normal ranked first on smoothness."
      },
      {
        kind: "riskModelStageProgression",
        title: "Stage Progression and Recommendation",
        description: "Show the progression from Stage 1 design, to Stage 2 implementation, to Stage 3 recommendation, and highlight the selected benchmark baseline.",
        caption: "The benchmark selection result reflects a full staged workflow rather than a one-step model preference."
      }
    ],
    chartData: {
      modelComparison: {
        models: [
          { name: "Historical Simulation", avgVar: 0.016231, avgCvar: 0.018748, breachRate: 0.037037, breaches: 7 },
          { name: "Parametric Normal", avgVar: 0.016414, avgCvar: 0.01895, breachRate: 0.031746, breaches: 6 },
          { name: "EWMA + Monte Carlo", avgVar: 0.017063, avgCvar: 0.019541, breachRate: 0.015873, breaches: 3 }
        ],
        rankings: {
          conservativeness: ["EWMA + Monte Carlo", "Parametric Normal", "Historical Simulation"],
          coverageCloseness: ["EWMA + Monte Carlo", "Parametric Normal", "Historical Simulation"],
          smoothness: ["Parametric Normal", "Historical Simulation", "EWMA + Monte Carlo"]
        },
        stages: [
          "Stage 1 Design",
          "Stage 2 Implementation",
          "Stage 3 Recommendation"
        ],
        recommendation: "EWMA + Monte Carlo"
      }
    },
    resultsGroups: [
      {
        heading: "Recorded Comparison Outputs — Shared Experimental Setup",
        items: [
          "input file: returns.csv",
          "baseline portfolio: SPY, QQQ, TLT, GLD, equal weights",
          "comparison portfolio design: SPY, QQQ, IWM, TLT, equal weights",
          "horizon: 1-day",
          "alpha: 0.99",
          "rolling / initial window: 60 trading days",
          "loss definition: portfolio_loss = - portfolio_return",
          "breach definition: realized loss > estimated VaR",
          "aligned observations: 189"
        ]
      },
      {
        heading: "Final Comparison Summary — Historical Simulation",
        items: [
          "avg VaR = 0.016231",
          "avg CVaR = 0.018748",
          "breach rate = 0.037037",
          "breach gap = 0.027037",
          "exceedance severity = 0.005207",
          "CVaR stability proxy = 0.001666",
          "breaches = 7"
        ]
      },
      {
        heading: "Final Comparison Summary — Parametric Normal",
        items: [
          "avg VaR = 0.016414",
          "avg CVaR = 0.018950",
          "breach rate = 0.031746",
          "breach gap = 0.021746",
          "exceedance severity = 0.006153",
          "CVaR stability proxy = 0.001046",
          "breaches = 6"
        ]
      },
      {
        heading: "Final Comparison Summary — EWMA + Monte Carlo",
        items: [
          "avg VaR = 0.017063",
          "avg CVaR = 0.019541",
          "breach rate = 0.015873",
          "breach gap = 0.005873",
          "exceedance severity = 0.008273",
          "CVaR stability proxy = 0.001979",
          "breaches = 3"
        ]
      },
      {
        heading: "Ranking Summary",
        items: [
          "Conservativeness: 1) EWMA + Monte Carlo, 2) Parametric Normal, 3) Historical Simulation",
          "Coverage Closeness: 1) EWMA + Monte Carlo, 2) Parametric Normal, 3) Historical Simulation",
          "Smoothness: 1) Parametric Normal, 2) Historical Simulation, 3) EWMA + Monte Carlo"
        ]
      },
      {
        heading: "Final Recommendation",
        items: [
          "Primary Benchmark Baseline — EWMA + Monte Carlo: selected because it produced the highest average VaR/CVaR, the lowest breach count, and the smallest breach gap under the tested setup.",
          "Smooth Reference Model — Parametric Normal: retained as the smoothest model, with the smallest CVaR stability proxy.",
          "Empirical Baseline — Historical Simulation: retained as the most direct and intuitive empirical reference model."
        ]
      }
    ],
    runSummary: {
      sections: [
        {
          heading: "Configuration",
          rows: [
            ["Dataset Source", "reused returns.csv from prior risk pipeline"],
            ["Baseline Portfolio", "SPY, QQQ, TLT, GLD"],
            ["Comparison Portfolio Design", "SPY, QQQ, IWM, TLT"],
            ["Weighting Rule", "equal weight"],
            ["Horizon", "1-day"],
            ["Alpha", "0.99"],
            ["Rolling / Init Window", "60"],
            ["Aligned Observations", "189"]
          ]
        },
        {
          heading: "Key Comparison Metrics",
          rows: [
            ["Breach Rate", "compare exceedance frequency"],
            ["Breach Gap", "compare distance from intended coverage"],
            ["Exceedance Severity", "compare realized losses beyond breaches"],
            ["CVaR Stability", "compare smoothness of tail-risk outputs"],
            ["Conservativeness", "compare relative strictness of VaR/CVaR levels"]
          ]
        }
      ]
    },
    constraints: [
      "conclusions currently depend on a single completed portfolio test cycle and may shift under alternative allocations",
      "the second-portfolio robustness check has not yet been completed",
      "the current recommendation is conditional on the fixed horizon, alpha, rolling window, and Monte Carlo configuration used in this cycle",
      "comparison quality depends on strict schema consistency so model differences are not confused with data or reporting differences"
    ],
    nextStep: "The next step is to expand the benchmark beyond this first comparison cycle. From here, the project can complete the second-portfolio robustness check, add runtime and infrastructure-cost comparisons, extend the model set, and deepen the reporting layer so future club releases can compare model behavior, computational cost, and benchmark suitability under one shared framework.",
    artifactsIntro: "Machine-readable outputs, comparison reports, and stage documents for reproducible model-selection review.",
    artifacts: [
      { label: "stage1_report.md" },
      { label: "model_cards.md" },
      { label: "evaluation_design.md" },
      { label: "portfolio_definition.md" },
      { label: "stage2_meeting_record.md" },
      { label: "comparison_summary.csv" },
      { label: "comparison_analysis.md" },
      { label: "stage3_meeting_record.md" },
      { label: "stage3_comparison_summary.csv" },
      { label: "stage3_ranking_table.csv" },
      { label: "params.json" },
      { label: "summary.md" }
    ]
  },
  {
    id: "dtcnumpy",
    title: "dtcnumpy",
    summary: "Curated package line focused on reproducible numerical workflows for club-scale quantitative experimentation.",
    tags: ["Infrastructure", "Curated", "Completed"],
    overview: "dtcnumpy packages reusable numerical components and project scaffolding so teams can move from idea to testable implementation faster.",
    why: "Shared tooling reduces setup friction and increases consistency across student contributors.",
    approach: [
      "Package core utilities with clear versioning and usage notes.",
      "Define integration patterns for benchmark and release workflows.",
      "Maintain lightweight QA checks before distribution."
    ],
    constraints: [
      "Backward compatibility must be managed across active workstreams.",
      "Documentation quality determines actual adoption."
    ],
    results: [
      "Reduced duplicated setup work across projects.",
      "Provided stable base layer for reproducible experiments."
    ],
    nextStep: "Add focused examples that map package primitives to active risk-model projects.",
    artifacts: [
      { label: "Open Legacy Release", href: "./archive.html" },
      { label: "Open Download Files", href: "./download.html" }
    ]
  }
];

const MODAL_FADE_MS = 180;
const WORKFLOW_TRANSITION_MS = 180;
let activeWorkflowStepIndex = 0;
let activeWorkflowSteps = [];
let isModalBodyBound = false;
let activeChartRenderToken = 0;
const rollingBacktestCsvCache = new Map();
let projectModalLockedScrollY = 0;
let projectModalScrollWasLocked = false;

function escapeProjectHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderBulletList(hostId, items, fallback) {
  const host = document.getElementById(hostId);
  if (!host) {
    return;
  }
  const rows = Array.isArray(items) ? items : [];
  host.innerHTML = rows.length
    ? rows.map((item) => `<li>${escapeProjectHtml(item)}</li>`).join("")
    : `<li>${escapeProjectHtml(fallback)}</li>`;
}

function renderKeyValueTableMarkup(rows) {
  const pairs = Array.isArray(rows) ? rows : [];
  if (!pairs.length) {
    return `<p class="text-sm text-gray-500">${escapeProjectHtml("No recorded values published yet.")}</p>`;
  }
  return `
    <table class="project-summary-table w-full text-left text-sm text-gray-700">
      <tbody>
        ${pairs.map((row) => `
          <tr>
            <th scope="row">${escapeProjectHtml(row[0])}</th>
            <td>${escapeProjectHtml(row[1])}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderKeyValueTable(hostId, rows) {
  const host = document.getElementById(hostId);
  if (!host) {
    return;
  }
  host.innerHTML = renderKeyValueTableMarkup(rows);
}

function renderBenchmarkCharts(hostId, charts) {
  const host = document.getElementById(hostId);
  if (!host) {
    return;
  }
  const items = Array.isArray(charts) ? charts : [];
  host.innerHTML = items.map((chart) => `
    <article class="project-chart-card rounded-[0.95rem] p-3.5" data-chart-kind="${escapeProjectHtml(chart.kind || "")}">
      <h5 class="text-sm font-semibold text-gray-900">${escapeProjectHtml(chart.title || "Chart")}</h5>
      <p class="mt-2 text-sm leading-6 text-gray-700">${escapeProjectHtml(chart.description || "")}</p>
      <div class="project-chart-figure mt-3"></div>
      <p class="mt-2 text-xs leading-5 text-gray-500">${escapeProjectHtml(chart.caption || "")}</p>
    </article>
  `).join("");
}

function buildSvgShell(width, height, inner) {
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" height="100%" role="img" aria-hidden="true">${inner}</svg>`;
}

function buildGroupedBarsChart(metrics) {
  const cpu = metrics?.cpu || {};
  const gpu = metrics?.gpu || {};
  const categories = [
    { label: "VaR", cpu: Number(cpu.var || 0), gpu: Number(gpu.var || 0) },
    { label: "CVaR", cpu: Number(cpu.cvar || 0), gpu: Number(gpu.cvar || 0) },
    { label: "Breach", cpu: Number(cpu.breachRate || 0), gpu: Number(gpu.breachRate || 0) }
  ];

  const width = 560;
  const height = 220;
  const pad = { top: 18, right: 20, bottom: 34, left: 52 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const maxVal = Math.max(...categories.flatMap((c) => [c.cpu, c.gpu]), 0.001) * 1.12;

  const bars = categories.map((cat, index) => {
    const groupX = pad.left + (index * innerW) / categories.length + 18;
    const colW = 26;
    const gap = 10;
    const cpuH = (cat.cpu / maxVal) * innerH;
    const gpuH = (cat.gpu / maxVal) * innerH;
    const cpuY = pad.top + innerH - cpuH;
    const gpuY = pad.top + innerH - gpuH;
    return `
      <rect x="${groupX}" y="${cpuY}" width="${colW}" height="${cpuH}" rx="4" fill="rgba(71, 85, 105, 0.78)" />
      <rect x="${groupX + colW + gap}" y="${gpuY}" width="${colW}" height="${gpuH}" rx="4" fill="rgba(59, 130, 246, 0.78)" />
      <text x="${groupX + colW + gap / 2}" y="${height - 12}" text-anchor="middle" font-size="11" fill="rgba(71,85,105,0.88)">${cat.label}</text>
    `;
  }).join("");

  const yTicks = [0, maxVal * 0.33, maxVal * 0.66, maxVal].map((v) => {
    const y = pad.top + innerH - (v / maxVal) * innerH;
    return `
      <line x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}" stroke="rgba(148,163,184,0.22)" />
      <text x="${pad.left - 8}" y="${y + 4}" text-anchor="end" font-size="10" fill="rgba(100,116,139,0.85)">${v.toFixed(3)}</text>
    `;
  }).join("");

  return buildSvgShell(
    width,
    height,
    `
      <rect x="0" y="0" width="${width}" height="${height}" rx="10" fill="rgba(255,255,255,0.24)" />
      ${yTicks}
      <line x1="${pad.left}" y1="${pad.top + innerH}" x2="${width - pad.right}" y2="${pad.top + innerH}" stroke="rgba(100,116,139,0.5)" />
      ${bars}
      <g transform="translate(${width - 136}, ${pad.top + 4})">
        <rect x="0" y="-10" width="130" height="26" rx="8" fill="rgba(255,255,255,0.55)" stroke="rgba(148,163,184,0.2)" />
        <rect x="10" y="-2" width="10" height="10" rx="2" fill="rgba(71, 85, 105, 0.78)" />
        <text x="24" y="7" font-size="10" fill="rgba(71,85,105,0.9)">CPU</text>
        <rect x="68" y="-2" width="10" height="10" rx="2" fill="rgba(59, 130, 246, 0.78)" />
        <text x="82" y="7" font-size="10" fill="rgba(71,85,105,0.9)">GPU</text>
      </g>
    `
  );
}

function buildPricingMethodComparisonChart(methodPrices) {
  const categories = [
    { label: "BS", value: Number(methodPrices?.blackScholes || 0), color: "rgba(71, 85, 105, 0.8)" },
    { label: "CRR", value: Number(methodPrices?.crr || 0), color: "rgba(100, 116, 139, 0.8)" },
    { label: "MC CPU", value: Number(methodPrices?.mcCpu || 0), color: "rgba(59, 130, 246, 0.78)" },
    { label: "MC GPU", value: Number(methodPrices?.mcGpu || 0), color: "rgba(37, 99, 235, 0.86)" }
  ];
  const width = 560;
  const height = 220;
  const pad = { top: 18, right: 20, bottom: 38, left: 52 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const maxVal = Math.max(...categories.map((c) => c.value), 1e-6) * 1.04;
  const minVal = Math.min(...categories.map((c) => c.value), 0);
  const range = Math.max(maxVal - minVal, 1e-6);
  const barWidth = 72;
  const gap = (innerW - categories.length * barWidth) / Math.max(categories.length - 1, 1);

  const bars = categories.map((cat, index) => {
    const x = pad.left + index * (barWidth + gap);
    const h = ((cat.value - minVal) / range) * innerH;
    const y = pad.top + innerH - h;
    return `
      <rect x="${x}" y="${y}" width="${barWidth}" height="${h}" rx="6" fill="${cat.color}" />
      <text x="${x + barWidth / 2}" y="${height - 14}" text-anchor="middle" font-size="10.5" fill="rgba(71,85,105,0.9)">${cat.label}</text>
      <text x="${x + barWidth / 2}" y="${y - 6}" text-anchor="middle" font-size="10" fill="rgba(71,85,105,0.86)">${cat.value.toFixed(6)}</text>
    `;
  }).join("");

  return buildSvgShell(
    width,
    height,
    `
      <rect x="0" y="0" width="${width}" height="${height}" rx="10" fill="rgba(255,255,255,0.24)" />
      <line x1="${pad.left}" y1="${pad.top + innerH}" x2="${width - pad.right}" y2="${pad.top + innerH}" stroke="rgba(100,116,139,0.5)" />
      ${bars}
    `
  );
}

function buildBreachComparisonChart(breachRates) {
  const observed = Number(breachRates?.observed || 0);
  const expected = Number(breachRates?.expected || 0);
  const width = 560;
  const height = 190;
  const pad = { top: 20, right: 24, bottom: 34, left: 52 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const maxVal = Math.max(observed, expected, 0.001) * 1.2;

  function bar(x, value, color, label) {
    const h = (value / maxVal) * innerH;
    const y = pad.top + innerH - h;
    return `
      <rect x="${x}" y="${y}" width="92" height="${h}" rx="7" fill="${color}" />
      <text x="${x + 46}" y="${height - 12}" text-anchor="middle" font-size="11" fill="rgba(71,85,105,0.88)">${label}</text>
      <text x="${x + 46}" y="${y - 6}" text-anchor="middle" font-size="10" fill="rgba(71,85,105,0.86)">${value.toFixed(6)}</text>
    `;
  }

  return buildSvgShell(
    width,
    height,
    `
      <rect x="0" y="0" width="${width}" height="${height}" rx="10" fill="rgba(255,255,255,0.24)" />
      <line x1="${pad.left}" y1="${pad.top + innerH}" x2="${width - pad.right}" y2="${pad.top + innerH}" stroke="rgba(100,116,139,0.5)" />
      ${bar(pad.left + innerW * 0.24 - 46, expected, "rgba(100, 116, 139, 0.78)", "Expected")}
      ${bar(pad.left + innerW * 0.72 - 46, observed, "rgba(59, 130, 246, 0.78)", "Observed")}
    `
  );
}

function buildMonteCarloCiChart(ciData) {
  const reference = Number(ciData?.reference || 0);
  const cpuLow = Number(ciData?.cpu?.low || 0);
  const cpuHigh = Number(ciData?.cpu?.high || 0);
  const gpuLow = Number(ciData?.gpu?.low || 0);
  const gpuHigh = Number(ciData?.gpu?.high || 0);
  const values = [reference, cpuLow, cpuHigh, gpuLow, gpuHigh].filter(Number.isFinite);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = Math.max(maxVal - minVal, 1e-9);
  const width = 560;
  const height = 190;
  const pad = { left: 80, right: 24, top: 20, bottom: 24 };
  const innerW = width - pad.left - pad.right;

  function x(v) {
    return pad.left + ((v - minVal) / range) * innerW;
  }

  return buildSvgShell(
    width,
    height,
    `
      <rect x="0" y="0" width="${width}" height="${height}" rx="10" fill="rgba(255,255,255,0.24)" />
      <line x1="${x(reference)}" y1="${pad.top}" x2="${x(reference)}" y2="${height - pad.bottom}" stroke="rgba(59,130,246,0.78)" stroke-width="2" stroke-dasharray="4 4"/>
      <text x="${x(reference) + 6}" y="${pad.top + 12}" font-size="10" fill="rgba(30,64,175,0.9)">BS Ref</text>
      <line x1="${x(cpuLow)}" y1="72" x2="${x(cpuHigh)}" y2="72" stroke="rgba(71,85,105,0.84)" stroke-width="5" stroke-linecap="round"/>
      <circle cx="${x(cpuLow)}" cy="72" r="4" fill="rgba(71,85,105,0.84)"/>
      <circle cx="${x(cpuHigh)}" cy="72" r="4" fill="rgba(71,85,105,0.84)"/>
      <text x="18" y="76" font-size="11" fill="rgba(71,85,105,0.9)">CPU 95% CI</text>
      <line x1="${x(gpuLow)}" y1="122" x2="${x(gpuHigh)}" y2="122" stroke="rgba(59,130,246,0.84)" stroke-width="5" stroke-linecap="round"/>
      <circle cx="${x(gpuLow)}" cy="122" r="4" fill="rgba(59,130,246,0.84)"/>
      <circle cx="${x(gpuHigh)}" cy="122" r="4" fill="rgba(59,130,246,0.84)"/>
      <text x="18" y="126" font-size="11" fill="rgba(71,85,105,0.9)">GPU 95% CI</text>
    `
  );
}

function buildNoArbitrageDiagnosticsChart(data) {
  const parityError = Number(data?.parityError || 0);
  const callWithinBounds = Boolean(data?.callWithinBounds);
  const putWithinBounds = Boolean(data?.putWithinBounds);
  const width = 560;
  const height = 190;
  const statusColor = "rgba(22, 163, 74, 0.9)";
  const muted = "rgba(71,85,105,0.88)";

  return buildSvgShell(
    width,
    height,
    `
      <rect x="0" y="0" width="${width}" height="${height}" rx="10" fill="rgba(255,255,255,0.24)" />
      <text x="22" y="40" font-size="12" fill="${muted}">Put-Call Parity Error</text>
      <text x="22" y="60" font-size="12" font-weight="600" fill="rgba(30,64,175,0.92)">${parityError.toExponential(2)}</text>
      <rect x="22" y="84" width="250" height="34" rx="10" fill="rgba(255,255,255,0.55)" stroke="rgba(148,163,184,0.22)"/>
      <text x="36" y="106" font-size="12" fill="${muted}">Call within bounds:</text>
      <text x="170" y="106" font-size="12" font-weight="600" fill="${callWithinBounds ? statusColor : "rgba(220,38,38,0.9)"}">${callWithinBounds ? "true" : "false"}</text>
      <rect x="288" y="84" width="250" height="34" rx="10" fill="rgba(255,255,255,0.55)" stroke="rgba(148,163,184,0.22)"/>
      <text x="302" y="106" font-size="12" fill="${muted}">Put within bounds:</text>
      <text x="430" y="106" font-size="12" font-weight="600" fill="${putWithinBounds ? statusColor : "rgba(220,38,38,0.9)"}">${putWithinBounds ? "true" : "false"}</text>
      <text x="22" y="148" font-size="11" fill="rgba(100,116,139,0.88)">Core no-arbitrage diagnostics remain within numerical-noise levels under current configuration.</text>
    `
  );
}

function buildRuntimeComparisonChart(runtimeData) {
  const cpuMean = Number(runtimeData?.cpuMean || 0);
  const gpuFirst = Number(runtimeData?.gpuFirst || 0);
  const gpuSteady1 = Number(runtimeData?.gpuSteady1 || 0);
  const gpuSteady2 = Number(runtimeData?.gpuSteady2 || 0);
  const categories = [
    { label: "CPU Mean", value: cpuMean, color: "rgba(71,85,105,0.82)" },
    { label: "GPU First", value: gpuFirst, color: "rgba(59,130,246,0.72)" },
    { label: "GPU S1", value: gpuSteady1, color: "rgba(37,99,235,0.82)" },
    { label: "GPU S2", value: gpuSteady2, color: "rgba(29,78,216,0.9)" }
  ];
  const width = 560;
  const height = 210;
  const pad = { top: 18, right: 20, bottom: 38, left: 52 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const maxVal = Math.max(...categories.map((c) => c.value), 1e-6) * 1.08;

  const barWidth = 70;
  const gap = (innerW - categories.length * barWidth) / Math.max(categories.length - 1, 1);
  const bars = categories.map((cat, i) => {
    const x = pad.left + i * (barWidth + gap);
    const h = (cat.value / maxVal) * innerH;
    const y = pad.top + innerH - h;
    return `
      <rect x="${x}" y="${y}" width="${barWidth}" height="${h}" rx="6" fill="${cat.color}" />
      <text x="${x + barWidth / 2}" y="${height - 14}" text-anchor="middle" font-size="10.5" fill="rgba(71,85,105,0.9)">${cat.label}</text>
      <text x="${x + barWidth / 2}" y="${y - 6}" text-anchor="middle" font-size="10" fill="rgba(71,85,105,0.86)">${cat.value.toFixed(6)} s</text>
    `;
  }).join("");

  return buildSvgShell(
    width,
    height,
    `
      <rect x="0" y="0" width="${width}" height="${height}" rx="10" fill="rgba(255,255,255,0.24)" />
      <line x1="${pad.left}" y1="${pad.top + innerH}" x2="${width - pad.right}" y2="${pad.top + innerH}" stroke="rgba(100,116,139,0.5)" />
      ${bars}
    `
  );
}

function buildRiskModelAvgVarCvarChart(modelComparison) {
  const rows = Array.isArray(modelComparison?.models) ? modelComparison.models : [];
  const width = 560;
  const height = 220;
  const pad = { top: 18, right: 20, bottom: 40, left: 52 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const maxVal = Math.max(...rows.flatMap((row) => [Number(row.avgVar || 0), Number(row.avgCvar || 0)]), 1e-6) * 1.12;
  const groupW = innerW / Math.max(rows.length, 1);
  const colW = Math.min(24, groupW * 0.22);

  const bars = rows.map((row, index) => {
    const groupX = pad.left + index * groupW + groupW * 0.24;
    const varH = (Number(row.avgVar || 0) / maxVal) * innerH;
    const cvarH = (Number(row.avgCvar || 0) / maxVal) * innerH;
    const varY = pad.top + innerH - varH;
    const cvarY = pad.top + innerH - cvarH;
    return `
      <rect x="${groupX}" y="${varY}" width="${colW}" height="${varH}" rx="4" fill="rgba(71, 85, 105, 0.78)" />
      <rect x="${groupX + colW + 8}" y="${cvarY}" width="${colW}" height="${cvarH}" rx="4" fill="rgba(59, 130, 246, 0.8)" />
      <text x="${groupX + colW + 3}" y="${height - 14}" text-anchor="middle" font-size="10" fill="rgba(71,85,105,0.88)">
        ${(String(row.name || "")).split(" ")[0]}
      </text>
    `;
  }).join("");

  return buildSvgShell(
    width,
    height,
    `
      <rect x="0" y="0" width="${width}" height="${height}" rx="10" fill="rgba(255,255,255,0.24)" />
      <line x1="${pad.left}" y1="${pad.top + innerH}" x2="${width - pad.right}" y2="${pad.top + innerH}" stroke="rgba(100,116,139,0.5)" />
      ${bars}
      <g transform="translate(${width - 150}, ${pad.top + 4})">
        <rect x="0" y="-10" width="144" height="28" rx="8" fill="rgba(255,255,255,0.55)" stroke="rgba(148,163,184,0.2)" />
        <rect x="10" y="-1" width="10" height="10" rx="2" fill="rgba(71, 85, 105, 0.78)" />
        <text x="24" y="8" font-size="10" fill="rgba(71,85,105,0.9)">Avg VaR</text>
        <rect x="78" y="-1" width="10" height="10" rx="2" fill="rgba(59, 130, 246, 0.8)" />
        <text x="92" y="8" font-size="10" fill="rgba(71,85,105,0.9)">Avg CVaR</text>
      </g>
    `
  );
}

function buildRiskModelBreachStatsChart(modelComparison) {
  const rows = Array.isArray(modelComparison?.models) ? modelComparison.models : [];
  const width = 560;
  const height = 220;
  const pad = { top: 20, right: 20, bottom: 40, left: 52 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const maxRate = Math.max(...rows.map((row) => Number(row.breachRate || 0)), 1e-6) * 1.12;
  const maxCount = Math.max(...rows.map((row) => Number(row.breaches || 0)), 1);
  const groupW = innerW / Math.max(rows.length, 1);
  const colW = Math.min(28, groupW * 0.24);

  const bars = rows.map((row, index) => {
    const groupX = pad.left + index * groupW + groupW * 0.2;
    const rateH = (Number(row.breachRate || 0) / maxRate) * innerH;
    const countH = (Number(row.breaches || 0) / maxCount) * innerH;
    return `
      <rect x="${groupX}" y="${pad.top + innerH - rateH}" width="${colW}" height="${rateH}" rx="4" fill="rgba(59,130,246,0.8)" />
      <rect x="${groupX + colW + 8}" y="${pad.top + innerH - countH}" width="${colW}" height="${countH}" rx="4" fill="rgba(71,85,105,0.78)" />
      <text x="${groupX + colW + 4}" y="${height - 14}" text-anchor="middle" font-size="10" fill="rgba(71,85,105,0.88)">
        ${(String(row.name || "")).split(" ")[0]}
      </text>
    `;
  }).join("");

  return buildSvgShell(
    width,
    height,
    `
      <rect x="0" y="0" width="${width}" height="${height}" rx="10" fill="rgba(255,255,255,0.24)" />
      <line x1="${pad.left}" y1="${pad.top + innerH}" x2="${width - pad.right}" y2="${pad.top + innerH}" stroke="rgba(100,116,139,0.5)" />
      ${bars}
      <g transform="translate(${width - 170}, ${pad.top + 4})">
        <rect x="0" y="-10" width="164" height="28" rx="8" fill="rgba(255,255,255,0.55)" stroke="rgba(148,163,184,0.2)" />
        <rect x="10" y="-1" width="10" height="10" rx="2" fill="rgba(59,130,246,0.8)" />
        <text x="24" y="8" font-size="10" fill="rgba(71,85,105,0.9)">Breach Rate</text>
        <rect x="92" y="-1" width="10" height="10" rx="2" fill="rgba(71,85,105,0.78)" />
        <text x="106" y="8" font-size="10" fill="rgba(71,85,105,0.9)">Breaches</text>
      </g>
    `
  );
}

function buildRiskModelRankingChart(modelComparison) {
  const rankings = modelComparison?.rankings || {};
  const rows = [
    { dimension: "Conservativeness", order: rankings.conservativeness || [] },
    { dimension: "Coverage Closeness", order: rankings.coverageCloseness || [] },
    { dimension: "Smoothness", order: rankings.smoothness || [] }
  ];
  const width = 560;
  const height = 254;
  const rowTop = 22;
  const rowHeight = 72;

  const blocks = rows.map((row, index) => {
    const y = rowTop + index * (rowHeight + 8);
    const first = row.order[0] || "N/A";
    const second = row.order[1] || "N/A";
    const third = row.order[2] || "N/A";

    return `
      <rect x="16" y="${y}" width="528" height="${rowHeight}" rx="11" fill="rgba(255,255,255,0.5)" stroke="rgba(148,163,184,0.2)" />
      <text x="30" y="${y + 22}" font-size="11" font-weight="600" fill="rgba(71,85,105,0.94)">${row.dimension}</text>

      <rect x="190" y="${y + 8}" width="334" height="18" rx="7" fill="rgba(219,234,254,0.62)" stroke="rgba(59,130,246,0.5)" />
      <text x="202" y="${y + 21}" font-size="10.5" font-weight="700" fill="rgba(30,64,175,0.96)">1</text>
      <text x="220" y="${y + 21}" font-size="10.5" fill="rgba(30,64,175,0.96)">${first}</text>

      <rect x="190" y="${y + 29}" width="318" height="16" rx="6" fill="rgba(255,255,255,0.64)" stroke="rgba(148,163,184,0.24)" />
      <text x="202" y="${y + 41}" font-size="9.9" font-weight="600" fill="rgba(71,85,105,0.9)">2</text>
      <text x="218" y="${y + 41}" font-size="9.9" fill="rgba(71,85,105,0.9)">${second}</text>

      <rect x="190" y="${y + 48}" width="300" height="14" rx="6" fill="rgba(255,255,255,0.46)" stroke="rgba(148,163,184,0.18)" />
      <text x="202" y="${y + 59}" font-size="9.4" font-weight="600" fill="rgba(100,116,139,0.86)">3</text>
      <text x="218" y="${y + 59}" font-size="9.4" fill="rgba(100,116,139,0.86)">${third}</text>
    `;
  }).join("");

  return buildSvgShell(
    width,
    height,
    `
      <rect x="0" y="0" width="${width}" height="${height}" rx="10" fill="rgba(255,255,255,0.24)" />
      ${blocks}
    `
  );
}

function buildRiskModelStageProgressionChart(modelComparison) {
  const stages = Array.isArray(modelComparison?.stages) ? modelComparison.stages : [];
  const recommendation = String(modelComparison?.recommendation || "N/A");
  const width = 560;
  const height = 176;
  const chips = stages.slice(0, 3);
  const chipW = 132;
  const chipH = 28;
  const gap = 22;
  const totalW = chips.length * chipW + (chips.length - 1) * gap;
  const startX = Math.max(24, Math.round((width - totalW) / 2));
  const topY = 34;

  const nodes = chips.map((stage, index) => {
    const x = startX + index * (chipW + gap);
    const isLast = index === chips.length - 1;
    const arrowX = x + chipW + 6;
    return `
      <rect x="${x}" y="${topY}" width="${chipW}" height="${chipH}" rx="10" fill="${isLast ? "rgba(219,234,254,0.56)" : "rgba(255,255,255,0.64)"}" stroke="${isLast ? "rgba(59,130,246,0.48)" : "rgba(148,163,184,0.24)"}" />
      <text x="${x + chipW / 2}" y="${topY + 18}" text-anchor="middle" font-size="10.2" font-weight="${isLast ? "600" : "500"}" fill="${isLast ? "rgba(30,64,175,0.95)" : "rgba(71,85,105,0.9)"}">${stage}</text>
      ${index < chips.length - 1 ? `<path d="M ${arrowX} ${topY + 14} L ${arrowX + 10} ${topY + 14}" stroke="rgba(100,116,139,0.56)" stroke-width="1.5" marker-end="url(#arrow-head)"/>` : ""}
    `;
  }).join("");

  return buildSvgShell(
    width,
    height,
    `
      <defs>
        <marker id="arrow-head" markerWidth="8" markerHeight="8" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 z" fill="rgba(100,116,139,0.6)" />
        </marker>
      </defs>
      <rect x="0" y="0" width="${width}" height="${height}" rx="10" fill="rgba(255,255,255,0.24)" />
      ${nodes}
      <rect x="98" y="94" width="364" height="34" rx="10" fill="rgba(219,234,254,0.42)" stroke="rgba(59,130,246,0.36)" />
      <text x="114" y="108" font-size="10.1" font-weight="600" fill="rgba(30,64,175,0.95)">Recommended Benchmark</text>
      <text x="114" y="122" font-size="11" fill="rgba(30,64,175,0.96)">${recommendation}</text>
    `
  );
}

function parseBacktestCsv(csvText) {
  const lines = String(csvText || "").trim().split(/\r?\n/);
  if (lines.length < 2) {
    return [];
  }
  const headers = lines[0].split(",");
  const idxDate = headers.indexOf("date");
  const idxVar = headers.indexOf("var");
  const idxLoss = headers.indexOf("realized_loss");
  const idxBreach = headers.indexOf("breach");

  return lines.slice(1).map((line) => {
    const cols = line.split(",");
    return {
      date: cols[idxDate] || "",
      var: Number(cols[idxVar] || 0),
      loss: Number(cols[idxLoss] || 0),
      breach: Number(cols[idxBreach] || 0)
    };
  }).filter((row) => Number.isFinite(row.var) && Number.isFinite(row.loss));
}

function buildRollingBacktestChart(rows) {
  if (!Array.isArray(rows) || rows.length < 2) {
    return `
      <div class="project-chart-placeholder">
        <p class="text-sm text-gray-600">Time-series data is not wired yet for this environment.</p>
      </div>
    `;
  }
  const width = 560;
  const height = 220;
  const pad = { top: 16, right: 20, bottom: 30, left: 46 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const vals = rows.flatMap((r) => [r.var, r.loss]);
  const minY = Math.min(...vals) * 1.1;
  const maxY = Math.max(...vals) * 1.1;
  const range = Math.max(maxY - minY, 1e-6);

  function x(i) {
    return pad.left + (i / (rows.length - 1)) * innerW;
  }
  function y(v) {
    return pad.top + innerH - ((v - minY) / range) * innerH;
  }
  function linePath(getVal) {
    return rows.map((r, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(getVal(r))}`).join(" ");
  }

  const breachPoints = rows
    .map((r, i) => (r.breach ? `<circle cx="${x(i)}" cy="${y(r.loss)}" r="2.7" fill="rgba(220,38,38,0.9)" />` : ""))
    .join("");

  return buildSvgShell(
    width,
    height,
    `
      <rect x="0" y="0" width="${width}" height="${height}" rx="10" fill="rgba(255,255,255,0.24)" />
      <line x1="${pad.left}" y1="${pad.top + innerH}" x2="${width - pad.right}" y2="${pad.top + innerH}" stroke="rgba(100,116,139,0.45)" />
      <path d="${linePath((r) => r.var)}" fill="none" stroke="rgba(59,130,246,0.86)" stroke-width="2" />
      <path d="${linePath((r) => r.loss)}" fill="none" stroke="rgba(71,85,105,0.8)" stroke-width="2" />
      ${breachPoints}
      <g transform="translate(${width - 182}, ${pad.top + 4})">
        <rect x="0" y="-10" width="176" height="40" rx="8" fill="rgba(255,255,255,0.56)" stroke="rgba(148,163,184,0.2)" />
        <line x1="10" y1="2" x2="26" y2="2" stroke="rgba(59,130,246,0.86)" stroke-width="2"/>
        <text x="30" y="6" font-size="10" fill="rgba(71,85,105,0.9)">VaR Threshold</text>
        <line x1="10" y1="18" x2="26" y2="18" stroke="rgba(71,85,105,0.8)" stroke-width="2"/>
        <text x="30" y="22" font-size="10" fill="rgba(71,85,105,0.9)">Realized Loss</text>
        <circle cx="114" cy="18" r="2.7" fill="rgba(220,38,38,0.9)"/>
        <text x="122" y="22" font-size="10" fill="rgba(71,85,105,0.9)">Breach</text>
      </g>
    `
  );
}

async function fetchRollingBacktestRows(csvPath) {
  if (!csvPath) {
    return null;
  }
  if (rollingBacktestCsvCache.has(csvPath)) {
    return rollingBacktestCsvCache.get(csvPath);
  }
  try {
    const response = await fetch(csvPath, { cache: "no-store" });
    if (!response.ok) {
      return null;
    }
    const text = await response.text();
    const rows = parseBacktestCsv(text);
    rollingBacktestCsvCache.set(csvPath, rows);
    return rows;
  } catch {
    return null;
  }
}

async function renderBenchmarkChartsWithFigures(hostId, project) {
  const host = document.getElementById(hostId);
  if (!host) {
    return;
  }
  const token = ++activeChartRenderToken;
  const charts = Array.isArray(project?.benchmarkCharts) ? project.benchmarkCharts : [];
  renderBenchmarkCharts(hostId, charts);

  const cards = host.querySelectorAll(".project-chart-card");
  const chartData = project?.chartData || {};
  for (let i = 0; i < cards.length; i += 1) {
    const figure = cards[i].querySelector(".project-chart-figure");
    if (!figure) {
      continue;
    }
    const kind = charts[i]?.kind || (i === 0 ? "cpuGpuMetrics" : i === 1 ? "rollingBacktest" : i === 2 ? "breachComparison" : "");
    if (kind === "cpuGpuMetrics") {
      figure.innerHTML = buildGroupedBarsChart(chartData.cpuGpuMetrics);
      continue;
    }
    if (kind === "pricingMethodComparison") {
      figure.innerHTML = buildPricingMethodComparisonChart(chartData.methodPrices);
      continue;
    }
    if (kind === "rollingBacktest") {
      figure.innerHTML = `<div class="project-chart-placeholder"><p class="text-sm text-gray-600">Loading rolling backtest series…</p></div>`;
      const rows = await fetchRollingBacktestRows(chartData.rollingBacktest?.csvPath || "");
      if (token !== activeChartRenderToken) {
        return;
      }
      figure.innerHTML = buildRollingBacktestChart(rows || chartData.rollingBacktest?.fallbackSeries || []);
      continue;
    }
    if (kind === "breachComparison") {
      figure.innerHTML = buildBreachComparisonChart(chartData.breachRates);
      continue;
    }
    if (kind === "mcCiVsReference") {
      figure.innerHTML = buildMonteCarloCiChart(chartData.mcConfidenceIntervals);
      continue;
    }
    if (kind === "noArbitrageDiagnostics") {
      figure.innerHTML = buildNoArbitrageDiagnosticsChart(chartData.noArbitrageDiagnostics);
      continue;
    }
    if (kind === "runtimeComparison") {
      figure.innerHTML = buildRuntimeComparisonChart(chartData.runtimeComparison);
      continue;
    }
    if (kind === "riskModelAvgVarCvar") {
      figure.innerHTML = buildRiskModelAvgVarCvarChart(chartData.modelComparison);
      continue;
    }
    if (kind === "riskModelBreachStats") {
      figure.innerHTML = buildRiskModelBreachStatsChart(chartData.modelComparison);
      continue;
    }
    if (kind === "riskModelRankingSummary") {
      figure.innerHTML = buildRiskModelRankingChart(chartData.modelComparison);
      continue;
    }
    if (kind === "riskModelStageProgression") {
      figure.innerHTML = buildRiskModelStageProgressionChart(chartData.modelComparison);
      continue;
    }
    figure.innerHTML = `<div class="project-chart-placeholder"><p class="text-sm text-gray-600">Chart data placeholder ready for later binding.</p></div>`;
  }
}

function renderResultsGroups(hostId, groups) {
  const host = document.getElementById(hostId);
  if (!host) {
    return;
  }
  const rows = Array.isArray(groups) ? groups : [];
  host.innerHTML = rows.map((group) => `
    <article class="project-results-group rounded-[0.95rem] p-3.5">
      <p class="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">${escapeProjectHtml(group.heading || "")}</p>
      <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-700">
        ${(Array.isArray(group.items) ? group.items : []).map((item) => `<li>${escapeProjectHtml(item)}</li>`).join("")}
      </ul>
    </article>
  `).join("");
}

function renderRunSummarySections(hostId, sections) {
  const host = document.getElementById(hostId);
  if (!host) {
    return;
  }
  const rows = Array.isArray(sections) ? sections : [];
  host.innerHTML = rows.map((section) => `
    <section class="project-summary-table-wrap rounded-[0.9rem] p-3.5">
      <p class="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">${escapeProjectHtml(section.heading || "")}</p>
      <div class="mt-2">${renderKeyValueTableMarkup(section.rows)}</div>
    </section>
  `).join("");
}

function getWorkflowSteps(project) {
  if (Array.isArray(project?.workflowSteps) && project.workflowSteps.length) {
    return project.workflowSteps;
  }

  const fallbackTitles = Array.isArray(project?.workflow) ? project.workflow : [];
  return fallbackTitles.map((title, index) => ({
    label: `Step ${index + 1}`,
    title,
    bullets: ["Detailed step notes will be added in a later pass."]
  }));
}

function renderWorkflowSelector(hostId, steps) {
  const host = document.getElementById(hostId);
  if (!host) {
    return;
  }
  if (!steps.length) {
    host.innerHTML = "";
    return;
  }
  host.innerHTML = steps.map((step, index) => `
    <button
      type="button"
      role="tab"
      data-workflow-index="${index}"
      aria-selected="${index === activeWorkflowStepIndex ? "true" : "false"}"
      class="project-workflow-step rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.08em] uppercase"
    >
      ${escapeProjectHtml(step.label || `Step ${index + 1}`)}
    </button>
  `).join("");
  host.style.gridTemplateColumns = `repeat(${Math.max(steps.length, 1)}, minmax(0, 1fr))`;
  host.style.minWidth = steps.length > 5 ? `${steps.length * 6.15}rem` : "";
}

function renderSelectedWorkflowStep(direction) {
  const step = activeWorkflowSteps[activeWorkflowStepIndex];
  const titleHost = document.getElementById("project-modal-workflow-detail-title");
  const listHost = document.getElementById("project-modal-workflow-detail-list");
  const detailHost = document.getElementById("project-modal-workflow-detail");

  if (!titleHost || !listHost || !detailHost || !step) {
    return;
  }

  titleHost.textContent = step.title || "Workflow Step";
  const bullets = Array.isArray(step.bullets) ? step.bullets : [];
  listHost.innerHTML = bullets.length
    ? bullets.map((item) => `<li>${escapeProjectHtml(item)}</li>`).join("")
    : "<li>Step details will be added in a later content pass.</li>";

  if (!direction) {
    return;
  }

  const xOffset = direction === "forward" ? 10 : -10;
  detailHost.animate(
    [
      { opacity: 0.48, transform: `translateX(${xOffset}px)` },
      { opacity: 1, transform: "translateX(0)" }
    ],
    {
      duration: WORKFLOW_TRANSITION_MS,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)"
    }
  );
}

function setActiveWorkflowStep(nextIndex) {
  if (!activeWorkflowSteps.length) {
    return;
  }
  const boundedIndex = Math.max(0, Math.min(nextIndex, activeWorkflowSteps.length - 1));
  const direction = boundedIndex > activeWorkflowStepIndex ? "forward" : boundedIndex < activeWorkflowStepIndex ? "backward" : "";
  activeWorkflowStepIndex = boundedIndex;

  const selector = document.getElementById("project-modal-workflow-selector");
  selector?.querySelectorAll("[data-workflow-index]").forEach((button, index) => {
    button.setAttribute("aria-selected", index === activeWorkflowStepIndex ? "true" : "false");
  });

  renderSelectedWorkflowStep(direction);
  updateWorkflowNavControls();
}

function bindWorkflowSelector() {
  const selector = document.getElementById("project-modal-workflow-selector");
  if (!selector) {
    return;
  }
  selector.onclick = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const button = target.closest("[data-workflow-index]");
    if (!button) {
      return;
    }
    const index = Number(button.getAttribute("data-workflow-index"));
    if (Number.isFinite(index)) {
      setActiveWorkflowStep(index);
    }
  };
}

function updateWorkflowNavControls() {
  const prev = document.getElementById("project-modal-workflow-prev");
  const next = document.getElementById("project-modal-workflow-next");
  if (!prev || !next) {
    return;
  }
  const atStart = activeWorkflowStepIndex <= 0;
  const atEnd = activeWorkflowStepIndex >= activeWorkflowSteps.length - 1;
  prev.disabled = atStart;
  next.disabled = atEnd;
  prev.setAttribute("aria-disabled", atStart ? "true" : "false");
  next.setAttribute("aria-disabled", atEnd ? "true" : "false");
}

function bindWorkflowStepControls() {
  const prev = document.getElementById("project-modal-workflow-prev");
  const next = document.getElementById("project-modal-workflow-next");
  if (!prev || !next) {
    return;
  }
  prev.onclick = () => setActiveWorkflowStep(activeWorkflowStepIndex - 1);
  next.onclick = () => setActiveWorkflowStep(activeWorkflowStepIndex + 1);
}

function updateModalBodyScrollState() {
  const shell = document.getElementById("project-modal");
  const body = document.getElementById("project-modal-body");
  if (!shell || !body) {
    return;
  }
  shell.classList.toggle("is-body-scrolled", body.scrollTop > 8);
}

function bindModalBodyScroll() {
  if (isModalBodyBound) {
    return;
  }
  const body = document.getElementById("project-modal-body");
  if (!body) {
    return;
  }
  body.addEventListener("scroll", updateModalBodyScrollState, { passive: true });
  isModalBodyBound = true;
}

function ensureProjectModalPortal() {
  const overlay = document.getElementById("project-modal-overlay");
  if (!overlay || !document.body) {
    return;
  }
  if (overlay.parentElement !== document.body) {
    document.body.appendChild(overlay);
  }
}

function lockProjectBackgroundScroll() {
  if (projectModalScrollWasLocked || !document.body) {
    return;
  }
  projectModalLockedScrollY = window.scrollY || window.pageYOffset || 0;
  projectModalScrollWasLocked = true;
  document.body.style.position = "fixed";
  document.body.style.top = `-${projectModalLockedScrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
}

function unlockProjectBackgroundScroll() {
  if (!projectModalScrollWasLocked || !document.body) {
    return;
  }
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  window.scrollTo(0, projectModalLockedScrollY);
  projectModalScrollWasLocked = false;
}

function renderProjectsGrid() {
  const host = document.getElementById("project-cards");
  if (!host) {
    return;
  }

  host.innerHTML = PROJECTS_CATALOG.map((project) => `
    <article class="project-card glass-subpanel rounded-[1.2rem] p-5">
      <h3 class="text-lg font-semibold leading-6 text-gray-900">${escapeProjectHtml(project.title)}</h3>
      <p class="mt-3 text-sm leading-6 text-gray-700">${escapeProjectHtml(project.cardSummary || project.summary)}</p>
      <button
        type="button"
        data-project-id="${escapeProjectHtml(project.id)}"
        class="project-card__cta glass-btn-primary mt-5 inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300"
      >
        View Project
      </button>
    </article>
  `).join("");
}

function setProjectModalText(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = value;
  }
}

function openProjectModal(projectId) {
  const project = PROJECTS_CATALOG.find((item) => item.id === projectId);
  if (!project) {
    return;
  }

  setProjectModalText("project-modal-title", project.title);
  setProjectModalText("project-modal-summary", project.summary);
  setProjectModalText("project-modal-overview", project.overview || "Overview will be expanded in a later pass.");
  setProjectModalText("project-modal-why", project.why || "Why-this-matters narrative will be added in a later pass.");
  setProjectModalText("project-modal-approach-intro", project.approachIntro || "This project follows one controlled workflow structure across implementation stages.");
  setProjectModalText("project-modal-next-step", project.nextStep || "Next-step planning is being prepared.");

  renderBulletList("project-modal-approach", project.approach, "Approach details will be added in a later pass.");
  renderBulletList("project-modal-constraints", project.constraints, "Constraints are being documented.");
  renderBulletList("project-modal-results", project.results, "Results summary is being prepared.");
  const resultsPrimaryHeadingEl = document.getElementById("project-modal-results-primary-heading");
  if (resultsPrimaryHeadingEl) {
    const hasPrimaryHeading = Boolean(String(project.resultsPrimaryHeading || "").trim());
    resultsPrimaryHeadingEl.textContent = project.resultsPrimaryHeading || "";
    resultsPrimaryHeadingEl.classList.toggle("hidden", !hasPrimaryHeading);
  }
  const hasSecondaryList = Array.isArray(project.resultsSecondary) && project.resultsSecondary.length > 0;
  if (hasSecondaryList) {
    renderBulletList("project-modal-results-secondary", project.resultsSecondary, "");
  } else {
    const secondaryListEl = document.getElementById("project-modal-results-secondary");
    if (secondaryListEl) {
      secondaryListEl.innerHTML = "";
    }
  }
  setProjectModalText("project-modal-results-secondary-heading", project.resultsSecondaryHeading || "");
  document.getElementById("project-modal-results-secondary-wrap")?.classList.toggle(
    "hidden",
    !(hasSecondaryList || (Array.isArray(project.resultsGroups) && project.resultsGroups.length))
  );
  renderResultsGroups("project-modal-results-groups", project.resultsGroups);
  document.getElementById("project-modal-results-groups")?.classList.toggle("hidden", !(Array.isArray(project.resultsGroups) && project.resultsGroups.length));
  setProjectModalText("project-modal-benchmark-charts-heading", project.benchmarkChartsHeading || "");
  setProjectModalText("project-modal-benchmark-charts-intro", project.benchmarkChartsIntro || "");
  renderBenchmarkChartsWithFigures("project-modal-benchmark-charts", project);
  document.getElementById("project-modal-benchmark-charts-wrap")?.classList.toggle("hidden", !(Array.isArray(project.benchmarkCharts) && project.benchmarkCharts.length));

  const workflowWrap = document.getElementById("project-modal-workflow-wrap");
  if (workflowWrap) {
    activeWorkflowSteps = getWorkflowSteps(project);
    const hasWorkflow = activeWorkflowSteps.length > 0;
    workflowWrap.classList.toggle("hidden", !hasWorkflow);
    if (hasWorkflow) {
      activeWorkflowStepIndex = 0;
      renderWorkflowSelector("project-modal-workflow-selector", activeWorkflowSteps);
      bindWorkflowSelector();
      bindWorkflowStepControls();
      setActiveWorkflowStep(0);
    } else {
      updateWorkflowNavControls();
    }
  }

  const runSummaryWrap = document.getElementById("project-modal-run-summary");
  if (runSummaryWrap) {
    const sections = Array.isArray(project.runSummary?.sections)
      ? project.runSummary.sections
      : [
          { heading: "Configuration", rows: project.runSummary?.configuration || [] },
          { heading: "Recorded Outputs", rows: project.runSummary?.outputs || [] }
        ].filter((section) => Array.isArray(section.rows) && section.rows.length);
    const hasRunSummary = sections.length > 0;
    runSummaryWrap.classList.toggle("hidden", !hasRunSummary);
    if (hasRunSummary) {
      renderRunSummarySections("project-modal-run-summary-sections", sections);
    }
  }

  const tagsHost = document.getElementById("project-modal-tags");
  if (tagsHost) {
    const tags = Array.isArray(project.tags) ? project.tags : [];
    tagsHost.innerHTML = tags.map((tag) => `
      <span class="project-tag rounded-full px-2.5 py-1 text-xs font-medium text-gray-600">${escapeProjectHtml(tag)}</span>
    `).join("");
  }

  const artifactsHost = document.getElementById("project-modal-artifacts");
  const artifactsIntroHost = document.getElementById("project-modal-artifacts-intro");
  if (artifactsIntroHost) {
    const intro = String(project.artifactsIntro || "").trim();
    artifactsIntroHost.textContent = intro;
    artifactsIntroHost.classList.toggle("hidden", !intro);
  }
  if (artifactsHost) {
    const artifacts = Array.isArray(project.artifacts) ? project.artifacts : [];
    artifactsHost.innerHTML = artifacts.length
      ? artifacts.map((item) => `
        ${(item && item.href)
          ? `<a href="${escapeProjectHtml(item.href)}" class="glass-btn-secondary inline-flex rounded-full border px-3 py-2 text-sm font-medium text-blue-600 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300">${escapeProjectHtml(item.label || "Open")}</a>`
          : `<span class="glass-chip inline-flex rounded-full px-3 py-2 text-sm font-medium text-gray-700">${escapeProjectHtml(item?.label || String(item || ""))}</span>`}
      `).join("")
      : "<span class=\"text-sm text-gray-500\">Artifacts will be linked here in a later content pass.</span>";
  }

  const overlay = document.getElementById("project-modal-overlay");
  const modalBody = document.getElementById("project-modal-body");
  const modalShell = document.getElementById("project-modal");
  if (!overlay) {
    return;
  }

  clearTimeout(openProjectModal.closeTimer);
  overlay.classList.remove("hidden");
  requestAnimationFrame(() => {
    overlay.classList.add("is-open");
  });
  overlay.setAttribute("aria-hidden", "false");
  lockProjectBackgroundScroll();
  document.body.classList.add("project-modal-open");
  if (modalBody) {
    modalBody.scrollTop = 0;
  }
  modalShell?.classList.remove("is-body-scrolled");
}

function closeProjectModal() {
  const overlay = document.getElementById("project-modal-overlay");
  if (!overlay) {
    return;
  }

  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("project-modal-open");
  unlockProjectBackgroundScroll();
  document.getElementById("project-modal")?.classList.remove("is-body-scrolled");
  clearTimeout(openProjectModal.closeTimer);
  openProjectModal.closeTimer = setTimeout(() => {
    overlay.classList.add("hidden");
  }, MODAL_FADE_MS);
}

function initProjectsPage() {
  if (document.body?.dataset?.page !== "projects") {
    return;
  }

  renderProjectsGrid();
  ensureProjectModalPortal();
  bindModalBodyScroll();

  document.getElementById("project-cards")?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const button = target.closest("[data-project-id]");
    if (!button) {
      return;
    }
    const projectId = button.getAttribute("data-project-id");
    if (projectId) {
      openProjectModal(projectId);
    }
  });

  document.getElementById("project-modal-close")?.addEventListener("click", closeProjectModal);
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.closest("#project-modal-close")) {
      closeProjectModal();
    }
  });

  document.getElementById("project-modal-overlay")?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.classList.contains("project-modal-backdrop")) {
      closeProjectModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProjectModal();
    }
  });
}

document.addEventListener("DOMContentLoaded", initProjectsPage);
