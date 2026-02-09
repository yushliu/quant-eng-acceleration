const GITHUB_URL = "https://github.com/yushliu/quant-eng-acceleration";

function getMeetingData() {
  return Array.isArray(window.COMMUNITY_MEETINGS) ? window.COMMUNITY_MEETINGS : [];
}

function getLatestUpdates(limit = 3) {
  return getMeetingData()
    .filter((meeting) => meeting && meeting.latest && meeting.ym && meeting.latest.title)
    .sort((a, b) => b.ym.localeCompare(a.ym))
    .slice(0, limit)
    .map((meeting) => ({
      ym: meeting.ym,
      title: meeting.latest.title,
      points: Array.isArray(meeting.latest.points) ? meeting.latest.points : []
    }));
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
      const bulletPoints = item.points
        .map((point) => `<li class="text-sm leading-6 text-gray-600">${point}</li>`)
        .join("");

      return `
        <article class="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
          <p class="text-xs font-medium uppercase tracking-[0.14em] text-gray-500">${item.ym}</p>
          <h3 class="mt-2 text-base font-semibold text-gray-900">${item.title}</h3>
          <ul class="mt-3 list-disc space-y-1 pl-5">
            ${bulletPoints}
          </ul>
        </article>
      `;
    })
    .join("");

  container.innerHTML = markup;
}

function bindGithubLink() {
  const link = document.getElementById("view-github-link");
  if (!link) {
    return;
  }
  link.href = GITHUB_URL;
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  bindGithubLink();
  renderLatestUpdates();
});
