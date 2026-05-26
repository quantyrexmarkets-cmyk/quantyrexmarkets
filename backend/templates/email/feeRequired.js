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

  // ===== HEADER (short white bar under logo) =====
  const header = `<tr>
<td style="padding:28px 24px 24px 24px;text-align:left;background:#080808;">
<span style="display:inline-block;color:#ffffff;font-size:25px;font-weight:300;letter-spacing:0.2px;font-family:'Montserrat',Arial,sans-serif;">Quantyrex</span>
<span style="display:inline-block;margin-left:8px;color:#818cf8;font-size:25px;font-weight:300;letter-spacing:0.2px;font-family:'Montserrat',Arial,sans-serif;">Markets</span>
<table cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;border-collapse:collapse;">
<tr><td height="3" width="140" bgcolor="#ffffff" style="height:3px;width:140px;background-color:#ffffff;font-size:0;line-height:0;mso-line-height-rule:exactly;border-radius:2px;">&nbsp;</td></tr>
</table>
</td></tr>`;

  // ===== DETAIL ROW HELPER (full-width row, label left, value right) =====
  const detailRow = (label, value, isLast) => `<tr>
<td style="padding:13px 18px;color:#64748b;font-size:10px;font-weight:700;letter-spacing:1px;font-family:Arial,sans-serif;${isLast ? '' : 'border-bottom:1px solid #e5e7eb;'}">${label}</td>
<td align="right" style="padding:13px 18px;color:#0f172a;font-size:13px;font-weight:700;font-family:Arial,sans-serif;white-space:nowrap;${isLast ? '' : 'border-bottom:1px solid #e5e7eb;'}">${value}</td>
</tr>`;

  // Numbered cover item (premium look without icons)
  const coverItem = (num, text, isLast) => `<tr>
<td valign="top" width="32" style="padding:12px 0 12px 14px;vertical-align:top;${isLast ? '' : 'border-bottom:1px solid #f1f5f9;'}">
<table cellpadding="0" cellspacing="0" border="0" width="24" height="24" bgcolor="#2563eb" style="background:#2563eb;border-radius:50%;">
<tr><td align="center" valign="middle" width="24" height="24" style="line-height:24px;text-align:center;color:#ffffff;font-size:11px;font-weight:700;font-family:Arial,sans-serif;">${num}</td></tr>
</table>
</td>
<td valign="middle" style="padding:12px 14px;color:#0f172a;font-size:12px;font-weight:500;line-height:1.5;font-family:Arial,sans-serif;${isLast ? '' : 'border-bottom:1px solid #f1f5f9;'}">${text}</td>
</tr>`;

  // ===== BODY =====
  const body = `<tr><td style="background:#080808;padding:28px 22px;">

<div style="color:#2563eb;font-size:10px;font-weight:700;letter-spacing:2.5px;margin-bottom:12px;font-family:Arial,sans-serif;">${fee.badge}</div>
<div style="color:#0f172a;font-size:22px;font-weight:800;line-height:1.25;letter-spacing:-0.3px;margin-bottom:10px;font-family:Arial,sans-serif;">${fee.title}</div>
<div style="width:36px;height:3px;background:#2563eb;border-radius:2px;margin-bottom:18px;font-size:0;line-height:0;">&nbsp;</div>
<div style="color:#475569;font-size:12px;line-height:1.7;margin-bottom:22px;font-family:Arial,sans-serif;">${fee.subtitle}</div>

<!-- DETAILS CARD - full-width rows -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;margin-bottom:14px;">
${detailRow('CLIENT ID', clientId, false)}
${detailRow('TRANSACTION TYPE', fee.txType, false)}
${detailRow('NETWORK', 'USDT (TRC20)', false)}
${detailRow('DATE &amp; TIME', dateStr, true)}
</table>

<!-- AMOUNT DUE - dark navy card, vertical stack -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a1428;background-image:linear-gradient(135deg,#0a1428 0%,#0f1e3f 100%);border-radius:10px;margin-bottom:14px;">
<tr><td style="padding:20px 22px;">
<div style="color:#94a3b8;font-size:10px;font-weight:600;letter-spacing:1.5px;margin-bottom:6px;font-family:Arial,sans-serif;">AMOUNT DUE</div>
<div style="color:#ffffff;font-size:28px;font-weight:800;line-height:1;letter-spacing:-0.5px;font-family:Arial,sans-serif;">${formatUSD(feeAmount)}</div>
</td></tr>
<tr><td style="border-top:1px solid #1e3a8a;height:1px;font-size:0;line-height:0;">&nbsp;</td></tr>
<tr><td style="padding:14px 22px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="middle" style="color:#94a3b8;font-size:10px;font-weight:600;letter-spacing:1.5px;font-family:Arial,sans-serif;">FEE TYPE</td>
<td valign="middle" align="right" style="color:#60a5fa;font-size:13px;font-weight:700;font-family:Arial,sans-serif;white-space:nowrap;">${displayFeeLabel}</td>
</tr></table>
</td></tr>
</table>

<!-- WHAT THIS FEE COVERS - vertical numbered list -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;margin-bottom:14px;">
<tr><td style="padding:18px 8px 16px 18px;">
<div style="color:#2563eb;font-size:10px;font-weight:700;letter-spacing:2px;font-family:Arial,sans-serif;">WHAT THIS FEE COVERS</div>
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

<!-- URGENCY NOTICE (full width, stacks above button) -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eff6ff;border:1px solid #dbeafe;border-radius:10px;margin-bottom:10px;">
<tr><td style="padding:14px 16px;color:#1e293b;font-size:12px;line-height:1.5;font-family:Arial,sans-serif;">
<b style="color:#2563eb;">Notice:</b> ${fee.urgency}
</td></tr>
</table>

<!-- CTA BUTTON - full width -->
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td align="center" style="padding:6px 0 0 0;">
<a href="${FRONTEND_URL}/dashboard" style="display:block;background:#2563eb;color:#ffffff;font-size:12px;font-weight:700;letter-spacing:1.5px;padding:16px 20px;border-radius:8px;text-decoration:none;text-transform:uppercase;font-family:Arial,sans-serif;text-align:center;">${fee.btnLabel}  →</a>
</td></tr></table>

</td></tr>`;

  // ===== FOOTER =====
  const footer = `<tr><td style="background:#f8fafc;padding:20px 22px;border-top:1px solid #e5e7eb;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td style="color:#0f172a;font-size:11px;font-weight:700;line-height:1.4;font-family:Arial,sans-serif;padding-bottom:4px;">Your security is our priority.</td></tr>
<tr><td style="color:#64748b;font-size:10px;line-height:1.5;font-family:Arial,sans-serif;padding-bottom:14px;">All transactions are protected with bank-grade encryption.</td></tr>
<tr><td style="color:#0f172a;font-size:11px;font-weight:700;line-height:1.4;font-family:Arial,sans-serif;padding-bottom:4px;">Need Assistance?</td></tr>
<tr><td style="color:#64748b;font-size:10px;line-height:1.5;font-family:Arial,sans-serif;padding-bottom:14px;">Our support team is available 24/7.<br><a href="mailto:support@quantyrexmarkets.com" style="color:#2563eb;text-decoration:none;font-weight:600;">support@quantyrexmarkets.com</a></td></tr>
<tr><td style="border-top:1px solid #e5e7eb;height:1px;font-size:0;line-height:0;padding-top:8px;">&nbsp;</td></tr>
<tr><td style="padding-top:12px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td align="left" style="color:#94a3b8;font-size:9px;font-family:Arial,sans-serif;">&copy; ${new Date().getFullYear()} Quantyrex Markets</td>
<td align="right" style="color:#94a3b8;font-size:9px;font-family:Arial,sans-serif;">Automated message · Do not reply</td>
</tr></table>
</td></tr>
</table>
</td></tr>`;

  return baseProTemplate(header, body, footer);
};

module.exports = feeRequiredEmail;
