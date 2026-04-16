const baseTemplate = require('./base-enhanced');
const verifyEmailTemplate = (name, link) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 28px;">
    <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 16px auto;"><tr><td width="68" height="68" align="center" valign="middle" style="width:68px;height:68px;border-radius:34px;background:#6366f115;border:2px solid #6366f1;"><img src="https://img.icons8.com/sf-regular/48/6366f1/email.png" width="32" height="32" alt="" style="display:block;margin:auto;" /></td></tr></table>
    <h1 style="color:#ffffff;font-size:20px;font-weight:300;margin:0 0 8px;letter-spacing:1px;">Verify Your Email</h1>
    <p style="color:#505050;font-size:10px;margin:0;letter-spacing:2px;">ONE LAST STEP</p>
  </div>
  <div style="height:1px;background:linear-gradient(90deg,transparent,#6366f1,transparent);margin:0 0 28px;"></div>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 20px;line-height:1.9;font-weight:300;">Dear ${name||'Valued Client'}, please verify your email to activate your account.</p>
  <div style="text-align:center;margin:24px 0;">
    <a href="${link}" style="display:inline-block;background:#6366f1;color:#6366f1;font-size:11px;font-weight:500;padding:14px 40px;text-decoration:none;letter-spacing:2px;">VERIFY EMAIL →</a>
  </div>
  <p style="color:#505050;font-size:10px;margin:24px 0 0;text-align:center;">The Quantyrex Markets Team</p>
`);
module.exports = verifyEmailTemplate;
