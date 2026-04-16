const baseTemplate = require('./base');
const withdrawalPendingEmail = (name, amount, currency, method) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 24px;">
    <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 16px auto;"><tr><td width="68" height="68" align="center" valign="middle" style="width:68px;height:68px;border-radius:34px;background:#f59e0b15;border:2px solid #f59e0b;"><img src="https://img.icons8.com/sf-regular/48/f59e0b/clock.png" width="32" height="32" alt="" style="display:block;margin:auto;" /></td></tr></table>
    <p style="color:#505050;font-size:10px;margin:0 0 8px;letter-spacing:3px;font-family:'Montserrat',Arial,sans-serif;">WITHDRAWAL REQUEST</p>
    <h1 style="color:#ffffff;font-size:28px;font-weight:300;margin:0 0 4px;font-family:'Montserrat',Arial,sans-serif;">${currency} ${parseFloat(amount||0).toLocaleString('en-US',{minimumFractionDigits:2})}</h1>
    <p style="color:#f59e0b;font-size:11px;margin:0;letter-spacing:2px;font-weight:500;font-family:'Montserrat',Arial,sans-serif;">• PENDING REVIEW</p>
  </div>
  <div style="height:1px;background:linear-gradient(90deg,transparent,#f59e0b,transparent);margin:0 0 24px;"></div>
  <p style="color:#ffffff;font-size:13px;margin:0 0 16px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name||'Valued Client'},</p>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 20px;line-height:1.9;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Your withdrawal request has been received and is currently under review by our finance team. You will be notified once it has been processed.</p>
  <table width="100%" style="margin:0 0 24px;background:#0d1117;border:1px solid #1a1a1a;border-collapse:collapse;">
    <tr style="border-bottom:1px solid #1a1a1a;"><td style="padding:12px 16px;color:#505050;font-size:10px;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">AMOUNT</td><td align="right" style="padding:12px 16px;color:#ffffff;font-size:13px;font-weight:500;font-family:'Montserrat',Arial,sans-serif;">${currency} ${parseFloat(amount||0).toLocaleString('en-US',{minimumFractionDigits:2})}</td></tr>
    <tr style="border-bottom:1px solid #1a1a1a;"><td style="padding:12px 16px;color:#505050;font-size:10px;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">METHOD</td><td align="right" style="padding:12px 16px;color:#ffffff;font-size:11px;font-family:'Montserrat',Arial,sans-serif;">${method||'Crypto'}</td></tr>
    <tr><td style="padding:12px 16px;color:#505050;font-size:10px;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">STATUS</td><td align="right" style="padding:12px 16px;"><span style="background:#1c1400;color:#f59e0b;font-size:10px;font-weight:500;padding:4px 10px;font-family:'Montserrat',Arial,sans-serif;letter-spacing:1px;">PENDING</span></td></tr>
  </table>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 24px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Processing typically takes 24-48 hours. If you have any questions, please contact our support team.</p>
  <div style="text-align:center;"><a href="https://quantyrexmarkets.vercel.app/dashboard/withdraw" style="display:inline-block;color:#f59e0b;font-size:10px;font-weight:500;padding:12px 32px;text-decoration:none;letter-spacing:2px;border:1px solid #f59e0b;font-family:'Montserrat',Arial,sans-serif;">CHECK STATUS</a></div>
  <p style="color:#505050;font-size:10px;margin:24px 0 0;text-align:center;font-family:'Montserrat',Arial,sans-serif;">The Quantyrex Markets Finance Team</p>
`);
module.exports = withdrawalPendingEmail;
