const baseTemplate = require('./base');
const feeRequiredEmail = (name, feeLabel, feeAmount, currency, feeType) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 28px;">
    <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 16px auto;"><tr><td width="68" height="68" align="center" valign="middle" style="width:68px;height:68px;border-radius:34px;background:#f59e0b15;border:2px solid #f59e0b;"><img src="https://img.icons8.com/sf-regular/48/f59e0b/error.png" width="32" height="32" alt="" style="display:block;margin:auto;" /></td></tr></table>
    <h1 style="color:#f59e0b;font-size:20px;font-weight:300;margin:0 0 8px;letter-spacing:1px;">Action Required</h1>
    <p style="color:#505050;font-size:10px;margin:0;letter-spacing:2px;">OUTSTANDING FEE</p>
  </div>
  <div style="height:1px;background:linear-gradient(90deg,transparent,#f59e0b,transparent);margin:0 0 28px;"></div>
  <p style="color:#ffffff;font-size:13px;margin:0 0 16px;line-height:1.7;font-weight:300;">Dear ${name||'Valued Client'},</p>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 16px;line-height:1.8;font-weight:300;">An outstanding fee has been applied to your account that must be settled before you can process a withdrawal request.</p>
  <table width="100%" style="margin:0 0 24px;background:#0d1117;border:1px solid #1a1a1a;border-collapse:collapse;">
    <tr style="border-bottom:1px solid #1a1a1a;"><td style="padding:12px 16px;color:#505050;font-size:10px;letter-spacing:1px;">FEE TYPE</td><td align="right" style="padding:12px 16px;color:#f59e0b;font-size:12px;font-weight:600;">${feeLabel}</td></tr>
    <tr><td style="padding:12px 16px;color:#505050;font-size:10px;letter-spacing:1px;">AMOUNT DUE</td><td align="right" style="padding:12px 16px;color:#ef4444;font-size:16px;font-weight:700;">${currency||'$'}${parseFloat(feeAmount||0).toFixed(2)}</td></tr>
  </table>
  <p style="color:#9ca3af;font-size:12px;margin:16px 0;line-height:1.8;font-weight:300;">Please log in to your dashboard and contact our support team to complete this payment at your earliest convenience. Failure to settle this fee may result in further restrictions on your account.</p>
  <div style="text-align:center;"><a href="https://quantyrexmarkets.vercel.app/dashboard/withdraw" style="display:inline-block;background:#f59e0b;color:#000000;font-size:11px;font-weight:600;padding:14px 40px;text-decoration:none;letter-spacing:2px;">CONTACT SUPPORT →</a></div>
`);
module.exports = feeRequiredEmail;
