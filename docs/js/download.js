const fileCache = new Map();

let manifestItems = [];
let selectedItemId = "";
let selectedFilePath = "";
let selectedFileText = "";
let selectedFileLang = "plaintext";
let sourceExplorerRequestId = 0;
let sourceExplorerModulePromise = null;

const SOURCE_EXPLORER_ITEM_CONFIG = {
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

const RUN_GUIDE_HTML_BY_ITEM_ID = {
  "yfinance-rate-limit-patch-2025-11": RUN_GUIDE_HTML_PATCH,
  "ewma-mcvar-backtest-2025-11": RUN_GUIDE_HTML_GPU,
  "ewma-mcvar-backtest-2025-10": RUN_GUIDE_HTML_GPU
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

    const runGuideHtml = RUN_GUIDE_HTML_BY_ITEM_ID[item.id] || RUN_GUIDE_HTML_GPU;
    ensureRunGuideSection(runGuideHtml);

    const containerEl = ensureSourceExplorerSection();
    if (!containerEl) {
      return;
    }

    await sourceExplorerModule.mountSourceExplorer({
      containerEl,
      indexUrl: buildContentUrl(config.indexPath),
      baseRoot: buildContentUrl(config.baseRootPath),
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
          <p class="mt-2 text-xs leading-5 text-gray-600">${item.short || ""}</p>
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

  const files = Array.isArray(item.files) ? item.files : [];
  selector.innerHTML = files
    .map((file) => `<option value="${file.path}">${file.label || file.path}</option>`)
    .join("");

  selector.value = selectedFilePath;

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

  if (titleEl) {
    titleEl.textContent = item.title || "Code Viewer";
  }

  if (subtitleEl) {
    subtitleEl.textContent = `${item.id} · ${selectedFilePath}`;
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
  const firstFile = item.files && item.files[0] ? item.files[0] : null;
  selectedFilePath = firstFile ? firstFile.path : "";
  selectedFileLang = mapHighlightLang(firstFile ? firstFile.lang : "");

  renderCards();
  renderFileSelector(item);
  updateViewerHeader(item);

  if (!selectedFilePath) {
    setCodeViewerText("No file found for this item.");
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
