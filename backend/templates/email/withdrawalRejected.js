const baseTemplate = require('./base-enhanced');

const withdrawalRejectedEmail = (name, amount, currency, reason) => baseTemplate(`

  <!-- ICON -->
  <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 24px auto;">
    <tr>
      <td width="80" height="80" align="center" valign="middle" style="width:80px;height:80px;background:linear-gradient(135deg,#7f1d1d,#ef4444);border-radius:50%;">
        <img src="https://img.icons8.com/sf-regular/48/ffffff/multiply.png" width="36" height="36" alt="" style="display:block;margin:auto;" />
      </td>
    </tr>
  </table>

  <!-- HEADLINE -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;">
    <tr>
      <td style="text-align:center;">
        <p style="margin:0 0 6px;color:#ef4444;font-size:10px;letter-spacing:3px;font-family:'Helvetica Neue',Arial,sans-serif;">WITHDRAWAL UPDATE</p>
        <h1 style="margin:0 0 6px;color:#ffffff;font-size:32px;font-weight:200;font-family:'Helvetica Neue',Arial,sans-serif;">${currency || '$'}${parseFloat(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
        <p style="margin:0;color:#ef4444;font-size:11px;letter-spacing:2px;font-weight:500;font-family:'Helvetica Neue',Arial,sans-serif;">&#9679; NOT APPROVED</p>
      </td>
    </tr>
  </table>

  <!-- DIVIDER -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#ef4444,transparent);font-size:0;">&nbsp;</td></tr>
  </table>

  <p style="color:#94a3b8;font-size:13px;margin:0 0 20px;line-height:1.9;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, we regret to inform you that your withdrawal request could not be processed at this time. Your funds have been returned to your account balance.
  </p>

  ${reason ? `
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;background:#111827;border-left:3px solid #ef4444;">
    <tr>
      <td style="padding:16px 20px;">
        <p style="color:#475569;font-size:9px;letter-spacing:1px;margin:0 0 8px;font-family:'Helvetica Neue',Arial,sans-serif;">REASON</p>
        <p style="color:#fca5a5;font-size:12px;margin:0;line-height:1.7;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">${reason}</p>
      </td>
    </tr>
  </table>
  ` : ''}

  <p style="color:#94a3b8;font-size:12px;margin:0 0 28px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">
    Please contact our support team if you need assistance or wish to submit a new withdrawal request.
  </p>

  <!-- CTA -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#ffffff;font-size:12px;font-weight:500;padding:16px 48px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">CONTACT SUPPORT &rarr;</a>
      </td>
    </tr>
  </table>

  <p style="color:#334155;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Finance Team</p>

`);

module.exports = withdrawalRejectedEmail;
