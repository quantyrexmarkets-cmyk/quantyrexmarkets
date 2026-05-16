const baseTemplate = require('./base-enhanced');

const investmentConfirmedEmail = (name, plan, amount, dailyProfit, totalProfit, maturityAmount, roiRate, duration, startDate, maturityDate) => baseTemplate(`

  <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 20px auto;">
    <tr>
      <td style="background-color:#6366f1;padding:8px 24px;text-align:center;">
        <span style="color:#ffffff;font-size:11px;font-weight:500;letter-spacing:3px;font-family:'Helvetica Neue',Arial,sans-serif;">${plan} PLAN — ACTIVATED</span>
      </td>
    </tr>
  </table>

  <h1 style="color:#ffffff;font-size:24px;font-weight:300;margin:0 0 6px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">Investment Confirmed</h1>
  <p style="color:#22c55e;font-size:11px;letter-spacing:2px;font-weight:500;margin:0 0 32px;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">● ACTIVE</p>

  <p style="color:#a1a1aa;font-size:13px;margin:0 0 24px;line-height:1.8;font-family:'Helvetica Neue',Arial,sans-serif;">
    Dear <span style="color:#ffffff;">${name || 'Valued Client'}</span>, your investment in the <span style="color:#6366f1;font-weight:500;">${plan}</span> plan has been activated successfully. Your capital is now growing.
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;background-color:#121212;">
    <tr>
      <td colspan="2" style="padding:10px 16px;border-bottom:1px solid #1a1a1a;">
        <p style="color:#a0a0a0;font-size:9px;letter-spacing:2px;margin:0;font-family:'Helvetica Neue',Arial,sans-serif;">INVESTMENT SUMMARY</p>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#a0a0a0;font-size:10px;font-family:'Helvetica Neue',Arial,sans-serif;">Amount Invested</td>
      <td align="right" style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#ffffff;font-size:12px;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">$${amount}</td>
    </tr>
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#a0a0a0;font-size:10px;font-family:'Helvetica Neue',Arial,sans-serif;">Daily ROI</td>
      <td align="right" style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#6366f1;font-size:12px;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">${roiRate}</td>
    </tr>
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#a0a0a0;font-size:10px;font-family:'Helvetica Neue',Arial,sans-serif;">Daily Profit</td>
      <td align="right" style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#22c55e;font-size:12px;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">+$${dailyProfit}</td>
    </tr>
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#a0a0a0;font-size:10px;font-family:'Helvetica Neue',Arial,sans-serif;">Duration</td>
      <td align="right" style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#ffffff;font-size:11px;font-weight:500;font-family:'Helvetica Neue',Arial,sans-serif;">${duration}</td>
    </tr>
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#a0a0a0;font-size:10px;font-family:'Helvetica Neue',Arial,sans-serif;">Total Profit</td>
      <td align="right" style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#22c55e;font-size:12px;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">+$${totalProfit}</td>
    </tr>
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#a0a0a0;font-size:10px;font-family:'Helvetica Neue',Arial,sans-serif;">Maturity Amount</td>
      <td align="right" style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#f59e0b;font-size:13px;font-weight:700;font-family:'Helvetica Neue',Arial,sans-serif;">$${maturityAmount}</td>
    </tr>
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#a0a0a0;font-size:10px;font-family:'Helvetica Neue',Arial,sans-serif;">Start Date</td>
      <td align="right" style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#ffffff;font-size:11px;font-family:'Helvetica Neue',Arial,sans-serif;">${startDate}</td>
    </tr>
    <tr>
      <td style="padding:10px 16px;color:#a0a0a0;font-size:10px;font-family:'Helvetica Neue',Arial,sans-serif;">Maturity Date</td>
      <td align="right" style="padding:10px 16px;color:#f59e0b;font-size:11px;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">${maturityDate}</td>
    </tr>
  </table>

  <div style="background:#1a1a1a;border:1px solid #22c55e22;border-radius:6px;padding:14px 16px;margin:0 0 24px;">
    <p style="color:#a0a0a0;font-size:10px;margin:0;line-height:1.7;font-family:'Helvetica Neue',Arial,sans-serif;">
      💡 <span style="color:#ffffff;">Your capital is locked</span> for the duration of the plan. On <span style="color:#f59e0b;">${maturityDate}</span>, your full maturity amount of <span style="color:#22c55e;">$${maturityAmount}</span> will be automatically credited to your balance.
    </p>
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
    <tr>
      <td align="center">
        <a href="https://quantyrexmarkets.vercel.app/dashboard/investment-records" style="display:inline-block;background-color:#6366f1;color:#ffffff;font-size:11px;font-weight:500;padding:14px 44px;text-decoration:none;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">VIEW INVESTMENT</a>
      </td>
    </tr>
  </table>

  <p style="color:#71717a;font-size:10px;margin:0;text-align:center;font-family:'Helvetica Neue',Arial,sans-serif;">The Quantyrex Markets Investment Team</p>

`);

module.exports = investmentConfirmedEmail;
