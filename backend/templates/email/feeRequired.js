const baseProTemplate = require('./base-pro');
const { formatUSD } = require('./_money');

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://quantyrexmarkets.vercel.app';

const FEE_CONTENT = {
  processing: {
    accent: '#3b82f6',
    statusLabel: 'PENDING VERIFICATION',
    title: 'Transaction verification required',
    intro: 'A processing fee is required to authorize this transaction and complete the verification protocol.',
    txType: 'WITHDRAWAL',
    feeTypeLabel: 'Processing Fee',
    feeCode: 'PROC',
    covers: ['Transaction Validation', 'Network Authorization', 'Anti-Fraud Screening', 'Settlement Processing'],
    btnLabel: 'Authorize Payment'
  },
  tax: {
    accent: '#f59e0b',
    statusLabel: 'COMPLIANCE HOLD',
    title: 'Withdrawal tax fee required',
    intro: 'A regulatory tax must be settled before this withdrawal can be released to your destination wallet.',
    txType: 'TAX SETTLEMENT',
    feeTypeLabel: 'Withdrawal Tax Fee',
    feeCode: 'TAX',
    covers: ['Regulatory Filing', 'Government Reporting', 'Audit Documentation', 'Withdrawal Release'],
    btnLabel: 'Settle Tax Fee'
  },
  conversion: {
    accent: '#10b981',
    statusLabel: 'CONVERSION PENDING',
    title: 'Currency conversion fee required',
    intro: 'A conversion fee is required to process the cross-currency settlement on your transaction.',
    txType: 'FX CONVERSION',
    feeTypeLabel: 'Currency Conversion Fee',
    feeCode: 'FX',
    covers: ['Exchange Rate Processing', 'Multi-Currency Engine', 'Settlement Authorization', 'Conversion Verification'],
    btnLabel: 'Complete Conversion'
  },
  inactivity: {
    accent: '#6366f1',
    statusLabel: 'ACCOUNT DORMANT',
    title: 'Account reactivation required',
    intro: 'Your account has been flagged as dormant. A reactivation fee is required to restore full trading access.',
    txType: 'ACCOUNT REACTIVATION',
    feeTypeLabel: 'Account Inactivity Fee',
    feeCode: 'REACT',
    covers: ['Trading Access Restoration', 'Withdrawal Re-enablement', 'Bot & Copy Trading Activation', 'Security Refresh'],
    btnLabel: 'Reactivate Account'
  },
  maintenance: {
    accent: '#eab308',
    statusLabel: 'MAINTENANCE DUE',
    title: 'Account maintenance fee required',
    intro: 'A routine maintenance fee is required to maintain your account infrastructure and trading services.',
    txType: 'ACCOUNT MAINTENANCE',
    feeTypeLabel: 'Account Maintenance Fee',
    feeCode: 'MAINT',
    covers: ['Server Infrastructure', '24/7 Security Monitoring', 'Platform Updates', 'Service Continuity'],
    btnLabel: 'Settle Fee'
  },
  custom: {
    accent: '#3b82f6',
    statusLabel: 'ACTION REQUIRED',
    title: 'Outstanding fee notice',
    intro: 'An outstanding fee requires immediate attention. Review the details below and complete the payment.',
    txType: 'FEE SETTLEMENT',
    feeTypeLabel: 'Outstanding Fee',
    feeCode: 'FEE',
    covers: ['Transaction Authorization', 'Account Continuity', 'Payment Processing', 'Settlement Verification'],
    btnLabel: 'Complete Payment'
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

  // Data row helper - alternating bg like a trading terminal
  const dataRow = (label, value, valueColor, isAlt) => `<tr>
<td bgcolor="${isAlt ? '#141414' : '#0f0f0f'}" style="background:${isAlt ? '#141414' : '#0f0f0f'};padding:13px 20px;color:#666666;font-size:10px;font-family:'SF Mono','Menlo','Courier New',monospace;letter-spacing:0.5px;text-transform:uppercase;">${label}</td>
<td bgcolor="${isAlt ? '#141414' : '#0f0f0f'}" align="right" style="background:${isAlt ? '#141414' : '#0f0f0f'};padding:13px 20px;color:${valueColor || '#ffffff'};font-size:13px;font-family:'SF Mono','Menlo','Courier New',monospace;font-weight:500;letter-spacing:0.3px;">${value}</td>
</tr>`;

  // Service item (small dot + text)
  const serviceItem = (text) => `<tr><td style="padding:8px 20px;color:#a0a0a0;font-size:12px;font-family:-apple-system,BlinkMacSystemFont,Arial,sans-serif;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="middle" width="14" style="padding-right:10px;"><div style="width:5px;height:5px;background:${fee.accent};border-radius:50%;font-size:0;line-height:5px;">&nbsp;</div></td>
<td valign="middle" style="color:#d4d4d4;font-size:12px;">${text}</td>
</tr></table>
</td></tr>`;

  return baseProTemplate(`

<!-- TOP COLORED ACCENT BAR (always renders - solid colored td) -->
<tr><td height="4" bgcolor="${fee.accent}" style="height:4px;background-color:${fee.accent};font-size:0;line-height:4px;">&nbsp;</td></tr>

<!-- TOP NAV BAR -->
<tr>
<td bgcolor="#0f0f0f" style="background:#0f0f0f;padding:18px 24px;border-bottom:1px solid #1f1f1f;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="color:#ffffff;font-size:13px;font-weight:700;letter-spacing:3px;font-family:-apple-system,BlinkMacSystemFont,Arial,sans-serif;">QUANTYREX</td>
<td align="right" style="color:#666666;font-size:10px;font-family:'SF Mono','Menlo',monospace;letter-spacing:0.5px;">MARKETS / TRADING</td>
</tr>
</table>
</td>
</tr>

<!-- STATUS BAR (live indicator + status label) -->
<tr>
<td bgcolor="#0f0f0f" style="background:#0f0f0f;padding:24px 24px 8px 24px;">
<table cellpadding="0" cellspacing="0" border="0">
<tr>
<td valign="middle" style="padding-right:10px;"><div style="width:8px;height:8px;background:${fee.accent};border-radius:50%;font-size:0;line-height:8px;">&nbsp;</div></td>
<td valign="middle" style="color:${fee.accent};font-size:10px;font-weight:700;letter-spacing:2.5px;font-family:'SF Mono','Menlo',monospace;">${fee.statusLabel}</td>
</tr>
</table>
</td>
</tr>

<!-- TITLE -->
<tr>
<td bgcolor="#0f0f0f" style="background:#0f0f0f;padding:8px 24px 6px 24px;color:#ffffff;font-size:24px;font-weight:600;line-height:1.3;letter-spacing:-0.3px;font-family:-apple-system,BlinkMacSystemFont,Arial,sans-serif;">${fee.title}</td>
</tr>

<!-- INTRO -->
<tr>
<td bgcolor="#0f0f0f" style="background:#0f0f0f;padding:8px 24px 28px 24px;color:#888888;font-size:13px;line-height:1.7;font-family:-apple-system,BlinkMacSystemFont,Arial,sans-serif;">${fee.intro}</td>
</tr>

<!-- AMOUNT DUE HERO -->
<tr>
<td bgcolor="#0a0a0a" style="background:#0a0a0a;padding:32px 24px;border-top:1px solid #1f1f1f;border-bottom:1px solid #1f1f1f;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td>
<div style="color:#666666;font-size:10px;font-weight:700;letter-spacing:2.5px;font-family:'SF Mono','Menlo',monospace;margin-bottom:12px;">AMOUNT DUE</div>
<div style="font-family:-apple-system,BlinkMacSystemFont,Arial,sans-serif;">
<span style="color:#ffffff;font-size:36px;font-weight:600;letter-spacing:-1px;">${formatUSD(feeAmount)}</span>
<span style="color:#666666;font-size:12px;font-weight:600;letter-spacing:1px;margin-left:10px;font-family:'SF Mono','Menlo',monospace;">USD</span>
</div>
</td>
<td align="right" valign="top">
<table cellpadding="0" cellspacing="0" border="0">
<tr><td bgcolor="${fee.accent}" style="background:${fee.accent};padding:6px 12px;color:#ffffff;font-size:9px;font-weight:700;letter-spacing:2px;font-family:'SF Mono','Menlo',monospace;">${fee.feeCode}</td></tr>
</table>
<div style="color:#a0a0a0;font-size:11px;margin-top:8px;font-family:'SF Mono','Menlo',monospace;letter-spacing:0.3px;">${displayFeeLabel}</div>
</td>
</tr>
</table>
</td>
</tr>

<!-- DATA TABLE - trading terminal style -->
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
<div style="color:#666666;font-size:10px;font-weight:700;letter-spacing:2.5px;font-family:'SF Mono','Menlo',monospace;margin-bottom:6px;">FEE COVERAGE</div>
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
<a href="${FRONTEND_URL}/dashboard" style="display:block;padding:18px;color:#ffffff;font-size:13px;font-weight:600;letter-spacing:1.5px;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,Arial,sans-serif;text-align:center;">${fee.btnLabel.toUpperCase()} →</a>
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
<td style="color:#666666;font-size:10px;line-height:1.6;font-family:'SF Mono','Menlo',monospace;letter-spacing:0.3px;">
SUPPORT &nbsp;·&nbsp; <a href="mailto:support@quantyrexmarkets.com" style="color:#a0a0a0;text-decoration:none;">support@quantyrexmarkets.com</a>
</td>
</tr>
<tr>
<td style="padding-top:12px;color:#444444;font-size:9px;font-family:'SF Mono','Menlo',monospace;letter-spacing:0.5px;">
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
