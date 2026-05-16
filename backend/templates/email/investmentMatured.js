const baseTemplate = require('./base-enhanced');

const investmentMaturedEmail = (name, plan, amount, totalProfit, maturityAmount, roiRate, duration) => baseTemplate(`

  <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 20px auto;">
    <tr>
      <td style="background-color:#22c55e;padding:8px 24px;text-align:center;">
        <span style="color:#ffffff;font-size:11px;font-weight:500;letter-spacing:3px;font-family:'Helvetica Neue',Arial,sans-serif;">${plan} PLAN — MATURED</span>
      </td>
    </tr>
  </table>

  <h1 style="color:#ffffff;font-size:24px;font-weight:300;margin:0 0 6px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">🎉 Investment Matured!</h1>
  <p style="color:#22c55e;font-size:11px;letter-spacing:2px;font-weight:500;margin:0 0 32px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">FUNDS CREDITED TO YOUR BALANCE</p>

  <p style="color:#a1a1aa;font-size:13px;margin:0 0 24px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;">
    Congratulations <span style="color:#ffffff;">${name || 'Valued Client'}</span>! Your <span style="color:#6366f1;font-weight:500;">${plan}</span> investment has matured. Your funds including profit have been credited to your balance.
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background-color:#121212;">
    <tr>
      <td colspan="2" style="padding:10px 16px;border-bottom:1px solid #1a1a1a;">
        <p style="color:#a0a0a0;font-size:9px;letter-spacing:2px;margin:0;font-family:'Helvetica Neue',Arial,sans-serif;">MATURITY SUMMARY</p>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#a0a0a0;font-size:10px;font-family:'Helvetica Neue',Arial,sans-serif;">Amount Invested</td>
      <td align="right" style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#ffffff;font-size:12px;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">$${amount}</td>
    </tr>
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#a0a0a0;font-size:10px;font-family:'Helvetica Neue',Arial,sans-serif;">ROI</td>
      <td align="right" style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#6366f1;font-size:12px;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">${roiRate}</td>
    </tr>
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#a0a0a0;font-size:10px;font-family:'Helvetica Neue',Arial,sans-serif;">Duration</td>
      <td align="right" style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#ffffff;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;">${duration}</td>
    </tr>
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#a0a0a0;font-size:10px;font-family:'Helvetica Neue',Arial,sans-serif;">Total Profit Earned</td>
      <td align="right" style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#22c55e;font-size:13px;font-weight:700;font-family:'Helvetica Neue',Arial,sans-serif;">+$${totalProfit}</td>
    </tr>
    <tr>
      <td style="padding:10px 16px;color:#a0a0a0;font-size:10px;font-family:'Helvetica Neue',Arial,sans-serif;">Total Credited to Balance</td>
      <td align="right" style="padding:10px 16px;color:#f59e0b;font-size:14px;font-weight:700;font-family:'Helvetica Neue',Arial,sans-serif;">$${maturityAmount}</td>
    </tr>
  </table>

  <div style="background:#1a1a1a;border:1px solid #22c55e33;border-radius:6px;padding:14px 16px;margin:0 0 24px;">
    <p style="color:#a0a0a0;font-size:10px;margin:0;line-height:1.7;font-family:'Helvetica Neue',Arial,sans-serif;">
      ✅ <span style="color:#22c55e;font-weight:600;">$${maturityAmount}</span> has been credited to your account balance. You can now withdraw or reinvest your funds.
    </p>
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center" style="padding-right:8px;">
        <a href="https://quantyrexmarkets.vercel.app/dashboard/packages" style="display:inline-block;background-color:#6366f1;color:#ffffff;font-size:11px;font-weight:500;padding:14px 32px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">REINVEST</a>
      </td>
      <td align="center" style="padding-left:8px;">
        <a href="https://quantyrexmarkets.vercel.app/dashboard/withdraw" style="display:inline-block;background-color:#22c55e;color:#ffffff;font-size:11px;font-weight:500;padding:14px 32px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">WITHDRAW</a>
      </td>
    </tr>
  </table>

  <p style="color:#71717a;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Investment Team</p>

`);

module.exports = investmentMaturedEmail;
