with open('routes/admin.js', 'r') as f:
    content = f.read()

old = '''      await sendEmail({
                to: user.email,
                subject,
                html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1e2538; color: white; padding: 30px; border-radius: 8px;">
              <div style="text-align: center; margin-bottom: 24px;">
                        <h1 style="color: #6366f1; font-size: 24px;">VertexTrade Pro</h1>
                        </div>                                                                                          <div style="background: #252d3d; padding: 20px; border-radius: 6px; margin-bottom: 20px;">'''

# Find and replace the entire bulk email sendEmail call
import re

# Find the bulk email section
bulk_pattern = r"for \(const user of users\) \{.*?try \{.*?await sendEmail\(\{.*?\}\);.*?\} catch"
match = re.search(bulk_pattern, content, re.DOTALL)

if match:
    print("Found bulk email section")
    print(match.group()[:200])
else:
    print("Pattern not found, trying simpler approach")
    # Find the line with VertexTrade Pro
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if 'VertexTrade Pro' in line:
            print(f"Line {i+1}: {line}")

