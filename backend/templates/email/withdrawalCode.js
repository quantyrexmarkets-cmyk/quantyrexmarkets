const baseTemplate = require('./base');

const withdrawalCodeEmail = (name, code) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 25px;line-height:1.7;">
    Hi ${name},
  </p>
  
  <p style="color:#888888;font-size:12px;margin:0 0 30px;line-height:1.7;">
    Your withdrawal verification code:
  </p>
  
  <div style="background:#111111;border:1px solid #1a1a1a;padding:25px;text-align:center;margin:0 0 30px;">
    <span style="color:#ffffff;font-size:24px;font-weight:600;letter-spacing:6px;font-family:monospace;">${code || 'NOT SET'}</span>
  </div>
  
  <p style="color:#666666;font-size:11px;margin:0;line-height:1.7;">
    Use this code when processing withdrawals. Keep it secure.
  </p>
`);

module.exports = withdrawalCodeEmail;
