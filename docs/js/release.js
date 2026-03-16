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

let activeReleaseCategory = "all";
let activeReleaseId = "";

function getFilteredReleases() {
  const releases = getReleaseItems();
  if (activeReleaseCategory === "all") {
    return releases;
  }
  return releases.filter((item) => String(item.category || "").toLowerCase() === activeReleaseCategory);
}

function renderReleaseFilters() {
  const host = document.getElementById("release-filters");
  if (!host) {
    return;
  }

  const categories = Array.from(new Set(getReleaseItems().map((item) => String(item.category || "").toLowerCase()).filter(Boolean)));
  const buttons = ["all", ...categories].map((category) => {
    const isActive = category === activeReleaseCategory;
    const classes = isActive
      ? "border-blue-500 bg-blue-500 text-white"
      : "border-blue-200 bg-blue-50 text-blue-600 hover:border-blue-500 hover:text-blue-700";
    const label = category === "all" ? "All releases" : `${category.charAt(0).toUpperCase()}${category.slice(1)}`;
    return `<button type="button" data-release-filter="${category}" class="rounded-md border px-3 py-2 text-sm font-medium transition ${classes}">${label}</button>`;
  }).join("");

  host.innerHTML = buttons;
  host.querySelectorAll("[data-release-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextCategory = button.getAttribute("data-release-filter");
      if (!nextCategory || nextCategory === activeReleaseCategory) {
        return;
      }
      activeReleaseCategory = nextCategory;
      const filtered = getFilteredReleases();
      if (!filtered.some((item) => item.id === activeReleaseId)) {
        activeReleaseId = filtered[0]?.id || "";
      }
      renderReleaseFilters();
      renderReleaseGrid();
      renderReleaseDetail();
    });
  });
}

function renderReleaseGrid() {
  const host = document.getElementById("release-grid");
  if (!host) {
    return;
  }

  const releases = getFilteredReleases();
  if (!releases.length) {
    host.innerHTML = "<p class=\"text-sm text-gray-600\">No curated releases match this filter.</p>";
    return;
  }

  host.innerHTML = releases.map((item) => {
    const isActive = item.id === activeReleaseId;
    const activeClasses = isActive
      ? "border-blue-500 bg-blue-50"
      : "border-gray-200 bg-white hover:border-blue-300";
    return `
      <button type="button" data-release-id="${escapeReleaseHtml(item.id)}" class="w-full rounded-md border p-5 text-left shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300 ${activeClasses}">
        <div class="flex items-start justify-between gap-3">
          <h3 class="text-base font-semibold text-gray-900">${escapeReleaseHtml(item.title)}</h3>
          <span class="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-gray-600">${escapeReleaseHtml(item.status)}</span>
        </div>
        <p class="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">${escapeReleaseHtml(item.category)} · ${escapeReleaseHtml(item.version)}</p>
        <p class="mt-3 text-sm leading-6 text-gray-700">${escapeReleaseHtml(item.summary)}</p>
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
      renderReleaseGrid();
      renderReleaseDetail();
    });
  });
}

function renderReleaseDetail() {
  const release = getFilteredReleases().find((item) => item.id === activeReleaseId) || getFilteredReleases()[0] || null;
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
  const setList = (id, items) => {
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = (Array.isArray(items) && items.length)
        ? items.map((item) => `<li>${escapeReleaseHtml(item)}</li>`).join("")
        : "<li>No details published yet.</li>";
    }
  };

  setText("release-title", release.title);
  setText("release-summary", release.summary);
  setText("release-category", release.category);
  setText("release-version", release.version);
  setText("release-status", release.status);
  setText("release-overview", release.overview);
  setList("release-scope", release.scope);
  setList("release-findings", release.findings);
  setText("release-next", release.next || "No next-stage note published yet.");

  const evidenceEl = document.getElementById("release-evidence");
  if (evidenceEl) {
    evidenceEl.innerHTML = Array.isArray(release.evidence) && release.evidence.length
      ? release.evidence.map((item) => `<a href="${escapeReleaseHtml(item.href || "#")}" class="inline-flex rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:border-blue-500 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300">${escapeReleaseHtml(item.label || "Open")}</a>`).join("")
      : "<span class=\"text-sm text-gray-500\">No supporting links published yet.</span>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("release-grid")) {
    return;
  }

  activeReleaseId = getReleaseItems()[0]?.id || "";
  renderReleaseFilters();
  renderReleaseGrid();
  renderReleaseDetail();
});
