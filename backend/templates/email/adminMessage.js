const baseTemplate = require('./base');

const adminMessageEmail = (name, subject, message) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 30px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;white-space:pre-line;">${message || 'You have a new notification from Quantyrex Markets. Please log in to your dashboard for more details.'}</p>
  <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:400;padding:14px 32px;text-decoration:none;letter-spacing:1px;margin-bottom:24px;font-family:'Montserrat',Arial,sans-serif;">VIEW DASHBOARD</a>
  <p style="color:#ffffff;font-size:12px;margin:24px 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">If you have any questions or need assistance, our support team is always available to help.</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Thank you for choosing Quantyrex Markets.</p>
  <p style="color:#ffffff;font-size:11px;margin:30px 0 0;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Warm regards,<br/><span style="color:#ffffff;">The Quantyrex Markets Team</span></p>
`);

module.exports = adminMessageEmail;
