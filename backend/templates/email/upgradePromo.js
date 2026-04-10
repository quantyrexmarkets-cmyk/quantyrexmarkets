const baseTemplate = require('./base');

const upgradePromoEmail = (name) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 25px;line-height:1.7;">
    Hi ${name},
  </p>
  
  <p style="color:#888888;font-size:12px;margin:0 0 25px;line-height:1.7;">
    Upgrade your account to unlock premium features and higher profits.
  </p>
  
  <a href="https://quantyrexmarkets.vercel.app/dashboard/packages" 
     style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:500;padding:12px 28px;text-decoration:none;letter-spacing:0.5px;">
    VIEW PACKAGES
  </a>
`);

module.exports = upgradePromoEmail;
