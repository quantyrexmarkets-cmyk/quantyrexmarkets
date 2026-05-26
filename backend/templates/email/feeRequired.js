const baseTemplate = require('./base-enhanced');
const { formatUSD } = require('./_money');

// Type-specific content for each fee type
const FEE_CONTENT = {
  processing: {
    badge: 'PROCESSING FEE',
    badgeColor: '#3b82f6',
    icon: '⚙',
    title: 'Processing Fee Required',
    subtitle: 'Required to process and authorize your transaction',
    intro: (name) => `Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, a processing fee has been applied to your account. This fee covers the validation, security checks, and network costs required to authorize and process your transaction.`,
    reasons: [
      'Transaction validation & verification',
      'Secure network transfer authorization',
      'Anti-fraud security screening'
    ],
    urgency: 'Please settle this fee promptly to avoid delays in processing your transaction.',
    amountColor: '#3b82f6'
  },
  tax: {
    badge: 'COMPLIANCE TAX',
    badgeColor: '#f59e0b',
    icon: '⚖',
    title: 'Withdrawal Tax Notice',
    subtitle: 'Regulatory compliance — payment required',
    intro: (name) => `Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, in accordance with current financial regulations, a withdrawal tax has been applied to your account. This payment is mandatory and must be settled before your withdrawal can be released.`,
    reasons: [
      'Required by financial regulations',
      'Government-mandated compliance',
      'Withdrawal will remain on hold until settled'
    ],
    urgency: 'This is a regulatory requirement. Failure to settle this tax may result in extended withdrawal delays.',
    amountColor: '#f59e0b'
  },
  conversion: {
    badge: 'CONVERSION FEE',
    badgeColor: '#10b981',
    icon: '⇄',
    title: 'Currency Conversion Fee',
    subtitle: 'Required for cross-currency processing',
    intro: (name) => `Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, a currency conversion fee has been applied to your transaction. This fee covers exchange rate processing and conversion services required to complete your withdrawal in your preferred currency.`,
    reasons: [
      'Real-time exchange rate processing',
      'Multi-currency conversion services',
      'Settlement in your local currency'
    ],
    urgency: 'Settle this fee to complete your currency conversion and release funds.',
    amountColor: '#10b981'
  },
  inactivity: {
    badge: 'INACTIVITY FEE',
    badgeColor: '#64748b',
    icon: '◐',
    title: 'Account Reactivation Required',
    subtitle: 'Restore your trading privileges',
    intro: (name) => `Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, your account has been inactive for an extended period. An inactivity fee has been applied to your account. Settle this fee to reactivate your account and restore full trading privileges.`,
    reasons: [
      'Restore full trading access',
      'Re-enable withdrawals & deposits',
      'Reactivate bots & copy trading'
    ],
    urgency: 'Welcome back — settle this fee to resume trading with full account access.',
    amountColor: '#64748b'
  },
  maintenance: {
    badge: 'MAINTENANCE FEE',
    badgeColor: '#eab308',
    icon: '✦',
    title: 'Account Maintenance Fee',
    subtitle: 'Keep your account active and secure',
    intro: (name) => `Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, a routine maintenance fee has been applied to your account. This fee covers ongoing server costs, security infrastructure, and 24/7 platform monitoring required to keep your account operational.`,
    reasons: [
      'Server infrastructure & uptime',
      '24/7 security monitoring',
      'Continuous platform updates'
    ],
    urgency: 'Settle this fee to avoid any interruption to your account services.',
    amountColor: '#eab308'
  },
  custom: {
    badge: 'OUTSTANDING FEE',
    badgeColor: '#f59e0b',
    icon: '◆',
    title: 'Action Required',
    subtitle: 'A fee must be settled on your account',
    intro: (name) => `Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, an outstanding fee has been applied to your account that requires immediate attention. Please review the details below and settle the amount promptly.`,
    reasons: [
      'Required to process pending transactions',
      'Account services may be affected',
      'Settlement enables full account access'
    ],
    urgency: 'Please settle this fee at your earliest convenience to avoid service interruption.',
    amountColor: '#f59e0b'
  }
};

const feeRequiredEmail = (name, feeLabel, feeAmount, currency, feeType) => {
  // Get type-specific content, fallback to custom
  const fee = FEE_CONTENT[feeType] || FEE_CONTENT.custom;
  const displayLabel = feeLabel || fee.title;

  // Build reasons list HTML
  const reasonsList = fee.reasons.map(r =>
    `<tr><td style="padding:6px 0;color:#a1a1aa;font-size:12px;line-height:1.6;"><span style="color:${fee.badgeColor};margin-right:8px;">▸</span>${r}</td></tr>`
  ).join('');

  return baseTemplate(`
    <p style="color:${fee.badgeColor};font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;font-weight:600;">${fee.badge}</p>
    <div style="text-align:center;margin:0 0 16px;">
      <div style="display:inline-block;width:56px;height:56px;line-height:56px;border-radius:50%;background-color:${fee.badgeColor}15;border:1px solid ${fee.badgeColor}40;color:${fee.badgeColor};font-size:28px;text-align:center;">${fee.icon}</div>
    </div>
    <h1 style="color:#ffffff;font-size:24px;font-weight:300;margin:0 0 6px;text-align:center;">${fee.title}</h1>
    <p style="color:#a0a0a0;font-size:12px;margin:0 0 32px;text-align:center;">${fee.subtitle}</p>

    <p style="color:#a1a1aa;font-size:13px;line-height:1.8;">${fee.intro(name)}</p>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 20px;background-color:#121212;border:1px solid #1a1a1a;">
      <tr>
        <td style="padding:14px 16px;border-bottom:1px solid #1a1a1a;color:#71717a;font-size:11px;letter-spacing:1px;">FEE TYPE</td>
        <td align="right" style="padding:14px 16px;border-bottom:1px solid #1a1a1a;color:${fee.badgeColor};font-size:12px;font-weight:600;">${displayLabel}</td>
      </tr>
      <tr>
        <td style="padding:14px 16px;color:#71717a;font-size:11px;letter-spacing:1px;">AMOUNT DUE</td>
        <td align="right" style="padding:14px 16px;color:${fee.amountColor};font-size:22px;font-weight:700;">${formatUSD(feeAmount)}</td>
      </tr>
    </table>

    <p style="color:#71717a;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;margin:24px 0 12px;">What This Fee Covers</p>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
      ${reasonsList}
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;background-color:${fee.badgeColor}0d;border-left:3px solid ${fee.badgeColor};">
      <tr><td style="padding:14px 16px;color:#d4d4d8;font-size:12px;line-height:1.7;">${fee.urgency}</td></tr>
    </table>

    <p style="color:#a1a1aa;font-size:12px;line-height:1.8;text-align:center;">Please contact our support team or log in to your dashboard to settle this fee.</p>
    <p style="color:#71717a;font-size:10px;text-align:center;margin-top:24px;">The Quantyrex Markets Finance Team</p>
  `);
};

module.exports = feeRequiredEmail;
