const baseTemplate = require('./base');

const upgradePromoEmail = (name) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;">
    Dear ${name || 'Valued Client'},
  </p>
  
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">
    We have an exclusive upgrade opportunity just for you!
  </p>
  
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">
    Upgrade your account today to unlock premium features and enhanced earning potential.
  </p>
  
  <a href="https://quantyrexmarketsy.vercel.app/dashboard/account" 
     style="display:inline-block;background:#6366f1;color:#ffffff;font-size:12px;font-weight:500;padding:14px 32px;text-decoration:none;letter-spacing:0.5px;margin-bottom:24px;">
    UPGRADE NOW
  </a>
  
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">
    Thank you for being a valued member of Quantyrex Markets.
  </p>
  
  <p style="color:#666666;font-size:11px;margin:30px 0 0;line-height:1.7;">
    Best regards,<br/>
    <span style="color:#888888;">The Quantyrex Markets Team</span>
  </p>
`);

module.exports = upgradePromoEmail;
