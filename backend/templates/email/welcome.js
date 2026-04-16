const baseTemplate = require('./base');
const welcomeEmail = (name) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 30px;">
    <div style="display:inline-block;background:linear-gradient(135deg,#6366f1,#4f46e5);padding:16px;border-radius:50%;margin-bottom:16px;">
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#080e1a" stroke="#ffffff" stroke-width="1.5"/><path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#ffffff" stroke="#ffffff" stroke-width="1"/></svg>
    </div>
    <h1 style="color:#ffffff;font-size:22px;font-weight:300;margin:0 0 8px;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">Welcome to <span style="color:#6366f1;font-weight:500;">Quantyrex</span></h1>
    <p style="color:#505050;font-size:11px;margin:0;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">YOUR INVESTMENT JOURNEY BEGINS</p>
  </div>

  <div style="height:1px;background:linear-gradient(90deg,transparent,#6366f1,transparent);margin:0 0 28px;"></div>

  <p style="color:#ffffff;font-size:13px;margin:0 0 16px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear <span style="color:#6366f1;font-weight:500;">${name || 'Valued Client'}</span>,</p>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 24px;line-height:1.9;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">We are thrilled to welcome you to Quantyrex Markets. Your account has been created and you are now part of an exclusive community of investors growing their wealth every day.</p>

  <table width="100%" style="margin:0 0 24px;border-collapse:collapse;">
    <tr>
      <td width="33%" style="padding:16px 8px;text-align:center;border:1px solid #1a1a1a;background:#0d1117;">
        <p style="color:#6366f1;font-size:18px;margin:0 0 4px;font-family:'Montserrat',Arial,sans-serif;">📈</p>
        <p style="color:#ffffff;font-size:10px;margin:0;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Smart Trading</p>
      </td>
      <td width="33%" style="padding:16px 8px;text-align:center;border:1px solid #1a1a1a;background:#0d1117;border-left:none;">
        <p style="color:#6366f1;font-size:18px;margin:0 0 4px;font-family:'Montserrat',Arial,sans-serif;">🔒</p>
        <p style="color:#ffffff;font-size:10px;margin:0;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Secure Platform</p>
      </td>
      <td width="33%" style="padding:16px 8px;text-align:center;border:1px solid #1a1a1a;background:#0d1117;border-left:none;">
        <p style="color:#6366f1;font-size:18px;margin:0 0 4px;font-family:'Montserrat',Arial,sans-serif;">💰</p>
        <p style="color:#ffffff;font-size:10px;margin:0;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Daily Returns</p>
      </td>
    </tr>
  </table>

  <p style="color:#9ca3af;font-size:12px;margin:0 0 28px;line-height:1.9;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Complete your profile, verify your identity, and make your first deposit to start earning. Our support team is available 24/7 to guide you.</p>

  <div style="text-align:center;margin:0 0 24px;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:500;padding:14px 40px;text-decoration:none;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">GET STARTED →</a>
  </div>

  <p style="color:#505050;font-size:10px;margin:24px 0 0;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;text-align:center;">The Quantyrex Markets Team</p>
`);
module.exports = welcomeEmail;
