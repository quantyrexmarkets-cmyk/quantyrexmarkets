const baseProTemplate = require('./base-pro');
const { formatUSD } = require('./_money');

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://quantyrexmarkets.vercel.app';

// Inline SVG icons (Gmail-safe, no external requests)
// Small detail icons (20px) for client/transaction/network/date
const ICON_SMALL = {
  user: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  doc: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>',
  dollar: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M15 9.5c-.5-1.5-1.7-2.5-3-2.5-1.7 0-3 1-3 2.5s1.3 2.5 3 2.5 3 1 3 2.5-1.3 2.5-3 2.5c-1.3 0-2.5-1-3-2.5"/></svg>',
  calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'
};

// Big cover icons (32px) for "WHAT THIS FEE COVERS"
const ICON_BIG = {
  shield: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
  network: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
  lock: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  dollarBig: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M15 9.5c-.5-1.5-1.7-2.5-3-2.5-1.7 0-3 1-3 2.5s1.3 2.5 3 2.5 3 1 3 2.5-1.3 2.5-3 2.5c-1.3 0-2.5-1-3-2.5"/></svg>',
  refresh: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
  doc2: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>'
};

// Info icon for notice
const ICON_INFO = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';

// Footer icons (14px)
const ICON_LOCK_SM = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
const ICON_HEADSET = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1v-6a9 9 0 0 1 18 0v6a1 1 0 0 1-1 1h-2a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>';

// Header logo lock
const ICON_LOCK_HEADER = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';

// Hexagon logo (inline SVG, no external dep)
const LOGO_HEX = '<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 40 40"><defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#60a5fa"/><stop offset="100%" stop-color="#1e40af"/></linearGradient></defs><path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="url(#lg)" stroke="#3b82f6" stroke-width="0.8"/><path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0a1730" opacity="0.7"/><path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#3b82f6"/></svg>';

const LOGO_HEX_SMALL = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 40 40"><defs><linearGradient id="lgs" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#60a5fa"/><stop offset="100%" stop-color="#1e40af"/></linearGradient></defs><path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="url(#lgs)" stroke="#3b82f6" stroke-width="0.8"/><path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0a1730" opacity="0.7"/><path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#3b82f6"/></svg>';

const FEE_CONTENT = {
  processing: {
    badge: 'TRANSACTION NOTICE',
    title: 'Transaction Verification Required',
    subtitle: 'To complete your withdrawal request, a verification and network processing charge is required for transaction authorization and compliance checks.',
    txType: 'Withdrawal',
    feeTypeLabel: 'Processing Fee',
    covers: [
      { icon: ICON_BIG.shield, label: 'Transaction<br>Validation &<br>Verification' },
      { icon: ICON_BIG.network, label: 'Secure Network<br>Transfer<br>Authorization' },
      { icon: ICON_BIG.lock, label: 'Anti-Fraud<br>Security<br>Screening' },
      { icon: ICON_BIG.dollarBig, label: 'Network Costs<br>& Processing<br>Services' }
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
      { icon: ICON_BIG.doc2, label: 'Regulatory<br>Compliance<br>Filing' },
      { icon: ICON_BIG.shield, label: 'Government<br>Mandated<br>Reporting' },
      { icon: ICON_BIG.lock, label: 'Audit Trail<br>Documentation' },
      { icon: ICON_BIG.dollarBig, label: 'Withdrawal<br>Release<br>Authorization' }
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
      { icon: ICON_BIG.refresh, label: 'Real-Time<br>Exchange Rate<br>Processing' },
      { icon: ICON_BIG.network, label: 'Multi-Currency<br>Conversion<br>Engine' },
      { icon: ICON_BIG.dollarBig, label: 'Settlement<br>Authorization' },
      { icon: ICON_BIG.shield, label: 'Conversion<br>Verification' }
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
      { icon: ICON_BIG.shield, label: 'Full Trading<br>Access<br>Restoration' },
      { icon: ICON_BIG.dollarBig, label: 'Withdrawal<br>& Deposit<br>Re-enablement' },
      { icon: ICON_BIG.network, label: 'Bots & Copy<br>Trading<br>Activation' },
      { icon: ICON_BIG.lock, label: 'Account<br>Security<br>Refresh' }
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
      { icon: ICON_BIG.network, label: 'Server<br>Infrastructure<br>& Uptime' },
      { icon: ICON_BIG.lock, label: '24/7 Security<br>Monitoring' },
      { icon: ICON_BIG.shield, label: 'Continuous<br>Platform<br>Updates' },
      { icon: ICON_BIG.dollarBig, label: 'Account<br>Services<br>Continuity' }
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
      { icon: ICON_BIG.shield, label: 'Transaction<br>Authorization' },
      { icon: ICON_BIG.network, label: 'Account<br>Service<br>Continuity' },
      { icon: ICON_BIG.dollarBig, label: 'Payment<br>Processing' },
      { icon: ICON_BIG.lock, label: 'Settlement<br>Verification' }
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
<td valign="middle" style="padding-right:14px;line-height:0;">${LOGO_HEX}</td>
<td valign="middle">
<div style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:3.5px;line-height:1;font-family:Arial,sans-serif;">QUANTYREX</div>
<div style="color:#60a5fa;font-size:10px;font-weight:600;letter-spacing:6px;margin-top:4px;line-height:1;font-family:Arial,sans-serif;">MARKETS</div>
</td></tr></table></td>
<td valign="middle" align="right"><table cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="middle" style="padding-right:10px;line-height:0;">${ICON_LOCK_HEADER}</td>
<td valign="middle" align="left">
<div style="color:#ffffff;font-size:11px;font-weight:600;line-height:1.3;font-family:Arial,sans-serif;">Secure. Trusted. Reliable.</div>
<div style="color:#94a3b8;font-size:9px;font-weight:400;line-height:1.3;margin-top:3px;font-family:Arial,sans-serif;">Institutional-Grade Security</div>
</td></tr></table></td>
</tr></table>
</td></tr>`;

  // ===== DETAIL ROW HELPER =====
  const detailItem = (iconSvg, label, value) => `<td valign="top" width="50%" style="padding:14px 12px;vertical-align:top;">
<table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
<td valign="middle" width="42" style="padding-right:10px;">
<table cellpadding="0" cellspacing="0" border="0" width="38" height="38" bgcolor="#eff6ff" style="background:#eff6ff;border-radius:50%;">
<tr><td align="center" valign="middle" width="38" height="38" style="line-height:0;text-align:center;vertical-align:middle;">${iconSvg}</td></tr></table>
</td>
<td valign="middle">
<div style="color:#64748b;font-size:9px;font-weight:700;letter-spacing:1.2px;font-family:Arial,sans-serif;">${label}</div>
<div style="color:#0f172a;font-size:12px;font-weight:700;line-height:1.3;margin-top:3px;font-family:Arial,sans-serif;">${value}</div>
</td></tr></table></td>`;

  const coverCell = c => `<td width="25%" valign="top" align="center" style="padding:8px 6px;vertical-align:top;text-align:center;">
<div style="line-height:0;margin-bottom:12px;">${c.icon}</div>
<div style="color:#0f172a;font-size:10px;font-weight:600;line-height:1.45;font-family:Arial,sans-serif;">${c.label}</div>
</td>`;

  // ===== BODY =====
  const body = `<tr><td style="background:#ffffff;padding:28px 24px 24px;">
<div style="color:#2563eb;font-size:10px;font-weight:700;letter-spacing:2.5px;margin-bottom:14px;font-family:Arial,sans-serif;">${fee.badge}</div>
<div style="color:#0f172a;font-size:22px;font-weight:800;line-height:1.25;letter-spacing:-0.3px;margin-bottom:12px;font-family:Arial,sans-serif;">${fee.title}</div>
<div style="width:38px;height:3px;background:#2563eb;border-radius:2px;margin-bottom:18px;font-size:0;line-height:0;">&nbsp;</div>
<div style="color:#475569;font-size:12px;line-height:1.7;margin-bottom:22px;font-family:Arial,sans-serif;">${fee.subtitle}</div>

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;margin-bottom:14px;">
<tr>${detailItem(ICON_SMALL.user, 'CLIENT ID', clientId)}${detailItem(ICON_SMALL.doc, 'TRANSACTION TYPE', fee.txType)}</tr>
<tr><td colspan="2" style="border-top:1px solid #e5e7eb;height:1px;font-size:0;line-height:0;">&nbsp;</td></tr>
<tr>${detailItem(ICON_SMALL.dollar, 'NETWORK', 'USDT (TRC20)')}${detailItem(ICON_SMALL.calendar, 'DATE & TIME', dateStr)}</tr>
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
<td valign="middle" style="padding-right:10px;line-height:0;">${ICON_INFO}</td>
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
<table cellpadding="0" cellspacing="0" border="0" width="32" height="32" bgcolor="#eff6ff" style="background:#eff6ff;border-radius:50%;">
<tr><td align="center" valign="middle" width="32" height="32" style="line-height:0;text-align:center;vertical-align:middle;">${ICON_LOCK_SM}</td></tr></table>
</td>
<td valign="middle">
<div style="color:#0f172a;font-size:11px;font-weight:700;line-height:1.4;font-family:Arial,sans-serif;">Your security is our priority.</div>
<div style="color:#64748b;font-size:9px;line-height:1.5;margin-top:3px;font-family:Arial,sans-serif;">All transactions are protected with<br>bank-grade encryption.</div>
</td></tr></table>
</td>
<td valign="middle" width="24%" align="center" style="line-height:0;">${LOGO_HEX_SMALL}</td>
<td valign="top" width="38%" align="right" style="vertical-align:top;padding-left:8px;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="middle" style="padding-right:10px;">
<table cellpadding="0" cellspacing="0" border="0" width="32" height="32" bgcolor="#eff6ff" style="background:#eff6ff;border-radius:50%;">
<tr><td align="center" valign="middle" width="32" height="32" style="line-height:0;text-align:center;vertical-align:middle;">${ICON_HEADSET}</td></tr></table>
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
