const baseTemplate = require('./base');

const upgradePromoEmail = (name) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;">
    Dear ${name || 'Valued Client'},
  </p>
  
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">
    We hope you are doing well.
  </p>
  
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">
    We would like to inform you that your current account level requires an upgrade to continue enjoying uninterrupted access to our investment services and full platform features.
  </p>
  
  <p style="color:#888888;font-size:12px;margin:0 0 12px;line-height:1.7;">
    Why this upgrade is important:
  </p>
  
  <table width="100%" style="margin:0 0 24px;">
    <tr>
      <td style="padding:6px 0;">
        <span style="color:#6366f1;font-size:12px;margin-right:8px;">•</span>
        <span style="color:#888888;font-size:12px;">Maintain full access to your investment dashboard</span>
      </td>
    </tr>
    <tr>
      <td style="padding:6px 0;">
        <span style="color:#6366f1;font-size:12px;margin-right:8px;">•</span>
        <span style="color:#888888;font-size:12px;">Enable withdrawals and advanced trading features</span>
      </td>
    </tr>
    <tr>
      <td style="padding:6px 0;">
        <span style="color:#6366f1;font-size:12px;margin-right:8px;">•</span>
        <span style="color:#888888;font-size:12px;">Improve account security and performance</span>
      </td>
    </tr>
    <tr>
      <td style="padding:6px 0;">
        <span style="color:#6366f1;font-size:12px;margin-right:8px;">•</span>
        <span style="color:#888888;font-size:12px;">Unlock higher earning opportunities</span>
      </td>
    </tr>
  </table>
  
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">
    To proceed, please upgrade your account at your earliest convenience by following the instructions on your dashboard or contacting your account manager.
  </p>
  
  <table width="100%" style="margin:20px 0;background:#0d1117;border:1px solid #1a1a1a;border-left:3px solid #f59e0b;">
    <tr>
      <td style="padding:16px;">
        <p style="color:#f59e0b;font-size:11px;font-weight:600;margin:0 0 4px;">
          ⚠️ IMPORTANT NOTICE
        </p>
        <p style="color:#888888;font-size:11px;margin:0;line-height:1.6;">
          Failure to complete this upgrade may result in temporary limitations on your account functionality.
        </p>
      </td>
    </tr>
  </table>
  
  <a href="https://quantyrexmarketsy.vercel.app/dashboard/account" 
     style="display:inline-block;background:#6366f1;color:#ffffff;font-size:12px;font-weight:500;padding:14px 32px;text-decoration:none;letter-spacing:0.5px;margin:0 0 24px;border-radius:4px;">
    UPGRADE ACCOUNT NOW
  </a>
  
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">
    If you need any assistance or have questions, our support team is always available to help.
  </p>
  
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">
    Thank you for choosing Quantyrex Markets. We look forward to helping you achieve your financial goals.
  </p>
  
  <p style="color:#666666;font-size:11px;margin:30px 0 0;line-height:1.7;">
    Warm regards,<br/>
    <span style="color:#888888;">The Quantyrex Markets Team</span><br/>
    <span style="color:#666666;font-size:10px;">
      <a href="mailto:support@quantyrexmarkets.com" style="color:#6366f1;text-decoration:none;">support@quantyrexmarkets.com</a><br/>
      <a href="https://quantyrexmarketsy.vercel.app" style="color:#6366f1;text-decoration:none;">quantyrexmarketsy.vercel.app</a>
    </span>
  </p>
`);

module.exports = upgradePromoEmail;
