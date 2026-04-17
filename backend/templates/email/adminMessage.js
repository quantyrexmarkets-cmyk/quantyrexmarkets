const baseTemplate = require('./base-enhanced');

const adminMessageEmail = (name, subject, message) => baseTemplate(`

  <p style="color:#818cf8;font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">ACCOUNT NOTIFICATION</p>
  <h1 style="color:#ffffff;font-size:22px;font-weight:300;margin:0 0 32px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">${subject || 'Message from Quantyrex'}</h1>

  <p style="color:#a1a1aa;font-size:13px;margin:0 0 20px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>,
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background-color:#121212;">
    <tr>
      <td style="padding:20px;">
        <p style="color:#a1a1aa;font-size:13px;margin:0;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;">${message || ''}</p>
      </td>
    </tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background-color:#818cf8;color:#ffffff;font-size:11px;font-weight:500;padding:14px 44px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">VIEW DASHBOARD</a>
      </td>
    </tr>
  </table>

  <p style="color:#71717a;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Team</p>

`);

module.exports = adminMessageEmail;
