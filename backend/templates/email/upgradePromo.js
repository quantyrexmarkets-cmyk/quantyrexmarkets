const baseTemplate = require('./base');
const upgradePromoEmail = (name) => baseTemplate(`
  <div style="text-align:center;padding:10px 0 28px;">
    <p style="color:#6366f1;font-size:10px;margin:0 0 12px;letter-spacing:3px;font-family:'Montserrat',Arial,sans-serif;">EXCLUSIVE OFFER</p>
    <h1 style="color:#ffffff;font-size:22px;font-weight:300;margin:0 0 8px;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">Unlock Your Full Potential</h1>
    <p style="color:#9ca3af;font-size:12px;margin:0;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Upgrade your account for higher returns</p>
  </div>

  <div style="height:1px;background:linear-gradient(90deg,transparent,#6366f1,transparent);margin:0 0 28px;"></div>

  <p style="color:#ffffff;font-size:13px;margin:0 0 16px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear <span style="color:#6366f1;">${name || 'Valued Client'}</span>,</p>
  <p style="color:#9ca3af;font-size:12px;margin:0 0 24px;line-height:1.9;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Take your investments to the next level with our premium account plans. Each plan unlocks higher returns, lower fees, and exclusive features.</p>

  <table width="100%" style="margin:0 0 8px;border-collapse:collapse;">
    ${['BRONZE','SILVER','GOLD','PLATINUM','DIAMOND','ELITE'].map((plan,i)=>{
      const colors=['#CD7F32','#C0C0C0','#FFD700','#E5E4E2','#00BFFF','#8B0000'];
      const apys=['10%','15%','20%','25%','30%','40%'];
      return `<tr><td style="padding:10px 16px;border:1px solid #1a1a1a;background:#0d1117;border-bottom:none;">
        <table width="100%"><tr>
          <td><span style="color:${colors[i]||'#6366f1'};font-size:11px;font-weight:500;letter-spacing:1px;font-family:'Montserrat',Arial,sans-serif;">${plan}</span></td>
          <td align="right"><span style="color:#22c55e;font-size:11px;font-weight:500;font-family:'Montserrat',Arial,sans-serif;">${apys[i]} APY</span></td>
        </tr></table>
      </td></tr>`;
    }).join('')}
    <tr><td style="padding:0;border:1px solid #1a1a1a;background:#0d1117;height:1px;"></td></tr>
  </table>

  <div style="text-align:center;margin:24px 0;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard/packages" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:500;padding:14px 40px;text-decoration:none;letter-spacing:2px;font-family:'Montserrat',Arial,sans-serif;">VIEW ALL PLANS →</a>
  </div>

  <p style="color:#505050;font-size:10px;margin:24px 0 0;text-align:center;font-family:'Montserrat',Arial,sans-serif;">The Quantyrex Markets Team</p>
`);
module.exports = upgradePromoEmail;
