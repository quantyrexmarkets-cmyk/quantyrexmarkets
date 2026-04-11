const welcomeEmail = (name) => `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#6366f1,#4f46e5);padding:40px 30px;text-align:center;">
      <h1 style="color:white;margin:0;font-size:28px;font-weight:700;">Quantyrex Markets</h1>
      <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px;">Smart Investment Platform</p>
    </div>
    <div style="padding:40px 30px;">
      <h2 style="color:#1a1a2e;font-size:22px;margin:0 0 16px;">Welcome, ${name}! 🎉</h2>
      <p style="color:#555;font-size:15px;line-height:1.7;margin:0 0 20px;">Your account has been successfully verified. You now have full access to all Quantyrex Markets features.</p>
      <div style="background:#f8f9ff;border-left:4px solid #6366f1;padding:16px 20px;border-radius:0 8px 8px 0;margin:0 0 24px;">
        <p style="color:#4f46e5;font-size:14px;font-weight:600;margin:0 0 8px;">What you can do now:</p>
        <ul style="color:#555;font-size:13px;line-height:2;margin:0;padding-left:20px;">
          <li>Deposit funds and start investing</li>
          <li>Copy expert traders automatically</li>
          <li>Trade live markets in real-time</li>
          <li>Earn passive income with our bot plans</li>
        </ul>
      </div>
      <div style="text-align:center;margin:30px 0;">
        <a href="${process.env.FRONTEND_URL}/dashboard" style="background:linear-gradient(135deg,#6366f1,#4f46e5);color:white;padding:14px 40px;border-radius:8px;text-decoration:none;font-size:15px;font-weight:600;display:inline-block;">Go to Dashboard →</a>
      </div>
      <p style="color:#888;font-size:13px;text-align:center;margin:0;">Need help? Contact us at <a href="mailto:quantyrexmarkets@gmail.com" style="color:#6366f1;">quantyrexmarkets@gmail.com</a></p>
    </div>
    <div style="background:#f8f9ff;padding:20px 30px;text-align:center;border-top:1px solid #eee;">
      <p style="color:#aaa;font-size:12px;margin:0;">© 2026 Quantyrex Markets. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

module.exports = welcomeEmail;
