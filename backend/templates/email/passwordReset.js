const baseTemplate = require('./base');
const passwordResetEmail = (name, link) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 28px;">
    <div style="width:64px;height:64px;border-radius:50%;border:2px solid #f59e0b;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
      <svg width="28" height="28" fill="none" stroke="#f59e0b" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    </div>
    <h1 style="color:#ffffff;font-size:18px;font-weight:300;margin:0 0 6px;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">Reset Password</h1>
    <p style="color:#505050;font-size:10px;margin:0;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">SECURITY REQUEST</p>
  </div>

  <div style="height:1px;background:linear-gradient(90deg,transparent,#f59e0b,transparent);margin:0 0 28px;"></div>

  <p style="color:#ffffff;font-size:13px;margin:0 0 16px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 28px;line-height:1.9;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">We received a request to reset your password. Click the button below to create a new password. This link is valid for 1 hour.</p>

  <div style="text-align:center;margin:0 0 28px;">
    <a href="${link}" style="display:inline-block;background:#f59e0b;color:#000000;font-size:11px;font-weight:600;padding:16px 48px;text-decoration:none;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">RESET MY PASSWORD</a>
  </div>

  <table width="100%" style="margin:0 0 24px;background:#0d1117;border:1px solid #1a1a1a;"><tr><td style="padding:14px 16px;">
    <p style="color:#f59e0b;font-size:10px;margin:0 0 6px;font-family:'Montserrat',Arial,sans-serif;letter-spacing:1px;">⚠ SECURITY NOTICE</p>
    <p style="color:#505050;font-size:11px;margin:0;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">If you did not request a password reset, please contact our support team immediately as your account may be at risk.</p>
  </td></tr></table>

  <p style="color:#505050;font-size:10px;margin:24px 0 0;text-align:center;font-family:'Montserrat',Arial,sans-serif;">The Quantyrex Markets Security Team</p>
`);
module.exports = passwordResetEmail;
