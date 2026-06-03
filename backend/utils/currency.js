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

function extractCurrencyCode(raw) {
  if (!raw) return 'USD';
  if (raw.length === 3) return raw.toUpperCase();
  const match = raw.match(/\(([A-Z]{3})\)/);
  return match ? match[1] : 'USD';
}

function getSymbol(code) {
  return CURRENCY_SYMBOLS[code] || code + ' ';
}

module.exports = { extractCurrencyCode, getSymbol, CURRENCY_SYMBOLS };
