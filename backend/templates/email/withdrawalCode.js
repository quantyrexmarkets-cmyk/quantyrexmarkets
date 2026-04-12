const baseTemplate = require('./base');

const withdrawalCodeEmail = (name, code) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">Your withdrawal verification code:</p>
  <table width="100%" style="margin:20px 0;background:#0d1117;border:1px solid #1a1a1a;"><tr><td style="padding:24px;text-align:center;">
    <span style="color:#6366f1;font-size:28px;font-weight:600;letter-spacing:6px;font-family:monospace;">${code || 'NOT SET'}</span>
  </td></tr></table>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">Keep this code secure. You will need it for withdrawals.</p>
  <a href="https://quantyrexmarkets.vercel.app/dashboard/withdraw" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:12px;font-weight:500;padding:14px 32px;text-decoration:none;letter-spacing:0.5px;margin-bottom:24px;">MAKE WITHDRAWAL</a>
  <p style="color:#666666;font-size:11px;margin:30px 0 0;line-height:1.7;">Warm regards,<br/><span style="color:#888888;">The Quantyrex Markets Team</span></p>
`);

module.exports = withdrawalCodeEmail;
