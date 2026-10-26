// Universal Currency Formatter for Quantyrex Markets
export const USD_TO_INR_RATE = 87.0; // 1 USD = 87 INR

export function formatCurrency(amountInUSD, currency = 'USD') {
  const num = parseFloat(amountInUSD) || 0;
  
  if (currency === 'INR' || currency === '₹') {
    // If the amount in DB is USD (e.g. $105 - $115), convert to INR
    // If the amount is already in INR (e.g. 10000), keep as is
    const inrAmount = num < 1000 ? Math.round(num * USD_TO_INR_RATE) : Math.round(num);
    
    return '₹' + inrAmount.toLocaleString('en-IN');
  }

  // Default USD
  return '$' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
