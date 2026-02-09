function injectThemeTokens() {
  if (document.getElementById("theme-tokens")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "theme-tokens";
  style.textContent = `
    :root {
      --accent-primary: #3B82F6;
      --accent-hover: #2563EB;
      --accent-tint-bg: #EFF6FF;
      --accent-focus: #A5B4FC;
    }

    body {
      background-color: var(--accent-tint-bg);
      color: #1f2937;
    }
  `;
  document.head.appendChild(style);
}

function renderSiteHeader() {
  injectThemeTokens();

  const host = document.getElementById("site-header");
  const config = window.SITE_CONFIG;

  if (!host || !config || !Array.isArray(config.nav)) {
    return;
  }

  const currentPage = document.body?.dataset?.page || "";
  const navItems = config.nav
    .map((item) => {
      const isActive = item.key === currentPage;
      const activeAttrs = isActive ? ' aria-current="page"' : "";
      const colorClass = isActive
        ? "border border-blue-200 bg-blue-50 text-blue-500"
        : "text-gray-600 hover:text-blue-600";

      return `<li><a href="${item.href}"${activeAttrs} class="inline-flex rounded-md px-3 py-2 text-sm font-medium transition ${colorClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300">${item.label}</a></li>`;
    })
    .join("");

  host.className = "fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-gray-100/95 backdrop-blur-sm";
  host.innerHTML = `
    <div class="mx-auto max-w-[1100px] px-4 sm:px-6">
      <div class="relative flex min-h-16 items-center justify-between py-2">
        <a href="./index.html" class="text-sm font-semibold tracking-tight text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300">
          ${config.brand}
        </a>

        <button id="mobile-menu-button" type="button" aria-label="Toggle navigation" class="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-blue-600 shadow-sm transition hover:border-blue-500 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300 md:hidden" aria-controls="primary-nav" aria-expanded="false">
          Menu
        </button>

        <nav id="primary-nav" aria-label="Primary" class="hidden absolute inset-x-0 top-full md:block md:w-auto md:inset-auto md:top-auto md:absolute md:left-1/2 md:-translate-x-1/2">
          <ul class="mt-3 flex flex-col gap-1 rounded-md border border-gray-200 bg-gray-50 p-2 shadow-sm md:mt-0 md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none">
            ${navItems}
          </ul>
        </nav>
      </div>
    </div>
  `;
}

renderSiteHeader();
