const getCurrencySymbol = (c = 'USD') => {
  const raw = String(c || 'USD').trim();
  if (raw === '$' || raw === 'USD') return '$';
  const match = raw.match(/\(([A-Z]{3})\)/);
  const code = match ? match[1] : (raw.length === 3 ? raw.toUpperCase() : 'USD');
  const map = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    JPY: '¥',
    CNY: '¥',
    KRW: '₩',
    RUB: '₽',
    TRY: '₺',
    BRL: 'R$',
    AUD: 'A$',
    CAD: 'C$',
    NGN: '₦',
    PHP: '₱',
    PKR: 'Rs ',
    AED: 'AED ',
    SAR: 'SAR ',
  };
  return map[code] || (code + ' ');
};

const formatMoney = (value, currency = 'USD') => {
  const num = typeof value === 'number'
    ? value
    : Number(String(value ?? 0).replace(/,/g, ''));
  const out = Number.isFinite(num)
    ? num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : String(value ?? '0.00');
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

module.exports = { getCurrencySymbol, formatMoney, formatUSD };
