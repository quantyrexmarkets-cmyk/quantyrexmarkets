const baseTemplate = require('./base');

const kycRejectedEmail = (name, reason) => baseTemplate(`
  <h2 style="color:#1e293b;margin:0 0 20px;font-size:22px;">KYC Verification Update ⚠️</h2>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 15px;">
    Hi <strong>${name}</strong>,
  </p>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 25px;">
    We've reviewed your KYC documents and unfortunately, we couldn't verify your identity. Please see the details below.
  </p>
  
  <div style="background:linear-gradient(135deg, #ef4444 0%, #f87171 100%);padding:25px;border-radius:12px;text-align:center;margin:30px 0;">
    <div style="width:60px;height:60px;background:rgba(255,255,255,0.2);border-radius:50%;margin:0 auto 15px;display:flex;align-items:center;justify-content:center;">
      <span style="font-size:30px;">✗</span>
    </div>
    <h3 style="color:white;margin:0;font-size:18px;">Verification Failed</h3>
  </div>
  
  <table width="100%" cellpadding="0" cellspacing="0" style="margin:25px 0;">
    <tr>
      <td style="padding:12px;border-bottom:1px solid #e2e8f0;">
        <span style="color:#64748b;font-size:13px;">Reason</span>
      </td>
      <td align="right" style="padding:12px;border-bottom:1px solid #e2e8f0;">
        <strong style="color:#dc2626;font-size:14px;">${reason || 'Documents unclear or invalid'}</strong>
      </td>
    </tr>
  </table>
  
  <div style="background:#fef2f2;border-left:4px solid #ef4444;padding:15px 20px;margin:25px 0;border-radius:6px;">
    <h4 style="color:#991b1b;margin:0 0 10px;">📋 Common issues:</h4>
    <ul style="color:#991b1b;margin:0;padding-left:20px;font-size:13px;">
      <li style="margin:5px 0;">Blurry or low-quality images</li>
      <li style="margin:5px 0;">Document expired or invalid</li>
      <li style="margin:5px 0;">Information doesn't match</li>
      <li style="margin:5px 0;">Selfie not clearly showing your face with ID</li>
    </ul>
  </div>
  
  <div style="text-align:center;margin:30px 0;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard/kyc" 
       style="background:#6366f1;color:white;padding:14px 35px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">
      Submit New Documents →
    </a>
  </div>
  
  <p style="color:#334155;margin:20px 0 0;">
    Best regards,<br/>
    <strong>Quantyrex Markets Team</strong>
  </p>
`);

module.exports = kycRejectedEmail;
