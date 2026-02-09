// Single source of truth for both pages:
// - latest: concise version used by Home > Latest Updates
// - detail: full version used by Plan > meeting detail cards
window.COMMUNITY_MEETINGS = [
  {
    "id": "2025-10",
    "ym": "2025-10",
    "shortTag": "CUDA",
    "status": "COMPLETED",
    "latest": {
      "date": "2025-10",
      "title": "Intro to CUDA with Monte Carlo Risk",
      "points": [
        "Introduced CUDA basics and the GPU execution model for array workloads.",
        "Ported the Monte Carlo VaR and CVaR baseline to GPU using CuPy on CUDA and logged VaR 0.014019 and CVaR 0.016107."
      ]
    },
    "detail": {
      "title": "Intro to CUDA with Monte Carlo Risk",
      "cards": [
        {
          "heading": "CUDA Track Kickoff",
          "bullets": [
            "Explained what CUDA is and why GPUs help with parallel sampling.",
            "Mapped NumPy style arrays to CuPy arrays on the GPU.",
            "Confirmed the run executed on CUDA with CuPy."
          ]
        },
        {
          "heading": "Baseline Kernel",
          "bullets": [
            "Used the same Monte Carlo VaR and CVaR workflow as the Python intro.",
            "Kept the portfolio setup consistent with 10 assets and equal weights.",
            "Ran 200000 paths at alpha 0.99 for tail risk."
          ]
        },
        {
          "heading": "Results Snapshot",
          "bullets": [
            "Recorded VaR 0.014019 and CVaR 0.016107 on the GPU run.",
            "Recorded 3.463 seconds elapsed time for the GPU run.",
            "Saved the numbers for later CPU and GPU consistency checks."
          ]
        },
        {
          "heading": "Next Steps for Visibility",
          "bullets": [
            "Export a small results file and commit it with a clear timestamp.",
            "Tag a repo release so the run is easy to reference in a resume.",
            "Add a short reproduction guide for Kaggle GPU runs."
          ]
        }
      ]
    }
  },

  {
    "id": "2025-09",
    "ym": "2025-09",
    "shortTag": "Risk",
    "status": "COMPLETED",
    "latest": {
      "date": "2025-09",
      "title": "Monte Carlo VaR CVaR Intro",
      "points": [
        "Introduced portfolio risk with Monte Carlo VaR and CVaR in Python.",
        "Ran a GPU baseline with CuPy on CUDA and recorded VaR 0.014019 and CVaR 0.016107 at alpha 0.99."
      ]
    },
    "detail": {
      "title": "Monte Carlo VaR CVaR Intro",
      "cards": [
        {
          "heading": "What We Built",
          "bullets": [
            "Simulated portfolio returns and converted them to losses.",
            "Computed 99 percent VaR from the loss quantile.",
            "Computed 99 percent CVaR from the average tail loss."
          ]
        },
        {
          "heading": "Run Setup",
          "bullets": [
            "Used 10 assets with equal weights.",
            "Used 200000 Monte Carlo paths.",
            "Used alpha 0.99 for tail risk."
          ]
        },
        {
          "heading": "Acceleration Result",
          "bullets": [
            "Executed on GPU with CuPy on CUDA.",
            "Observed elapsed time 3.463 seconds on the GPU run.",
            "Produced VaR 0.014019 and CVaR 0.016107."
          ]
        },
        {
          "heading": "Reproducibility Notes",
          "bullets": [
            "Keep parameters and seed fixed for comparisons.",
            "Record device type and runtime for each run.",
            "Save results as a versioned artifact in the repo."
          ]
        }
      ]
    }
  },
];
