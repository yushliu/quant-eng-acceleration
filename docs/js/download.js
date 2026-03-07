const fileCache = new Map();

let manifestItems = [];
let selectedItemId = "";
let selectedFilePath = "";
let selectedFileText = "";
let selectedFileLang = "plaintext";
let selectedItemViewId = "";
let sourceExplorerRequestId = 0;
let sourceExplorerModulePromise = null;

const SOURCE_EXPLORER_ITEM_CONFIG = {
  "risk-model-comparison-stage5-2026-02-2": {
    indexPath: "artifacts/2026-2-2/files.json",
    baseRootPath: "artifacts/2026-2-2"
  },
  "risk-model-comparison-stage4-2026-02-1": {
    indexPath: "artifacts/2026-2-1/files.json",
    baseRootPath: "artifacts/2026-2-1"
  },
  "risk-model-comparison-stage3-2026-01-2": {
    indexPath: "artifacts/2026-1-2/files.json",
    baseRootPath: "artifacts/2026-1-2"
  },
  "risk-model-comparison-stage2-2026-01-1": {
    indexPath: "artifacts/2026-1-1-source/files.json",
    baseRootPath: "artifacts/2026-1-1-source"
  },
  "risk-model-comparison-stage1-2025-12-2": {
    indexPath: "artifacts/2025-12-2-source/files.json",
    baseRootPath: "artifacts/2025-12-2-source"
  },
  "pricing-no-arbitrage-cpu-vs-gpu-2025-12": {
    indexPath: "artifacts/2025-12-1-source/files.json",
    baseRootPath: "artifacts/2025-12-1-source"
  },
  "yfinance-rate-limit-patch-2025-11": {
    indexPath: "artifacts/2025-11-2-source/files.json",
    baseRootPath: "artifacts/2025-11-2-source"
  },
  "ewma-mcvar-backtest-2025-11": {
    indexPath: "artifacts/2025-11-1-source/files.json",
    baseRootPath: "artifacts/2025-11-1-source"
  },
  "ewma-mcvar-backtest-2025-10": {
    indexPath: "artifacts/2025-10-2-source/files.json",
    baseRootPath: "artifacts/2025-10-2-source"
  }
};

const RUN_GUIDE_HTML_GPU = `
  <h2 class="text-lg font-semibold tracking-tight text-gray-900">How to Run (CLI)</h2>
  <p class="mt-3 text-sm leading-6 text-gray-600">
    Use the command line to run the Daily EWMA &rarr; Monte Carlo VaR/CVaR backtest on GPU and generate the artifacts shown above.
  </p>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Install</h3>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>python3 -m pip install -r requirements.txt</code></pre>
    <p class="mt-2 text-sm leading-6 text-gray-600">GPU mode requires CUDA + a GPU runtime. For CPU runs, omit <code>--backend gpu</code>.</p>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Run (Fast mode, GPU, CI-like)</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">Fast mode is the default and uses smaller Monte Carlo settings for quick feedback.</p>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>python3 -m risk_pipeline.cli.run_daily \\
  --mode fast \\
  --tickers "SPY,QQQ,TLT" \\
  --alpha 0.99 \\
  --backend gpu \\
  --gpu-device 0</code></pre>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Run (Fast mode, GPU, yfinance short window)</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">For a quick real-data smoke run with minimal download volume:</p>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>python3 -m risk_pipeline.cli.run_daily \\
  --mode fast \\
  --tickers "SPY" \\
  --start 2025-08-01 \\
  --end 2026-02-09 \\
  --alpha 0.99 \\
  --backend gpu \\
  --gpu-device 0</code></pre>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Run (GPU with local cache / local file)</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">Use a local cache directory to reduce repeated yfinance calls and rate-limit failures:</p>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>python3 -m risk_pipeline.cli.run_daily \\
  --mode fast \\
  --tickers "SPY,QQQ,TLT" \\
  --alpha 0.99 \\
  --backend gpu \\
  --gpu-device 0 \\
  --cache-dir "./datasets/yfinance_cache/&lt;CACHE_ID&gt;"</code></pre>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Run (Full mode, GPU, release-like)</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">Full mode uses a longer daily window and larger Monte Carlo settings for release-grade evaluation.</p>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>python3 -m risk_pipeline.cli.run_daily \\
  --mode full \\
  --tickers "SPY,QQQ,TLT" \\
  --alpha 0.99 \\
  --backend gpu \\
  --gpu-device 0</code></pre>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Override parameters</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">You can override dates and Monte Carlo sizes as needed:</p>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>python3 -m risk_pipeline.cli.run_daily \\
  --mode fast \\
  --tickers "SPY" \\
  --start 2025-08-01 \\
  --end 2026-02-09 \\
  --mc-paths 3000 \\
  --backtest-mc-paths 500 \\
  --alpha 0.99 \\
  --backend gpu \\
  --gpu-device 0</code></pre>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Debug output</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">By default, no [DBG] lines are printed. Enable numerical traces with:</p>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>python3 -m risk_pipeline.cli.run_daily --mode fast --debug --backend gpu --gpu-device 0</code></pre>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Backtest artifacts</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">Each run writes to results/daily/&lt;run_id&gt;/ and produces:</p>
    <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-600">
      <li><code>summary.md / summary.json</code>: at-a-glance run summary</li>
      <li><code>params.json</code>: run parameters</li>
      <li><code>var_cvar.json</code>: VaR/CVaR metrics</li>
      <li><code>backtest.json</code>: backtest metrics (breach rate, etc.)</li>
      <li><code>backtest_detail.csv</code>: per-day rows (date, VaR, realized loss, breach)</li>
    </ul>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Kupiec POF interpretation</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">
      <code>kupiec_p_value</code> tests whether the observed breach frequency matches the expected VaR coverage.
      A low p-value suggests the model is likely miscalibrated.
    </p>
  </section>
`;

const RUN_GUIDE_HTML_PATCH = `
  <h2 class="text-lg font-semibold tracking-tight text-gray-900">How to Run (CLI)</h2>
  <p class="mt-3 text-sm leading-6 text-gray-600">
    Run the yfinance rate-limit patch with chunked downloads and multi-asset stitching, then feed outputs into the existing risk pipeline.
  </p>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Install</h3>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>python3 -m pip install -r requirements.txt</code></pre>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Run fast</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">Fast verification run with chunking enabled:</p>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>python3 -m risk_pipeline.cli.run_daily \\
  --mode fast \\
  --tickers "SPY,QQQ,TLT" \\
  --start 2025-01-01 \\
  --end 2026-01-01 \\
  --enable-download-patch \\
  --chunk-months 3 \\
  --cache-dir "./datasets/yfinance_cache" \\
  --download-retries 3 \\
  --download-base-sleep 1.5 \\
  --download-jitter 0.6</code></pre>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Run full</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">Full run keeps the same patch wiring with larger compute settings:</p>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>python3 -m risk_pipeline.cli.run_daily \\
  --mode full \\
  --tickers "SPY,QQQ,TLT" \\
  --start 2025-01-01 \\
  --end 2026-01-01 \\
  --enable-download-patch \\
  --chunk-months 3 \\
  --cache-dir "./datasets/yfinance_cache"</code></pre>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Override parameters</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">Tune chunking and retry behavior as needed:</p>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>python3 -m risk_pipeline.cli.run_daily \\
  --mode fast \\
  --tickers "SPY,QQQ,TLT" \\
  --start 2025-01-01 \\
  --end 2026-01-01 \\
  --enable-download-patch \\
  --chunk-months 3 \\
  --cache-dir "./datasets/yfinance_cache/21f0395f7b2546e1" \\
  --download-retries 5 \\
  --download-base-sleep 2.0 \\
  --download-jitter 0.8</code></pre>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Debug</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">Enable debug traces for chunk lifecycle and stitching:</p>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>python3 -m risk_pipeline.cli.run_daily --mode fast --enable-download-patch --chunk-months 3 --debug</code></pre>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Backtest artifacts</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">Each run writes to results/daily/&lt;run_id&gt;/ and produces:</p>
    <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-600">
      <li><code>summary.md / summary.json</code>: run snapshot</li>
      <li><code>params.json</code>: patch and runtime parameters</li>
      <li><code>download_report.json</code>: chunk-level status (cache_hit, retries, rows, error)</li>
      <li><code>backtest.json</code>: coverage metrics</li>
      <li><code>backtest_detail.csv</code>: per-day rows (date, VaR, realized loss, breach)</li>
    </ul>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Kupiec POF interpretation</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">
      <code>kupiec_p_value</code> tests whether observed breach frequency matches expected VaR coverage.
      A low p-value suggests calibration drift.
    </p>
  </section>
`;

const RUN_GUIDE_HTML_PRICING = `
  <h2 class="text-lg font-semibold tracking-tight text-gray-900">How to Run (CLI) &mdash; Derivatives Pricing + No-Arbitrage (CPU/GPU)</h2>
  <p class="mt-3 text-sm leading-6 text-gray-600">
    This build reuses the existing yfinance download patch, estimates historical volatility, and prices a European option with Black&ndash;Scholes, Binomial CRR, and Monte Carlo (CPU/GPU).
  </p>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Install</h3>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>python3 -m pip install -r requirements.txt</code></pre>
    <p class="mt-2 text-sm leading-6 text-gray-600">GPU note (Tesla T4 / CUDA): install CuPy for GPU Monte Carlo.</p>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>python3 -m pip install -U cupy-cuda12x
# or
python3 -m pip install -U cupy-cuda11x

python -c "import cupy as cp; print(cp.__version__); print(cp.cuda.runtime.getDeviceCount())"</code></pre>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Run fast</h3>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>PYTHONPATH=. python3 -m risk_pipeline.cli.run_pricing \\
  --run-id pricing_spy_cpu_hist_fast \\
  --ticker SPY \\
  --start 2025-01-01 \\
  --end 2026-01-01 \\
  --option-type call \\
  --strike 500 \\
  --maturity-days 30 \\
  --risk-free-rate 0.03 \\
  --dividend-yield 0.0 \\
  --sigma-mode hist \\
  --hist-vol-window 60 \\
  --annualization 252 \\
  --paths 20000 \\
  --seed 9 \\
  --backend cpu \\
  --binomial-steps 200 \\
  --repeat 3 \\
  --enable-download-patch true \\
  --chunk-months 3 \\
  --cache-dir "./datasets/yfinance_cache"</code></pre>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Run full</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">Release-like CPU baseline:</p>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>PYTHONPATH=. python3 -m risk_pipeline.cli.run_pricing \\
  --run-id pricing_spy_cpu_hist_2025-12 \\
  --ticker SPY \\
  --start 2025-01-01 \\
  --end 2026-01-01 \\
  --option-type call \\
  --strike 500 \\
  --maturity-days 30 \\
  --risk-free-rate 0.03 \\
  --dividend-yield 0.0 \\
  --sigma-mode hist \\
  --hist-vol-window 60 \\
  --annualization 252 \\
  --paths 100000 \\
  --seed 9 \\
  --backend cpu \\
  --binomial-steps 1000 \\
  --repeat 3 \\
  --enable-download-patch true \\
  --chunk-months 3 \\
  --cache-dir "./datasets/yfinance_cache"</code></pre>
    <p class="mt-2 text-sm leading-6 text-gray-600">Release-like GPU baseline:</p>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>PYTHONPATH=. python3 -m risk_pipeline.cli.run_pricing \\
  --run-id pricing_spy_gpu_hist_2025-12 \\
  --ticker SPY \\
  --start 2025-01-01 \\
  --end 2026-01-01 \\
  --option-type call \\
  --strike 500 \\
  --maturity-days 30 \\
  --risk-free-rate 0.03 \\
  --dividend-yield 0.0 \\
  --sigma-mode hist \\
  --hist-vol-window 60 \\
  --annualization 252 \\
  --paths 100000 \\
  --seed 9 \\
  --backend gpu \\
  --binomial-steps 1000 \\
  --repeat 3 \\
  --enable-download-patch true \\
  --chunk-months 3 \\
  --cache-dir "./datasets/yfinance_cache"</code></pre>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Override parameters</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">Change option contract:</p>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>PYTHONPATH=. python3 -m risk_pipeline.cli.run_pricing \\
  --run-id pricing_spy_put_custom \\
  --ticker SPY \\
  --start 2025-01-01 --end 2026-01-01 \\
  --option-type put --strike 650 --maturity-days 90 \\
  --risk-free-rate 0.03 --dividend-yield 0.0 \\
  --sigma-mode hist --hist-vol-window 60 --annualization 252 \\
  --paths 100000 --seed 9 --backend cpu \\
  --binomial-steps 1000 --repeat 3 \\
  --enable-download-patch true --chunk-months 3 --cache-dir "./datasets/yfinance_cache"</code></pre>
    <p class="mt-2 text-sm leading-6 text-gray-600">Use fixed sigma:</p>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>PYTHONPATH=. python3 -m risk_pipeline.cli.run_pricing \\
  --run-id pricing_spy_fixed_sigma \\
  --ticker SPY \\
  --start 2025-01-01 --end 2026-01-01 \\
  --option-type call --strike 500 --maturity-days 30 \\
  --risk-free-rate 0.03 --dividend-yield 0.0 \\
  --sigma-mode fixed --sigma 0.20 \\
  --paths 100000 --seed 9 --backend cpu \\
  --binomial-steps 1000 --repeat 3 \\
  --enable-download-patch true --chunk-months 3 --cache-dir "./datasets/yfinance_cache"</code></pre>
    <p class="mt-2 text-sm leading-6 text-gray-600">Scale GPU paths:</p>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>PYTHONPATH=. python3 -m risk_pipeline.cli.run_pricing \\
  --run-id pricing_spy_gpu_bigpaths \\
  --ticker SPY \\
  --start 2025-01-01 --end 2026-01-01 \\
  --option-type call --strike 500 --maturity-days 30 \\
  --risk-free-rate 0.03 --dividend-yield 0.0 \\
  --sigma-mode hist --hist-vol-window 60 --annualization 252 \\
  --paths 500000 --seed 9 --backend gpu \\
  --binomial-steps 1000 --repeat 5 \\
  --enable-download-patch true --chunk-months 3 --cache-dir "./datasets/yfinance_cache"</code></pre>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Debug</h3>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>PYTHONPATH=. python3 -m risk_pipeline.cli.run_pricing --run-id debug_pricing --debug</code></pre>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Backtest artifacts</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">Each run writes under <code>results/pricing/&lt;run_id&gt;/</code> and produces:</p>
    <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-600">
      <li><code>summary.md / logs.txt</code>: summary and logs</li>
      <li><code>params.json</code>: full run parameters</li>
      <li><code>download_report.json</code>: chunk outcomes</li>
      <li><code>prices_aligned.csv</code> and <code>returns.csv</code></li>
      <li><code>hist_vol.json</code>, <code>price.json</code>, <code>greeks.json</code>, <code>bench.json</code></li>
    </ul>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Kupiec POF interpretation</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">
      Not applicable for pricing-only runs. For this item, focus on no-arbitrage checks and Monte Carlo CI containment of BS price.
    </p>
  </section>
`;

const RUN_GUIDE_HTML_RISK_STAGE1 = `
  <h2 class="text-lg font-semibold tracking-tight text-gray-900">How to Use These Artifacts</h2>
  <p class="mt-3 text-sm leading-6 text-gray-600">
    This item is a Stage 1 research-design release. It defines the comparison framework, model cards, portfolio setup, and evaluation rules for later implementation work.
  </p>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Contents</h3>
    <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-600">
      <li><code>stage1_report.md</code>: project objective, scope, and comparison specification</li>
      <li><code>model_cards.md</code>: assumptions, strengths, weaknesses, and expected behavior for each Phase 1 model</li>
      <li><code>evaluation_design.md</code>: horizon, alpha, breach rules, and evaluation metrics</li>
      <li><code>portfolio_definition.md</code>: baseline and comparison portfolios</li>
      <li><code>params.json</code> and <code>summary.md</code>: traceability for the selected design choices</li>
    </ul>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Next Implementation Target</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">
      Implement Historical Simulation, Parametric, and EWMA + Monte Carlo under one shared output schema, then run the baseline portfolio first before extending to the second portfolio.
    </p>
  </section>
`;

const RUN_GUIDE_HTML_RISK_STAGE1_INFRA = `
  <h2 class="text-lg font-semibold tracking-tight text-gray-900">How to Use These Artifacts</h2>
  <p class="mt-3 text-sm leading-6 text-gray-600">
    This Infrastructure view records the dtcnumpy Stage 1 scope definition, data-type semantics design, and version boundary decisions.
  </p>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">What Is Included</h3>
    <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-600">
      <li><code>summary.md</code>: short Stage 1 scope and semantics overview</li>
      <li><code>params.json</code>: traceability for the selected model set, portfolio setup, and evaluation rules already published in this update</li>
    </ul>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">What This View Covers</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">
      Use this view to review what dtcnumpy is, what is intentionally excluded from v0.1, which formats are supported, and how semantic behavior will be defined before implementation expands.
    </p>
  </section>
`;

const RUN_GUIDE_HTML_RISK_STAGE2 = `
  <h2 class="text-lg font-semibold tracking-tight text-gray-900">How to Use These Artifacts</h2>
  <p class="mt-3 text-sm leading-6 text-gray-600">
    This item is a Stage 2 implementation-and-results release. It records the first baseline-portfolio comparison run and provides the summary files used for later Stage 3 interpretation.
  </p>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">What Is Included</h3>
    <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-600">
      <li><code>stage2_meeting_record.md</code>: full meeting-style record for the Stage 2 completion pass</li>
      <li><code>comparison_summary.csv</code>: machine-readable summary metrics across the three models</li>
      <li><code>comparison_analysis.md</code>: short preliminary interpretation note for internal review</li>
      <li><code>params.json</code> and <code>summary.md</code>: compact traceability and setup reference</li>
    </ul>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">How to Use It</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">
      Start with <code>summary.md</code> for the quick overview, use <code>stage2_meeting_record.md</code> for the full narrative, and use <code>comparison_summary.csv</code> when you need the structured metrics for charts, tables, or later comparison scripts.
    </p>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">How to Run</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">
      The Stage 2 workflow is implemented in <code>risk_pipeline/cli/run_comparison.py</code>. It reuses the existing <code>returns.csv</code>, builds the equal-weight <code>SPY/QQQ/TLT/GLD</code> portfolio, runs Historical Simulation, Parametric Normal, and EWMA + Monte Carlo on the same aligned dates, and writes outputs under <code>results/comparison/&lt;run_id&gt;/</code>.
    </p>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>./.venv/bin/python -m risk_pipeline.cli.run_comparison</code></pre>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Verification</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">
      Workflow verification for this release used the following command:
    </p>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>./.venv/bin/python -m unittest tests.test_comparison_workflow</code></pre>
  </section>
`;

const RUN_GUIDE_HTML_RISK_STAGE2_INFRA = `
  <h2 class="text-lg font-semibold tracking-tight text-gray-900">How to Use These Artifacts</h2>
  <p class="mt-3 text-sm leading-6 text-gray-600">
    This Infrastructure view records the dtcnumpy Stage 2 base container, dtype conversion API, and current validation status.
  </p>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">What Is Included</h3>
    <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-600">
      <li><code>summary.md</code>: short Stage 2 implementation overview</li>
      <li><code>Display/</code>: current draft source files for the dtcnumpy package components published in this release</li>
    </ul>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Validation Status</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">
      Structure is implemented, but full execution verification is still pending because <code>numpy</code> and <code>pytest</code> are not installed in the current environment.
    </p>
  </section>
`;

const RUN_GUIDE_HTML_RISK_STAGE3 = `
  <h2 class="text-lg font-semibold tracking-tight text-gray-900">How to Use These Artifacts</h2>
  <p class="mt-3 text-sm leading-6 text-gray-600">
    This item is the Stage 3 final-review release. It converts the Stage 2 outputs into the final comparison record, ranking tables, tradeoff discussion, and benchmark recommendation.
  </p>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">What Is Included</h3>
    <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-600">
      <li><code>stage3_meeting_record.md</code>: full final-review document with tables, ranking logic, recommendation, and text graphs</li>
      <li><code>stage3_comparison_summary.csv</code>: final machine-readable comparison table across the three models</li>
      <li><code>stage3_ranking_table.csv</code>: compact ranking view by evaluation category</li>
      <li><code>summary.md</code>: short overview for a quick read</li>
    </ul>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">How to Use It</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">
      Start with <code>summary.md</code> for the top-line result, then read <code>stage3_meeting_record.md</code> for the full interpretation. Use the CSV files when you need structured data for charts, slides, or downstream analysis.
    </p>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">What This Stage Decides</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">
      Under the current tested setup, EWMA + Monte Carlo is recommended as the primary benchmark baseline, Parametric Normal as the smooth reference model, and Historical Simulation as the empirical baseline reference.
    </p>
  </section>
`;

const RUN_GUIDE_HTML_RISK_STAGE3_INFRA = `
  <h2 class="text-lg font-semibold tracking-tight text-gray-900">How to Use These Artifacts</h2>
  <p class="mt-3 text-sm leading-6 text-gray-600">
    This Infrastructure view records the Stage 3 datatype comparison architecture update: higher-level numerical ops, reporting scope, special design rules, and validation status.
  </p>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">What Is Included</h3>
    <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-600">
      <li><code>summary.md</code>: short Stage 3 infrastructure overview</li>
      <li><code>Display/</code>: placeholder directory for the upcoming Stage 3 source files</li>
    </ul>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Main Stage 3 Changes</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">
      The key architectural update is <code>DTCArray.from_versions(...)</code>, which is intended to build Stage 3 outputs directly from precomputed per-dtype results so the Stage 2 conversion path is not applied a second time.
    </p>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Validation Status</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">
      The record notes source-level validation and a pending runtime test pass in an environment with <code>numpy</code> and <code>pytest</code> installed.
    </p>
`;

const RUN_GUIDE_HTML_RISK_STAGE4_INFRA = `
  <h2 class="text-lg font-semibold tracking-tight text-gray-900">How to Use These Artifacts</h2>
  <p class="mt-3 text-sm leading-6 text-gray-600">
    This Infrastructure view records the Stage 4 dtcnumpy preparation scope for advanced linear algebra and controlled random-module support before later risk-kernel integration.
  </p>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">What Is Included</h3>
    <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-600">
      <li><code>summary.md</code>: short Stage 4 infrastructure overview</li>
      <li><code>Infrastructure/Display/</code>: placeholder directory for the upcoming Stage 4 display source files</li>
    </ul>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Stage 4 Focus</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">
      Stage 4 is scoped around <code>dtcnumpy.linalg.cholesky</code>, <code>dtcnumpy.linalg.eigh</code>, and <code>dtcnumpy.random.standard_normal</code> as the minimum preparation layer needed for later covariance, scenario-generation, and portfolio-loss risk workflows.
    </p>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Scope Boundary</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">
      This stage still simulates dtype semantics only. It does not add hardware execution modeling, Tensor Core scheduling, or performance benchmarking.
    </p>
  </section>
`;

const RUN_GUIDE_HTML_RISK_STAGE5_INFRA = `
  <h2 class="text-lg font-semibold tracking-tight text-gray-900">How to Use These Artifacts</h2>
  <p class="mt-3 text-sm leading-6 text-gray-600">
    This Infrastructure view records the Stage 5 dtcnumpy usage layer: user examples, demo workflows, and lightweight usage notes intended for meetings, onboarding, and internal explanation.
  </p>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">What Is Included</h3>
    <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-gray-600">
      <li><code>summary.md</code>: short Stage 5 infrastructure overview</li>
      <li><code>Infrastructure/Display/README_examples.md</code>: example guide with run commands, scope notes, and file-by-file explanation</li>
      <li><code>Infrastructure/Display/demo_basic.py</code>, <code>demo_ops.py</code>, <code>demo_quant.py</code>: published meeting-ready example scripts</li>
    </ul>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Stage 5 Focus</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">
      Stage 5 is scoped around meeting-ready examples such as <code>demo_basic.py</code>, <code>demo_ops.py</code>, <code>demo_quant.py</code>, and a lightweight example README so new users can understand how to use <code>dtcnumpy</code> without reading internal implementation files first.
    </p>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">How To Run</h3>
    <pre class="mt-2 overflow-auto rounded-md border border-gray-200 bg-white p-3 text-xs leading-6 text-gray-800 shadow-sm"><code>python3 examples/demo_basic.py
python3 examples/demo_ops.py
python3 examples/demo_quant.py</code></pre>
    <p class="mt-2 text-sm leading-6 text-gray-600">
      The examples are intentionally small and are meant for local demos, onboarding, and internal presentation rather than full risk-project integration.
    </p>
  </section>

  <section class="mt-5">
    <h3 class="text-sm font-semibold text-gray-900">Scope Boundary</h3>
    <p class="mt-2 text-sm leading-6 text-gray-600">
      This stage does not add full project integration, new benchmark infrastructure, packaging redesign, or performance measurement. It is intentionally focused on usability and presentation.
    </p>
  </section>
`;

const RUN_GUIDE_HTML_EMPTY_ALGORITHM = `
  <h2 class="text-lg font-semibold tracking-tight text-gray-900">How to Use These Artifacts</h2>
  <p class="mt-3 text-sm leading-6 text-gray-600">
    No Algorithm-specific artifact package has been published yet for this update.
  </p>
`;

const RUN_GUIDE_HTML_BY_KEY = {
  risk_stage1_algorithm: RUN_GUIDE_HTML_RISK_STAGE1,
  risk_stage1_infrastructure: RUN_GUIDE_HTML_RISK_STAGE1_INFRA,
  risk_stage2_algorithm: RUN_GUIDE_HTML_RISK_STAGE2,
  risk_stage2_infrastructure: RUN_GUIDE_HTML_RISK_STAGE2_INFRA,
  risk_stage3_algorithm: RUN_GUIDE_HTML_RISK_STAGE3,
  risk_stage3_infrastructure: RUN_GUIDE_HTML_RISK_STAGE3_INFRA,
  risk_stage4_infrastructure: RUN_GUIDE_HTML_RISK_STAGE4_INFRA,
  risk_stage5_infrastructure: RUN_GUIDE_HTML_RISK_STAGE5_INFRA,
  empty_algorithm: RUN_GUIDE_HTML_EMPTY_ALGORITHM,
  pricing: RUN_GUIDE_HTML_PRICING,
  patch: RUN_GUIDE_HTML_PATCH,
  gpu: RUN_GUIDE_HTML_GPU
};

function getGithubConfig() {
  const fallback = {
    owner: "yushliu",
    repo: "quant-eng-acceleration",
    branch: "main",
    manifestPath: "site/manifest.json"
  };
  const config = window.SITE_CONFIG && window.SITE_CONFIG.github ? window.SITE_CONFIG.github : {};
  return { ...fallback, ...config };
}

function buildRawUrl(path) {
  const { owner, repo, branch } = getGithubConfig();
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
}

function isLocalPreview() {
  const host = window.location.hostname;
  return window.location.protocol === "file:" || host === "localhost" || host === "127.0.0.1";
}

function buildLocalUrl(path) {
  return `../${String(path || "").replace(/^\/+/, "")}`;
}

function buildContentUrl(path) {
  return isLocalPreview() ? buildLocalUrl(path) : buildRawUrl(path);
}

function getFilename(path) {
  const chunks = String(path || "").split("/");
  return chunks[chunks.length - 1] || "download.txt";
}

function getItemViews(item) {
  return Array.isArray(item && item.views) ? item.views : [];
}

function getDefaultItemViewId(item) {
  const views = getItemViews(item);
  if (!views.length) {
    return "";
  }

  const algorithmView = views.find((view) => view && view.id === "algorithm");
  return algorithmView ? algorithmView.id : (views[0].id || "");
}

function syncSelectedItemView(item, preferredViewId = "") {
  const views = getItemViews(item);
  if (!views.length) {
    selectedItemViewId = "";
    return;
  }

  const preferredView = views.find((view) => view && view.id === preferredViewId);
  const currentView = views.find((view) => view && view.id === selectedItemViewId);
  selectedItemViewId = (preferredView || currentView || views.find(Boolean) || {}).id || "";
}

function getSelectedItemView(item) {
  return getItemViews(item).find((view) => view && view.id === selectedItemViewId) || null;
}

function getSelectedItemTitle(item) {
  const selectedView = getSelectedItemView(item);
  return selectedView && selectedView.title ? selectedView.title : (item.title || "Code Viewer");
}

function getSelectedItemDescription(item) {
  const selectedView = getSelectedItemView(item);
  return selectedView && selectedView.description ? selectedView.description : (item.short || "");
}

function getRunGuideHtml(item) {
  const selectedView = getSelectedItemView(item);
  const guideKey = selectedView && selectedView.guideKey ? selectedView.guideKey : "";
  if (guideKey && RUN_GUIDE_HTML_BY_KEY[guideKey]) {
    return RUN_GUIDE_HTML_BY_KEY[guideKey];
  }

  const fallbackKeyByItemId = {
    "pricing-no-arbitrage-cpu-vs-gpu-2025-12": "pricing",
    "yfinance-rate-limit-patch-2025-11": "patch",
    "ewma-mcvar-backtest-2025-11": "gpu",
    "ewma-mcvar-backtest-2025-10": "gpu"
  };
  const fallbackKey = fallbackKeyByItemId[item.id];
  return RUN_GUIDE_HTML_BY_KEY[fallbackKey] || RUN_GUIDE_HTML_GPU;
}

function getVisibleFiles(item) {
  const files = Array.isArray(item && item.files) ? item.files : [];
  const selectedView = getSelectedItemView(item);
  if (!selectedView || !Array.isArray(selectedView.filePrefixes) || !selectedView.filePrefixes.length) {
    return files;
  }

  return files.filter((file) => selectedView.filePrefixes.some((prefix) => String(file.path || "").startsWith(prefix)));
}

function updateItemViewUrl(item) {
  if (!item || !item.id) {
    return;
  }

  const url = new URL(window.location.href);
  url.hash = item.id;

  if (selectedItemViewId) {
    url.searchParams.set("view", selectedItemViewId);
  } else {
    url.searchParams.delete("view");
  }

  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

function renderItemViewSwitch(item) {
  const switchEl = document.getElementById("item-view-switch");
  if (!switchEl) {
    return;
  }

  const views = getItemViews(item);
  if (views.length < 2) {
    switchEl.innerHTML = "";
    return;
  }

  switchEl.innerHTML = `
    <div class="inline-flex rounded-md border border-gray-200 bg-white p-1 shadow-sm">
      ${views.map((view) => {
        const isActive = view.id === selectedItemViewId;
        const classes = isActive
          ? "bg-blue-500 text-white"
          : "text-gray-600 hover:bg-gray-100";
        return `<button type="button" data-item-view="${view.id}" class="rounded-md px-3 py-1.5 text-sm font-medium transition ${classes}">${view.label}</button>`;
      }).join("")}
    </div>
  `;

  switchEl.querySelectorAll("[data-item-view]").forEach((button) => {
    button.addEventListener("click", async () => {
      const nextViewId = button.getAttribute("data-item-view");
      if (!nextViewId || nextViewId === selectedItemViewId) {
        return;
      }

      selectedItemViewId = nextViewId;
      renderItemViewSwitch(item);
      renderFileSelector(item);
      updateViewerHeader(item);
      updateItemViewUrl(item);

      if (!selectedFilePath) {
        selectedFileText = "";
        setCodeViewerText("No file found for this view.");
        await updateSourceExplorer(item);
        return;
      }

      await loadFileContent(selectedFilePath);
      await updateSourceExplorer(item);
    });
  });
}

function getSourceExplorerModule() {
  if (!sourceExplorerModulePromise) {
    sourceExplorerModulePromise = import("./source_explorer.js");
  }
  return sourceExplorerModulePromise;
}

function removeSourceExplorerSection() {
  const existing = document.getElementById("source-explorer");
  if (existing) {
    existing.remove();
  }
}

function removeRunGuideSection() {
  const existing = document.getElementById("run-guide");
  if (existing) {
    existing.remove();
  }
}

function ensureRunGuideSection(runGuideHtml = RUN_GUIDE_HTML_GPU) {
  const existing = document.getElementById("run-guide");
  if (existing) {
    existing.innerHTML = runGuideHtml;
    return existing;
  }

  const previewSection = document.getElementById("single-file-preview");
  if (!previewSection || !previewSection.parentElement) {
    return null;
  }

  const section = document.createElement("section");
  section.id = "run-guide";
  section.className = "mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm";
  section.innerHTML = runGuideHtml;
  previewSection.insertAdjacentElement("afterend", section);
  return section;
}

function ensureSourceExplorerSection() {
  const existing = document.getElementById("source-explorer");
  if (existing) {
    return existing;
  }

  const runGuideSection = document.getElementById("run-guide");
  const anchorSection = runGuideSection || document.getElementById("single-file-preview");
  if (!anchorSection || !anchorSection.parentElement) {
    return null;
  }

  const section = document.createElement("section");
  section.id = "source-explorer";
  section.className = "source-explorer-host mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm";
  anchorSection.insertAdjacentElement("afterend", section);
  return section;
}

async function updateSourceExplorer(item) {
  sourceExplorerRequestId += 1;
  const requestId = sourceExplorerRequestId;
  removeSourceExplorerSection();
  removeRunGuideSection();

  if (!item || !item.id) {
    return;
  }

  const config = SOURCE_EXPLORER_ITEM_CONFIG[item.id];
  if (!config) {
    return;
  }

  try {
    const sourceExplorerModule = await getSourceExplorerModule();
    if (requestId !== sourceExplorerRequestId) {
      return;
    }
    if (!sourceExplorerModule.SOURCE_EXPLORER_ENABLED_IDS.has(item.id)) {
      return;
    }

    const runGuideHtml = getRunGuideHtml(item);
    ensureRunGuideSection(runGuideHtml);

    const containerEl = ensureSourceExplorerSection();
    if (!containerEl) {
      return;
    }

    const selectedView = getSelectedItemView(item);
    const allowedPrefixes = selectedView && Array.isArray(selectedView.sourcePrefixes) ? selectedView.sourcePrefixes : null;

    await sourceExplorerModule.mountSourceExplorer({
      containerEl,
      indexUrl: buildContentUrl(config.indexPath),
      baseRoot: buildContentUrl(config.baseRootPath),
      allowedPrefixes,
      hljs: window.hljs
    });
  } catch (_error) {
    // Keep Source Explorer isolated; do not break the base download page.
    removeSourceExplorerSection();
  }
}

function setCodeViewerText(text, options = {}) {
  const viewer = document.getElementById("code-viewer");
  if (!viewer) {
    return;
  }
  const shouldHighlight = options.highlight !== false;
  viewer.textContent = text;
  if (!shouldHighlight) {
    viewer.className = `language-${selectedFileLang}`;
    viewer.removeAttribute("data-highlighted");
    return;
  }
  applySyntaxHighlighting();
}

function mapHighlightLang(lang) {
  const normalized = String(lang || "").toLowerCase();
  if (normalized === "py" || normalized === "python") {
    return "python";
  }
  if (normalized === "json") {
    return "json";
  }
  if (normalized === "js" || normalized === "javascript") {
    return "javascript";
  }
  if (normalized === "ts" || normalized === "typescript") {
    return "typescript";
  }
  if (normalized === "sh" || normalized === "bash" || normalized === "shell") {
    return "bash";
  }
  return "plaintext";
}

function applySyntaxHighlighting() {
  const viewer = document.getElementById("code-viewer");
  if (!viewer) {
    return;
  }

  // Keep a deterministic sequence:
  // 1) set language class
  // 2) reset previous highlight state
  // 3) run highlight as the final step
  viewer.className = `language-${selectedFileLang}`;
  viewer.removeAttribute("data-highlighted");

  if (window.hljs && typeof window.hljs.highlightElement === "function") {
    window.hljs.highlightElement(viewer);
  }
}

function renderCards() {
  const grid = document.getElementById("download-grid");
  if (!grid) {
    return;
  }

  if (!manifestItems.length) {
    grid.innerHTML = "<p class=\"text-sm text-gray-600\">No downloadable items found.</p>";
    return;
  }

  grid.innerHTML = manifestItems
    .map((item) => {
      const isActive = item.id === selectedItemId;
      const activeClasses = isActive
        ? "border-blue-500 bg-blue-50"
        : "border-gray-200 bg-white hover:border-blue-300";

      return `
        <button
          type="button"
          data-item-id="${item.id}"
          class="min-w-[280px] max-w-[320px] shrink-0 snap-start rounded-md border p-4 text-left shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300 ${activeClasses}"
        >
          <div class="flex items-start justify-between gap-3">
            <h3 class="text-sm font-semibold text-gray-900">${item.title}</h3>
            <span class="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-blue-600">${item.tag || "Item"}</span>
          </div>
          ${item.short ? `<p class="mt-2 text-xs leading-5 text-gray-600">${item.short}</p>` : ""}
        </button>
      `;
    })
    .join("");

  grid.querySelectorAll("[data-item-id]").forEach((button) => {
    button.addEventListener("click", async () => {
      const itemId = button.getAttribute("data-item-id");
      if (!itemId || itemId === selectedItemId) {
        return;
      }

      await selectItem(itemId);
    });
  });
}

function renderFileSelector(item) {
  const selector = document.getElementById("file-selector");
  if (!selector) {
    return;
  }

  const files = getVisibleFiles(item);
  selector.innerHTML = files
    .map((file) => `<option value="${file.path}">${file.label || file.path}</option>`)
    .join("");

  const fallbackFile = files[0] || null;
  if (!files.find((file) => file.path === selectedFilePath)) {
    selectedFilePath = fallbackFile ? fallbackFile.path : "";
    selectedFileLang = mapHighlightLang(fallbackFile ? fallbackFile.lang : "");
  }

  selector.value = selectedFilePath;
  selector.disabled = files.length === 0;

  selector.onchange = async (event) => {
    const nextPath = event.target.value;
    if (!nextPath || nextPath === selectedFilePath) {
      return;
    }

    selectedFilePath = nextPath;
    const selectedFile = files.find((file) => file.path === nextPath);
    selectedFileLang = mapHighlightLang(selectedFile ? selectedFile.lang : "");
    updateViewerHeader(item);
    await loadFileContent(nextPath);
  };
}

function updateViewerHeader(item) {
  const titleEl = document.getElementById("viewer-title");
  const subtitleEl = document.getElementById("viewer-subtitle");
  const selectedView = getSelectedItemView(item);

  if (titleEl) {
    titleEl.textContent = getSelectedItemTitle(item);
  }

  if (subtitleEl) {
    const viewLabel = selectedView ? `${selectedView.label} · ` : "";
    const description = getSelectedItemDescription(item);
    const pathText = selectedFilePath || "No file selected";
    subtitleEl.textContent = description
      ? `${description} · ${viewLabel}${pathText}`
      : `${item.id} · ${viewLabel}${pathText}`;
  }
}

async function fetchTextWithCache(path) {
  const contentUrl = buildContentUrl(path);

  if (fileCache.has(contentUrl)) {
    return fileCache.get(contentUrl);
  }

  const response = await fetch(contentUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path} (HTTP ${response.status})`);
  }

  const text = await response.text();
  fileCache.set(contentUrl, text);
  return text;
}

async function loadFileContent(path) {
  try {
    setCodeViewerText("Loading...", { highlight: false });
    const text = await fetchTextWithCache(path);
    selectedFileText = text;
    setCodeViewerText(text);
  } catch (error) {
    selectedFileText = "";
    setCodeViewerText(error.message || "Failed to load file.");
  }
}

async function selectItem(itemId) {
  const item = manifestItems.find((entry) => entry.id === itemId);
  if (!item) {
    return;
  }

  selectedItemId = itemId;
  const requestedViewId = new URLSearchParams(window.location.search).get("view") || "";
  syncSelectedItemView(item, requestedViewId || getDefaultItemViewId(item));
  const visibleFiles = getVisibleFiles(item);
  const firstFile = visibleFiles[0] || null;
  selectedFilePath = firstFile ? firstFile.path : "";
  selectedFileLang = mapHighlightLang(firstFile ? firstFile.lang : "");

  renderCards();
  renderItemViewSwitch(item);
  renderFileSelector(item);
  updateViewerHeader(item);
  updateItemViewUrl(item);

  if (!selectedFilePath) {
    setCodeViewerText("No file found for this view.");
    await updateSourceExplorer(item);
    return;
  }

  await loadFileContent(selectedFilePath);
  await updateSourceExplorer(item);
}

function downloadTextFile(filename, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function setupActions() {
  const copyButton = document.getElementById("copy-button");
  const downloadButton = document.getElementById("download-button");

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      if (!selectedFileText) {
        return;
      }

      try {
        await navigator.clipboard.writeText(selectedFileText);
        copyButton.textContent = "Copied";
        setTimeout(() => {
          copyButton.textContent = "Copy";
        }, 900);
      } catch (_error) {
        copyButton.textContent = "Copy failed";
        setTimeout(() => {
          copyButton.textContent = "Copy";
        }, 900);
      }
    });
  }

  if (downloadButton) {
    downloadButton.addEventListener("click", () => {
      if (!selectedFilePath || !selectedFileText) {
        return;
      }

      downloadTextFile(getFilename(selectedFilePath), selectedFileText);
    });
  }
}

async function loadManifest() {
  const { manifestPath } = getGithubConfig();

  // Local preview should reflect local edits immediately without push.
  if (isLocalPreview()) {
    const localResponse = await fetch(buildLocalUrl(manifestPath));
    if (localResponse.ok) {
      const localJson = await localResponse.json();
      return Array.isArray(localJson.downloadItems) ? localJson.downloadItems : [];
    }
  }

  const response = await fetch(buildRawUrl(manifestPath));

  if (!response.ok) {
    throw new Error(`Failed to fetch manifest (HTTP ${response.status})`);
  }

  const json = await response.json();
  return Array.isArray(json.downloadItems) ? json.downloadItems : [];
}

async function initDownloadPage() {
  if (!document.getElementById("download-grid")) {
    return;
  }

  setupActions();

  try {
    manifestItems = await loadManifest();

    if (!manifestItems.length) {
      renderCards();
      setCodeViewerText("No items found in manifest.");
      return;
    }

    const hashId = window.location.hash ? window.location.hash.slice(1) : "";
    const defaultItem = manifestItems.find((item) => item.id === hashId) || manifestItems[0];
    await selectItem(defaultItem.id);
  } catch (error) {
    const grid = document.getElementById("download-grid");
    if (grid) {
      grid.innerHTML = `<p class="text-sm text-red-700">${error.message || "Failed to load manifest."}</p>`;
    }
    setCodeViewerText(error.message || "Failed to load manifest.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initDownloadPage();
});
