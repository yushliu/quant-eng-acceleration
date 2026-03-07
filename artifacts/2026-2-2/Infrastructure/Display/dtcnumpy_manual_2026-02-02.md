# dtcnumpy Manual

## 1. Overview

`dtcnumpy` is a NumPy-like data-type semantics simulator for quantitative computation.

It exists to answer questions such as:

- How much do lower-precision formats drift from an FP64 reference?
- Do operation outputs drift more than raw inputs?
- Which dtype families appear stable enough for later quantitative workflows?
- Where do quantized or reduced-mantissa formats begin to distort simple numerical tasks?

The package does not try to reproduce CUDA device execution. Its job is to compare numerical behavior under multiple dtype semantics through one shared interface.

FP64 is used as the high-precision reference because it gives the project one stable comparison baseline. FP32 is treated as the practical baseline because it is closer to the default floating-point path used in many quantitative and scientific workflows.

For quantitative computation, this matters because small numerical differences can propagate through aggregation, tail estimation, or matrix-based workflows. `dtcnumpy` is designed to make those differences observable before they are hidden inside a larger project.

## 2. Design Philosophy

`dtcnumpy` is built around semantic comparison, not hardware benchmarking.

- It compares numeric semantics, not hardware throughput.
- It is not a CUDA execution simulator.
- It is not a Tensor Core simulator.
- It is not a performance benchmark tool.
- It is not a full NumPy replacement.

Key design rules:

- One logical input is mapped into multiple simulated dtype versions.
- Floating-point comparison is anchored to FP64.
- FP32 is the practical baseline for interpretation.
- Integer paths are quantize/dequantize comparison paths, not direct integer arithmetic emulation.
- BF16 and TF32 are semantic approximations implemented through float32 mantissa truncation, not native hardware execution.

The package is intentionally small. It only implements the operations currently needed for controlled comparison and examples.

## 3. Supported Data Types

| Dtype | Broad Meaning | Comparison Role | Notes |
| --- | --- | --- | --- |
| `fp64` | High-precision floating point | Reference precision | Used as the main comparison baseline for drift reporting |
| `fp32` | Standard single precision | Practical baseline | Useful for judging whether lower-precision formats remain close to common workflow precision |
| `fp16` | Reduced floating precision | Lower-precision float comparison | More aggressive rounding and narrower precision than FP32 |
| `bf16` | Reduced mantissa floating precision | Coarse reduced-precision comparison | Simulated by truncating float32 mantissa bits |
| `tf32` | Tensor-style reduced mantissa precision | Middle-ground reduced-precision comparison | Simulated semantically through float32 mantissa truncation |
| `int8` | Low-bit quantized comparison path | Aggressive quantization comparison | Uses symmetric quantize/dequantize semantics |
| `int16` | Medium-bit quantized comparison path | Lower-distortion integer comparison | Also uses symmetric quantize/dequantize semantics |
| `int32` | High-range quantized comparison path | Near-reference integer comparison path | Often stays very close to FP64 for small examples |

### Integer Quantization Notes

Integer support is comparison-oriented:

- values are first scaled against the maximum absolute magnitude in the input
- values are rounded into the integer range
- values are clipped to the supported integer range
- values are dequantized back into float64 for comparison reporting

This means integer paths in `dtcnumpy` are not meant to behave like a full integer tensor library. They are meant to show quantization-style distortion under a shared comparison framework.

## 4. Core Object Model

### `DTCArray`

`DTCArray` is the core container used by `dtcnumpy`.

Conceptually, it is not just one array. It is one logical input stored as:

- an FP64 reference representation
- a dictionary of per-dtype simulated versions
- one active dtype label for view-level behavior

Important properties:

- `raw_fp64`: the FP64 reference array
- `versions`: a `dict[str, np.ndarray]` containing all supported dtype versions
- `active_dtype`: the dtype currently considered active
- `shape`: the shared shape of the stored versions

### How It Differs From NumPy

A standard NumPy array stores one dtype at a time.

A `DTCArray` stores all supported dtype versions of the same logical input at once. That is what makes cross-dtype reporting and comparison possible without repeatedly rebuilding the object.

### Active Dtype

`active_dtype` indicates which dtype should be returned when a method or helper wants the default view.

This matters mainly for:

- `get()` without an explicit dtype
- `astype(...)`, which returns a new `DTCArray` with a different active dtype
- operation outputs, which preserve an active dtype choice

### Reporting Model

Reporting compares each stored dtype version against `versions["fp64"]`.

- scalar results print value-by-value differences
- array results print shape, mean absolute difference, max absolute difference, and mean relative percentage difference

The reporting layer is meant for readable semantic comparison, not for high-volume analytics output.

## 5. Public API Reference

This section documents the currently published public API from the package entry point.

### Creation And Conversion

#### `array(obj)`

Purpose:
Create a new `DTCArray` from input data.

Approximate signature:

```python
array(obj) -> DTCArray
```

Input:

- array-like input
- or an existing `DTCArray`

Output:

- a new `DTCArray`

Notes:

- If `obj` is already a `DTCArray`, `array(obj)` creates a new container from its FP64 reference data.
- This is useful when you want a fresh container rather than reusing the same object.

Example:

```python
import dtcnumpy as dnp

x = dnp.array([1.2, 3.4, 5.6])
```

#### `asarray(obj)`

Purpose:
Return a `DTCArray` without copying when possible.

Approximate signature:

```python
asarray(obj) -> DTCArray
```

Input:

- array-like input
- or an existing `DTCArray`

Output:

- a `DTCArray`

Notes:

- If `obj` is already a `DTCArray`, the same object is returned.
- Use this when you want wrapper behavior without forcing a rebuild.

Example:

```python
import dtcnumpy as dnp

x = dnp.asarray([1.0, 2.0, 3.0])
y = dnp.asarray(x)   # returns the same DTCArray object
```

#### `DTCArray.astype(dtype)`

Purpose:
Return a new `DTCArray` with a different active dtype.

Approximate signature:

```python
x.astype(dtype: str) -> DTCArray
```

Input:

- one supported dtype string such as `"fp16"` or `"bf16"`

Output:

- a new `DTCArray`

Notes:

- `astype(...)` is a method on `DTCArray`, not a top-level `dtcnumpy.astype(...)` function.
- It does not rebuild all versions from scratch. It returns a new container using the already-stored per-dtype versions.
- The underlying comparison data stays the same; only the active dtype changes.

Example:

```python
import dtcnumpy as dnp

x = dnp.array([1.2, 3.4, 5.6])
x_fp16 = x.astype("fp16")
print(x_fp16.active_dtype)  # fp16
```

### Reporting

#### `print(x)`

Purpose:
Print a readable comparison table against the FP64 reference.

Approximate signature:

```python
print(x: DTCArray) -> None
```

Input:

- a `DTCArray`
- or something `asarray(...)` can wrap

Output:

- no return value
- formatted terminal output

Notes:

- The public name is `dtcnumpy.print`.
- Internally it maps to `print_table(...)`.
- Scalars and arrays are formatted differently.

Scalar output includes:

- dtype
- value
- difference versus FP64
- percentage difference versus FP64

Array output includes:

- dtype
- shape
- mean absolute difference versus FP64
- max absolute difference versus FP64
- mean relative percentage difference versus FP64

Example:

```python
import dtcnumpy as dnp

x = dnp.array([1.2, 3.4, 5.6])
dnp.print(x)
```

### Operations

All operation helpers return a `DTCArray` unless otherwise noted.

#### `sum(x, axis=None, keepdims=False)`

Purpose:
Compute a per-dtype sum and wrap the result as a comparison-ready object.

Output:

- `DTCArray`

Notes:

- The operation is evaluated independently for each stored dtype version.

Example:

```python
total = dnp.sum(dnp.array([1.0, 2.0, 3.0]))
dnp.print(total)
```

#### `mean(x, axis=None, keepdims=False)`

Purpose:
Compute a per-dtype mean.

Output:

- `DTCArray`

Example:

```python
avg = dnp.mean(dnp.array([1.001, 1.002, 1.003]))
```

#### `std(x, axis=None, ddof=0, keepdims=False)`

Purpose:
Compute a per-dtype standard deviation.

Output:

- `DTCArray`

Notes:

- Uses NumPy-style `ddof`.

Example:

```python
vol = dnp.std(dnp.array([1.0, 1.2, 0.8, 1.1]))
```

#### `quantile(x, q, axis=None, keepdims=False, method="linear")`

Purpose:
Compute a per-dtype quantile.

Output:

- `DTCArray`

Notes:

- Uses NumPy-style `method="linear"` by default.
- Useful for tail-style comparison workflows.

Example:

```python
tail = dnp.quantile(dnp.array([-0.02, 0.01, -0.05, 0.03]), 0.10)
```

#### `dot(x, y)`

Purpose:
Compute a per-dtype dot product.

Output:

- `DTCArray`

Example:

```python
weights = dnp.array([0.2, 0.3, 0.5])
returns = dnp.array([0.01, -0.02, 0.015])
portfolio = dnp.dot(weights, returns)
```

#### `matmul(x, y)`

Purpose:
Compute a per-dtype matrix multiplication.

Output:

- `DTCArray`

Example:

```python
a = dnp.array([[1.0, 2.0], [3.0, 4.0]])
b = dnp.array([[0.5], [1.5]])
result = dnp.matmul(a, b)
```

#### `outer(x, y)`

Purpose:
Compute a per-dtype outer product.

Output:

- `DTCArray`

Example:

```python
grid = dnp.outer(dnp.array([1.0, 2.0]), dnp.array([0.1, 0.2, 0.3]))
```

#### `einsum(subscripts, *operands, **kwargs)`

Purpose:
Compute a restricted per-dtype Einstein summation.

Approximate signature:

```python
einsum(subscripts: str, *operands, **kwargs) -> DTCArray
```

Supported patterns:

- `"ij,j->i"`
- `"ij,kj->ki"`

Output:

- `DTCArray`

Notes:

- Unsupported patterns raise `NotImplementedError`.
- This is intentionally not a full general-purpose einsum engine.
- The implementation is restricted to the small set of patterns currently needed by the project.

Example:

```python
mat = dnp.array([[1.0, 2.0], [3.0, 4.0]])
vec = dnp.array([0.5, 1.5])
y = dnp.einsum("ij,j->i", mat, vec)
```

#### `reshape(x, newshape)`

Purpose:
Return a reshaped per-dtype result.

Output:

- `DTCArray`

Notes:

- Available both as `dnp.reshape(x, newshape)` and `x.reshape(newshape)`.

Example:

```python
x = dnp.array([1, 2, 3, 4])
grid = dnp.reshape(x, (2, 2))
```

#### `transpose(x, axes=None)`

Purpose:
Return a transposed per-dtype result.

Output:

- `DTCArray`

Notes:

- Available both as `dnp.transpose(x)` and `x.transpose()`.

Example:

```python
mat = dnp.array([[1.0, 2.0], [3.0, 4.0]])
t = dnp.transpose(mat)
```

#### `.T`

Purpose:
Convenience transpose property on `DTCArray`.

Usage:

```python
mat = dnp.array([[1.0, 2.0], [3.0, 4.0]])
t = mat.T
```

Output:

- `DTCArray`

Notes:

- `.T` is a property on `DTCArray`.
- It is not a separate top-level function.

#### `diag(x, k=0)`

Purpose:
Extract or build a diagonal through per-dtype comparison logic.

Output:

- `DTCArray`

Notes:

- Mirrors NumPy-style `diag` behavior for the currently provided input.

Example:

```python
diag_vec = dnp.diag(dnp.array([[1.0, 2.0], [3.0, 4.0]]))
```

#### `eye(n, m=None, k=0)`

Purpose:
Create an identity-like matrix wrapped as a `DTCArray`.

Output:

- `DTCArray`

Notes:

- Built from an FP64 NumPy identity matrix and then converted through the normal `array(...)` path.

Example:

```python
ident = dnp.eye(3)
```

#### `clip(x, a_min, a_max)`

Purpose:
Clip values for each dtype path.

Output:

- `DTCArray`

Notes:

- `a_min` and `a_max` may be plain values or `DTCArray` objects.

Example:

```python
bounded = dnp.clip(dnp.array([-2.0, 0.5, 3.0]), -1.0, 1.0)
```

#### `isfinite(x)`

Purpose:
Check finiteness for each dtype path.

Output:

- `dict[str, np.ndarray]`

Notes:

- `isfinite(...)` does **not** return a `DTCArray`.
- It returns one boolean array per dtype.
- This is intentional because the result is treated as a diagnostic mask, not as a comparison tensor.

Example:

```python
masks = dnp.isfinite(dnp.array([1.0, float("inf"), 2.0]))
print(masks["fp64"])
```

## 6. Usage Notes

### When To Use `array(...)` vs `asarray(...)`

- Use `array(...)` when you want a fresh `DTCArray`.
- Use `asarray(...)` when you want to accept either raw input or an existing `DTCArray` without forcing a new object.

### When To Use `astype(...)`

Use `astype(...)` when you want to:

- inspect a different active dtype
- make the current working view explicit
- keep later operations aligned with a chosen dtype label

It does not change the underlying comparison philosophy. All dtype versions remain stored.

### How To Interpret Drift

The most important idea is that drift is relative to FP64.

- small scalar drift may look harmless
- operation-level drift may become more meaningful
- reduced-mantissa formats can amplify small distortions during aggregation
- quantized integer paths can visibly distort low-magnitude values or tail cutoffs

### Why Some Formats Drift More

Typical pattern:

- `fp32` usually stays very close to FP64
- `fp16` introduces more visible rounding
- `bf16` often drifts more because of its reduced mantissa precision
- `tf32` usually sits between FP16/BF16 and FP32
- `int8` can drift strongly because of quantization
- `int16` and `int32` are often much closer to FP64 in small examples

### Why Operation-Level Drift Matters

Input-level drift is only the first layer.

Operation-level drift is often more important because:

- sums accumulate rounding
- means average already-rounded values
- quantiles can shift tail cutoffs
- dot products and matrix multiplications mix multiple rounding effects together

That is why `dtcnumpy` becomes more useful once operation outputs are compared directly.

## 7. Known Limitations

The current package has clear boundaries.

- No hardware execution simulation
- No CUDA device modeling
- No Tensor Core scheduling simulation
- No throughput benchmarking
- No full NumPy compatibility
- No advanced linear algebra module in the current published package
- No random module in the current published package
- No full risk-project integration
- Integer paths are semantic quantize/dequantize comparisons only
- Examples are controlled and smaller than full project workflows

Important accuracy note:

- Stage 4 discusses advanced linear algebra and random-module preparation as planning work, but those APIs are **not** part of the currently published package interface documented here.

## 8. Example Workflows

### Basic Array Comparison

```python
import dtcnumpy as dnp

x = dnp.array([1.2, 3.4, 5.6])
dnp.print(x)
```

### Dtype Switching

```python
import dtcnumpy as dnp

x = dnp.array([1.2, 3.4, 5.6])
x_fp16 = x.astype("fp16")
print(x_fp16.active_dtype)
dnp.print(x_fp16)
```

### Operation-Level Drift With `dot`

```python
import dtcnumpy as dnp

weights = dnp.array([0.15, 0.20, 0.25, 0.40])
asset_returns = dnp.array([0.0115, -0.0062, 0.0048, 0.0131])
portfolio_return = dnp.dot(weights, asset_returns)
dnp.print(portfolio_return)
```

### Mini Quantile Example

```python
import dtcnumpy as dnp

losses = dnp.array([-0.02, 0.01, -0.05, 0.03, -0.08, 0.00, -0.015])
tail_cut = dnp.quantile(losses, 0.10)
dnp.print(tail_cut)
```

### Small Portfolio-Style Workflow

```python
import dtcnumpy as dnp

weights = dnp.array([0.10, 0.25, 0.30, 0.35])
returns = dnp.array([0.0123, -0.0045, 0.0088, 0.0151])
portfolio_return = dnp.dot(weights, returns)
portfolio_tail = dnp.quantile(dnp.array([-0.031, 0.014, -0.022, -0.087, 0.009]), 0.10)

dnp.print(portfolio_return)
dnp.print(portfolio_tail)
```

## 9. Quick Start

### Installation Assumptions

This manual assumes:

- Python is available
- `numpy` is installed
- the `dtcnumpy` package source is already available in your working environment

### First Import

```python
import dtcnumpy as dnp
```

### First Three Commands To Try

```python
x = dnp.array([1.2, 3.4, 5.6])
dnp.print(x)
dnp.print(dnp.mean(x))
```

That quick start already shows:

- input-level comparison
- reporting versus FP64
- operation-level drift through `mean(...)`

## 10. Future Expansion Notes

Later stages may add:

- more advanced numerical kernels
- broader example coverage
- larger workflow integration
- more documentation and onboarding material

These are future expansion directions, not guarantees of current support.

The current manual documents only the behavior that is already published in the package and examples.
