const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  }
});

const sendEmail = async ({ to, type, name, resetUrl, verifyUrl, amount, currency, reason, message, botName, totalEarned, newBalance, stakePlan, subject: customSubject }) => {
  const FRONTEND = process.env.FRONTEND_URL || 'https://quantyrexmarkets.vercel.app';

  let subject, html;

  if (type === 'verifyEmail') {
    subject = 'Verify Your Email — Quantyrex Markets';
    html = `
      <div style="font-family:Arial,sans-serif;background:#0e1628;padding:20px;border-radius:12px;max-width:600px;margin:0 auto;">
        <h2 style="color:white;">Verify Your Email</h2>
        <p style="color:rgba(255,255,255,0.7);">Hi ${name || 'User'},</p>
        <p style="color:rgba(255,255,255,0.7);">Click the link below to verify your email and activate your account.</p>
        <div style="text-align:center;margin:30px 0;">
          <a href="${verifyUrl}" style="background:#6366f1;color:white;padding:12px 30px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">✓ Verify My Email</a>
        </div>
        <p style="color:rgba(255,255,255,0.5);font-size:12px;">This link expires in 24 hours</p>
        <p style="color:rgba(255,255,255,0.4);font-size:12px;">Best regards,<br/>Quantyrex Markets Support</p>
      </div>
    `;
  } else {
    subject = customSubject || 'Message from Quantyrex Markets';
    html = `
      <div style="font-family:Arial,sans-serif;background:#0e1628;padding:20px;border-radius:12px;max-width:600px;margin:0 auto;">
        <h2 style="color:white;">Message</h2>
        <p style="color:rgba(255,255,255,0.7);">Hi ${name || 'User'},</p>
        <p style="color:rgba(255,255,255,0.7);">${message}</p>
        <p style="color:rgba(255,255,255,0.4);font-size:12px;">Best regards,<br/>Quantyrex Markets</p>
      </div>
    `;
  }

  try {
    console.log('📧 Attempting to send email to:', to);
    console.log('Email config:', { user: process.env.EMAIL_USER, hasPassword: !!process.env.EMAIL_PASSWORD });
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    });
    console.log('✅ Email sent successfully:', result);
    return { success: true };
  } catch (error) {
    console.error('❌ Email error:', error.message);
    throw error;
  }
};

module.exports = sendEmail;
