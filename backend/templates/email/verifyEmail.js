const baseTemplate = require('./base-enhanced');

const verifyEmailTemplate = (name, link) => baseTemplate(`

  <p style="color:#818cf8;font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">ONE LAST STEP</p>
  <h1 style="color:#ffffff;font-size:24px;font-weight:300;margin:0 0 6px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">Verify Your Email</h1>
  <p style="color:#a0a0a0;font-size:12px;margin:0 0 32px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">Confirm your address to activate your account</p>

  <p style="color:#a1a1aa;font-size:13px;margin:0 0 28px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, please click the button below to verify your email address and activate your Quantyrex Markets account.
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="${link}" style="display:inline-block;background-color:#818cf8;color:#ffffff;font-size:11px;font-weight:500;padding:14px 44px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">VERIFY EMAIL</a>
      </td>
    </tr>
  </table>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;background-color:#121212;">
    <tr>
      <td style="padding:12px 16px;">
        <p style="color:#a0a0a0;font-size:10px;margin:0;line-height:1.6;font-family:'Helvetica Neue',Arial,sans-serif;">
          This link expires in <span style="color:#a1a1aa;">24 hours</span>. If you did not create an account, you can safely ignore this email.
        </p>
      </td>
    </tr>
  </table>

  <p style="color:#71717a;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Team</p>

`);

module.exports = verifyEmailTemplate;
