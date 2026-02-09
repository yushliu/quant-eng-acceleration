export const SOURCE_EXPLORER_ENABLED_IDS = new Set([
  "yfinance-rate-limit-patch-2025-11",
  "ewma-mcvar-backtest-2025-11",
  "ewma-mcvar-backtest-2025-10"
]);

const CSV_MAX_PREVIEW_LINES = 200;
const EXT_LANG_MAP = {
  py: "python",
  json: "json",
  md: "markdown",
  txt: "plaintext",
  csv: "plaintext"
};

function normalizePath(path) {
  return String(path || "")
    .split("/")
    .filter(Boolean)
    .join("/");
}

function getFileExtension(path) {
  const filename = getFilename(path);
  const index = filename.lastIndexOf(".");
  if (index <= 0 || index === filename.length - 1) {
    return "";
  }
  return filename.slice(index + 1).toLowerCase();
}

function getFilename(path) {
  const parts = String(path || "").split("/");
  return parts[parts.length - 1] || "download.txt";
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function joinContentUrl(baseRoot, relPath) {
  const root = String(baseRoot || "").replace(/\/+$/, "");
  const encodedRelPath = normalizePath(relPath)
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `${root}/${encodedRelPath}`;
}

function inferPreviewLanguage(relPath) {
  const ext = getFileExtension(relPath);
  return EXT_LANG_MAP[ext] || "";
}

function isLikelyBinaryText(text) {
  return String(text || "").indexOf("\u0000") !== -1;
}

function truncateCsvPreview(text) {
  const lines = String(text || "").split("\n");
  if (lines.length <= CSV_MAX_PREVIEW_LINES) {
    return { text, truncated: false };
  }
  return {
    text: `${lines.slice(0, CSV_MAX_PREVIEW_LINES).join("\n")}\n... (truncated)`,
    truncated: true
  };
}

function createTreeNode(name, relPath) {
  return {
    name,
    relPath,
    folders: new Map(),
    files: []
  };
}

function buildTree(filePaths) {
  const root = createTreeNode("", "");
  const normalizedPaths = filePaths
    .map((path) => normalizePath(path))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  normalizedPaths.forEach((path) => {
    const segments = path.split("/");
    let node = root;

    for (let index = 0; index < segments.length - 1; index += 1) {
      const segment = segments[index];
      const folderRelPath = segments.slice(0, index + 1).join("/");
      if (!node.folders.has(segment)) {
        node.folders.set(segment, createTreeNode(segment, folderRelPath));
      }
      node = node.folders.get(segment);
    }

    node.files.push({
      name: segments[segments.length - 1],
      relPath: path
    });
  });

  return root;
}

function pickDefaultFile(filePaths) {
  const normalized = filePaths
    .map((path) => normalizePath(path))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  const readme = normalized.find((path) => path.toLowerCase() === "readme.md");
  if (readme) {
    return readme;
  }

  const pythonFile = normalized.find((path) => path.toLowerCase().endsWith(".py"));
  if (pythonFile) {
    return pythonFile;
  }

  return normalized[0] || "";
}

function setCodeContent(codeEl, text, lang, hljs) {
  codeEl.textContent = text;
  codeEl.className = `language-${lang || "plaintext"}`;
  codeEl.removeAttribute("data-highlighted");

  if (hljs && typeof hljs.highlightElement === "function" && lang && lang !== "plaintext") {
    hljs.highlightElement(codeEl);
  }
}

function setBusyMessage(codeEl, message) {
  setCodeContent(codeEl, message, "plaintext", null);
}

function renderTree({ treeRoot, treeEl, expandedFolders, selectedPath, onToggleFolder, onSelectFile }) {
  treeEl.innerHTML = "";

  function appendFolder(node, depth, container) {
    const folderNames = Array.from(node.folders.keys()).sort((a, b) => a.localeCompare(b));

    folderNames.forEach((folderName) => {
      const folderNode = node.folders.get(folderName);
      const isExpanded = expandedFolders.has(folderNode.relPath);
      const folderItem = document.createElement("li");
      folderItem.className = "source-explorer__tree-item";

      const folderButton = document.createElement("button");
      folderButton.type = "button";
      folderButton.className = "source-explorer__tree-row source-explorer__tree-folder";
      folderButton.setAttribute("aria-expanded", String(isExpanded));
      folderButton.style.paddingLeft = `${depth * 16 + 10}px`;
      folderButton.innerHTML = `<span class="source-explorer__caret">${isExpanded ? "▾" : "▸"}</span><span>${escapeHtml(folderNode.name)}</span>`;
      folderButton.addEventListener("click", () => onToggleFolder(folderNode.relPath));

      folderItem.appendChild(folderButton);
      container.appendChild(folderItem);

      if (isExpanded) {
        appendFolder(folderNode, depth + 1, container);
        appendFiles(folderNode, depth + 1, container);
      }
    });
  }

  function appendFiles(node, depth, container) {
    const sortedFiles = [...node.files].sort((a, b) => a.relPath.localeCompare(b.relPath));
    sortedFiles.forEach((fileEntry) => {
      const fileItem = document.createElement("li");
      fileItem.className = "source-explorer__tree-item";

      const fileButton = document.createElement("button");
      fileButton.type = "button";
      fileButton.className = "source-explorer__tree-row source-explorer__tree-file";
      fileButton.style.paddingLeft = `${depth * 16 + 10}px`;
      fileButton.textContent = fileEntry.name;
      if (fileEntry.relPath === selectedPath) {
        fileButton.classList.add("is-active");
      }
      fileButton.addEventListener("click", () => onSelectFile(fileEntry.relPath));

      fileItem.appendChild(fileButton);
      container.appendChild(fileItem);
    });
  }

  appendFolder(treeRoot, 0, treeEl);
  appendFiles(treeRoot, 0, treeEl);
}

export async function mountSourceExplorer({ containerEl, indexUrl, baseRoot, hljs }) {
  if (!containerEl) {
    return;
  }

  const safeIndexUrl = String(indexUrl || "").trim();
  if (!safeIndexUrl) {
    containerEl.innerHTML = "";
    return;
  }

  containerEl.innerHTML = `
    <header class="source-explorer__header">
      <h2 class="source-explorer__title">Source Explorer</h2>
    </header>
    <div class="source-explorer__body">
      <aside class="source-explorer__pane source-explorer__pane--tree">
        <ul class="source-explorer__tree" data-role="tree"></ul>
      </aside>
      <section class="source-explorer__pane source-explorer__pane--preview">
        <div class="source-explorer__preview-header">
          <p class="source-explorer__path" data-role="path"></p>
          <div class="source-explorer__actions">
            <button type="button" class="source-explorer__button" data-role="copy">Copy</button>
            <button type="button" class="source-explorer__button source-explorer__button--primary" data-role="download">Download file</button>
          </div>
        </div>
        <pre class="source-explorer__code-wrap"><code class="hljs" data-role="code">Loading...</code></pre>
      </section>
    </div>
  `;

  const treeEl = containerEl.querySelector('[data-role="tree"]');
  const pathEl = containerEl.querySelector('[data-role="path"]');
  const codeEl = containerEl.querySelector('[data-role="code"]');
  const copyButton = containerEl.querySelector('[data-role="copy"]');
  const downloadButton = containerEl.querySelector('[data-role="download"]');

  if (!treeEl || !pathEl || !codeEl || !copyButton || !downloadButton) {
    containerEl.innerHTML = "";
    return;
  }

  let indexJson;
  try {
    const indexResponse = await fetch(safeIndexUrl);
    if (!indexResponse.ok) {
      throw new Error(`Failed to load source index (HTTP ${indexResponse.status})`);
    }
    indexJson = await indexResponse.json();
  } catch (error) {
    setBusyMessage(codeEl, error.message || "Failed to load source index.");
    pathEl.textContent = "";
    treeEl.innerHTML = "";
    copyButton.disabled = true;
    downloadButton.disabled = true;
    return;
  }

  const indexFiles = Array.isArray(indexJson && indexJson.files) ? indexJson.files : [];
  const filePaths = indexFiles.map((path) => normalizePath(path)).filter(Boolean);
  const rootPath = String(baseRoot || (indexJson && indexJson.root) || "").replace(/\/+$/, "");

  if (!filePaths.length || !rootPath) {
    pathEl.textContent = "";
    setBusyMessage(codeEl, "No source files available.");
    treeEl.innerHTML = "";
    copyButton.disabled = true;
    downloadButton.disabled = true;
    return;
  }

  const treeRoot = buildTree(filePaths);
  const expandedFolders = new Set([""]);
  let selectedPath = "";
  let selectedPreviewText = "";
  let selectedCanCopy = false;
  let pendingRequestId = 0;

  function refreshTree() {
    renderTree({
      treeRoot,
      treeEl,
      expandedFolders,
      selectedPath,
      onToggleFolder: (folderPath) => {
        if (expandedFolders.has(folderPath)) {
          expandedFolders.delete(folderPath);
        } else {
          expandedFolders.add(folderPath);
        }
        refreshTree();
      },
      onSelectFile: async (nextPath) => {
        if (!nextPath || nextPath === selectedPath) {
          return;
        }
        await loadSelectedFile(nextPath);
      }
    });
  }

  function setPreviewState(path, text, lang, canCopy) {
    selectedPath = path;
    selectedPreviewText = text;
    selectedCanCopy = canCopy;

    pathEl.textContent = path;
    setCodeContent(codeEl, text, lang, hljs);
    copyButton.disabled = !selectedCanCopy;
    downloadButton.disabled = !selectedPath;
    refreshTree();
  }

  async function loadSelectedFile(path) {
    selectedPath = path;
    refreshTree();

    const lang = inferPreviewLanguage(path);
    if (!lang) {
      setPreviewState(path, "Binary or unsupported file. Please download to view.", "plaintext", false);
      return;
    }

    pendingRequestId += 1;
    const requestId = pendingRequestId;

    pathEl.textContent = path;
    setBusyMessage(codeEl, "Loading...");
    copyButton.disabled = true;
    downloadButton.disabled = false;

    try {
      const response = await fetch(joinContentUrl(rootPath, path));
      if (!response.ok) {
        throw new Error(`Failed to load file (HTTP ${response.status})`);
      }

      const fullText = await response.text();
      if (requestId !== pendingRequestId) {
        return;
      }

      if (isLikelyBinaryText(fullText)) {
        setPreviewState(path, "Binary or unsupported file. Please download to view.", "plaintext", false);
        return;
      }

      if (getFileExtension(path) === "csv") {
        const csvPreview = truncateCsvPreview(fullText);
        setPreviewState(path, csvPreview.text, "plaintext", true);
        return;
      }

      setPreviewState(path, fullText, lang, true);
    } catch (error) {
      if (requestId !== pendingRequestId) {
        return;
      }
      setPreviewState(path, error.message || "Failed to load file.", "plaintext", false);
    }
  }

  copyButton.addEventListener("click", async () => {
    if (!selectedCanCopy || !selectedPreviewText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(selectedPreviewText);
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

  downloadButton.addEventListener("click", async () => {
    if (!selectedPath) {
      return;
    }

    const sourceUrl = joinContentUrl(rootPath, selectedPath);
    try {
      const response = await fetch(sourceUrl);
      if (!response.ok) {
        throw new Error(`Failed to download file (HTTP ${response.status})`);
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = getFilename(selectedPath);
      anchor.click();
      URL.revokeObjectURL(blobUrl);
    } catch (_error) {
      const anchor = document.createElement("a");
      anchor.href = sourceUrl;
      anchor.download = getFilename(selectedPath);
      anchor.click();
    }
  });

  const defaultPath = pickDefaultFile(filePaths);
  if (!defaultPath) {
    setBusyMessage(codeEl, "No source files available.");
    copyButton.disabled = true;
    downloadButton.disabled = true;
    return;
  }

  defaultPath
    .split("/")
    .slice(0, -1)
    .reduce((acc, folder) => {
      const folderPath = acc ? `${acc}/${folder}` : folder;
      expandedFolders.add(folderPath);
      return folderPath;
    }, "");

  await loadSelectedFile(defaultPath);
}
