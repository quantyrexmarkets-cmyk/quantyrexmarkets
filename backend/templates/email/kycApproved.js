const baseTemplate = require('./base');

const kycApprovedEmail = (name) => baseTemplate(`
  <h2 style="color:#1e293b;margin:0 0 20px;font-size:22px;">KYC Verification Approved ✅</h2>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 15px;">
    Hi <strong>${name}</strong>,
  </p>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 25px;">
    Congratulations! Your KYC verification has been approved. You now have full access to all features.
  </p>
  
  <div style="background:linear-gradient(135deg, #22c55e 0%, #4ade80 100%);padding:30px;border-radius:12px;text-align:center;margin:30px 0;">
    <div style="width:60px;height:60px;background:rgba(255,255,255,0.2);border-radius:50%;margin:0 auto 15px;display:flex;align-items:center;justify-content:center;">
      <span style="font-size:30px;">✓</span>
    </div>
    <h3 style="color:white;margin:0;font-size:20px;">Verified Account</h3>
  </div>
  
  <div style="background:#f0fdf4;border-left:4px solid #22c55e;padding:15px 20px;margin:25px 0;border-radius:6px;">
    <h4 style="color:#166534;margin:0 0 10px;">🎉 You can now:</h4>
    <ul style="color:#166534;margin:0;padding-left:20px;font-size:13px;">
      <li style="margin:5px 0;">Make unlimited deposits & withdrawals</li>
      <li style="margin:5px 0;">Access all trading features</li>
      <li style="margin:5px 0;">Join premium investment packages</li>
      <li style="margin:5px 0;">Use copy trading features</li>
    </ul>
  </div>
  
  <div style="text-align:center;margin:30px 0;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard" 
       style="background:#6366f1;color:white;padding:14px 35px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">
      Start Trading →
    </a>
  </div>
  
  <p style="color:#334155;margin:20px 0 0;">
    Best regards,<br/>
    <strong>Quantyrex Markets Team</strong>
  </p>
`);

module.exports = kycApprovedEmail;
