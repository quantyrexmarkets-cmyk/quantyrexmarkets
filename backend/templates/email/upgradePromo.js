const baseTemplate = require('./base-enhanced');

const upgradePromoEmail = (name) => baseTemplate(`

  <p style="color:#818cf8;font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">EXCLUSIVE OFFER</p>
  <h1 style="color:#ffffff;font-size:24px;font-weight:300;margin:0 0 6px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">Unlock Your Full Potential</h1>
  <p style="color:#a0a0a0;font-size:12px;margin:0 0 32px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">Upgrade your account for higher returns</p>

  <p style="color:#a1a1aa;font-size:13px;margin:0 0 24px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, take your investments to the next level with our premium plans. Each plan unlocks higher returns and exclusive features.
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background-color:#121212;">
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1a1a1a;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#cd7f32;font-size:11px;font-weight:500;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">BRONZE</td>
          <td align="right" style="color:#22c55e;font-size:11px;font-weight:500;font-family:'Helvetica Neue',Arial,sans-serif;">10% APY</td>
        </tr></table>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1a1a1a;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#c0c0c0;font-size:11px;font-weight:500;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">SILVER</td>
          <td align="right" style="color:#22c55e;font-size:11px;font-weight:500;font-family:'Helvetica Neue',Arial,sans-serif;">15% APY</td>
        </tr></table>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1a1a1a;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#ffd700;font-size:11px;font-weight:500;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">GOLD</td>
          <td align="right" style="color:#22c55e;font-size:11px;font-weight:500;font-family:'Helvetica Neue',Arial,sans-serif;">20% APY</td>
        </tr></table>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1a1a1a;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#e5e4e2;font-size:11px;font-weight:500;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">PLATINUM</td>
          <td align="right" style="color:#22c55e;font-size:11px;font-weight:500;font-family:'Helvetica Neue',Arial,sans-serif;">25% APY</td>
        </tr></table>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1a1a1a;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#00bfff;font-size:11px;font-weight:500;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">DIAMOND</td>
          <td align="right" style="color:#22c55e;font-size:11px;font-weight:500;font-family:'Helvetica Neue',Arial,sans-serif;">30% APY</td>
        </tr></table>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#a78bfa;font-size:11px;font-weight:500;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">ELITE</td>
          <td align="right" style="color:#22c55e;font-size:11px;font-weight:500;font-family:'Helvetica Neue',Arial,sans-serif;">40% APY</td>
        </tr></table>
      </td>
    </tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard/packages" style="display:inline-block;background-color:#818cf8;color:#ffffff;font-size:11px;font-weight:500;padding:14px 44px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">VIEW ALL PLANS</a>
      </td>
    </tr>
  </table>

  <p style="color:#71717a;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Team</p>

`);

module.exports = upgradePromoEmail;
