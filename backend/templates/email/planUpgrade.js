const baseTemplate = require('./base');

const planUpgradeEmail = (name, packageName, planDetails) => baseTemplate(`
  <h2 style="color:#1e293b;margin:0 0 20px;font-size:22px;">Account Upgraded! 🎉</h2>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 15px;">
    Hi <strong>${name}</strong>,
  </p>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 25px;">
    Congratulations! Your account has been upgraded to <strong>${packageName || 'Premium'}</strong> package.
  </p>
  
  <div style="background:linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);padding:30px;border-radius:12px;text-align:center;margin:30px 0;">
    <div style="width:60px;height:60px;background:rgba(255,255,255,0.2);border-radius:50%;margin:0 auto 15px;display:flex;align-items:center;justify-content:center;">
      <span style="font-size:30px;">⭐</span>
    </div>
    <h3 style="color:white;margin:0;font-size:24px;">${packageName || 'Premium'} Package</h3>
    <p style="color:rgba(255,255,255,0.8);margin:10px 0 0;font-size:14px;">${planDetails || 'Enhanced trading features unlocked'}</p>
  </div>
  
  <div style="background:#f0f9ff;border-left:4px solid #0ea5e9;padding:15px 20px;margin:25px 0;border-radius:6px;">
    <h4 style="color:#0369a1;margin:0 0 10px;">🎁 New Benefits:</h4>
    <ul style="color:#0369a1;margin:0;padding-left:20px;font-size:13px;">
      <li style="margin:5px 0;">Higher profit percentages</li>
      <li style="margin:5px 0;">Priority withdrawals</li>
      <li style="margin:5px 0;">Dedicated account manager</li>
      <li style="margin:5px 0;">Access to premium trading signals</li>
    </ul>
  </div>
  
  <div style="text-align:center;margin:30px 0;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard" 
       style="background:#6366f1;color:white;padding:14px 35px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">
      Explore Features →
    </a>
  </div>
  
  <p style="color:#334155;margin:20px 0 0;">
    Best regards,<br/>
    <strong>Quantyrex Markets Team</strong>
  </p>
`);

module.exports = planUpgradeEmail;
