window.RELEASES_DATA = [
  {
    id: "risk-model-comparison",
    title: "Risk Model Comparison",
    category: "Algorithm",
    version: "Stage 3",
    date: "2026-01-02",
    status: "Curated",
    summary: "A benchmark-oriented comparison path for quantitative risk methods under fixed evaluation rules, shared inputs, and versioned outputs.",
    overview: "This release line tracks the club's algorithm-side comparison work from design through implementation and final interpretation.",
    scope: [
      "Shared dataset, portfolio definition, and evaluation rules",
      "Stage-based implementation and comparison workflow",
      "Final recommendation and ranking summary for future reuse"
    ],
    findings: [
      "Fixed evaluation settings make method comparison reviewable across meetings.",
      "Stage-based releases help separate design, execution, and interpretation work.",
      "Versioned comparison summaries improve traceability for future benchmark updates."
    ],
    evidence: [
      { label: "Stage 3 Summary Files", href: "./download.html?view=algorithm#risk-model-comparison-stage3-2026-01-2" },
      { label: "Timeline Context", href: "./plan.html#2026-01-2" }
    ],
    next: "Use the Stage 3 recommendation as a reusable benchmark baseline for later algorithm releases."
  },
  {
    id: "dtcnumpy",
    title: "dtcnumpy",
    category: "Infrastructure",
    version: "Stage 5",
    date: "2026-02-01",
    status: "In progress",
    summary: "A dtype-comparison workflow that supports reproducible numerical inspection before larger project integration.",
    overview: "This publication line captures infrastructure work around semantic rules, reporting layers, and small reproducible demos for dtype-sensitive computation.",
    scope: [
      "Datatype semantics and comparison reporting",
      "Higher-level operation support and validation",
      "User-facing examples, demo workflows, and lightweight documentation"
    ],
    findings: [
      "Example-driven releases make infrastructure work easier to inspect and explain.",
      "Operation-level drift reporting is more informative than raw input comparison alone.",
      "Keeping examples small supports reproducible meeting review before broader integration."
    ],
    evidence: [
      { label: "Stage 5 Meeting Files", href: "./download.html?view=infrastructure#risk-model-comparison-stage5-2026-02-2" },
      { label: "Timeline Context", href: "./plan.html#2026-02-2" }
    ],
    next: "Stabilize the usage layer first, then evaluate deeper project integration once the workflow is easy to explain and verify."
  },
  {
    id: "pricing-benchmarks",
    title: "Pricing Benchmark Notes",
    category: "Benchmark",
    version: "2025-12",
    date: "2025-12-01",
    status: "Published",
    summary: "A curated benchmark package for pricing-method comparison with supporting notes, run settings, and reproducible small artifacts.",
    overview: "This release groups pricing-oriented benchmark output into a readable summary layer rather than leaving the work only as meeting files.",
    scope: [
      "Pricing method comparison framing",
      "Run settings and benchmark notes",
      "Supporting scripts and result artifacts"
    ],
    findings: [
      "Curated benchmark notes make cross-method interpretation easier than raw file browsing alone.",
      "Publication-level summaries help separate reusable outcomes from working files."
    ],
    evidence: [
      { label: "Download Supporting Files", href: "./download.html#pricing-no-arbitrage-cpu-vs-gpu-2025-12" }
    ],
    next: "Expand pricing releases with clearer comparative summaries and topic-specific result interpretation."
  },
  {
    id: "data-download-reliability",
    title: "Data Download Reliability Work",
    category: "Workflow",
    version: "2025-11",
    date: "2025-11-01",
    status: "Published",
    summary: "Workflow-oriented release notes for improving data download stability and reproducible input preparation.",
    overview: "This release line captures support work that keeps benchmark inputs stable and repeatable across runs.",
    scope: [
      "Download patching and retry behavior",
      "Meeting-level workflow notes",
      "Reusable input preparation support"
    ],
    findings: [
      "Stable data ingestion is part of reproducible benchmarking, not just a setup detail.",
      "Workflow releases are useful when infrastructure decisions affect later algorithm comparison."
    ],
    evidence: [
      { label: "Download Supporting Files", href: "./download.html#yfinance-rate-limit-patch-2025-11" }
    ],
    next: "Keep data preparation support linked to later benchmark releases so input assumptions remain visible."
  }
];
