const baseTemplate = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <title>Quantyrex Markets</title>
</head>
<body style="margin:0;padding:0;background:#111111;font-family:'Montserrat',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:0;background:#111111;border-collapse:collapse;">
    <tr>
      <td align="center" style="padding:0;margin:0;">

        <!-- MAIN CONTAINER -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;border-collapse:separate;border-spacing:0;background:#080808;border:1px solid #1d1d1d;border-radius:12px;">

          <!-- Header -->
          <tr>
            <td style="padding:24px 20px 12px 20px;text-align:left;background:#080808;border-radius:12px 12px 0 0;">
              <span style="display:inline-block;color:#ffffff;font-size:25px;font-weight:300;letter-spacing:0.2px;font-family:'Montserrat',Arial,sans-serif;">Quantyrex</span>
              <span style="display:inline-block;margin-left:8px;color:#7c83ff;font-size:25px;font-weight:300;letter-spacing:0.2px;font-family:'Montserrat',Arial,sans-serif;">Markets</span>
            </td>
          </tr>

          <!-- Top short line -->
          <tr>
            <td align="center" style="padding:0 20px 18px 20px;background:#080808;">
              <table width="90%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td style="height:1px;background:#2a2a2a;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:0 22px;background:#080808;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;background:#080808;">
                <tr>
                  <td style="padding:0 0 8px 0;">
                    ${content}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Bottom short line -->
          <tr>
            <td align="center" style="padding:18px 20px 14px 20px;background:#080808;">
              <table width="90%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td style="height:1px;background:#2a2a2a;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:0 20px 22px 20px;text-align:center;background:#080808;border-radius:0 0 12px 12px;">
              <p style="margin:0 0 6px;color:#666666;font-size:10px;font-family:'Montserrat',Arial,sans-serif;">Quantyrex Markets</p>
              <p style="margin:0 0 5px;font-size:10px;font-family:'Montserrat',Arial,sans-serif;">
                <a href="mailto:support@quantyrexmarkets.com" style="color:#7c83ff;text-decoration:none;">support@quantyrexmarkets.com</a>
              </p>
              <p style="margin:0;color:#4a4a4a;font-size:9px;font-family:'Montserrat',Arial,sans-serif;">&copy; 2026 Quantyrex Markets. All rights reserved.</p>
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
