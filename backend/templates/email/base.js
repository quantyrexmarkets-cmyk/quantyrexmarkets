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
        
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;background:#0a0a0a;border:1px solid #1f1f1f;">
          
          <!-- HEADER -->
          <tr>
            <td style="padding:25px 35px;border-bottom:1px solid #1f1f1f;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <!-- Simple Hexagon Icon -->
                  <td width="32" height="32" valign="middle" style="background:#0d1117;border:1.5px solid #6366f1;text-align:center;">
                    <div style="width:12px;height:12px;background:#6366f1;margin:auto;"></div>
                  </td>
                  <!-- Brand Name -->
                  <td valign="middle" style="padding-left:12px;">
                    <span style="color:#ffffff;font-size:16px;font-weight:600;letter-spacing:0.5px;">QUANTYREX</span>
                    <span style="color:#6366f1;font-size:16px;font-weight:600;"> MARKETS</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- CONTENT -->
          <tr>
            <td style="padding:35px;">
              ${content}
            </td>
          </tr>
          
          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 35px;border-top:1px solid #1f1f1f;">
              <p style="margin:0 0 5px 0;color:#505050;font-size:10px;line-height:1.5;">
                Questions? Contact support@quantyrexmarkets.com
              </p>
              <p style="margin:0;color:#353535;font-size:9px;">
                © 2026 Quantyrex Markets
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
