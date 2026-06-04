const baseTemplate = require('./base-enhanced');

const formatLocal = (amount, currency) => {
  const rates = {
    USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.5, NGN: 1580, JPY: 149.5,
    CAD: 1.36, AUD: 1.53, CHF: 0.90, CNY: 7.24, ZAR: 18.5,
    AED: 3.67, BRL: 5.05, MXN: 17.1, KES: 129, GHS: 15.5,
    PKR: 278, BDT: 110, PHP: 56, IDR: 15700, MYR: 4.7,
    SGD: 1.34, HKD: 7.8, KRW: 1330, THB: 35, TRY: 32
  };
  const symbols = {
    USD: '$', EUR: '€', GBP: '£', INR: '₹', NGN: '₦', JPY: '¥',
    CNY: '¥', CAD: 'C$', AUD: 'A$', CHF: 'Fr', ZAR: 'R',
    AED: 'د.إ', BRL: 'R$', MXN: 'Mex$', KES: 'KSh', GHS: '₵',
    PKR: '₨', BDT: '৳', PHP: '₱', IDR: 'Rp', MYR: 'RM',
    SGD: 'S$', HKD: 'HK$', KRW: '₩', THB: '฿', TRY: '₺'
  };
  const extractCode = (c) => {
    if (!c) return 'USD';
    if (c.length === 3) return c.toUpperCase();
    const m = c.match(/\(([A-Z]{3})\)/);
    return m ? m[1] : 'USD';
  };
  const code = extractCode(currency);
  const rate = rates[code] || 1;
  const symbol = symbols[code] || '$';
  const converted = (Number(amount) || 0) * rate;
  const decimals = (code === 'JPY' || code === 'KRW' || code === 'IDR') ? 0 : 2;
  return `${symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
};

const registrationFeeEmail = (name, amount, currency) => baseTemplate(`
  <p style="color:#818cf8;font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;">REGISTRATION FEE</p>
  <h1 style="color:#818cf8;font-size:30px;font-weight:200;margin:0 0 6px;text-align:center;">${formatLocal(amount, currency)}</h1>
  <p style="color:#f59e0b;font-size:11px;letter-spacing:2px;font-weight:500;margin:0 0 28px;text-align:center;">ACTION REQUIRED</p>
  <p style="color:#a1a1aa;font-size:13px;line-height:1.8;">Dear <span style="color:#fff;">${name || 'Client'}</span>,</p>
  <p style="color:#a1a1aa;font-size:13px;line-height:1.8;">
    A one-time registration fee of <span style="color:#818cf8;font-weight:600;">${formatLocal(amount, currency)}</span> is required to fully activate your Quantyrex Markets account.
  </p>
  <p style="color:#a1a1aa;font-size:13px;line-height:1.8;">
    Once payment is confirmed, your account will gain full access to deposits, withdrawals, and all trading features.
  </p>
  <p style="color:#a1a1aa;font-size:12px;line-height:1.8;margin-top:20px;">
    For assistance, please contact our support team.
  </p>
  <p style="color:#71717a;font-size:10px;text-align:center;margin-top:28px;">The Quantyrex Markets Finance Team</p>
`);

module.exports = registrationFeeEmail;
