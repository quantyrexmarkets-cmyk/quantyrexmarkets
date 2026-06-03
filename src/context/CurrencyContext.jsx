import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CurrencyContext = createContext();

const SYMBOLS = {
  USD: '$', EUR: '€', GBP: '£', INR: '₹', NGN: '₦', JPY: '¥',
  CNY: '¥', CAD: 'C$', AUD: 'A$', CHF: 'CHF', ZAR: 'R',
  AED: 'د.إ', SAR: '﷼', BRL: 'R$', MXN: 'Mex$', KES: 'KSh',
  GHS: '₵', UGX: 'USh', TZS: 'TSh', PKR: '₨', BDT: '৳',
  PHP: '₱', IDR: 'Rp', MYR: 'RM', SGD: 'S$', HKD: 'HK$',
  KRW: '₩', THB: '฿', VND: '₫', TRY: '₺', RUB: '₽',
  EGP: 'E£', NZD: 'NZ$', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł'
};

function extractCode(raw) {
  if (!raw) return 'USD';
  if (raw.length === 3) return raw.toUpperCase();
  const m = raw.match(/\(([A-Z]{3})\)/);
  return m ? m[1] : 'USD';
}

const BASE_URL = import.meta.env.VITE_API_URL || 'https://quantyrexmarkets-api.vercel.app/api';

export function CurrencyProvider({ children }) {
  const { user } = useAuth() || {};
  const code = extractCode(user?.currency);
  const symbol = SYMBOLS[code] || code + ' ';

  const [rates, setRates] = useState({ USD: 1 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const cached = localStorage.getItem('fx_rates');
    const cachedTime = parseInt(localStorage.getItem('fx_rates_time') || '0');
    const ONE_HOUR = 60 * 60 * 1000;

    if (cached && (Date.now() - cachedTime) < ONE_HOUR) {
      try {
        setRates(JSON.parse(cached));
        setLoaded(true);
        return;
      } catch {}
    }

    fetch(`${BASE_URL}/utils/exchange-rates`)
      .then(r => r.json())
      .then(d => {
        if (cancelled) return;
        if (d?.rates) {
          setRates(d.rates);
          localStorage.setItem('fx_rates', JSON.stringify(d.rates));
          localStorage.setItem('fx_rates_time', String(Date.now()));
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));

    return () => { cancelled = true; };
  }, []);

  const rate = rates[code] || 1;

  // Format USD amount → user's currency (display)
  const format = (usdAmount, opts = {}) => {
    const { showCode = false, decimals } = opts;
    const num = Number(usdAmount) || 0;
    const converted = num * rate;
    const dec = decimals !== undefined ? decimals : (code === 'JPY' || code === 'VND' || code === 'IDR' || code === 'KRW' ? 0 : 2);
    const formatted = converted.toLocaleString(undefined, {
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
    const tCode = extractCode(targetCode);
    const tSymbol = SYMBOLS[tCode] || tCode + ' ';
    const tRate = rates[tCode] || 1;
    const converted = (Number(usdAmount) || 0) * tRate;
    const dec = (tCode === 'JPY' || tCode === 'VND' || tCode === 'IDR' || tCode === 'KRW') ? 0 : 2;
    return `${tSymbol}${converted.toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec })}`;
  };

  return (
    <CurrencyContext.Provider value={{
      code, symbol, rate, rates, loaded,
      format, toUSD, formatAs, extractCode
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
