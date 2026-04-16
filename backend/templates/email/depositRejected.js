const baseTemplate = require('./base');
const depositRejectedEmail = (name, amount, currency, reason) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 24px;">
    <p style="color:#505050;font-size:10px;margin:0 0 12px;letter-spacing:3px;font-family:'Montserrat',Arial,sans-serif;">DEPOSIT UPDATE</p>
    <h1 style="color:#ffffff;font-size:28px;font-weight:300;margin:0 0 4px;font-family:'Montserrat',Arial,sans-serif;">${currency} ${parseFloat(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
    <p style="color:#ef4444;font-size:11px;margin:0;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;font-weight:500;">● NOT CONFIRMED</p>
  </div>

  <div style="height:1px;background:linear-gradient(90deg,transparent,#ef4444,transparent);margin:0 0 24px;"></div>

  <p style="color:#9ca3af;font-size:12px;margin:0 0 20px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name || 'Valued Client'}, we were unable to confirm your deposit at this time.</p>

  ${reason ? `<table width="100%" style="margin:0 0 24px;background:#0d1117;border:1px solid #2d1212;"><tr><td style="padding:16px;"><p style="color:#505050;font-size:10px;margin:0 0 8px;font-family:'Montserrat',Arial,sans-serif;letter-spacing:1px;">REASON</p><p style="color:#ef4444;font-size:12px;margin:0;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">${reason}</p></td></tr></table>` : ''}

  <p style="color:#9ca3af;font-size:11px;margin:0 0 24px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Please try again or contact our support team for assistance with your deposit.</p>

  <div style="text-align:center;margin:0 0 24px;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard/deposit" style="display:inline-block;background:transparent;color:#6366f1;font-size:10px;font-weight:500;padding:12px 32px;text-decoration:none;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;border:1px solid #6366f1;">TRY AGAIN →</a>
  </div>

  <p style="color:#505050;font-size:10px;margin:24px 0 0;text-align:center;font-family:'Montserrat',Arial,sans-serif;">The Quantyrex Markets Finance Team</p>
`);
module.exports = depositRejectedEmail;
