const baseTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#000000;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="500" cellpadding="0" cellspacing="0" style="background:#0a0a0a;border:1px solid #1a1a1a;">
          
          <!-- Header with Text Logo (Most Compatible) -->
          <tr>
            <td style="padding:30px 40px;border-bottom:1px solid #1a1a1a;">
              <table width="100%">
                <tr>
                  <td width="45" valign="middle">
                    <!-- Simple geometric logo using table cells -->
                    <table cellpadding="0" cellspacing="0" style="border:2px solid #6366f1;width:40px;height:40px;">
                      <tr>
                        <td style="background:#6366f1;width:20px;height:20px;"></td>
                        <td style="background:#0a0a0a;width:20px;height:20px;border-left:1px solid #6366f1;"></td>
                      </tr>
                      <tr>
                        <td style="background:#0a0a0a;width:20px;height:20px;border-top:1px solid #6366f1;"></td>
                        <td style="background:#6366f1;width:20px;height:20px;opacity:0.6;"></td>
                      </tr>
                    </table>
                  </td>
                  <td valign="middle" style="padding-left:12px;">
                    <div style="line-height:1;">
                      <span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">QUANTYREX</span>
                    </div>
                    <div style="line-height:1;margin-top:2px;">
                      <span style="color:#6366f1;font-size:12px;font-weight:500;letter-spacing:2px;font-family:'Helvetica Neue',Arial,sans-serif;">MARKETS</span>
                    </div>
                  </td>
                </tr>
              </table>
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
            <td style="padding:25px 40px;border-top:1px solid #1a1a1a;">
              <table width="100%">
                <tr>
                  <td>
                    <p style="color:#555555;font-size:10px;margin:0 0 8px;line-height:1.5;">
                      Questions? Contact support@quantyrexmarkets.com
                    </p>
                    <p style="color:#333333;font-size:9px;margin:0;">
                      © 2026 Quantyrex Markets. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
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
