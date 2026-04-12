const baseTemplate = require('./base');

const planUpgradeEmail = (name, packageName, planDetails) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">We hope you are doing well.</p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">Your current account level requires an upgrade to continue enjoying uninterrupted access to our investment services.</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 12px;line-height:1.7;">Why this upgrade is important:</p>
  <ul style="color:#888888;font-size:12px;margin:0 0 20px;padding-left:20px;line-height:2;">
    <li>Maintain full access to your investment dashboard</li>
    <li>Enable withdrawals and advanced trading features</li>
    <li>Improve account security and performance</li>
    <li>Unlock higher earning opportunities</li>
  </ul>
  <a href="https://quantyrexmarkets.vercel.app/dashboard/packages" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:12px;font-weight:500;padding:14px 32px;text-decoration:none;letter-spacing:0.5px;margin-bottom:24px;">UPGRADE ACCOUNT</a>
  <p style="color:#888888;font-size:12px;margin:24px 0 20px;line-height:1.8;">Thank you for choosing Quantyrex Markets.</p>
  <p style="color:#666666;font-size:11px;margin:30px 0 0;line-height:1.7;">Warm regards,<br/><span style="color:#888888;">The Quantyrex Markets Team</span></p>
`);

module.exports = planUpgradeEmail;
