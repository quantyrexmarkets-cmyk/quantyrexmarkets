const baseProTemplate = (content) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="color-scheme" content="dark only">
<meta name="supported-color-schemes" content="dark only">
<title>Quantyrex Markets</title>
</head>
<body style="margin:0;padding:0;background:#080808;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#080808" style="background:#080808;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#080808" style="max-width:600px;background:#080808;">
${content}
</table>
</td></tr>
</table>
</body>
</html>`;

module.exports = baseProTemplate;
