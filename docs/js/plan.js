const planMeetings = [
  {
    ym: "2026-02",
    code: "M0",
    shortTag: "Kickoff",
    title: "Meeting M0 - Kickoff",
    status: "Done",
    cards: [
      {
        heading: "Scope",
        bullets: [
          "Confirmed Spring scope boundaries across Infra, CPU, GPU, and FPGA-sim.",
          "Locked review cadence and defined measurable outputs for each track."
        ]
      },
      {
        heading: "Engineering Standards",
        bullets: [
          "Standardized branch naming, PR template fields, and CI required checks.",
          "Set testing expectations for baseline and optimization branches."
        ]
      },
      {
        heading: "Deliverables",
        bullets: [
          "Published first milestone timeline with owners and acceptance criteria.",
          "Prepared benchmark report skeleton for p50, p95, and p99 metrics."
        ]
      }
    ]
  },
  {
    ym: "2026-02",
    code: "M1",
    shortTag: "CPU Baseline",
    title: "Meeting M1 - CPU Baseline",
    status: "Done",
    cards: [
      {
        heading: "Baseline Review",
        bullets: [
          "Reviewed single-thread and OpenMP baseline runs on agreed datasets.",
          "Validated environment metadata for reproducibility."
        ]
      },
      {
        heading: "Methodology",
        bullets: [
          "Aligned measurement windows and warm-up rules across contributors.",
          "Documented repeat count policy for stable percentile statistics."
        ]
      },
      {
        heading: "Next Output",
        bullets: [
          "Assigned optimization experiments with owners and due checkpoints.",
          "Queued a delta report comparing branch-level throughput changes."
        ]
      }
    ]
  },
  {
    ym: "2026-03",
    code: "M2",
    shortTag: "GPU Path",
    title: "Meeting M2 - GPU Path",
    status: "Planned",
    cards: [
      {
        heading: "Prototype Goals",
        bullets: [
          "Define CuPy and Numba reference kernels for controlled comparisons.",
          "Track speedup targets against current CPU baseline outputs."
        ]
      },
      {
        heading: "Validation",
        bullets: [
          "Confirm numerical parity checks and acceptable tolerance thresholds.",
          "Record runtime variability across repeated runs."
        ]
      },
      {
        heading: "Report Package",
        bullets: [
          "Prepare draft benchmark note with plots and concise interpretation.",
          "Summarize bottlenecks and candidate optimization directions."
        ]
      }
    ]
  },
  {
    ym: "2026-03",
    code: "M3",
    shortTag: "FPGA-sim",
    title: "Meeting M3 - FPGA-sim Checkpoint",
    status: "Planned",
    cards: [
      {
        heading: "Parser Progress",
        bullets: [
          "Review event parser completeness and failure handling paths.",
          "Verify trace normalization assumptions before aggregation."
        ]
      },
      {
        heading: "Latency Metrics",
        bullets: [
          "Finalize end-to-end latency definitions and percentile buckets.",
          "Agree on outlier handling and reporting notes."
        ]
      },
      {
        heading: "Milestone Output",
        bullets: [
          "Publish checkpoint note with dataset summary and known risks.",
          "Capture follow-up tasks for next integration cycle."
        ]
      }
    ]
  }
];

let activeMeetingIndex = 0;

function renderTimeline() {
  const timeline = document.getElementById("plan-timeline");
  if (!timeline) {
    return;
  }

  const markup = planMeetings
    .map((meeting, index) => {
      const isActive = index === activeMeetingIndex;
      const activeClasses = isActive
        ? "border-slate-700 bg-slate-50 text-slate-900"
        : "border-gray-200 bg-white text-gray-700 hover:border-slate-300 hover:text-slate-800";
      const dotClasses = isActive ? "border-slate-700 bg-slate-700" : "border-gray-300 bg-white";
      const statusClasses = meeting.status === "Done"
        ? "border-gray-200 bg-white text-gray-600"
        : "border-slate-200 bg-slate-50 text-slate-700";

      return `
        <button
          type="button"
          class="group inline-flex min-w-[152px] items-start gap-3 rounded-md border px-3 py-2 text-left shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 lg:min-w-0 lg:w-full ${activeClasses}"
          data-meeting-index="${index}"
          aria-selected="${isActive ? "true" : "false"}"
          aria-current="${isActive ? "true" : "false"}"
        >
          <span class="mt-1 inline-flex h-3 w-3 shrink-0 rounded-full border ${dotClasses}"></span>
          <span class="min-w-0">
            <span class="block text-xs font-semibold tracking-[0.12em]">${meeting.ym}</span>
            <span class="mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] ${statusClasses}">${meeting.status}</span>
            <span class="mt-0.5 block text-[11px] uppercase tracking-[0.12em] text-gray-500">${meeting.code}</span>
            <span class="mt-1 block truncate text-xs">${meeting.shortTag}</span>
          </span>
        </button>
      `;
    })
    .join("");

  timeline.innerHTML = markup;

  timeline.querySelectorAll("[data-meeting-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextIndex = Number(button.getAttribute("data-meeting-index"));
      if (Number.isNaN(nextIndex) || nextIndex === activeMeetingIndex) {
        return;
      }

      activeMeetingIndex = nextIndex;
      renderTimeline();
      renderMeetingDetails();
    });
  });
}

function renderMeetingDetails() {
  const titleEl = document.getElementById("meeting-title");
  const monthEl = document.getElementById("meeting-month");
  const statusEl = document.getElementById("meeting-status");
  const cardsEl = document.getElementById("meeting-cards");

  if (!titleEl || !monthEl || !statusEl || !cardsEl) {
    return;
  }

  const meeting = planMeetings[activeMeetingIndex];
  if (!meeting) {
    return;
  }

  titleEl.textContent = meeting.title;
  monthEl.textContent = meeting.ym;
  statusEl.textContent = meeting.status;
  statusEl.className = meeting.status === "Done"
    ? "rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-600"
    : "rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700";

  cardsEl.innerHTML = meeting.cards
    .map((card) => {
      const bulletMarkup = card.bullets
        .map((bullet) => `<li class=\"text-sm leading-6 text-gray-600\">${bullet}</li>`)
        .join("");

      return `
        <article class="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
          <h3 class="text-sm font-semibold uppercase tracking-[0.12em] text-gray-500">${card.heading}</h3>
          <ul class="mt-3 list-disc space-y-1 pl-5">
            ${bulletMarkup}
          </ul>
        </article>
      `;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("plan-timeline")) {
    return;
  }

  renderTimeline();
  renderMeetingDetails();
});
