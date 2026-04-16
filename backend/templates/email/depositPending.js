const baseTemplate = require('./base');
const depositPendingEmail = (name, amount, currency, method) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 24px;">
    <p style="color:#505050;font-size:10px;margin:0 0 12px;letter-spacing:3px;font-family:'Montserrat',Arial,sans-serif;">DEPOSIT RECEIVED</p>
    <h1 style="color:#ffffff;font-size:28px;font-weight:300;margin:0 0 4px;font-family:'Montserrat',Arial,sans-serif;">${currency} ${parseFloat(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
    <p style="color:#f59e0b;font-size:11px;margin:0;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;font-weight:500;">● UNDER REVIEW</p>
  </div>

  <div style="height:1px;background:linear-gradient(90deg,transparent,#f59e0b,transparent);margin:0 0 24px;"></div>

  <p style="color:#9ca3af;font-size:12px;margin:0 0 20px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name || 'Valued Client'}, we have received your deposit request and it is currently being reviewed by our team.</p>

  <table width="100%" style="margin:0 0 24px;background:#0d1117;border:1px solid #1a1a1a;border-collapse:collapse;">
    <tr style="border-bottom:1px solid #1a1a1a;">
      <td style="padding:12px 16px;color:#505050;font-size:10px;font-family:'Montserrat',Arial,sans-serif;letter-spacing:1px;">AMOUNT</td>
      <td align="right" style="padding:12px 16px;color:#ffffff;font-size:13px;font-weight:500;font-family:'Montserrat',Arial,sans-serif;">${currency} ${parseFloat(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
    </tr>
    <tr style="border-bottom:1px solid #1a1a1a;">
      <td style="padding:12px 16px;color:#505050;font-size:10px;font-family:'Montserrat',Arial,sans-serif;letter-spacing:1px;">METHOD</td>
      <td align="right" style="padding:12px 16px;color:#ffffff;font-size:11px;font-family:'Montserrat',Arial,sans-serif;">${method || 'Crypto'}</td>
    </tr>
    <tr>
      <td style="padding:12px 16px;color:#505050;font-size:10px;font-family:'Montserrat',Arial,sans-serif;letter-spacing:1px;">STATUS</td>
      <td align="right" style="padding:12px 16px;"><span style="background:#1c1400;color:#f59e0b;font-size:10px;font-weight:500;padding:4px 10px;font-family:'Montserrat',Arial,sans-serif;letter-spacing:1px;">REVIEWING</span></td>
    </tr>
  </table>

  <p style="color:#9ca3af;font-size:11px;margin:0 0 24px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Your deposit will be credited to your account once verification is complete. This typically takes 1-3 business hours.</p>

  <p style="color:#505050;font-size:10px;margin:24px 0 0;text-align:center;font-family:'Montserrat',Arial,sans-serif;">The Quantyrex Markets Finance Team</p>
`);
module.exports = depositPendingEmail;
