const baseTemplate = require('./base-enhanced');

const registrationFeeEmail = (name, amount, currency) => baseTemplate(`

  <!-- ICON -->
  <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 24px auto;">
    <tr>
      <td width="80" height="80" align="center" valign="middle" style="width:80px;height:80px;background:linear-gradient(135deg,#3730a3,#6366f1);border-radius:50%;">
        <img src="https://img.icons8.com/sf-regular/48/ffffff/credit-card.png" width="36" height="36" alt="" style="display:block;margin:auto;" />
      </td>
    </tr>
  </table>

  <!-- HEADLINE -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;">
    <tr>
      <td style="text-align:center;">
        <p style="margin:0 0 6px;color:#6366f1;font-size:10px;letter-spacing:3px;font-family:'Helvetica Neue',Arial,sans-serif;">ACCOUNT ACTIVATION</p>
        <h1 style="margin:0 0 10px;color:#ffffff;font-size:24px;font-weight:300;font-family:'Helvetica Neue',Arial,sans-serif;">Registration Fee Required</h1>
        <p style="margin:0;color:#475569;font-size:12px;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">One-time payment to activate your account</p>
      </td>
    </tr>
  </table>

  <!-- DIVIDER -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#6366f1,transparent);font-size:0;">&nbsp;</td></tr>
  </table>

  <p style="color:#94a3b8;font-size:13px;margin:0 0 20px;line-height:1.9;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, a one-time registration fee is required to fully activate your Quantyrex Markets account and unlock all platform features.
  </p>

  <!-- FEE BOX -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background:#111827;border:1px solid #1e293b;">
    <tr>
      <td style="padding:32px 20px;text-align:center;">
        <p style="color:#475569;font-size:9px;letter-spacing:3px;margin:0 0 12px;font-family:'Helvetica Neue',Arial,sans-serif;">REGISTRATION FEE</p>
        <p style="color:#6366f1;font-size:42px;font-weight:200;margin:0 0 8px;font-family:'Helvetica Neue',Arial,sans-serif;">${currency || '$'}${parseFloat(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        <p style="color:#334155;font-size:10px;margin:0;font-family:'Helvetica Neue',Arial,sans-serif;">One-time payment</p>
      </td>
    </tr>
  </table>

  <!-- BENEFITS -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background:#111827;border:1px solid #1e293b;">
    <tr>
      <td style="padding:20px;">
        <p style="color:#6366f1;font-size:9px;letter-spacing:2px;margin:0 0 14px;font-family:'Helvetica Neue',Arial,sans-serif;">WHAT YOU GET</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td style="padding:6px 0;border-bottom:1px solid #1e293b;color:#94a3b8;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;"><span style="color:#6366f1;">&#10003;</span>&nbsp; Full account activation</td></tr>
          <tr><td style="padding:6px 0;border-bottom:1px solid #1e293b;color:#94a3b8;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;"><span style="color:#6366f1;">&#10003;</span>&nbsp; Access to all investment plans</td></tr>
          <tr><td style="padding:6px 0;border-bottom:1px solid #1e293b;color:#94a3b8;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;"><span style="color:#6366f1;">&#10003;</span>&nbsp; Deposit and withdrawal privileges</td></tr>
          <tr><td style="padding:6px 0;color:#94a3b8;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;"><span style="color:#6366f1;">&#10003;</span>&nbsp; 24/7 priority support</td></tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- CTA -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#ffffff;font-size:12px;font-weight:500;padding:16px 48px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">ACTIVATE ACCOUNT &rarr;</a>
      </td>
    </tr>
  </table>

  <p style="color:#334155;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Team</p>

`);

module.exports = registrationFeeEmail;
