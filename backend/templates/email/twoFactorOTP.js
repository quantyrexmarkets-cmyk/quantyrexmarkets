const baseTemplate = require('./base');

const twoFactorOTPEmail = (name, code) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">Your One-Time Password (OTP) for secure access is:</p>
  <table width="100%" style="margin:20px 0;background:#0d1117;border:1px solid #1a1a1a;"><tr><td style="padding:24px;text-align:center;">
    <span style="color:#6366f1;font-size:32px;font-weight:600;letter-spacing:8px;font-family:monospace;">${code}</span>
  </td></tr></table>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">This code is valid for a short period. Use it immediately.</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 12px;line-height:1.7;">Important:</p>
  <ul style="color:#888888;font-size:12px;margin:0 0 20px;padding-left:20px;line-height:2;">
    <li>Do not share this code with anyone</li>
    <li>Our team will never ask for your 2FA code</li>
    <li>If you did not request this, secure your account immediately</li>
  </ul>
  <p style="color:#666666;font-size:11px;margin:30px 0 0;line-height:1.7;">Warm regards,<br/><span style="color:#888888;">The Quantyrex Markets Team</span></p>
`);

module.exports = twoFactorOTPEmail;
