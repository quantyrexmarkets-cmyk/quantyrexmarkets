const baseTemplate = require('./base');
const welcomeEmail = (name) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 28px;">
    <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 16px auto;"><tr><td width="68" height="68" align="center" valign="middle" style="width:68px;height:68px;border-radius:34px;background:#6366f115;border:2px solid #6366f1;"><img src="https://img.icons8.com/sf-regular/48/6366f1/rocket.png" width="32" height="32" alt="" style="display:block;margin:auto;" /></td></tr></table>
    <h1 style="color:#ffffff;font-size:20px;font-weight:300;margin:0 0 8px;letter-spacing:1px;">Welcome to <span style='color:#6366f1;'>Quantyrex</span></h1>
    <p style="color:#505050;font-size:10px;margin:0;letter-spacing:2px;">YOUR INVESTMENT JOURNEY BEGINS</p>
  </div>
  <div style="height:1px;background:linear-gradient(90deg,transparent,#6366f1,transparent);margin:0 0 28px;"></div>
  <p style="color:#ffffff;font-size:13px;margin:0 0 16px;line-height:1.7;font-weight:300;">Dear <span style="color:#6366f1;">${name||'Valued Client'}</span>,</p>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 20px;line-height:1.9;font-weight:300;">We are thrilled to welcome you to Quantyrex Markets. Your account has been created and you are now part of an exclusive community of investors growing their wealth every day.</p>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 20px;line-height:1.9;font-weight:300;">At Quantyrex Markets, we are committed to providing you with a secure, reliable, and rewarding investment experience. Our platform is designed to help you manage your portfolio with ease while maximizing your earning potential.</p>
  <table width="100%" style="margin:0 0 24px;border-collapse:collapse;">
    <tr>
      <td width="33%" style="padding:16px 8px;text-align:center;border:1px solid #1a1a1a;background:#0d1117;">
        <img src="https://img.icons8.com/sf-regular/32/6366f1/combo-chart.png" width="28" height="28" style="display:block;margin:0 auto 8px;" />
        <p style="color:#ffffff;font-size:10px;margin:0;font-weight:300;">Smart Trading</p>
      </td>
      <td width="33%" style="padding:16px 8px;text-align:center;border:1px solid #1a1a1a;background:#0d1117;border-left:none;">
        <img src="https://img.icons8.com/sf-regular/32/6366f1/shield.png" width="28" height="28" style="display:block;margin:0 auto 8px;" />
        <p style="color:#ffffff;font-size:10px;margin:0;font-weight:300;">Secure Platform</p>
      </td>
      <td width="33%" style="padding:16px 8px;text-align:center;border:1px solid #1a1a1a;background:#0d1117;border-left:none;">
        <img src="https://img.icons8.com/sf-regular/32/6366f1/money.png" width="28" height="28" style="display:block;margin:0 auto 8px;" />
        <p style="color:#ffffff;font-size:10px;margin:0;font-weight:300;">Daily Returns</p>
      </td>
    </tr>
  </table>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 20px;line-height:1.9;font-weight:300;">Here is what you can do next: complete your profile, verify your identity (KYC), make your first deposit, and explore our investment plans. Our support team is available 24/7 to guide you every step of the way.</p>
  <div style="text-align:center;margin:24px 0;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:#6366f1;color:#6366f1;font-size:11px;font-weight:500;padding:14px 40px;text-decoration:none;letter-spacing:2px;">GET STARTED →</a>
  </div>
  <p style="color:#505050;font-size:10px;margin:24px 0 0;text-align:center;">The Quantyrex Markets Team</p>
`);
module.exports = welcomeEmail;
