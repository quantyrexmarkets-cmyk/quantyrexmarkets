const baseTemplate = require('./base-enhanced');
const { formatUSD } = require('./_money');

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://quantyrexmarkets.vercel.app';

const FEE_CONTENT = {
  processing: {
    badge: 'TRANSACTION NOTICE',
    icon: 'https://img.icons8.com/sf-regular/40/6366f1/shield.png',
    title: 'Transaction Verification',
    titleAccent: 'Required',
    subtitle: 'Action Required For Withdrawal',
    intro: 'To complete your withdrawal request, a verification and network processing charge is required for transaction authorization and compliance checks.',
    txType: 'Withdrawal',
    feeTypeLabel: 'Processing Fee',
    covers: [
      'Transaction Validation & Verification',
      'Secure Network Transfer Authorization',
      'Anti-Fraud Security Screening',
      'Network Costs & Processing Services'
    ],
    urgency: 'Please complete the fee payment to continue processing your transaction.',
    btnLabel: 'COMPLETE VERIFICATION'
  },
  tax: {
    badge: 'TAX NOTICE',
    icon: 'https://img.icons8.com/sf-regular/40/6366f1/tax.png',
    title: 'Withdrawal Tax Fee',
    titleAccent: 'Required',
    subtitle: 'Regulatory Compliance Required',
    intro: 'In accordance with current financial regulations, a withdrawal tax must be settled before your transaction can be released. This is a regulatory compliance requirement.',
    txType: 'Tax Settlement',
    feeTypeLabel: 'Withdrawal Tax Fee',
    covers: [
      'Regulatory Compliance Filing',
      'Government-Mandated Reporting',
      'Audit Trail Documentation',
      'Withdrawal Release Authorization'
    ],
    urgency: 'Please complete the tax payment to release your withdrawal.',
    btnLabel: 'SETTLE TAX FEE'
  },
  conversion: {
    badge: 'CONVERSION NOTICE',
    icon: 'https://img.icons8.com/sf-regular/40/6366f1/exchange.png',
    title: 'Currency Conversion Fee',
    titleAccent: 'Required',
    subtitle: 'Cross-Currency Processing',
    intro: 'A currency conversion fee applies to your transaction. This covers real-time exchange rate processing and multi-currency settlement services.',
    txType: 'Currency Conversion',
    feeTypeLabel: 'Currency Conversion Fee',
    covers: [
      'Real-Time Exchange Rate Processing',
      'Multi-Currency Conversion Engine',
      'Settlement Authorization',
      'Conversion Verification'
    ],
    urgency: 'Please complete the fee payment to finalize your conversion.',
    btnLabel: 'COMPLETE CONVERSION'
  },
  inactivity: {
    badge: 'REACTIVATION NOTICE',
    icon: 'https://img.icons8.com/sf-regular/40/6366f1/refresh.png',
    title: 'Account Reactivation',
    titleAccent: 'Required',
    subtitle: 'Restore Your Trading Access',
    intro: 'Your account has been inactive for an extended period. An inactivity fee is required to reactivate your account and restore full trading privileges.',
    txType: 'Account Reactivation',
    feeTypeLabel: 'Account Inactivity Fee',
    covers: [
      'Full Trading Access Restoration',
      'Withdrawal & Deposit Re-enablement',
      'Bots & Copy Trading Activation',
      'Account Security Refresh'
    ],
    urgency: 'Welcome back. Please complete the fee payment to reactivate your account.',
    btnLabel: 'REACTIVATE ACCOUNT'
  },
  maintenance: {
    badge: 'MAINTENANCE NOTICE',
    icon: 'https://img.icons8.com/sf-regular/40/6366f1/maintenance.png',
    title: 'Account Maintenance',
    titleAccent: 'Required',
    subtitle: 'Routine Account Servicing',
    intro: 'A routine maintenance fee is required to keep your account operational. This covers infrastructure, security, and 24/7 platform monitoring.',
    txType: 'Account Maintenance',
    feeTypeLabel: 'Account Maintenance Fee',
    covers: [
      'Server Infrastructure & Uptime',
      '24/7 Security Monitoring',
      'Continuous Platform Updates',
      'Account Services Continuity'
    ],
    urgency: 'Please complete the fee payment to maintain account services.',
    btnLabel: 'SETTLE MAINTENANCE FEE'
  },
  custom: {
    badge: 'TRANSACTION NOTICE',
    icon: 'https://img.icons8.com/sf-regular/40/6366f1/info.png',
    title: 'Outstanding Fee',
    titleAccent: 'Notice',
    subtitle: 'Action Required On Account',
    intro: 'An outstanding fee has been applied to your account that requires immediate attention. Please review the details below and complete the payment.',
    txType: 'Fee Settlement',
    feeTypeLabel: 'Outstanding Fee',
    covers: [
      'Transaction Authorization',
      'Account Service Continuity',
      'Payment Processing',
      'Settlement Verification'
    ],
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

  return baseTemplate(`
    <!-- HERO -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:12px 0 32px;">
      <tr>
        <td align="center" style="padding:0 0 20px 0;">
          <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border-spacing:0;">
            <tr>
              <td width="80" height="80" align="center" valign="middle" style="width:80px;height:80px;background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.12);border-radius:50%;">
                <img src="${fee.icon}" width="34" height="34" alt="" style="display:block;margin:auto;" />
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:0 0 8px 0;">
          <h1 style="color:#ffffff;font-size:24px;font-weight:300;margin:0;letter-spacing:0.3px;font-family:'Montserrat',Arial,sans-serif;">${fee.title} <span style="color:#818cf8;font-weight:500;font-family:'Montserrat',Arial,sans-serif;">${fee.titleAccent}</span></h1>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:0;">
          <p style="color:#a0a0a0;font-size:11px;letter-spacing:2.5px;margin:0;font-family:'Montserrat',Arial,sans-serif;text-transform:uppercase;font-weight:300;">${fee.subtitle}</p>
        </td>
      </tr>
    </table>

    <!-- GLOWING DIVIDER -->
    <table width="60%" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 32px auto;border-collapse:collapse;">
      <tr>
        <td style="height:1px;background:linear-gradient(90deg,transparent,rgba(99,102,241,0.5),rgba(129,140,248,0.6),rgba(99,102,241,0.5),transparent);font-size:0;line-height:0;">&nbsp;</td>
      </tr>
    </table>

    <!-- GREETING -->
    <p style="color:#e4e4e7;font-size:14px;margin:0 0 18px;line-height:1.6;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear <span style="color:#818cf8;font-family:'Montserrat',Arial,sans-serif;font-weight:400;">${name || 'Valued Client'}</span>,</p>

    <p style="color:#a1a1aa;font-size:13px;margin:0 0 28px;line-height:1.75;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">
      ${fee.intro}
    </p>

    <!-- TRANSACTION DETAILS -->
    <p style="color:#818cf8;font-size:9px;letter-spacing:2.5px;margin:0 0 14px;font-family:'Montserrat',Arial,sans-serif;font-weight:500;">${fee.badge}</p>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background:#121212;border:1px solid #1e1e1e;border-radius:8px;">
      <tr>
        <td style="padding:14px 18px;border-bottom:1px solid #1a1a1a;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td style="color:#a0a0a0;font-size:10px;font-family:'Montserrat',Arial,sans-serif;font-weight:400;letter-spacing:0.5px;">CLIENT ID</td>
            <td align="right" style="color:#e4e4e7;font-size:12px;font-family:'Montserrat',Arial,sans-serif;font-weight:500;">${clientId}</td>
          </tr></table>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 18px;border-bottom:1px solid #1a1a1a;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td style="color:#a0a0a0;font-size:10px;font-family:'Montserrat',Arial,sans-serif;font-weight:400;letter-spacing:0.5px;">TRANSACTION TYPE</td>
            <td align="right" style="color:#e4e4e7;font-size:12px;font-family:'Montserrat',Arial,sans-serif;font-weight:500;">${fee.txType}</td>
          </tr></table>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 18px;border-bottom:1px solid #1a1a1a;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td style="color:#a0a0a0;font-size:10px;font-family:'Montserrat',Arial,sans-serif;font-weight:400;letter-spacing:0.5px;">NETWORK</td>
            <td align="right" style="color:#e4e4e7;font-size:12px;font-family:'Montserrat',Arial,sans-serif;font-weight:500;white-space:nowrap;">USDT (TRC20)</td>
          </tr></table>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 18px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td style="color:#a0a0a0;font-size:10px;font-family:'Montserrat',Arial,sans-serif;font-weight:400;letter-spacing:0.5px;">DATE &amp; TIME</td>
            <td align="right" style="color:#e4e4e7;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:500;white-space:nowrap;">${dateStr}</td>
          </tr></table>
        </td>
      </tr>
    </table>

    <!-- AMOUNT CARD -->
    <p style="color:#818cf8;font-size:9px;letter-spacing:2.5px;margin:0 0 14px;font-family:'Montserrat',Arial,sans-serif;font-weight:500;">PAYMENT SUMMARY</p>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background:#121212;border:1px solid #1e1e1e;border-radius:8px;">
      <tr>
        <td align="center" style="padding:24px 20px 14px 20px;">
          <p style="color:#a0a0a0;font-size:10px;letter-spacing:2px;margin:0 0 10px;font-family:'Montserrat',Arial,sans-serif;font-weight:400;">AMOUNT DUE</p>
          <p style="color:#ffffff;font-size:32px;font-weight:300;margin:0;letter-spacing:-0.5px;font-family:'Montserrat',Arial,sans-serif;line-height:1;">${formatUSD(feeAmount)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:0 20px;">
          <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(99,102,241,0.3),transparent);font-size:0;line-height:0;">&nbsp;</div>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:14px 20px 22px 20px;">
          <p style="color:#a0a0a0;font-size:10px;letter-spacing:1.5px;margin:0 0 6px;font-family:'Montserrat',Arial,sans-serif;font-weight:400;">FEE TYPE</p>
          <p style="color:#818cf8;font-size:13px;font-weight:500;margin:0;font-family:'Montserrat',Arial,sans-serif;white-space:nowrap;">${displayFeeLabel}</p>
        </td>
      </tr>
    </table>

    <!-- WHAT THIS FEE COVERS -->
    <p style="color:#818cf8;font-size:9px;letter-spacing:2.5px;margin:0 0 18px;font-family:'Montserrat',Arial,sans-serif;font-weight:500;">WHAT THIS FEE COVERS</p>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 36px;">
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td width="32" valign="top" style="padding-right:12px;"><span style="color:#818cf8;font-size:12px;font-weight:600;font-family:'Montserrat',Arial,sans-serif;">01</span></td>
            <td valign="top">
              <p style="color:#e4e4e7;font-size:12px;font-weight:500;margin:0;font-family:'Montserrat',Arial,sans-serif;line-height:1.5;">${fee.covers[0]}</p>
            </td>
          </tr></table>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td width="32" valign="top" style="padding-right:12px;"><span style="color:#818cf8;font-size:12px;font-weight:600;font-family:'Montserrat',Arial,sans-serif;">02</span></td>
            <td valign="top">
              <p style="color:#e4e4e7;font-size:12px;font-weight:500;margin:0;font-family:'Montserrat',Arial,sans-serif;line-height:1.5;">${fee.covers[1]}</p>
            </td>
          </tr></table>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td width="32" valign="top" style="padding-right:12px;"><span style="color:#818cf8;font-size:12px;font-weight:600;font-family:'Montserrat',Arial,sans-serif;">03</span></td>
            <td valign="top">
              <p style="color:#e4e4e7;font-size:12px;font-weight:500;margin:0;font-family:'Montserrat',Arial,sans-serif;line-height:1.5;">${fee.covers[2]}</p>
            </td>
          </tr></table>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td width="32" valign="top" style="padding-right:12px;"><span style="color:#818cf8;font-size:12px;font-weight:600;font-family:'Montserrat',Arial,sans-serif;">04</span></td>
            <td valign="top">
              <p style="color:#e4e4e7;font-size:12px;font-weight:500;margin:0;font-family:'Montserrat',Arial,sans-serif;line-height:1.5;">${fee.covers[3]}</p>
            </td>
          </tr></table>
        </td>
      </tr>
    </table>

    <!-- URGENCY -->
    <p style="color:#ff4000;font-size:12px;margin:0 0 28px;line-height:1.6;font-family:'Montserrat',Arial,sans-serif;font-weight:400;text-align:center;">
      <span style="color:#ff4000;font-weight:600;">Notice:</span> ${fee.urgency}
    </p>

    <!-- CTA -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;">
      <tr>
        <td align="center">
          <a href="${FRONTEND_URL}/dashboard" style="display:block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:500;padding:16px 0;text-decoration:none;letter-spacing:2px;text-align:center;width:80%;margin:0 auto;font-family:'Montserrat',Arial,sans-serif;border-radius:6px;">${fee.btnLabel}</a>
        </td>
      </tr>
    </table>

    <p style="color:#71717a;font-size:10px;margin:0;text-align:center;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">The Quantyrex Markets Team</p>
  `);
};

module.exports = feeRequiredEmail;
