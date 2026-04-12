with open('controllers/userController.js', 'r') as f:
    content = f.read()

old = """    if (req.file) {
      const result = await uploadToCloudinary(req.file, 'vertextrade/avatars');
      update.avatar = result.secure_url;
    }"""

new = """    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file, 'quantyrex/avatars');
        update.avatar = result.secure_url;
      } catch (uploadErr) {
        console.log('Avatar upload failed:', uploadErr.message);
        // Convert to base64 as fallback
        const base64 = req.file.buffer.toString('base64');
        update.avatar = 'data:' + req.file.mimetype + ';base64,' + base64;
      }
    }"""

if old in content:
    content = content.replace(old, new)
    print("✅ Profile update fixed with fallback!")
else:
    print("❌ Pattern not found")

with open('controllers/userController.js', 'w') as f:
    f.write(content)
