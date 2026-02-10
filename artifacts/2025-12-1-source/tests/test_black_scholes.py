import unittest

from risk_pipeline.pricing.engines.black_scholes import bs_price


class TestBlackScholes(unittest.TestCase):
    def test_known_call_value(self):
        price = bs_price(
            spot=100.0,
            strike=100.0,
            maturity=1.0,
            rate=0.05,
            dividend_yield=0.0,
            sigma=0.2,
            option_type="call",
        )
        self.assertAlmostEqual(price, 10.450583572185565, places=8)


if __name__ == "__main__":
    unittest.main()
