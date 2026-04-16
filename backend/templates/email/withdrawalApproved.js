const baseTemplate = require('./base');
const withdrawalApprovedEmail = (name, amount, currency, method, newBalance) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 24px;">
    <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 16px auto;"><tr><td width="68" height="68" align="center" valign="middle" style="width:68px;height:68px;border-radius:34px;background:#22c55e15;border:2px solid #22c55e;"><img src="https://img.icons8.com/sf-regular/48/22c55e/money.png" width="32" height="32" alt="" style="display:block;margin:auto;" /></td></tr></table>
    <p style="color:#505050;font-size:10px;margin:0 0 8px;letter-spacing:3px;">TRANSACTION RECEIPT</p>
    <h1 style="color:#ffffff;font-size:28px;font-weight:300;margin:0 0 4px;">${currency} ${parseFloat(amount||0).toLocaleString('en-US',{minimumFractionDigits:2})}</h1>
    <p style="color:#22c55e;font-size:11px;margin:0;letter-spacing:2px;font-weight:500;">● APPROVED</p>
  </div>
  <div style="height:1px;background:linear-gradient(90deg,transparent,#22c55e,transparent);margin:0 0 24px;"></div>
  <p style="color:#ffffff;font-size:13px;margin:0 0 16px;line-height:1.7;font-weight:300;">Dear ${name||'Valued Client'},</p>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 16px;line-height:1.9;font-weight:300;">We are pleased to inform you that your withdrawal request has been successfully approved. Your funds are now being transferred and should reflect in your selected payment method shortly.</p>
  <table width="100%" style="margin:0 0 24px;background:#0d1117;border:1px solid #1a1a1a;border-collapse:collapse;">
    <tr style="border-bottom:1px solid #1a1a1a;"><td style="padding:12px 16px;color:#505050;font-size:10px;letter-spacing:1px;">AMOUNT</td><td align="right" style="padding:12px 16px;color:#22c55e;font-size:13px;font-weight:500;">${currency} ${parseFloat(amount||0).toLocaleString('en-US',{minimumFractionDigits:2})}</td></tr>
    <tr style="border-bottom:1px solid #1a1a1a;"><td style="padding:12px 16px;color:#505050;font-size:10px;letter-spacing:1px;">METHOD</td><td align="right" style="padding:12px 16px;color:#ffffff;font-size:11px;">${method||'Crypto'}</td></tr>
    <tr><td style="padding:12px 16px;color:#505050;font-size:10px;letter-spacing:1px;">BALANCE</td><td align="right" style="padding:12px 16px;color:#ffffff;font-size:11px;">${currency} ${parseFloat(newBalance||0).toLocaleString('en-US',{minimumFractionDigits:2})}</td></tr>
  </table>
  <p style="color:#9ca3af;font-size:11px;margin:0 0 20px;line-height:1.8;font-weight:300;">If you do not receive your funds within the expected timeframe, please contact our support team for assistance. Thank you for trusting Quantyrex Markets.</p>
  <div style="text-align:center;"><a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;color:#6366f1;font-size:10px;font-weight:500;padding:12px 32px;text-decoration:none;letter-spacing:2px;border:1px solid #6366f1;">VIEW DASHBOARD →</a></div>
`);
module.exports = withdrawalApprovedEmail;
