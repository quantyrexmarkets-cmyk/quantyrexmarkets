const baseTemplate = require('./base-enhanced');

const withdrawalApprovedEmail = (name, amount, currency, method, newBalance) => baseTemplate(`

  <!-- ICON -->
  <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 24px auto;">
    <tr>
      <td width="80" height="80" align="center" valign="middle" style="width:80px;height:80px;background:linear-gradient(135deg,#14532d,#22c55e);border-radius:50%;">
        <img src="https://img.icons8.com/sf-regular/48/ffffff/money.png" width="36" height="36" alt="" style="display:block;margin:auto;" />
      </td>
    </tr>
  </table>

  <!-- HEADLINE -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;">
    <tr>
      <td style="text-align:center;">
        <p style="margin:0 0 6px;color:#22c55e;font-size:10px;letter-spacing:3px;font-family:'Helvetica Neue',Arial,sans-serif;">TRANSACTION RECEIPT</p>
        <h1 style="margin:0 0 6px;color:#ffffff;font-size:32px;font-weight:200;font-family:'Helvetica Neue',Arial,sans-serif;">${currency || '$'}${parseFloat(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
        <p style="margin:0;color:#22c55e;font-size:11px;letter-spacing:2px;font-weight:500;font-family:'Helvetica Neue',Arial,sans-serif;">&#9679; APPROVED</p>
      </td>
    </tr>
  </table>

  <!-- DIVIDER -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#22c55e,transparent);font-size:0;">&nbsp;</td></tr>
  </table>

  <p style="color:#94a3b8;font-size:13px;margin:0 0 24px;line-height:1.9;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, your withdrawal request has been successfully approved. Your funds are now being transferred and should reflect in your selected payment method shortly.
  </p>

  <!-- DETAILS -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background:#111827;border:1px solid #1e293b;border-collapse:collapse;">
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid #1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="color:#475569;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">AMOUNT</td>
            <td align="right" style="color:#22c55e;font-size:14px;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">${currency || '$'}${parseFloat(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid #1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="color:#475569;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">METHOD</td>
            <td align="right" style="color:#ffffff;font-size:12px;font-family:'Helvetica Neue',Arial,sans-serif;">${method || 'Crypto'}</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid #1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="color:#475569;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">NEW BALANCE</td>
            <td align="right" style="color:#ffffff;font-size:12px;font-family:'Helvetica Neue',Arial,sans-serif;">${currency || '$'}${parseFloat(newBalance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:14px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="color:#475569;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">STATUS</td>
            <td align="right">
              <span style="background:#052e16;color:#22c55e;font-size:10px;font-weight:500;padding:4px 12px;font-family:'Helvetica Neue',Arial,sans-serif;letter-spacing:1px;">&#10003; APPROVED</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <p style="color:#94a3b8;font-size:12px;margin:0 0 28px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:300;">
    If you do not receive your funds within the expected timeframe, please contact our support team for assistance. Thank you for trusting Quantyrex Markets.
  </p>

  <!-- CTA -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#ffffff;font-size:12px;font-weight:500;padding:16px 48px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">VIEW DASHBOARD &rarr;</a>
      </td>
    </tr>
  </table>

  <p style="color:#334155;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Finance Team</p>

`);

module.exports = withdrawalApprovedEmail;
