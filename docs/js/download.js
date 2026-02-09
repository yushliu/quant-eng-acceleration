const fileCache = new Map();

let manifestItems = [];
let selectedItemId = "";
let selectedFilePath = "";
let selectedFileText = "";
let selectedFileLang = "plaintext";

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

function getFilename(path) {
  const chunks = String(path || "").split("/");
  return chunks[chunks.length - 1] || "download.txt";
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
        ? "border-slate-700 bg-slate-50"
        : "border-gray-200 bg-white hover:border-slate-300";

      return `
        <button
          type="button"
          data-item-id="${item.id}"
          class="rounded-md border p-4 text-left shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 ${activeClasses}"
        >
          <div class="flex items-start justify-between gap-3">
            <h3 class="text-sm font-semibold text-gray-900">${item.title}</h3>
            <span class="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-gray-600">${item.tag || "Item"}</span>
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
  const rawUrl = buildRawUrl(path);

  if (fileCache.has(rawUrl)) {
    return fileCache.get(rawUrl);
  }

  const response = await fetch(rawUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path} (HTTP ${response.status})`);
  }

  const text = await response.text();
  fileCache.set(rawUrl, text);
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
    return;
  }

  await loadFileContent(selectedFilePath);
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
