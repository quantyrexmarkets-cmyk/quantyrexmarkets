const express = require('express');
const router = express.Router();

let cachedRates = null;
let cacheTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

router.get('/exchange-rates', async (req, res) => {
  try {
    const now = Date.now();
    if (cachedRates && (now - cacheTime) < CACHE_DURATION) {
      return res.json({ success: true, rates: cachedRates, cached: true });
    }

    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    if (!response.ok) throw new Error('Rate provider failed');
    const data = await response.json();

    cachedRates = data.rates;
    cacheTime = now;

    res.json({ success: true, rates: cachedRates, cached: false });
  } catch (err) {
    console.error('Exchange rates error:', err.message);
    // Fallback static rates so app never breaks
    const fallback = {
      USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.2, NGN: 1600,
      JPY: 149, CAD: 1.36, AUD: 1.52, CNY: 7.24, ZAR: 18.5,
      AED: 3.67, BRL: 5.05, MXN: 17.1, KES: 129, GHS: 15.5,
      PKR: 278, BDT: 110, PHP: 56, IDR: 15700, MYR: 4.7,
      SGD: 1.34, HKD: 7.8, KRW: 1330, THB: 35, VND: 24500,
      TRY: 32, RUB: 92, EGP: 49, SAR: 3.75, NZD: 1.65
    };
    res.json({ success: true, rates: fallback, fallback: true });
  }
});

module.exports = router;
