const baseTemplate = require('./base-enhanced');
const { formatUSD } = require('./_money');

// Type-specific content - same color, just unique copy per fee type
const FEE_CONTENT = {
  processing: {
    badge: 'PROCESSING FEE',
    title: 'Processing Fee Required',
    subtitle: 'Required to process and authorize your transaction',
    intro: (name) => `Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, a Processing Fee has been applied to your account. This fee covers the validation, security checks, and network costs required to authorize and process your transaction.`,
    reasons: [
      'Transaction validation & verification',
      'Secure network transfer authorization',
      'Anti-fraud security screening'
    ],
    urgency: 'Please settle this fee promptly to avoid delays in processing your transaction.'
  },
  tax: {
    badge: 'COMPLIANCE TAX',
    title: 'Withdrawal Tax Notice',
    subtitle: 'Regulatory compliance — payment required',
    intro: (name) => `Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, in accordance with current financial regulations, a Withdrawal Tax has been applied to your account. This payment is mandatory and must be settled before your withdrawal can be released.`,
    reasons: [
      'Required by financial regulations',
      'Government-mandated compliance',
      'Withdrawal will remain on hold until settled'
    ],
    urgency: 'This is a regulatory requirement. Failure to settle this tax may result in extended withdrawal delays.'
  },
  conversion: {
    badge: 'CONVERSION FEE',
    title: 'Currency Conversion Fee',
    subtitle: 'Required for cross-currency processing',
    intro: (name) => `Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, a Currency Conversion Fee has been applied to your transaction. This fee covers exchange rate processing and conversion services required to complete your withdrawal in your preferred currency.`,
    reasons: [
      'Real-time exchange rate processing',
      'Multi-currency conversion services',
      'Settlement in your local currency'
    ],
    urgency: 'Settle this fee to complete your currency conversion and release funds.'
  },
  inactivity: {
    badge: 'INACTIVITY FEE',
    title: 'Account Reactivation Required',
    subtitle: 'Restore your trading privileges',
    intro: (name) => `Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, your account has been inactive for an extended period. An Inactivity Fee has been applied to your account. Settle this fee to reactivate your account and restore full trading privileges.`,
    reasons: [
      'Restore full trading access',
      'Re-enable withdrawals & deposits',
      'Reactivate bots & copy trading'
    ],
    urgency: 'Welcome back — settle this fee to resume trading with full account access.'
  },
  maintenance: {
    badge: 'MAINTENANCE FEE',
    title: 'Account Maintenance Fee',
    subtitle: 'Keep your account active and secure',
    intro: (name) => `Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, a routine Maintenance Fee has been applied to your account. This fee covers ongoing server costs, security infrastructure, and 24/7 platform monitoring required to keep your account operational.`,
    reasons: [
      'Server infrastructure & uptime',
      '24/7 security monitoring',
      'Continuous platform updates'
    ],
    urgency: 'Settle this fee to avoid any interruption to your account services.'
  },
  custom: {
    badge: 'OUTSTANDING FEE',
    title: 'Action Required',
    subtitle: 'A fee must be settled on your account',
    intro: (name) => `Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, an outstanding fee has been applied to your account that requires immediate attention. Please review the details below and settle the amount promptly.`,
    reasons: [
      'Required to process pending transactions',
      'Account services may be affected',
      'Settlement enables full account access'
    ],
    urgency: 'Please settle this fee at your earliest convenience to avoid service interruption.'
  }
};

// Single elegant accent color used throughout
const ACCENT = '#f59e0b';

// Capitalize first letter of each word (e.g. "processing fee" -> "Processing Fee")
const capitalize = (str) => {
  if (!str) return '';
  return str.replace(/\b\w/g, c => c.toUpperCase());
};

const feeRequiredEmail = (name, feeLabel, feeAmount, currency, feeType) => {
  const fee = FEE_CONTENT[feeType] || FEE_CONTENT.custom;
  const displayLabel = capitalize(feeLabel || fee.title);

  const reasonsList = fee.reasons.map(r =>
    `<tr><td style="padding:6px 0;color:#a1a1aa;font-size:12px;line-height:1.6;"><span style="color:${ACCENT};margin-right:8px;">▸</span>${r}</td></tr>`
  ).join('');

  return baseTemplate(`
    <p style="color:${ACCENT};font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;font-weight:600;">${fee.badge}</p>
    <h1 style="color:#ffffff;font-size:24px;font-weight:300;margin:0 0 6px;text-align:center;">${fee.title}</h1>
    <p style="color:#a0a0a0;font-size:12px;margin:0 0 32px;text-align:center;">${fee.subtitle}</p>

    <p style="color:#a1a1aa;font-size:13px;line-height:1.8;">${fee.intro(name)}</p>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 20px;background-color:#121212;border:1px solid #1a1a1a;">
      <tr>
        <td style="padding:14px 16px;border-bottom:1px solid #1a1a1a;color:#71717a;font-size:11px;letter-spacing:1px;">FEE TYPE</td>
        <td align="right" style="padding:14px 16px;border-bottom:1px solid #1a1a1a;color:${ACCENT};font-size:12px;font-weight:600;">${displayLabel}</td>
      </tr>
      <tr>
        <td style="padding:14px 16px;color:#71717a;font-size:11px;letter-spacing:1px;">AMOUNT DUE</td>
        <td align="right" style="padding:14px 16px;color:${ACCENT};font-size:15px;font-weight:600;">${formatUSD(feeAmount)}</td>
      </tr>
    </table>

    <p style="color:#71717a;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;margin:24px 0 12px;">What This Fee Covers</p>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
      ${reasonsList}
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;background-color:rgba(245,158,11,0.05);border-left:3px solid ${ACCENT};">
      <tr><td style="padding:14px 16px;color:#d4d4d8;font-size:12px;line-height:1.7;">${fee.urgency}</td></tr>
    </table>

    <p style="color:#a1a1aa;font-size:12px;line-height:1.8;text-align:center;">Please contact our support team or log in to your dashboard to settle this fee.</p>
    <p style="color:#71717a;font-size:10px;text-align:center;margin-top:24px;">The Quantyrex Markets Finance Team</p>
  `);
};

module.exports = feeRequiredEmail;
