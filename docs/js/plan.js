function getPlanMeetings() {
  const source = Array.isArray(window.COMMUNITY_MEETINGS) ? window.COMMUNITY_MEETINGS : [];
  return source.filter((meeting) => meeting && meeting.detail && Array.isArray(meeting.detail.cards));
}

function isCompletedStatus(status) {
  return typeof status === "string" && ["done", "completed"].includes(status.toLowerCase());
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
        <thead class="bg-gray-50">
          <tr>${headMarkup}</tr>
        </thead>
        <tbody>${bodyMarkup}</tbody>
      </table>
    </div>
  `;
}

function renderCardChart(chart) {
  if (!chart || !Array.isArray(chart.series) || !chart.series.length) {
    return "";
  }

  const numericValues = chart.series
    .map((item) => Number(item && item.value))
    .filter((value) => Number.isFinite(value));
  const maxValue = numericValues.length ? Math.max(...numericValues) : 0;
  if (maxValue <= 0) {
    return "";
  }

  const barsMarkup = chart.series
    .map((item) => {
      const value = Number(item && item.value);
      const label = item && item.label ? item.label : "";
      const displayValue = item && item.displayValue ? item.displayValue : String(item && item.value ? item.value : "");
      const heightPercent = Number.isFinite(value) ? Math.max((value / maxValue) * 100, 6) : 6;

      return `
        <div class="flex min-w-0 flex-1 flex-col items-center gap-2">
          <div class="text-[11px] font-medium text-gray-500">${escapeHtml(displayValue)}</div>
          <div class="flex h-40 w-full items-end justify-center rounded-md bg-gray-50 px-2 py-2">
            <div class="w-full max-w-[72px] rounded-t-md bg-blue-500" style="height:${heightPercent}%"></div>
          </div>
          <div class="text-center text-xs leading-5 text-gray-600">${escapeHtml(label)}</div>
        </div>
      `;
    })
    .join("");

  const subtitleMarkup = chart.subtitle
    ? `<p class="mt-2 text-xs leading-5 text-gray-500">${escapeHtml(chart.subtitle)}</p>`
    : "";

  return `
    <div class="mt-4 rounded-md border border-gray-200 bg-white p-4">
      <div class="flex items-end gap-3">${barsMarkup}</div>
      ${subtitleMarkup}
    </div>
  `;
}

const stagePlanViewState = {};

function renderStagePlanCard(card, cardId) {
  const stagePlan = card && card.stagePlan ? card.stagePlan : null;
  const stages = stagePlan && Array.isArray(stagePlan.stages) ? stagePlan.stages : [];
  if (!stages.length) {
    return "";
  }

  const activeStageId = stagePlanViewState[cardId] || stages[0].id || "";
  const activeStage = stages.find((stage) => stage && stage.id === activeStageId) || stages[0];
  const controlMarkup = stages
    .map((stage) => {
      const isActive = stage.id === activeStage.id;
      const classes = isActive
        ? "border-blue-500 bg-blue-500 text-white"
        : "border-transparent bg-white text-gray-600 hover:bg-gray-50";
      return `
        <button
          type="button"
          class="stage-plan__tab inline-flex min-w-0 flex-1 items-center justify-center rounded-md border px-3 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300 ${classes}"
          data-stage-plan-card="${cardId}"
          data-stage-plan-stage="${stage.id}"
          aria-pressed="${isActive ? "true" : "false"}"
        >
          ${escapeHtml(stage.label || "")}
        </button>
      `;
    })
    .join("");

  const bulletMarkup = (Array.isArray(activeStage.bullets) ? activeStage.bullets : [])
    .map((bullet) => `<li class="text-sm leading-6 text-gray-600">${escapeHtml(bullet)}</li>`)
    .join("");

  const subheadingMarkup = activeStage.subheading
    ? `<p class="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-gray-500">${escapeHtml(activeStage.subheading)}</p>`
    : "";

  return `
    <article class="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
      <h3 class="text-sm font-semibold uppercase tracking-[0.12em] text-gray-500">${escapeHtml(card.heading || "")}</h3>
      ${stagePlan.projectTitle ? `<p class="mt-3 text-base font-semibold text-gray-900">${escapeHtml(stagePlan.projectTitle)}</p>` : ""}
      <div class="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-1">
        <div class="grid gap-1" style="grid-template-columns:repeat(${stages.length}, minmax(0, 1fr));" role="tablist" aria-label="${escapeHtml(stagePlan.projectTitle || card.heading || "Stage Plan")}">
          ${controlMarkup}
        </div>
      </div>
      <section class="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
        <h4 class="text-base font-semibold text-gray-900">${escapeHtml(activeStage.title || "")}</h4>
        ${subheadingMarkup}
        <ul class="mt-3 list-disc space-y-1 pl-5">
          ${bulletMarkup}
        </ul>
      </section>
    </article>
  `;
}

function bindStagePlanCards() {
  document.querySelectorAll("[data-stage-plan-card][data-stage-plan-stage]").forEach((button) => {
    button.addEventListener("click", () => {
      const cardId = button.getAttribute("data-stage-plan-card");
      const stageId = button.getAttribute("data-stage-plan-stage");
      if (!cardId || !stageId || stagePlanViewState[cardId] === stageId) {
        return;
      }

      stagePlanViewState[cardId] = stageId;
      renderMeetingDetails();
    });
  });
}

const planMeetings = getPlanMeetings();
let activeMeetingIndex = 0;
let activeMeetingViewId = "";

function getMeetingViews(meeting) {
  return Array.isArray(meeting && meeting.detailViews) ? meeting.detailViews : [];
}

function getDefaultMeetingViewId(meeting) {
  const views = getMeetingViews(meeting);
  if (!views.length) {
    return "";
  }

  const configuredDefault = typeof (meeting && meeting.defaultViewId) === "string"
    ? meeting.defaultViewId
    : "";
  const configuredView = configuredDefault
    ? views.find((view) => view && view.id === configuredDefault)
    : null;
  if (configuredView) {
    return configuredView.id || "";
  }

  const algorithmView = views.find((view) => view && view.id === "algorithm");
  return algorithmView ? algorithmView.id : (views[0].id || "");
}

function syncActiveMeetingView(meeting, preferredViewId = "") {
  const views = getMeetingViews(meeting);
  if (!views.length) {
    activeMeetingViewId = "";
    return;
  }

  const preferredView = views.find((view) => view && view.id === preferredViewId);
  const currentView = views.find((view) => view && view.id === activeMeetingViewId);
  activeMeetingViewId = (preferredView || currentView || views.find(Boolean) || {}).id || "";
}

function getActiveMeetingDetail(meeting) {
  const views = getMeetingViews(meeting);
  if (!views.length) {
    return meeting && meeting.detail ? meeting.detail : null;
  }

  const selectedView = views.find((view) => view && view.id === activeMeetingViewId) || views.find(Boolean);
  return selectedView && selectedView.detail ? selectedView.detail : null;
}

function buildDownloadLink(meeting) {
  if (!meeting || !meeting.downloadItemId) {
    return "";
  }

  const url = new URL("./download.html", window.location.href);
  url.hash = meeting.downloadItemId;

  if (activeMeetingViewId) {
    url.searchParams.set("view", activeMeetingViewId);
  }

  return url.pathname.split("/").pop() + url.search + url.hash;
}

function renderMeetingViewSwitch(meeting) {
  const switchEl = document.getElementById("meeting-view-switch");
  if (!switchEl) {
    return;
  }

  const views = getMeetingViews(meeting);
  if (views.length < 2) {
    switchEl.innerHTML = "";
    return;
  }

  switchEl.innerHTML = `
    <div class="inline-flex rounded-md border border-gray-200 bg-white p-1 shadow-sm">
      ${views.map((view) => {
        const isActive = view.id === activeMeetingViewId;
        const classes = isActive
          ? "bg-blue-500 text-white"
          : "text-gray-600 hover:bg-gray-100";
        return `<button type="button" data-meeting-view="${view.id}" class="rounded-md px-3 py-1.5 text-sm font-medium transition ${classes}">${view.label}</button>`;
      }).join("")}
    </div>
  `;

  switchEl.querySelectorAll("[data-meeting-view]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextViewId = button.getAttribute("data-meeting-view");
      if (!nextViewId || nextViewId === activeMeetingViewId) {
        return;
      }

      activeMeetingViewId = nextViewId;
      renderMeetingViewSwitch(meeting);
      renderMeetingDetails();
    });
  });
}

function setActiveMeetingFromHash() {
  const hashId = window.location.hash ? window.location.hash.slice(1) : "";
  if (!hashId) {
    return;
  }

  const index = planMeetings.findIndex((meeting) => meeting.id === hashId);
  if (index >= 0) {
    activeMeetingIndex = index;
    syncActiveMeetingView(planMeetings[index], "");
  }
}

function renderTimeline() {
  const timeline = document.getElementById("plan-timeline");
  if (!timeline) {
    return;
  }

  if (planMeetings.length === 0) {
    timeline.innerHTML = "<p class=\"text-sm text-gray-600\">No meetings available.</p>";
    return;
  }

  const markup = planMeetings
    .map((meeting, index) => {
      const isActive = index === activeMeetingIndex;
      const activeClasses = isActive
        ? "border-blue-500 bg-blue-50 text-blue-600"
        : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:text-blue-600";
      const dotClasses = isActive ? "border-blue-500 bg-blue-500" : "border-gray-300 bg-white";
      const statusClasses = isCompletedStatus(meeting.status)
        ? "border-gray-200 bg-white text-gray-600"
        : "border-blue-200 bg-blue-50 text-blue-600";

      return `
        <button
          type="button"
          class="group inline-flex min-w-[152px] items-start gap-3 rounded-md border px-3 py-2 text-left shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300 lg:min-w-0 lg:w-full ${activeClasses}"
          data-meeting-index="${index}"
          aria-selected="${isActive ? "true" : "false"}"
          aria-current="${isActive ? "true" : "false"}"
        >
          <span class="mt-1 inline-flex h-3 w-3 shrink-0 rounded-full border ${dotClasses}"></span>
          <span class="min-w-0">
            <span class="block text-xs font-semibold tracking-[0.12em]">${meeting.ym}</span>
            <span class="mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] ${statusClasses}">${meeting.status}</span>
            <span class="mt-1 block truncate text-xs">${meeting.shortTag}</span>
          </span>
        </button>
      `;
    })
    .join("");

  timeline.innerHTML = markup;

  timeline.querySelectorAll("[data-meeting-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextIndex = Number(button.getAttribute("data-meeting-index"));
      if (Number.isNaN(nextIndex) || nextIndex === activeMeetingIndex) {
        return;
      }

      activeMeetingIndex = nextIndex;
      syncActiveMeetingView(planMeetings[nextIndex], getDefaultMeetingViewId(planMeetings[nextIndex]));
      renderTimeline();
      renderMeetingDetails();
    });
  });
}

function renderMeetingDetails() {
  const titleEl = document.getElementById("meeting-title");
  const monthEl = document.getElementById("meeting-month");
  const statusEl = document.getElementById("meeting-status");
  const codeLinkEl = document.getElementById("meeting-code-link");
  const cardsEl = document.getElementById("meeting-cards");
  const switchEl = document.getElementById("meeting-view-switch");

  if (!titleEl || !monthEl || !statusEl || !cardsEl || !codeLinkEl || !switchEl) {
    return;
  }

  if (planMeetings.length === 0) {
    titleEl.textContent = "Meeting";
    monthEl.textContent = "";
    statusEl.textContent = "";
    cardsEl.innerHTML = "<p class=\"text-sm text-gray-600\">No meeting details available.</p>";
    return;
  }

  const meeting = planMeetings[activeMeetingIndex];
  if (!meeting) {
    return;
  }

  syncActiveMeetingView(meeting, activeMeetingViewId || getDefaultMeetingViewId(meeting));
  const meetingDetail = getActiveMeetingDetail(meeting);

  titleEl.textContent = meetingDetail && meetingDetail.title ? meetingDetail.title : "Meeting";
  monthEl.textContent = meeting.ym;
  statusEl.textContent = meeting.status;
  codeLinkEl.innerHTML = meeting.downloadItemId
    ? `<a href="${buildDownloadLink(meeting)}" class="inline-flex rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 transition hover:border-blue-500 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300">Code</a>`
    : "";
  statusEl.className = isCompletedStatus(meeting.status)
    ? "rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-600"
    : "rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600";
  renderMeetingViewSwitch(meeting);

  const cards = meetingDetail && Array.isArray(meetingDetail.cards) ? meetingDetail.cards : [];
  if (!cards.length) {
    cardsEl.innerHTML = "<article class=\"rounded-md border border-dashed border-gray-300 bg-white p-5 text-sm text-gray-500 shadow-sm\">No content yet for this view.</article>";
    return;
  }

  cardsEl.innerHTML = cards
    .map((card, index) => {
      if (card && card.stagePlan) {
        const cardId = `${meeting.id}:${activeMeetingViewId || "default"}:${index}`;
        return renderStagePlanCard(card, cardId);
      }

      const bullets = Array.isArray(card.bullets) ? card.bullets : [];
      const bulletMarkup = bullets
        .map((bullet) => `<li class=\"text-sm leading-6 text-gray-600\">${escapeHtml(bullet)}</li>`)
        .join("");
      const listMarkup = bulletMarkup
        ? `<ul class="mt-3 list-disc space-y-1 pl-5">${bulletMarkup}</ul>`
        : "";
      const tableMarkup = renderCardTable(card.table);
      const chartMarkup = renderCardChart(card.chart);

      return `
        <article class="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
          <h3 class="text-sm font-semibold uppercase tracking-[0.12em] text-gray-500">${escapeHtml(card.heading)}</h3>
          ${listMarkup}
          ${tableMarkup}
          ${chartMarkup}
        </article>
      `;
    })
    .join("");

  bindStagePlanCards();
}

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("plan-timeline")) {
    return;
  }

  syncActiveMeetingView(planMeetings[0], getDefaultMeetingViewId(planMeetings[0]));
  setActiveMeetingFromHash();
  renderTimeline();
  renderMeetingDetails();
});
