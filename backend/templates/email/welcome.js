const baseTemplate = require('./base-enhanced');

const welcomeEmail = (name) => baseTemplate(`

  <!-- HERO ICON -->
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
        <p style="margin:0 0 6px;color:#6366f1;font-size:10px;letter-spacing:3px;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:400;">WELCOME ABOARD</p>
        <h1 style="margin:0 0 10px;color:#ffffff;font-size:26px;font-weight:300;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">Hello, <span style="color:#6366f1;font-weight:600;">${name || 'Valued Client'}</span></h1>
        <p style="margin:0;color:#475569;font-size:12px;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">Your investment journey begins today</p>
      </td>
    </tr>
  </table>

  <!-- DIVIDER -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td style="height:1px;background:linear-gradient(90deg,transparent,#6366f1,transparent);font-size:0;">&nbsp;</td>
    </tr>
  </table>

  <!-- BODY TEXT -->
  <p style="color:#94a3b8;font-size:13px;margin:0 0 14px;line-height:1.9;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">
    We are thrilled to welcome you to <span style="color:#ffffff;">Quantyrex Markets</span>. Your account has been successfully created and you are now part of an exclusive community of investors growing their wealth every day.
  </p>

  <!-- FEATURE GRID -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 28px;border-collapse:separate;border-spacing:8px;">
    <tr>
      <td width="33%" style="padding:18px 10px;text-align:center;background:#111827;border:1px solid #1e293b;">
        <img src="https://img.icons8.com/sf-regular/32/6366f1/combo-chart.png" width="28" height="28" style="display:block;margin:0 auto 10px;" />
        <p style="color:#ffffff;font-size:10px;font-weight:500;margin:0 0 4px;font-family:'Helvetica Neue',Arial,sans-serif;">Smart Trading</p>
        <p style="color:#475569;font-size:9px;margin:0;font-family:'Helvetica Neue',Arial,sans-serif;">AI-powered signals</p>
      </td>
      <td width="33%" style="padding:18px 10px;text-align:center;background:#111827;border:1px solid #1e293b;">
        <img src="https://img.icons8.com/sf-regular/32/6366f1/shield.png" width="28" height="28" style="display:block;margin:0 auto 10px;" />
        <p style="color:#ffffff;font-size:10px;font-weight:500;margin:0 0 4px;font-family:'Helvetica Neue',Arial,sans-serif;">Secure Platform</p>
        <p style="color:#475569;font-size:9px;margin:0;font-family:'Helvetica Neue',Arial,sans-serif;">256-bit encryption</p>
      </td>
      <td width="33%" style="padding:18px 10px;text-align:center;background:#111827;border:1px solid #1e293b;">
        <img src="https://img.icons8.com/sf-regular/32/6366f1/money.png" width="28" height="28" style="display:block;margin:0 auto 10px;" />
        <p style="color:#ffffff;font-size:10px;font-weight:500;margin:0 0 4px;font-family:'Helvetica Neue',Arial,sans-serif;">Daily Returns</p>
        <p style="color:#475569;font-size:9px;margin:0;font-family:'Helvetica Neue',Arial,sans-serif;">Consistent profits</p>
      </td>
    </tr>
  </table>

  <!-- NEXT STEPS -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background:#111827;border:1px solid #1e293b;">
    <tr>
      <td style="padding:20px 20px 8px;">
        <p style="color:#6366f1;font-size:9px;letter-spacing:2px;margin:0 0 16px;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:500;">NEXT STEPS</p>
      </td>
    </tr>
    <tr>
      <td style="padding:0 20px 6px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="24" valign="top" style="padding:0 10px 12px 0;">
              <div style="width:22px;height:22px;background:#6366f1;text-align:center;line-height:22px;font-size:10px;color:#ffffff;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">1</div>
            </td>
            <td valign="top" style="padding:0 0 12px;border-bottom:1px solid #1e293b;">
              <p style="color:#ffffff;font-size:11px;margin:0 0 2px;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:500;">Complete Your Profile</p>
              <p style="color:#475569;font-size:10px;margin:0;font-family:'Helvetica Neue',Arial,sans-serif;">Add your personal details</p>
            </td>
          </tr>
          <tr>
            <td width="24" valign="top" style="padding:0 10px 12px 0;">
              <div style="width:22px;height:22px;background:#4f46e5;text-align:center;line-height:22px;font-size:10px;color:#ffffff;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">2</div>
            </td>
            <td valign="top" style="padding:0 0 12px;border-bottom:1px solid #1e293b;">
              <p style="color:#ffffff;font-size:11px;margin:0 0 2px;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:500;">Verify Your Identity (KYC)</p>
              <p style="color:#475569;font-size:10px;margin:0;font-family:'Helvetica Neue',Arial,sans-serif;">Unlock full platform access</p>
            </td>
          </tr>
          <tr>
            <td width="24" valign="top" style="padding:0 10px 12px 0;">
              <div style="width:22px;height:22px;background:#3730a3;text-align:center;line-height:22px;font-size:10px;color:#ffffff;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">3</div>
            </td>
            <td valign="top" style="padding:0 0 12px;">
              <p style="color:#ffffff;font-size:11px;margin:0 0 2px;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:500;">Make Your First Deposit</p>
              <p style="color:#475569;font-size:10px;margin:0;font-family:'Helvetica Neue',Arial,sans-serif;">Start earning daily returns</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr><td style="padding:0 0 8px;"></td></tr>
  </table>

  <!-- CTA BUTTON -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#ffffff;font-size:12px;font-weight:500;padding:16px 48px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">GET STARTED &rarr;</a>
      </td>
    </tr>
  </table>

  <!-- SIGN OFF -->
  <p style="color:#334155;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Team</p>

`);

module.exports = welcomeEmail;
