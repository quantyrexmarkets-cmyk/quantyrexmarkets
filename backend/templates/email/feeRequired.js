const baseProTemplate = require('./base-pro');
const { formatUSD } = require('./_money');

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://quantyrexmarkets.vercel.app';

const FEE_CONTENT = {
  processing: {
    badge: 'TRANSACTION NOTICE',
    titleMain: 'Transaction Verification',
    titleAccent: 'Required',
    intro: 'To complete your withdrawal request, a verification and network processing charge is required for transaction authorization and compliance checks.',
    txType: 'Withdrawal',
    feeTypeLabel: 'Processing Fee',
    covers: ['Transaction Validation & Verification', 'Secure Network Transfer Authorization', 'Anti-Fraud Security Screening', 'Network Costs & Processing Services'],
    actionText: 'processing your transaction',
    btnLabel: 'COMPLETE VERIFICATION'
  },
  tax: {
    badge: 'TAX NOTICE',
    titleMain: 'Withdrawal Tax Fee',
    titleAccent: 'Required',
    intro: 'In accordance with current financial regulations, a withdrawal tax must be settled before your transaction can be released.',
    txType: 'Tax Settlement',
    feeTypeLabel: 'Withdrawal Tax Fee',
    covers: ['Regulatory Compliance Filing', 'Government-Mandated Reporting', 'Audit Trail Documentation', 'Withdrawal Release Authorization'],
    actionText: 'releasing your withdrawal',
    btnLabel: 'SETTLE TAX FEE'
  },
  conversion: {
    badge: 'CONVERSION NOTICE',
    titleMain: 'Currency Conversion Fee',
    titleAccent: 'Required',
    intro: 'A currency conversion fee applies to your transaction. This covers real-time exchange rate processing and settlement services.',
    txType: 'Currency Conversion',
    feeTypeLabel: 'Currency Conversion Fee',
    covers: ['Real-Time Exchange Rate Processing', 'Multi-Currency Conversion Engine', 'Settlement Authorization', 'Conversion Verification'],
    actionText: 'finalizing your conversion',
    btnLabel: 'COMPLETE CONVERSION'
  },
  inactivity: {
    badge: 'REACTIVATION NOTICE',
    titleMain: 'Account Reactivation',
    titleAccent: 'Required',
    intro: 'Your account has been inactive for an extended period. An inactivity fee is required to restore full trading access.',
    txType: 'Account Reactivation',
    feeTypeLabel: 'Account Inactivity Fee',
    covers: ['Full Trading Access Restoration', 'Withdrawal & Deposit Re-enablement', 'Bots & Copy Trading Activation', 'Account Security Refresh'],
    actionText: 'reactivating your account',
    btnLabel: 'REACTIVATE ACCOUNT'
  },
  maintenance: {
    badge: 'MAINTENANCE NOTICE',
    titleMain: 'Account Maintenance Fee',
    titleAccent: 'Required',
    intro: 'A routine maintenance fee is required to keep your account operational and trading services available.',
    txType: 'Account Maintenance',
    feeTypeLabel: 'Account Maintenance Fee',
    covers: ['Server Infrastructure & Uptime', '24/7 Security Monitoring', 'Continuous Platform Updates', 'Account Services Continuity'],
    actionText: 'maintaining your account services',
    btnLabel: 'SETTLE FEE'
  },
  custom: {
    badge: 'TRANSACTION NOTICE',
    titleMain: 'Outstanding Fee',
    titleAccent: 'Notice',
    intro: 'An outstanding fee has been applied to your account that requires immediate attention. Please review the details below.',
    txType: 'Fee Settlement',
    feeTypeLabel: 'Outstanding Fee',
    covers: ['Transaction Authorization', 'Account Service Continuity', 'Payment Processing', 'Settlement Verification'],
    actionText: 'continuing to use your account',
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
  const clientId = userId ? '#QXM-' + String(userId).slice(-5).toUpperCase() : '#QXM-' + Math.floor(Math.random() * 90000 + 10000);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) + ' UTC';
  const displayFeeLabel = friendlyLabel(feeLabel, fee.feeTypeLabel);

  const F = "'Montserrat',Arial,sans-serif";

  const detailItem = (label, value) => `<td width="50%" valign="top" style="padding:16px 18px;">
<div style="color:#5a6a85;font-size:9px;font-weight:500;letter-spacing:1.2px;font-family:${F};margin-bottom:6px;">${label}</div>
<div style="color:#ffffff;font-size:12px;font-weight:500;font-family:${F};line-height:1.4;">${value}</div>
</td>`;

  const breakdownRow = (text, isLast) => `<tr>
<td style="padding:11px 18px;color:#d1d5db;font-size:11px;font-weight:400;font-family:${F};${isLast ? '' : ';'}">${text}</td>
</tr>`;

  return baseProTemplate(`

<!-- HEADER -->
<tr>
<td bgcolor="#000000" style="background:#000000;padding:28px 24px 20px 24px;">
<div style="font-family:${F};">
<span style="color:#ffffff;font-size:16px;font-weight:400;letter-spacing:0.3px;">Quantyrex</span>
<span style="color:#3b82f6;font-size:16px;font-weight:400;letter-spacing:0.3px;margin-left:6px;">Markets</span>
</div>
</td>
</tr>

<!-- MAIN CARD -->
<tr>
<td bgcolor="#000000" style="background:#000000;padding:0 16px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#000000" style="background:#000000;border-radius:14px;">

<!-- BADGE -->
<tr>
<td style="padding:26px 24px 14px 24px;">
<div style="color:#3b82f6;font-size:9px;font-weight:500;letter-spacing:1.5px;font-family:${F};">${fee.badge}</div>
</td>
</tr>

<!-- TITLE -->
<tr>
<td style="padding:0 24px 10px 24px;">
<div style="color:#ffffff;font-size:20px;font-weight:400;line-height:1.3;letter-spacing:-0.2px;font-family:${F};">${fee.titleMain}</div>
<div style="color:#3b82f6;font-size:20px;font-weight:400;line-height:1.3;letter-spacing:-0.2px;font-family:${F};margin-top:2px;">${fee.titleAccent}</div>
</td>
</tr>

<!-- UNDERLINE -->
<tr>
<td style="padding:0 24px 18px 24px;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td width="34" height="2" bgcolor="#3b82f6" style="width:34px;height:2px;background:#3b82f6;font-size:0;line-height:2px;">&nbsp;</td>
</tr></table>
</td>
</tr>

<!-- INTRO TEXT -->
<tr>
<td style="padding:0 24px 26px 24px;color:#9ca3af;font-size:11px;line-height:1.7;font-family:${F};font-weight:400;">${fee.intro}</td>
</tr>

<!-- DETAILS CARD -->
<tr>
<td style="padding:0 18px 14px 18px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0d0d0d" style="background:#0d0d0d;border-radius:10px;">
<tr>
${detailItem('CLIENT ID', clientId)}
${detailItem('TRANSACTION TYPE', fee.txType)}
</tr>
<tr><td colspan="2" style=";height:1px;font-size:0;line-height:0;">&nbsp;</td></tr>
<tr>
${detailItem('NETWORK', 'USDT (TRC20)')}
${detailItem('DATE & TIME', dateStr + '<br>' + timeStr)}
</tr>
</table>
</td>
</tr>

<!-- AMOUNT DUE CARD -->
<tr>
<td style="padding:0 18px 14px 18px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0a1428" style="background:#0a1428;border-radius:10px;border:1px solid #1e3a8a;">
<tr>
<td width="50%" valign="top" style="padding:20px 22px;border-right:1px solid #1e3a8a;">
<div style="color:#7a8aa8;font-size:9px;font-weight:500;letter-spacing:1.2px;font-family:${F};margin-bottom:8px;">AMOUNT DUE</div>
<div style="color:#ffffff;font-size:18px;font-weight:500;line-height:1;letter-spacing:-0.3px;font-family:${F};">${formatUSD(feeAmount)}</div>
</td>
<td width="50%" valign="top" style="padding:20px 22px;">
<div style="color:#7a8aa8;font-size:9px;font-weight:500;letter-spacing:1.2px;font-family:${F};margin-bottom:8px;">FEE TYPE</div>
<table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:6px;"><tr>
<td width="18" height="2" bgcolor="#3b82f6" style="width:18px;height:2px;background:#3b82f6;font-size:0;line-height:2px;">&nbsp;</td>
</tr></table>
<div style="color:#3b82f6;font-size:11px;font-weight:500;font-family:${F};line-height:1.3;">${displayFeeLabel}</div>
</td>
</tr>
</table>
</td>
</tr>

<!-- FEE BREAKDOWN -->
<tr>
<td style="padding:0 18px 14px 18px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0d0d0d" style="background:#0d0d0d;border-radius:10px;">
<tr><td style="padding:16px 18px 6px 18px;">
<div style="color:#3b82f6;font-size:9px;font-weight:500;letter-spacing:1.5px;font-family:${F};">FEE BREAKDOWN</div>
</td></tr>
<tr><td style="padding:0;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
${breakdownRow(fee.covers[0], false)}
${breakdownRow(fee.covers[1], false)}
${breakdownRow(fee.covers[2], false)}
${breakdownRow(fee.covers[3], true)}
</table>
</td></tr>
</table>
</td>
</tr>

<!-- ACTION CARD -->
<tr>
<td style="padding:0 18px 14px 18px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0d0d0d" style="background:#0d0d0d;border-radius:10px;">
<tr><td style="padding:18px 20px 14px 20px;color:#d1d5db;font-size:12px;line-height:1.6;font-family:${F};font-weight:400;">
Please complete the fee payment to continue <a href="${FRONTEND_URL}/dashboard" style="color:#3b82f6;text-decoration:none;font-weight:500;">${fee.actionText}</a>.
</td></tr>
<tr><td style="padding:0 20px 20px 20px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td bgcolor="#3b82f6" align="center" style="background:#3b82f6;border-radius:8px;">
<a href="${FRONTEND_URL}/dashboard" style="display:block;padding:14px;color:#ffffff;font-size:10px;font-weight:600;letter-spacing:1.2px;text-decoration:none;font-family:${F};text-align:center;">${fee.btnLabel}</a>
</td></tr>
</table>
</td></tr>
</table>
</td>
</tr>

<!-- SECURITY INFO CARD -->
<tr>
<td style="padding:0 18px 24px 18px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0d0d0d" style="background:#0d0d0d;border-radius:10px;">
<tr><td style="padding:16px 20px;color:#7a8aa8;font-size:10px;line-height:1.7;font-family:${F};font-weight:400;">
All transactions are protected with bank-grade encryption.<br>
If you have any questions, our support team is available 24/7.<br>
This is an automated message. Please do not reply.
</td></tr>
</table>
</td>
</tr>

</table>
</td>
</tr>

<!-- FOOTER -->
<tr>
<td bgcolor="#000000" style="background:#000000;padding:24px 24px 28px 24px;text-align:center;">
<div style="font-family:${F};margin-bottom:8px;">
<span style="color:#ffffff;font-size:13px;font-weight:400;letter-spacing:0.3px;">Quantyrex</span>
<span style="color:#3b82f6;font-size:13px;font-weight:400;letter-spacing:0.3px;margin-left:5px;">Markets</span>
</div>
<div style="color:#5a6a85;font-size:10px;font-family:${F};margin-bottom:8px;">
<a href="mailto:support@quantyrexmarkets.com" style="color:#5a6a85;text-decoration:none;">support@quantyrexmarkets.com</a>
</div>
<div style="color:#3a4a65;font-size:9px;font-family:${F};">
&copy; ${new Date().getFullYear()} Quantyrex Markets. All rights reserved.
</div>
</td>
</tr>

`);
};

module.exports = feeRequiredEmail;
