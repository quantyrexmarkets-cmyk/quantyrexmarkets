with open('routes/admin.js', 'r') as f:
    content = f.read()

old = '''        await sendEmail({
                to: user.email,
          subject,
                html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1e2538; color: white; padding: 30px; border-radius: 8px;">
              <div style="text-align: center; margin-bottom: 24px;">
                <h1 style="color: #6366f1; font-size: 24px;">VertexTrade Pro</h1>
              </div>                                                                                          <div style="background: #252d3d; padding: 20px; border-radius: 6px; margin-bottom: 20px;">                                                                                                        <p style="color: #e2e8f0; font-size: 14px; line-height: 1.6;">Dear ${user.firstName} ${user.lastName},</p>                                                                                      <p style="color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-line;">${message}</p>
              </div>                                                                                          <p style="color: rgba(255,255,255,0.4); font-size: 11px; text-align: center;">This email was sent from VertexTrade Pro admin panel.</p>                                                       </div>
          `
                });'''

new = '''        await sendEmail({
          to: user.email,
          type: 'adminMessage',
          name: user.firstName,
          subject,
          message,
        });'''

if old in content:
    content = content.replace(old, new)
    print("✅ Bulk email fixed!")
else:
    # Try simpler approach - find VertexTrade Pro and replace the block
    lines = content.split('\n')
    new_lines = []
    skip = False
    for i, line in enumerate(lines):
        if 'VertexTrade Pro' in line:
            # Go back to find the sendEmail call start
            # Remove from "await sendEmail({" to the closing "});"
            # Find how many lines back the sendEmail starts
            j = i
            while j > 0 and 'await sendEmail({' not in lines[j]:
                j -= 1
            # Remove those lines and replace
            # First remove the lines we already added
            while len(new_lines) > 0 and new_lines[-1].strip() in ['', 'await sendEmail({', 'to: user.email,', 'subject,', "html: `"]:
                new_lines.pop()
            new_lines.append('        await sendEmail({\n')
            new_lines.append("          to: user.email,\n")
            new_lines.append("          type: 'adminMessage',\n")
            new_lines.append("          name: user.firstName,\n")
            new_lines.append("          subject,\n")
            new_lines.append("          message,\n")
            new_lines.append("        });\n")
            skip = True
            continue
        if skip:
            if '});' in line:
                skip = False
            continue
        new_lines.append(line + '\n')
    
    content = ''.join(new_lines)
    print("✅ Bulk email fixed (line by line)!")

with open('routes/admin.js', 'w') as f:
    f.write(content)
