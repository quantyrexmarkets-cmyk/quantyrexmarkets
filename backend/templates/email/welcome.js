const baseTemplate = require('./base');

const welcomeEmail = (name) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 25px;line-height:1.7;">
    Hi ${name},
  </p>
  
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.7;">
    Welcome to Quantyrex Markets. Your account has been created successfully.
  </p>
  
  <p style="color:#888888;font-size:12px;margin:0 0 30px;line-height:1.7;">
    To get started, complete your KYC verification and make your first deposit.
  </p>
  
  <a href="https://quantyrexmarkets.vercel.app/dashboard" 
     style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:500;padding:12px 28px;text-decoration:none;letter-spacing:0.5px;">
    GO TO DASHBOARD
  </a>
  
  <p style="color:#666666;font-size:11px;margin:40px 0 0;line-height:1.7;">
    Best regards,<br/>
    Quantyrex Markets
  </p>
`);

module.exports = welcomeEmail;
