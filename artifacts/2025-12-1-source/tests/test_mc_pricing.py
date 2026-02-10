import unittest

from risk_pipeline.pricing.engines.black_scholes import bs_price
from risk_pipeline.pricing.engines.mc_cpu import mc_price_cpu


class TestMcPricing(unittest.TestCase):
    def test_mc_ci_contains_bs(self):
        params = {
            "spot": 100.0,
            "strike": 100.0,
            "maturity": 1.0,
            "rate": 0.05,
            "dividend_yield": 0.0,
            "sigma": 0.2,
            "option_type": "call",
        }
        bs = bs_price(**params)
        mc = mc_price_cpu(**params, paths=120000, seed=9)

        self.assertLessEqual(mc["ci_low"], bs)
        self.assertGreaterEqual(mc["ci_high"], bs)


if __name__ == "__main__":
    unittest.main()
