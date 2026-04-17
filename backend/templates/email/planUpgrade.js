const baseTemplate = require('./base-enhanced');

const planUpgradeEmail = (name, planName, details) => baseTemplate(`

  <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 20px auto;">
    <tr>
      <td style="background-color:#818cf8;padding:8px 24px;text-align:center;">
        <span style="color:#ffffff;font-size:11px;font-weight:500;letter-spacing:3px;font-family:'Helvetica Neue',Arial,sans-serif;">${planName || 'PREMIUM'} PLAN</span>
      </td>
    </tr>
  </table>

  <h1 style="color:#ffffff;font-size:24px;font-weight:300;margin:0 0 6px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">Account Upgraded</h1>
  <p style="color:#22c55e;font-size:11px;letter-spacing:2px;font-weight:500;margin:0 0 32px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">ACTIVE</p>

  <p style="color:#a1a1aa;font-size:13px;margin:0 0 24px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, your account has been upgraded to the <span style="color:#818cf8;font-weight:500;">${planName}</span> plan with enhanced features and higher returns.
  </p>

  ${details ? `
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background-color:#121212;">
    <tr>
      <td colspan="2" style="padding:10px 16px;border-bottom:1px solid #1a1a1a;">
        <p style="color:#a0a0a0;font-size:9px;letter-spacing:2px;margin:0;font-family:'Helvetica Neue',Arial,sans-serif;">PLAN DETAILS</p>
      </td>
    </tr>
    ${Object.entries(details || {}).map(([k, v]) => `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#a0a0a0;font-size:10px;font-family:'Helvetica Neue',Arial,sans-serif;">${k}</td>
      <td align="right" style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#818cf8;font-size:11px;font-weight:500;font-family:'Helvetica Neue',Arial,sans-serif;">${v}</td>
    </tr>
    `).join('')}
  </table>
  ` : ''}

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background-color:#818cf8;color:#ffffff;font-size:11px;font-weight:500;padding:14px 44px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">VIEW MY PLAN</a>
      </td>
    </tr>
  </table>

  <p style="color:#71717a;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Team</p>

`);

module.exports = planUpgradeEmail;
