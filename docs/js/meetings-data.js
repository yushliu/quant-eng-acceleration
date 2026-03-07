// Single source of truth for both pages:
// - latest: concise version used by Home > Latest Updates
// - detail: full version used by Plan > meeting detail cards
window.COMMUNITY_MEETINGS = [
  {
    "id": "2026-02-2",
    "ym": "2026-02",
    "shortTag": "INFRA",
    "defaultViewId": "infrastructure",
    "status": "IN PROGRESS",
    "downloadItemId": "risk-model-comparison-stage5-2026-02-2",
    "latestViews": [
      {
        "id": "infrastructure",
        "label": "Infrastructure",
        "latest": {
          "date": "2026-02-01",
          "title": "dtcnumpy Stage 5 - User Examples and Demo Workflows",
          "points": [
            "Reframed the current final stage of the roadmap away from immediate project integration and toward user-facing examples, demo workflows, and usage notes.",
            "Published the first example set under Infrastructure Display: `demo_basic.py`, `demo_ops.py`, `demo_quant.py`, and `README_examples.md`.",
            "Positioned this stage as a presentation and onboarding layer so the package can be explained clearly before later project-level integration."
          ]
        }
      },
      {
        "id": "algorithm",
        "label": "Algorithm",
        "latest": {
          "date": "2026-02-01",
          "title": "2026-2-2 Algorithm View",
          "points": [
            "Example display files will be published in a later update."
          ]
        }
      }
    ],
    "detailViews": [
      {
        "id": "infrastructure",
        "label": "Infrastructure",
        "detail": {
          "title": "dtcnumpy Stage 5 - User Examples and Demo Workflows",
          "cards": [
            {
              "heading": "What This Build Did",
              "bullets": [
                "Reframed the final stage of the current `dtcnumpy` roadmap away from immediate project integration and toward user-facing examples and demo workflows.",
                "Defined Stage 5 as the first presentation-oriented stage of the project, focused on showing how `dtcnumpy` can be used in practice through small, controlled examples.",
                "Fixed the Stage 5 scope around example-driven usage covering base array creation, dtype comparison, `astype(...)`, operation-level drift, and lightweight quant-style examples.",
                "Published the first example set under `Infrastructure/Display/`: `demo_basic.py`, `demo_ops.py`, `demo_quant.py`, and `README_examples.md`."
              ]
            },
            {
              "heading": "Why This Stage Matters",
              "bullets": [
                "Stages 1 through 4 focused on semantic rules, container design, basic operations, and numerically sensitive infrastructure preparation.",
                "At this point, the project has enough core functionality that a new user should be able to see what `dtcnumpy` does without first reading internal implementation files.",
                "Stage 5 is intended to turn `dtcnumpy` from an internal prototype into a usable, explainable tool."
              ]
            },
            {
              "heading": "Stage 5 Scope That Is Followed",
              "bullets": [
                "Stage 5 focuses on user-facing examples, demo scripts, simple workflow explanations, and lightweight usage documentation.",
                "Stage 5 does not include full project integration, end-to-end risk-pipeline merge, new benchmark infrastructure, performance measurement, or packaging redesign.",
                "The purpose of this stage is to show how the package is used before it is integrated into larger workflows."
              ]
            },
            {
              "heading": "Target Examples For This Stage",
              "bullets": [
                "`demo_basic.py` demonstrates array creation, reporting, and dtype switching.",
                "`demo_ops.py` demonstrates operation-level drift using supported Stage 3 functions.",
                "`demo_quant.py` demonstrates lightweight quant-style examples without requiring full project integration.",
                "`README_examples.md` explains how to run and interpret the examples."
              ]
            },
            {
              "heading": "What The Published Examples Cover",
              "bullets": [
                "`demo_basic.py` covers scalar creation, vector creation, comparison printing, and `astype(...)` on a small array.",
                "`demo_ops.py` covers `mean`, `dot`, and `quantile` so users can see operation-level drift instead of only raw input drift.",
                "`demo_quant.py` covers portfolio weighted return, tail-style quantile checking, and a compact matrix aggregation example based on `matmul` and `mean`."
              ]
            },
            {
              "heading": "Example Design Goals",
              "bullets": [
                "Show the simplest possible entry point to `dtcnumpy`.",
                "Demonstrate that the package compares multiple dtype semantics under one interface.",
                "Show that operation outputs, not only raw inputs, can drift across dtypes.",
                "Give at least one small quantitative example so the project remains tied to the club's quant-engineering mission.",
                "Keep all examples small enough to run in a meeting without depending on the full risk codebase."
              ]
            },
            {
              "heading": "Expected Example Coverage",
              "bullets": [
                "Basic input comparison through `array(...)` and `print(...)`.",
                "Dtype switching through `astype(...)`.",
                "Operation-level examples such as `sum`, `mean`, `dot`, `matmul`, and `quantile`.",
                "Lightweight quant-style examples such as portfolio weighted return, mini tail-risk checks, and compact matrix aggregation."
              ]
            },
            {
              "heading": "What Users Should Learn",
              "bullets": [
                "How to create a `dtcnumpy` object.",
                "How FP64 is used as the reference.",
                "How reduced-precision and quantized formats are compared against the reference.",
                "How operation outputs can differ across dtypes and why those differences matter for quantitative computation."
              ]
            },
            {
              "heading": "How To Run Each Example",
              "bullets": [
                "From the project root, run `python3 examples/demo_basic.py`.",
                "Run `python3 examples/demo_ops.py` for supported operation-level examples.",
                "Run `python3 examples/demo_quant.py` for lightweight quant-style examples.",
                "Use `README_examples.md` as the short guide for scope, commands, and file-by-file explanation."
              ]
            },
            {
              "heading": "Acceptance Target",
              "bullets": [
                "At least three example scripts are available.",
                "A new user can understand the basic workflow without reading internal source files first.",
                "The examples demonstrate both raw value comparison and operation-level comparison.",
                "At least one example shows a clear quantitative use case."
              ]
            },
            {
              "heading": "Known Limitations At This Stage",
              "bullets": [
                "Stage 5 still does not integrate `dtcnumpy` into the full risk project.",
                "The examples are intentionally small and controlled.",
                "The goal is usability and explanation, not end-to-end model deployment.",
                "Hardware execution, throughput, and CUDA kernel behavior are still outside the scope of the package.",
                "Advanced linear algebra, random sampling, and full risk-project integration are still outside the user example scope."
              ]
            },
            {
              "heading": "Next Step According To Plan",
              "bullets": [
                "Use the published example suite in meetings and internal documentation first.",
                "Add optional smoke tests around the examples if needed.",
                "Use these examples in meetings and internal documentation first.",
                "Consider project integration only after the usage layer is stable and easy to explain."
              ]
            }
          ]
        }
      },
      {
        "id": "algorithm",
        "label": "Algorithm",
        "detail": {
          "title": "2026-2-2 Algorithm View",
          "cards": []
        }
      }
    ],
    "latest": {
      "date": "2026-02-01",
      "title": "dtcnumpy Stage 5 - User Examples and Demo Workflows",
      "points": [
        "Reframed the current final stage of the roadmap away from immediate project integration and toward user-facing examples and demo workflows.",
        "Published the first example set under Infrastructure Display: `demo_basic.py`, `demo_ops.py`, `demo_quant.py`, and `README_examples.md`.",
        "Positioned this stage as a usability and onboarding layer before later project-level integration."
      ]
    },
    "detail": {
      "title": "dtcnumpy Stage 5 - User Examples and Demo Workflows",
      "cards": [
        {
          "heading": "What This Build Did",
          "bullets": [
            "Reframed the final stage of the current `dtcnumpy` roadmap away from immediate project integration and toward user-facing examples and demo workflows.",
            "Defined Stage 5 as the first presentation-oriented stage of the project, focused on showing how `dtcnumpy` can be used in practice through small, controlled examples.",
            "Fixed the Stage 5 scope around example-driven usage covering base array creation, dtype comparison, `astype(...)`, operation-level drift, and lightweight quant-style examples.",
            "Published the first example set under `Infrastructure/Display/`: `demo_basic.py`, `demo_ops.py`, `demo_quant.py`, and `README_examples.md`."
          ]
        },
        {
          "heading": "Why This Stage Matters",
          "bullets": [
            "Stages 1 through 4 focused on semantic rules, container design, basic operations, and numerically sensitive infrastructure preparation.",
            "At this point, the project has enough core functionality that a new user should be able to see what `dtcnumpy` does without first reading internal implementation files.",
            "Stage 5 is intended to turn `dtcnumpy` from an internal prototype into a usable, explainable tool."
          ]
        },
        {
          "heading": "Target Examples For This Stage",
          "bullets": [
            "`demo_basic.py` demonstrates array creation, reporting, and dtype switching.",
            "`demo_ops.py` demonstrates operation-level drift using supported Stage 3 functions.",
            "`demo_quant.py` demonstrates lightweight quant-style examples without requiring full project integration.",
            "`README_examples.md` explains how to run and interpret the examples."
          ]
        },
        {
          "heading": "How To Run Each Example",
          "bullets": [
            "From the project root, run `python3 examples/demo_basic.py`.",
            "Run `python3 examples/demo_ops.py` for supported operation-level examples.",
            "Run `python3 examples/demo_quant.py` for lightweight quant-style examples.",
            "Use `README_examples.md` as the short guide for scope, commands, and file-by-file explanation."
          ]
        },
        {
          "heading": "Next Step According To Plan",
          "bullets": [
            "Use the published example suite in meetings and internal documentation first.",
            "Add optional smoke tests around the examples if needed.",
            "Consider project integration only after the usage layer is stable and easy to explain."
          ]
        }
      ]
    }
  },
  {
    "id": "2026-02-1",
    "ym": "2026-02",
    "shortTag": "INFRA",
    "defaultViewId": "infrastructure",
    "status": "IN PROGRESS",
    "downloadItemId": "risk-model-comparison-stage4-2026-02-1",
    "latestViews": [
      {
        "id": "infrastructure",
        "label": "Infrastructure",
        "latest": {
          "date": "2026-02-01",
          "title": "dtcnumpy Stage 4 - Advanced Linear Algebra and Random Module Preparation",
          "points": [
            "Defined Stage 4 as the preparation layer between higher-level dtype-aware ops and later risk-kernel integration.",
            "Fixed the Stage 4 scope around `linalg.cholesky`, `linalg.eigh`, low-precision matrix stability analysis, and `random.standard_normal` for controlled Monte Carlo-style inputs.",
            "Kept the project inside semantic dtype simulation and explicitly out of CUDA hardware execution, Tensor Core scheduling, and performance benchmarking."
          ]
        }
      },
      {
        "id": "algorithm",
        "label": "Algorithm",
        "latest": {
          "date": "2026-02-01",
          "title": "2026-2-1 Algorithm View",
          "points": [
            "No algorithm meeting record has been published yet for this release."
          ]
        }
      }
    ],
    "detailViews": [
      {
        "id": "infrastructure",
        "label": "Infrastructure",
        "detail": {
          "title": "dtcnumpy Stage 4 - Advanced Linear Algebra and Random Module Preparation",
          "cards": [
            {
              "heading": "What This Build Did",
              "bullets": [
                "Defined Stage 4 as the transition from basic numeric operations to the first risk-kernel-critical infrastructure layer inside `dtcnumpy`.",
                "Fixed the Stage 4 scope around advanced linear algebra support and controlled random sampling support before later risk-pipeline integration.",
                "Positioned this stage as the preparation layer for covariance factorization, scenario generation, portfolio-loss simulation, and VaR / CVaR computation workflows."
              ]
            },
            {
              "heading": "Why This Stage Matters",
              "bullets": [
                "Stage 2 made dtype-aware objects observable, and Stage 3 made dtype-aware operation outputs comparable.",
                "Stage 4 is the first stage focused on the most numerically sensitive building blocks used in quantitative risk systems.",
                "Without Stage 4, the project still cannot test how reduced-precision semantics propagate through matrix factorization, repair logic, and simulated scenario generation."
              ]
            },
            {
              "heading": "Stage 4 Scope That Is Followed",
              "bullets": [
                "Stage 4 focuses on advanced linear algebra preparation, random-sampling preparation, and dtype-sensitive stability analysis.",
                "Stage 4 does not yet include full risk-pipeline integration, full covariance API expansion, performance benchmarking, CUDA hardware execution simulation, Tensor Core scheduling logic, or full random-module compatibility.",
                "The purpose of this stage is to prepare the simulator for the hardest numerical kernels before final model-level integration."
              ]
            },
            {
              "heading": "Target Modules For This Stage",
              "bullets": [
                "`dtcnumpy.linalg.cholesky`",
                "`dtcnumpy.linalg.eigh`",
                "`dtcnumpy.random.standard_normal`"
              ]
            },
            {
              "heading": "Advanced Linear Algebra Focus",
              "bullets": [
                "`linalg.cholesky` is required because Cholesky-style factorization is central to correlated Monte Carlo path generation.",
                "`linalg.eigh` is required because low-precision covariance inputs may lose numerical stability and need eigenvalue-based repair paths.",
                "Stage 4 is expected to clarify how dtype semantics affect matrix conditioning, factorization success or failure, eigenvalue clipping behavior, and reconstruction stability after repair."
              ]
            },
            {
              "heading": "Random Module Focus",
              "bullets": [
                "`random.standard_normal` is introduced because later Monte Carlo workflows require a reproducible source of scenario generation.",
                "All dtype paths should begin from the same base random stream and then apply dtype semantics consistently after generation.",
                "This keeps the comparison fair across dtypes and avoids mixing random-stream differences with precision-semantics differences."
              ]
            },
            {
              "heading": "Expected Numerical Questions",
              "bullets": [
                "Does reduced precision make covariance-like matrices more likely to fail factorization?",
                "Do BF16, TF32, or FP16-style semantics change eigenvalue spectra enough to require more frequent repair?",
                "When the same random stream is mapped through different dtype semantics, how large is the resulting drift in simulated outputs?",
                "Which dtype families appear stable enough to continue into later risk-kernel integration, and which ones require caution?"
              ]
            },
            {
              "heading": "Acceptance Target",
              "bullets": [
                "Advanced linear algebra results can be produced for all supported dtypes under a shared comparison structure.",
                "Cholesky-style and eigenvalue-style workflows can be analyzed under reduced-precision semantics.",
                "Random sampling can be generated reproducibly in a way that supports later Monte Carlo comparisons.",
                "The simulator remains within semantic-simulation scope and is ready to move into risk-kernel integration in the following stage."
              ]
            },
            {
              "heading": "Known Limitations At This Stage",
              "bullets": [
                "Stage 4 still compares semantic numerical behavior, not real CUDA device execution.",
                "It does not simulate Tensor Core scheduling, warp behavior, throughput differences, or memory hierarchy effects.",
                "Integer support remains comparison-oriented and full model-level validation is still deferred until later risk-kernel integration."
              ]
            },
            {
              "heading": "Next Step According To Plan",
              "bullets": [
                "Connect the advanced-linear-algebra and random infrastructure to the club's core risk kernels.",
                "Begin controlled integration with covariance estimation workflows, scenario generation workflows, portfolio-loss pipelines, and VaR / CVaR comparison paths.",
                "Use the results of Stage 4 to identify which dtypes should be prioritized, tolerated, or restricted in later risk-model experiments."
              ]
            }
          ]
        }
      },
      {
        "id": "algorithm",
        "label": "Algorithm",
        "detail": {
          "title": "2026-2-1 Algorithm View",
          "cards": []
        }
      }
    ],
    "latest": {
      "date": "2026-02-01",
      "title": "dtcnumpy Stage 4 - Advanced Linear Algebra and Random Module Preparation",
      "points": [
        "Defined Stage 4 as the preparation layer between higher-level dtype-aware ops and later risk-kernel integration.",
        "Fixed the Stage 4 scope around advanced linear algebra, random-module design, and dtype-sensitive matrix-stability analysis.",
        "Kept this milestone inside semantic dtype simulation and out of hardware execution modeling."
      ]
    },
    "detail": {
      "title": "dtcnumpy Stage 4 - Advanced Linear Algebra and Random Module Preparation",
      "cards": [
        {
          "heading": "What This Build Did",
          "bullets": [
            "Defined Stage 4 as the transition from basic numeric operations to the first risk-kernel-critical infrastructure layer inside `dtcnumpy`.",
            "Fixed the Stage 4 scope around advanced linear algebra support and controlled random sampling support before later risk-pipeline integration.",
            "Positioned this stage as the preparation layer for covariance factorization, scenario generation, portfolio-loss simulation, and VaR / CVaR computation workflows."
          ]
        },
        {
          "heading": "Why This Stage Matters",
          "bullets": [
            "Stage 2 made dtype-aware objects observable, and Stage 3 made dtype-aware operation outputs comparable.",
            "Stage 4 is the first stage focused on the most numerically sensitive building blocks used in quantitative risk systems.",
            "Without Stage 4, the project still cannot test how reduced-precision semantics propagate through matrix factorization, repair logic, and simulated scenario generation."
          ]
        },
        {
          "heading": "Stage 4 Scope That Is Followed",
          "bullets": [
            "Stage 4 focuses on advanced linear algebra preparation, random-sampling preparation, and dtype-sensitive stability analysis.",
            "Stage 4 does not yet include full risk-pipeline integration, full covariance API expansion, performance benchmarking, CUDA hardware execution simulation, Tensor Core scheduling logic, or full random-module compatibility.",
            "The purpose of this stage is to prepare the simulator for the hardest numerical kernels before final model-level integration."
          ]
        },
        {
          "heading": "Target Modules For This Stage",
          "bullets": [
            "`dtcnumpy.linalg.cholesky`",
            "`dtcnumpy.linalg.eigh`",
            "`dtcnumpy.random.standard_normal`"
          ]
        },
        {
          "heading": "Advanced Linear Algebra Focus",
          "bullets": [
            "`linalg.cholesky` is required because Cholesky-style factorization is central to correlated Monte Carlo path generation.",
            "`linalg.eigh` is required because low-precision covariance inputs may lose numerical stability and need eigenvalue-based repair paths.",
            "Stage 4 is expected to clarify how dtype semantics affect matrix conditioning, factorization success or failure, eigenvalue clipping behavior, and reconstruction stability after repair."
          ]
        },
        {
          "heading": "Random Module Focus",
          "bullets": [
            "`random.standard_normal` is introduced because later Monte Carlo workflows require a reproducible source of scenario generation.",
            "All dtype paths should begin from the same base random stream and then apply dtype semantics consistently after generation.",
            "This keeps the comparison fair across dtypes and avoids mixing random-stream differences with precision-semantics differences."
          ]
        },
        {
          "heading": "Expected Numerical Questions",
          "bullets": [
            "Does reduced precision make covariance-like matrices more likely to fail factorization?",
            "Do BF16, TF32, or FP16-style semantics change eigenvalue spectra enough to require more frequent repair?",
            "When the same random stream is mapped through different dtype semantics, how large is the resulting drift in simulated outputs?",
            "Which dtype families appear stable enough to continue into later risk-kernel integration, and which ones require caution?"
          ]
        },
        {
          "heading": "Acceptance Target",
          "bullets": [
            "Advanced linear algebra results can be produced for all supported dtypes under a shared comparison structure.",
            "Cholesky-style and eigenvalue-style workflows can be analyzed under reduced-precision semantics.",
            "Random sampling can be generated reproducibly in a way that supports later Monte Carlo comparisons.",
            "The simulator remains within semantic-simulation scope and is ready to move into risk-kernel integration in the following stage."
          ]
        },
        {
          "heading": "Known Limitations At This Stage",
          "bullets": [
            "Stage 4 still compares semantic numerical behavior, not real CUDA device execution.",
            "It does not simulate Tensor Core scheduling, warp behavior, throughput differences, or memory hierarchy effects.",
            "Integer support remains comparison-oriented and full model-level validation is still deferred until later risk-kernel integration."
          ]
        },
        {
          "heading": "Next Step According To Plan",
          "bullets": [
            "Connect the advanced-linear-algebra and random infrastructure to the club's core risk kernels.",
            "Begin controlled integration with covariance estimation workflows, scenario generation workflows, portfolio-loss pipelines, and VaR / CVaR comparison paths.",
            "Use the results of Stage 4 to identify which dtypes should be prioritized, tolerated, or restricted in later risk-model experiments."
          ]
        }
      ]
    }
  },
  {
    "id": "2026-01-2",
    "ym": "2026-01",
    "shortTag": "INFRA",
    "defaultViewId": "infrastructure",
    "status": "COMPLETED",
    "downloadItemId": "risk-model-comparison-stage3-2026-01-2",
    "latestViews": [
      {
        "id": "infrastructure",
        "label": "Infrastructure",
        "latest": {
          "date": "2026-01 (2nd)",
          "title": "Datatype Comparison Stage 3 - Higher-Level Numerical Ops and Reporting",
          "points": [
            "Recorded the Stage 3 datatype comparison infrastructure milestone around higher-level numerical ops, reporting, and the correct precomputed per-dtype output path.",
            "Highlighted `DTCArray.from_versions(...)` as the architectural fix that avoids accidental double-rounding when Stage 3 operations produce outputs.",
            "Documented reductions/statistics, algebra, and utility operations together with the restricted `einsum` scope and pending dependency-enabled runtime verification."
          ]
        }
      },
      {
        "id": "algorithm",
        "label": "Algorithm",
        "latest": {
          "date": "2026-01 (2nd)",
          "title": "Meeting Record - Stage 3 Final Comparison and Recommendation",
          "points": [
            "Completed the final comparison pass across Historical Simulation, Parametric Normal, and EWMA + Monte Carlo using the shared baseline portfolio and fixed evaluation rules.",
            "Documented ranking tables, tradeoffs, hypothesis review, and a final recommendation instead of only preliminary observations.",
            "Selected EWMA + Monte Carlo as the strongest primary benchmark candidate under the tested setup, with Parametric Normal as the smooth reference model."
          ]
        }
      }
    ],
    "detailViews": [
      {
        "id": "infrastructure",
        "label": "Infrastructure",
        "detail": {
          "title": "Datatype Comparison Stage 3 - Higher-Level Numerical Ops and Reporting",
          "cards": [
            {
              "heading": "Meeting Objective",
              "bullets": [
                "Recorded the completion target for Stage 3 of the datatype comparison project.",
                "Extended the Stage 2 per-dtype array comparison framework into a higher-level numerical operation layer while preserving the semantics of precomputed dtype versions.",
                "Kept Stage 3 scoped to numerical operations and reporting rather than hardware execution modeling or Stage 4 workflow integration."
              ]
            },
            {
              "heading": "Core Architecture Update",
              "bullets": [
                "Added `DTCArray.from_versions(...)` as the Stage 3 construction path for operation outputs.",
                "The purpose of this constructor is to reuse already-computed per-dtype results directly instead of routing them through the Stage 2 conversion path again.",
                "This avoids accidental double-rounding and keeps `versions[\"fp64\"]` as the reference version."
              ]
            },
            {
              "heading": "Stage 3 Operation Set",
              "bullets": [
                "Reductions and statistics: `sum`, `mean`, `std`, `quantile`.",
                "Algebra: `dot`, `matmul`, `outer`, restricted `einsum`.",
                "Utilities: `reshape`, `transpose`, `.T`, `diag`, `eye`, `clip`, `isfinite`."
              ],
              "table": {
                "columns": ["Category", "Operations"],
                "rows": [
                  ["Reductions / Statistics", "`sum`, `mean`, `std`, `quantile`"],
                  ["Algebra", "`dot`, `matmul`, `outer`, restricted `einsum`"],
                  ["Utilities", "`reshape`, `transpose`, `.T`, `diag`, `eye`, `clip`, `isfinite`"]
                ]
              }
            },
            {
              "heading": "Special Design Rules",
              "bullets": [
                "Restricted `einsum` support to the explicit patterns `\"ij,j->i\"` and `\"ij,kj->ki\"` so Stage 3 stays within a controlled comparison scope.",
                "`isfinite` is intentionally treated as a per-dtype diagnostic helper and returns `dict[str, np.ndarray]` rather than a `DTCArray`."
              ]
            },
            {
              "heading": "Files Recorded For This Stage",
              "bullets": [
                "`dtcnumpy/core.py` for the Stage 3 output-construction logic.",
                "`dtcnumpy/ops.py` for Stage 3 higher-level operations.",
                "`dtcnumpy/__init__.py` and `dtcnumpy/report.py` for public API exposure and reporting.",
                "`tests/test_stage3_ops.py` for the dedicated Stage 3 test suite."
              ]
            },
            {
              "heading": "Functional Completion Checklist",
              "bullets": [
                "Stage 3 output constructor: completed.",
                "Double-rounding avoidance for Stage 3 outputs: completed.",
                "Reductions/statistics, algebra, utilities, and scope controls: completed.",
                "Source-level compile validation: completed.",
                "Dependency-enabled runtime tests: pending environment."
              ]
            },
            {
              "heading": "Validation Record",
              "bullets": [
                "Provided run instructions: `python3 -m pip install numpy pytest` and `python3 -m pytest -q`.",
                "Recorded source-level validation with `python3 -m py_compile dtcnumpy/__init__.py dtcnumpy/core.py dtcnumpy/dtypes.py dtcnumpy/ops.py dtcnumpy/report.py tests/test_stage2_array.py tests/test_stage3_ops.py`.",
                "Runtime execution remains pending in an environment where `numpy` and `pytest` are installed."
              ]
            },
            {
              "heading": "Scope Boundaries Preserved",
              "bullets": [
                "No hardware execution modeling or Tensor Core scheduling simulation.",
                "No advanced linear algebra, no random sampling, and no covariance or Stage 4 risk workflow integration.",
                "No general einsum engine and no full ndarray compatibility target."
              ]
            },
            {
              "heading": "Meeting Outcome",
              "bullets": [
                "Stage 3 is recorded as complete at the design and source level, with final runtime verification still pending a dependency-enabled environment.",
                "The milestone extends the datatype comparison framework into a controlled higher-level numerical operation layer while preserving strict scope limits."
              ]
            }
          ]
        }
      },
      {
        "id": "algorithm",
        "label": "Algorithm",
        "detail": {
          "title": "Meeting Record - Stage 3 Final Comparison and Recommendation",
          "cards": [
            {
              "heading": "Meeting Objective",
              "bullets": [
                "Completed Stage 3 by interpreting the finished Stage 2 outputs and producing a final model comparison under the shared multi-asset framework.",
                "Reviewed final comparison outputs, evaluated conservativeness, breach behavior, exceedance severity, and stability, and identified the main tradeoffs across models.",
                "Selected the most appropriate benchmark baseline for future club releases under the tested setup."
              ]
            },
            {
              "heading": "Inputs Reviewed",
              "bullets": [
                "Reviewed portfolio_returns.csv, historical_daily_risk.csv, parametric_daily_risk.csv, ewma_mc_daily_risk.csv, comparison_summary.csv, and comparison_analysis.md from the Stage 2 output package.",
                "Used the shared baseline portfolio setup: SPY, QQQ, TLT, GLD with equal weights.",
                "Kept the shared rules unchanged: 1-day horizon, alpha 0.99, 60-day rolling/init window, portfolio_loss = - portfolio_return, and breach = realized loss > estimated VaR."
              ]
            },
            {
              "heading": "Final Comparison Summary",
              "bullets": [
                "Historical Simulation: avg VaR 0.016231, avg CVaR 0.018748, breach rate 0.037037, breach gap 0.027037, exceedance severity 0.005207, CVaR stability proxy 0.001666, breaches 7.",
                "Parametric Normal: avg VaR 0.016414, avg CVaR 0.018950, breach rate 0.031746, breach gap 0.021746, exceedance severity 0.006153, CVaR stability proxy 0.001046, breaches 6.",
                "EWMA + Monte Carlo: avg VaR 0.017063, avg CVaR 0.019541, breach rate 0.015873, breach gap 0.005873, exceedance severity 0.008273, CVaR stability proxy 0.001979, breaches 3."
              ],
              "table": {
                "columns": ["Model", "Avg VaR", "Avg CVaR", "Breach Rate", "N Breaches"],
                "rows": [
                  ["Historical Simulation", "0.016231", "0.018748", "0.037037", "7"],
                  ["Parametric Normal", "0.016414", "0.018950", "0.031746", "6"],
                  ["EWMA + Monte Carlo", "0.017063", "0.019541", "0.015873", "3"]
                ]
              }
            },
            {
              "heading": "Metric Ranking Table",
              "bullets": [
                "Conservativeness by Avg VaR and Avg CVaR: EWMA + Monte Carlo ranked first, Parametric Normal second, Historical Simulation third.",
                "Coverage closeness by smallest breach gap: EWMA + Monte Carlo ranked first, Parametric Normal second, Historical Simulation third.",
                "Smoothness by smallest CVaR stability proxy: Parametric Normal ranked first, Historical Simulation second, EWMA + Monte Carlo third."
              ],
              "table": {
                "columns": ["Metric", "Most Favorable", "Middle", "Least Favorable"],
                "rows": [
                  ["Conservativeness (Avg VaR)", "EWMA + Monte Carlo", "Parametric Normal", "Historical Simulation"],
                  ["Conservativeness (Avg CVaR)", "EWMA + Monte Carlo", "Parametric Normal", "Historical Simulation"],
                  ["Coverage closeness", "EWMA + Monte Carlo", "Parametric Normal", "Historical Simulation"],
                  ["Smoothness (CVaR stability)", "Parametric Normal", "Historical Simulation", "EWMA + Monte Carlo"]
                ]
              }
            },
            {
              "heading": "Column Chart - Average VaR",
              "chart": {
                "subtitle": "Higher indicates a more conservative average VaR under the shared setup.",
                "series": [
                  { "label": "Historical Simulation", "value": 0.016231, "displayValue": "0.016231" },
                  { "label": "Parametric Normal", "value": 0.016414, "displayValue": "0.016414" },
                  { "label": "EWMA + Monte Carlo", "value": 0.017063, "displayValue": "0.017063" }
                ]
              }
            },
            {
              "heading": "Column Chart - Breach Rate",
              "chart": {
                "subtitle": "Expected breach rate at alpha = 0.99 is 0.010000.",
                "series": [
                  { "label": "Historical Simulation", "value": 0.037037, "displayValue": "0.037037" },
                  { "label": "Parametric Normal", "value": 0.031746, "displayValue": "0.031746" },
                  { "label": "EWMA + Monte Carlo", "value": 0.015873, "displayValue": "0.015873" },
                  { "label": "Expected", "value": 0.010000, "displayValue": "0.010000" }
                ]
              }
            },
            {
              "heading": "Column Chart - Number of Breaches",
              "chart": {
                "subtitle": "Lower is better under the shared evaluation rule.",
                "series": [
                  { "label": "Historical Simulation", "value": 7, "displayValue": "7" },
                  { "label": "Parametric Normal", "value": 6, "displayValue": "6" },
                  { "label": "EWMA + Monte Carlo", "value": 3, "displayValue": "3" }
                ]
              }
            },
            {
              "heading": "Interpretation by Model",
              "bullets": [
                "Historical Simulation remained the most direct empirical baseline, but it was the least conservative and recorded the highest breach count.",
                "Parametric Normal was the smoothest reference model, though its breach behavior still remained materially above the intended 1 percent level.",
                "EWMA + Monte Carlo was the strongest primary benchmark candidate because it was the most conservative and closest to the intended 99 percent coverage target."
              ]
            },
            {
              "heading": "Tradeoff Discussion",
              "bullets": [
                "EWMA + Monte Carlo was the most conservative model, but Parametric Normal was the smoothest; this showed a clear tradeoff between dynamic responsiveness and output stability.",
                "Historical Simulation and Parametric Normal were simpler to explain, but both produced breach rates materially above the expected level.",
                "EWMA + Monte Carlo behaved more like a dynamic production-style risk engine, while Historical Simulation remained useful as an empirical baseline reference."
              ]
            },
            {
              "heading": "Final Recommendation",
              "bullets": [
                "Recommended primary benchmark baseline: EWMA + Monte Carlo, because it had the highest average VaR/CVaR, the lowest breach count, and the smallest breach gap.",
                "Recommended smooth reference model: Parametric Normal, because it had the smallest CVaR stability proxy and the most stable output path.",
                "Recommended empirical baseline: Historical Simulation, because it remained the most direct and intuitive empirical comparison model."
              ]
            },
            {
              "heading": "Stage 1 Hypothesis Review",
              "bullets": [
                "Historical Simulation reacting more slowly was supported by the highest breach count and the lowest VaR/CVaR levels.",
                "Parametric Normal being smoother but potentially understating tail risk was supported by the smallest stability proxy and breach behavior still above target.",
                "EWMA + Monte Carlo being more responsive and more conservative was supported by the highest VaR/CVaR levels and breach behavior closest to the intended 1 percent rate."
              ]
            },
            {
              "heading": "How To Use",
              "bullets": [
                "Use stage3_meeting_record.md as the complete final-review document with tables, ranking logic, recommendation, and text-based graphs.",
                "Use stage3_comparison_summary.csv when you want the machine-readable final comparison table for charts, slides, or later analysis.",
                "Use stage3_ranking_table.csv when you want the compact ranking view for recommendation-oriented summaries, and use summary.md for a short top-level overview."
              ]
            },
            {
              "heading": "What This Update Adds",
              "bullets": [
                "Converted Stage 2 preliminary outputs into a final model-comparison decision record.",
                "Added explicit recommendation tables, tradeoff discussion, limitation notes, and a formal benchmark selection outcome.",
                "Added table-first reporting and text-based graphs so the results can be reviewed quickly even without separate image assets."
              ]
            },
            {
              "heading": "Limitations",
              "bullets": [
                "Only one portfolio was tested in this cycle, so results may still depend on this portfolio composition.",
                "The current conclusions are based on a fixed parameter setup; alternative windows or Monte Carlo sizes may shift relative behavior.",
                "No second-portfolio robustness check was completed yet, so cross-allocation stability remains untested."
              ]
            },
            {
              "heading": "Meeting Outcome",
              "bullets": [
                "Stage 3 completed the first full risk-model comparison cycle for the project and selected a recommended benchmark baseline for future releases.",
                "Under the tested setup, EWMA + Monte Carlo was selected as the strongest primary benchmark candidate, Parametric Normal as the smoothest reference model, and Historical Simulation as the main empirical baseline."
              ]
            }
          ]
        }
      }
    ],
    "latest": {
      "date": "2026-01 (2nd)",
      "title": "Datatype Comparison Stage 3 - Higher-Level Numerical Ops and Reporting",
      "points": [
        "Recorded the Stage 3 datatype comparison infrastructure milestone around higher-level numerical ops, reporting, and the correct precomputed per-dtype output path.",
        "Highlighted `DTCArray.from_versions(...)` as the architectural fix that avoids accidental double-rounding when Stage 3 operations produce outputs.",
        "Documented reductions/statistics, algebra, and utility operations together with the restricted `einsum` scope and pending dependency-enabled runtime verification."
      ]
    },
    "detail": {
      "title": "Datatype Comparison Stage 3 - Higher-Level Numerical Ops and Reporting",
      "cards": [
        {
          "heading": "Meeting Objective",
          "bullets": [
            "Recorded the completion target for Stage 3 of the datatype comparison project.",
            "Extended the Stage 2 per-dtype array comparison framework into a higher-level numerical operation layer while preserving the semantics of precomputed dtype versions.",
            "Kept Stage 3 scoped to numerical operations and reporting rather than hardware execution modeling or Stage 4 workflow integration."
          ]
        },
        {
          "heading": "Core Architecture Update",
          "bullets": [
            "Added `DTCArray.from_versions(...)` as the Stage 3 construction path for operation outputs.",
            "The purpose of this constructor is to reuse already-computed per-dtype results directly instead of routing them through the Stage 2 conversion path again.",
            "This avoids accidental double-rounding and keeps `versions[\"fp64\"]` as the reference version."
          ]
        },
        {
          "heading": "Stage 3 Operation Set",
          "bullets": [
            "Reductions and statistics: `sum`, `mean`, `std`, `quantile`.",
            "Algebra: `dot`, `matmul`, `outer`, restricted `einsum`.",
            "Utilities: `reshape`, `transpose`, `.T`, `diag`, `eye`, `clip`, `isfinite`."
          ],
          "table": {
            "columns": ["Category", "Operations"],
            "rows": [
              ["Reductions / Statistics", "`sum`, `mean`, `std`, `quantile`"],
              ["Algebra", "`dot`, `matmul`, `outer`, restricted `einsum`"],
              ["Utilities", "`reshape`, `transpose`, `.T`, `diag`, `eye`, `clip`, `isfinite`"]
            ]
          }
        },
        {
          "heading": "Special Design Rules",
          "bullets": [
            "Restricted `einsum` support to the explicit patterns `\"ij,j->i\"` and `\"ij,kj->ki\"` so Stage 3 stays within a controlled comparison scope.",
            "`isfinite` is intentionally treated as a per-dtype diagnostic helper and returns `dict[str, np.ndarray]` rather than a `DTCArray`."
          ]
        },
        {
          "heading": "Files Recorded For This Stage",
          "bullets": [
            "`dtcnumpy/core.py` for the Stage 3 output-construction logic.",
            "`dtcnumpy/ops.py` for Stage 3 higher-level operations.",
            "`dtcnumpy/__init__.py` and `dtcnumpy/report.py` for public API exposure and reporting.",
            "`tests/test_stage3_ops.py` for the dedicated Stage 3 test suite."
          ]
        },
        {
          "heading": "Functional Completion Checklist",
          "bullets": [
            "Stage 3 output constructor: completed.",
            "Double-rounding avoidance for Stage 3 outputs: completed.",
            "Reductions/statistics, algebra, utilities, and scope controls: completed.",
            "Source-level compile validation: completed.",
            "Dependency-enabled runtime tests: pending environment."
          ]
        },
        {
          "heading": "Validation Record",
          "bullets": [
            "Provided run instructions: `python3 -m pip install numpy pytest` and `python3 -m pytest -q`.",
            "Recorded source-level validation with `python3 -m py_compile dtcnumpy/__init__.py dtcnumpy/core.py dtcnumpy/dtypes.py dtcnumpy/ops.py dtcnumpy/report.py tests/test_stage2_array.py tests/test_stage3_ops.py`.",
            "Runtime execution remains pending in an environment where `numpy` and `pytest` are installed."
          ]
        },
        {
          "heading": "Scope Boundaries Preserved",
          "bullets": [
            "No hardware execution modeling or Tensor Core scheduling simulation.",
            "No advanced linear algebra, no random sampling, and no covariance or Stage 4 risk workflow integration.",
            "No general einsum engine and no full ndarray compatibility target."
          ]
        },
        {
          "heading": "Meeting Outcome",
          "bullets": [
            "Stage 3 is recorded as complete at the design and source level, with final runtime verification still pending a dependency-enabled environment.",
            "The milestone extends the datatype comparison framework into a controlled higher-level numerical operation layer while preserving strict scope limits."
          ]
        }
      ]
    }
  },

  {
    "id": "2026-01-1",
    "ym": "2026-01",
    "shortTag": "ALGORITHM",
    "status": "COMPLETED",
    "downloadItemId": "risk-model-comparison-stage2-2026-01-1",
    "latestViews": [
      {
        "id": "infrastructure",
        "label": "Infrastructure",
        "latest": {
          "date": "2026-01",
          "title": "Meeting Record - dtcnumpy Stage 2 Base Container + Data-Type Conversion API",
          "points": [
            "Implemented the Stage 2 dtcnumpy package structure, base DTCArray container, and the first array/asarray/astype conversion API.",
            "Added comparison reporting around the FP64 reference path while keeping arithmetic kernels, linalg, random modules, and risk-pipeline integration out of scope for this stage.",
            "Completed the implementation structure, but execution verification is still pending because numpy and pytest are not installed in the current environment."
          ]
        }
      },
      {
        "id": "algorithm",
        "label": "Algorithm",
        "latest": {
          "date": "2026-01",
          "title": "Meeting Record - Stage 2 Implementation and Preliminary Results",
          "points": [
            "Completed the first baseline-portfolio implementation pass using a shared equal-weight SPY, QQQ, TLT, GLD portfolio built from the existing returns.csv dataset.",
            "Ran Historical Simulation, Parametric Normal, and EWMA + Monte Carlo under the same 1-day, 99 percent, 60-day rolling setup and generated a shared comparison package.",
            "Recorded preliminary comparison outputs without making a final recommendation; interpretation and baseline selection are deferred to Stage 3."
          ]
        }
      }
    ],
    "detailViews": [
      {
        "id": "infrastructure",
        "label": "Infrastructure",
        "detail": {
          "title": "Meeting Record - dtcnumpy Stage 2 Base Container + Data-Type Conversion API",
          "cards": [
            {
              "heading": "What This Build Did",
              "bullets": [
                "Implemented the Stage 2 package structure for dtcnumpy, including dtcnumpy/dtypes.py, dtcnumpy/core.py, dtcnumpy/report.py, dtcnumpy/__init__.py, and tests/test_stage2_array.py.",
                "Built a base DTCArray container that stores an FP64 reference representation, precomputed simulated versions for all Stage 2 formats, and an active dtype view for later comparison and casting workflows.",
                "Added the core Stage 2 creation and conversion interface: array(...), asarray(...), and astype(...).",
                "Implemented the first reporting layer so Stage 2 objects can be compared against the FP64 reference through a comparison table.",
                "Kept the implementation within the Stage 2 boundary and did not add arithmetic kernels, linalg kernels, random modules, or risk-pipeline integration yet."
              ]
            },
            {
              "heading": "Stage 2 Scope That Was Followed",
              "bullets": [
                "Stage 2 is limited to base container construction, dtype conversion semantics, active dtype switching through astype(...), and comparison reporting.",
                "Stage 2 does not include dot, mean, quantile, einsum, linalg, random, full NumPy compatibility, or hardware execution simulation.",
                "The goal of this build is to make dtype-aware objects observable and comparable before arithmetic kernels are introduced in later stages."
              ]
            },
            {
              "heading": "Supported Formats In This Build",
              "bullets": [
                "FP64, FP32, FP16, BF16, TF32, INT8, INT16, and INT32 are included in the Stage 2 implementation boundary.",
                "FP64 is used as the high-precision reference.",
                "FP32 is treated as the practical baseline for future comparison.",
                "All Stage 2 comparisons are currently framed relative to FP64."
              ]
            },
            {
              "heading": "Data-Type Semantics Implemented",
              "bullets": [
                "FP64, FP32, and FP16 are represented through reduced-precision conversion paths consistent with their intended floating-point roles.",
                "BF16 and TF32 are approximated through explicit float32 bit truncation rather than native hardware execution.",
                "Integer formats use symmetric quantize/dequantize semantics instead of raw direct integer casting.",
                "Integer results are stored as dequantized float64 values so they can be compared directly against the FP64 reference in reporting."
              ]
            },
            {
              "heading": "Container And API Design",
              "bullets": [
                "DTCArray now acts as the base Stage 2 object for dtcnumpy.",
                "A single input is converted into multiple simulated dtype views at construction time.",
                "astype(...) returns a new container with the requested active dtype while reusing the stored dtype versions.",
                "Reporting is handled through the Stage 2 comparison layer, which is intended to support meeting demos and early semantic validation before the numerical API expands."
              ]
            },
            {
              "heading": "What This Build Enables",
              "bullets": [
                "The team can now create a single array input and inspect how it is represented under multiple data-type semantics.",
                "The project now has a fixed object model that later stages can build on when arithmetic functions are introduced.",
                "The simulator can already support early comparison discussions around value drift, percentage error, integer quantization effects, and reduced mantissa precision effects.",
                "This gives the CUDA and infrastructure track a concrete base before operation-level precision sensitivity is studied in Stage 3 and beyond."
              ]
            },
            {
              "heading": "Known Limitations At This Stage",
              "bullets": [
                "This build only covers input/value conversion semantics.",
                "It does not simulate CUDA cores, Tensor Core scheduling, throughput, or device-level execution.",
                "Integer support is limited to quantize/dequantize comparison behavior for now.",
                "No arithmetic kernels are included yet, so Stage 2 cannot evaluate operation-level drift at this point.",
                "No risk-pipeline kernel has been integrated yet."
              ]
            },
            {
              "heading": "Validation Status",
              "bullets": [
                "Initial Stage 2 test files were added.",
                "A local test command was prepared: python3 -m pytest -q.",
                "Full execution verification has not been completed yet in the current environment because numpy and pytest are not installed.",
                "As a result, Stage 2 should currently be recorded as implementation completed in structure and execution verification pending environment setup."
              ]
            },
            {
              "heading": "Why This Stage Matters",
              "bullets": [
                "Stage 2 turns the dtcnumpy idea into an actual package-level prototype.",
                "The project now has a controlled base object and a fixed set of supported data-type paths.",
                "This stage reduces ambiguity before arithmetic operations are introduced later.",
                "Without Stage 2, later comparisons in risk kernels would not have a stable semantic foundation."
              ]
            },
            {
              "heading": "Next Step According To Plan",
              "bullets": [
                "Prepare a simple Stage 2 demo script for meeting presentation.",
                "Set up the local environment with required dependencies: numpy and pytest.",
                "Run the existing Stage 2 tests once the environment is available.",
                "After verification, move to Stage 3: MVP numeric operations for the risk pipeline, beginning with controlled math functions rather than full NumPy behavior."
              ]
            },
            {
              "heading": "Published Artifacts",
              "bullets": [
                "Stage 2 package draft: dtcnumpy/dtypes.py, dtcnumpy/core.py, dtcnumpy/report.py, dtcnumpy/__init__.py.",
                "Stage 2 initial test file: tests/test_stage2_array.py.",
                "Stage 2 status note: implementation drafted, test execution pending environment setup."
              ]
            }
          ]
        }
      },
      {
        "id": "algorithm",
        "label": "Algorithm",
        "detail": {
          "title": "Meeting Record - Stage 2 Implementation and Preliminary Results",
          "cards": [
            {
              "heading": "Meeting Objective",
              "bullets": [
                "Recorded the completion of Stage 2 for the Risk Team project under the shared multi-asset comparison framework.",
                "Moved from the Stage 1 design specification into an implementation-ready workflow using a shared input dataset and a shared portfolio definition.",
                "This stage does not provide a final recommendation or final interpretation; those are reserved for Stage 3."
              ]
            },
            {
              "heading": "Implementation Build",
              "bullets": [
                "Implemented the Stage 2 comparison runner in risk_pipeline/cli/run_comparison.py.",
                "Added a workflow verification test in tests/test_comparison_workflow.py.",
                "The workflow reuses the existing returns.csv, builds an equal-weight SPY/QQQ/TLT/GLD portfolio, runs Historical Simulation, Parametric Normal, and repo-based EWMA + Monte Carlo on the same aligned dates, and writes CSV/Markdown artifacts."
              ]
            },
            {
              "heading": "Completed Implementation Scope",
              "bullets": [
                "Reused the existing returns.csv dataset from the risk pipeline output without re-downloading market data.",
                "Constructed a common equal-weight baseline portfolio using SPY, QQQ, TLT, and GLD.",
                "Ran all three selected models successfully: Historical Simulation VaR/CVaR, Parametric Normal VaR/CVaR, and EWMA + Monte Carlo VaR/CVaR."
              ]
            },
            {
              "heading": "Shared Experimental Setup",
              "bullets": [
                "Input file: returns.csv. Portfolio: SPY / QQQ / TLT / GLD. Weighting rule: equal weight.",
                "Horizon: 1-day. Confidence level: 0.99. Rolling/init window: 60 trading days.",
                "Loss definition: portfolio_loss = - portfolio_return. Breach definition: realized loss > estimated VaR. Number of aligned observations: 189."
              ]
            },
            {
              "heading": "Generated Output Artifacts",
              "bullets": [
                "Generated portfolio_returns.csv, historical_daily_risk.csv, parametric_daily_risk.csv, ewma_mc_daily_risk.csv, comparison_summary.csv, and comparison_analysis.md.",
                "Output directory recorded for the baseline run: results/comparison/20260306T220658Z.",
                "Prepared the workflow output package for later Stage 3 interpretation."
              ]
            },
            {
              "heading": "Summary Comparison Table",
              "bullets": [
                "Historical Simulation: avg VaR 0.016231, avg CVaR 0.018748, breach rate 0.037037, n breaches 7.",
                "Parametric Normal: avg VaR 0.016414, avg CVaR 0.018950, breach rate 0.031746, n breaches 6.",
                "EWMA + Monte Carlo: avg VaR 0.017063, avg CVaR 0.019541, breach rate 0.015873, n breaches 3."
              ]
            },
            {
              "heading": "How To Use",
              "bullets": [
                "Use stage2_meeting_record.md for the full meeting-style write-up and project record.",
                "Use comparison_summary.csv when you want the machine-readable model comparison table for later plotting, analysis, or website integration.",
                "Use comparison_analysis.md for the short internal interpretation note, and use params.json plus summary.md to understand the shared run setup quickly."
              ]
            },
            {
              "heading": "How To Run",
              "bullets": [
                "Run the Stage 2 workflow through risk_pipeline/cli/run_comparison.py inside the project environment so all three models share the same input and output schema.",
                "Expected baseline input is the existing returns.csv; the workflow should construct the equal-weight SPY/QQQ/TLT/GLD portfolio series and then write the comparison outputs under results/comparison/<run_id>/.",
                "Verification command used in this stage: ./.venv/bin/python -m unittest tests.test_comparison_workflow."
              ]
            },
            {
              "heading": "Main Findings",
              "bullets": [
                "EWMA + Monte Carlo was the most conservative in average VaR/CVaR and also closest to the expected 1 percent breach rate in this baseline run.",
                "Parametric Normal was the smoothest model by the CVaR stability proxy.",
                "Historical Simulation was less conservative than EWMA + Monte Carlo and recorded the highest breach count in the current baseline run."
              ]
            },
            {
              "heading": "Stage 2 Completion Check",
              "bullets": [
                "Completed: reuse existing returns.csv, build equal-weight baseline portfolio, run all three models, align outputs on shared dates, generate summary comparison table, and save machine-readable artifacts.",
                "Prepared a Stage 3-ready results package for interpretation and final comparison work.",
                "Status: completed for baseline portfolio first run."
              ]
            },
            {
              "heading": "Verification",
              "bullets": [
                "Implementation workflow test passed successfully.",
                "Verification item: comparison workflow unit test.",
                "Command used: ./.venv/bin/python -m unittest tests.test_comparison_workflow."
              ]
            },
            {
              "heading": "Notes for Next Stage",
              "bullets": [
                "Stage 3 will handle interpretation of model differences, discussion of tradeoffs, evaluation on the second portfolio if required, and the final recommendation for benchmark baseline selection.",
                "No final model recommendation is made in this Stage 2 record.",
                "The current output package is intended to serve as the direct input to Stage 3."
              ]
            },
            {
              "heading": "Meeting Outcome",
              "bullets": [
                "Stage 2 was completed successfully for the baseline portfolio first run.",
                "The team now has a shared comparison result package that can be used as the input for Stage 3 interpretation and final comparison work."
              ]
            }
          ]
        }
      }
    ],
    "latest": {
      "date": "2026-01",
      "title": "Meeting Record - Stage 2 Implementation and Preliminary Results",
      "points": [
        "Completed the first baseline-portfolio implementation pass using a shared equal-weight SPY, QQQ, TLT, GLD portfolio built from the existing returns.csv dataset.",
        "Ran Historical Simulation, Parametric Normal, and EWMA + Monte Carlo under the same 1-day, 99 percent, 60-day rolling setup and generated a shared comparison package.",
        "Recorded preliminary comparison outputs without making a final recommendation; interpretation and baseline selection are deferred to Stage 3."
      ]
    },
    "detail": {
      "title": "Meeting Record - Stage 2 Implementation and Preliminary Results",
      "cards": []
    }
  },

  {
    "id": "2025-12-2",
    "ym": "2025-12",
    "shortTag": "COMPARISON",
    "status": "COMPLETED",
    "downloadItemId": "risk-model-comparison-stage1-2025-12-2",
    "latestViews": [
      {
        "id": "infrastructure",
        "label": "Infrastructure",
        "latest": {
          "date": "2025-12 (2nd)",
          "title": "Meeting Record - dtcnumpy Stage 1 Scope Definition + Data-Type Semantics Design",
          "points": [
            "Defined dtcnumpy as a data-type semantics simulator for quantitative computation rather than a CUDA hardware simulator.",
            "Froze the v0.1 scope around precision semantics, selected FP64/FP32/FP16/BF16/TF32/INT8/INT16/INT32, and fixed FP64 as the high-precision reference.",
            "Prepared the semantic rules, architecture boundary, and first target use case for later risk-pipeline integration."
          ]
        }
      },
      {
        "id": "algorithm",
        "label": "Algorithm",
        "latest": {
          "date": "2025-12 (2nd)",
          "title": "Meeting Record - Stage 1 Research Design + Specification",
          "points": [
            "Defined the first formal comparison framework for the Risk Team under the club's reproducible multi-asset pipeline and locked the initial model set, portfolio setup, and evaluation rules.",
            "Selected three Phase 1 models for comparison: Historical Simulation VaR/CVaR, Parametric VaR/CVaR, and EWMA + Monte Carlo VaR/CVaR.",
            "Published Stage 1 research artifacts including the design report, model cards, evaluation design, portfolio definition, and traceability files for later implementation."
          ]
        }
      }
    ],
    "detailViews": [
      {
        "id": "infrastructure",
        "label": "Infrastructure",
        "detail": {
          "title": "Meeting Record - dtcnumpy Stage 1 Scope Definition + Data-Type Semantics Design",
          "cards": [
            {
              "heading": "What This Build Did",
              "bullets": [
                "Defined dtcnumpy as a data-type semantics simulator for quantitative computation rather than a CUDA hardware simulator.",
                "Fixed the first-version project boundary so the work stays focused on numerical precision comparison instead of expanding into a full NumPy replacement.",
                "Selected the initial supported formats for version 0.1: FP64, FP32, FP16, BF16, TF32, INT8, INT16, and INT32.",
                "Established FP64 as the high-precision reference and FP32 as the practical baseline for later result interpretation.",
                "Began drafting semantic rules for each supported format, including rounding behavior, accumulation behavior, and integer quantization/dequantization logic.",
                "Defined the intended user-facing interface as a lightweight NumPy-style wrapper such as import dtcnumpy as dnp."
              ]
            },
            {
              "heading": "Why This Stage Matters",
              "bullets": [
                "The club does not want to build a fake CUDA-core simulator. That scope would be too large, too hardware-specific, and not aligned with the current benchmarking goals.",
                "The actual goal is to study how different numeric formats change outputs in quantitative workflows, especially in risk-related pipelines such as covariance estimation, Monte Carlo sampling, portfolio-loss computation, and VaR/CVaR evaluation.",
                "Before implementation starts, the semantics of each supported format must be clearly defined. Without this stage, later comparisons would be inconsistent and the project would lose interpretability.",
                "This stage turns the project from a vague mixed-precision idea into a controlled benchmark tool with a precise role inside the club's CUDA and infrastructure track."
              ]
            },
            {
              "heading": "Scope Frozen For V0.1",
              "bullets": [
                "dtcnumpy v0.1 is scoped as a precision-semantics simulator only.",
                "It will not simulate CUDA cores, tensor core scheduling, warp execution, device throughput, or full NumPy compatibility.",
                "It will simulate data-type casting behavior, reduced-precision rounding behavior, accumulation behavior, integer quantization/dequantization behavior, and output drift relative to a high-precision reference.",
                "The first version will target only the club's risk pipeline kernels, not the entire repository."
              ]
            },
            {
              "heading": "Supported Formats In Stage 1",
              "bullets": [
                "FP64 - reference precision for comparison and error reporting.",
                "FP32 - practical baseline approximating the club's current default numerical workflow.",
                "FP16 - reduced floating-point precision for basic mixed-precision experiments.",
                "BF16 - reduced mantissa precision with broader dynamic-range intent than FP16.",
                "TF32 - simulated Tensor-style reduced mantissa precision with FP32-oriented workflow semantics.",
                "INT8, INT16, INT32 - integer quantization paths and accumulation baselines for low-precision integer operations."
              ]
            },
            {
              "heading": "Data-Type Semantics Design",
              "bullets": [
                "For floating-point formats, Stage 1 specifies how values are rounded when entering and leaving an operation.",
                "For BF16 and TF32, the project will simulate reduced precision at the semantic level rather than relying on hardware-native execution.",
                "For integer formats, support is defined through quantization rule, clipping range, accumulation rule, and dequantization rule rather than simple direct casting.",
                "This distinction matters because direct astype(int8)-style truncation would not provide a meaningful comparison for quantitative computations.",
                "The simulator is intended to compare numerical behavior, not just storage type labels."
              ]
            },
            {
              "heading": "Architecture Boundary",
              "bullets": [
                "The project will use a lightweight wrapper interface: import dtcnumpy as dnp.",
                "The first version will expose only a minimal API needed for later risk-pipeline integration.",
                "Stage 1 does not attempt to implement all of NumPy.",
                "Instead, this stage prepares a small controlled framework with planned components such as core dtype handling, operation routing, linear algebra helpers, random sampling utilities, and reporting/comparison tables.",
                "This boundary is necessary to prevent the project from turning into an uncontrolled reimplementation effort."
              ]
            },
            {
              "heading": "First Version Target Use Case",
              "bullets": [
                "The first intended downstream use case is the club's existing risk workflow, especially covariance estimation, Cholesky-based simulation paths, portfolio-loss aggregation, and VaR/CVaR output comparison.",
                "Stage 1 does not yet run these kernels. Instead, it prepares the semantic rules required so those kernels can be integrated consistently in later stages."
              ]
            },
            {
              "heading": "Expected Output Of Stage 1",
              "bullets": [
                "A frozen scope definition for dtcnumpy v0.1.",
                "A written semantics table for all supported data types.",
                "A fixed project distinction between what dtcnumpy is and what dtcnumpy is not.",
                "A first draft of the package structure and minimal API boundary.",
                "A comparison philosophy centered on value drift, percentage error, and later decision-level impact analysis."
              ]
            },
            {
              "heading": "Acceptance Check For This Stage",
              "bullets": [
                "Stage 1 is considered complete when the project can answer clearly what dtcnumpy is supposed to do, what is intentionally excluded, which data types are supported in v0.1, how each type is semantically modeled, and what reference precision will be used for later comparisons.",
                "If these answers are not fixed, later implementation will not be stable enough for reproducible benchmarking."
              ]
            },
            {
              "heading": "Next Step",
              "bullets": [
                "Implement the base container and creation functions for dtcnumpy, including array, asarray, and astype.",
                "Build the first comparison-ready object representation so later stages can evaluate how the same input behaves under multiple simulated data-type paths.",
                "Start with reporting before advanced math so the project can validate semantic correctness early."
              ]
            },
            {
              "heading": "Published Artifacts",
              "bullets": [
                "Planned Stage 1 project note describing dtcnumpy scope and version boundary.",
                "Planned semantics draft for FP64, FP32, FP16, BF16, TF32, INT8, INT16, and INT32.",
                "Planned architecture sketch for the minimal API and module layout.",
                "Planned Stage 1 summary for website publication."
              ]
            }
          ]
        }
      },
      {
        "id": "algorithm",
        "label": "Algorithm",
        "detail": {
          "title": "Meeting Record - Stage 1 Research Design + Specification",
          "cards": [
            {
              "heading": "Report",
              "bullets": [
                "Risk",
                "Model Comparison Stage 1 - Research Design + Specification",
                "Report"
              ]
            },
            {
              "heading": "What This Build Did",
              "bullets": [
                "Defined the first formal comparison framework for the club's Risk Team under the existing reproducible multi-asset pipeline.",
                "Selected three Phase 1 risk models for comparison: Historical Simulation VaR/CVaR, Parametric VaR/CVaR, and EWMA + Monte Carlo VaR/CVaR.",
                "Converted the club's prior infrastructure progress into a research-oriented benchmark design by locking the model set, portfolio structure, and evaluation criteria."
              ]
            },
            {
              "heading": "Project Objective",
              "bullets": [
                "The goal of this stage is not to produce final model rankings yet, but to define what a meaningful risk-model comparison should look like under a shared framework.",
                "The project asks which model is the most stable, most responsive, most conservative, and most suitable as the club's future benchmark baseline.",
                "This stage establishes the design rules needed before implementation and interpretation can begin in later updates."
              ]
            },
            {
              "heading": "Phase 1 Model Set",
              "bullets": [
                "Historical Simulation VaR/CVaR: empirical rolling-window baseline using realized portfolio returns directly.",
                "Parametric VaR/CVaR: moment-based model using estimated mean/covariance with an approximate normality assumption.",
                "EWMA + Monte Carlo VaR/CVaR: volatility-sensitive scenario model aligned with the club's existing reproducible risk pipeline."
              ]
            },
            {
              "heading": "Portfolio Design",
              "bullets": [
                "Baseline portfolio: SPY, QQQ, TLT, GLD with equal weights.",
                "Comparison portfolio: SPY, QQQ, IWM, TLT with equal weights.",
                "The two-portfolio setup was chosen to test whether model behavior remains consistent across a more balanced allocation and a more equity-heavy allocation."
              ]
            },
            {
              "heading": "Evaluation Framework",
              "bullets": [
                "Locked the common comparison rules across models: 1-day horizon, alpha = 0.99, shared rolling design, and identical portfolio definitions within each experiment.",
                "Defined the main evaluation metrics: breach rate, breach rate gap, exceedance severity, CVaR stability, responsiveness to volatility change, and conservativeness.",
                "Standardized the loss convention and breach definition so later results reflect model behavior rather than inconsistent setup choices."
              ]
            },
            {
              "heading": "Expected Hypotheses",
              "bullets": [
                "Historical Simulation is expected to be intuitive and relatively stable, but slower to react during sharp volatility changes.",
                "Parametric VaR/CVaR is expected to be smooth and efficient, but may understate tail risk under fat-tailed market behavior.",
                "EWMA + Monte Carlo is expected to respond more quickly to changing volatility and may provide more conservative tail estimates in stressed periods."
              ]
            },
            {
              "heading": "Stage 1 Deliverables",
              "bullets": [
                "Completed a Stage 1 design report covering project objective, research questions, scope, model definitions, portfolio definitions, and evaluation criteria.",
                "Drafted model cards for all three Phase 1 models, including assumptions, inputs, outputs, strengths, weaknesses, and expected behavior.",
                "Established the implementation handoff for later stages so all models can be connected to the same reproducible artifact workflow."
              ]
            },
            {
              "heading": "What You Can Use It For",
              "bullets": [
                "A formal blueprint for implementing the club's first true multi-model risk benchmark study.",
                "A shared design standard so later portfolio runs and backtests can be interpreted consistently.",
                "A clean transition from infrastructure milestones to a research-style comparison project with an eventual model recommendation."
              ]
            },
            {
              "heading": "Next Step",
              "bullets": [
                "Implement the three selected models under the same output schema and run them on the baseline portfolio first.",
                "Generate preliminary daily VaR/CVaR series and backtest metrics before extending the comparison to the second portfolio.",
                "Use the next update to verify that all models run correctly under the shared design and to review the first cross-model differences."
              ]
            },
            {
              "heading": "Published Artifacts",
              "bullets": [
                "Saved Stage 1 documentation: stage1_report.md, model_cards.md, evaluation_design.md, portfolio_definition.md.",
                "Saved design traceability outputs: params.json and summary.md for the selected model set, portfolio setup, and evaluation rules.",
                "Prepared the project for Stage 2 implementation under the existing reproducible artifact pipeline.",
                "Independent student community. Not affiliated with or endorsed by any University. No live trading; no exchange connectivity."
              ]
            }
          ]
        }
      }
    ],
    "latest": {
      "date": "2025-12 (2nd)",
      "title": "Meeting Record - Stage 1 Research Design + Specification",
      "points": [
        "Defined the first formal comparison framework for the Risk Team under the club's reproducible multi-asset pipeline and locked the initial model set, portfolio setup, and evaluation rules.",
        "Selected three Phase 1 models for comparison: Historical Simulation VaR/CVaR, Parametric VaR/CVaR, and EWMA + Monte Carlo VaR/CVaR.",
        "Published Stage 1 research artifacts including the design report, model cards, evaluation design, portfolio definition, and traceability files for later implementation."
      ]
    },
    "detail": {
      "title": "Meeting Record - Stage 1 Research Design + Specification",
      "cards": []
    }
  },

  {
    "id": "2025-12",
    "ym": "2025-12",
    "shortTag": "CUDA",
    "status": "COMPLETED",
    "downloadItemId": "pricing-no-arbitrage-cpu-vs-gpu-2025-12",
    "latest": {
      "date": "2025-12",
      "title": "Derivatives Pricing + No-Arbitrage Checks (SPY, CPU vs GPU T4)",
      "points": [
        "Built a reproducible derivatives pricing pipeline that reuses the existing yfinance download patch, estimates sigma via 60-day historical volatility, and prices a European call via Black–Scholes, Binomial CRR, and Monte Carlo.",
        "Validated correctness against the Black–Scholes oracle and no-arbitrage checks: CRR (1000 steps) matched BS to numerical precision, put-call parity error was near zero, and both CPU and GPU Monte Carlo 95% CIs contained the BS price.",
        "Benchmarked Monte Carlo on NVIDIA Tesla T4 (CuPy): steady-state GPU runs were about 4.5× faster than CPU for 100,000 paths, while the first GPU run included one-time CUDA initialization overhead."
      ]
    },
    "detail": {
      "title": "Derivatives Pricing + No-Arbitrage Checks (SPY, CPU vs GPU T4)",
      "cards": [
        {
          "heading": "What This Build Did",
          "bullets": [
            "Reused the existing yfinance download patch to fetch and align SPY prices, then computed log returns for volatility estimation.",
            "Estimated sigma using a 60-day historical volatility baseline (annualization 252) and used it consistently across all pricers.",
            "Priced a European option using three engines: Black–Scholes (analytic), Binomial CRR (tree), and Monte Carlo (CPU and GPU backends)."
          ]
        },
        {
          "heading": "Data and Run Snapshot",
          "bullets": [
            "Underlying: SPY. Date range: 2025-01-01..2026-01-01. rows_prices=250, rows_returns=249.",
            "Option: European call. S0=681.919983, K=500, T=0.082192 years (30 days), r=0.03, q=0.0.",
            "Sigma (hist vol): window=60, sigma_annual=0.13008054 (annualization=252)."
          ]
        },
        {
          "heading": "Correctness Check: BS vs CRR vs Monte Carlo",
          "bullets": [
            "Black–Scholes call price: 183.1513408860.",
            "Binomial CRR (steps=1000): matched BS to numerical precision (abs_error_vs_bs ≈ 3.7e-11).",
            "Monte Carlo (paths=100000): CPU price=183.22539960 (CI95 [183.06722407, 183.38357514]); GPU(T4) price=183.14226308 (CI95 [182.98490125, 183.29962491]); BS lies within both CIs."
          ]
        },
        {
          "heading": "No-Arbitrage Validation",
          "bullets": [
            "Put-call parity: abs_error ≈ 2.84e-14 (numerical noise level).",
            "Bounds checks: call_within_bounds=true and put_within_bounds=true for the configured inputs."
          ]
        },
        {
          "heading": "Performance: CPU vs GPU (NVIDIA Tesla T4)",
          "bullets": [
            "CPU Monte Carlo timing (mean over 3): 0.005485 s for 100,000 paths.",
            "GPU Monte Carlo timing (T4, CuPy): first run included CUDA initialization (2.0775 s); steady-state runs were 0.001534 s and 0.000933 s.",
            "Steady-state speedup: about 4.5× faster on GPU than CPU for the same path count, after warm-up."
          ]
        },
        {
          "heading": "Published Artifacts",
          "bullets": [
            "Saved pricing outputs: price.json (BS/CRR/MC + CI + errors) and greeks.json (analytic/finite-diff as configured).",
            "Saved volatility baseline: hist_vol.json with sigma_annual and window_used for traceability.",
            "Saved benchmarking and reproducibility: bench.json, params.json, download_report.json, logs.txt, and summary.md."
          ]
        }
      ]
    }
  },  
  {
    "id": "2025-11",
    "ym": "2025-11",
    "shortTag": "RISK",
    "status": "COMPLETED",
    "downloadItemId": "yfinance-rate-limit-patch-2025-11",
    "latest": {
      "date": "2025-11",
      "title": "yfinance Rate Limit Patch + Multi-Asset Download Stitching (1 ticker × 3 months)",
      "points": [
        "Added a modular download patch that splits yfinance requests into small chunks (1 ticker × 3 months), retries with exponential backoff + jitter, caches each chunk on disk, and stitches results back into a single wide price table.",
        "Kept the core VaR/CVaR/backtest compute path unchanged. Only the data download layer and the CLI entry wiring were updated to support patch-based downloads and multi-ticker inputs.",
        "Added a new artifact download_report.json that records per-chunk status (cache_hit, retries, rows, error) plus summary totals, and validated the stitching/merge logic with fast unit tests (5 passed)."
      ]
    },
    "detail": {
      "title": "yfinance Rate Limit Patch + Multi-Asset Download Stitching (1 ticker × 3 months)",
      "cards": [
        {
          "heading": "What This Build Did",
          "bullets": [
            "Implemented a chunked download module that splits a (ticker, date-range) request into 3-month windows, downloads each window separately, and reassembles the full series in chronological order.",
            "Added chunk-level caching at data/cache/yfinance/{ticker}/{start}_{end}.csv so reruns reuse cached data instead of re-downloading.",
            "Added per-chunk retry logic using exponential backoff with jitter to reduce transient failures caused by yfinance rate limits."
          ]
        },
        {
          "heading": "New Feature: Chunking and Stitching",
          "bullets": [
            "Chunk rule: 1 ticker × 3 months is the atomic unit, controlled by chunk_months for easy tuning.",
            "Stitching rule: concatenate chunk outputs, sort by date, and deduplicate the date index so boundary overlaps do not create duplicate rows.",
            "Multi-ticker merge: stitch each ticker independently, then merge into a wide price table with columns = tickers for downstream alignment and return generation."
          ]
        },
        {
          "heading": "New Feature: Multi-Asset Baseline Wiring",
          "bullets": [
            "Expanded the CLI entrypoint to accept a comma-separated tickers list and run the same pipeline on multi-asset inputs.",
            "Kept prices_aligned.csv and returns.csv in wide format (columns = tickers) for transparency and reuse.",
            "Aggregated wide returns into a baseline PORTFOLIO return series using equal weights (1/N) and fed that series into the existing EWMA/MC/backtest path without changing the core compute functions."
          ]
        },
        {
          "heading": "New Feature: Download Reporting and Reproducibility",
          "bullets": [
            "Added a new artifact download_report.json to record chunk-level outcomes: ticker, chunk_start, chunk_end, cache_hit, retries, rows, and error if any.",
            "Extended params.json to include tickers, chunk_months, cache_dir, retry settings, and weights_mode (equal/custom) so each run is fully traceable.",
            "Designed the patch to be modular so cached data can be reused and the rest of the risk pipeline remains stable across releases."
          ]
        },
        {
          "heading": "How To Run",
          "bullets": [
            "Example verification run: SPY,QQQ,TLT over 2025-01-01..2026-01-01 with chunk_months=3 to produce 12 chunks total (3 tickers × 4 windows).",
            "CLI flags: --enable-download-patch --chunk-months --cache-dir --download-retries --download-base-sleep --download-jitter.",
            "Expected outputs: download_report.json plus the existing risk artifacts and wide tables for prices and returns."
          ]
        },
        {
          "heading": "Validation",
          "bullets": [
            "Added unit tests for window generation, stitching dedupe, caching behavior (with yfinance mocked), and multi-asset merge with a 3 tickers × 12 months chunk count check.",
            "Confirmed tests pass locally using a one-shot command without changing system settings: PYTHONPATH=. pytest -q tests/test_download_patch.py (5 passed).",
            "Performed a syntax compile check on risk_pipeline and tests to ensure clean imports and packaging consistency."
          ]
        }
      ]
    }
  },
  {
    "id": "2025-11",
    "ym": "2025-11",
    "shortTag": "CUDA",
    "status": "COMPLETED",
    "downloadItemId": "ewma-mcvar-backtest-2025-11",
    "latest": {
      "date": "2025-11",
      "title": "Daily EWMA \u2192 Monte Carlo VaR/CVaR Backtest (SPY, GPU T4)",
      "points": [
        "Added a GPU backend (NVIDIA T4) for the Daily EWMA covariance \u2192 Monte Carlo VaR/CVaR pipeline, keeping the data window and parameters aligned with the CPU baseline for a fair accuracy check.",
        "On SPY (2025-08-04..2026-02-06), EWMA lambda 0.94 and MC paths 3000 produced VaR 0.018772 and CVaR 0.020970 on GPU, with the same breach_rate 0.014493 over 69 observations as the CPU run.",
        "Both CPU and GPU runs experienced frequent yfinance rate limiting. The next update will add a small download patch component that automatically splits requests and re-assembles results to reduce rate-limit failures."
      ]
    },
    "detail": {
      "title": "Daily EWMA \u2192 Monte Carlo VaR/CVaR Backtest (SPY, GPU T4)",
      "cards": [
        {
          "heading": "What This Build Did",
          "bullets": [
            "Ran the same daily risk pipeline as the CPU version, but executed Monte Carlo sampling and portfolio-loss computation on a GPU backend.",
            "Kept the EWMA covariance and Cholesky-stabilized scenario generation workflow unchanged to preserve the production-like architecture.",
            "Generated 1-day tail risk metrics (VaR and CVaR at alpha 0.99) and evaluated coverage via the same rolling backtest procedure."
          ]
        },
        {
          "heading": "What You Can Use It For",
          "bullets": [
            "A GPU-capable baseline for a daily risk engine that can later scale to multi-asset portfolios and larger Monte Carlo settings.",
            "A reproducible artifact workflow for GitHub Pages that supports side-by-side CPU vs GPU accuracy and performance comparisons.",
            "A clean stepping stone toward CUDA-focused optimization, with the current GPU backend serving as the first acceleration milestone."
          ]
        },
        {
          "heading": "Data and Run Snapshot",
          "bullets": [
            "Data matches the prior CPU baseline: ticker SPY, date range 2025-08-04..2026-02-06, rows 130, backtest observations 69.",
            "Model/MC: EWMA lambda 0.94, init_window 60, alpha 0.99, paths 3000, seed 9 (fast-mode).",
            "GPU (NVIDIA T4) results: VaR 0.01877217, CVaR 0.02096967, breach_rate 0.014493 (expected 0.010000).",
            "CPU baseline reference on the same data/params: VaR 0.01922933, CVaR 0.02183821, breach_rate 0.014493."
          ]
        },
        {
          "heading": "Operational Note: yfinance Rate Limits",
          "bullets": [
            "Both the CPU and GPU pipelines can hit yfinance rate limits during downloads, causing transient failures even for small ticker sets.",
            "To reduce failures, the next update will introduce a small download patch component that splits large requests into smaller calls and then re-combines the aligned results.",
            "This patch will stay modular so the rest of the risk pipeline does not change, and cached data can still be used when available."
          ]
        },
        {
          "heading": "Published Artifacts",
          "bullets": [
            "Saved machine-readable outputs for the website: summary.json, var_cvar.json, backtest.json, params.json.",
            "Saved analysis tables for transparency and reuse: backtest_detail.csv, prices_aligned.csv, returns.csv, cov.csv.",
            "Saved reproducibility logs and a human summary: logs.txt and summary.md."
          ]
        }
      ]
    }
  },

  {
    "id": "2025-10",
    "ym": "2025-10",
    "shortTag": "RISK",
    "status": "COMPLETED",
    "downloadItemId": "ewma-mcvar-backtest-2025-10",
    "latest": {
      "date": "2025-10",
      "title": "Daily EWMA → Monte Carlo VaR/CVaR Backtest (SPY)",
      "points": [
        "Built a production-like daily risk pipeline that estimates EWMA covariance and computes 1-day 99% VaR and CVaR via Monte Carlo simulation, then backtests coverage on realized returns.",
        "Ran a fast-mode backtest on SPY (2025-08-04..2026-02-06) with EWMA lambda 0.94 and MC paths 3000, producing VaR 0.019229 and CVaR 0.021838 with breach_rate 0.014493 over 69 observations."
      ]
    },
    "detail": {
      "title": "Daily EWMA → Monte Carlo VaR/CVaR Backtest (SPY)",
      "cards": [
        {
          "heading": "What This Build Did",
          "bullets": [
            "Downloaded and aligned daily price data and converted it to log returns for a consistent risk input stream.",
            "Estimated a time-varying EWMA covariance (lambda 0.94) and generated Monte Carlo return scenarios using a stabilized Cholesky pipeline.",
            "Computed 1-day tail risk metrics (VaR and CVaR at alpha 0.99) and evaluated coverage via a rolling backtest."
          ]
        },
        {
          "heading": "What You Can Use It For",
          "bullets": [
            "A clean baseline for a daily risk engine that can be extended to multi-asset portfolios and longer horizons without changing the core architecture.",
            "A reproducible artifact pipeline for publishing results to GitHub Pages (summary + JSON + CSV) and later comparing CPU vs CUDA implementations.",
            "A testable foundation for adding more formal backtest diagnostics and scaling from fast-mode to full-mode runs."
          ]
        },
        {
          "heading": "Data and Run Snapshot",
          "bullets": [
            "Ticker: SPY. Date range: 2025-08-04..2026-02-06. Rows: 130. Backtest observations: 69.",
            "Model/MC: EWMA lambda 0.94, init_window 60, alpha 0.99, paths 3000, seed 9 (fast-mode).",
            "Results: VaR 0.01922933, CVaR 0.02183821, breach_rate 0.014493 (expected 0.010000)."
          ]
        },
        {
          "heading": "Published Artifacts",
          "bullets": [
            "Saved machine-readable outputs for the website: summary.json, var_cvar.json, backtest.json, params.json.",
            "Saved analysis tables for transparency and reuse: backtest_detail.csv, prices_aligned.csv, returns.csv, cov.csv.",
            "Saved reproducibility logs and a human summary: logs.txt and summary.md."
          ]
        }
      ]
    }
  },
  
  {
    "id": "2025-10",
    "ym": "2025-10",
    "shortTag": "CUDA",
    "status": "COMPLETED",
    "downloadItemId": "intro-cuda-2025-10",
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
    "downloadItemId": "meeting-2025-09",
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
          "showCodeLink": true,
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
