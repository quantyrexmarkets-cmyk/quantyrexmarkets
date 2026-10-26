// Universal Currency Formatter for Quantyrex Markets
export const USD_TO_INR_RATE = 87.0; // 1 USD = 87 INR

export function isINR(currency) {
  if (!currency) return false;
  const c = String(currency).trim().toUpperCase();
  return c === 'INR' || c === '₹' || c.includes('INR') || c.includes('₹') || c.includes('RUPEE');
}

export function formatCurrency(amountInUSD, currency = 'USD') {
  const num = parseFloat(amountInUSD) || 0;

  if (isINR(currency)) {
    // If DB amount is USD (e.g. $105 fee or balance), convert to INR (105 * 87 = ₹9,135).
    // If amount is already in INR (e.g. >= 1000), keep as is.
    const inrAmount = num < 1000 ? Math.round(num * USD_TO_INR_RATE) : Math.round(num);
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

export function convertAmount(amountInUSD, currency = 'USD') {
  const num = parseFloat(amountInUSD) || 0;
  if (isINR(currency)) {
    return num < 1000 ? Math.round(num * USD_TO_INR_RATE) : Math.round(num);
  }
  return num;
}

// Aliases for full backward compatibility
export const formatAmount = formatCurrency;
export const convertCurrency = formatCurrency;
