const baseTemplate = require('./base');

const welcomeEmail = (name) => baseTemplate(`
  <h2 style="color:#1e293b;margin:0 0 20px;font-size:22px;">Welcome to Quantyrex Markets! 🎉</h2>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 15px;">
    Hi <strong>${name}</strong>,
  </p>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 15px;">
    Thank you for joining Quantyrex Markets! We're excited to have you on board.
  </p>
  
  <div style="background:#f8fafc;border-left:4px solid #6366f1;padding:15px 20px;margin:25px 0;border-radius:6px;">
    <h3 style="color:#1e293b;margin:0 0 10px;font-size:16px;">🚀 Getting Started</h3>
    <ul style="color:#475569;margin:0;padding-left:20px;">
      <li style="margin:8px 0;">Complete your KYC verification for full access</li>
      <li style="margin:8px 0;">Make your first deposit to start trading</li>
      <li style="margin:8px 0;">Explore our investment packages</li>
      <li style="margin:8px 0;">Enable 2FA for enhanced security</li>
    </ul>
  </div>
  
  <div style="text-align:center;margin:30px 0;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard" 
       style="background:#6366f1;color:white;padding:14px 35px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;box-shadow:0 4px 12px rgba(99,102,241,0.3);">
      Go to Dashboard →
    </a>
  </div>
  
  <p style="color:#64748b;font-size:13px;line-height:1.6;margin:25px 0 0;">
    If you have any questions, our support team is here to help 24/7.
  </p>
  
  <p style="color:#334155;margin:20px 0 0;">
    Best regards,<br/>
    <strong>The Quantyrex Markets Team</strong>
  </p>
`);

module.exports = welcomeEmail;
