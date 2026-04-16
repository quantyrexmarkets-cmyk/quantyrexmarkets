const baseTemplate = require('./base-enhanced');
const planUpgradeEmail = (name, planName, details) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 28px;">
    <div style="display:inline-block;background:linear-gradient(135deg,#6366f1,#4f46e5);padding:14px 24px;margin-bottom:16px;">
      <span style="color:#ffffff;font-size:14px;font-weight:500;letter-spacing:3px;font-family:'Montserrat',Arial,sans-serif;">${planName || 'PREMIUM'} PLAN</span>
    </div>
    <h1 style="color:#ffffff;font-size:20px;font-weight:300;margin:0 0 6px;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">Account Upgraded</h1>
    <p style="color:#6366f1;font-size:10px;margin:0;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">● ACTIVE</p>
  </div>

  <div style="height:1px;background:linear-gradient(90deg,transparent,#6366f1,transparent);margin:0 0 28px;"></div>

  <p style="color:#ffffff;font-size:13px;margin:0 0 16px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear <span style="color:#6366f1;">${name || 'Valued Client'}</span>,</p>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 24px;line-height:1.9;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Congratulations! Your account has been upgraded to the <strong style="color:#ffffff;">${planName}</strong> plan. You now have access to enhanced features and higher returns.</p>

  ${details ? `<table width="100%" style="margin:0 0 24px;background:#0d1117;border:1px solid #1a1a1a;border-collapse:collapse;">
    <tr style="background:#0a0a0a;"><td colspan="2" style="padding:10px 16px;color:#505050;font-size:10px;font-family:'Montserrat',Arial,sans-serif;letter-spacing:2px;">PLAN DETAILS</td></tr>
    ${Object.entries(details||{}).map(([k,v])=>`<tr style="border-top:1px solid #1a1a1a;"><td style="padding:10px 16px;color:#9ca3af;font-size:10px;font-family:'Montserrat',Arial,sans-serif;">${k}</td><td align="right" style="padding:10px 16px;color:#6366f1;font-size:11px;font-weight:500;font-family:'Montserrat',Arial,sans-serif;">${v}</td></tr>`).join('')}
  </table>` : ''}

  <div style="text-align:center;margin:0 0 24px;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:500;padding:14px 40px;text-decoration:none;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">VIEW MY PLAN →</a>
  </div>

  <p style="color:#505050;font-size:10px;margin:24px 0 0;text-align:center;font-family:'Montserrat',Arial,sans-serif;">The Quantyrex Markets Team</p>
`);
module.exports = planUpgradeEmail;
