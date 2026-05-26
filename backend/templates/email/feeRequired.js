const baseProTemplate = require('./base-pro');
const { formatUSD } = require('./_money');

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://quantyrexmarkets.vercel.app';

const FEE_CONTENT = {
  processing: {
    badge: 'TRANSACTION NOTICE',
    title: 'Transaction Verification Required',
    subtitle: 'To complete your withdrawal request, a verification and network processing charge is required for transaction authorization and compliance checks.',
    txType: 'Withdrawal',
    network: 'USDT (TRC20)',
    feeTypeLabel: 'Processing Fee',
    covers: [
      { icon: 'shield-check', label: 'Transaction Validation & Verification' },
      { icon: 'network', label: 'Secure Network Transfer Authorization' },
      { icon: 'lock', label: 'Anti-Fraud Security Screening' },
      { icon: 'dollar', label: 'Network Costs & Processing Services' }
    ],
    urgency: 'Please complete the fee payment to continue <b>processing your transaction.</b>',
    btnLabel: 'COMPLETE VERIFICATION'
  },
  tax: {
    badge: 'TAX NOTICE',
    title: 'Withdrawal Tax Fee Required',
    subtitle: 'In accordance with current financial regulations, a withdrawal tax must be settled before your transaction can be released. This is a regulatory compliance requirement.',
    txType: 'Tax Settlement',
    network: 'USDT (TRC20)',
    feeTypeLabel: 'Withdrawal Tax Fee',
    covers: [
      { icon: 'document', label: 'Regulatory Compliance Filing' },
      { icon: 'shield-check', label: 'Government-Mandated Reporting' },
      { icon: 'lock', label: 'Audit Trail Documentation' },
      { icon: 'dollar', label: 'Withdrawal Release Authorization' }
    ],
    urgency: 'Please complete the tax payment to <b>release your withdrawal.</b>',
    btnLabel: 'SETTLE TAX FEE'
  },
  conversion: {
    badge: 'CONVERSION NOTICE',
    title: 'Currency Conversion Fee Required',
    subtitle: 'A currency conversion fee applies to your transaction. This covers real-time exchange rate processing and multi-currency settlement services.',
    txType: 'Currency Conversion',
    network: 'USDT (TRC20)',
    feeTypeLabel: 'Currency Conversion Fee',
    covers: [
      { icon: 'exchange', label: 'Real-Time Exchange Rate Processing' },
      { icon: 'network', label: 'Multi-Currency Conversion Engine' },
      { icon: 'dollar', label: 'Settlement Authorization' },
      { icon: 'shield-check', label: 'Conversion Verification' }
    ],
    urgency: 'Please complete the fee payment to <b>finalize your currency conversion.</b>',
    btnLabel: 'COMPLETE CONVERSION'
  },
  inactivity: {
    badge: 'REACTIVATION NOTICE',
    title: 'Account Reactivation Required',
    subtitle: 'Your account has been inactive for an extended period. An inactivity fee is required to reactivate your account and restore full trading privileges.',
    txType: 'Account Reactivation',
    network: 'USDT (TRC20)',
    feeTypeLabel: 'Account Inactivity Fee',
    covers: [
      { icon: 'shield-check', label: 'Full Trading Access Restoration' },
      { icon: 'dollar', label: 'Withdrawal & Deposit Re-enablement' },
      { icon: 'network', label: 'Bots & Copy Trading Activation' },
      { icon: 'lock', label: 'Account Security Refresh' }
    ],
    urgency: 'Welcome back. Please complete the fee payment to <b>reactivate your account.</b>',
    btnLabel: 'REACTIVATE ACCOUNT'
  },
  maintenance: {
    badge: 'MAINTENANCE NOTICE',
    title: 'Account Maintenance Fee Required',
    subtitle: 'A routine maintenance fee is required to keep your account operational. This covers infrastructure, security, and 24/7 platform monitoring.',
    txType: 'Account Maintenance',
    network: 'USDT (TRC20)',
    feeTypeLabel: 'Account Maintenance Fee',
    covers: [
      { icon: 'network', label: 'Server Infrastructure & Uptime' },
      { icon: 'lock', label: '24/7 Security Monitoring' },
      { icon: 'shield-check', label: 'Continuous Platform Updates' },
      { icon: 'dollar', label: 'Account Services Continuity' }
    ],
    urgency: 'Please complete the fee payment to <b>maintain account services.</b>',
    btnLabel: 'SETTLE MAINTENANCE FEE'
  },
  custom: {
    badge: 'TRANSACTION NOTICE',
    title: 'Outstanding Fee Notice',
    subtitle: 'An outstanding fee has been applied to your account that requires immediate attention. Please review the details below and complete the payment.',
    txType: 'Fee Settlement',
    network: 'USDT (TRC20)',
    feeTypeLabel: 'Outstanding Fee',
    covers: [
      { icon: 'shield-check', label: 'Transaction Authorization' },
      { icon: 'network', label: 'Account Service Continuity' },
      { icon: 'dollar', label: 'Payment Processing' },
      { icon: 'lock', label: 'Settlement Verification' }
    ],
    urgency: 'Please complete the fee payment to <b>continue using your account.</b>',
    btnLabel: 'COMPLETE PAYMENT'
  }
};

// Blue icons for the light theme
const ICONS = {
  'shield-check': '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z"/><path d="M9 12l2 2 4-4"/></svg>',
  'network': '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2.5"/><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><line x1="7" y1="7" x2="10.5" y2="10.5"/><line x1="17" y1="7" x2="13.5" y2="10.5"/><line x1="7" y1="17" x2="10.5" y2="13.5"/><line x1="17" y1="17" x2="13.5" y2="13.5"/></svg>',
  'lock': '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
  'dollar': '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M15 9.5c0-1.4-1.3-2.5-3-2.5s-3 1.1-3 2.5 1.3 2.5 3 2.5 3 1.1 3 2.5-1.3 2.5-3 2.5-3-1.1-3-2.5"/></svg>',
  'document': '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>',
  'exchange': '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16V4M3 8l4-4 4 4M17 8v12M21 16l-4 4-4-4"/></svg>',
  'user-small': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  'doc-small': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/></svg>',
  'dollar-small': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M15 9.5c-.5-1.5-1.7-2.5-3-2.5-1.7 0-3 1-3 2.5s1.3 2.5 3 2.5 3 1 3 2.5-1.3 2.5-3 2.5c-1.3 0-2.5-1-3-2.5"/></svg>',
  'calendar-small': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'
};

// Build a row in the details card: icon circle + label + value
const detailRow = (iconKey, label, value) => `
  <td valign="middle" width="50%" style="padding:18px 16px;">
    <table cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td valign="middle" style="padding-right:14px;">
          <table cellpadding="0" cellspacing="0" border="0" width="44" height="44" bgcolor="#dbeafe" style="background-color:#dbeafe;border-radius:50%;">
            <tr><td align="center" valign="middle" width="44" height="44" style="vertical-align:middle;text-align:center;line-height:0;">${ICONS[iconKey]}</td></tr>
          </table>
        </td>
        <td valign="middle">
          <p style="margin:0;color:#64748b;font-size:10px;font-weight:600;letter-spacing:1.5px;">${label}</p>
          <p style="margin:4px 0 0;color:#0f172a;font-size:14px;font-weight:600;">${value}</p>
        </td>
      </tr>
    </table>
  </td>
`;

const feeRequiredEmail = (name, feeLabel, feeAmount, currency, feeType, userId) => {
  const fee = FEE_CONTENT[feeType] || FEE_CONTENT.custom;
  const clientId = userId ? `#QXM-${String(userId).slice(-5).toUpperCase()}` : `#QXM-${Math.floor(Math.random() * 90000 + 10000)}`;
  const now = new Date();
  const dateStr = now.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) + ' • ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) + ' UTC';
  // If feeLabel is just the raw type key (processing, tax, etc.), use the friendly name
  const rawTypes = Object.keys(FEE_CONTENT);
  const isRawType = feeLabel && rawTypes.includes(feeLabel.toLowerCase());
  const displayFeeLabel = (feeLabel && !isRawType) ? feeLabel : fee.feeTypeLabel;

  // 4 covers grid items
  const coversGrid = `
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        ${fee.covers.map(c => `
          <td width="25%" valign="top" align="center" style="padding:0 8px;vertical-align:top;">
            <div style="margin-bottom:14px;text-align:center;">${ICONS[c.icon] || ICONS['shield-check']}</div>
            <p style="margin:0;color:#334155;font-size:11px;line-height:1.5;font-weight:500;">${c.label}</p>
          </td>
        `).join('')}
      </tr>
    </table>
  `;

  return baseProTemplate(`
    <!-- Badge -->
    <p style="margin:0 0 14px;color:#2563eb;font-size:11px;font-weight:700;letter-spacing:2.5px;">${fee.badge}</p>

    <!-- Title -->
    <h1 style="margin:0 0 14px;color:#0f172a;font-size:28px;font-weight:700;line-height:1.2;letter-spacing:-0.5px;">${fee.title}</h1>

    <!-- Small blue underline -->
    <div style="width:42px;height:3px;background:#2563eb;border-radius:2px;margin:0 0 20px;"></div>

    <!-- Subtitle -->
    <p style="margin:0 0 30px;color:#64748b;font-size:14px;line-height:1.7;max-width:480px;">${fee.subtitle}</p>

    <!-- Details Card -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
      <tr>
        ${detailRow('user-small', 'CLIENT ID', clientId)}
        ${detailRow('doc-small', 'TRANSACTION TYPE', fee.txType)}
      </tr>
      <tr><td colspan="2" style="border-top:1px solid #e2e8f0;height:1px;font-size:0;line-height:0;"></td></tr>
      <tr>
        ${detailRow('dollar-small', 'NETWORK', fee.network)}
        ${detailRow('calendar-small', 'DATE & TIME', dateStr)}
      </tr>
    </table>

    <!-- Amount Due Block (dark navy) -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px;background:#0f1e3f;border-radius:10px;">
      <tr>
        <td width="55%" style="padding:24px 28px;border-right:1px solid #1e3a8a;">
          <p style="margin:0 0 10px;color:#94a3b8;font-size:11px;font-weight:600;letter-spacing:1.8px;">AMOUNT DUE</p>
          <p style="margin:0;color:#ffffff;font-size:32px;font-weight:700;line-height:1;letter-spacing:-1px;">${formatUSD(feeAmount)}</p>
        </td>
        <td width="45%" style="padding:24px 28px;">
          <p style="margin:0 0 10px;color:#94a3b8;font-size:11px;font-weight:600;letter-spacing:1.8px;">FEE TYPE</p>
          <p style="margin:0;color:#60a5fa;font-size:17px;font-weight:600;line-height:1.2;">${displayFeeLabel}</p>
        </td>
      </tr>
    </table>

    <!-- What This Fee Covers -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
      <tr>
        <td style="padding:22px 18px;">
          <p style="margin:0 0 20px;color:#2563eb;font-size:11px;font-weight:700;letter-spacing:2.5px;">WHAT THIS FEE COVERS</p>
          ${coversGrid}
        </td>
      </tr>
    </table>

    <!-- Urgency Notice with CTA Button -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 8px;background:#eff6ff;border:1px solid #dbeafe;border-radius:10px;">
      <tr>
        <td style="padding:18px 18px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td valign="middle" width="60%">
                <table cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td valign="middle" style="padding-right:12px;">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    </td>
                    <td valign="middle" style="color:#1e293b;font-size:13px;line-height:1.5;">${fee.urgency}</td>
                  </tr>
                </table>
              </td>
              <td valign="middle" width="40%" align="right">
                <a href="${FRONTEND_URL}/dashboard" style="display:inline-block;background:#2563eb;color:#ffffff;font-size:12px;font-weight:700;letter-spacing:1.2px;padding:14px 22px;border-radius:7px;text-decoration:none;text-transform:uppercase;white-space:nowrap;">${fee.btnLabel} &nbsp;→</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `);
};

module.exports = feeRequiredEmail;
