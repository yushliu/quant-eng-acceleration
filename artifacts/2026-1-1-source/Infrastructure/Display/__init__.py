"""Public Stage 2 API for dtcnumpy."""

from .core import DTCArray, array, asarray
from .report import print_table as print

__all__ = ["DTCArray", "array", "asarray", "print"]
