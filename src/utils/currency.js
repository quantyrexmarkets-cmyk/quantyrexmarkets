// Universal Currency Formatter & Helper for Quantyrex Markets
export const USD_TO_INR_RATE = 87.0; // Fixed 1 USD = 87 INR

export function isINR(currency) {
  if (!currency) return false;
  const c = String(currency).trim().toUpperCase();
  return c === 'INR' || c === '₹' || c.includes('INR') || c.includes('₹') || c.includes('RUPEE');
}

export function getRate(currency = 'USD') {
  if (isINR(currency)) return USD_TO_INR_RATE;
  const code = getCurrencyCode(currency);
  try {
    const rates = JSON.parse(localStorage.getItem('fx_rates') || '{}');
    if (rates[code]) return rates[code];
  } catch (e) {}
  return 1;
}

export function toUSD(localAmount, currency = 'USD') {
  const num = parseFloat(String(localAmount).replace(/,/g, '')) || 0;
  const rate = getRate(currency);
  return num / rate;
}

export function convertAmount(amountInUSD, currency = 'USD') {
  const num = parseFloat(amountInUSD) || 0;
  if (isINR(currency)) {
    return Math.round(num * USD_TO_INR_RATE);
  }
  const rate = getRate(currency);
  return num * rate;
}

export function formatCurrency(amountInUSD, currency = 'USD') {
  const num = parseFloat(amountInUSD) || 0;

  if (isINR(currency)) {
    const inrAmount = Math.round(num * USD_TO_INR_RATE);
    return '₹' + inrAmount.toLocaleString('en-IN');
  }

  // Default USD
  return '$' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatAmountWithCode(amountInUSD, currency = 'USD') {
  const formatted = formatCurrency(amountInUSD, currency);
  const code = isINR(currency) ? 'INR' : 'USD';
  return `${formatted} ${code}`;
}

export function formatAmountWithUSD(amountInUSD, currency = 'USD') {
  return formatCurrency(amountInUSD, currency);
}

export function getCurrencySymbol(currency = 'USD') {
  return isINR(currency) ? '₹' : '$';
}

export function getCurrencyCode(currency = 'USD') {
  return isINR(currency) ? 'INR' : 'USD';
}

// Aliases for full backward compatibility
export const formatAmount = formatCurrency;
export const convertCurrency = formatCurrency;
