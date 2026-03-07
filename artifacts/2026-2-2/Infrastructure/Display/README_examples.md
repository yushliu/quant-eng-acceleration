# dtcnumpy Examples

## What These Examples Are For
These examples are short, meeting-ready scripts that show how to use `dtcnumpy` for dtype comparison and small operation-level drift checks.

## What `dtcnumpy` Currently Supports
- dtype-aware arrays with shared comparison storage
- dtype conversion via `astype(...)`
- reporting against the `fp64` reference
- basic Stage 3 operations such as `mean`, `sum`, `dot`, `matmul`, `quantile`, and related helpers

## What It Does NOT Support Yet
- hardware timing benchmarks
- Tensor Core scheduling simulation
- full ndarray compatibility
- advanced linalg
- random sampling
- full risk-project integration

## How To Run Each Example
From the project root:

```bash
python3 examples/demo_basic.py
python3 examples/demo_ops.py
python3 examples/demo_quant.py
```

## Short Explanation Of Each File
- `demo_basic.py`: array creation, printing comparisons, and `astype(...)`
- `demo_ops.py`: simple operation-level comparisons such as `mean`, `dot`, and `quantile`
- `demo_quant.py`: lightweight quant-style examples using portfolio-style aggregation and tail-style quantiles

## Note On Project Scope
These examples are meant for local demos and onboarding. Full risk-project integration is intentionally not part of this stage.
