const baseTemplate = require('./base-enhanced');

const twoFactorOTPEmail = (name, code) => baseTemplate(`

  <p style="color:#818cf8;font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">TWO-FACTOR VERIFICATION</p>
  <h1 style="color:#ffffff;font-size:24px;font-weight:300;margin:0 0 6px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">Authentication Code</h1>
  <p style="color:#a0a0a0;font-size:12px;margin:0 0 32px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">Enter this code to complete your login</p>

  <p style="color:#a1a1aa;font-size:13px;margin:0 0 28px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, your two-factor authentication code is ready.
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background-color:#121212;">
    <tr>
      <td style="padding:32px 20px;text-align:center;">
        <p style="color:#a0a0a0;font-size:9px;letter-spacing:3px;margin:0 0 14px;font-family:'Helvetica Neue',Arial,sans-serif;">VERIFICATION CODE</p>
        <p style="color:#818cf8;font-size:40px;font-weight:200;margin:0 0 14px;letter-spacing:12px;font-family:'Helvetica Neue',Arial,sans-serif;">${code}</p>
        <p style="color:#71717a;font-size:10px;margin:0;font-family:'Helvetica Neue',Arial,sans-serif;">Valid for <span style="color:#a1a1aa;">10 minutes</span></p>
      </td>
    </tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;background-color:#121212;">
    <tr>
      <td style="padding:12px 16px;">
        <p style="color:#a0a0a0;font-size:10px;margin:0;line-height:1.6;font-family:'Helvetica Neue',Arial,sans-serif;">
          Never share this code with anyone. Quantyrex Markets will <span style="color:#a1a1aa;">never</span> ask for your code.
        </p>
      </td>
    </tr>
  </table>

  <p style="color:#71717a;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Security Team</p>

`);

module.exports = twoFactorOTPEmail;
