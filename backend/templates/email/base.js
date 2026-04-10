const baseTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#000000;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#000000;">
    <tr>
      <td align="center" style="padding:30px 15px;">
        
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;background:#0a0a0a;border:1px solid #1a1a1a;">
          
          <!-- HEADER -->
          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid #1a1a1a;">
              <span style="color:#ffffff;font-size:18px;font-weight:600;">Quantyrex</span>
              <span style="color:#6366f1;font-size:18px;font-weight:600;"> Markets</span>
            </td>
          </tr>
          
          <!-- CONTENT -->
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>
          
          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #1a1a1a;">
              <p style="margin:0 0 5px 0;color:#505050;font-size:10px;line-height:1.5;">
                Questions? Contact support@quantyrexmarkets.com
              </p>
              <p style="margin:0;color:#353535;font-size:9px;">
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
