function injectThemeTokens() {
  if (document.getElementById("theme-tokens")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "theme-tokens";
  style.textContent = `
    :root {
      --accent-primary: rgba(59, 130, 246, 0.88);
      --accent-hover: rgba(37, 99, 235, 0.94);
      --accent-tint-bg: #eef3fb;
      --accent-focus: #a5b4fc;
      --glass-border: rgba(255, 255, 255, 0.56);
      --glass-stroke: rgba(148, 163, 184, 0.18);
      --glass-fill: rgba(255, 255, 255, 0.58);
      --glass-fill-strong: rgba(255, 255, 255, 0.72);
      --glass-shadow: 0 14px 34px rgba(15, 23, 42, 0.08), 0 3px 10px rgba(15, 23, 42, 0.04);
      --glass-shadow-soft: 0 10px 24px rgba(15, 23, 42, 0.06), 0 2px 6px rgba(15, 23, 42, 0.035);
    }

    body {
      background-color: var(--accent-tint-bg);
      background-image:
        radial-gradient(circle at top left, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0) 34%),
        radial-gradient(circle at top right, rgba(219, 234, 254, 0.55), rgba(219, 234, 254, 0) 30%),
        linear-gradient(180deg, #f7faff 0%, #eef3fb 52%, #edf2fa 100%);
      background-attachment: fixed;
      color: #1f2937;
    }

    .glass-panel {
      background: linear-gradient(180deg, var(--glass-fill-strong), rgba(255, 255, 255, 0.62));
      border: 1px solid var(--glass-border);
      box-shadow: var(--glass-shadow);
      backdrop-filter: blur(18px) saturate(140%);
      -webkit-backdrop-filter: blur(18px) saturate(140%);
    }

    .glass-subpanel {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.64));
      border: 1px solid rgba(255, 255, 255, 0.7);
      box-shadow: var(--glass-shadow-soft);
      backdrop-filter: blur(14px) saturate(135%);
      -webkit-backdrop-filter: blur(14px) saturate(135%);
    }

    .glass-btn-primary {
      background: linear-gradient(180deg, rgba(59, 130, 246, 0.92), rgba(59, 130, 246, 0.82));
      border-color: rgba(147, 197, 253, 0.62);
      box-shadow: 0 10px 18px rgba(37, 99, 235, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.18);
    }

    .glass-btn-primary:hover {
      background: linear-gradient(180deg, rgba(59, 130, 246, 0.98), rgba(37, 99, 235, 0.9));
      transform: translateY(-1px);
    }

    .glass-btn-secondary {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.74), rgba(255, 255, 255, 0.6));
      border-color: rgba(147, 197, 253, 0.38);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 8px 20px rgba(15, 23, 42, 0.04);
      backdrop-filter: blur(14px) saturate(130%);
      -webkit-backdrop-filter: blur(14px) saturate(130%);
    }

    .glass-btn-secondary:hover {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(255, 255, 255, 0.68));
      transform: translateY(-1px);
    }

    .glass-chip {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(255, 255, 255, 0.62));
      border: 1px solid rgba(148, 163, 184, 0.18);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65);
    }

    .nav-shell {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.68), rgba(255, 255, 255, 0.5));
      border: 1px solid rgba(255, 255, 255, 0.56);
      box-shadow: 0 16px 34px rgba(15, 23, 42, 0.08), 0 3px 10px rgba(15, 23, 42, 0.05);
      backdrop-filter: blur(20px) saturate(145%);
      -webkit-backdrop-filter: blur(20px) saturate(145%);
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .nav-shell::-webkit-scrollbar {
      display: none;
    }

    .nav-item {
      transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 180ms ease;
    }

    .nav-brand {
      flex: 0 0 auto;
    }

    .nav-brand__img {
      display: block;
      height: 2rem;
      width: auto;
      object-fit: contain;
    }

    .nav-item__label {
      max-width: 0;
      opacity: 0;
      margin-left: 0;
      overflow: hidden;
      white-space: nowrap;
      transition: max-width 180ms ease, opacity 140ms ease, margin-left 180ms ease;
    }

    .nav-item:hover .nav-item__label,
    .nav-item:focus-visible .nav-item__label,
    .nav-item[aria-current="page"] .nav-item__label {
      max-width: 72px;
      opacity: 1;
      margin-left: 0.5rem;
    }

    .nav-item[aria-current="page"] {
      background: linear-gradient(180deg, rgba(219, 234, 254, 0.92), rgba(219, 234, 254, 0.78));
      border-color: rgba(147, 197, 253, 0.68);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72), 0 8px 20px rgba(59, 130, 246, 0.12);
      color: #1d4ed8;
    }

    .nav-item:hover:not([aria-current="page"]) {
      background: rgba(255, 255, 255, 0.52);
      border-color: rgba(191, 219, 254, 0.56);
      color: #2563eb;
    }

    @media (max-width: 767px) {
      .nav-shell {
        overflow-x: auto;
        overflow-y: hidden;
      }

      .nav-brand__img {
        height: 1.55rem;
      }

      .nav-item__label {
        max-width: 0;
        opacity: 0;
        margin-left: 0;
      }

      .nav-item[aria-current="page"] .nav-item__label {
        max-width: 72px;
        opacity: 1;
        margin-left: 0.5rem;
      }
    }

    body[data-page="home"] .home-main {
      position: relative;
      padding-bottom: 16vh;
    }

    body[data-page="home"] .home-stage-track {
      position: relative;
      min-height: calc(var(--home-stage-height, 46rem) + 320svh);
      padding-top: 0.75rem;
      scroll-margin-top: 5.75rem;
    }

    body[data-page="home"] .home-stage-track::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 2rem;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0) 18%),
        linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(148, 163, 184, 0.04));
      opacity: 0.72;
      pointer-events: none;
    }

    body[data-page="home"] .home-stage {
      position: sticky;
      top: 6.15rem;
      min-height: var(--home-stage-height, 46rem);
      height: var(--home-stage-height, 46rem);
      overflow: hidden;
      isolation: isolate;
    }

    body[data-page="home"] .home-stage-section {
      position: absolute;
      inset: 0;
      display: grid;
      align-content: start;
      gap: 1.75rem;
      transform: translate3d(0, var(--stage-translate, 0px), 0) scale(var(--stage-scale, 1));
      transform-origin: center top;
      opacity: var(--stage-opacity, 1);
      filter: saturate(var(--stage-saturate, 1));
      will-change: transform, opacity;
      transition: transform 120ms linear, opacity 120ms linear, filter 120ms linear;
      pointer-events: none;
    }

    body[data-page="home"] .home-stage-section[data-stage-interactive="true"] {
      pointer-events: auto;
    }

    body[data-page="home"] .home-stage-section__stack {
      align-content: start;
    }

    @media (max-width: 1023px) {
      body[data-page="home"] .home-main {
        padding-bottom: 0;
      }

      body[data-page="home"] .home-stage-track {
        min-height: auto;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }

      body[data-page="home"] .home-stage {
        position: relative;
        top: auto;
        min-height: auto;
        height: auto;
        overflow: visible;
        display: grid;
        gap: 1.5rem;
      }

      body[data-page="home"] .home-stage-section {
        position: relative;
        inset: auto;
        transform: none;
        opacity: 1;
        filter: none;
        pointer-events: auto;
      }
    }
  `;
  document.head.appendChild(style);
}

function getNavIcon(key) {
  const icons = {
    home: `
      <svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4">
        <path d="M4 11.5 12 5l8 6.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
        <path d="M7.5 10.5V19h9v-8.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
      </svg>
    `,
    team: `
      <svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4">
        <path d="M8.5 11.2a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4Zm7 0a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z" fill="none" stroke="currentColor" stroke-width="1.8"/>
        <path d="M4.8 18.2c.5-2.2 2.3-3.5 4.7-3.5s4.2 1.3 4.7 3.5M14.2 18.2c.4-1.7 1.7-2.8 3.6-2.8 1 0 1.8.2 2.4.7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.8"/>
      </svg>
    `,
    plan: `
      <svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4">
        <path d="M6 6.5h12M6 12h8M6 17.5h6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.8"/>
        <path d="M17.2 15.3 19 17l-3.8 3.8H13.4V19l3.8-3.7Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.4"/>
      </svg>
    `,
    download: `
      <svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4">
        <path d="M12 5.5v8.5M8.7 10.9 12 14.2l3.3-3.3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
        <path d="M5.5 18.5h13" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.8"/>
      </svg>
    `,
    release: `
      <svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4">
        <rect x="5.5" y="6" width="13" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/>
        <path d="M8.5 10.2h7M8.5 13.2h5.2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.8"/>
      </svg>
    `
  };
  return icons[key] || icons.release;
}

function renderSiteHeader() {
  injectThemeTokens();

  const host = document.getElementById("site-header");
  const config = window.SITE_CONFIG;

  if (!host || !config || !Array.isArray(config.nav)) {
    return;
  }

  const currentPage = document.body?.dataset?.page || "";
  const logoPath = "./data/logo.PNG";
  const navItems = config.nav
    .map((item) => {
      const isActive = item.key === currentPage;
      const activeAttrs = isActive ? ' aria-current="page"' : "";
      return `
        <li>
          <a href="${item.href}"${activeAttrs} aria-label="${item.label}" class="nav-item inline-flex items-center rounded-full border border-transparent px-3 py-2 text-sm font-medium text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300">
            <span class="inline-flex h-4 w-4 items-center justify-center text-current">${getNavIcon(item.key)}</span>
            <span class="nav-item__label">${item.label}</span>
          </a>
        </li>
      `;
    })
    .join("");

  host.className = "fixed inset-x-0 top-0 z-50";
  host.innerHTML = `
    <div class="mx-auto max-w-[1100px] px-4 sm:px-6">
      <div class="relative min-h-[5rem] pt-4">
        <nav id="primary-nav" aria-label="Primary" class="absolute left-0 right-0 top-3 md:top-4 md:left-1/2 md:right-auto md:w-auto md:-translate-x-1/2">
          <ul class="nav-shell mx-auto flex w-full min-w-0 items-center gap-0.5 rounded-[1.4rem] px-2 py-2 sm:w-auto sm:max-w-fit">
            <li class="nav-brand px-2 py-1 md:pr-2">
              <a href="./index.html" aria-label="Quantitative Engineering Acceleration Club home" class="inline-flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300">
                <img src="${logoPath}" alt="QEAC logo" class="nav-brand__img" />
              </a>
            </li>
            ${navItems}
          </ul>
        </nav>
      </div>
    </div>
  `;
}

function renderSiteFooter() {
  const config = window.SITE_CONFIG || {};
  const text = String(config.footerDisclaimer || "").trim();
  if (!text) {
    return;
  }

  const footerParagraph = document.querySelector("footer p");
  if (!footerParagraph) {
    return;
  }

  footerParagraph.textContent = text;
}

renderSiteHeader();
renderSiteFooter();
