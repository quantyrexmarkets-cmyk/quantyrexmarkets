const baseTemplate = require('./base');
const adminMessageEmail = (name, subject, message) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 28px;">
    <div style="width:64px;height:64px;border-radius:50%;border:2px solid #6366f1;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
      <svg width="28" height="28" fill="none" stroke="#6366f1" stroke-width="2" viewBox="0 0 24 24"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"/></svg>
    </div>
    <h1 style="color:#ffffff;font-size:16px;font-weight:300;margin:0 0 6px;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">${subject || 'Message from Quantyrex'}</h1>
    <p style="color:#505050;font-size:10px;margin:0;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">ACCOUNT NOTIFICATION</p>
  </div>

  <div style="height:1px;background:linear-gradient(90deg,transparent,#6366f1,transparent);margin:0 0 28px;"></div>

  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name || 'Valued Client'},</p>

  <div style="background:#0d1117;border-left:3px solid #6366f1;padding:16px 20px;margin:0 0 24px;">
    <p style="color:#9ca3af;font-size:12px;margin:0;line-height:1.9;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">${message || ''}</p>
  </div>

  <div style="text-align:center;margin:0 0 24px;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:500;padding:14px 40px;text-decoration:none;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">VIEW DASHBOARD →</a>
  </div>

  <p style="color:#505050;font-size:10px;margin:24px 0 0;text-align:center;font-family:'Montserrat',Arial,sans-serif;">The Quantyrex Markets Team</p>
`);
module.exports = adminMessageEmail;
