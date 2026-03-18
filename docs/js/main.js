function initMobileNav() {
  return;
}

const AT_A_GLANCE_SLIDES = [
  {
    title: "Core Focus",
    body: "Reproducible implementation, benchmarking, and structured comparison."
  },
  {
    title: "Project Style",
    body: "Algorithm, infrastructure, and package-oriented build lines."
  },
  {
    title: "Where to Start",
    body: "Start with Projects, then Team, and use legacy pages only for deeper operational context."
  }
];

function renderHomePage() {
  if (!document.body || document.body.dataset.page !== "home") {
    return;
  }
}

function initAtAGlanceCarousel() {
  if (!document.body || document.body.dataset.page !== "home") {
    return;
  }

  const host = document.getElementById("at-a-glance-carousel");
  const titleEl = document.getElementById("glance-slide-title");
  const bodyEl = document.getElementById("glance-slide-body");
  const contentEl = document.getElementById("glance-slide-content");
  const prevBtn = document.getElementById("glance-prev");
  const nextBtn = document.getElementById("glance-next");
  const dotsWrap = document.getElementById("glance-dots");
  const dots = Array.from(dotsWrap?.querySelectorAll("[data-glance-dot]") || []);

  if (!host || !titleEl || !bodyEl || !contentEl || !prevBtn || !nextBtn || dots.length !== AT_A_GLANCE_SLIDES.length) {
    return;
  }

  let activeIndex = 0;
  let intervalId = null;
  let hoverPaused = false;
  let userPaused = false;

  function renderDots(index) {
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === index;
      dot.setAttribute("aria-selected", isActive ? "true" : "false");
      dot.classList.toggle("bg-indigo-500/70", isActive);
      dot.classList.toggle("bg-slate-300/80", !isActive);
    });
  }

  function updateSlideText(index) {
    const slide = AT_A_GLANCE_SLIDES[index];
    if (!slide) {
      return;
    }
    titleEl.textContent = slide.title;
    bodyEl.textContent = slide.body;
  }

  function animateSlideChange(direction, nextIndex) {
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const slide = AT_A_GLANCE_SLIDES[nextIndex];
    if (!slide) {
      return;
    }

    if (!direction || direction === "none" || reduceMotion) {
      updateSlideText(nextIndex);
      return;
    }

    const outX = direction === "backward" ? 16 : -16;
    const inX = direction === "backward" ? -16 : 16;

    contentEl.getAnimations().forEach((animation) => animation.cancel());
    const outAnimation = contentEl.animate(
      [
        { opacity: 1, transform: "translateX(0)" },
        { opacity: 0, transform: `translateX(${outX}px)` }
      ],
      {
        duration: 170,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        fill: "forwards"
      }
    );

    outAnimation.onfinish = () => {
      updateSlideText(nextIndex);
      contentEl.animate(
        [
          { opacity: 0, transform: `translateX(${inX}px)` },
          { opacity: 1, transform: "translateX(0)" }
        ],
        {
          duration: 220,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards"
        }
      );
    };
  }

  function stopAutoplay() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function startAutoplay() {
    if (userPaused || hoverPaused || intervalId) {
      return;
    }
    intervalId = window.setInterval(() => {
      const nextIndex = (activeIndex + 1) % AT_A_GLANCE_SLIDES.length;
      renderDots(nextIndex);
      animateSlideChange("forward", nextIndex);
      activeIndex = nextIndex;
    }, 5000);
  }

  function goTo(index, direction = "none", fromUser = false) {
    const nextIndex = (index + AT_A_GLANCE_SLIDES.length) % AT_A_GLANCE_SLIDES.length;
    renderDots(nextIndex);
    animateSlideChange(direction, nextIndex);
    activeIndex = nextIndex;
    if (fromUser) {
      userPaused = true;
      stopAutoplay();
    }
  }

  prevBtn.addEventListener("click", () => goTo(activeIndex - 1, "backward", true));
  nextBtn.addEventListener("click", () => goTo(activeIndex + 1, "forward", true));

  dotsWrap?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const dot = target.closest("[data-glance-dot]");
    if (!dot) {
      return;
    }
    const index = Number(dot.getAttribute("data-glance-dot"));
    if (Number.isFinite(index)) {
      const direction = index > activeIndex ? "forward" : index < activeIndex ? "backward" : "none";
      goTo(index, direction, true);
    }
  });

  host.addEventListener("mouseenter", () => {
    hoverPaused = true;
    stopAutoplay();
  });
  host.addEventListener("mouseleave", () => {
    hoverPaused = false;
    startAutoplay();
  });

  renderDots(activeIndex);
  updateSlideText(activeIndex);
  startAutoplay();
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  renderHomePage();
  initAtAGlanceCarousel();
});
