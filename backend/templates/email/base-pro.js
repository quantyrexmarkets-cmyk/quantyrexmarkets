const baseProTemplate = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <title>Quantyrex Markets</title>
</head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;-webkit-font-smoothing:antialiased;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f7fa;">
  <tr>
    <td align="center" style="padding:16px 8px;">

      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#ffffff;border-radius:8px;border:1px solid #e5e7eb;">

        <!-- HEADER (minimal — no logo) -->
        <tr>
          <td bgcolor="#0f1e3f" style="background:#0f1e3f;padding:16px 20px;border-bottom:2px solid #2563eb;border-radius:8px 8px 0 0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td valign="middle" style="color:#ffffff;font-size:13px;font-weight:700;letter-spacing:2px;">QUANTYREX MARKETS</td>
                <td valign="middle" align="right" style="color:#94a3b8;font-size:10px;font-weight:500;">🔒 Secure • Trusted</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td bgcolor="#ffffff" style="background:#ffffff;padding:24px 20px;">
            ${content}
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td bgcolor="#f8fafc" style="background:#f8fafc;padding:16px 20px;border-top:1px solid #e5e7eb;border-radius:0 0 8px 8px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="color:#64748b;font-size:11px;line-height:1.5;">
                  <strong style="color:#0f172a;">Need help?</strong> <a href="mailto:support@quantyrexmarkets.com" style="color:#2563eb;text-decoration:none;">support@quantyrexmarkets.com</a>
                </td>
              </tr>
              <tr>
                <td style="padding-top:8px;color:#94a3b8;font-size:10px;">
                  &copy; ${new Date().getFullYear()} Quantyrex Markets · Automated message · Please do not reply
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

module.exports = baseProTemplate;
