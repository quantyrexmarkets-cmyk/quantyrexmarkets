const nodemailer = require('nodemailer');

// Import all templates
const welcomeEmail = require('../templates/email/welcome');
const verifyEmailTemplate = require('../templates/email/verifyEmail');
const passwordResetEmail = require('../templates/email/passwordReset');
const depositPendingEmail = require('../templates/email/depositPending');
const depositConfirmedEmail = require('../templates/email/depositConfirmed');
const depositRejectedEmail = require('../templates/email/depositRejected');
const withdrawalPendingEmail = require('../templates/email/withdrawalPending');
const withdrawalApprovedEmail = require('../templates/email/withdrawalApproved');
const withdrawalRejectedEmail = require('../templates/email/withdrawalRejected');
const kycApprovedEmail = require('../templates/email/kycApproved');
const kycRejectedEmail = require('../templates/email/kycRejected');
const twoFactorOTPEmail = require('../templates/email/twoFactorOTP');
const tradeResultEmail = require('../templates/email/tradeResult');
const botProfitEmail = require('../templates/email/botProfit');
const stakeProfitEmail = require('../templates/email/stakeProfit');
const adminMessageEmail = require('../templates/email/adminMessage');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  }
});

const sendEmail = async (options) => {
  const {
    to,
    type,
    name = 'User',
    subject: customSubject,
    message,
    // URLs
    resetUrl,
    verifyUrl,
    // Transaction data
    amount,
    currency = 'USD',
    method,
    reason,
    newBalance,
    // Trade data
    symbol,
    tradeType,
    result,
    profit,
    // Bot/Stake data
    botName,
    stakePlan,
    totalEarned,
    // OTP
    code,
  } = options;

  let subject, html;

  switch (type) {
    case 'welcome':
      subject = 'Welcome to Quantyrex Markets! 🎉';
      html = welcomeEmail(name);
      break;

    case 'verifyEmail':
      subject = 'Verify Your Email — Quantyrex Markets';
      html = verifyEmailTemplate(name, verifyUrl);
      break;

    case 'passwordReset':
      subject = 'Reset Your Password — Quantyrex Markets';
      html = passwordResetEmail(name, resetUrl);
      break;

    case 'depositPending':
      subject = 'Deposit Received — Quantyrex Markets';
      html = depositPendingEmail(name, amount, currency, method);
      break;

    case 'depositConfirmed':
    case 'depositApproved':
      subject = 'Deposit Confirmed ✅ — Quantyrex Markets';
      html = depositConfirmedEmail(name, amount, currency, newBalance);
      break;

    case 'depositRejected':
      subject = 'Deposit Not Approved — Quantyrex Markets';
      html = depositRejectedEmail(name, amount, currency, reason);
      break;

    case 'withdrawalPending':
      subject = 'Withdrawal Request Received — Quantyrex Markets';
      html = withdrawalPendingEmail(name, amount, currency, method);
      break;

    case 'withdrawalApproved':
      subject = 'Withdrawal Approved ✅ — Quantyrex Markets';
      html = withdrawalApprovedEmail(name, amount, currency, method, newBalance);
      break;

    case 'withdrawalRejected':
      subject = 'Withdrawal Declined — Quantyrex Markets';
      html = withdrawalRejectedEmail(name, amount, currency, reason);
      break;

    case 'kycApproved':
      subject = 'KYC Verification Approved ✅ — Quantyrex Markets';
      html = kycApprovedEmail(name);
      break;

    case 'kycRejected':
      subject = 'KYC Verification Update — Quantyrex Markets';
      html = kycRejectedEmail(name, reason);
      break;

    case 'twoFactorOTP':
      subject = 'Your Login Code — Quantyrex Markets';
      html = twoFactorOTPEmail(name, code);
      break;

    case 'tradeResult':
      subject = `Trade ${result === 'win' ? 'Won ✅' : 'Closed'} — Quantyrex Markets`;
      html = tradeResultEmail(name, symbol, tradeType, amount, result, profit, newBalance, currency);
      break;

    case 'botProfit':
      subject = 'Bot Profit Earned 🤖 — Quantyrex Markets';
      html = botProfitEmail(name, botName, profit, totalEarned, newBalance, currency);
      break;

    case 'stakeProfit':
      subject = 'Staking Reward Earned 💎 — Quantyrex Markets';
      html = stakeProfitEmail(name, stakePlan, profit, totalEarned, newBalance, currency);
      break;

    case 'adminMessage':
    default:
      subject = customSubject || 'Message from Quantyrex Markets';
      html = adminMessageEmail(name, customSubject, message);
      break;
  }

  try {
    console.log('📧 Sending email to:', to, '| Type:', type);
    
    const result = await transporter.sendMail({
      from: `"Quantyrex Markets" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    
    console.log('✅ Email sent successfully to:', to);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Email error:', error.message);
    throw error;
  }
};

module.exports = sendEmail;

// Keep this at the end of the file - retry wrapper
const originalSendEmail = sendEmail;
module.exports = async (options) => {
  try {
    return await originalSendEmail(options);
  } catch (error) {
    if (error.message.includes('timeout')) {
      console.log('⚠️ Timeout detected, retrying in 5s...');
      await new Promise(r => setTimeout(r, 5000));
      return await originalSendEmail(options);
    }
    throw error;
  }
};
