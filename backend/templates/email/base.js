const baseTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quantyrex Markets</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#000000;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#0a0a0a;border:1px solid #1a1a1a;border-radius:8px;">
          <!-- Header -->
          <tr>
            <td style="padding:32px 32px 24px;text-align:center;border-bottom:1px solid #1a1a1a;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:600;letter-spacing:0.5px;">
                QUANTYREX MARKETS
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;text-align:center;border-top:1px solid #1a1a1a;background:#000000;">
              <p style="margin:0 0 8px;color:#666666;font-size:11px;">
                Questions? Contact <a href="mailto:support@quantyrexmarkets.com" style="color:#6366f1;text-decoration:none;">support@quantyrexmarkets.com</a>
              </p>
              <p style="margin:0;color:#444444;font-size:10px;">
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
