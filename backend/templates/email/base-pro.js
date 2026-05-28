const baseProTemplate = (content) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="color-scheme" content="dark only">
<meta name="supported-color-schemes" content="dark only">
<title>Quantyrex Markets</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','SF Pro Display',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0a0a0a" style="background:#0a0a0a;">
<tr><td align="center" style="padding:20px 0;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0f0f0f" style="max-width:600px;background:#0f0f0f;border:1px solid #1f1f1f;">
${content}
</table>
</td></tr>
</table>
</body></html>`;

module.exports = baseProTemplate;
