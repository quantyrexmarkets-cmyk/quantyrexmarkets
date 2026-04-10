const baseTemplate = require('./base');

const tradeResultEmail = (name, symbol, type, amount, result, profit, newBalance, currency) => {
  const isWin = result === 'win';
  const bgColor = isWin ? 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)' : 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)';
  const statusColor = isWin ? '#166534' : '#dc2626';
  const statusBg = isWin ? '#dcfce7' : '#fee2e2';
  
  return baseTemplate(`
    <h2 style="color:#1e293b;margin:0 0 20px;font-size:22px;">Trade ${isWin ? 'Completed ✅' : 'Closed ❌'}</h2>
    
    <p style="color:#334155;line-height:1.6;margin:0 0 15px;">
      Hi <strong>${name}</strong>,
    </p>
    
    <p style="color:#334155;line-height:1.6;margin:0 0 25px;">
      Your ${symbol} trade has been closed. Here are the details:
    </p>
    
    <div style="background:${bgColor};padding:25px;border-radius:12px;text-align:center;margin:30px 0;">
      <p style="color:rgba(255,255,255,0.9);margin:0 0 8px;font-size:14px;">${isWin ? 'Profit' : 'Loss'}</p>
      <h1 style="color:white;margin:0;font-size:36px;font-weight:700;">
        ${isWin ? '+' : '-'}${currency} ${parseFloat(Math.abs(profit)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </h1>
    </div>
    
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:25px 0;">
      <tr>
        <td style="padding:12px;border-bottom:1px solid #e2e8f0;">
          <span style="color:#64748b;font-size:13px;">Symbol</span>
        </td>
        <td align="right" style="padding:12px;border-bottom:1px solid #e2e8f0;">
          <strong style="color:#1e293b;font-size:15px;">${symbol}</strong>
        </td>
      </tr>
      <tr>
        <td style="padding:12px;border-bottom:1px solid #e2e8f0;">
          <span style="color:#64748b;font-size:13px;">Trade Type</span>
        </td>
        <td align="right" style="padding:12px;border-bottom:1px solid #e2e8f0;">
          <strong style="color:${type === 'buy' ? '#22c55e' : '#ef4444'};font-size:15px;">${type?.toUpperCase()}</strong>
        </td>
      </tr>
      <tr>
        <td style="padding:12px;border-bottom:1px solid #e2e8f0;">
          <span style="color:#64748b;font-size:13px;">Amount</span>
        </td>
        <td align="right" style="padding:12px;border-bottom:1px solid #e2e8f0;">
          <strong style="color:#1e293b;font-size:15px;">${currency} ${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
        </td>
      </tr>
      <tr>
        <td style="padding:12px;border-bottom:1px solid #e2e8f0;">
          <span style="color:#64748b;font-size:13px;">Result</span>
        </td>
        <td align="right" style="padding:12px;border-bottom:1px solid #e2e8f0;">
          <span style="background:${statusBg};color:${statusColor};padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;">${isWin ? 'WIN' : 'LOSS'}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:12px;border-bottom:1px solid #e2e8f0;">
          <span style="color:#64748b;font-size:13px;">New Balance</span>
        </td>
        <td align="right" style="padding:12px;border-bottom:1px solid #e2e8f0;">
          <strong style="color:#1e293b;font-size:15px;">${currency} ${parseFloat(newBalance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
        </td>
      </tr>
    </table>
    
    <div style="text-align:center;margin:30px 0;">
      <a href="https://quantyrexmarkets.vercel.app/dashboard/live-trading" 
         style="background:#6366f1;color:white;padding:14px 35px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">
        Trade Again →
      </a>
    </div>
    
    <p style="color:#334155;margin:20px 0 0;">
      Best regards,<br/>
      <strong>Quantyrex Markets Team</strong>
    </p>
  `);
};

module.exports = tradeResultEmail;
