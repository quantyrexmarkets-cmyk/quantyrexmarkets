const baseProTemplate = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <style>
    :root { color-scheme: light only; supported-color-schemes: light only; }
    [data-ogsc] .force-light { background-color: #ffffff !important; color: #0f172a !important; }
  </style>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <title>Quantyrex Markets</title>
</head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:'Inter',-apple-system,BlinkMacSystemFont,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:24px 12px;background:#f5f7fa;border-collapse:collapse;">
  <tr>
    <td align="center" style="padding:0;margin:0;">

      <!-- Main Container -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:640px;border-collapse:separate;border-spacing:0;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

        <!-- DARK HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,#0a1730 0%,#0f1e3f 100%);padding:28px 32px;border-bottom:3px solid #2563eb;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <!-- Logo Left -->
                <td valign="middle" style="vertical-align:middle;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="padding-right:14px;">
                        <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#0a1730" stroke="#3b82f6" stroke-width="1.5"/>
                          <path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0a1730" stroke="#60a5fa" stroke-width="1.2"/>
                          <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#3b82f6" stroke="#60a5fa" stroke-width="1"/>
                        </svg>
                      </td>
                      <td valign="middle">
                        <span style="display:block;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:2.5px;line-height:1;font-family:'Inter',Arial,sans-serif;">QUANTYREX</span>
                        <span style="display:block;color:#60a5fa;font-size:11px;font-weight:600;letter-spacing:5px;margin-top:5px;line-height:1;font-family:'Inter',Arial,sans-serif;">MARKETS</span>
                      </td>
                    </tr>
                  </table>
                </td>

                <!-- Trust Badge Right -->
                <td valign="middle" align="right" style="vertical-align:middle;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="padding-right:10px;">
                        <div style="width:34px;height:34px;border-radius:50%;border:1.5px solid rgba(96,165,250,0.3);text-align:center;line-height:34px;background:rgba(96,165,250,0.08);">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;display:inline-block;margin-top:9px;">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0110 0v4"/>
                          </svg>
                        </div>
                      </td>
                      <td valign="middle" align="left">
                        <span style="display:block;color:#ffffff;font-size:12px;font-weight:600;line-height:1.4;">Secure. Trusted. Reliable.</span>
                        <span style="display:block;color:#94a3b8;font-size:10px;font-weight:400;line-height:1.4;margin-top:2px;">Institutional-Grade Security</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CONTENT BODY (white background) -->
        <tr>
          <td bgcolor="#ffffff" style="background:#ffffff;padding:36px 32px;" class="force-light">
            ${content}
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td bgcolor="#ffffff" style="background:#ffffff;border-top:1px solid #e2e8f0;padding:24px 32px;" class="force-light">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <!-- Security Left -->
                <td valign="top" width="38%" style="vertical-align:top;padding-right:8px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="padding-right:10px;">
                        <div style="width:32px;height:32px;border-radius:50%;border:1.5px solid #cbd5e1;text-align:center;line-height:32px;background:#f8fafc;">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;margin-top:8px;">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0110 0v4"/>
                          </svg>
                        </div>
                      </td>
                      <td valign="middle">
                        <p style="margin:0;color:#0f172a;font-size:11px;font-weight:700;line-height:1.4;">Your security is our priority.</p>
                        <p style="margin:3px 0 0;color:#64748b;font-size:10px;line-height:1.5;">All transactions are protected with<br>bank-grade encryption.</p>
                      </td>
                    </tr>
                  </table>
                </td>

                <!-- Logo Center -->
                <td valign="middle" width="24%" align="center" style="vertical-align:middle;">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
                    <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#2563eb" stroke="#2563eb" stroke-width="1"/>
                  </svg>
                </td>

                <!-- Support Right -->
                <td valign="top" width="38%" align="right" style="vertical-align:top;padding-left:8px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="padding-right:10px;">
                        <div style="width:32px;height:32px;border-radius:50%;border:1.5px solid #cbd5e1;text-align:center;line-height:32px;background:#f8fafc;">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;margin-top:8px;">
                            <path d="M3 18v-6a9 9 0 0118 0v6"/>
                            <path d="M21 19a2 2 0 01-2 2h-1v-7h3v5zM3 19a2 2 0 002 2h1v-7H3v5z"/>
                          </svg>
                        </div>
                      </td>
                      <td valign="middle" align="left">
                        <p style="margin:0;color:#0f172a;font-size:11px;font-weight:700;line-height:1.4;">Need Assistance?</p>
                        <p style="margin:3px 0 0;color:#64748b;font-size:10px;line-height:1.5;">Our support team is available 24/7.<br><a href="mailto:support@quantyrexmarkets.com" style="color:#2563eb;text-decoration:none;font-weight:500;">support@quantyrexmarkets.com</a></p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Divider + Bottom row -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;">
              <tr><td style="border-top:1px solid #e2e8f0;height:1px;font-size:0;line-height:0;"></td></tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;">
              <tr>
                <td align="left" style="color:#94a3b8;font-size:10px;">
                  &copy; ${new Date().getFullYear()} Quantyrex Markets. All Rights Reserved.
                </td>
                <td align="right" style="color:#94a3b8;font-size:10px;">
                  This is an automated message. Please do not reply.
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
