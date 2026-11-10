import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { extractCurrencyCode, CURRENCY_SYMBOLS, DEFAULT_RATES } from '../utils/currency';

const CurrencyContext = createContext();

const BASE_URL = import.meta.env.VITE_API_URL || 'https://quantyrexmarkets-api.vercel.app/api';

export function CurrencyProvider({ children }) {
  const { user } = useAuth() || {};
  const code = extractCurrencyCode(user?.currency);
  const symbol = CURRENCY_SYMBOLS[code] || '$';

  const [rates, setRates] = useState(DEFAULT_RATES);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const cached = localStorage.getItem('fx_rates');
    const cachedTime = parseInt(localStorage.getItem('fx_rates_time') || '0');
    const ONE_HOUR = 60 * 60 * 1000;

    if (cached && (Date.now() - cachedTime) < ONE_HOUR) {
      try {
        setRates(prev => ({ ...prev, ...JSON.parse(cached) }));
        setLoaded(true);
        return;
      } catch {}
    }

    fetch(`${BASE_URL}/utils/exchange-rates`)
      .then(r => r.json())
      .then(d => {
        if (cancelled) return;
        if (d?.rates) {
          setRates(prev => ({ ...prev, ...d.rates, INR: 87.0 }));
          localStorage.setItem('fx_rates', JSON.stringify(d.rates));
          localStorage.setItem('fx_rates_time', String(Date.now()));
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));

    return () => { cancelled = true; };
  }, []);

  const rate = rates[code] || DEFAULT_RATES[code] || 1;

  // Format USD amount → user's currency (display)
  const format = (usdAmount, opts = {}) => {
    const { showCode = false, decimals } = opts;
    const num = Number(usdAmount) || 0;

    if (code === 'INR') {
      const inrAmount = Math.round(num * rate);
      const formattedINR = '₹' + inrAmount.toLocaleString('en-IN');
      return showCode ? `${formattedINR} INR` : formattedINR;
    }

    const converted = num * rate;
    const dec = decimals !== undefined ? decimals : (code === 'JPY' || code === 'VND' || code === 'IDR' || code === 'KRW' ? 0 : 2);
    const localeMap = {
      EUR: 'de-DE', GBP: 'en-GB', NGN: 'en-NG', CAD: 'en-CA', AUD: 'en-AU', JPY: 'ja-JP'
    };
    const locale = localeMap[code] || 'en-US';

    const formatted = converted.toLocaleString(locale, {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec
    });

    return showCode ? `${symbol}${formatted} ${code}` : `${symbol}${formatted}`;
  };

  // Convert user-entered amount in their currency → USD (for backend)
  const toUSD = (localAmount) => {
    const num = Number(localAmount) || 0;
    return num / rate;
  };

  // Format raw amount in any currency (for admin viewing other users)
  const formatAs = (usdAmount, targetCode) => {
    const tCode = extractCurrencyCode(targetCode);
    const tSymbol = CURRENCY_SYMBOLS[tCode] || '$';
    const tRate = rates[tCode] || DEFAULT_RATES[tCode] || 1;
    const num = Number(usdAmount) || 0;

    if (tCode === 'INR') {
      const inrAmount = Math.round(num * tRate);
      return '₹' + inrAmount.toLocaleString('en-IN');
    }

    const converted = num * tRate;
    const dec = (tCode === 'JPY' || tCode === 'VND' || tCode === 'IDR' || tCode === 'KRW') ? 0 : 2;
    const localeMap = {
      EUR: 'de-DE', GBP: 'en-GB', NGN: 'en-NG', CAD: 'en-CA', AUD: 'en-AU', JPY: 'ja-JP'
    };
    const locale = localeMap[tCode] || 'en-US';

    return `${tSymbol}${converted.toLocaleString(locale, { minimumFractionDigits: dec, maximumFractionDigits: dec })}`;
  };

  return (
    <CurrencyContext.Provider value={{
      code, symbol, rate, rates, loaded,
      format, toUSD, formatAs, extractCode: extractCurrencyCode
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used inside CurrencyProvider');
  return ctx;
};
