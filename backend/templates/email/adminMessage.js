const baseTemplate = require('./base');

const adminMessageEmail = (name, subject, message) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 25px;line-height:1.7;">
    Hi ${name || 'User'},
  </p>
  
  <p style="color:#888888;font-size:12px;margin:0 0 30px;line-height:1.8;white-space:pre-line;">
    ${message || 'You have a new notification from Quantyrex Markets.'}
  </p>
  
  <a href="https://quantyrexmarkets.vercel.app/dashboard" 
     style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:500;padding:12px 28px;text-decoration:none;letter-spacing:0.5px;">
    VIEW DASHBOARD
  </a>
`);

module.exports = adminMessageEmail;
