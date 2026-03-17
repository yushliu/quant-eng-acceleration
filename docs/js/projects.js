const PROJECTS_CATALOG = [
  {
    id: "mc-var-cvar-foundations",
    title: "Monte Carlo VaR/CVaR Baseline and CUDA Acceleration",
    summary: "Builds the club’s baseline Monte Carlo risk workflow and extends it into a first-pass CUDA/CuPy acceleration path under shared evaluation rules.",
    tags: ["Algorithm", "Curated", "Completed"],
    overview: "This project establishes the club’s first reusable Monte Carlo workflow for portfolio tail-risk estimation, then carries the same setup into a CUDA/CuPy environment for GPU execution. Rather than treating the baseline and acceleration stages as separate efforts, the project frames them as one continuous line: first define a stable VaR/CVaR pipeline, then test how that same structure behaves in a parallel GPU setting.",
    why: "Risk workflows become difficult to compare when baseline assumptions, portfolio setup, or reporting logic change across stages. This project matters because it creates a shared Monte Carlo VaR/CVaR foundation and then extends that same logic into GPU execution, making later performance and consistency checks more meaningful.",
    approachIntro: "We built the project around one controlled Monte Carlo setup and reused it across both the baseline and CUDA stages.",
    approach: [
      "simulated portfolio returns and converted them into losses",
      "computed 99% VaR from the loss quantile",
      "computed 99% CVaR from the average tail loss",
      "kept the setup fixed at 10 assets, equal weights, 200000 paths, and alpha = 0.99",
      "mapped NumPy-style array logic to CuPy arrays for GPU execution"
    ],
    workflowSteps: [
      {
        label: "Step 1",
        title: "Portfolio Setup",
        bullets: [
          "10 assets",
          "equal weights",
          "shared baseline portfolio definition"
        ]
      },
      {
        label: "Step 2",
        title: "Monte Carlo Scenario Generation",
        bullets: [
          "200000 Monte Carlo paths",
          "fixed simulation structure",
          "repeatable setup for later checks"
        ]
      },
      {
        label: "Step 3",
        title: "Loss Conversion",
        bullets: [
          "simulated portfolio returns converted into losses",
          "common loss representation for reporting"
        ]
      },
      {
        label: "Step 4",
        title: "VaR / CVaR Estimation",
        bullets: [
          "alpha = 0.99",
          "VaR computed from the loss quantile",
          "CVaR computed from the average tail loss"
        ]
      },
      {
        label: "Step 5",
        title: "CUDA / CuPy Execution",
        bullets: [
          "NumPy-style logic migrated to CuPy arrays",
          "execution confirmed on CUDA",
          "runtime and outputs recorded for future consistency checks"
        ]
      }
    ],
    constraints: [
      "Tail-risk estimates are sensitive to simulation count and seed policy.",
      "CPU and GPU outputs only remain useful if assumptions stay fixed.",
      "Baseline logic had to remain simple enough to support later extension and comparison."
    ],
    results: [
      "Established shared baseline settings for later risk projects.",
      "Confirmed GPU execution with CuPy on CUDA.",
      "Recorded VaR = 0.014019 and CVaR = 0.016107 under the GPU run.",
      "Recorded elapsed GPU runtime of 3.463 seconds.",
      "Saved outputs for future CPU/GPU consistency checks."
    ],
    runSummary: {
      configuration: [
        ["Execution Environment", "CUDA with CuPy"],
        ["Portfolio Size", "10 assets"],
        ["Weight Scheme", "Equal weights"],
        ["Monte Carlo Paths", "200000"],
        ["Tail-Risk Alpha", "0.99"]
      ],
      outputs: [
        ["VaR", "0.014019"],
        ["CVaR", "0.016107"],
        ["Runtime", "3.463 seconds"]
      ]
    },
    nextStep: "The next step is not simply to rerun the same workflow, but to use this baseline-plus-acceleration line as a foundation for deeper benchmark work: compare CPU and GPU behavior under the same fixed setup, extend the scenario structure beyond the initial baseline case, and connect this workflow to later EWMA and risk-comparison project lines.",
    artifacts: [
      { label: "Open Plan Context", href: "./plan.html" },
      { label: "Open Download Files", href: "./download.html" },
      { label: "Open Legacy Release", href: "./archive.html" }
    ]
  },
  {
    id: "cuda-risk-acceleration",
    title: "CUDA Risk Acceleration",
    summary: "Moves core Monte Carlo risk loops to CUDA to reduce runtime and support larger scenario sweeps.",
    tags: ["Infrastructure", "In Progress", "GPU"],
    overview: "This project ports simulation-heavy kernels from CPU workflows to GPU workflows while preserving numerical comparability.",
    why: "Faster runtime enables deeper benchmark sweeps, better stress coverage, and quicker iteration for model validation.",
    approach: [
      "Profile CPU baseline and isolate hotspots suitable for GPU kernels.",
      "Implement CUDA kernels with deterministic test fixtures.",
      "Compare GPU outputs against reference CPU tolerance bands."
    ],
    constraints: [
      "Kernel optimization can diverge from readability and maintainability.",
      "Hardware variance impacts reproducibility if guardrails are weak."
    ],
    results: [
      "Prototype kernels show measurable runtime reduction on club hardware.",
      "Validation harness now tracks GPU-vs-CPU error bounds."
    ],
    nextStep: "Harden deployment scripts and add batch benchmark reporting for each kernel revision.",
    artifacts: [
      { label: "Open Download Files", href: "./download.html" },
      { label: "Open Legacy Release", href: "./archive.html" }
    ]
  },
  {
    id: "ewma-monte-carlo-backtest",
    title: "EWMA Monte Carlo Backtest",
    summary: "Combines EWMA covariance with Monte Carlo backtesting to evaluate risk stability across market regimes.",
    tags: ["Algorithm", "In Progress", "Backtest"],
    overview: "This line extends baseline simulation by incorporating EWMA covariance updates and rolling validation windows.",
    why: "Regime shifts can invalidate static assumptions, so dynamic covariance handling is critical for robust risk estimates.",
    approach: [
      "Calibrate EWMA parameters under shared validation criteria.",
      "Run rolling-window Monte Carlo backtests across selected assets.",
      "Track hit-rate and breach behavior against benchmark thresholds."
    ],
    constraints: [
      "Parameter sensitivity can mask genuine model improvements.",
      "Backtest windows require careful alignment across data frequencies."
    ],
    results: [
      "Initial runs show improved responsiveness in volatile windows.",
      "Failure cases are now tagged for comparative review."
    ],
    nextStep: "Add comparative plots against static covariance baselines and publish stability notes.",
    artifacts: [
      { label: "Open Plan Context", href: "./plan.html" },
      { label: "Open Download Files", href: "./download.html" }
    ]
  },
  {
    id: "derivatives-pricing-arbitrage-checks",
    title: "Derivatives Pricing and No-Arbitrage Checks",
    summary: "Builds pricing diagnostics and no-arbitrage validation checks for option-oriented project lines.",
    tags: ["Algorithm", "Curated", "In Progress"],
    overview: "The project formalizes pricing checks and sanity constraints before integrating derivatives outputs into broader risk comparisons.",
    why: "No-arbitrage guardrails prevent invalid pricing assumptions from contaminating downstream analyses.",
    approach: [
      "Implement baseline pricing routines with transparent assumptions.",
      "Apply no-arbitrage checks and boundary-condition tests.",
      "Document validation outcomes for review reuse."
    ],
    constraints: [
      "Input quality and implied-vol assumptions directly affect diagnostics.",
      "Edge-case handling is required for thin-liquidity symbols."
    ],
    results: [
      "Validation checklist now catches inconsistent quote scenarios.",
      "Pricing outputs are easier to compare across implementation variants."
    ],
    nextStep: "Integrate diagnostic summaries into project-level comparison dashboards.",
    artifacts: [
      { label: "Open Plan Context", href: "./plan.html" },
      { label: "Open Legacy Release", href: "./archive.html" }
    ]
  },
  {
    id: "risk-model-comparison",
    title: "Risk Model Comparison",
    summary: "Creates a shared framework to compare risk models under consistent data, metrics, and reporting templates.",
    tags: ["Algorithm", "Curated", "Comparison"],
    overview: "This project aggregates outputs from multiple model families and presents normalized comparison views for club decision-making.",
    why: "Without a common comparison frame, model discussions become anecdotal and hard to reproduce.",
    approach: [
      "Define common inputs, outputs, and comparison metrics.",
      "Run aligned evaluations across selected model variants.",
      "Publish concise comparison reports with assumptions."
    ],
    constraints: [
      "Metric selection can bias perceived model quality.",
      "Cross-model normalization requires strict schema discipline."
    ],
    results: [
      "Improved clarity in review meetings on tradeoffs and failure modes.",
      "Reusable comparison templates are now available for new projects."
    ],
    nextStep: "Expand comparisons to include infrastructure cost and runtime metrics.",
    artifacts: [
      { label: "Open Plan Context", href: "./plan.html" },
      { label: "Open Download Files", href: "./download.html" }
    ]
  },
  {
    id: "dtcnumpy",
    title: "dtcnumpy",
    summary: "Curated package line focused on reproducible numerical workflows for club-scale quantitative experimentation.",
    tags: ["Infrastructure", "Curated", "Completed"],
    overview: "dtcnumpy packages reusable numerical components and project scaffolding so teams can move from idea to testable implementation faster.",
    why: "Shared tooling reduces setup friction and increases consistency across student contributors.",
    approach: [
      "Package core utilities with clear versioning and usage notes.",
      "Define integration patterns for benchmark and release workflows.",
      "Maintain lightweight QA checks before distribution."
    ],
    constraints: [
      "Backward compatibility must be managed across active workstreams.",
      "Documentation quality determines actual adoption."
    ],
    results: [
      "Reduced duplicated setup work across projects.",
      "Provided stable base layer for reproducible experiments."
    ],
    nextStep: "Add focused examples that map package primitives to active risk-model projects.",
    artifacts: [
      { label: "Open Legacy Release", href: "./archive.html" },
      { label: "Open Download Files", href: "./download.html" }
    ]
  }
];

const MODAL_FADE_MS = 180;
const WORKFLOW_TRANSITION_MS = 180;
let activeWorkflowStepIndex = 0;
let activeWorkflowSteps = [];
let isModalBodyBound = false;

function escapeProjectHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderBulletList(hostId, items, fallback) {
  const host = document.getElementById(hostId);
  if (!host) {
    return;
  }
  const rows = Array.isArray(items) ? items : [];
  host.innerHTML = rows.length
    ? rows.map((item) => `<li>${escapeProjectHtml(item)}</li>`).join("")
    : `<li>${escapeProjectHtml(fallback)}</li>`;
}

function renderKeyValueTable(hostId, rows) {
  const host = document.getElementById(hostId);
  if (!host) {
    return;
  }
  const pairs = Array.isArray(rows) ? rows : [];
  if (!pairs.length) {
    host.innerHTML = `<p class="text-sm text-gray-500">${escapeProjectHtml("No recorded values published yet.")}</p>`;
    return;
  }
  host.innerHTML = `
    <table class="project-summary-table w-full text-left text-sm text-gray-700">
      <tbody>
        ${pairs.map((row) => `
          <tr>
            <th scope="row">${escapeProjectHtml(row[0])}</th>
            <td>${escapeProjectHtml(row[1])}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function getWorkflowSteps(project) {
  if (Array.isArray(project?.workflowSteps) && project.workflowSteps.length) {
    return project.workflowSteps;
  }

  const fallbackTitles = Array.isArray(project?.workflow) ? project.workflow : [];
  return fallbackTitles.map((title, index) => ({
    label: `Step ${index + 1}`,
    title,
    bullets: ["Detailed step notes will be added in a later pass."]
  }));
}

function renderWorkflowSelector(hostId, steps) {
  const host = document.getElementById(hostId);
  if (!host) {
    return;
  }
  if (!steps.length) {
    host.innerHTML = "";
    return;
  }
  host.innerHTML = steps.map((step, index) => `
    <button
      type="button"
      role="tab"
      data-workflow-index="${index}"
      aria-selected="${index === activeWorkflowStepIndex ? "true" : "false"}"
      class="project-workflow-step rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.08em] uppercase"
    >
      ${escapeProjectHtml(step.label || `Step ${index + 1}`)}
    </button>
  `).join("");
}

function renderSelectedWorkflowStep(direction) {
  const step = activeWorkflowSteps[activeWorkflowStepIndex];
  const titleHost = document.getElementById("project-modal-workflow-detail-title");
  const listHost = document.getElementById("project-modal-workflow-detail-list");
  const detailHost = document.getElementById("project-modal-workflow-detail");

  if (!titleHost || !listHost || !detailHost || !step) {
    return;
  }

  titleHost.textContent = step.title || "Workflow Step";
  const bullets = Array.isArray(step.bullets) ? step.bullets : [];
  listHost.innerHTML = bullets.length
    ? bullets.map((item) => `<li>${escapeProjectHtml(item)}</li>`).join("")
    : "<li>Step details will be added in a later content pass.</li>";

  if (!direction) {
    return;
  }

  const xOffset = direction === "forward" ? 10 : -10;
  detailHost.animate(
    [
      { opacity: 0.48, transform: `translateX(${xOffset}px)` },
      { opacity: 1, transform: "translateX(0)" }
    ],
    {
      duration: WORKFLOW_TRANSITION_MS,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)"
    }
  );
}

function setActiveWorkflowStep(nextIndex) {
  if (!activeWorkflowSteps.length) {
    return;
  }
  const boundedIndex = Math.max(0, Math.min(nextIndex, activeWorkflowSteps.length - 1));
  const direction = boundedIndex > activeWorkflowStepIndex ? "forward" : boundedIndex < activeWorkflowStepIndex ? "backward" : "";
  activeWorkflowStepIndex = boundedIndex;

  const selector = document.getElementById("project-modal-workflow-selector");
  selector?.querySelectorAll("[data-workflow-index]").forEach((button, index) => {
    button.setAttribute("aria-selected", index === activeWorkflowStepIndex ? "true" : "false");
  });

  renderSelectedWorkflowStep(direction);
  updateWorkflowNavControls();
}

function bindWorkflowSelector() {
  const selector = document.getElementById("project-modal-workflow-selector");
  if (!selector) {
    return;
  }
  selector.onclick = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const button = target.closest("[data-workflow-index]");
    if (!button) {
      return;
    }
    const index = Number(button.getAttribute("data-workflow-index"));
    if (Number.isFinite(index)) {
      setActiveWorkflowStep(index);
    }
  };
}

function updateWorkflowNavControls() {
  const prev = document.getElementById("project-modal-workflow-prev");
  const next = document.getElementById("project-modal-workflow-next");
  if (!prev || !next) {
    return;
  }
  const atStart = activeWorkflowStepIndex <= 0;
  const atEnd = activeWorkflowStepIndex >= activeWorkflowSteps.length - 1;
  prev.disabled = atStart;
  next.disabled = atEnd;
  prev.setAttribute("aria-disabled", atStart ? "true" : "false");
  next.setAttribute("aria-disabled", atEnd ? "true" : "false");
}

function bindWorkflowStepControls() {
  const prev = document.getElementById("project-modal-workflow-prev");
  const next = document.getElementById("project-modal-workflow-next");
  if (!prev || !next) {
    return;
  }
  prev.onclick = () => setActiveWorkflowStep(activeWorkflowStepIndex - 1);
  next.onclick = () => setActiveWorkflowStep(activeWorkflowStepIndex + 1);
}

function updateModalBodyScrollState() {
  const shell = document.getElementById("project-modal");
  const body = document.getElementById("project-modal-body");
  if (!shell || !body) {
    return;
  }
  shell.classList.toggle("is-body-scrolled", body.scrollTop > 8);
}

function bindModalBodyScroll() {
  if (isModalBodyBound) {
    return;
  }
  const body = document.getElementById("project-modal-body");
  if (!body) {
    return;
  }
  body.addEventListener("scroll", updateModalBodyScrollState, { passive: true });
  isModalBodyBound = true;
}

function renderProjectsGrid() {
  const host = document.getElementById("project-cards");
  if (!host) {
    return;
  }

  host.innerHTML = PROJECTS_CATALOG.map((project) => `
    <article class="project-card glass-subpanel rounded-[1.2rem] p-5">
      <h3 class="text-lg font-semibold leading-6 text-gray-900">${escapeProjectHtml(project.title)}</h3>
      <p class="mt-3 text-sm leading-6 text-gray-700">${escapeProjectHtml(project.summary)}</p>
      <div class="mt-4 flex flex-wrap gap-2">
        ${(project.tags || []).map((tag) => `<span class="project-tag rounded-full px-2.5 py-1 text-xs font-medium text-gray-600">${escapeProjectHtml(tag)}</span>`).join("")}
      </div>
      <button
        type="button"
        data-project-id="${escapeProjectHtml(project.id)}"
        class="project-card__cta glass-btn-primary mt-5 inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300"
      >
        View Project
      </button>
    </article>
  `).join("");
}

function setProjectModalText(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = value;
  }
}

function openProjectModal(projectId) {
  const project = PROJECTS_CATALOG.find((item) => item.id === projectId);
  if (!project) {
    return;
  }

  setProjectModalText("project-modal-title", project.title);
  setProjectModalText("project-modal-summary", project.summary);
  setProjectModalText("project-modal-overview", project.overview || "Overview will be expanded in a later pass.");
  setProjectModalText("project-modal-why", project.why || "Why-this-matters narrative will be added in a later pass.");
  setProjectModalText("project-modal-approach-intro", project.approachIntro || "This project follows one controlled workflow structure across implementation stages.");
  setProjectModalText("project-modal-next-step", project.nextStep || "Next-step planning is being prepared.");

  renderBulletList("project-modal-approach", project.approach, "Approach details will be added in a later pass.");
  renderBulletList("project-modal-constraints", project.constraints, "Constraints are being documented.");
  renderBulletList("project-modal-results", project.results, "Results summary is being prepared.");

  const workflowWrap = document.getElementById("project-modal-workflow-wrap");
  if (workflowWrap) {
    activeWorkflowSteps = getWorkflowSteps(project);
    const hasWorkflow = activeWorkflowSteps.length > 0;
    workflowWrap.classList.toggle("hidden", !hasWorkflow);
    if (hasWorkflow) {
      activeWorkflowStepIndex = 0;
      renderWorkflowSelector("project-modal-workflow-selector", activeWorkflowSteps);
      bindWorkflowSelector();
      bindWorkflowStepControls();
      setActiveWorkflowStep(0);
    } else {
      updateWorkflowNavControls();
    }
  }

  const runSummaryWrap = document.getElementById("project-modal-run-summary");
  if (runSummaryWrap) {
    const configRows = project.runSummary?.configuration;
    const outputRows = project.runSummary?.outputs;
    const hasRunSummary = Array.isArray(configRows) && configRows.length && Array.isArray(outputRows) && outputRows.length;
    runSummaryWrap.classList.toggle("hidden", !hasRunSummary);
    if (hasRunSummary) {
      renderKeyValueTable("project-modal-config-table", configRows);
      renderKeyValueTable("project-modal-output-table", outputRows);
    }
  }

  const tagsHost = document.getElementById("project-modal-tags");
  if (tagsHost) {
    const tags = Array.isArray(project.tags) ? project.tags : [];
    tagsHost.innerHTML = tags.map((tag) => `
      <span class="project-tag rounded-full px-2.5 py-1 text-xs font-medium text-gray-600">${escapeProjectHtml(tag)}</span>
    `).join("");
  }

  const artifactsHost = document.getElementById("project-modal-artifacts");
  if (artifactsHost) {
    const artifacts = Array.isArray(project.artifacts) ? project.artifacts : [];
    artifactsHost.innerHTML = artifacts.length
      ? artifacts.map((item) => `
        <a href="${escapeProjectHtml(item.href || "#")}" class="glass-btn-secondary inline-flex rounded-full border px-3 py-2 text-sm font-medium text-blue-600 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300">
          ${escapeProjectHtml(item.label || "Open")}
        </a>
      `).join("")
      : "<span class=\"text-sm text-gray-500\">Artifacts will be linked here in a later content pass.</span>";
  }

  const overlay = document.getElementById("project-modal-overlay");
  const modalBody = document.getElementById("project-modal-body");
  const modalShell = document.getElementById("project-modal");
  if (!overlay) {
    return;
  }

  clearTimeout(openProjectModal.closeTimer);
  overlay.classList.remove("hidden");
  requestAnimationFrame(() => {
    overlay.classList.add("is-open");
  });
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("project-modal-open");
  if (modalBody) {
    modalBody.scrollTop = 0;
  }
  modalShell?.classList.remove("is-body-scrolled");
}

function closeProjectModal() {
  const overlay = document.getElementById("project-modal-overlay");
  if (!overlay) {
    return;
  }

  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("project-modal-open");
  document.getElementById("project-modal")?.classList.remove("is-body-scrolled");
  clearTimeout(openProjectModal.closeTimer);
  openProjectModal.closeTimer = setTimeout(() => {
    overlay.classList.add("hidden");
  }, MODAL_FADE_MS);
}

function initProjectsPage() {
  if (document.body?.dataset?.page !== "projects") {
    return;
  }

  renderProjectsGrid();
  bindModalBodyScroll();

  document.getElementById("project-cards")?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const button = target.closest("[data-project-id]");
    if (!button) {
      return;
    }
    const projectId = button.getAttribute("data-project-id");
    if (projectId) {
      openProjectModal(projectId);
    }
  });

  document.getElementById("project-modal-close")?.addEventListener("click", closeProjectModal);
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.closest("#project-modal-close")) {
      closeProjectModal();
    }
  });

  document.getElementById("project-modal-overlay")?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.classList.contains("project-modal-backdrop")) {
      closeProjectModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProjectModal();
    }
  });
}

document.addEventListener("DOMContentLoaded", initProjectsPage);
