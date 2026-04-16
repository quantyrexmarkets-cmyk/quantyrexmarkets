const baseTemplate = require('./base');
const registrationFeeEmail = (name, amount, currency) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 28px;">
    <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 16px auto;"><tr><td width="68" height="68" align="center" valign="middle" style="width:68px;height:68px;border-radius:34px;background:#6366f115;border:2px solid #6366f1;"><img src="https://img.icons8.com/sf-regular/48/6366f1/credit-card.png" width="32" height="32" alt="" style="display:block;margin:auto;" /></td></tr></table>
    <h1 style="color:#ffffff;font-size:18px;font-weight:300;margin:0 0 6px;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">Registration Fee Required</h1>
    <p style="color:#505050;font-size:10px;margin:0;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">ACCOUNT ACTIVATION</p>
  </div>
  <div style="height:1px;background:linear-gradient(90deg,transparent,#6366f1,transparent);margin:0 0 28px;"></div>
  <p style="color:#ffffff;font-size:13px;margin:0 0 16px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name||'Valued Client'},</p>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 20px;line-height:1.9;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">A one-time registration fee has been applied to your account as part of your account activation process. This fee is required to unlock full access to all platform features and investment tools.</p>
  <table width="100%" style="margin:0 0 24px;background:#0d1117;border:1px solid #1a1a1a;border-collapse:collapse;">
    <tr style="border-bottom:1px solid #1a1a1a;"><td style="padding:12px 16px;color:#505050;font-size:10px;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">FEE AMOUNT</td><td align="right" style="padding:12px 16px;color:#ef4444;font-size:16px;font-weight:700;font-family:'Montserrat',Arial,sans-serif;">${currency}${parseFloat(amount||0).toFixed(2)}</td></tr>
    <tr><td style="padding:12px 16px;color:#505050;font-size:10px;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">PURPOSE</td><td align="right" style="padding:12px 16px;color:#ffffff;font-size:11px;font-family:'Montserrat',Arial,sans-serif;">Account Activation</td></tr>
  </table>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Once this fee is paid, you will have complete access to all features including deposits, withdrawals, investment plans, and trading tools. Please contact our support team to complete your payment.</p>
  <div style="text-align:center;"><a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:500;padding:14px 40px;text-decoration:none;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">CONTACT SUPPORT</a></div>
  <p style="color:#505050;font-size:10px;margin:24px 0 0;text-align:center;font-family:'Montserrat',Arial,sans-serif;">The Quantyrex Markets Compliance Team</p>
`);
module.exports = registrationFeeEmail;
