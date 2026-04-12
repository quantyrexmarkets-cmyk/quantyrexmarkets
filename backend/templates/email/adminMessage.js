const baseTemplate = require('./base');

const adminMessageEmail = (name, subject, message) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#888888;font-size:12px;margin:0 0 30px;line-height:1.8;white-space:pre-line;">${message || 'You have a new notification from Quantyrex Markets.'}</p>
  <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:12px;font-weight:500;padding:14px 32px;text-decoration:none;letter-spacing:0.5px;margin-bottom:24px;">VIEW DASHBOARD</a>
  <p style="color:#666666;font-size:11px;margin:30px 0 0;line-height:1.7;">Warm regards,<br/><span style="color:#888888;">The Quantyrex Markets Team</span></p>
`);

module.exports = adminMessageEmail;
