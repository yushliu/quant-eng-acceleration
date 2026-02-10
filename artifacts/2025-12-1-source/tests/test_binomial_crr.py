import unittest

from risk_pipeline.pricing.engines.binomial_crr import crr_price
from risk_pipeline.pricing.engines.black_scholes import bs_price


class TestBinomialCRR(unittest.TestCase):
    def test_converges_to_black_scholes(self):
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
        p100 = crr_price(**params, steps=100)
        p300 = crr_price(**params, steps=300)
        p800 = crr_price(**params, steps=800)

        self.assertGreater(abs(p100 - bs), abs(p300 - bs))
        self.assertGreater(abs(p300 - bs), abs(p800 - bs))
        self.assertLess(abs(p800 - bs), 0.03)


if __name__ == "__main__":
    unittest.main()
