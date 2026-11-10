// Universal Currency Formatter & Helper for Quantyrex Markets
export const USD_TO_INR_RATE = 87.0;

export const CURRENCY_SYMBOLS = {
  USD: '$', EUR: '€', GBP: '£', INR: '₹', NGN: '₦', JPY: '¥',
  CNY: '¥', CAD: 'C$', AUD: 'A$', CHF: 'CHF', ZAR: 'R',
  AED: 'د.إ', SAR: '﷼', BRL: 'R$', MXN: 'Mex$', KES: 'KSh',
  GHS: '₵', UGX: 'USh', TZS: 'TSh', PKR: '₨', BDT: '৳',
  PHP: '₱', IDR: 'Rp', MYR: 'RM', SGD: 'S$', HKD: 'HK$',
  KRW: '₩', THB: '฿', VND: '₫', TRY: '₺', RUB: '₽',
  EGP: 'E£', NZD: 'NZ$', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł'
};

export const DEFAULT_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 87.0,
  NGN: 1500,
  CAD: 1.35,
  AUD: 1.50,
  CHF: 0.88,
  JPY: 155,
  ZAR: 18.2,
  AED: 3.67,
  SAR: 3.75,
  BRL: 5.7,
  MXN: 20.3,
  KES: 129,
  GHS: 15.5
};

export function extractCurrencyCode(raw) {
  if (!raw) return 'USD';
  const str = String(raw).trim().toUpperCase();
  if (str === 'INR' || str === '₹' || str.includes('INR') || str.includes('₹') || str.includes('RUPEE')) return 'INR';
  if (str === 'EUR' || str === '€' || str.includes('EUR') || str.includes('€') || str.includes('EURO')) return 'EUR';
  if (str === 'GBP' || str === '£' || str.includes('GBP') || str.includes('£') || str.includes('POUND')) return 'GBP';
  if (str === 'NGN' || str === '₦' || str.includes('NGN') || str.includes('₦') || str.includes('NAIRA')) return 'NGN';
  if (str === 'CAD' || str.includes('CAD')) return 'CAD';
  if (str === 'AUD' || str.includes('AUD')) return 'AUD';
  if (str === 'JPY' || str === '¥' || str.includes('JPY')) return 'JPY';
  if (str.length === 3) return str;
  const m = str.match(/\b([A-Z]{3})\b/);
  return m ? m[1] : 'USD';
}

export function isINR(currency) {
  return extractCurrencyCode(currency) === 'INR';
}

export function getCurrencyCode(currency = 'USD') {
  return extractCurrencyCode(currency);
}

export function getCurrencySymbol(currency = 'USD') {
  const code = extractCurrencyCode(currency);
  return CURRENCY_SYMBOLS[code] || '$';
}

export function getRate(currency = 'USD') {
  const code = extractCurrencyCode(currency);
  try {
    const cached = localStorage.getItem('fx_rates');
    if (cached) {
      const rates = JSON.parse(cached);
      if (rates[code]) return rates[code];
    }
  } catch (e) {}
  return DEFAULT_RATES[code] || 1;
}

export function toUSD(localAmount, currency = 'USD') {
  const num = parseFloat(String(localAmount).replace(/,/g, '')) || 0;
  const rate = getRate(currency);
  return num / rate;
}

export function convertAmount(amountInUSD, currency = 'USD') {
  const num = parseFloat(amountInUSD) || 0;
  const code = extractCurrencyCode(currency);
  const rate = getRate(currency);
  if (code === 'INR') {
    return Math.round(num * rate);
  }
  const dec = (code === 'JPY' || code === 'VND' || code === 'IDR' || code === 'KRW') ? 0 : 2;
  return Number((num * rate).toFixed(dec));
}

export function formatCurrency(amountInUSD, currency = 'USD') {
  const num = parseFloat(amountInUSD) || 0;
  const code = extractCurrencyCode(currency);
  const symbol = getCurrencySymbol(currency);
  const rate = getRate(currency);

  if (code === 'INR') {
    const inrAmount = Math.round(num * rate);
    return '₹' + inrAmount.toLocaleString('en-IN');
  }

  const converted = num * rate;
  const dec = (code === 'JPY' || code === 'VND' || code === 'IDR' || code === 'KRW') ? 0 : 2;
  const localeMap = {
    EUR: 'de-DE', GBP: 'en-GB', NGN: 'en-NG', CAD: 'en-CA', AUD: 'en-AU', JPY: 'ja-JP'
  };
  const locale = localeMap[code] || 'en-US';

  const formattedNum = converted.toLocaleString(locale, {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec
  });

  return `${symbol}${formattedNum}`;
}

export function formatAmountWithCode(amountInUSD, currency = 'USD') {
  const code = extractCurrencyCode(currency);
  const formatted = formatCurrency(amountInUSD, currency);
  return `${formatted} ${code}`;
}

export function formatAmountWithUSD(amountInUSD, currency = 'USD') {
  return formatCurrency(amountInUSD, currency);
}

// Aliases for full backward compatibility
export const formatAmount = formatCurrency;
export const convertCurrency = formatCurrency;
export const extractCode = extractCurrencyCode;
