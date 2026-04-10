const baseTemplate = require('./base');

const verifyEmailTemplate = (name, verifyUrl) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 25px;line-height:1.7;">
    Hi ${name},
  </p>
  
  <p style="color:#888888;font-size:12px;margin:0 0 30px;line-height:1.7;">
    Please verify your email address to activate your account.
  </p>
  
  <a href="${verifyUrl}" 
     style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:500;padding:12px 28px;text-decoration:none;letter-spacing:0.5px;">
    VERIFY EMAIL
  </a>
  
  <p style="color:#666666;font-size:11px;margin:30px 0 0;line-height:1.7;">
    Link expires in 24 hours.
  </p>
  
  <p style="color:#444444;font-size:10px;margin:20px 0 0;line-height:1.6;word-break:break-all;">
    ${verifyUrl}
  </p>
`);

module.exports = verifyEmailTemplate;
