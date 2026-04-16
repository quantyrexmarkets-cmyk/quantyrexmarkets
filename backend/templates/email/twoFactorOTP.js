const baseTemplate = require('./base');
const twoFactorOTPEmail = (name, code) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 28px;">
    <div style="width:64px;height:64px;border-radius:50%;border:2px solid #6366f1;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
      <svg width="28" height="28" fill="none" stroke="#6366f1" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    </div>
    <h1 style="color:#ffffff;font-size:18px;font-weight:300;margin:0 0 6px;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">Authentication Code</h1>
    <p style="color:#505050;font-size:10px;margin:0;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">TWO-FACTOR VERIFICATION</p>
  </div>

  <div style="height:1px;background:linear-gradient(90deg,transparent,#6366f1,transparent);margin:0 0 28px;"></div>

  <p style="color:#9ca3af;font-size:12px;margin:0 0 24px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name || 'Valued Client'}, use the code below to complete your login verification.</p>

  <div style="text-align:center;background:#0d1117;border:1px solid #1a1a1a;padding:28px;margin:0 0 24px;">
    <p style="color:#505050;font-size:10px;margin:0 0 12px;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">YOUR VERIFICATION CODE</p>
    <p style="color:#6366f1;font-size:36px;font-weight:300;margin:0;letter-spacing:12px;font-family:'Montserrat',Arial,sans-serif;">${code}</p>
    <p style="color:#353535;font-size:10px;margin:12px 0 0;font-family:'Montserrat',Arial,sans-serif;">Valid for 10 minutes</p>
  </div>

  <p style="color:#505050;font-size:11px;margin:0 0 24px;line-height:1.8;text-align:center;font-family:'Montserrat',Arial,sans-serif;">Never share this code with anyone. Quantyrex Markets will never ask for your OTP.</p>

  <p style="color:#505050;font-size:10px;margin:24px 0 0;text-align:center;font-family:'Montserrat',Arial,sans-serif;">The Quantyrex Markets Security Team</p>
`);
module.exports = twoFactorOTPEmail;
