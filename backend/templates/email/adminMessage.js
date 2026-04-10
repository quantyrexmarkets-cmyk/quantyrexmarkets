const baseTemplate = require('./base');

const adminMessageEmail = (name, subject, message) => baseTemplate(`
  <h2 style="color:#1e293b;margin:0 0 20px;font-size:22px;">${subject || 'Message from Quantyrex Markets'}</h2>
  
  <p style="color:#334155;line-height:1.6;margin:0 0 15px;">
    Hi <strong>${name}</strong>,
  </p>
  
  <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:20px;border-radius:8px;margin:25px 0;">
    <p style="color:#334155;line-height:1.8;margin:0;white-space:pre-line;">${message}</p>
  </div>
  
  <div style="text-align:center;margin:30px 0;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard" 
       style="background:#6366f1;color:white;padding:14px 35px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">
      Go to Dashboard →
    </a>
  </div>
  
  <p style="color:#334155;margin:20px 0 0;">
    Best regards,<br/>
    <strong>Quantyrex Markets Team</strong>
  </p>
`);

module.exports = adminMessageEmail;
