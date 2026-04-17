const baseTemplate = require('./base-enhanced');

const welcomeEmail = (name) => baseTemplate(`

  <!-- HERO -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:12px 0 32px;">
    <tr>
      <td align="center" style="padding:0 0 20px 0;">
        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border-spacing:0;">
          <tr>
            <td width="80" height="80" align="center" valign="middle" style="width:80px;height:80px;background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.12);border-radius:50%;">
              <img src="https://img.icons8.com/sf-regular/40/6366f1/rocket.png" width="34" height="34" alt="" style="display:block;margin:auto;" />
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding:0 0 8px 0;">
        <h1 style="color:#ffffff;font-size:24px;font-weight:300;margin:0;letter-spacing:0.3px;font-family:'Montserrat',Arial,sans-serif;">Welcome to <span style="color:#818cf8;font-weight:500;font-family:'Montserrat',Arial,sans-serif;">Quantyrex</span></h1>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding:0;">
        <p style="color:#a0a0a0;font-size:11px;letter-spacing:2.5px;margin:0;font-family:'Montserrat',Arial,sans-serif;text-transform:uppercase;font-weight:300;">Your Investment Journey Begins</p>
      </td>
    </tr>
  </table>

  <!-- GLOWING DIVIDER -->
  <table width="60%" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 32px auto;border-collapse:collapse;">
    <tr>
      <td style="height:1px;background:linear-gradient(90deg,transparent,rgba(99,102,241,0.5),rgba(129,140,248,0.6),rgba(99,102,241,0.5),transparent);font-size:0;line-height:0;">&nbsp;</td>
    </tr>
  </table>

  <!-- GREETING -->
  <p style="color:#e4e4e7;font-size:14px;margin:0 0 18px;line-height:1.6;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear <span style="color:#818cf8;font-family:'Montserrat',Arial,sans-serif;font-weight:400;">${name || 'Valued Client'}</span>,</p>

  <p style="color:#a1a1aa;font-size:13px;margin:0 0 16px;line-height:1.75;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">
    We are thrilled to welcome you to <span style="color:#e4e4e7;">Quantyrex Markets</span>. Your account has been successfully created and you are now part of an exclusive community of investors growing their wealth every day.
  </p>

  <p style="color:#a1a1aa;font-size:13px;margin:0 0 36px;line-height:1.75;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">
    Our platform is designed to help you manage your portfolio with ease while maximizing your earning potential through smart trading tools and secure infrastructure.
  </p>

  <!-- FEATURES -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 36px;border-collapse:separate;border-spacing:8px;">
    <tr>
      <td width="33.33%" style="padding:0;text-align:center;background:#121212;border:1px solid #1e1e1e;border-radius:8px;">
        <div style="padding:20px 10px 20px 10px;">
          <img src="https://img.icons8.com/sf-regular/32/6366f1/combo-chart.png" width="22" height="22" style="display:block;margin:0 auto 12px;" />
          <p style="color:#e4e4e7;font-size:10px;font-weight:600;margin:0 0 4px;font-family:'Montserrat',Arial,sans-serif;">Smart Trading</p>
          <p style="color:#a0a0a0;font-size:9px;margin:0;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">AI-powered signals</p>
        </div>
      </td>

      <td width="33.33%" style="padding:0;text-align:center;background:#121212;border:1px solid #1e1e1e;border-radius:8px;">
        <div style="padding:20px 10px 20px 10px;">
          <img src="https://img.icons8.com/sf-regular/32/6366f1/shield.png" width="22" height="22" style="display:block;margin:0 auto 12px;" />
          <p style="color:#e4e4e7;font-size:10px;font-weight:600;margin:0 0 4px;font-family:'Montserrat',Arial,sans-serif;">Secure Platform</p>
          <p style="color:#a0a0a0;font-size:9px;margin:0;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">256-bit encryption</p>
        </div>
      </td>

      <td width="33.33%" style="padding:0;text-align:center;background:#121212;border:1px solid #1e1e1e;border-radius:8px;">
        <div style="padding:20px 10px 20px 10px;">
          <img src="https://img.icons8.com/sf-regular/32/6366f1/money.png" width="22" height="22" style="display:block;margin:0 auto 12px;" />
          <p style="color:#e4e4e7;font-size:10px;font-weight:600;margin:0 0 4px;font-family:'Montserrat',Arial,sans-serif;">Daily Returns</p>
          <p style="color:#a0a0a0;font-size:9px;margin:0;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Consistent profits</p>
        </div>
      </td>
    </tr>
  </table>

  <!-- NEXT STEPS -->
  <p style="color:#818cf8;font-size:9px;letter-spacing:2.5px;margin:0 0 18px;font-family:'Montserrat',Arial,sans-serif;font-weight:500;">NEXT STEPS</p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 36px;">
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="32" valign="top" style="padding-right:12px;"><span style="color:#818cf8;font-size:12px;font-weight:600;font-family:'Montserrat',Arial,sans-serif;">01</span></td>
            <td valign="top">
              <p style="color:#e4e4e7;font-size:12px;font-weight:600;margin:0 0 3px;font-family:'Montserrat',Arial,sans-serif;">Complete Your Profile</p>
              <p style="color:#a0a0a0;font-size:10px;margin:0;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Add your personal details</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="32" valign="top" style="padding-right:12px;"><span style="color:#818cf8;font-size:12px;font-weight:600;font-family:'Montserrat',Arial,sans-serif;">02</span></td>
            <td valign="top">
              <p style="color:#e4e4e7;font-size:12px;font-weight:600;margin:0 0 3px;font-family:'Montserrat',Arial,sans-serif;">Verify Your Identity</p>
              <p style="color:#a0a0a0;font-size:10px;margin:0;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Unlock full platform access</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="32" valign="top" style="padding-right:12px;"><span style="color:#818cf8;font-size:12px;font-weight:600;font-family:'Montserrat',Arial,sans-serif;">03</span></td>
            <td valign="top">
              <p style="color:#e4e4e7;font-size:12px;font-weight:600;margin:0 0 3px;font-family:'Montserrat',Arial,sans-serif;">Make Your First Deposit</p>
              <p style="color:#a0a0a0;font-size:10px;margin:0;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Start earning daily returns</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- CTA -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:500;padding:16px 0;text-decoration:none;letter-spacing:2px;text-align:center;width:80%;margin:0 auto;font-family:'Montserrat',Arial,sans-serif;border-radius:6px;">GET STARTED</a>
      </td>
    </tr>
  </table>

  <p style="color:#71717a;font-size:10px;margin:0;text-align:center;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">The Quantyrex Markets Team</p>

`);

module.exports = welcomeEmail;
