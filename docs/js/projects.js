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
    summary: "Builds pricing diagnostics and no-arbitrage validation checks for option-oriented project lines.",
    tags: ["Algorithm", "Curated", "In Progress"],
    overview: "The project formalizes pricing checks and sanity constraints before integrating derivatives outputs into broader risk comparisons.",
    why: "No-arbitrage guardrails prevent invalid pricing assumptions from contaminating downstream analyses.",
    approach: [
      "Implement baseline pricing routines with transparent assumptions.",
      "Apply no-arbitrage checks and boundary-condition tests.",
      "Document validation outcomes for review reuse."
    ],
    constraints: [
      "Input quality and implied-vol assumptions directly affect diagnostics.",
      "Edge-case handling is required for thin-liquidity symbols."
    ],
    results: [
      "Validation checklist now catches inconsistent quote scenarios.",
      "Pricing outputs are easier to compare across implementation variants."
    ],
    nextStep: "Integrate diagnostic summaries into project-level comparison dashboards.",
    artifacts: [
      { label: "Open Plan Context", href: "./plan.html" },
      { label: "Open Legacy Release", href: "./archive.html" }
    ]
  },
  {
    id: "risk-model-comparison",
    title: "Risk Model Comparison",
    summary: "Creates a shared framework to compare risk models under consistent data, metrics, and reporting templates.",
    tags: ["Algorithm", "Curated", "Comparison"],
    overview: "This project aggregates outputs from multiple model families and presents normalized comparison views for club decision-making.",
    why: "Without a common comparison frame, model discussions become anecdotal and hard to reproduce.",
    approach: [
      "Define common inputs, outputs, and comparison metrics.",
      "Run aligned evaluations across selected model variants.",
      "Publish concise comparison reports with assumptions."
    ],
    constraints: [
      "Metric selection can bias perceived model quality.",
      "Cross-model normalization requires strict schema discipline."
    ],
    results: [
      "Improved clarity in review meetings on tradeoffs and failure modes.",
      "Reusable comparison templates are now available for new projects."
    ],
    nextStep: "Expand comparisons to include infrastructure cost and runtime metrics.",
    artifacts: [
      { label: "Open Plan Context", href: "./plan.html" },
      { label: "Open Download Files", href: "./download.html" }
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
    <article class="project-chart-card rounded-[0.95rem] p-3.5">
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
  renderBenchmarkCharts(hostId, project?.benchmarkCharts);

  const cards = host.querySelectorAll(".project-chart-card");
  const chartData = project?.chartData || {};
  if (cards[0]) {
    const figure = cards[0].querySelector(".project-chart-figure");
    if (figure) {
      figure.innerHTML = buildGroupedBarsChart(chartData.cpuGpuMetrics);
    }
  }
  if (cards[2]) {
    const figure = cards[2].querySelector(".project-chart-figure");
    if (figure) {
      figure.innerHTML = buildBreachComparisonChart(chartData.breachRates);
    }
  }
  if (cards[1]) {
    const figure = cards[1].querySelector(".project-chart-figure");
    if (figure) {
      figure.innerHTML = `<div class="project-chart-placeholder"><p class="text-sm text-gray-600">Loading rolling backtest series…</p></div>`;
      const rows = await fetchRollingBacktestRows(chartData.rollingBacktest?.csvPath || "");
      if (token !== activeChartRenderToken) {
        return;
      }
      figure.innerHTML = buildRollingBacktestChart(rows || chartData.rollingBacktest?.fallbackSeries || []);
    }
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
      <div class="mt-4 flex flex-wrap gap-2">
        ${(project.tags || []).map((tag) => `<span class="project-tag rounded-full px-2.5 py-1 text-xs font-medium text-gray-600">${escapeProjectHtml(tag)}</span>`).join("")}
      </div>
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
