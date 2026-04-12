const baseTemplate = require('./base');

const depositConfirmedEmail = (name, amount, currency, newBalance) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">We are pleased to inform you that your recent deposit has been successfully confirmed.</p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">The funds have been credited to your account and are now available for use.</p>
  <table width="100%" style="margin:20px 0;background:#0d1117;border:1px solid #1a1a1a;"><tr><td style="padding:16px;"><table width="100%">
    <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#666666;font-size:11px;">Amount Deposited</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#22c55e;font-size:12px;font-weight:500;">+${currency} ${parseFloat(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#666666;font-size:11px;">New Balance</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#ffffff;font-size:12px;font-weight:500;">${currency} ${parseFloat(newBalance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></td></tr>
    <tr><td style="padding:8px 0;"><span style="color:#666666;font-size:11px;">Status</span></td><td align="right" style="padding:8px 0;"><span style="color:#22c55e;font-size:11px;font-weight:500;">CONFIRMED</span></td></tr>
  </table></td></tr></table>
  <p style="color:#ffffff;font-size:12px;margin:0 0 12px;line-height:1.7;">What you can do next:</p>
  <ul style="color:#888888;font-size:12px;margin:0 0 20px;padding-left:20px;line-height:2;">
    <li>Start investing immediately</li>
    <li>Explore available investment opportunities</li>
    <li>Monitor your portfolio performance</li>
  </ul>
  <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:12px;font-weight:500;padding:14px 32px;text-decoration:none;letter-spacing:0.5px;margin-bottom:24px;">GO TO DASHBOARD</a>
  <p style="color:#888888;font-size:12px;margin:24px 0 20px;line-height:1.8;">Thank you for choosing Quantyrex Markets.</p>
  <p style="color:#666666;font-size:11px;margin:30px 0 0;line-height:1.7;">Warm regards,<br/><span style="color:#888888;">The Quantyrex Markets Team</span></p>
`);

module.exports = depositConfirmedEmail;
