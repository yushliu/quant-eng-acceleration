const GITHUB_URL = "https://github.com/your-org/your-repo";

const updates = [
  {
    date: "2026-02-03",
    title: "Benchmark harness sync",
    points: [
      "Merged PR standardizing config naming across tracks.",
      "Published baseline timing report for reproducibility checks."
    ]
  },
  {
    date: "2026-01-28",
    title: "Review workflow update",
    points: [
      "Added CI gate for required benchmark metadata fields.",
      "Documented reviewer checklist for experiment notes."
    ]
  },
  {
    date: "2026-01-20",
    title: "Systems notes release",
    points: [
      "Archived implementation notes for CPU and GPU paths.",
      "Recorded known bottlenecks and next measurement plan."
    ]
  }
];

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

  const markup = updates
    .map((item) => {
      const bulletPoints = item.points
        .map((point) => `<li class="text-sm leading-6 text-gray-600">${point}</li>`)
        .join("");

      return `
        <article class="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
          <p class="text-xs font-medium uppercase tracking-[0.14em] text-gray-500">${item.date}</p>
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
