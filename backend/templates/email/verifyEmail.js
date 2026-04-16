const baseTemplate = require('./base');
const verifyEmailTemplate = (name, link) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 28px;">
    <div style="width:64px;height:64px;border-radius:50%;border:2px solid #6366f1;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
      <svg width="28" height="28" fill="none" stroke="#6366f1" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
    </div>
    <h1 style="color:#ffffff;font-size:18px;font-weight:300;margin:0 0 6px;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">Verify Your Email</h1>
    <p style="color:#505050;font-size:10px;margin:0;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">ONE LAST STEP</p>
  </div>

  <div style="height:1px;background:linear-gradient(90deg,transparent,#6366f1,transparent);margin:0 0 28px;"></div>

  <p style="color:#ffffff;font-size:13px;margin:0 0 16px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 28px;line-height:1.9;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Thank you for registering with Quantyrex Markets. Please verify your email address to activate your account and access all platform features.</p>

  <div style="text-align:center;margin:0 0 28px;">
    <a href="${link}" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:500;padding:16px 48px;text-decoration:none;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">VERIFY EMAIL ADDRESS</a>
  </div>

  <p style="color:#505050;font-size:10px;margin:0 0 8px;text-align:center;font-family:'Montserrat',Arial,sans-serif;">This link expires in 24 hours.</p>
  <p style="color:#353535;font-size:10px;margin:0 0 24px;text-align:center;font-family:'Montserrat',Arial,sans-serif;">If you did not create an account, please ignore this email.</p>

  <p style="color:#505050;font-size:10px;margin:24px 0 0;text-align:center;font-family:'Montserrat',Arial,sans-serif;">The Quantyrex Markets Team</p>
`);
module.exports = verifyEmailTemplate;
