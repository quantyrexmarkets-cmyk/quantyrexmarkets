const baseTemplate = require('./base');

const twoFactorOTPEmail = (name, code) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Your One-Time Password (OTP) for secure access is:</p>
  <table width="100%" style="margin:20px 0;background:#0d1117;border:1px solid #1a1a1a;"><tr><td style="padding:16px;text-align:center;">
    <span style="color:#6366f1;font-size:24px;font-weight:600;letter-spacing:8px;font-family:monospace;">${code}</span>
  </td></tr></table>
  <p style="color:#ffffff;font-size:12px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">This code is valid for a short period and should be used immediately to complete your login or transaction.</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 12px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Important:</p>
  <ul style="color:#6366f1;font-size:12px;margin:0 0 20px;padding-left:20px;line-height:2;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">
    <li><span style="color:#6366f1;">Do not share this code with anyone</span></li>
    <li><span style="color:#6366f1;">Our team will never ask for your 2FA code</span></li>
    <li><span style="color:#6366f1;">If you did not request this code, please secure your account immediately</span></li>
  </ul>
  <table width="100%" style="margin:20px 0;background:#1a0a0a;border:1px solid #ef4444;border-left:4px solid #ef4444;"><tr><td style="padding:12px 16px;">
    <p style="color:#ef4444;font-size:11px;margin:0 0 4px;font-family:'Montserrat',Arial,sans-serif;font-weight:500;">⚠️ SECURITY WARNING</p>
    <p style="color:#ffffff;font-size:11px;margin:0;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Never share this code with anyone. Our team will never ask for your verification code. If you did not request this, please change your password immediately and contact support.</p>
  </td></tr></table>
  <p style="color:#ffffff;font-size:12px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">If you need assistance, please contact our support team.</p>
  <p style="color:#ffffff;font-size:11px;margin:30px 0 0;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Warm regards,<br/><span style="color:#ffffff;">The Quantyrex Markets Team</span></p>
`);

module.exports = twoFactorOTPEmail;
