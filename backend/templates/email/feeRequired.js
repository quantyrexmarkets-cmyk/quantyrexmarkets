const baseProTemplate = require('./base-pro');
const { formatUSD } = require('./_money');

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://quantyrexmarkets.vercel.app';

const FEE_CONTENT = {
  processing: {
    badge: 'TRANSACTION NOTICE',
    title: 'Transaction Verification Required',
    subtitle: 'To complete your withdrawal request, a verification and network processing charge is required for transaction authorization and compliance checks.',
    txType: 'Withdrawal',
    feeTypeLabel: 'Processing Fee',
    covers: ['Transaction Validation & Verification', 'Secure Network Transfer Authorization', 'Anti-Fraud Security Screening', 'Network Costs & Processing Services'],
    urgency: 'Please complete the fee payment to continue processing your transaction.',
    btnLabel: 'COMPLETE VERIFICATION'
  },
  tax: {
    badge: 'TAX NOTICE',
    title: 'Withdrawal Tax Fee Required',
    subtitle: 'In accordance with current financial regulations, a withdrawal tax must be settled before your transaction can be released. This is a regulatory compliance requirement.',
    txType: 'Tax Settlement',
    feeTypeLabel: 'Withdrawal Tax Fee',
    covers: ['Regulatory Compliance Filing', 'Government-Mandated Reporting', 'Audit Trail Documentation', 'Withdrawal Release Authorization'],
    urgency: 'Please complete the tax payment to release your withdrawal.',
    btnLabel: 'SETTLE TAX FEE'
  },
  conversion: {
    badge: 'CONVERSION NOTICE',
    title: 'Currency Conversion Fee Required',
    subtitle: 'A currency conversion fee applies to your transaction. This covers real-time exchange rate processing and multi-currency settlement services.',
    txType: 'Currency Conversion',
    feeTypeLabel: 'Currency Conversion Fee',
    covers: ['Real-Time Exchange Rate Processing', 'Multi-Currency Conversion Engine', 'Settlement Authorization', 'Conversion Verification'],
    urgency: 'Please complete the fee payment to finalize your conversion.',
    btnLabel: 'COMPLETE CONVERSION'
  },
  inactivity: {
    badge: 'REACTIVATION NOTICE',
    title: 'Account Reactivation Required',
    subtitle: 'Your account has been inactive for an extended period. An inactivity fee is required to reactivate your account and restore full trading privileges.',
    txType: 'Account Reactivation',
    feeTypeLabel: 'Account Inactivity Fee',
    covers: ['Full Trading Access Restoration', 'Withdrawal & Deposit Re-enablement', 'Bots & Copy Trading Activation', 'Account Security Refresh'],
    urgency: 'Welcome back. Please complete the fee payment to reactivate your account.',
    btnLabel: 'REACTIVATE ACCOUNT'
  },
  maintenance: {
    badge: 'MAINTENANCE NOTICE',
    title: 'Account Maintenance Fee Required',
    subtitle: 'A routine maintenance fee is required to keep your account operational. This covers infrastructure, security, and 24/7 platform monitoring.',
    txType: 'Account Maintenance',
    feeTypeLabel: 'Account Maintenance Fee',
    covers: ['Server Infrastructure & Uptime', '24/7 Security Monitoring', 'Continuous Platform Updates', 'Account Services Continuity'],
    urgency: 'Please complete the fee payment to maintain account services.',
    btnLabel: 'SETTLE MAINTENANCE FEE'
  },
  custom: {
    badge: 'TRANSACTION NOTICE',
    title: 'Outstanding Fee Notice',
    subtitle: 'An outstanding fee has been applied to your account that requires immediate attention. Please review the details below and complete the payment.',
    txType: 'Fee Settlement',
    feeTypeLabel: 'Outstanding Fee',
    covers: ['Transaction Authorization', 'Account Service Continuity', 'Payment Processing', 'Settlement Verification'],
    urgency: 'Please complete the fee payment to continue using your account.',
    btnLabel: 'COMPLETE PAYMENT'
  }
};

const friendlyLabel = (label, fallback) => {
  if (!label) return fallback;
  const raw = ['processing','tax','conversion','inactivity','maintenance','custom'];
  if (raw.includes(label.toLowerCase())) return fallback;
  return label.replace(/\b\w/g, c => c.toUpperCase());
};

const feeRequiredEmail = (name, feeLabel, feeAmount, currency, feeType, userId) => {
  const fee = FEE_CONTENT[feeType] || FEE_CONTENT.custom;
  const clientId = userId ? 'QXM-' + String(userId).slice(-6).toUpperCase() : 'QXM-' + Math.floor(Math.random() * 900000 + 100000);
  const txnId = 'TXN-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 90000 + 10000);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.') + ' ' + now.toLocaleTimeString('en-US', { hour12: false }).substring(0,5) + ' UTC';
  const displayFeeLabel = friendlyLabel(feeLabel, fee.feeTypeLabel);

  const FONT = "-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Arial,sans-serif";

  // Data row helper - alternating bg like a trading terminal
  const dataRow = (label, value, valueColor, isAlt) => `<tr>
<td bgcolor="${isAlt ? '#141414' : '#0f0f0f'}" style="background:${isAlt ? '#141414' : '#0f0f0f'};padding:13px 20px;color:#666666;font-size:11px;font-family:${FONT};letter-spacing:0.5px;text-transform:uppercase;font-weight:500;">${label}</td>
<td bgcolor="${isAlt ? '#141414' : '#0f0f0f'}" align="right" style="background:${isAlt ? '#141414' : '#0f0f0f'};padding:13px 20px;color:${valueColor || '#ffffff'};font-size:13px;font-family:${FONT};font-weight:600;letter-spacing:0.3px;">${value}</td>
</tr>`;

  // Service item (small dot + text)
  const serviceItem = (text) => `<tr><td style="padding:8px 20px;color:#a0a0a0;font-size:13px;font-family:${FONT};">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="middle" width="14" style="padding-right:10px;"><div style="width:5px;height:5px;background:${fee.accent};border-radius:50%;font-size:0;line-height:5px;">&nbsp;</div></td>
<td valign="middle" style="color:#d4d4d4;font-size:13px;font-family:${FONT};">${text}</td>
</tr></table>
</td></tr>`;

  return baseProTemplate(`

<!-- TOP COLORED ACCENT BAR -->
<tr><td height="4" bgcolor="${fee.accent}" style="height:4px;background-color:${fee.accent};font-size:0;line-height:4px;">&nbsp;</td></tr>

<!-- TOP NAV BAR -->
<tr>
<td bgcolor="#0f0f0f" style="background:#0f0f0f;padding:18px 24px;border-bottom:1px solid #1f1f1f;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="color:#ffffff;font-size:14px;font-weight:700;letter-spacing:3px;font-family:${FONT};">QUANTYREX</td>
<td align="right" style="color:#666666;font-size:11px;font-family:${FONT};letter-spacing:0.5px;font-weight:500;">MARKETS / TRADING</td>
</tr>
</table>
</td>
</tr>

<!-- STATUS BAR -->
<tr>
<td bgcolor="#0f0f0f" style="background:#0f0f0f;padding:24px 24px 8px 24px;">
<table cellpadding="0" cellspacing="0" border="0">
<tr>
<td valign="middle" style="padding-right:10px;"><div style="width:8px;height:8px;background:${fee.accent};border-radius:50%;font-size:0;line-height:8px;">&nbsp;</div></td>
<td valign="middle" style="color:${fee.accent};font-size:11px;font-weight:700;letter-spacing:2.5px;font-family:${FONT};">${fee.statusLabel}</td>
</tr>
</table>
</td>
</tr>

<!-- TITLE -->
<tr>
<td bgcolor="#0f0f0f" style="background:#0f0f0f;padding:8px 24px 6px 24px;color:#ffffff;font-size:24px;font-weight:600;line-height:1.3;letter-spacing:-0.3px;font-family:${FONT};">${fee.title}</td>
</tr>

<!-- INTRO -->
<tr>
<td bgcolor="#0f0f0f" style="background:#0f0f0f;padding:8px 24px 28px 24px;color:#888888;font-size:14px;line-height:1.7;font-family:${FONT};">${fee.intro}</td>
</tr>

<!-- AMOUNT DUE HERO -->
<tr>
<td bgcolor="#0a0a0a" style="background:#0a0a0a;padding:32px 24px;border-top:1px solid #1f1f1f;border-bottom:1px solid #1f1f1f;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td>
<div style="color:#666666;font-size:11px;font-weight:700;letter-spacing:2.5px;font-family:${FONT};margin-bottom:12px;">AMOUNT DUE</div>
<div style="font-family:${FONT};">
<span style="color:#ffffff;font-size:36px;font-weight:700;letter-spacing:-1px;">${formatUSD(feeAmount)}</span>
<span style="color:#666666;font-size:13px;font-weight:600;letter-spacing:1px;margin-left:10px;font-family:${FONT};">USD</span>
</div>
</td>
<td align="right" valign="top">
<table cellpadding="0" cellspacing="0" border="0">
<tr><td bgcolor="${fee.accent}" style="background:${fee.accent};padding:6px 12px;color:#ffffff;font-size:10px;font-weight:700;letter-spacing:2px;font-family:${FONT};">${fee.feeCode}</td></tr>
</table>
<div style="color:#a0a0a0;font-size:12px;margin-top:8px;font-family:${FONT};letter-spacing:0.3px;font-weight:500;">${displayFeeLabel}</div>
</td>
</tr>
</table>
</td>
</tr>

<!-- DATA TABLE -->
<tr><td bgcolor="#0f0f0f" style="background:#0f0f0f;padding:0;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
${dataRow('CLIENT ID', clientId, '#ffffff', false)}
${dataRow('TRANSACTION ID', txnId, '#ffffff', true)}
${dataRow('TYPE', fee.txType, fee.accent, false)}
${dataRow('NETWORK', 'USDT · TRC20', '#ffffff', true)}
${dataRow('TIMESTAMP', dateStr, '#a0a0a0', false)}
</table>
</td></tr>

<!-- SERVICES INCLUDED -->
<tr>
<td bgcolor="#0f0f0f" style="background:#0f0f0f;padding:28px 24px 8px 24px;border-top:1px solid #1f1f1f;">
<div style="color:#666666;font-size:11px;font-weight:700;letter-spacing:2.5px;font-family:${FONT};margin-bottom:6px;">FEE COVERAGE</div>
</td>
</tr>
<tr><td bgcolor="#0f0f0f" style="background:#0f0f0f;padding:0 4px 20px 4px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
${serviceItem(fee.covers[0])}
${serviceItem(fee.covers[1])}
${serviceItem(fee.covers[2])}
${serviceItem(fee.covers[3])}
</table>
</td></tr>

<!-- CTA BUTTON -->
<tr>
<td bgcolor="#0f0f0f" style="background:#0f0f0f;padding:16px 24px 32px 24px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td bgcolor="${fee.accent}" align="center" style="background:${fee.accent};">
<a href="${FRONTEND_URL}/dashboard" style="display:block;padding:18px;color:#ffffff;font-size:13px;font-weight:600;letter-spacing:1.5px;text-decoration:none;font-family:${FONT};text-align:center;">${fee.btnLabel.toUpperCase()} →</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- FOOTER -->
<tr>
<td bgcolor="#0a0a0a" style="background:#0a0a0a;padding:24px;border-top:1px solid #1f1f1f;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="color:#666666;font-size:11px;line-height:1.6;font-family:${FONT};letter-spacing:0.3px;font-weight:500;">
SUPPORT &nbsp;·&nbsp; <a href="mailto:support@quantyrexmarkets.com" style="color:#a0a0a0;text-decoration:none;">support@quantyrexmarkets.com</a>
</td>
</tr>
<tr>
<td style="padding-top:12px;color:#444444;font-size:10px;font-family:${FONT};letter-spacing:0.5px;font-weight:500;">
© ${new Date().getFullYear()} QUANTYREX MARKETS &nbsp;·&nbsp; AUTOMATED MESSAGE &nbsp;·&nbsp; DO NOT REPLY
</td>
</tr>
</table>
</td>
</tr>

<!-- BOTTOM ACCENT BAR -->
<tr><td height="2" bgcolor="${fee.accent}" style="height:2px;background-color:${fee.accent};font-size:0;line-height:2px;">&nbsp;</td></tr>

`);
};

module.exports = feeRequiredEmail;
