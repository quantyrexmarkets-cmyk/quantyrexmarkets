const RATES = {
  USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.5, NGN: 1580, JPY: 149.5,
  CAD: 1.36, AUD: 1.53, CHF: 0.90, CNY: 7.24, ZAR: 18.5,
  AED: 3.67, SAR: 3.75, BRL: 5.05, MXN: 17.1, KES: 129, GHS: 15.5,
  PKR: 278, BDT: 110, PHP: 56, IDR: 15700, MYR: 4.7,
  SGD: 1.34, HKD: 7.8, KRW: 1330, THB: 35, VND: 24500,
  TRY: 32, RUB: 92, EGP: 49, NZD: 1.65
};

const SYMBOLS = {
  USD: '$', EUR: '€', GBP: '£', INR: '₹', NGN: '₦', JPY: '¥',
  CNY: '¥', CAD: 'C$', AUD: 'A$', CHF: 'Fr', ZAR: 'R',
  AED: 'AED ', SAR: 'SAR ', BRL: 'R$', MXN: 'Mex$', KES: 'KSh',
  GHS: '₵', PKR: 'Rs ', BDT: '৳', PHP: '₱', IDR: 'Rp', MYR: 'RM',
  SGD: 'S$', HKD: 'HK$', KRW: '₩', THB: '฿', VND: '₫',
  TRY: '₺', RUB: '₽', EGP: 'E£', NZD: 'NZ$'
};

const extractCode = (currency) => {
  const raw = String(currency || 'USD').trim();
  if (raw === '$') return 'USD';
  if (raw.length === 3) return raw.toUpperCase();
  const m = raw.match(/\(([A-Z]{3})\)/);
  return m ? m[1] : 'USD';
};

const getCurrencySymbol = (currency = 'USD') => {
  const code = extractCode(currency);
  return SYMBOLS[code] || (code + ' ');
};

// Converts USD value → user's currency and formats with symbol
const formatMoney = (usdValue, currency = 'USD') => {
  const num = typeof usdValue === 'number'
    ? usdValue
    : Number(String(usdValue ?? 0).replace(/,/g, ''));
  if (!Number.isFinite(num)) return `${getCurrencySymbol(currency)}0.00`;
  const code = extractCode(currency);
  const rate = RATES[code] || 1;
  const converted = num * rate;
  const decimals = (code === 'JPY' || code === 'KRW' || code === 'IDR' || code === 'VND') ? 0 : 2;
  const out = converted.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  return `${getCurrencySymbol(currency)}${out}`;
};

const formatUSD = (value) => {
  const num = typeof value === 'number'
    ? value
    : Number(String(value ?? 0).replace(/,/g, ''));
  const out = Number.isFinite(num)
    ? num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : String(value ?? '0.00');
  return `$${out}`;
};

module.exports = { getCurrencySymbol, formatMoney, formatUSD, extractCode, RATES };
