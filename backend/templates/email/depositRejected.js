const baseTemplate = require('./base');
const depositRejectedEmail = (name, amount, currency, reason) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 24px;">
    <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 16px auto;"><tr><td width="68" height="68" align="center" valign="middle" style="width:68px;height:68px;border-radius:34px;background:#ef444415;border:2px solid #ef4444;"><img src="https://img.icons8.com/sf-regular/48/ef4444/multiply.png" width="32" height="32" alt="" style="display:block;margin:auto;" /></td></tr></table>
    <p style="color:#505050;font-size:10px;margin:0 0 8px;letter-spacing:3px;font-family:'Montserrat',Arial,sans-serif;">DEPOSIT UPDATE</p>
    <h1 style="color:#ffffff;font-size:28px;font-weight:300;margin:0 0 4px;font-family:'Montserrat',Arial,sans-serif;">${currency} ${parseFloat(amount||0).toLocaleString('en-US',{minimumFractionDigits:2})}</h1>
    <p style="color:#ef4444;font-size:11px;margin:0;letter-spacing:2px;font-weight:500;font-family:'Montserrat',Arial,sans-serif;">• NOT CONFIRMED</p>
  </div>
  <div style="height:1px;background:linear-gradient(90deg,transparent,#ef4444,transparent);margin:0 0 24px;"></div>
  <p style="color:#ffffff;font-size:13px;margin:0 0 16px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name||'Valued Client'},</p>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 20px;line-height:1.9;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">We were unable to confirm your deposit at this time. Please review the reason below and try again or contact our support team.</p>
  ${reason ? '<div style="background:#0d1117;border-left:3px solid #ef4444;padding:14px 16px;margin:0 0 20px;"><p style="color:#505050;font-size:10px;margin:0 0 6px;letter-spacing:1px;font-family:Montserrat,Arial,sans-serif;">REASON</p><p style="color:#ef4444;font-size:12px;margin:0;line-height:1.7;font-family:Montserrat,Arial,sans-serif;font-weight:300;">'+reason+'</p></div>' : ''}
  <div style="text-align:center;"><a href="https://quantyrexmarkets.vercel.app/dashboard/deposit" style="display:inline-block;color:#6366f1;font-size:10px;font-weight:500;padding:12px 32px;text-decoration:none;letter-spacing:2px;border:1px solid #6366f1;font-family:'Montserrat',Arial,sans-serif;">TRY AGAIN</a></div>
  <p style="color:#505050;font-size:10px;margin:24px 0 0;text-align:center;font-family:'Montserrat',Arial,sans-serif;">The Quantyrex Markets Finance Team</p>
`);
module.exports = depositRejectedEmail;
