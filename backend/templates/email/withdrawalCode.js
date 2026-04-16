const baseTemplate = require('./base');
const withdrawalCodeEmail = (name, code) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 28px;">
    <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 16px auto;"><tr><td width="68" height="68" align="center" valign="middle" style="width:68px;height:68px;border-radius:34px;background:#a78bfa15;border:2px solid #a78bfa;"><img src="https://img.icons8.com/sf-regular/48/a78bfa/key.png" width="32" height="32" alt="" style="display:block;margin:auto;" /></td></tr></table>
    <h1 style="color:#ffffff;font-size:20px;font-weight:300;margin:0 0 8px;letter-spacing:1px;">Withdrawal Code</h1>
    <p style="color:#505050;font-size:10px;margin:0;letter-spacing:2px;">SECURITY CODE</p>
  </div>
  <div style="height:1px;background:linear-gradient(90deg,transparent,#a78bfa,transparent);margin:0 0 28px;"></div>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 24px;line-height:1.7;font-weight:300;">Dear ${name||'Valued Client'}, your withdrawal security code has been generated.</p>
  <div style="text-align:center;background:#0d1117;border:1px solid #1a1a1a;padding:28px;margin:0 0 24px;">
    <p style="color:#505050;font-size:10px;margin:0 0 12px;letter-spacing:2px;">YOUR CODE</p>
    <p style="color:#a78bfa;font-size:32px;font-weight:300;margin:0;letter-spacing:8px;">${code||'------'}</p>
  </div>
  <p style="color:#ef4444;font-size:10px;margin:0;text-align:center;">Never share this code with anyone.</p>
`);
module.exports = withdrawalCodeEmail;
