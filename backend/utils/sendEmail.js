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

console.log('🔍 EMAIL: Setting up Gmail SMTP...');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'Set (length: ' + process.env.EMAIL_PASSWORD.length + ')' : 'Missing');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify connection
transporter.verify(function(error, success) {
  if (error) {
    console.error('❌ Gmail SMTP Error:', error.message);
  } else {
    console.log('✅ Gmail SMTP ready to send emails');
  }
});

const sendEmail = async (options) => {
  try {
    console.log('\n📧 ========== EMAIL SEND ==========');
    console.log('To:', options.to);
    console.log('Type:', options.type);

    const {
      to,
      type,
      name = 'User',
      subject: customSubject,
      message,
      resetUrl,
      verifyUrl,
      amount,
      currency = 'USD',
      method,
      reason,
      newBalance,
      symbol,
      tradeType,
      result,
      profit,
      botName,
      stakePlan,
      totalEarned,
      code,
      otp,
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
        subject = 'Action Required: Upgrade Your Account to Continue';
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

    console.log('Subject:', subject);
    console.log('Sending...');

    const info = await transporter.sendMail({
      from: `"Quantyrex Markets" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: html
    });

    console.log('✅ Email sent!');
    console.log('Message ID:', info.messageId);
    console.log('==================================\n');

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('\n❌ Email Error:', error.message);
    console.error('==================================\n');
    return { success: false, error: error.message };
  }
};

module.exports = sendEmail;
