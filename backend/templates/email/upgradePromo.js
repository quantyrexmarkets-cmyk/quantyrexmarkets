const baseTemplate = require('./base-enhanced');

const upgradePromoEmail = (name) => baseTemplate(`

  <!-- ICON -->
  <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 24px auto;">
    <tr>
      <td width="80" height="80" align="center" valign="middle" style="width:80px;height:80px;background:linear-gradient(135deg,#3730a3,#6366f1);border-radius:50%;">
        <img src="https://img.icons8.com/sf-regular/48/ffffff/rocket.png" width="36" height="36" alt="" style="display:block;margin:auto;" />
      </td>
    </tr>
  </table>

  <!-- HEADLINE -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;">
    <tr>
      <td style="text-align:center;">
        <p style="margin:0 0 6px;color:#6366f1;font-size:10px;letter-spacing:3px;font-family:'Helvetica Neue',Arial,sans-serif;">EXCLUSIVE OFFER</p>
        <h1 style="margin:0 0 10px;color:#ffffff;font-size:24px;font-weight:300;font-family:'Helvetica Neue',Arial,sans-serif;">Unlock Your Full Potential</h1>
        <p style="margin:0;color:#475569;font-size:12px;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">Upgrade your account for higher returns</p>
      </td>
    </tr>
  </table>

  <!-- DIVIDER -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#6366f1,transparent);font-size:0;">&nbsp;</td></tr>
  </table>

  <p style="color:#94a3b8;font-size:13px;margin:0 0 24px;line-height:1.9;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, take your investments to the next level with our premium account plans. Each plan unlocks higher returns, lower fees, and exclusive features.
  </p>

  <!-- PLANS TABLE -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background:#111827;border:1px solid #1e293b;border-collapse:collapse;">
    <tr>
      <td colspan="2" style="padding:12px 20px;background:#0d1421;border-bottom:1px solid #1e293b;">
        <p style="color:#6366f1;font-size:9px;letter-spacing:2px;margin:0;font-family:'Helvetica Neue',Arial,sans-serif;">AVAILABLE PLANS</p>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 20px;border-bottom:1px solid #1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#cd7f32;font-size:11px;font-weight:500;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">BRONZE</td>
          <td align="right" style="color:#22c55e;font-size:11px;font-weight:500;font-family:'Helvetica Neue',Arial,sans-serif;">10% APY</td>
        </tr></table>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 20px;border-bottom:1px solid #1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#c0c0c0;font-size:11px;font-weight:500;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">SILVER</td>
          <td align="right" style="color:#22c55e;font-size:11px;font-weight:500;font-family:'Helvetica Neue',Arial,sans-serif;">15% APY</td>
        </tr></table>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 20px;border-bottom:1px solid #1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#ffd700;font-size:11px;font-weight:500;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">GOLD</td>
          <td align="right" style="color:#22c55e;font-size:11px;font-weight:500;font-family:'Helvetica Neue',Arial,sans-serif;">20% APY</td>
        </tr></table>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 20px;border-bottom:1px solid #1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#e5e4e2;font-size:11px;font-weight:500;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">PLATINUM</td>
          <td align="right" style="color:#22c55e;font-size:11px;font-weight:500;font-family:'Helvetica Neue',Arial,sans-serif;">25% APY</td>
        </tr></table>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 20px;border-bottom:1px solid #1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#00bfff;font-size:11px;font-weight:500;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">DIAMOND</td>
          <td align="right" style="color:#22c55e;font-size:11px;font-weight:500;font-family:'Helvetica Neue',Arial,sans-serif;">30% APY</td>
        </tr></table>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#a78bfa;font-size:11px;font-weight:500;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">ELITE</td>
          <td align="right" style="color:#22c55e;font-size:11px;font-weight:500;font-family:'Helvetica Neue',Arial,sans-serif;">40% APY</td>
        </tr></table>
      </td>
    </tr>
  </table>

  <!-- CTA -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard/packages" style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#ffffff;font-size:12px;font-weight:500;padding:16px 48px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">VIEW ALL PLANS &rarr;</a>
      </td>
    </tr>
  </table>

  <p style="color:#334155;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Team</p>

`);

module.exports = upgradePromoEmail;
