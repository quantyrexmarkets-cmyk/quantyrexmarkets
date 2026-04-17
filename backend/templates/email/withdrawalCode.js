const baseTemplate = require('./base-enhanced');

const withdrawalCodeEmail = (name, code) => baseTemplate(`

  <p style="color:#a78bfa;font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">SECURITY CODE</p>
  <h1 style="color:#ffffff;font-size:24px;font-weight:300;margin:0 0 6px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">Withdrawal Code</h1>
  <p style="color:#a0a0a0;font-size:12px;margin:0 0 32px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">Required to process your withdrawal</p>

  <p style="color:#a1a1aa;font-size:13px;margin:0 0 28px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, your withdrawal security code has been generated. Enter this code when prompted.
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background-color:#121212;">
    <tr>
      <td style="padding:32px 20px;text-align:center;">
        <p style="color:#a0a0a0;font-size:9px;letter-spacing:3px;margin:0 0 14px;font-family:'Helvetica Neue',Arial,sans-serif;">YOUR WITHDRAWAL CODE</p>
        <p style="color:#a78bfa;font-size:40px;font-weight:200;margin:0;letter-spacing:10px;font-family:'Helvetica Neue',Arial,sans-serif;">${code || '------'}</p>
      </td>
    </tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;background-color:#121212;">
    <tr>
      <td style="padding:12px 16px;">
        <p style="color:#a0a0a0;font-size:10px;margin:0;line-height:1.6;font-family:'Helvetica Neue',Arial,sans-serif;">
          <span style="color:#ef4444;">Warning:</span> <span style="color:#a1a1aa;">Never share this code</span> with anyone including staff. This is for your personal use only.
        </p>
      </td>
    </tr>
  </table>

  <p style="color:#71717a;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Security Team</p>

`);

module.exports = withdrawalCodeEmail;
