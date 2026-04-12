const baseTemplate = require('./base');

const registrationFeeEmail = (name, amount, currency) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">We would like to inform you that a registration fee has been applied to your account as part of your package activation.</p>
  <table width="100%" style="margin:20px 0;background:#0d1117;border:1px solid #1a1a1a;"><tr><td style="padding:16px;"><table width="100%">
    <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#ffffff;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Fee Amount</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><span style="color:#ffffff;font-size:12px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">${currency}${parseFloat(amount || 0).toFixed(2)}</span></td></tr>
    <tr><td style="padding:8px 0;"><span style="color:#ffffff;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Purpose</span></td><td align="right" style="padding:8px 0;"><span style="color:#ffffff;font-size:12px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Account Activation</span></td></tr>
  </table></td></tr></table>
  <p style="color:#ffffff;font-size:12px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">This fee is required to complete your registration and unlock full access to the platform features.</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 12px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Once completed, you will be able to:</p>
  <ul style="color:#6366f1;font-size:12px;margin:0 0 20px;padding-left:20px;line-height:2;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">
    <li><span style="color:#6366f1;">Access all investment features</span></li>
    <li><span style="color:#6366f1;">Process deposits and withdrawals</span></li>
    <li><span style="color:#6366f1;">Activate your trading tools</span></li>
  </ul>
  <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:400;padding:14px 32px;text-decoration:none;letter-spacing:1px;margin-bottom:24px;font-family:'Montserrat',Arial,sans-serif;">VIEW DASHBOARD</a>
  <p style="color:#ffffff;font-size:12px;margin:24px 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">If you have any questions, please contact our support team.</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Thank you for choosing Quantyrex Markets.</p>
  <p style="color:#ffffff;font-size:11px;margin:30px 0 0;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Warm regards,<br/><span style="color:#ffffff;">The Quantyrex Markets Team</span></p>
`);

module.exports = registrationFeeEmail;
