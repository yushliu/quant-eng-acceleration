function getPlanMeetings() {
  const source = Array.isArray(window.COMMUNITY_MEETINGS) ? window.COMMUNITY_MEETINGS : [];
  return source.filter((meeting) => meeting && meeting.detail && Array.isArray(meeting.detail.cards));
}

function isCompletedStatus(status) {
  return typeof status === "string" && ["done", "completed"].includes(status.toLowerCase());
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
    .map((card) => {
      const bulletMarkup = card.bullets
        .map((bullet) => `<li class=\"text-sm leading-6 text-gray-600\">${bullet}</li>`)
        .join("");

      return `
        <article class="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
          <h3 class="text-sm font-semibold uppercase tracking-[0.12em] text-gray-500">${card.heading}</h3>
          <ul class="mt-3 list-disc space-y-1 pl-5">
            ${bulletMarkup}
          </ul>
        </article>
      `;
    })
    .join("");
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
