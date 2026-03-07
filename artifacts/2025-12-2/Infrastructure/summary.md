# dtcnumpy Stage 1 - Scope Definition + Data-Type Semantics Design

Stage 1 defines `dtcnumpy` as a precision-semantics simulator for quantitative computation rather than a CUDA hardware simulator.

- Fixed the v0.1 project boundary so the work stays focused on numeric-format comparison instead of expanding into a full NumPy replacement.
- Selected the initial supported formats: `FP64`, `FP32`, `FP16`, `BF16`, `TF32`, `INT8`, `INT16`, and `INT32`.
- Set `FP64` as the high-precision reference and `FP32` as the practical baseline for later interpretation.
- Defined the semantic design target: casting behavior, reduced-precision rounding, accumulation behavior, integer quantization/dequantization, and output drift relative to the reference path.
- Established the first target use case as the club's risk-pipeline kernels rather than the entire repository.
- Froze the first wrapper-style API direction around a lightweight `import dtcnumpy as dnp` interface.

Independent student community. Not affiliated with or endorsed by any University. No live trading; no exchange connectivity.
