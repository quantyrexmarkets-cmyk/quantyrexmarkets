const baseTemplate = require('./base-enhanced');

const depositPendingEmail = (name, amount, currency, method) => baseTemplate(`

  <p style="color:#f59e0b;font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">DEPOSIT RECEIVED</p>
  <h1 style="color:#ffffff;font-size:30px;font-weight:200;margin:0 0 6px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">${currency || '$'}${parseFloat(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
  <p style="color:#f59e0b;font-size:11px;letter-spacing:2px;font-weight:500;margin:0 0 32px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">UNDER REVIEW</p>

  <p style="color:#a1a1aa;font-size:13px;margin:0 0 24px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, we have received your deposit and it is currently being reviewed. You will receive a confirmation once credited.
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background-color:#121212;">
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #1a1a1a;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#a0a0a0;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">AMOUNT</td>
          <td align="right" style="color:#ffffff;font-size:13px;font-weight:500;font-family:'Helvetica Neue',Arial,sans-serif;">${currency || '$'}${parseFloat(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
        </tr></table>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #1a1a1a;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#a0a0a0;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">METHOD</td>
          <td align="right" style="color:#ffffff;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;">${method || 'Crypto'}</td>
        </tr></table>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="color:#a0a0a0;font-size:10px;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">STATUS</td>
          <td align="right" style="color:#f59e0b;font-size:10px;font-weight:500;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">REVIEWING</td>
        </tr></table>
      </td>
    </tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;background-color:#121212;">
    <tr>
      <td style="padding:12px 16px;">
        <p style="color:#a0a0a0;font-size:10px;margin:0;line-height:1.6;font-family:'Helvetica Neue',Arial,sans-serif;">
          Processing typically takes <span style="color:#a1a1aa;">1-3 business hours</span>. Thank you for your patience.
        </p>
      </td>
    </tr>
  </table>

  <p style="color:#71717a;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Finance Team</p>

`);

module.exports = depositPendingEmail;
