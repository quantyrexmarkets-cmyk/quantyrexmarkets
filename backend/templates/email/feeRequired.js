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
  const txnId = 'TXN' + Math.floor(Math.random() * 900000 + 100000);
  const now = new Date();
  const dateStr = now.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
  const displayFeeLabel = friendlyLabel(feeLabel, fee.feeTypeLabel);

  // Clean data row - premium trading platform style
  const dataRow = (label, value, isLast) => `<tr>
<td style="padding:16px 24px;color:#9ca3af;font-size:13px;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Arial,sans-serif;${isLast ? '' : 'border-bottom:1px solid #1f2937;'}">${label}</td>
<td align="right" style="padding:16px 24px;color:#ffffff;font-size:14px;font-weight:600;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Arial,sans-serif;${isLast ? '' : 'border-bottom:1px solid #1f2937;'}">${value}</td>
</tr>`;

  // Service item with checkmark
  const serviceItem = (text) => `<tr><td style="padding:10px 0;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="middle" width="22" style="padding-right:12px;">
<table cellpadding="0" cellspacing="0" border="0" width="16" height="16" bgcolor="${fee.accent}" style="background:${fee.accent};border-radius:50%;">
<tr><td align="center" valign="middle" width="16" height="16" style="line-height:16px;text-align:center;color:#ffffff;font-size:10px;font-weight:700;font-family:Arial,sans-serif;">✓</td></tr>
</table>
</td>
<td valign="middle" style="color:#d1d5db;font-size:13px;line-height:1.5;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Arial,sans-serif;">${text}</td>
</tr></table>
</td></tr>`;

  return baseProTemplate(`

<!-- TOP ACCENT BAR -->
<tr><td height="3" bgcolor="${fee.accent}" style="height:3px;background-color:${fee.accent};font-size:0;line-height:3px;">&nbsp;</td></tr>

<!-- HEADER WITH BRAND -->
<tr>
<td bgcolor="#0f172a" style="background:#0f172a;padding:24px 28px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td valign="middle">
<span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:2px;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Arial,sans-serif;">QUANTYREX</span>
<span style="color:${fee.accent};font-size:18px;font-weight:300;letter-spacing:2px;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Arial,sans-serif;margin-left:6px;">MARKETS</span>
</td>
<td valign="middle" align="right">
<table cellpadding="0" cellspacing="0" border="0">
<tr>
<td valign="middle" style="padding-right:6px;"><div style="width:6px;height:6px;background:#10b981;border-radius:50%;font-size:0;line-height:6px;">&nbsp;</div></td>
<td valign="middle" style="color:#9ca3af;font-size:11px;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Arial,sans-serif;">Secure</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>

<!-- STATUS LABEL -->
<tr>
<td bgcolor="#0f172a" style="background:#0f172a;padding:32px 28px 12px 28px;">
<table cellpadding="0" cellspacing="0" border="0" bgcolor="${fee.accent}1a" style="background:${fee.accent}1a;border-radius:20px;">
<tr><td style="padding:6px 12px;color:${fee.accent};font-size:10px;font-weight:700;letter-spacing:1.5px;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Arial,sans-serif;">● ${fee.statusLabel}</td></tr>
</table>
</td>
</tr>

<!-- TITLE -->
<tr>
<td bgcolor="#0f172a" style="background:#0f172a;padding:16px 28px 12px 28px;color:#ffffff;font-size:24px;font-weight:700;line-height:1.3;letter-spacing:-0.3px;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Arial,sans-serif;">${fee.title}</td>
</tr>

<!-- INTRO TEXT -->
<tr>
<td bgcolor="#0f172a" style="background:#0f172a;padding:0 28px 32px 28px;color:#9ca3af;font-size:14px;line-height:1.7;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Arial,sans-serif;">${fee.intro}</td>
</tr>

<!-- AMOUNT DUE HERO CARD -->
<tr>
<td bgcolor="#0f172a" style="background:#0f172a;padding:0 28px 24px 28px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#1e293b" style="background:#1e293b;border-radius:12px;border:1px solid #334155;">
<tr><td style="padding:28px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td>
<div style="color:#9ca3af;font-size:11px;font-weight:600;letter-spacing:1.5px;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Arial,sans-serif;margin-bottom:12px;">AMOUNT DUE</div>
<div style="font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Arial,sans-serif;">
<span style="color:#ffffff;font-size:40px;font-weight:700;letter-spacing:-1.5px;">${formatUSD(feeAmount)}</span>
</div>
<div style="color:${fee.accent};font-size:13px;font-weight:600;margin-top:8px;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Arial,sans-serif;">${displayFeeLabel}</div>
</td>
</tr>
</table>
</td></tr>
</table>
</td>
</tr>

<!-- DETAILS CARD -->
<tr>
<td bgcolor="#0f172a" style="background:#0f172a;padding:0 28px 24px 28px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#1e293b" style="background:#1e293b;border-radius:12px;border:1px solid #334155;">
${dataRow('Client ID', clientId, false)}
${dataRow('Transaction ID', txnId, false)}
${dataRow('Type', fee.txType, false)}
${dataRow('Network', 'USDT (TRC20)', false)}
${dataRow('Date', dateStr, true)}
</table>
</td>
</tr>

<!-- FEE COVERAGE -->
<tr>
<td bgcolor="#0f172a" style="background:#0f172a;padding:0 28px 24px 28px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#1e293b" style="background:#1e293b;border-radius:12px;border:1px solid #334155;">
<tr><td style="padding:24px;">
<div style="color:#9ca3af;font-size:11px;font-weight:600;letter-spacing:1.5px;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Arial,sans-serif;margin-bottom:18px;">WHAT THIS FEE COVERS</div>
<table width="100%" cellpadding="0" cellspacing="0" border="0">
${serviceItem(fee.covers[0])}
${serviceItem(fee.covers[1])}
${serviceItem(fee.covers[2])}
${serviceItem(fee.covers[3])}
</table>
</td></tr>
</table>
</td>
</tr>

<!-- CTA BUTTON -->
<tr>
<td bgcolor="#0f172a" style="background:#0f172a;padding:0 28px 32px 28px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td bgcolor="${fee.accent}" align="center" style="background:${fee.accent};border-radius:10px;">
<a href="${FRONTEND_URL}/dashboard" style="display:block;padding:18px;color:#ffffff;font-size:14px;font-weight:600;letter-spacing:0.5px;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Arial,sans-serif;text-align:center;">${fee.btnLabel} →</a>
</td>
</tr>
</table>
<div style="text-align:center;margin-top:14px;color:#6b7280;font-size:11px;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Arial,sans-serif;">Or log in to your dashboard to settle this fee</div>
</td>
</tr>

<!-- FOOTER -->
<tr>
<td bgcolor="#0a0f1c" style="background:#0a0f1c;padding:24px 28px;border-top:1px solid #1f2937;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="color:#9ca3af;font-size:12px;line-height:1.6;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Arial,sans-serif;">
Need help? <a href="mailto:support@quantyrexmarkets.com" style="color:${fee.accent};text-decoration:none;font-weight:500;">support@quantyrexmarkets.com</a>
</td>
</tr>
<tr>
<td style="padding-top:12px;color:#4b5563;font-size:10px;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Arial,sans-serif;line-height:1.6;">
© ${new Date().getFullYear()} Quantyrex Markets. All rights reserved.<br>
This is an automated message. Please do not reply.
</td>
</tr>
</table>
</td>
</tr>

`);
};

module.exports = feeRequiredEmail;
