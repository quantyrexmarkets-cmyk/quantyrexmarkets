const baseTemplate = require('./base-enhanced');

const planUpgradeEmail = (name, planName, details) => baseTemplate(`

  <!-- PLAN BADGE -->
  <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 24px auto;">
    <tr>
      <td style="background:linear-gradient(135deg,#4f46e5,#6366f1);padding:12px 28px;text-align:center;">
        <span style="color:#ffffff;font-size:13px;font-weight:500;letter-spacing:3px;font-family:'Helvetica Neue',Arial,sans-serif;">${planName || 'PREMIUM'} PLAN</span>
      </td>
    </tr>
  </table>

  <!-- HEADLINE -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;">
    <tr>
      <td style="text-align:center;">
        <p style="margin:0 0 6px;color:#6366f1;font-size:10px;letter-spacing:3px;font-family:'Helvetica Neue',Arial,sans-serif;">CONGRATULATIONS</p>
        <h1 style="margin:0 0 10px;color:#ffffff;font-size:24px;font-weight:300;font-family:'Helvetica Neue',Arial,sans-serif;">Account Upgraded</h1>
        <p style="margin:0;color:#22c55e;font-size:11px;letter-spacing:2px;font-weight:500;font-family:'Helvetica Neue',Arial,sans-serif;">&#9679; ACTIVE</p>
      </td>
    </tr>
  </table>

  <!-- DIVIDER -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#6366f1,transparent);font-size:0;">&nbsp;</td></tr>
  </table>

  <p style="color:#94a3b8;font-size:13px;margin:0 0 24px;line-height:1.9;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, your account has been upgraded to the <span style="color:#6366f1;font-weight:500;">${planName}</span> plan. You now have access to enhanced features and higher returns.
  </p>

  ${details ? `
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background:#111827;border:1px solid #1e293b;border-collapse:collapse;">
    <tr>
      <td colspan="2" style="padding:12px 20px;background:#0d1421;border-bottom:1px solid #1e293b;">
        <p style="color:#6366f1;font-size:9px;letter-spacing:2px;margin:0;font-family:'Helvetica Neue',Arial,sans-serif;">PLAN DETAILS</p>
      </td>
    </tr>
    ${Object.entries(details || {}).map(([k, v]) => `
    <tr>
      <td style="padding:12px 20px;border-bottom:1px solid #1e293b;color:#475569;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">${k}</td>
      <td align="right" style="padding:12px 20px;border-bottom:1px solid #1e293b;color:#6366f1;font-size:12px;font-weight:500;font-family:'Helvetica Neue',Arial,sans-serif;">${v}</td>
    </tr>
    `).join('')}
  </table>
  ` : ''}

  <!-- CTA -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#ffffff;font-size:12px;font-weight:500;padding:16px 48px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">VIEW MY PLAN &rarr;</a>
      </td>
    </tr>
  </table>

  <p style="color:#334155;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Team</p>

`);

module.exports = planUpgradeEmail;
