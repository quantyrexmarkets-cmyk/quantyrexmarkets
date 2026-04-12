const baseTemplate = require('./base');

const twoFactorOTPEmail = (name, code) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;margin:0 0 20px;line-height:1.7;">
    Dear ${name || 'Valued Client'},
  </p>
  
  <p style="color:#888888;font-size:12px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;margin:0 0 20px;line-height:1.8;">
    Your verification code:
  </p>
  
  <table width="100%" style="margin:20px 0;">
    <tr>
      <td align="center" style="padding:20px;background:#0d1117;border:1px solid #1a1a1a;border-radius:4px;">
        <p style="color:#6366f1;font-size:32px;font-weight:600;margin:0;letter-spacing:8px;font-family:'Courier New',monospace;">
          ${code}
        </p>
      </td>
    </tr>
  </table>
  
  <p style="color:#888888;font-size:12px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;margin:0 0 20px;line-height:1.8;">
    Code expires in 10 minutes. Do not share this code with anyone.
  </p>
  
  <table width="100%" style="margin:20px 0;background:#0d1117;border:1px solid #1a1a1a;border-left:3px solid #f59e0b;">
    <tr>
      <td style="padding:16px;">
        <p style="color:#f59e0b;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:400;margin:0 0 4px;">
          ⚠️ SECURITY WARNING
        </p>
        <p style="color:#888888;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;margin:0;line-height:1.6;">
          Never share this code with anyone. Our team will never ask for your verification code.
        </p>
      </td>
    </tr>
  </table>
  
  <p style="color:#888888;font-size:12px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;margin:24px 0 20px;line-height:1.8;">
    If you didn't request this code, please contact our support team immediately.
  </p>
  
  <p style="color:#666666;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;margin:30px 0 0;line-height:1.7;">
    Best regards,<br/>
    <span style="color:#888888;">The Quantyrex Markets Team</span>
  </p>
`);

module.exports = twoFactorOTPEmail;
