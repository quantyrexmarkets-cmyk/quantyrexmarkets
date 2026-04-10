const baseTemplate = require('./base');

const upgradePromoEmail = (name) => baseTemplate(`
  <h2 style="color:#1e293b;margin:0 0 20px;font-size:22px;">Special Upgrade Offer! 🎁</h2>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 15px;">
    Hi <strong>${name}</strong>,
  </p>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 25px;">
    We have an exclusive upgrade opportunity for you! Take your trading to the next level with our premium packages.
  </p>
  
  <div style="background:linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);padding:30px;border-radius:12px;text-align:center;margin:30px 0;">
    <h3 style="color:white;margin:0 0 10px;font-size:24px;">🌟 Limited Time Offer</h3>
    <p style="color:rgba(255,255,255,0.9);margin:0;font-size:15px;">Upgrade now and unlock premium features</p>
  </div>
  
  <div style="background:#f0fdf4;border-left:4px solid #22c55e;padding:15px 20px;margin:25px 0;border-radius:6px;">
    <h4 style="color:#166534;margin:0 0 10px;">✨ Premium Benefits:</h4>
    <ul style="color:#166534;margin:0;padding-left:20px;font-size:13px;">
      <li style="margin:5px 0;">Higher profit margins</li>
      <li style="margin:5px 0;">Faster withdrawals</li>
      <li style="margin:5px 0;">Personal account manager</li>
      <li style="margin:5px 0;">Exclusive trading signals</li>
      <li style="margin:5px 0;">VIP customer support</li>
    </ul>
  </div>
  
  <div style="text-align:center;margin:30px 0;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard/packages" 
       style="background:#6366f1;color:white;padding:14px 35px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">
      View Packages →
    </a>
  </div>
  
  <p style="color:#334155;margin:20px 0 0;">
    Best regards,<br/>
    <strong>Quantyrex Markets Team</strong>
  </p>
`);

module.exports = upgradePromoEmail;
