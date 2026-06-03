// Currency formatting utility — uses LIVE rates cached by CurrencyContext
// Falls back to static rates if cache empty (e.g. on first load)

const STATIC_RATES = {
  USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.5, NGN: 1580, JPY: 149.5,
  CAD: 1.36, AUD: 1.53, CHF: 0.90, CNY: 7.24, ZAR: 18.5,
  AED: 3.67, SAR: 3.75, BRL: 5.05, MXN: 17.1, KES: 129, GHS: 15.5,
  PKR: 278, BDT: 110, PHP: 56, IDR: 15700, MYR: 4.7,
  SGD: 1.34, HKD: 7.8, KRW: 1330, THB: 35, VND: 24500,
  TRY: 32, RUB: 92, EGP: 49, NZD: 1.65,
  SEK: 10.5, NOK: 10.8, DKK: 6.9, PLN: 4.0
};

const SYMBOLS = {
  USD: '$', EUR: '€', GBP: '£', INR: '₹', NGN: '₦', JPY: '¥',
  CNY: '¥', CAD: 'C$', AUD: 'A$', CHF: 'Fr', ZAR: 'R',
  AED: 'د.إ', SAR: '﷼', BRL: 'R$', MXN: 'Mex$', KES: 'KSh',
  GHS: '₵', PKR: '₨', BDT: '৳', PHP: '₱', IDR: 'Rp', MYR: 'RM',
  SGD: 'S$', HKD: 'HK$', KRW: '₩', THB: '฿', VND: '₫',
  TRY: '₺', RUB: '₽', EGP: 'E£', NZD: 'NZ$',
  SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł'
};

// Pull live rates from localStorage (cached by CurrencyContext); fallback to static
function getLiveRates() {
  try {
    const cached = localStorage.getItem('fx_rates');
    if (cached) return { ...STATIC_RATES, ...JSON.parse(cached) };
  } catch (e) {}
  return STATIC_RATES;
}

export const getCurrencyCode = (currency) => {
  if (!currency) return 'USD';
  if (currency.length === 3) return currency.toUpperCase();
  const m = currency.match(/\(([A-Z]{3})\)/);
  return m ? m[1] : 'USD';
};

export const getCurrencySymbol = (currency) => {
  const code = getCurrencyCode(currency);
  return SYMBOLS[code] || '$';
};

export const convertAmount = (amountUSD, currency) => {
  const code = getCurrencyCode(currency);
  const rate = getLiveRates()[code] || 1;
  return ((amountUSD || 0) * rate).toFixed(2);
};

export const formatAmount = (amountUSD, currency) => {
  if (amountUSD === undefined || amountUSD === null) return getCurrencySymbol(currency) + '0.00';
  const symbol = getCurrencySymbol(currency);
  const converted = convertAmount(amountUSD, currency);
  return `${symbol}${Number(converted).toLocaleString()}`;
};

export const formatAmountWithCode = (amountUSD, currency) => {
  const code = getCurrencyCode(currency);
  const converted = convertAmount(amountUSD, currency);
  return `${code} ${Number(converted).toLocaleString()}`;
};

// For admin: show local + USD equivalent
export const formatAmountWithUSD = (amountUSD, currency) => {
  const local = formatAmount(amountUSD, currency);
  const code = getCurrencyCode(currency);
  if (code === 'USD') return local;
  return `${local} ($${(Number(amountUSD) || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`;
};
