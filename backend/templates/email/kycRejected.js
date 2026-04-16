const baseTemplate = require('./base');
const kycRejectedEmail = (name, reason) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 28px;">
    <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 16px auto;"><tr><td width="68" height="68" align="center" valign="middle" style="width:68px;height:68px;border-radius:34px;background:#ef444415;border:2px solid #ef4444;"><img src="https://img.icons8.com/sf-regular/48/ef4444/multiply.png" width="32" height="32" alt="" style="display:block;margin:auto;" /></td></tr></table>
    <h1 style="color:#ef4444;font-size:20px;font-weight:300;margin:0 0 8px;letter-spacing:1px;">Verification Unsuccessful</h1>
    <p style="color:#505050;font-size:10px;margin:0;letter-spacing:2px;">KYC REJECTED</p>
  </div>
  <div style="height:1px;background:linear-gradient(90deg,transparent,#ef4444,transparent);margin:0 0 28px;"></div>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 20px;line-height:1.9;font-weight:300;">Dear ${name||'Valued Client'}, your KYC could not be approved. Please review and resubmit.</p>
  ${reason ? '<div style="background:#0d1117;border-left:3px solid #ef4444;padding:12px 16px;margin:0 0 24px;"><p style="color:#ef4444;font-size:11px;margin:0;line-height:1.7;">'+reason+'</p></div>' : ''}
  <div style="text-align:center;margin:24px 0;"><a href="https://quantyrexmarkets.vercel.app/dashboard/kyc" style="display:inline-block;background:#ef4444;color:#ffffff;font-size:11px;font-weight:500;padding:14px 40px;text-decoration:none;letter-spacing:2px;">RESUBMIT KYC →</a></div>
`);
module.exports = kycRejectedEmail;
