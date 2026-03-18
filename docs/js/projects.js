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
    id: "yfinance-rate-limit-patch-multi-asset",
    title: "yfinance Rate-Limit Patch and Multi-Asset Download Stitching",
    summary: "Develops a more reliable and reproducible multi-asset download layer for the club’s risk pipeline through chunking, caching, retry logic, stitching, and per-chunk reporting.",
    cardSummary: "This project builds a more reliable multi-asset data-ingestion layer for the club’s risk pipeline by adding chunked downloads, cache-backed retries, chronological stitching, and per-chunk reporting without changing downstream risk computations.",
    tags: ["Infrastructure", "Curated", "Completed"],
    overview: "This project strengthens the club’s data-ingestion layer by addressing rate-limit failures in yfinance downloads and extending the existing workflow to support multi-asset inputs more reliably. Rather than changing the VaR/CVaR and backtest logic itself, the project modifies the upstream data layer: large requests are split into smaller time-window chunks, each chunk can be cached and retried independently, and the resulting series are stitched back together in chronological order. The result is a more stable and traceable input pipeline for downstream risk workflows, especially when moving from single-asset runs to multi-asset portfolio analysis.",
    why: "In financial engineering, downstream model comparisons and backtest results are only as reliable as the data-ingestion layer that feeds them. Transient download failures, inconsistent retries, or non-reproducible input handling can undermine otherwise well-controlled benchmark work. This project matters because it improves data-layer resilience without silently changing the risk-computation path: downloads become more robust, multi-asset runs become easier to reproduce, and each chunk-level outcome can be traced through explicit reporting artifacts.",
    approachIntro: "We structured this project as a controlled data-layer patch that improves download reliability and multi-asset support while leaving the core risk-computation path unchanged.",
    approach: [
      "split each (ticker, date range) request into smaller 3-month download units",
      "added chunk-level caching so reruns can reuse local data instead of re-downloading",
      "added per-chunk retry logic with exponential backoff and jitter to reduce transient failures",
      "stitched chunk outputs in chronological order and deduplicated overlapping boundary rows",
      "merged ticker-level series into wide tables for aligned multi-asset price and return generation",
      "aggregated wide returns into a baseline equal-weight portfolio series without changing downstream VaR/CVaR and backtest functions",
      "recorded chunk-level outcomes and runtime parameters through explicit reporting artifacts for reproducibility"
    ],
    workflowSteps: [
      {
        label: "Step 1",
        title: "Chunk Request Generation",
        bullets: [
          "Split each ticker and date-range request into smaller 3-month windows so downloads can be managed in stable atomic units."
        ]
      },
      {
        label: "Step 2",
        title: "Cached Download and Retry",
        bullets: [
          "Download each chunk independently, reuse cached chunks when available, and apply retry logic with exponential backoff and jitter when transient failures occur."
        ]
      },
      {
        label: "Step 3",
        title: "Stitching and Deduplication",
        bullets: [
          "Concatenate chunk-level outputs, sort them in chronological order, and deduplicate overlapping boundary dates so the final series remains clean and continuous."
        ]
      },
      {
        label: "Step 4",
        title: "Multi-Asset Merge and Portfolio Wiring",
        bullets: [
          "Stitch each ticker independently, merge all tickers into wide-format price and return tables, and aggregate the aligned returns into a baseline portfolio series for downstream risk use."
        ]
      },
      {
        label: "Step 5",
        title: "Reporting and Verification",
        bullets: [
          "Record chunk-level outcomes in download artifacts, preserve run parameters for traceability, and verify the patch through dedicated unit tests and compile checks."
        ]
      }
    ],
    resultsPrimaryHeading: "Project Outcomes",
    results: [
      "implemented a chunked and cache-backed yfinance download layer for multi-asset workflows",
      "reduced fragility from rate-limit failures through retry logic and per-chunk recovery",
      "preserved the existing VaR/CVaR and backtest compute path by isolating the patch to the data layer",
      "extended the CLI pipeline to support multi-ticker inputs and wide-format outputs",
      "added chunk-level reporting artifacts for traceability and reproducibility",
      "verified the patch through dedicated unit tests and local validation checks"
    ],
    benchmarkChartsHeading: "Infrastructure Charts",
    benchmarkChartsIntro: "These charts summarize the reliability improvements, workflow structure, and reproducibility outputs introduced by the data-layer patch.",
    benchmarkCharts: [
      {
        kind: "infraChunkFlow",
        title: "Chunking and Stitching Flow",
        description: "Show how a full ticker date range is split into 3-month chunks, downloaded independently, and stitched back into a single chronological series.",
        caption: "The patch treats each 1 ticker × 3 months window as an atomic download unit, making retries, caching, and reconstruction easier to control."
      },
      {
        kind: "infraBeforeAfter",
        title: "Before vs After Data-Layer Workflow",
        description: "Compare the pre-patch single-request flow versus the patched chunked-download, cached-retry, stitched-output workflow.",
        caption: "The updated data layer improves reliability and traceability without changing the downstream risk-computation logic."
      },
      {
        kind: "infraMultiAssetStructure",
        title: "Multi-Asset Output Structure",
        description: "Show ticker-level stitching, wide-table merging, and baseline portfolio aggregation into downstream risk inputs.",
        caption: "Each ticker is stitched independently, merged into aligned wide tables, and then converted into a baseline portfolio return series for reuse by the existing risk pipeline."
      },
      {
        kind: "infraVerificationSummary",
        title: "Verification and Artifact Summary",
        description: "Summarize tests passed, compile checks, and the main reproducibility artifacts emitted by the patched workflow.",
        caption: "The patch is supported by dedicated verification checks and explicit artifacts that record chunk-level outcomes and runtime settings."
      }
    ],
    resultsSecondaryHeading: "Recorded Outputs",
    resultsGroups: [
      {
        heading: "Patch Scope",
        items: [
          "chunked download",
          "per-chunk retry",
          "local caching",
          "chronological stitching",
          "multi-asset merging",
          "explicit download reporting"
        ]
      },
      {
        heading: "Chunk Rule",
        items: [
          "atomic download unit: 1 ticker × 3 months",
          "controlled by chunk_months for tuning"
        ]
      },
      {
        heading: "Verification Run",
        items: [
          "tickers: SPY, QQQ, TLT",
          "date range: 2025-01-01 to 2026-01-01",
          "chunk size: 3 months",
          "expected chunks: 12 (3 tickers × 4 windows)"
        ]
      },
      {
        heading: "New or Extended Artifacts",
        items: [
          "download_report.json",
          "params.json extended with tickers, chunk_months, cache_dir, retry settings, and weights_mode",
          "prices_aligned.csv kept in wide format",
          "returns.csv kept in wide format"
        ]
      },
      {
        heading: "Validation",
        items: [
          "added unit tests for window generation",
          "added stitching dedupe tests",
          "added caching behavior tests with yfinance mocked",
          "added multi-asset merge verification",
          "confirmed local test run passed: 5 passed",
          "completed syntax compile check for risk_pipeline and tests"
        ]
      }
    ],
    runSummary: {
      sections: [
        {
          heading: "Configuration",
          rows: [
            ["Verification Tickers", "SPY, QQQ, TLT"],
            ["Date Range", "2025-01-01 to 2026-01-01"],
            ["Chunk Rule", "1 ticker × 3 months"],
            ["Expected Chunks", "12"],
            ["Cache Support", "Yes"],
            ["Retry Logic", "Exponential backoff with jitter"],
            ["Output Tables", "Wide-format prices and returns"],
            ["Portfolio Wiring", "Equal-weight baseline portfolio"]
          ]
        },
        {
          heading: "CLI Patch Controls",
          rows: [
            ["--enable-download-patch", "enable chunked download path"],
            ["--chunk-months", "control chunk size"],
            ["--cache-dir", "configure local chunk cache"],
            ["--download-retries", "configure retry count"],
            ["--download-base-sleep", "configure retry base delay"],
            ["--download-jitter", "configure retry randomness"]
          ]
        }
      ]
    },
    constraints: [
      "the workflow still depends on yfinance as an external data source, so provider-side instability cannot be eliminated entirely",
      "chunk size, retry count, and sleep parameters may need retuning under different ticker universes or date ranges",
      "cached data improves reproducibility and rerun stability, but cache policy must remain explicit so stale data is not confused with fresh downloads",
      "this patch improves data-layer resilience, but it does not by itself validate the economic correctness of downstream risk estimates"
    ],
    nextStep: "The next step is to extend this infrastructure patch into a broader multi-asset data-ingestion benchmark. From here, the project can be tested on larger ticker universes, expanded with more detailed cache-hit and retry statistics, integrated into release dashboards, and paired with future runtime reporting so the club can compare not only model behavior but also data-layer reliability across workflows.",
    artifactsIntro: "Machine-readable outputs and reproducibility files for chunked download behavior, stitched multi-asset inputs, and patched pipeline runs.",
    artifacts: [
      { label: "summary.md" },
      { label: "summary.json" },
      { label: "params.json" },
      { label: "download_report.json" },
      { label: "prices_aligned.csv" },
      { label: "returns.csv" },
      { label: "backtest.json" },
      { label: "backtest_detail.csv" },
      { label: "tests/test_download_patch.py" }
    ]
  },
  {
    id: "dtcnumpy",
    title: "dtcnumpy",
    summary: "Develops a NumPy-like semantic comparison package that makes cross-dtype numerical drift visible before it is hidden inside larger quantitative workflows.",
    cardSummary: "This project builds a dtype-semantics comparison package for quantitative computation, with controlled support for cross-dtype drift analysis, higher-level numerical operations, demo workflows, and a staged path toward publishable package distribution.",
    tags: [],
    disableWorkflow: true,
    overview: "This project develops `dtcnumpy`, a small NumPy-like package for comparing how different dtype semantics affect quantitative computation under one shared interface. Rather than simulating CUDA hardware or benchmarking throughput, the project focuses on numerical behavior: one logical input is mapped into multiple dtype versions, FP64 is used as the reference path, FP32 is treated as the practical baseline, and reduced-precision or quantized formats are compared through their output drift. The result is a controlled package line for studying how dtype choices can affect aggregation, tail estimation, matrix operations, and other quant-style kernels before those effects are buried inside larger projects.",
    why: "In financial engineering and quantitative computation, small numerical differences can compound through reductions, tail cutoffs, and matrix-based transformations. Lower-precision or quantized formats may appear harmless at the input level but drift more meaningfully after dot products, quantiles, or matrix multiplication. `dtcnumpy` matters because it creates a controlled environment for comparing those semantic differences directly: outputs remain anchored to an FP64 reference, FP32 provides a practical baseline, and reduced-precision behavior becomes visible before it affects later risk, portfolio, or scenario-generation workflows.",
    approachIntro: "We structured `dtcnumpy` as a staged semantics-comparison package rather than as a hardware simulator or full NumPy replacement.",
    approach: [
      "fixed the project boundary around numeric semantics rather than throughput or device execution",
      "defined a shared `DTCArray` object model that stores one logical input across multiple dtype versions",
      "anchored reporting to FP64 while treating FP32 as the practical baseline",
      "extended the public operation surface in stages from conversion and reporting to higher-level numerical ops",
      "prepared advanced linalg and random-module work as the bridge toward later risk-kernel integration",
      "added meeting-ready example scripts and usage notes to support onboarding and demos",
      "positioned the package for future distribution through PyPI and Conda as it matures into a reusable user-facing tool"
    ],
    resultsPrimaryHeading: "Project Outcomes",
    results: [
      "established a bounded semantic-comparison package for quantitative computation",
      "implemented a reusable `DTCArray` object model with shared per-dtype storage",
      "published a documented public API covering conversion, reporting, reductions, algebra, and selected utilities",
      "fixed clear scope limits so the package does not drift into hardware simulation or full NumPy replacement",
      "added user-facing examples and documentation suitable for meeting demos and onboarding",
      "prepared the project for outward-facing package distribution and future feature versioning beyond the current published line"
    ],
    resultsSecondaryHeading: "Stages",
    resultsSecondary: [
      "Stage 1 — Scope Definition and Data-Type Semantics Design: defined `dtcnumpy` as a precision-semantics simulator for quantitative computation, fixed the v0.1 project boundary, selected the initial supported dtype set, and froze the lightweight `import dtcnumpy as dnp` API direction.",
      "Stage 2 — Base Container and Conversion API: implemented the package structure, built the base `DTCArray` container, and added the first `array(...)`, `asarray(...)`, and `astype(...)` conversion interface together with the initial FP64-based reporting layer.",
      "Stage 3 — Higher-Level Numerical Ops and Reporting: extended the operation surface to include reductions, algebra, and utility helpers, and documented the correct `DTCArray.from_versions(...)` construction path so operation outputs do not double-round through the earlier conversion path.",
      "Stage 4 — Advanced Linear Algebra and Random Preparation: defined the preparation layer for advanced linear algebra and controlled random sampling as the first bridge toward risk-kernel-critical workflows, while explicitly keeping hardware execution out of scope.",
      "Stage 5 — User Examples and Demo Workflows: published meeting-ready demo scripts and usage notes covering array creation, dtype comparison, `astype(...)`, operation-level drift, and lightweight quant-style examples as the first onboarding-oriented stage of the project."
    ],
    benchmarkChartsHeading: "Package Charts",
    benchmarkChartsIntro: "These charts summarize supported dtype roles, the internal object model, roadmap progression, and example-facing usability under the current published package line.",
    benchmarkCharts: [
      {
        kind: "dtcDtypeRoles",
        title: "Supported Dtype Families and Roles",
        description: "A structured comparison of `fp64`, `fp32`, `fp16`, `bf16`, `tf32`, `int8`, `int16`, and `int32`, showing which paths serve as reference precision, practical baseline, reduced-precision comparison, or quantized comparison.",
        caption: "Dtype roles are explicitly separated so drift analysis remains interpretable before outputs are reused in larger workflows."
      },
      {
        kind: "dtcObjectModel",
        title: "DTCArray Object Model",
        description: "A structural view of one logical input stored as an FP64 reference, a dictionary of per-dtype versions, and one active dtype label that controls the current viewing path.",
        caption: "One logical input can be inspected across multiple dtype versions under a shared shape and active-view context."
      },
      {
        kind: "dtcStageProgression",
        title: "Stage Progression View",
        description: "A roadmap view of Stage 1 through Stage 5, showing the transition from semantics design to package structure, higher-level operations, advanced preparation work, and user-facing demos.",
        caption: "The package matured through staged delivery from semantics boundary-setting to example-oriented usability."
      },
      {
        kind: "dtcExampleWorkflowSummary",
        title: "Example Workflow Summary",
        description: "A compact summary of the published example set, covering basic array comparison, dtype switching, operation-level drift, and lightweight quant-style workflows.",
        caption: "Examples are intentionally small and meeting-ready so users can observe semantic drift clearly before full project integration."
      }
    ],
    resultsGroups: [
      {
        kind: "exampleViewer",
        heading: "Example Viewer",
        intro: "A lightweight example browser for meetings, onboarding, and internal explanation. Switch between code excerpts and recorded runs to inspect how `dtcnumpy` behaves across representative usage patterns.",
        cards: [
          {
            file: "demo_basic.py",
            focus: "Scalar / vector comparison and `astype(...)`-based active-dtype switching.",
            codePlaceholder: [
              "python3 -m examples.demo_basic",
              "",
              "\"\"\"Basic dtcnumpy examples for meeting demos.\"\"\"",
              "",
              "from __future__ import annotations",
              "",
              "import dtcnumpy as dnp",
              "",
              "",
              "def section(title: str) -> None:",
              "    print(f\"\\n=== {title} ===\")",
              "",
              "",
              "def main() -> None:",
              "    section(\"Scalar Example\")",
              "    scalar = dnp.array(1.234567)",
              "    dnp.print(scalar)",
              "",
              "    section(\"Vector Example\")",
              "    vector = dnp.array([1.2, 3.4, 5.6])",
              "    dnp.print(vector)",
              "",
              "    section(\"Astype Example\")",
              "    vector_fp16 = vector.astype(\"fp16\")",
              "    print(f\"Active dtype after astype: {vector_fp16.active_dtype}\")",
              "    dnp.print(vector_fp16)",
              "",
              "",
              "if __name__ == \"__main__\":",
              "    main()"
            ].join("\n"),
            runPlaceholder: [
              "=== Scalar Example ===",
              "datatype              value     diff_vs_fp64   diff_pct_vs_fp64",
              "fp64               1.234567                0                  0",
              "fp32               1.234567    4.6165466e-08      3.7394055e-06",
              "fp16               1.234375        -0.000192        0.015552011",
              "bf16               1.234375        -0.000192        0.015552011",
              "tf32               1.234375        -0.000192        0.015552011",
              "int8               1.234567                0                  0",
              "int16              1.234567                0                  0",
              "int32              1.234567                0                  0",
              "",
              "=== Vector Example ===",
              "datatype          shape    mean_abs_diff_vs_fp64   max_abs_diff_vs_fp64   mean_rel_diff_pct_vs_fp64",
              "fp64               (3,)                        0                      0                           0",
              "fp32               (3,)             7.947286e-08          9.5367432e-08               2.8271858e-06",
              "fp16               (3,)            0.00071614583              0.0015625                 0.018555599",
              "bf16               (3,)             0.0067708333               0.009375                  0.25932248",
              "tf32               (3,)                0.0015625             0.00234375                 0.050970909",
              "int8               (3,)             0.0047244094           0.0094488189                  0.30878493",
              "int16              (3,)            4.2725913e-05          8.5451827e-05                0.0027925434",
              "int32              (3,)             2.793968e-10          5.5879346e-10               1.8261226e-08",
              "",
              "=== Astype Example ===",
              "Active dtype after astype: fp16",
              "datatype          shape    mean_abs_diff_vs_fp64   max_abs_diff_vs_fp64   mean_rel_diff_pct_vs_fp64",
              "fp64               (3,)                        0                      0                           0",
              "fp32               (3,)             7.947286e-08          9.5367432e-08               2.8271858e-06",
              "fp16               (3,)            0.00071614583              0.0015625                 0.018555599",
              "bf16               (3,)             0.0067708333               0.009375                  0.25932248",
              "tf32               (3,)                0.0015625             0.00234375                 0.050970909",
              "int8               (3,)             0.0047244094           0.0094488189                  0.30878493",
              "int16              (3,)            4.2725913e-05          8.5451827e-05                0.0027925434",
              "int32              (3,)             2.793968e-10          5.5879346e-10               1.8261226e-08"
            ].join("\n"),
            takeaway: "`demo_basic.py` shows the first layer of semantic drift under a shared comparison interface. In the scalar example, `fp16`, `bf16`, and `tf32` all round `1.234567` to `1.234375`, while the vector example makes relative drift more visible across reduced-precision and quantized paths. The `astype(\"fp16\")` step then shows that active-dtype switching changes the current viewing path without changing the underlying multi-dtype comparison structure."
          },
          {
            file: "demo_ops.py",
            focus: "Operation-level drift through reductions and algebra such as `mean`, `dot`, and `quantile`.",
            codePlaceholder: [
              "python3 -m examples.demo_ops",
              "",
              "\"\"\"Operation-level dtcnumpy examples for meeting demos.\"\"\"",
              "",
              "from __future__ import annotations",
              "",
              "import dtcnumpy as dnp",
              "",
              "",
              "def section(title: str) -> None:",
              "    print(f\"\\n=== {title} ===\")",
              "",
              "",
              "def main() -> None:",
              "    section(\"Mean on a Small Vector\")",
              "    x = dnp.array([1.001, 1.002, 1.003, 1.004])",
              "    mean_result = dnp.mean(x)",
              "    dnp.print(mean_result)",
              "",
              "    section(\"Dot Product Drift\")",
              "    weights = dnp.array([0.10, 0.25, 0.30, 0.35])",
              "    returns = dnp.array([0.0123, -0.0045, 0.0088, 0.0151])",
              "    dot_result = dnp.dot(weights, returns)",
              "    dnp.print(dot_result)",
              "",
              "    section(\"Quantile on a Loss-Like Vector\")",
              "    losses = dnp.array([-0.02, 0.01, -0.05, 0.03, -0.08, 0.00, -0.015])",
              "    tail_cut = dnp.quantile(losses, 0.10)",
              "    dnp.print(tail_cut)",
              "",
              "",
              "if __name__ == \"__main__\":",
              "    main()"
            ].join("\n"),
            runPlaceholder: [
              "=== Mean on a Small Vector ===",
              "datatype              value     diff_vs_fp64   diff_pct_vs_fp64",
              "fp64                 1.0025                0                  0",
              "fp32                 1.0025   -2.3841857e-09      2.3782401e-07",
              "fp16              1.0024414    -5.859375e-05       0.0058447631",
              "bf16                      1          -0.0025         0.24937656",
              "tf32              1.0024414    -5.859375e-05       0.0058447631",
              "int8                  1.004           0.0015         0.14962594",
              "int16             1.0024986   -1.3885922e-06      0.00013851294",
              "int32                1.0025   -4.5401904e-11      4.5288683e-09",
              "",
              "=== Dot Product Drift ===",
              "datatype              value     diff_vs_fp64   diff_pct_vs_fp64",
              "fp64                0.00803                0                  0",
              "fp32           0.0080300002    1.7598271e-10      2.1915655e-06",
              "fp16           0.0080296341   -3.6586702e-07       0.0045562518",
              "bf16           0.0079975128   -3.2487183e-05         0.40457264",
              "tf32            0.008024754   -5.2459973e-06        0.065329979",
              "int8           0.0080099092    -2.009083e-05         0.25019714",
              "int16               0.00803                0                  0",
              "int32               0.00803    9.5693418e-13      1.1916989e-08",
              "",
              "=== Quantile on a Loss-Like Vector ===",
              "datatype              value     diff_vs_fp64   diff_pct_vs_fp64",
              "fp64                 -0.062                0                  0",
              "fp32                 -0.062     2.682209e-10      4.3261436e-07",
              "fp16           -0.061999512    4.8828125e-07       0.0007875504",
              "bf16            -0.06171875       0.00028125         0.45362903",
              "tf32           -0.061975098    2.4902344e-05        0.040165071",
              "int8           -0.061858268    0.00014173228         0.22860046",
              "int16          -0.061999451    5.4933317e-07      0.00088602124",
              "int32                -0.062    8.3819063e-12      1.3519204e-08"
            ].join("\n"),
            takeaway: "Key interpretation will appear here after code and output are added."
          },
          {
            file: "demo_quant.py",
            focus: "Lightweight quant-style workflows such as weighted return, tail-style quantile checking, and small matrix aggregation.",
            codePlaceholder: [
              "python3 -m examples.demo_quant",
              "",
              "\"\"\"Lightweight quant-style dtcnumpy examples.\"\"\"",
              "",
              "from __future__ import annotations",
              "",
              "import dtcnumpy as dnp",
              "",
              "",
              "def section(title: str) -> None:",
              "    print(f\"\\n=== {title} ===\")",
              "",
              "",
              "def main() -> None:",
              "    section(\"Portfolio Weighted Return\")",
              "    print(\"This shows how dtype semantics can change a portfolio-style aggregation.\")",
              "    weights = dnp.array([0.15, 0.20, 0.25, 0.40])",
              "    asset_returns = dnp.array([0.0115, -0.0062, 0.0048, 0.0131])",
              "    portfolio_return = dnp.dot(weights, asset_returns)",
              "    dnp.print(portfolio_return)",
              "",
              "    section(\"Tail-Style Quantile Check\")",
              "    print(\"This highlights how reduced precision can move a downside quantile.\")",
              "    scenario_pnl = dnp.array([-0.031, 0.014, -0.022, -0.087, 0.009, -0.041, 0.003, -0.065])",
              "    tail_quantile = dnp.quantile(scenario_pnl, 0.10)",
              "    dnp.print(tail_quantile)",
              "",
              "    section(\"Small Matrix Aggregation\")",
              "    print(\"This is a compact matrix example relevant to factor-style transformations.\")",
              "    exposures = dnp.array([[1.10, -0.25], [0.80, 0.40], [1.35, -0.10]])",
              "    shocks = dnp.array([[0.015, -0.020, 0.010], [-0.005, 0.012, 0.018]])",
              "    aggregated = dnp.mean(dnp.matmul(exposures, shocks))",
              "    dnp.print(aggregated)",
              "",
              "",
              "if __name__ == \"__main__\":",
              "    main()"
            ].join("\n"),
            runPlaceholder: [
              "=== Portfolio Weighted Return ===",
              "This shows how dtype semantics can change a portfolio-style aggregation.",
              "datatype              value     diff_vs_fp64   diff_pct_vs_fp64",
              "fp64               0.006925                0                  0",
              "fp32           0.0069250002    1.9222498e-10       2.775812e-06",
              "fp16           0.0069237426   -1.2574077e-06        0.018157511",
              "bf16           0.0068823099   -4.2690086e-05         0.61646334",
              "tf32           0.0069223391   -2.6609108e-06        0.038424704",
              "int8           0.0069491971    2.4197098e-05         0.34941658",
              "int16          0.0069249782   -2.1820064e-08      0.00031509117",
              "int32              0.006925    6.7520642e-14      9.7502732e-10",
              "",
              "=== Tail-Style Quantile Check ===",
              "This highlights how reduced precision can move a downside quantile.",
              "datatype              value     diff_vs_fp64   diff_pct_vs_fp64",
              "fp64                -0.0716                0                  0",
              "fp32           -0.071599998    2.4199486e-09      3.3798164e-06",
              "fp16           -0.071594238    5.7617187e-06       0.0080470932",
              "bf16           -0.071533203    6.6796875e-05        0.093291725",
              "tf32           -0.071551514    4.8486328e-05        0.067718335",
              "int8           -0.071655118    -5.511811e-05        0.076980601",
              "int16          -0.071599829    1.7090365e-07      0.00023869225",
              "int32               -0.0716    6.5192574e-12       9.105108e-09",
              "",
              "=== Small Matrix Aggregation ===",
              "This is a compact matrix example relevant to factor-style transformations.",
              "datatype              value     diff_vs_fp64   diff_pct_vs_fp64",
              "fp64           0.0019444444                0                  0",
              "fp32           0.0019444444    2.0696045e-12       1.064368e-07",
              "fp16           0.0019427366   -1.7078821e-06        0.087833937",
              "bf16           0.0019338992   -1.0545254e-05         0.54232734",
              "tf32            0.001945385     9.405406e-07        0.048370659",
              "int8           0.0019623039     1.785948e-05         0.91848755",
              "int16          0.0019445318    8.7315631e-08       0.0044905181",
              "int32          0.0019444444   -3.2337581e-12      1.6630756e-07"
            ].join("\n"),
            takeaway: "Key interpretation will appear here after code and output are added."
          }
        ]
      },
      {
        heading: "Recorded Outputs",
        items: [
          "Supported Dtype Families: `fp64`, `fp32`, `fp16`, `bf16`, `tf32`, `int8`, `int16`, `int32`.",
          "Core Object Model: `raw_fp64`, `versions`, `active_dtype`, shared `shape` across stored versions.",
          "Current Public API Surface: creation/conversion (`array`, `asarray`, `astype`), reporting (`print`), reductions/statistics (`sum`, `mean`, `std`, `quantile`), algebra (`dot`, `matmul`, `outer`, restricted `einsum`), utilities (`reshape`, `transpose`, `.T`, `diag`, `eye`, `clip`, `isfinite`).",
          "Example Set: `demo_basic.py`, `demo_ops.py`, `demo_quant.py`, `README_examples.md`."
        ]
      },
      {
        kind: "installBlocks",
        heading: "Install",
        intro: "`dtcnumpy` is being prepared for package distribution through PyPI and Conda so the project can move from meeting demos into a reusable user-facing workflow. The current package is already usable through source-based examples and manual; package distribution is the next outward-facing step rather than a change in core design.",
        blocks: [
          {
            title: "PyPI",
            code: "pip install <PYPI_PACKAGE_NAME>"
          },
          {
            title: "Conda",
            code: "conda install -c <CONDA_CHANNEL> <CONDA_PACKAGE_NAME>"
          },
          {
            title: "Current source-based usage",
            code: "python3 examples/demo_basic.py\npython3 examples/demo_ops.py\npython3 examples/demo_quant.py"
          }
        ],
        notes: [
          "replace `<PYPI_PACKAGE_NAME>` with the final published package name",
          "replace `<CONDA_CHANNEL>` and `<CONDA_PACKAGE_NAME>` after the Conda package is published",
          "keep the source-based example commands available during the transition"
        ]
      },
      {
        heading: "Release Roadmap",
        items: [
          "v1 — Current: establishes the semantics-comparison package with table-first dtype reporting, core numerical operations, and demo workflows.",
          "v2 — Planned: extends the package with SIMD-oriented support.",
          "v3 — Planned: adds graph-based visualization tools for comparison and VaR-style workflows, moving beyond table-only output toward richer visual reporting."
        ]
      }
    ],
    constraints: [
      "`dtcnumpy` compares semantic behavior, not hardware throughput or device execution",
      "it is not a CUDA simulator, Tensor Core simulator, performance benchmark tool, or full NumPy replacement",
      "advanced linalg, random, and full risk-project integration remain limited or preparatory in the current published stage",
      "integer paths are comparison-oriented quantize/dequantize flows rather than a full integer tensor runtime",
      "examples are intentionally small and controlled relative to full project workflows"
    ],
    nextStep: "The next step is to extend `dtcnumpy` from a semantics-comparison package into a more risk-kernel-ready numerical layer. From here, the project can deepen advanced linalg and controlled random support, broaden example coverage, publish package distribution through PyPI and Conda, and later add SIMD-aware and graph-based comparison tools without changing its core semantics-first design.",
    artifactsHeading: "Documentation & Artifacts",
    artifactsIntro: "Reference materials, examples, and stage documents for reproducible semantics-comparison review.",
    artifacts: [
      { label: "Documentation" },
      { label: "Examples Guide" },
      { label: "demo_basic.py" },
      { label: "demo_ops.py" },
      { label: "demo_quant.py" },
      { label: "Stage 1 summary" },
      { label: "Stage 2 summary" },
      { label: "Stage 3 summary" },
      { label: "Stage 4 summary" },
      { label: "Stage 5 summary" }
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

function buildInfrastructureChunkFlowBlock() {
  const rows = [
    ["SPY", "2025-01-01", "2025-04-01", "60", "No", "0", "Success"],
    ["SPY", "2025-04-01", "2025-07-01", "62", "No", "0", "Success"],
    ["SPY", "2025-07-01", "2025-10-01", "64", "No", "0", "Success"],
    ["SPY", "2025-10-01", "2026-01-01", "64", "No", "0", "Success"],
    ["QQQ", "2025-01-01", "2025-04-01", "60", "No", "0", "Success"],
    ["QQQ", "2025-04-01", "2025-07-01", "62", "No", "0", "Success"],
    ["QQQ", "2025-07-01", "2025-10-01", "64", "No", "0", "Success"],
    ["QQQ", "2025-10-01", "2026-01-01", "64", "No", "0", "Success"],
    ["TLT", "2025-01-01", "2025-04-01", "60", "No", "0", "Success"],
    ["TLT", "2025-04-01", "2025-07-01", "62", "No", "0", "Success"],
    ["TLT", "2025-07-01", "2025-10-01", "64", "No", "0", "Success"],
    ["TLT", "2025-10-01", "2026-01-01", "64", "No", "0", "Success"],
    ["GLD", "2025-01-01", "2025-04-01", "60", "No", "0", "Success"],
    ["GLD", "2025-04-01", "2025-07-01", "62", "No", "0", "Success"],
    ["GLD", "2025-07-01", "2025-10-01", "64", "No", "0", "Success"],
    ["GLD", "2025-10-01", "2026-01-01", "64", "No", "0", "Success"]
  ];

  const summary = [
    ["Total chunks", "16"],
    ["Succeeded", "16"],
    ["Failed", "0"],
    ["Cache hits", "0"],
    ["Total retries", "0"]
  ];

  return `
    <div class="space-y-3 text-xs text-gray-700">
      <div class="overflow-x-auto rounded-[0.7rem] border border-slate-200/60 bg-white/55">
        <table class="min-w-[760px] w-full text-left">
          <thead class="bg-white/45 text-[11px] uppercase tracking-[0.08em] text-gray-500">
            <tr>
              <th class="px-3 py-2 font-semibold">Ticker</th>
              <th class="px-3 py-2 font-semibold">Chunk Start</th>
              <th class="px-3 py-2 font-semibold">Chunk End</th>
              <th class="px-3 py-2 font-semibold text-right">Rows</th>
              <th class="px-3 py-2 font-semibold">Cache Hit</th>
              <th class="px-3 py-2 font-semibold text-right">Retries</th>
              <th class="px-3 py-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => `
              <tr class="border-t border-slate-200/45">
                <td class="px-3 py-2 font-medium text-gray-800">${escapeProjectHtml(row[0])}</td>
                <td class="px-3 py-2">${escapeProjectHtml(row[1])}</td>
                <td class="px-3 py-2">${escapeProjectHtml(row[2])}</td>
                <td class="px-3 py-2 text-right">${escapeProjectHtml(row[3])}</td>
                <td class="px-3 py-2">${escapeProjectHtml(row[4])}</td>
                <td class="px-3 py-2 text-right">${escapeProjectHtml(row[5])}</td>
                <td class="px-3 py-2"><span class="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">${escapeProjectHtml(row[6])}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      <div class="grid grid-cols-2 gap-2 md:grid-cols-5">
        ${summary.map(([label, value]) => `
          <div class="rounded-[0.65rem] border border-slate-200/60 bg-white/55 px-2.5 py-1.5">
            <p class="text-[10px] uppercase tracking-[0.08em] text-gray-500">${escapeProjectHtml(label)}</p>
            <p class="mt-0.5 text-sm font-semibold text-gray-800">${escapeProjectHtml(value)}</p>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function buildInfrastructureBeforeAfterBlock() {
  const rows = [
    ["Request granularity", "full-range request", "3-month chunks"],
    ["Retry behavior", "limited", "per chunk"],
    ["Cache support", "none", "chunk-level cache"],
    ["Stitching", "none", "chronological stitching + dedupe"],
    ["Multi-asset handling", "weaker", "wide-table merge"],
    ["Reporting", "limited", "download_report.json"]
  ];

  return `
    <div class="overflow-x-auto rounded-[0.7rem] border border-slate-200/60 bg-white/55 text-xs text-gray-700">
      <table class="min-w-[640px] w-full text-left">
        <thead class="bg-white/45 text-[11px] uppercase tracking-[0.08em] text-gray-500">
          <tr>
            <th class="px-3 py-2 font-semibold">Feature</th>
            <th class="px-3 py-2 font-semibold">Before Patch</th>
            <th class="px-3 py-2 font-semibold">After Patch</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr class="border-t border-slate-200/45">
              <td class="px-3 py-2 font-medium text-gray-800">${escapeProjectHtml(row[0])}</td>
              <td class="px-3 py-2">${escapeProjectHtml(row[1])}</td>
              <td class="px-3 py-2 font-medium text-slate-800">${escapeProjectHtml(row[2])}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function buildInfrastructureMultiAssetBlock() {
  const structureRows = [
    ["Per-ticker stitched series", "ticker-level time series", "narrow"],
    ["Merged price table", "prices_aligned.csv", "wide"],
    ["Merged return table", "returns.csv", "wide"],
    ["Portfolio aggregation", "baseline portfolio return series", "single series"]
  ];

  const previewRows = [
    ["2025-01-03", "0.01242590647447570", "0.016232693172044800", "-0.0032025694728575", "-0.007895124609843820"],
    ["2025-01-06", "0.005744095465350350", "0.011427274955048300", "-0.004477988204457690", "-0.0012328556129918100"],
    ["2025-01-07", "-0.011368408960579700", "-0.01800516696068930", "-0.01134123338739900", "0.0056176267350635500"],
    ["2025-01-08", "0.0014598802903946700", "0.0001745476855967100", "0.0012792710756081500", "0.0053016031219844300"],
    ["2025-01-10", "-0.015385234727999800", "-0.015805322862999900", "-0.006647773243786650", "0.009512918374949770"]
  ];

  const pricesPreviewRows = [
    ["2025-01-02", "577.854187", "507.655396", "83.560860", "245.419998"],
    ["2025-01-03", "585.079346", "515.963257", "83.293678", "243.490005"],
    ["2025-01-06", "588.449768", "521.893127", "82.921524", "243.190002"],
    ["2025-01-07", "581.797913", "512.580444", "81.986404", "244.559998"],
    ["2025-01-08", "582.647888", "512.669922", "82.091354", "245.860001"]
  ];

  return `
    <div class="space-y-3 text-xs text-gray-700">
      <div class="overflow-x-auto rounded-[0.7rem] border border-slate-200/60 bg-white/55">
        <table class="min-w-[620px] w-full text-left">
          <thead class="bg-white/45 text-[11px] uppercase tracking-[0.08em] text-gray-500">
            <tr>
              <th class="px-3 py-2 font-semibold">Stage</th>
              <th class="px-3 py-2 font-semibold">Output</th>
              <th class="px-3 py-2 font-semibold">Format</th>
            </tr>
          </thead>
          <tbody>
            ${structureRows.map((row) => `
              <tr class="border-t border-slate-200/45">
                <td class="px-3 py-2 font-medium text-gray-800">${escapeProjectHtml(row[0])}</td>
                <td class="px-3 py-2">${escapeProjectHtml(row[1])}</td>
                <td class="px-3 py-2">${escapeProjectHtml(row[2])}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      <section class="rounded-[0.7rem] border border-slate-200/60 bg-white/55 p-2.5">
        <p class="text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-500">prices_aligned.csv preview</p>
        <div class="mt-2 overflow-x-auto">
          <table class="min-w-[760px] w-full text-left">
            <thead class="bg-white/45 text-[11px] uppercase tracking-[0.08em] text-gray-500">
              <tr>
                <th class="px-2.5 py-2 font-semibold">date</th>
                <th class="px-2.5 py-2 font-semibold text-right">SPY</th>
                <th class="px-2.5 py-2 font-semibold text-right">QQQ</th>
                <th class="px-2.5 py-2 font-semibold text-right">TLT</th>
                <th class="px-2.5 py-2 font-semibold text-right">GLD</th>
              </tr>
            </thead>
            <tbody>
              ${pricesPreviewRows.map((row) => `
                <tr class="border-t border-slate-200/45">
                  <td class="px-2.5 py-1.5 font-medium text-gray-800">${escapeProjectHtml(row[0])}</td>
                  <td class="px-2.5 py-1.5 text-right font-mono text-[11px]">${escapeProjectHtml(row[1])}</td>
                  <td class="px-2.5 py-1.5 text-right font-mono text-[11px]">${escapeProjectHtml(row[2])}</td>
                  <td class="px-2.5 py-1.5 text-right font-mono text-[11px]">${escapeProjectHtml(row[3])}</td>
                  <td class="px-2.5 py-1.5 text-right font-mono text-[11px]">${escapeProjectHtml(row[4])}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
      <section class="rounded-[0.7rem] border border-slate-200/60 bg-white/55 p-2.5">
        <p class="text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-500">returns.csv preview</p>
        <div class="mt-2 overflow-x-auto">
          <table class="min-w-[760px] w-full text-left">
            <thead class="bg-white/45 text-[11px] uppercase tracking-[0.08em] text-gray-500">
              <tr>
                <th class="px-2.5 py-2 font-semibold">date</th>
                <th class="px-2.5 py-2 font-semibold text-right">SPY</th>
                <th class="px-2.5 py-2 font-semibold text-right">QQQ</th>
                <th class="px-2.5 py-2 font-semibold text-right">TLT</th>
                <th class="px-2.5 py-2 font-semibold text-right">GLD</th>
              </tr>
            </thead>
            <tbody>
              ${previewRows.map((row) => `
                <tr class="border-t border-slate-200/45">
                  <td class="px-2.5 py-1.5 font-medium text-gray-800">${escapeProjectHtml(row[0])}</td>
                  <td class="px-2.5 py-1.5 text-right font-mono text-[11px]">${escapeProjectHtml(row[1])}</td>
                  <td class="px-2.5 py-1.5 text-right font-mono text-[11px]">${escapeProjectHtml(row[2])}</td>
                  <td class="px-2.5 py-1.5 text-right font-mono text-[11px]">${escapeProjectHtml(row[3])}</td>
                  <td class="px-2.5 py-1.5 text-right font-mono text-[11px]">${escapeProjectHtml(row[4])}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function buildInfrastructureVerificationBlock() {
  const verificationRows = [
    ["Window generation", "Pass", "chunk windows generated correctly"],
    ["Stitching dedupe", "Pass", "overlap handling verified"],
    ["Caching behavior", "Pass", "yfinance mocked"],
    ["Multi-asset merge", "Pass", "verified across multi-ticker workflow"],
    ["Local test run", "Pass", "5 passed"],
    ["Compile check", "Pass", "syntax compile check completed"]
  ];
  const artifactRows = [
    ["download_report.json", "chunk-level outcomes"],
    ["params.json", "runtime and patch settings"],
    ["prices_aligned.csv", "merged wide price table"],
    ["returns.csv", "merged wide return table"],
    ["summary.md", "human-readable run summary"],
    ["summary.json", "machine-readable run summary"],
    ["backtest.json", "downstream coverage metrics"],
    ["backtest_detail.csv", "day-level backtest rows"]
  ];

  return `
    <div class="grid grid-cols-1 gap-3 xl:grid-cols-2 text-xs text-gray-700">
      <section class="rounded-[0.7rem] border border-slate-200/60 bg-white/55 p-2.5">
        <p class="text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-500">Verification</p>
        <div class="mt-2 overflow-x-auto">
          <table class="min-w-[420px] w-full text-left">
            <thead class="bg-white/45 text-[11px] uppercase tracking-[0.08em] text-gray-500">
              <tr>
                <th class="px-2.5 py-2 font-semibold">Check</th>
                <th class="px-2.5 py-2 font-semibold">Status</th>
                <th class="px-2.5 py-2 font-semibold">Note</th>
              </tr>
            </thead>
            <tbody>
              ${verificationRows.map((row) => `
                <tr class="border-t border-slate-200/45">
                  <td class="px-2.5 py-1.5 font-medium text-gray-800">${escapeProjectHtml(row[0])}</td>
                  <td class="px-2.5 py-1.5"><span class="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">${escapeProjectHtml(row[1])}</span></td>
                  <td class="px-2.5 py-1.5">${escapeProjectHtml(row[2])}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
      <section class="rounded-[0.7rem] border border-slate-200/60 bg-white/55 p-2.5">
        <p class="text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-500">Artifacts</p>
        <div class="mt-2 overflow-x-auto">
          <table class="min-w-[360px] w-full text-left">
            <thead class="bg-white/45 text-[11px] uppercase tracking-[0.08em] text-gray-500">
              <tr>
                <th class="px-2.5 py-2 font-semibold">Artifact</th>
                <th class="px-2.5 py-2 font-semibold">Purpose</th>
              </tr>
            </thead>
            <tbody>
              ${artifactRows.map((row) => `
                <tr class="border-t border-slate-200/45">
                  <td class="px-2.5 py-1.5 font-medium text-gray-800">${escapeProjectHtml(row[0])}</td>
                  <td class="px-2.5 py-1.5">${escapeProjectHtml(row[1])}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function buildDtcnumpyDtypeRolesBlock() {
  const rows = [
    ["fp64", "reference precision"],
    ["fp32", "practical baseline"],
    ["fp16", "reduced-precision comparison"],
    ["bf16", "reduced-precision comparison"],
    ["tf32", "reduced-precision comparison"],
    ["int8", "quantized comparison"],
    ["int16", "quantized comparison"],
    ["int32", "quantized comparison"]
  ];
  return `
    <div class="overflow-x-auto rounded-[0.7rem] border border-slate-200/60 bg-white/55 text-xs text-gray-700">
      <table class="min-w-[420px] w-full text-left">
        <thead class="bg-white/45 text-[11px] uppercase tracking-[0.08em] text-gray-500">
          <tr>
            <th class="px-3 py-2 font-semibold">Dtype</th>
            <th class="px-3 py-2 font-semibold">Role</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr class="border-t border-slate-200/45">
              <td class="px-3 py-2 font-mono text-[11px] font-semibold text-gray-800">${escapeProjectHtml(row[0])}</td>
              <td class="px-3 py-2">${escapeProjectHtml(row[1])}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function buildDtcnumpyObjectModelBlock() {
  const inputLayerRows = [
    ["Logical input", "one shared input tensor / vector entering `DTCArray`"],
    ["Reference path", "FP64 storage used as the comparison anchor"],
    ["Baseline path", "FP32 used as the practical baseline for interpretation"]
  ];
  const storedComponentRows = [
    ["`raw_fp64`", "reference-value storage"],
    ["`versions`", "dictionary of per-dtype stored views"],
    ["`active_dtype`", "current default view selector"],
    ["`shape`", "shared logical shape across stored versions"]
  ];
  const comparisonFlowRows = [
    ["FP64", "reference precision"],
    ["FP32", "practical baseline"],
    ["reduced precision / quantized paths", "drift inspection against the reference"]
  ];

  function renderTableBlock(title, leftHeader, rightHeader, rows) {
    return `
      <section class="rounded-[0.7rem] border border-slate-200/60 bg-white/55 p-2.5">
        <p class="text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-500">${escapeProjectHtml(title)}</p>
        <div class="mt-2 overflow-x-auto">
          <table class="min-w-[420px] w-full text-left text-xs text-gray-700">
            <thead class="bg-white/45 text-[11px] uppercase tracking-[0.08em] text-gray-500">
              <tr>
                <th class="px-2.5 py-2 font-semibold">${escapeProjectHtml(leftHeader)}</th>
                <th class="px-2.5 py-2 font-semibold">${escapeProjectHtml(rightHeader)}</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map((row) => `
                <tr class="border-t border-slate-200/45">
                  <td class="px-2.5 py-1.5 font-medium text-gray-800">${escapeProjectHtml(row[0])}</td>
                  <td class="px-2.5 py-1.5">${escapeProjectHtml(row[1])}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  return `
    <div class="space-y-3 text-xs text-gray-700">
      ${renderTableBlock("Input Layer", "Element", "Role", inputLayerRows)}
      ${renderTableBlock("Stored Components", "Component", "Role", storedComponentRows)}
      ${renderTableBlock("Comparison Flow", "Stage", "Meaning", comparisonFlowRows)}
    </div>
  `;
}

function buildDtcnumpyStageProgressionBlock() {
  const stages = [
    "Stage 1 Scope",
    "Stage 2 Container/API",
    "Stage 3 Ops/Reporting",
    "Stage 4 Advanced Prep",
    "Stage 5 Demos"
  ];
  return `
    <div class="space-y-2 text-xs text-gray-700">
      <div class="grid grid-cols-1 gap-2 md:grid-cols-5">
        ${stages.map((stage, idx) => `
          <div class="rounded-[0.7rem] border ${idx === 4 ? "border-blue-300 bg-blue-50/65" : "border-slate-200/60 bg-white/55"} px-2.5 py-2">
            <p class="text-[10px] font-semibold uppercase tracking-[0.08em] ${idx === 4 ? "text-blue-700" : "text-gray-500"}">${escapeProjectHtml(stage)}</p>
          </div>
        `).join("")}
      </div>
      <p class="text-[11px] text-gray-600">Progression moved from semantics boundary-setting to user-facing examples while keeping hardware simulation explicitly out of scope.</p>
    </div>
  `;
}

function buildDtcnumpyExampleWorkflowSummaryBlock() {
  const rows = [
    ["demo_basic.py", "scalar/vector comparison + astype switching"],
    ["demo_ops.py", "operation-level drift: mean, dot, quantile"],
    ["demo_quant.py", "portfolio-style return, tail checks, matmul+mean"],
    ["README_examples.md", "meeting/onboarding usage guide"]
  ];
  return `
    <div class="overflow-x-auto rounded-[0.7rem] border border-slate-200/60 bg-white/55 text-xs text-gray-700">
      <table class="min-w-[520px] w-full text-left">
        <thead class="bg-white/45 text-[11px] uppercase tracking-[0.08em] text-gray-500">
          <tr>
            <th class="px-3 py-2 font-semibold">Example</th>
            <th class="px-3 py-2 font-semibold">Focus</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr class="border-t border-slate-200/45">
              <td class="px-3 py-2 font-medium text-gray-800">${escapeProjectHtml(row[0])}</td>
              <td class="px-3 py-2">${escapeProjectHtml(row[1])}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
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
    if (kind === "infraChunkFlow") {
      figure.innerHTML = buildInfrastructureChunkFlowBlock();
      continue;
    }
    if (kind === "infraBeforeAfter") {
      figure.innerHTML = buildInfrastructureBeforeAfterBlock();
      continue;
    }
    if (kind === "infraMultiAssetStructure") {
      figure.innerHTML = buildInfrastructureMultiAssetBlock();
      continue;
    }
    if (kind === "infraVerificationSummary") {
      figure.innerHTML = buildInfrastructureVerificationBlock();
      continue;
    }
    if (kind === "dtcDtypeRoles") {
      figure.innerHTML = buildDtcnumpyDtypeRolesBlock();
      continue;
    }
    if (kind === "dtcObjectModel") {
      figure.innerHTML = buildDtcnumpyObjectModelBlock();
      continue;
    }
    if (kind === "dtcStageProgression") {
      figure.innerHTML = buildDtcnumpyStageProgressionBlock();
      continue;
    }
    if (kind === "dtcExampleWorkflowSummary") {
      figure.innerHTML = buildDtcnumpyExampleWorkflowSummaryBlock();
      continue;
    }
    figure.innerHTML = `<div class="project-chart-placeholder"><p class="text-sm text-gray-600">Structured chart content is not available in this view.</p></div>`;
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
      ${group.kind === "exampleViewer" ? `
        <p class="mt-2 text-sm leading-6 text-gray-700">${escapeProjectHtml(group.intro || "")}</p>
        <section class="mt-3 rounded-[0.95rem] border border-slate-200/65 bg-white/55 p-3.5" data-example-viewer data-active-file="0" data-active-mode="code">
          <div class="flex flex-wrap gap-2">
            ${(Array.isArray(group.cards) ? group.cards : []).map((card, index) => `
              <button
                type="button"
                data-example-file="${index}"
                aria-selected="${index === 0 ? "true" : "false"}"
                class="rounded-full border px-3 py-1.5 text-xs font-semibold tracking-[0.08em] ${index === 0 ? "border-indigo-300/80 bg-indigo-100/85 text-indigo-900 shadow-sm" : "border-slate-200/70 bg-white/70 text-gray-600"}"
              >
                ${escapeProjectHtml(card.file || "")}
              </button>
            `).join("")}
          </div>
          <div class="mt-3 inline-flex rounded-full border border-slate-200/70 bg-white/75 p-1">
            <button
              type="button"
              data-example-mode="code"
              aria-selected="true"
              class="rounded-full border border-indigo-300/80 bg-indigo-100/85 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-indigo-900 shadow-sm"
            >
              Code
            </button>
            <button
              type="button"
              data-example-mode="run"
              aria-selected="false"
              class="rounded-full border border-transparent bg-transparent px-3 py-1 text-xs font-semibold tracking-[0.08em] text-gray-500"
            >
              Run
            </button>
          </div>
          <div class="mt-3">
            ${(Array.isArray(group.cards) ? group.cards : []).map((card, index) => `
              <section data-example-file-panel="${index}" class="${index === 0 ? "" : "hidden"}">
                <div class="example-surface example-surface--code" data-example-surface>
                  <pre class="example-panel example-panel--code ${index === 0 ? "" : "hidden "}" data-example-content="code"><code>${escapeProjectHtml(card.codePlaceholder || "")}</code></pre>
                  <pre class="example-panel example-panel--run hidden" data-example-content="run"><code>${escapeProjectHtml(card.runPlaceholder || "")}</code></pre>
                </div>
                <section class="mt-3 rounded-[0.75rem] border border-slate-200/65 bg-white/66 p-2.5">
                  <p class="text-[10px] font-semibold uppercase tracking-[0.08em] text-gray-500">Focus</p>
                  <p class="mt-1 text-sm leading-6 text-gray-700">${escapeProjectHtml(card.focus || "")}</p>
                </section>
                <section class="mt-2 rounded-[0.75rem] border border-indigo-200/65 bg-[#f2edff]/68 p-2.5">
                  <p class="text-[10px] font-semibold uppercase tracking-[0.08em] text-indigo-700">Takeaway</p>
                  <p class="mt-1 text-sm leading-6 text-gray-700">${escapeProjectHtml(card.takeaway || "")}</p>
                </section>
              </section>
            `).join("")}
          </div>
        </div>
        </section>
      ` : group.kind === "installBlocks" ? `
        <p class="mt-2 text-sm leading-6 text-gray-700">${escapeProjectHtml(group.intro || "")}</p>
        <div class="mt-3 space-y-3">
          ${(Array.isArray(group.blocks) ? group.blocks : []).map((block) => `
            <section class="rounded-[0.85rem] border border-slate-200/65 bg-white/55 p-3">
              <p class="text-xs font-semibold uppercase tracking-[0.08em] text-gray-500">${escapeProjectHtml(block.title || "")}</p>
              <pre class="mt-1 overflow-x-auto rounded-[0.7rem] border border-slate-200/70 bg-white/70 px-3 py-2 text-[12px] leading-5 text-gray-800"><code>${escapeProjectHtml(block.code || "")}</code></pre>
            </section>
          `).join("")}
          ${(Array.isArray(group.notes) && group.notes.length) ? `
            <section class="rounded-[0.85rem] border border-slate-200/65 bg-white/55 p-3">
              <p class="text-xs font-semibold uppercase tracking-[0.08em] text-gray-500">Notes</p>
              <ul class="mt-1 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-700">
                ${group.notes.map((item) => `<li>${escapeProjectHtml(item)}</li>`).join("")}
              </ul>
            </section>
          ` : ""}
        </div>
      ` : `
        <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-700">
          ${(Array.isArray(group.items) ? group.items : []).map((item) => `<li>${escapeProjectHtml(item)}</li>`).join("")}
        </ul>
      `}
    </article>
  `).join("");

  host.onclick = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const fileButton = target.closest("[data-example-file]");
    const modeButton = target.closest("[data-example-mode]");
    if (!fileButton && !modeButton) {
      return;
    }

    const viewer = target.closest("[data-example-viewer]");
    if (!(viewer instanceof HTMLElement)) {
      return;
    }

    if (fileButton) {
      const fileIndex = fileButton.getAttribute("data-example-file") || "0";
      viewer.setAttribute("data-active-file", fileIndex);
      viewer.querySelectorAll("[data-example-file]").forEach((btn) => {
        const isActive = btn.getAttribute("data-example-file") === fileIndex;
        btn.setAttribute("aria-selected", isActive ? "true" : "false");
        btn.classList.toggle("border-indigo-300/80", isActive);
        btn.classList.toggle("bg-indigo-100/85", isActive);
        btn.classList.toggle("text-indigo-900", isActive);
        btn.classList.toggle("shadow-sm", isActive);
        btn.classList.toggle("border-slate-200/70", !isActive);
        btn.classList.toggle("bg-white/70", !isActive);
        btn.classList.toggle("text-gray-600", !isActive);
      });
      viewer.querySelectorAll("[data-example-file-panel]").forEach((panel) => {
        panel.classList.toggle("hidden", panel.getAttribute("data-example-file-panel") !== fileIndex);
      });
    }

    if (modeButton) {
      const mode = modeButton.getAttribute("data-example-mode") || "code";
      viewer.setAttribute("data-active-mode", mode);
    }

    const activeMode = viewer.getAttribute("data-active-mode") || "code";
    viewer.querySelectorAll("[data-example-mode]").forEach((btn) => {
      const isActive = btn.getAttribute("data-example-mode") === activeMode;
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
      btn.classList.toggle("text-indigo-900", isActive);
      btn.classList.toggle("text-gray-500", !isActive);
      btn.classList.toggle("bg-indigo-100/85", isActive);
      btn.classList.toggle("bg-transparent", !isActive);
      btn.classList.toggle("border-indigo-300/80", isActive);
      btn.classList.toggle("border-transparent", !isActive);
      btn.classList.toggle("shadow-sm", isActive);
    });

    const activeFile = viewer.getAttribute("data-active-file") || "0";
    const activePanel = viewer.querySelector(`[data-example-file-panel="${activeFile}"]`);
    if (activePanel instanceof HTMLElement) {
      const codePanel = activePanel.querySelector("[data-example-content=\"code\"]");
      const runPanel = activePanel.querySelector("[data-example-content=\"run\"]");
      const surface = activePanel.querySelector("[data-example-surface]");
      if (codePanel instanceof HTMLElement && runPanel instanceof HTMLElement) {
        codePanel.classList.toggle("hidden", activeMode !== "code");
        runPanel.classList.toggle("hidden", activeMode !== "run");
      }
      if (surface instanceof HTMLElement) {
        surface.classList.toggle("example-surface--code", activeMode === "code");
        surface.classList.toggle("example-surface--run", activeMode === "run");
      }
    }
  };
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
  const approachLayout = document.querySelector("#project-modal .project-approach-layout");
  if (workflowWrap) {
    const workflowDisabled = Boolean(project?.disableWorkflow);
    activeWorkflowSteps = workflowDisabled ? [] : getWorkflowSteps(project);
    const hasWorkflow = activeWorkflowSteps.length > 0;
    workflowWrap.classList.toggle("hidden", !hasWorkflow);
    approachLayout?.classList.toggle("project-approach-layout--single", !hasWorkflow);
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

  const artifactsHost = document.getElementById("project-modal-artifacts");
  const artifactsIntroHost = document.getElementById("project-modal-artifacts-intro");
  const artifactsHeadingHost = document.getElementById("project-modal-artifacts-heading");
  if (artifactsHeadingHost) {
    artifactsHeadingHost.textContent = String(project.artifactsHeading || "Artifacts");
  }
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
