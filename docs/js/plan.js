function getPlanMeetings() {
  const source = Array.isArray(window.COMMUNITY_MEETINGS) ? window.COMMUNITY_MEETINGS : [];
  return source
    .filter((meeting) => meeting && meeting.id && (meeting.detail || meeting.detailViews))
    .sort((a, b) => String(b.latest?.date || b.ym || b.id).localeCompare(String(a.latest?.date || a.ym || a.id)));
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isCompletedStatus(status) {
  return typeof status === "string" && ["done", "completed", "published"].includes(status.toLowerCase());
}

function getMeetingViews(meeting) {
  return Array.isArray(meeting?.detailViews) ? meeting.detailViews : [];
}

function getMeetingTrackIds(meeting) {
  const trackIds = getMeetingViews(meeting)
    .map((view) => String(view?.id || "").toLowerCase())
    .filter((id) => id === "algorithm" || id === "infrastructure");

  if (trackIds.length) {
    return trackIds;
  }

  const meetingYm = String(meeting?.ym || "");
  if (meetingYm && meetingYm <= "2025-12" && (meeting?.detail || getMeetingViews(meeting).length)) {
    return ["algorithm", "infrastructure"];
  }

  return [];
}

function getDefaultMeetingViewId(meeting) {
  const views = getMeetingViews(meeting);
  if (!views.length) {
    return "";
  }
  const configured = String(meeting?.defaultViewId || "");
  if (configured && views.some((view) => view?.id === configured)) {
    return configured;
  }
  return views[0]?.id || "";
}

const planMeetings = getPlanMeetings();
let activeTrackFilter = "algorithm";
let activeMeetingKey = "";
let activeMeetingViewId = "";
let activeSummaryTab = "what_changed";
let previousTrackFilter = "algorithm";
let previousSummaryTab = "what_changed";

function getDirectionalTransition(fromIndex, toIndex) {
  if (fromIndex === toIndex) {
    return "none";
  }
  return toIndex > fromIndex ? "forward" : "backward";
}

function renderWithHorizontalTransition(host, nextMarkup, direction) {
  if (!host) {
    return;
  }

  const currentMarkup = host.innerHTML.trim();
  if (!currentMarkup || direction === "none") {
    host.innerHTML = nextMarkup;
    return;
  }

  const height = host.offsetHeight;
  host.style.minHeight = `${height}px`;
  host.classList.add("is-animating");

  const currentPane = document.createElement("div");
  currentPane.className = "plan-motion-pane plan-motion-pane--current";
  currentPane.innerHTML = currentMarkup;

  const nextPane = document.createElement("div");
  nextPane.className = "plan-motion-pane plan-motion-pane--next";
  nextPane.innerHTML = nextMarkup;

  const offset = direction === "forward" ? 36 : -36;
  currentPane.style.transform = "translateX(0)";
  currentPane.style.opacity = "1";
  nextPane.style.transform = `translateX(${offset}px)`;
  nextPane.style.opacity = "0";

  host.innerHTML = "";
  host.appendChild(currentPane);
  host.appendChild(nextPane);

  const finish = () => {
    host.classList.remove("is-animating");
    host.style.minHeight = "";
    host.innerHTML = nextMarkup;
  };

  window.requestAnimationFrame(() => {
    currentPane.style.transition = "transform 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease";
    nextPane.style.transition = "transform 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease";
    currentPane.style.transform = `translateX(${direction === "forward" ? -36 : 36}px)`;
    currentPane.style.opacity = "0";
    nextPane.style.transform = "translateX(0)";
    nextPane.style.opacity = "1";
  });

  window.setTimeout(finish, 240);
}

function getTrackMeetings(trackId) {
  return planMeetings
    .filter((meeting) => getMeetingTrackIds(meeting).includes(trackId))
    .map((meeting, index) => {
      const matchingView = getMeetingViews(meeting).find((view) => String(view?.id || "").toLowerCase() === trackId) || null;
      return {
        ...meeting,
        planKey: `${trackId}:${meeting.id}:${index}`,
        activeTrackView: matchingView
      };
    });
}

function getFilteredMeetings() {
  return getTrackMeetings(activeTrackFilter);
}

function getActiveMeeting() {
  const filtered = getFilteredMeetings();
  return filtered.find((meeting) => meeting.planKey === activeMeetingKey) || filtered[0] || null;
}

function syncActiveMeetingSelection() {
  const filtered = getFilteredMeetings();
  const current = filtered.find((meeting) => meeting.planKey === activeMeetingKey);
  const fallback = current || filtered[0] || null;
  activeMeetingKey = fallback?.planKey || "";
  if (!fallback) {
    activeMeetingViewId = "";
    return;
  }
  syncActiveMeetingView(fallback, activeTrackFilter);
}

function syncActiveMeetingView(meeting, preferredViewId = "") {
  const views = getMeetingViews(meeting);
  if (!views.length) {
    activeMeetingViewId = "";
    return;
  }

  const preferred = views.find((view) => view?.id === preferredViewId);
  const current = views.find((view) => view?.id === activeMeetingViewId);
  activeMeetingViewId = (preferred || current || views[0])?.id || "";
}

function getActiveMeetingDetail(meeting) {
  const views = getMeetingViews(meeting);
  if (!views.length) {
    return meeting?.detail || null;
  }
  return views.find((view) => view?.id === activeMeetingViewId)?.detail || views[0]?.detail || null;
}

function getActiveMeetingViewLabel(meeting) {
  const views = getMeetingViews(meeting);
  if (!views.length) {
    return meeting?.shortTag || "";
  }
  return views.find((view) => view?.id === activeMeetingViewId)?.label || views[0]?.label || "";
}

function buildDownloadLink(meeting) {
  if (!meeting?.downloadItemId) {
    return "";
  }
  const url = new URL("./download.html", window.location.href);
  url.hash = meeting.downloadItemId;
  if (activeMeetingViewId) {
    url.searchParams.set("view", activeMeetingViewId);
  }
  return `${url.pathname.split("/").pop()}${url.search}${url.hash}`;
}

function getMeetingDateLabel(meeting) {
  return meeting?.latest?.date || meeting?.ym || "Meeting period";
}

function getTimelineShortTitle(meeting) {
  const detail = getActiveMeetingDetail(meeting) || meeting?.detail || {};
  const rawTitle = String(detail?.title || meeting?.latest?.title || "Meeting summary");
  const withoutPrefix = rawTitle.replace(/^Meeting Record\s*-\s*/i, "").replace(/^Meeting Record\s*/i, "");
  const segments = withoutPrefix.split(" - ").map((segment) => segment.trim()).filter(Boolean);
  if (!segments.length) {
    return "Meeting summary";
  }
  const shortTitle = segments.length > 1 ? segments[segments.length - 1] : segments[0];
  return shortTitle.length > 52 ? `${shortTitle.slice(0, 49)}...` : shortTitle;
}

function findSummaryCard(cards, patterns) {
  return cards.find((card) => patterns.some((pattern) => pattern.test(String(card?.heading || "")))) || null;
}

function getSummaryCards(detail) {
  const cards = Array.isArray(detail?.cards) ? detail.cards : [];
  const whatChanged = findSummaryCard(cards, [
    /what this build did/i,
    /what changed/i,
    /what this stage did/i,
    /what this meeting did/i,
    /what was delivered/i
  ]) || cards[0] || null;
  const whyItMatters = findSummaryCard(cards, [/why .*matter/i, /why it matters/i]);
  const nextStep = findSummaryCard(cards, [/next step/i, /next steps/i]);
  const used = new Set([whatChanged, whyItMatters, nextStep].filter(Boolean));
  const supporting = cards.filter((card) => !used.has(card));
  return { whatChanged, whyItMatters, nextStep, supporting };
}

function renderBulletItems(items, fallbackText) {
  const list = Array.isArray(items) && items.length ? items : [fallbackText];
  return `
    <ul class="list-disc space-y-1 pl-5">
      ${list.map((item) => `<li class="text-sm leading-6 text-gray-600">${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
}

function renderCardTable(table) {
  if (!table || !Array.isArray(table.columns) || !Array.isArray(table.rows) || !table.columns.length) {
    return "";
  }
  const headMarkup = table.columns
    .map((column) => `<th class="px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.08em] text-gray-500">${escapeHtml(column)}</th>`)
    .join("");
  const bodyMarkup = table.rows
    .map((row) => {
      const cells = Array.isArray(row) ? row : [];
      const cellMarkup = table.columns
        .map((_, index) => `<td class="px-3 py-2 text-sm text-gray-600">${escapeHtml(cells[index] || "")}</td>`)
        .join("");
      return `<tr class="border-t border-gray-200">${cellMarkup}</tr>`;
    })
    .join("");
  return `
    <div class="mt-4 overflow-x-auto rounded-md border border-gray-200">
      <table class="min-w-full bg-white">
        <thead class="bg-gray-50"><tr>${headMarkup}</tr></thead>
        <tbody>${bodyMarkup}</tbody>
      </table>
    </div>
  `;
}

function getSupportingGroupKey(card) {
  const heading = String(card?.heading || "").toLowerCase();
  if (/scope/.test(heading)) {
    return "scope";
  }
  if (/example/.test(heading)) {
    return "examples";
  }
  if (/learn|target|coverage|acceptance/.test(heading)) {
    return "learning_goals";
  }
  if (/run/.test(heading)) {
    return "run_notes";
  }
  if (/output|recorded|result|validation/.test(heading)) {
    return "recorded_outputs";
  }
  return "additional";
}

function getSupportingGroupMeta(key) {
  const map = {
    scope: "Scope",
    examples: "Examples",
    learning_goals: "Learning Goals",
    run_notes: "Run Notes",
    recorded_outputs: "Recorded Outputs",
    additional: "Additional Notes"
  };
  return map[key] || "Supporting Notes";
}

function renderTrackFilter() {
  const host = document.getElementById("plan-track-filter");
  if (!host) {
    return;
  }
  const options = [
    { id: "algorithm", label: "Algorithm" },
    { id: "infrastructure", label: "Infrastructure" }
  ];
  host.innerHTML = `
    <div class="plan-segmented flex w-full items-center justify-center rounded-full p-1.5">
      ${options.map((option) => {
        const isActive = option.id === activeTrackFilter;
        return `<button type="button" data-track-filter="${option.id}" data-active="${isActive ? "true" : "false"}" class="plan-segmented__button inline-flex min-w-0 flex-1 items-center justify-center rounded-full border border-transparent px-4 py-2.5 text-sm font-medium">${option.label}</button>`;
      }).join("")}
    </div>
  `;
  host.querySelectorAll("[data-track-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextFilter = button.getAttribute("data-track-filter");
      if (!nextFilter || nextFilter === activeTrackFilter) {
        return;
      }
      previousTrackFilter = activeTrackFilter;
      activeTrackFilter = nextFilter;
      activeMeetingKey = "";
      activeMeetingViewId = nextFilter;
      activeSummaryTab = "what_changed";
      syncActiveMeetingSelection();
      renderTrackFilter();
      renderTimeline();
      renderMeetingDetails();
    });
  });
}

function renderTimeline() {
  const timeline = document.getElementById("plan-timeline");
  if (!timeline) {
    return;
  }
  const filtered = getFilteredMeetings();
  if (!filtered.length) {
    timeline.innerHTML = "<p class=\"text-sm text-gray-600\">No meetings available for this track.</p>";
    return;
  }
  const timelineItems = filtered.map((meeting) => {
    const isActive = meeting.planKey === activeMeetingKey;
    const activeClasses = isActive
      ? "border-blue-300 bg-white/80 text-blue-600 shadow-[0_10px_22px_rgba(59,130,246,0.08),inset_0_1px_0_rgba(255,255,255,0.6)]"
      : "border-white/70 bg-white/60 text-gray-700 hover:border-blue-200 hover:text-blue-600";
    const dotClasses = isActive ? "border-blue-500 bg-blue-500" : "border-gray-300 bg-white";
    const statusClasses = isCompletedStatus(meeting.status)
      ? "border-gray-200 bg-white text-gray-600"
      : "border-blue-200 bg-blue-50 text-blue-600";
    return `
      <button
        type="button"
        class="group inline-flex min-w-[168px] items-start gap-3 rounded-md border px-3 py-3 text-left shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300 lg:min-w-0 lg:w-full ${activeClasses}"
        data-meeting-key="${meeting.planKey}"
      >
        <span class="mt-1 inline-flex h-3 w-3 shrink-0 rounded-full border ${dotClasses}"></span>
        <span class="min-w-0">
          <span class="block text-xs font-semibold tracking-[0.12em]">${escapeHtml(meeting.ym || meeting.id)}</span>
          <span class="mt-1 block text-xs leading-5">${escapeHtml(getTimelineShortTitle(meeting))}</span>
          <span class="mt-2 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] ${statusClasses}">${escapeHtml(meeting.status || "Open")}</span>
        </span>
      </button>
    `;
  }).join("");
  const timelineMarkup = `<div class="flex gap-3 overflow-x-auto pb-2 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">${timelineItems}</div>`;
  const trackOrder = ["algorithm", "infrastructure"];
  renderWithHorizontalTransition(
    timeline,
    timelineMarkup,
    getDirectionalTransition(trackOrder.indexOf(previousTrackFilter), trackOrder.indexOf(activeTrackFilter))
  );
  previousTrackFilter = activeTrackFilter;
  timeline.querySelectorAll("[data-meeting-key]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextKey = button.getAttribute("data-meeting-key");
      if (!nextKey || nextKey === activeMeetingKey) {
        return;
      }
      activeMeetingKey = nextKey;
      const meeting = getActiveMeeting();
      if (meeting) {
        syncActiveMeetingView(meeting, activeTrackFilter);
        window.history.replaceState({}, "", `#${meeting.id}`);
      }
      renderTimeline();
      renderMeetingDetails();
    });
  });
}

function renderSummaryTabs(summary) {
  const tabsEl = document.getElementById("meeting-summary-tabs");
  const panelEl = document.getElementById("meeting-summary-panel");
  if (!tabsEl || !panelEl) {
    return;
  }
  const tabConfig = [
    { id: "what_changed", label: "What Changed", items: summary.whatChanged?.bullets, fallback: "No structured change summary has been published for this meeting yet." },
    { id: "why_it_matters", label: "Why It Matters", items: summary.whyItMatters?.bullets, fallback: "This meeting adds context to the club's ongoing benchmark workflow." },
    { id: "next_step", label: "Next Step", items: summary.nextStep?.bullets, fallback: "The next step will be published in a later update." }
  ];
  if (!tabConfig.some((tab) => tab.id === activeSummaryTab)) {
    activeSummaryTab = "what_changed";
  }
  tabsEl.innerHTML = `
    <div class="plan-segmented flex w-full items-center rounded-full p-1.5">
      ${tabConfig.map((tab) => {
        const isActive = tab.id === activeSummaryTab;
        return `<button type="button" data-summary-tab="${tab.id}" data-active="${isActive ? "true" : "false"}" class="plan-segmented__button inline-flex min-w-0 flex-1 items-center justify-center rounded-full border border-transparent px-4 py-2.5 text-sm font-medium">${tab.label}</button>`;
      }).join("")}
    </div>
  `;
  const activeTab = tabConfig.find((tab) => tab.id === activeSummaryTab) || tabConfig[0];
  const panelMarkup = `
    <div>
      <h3 class="text-sm font-semibold uppercase tracking-[0.12em] text-gray-500">${activeTab.label}</h3>
      <div class="mt-3">${renderBulletItems(activeTab.items, activeTab.fallback)}</div>
    </div>
  `;
  const summaryOrder = tabConfig.map((tab) => tab.id);
  renderWithHorizontalTransition(
    panelEl,
    panelMarkup,
    getDirectionalTransition(summaryOrder.indexOf(previousSummaryTab), summaryOrder.indexOf(activeSummaryTab))
  );
  previousSummaryTab = activeSummaryTab;
  tabsEl.querySelectorAll("[data-summary-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextTab = button.getAttribute("data-summary-tab");
      if (!nextTab || nextTab === activeSummaryTab) {
        return;
      }
      previousSummaryTab = activeSummaryTab;
      activeSummaryTab = nextTab;
      renderSummaryTabs(summary);
    });
  });
}

function renderSupportingNotes(summary) {
  const host = document.getElementById("meeting-supporting-notes");
  if (!host) {
    return;
  }
  const supporting = Array.isArray(summary.supporting) ? summary.supporting : [];
  if (!supporting.length) {
    host.innerHTML = "<article class=\"rounded-md border border-dashed border-gray-300 bg-white p-5 text-sm text-gray-500 shadow-sm\">No additional supporting notes are available for this view.</article>";
    return;
  }
  const groups = supporting.reduce((acc, card) => {
    const key = getSupportingGroupKey(card);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(card);
    return acc;
  }, {});
  host.innerHTML = Object.entries(groups).map(([key, cards]) => {
    return `
      <details class="rounded-md border border-gray-200 bg-white shadow-sm" ${key === "scope" ? "open" : ""}>
        <summary class="cursor-pointer list-none px-5 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-gray-500">
          ${escapeHtml(getSupportingGroupMeta(key))}
        </summary>
        <div class="border-t border-gray-200 px-5 py-4 space-y-4">
          ${cards.map((card) => {
            const bullets = Array.isArray(card?.bullets) ? card.bullets : [];
            const bulletMarkup = bullets.length ? renderBulletItems(bullets, "") : "";
            const tableMarkup = renderCardTable(card?.table);
            return `
              <article>
                <h4 class="text-sm font-semibold text-gray-900">${escapeHtml(card?.heading || "Supporting note")}</h4>
                <div class="mt-3">${bulletMarkup}</div>
                ${tableMarkup}
              </article>
            `;
          }).join("")}
        </div>
      </details>
    `;
  }).join("");
}

function renderMeetingDetails() {
  const meeting = getActiveMeeting();
  const titleEl = document.getElementById("meeting-title");
  const summaryLineEl = document.getElementById("meeting-summary-line");
  const dateEl = document.getElementById("meeting-date");
  const statusEl = document.getElementById("meeting-status");
  const topicEl = document.getElementById("meeting-topic");
  const relatedFilesEl = document.getElementById("meeting-related-files");
  if (!meeting || !titleEl || !summaryLineEl || !dateEl || !statusEl || !topicEl || !relatedFilesEl) {
    return;
  }
  syncActiveMeetingView(meeting, activeTrackFilter);
  const detail = getActiveMeetingDetail(meeting);
  const summary = getSummaryCards(detail);
  const viewLabel = getActiveMeetingViewLabel(meeting);
  const downloadLink = buildDownloadLink(meeting);
  titleEl.textContent = detail?.title || meeting.latest?.title || "Meeting summary";
  summaryLineEl.textContent = "Read the summary first, expand supporting notes only when needed, and open Download for raw files.";
  dateEl.textContent = getMeetingDateLabel(meeting);
  statusEl.textContent = meeting.status || "Open";
  topicEl.textContent = viewLabel || meeting.shortTag || "General";
  statusEl.className = isCompletedStatus(meeting.status)
    ? "rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-600"
    : "rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600";
  relatedFilesEl.innerHTML = downloadLink
    ? `<a href="${downloadLink}" class="inline-flex rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:border-blue-500 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300">Open in Download</a>`
    : `<span class="text-sm text-gray-500">No related files linked yet.</span>`;
  renderSummaryTabs(summary);
  renderSupportingNotes(summary);
}

function setActiveMeetingFromHash() {
  const hashId = window.location.hash ? window.location.hash.slice(1) : "";
  if (!hashId) {
    return;
  }
  const filtered = getFilteredMeetings();
  const matchingMeeting = filtered.find((entry) => entry.id === hashId);
  if (matchingMeeting && getMeetingTrackIds(matchingMeeting).includes(activeTrackFilter)) {
    activeMeetingKey = matchingMeeting.planKey;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("plan-timeline")) {
    return;
  }
  setActiveMeetingFromHash();
  syncActiveMeetingSelection();
  renderTrackFilter();
  renderTimeline();
  renderMeetingDetails();
});
