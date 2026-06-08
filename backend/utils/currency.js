// Currency code extraction + formatting helpers

const CURRENCY_SYMBOLS = {
  USD: '$', EUR: '€', GBP: '£', INR: '₹', NGN: '₦', JPY: '¥',
  CNY: '¥', CAD: 'C$', AUD: 'A$', CHF: 'CHF', ZAR: 'R',
  AED: 'د.إ', SAR: '﷼', BRL: 'R$', MXN: 'Mex$', KES: 'KSh',
  GHS: '₵', UGX: 'USh', TZS: 'TSh', PKR: '₨', BDT: '৳',
  PHP: '₱', IDR: 'Rp', MYR: 'RM', SGD: 'S$', HKD: 'HK$',
  KRW: '₩', THB: '฿', VND: '₫', TRY: '₺', RUB: '₽',
  EGP: 'E£', NZD: 'NZ$', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł'
};

// ✅ Extract 3-letter code from "US Dollar (USD)" or "USD"
function extractCurrencyCode(raw) {
  if (!raw) return 'USD';
  if (raw.length === 3) return raw.toUpperCase();
  const match = raw.match(/\(([A-Z]{3})\)/);
  return match ? match[1] : 'USD';
}

function getSymbol(code) {
  return CURRENCY_SYMBOLS[code] || code + ' ';
}

// ✅ NEW: Format amount with correct currency symbol
function formatAmount(amount, currencyRaw) {
  const code = extractCurrencyCode(currencyRaw);
  const symbol = getSymbol(code);
  return `${symbol}${parseFloat(amount).toFixed(2)}`;
}

// ✅ NEW: Get currency info object from user
function getUserCurrencyInfo(user) {
  const code = extractCurrencyCode(user.currency);
  const symbol = getSymbol(code);
  return { code, symbol };
}

module.exports = {
  extractCurrencyCode,
  getSymbol,
  formatAmount,
  getUserCurrencyInfo,
  CURRENCY_SYMBOLS
};
