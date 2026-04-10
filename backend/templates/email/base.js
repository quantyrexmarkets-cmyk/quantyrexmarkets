const baseTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quantyrex Markets</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, #0F172A 0%, #1e293b 100%);padding:30px 40px;text-align:center;">
              <div style="width:60px;height:60px;margin:0 auto 15px;">
                <svg viewBox="0 0 40 40" fill="none" style="width:100%;height:100%;">
                  <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#0F172A" stroke="#6366F1" stroke-width="1.5"/>
                  <path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0F172A" stroke="#6366F1" stroke-width="1.2"/>
                  <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#6366F1" stroke="#6366F1" stroke-width="1"/>
                </svg>
              </div>
              <h1 style="color:white;margin:0;font-size:24px;font-weight:700;">Quantyrex Markets</h1>
              <p style="color:rgba(255,255,255,0.6);margin:5px 0 0;font-size:13px;">Your Gateway to Financial Freedom</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding:40px;">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background:#0F172A;padding:30px 40px;text-align:center;">
              <p style="color:rgba(255,255,255,0.5);margin:0 0 15px;font-size:13px;">
                Need help? Contact us at <a href="mailto:support@quantyrexmarkets.com" style="color:#6366f1;text-decoration:none;">support@quantyrexmarkets.com</a>
              </p>
              <div style="margin:15px 0;">
                <a href="https://quantyrexmarkets.vercel.app" style="color:#6366f1;text-decoration:none;margin:0 10px;font-size:12px;">Dashboard</a>
                <span style="color:rgba(255,255,255,0.3);">•</span>
                <a href="https://quantyrexmarkets.vercel.app/terms" style="color:#6366f1;text-decoration:none;margin:0 10px;font-size:12px;">Terms</a>
                <span style="color:rgba(255,255,255,0.3);">•</span>
                <a href="https://quantyrexmarkets.vercel.app" style="color:#6366f1;text-decoration:none;margin:0 10px;font-size:12px;">Help Center</a>
              </div>
              <p style="color:rgba(255,255,255,0.4);margin:15px 0 0;font-size:11px;">
                © 2026 Quantyrex Markets. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

module.exports = baseTemplate;
