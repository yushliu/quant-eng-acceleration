// Single source of truth for both pages:
// - latest: concise version used by Home > Latest Updates
// - detail: full version used by Plan > meeting detail cards
window.COMMUNITY_MEETINGS = [
  {
    id: "2026-03-m3",
    ym: "2026-03",
    code: "M3",
    shortTag: "FPGA-sim",
    status: "Planned",
    latest: {
      date: "2026-03-27",
      title: "FPGA-sim checkpoint",
      points: [
        "Planned parser completeness review and latency bucket finalization.",
        "Prepared milestone note outline and follow-up task checklist."
      ]
    },
    detail: {
      title: "Meeting M3 - FPGA-sim Checkpoint",
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
  },
  {
    id: "2026-03-m2",
    ym: "2026-03",
    code: "M2",
    shortTag: "GPU Path",
    status: "Planned",
    latest: {
      date: "2026-03-14",
      title: "GPU path planning",
      points: [
        "Defined CuPy and Numba reference kernels for controlled comparison.",
        "Set draft report package structure for speedup and variance analysis."
      ]
    },
    detail: {
      title: "Meeting M2 - GPU Path",
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
    }
  },
  {
    id: "2026-02-m1",
    ym: "2026-02",
    code: "M1",
    shortTag: "CPU Baseline",
    status: "Done",
    latest: {
      date: "2026-02-18",
      title: "CPU baseline review",
      points: [
        "Reviewed OpenMP baseline runs and reproducibility metadata quality.",
        "Assigned optimization experiments with milestone ownership."
      ]
    },
    detail: {
      title: "Meeting M1 - CPU Baseline",
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
    }
  },
  {
    id: "2026-02-m0",
    ym: "2026-02",
    code: "M0",
    shortTag: "Kickoff",
    status: "Done",
    latest: {
      date: "2026-02-03",
      title: "Kickoff alignment",
      points: [
        "Confirmed scope boundaries across Infra, CPU, GPU, and FPGA-sim.",
        "Locked review cadence and benchmark reporting format."
      ]
    },
    detail: {
      title: "Meeting M0 - Kickoff",
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
    }
  }
];
