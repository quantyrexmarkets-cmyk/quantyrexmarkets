const SibApiV3Sdk = require('sib-api-v3-sdk');

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

console.log('🔍 EMAIL DEBUG: Initializing email service...');
console.log('BREVO_API_KEY present:', !!process.env.BREVO_API_KEY);
console.log('EMAIL_USER:', process.env.EMAIL_USER);

let apiInstance;
try {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.BREVO_API_KEY;
  apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  console.log('✅ Brevo API initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Brevo API:', error.message);
}

const sendEmail = async (options) => {
  try {
    console.log('\n📧 ========== EMAIL SEND ATTEMPT ==========');
    console.log('To:', options.to);
    console.log('Type:', options.type);
    console.log('Name:', options.name);

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

    console.log('Building template for type:', type);

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

    console.log('Template built. Subject:', subject);
    console.log('HTML length:', html ? html.length : 'MISSING');

    if (!html) {
      throw new Error('HTML template is empty or undefined');
    }

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;
    sendSmtpEmail.sender = {
      name: 'Quantyrex Markets',
      email: process.env.EMAIL_USER || 'quantyrexmarkets@gmail.com'
    };
    sendSmtpEmail.to = [{ email: to, name: name }];

    console.log('Calling Brevo API...');
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log('✅ SUCCESS! Email sent via Brevo');
    console.log('Message ID:', data.messageId);
    console.log('==========================================\n');

    return { success: true, messageId: data.messageId };
  } catch (error) {
    console.error('\n❌ EMAIL ERROR');
    console.error('Message:', error.message);
    console.error('Code:', error.code);
    if (error.response) {
      console.error('Response:', error.response);
    }
    console.error('==========================================\n');
    return { success: false, error: error.message };
  }
};

module.exports = sendEmail;
