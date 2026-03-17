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
      --accent-tint-bg: #e5ebf3;
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
        radial-gradient(circle at top left, rgba(255, 255, 255, 0.68), rgba(255, 255, 255, 0) 32%),
        radial-gradient(circle at top right, rgba(214, 226, 243, 0.42), rgba(214, 226, 243, 0) 28%),
        linear-gradient(180deg, #f0f4fa 0%, #e5ebf3 52%, #e2e8f1 100%);
      background-attachment: fixed;
      color: #1f2937;
    }

    .page-stage-shell {
      position: relative;
      z-index: 0;
      min-height: var(--page-stage-height, auto);
    }

    .page-stage {
      position: relative;
      transform: translateX(0);
      transform-origin: center top;
      opacity: 1;
      transition:
        transform 340ms cubic-bezier(0.22, 1, 0.36, 1),
        opacity 260ms ease;
      will-change: transform, opacity;
      backface-visibility: hidden;
      contain: layout paint;
    }

    .page-stage--pre-enter-forward {
      transform: translateX(52px);
      opacity: 0;
    }

    .page-stage--pre-enter-backward {
      transform: translateX(-52px);
      opacity: 0;
    }

    .page-stage--enter-active {
      transform: translateX(0);
      opacity: 1;
    }

    .page-stage--exit-forward {
      transform: translateX(-56px);
      opacity: 0.24;
      pointer-events: none;
    }

    .page-stage--exit-backward {
      transform: translateX(56px);
      opacity: 0.24;
      pointer-events: none;
    }

    @media (max-width: 767px) {
      .page-stage--pre-enter-forward {
        transform: translateX(28px);
      }

      .page-stage--pre-enter-backward {
        transform: translateX(-28px);
      }

      .page-stage--exit-forward {
        transform: translateX(-30px);
      }

      .page-stage--exit-backward {
        transform: translateX(30px);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .page-stage {
        transition: none;
      }
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
      position: relative;
      isolation: isolate;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.08) 48%, rgba(255, 255, 255, 0.03) 100%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.02) 100%);
      border: 1px solid rgba(255, 255, 255, 0.68);
      box-shadow:
        0 30px 70px rgba(15, 23, 42, 0.11),
        0 14px 30px rgba(15, 23, 42, 0.06),
        0 2px 8px rgba(255, 255, 255, 0.16),
        inset 0 1px 0 rgba(255, 255, 255, 0.86),
        inset 0 2px 0 rgba(255, 255, 255, 0.34),
        inset 0 -1px 0 rgba(148, 163, 184, 0.2),
        inset 0 -8px 14px rgba(148, 163, 184, 0.1),
        inset 0 0 0 1px rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(50px) saturate(225%);
      -webkit-backdrop-filter: blur(50px) saturate(225%);
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .nav-shell::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.46) 0%, rgba(255, 255, 255, 0.12) 24%, rgba(255, 255, 255, 0) 46%),
        linear-gradient(0deg, rgba(148, 163, 184, 0.14) 0%, rgba(148, 163, 184, 0) 22%);
      box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.24),
        inset 0 -1px 0 rgba(148, 163, 184, 0.2);
      opacity: 0.9;
    }

    .nav-shell::-webkit-scrollbar {
      display: none;
    }

    .nav-item {
      color: rgba(71, 85, 105, 0.88);
      transition:
        background-color 180ms ease,
        border-color 180ms ease,
        color 180ms ease,
        box-shadow 180ms ease;
    }

    .nav-brand {
      flex: 0 0 auto;
    }

    .nav-brand__img {
      display: block;
      height: 2rem;
      width: auto;
      object-fit: contain;
      filter: saturate(1.02) contrast(1.06);
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
      background:
        linear-gradient(180deg, rgba(219, 234, 254, 0.72), rgba(191, 219, 254, 0.34)),
        linear-gradient(180deg, rgba(255, 255, 255, 0.32), rgba(255, 255, 255, 0.04));
      border-color: rgba(147, 197, 253, 0.52);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.72),
        inset 0 -1px 0 rgba(147, 197, 253, 0.14),
        0 8px 20px rgba(59, 130, 246, 0.14);
      color: rgba(37, 99, 235, 0.96);
    }

    .nav-item:hover:not([aria-current="page"]) {
      background: rgba(255, 255, 255, 0.34);
      border-color: rgba(255, 255, 255, 0.34);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.34),
        0 4px 12px rgba(15, 23, 42, 0.04);
      color: rgba(37, 99, 235, 0.82);
    }

    .nav-item:focus-visible {
      background: rgba(255, 255, 255, 0.28);
      border-color: rgba(191, 219, 254, 0.38);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.24),
        0 0 0 2px rgba(165, 180, 252, 0.18);
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

    .home-stage-surface {
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.58), rgba(255, 255, 255, 0.3)),
        linear-gradient(180deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.05));
      border: 1px solid rgba(255, 255, 255, 0.68);
      box-shadow:
        0 28px 58px rgba(15, 23, 42, 0.09),
        0 10px 24px rgba(15, 23, 42, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.76),
        inset 0 12px 18px rgba(255, 255, 255, 0.1),
        inset 0 -1px 0 rgba(148, 163, 184, 0.08);
      backdrop-filter: blur(30px) saturate(170%);
      -webkit-backdrop-filter: blur(30px) saturate(170%);
    }

    body[data-page="home"] .home-card-hero {
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.36)),
        linear-gradient(180deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.06));
      border-color: rgba(255, 255, 255, 0.74);
      box-shadow:
        0 34px 72px rgba(15, 23, 42, 0.12),
        0 14px 30px rgba(15, 23, 42, 0.06),
        inset 0 1px 0 rgba(255, 255, 255, 0.82),
        inset 0 10px 18px rgba(255, 255, 255, 0.12),
        inset 0 -1px 0 rgba(148, 163, 184, 0.1);
    }

    body[data-page="home"] .home-card-overview {
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.62), rgba(255, 255, 255, 0.34)),
        linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.04));
      border-color: rgba(255, 255, 255, 0.68);
      box-shadow:
        0 26px 54px rgba(15, 23, 42, 0.09),
        0 10px 22px rgba(15, 23, 42, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.76),
        inset 0 -1px 0 rgba(148, 163, 184, 0.08);
    }

    body[data-page="home"] .home-card-explore {
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.64), rgba(255, 255, 255, 0.35)),
        linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
      border-color: rgba(255, 255, 255, 0.7);
      box-shadow:
        0 30px 64px rgba(15, 23, 42, 0.1),
        0 12px 26px rgba(15, 23, 42, 0.055),
        inset 0 1px 0 rgba(255, 255, 255, 0.8),
        inset 0 -1px 0 rgba(148, 163, 184, 0.09);
    }

    body[data-page="home"] .home-card-explore .glass-subpanel {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.66));
      border-color: rgba(255, 255, 255, 0.72);
      box-shadow:
        0 12px 24px rgba(15, 23, 42, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(12px) saturate(130%);
      -webkit-backdrop-filter: blur(12px) saturate(130%);
    }

    body[data-page="home"] .home-card-support {
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.56), rgba(255, 255, 255, 0.3)),
        linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.04));
      border-color: rgba(255, 255, 255, 0.64);
      box-shadow:
        0 24px 50px rgba(15, 23, 42, 0.08),
        0 8px 18px rgba(15, 23, 42, 0.045),
        inset 0 1px 0 rgba(255, 255, 255, 0.74);
    }

    body[data-page="team"] .team-workflow-grid {
      position: relative;
      z-index: 1;
    }

    body[data-page="team"] .team-workflow-marker {
      display: inline-flex;
      align-items: center;
    }

    body[data-page="team"] .team-workflow-marker__label {
      align-items: center;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(255, 255, 255, 0.64));
      border: 1px solid rgba(148, 163, 184, 0.26);
      border-radius: 999px;
      color: rgba(71, 85, 105, 0.9);
      display: inline-flex;
      font-size: 0.69rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      padding: 0.22rem 0.62rem;
      text-transform: uppercase;
    }

    body[data-page="team"] .team-workflow-card {
      border-color: rgba(255, 255, 255, 0.72);
      box-shadow:
        0 14px 28px rgba(15, 23, 42, 0.055),
        inset 0 1px 0 rgba(255, 255, 255, 0.74);
    }

    body[data-page="home"] .glass-btn-primary {
      position: relative;
      isolation: isolate;
      background:
        linear-gradient(180deg, rgba(125, 180, 255, 0.56) 0%, rgba(59, 130, 246, 0.7) 44%, rgba(37, 99, 235, 0.78) 100%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.26) 0%, rgba(255, 255, 255, 0.02) 100%);
      border-color: rgba(191, 219, 254, 0.72);
      box-shadow:
        0 14px 28px rgba(37, 99, 235, 0.2),
        0 5px 12px rgba(15, 23, 42, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.66),
        inset 0 2px 0 rgba(255, 255, 255, 0.3),
        inset 0 -1px 0 rgba(30, 64, 175, 0.3),
        inset 0 -8px 12px rgba(30, 64, 175, 0.18);
      backdrop-filter: blur(16px) saturate(160%);
      -webkit-backdrop-filter: blur(16px) saturate(160%);
    }

    body[data-page="home"] .glass-btn-primary:hover {
      background:
        linear-gradient(180deg, rgba(147, 197, 253, 0.62) 0%, rgba(59, 130, 246, 0.76) 44%, rgba(37, 99, 235, 0.84) 100%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.03) 100%);
      border-color: rgba(191, 219, 254, 0.78);
      box-shadow:
        0 18px 30px rgba(37, 99, 235, 0.22),
        0 6px 14px rgba(15, 23, 42, 0.11),
        inset 0 1px 0 rgba(255, 255, 255, 0.72),
        inset 0 -1px 0 rgba(30, 64, 175, 0.34);
    }

    body[data-page="home"] .glass-btn-secondary {
      position: relative;
      isolation: isolate;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.64) 0%, rgba(255, 255, 255, 0.36) 58%, rgba(255, 255, 255, 0.22) 100%),
        linear-gradient(180deg, rgba(219, 234, 254, 0.22) 0%, rgba(219, 234, 254, 0.04) 100%);
      border-color: rgba(191, 219, 254, 0.54);
      box-shadow:
        0 10px 22px rgba(15, 23, 42, 0.07),
        0 3px 10px rgba(15, 23, 42, 0.045),
        inset 0 1px 0 rgba(255, 255, 255, 0.82),
        inset 0 2px 0 rgba(255, 255, 255, 0.34),
        inset 0 -1px 0 rgba(148, 163, 184, 0.24),
        inset 0 -8px 12px rgba(148, 163, 184, 0.1);
      backdrop-filter: blur(16px) saturate(148%);
      -webkit-backdrop-filter: blur(16px) saturate(148%);
    }

    body[data-page="home"] .glass-btn-secondary:hover {
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.44) 58%, rgba(255, 255, 255, 0.28) 100%),
        linear-gradient(180deg, rgba(219, 234, 254, 0.26) 0%, rgba(219, 234, 254, 0.06) 100%);
      border-color: rgba(191, 219, 254, 0.62);
      box-shadow:
        0 12px 24px rgba(15, 23, 42, 0.08),
        0 4px 10px rgba(15, 23, 42, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.88),
        inset 0 -1px 0 rgba(148, 163, 184, 0.28);
    }

    body[data-page="plan"] .plan-major-panel {
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.62), rgba(255, 255, 255, 0.38)),
        linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.04));
      border: 1px solid rgba(255, 255, 255, 0.64);
      box-shadow:
        0 24px 54px rgba(15, 23, 42, 0.09),
        0 10px 24px rgba(15, 23, 42, 0.045),
        inset 0 1px 0 rgba(255, 255, 255, 0.72),
        inset 0 10px 16px rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(26px) saturate(162%);
      -webkit-backdrop-filter: blur(26px) saturate(162%);
    }

    body[data-page="plan"] .plan-motion-viewport {
      position: relative;
      overflow: hidden;
    }

    body[data-page="plan"] .plan-motion-layer {
      position: relative;
    }

    body[data-page="plan"] .plan-motion-pane {
      width: 100%;
    }

    body[data-page="plan"] .plan-motion-viewport.is-animating {
      overflow: hidden;
    }

    body[data-page="plan"] .plan-motion-viewport.is-animating > .plan-motion-pane {
      left: 0;
      position: absolute;
      top: 0;
    }

    body[data-page="plan"] .plan-segmented {
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.44), rgba(255, 255, 255, 0.2)),
        linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.04));
      border: 1px solid rgba(255, 255, 255, 0.56);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.62),
        0 8px 20px rgba(15, 23, 42, 0.035);
      backdrop-filter: blur(20px) saturate(155%);
      -webkit-backdrop-filter: blur(20px) saturate(155%);
    }

    body[data-page="plan"] .plan-segmented__button {
      color: rgba(71, 85, 105, 0.88);
      transition:
        background-color 180ms ease,
        border-color 180ms ease,
        color 180ms ease,
        box-shadow 180ms ease,
        transform 180ms ease;
    }

    body[data-page="plan"] .plan-segmented__button:hover:not([data-active="true"]) {
      background: rgba(255, 255, 255, 0.32);
      color: rgba(37, 99, 235, 0.82);
    }

    body[data-page="plan"] .plan-segmented__button[data-active="true"] {
      background:
        linear-gradient(180deg, rgba(219, 234, 254, 0.74), rgba(191, 219, 254, 0.34)),
        linear-gradient(180deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.05));
      border-color: rgba(147, 197, 253, 0.52);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.74),
        inset 0 -1px 0 rgba(147, 197, 253, 0.14),
        0 8px 20px rgba(59, 130, 246, 0.14);
      color: rgba(37, 99, 235, 0.96);
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

function getTopLevelPageOrder() {
  const config = window.SITE_CONFIG;
  return Array.isArray(config?.nav) ? config.nav : [];
}

function normalizeTopLevelPath(href) {
  try {
    const url = new URL(href, window.location.href);
    const normalized = url.pathname.replace(/\/+$/, "");
    return normalized || "/";
  } catch {
    return "";
  }
}

function getTopLevelPageMatch(href) {
  const pages = getTopLevelPageOrder();
  const targetPath = normalizeTopLevelPath(href);
  if (!targetPath) {
    return null;
  }

  const index = pages.findIndex((item) => normalizeTopLevelPath(item.href) === targetPath);
  if (index < 0) {
    return null;
  }

  return { ...pages[index], index };
}

function ensurePageStage() {
  const body = document.body;
  if (!body) {
    return null;
  }

  const existing = body.querySelector(":scope > .page-stage-shell > .page-stage");
  if (existing) {
    return existing;
  }

  const shell = document.createElement("div");
  shell.className = "page-stage-shell";
  const stage = document.createElement("div");
  stage.className = "page-stage";

  const header = document.getElementById("site-header");
  const firstScript = body.querySelector(":scope > script");
  shell.appendChild(stage);
  body.insertBefore(shell, firstScript || null);

  Array.from(body.children).forEach((child) => {
    if (child === header || child === shell || child.tagName === "SCRIPT") {
      return;
    }
    stage.appendChild(child);
  });

  return stage;
}

function initPageTransitions() {
  const body = document.body;
  const stage = ensurePageStage();
  const shell = stage?.parentElement;
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const transitionKey = "qeac-top-level-transition";

  if (!body || !stage || !shell) {
    return;
  }

  function syncStageShellHeight() {
    shell.style.setProperty("--page-stage-height", `${stage.offsetHeight}px`);
  }

  function getCurrentPageMatch() {
    const currentKey = body.dataset.page || "";
    const pages = getTopLevelPageOrder();
    const index = pages.findIndex((item) => item.key === currentKey);
    if (index < 0) {
      return null;
    }
    return { ...pages[index], index };
  }

  function readPendingTransition() {
    try {
      const raw = window.sessionStorage.getItem(transitionKey);
      if (!raw) {
        return null;
      }
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function clearPendingTransition() {
    try {
      window.sessionStorage.removeItem(transitionKey);
    } catch {
      return;
    }
  }

  function writePendingTransition(payload) {
    try {
      window.sessionStorage.setItem(transitionKey, JSON.stringify(payload));
    } catch {
      return;
    }
  }

  function applyEnterTransition() {
    syncStageShellHeight();

    if (reduceMotionQuery.matches) {
      clearPendingTransition();
      return;
    }

    const pending = readPendingTransition();
    const current = getCurrentPageMatch();
    if (!pending || !current) {
      clearPendingTransition();
      return;
    }

    const isFresh = Date.now() - Number(pending.timestamp || 0) < 4000;
    if (!isFresh || pending.to !== current.key || (pending.direction !== "forward" && pending.direction !== "backward")) {
      clearPendingTransition();
      return;
    }

    stage.classList.add(`page-stage--pre-enter-${pending.direction}`);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        stage.classList.add("page-stage--enter-active");
        stage.classList.remove(`page-stage--pre-enter-${pending.direction}`);
      });
    });

    window.setTimeout(() => {
      stage.classList.remove("page-stage--enter-active");
    }, 380);

    clearPendingTransition();
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || event.defaultPrevented || reduceMotionQuery.matches) {
      return;
    }

    if (
      event.button !== 0 ||
      link.target === "_blank" ||
      link.hasAttribute("download") ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const current = getCurrentPageMatch();
    const target = getTopLevelPageMatch(link.getAttribute("href"));
    if (!current || !target || current.key === target.key) {
      return;
    }

    const direction = target.index > current.index ? "forward" : "backward";
    writePendingTransition({
      from: current.key,
      to: target.key,
      direction,
      timestamp: Date.now()
    });

    event.preventDefault();
    syncStageShellHeight();
    stage.classList.remove("page-stage--enter-active");
    stage.classList.add(`page-stage--exit-${direction}`);

    window.setTimeout(() => {
      window.location.href = link.href;
    }, 230);
  });

  window.addEventListener("resize", syncStageShellHeight);
  window.addEventListener("load", syncStageShellHeight);
  syncStageShellHeight();
  applyEnterTransition();
}

renderSiteHeader();
renderSiteFooter();
initPageTransitions();
