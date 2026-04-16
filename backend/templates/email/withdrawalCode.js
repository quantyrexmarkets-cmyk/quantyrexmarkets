const baseTemplate = require('./base');
const withdrawalCodeEmail = (name, code) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 28px;">
    <div style="width:64px;height:64px;border-radius:50%;border:2px solid #a78bfa;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
      <svg width="28" height="28" fill="none" stroke="#a78bfa" stroke-width="2" viewBox="0 0 24 24"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
    </div>
    <h1 style="color:#ffffff;font-size:18px;font-weight:300;margin:0 0 6px;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">Withdrawal Code</h1>
    <p style="color:#505050;font-size:10px;margin:0;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">SECURITY CODE</p>
  </div>

  <div style="height:1px;background:linear-gradient(90deg,transparent,#a78bfa,transparent);margin:0 0 28px;"></div>

  <p style="color:#9ca3af;font-size:12px;margin:0 0 24px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name || 'Valued Client'}, your withdrawal security code has been generated. Use this code when submitting a withdrawal request.</p>

  <div style="text-align:center;background:#0d1117;border:1px solid #1a1a1a;padding:28px;margin:0 0 24px;">
    <p style="color:#505050;font-size:10px;margin:0 0 12px;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">YOUR WITHDRAWAL CODE</p>
    <p style="color:#a78bfa;font-size:32px;font-weight:300;margin:0;letter-spacing:8px;font-family:'Montserrat',Arial,sans-serif;">${code || '------'}</p>
  </div>

  <table width="100%" style="margin:0 0 24px;background:#0d1117;border:1px solid #2d1212;"><tr><td style="padding:14px 16px;">
    <p style="color:#ef4444;font-size:10px;margin:0 0 6px;font-family:'Montserrat',Arial,sans-serif;letter-spacing:1px;">⚠ IMPORTANT</p>
    <p style="color:#505050;font-size:11px;margin:0;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Never share this code with anyone. Our team will never ask for your withdrawal code. Keep it secure.</p>
  </td></tr></table>

  <p style="color:#505050;font-size:10px;margin:24px 0 0;text-align:center;font-family:'Montserrat',Arial,sans-serif;">The Quantyrex Markets Security Team</p>
`);
module.exports = withdrawalCodeEmail;
