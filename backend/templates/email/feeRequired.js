const baseTemplate = require('./base');

const FEE_DESCRIPTIONS = {
  processing: 'A Withdrawal Processing Fee is a standard charge applied to cover the administrative and operational costs associated with processing your withdrawal request. This includes payment gateway fees, transaction verification, and secure fund transfer procedures.',
  tax: 'A Tax / Compliance Fee is a mandatory charge related to government regulations, tax obligations, and legal compliance requirements that our platform must adhere to when handling financial transactions on your behalf. This ensures your funds are transferred in full accordance with applicable financial laws.',
  conversion: 'A Currency Conversion Fee is applied when your withdrawal requires conversion between currencies or cryptocurrency pairs. This fee covers the cost of real-time exchange rate processing and ensures your funds are accurately converted at the current market rate.',
  inactivity: 'An Inactivity Fee is a maintenance charge applied to accounts that have not conducted any trading or investment activity within a defined period. This fee helps maintain your account in good standing and covers the costs of keeping your account active and secure.',
  maintenance: 'An Account Maintenance Fee is a periodic charge that covers the ongoing costs of maintaining your trading account, including platform access, security monitoring, data storage, and customer support services dedicated to your account.',
  registration: 'A Registration Fee is a one-time charge required to fully activate your trading account and unlock access to all platform features. This fee covers account verification, compliance checks, and the setup of your personalized trading environment.',
};

const feeRequiredEmail = (name, feeLabel, feeAmount, currency, feeType) => baseTemplate(`
  <p style="color:#ffffff;font-size:13px;margin:0 0 20px;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Dear ${name || 'Valued Client'},</p>

  <p style="color:#ffffff;font-size:12px;margin:0 0 20px;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">
    We are writing to inform you that an outstanding fee has been applied to your Quantyrex Markets account. This fee must be settled before you can proceed with any withdrawal request.
  </p>

  <table width="100%" style="margin:20px 0;background:#0d1117;border:1px solid #1a1a1a;border-radius:4px;"><tr><td style="padding:16px;"><table width="100%">
    <tr><td style="padding:10px 0;border-bottom:1px solid #1a1a1a;">
      <span style="color:#9ca3af;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Fee Type</span>
    </td><td align="right" style="padding:10px 0;border-bottom:1px solid #1a1a1a;">
      <span style="color:#6366f1;font-size:12px;font-family:'Montserrat',Arial,sans-serif;font-weight:600;">${feeLabel}</span>
    </td></tr>
    <tr><td style="padding:10px 0;">
      <span style="color:#9ca3af;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Amount Due</span>
    </td><td align="right" style="padding:10px 0;">
      <span style="color:#ef4444;font-size:16px;font-family:'Montserrat',Arial,sans-serif;font-weight:700;">${currency || '$'}${parseFloat(feeAmount || 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
    </td></tr>
    <tr><td style="padding:10px 0;border-top:1px solid #1a1a1a;">
      <span style="color:#9ca3af;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">Status</span>
    </td><td align="right" style="padding:10px 0;border-top:1px solid #1a1a1a;">
      <span style="color:#f59e0b;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:600;">⚠ Payment Required</span>
    </td></tr>
  </table></td></tr></table>

  <div style="background:#0d1117;border-left:3px solid #6366f1;padding:14px 16px;margin:20px 0;border-radius:0 4px 4px 0;">
    <p style="color:#9ca3af;font-size:10px;font-family:'Montserrat',Arial,sans-serif;font-weight:600;margin:0 0 6px;text-transform:uppercase;letter-spacing:1px;">What is this fee?</p>
    <p style="color:#ffffff;font-size:11px;font-family:'Montserrat',Arial,sans-serif;font-weight:300;margin:0;line-height:1.8;">
      ${FEE_DESCRIPTIONS[feeType] || FEE_DESCRIPTIONS['processing']}
    </p>
  </div>

  <p style="color:#ffffff;font-size:12px;margin:20px 0;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">
    To avoid any delays in your withdrawal processing, please log in to your dashboard and complete the payment at your earliest convenience.
  </p>

  <div style="text-align:center;margin:28px 0;">
    <a href="https://quantyrexmarkets.vercel.app/dashboard/withdraw" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#4f46e5);color:#ffffff;font-size:11px;font-weight:600;padding:14px 36px;text-decoration:none;letter-spacing:1.5px;border-radius:2px;font-family:'Montserrat',Arial,sans-serif;">
      PAY FEE NOW →
    </a>
  </div>

  <div style="background:#0d1117;border:1px solid #1a1a1a;padding:14px 16px;margin:20px 0;border-radius:4px;">
    <p style="color:#9ca3af;font-size:10px;font-family:'Montserrat',Arial,sans-serif;margin:0 0 6px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Important Notice</p>
    <ul style="color:#9ca3af;font-size:11px;margin:0;padding-left:16px;line-height:2;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">
      <li>Withdrawal requests will be held until this fee is settled</li>
      <li>Failure to pay may result in account restrictions</li>
      <li>Contact support if you believe this fee was applied in error</li>
    </ul>
  </div>

  <p style="color:#9ca3af;font-size:11px;margin:24px 0 0;line-height:1.8;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">
    If you have any questions or concerns regarding this fee, please do not hesitate to contact our support team. We are here to assist you.
  </p>

  <p style="color:#ffffff;font-size:11px;margin:20px 0 0;line-height:1.7;font-family:'Montserrat',Arial,sans-serif;font-weight:300;">
    Warm regards,<br/>
    <span style="color:#6366f1;font-weight:600;">The Quantyrex Markets Compliance Team</span>
  </p>
`);

module.exports = feeRequiredEmail;
