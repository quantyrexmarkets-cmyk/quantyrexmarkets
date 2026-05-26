const baseProTemplate = require('./base-pro');
const { formatUSD } = require('./_money');

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://quantyrexmarkets.vercel.app';

const FEE_CONTENT = {
  processing: {
    badge: 'TRANSACTION NOTICE',
    title: 'Processing Fee Required',
    subtitle: 'To complete your withdrawal request, a verification and network processing charge is required for transaction authorization and compliance checks.',
    txType: 'Withdrawal',
    network: 'USDT (TRC20)',
    covers: [
      { icon: 'shield-check', label: 'Transaction Validation & Verification' },
      { icon: 'network', label: 'Secure Network Transfer Authorization' },
      { icon: 'lock', label: 'Anti-Fraud Security Screening' },
      { icon: 'dollar', label: 'Network Costs & Processing Services' }
    ],
    urgency: 'Please complete the fee payment to continue processing your transaction.',
    btnLabel: 'COMPLETE PAYMENT'
  },
  tax: {
    badge: 'TAX NOTICE',
    title: 'Withdrawal Tax Fee Required',
    subtitle: 'In accordance with current financial regulations, a withdrawal tax must be settled before your transaction can be released. This is a regulatory compliance requirement.',
    txType: 'Tax Settlement',
    network: 'USDT (TRC20)',
    covers: [
      { icon: 'document', label: 'Regulatory Compliance Filing' },
      { icon: 'shield-check', label: 'Government-Mandated Reporting' },
      { icon: 'lock', label: 'Audit Trail Documentation' },
      { icon: 'dollar', label: 'Withdrawal Release Authorization' }
    ],
    urgency: 'This tax must be settled to release your withdrawal. Failure to comply may result in extended delays.',
    btnLabel: 'SETTLE TAX FEE'
  },
  conversion: {
    badge: 'CONVERSION NOTICE',
    title: 'Currency Conversion Fee Required',
    subtitle: 'A currency conversion fee applies to your transaction. This covers real-time exchange rate processing and multi-currency settlement services.',
    txType: 'Currency Conversion',
    network: 'USDT (TRC20)',
    covers: [
      { icon: 'exchange', label: 'Real-Time Exchange Rate Processing' },
      { icon: 'network', label: 'Multi-Currency Conversion Engine' },
      { icon: 'dollar', label: 'Settlement Authorization' },
      { icon: 'shield-check', label: 'Conversion Verification' }
    ],
    urgency: 'Please complete the fee payment to finalize your currency conversion.',
    btnLabel: 'COMPLETE CONVERSION'
  },
  inactivity: {
    badge: 'REACTIVATION NOTICE',
    title: 'Account Inactivity Fee Required',
    subtitle: 'Your account has been inactive for an extended period. An inactivity fee is required to reactivate your account and restore full trading privileges.',
    txType: 'Account Reactivation',
    network: 'USDT (TRC20)',
    covers: [
      { icon: 'shield-check', label: 'Full Trading Access Restoration' },
      { icon: 'dollar', label: 'Withdrawal & Deposit Re-enablement' },
      { icon: 'network', label: 'Bots & Copy Trading Activation' },
      { icon: 'lock', label: 'Account Security Refresh' }
    ],
    urgency: 'Welcome back. Please settle this fee to resume trading with full account access.',
    btnLabel: 'REACTIVATE ACCOUNT'
  },
  maintenance: {
    badge: 'MAINTENANCE NOTICE',
    title: 'Account Maintenance Fee Required',
    subtitle: 'A routine maintenance fee is required to keep your account operational. This covers infrastructure, security, and 24/7 platform monitoring.',
    txType: 'Account Maintenance',
    network: 'USDT (TRC20)',
    covers: [
      { icon: 'network', label: 'Server Infrastructure & Uptime' },
      { icon: 'lock', label: '24/7 Security Monitoring' },
      { icon: 'shield-check', label: 'Continuous Platform Updates' },
      { icon: 'dollar', label: 'Account Services Continuity' }
    ],
    urgency: 'Please settle this fee to avoid any interruption to your account services.',
    btnLabel: 'SETTLE FEE'
  },
  custom: {
    badge: 'TRANSACTION NOTICE',
    title: 'Outstanding Fee Notice',
    subtitle: 'An outstanding fee has been applied to your account that requires immediate attention. Please review the details below and complete the payment.',
    txType: 'Fee Settlement',
    network: 'USDT (TRC20)',
    covers: [
      { icon: 'shield-check', label: 'Transaction Authorization' },
      { icon: 'network', label: 'Account Service Continuity' },
      { icon: 'dollar', label: 'Payment Processing' },
      { icon: 'lock', label: 'Settlement Verification' }
    ],
    urgency: 'Please settle this fee at your earliest convenience to avoid service interruption.',
    btnLabel: 'COMPLETE PAYMENT'
  }
};

// Generate SVG for each icon type
const ICONS = {
  'shield-check': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z"/><path d="M9 12l2 2 4-4"/></svg>',
  'network': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><line x1="7" y1="7" x2="10.5" y2="10.5"/><line x1="17" y1="7" x2="13.5" y2="10.5"/><line x1="7" y1="17" x2="10.5" y2="13.5"/><line x1="17" y1="17" x2="13.5" y2="13.5"/></svg>',
  'lock': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
  'dollar': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M15 9.5c0-1.4-1.3-2.5-3-2.5s-3 1.1-3 2.5 1.3 2.5 3 2.5 3 1.1 3 2.5-1.3 2.5-3 2.5-3-1.1-3-2.5"/></svg>',
  'document': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>',
  'exchange': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16V4M3 8l4-4 4 4M17 8v12M21 16l-4 4-4-4"/></svg>',
  'user': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  'calendar': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  'info': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
};

const feeRequiredEmail = (name, feeLabel, feeAmount, currency, feeType, userId) => {
  const fee = FEE_CONTENT[feeType] || FEE_CONTENT.custom;
  const clientId = userId ? `#QXM-${String(userId).slice(-5).toUpperCase()}` : `#QXM-${Math.floor(Math.random() * 90000 + 10000)}`;
  const now = new Date();
  const dateStr = now.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) + ' • ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) + ' UTC';

  // Build 4-column "covers" grid
  const coversGrid = `
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        ${fee.covers.map(c => `
          <td width="25%" valign="top" align="center" style="padding:0 6px;vertical-align:top;">
            <div style="margin-bottom:10px;">${ICONS[c.icon] || ICONS['shield-check']}</div>
            <p style="margin:0;color:#cbd5e1;font-size:10px;line-height:1.4;font-weight:500;">${c.label}</p>
          </td>
        `).join('')}
      </tr>
    </table>
  `;

  return baseProTemplate(`
    <!-- Badge -->
    <table cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px;">
      <tr>
        <td style="background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.3);border-radius:20px;padding:6px 14px;">
          <table cellpadding="0" cellspacing="0" border="0"><tr>
            <td valign="middle" style="padding-right:6px;">${ICONS.info}</td>
            <td valign="middle" style="color:#3b82f6;font-size:10px;font-weight:700;letter-spacing:2px;">${fee.badge}</td>
          </tr></table>
        </td>
      </tr>
    </table>

    <!-- Title -->
    <h1 style="margin:0 0 12px;color:#ffffff;font-size:26px;font-weight:700;line-height:1.25;letter-spacing:-0.5px;">${fee.title}</h1>

    <!-- Subtitle -->
    <p style="margin:0 0 26px;color:#9ca3af;font-size:13px;line-height:1.7;">${fee.subtitle}</p>

    <!-- Details Card -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px;background:#0a0e1a;border:1px solid #1a2236;border-radius:10px;">
      <tr>
        <td style="padding:18px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td valign="middle" width="38" style="padding-right:12px;padding-bottom:14px;">${ICONS.user}</td>
              <td valign="middle" style="padding-bottom:14px;">
                <p style="margin:0;color:#6b7280;font-size:10px;font-weight:600;letter-spacing:1.5px;">CLIENT ID</p>
                <p style="margin:3px 0 0;color:#ffffff;font-size:13px;font-weight:500;">${clientId}</p>
              </td>
            </tr>
            <tr><td colspan="2" style="border-top:1px solid #1a2236;height:1px;"></td></tr>
            <tr>
              <td valign="middle" width="38" style="padding-right:12px;padding-top:14px;padding-bottom:14px;">${ICONS.document}</td>
              <td valign="middle" style="padding-top:14px;padding-bottom:14px;">
                <p style="margin:0;color:#6b7280;font-size:10px;font-weight:600;letter-spacing:1.5px;">TRANSACTION TYPE</p>
                <p style="margin:3px 0 0;color:#ffffff;font-size:13px;font-weight:500;">${fee.txType}</p>
              </td>
            </tr>
            <tr><td colspan="2" style="border-top:1px solid #1a2236;height:1px;"></td></tr>
            <tr>
              <td valign="top" style="padding-top:14px;" colspan="2">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="50%" valign="middle">
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td valign="middle" style="padding-right:10px;">${ICONS.dollar}</td>
                          <td valign="middle">
                            <p style="margin:0;color:#6b7280;font-size:10px;font-weight:600;letter-spacing:1.5px;">NETWORK</p>
                            <p style="margin:3px 0 0;color:#ffffff;font-size:13px;font-weight:500;">${fee.network}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td width="50%" valign="middle">
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td valign="middle" style="padding-right:10px;">${ICONS.calendar}</td>
                          <td valign="middle">
                            <p style="margin:0;color:#6b7280;font-size:10px;font-weight:600;letter-spacing:1.5px;">DATE</p>
                            <p style="margin:3px 0 0;color:#ffffff;font-size:12px;font-weight:500;">${dateStr}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Amount Due Block -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px;background:#0a0e1a;border:1px solid #1a2236;border-radius:10px;">
      <tr>
        <td width="55%" style="padding:18px 22px;border-right:1px solid #1a2236;">
          <p style="margin:0 0 6px;color:#6b7280;font-size:10px;font-weight:600;letter-spacing:1.5px;">AMOUNT DUE</p>
          <p style="margin:0;color:#ffffff;font-size:28px;font-weight:700;line-height:1;letter-spacing:-0.5px;">${formatUSD(feeAmount)}</p>
        </td>
        <td width="45%" align="right" style="padding:18px 22px;">
          <p style="margin:0 0 6px;color:#6b7280;font-size:10px;font-weight:600;letter-spacing:1.5px;">FEE TYPE</p>
          <p style="margin:0;color:#3b82f6;font-size:15px;font-weight:600;line-height:1;">${feeLabel || fee.title.replace(' Required', '')}</p>
        </td>
      </tr>
    </table>

    <!-- This Fee Covers -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px;background:#0a0e1a;border:1px solid #1a2236;border-radius:10px;">
      <tr>
        <td style="padding:18px;">
          <p style="margin:0 0 16px;color:#3b82f6;font-size:10px;font-weight:700;letter-spacing:2px;">THIS FEE COVERS</p>
          ${coversGrid}
        </td>
      </tr>
    </table>

    <!-- Info Notice -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;background:rgba(255,64,0,0.08);border:1px solid rgba(255,64,0,0.25);border-radius:8px;">
      <tr>
        <td style="padding:14px 16px;">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td valign="middle" style="padding-right:10px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff4000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </td>
              <td valign="middle" style="color:#ff4000;font-size:12px;line-height:1.5;font-weight:500;">${fee.urgency}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- CTA Button -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;">
      <tr>
        <td align="center">
          <a href="${FRONTEND_URL}/dashboard" style="display:inline-block;background:#3b82f6;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:1.5px;padding:14px 36px;border-radius:8px;text-decoration:none;text-transform:uppercase;">${fee.btnLabel} &nbsp;→</a>
        </td>
      </tr>
    </table>
  `);
};

module.exports = feeRequiredEmail;
