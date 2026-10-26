// Universal Currency Formatter for Quantyrex Markets
export const USD_TO_INR_RATE = 87.0; // 1 USD = 87 INR

export function formatCurrency(amountInUSD, currency = 'USD') {
  const num = parseFloat(amountInUSD) || 0;

  if (currency === 'INR' || currency === '₹') {
    // If DB amount is USD (e.g. $105), convert to INR (e.g. ₹9,135). If already in INR (>= 1000), keep as is.
    const inrAmount = num < 1000 ? Math.round(num * USD_TO_INR_RATE) : Math.round(num);
    return '₹' + inrAmount.toLocaleString('en-IN');
  }

  // Default USD
  return '$' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatAmountWithCode(amountInUSD, currency = 'USD') {
  const formatted = formatCurrency(amountInUSD, currency);
  const code = (currency === 'INR' || currency === '₹') ? 'INR' : 'USD';
  return `${formatted} ${code}`;
}

export function formatAmountWithUSD(amountInUSD, currency = 'USD') {
  return formatCurrency(amountInUSD, currency);
}

export function getCurrencySymbol(currency = 'USD') {
  return (currency === 'INR' || currency === '₹') ? '₹' : '$';
}

export function getCurrencyCode(currency = 'USD') {
  return (currency === 'INR' || currency === '₹') ? 'INR' : 'USD';
}

export function convertAmount(amountInUSD, currency = 'USD') {
  const num = parseFloat(amountInUSD) || 0;
  if (currency === 'INR' || currency === '₹') {
    return num < 1000 ? Math.round(num * USD_TO_INR_RATE) : Math.round(num);
  }
  return num;
}

// Aliases for full compatibility
export const formatAmount = formatCurrency;
export const convertCurrency = formatCurrency;
