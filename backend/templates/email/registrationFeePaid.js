const baseTemplate = require('./base-enhanced');
const { formatUSD } = require('./_money');

const registrationFeePaidEmail = (name, amount) => baseTemplate(`
  <p style="color:#22c55e;font-size:10px;letter-spacing:3px;margin:0 0 12px;text-align:center;">PAYMENT CONFIRMED</p>
  <h1 style="color:#22c55e;font-size:30px;font-weight:200;margin:0 0 6px;text-align:center;">${formatUSD(amount)}</h1>
  <p style="color:#f59e0b;font-size:11px;letter-spacing:2px;font-weight:500;margin:0 0 28px;text-align:center;">ACCOUNT FULLY ACTIVATED</p>

  <p style="color:#a1a1aa;font-size:13px;line-height:1.8;">Dear <span style="color:#fff;">${name || 'Client'}</span>,</p>

  <p style="color:#a1a1aa;font-size:13px;line-height:1.8;">
    We are pleased to confirm that your registration fee of <span style="color:#22c55e;font-weight:600;">${formatUSD(amount)}</span> has been received and successfully processed.
  </p>

  <div style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.25);border-radius:8px;padding:18px;margin:24px 0;">
    <p style="color:#22c55e;font-size:11px;letter-spacing:2px;margin:0 0 10px;font-weight:600;">✓ FULL ACCESS GRANTED</p>
    <p style="color:#d4d4d8;font-size:12px;line-height:1.7;margin:0;">
      Your Quantyrex Markets account is now fully activated. You may proceed with deposits, trades, withdrawals, and all premium features without restriction.
    </p>
  </div>

  <p style="color:#a1a1aa;font-size:12px;line-height:1.8;">
    Thank you for completing this verification step. We appreciate your trust in Quantyrex Markets and look forward to supporting your trading journey.
  </p>

  <p style="color:#a1a1aa;font-size:12px;line-height:1.8;margin-top:20px;">
    Should you require any assistance, our support team is available around the clock.
  </p>

  <p style="color:#71717a;font-size:10px;text-align:center;margin-top:32px;">The Quantyrex Markets Finance Team</p>
`);

module.exports = registrationFeePaidEmail;
