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

function initHomeStageTransitions() {
  if (!document.body || document.body.dataset.page !== "home") {
    return;
  }

  const track = document.querySelector(".home-stage-track");
  const stage = document.querySelector(".home-stage");
  const sections = Array.from(document.querySelectorAll(".home-stage-section"));
  if (!track || !stage || !sections.length) {
    return;
  }

  const enableQuery = window.matchMedia("(min-width: 1024px)");
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const sectionTargets = [0.08, 0.56, 0.94];
  const sectionPhases = [
    { holdStart: 0, holdEnd: 0.22, exitEnd: 0.5 },
    { enterStart: 0.22, enterEnd: 0.5, holdStart: 0.5, holdEnd: 0.68, exitEnd: 0.88 },
    { enterStart: 0.68, enterEnd: 0.88, holdStart: 0.88, holdEnd: 1 }
  ];
  let ticking = false;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function normalizeProgress(value, start, end) {
    if (end <= start) {
      return value >= end ? 1 : 0;
    }
    return clamp((value - start) / (end - start), 0, 1);
  }

  function getStageMetrics() {
    const viewportHeight = window.innerHeight || 1;
    const rect = track.getBoundingClientRect();
    const stickyTop = Math.min(104, viewportHeight * 0.115);
    const totalRange = Math.max(track.offsetHeight - viewportHeight + stickyTop, 1);
    return { viewportHeight, rect, stickyTop, totalRange };
  }

  function setInteractiveSection(activeIndex) {
    sections.forEach((section, index) => {
      const interactive = index === activeIndex;
      section.dataset.stageInteractive = interactive ? "true" : "false";
      section.toggleAttribute("inert", !interactive);
      if (!interactive) {
        section.setAttribute("aria-hidden", "true");
      } else {
        section.removeAttribute("aria-hidden");
      }
    });
  }

  function resetSections() {
    track.style.removeProperty("--home-stage-height");
    sections.forEach((section) => {
      section.style.removeProperty("--stage-translate");
      section.style.removeProperty("--stage-scale");
      section.style.removeProperty("--stage-opacity");
      section.style.removeProperty("--stage-saturate");
      section.style.removeProperty("z-index");
      if (!enableQuery.matches || reduceMotionQuery.matches) {
        section.dataset.stageInteractive = "true";
        section.removeAttribute("inert");
        section.removeAttribute("aria-hidden");
      }
    });
  }

  function syncStageHeight() {
    const previousHeight = stage.style.height;
    const previousMinHeight = stage.style.minHeight;
    stage.style.height = "auto";
    stage.style.minHeight = "auto";

    const stageHeight = sections.reduce((maxHeight, section) => Math.max(maxHeight, section.scrollHeight), 0);
    const resolvedHeight = Math.max(stageHeight, 640);
    track.style.setProperty("--home-stage-height", `${resolvedHeight}px`);
    stage.style.height = previousHeight;
    stage.style.minHeight = previousMinHeight;
  }

  function updateSections() {
    ticking = false;

    if (!enableQuery.matches || reduceMotionQuery.matches) {
      resetSections();
      return;
    }

    syncStageHeight();

    const { viewportHeight, rect, stickyTop, totalRange } = getStageMetrics();
    const scrolled = Math.min(Math.max(-rect.top + stickyTop, 0), totalRange);
    const overallProgress = Math.min(Math.max(scrolled / totalRange, 0), 1);
    const activeIndex =
      overallProgress < sectionPhases[0].exitEnd
        ? overallProgress < sectionPhases[1].holdStart
          ? 0
          : 1
        : overallProgress < sectionPhases[1].exitEnd
          ? 1
          : 2;

    setInteractiveSection(activeIndex);

    sections.forEach((section, index) => {
      let translate = 0;
      let scale = 1;
      let opacity = 1;
      let saturate = 1;
      let zIndex = sections.length - index;

      if (index === 0) {
        if (overallProgress <= sectionPhases[0].holdEnd) {
          zIndex = 5;
        } else if (overallProgress <= sectionPhases[0].exitEnd) {
          const exitProgress = normalizeProgress(
            overallProgress,
            sectionPhases[0].holdEnd,
            sectionPhases[0].exitEnd
          );
          translate = exitProgress * viewportHeight * -0.26;
          scale = 1 - (exitProgress * 0.04);
          opacity = 1 - (exitProgress * 0.24);
          saturate = 1 - (exitProgress * 0.07);
          zIndex = 5;
        } else {
          translate = viewportHeight * -0.28;
          scale = 0.96;
          opacity = 0;
          saturate = 0.93;
          zIndex = 1;
        }
      } else if (index === 1) {
        if (overallProgress <= sectionPhases[1].enterStart) {
          translate = viewportHeight * 0.14;
          scale = 0.99;
          opacity = 0;
          saturate = 0.95;
          zIndex = 2;
        } else if (overallProgress <= sectionPhases[1].enterEnd) {
          const enterProgress = normalizeProgress(
            overallProgress,
            sectionPhases[1].enterStart,
            sectionPhases[1].enterEnd
          );
          translate = (1 - enterProgress) * viewportHeight * 0.14;
          scale = 0.99 + (enterProgress * 0.01);
          opacity = 0.18 + (enterProgress * 0.82);
          saturate = 0.95 + (enterProgress * 0.05);
          zIndex = 4;
        } else if (overallProgress <= sectionPhases[1].holdEnd) {
          zIndex = 5;
        } else if (overallProgress <= sectionPhases[1].exitEnd) {
          const exitProgress = normalizeProgress(
            overallProgress,
            sectionPhases[1].holdEnd,
            sectionPhases[1].exitEnd
          );
          translate = exitProgress * viewportHeight * -0.24;
          scale = 1 - (exitProgress * 0.038);
          opacity = 1 - (exitProgress * 0.26);
          saturate = 1 - (exitProgress * 0.08);
          zIndex = 5;
        } else {
          translate = viewportHeight * -0.26;
          scale = 0.962;
          opacity = 0;
          saturate = 0.92;
          zIndex = 1;
        }
      } else {
        if (overallProgress <= sectionPhases[2].enterStart) {
          translate = viewportHeight * 0.12;
          scale = 0.992;
          opacity = 0;
          saturate = 0.96;
          zIndex = 1;
        } else if (overallProgress <= sectionPhases[2].enterEnd) {
          const enterProgress = normalizeProgress(
            overallProgress,
            sectionPhases[2].enterStart,
            sectionPhases[2].enterEnd
          );
          translate = (1 - enterProgress) * viewportHeight * 0.12;
          scale = 0.992 + (enterProgress * 0.008);
          opacity = 0.16 + (enterProgress * 0.84);
          saturate = 0.96 + (enterProgress * 0.04);
          zIndex = 4;
        } else {
          zIndex = 6;
        }
      }

      section.style.setProperty("--stage-translate", `${translate.toFixed(2)}px`);
      section.style.setProperty("--stage-scale", scale.toFixed(4));
      section.style.setProperty("--stage-opacity", opacity.toFixed(4));
      section.style.setProperty("--stage-saturate", saturate.toFixed(4));
      section.style.setProperty("z-index", String(zIndex));
    });
  }

  function scrollToSection(index) {
    if (!enableQuery.matches || reduceMotionQuery.matches) {
      return;
    }

    syncStageHeight();
    const { rect, stickyTop, totalRange } = getStageMetrics();
    const sectionProgress = sectionTargets[index] ?? 0;
    const absoluteTop = window.scrollY + rect.top;
    const targetY = absoluteTop - stickyTop + (totalRange * sectionProgress);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }

  function handleStageHash(hash) {
    if (!hash || !enableQuery.matches || reduceMotionQuery.matches) {
      return false;
    }

    const target = document.querySelector(hash);
    if (!target) {
      return false;
    }

    const targetSection = target.closest(".home-stage-section");
    if (!targetSection) {
      return false;
    }

    const index = sections.indexOf(targetSection);
    if (index < 0) {
      return false;
    }

    scrollToSection(index);
    return true;
  }

  function requestUpdate() {
    if (ticking) {
      return;
    }
    ticking = true;
    window.requestAnimationFrame(updateSections);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  if (typeof enableQuery.addEventListener === "function") {
    enableQuery.addEventListener("change", requestUpdate);
    reduceMotionQuery.addEventListener("change", requestUpdate);
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) {
      return;
    }

    const href = link.getAttribute("href");
    if (!href || href === "#") {
      return;
    }

    if (handleStageHash(href)) {
      event.preventDefault();
      history.replaceState(null, "", href);
    }
  });

  requestUpdate();

  if (window.location.hash) {
    window.requestAnimationFrame(() => {
      handleStageHash(window.location.hash);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  renderHomePage();
  initHomeStageTransitions();
});
