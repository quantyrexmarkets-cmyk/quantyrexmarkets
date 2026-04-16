const baseTemplate = require('./base');
const passwordResetEmail = (name, link) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 28px;">
    <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 16px auto;"><tr><td width="68" height="68" align="center" valign="middle" style="width:68px;height:68px;border-radius:34px;background:#f59e0b15;border:2px solid #f59e0b;"><img src="https://img.icons8.com/sf-regular/48/f59e0b/lock.png" width="32" height="32" alt="" style="display:block;margin:auto;" /></td></tr></table>
    <h1 style="color:#ffffff;font-size:20px;font-weight:300;margin:0 0 8px;letter-spacing:1px;">Reset Password</h1>
    <p style="color:#505050;font-size:10px;margin:0;letter-spacing:2px;">SECURITY REQUEST</p>
  </div>
  <div style="height:1px;background:linear-gradient(90deg,transparent,#f59e0b,transparent);margin:0 0 28px;"></div>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 20px;line-height:1.9;font-weight:300;">Dear ${name||'Valued Client'}, click below to reset your password. Valid for 1 hour.</p>
  <div style="text-align:center;margin:24px 0;">
    <a href="${link}" style="display:inline-block;background:#f59e0b;color:#000000;font-size:11px;font-weight:500;padding:14px 40px;text-decoration:none;letter-spacing:2px;">RESET PASSWORD →</a>
  </div>
  <p style="color:#505050;font-size:10px;margin:24px 0 0;text-align:center;">The Quantyrex Markets Team</p>
`);
module.exports = passwordResetEmail;
