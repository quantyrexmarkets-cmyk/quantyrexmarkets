with open('routes/admin.js', 'r') as f:
    content = f.read()

# Fix the broken bulk email section - find and replace the entire block
lines = content.split('\n')
new_lines = []
skip_until_sent = False

i = 0
while i < len(lines):
    line = lines[i]
    
    # Find the broken bulk email section
    if "for (const user of users) {" in line and not skip_until_sent:
        new_lines.append(line)
        i += 1
        # Add the clean version
        new_lines.append('      try {')
        new_lines.append('        await sendEmail({')
        new_lines.append("          to: user.email,")
        new_lines.append("          type: 'adminMessage',")
        new_lines.append("          name: user.firstName,")
        new_lines.append("          subject,")
        new_lines.append("          message,")
        new_lines.append("        });")
        new_lines.append('        sent++;')
        new_lines.append('      } catch(e) {}')
        new_lines.append('    }')
        # Skip until we find the closing of the old block
        while i < len(lines):
            if 'sent++;' in lines[i] and 'catch' in lines[i-1] if i > 0 else False:
                i += 1
                continue
            if "res.json({ message: `Email sent to" in lines[i]:
                break
            i += 1
        continue
    
    new_lines.append(line)
    i += 1

content = '\n'.join(new_lines)

with open('routes/admin.js', 'w') as f:
    f.write(content)

print("✅ Fixed bulk email!")
