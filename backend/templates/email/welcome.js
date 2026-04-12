const baseTemplate = require('./base');

const welcomeEmail = (name) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;">Dear ${name || 'Valued Client'},</p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">Welcome to Quantyrex Markets!</p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">We're excited to have you on board. Your journey toward smarter investing and financial growth starts here.</p>
  <p style="color:#888888;font-size:12px;margin:0 0 20px;line-height:1.8;">At Quantyrex Markets, we are committed to providing you with a secure, reliable, and rewarding investment experience. Our platform is designed to help you manage your portfolio with ease while maximizing your earning potential.</p>
  <p style="color:#ffffff;font-size:12px;margin:0 0 12px;line-height:1.7;">Here's what you can do next:</p>
  <ul style="color:#888888;font-size:12px;margin:0 0 20px;padding-left:20px;line-height:2;">
    <li>Log in to your account and complete your profile</li>
    <li>Explore available investment plans</li>
    <li>Fund your account to begin investing</li>
    <li>Reach out to your account manager for guidance</li>
  </ul>
  <p style="color:#888888;font-size:12px;margin:0 0 24px;line-height:1.8;">Our team is here to support you every step of the way. If you have any questions or need assistance, don't hesitate to contact us.</p>
  <a href="https://quantyrexmarkets.vercel.app/dashboard" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:12px;font-weight:500;padding:14px 32px;text-decoration:none;letter-spacing:0.5px;margin-bottom:24px;">GO TO DASHBOARD</a>
  <p style="color:#888888;font-size:12px;margin:24px 0 20px;line-height:1.8;">Once again, welcome! We look forward to helping you achieve your financial goals.</p>
  <p style="color:#666666;font-size:11px;margin:30px 0 0;line-height:1.7;">Warm regards,<br/><span style="color:#888888;">The Quantyrex Markets Team</span></p>
`);

module.exports = welcomeEmail;
