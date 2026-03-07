const GITHUB_URL = "https://github.com/yushliu/quant-eng-acceleration";
const latestUpdateViewState = {};

function getMeetingData() {
  return Array.isArray(window.COMMUNITY_MEETINGS) ? window.COMMUNITY_MEETINGS : [];
}

function getLatestUpdates(limit = 3) {
  return getMeetingData()
    .filter((meeting) => meeting && meeting.latest && meeting.ym && meeting.latest.title)
    .sort((a, b) => b.ym.localeCompare(a.ym))
    .slice(0, limit)
    .map((meeting) => ({
      id: meeting.id,
      ym: meeting.ym,
      latest: meeting.latest,
      latestViews: Array.isArray(meeting.latestViews) ? meeting.latestViews : []
    }));
}

function getLatestViewId(item) {
  const views = Array.isArray(item && item.latestViews) ? item.latestViews : [];
  if (!views.length) {
    return "";
  }
  const current = latestUpdateViewState[item.id];
  if (current && views.some((view) => view && view.id === current)) {
    return current;
  }
  const algorithmView = views.find((view) => view && view.id === "algorithm");
  return algorithmView ? algorithmView.id : (views[0].id || "");
}

function getLatestViewContent(item) {
  const views = Array.isArray(item && item.latestViews) ? item.latestViews : [];
  if (!views.length) {
    return item.latest || { title: "", points: [] };
  }
  const activeViewId = getLatestViewId(item);
  const activeView = views.find((view) => view && view.id === activeViewId) || views[0];
  return activeView && activeView.latest ? activeView.latest : { title: "", points: [] };
}

function getLatestPlanMeeting() {
  return getMeetingData()
    .filter((meeting) => meeting && meeting.id && meeting.ym && meeting.detail && Array.isArray(meeting.detail.cards))
    .sort((a, b) => b.ym.localeCompare(a.ym))[0] || null;
}

function initMobileNav() {
  const button = document.getElementById("mobile-menu-button");
  const nav = document.getElementById("primary-nav");

  if (!button || !nav) {
    return;
  }

  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    nav.classList.toggle("hidden", isExpanded);
  });
}

function renderLatestUpdates() {
  const container = document.getElementById("latest-updates");

  if (!container) {
    return;
  }

  const updates = getLatestUpdates(3);

  if (updates.length === 0) {
    container.innerHTML = "<p class=\"text-sm text-gray-600\">No updates yet.</p>";
    return;
  }

  const markup = updates
    .map((item) => {
      const activeViewId = getLatestViewId(item);
      const content = getLatestViewContent(item);
      const bulletPoints = (Array.isArray(content.points) ? content.points : [])
        .map((point) => `<li class="text-sm leading-6 text-gray-600">${point}</li>`)
        .join("");
      const switchMarkup = item.latestViews.length > 1
        ? `
          <div class="inline-flex rounded-md border border-gray-200 bg-white p-1 shadow-sm">
            ${item.latestViews.map((view) => {
              const isActive = view.id === activeViewId;
              const classes = isActive ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100";
              return `<button type="button" data-latest-id="${item.id}" data-latest-view="${view.id}" class="rounded-md px-2.5 py-1 text-[11px] font-medium transition ${classes}">${view.label}</button>`;
            }).join("")}
          </div>
        `
        : "";

      return `
        <article class="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
          <div class="flex items-start justify-between gap-3">
            <p class="text-xs font-medium uppercase tracking-[0.14em] text-gray-500">${item.ym}</p>
            ${switchMarkup}
          </div>
          <h3 class="mt-2 text-base font-semibold text-gray-900">${content.title || ""}</h3>
          <ul class="mt-3 list-disc space-y-1 pl-5">
            ${bulletPoints}
          </ul>
        </article>
      `;
    })
    .join("");

  container.innerHTML = markup;

  container.querySelectorAll("[data-latest-id][data-latest-view]").forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.getAttribute("data-latest-id");
      const viewId = button.getAttribute("data-latest-view");
      if (!itemId || !viewId || latestUpdateViewState[itemId] === viewId) {
        return;
      }
      latestUpdateViewState[itemId] = viewId;
      renderLatestUpdates();
    });
  });
}

function bindGithubLink() {
  const link = document.getElementById("view-github-link");
  if (!link) {
    return;
  }
  link.href = GITHUB_URL;
}

function bindViewAllUpdatesLink() {
  const link = document.getElementById("view-all-updates-link");
  if (!link) {
    return;
  }

  const latestMeeting = getLatestPlanMeeting();
  link.href = latestMeeting ? `./plan.html#${latestMeeting.id}` : "./plan.html";
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  bindGithubLink();
  bindViewAllUpdatesLink();
  renderLatestUpdates();
});
