function getMeetingData() {
  return Array.isArray(window.COMMUNITY_MEETINGS) ? window.COMMUNITY_MEETINGS : [];
}

function getReleaseData() {
  return Array.isArray(window.RELEASES_DATA) ? window.RELEASES_DATA : [];
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

function sortByRecency(items, getKey) {
  return [...items].sort((a, b) => String(getKey(b) || "").localeCompare(String(getKey(a) || "")));
}

function getLatestPlanMeeting() {
  const meetings = getMeetingData().filter((meeting) => meeting && meeting.id && meeting.detail);
  return sortByRecency(meetings, (meeting) => meeting.latest?.date || meeting.ym || meeting.id)[0] || null;
}

function getLatestRelease() {
  const releases = getReleaseData();
  return sortByRecency(releases, (release) => release.date || release.version || release.id)[0] || null;
}

function getNextStepText(meeting) {
  const cards = Array.isArray(meeting?.detail?.cards) ? meeting.detail.cards : [];
  const nextCard = cards.find((card) => /next step/i.test(String(card?.heading || "")));
  const firstBullet = Array.isArray(nextCard?.bullets) ? nextCard.bullets[0] : "";
  return firstBullet || "Continue the current benchmark workflow and publish the next structured update.";
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = value;
  }
}

function setHref(id, href) {
  const el = document.getElementById(id);
  if (el) {
    el.href = href;
  }
}

function renderHomePage() {
  if (!document.body || document.body.dataset.page !== "home") {
    return;
  }

  const latestMeeting = getLatestPlanMeeting();
  const latestRelease = getLatestRelease();

  setText(
    "hero-current-focus",
    latestMeeting ? `${latestMeeting.ym} · ${latestMeeting.status}` : "Current benchmark stage summary will appear here."
  );
  setText(
    "hero-workstreams",
    "Implementation, benchmarking, and structured comparison across active club work."
  );
  setText(
    "hero-latest-outcome",
    latestRelease ? `${latestRelease.title} · ${latestRelease.version}` : "Curated benchmark outcomes are published through the Release page."
  );

  setText(
    "snapshot-stage",
    latestMeeting ? `${latestMeeting.ym} · ${latestMeeting.status}` : "Current stage information will appear here."
  );
  setText(
    "snapshot-focus",
    latestMeeting?.latest?.title || "Algorithm implementation and reproducible comparison work."
  );
  setText("snapshot-next", latestMeeting ? getNextStepText(latestMeeting) : "Next direction will appear once a new meeting summary is available.");
  setText(
    "snapshot-release",
    latestRelease ? `${latestRelease.title} · ${latestRelease.status}` : "No curated release has been published yet."
  );

  if (latestRelease) {
    setText("featured-work-title", latestRelease.title);
    setText("featured-work-meta", `${latestRelease.category} · ${latestRelease.version} · ${latestRelease.status}`);
    setText("featured-work-summary", latestRelease.summary);
    setText("featured-work-scope", Array.isArray(latestRelease.scope) ? latestRelease.scope[0] : latestRelease.overview);
    setText("featured-work-next", latestRelease.next || "Review the release and reuse its benchmark structure in later work.");
    if (Array.isArray(latestRelease.evidence) && latestRelease.evidence[0]?.href) {
      setHref("featured-work-link", latestRelease.evidence[0].href);
    }
  } else {
    setText("featured-work-meta", "");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  renderHomePage();
});
