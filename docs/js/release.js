function escapeReleaseHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getReleaseItems() {
  return Array.isArray(window.RELEASES_DATA) ? window.RELEASES_DATA : [];
}

let activeReleaseId = "";

function getActiveRelease() {
  const releases = getReleaseItems();
  return releases.find((item) => item.id === activeReleaseId) || releases[0] || null;
}

function getProjectCardSummary(item) {
  return String(item?.summary || item?.overview || "Curated project documentation and supporting files.");
}

function getProjectActions(release) {
  const evidence = Array.isArray(release?.evidence) ? release.evidence : [];
  const actions = [];
  const usedHrefs = new Set();

  evidence.forEach((item) => {
    const href = String(item?.href || "").trim();
    const label = String(item?.label || "").trim();
    if (!href || usedHrefs.has(href)) {
      return;
    }

    let actionLabel = label || "Open";
    if (/download/i.test(label) || /files/i.test(label)) {
      actionLabel = "View Files";
    } else if (/summary/i.test(label)) {
      actionLabel = "Read Summary";
    } else if (/timeline|plan/i.test(label)) {
      actionLabel = "View Context";
    }

    actions.push({
      label: actionLabel,
      href
    });
    usedHrefs.add(href);
  });

  const primaryDownload = evidence.find((item) => /download/i.test(String(item?.label || "")));
  if (primaryDownload && !usedHrefs.has(primaryDownload.href)) {
    actions.unshift({ label: "Download Package", href: primaryDownload.href });
  }

  return actions.slice(0, 3);
}

function renderProjectSelector() {
  const host = document.getElementById("release-grid");
  if (!host) {
    return;
  }

  const releases = getReleaseItems();
  if (!releases.length) {
    host.innerHTML = "<p class=\"text-sm text-gray-600\">No curated projects have been published yet.</p>";
    return;
  }

  host.innerHTML = releases.map((item) => {
    const isActive = item.id === activeReleaseId;
    const activeClasses = isActive
      ? "border-blue-500 bg-blue-50"
      : "border-gray-200 bg-white hover:border-blue-300";

    return `
      <button
        type="button"
        data-release-id="${escapeReleaseHtml(item.id)}"
        class="min-w-[280px] max-w-[340px] shrink-0 snap-start rounded-md border p-5 text-left shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300 ${activeClasses}"
      >
        <div class="flex items-start justify-between gap-3">
          <h3 class="text-base font-semibold text-gray-900">${escapeReleaseHtml(item.title)}</h3>
          <span class="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-gray-600">${escapeReleaseHtml(item.status || "Published")}</span>
        </div>
        <p class="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">${escapeReleaseHtml(item.category || "Project")} · ${escapeReleaseHtml(item.version || "Current")}</p>
        <p class="mt-3 text-sm leading-6 text-gray-700">${escapeReleaseHtml(getProjectCardSummary(item))}</p>
      </button>
    `;
  }).join("");

  host.querySelectorAll("[data-release-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextId = button.getAttribute("data-release-id");
      if (!nextId || nextId === activeReleaseId) {
        return;
      }
      activeReleaseId = nextId;
      renderProjectSelector();
      renderReleaseDetail();
    });
  });
}

function renderReleaseDetail() {
  const release = getActiveRelease();
  if (!release) {
    return;
  }
  activeReleaseId = release.id;

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = value;
    }
  };

  const setList = (id, items, fallback) => {
    const el = document.getElementById(id);
    if (!el) {
      return;
    }
    el.innerHTML = (Array.isArray(items) && items.length)
      ? items.map((item) => `<li>${escapeReleaseHtml(item)}</li>`).join("")
      : `<li>${escapeReleaseHtml(fallback)}</li>`;
  };

  setText("release-title", release.title || "Project");
  setText("release-summary", release.summary || "No project summary published yet.");
  setText("release-category", release.category || "Project");
  setText("release-version", release.version || "Current");
  setText("release-date", release.date || "Date not published");
  setText("release-status", release.status || "Published");
  setText("release-overview", release.overview || "No overview has been published yet.");
  setList("release-findings", release.findings, "No key findings have been published yet.");
  setList("release-scope", release.scope, "No inclusion list has been published yet.");
  setText("release-next", release.next || "No usage guidance has been published yet.");

  const evidenceEl = document.getElementById("release-evidence");
  if (evidenceEl) {
    const evidence = Array.isArray(release.evidence) ? release.evidence : [];
    evidenceEl.innerHTML = evidence.length
      ? evidence.map((item) => `<a href="${escapeReleaseHtml(item.href || "#")}" class="inline-flex rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:border-blue-500 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300">${escapeReleaseHtml(item.label || "Open")}</a>`).join("")
      : "<span class=\"text-sm text-gray-500\">No files or supporting links have been published yet.</span>";
  }

  const actionsEl = document.getElementById("release-actions");
  if (actionsEl) {
    const actions = getProjectActions(release);
    actionsEl.innerHTML = actions.length
      ? actions.map((action) => `<a href="${escapeReleaseHtml(action.href)}" class="inline-flex rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:border-blue-500 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300">${escapeReleaseHtml(action.label)}</a>`).join("")
      : "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("release-grid")) {
    return;
  }

  activeReleaseId = getReleaseItems()[0]?.id || "";
  renderProjectSelector();
  renderReleaseDetail();
});
