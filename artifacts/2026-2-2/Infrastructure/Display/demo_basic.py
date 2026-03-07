"""Basic dtcnumpy examples for meeting demos."""

from __future__ import annotations

import dtcnumpy as dnp


def section(title: str) -> None:
    print(f"\n=== {title} ===")


def main() -> None:
    section("Scalar Example")
    scalar = dnp.array(1.234567)
    dnp.print(scalar)

    section("Vector Example")
    vector = dnp.array([1.2, 3.4, 5.6])
    dnp.print(vector)

    section("Astype Example")
    vector_fp16 = vector.astype("fp16")
    print(f"Active dtype after astype: {vector_fp16.active_dtype}")
    dnp.print(vector_fp16)


if __name__ == "__main__":
    main()
