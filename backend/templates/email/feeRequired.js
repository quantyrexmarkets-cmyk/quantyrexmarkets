const baseProTemplate = require('./base-pro');
const { formatUSD } = require('./_money');

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://quantyrexmarkets.vercel.app';

// Hosted icons from iconify.design (PNG - Gmail safe, renders everywhere)
const I = 'https://api.iconify.design/lucide';
const ICONS = {
  user: I + '/user.png?color=%232563eb&width=40',
  doc: I + '/file-text.png?color=%232563eb&width=40',
  dollar: I + '/dollar-sign.png?color=%232563eb&width=40',
  calendar: I + '/calendar.png?color=%232563eb&width=40',
  shield: I + '/shield-check.png?color=%232563eb&width=64',
  network: I + '/share-2.png?color=%232563eb&width=64',
  lock: I + '/lock.png?color=%232563eb&width=64',
  dollarBig: I + '/badge-dollar-sign.png?color=%232563eb&width=64',
  refresh: I + '/refresh-cw.png?color=%232563eb&width=64',
  doc2: I + '/file-check.png?color=%232563eb&width=64',
  info: I + '/info.png?color=%232563eb&width=44',
  lockSmall: I + '/lock.png?color=%232563eb&width=28',
  headset: I + '/headset.png?color=%232563eb&width=28',
};

// Hexagon logo as inline SVG data URI
const LOGO = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">' +
  '<defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">' +
  '<stop offset="0%" stop-color="#60a5fa"/>' +
  '<stop offset="100%" stop-color="#1e40af"/></linearGradient></defs>' +
  '<path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="url(#g)" stroke="#3b82f6" stroke-width="0.8"/>' +
  '<path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0a1730" opacity="0.7"/>' +
  '<path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#3b82f6"/></svg>'
);

const FEE_CONTENT = {
  processing: {
    badge: 'TRANSACTION NOTICE',
    title: 'Transaction Verification Required',
    subtitle: 'To complete your withdrawal request, a verification and network processing charge is required for transaction authorization and compliance checks.',
    txType: 'Withdrawal',
    feeTypeLabel: 'Processing Fee',
    covers: [
      { icon: ICONS.shield, label: 'Transaction<br>Validation &<br>Verification' },
      { icon: ICONS.network, label: 'Secure Network<br>Transfer<br>Authorization' },
      { icon: ICONS.lock, label: 'Anti-Fraud<br>Security<br>Screening' },
      { icon: ICONS.dollarBig, label: 'Network Costs<br>& Processing<br>Services' }
    ],
    urgency: 'Please complete the fee payment to continue <b>processing your transaction.</b>',
    btnLabel: 'COMPLETE VERIFICATION'
  },
  tax: {
    badge: 'TAX NOTICE',
    title: 'Withdrawal Tax Fee Required',
    subtitle: 'In accordance with current financial regulations, a withdrawal tax must be settled before your transaction can be released. This is a regulatory compliance requirement.',
    txType: 'Tax Settlement',
    feeTypeLabel: 'Withdrawal Tax Fee',
    covers: [
      { icon: ICONS.doc2, label: 'Regulatory<br>Compliance<br>Filing' },
      { icon: ICONS.shield, label: 'Government<br>Mandated<br>Reporting' },
      { icon: ICONS.lock, label: 'Audit Trail<br>Documentation' },
      { icon: ICONS.dollarBig, label: 'Withdrawal<br>Release<br>Authorization' }
    ],
    urgency: 'Please complete the tax payment to <b>release your withdrawal.</b>',
    btnLabel: 'SETTLE TAX FEE'
  },
  conversion: {
    badge: 'CONVERSION NOTICE',
    title: 'Currency Conversion Fee Required',
    subtitle: 'A currency conversion fee applies to your transaction. This covers real-time exchange rate processing and multi-currency settlement services.',
    txType: 'Currency Conversion',
    feeTypeLabel: 'Currency Conversion Fee',
    covers: [
      { icon: ICONS.refresh, label: 'Real-Time<br>Exchange Rate<br>Processing' },
      { icon: ICONS.network, label: 'Multi-Currency<br>Conversion<br>Engine' },
      { icon: ICONS.dollarBig, label: 'Settlement<br>Authorization' },
      { icon: ICONS.shield, label: 'Conversion<br>Verification' }
    ],
    urgency: 'Please complete the fee payment to <b>finalize your conversion.</b>',
    btnLabel: 'COMPLETE CONVERSION'
  },
  inactivity: {
    badge: 'REACTIVATION NOTICE',
    title: 'Account Reactivation Required',
    subtitle: 'Your account has been inactive for an extended period. An inactivity fee is required to reactivate your account and restore full trading privileges.',
    txType: 'Account Reactivation',
    feeTypeLabel: 'Account Inactivity Fee',
    covers: [
      { icon: ICONS.shield, label: 'Full Trading<br>Access<br>Restoration' },
      { icon: ICONS.dollarBig, label: 'Withdrawal<br>& Deposit<br>Re-enablement' },
      { icon: ICONS.network, label: 'Bots & Copy<br>Trading<br>Activation' },
      { icon: ICONS.lock, label: 'Account<br>Security<br>Refresh' }
    ],
    urgency: 'Welcome back. Please complete the fee payment to <b>reactivate your account.</b>',
    btnLabel: 'REACTIVATE ACCOUNT'
  },
  maintenance: {
    badge: 'MAINTENANCE NOTICE',
    title: 'Account Maintenance Fee Required',
    subtitle: 'A routine maintenance fee is required to keep your account operational. This covers infrastructure, security, and 24/7 platform monitoring.',
    txType: 'Account Maintenance',
    feeTypeLabel: 'Account Maintenance Fee',
    covers: [
      { icon: ICONS.network, label: 'Server<br>Infrastructure<br>& Uptime' },
      { icon: ICONS.lock, label: '24/7 Security<br>Monitoring' },
      { icon: ICONS.shield, label: 'Continuous<br>Platform<br>Updates' },
      { icon: ICONS.dollarBig, label: 'Account<br>Services<br>Continuity' }
    ],
    urgency: 'Please complete the fee payment to <b>maintain account services.</b>',
    btnLabel: 'SETTLE MAINTENANCE FEE'
  },
  custom: {
    badge: 'TRANSACTION NOTICE',
    title: 'Outstanding Fee Notice',
    subtitle: 'An outstanding fee has been applied to your account that requires immediate attention. Please review the details below and complete the payment.',
    txType: 'Fee Settlement',
    feeTypeLabel: 'Outstanding Fee',
    covers: [
      { icon: ICONS.shield, label: 'Transaction<br>Authorization' },
      { icon: ICONS.network, label: 'Account<br>Service<br>Continuity' },
      { icon: ICONS.dollarBig, label: 'Payment<br>Processing' },
      { icon: ICONS.lock, label: 'Settlement<br>Verification' }
    ],
    urgency: 'Please complete the fee payment to <b>continue using your account.</b>',
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
  const dateStr = now.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' · ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) + ' UTC';
  const displayFeeLabel = friendlyLabel(feeLabel, fee.feeTypeLabel);

  // ===== HEADER =====
  const header = `<tr><td style="background:#0a1428;background-image:linear-gradient(135deg,#0a1428 0%,#0f1e3f 100%);padding:24px 28px;border-bottom:3px solid #2563eb;">
<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="middle"><table cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="middle" style="padding-right:14px;"><img src="${LOGO}" alt="Q" width="44" height="44" style="display:block;width:44px;height:44px;"></td>
<td valign="middle">
<div style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:3.5px;line-height:1;font-family:Arial,sans-serif;">QUANTYREX</div>
<div style="color:#60a5fa;font-size:10px;font-weight:600;letter-spacing:6px;margin-top:4px;line-height:1;font-family:Arial,sans-serif;">MARKETS</div>
</td></tr></table></td>
<td valign="middle" align="right"><table cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="middle" style="padding-right:10px;"><img src="${ICONS.lockSmall}" alt="" width="20" height="20" style="display:block;width:20px;height:20px;opacity:0.9;"></td>
<td valign="middle" align="left">
<div style="color:#ffffff;font-size:11px;font-weight:600;line-height:1.3;font-family:Arial,sans-serif;">Secure. Trusted. Reliable.</div>
<div style="color:#94a3b8;font-size:9px;font-weight:400;line-height:1.3;margin-top:3px;font-family:Arial,sans-serif;">Institutional-Grade Security</div>
</td></tr></table></td>
</tr></table>
</td></tr>`;

  // ===== DETAIL ROW HELPER =====
  const detailItem = (icon, label, value) => `<td valign="top" width="50%" style="padding:14px 12px;vertical-align:top;">
<table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
<td valign="middle" width="42" style="padding-right:10px;">
<table cellpadding="0" cellspacing="0" border="0" width="38" height="38" bgcolor="#eff6ff" style="background:#eff6ff;border-radius:50%;">
<tr><td align="center" valign="middle" width="38" height="38" style="line-height:38px;text-align:center;">
<img src="${icon}" alt="" width="20" height="20" style="display:inline-block;width:20px;height:20px;vertical-align:middle;">
</td></tr></table>
</td>
<td valign="middle">
<div style="color:#64748b;font-size:9px;font-weight:700;letter-spacing:1.2px;font-family:Arial,sans-serif;">${label}</div>
<div style="color:#0f172a;font-size:12px;font-weight:700;line-height:1.3;margin-top:3px;font-family:Arial,sans-serif;">${value}</div>
</td></tr></table></td>`;

  const coverCell = c => `<td width="25%" valign="top" align="center" style="padding:8px 6px;vertical-align:top;">
<img src="${c.icon}" alt="" width="32" height="32" style="display:block;margin:0 auto 12px;width:32px;height:32px;">
<div style="color:#0f172a;font-size:10px;font-weight:600;line-height:1.45;font-family:Arial,sans-serif;">${c.label}</div>
</td>`;

  // ===== BODY =====
  const body = `<tr><td style="background:#ffffff;padding:28px 24px 24px;">
<div style="color:#2563eb;font-size:10px;font-weight:700;letter-spacing:2.5px;margin-bottom:14px;font-family:Arial,sans-serif;">${fee.badge}</div>
<div style="color:#0f172a;font-size:22px;font-weight:800;line-height:1.25;letter-spacing:-0.3px;margin-bottom:12px;font-family:Arial,sans-serif;">${fee.title}</div>
<div style="width:38px;height:3px;background:#2563eb;border-radius:2px;margin-bottom:18px;font-size:0;line-height:0;">&nbsp;</div>
<div style="color:#475569;font-size:12px;line-height:1.7;margin-bottom:22px;font-family:Arial,sans-serif;">${fee.subtitle}</div>

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;margin-bottom:14px;">
<tr>${detailItem(ICONS.user, 'CLIENT ID', clientId)}${detailItem(ICONS.doc, 'TRANSACTION TYPE', fee.txType)}</tr>
<tr><td colspan="2" style="border-top:1px solid #e5e7eb;height:1px;font-size:0;line-height:0;">&nbsp;</td></tr>
<tr>${detailItem(ICONS.dollar, 'NETWORK', 'USDT (TRC20)')}${detailItem(ICONS.calendar, 'DATE & TIME', dateStr)}</tr>
</table>

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a1428;background-image:linear-gradient(135deg,#0a1428 0%,#0f1e3f 100%);border-radius:10px;margin-bottom:14px;">
<tr>
<td width="55%" style="padding:20px 24px;border-right:1px solid #1e3a8a;">
<div style="color:#94a3b8;font-size:10px;font-weight:600;letter-spacing:1.5px;margin-bottom:8px;font-family:Arial,sans-serif;">AMOUNT DUE</div>
<div style="color:#ffffff;font-size:22px;font-weight:800;line-height:1;letter-spacing:-0.5px;font-family:Arial,sans-serif;">${formatUSD(feeAmount)}</div>
</td>
<td width="45%" style="padding:20px 24px;" valign="middle">
<div style="color:#94a3b8;font-size:10px;font-weight:600;letter-spacing:1.5px;margin-bottom:8px;font-family:Arial,sans-serif;">FEE TYPE</div>
<div style="color:#60a5fa;font-size:13px;font-weight:700;line-height:1.3;font-family:Arial,sans-serif;">${displayFeeLabel}</div>
</td></tr></table>

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;margin-bottom:16px;">
<tr><td style="padding:18px 12px;">
<div style="color:#2563eb;font-size:10px;font-weight:700;letter-spacing:2px;padding:0 6px 16px;font-family:Arial,sans-serif;">WHAT THIS FEE COVERS</div>
<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${fee.covers.map(coverCell).join('')}</tr></table>
</td></tr></table>

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eff6ff;border:1px solid #dbeafe;border-radius:10px;margin-bottom:6px;">
<tr><td style="padding:16px 16px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="middle" width="62%">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="middle" style="padding-right:10px;"><img src="${ICONS.info}" alt="" width="22" height="22" style="display:block;width:22px;height:22px;"></td>
<td valign="middle" style="color:#1e293b;font-size:12px;line-height:1.5;font-family:Arial,sans-serif;">${fee.urgency}</td>
</tr></table>
</td>
<td valign="middle" width="38%" align="right">
<a href="${FRONTEND_URL}/dashboard" style="display:inline-block;background:#2563eb;color:#ffffff;font-size:10px;font-weight:700;letter-spacing:1.2px;padding:13px 18px;border-radius:7px;text-decoration:none;text-transform:uppercase;font-family:Arial,sans-serif;white-space:nowrap;">${fee.btnLabel}  →</a>
</td></tr></table>
</td></tr></table>

</td></tr>`;

  // ===== FOOTER =====
  const footer = `<tr><td style="background:#ffffff;padding:20px 24px;border-top:1px solid #e5e7eb;">
<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="top" width="38%" style="vertical-align:top;padding-right:8px;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="middle" style="padding-right:10px;">
<table cellpadding="0" cellspacing="0" border="0" width="32" height="32" style="background:#eff6ff;border-radius:50%;">
<tr><td align="center" valign="middle" width="32" height="32" style="line-height:32px;text-align:center;">
<img src="${ICONS.lockSmall}" alt="" width="14" height="14" style="display:inline-block;width:14px;height:14px;vertical-align:middle;">
</td></tr></table>
</td>
<td valign="middle">
<div style="color:#0f172a;font-size:11px;font-weight:700;line-height:1.4;font-family:Arial,sans-serif;">Your security is our priority.</div>
<div style="color:#64748b;font-size:9px;line-height:1.5;margin-top:3px;font-family:Arial,sans-serif;">All transactions are protected with<br>bank-grade encryption.</div>
</td></tr></table>
</td>
<td valign="middle" width="24%" align="center"><img src="${LOGO}" alt="Q" width="36" height="36" style="display:inline-block;width:36px;height:36px;"></td>
<td valign="top" width="38%" align="right" style="vertical-align:top;padding-left:8px;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="middle" style="padding-right:10px;">
<table cellpadding="0" cellspacing="0" border="0" width="32" height="32" style="background:#eff6ff;border-radius:50%;">
<tr><td align="center" valign="middle" width="32" height="32" style="line-height:32px;text-align:center;">
<img src="${ICONS.headset}" alt="" width="14" height="14" style="display:inline-block;width:14px;height:14px;vertical-align:middle;">
</td></tr></table>
</td>
<td valign="middle" align="left">
<div style="color:#0f172a;font-size:11px;font-weight:700;line-height:1.4;font-family:Arial,sans-serif;">Need Assistance?</div>
<div style="color:#64748b;font-size:9px;line-height:1.5;margin-top:3px;font-family:Arial,sans-serif;">Our support team is available 24/7.<br><a href="mailto:support@quantyrexmarkets.com" style="color:#2563eb;text-decoration:none;font-weight:600;">support@quantyrexmarkets.com</a></div>
</td></tr></table>
</td></tr></table>

<div style="border-top:1px solid #e5e7eb;margin-top:18px;font-size:0;line-height:0;">&nbsp;</div>

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;">
<tr>
<td align="left" style="color:#94a3b8;font-size:9px;font-family:Arial,sans-serif;">&copy; ${new Date().getFullYear()} Quantyrex Markets. All Rights Reserved.</td>
<td align="right" style="color:#94a3b8;font-size:9px;font-family:Arial,sans-serif;">This is an automated message. Please do not reply.</td>
</tr></table>
</td></tr>`;

  return baseProTemplate(header, body, footer);
};

module.exports = feeRequiredEmail;
