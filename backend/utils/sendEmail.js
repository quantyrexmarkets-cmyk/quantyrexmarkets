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
const planUpgradeEmail = require('../templates/email/planUpgrade');
const registrationFeeEmail = require('../templates/email/registrationFee');
const upgradePromoEmail = require('../templates/email/upgradePromo');
const withdrawalCodeEmail = require('../templates/email/withdrawalCode');

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
    // OTP/Code
    code,
    otp,
    // Package data
    package: packageName,
    planDetails,
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
      html = twoFactorOTPEmail(name, code || otp);
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

    case 'planUpgrade':
      subject = 'Account Upgraded! 🎉 — Quantyrex Markets';
      html = planUpgradeEmail(name, packageName, planDetails);
      break;

    case 'registrationFee':
      subject = 'Registration Fee Applied — Quantyrex Markets';
      html = registrationFeeEmail(name, amount, currency);
      break;

    case 'upgradePromo':
      subject = 'Special Upgrade Offer! 🎁 — Quantyrex Markets';
      html = upgradePromoEmail(name);
      break;

    case 'withdrawalCode':
      subject = 'Your Withdrawal Code 🔐 — Quantyrex Markets';
      html = withdrawalCodeEmail(name, code);
      break;

    case 'adminMessage':
    case 'custom':
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
    // Don't throw - just log and return failure
    return { success: false, error: error.message };
  }
};

module.exports = sendEmail;
