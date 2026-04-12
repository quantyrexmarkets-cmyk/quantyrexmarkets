with open('src/pages/Settings.jsx', 'r') as f:
    content = f.read()

# Add useTheme import
content = content.replace(
    "import { ArrowLeft, Settings, Shield, Bell, Lock, Eye, EyeOff } from 'lucide-react';",
    "import { ArrowLeft, Settings, Shield, Bell, Lock, Eye, EyeOff, Palette } from 'lucide-react';\nimport { useTheme, themes } from '../context/ThemeContext';"
)

# Add useTheme hook
content = content.replace(
    "  const [saved, setSaved] = useState(false);",
    "  const [saved, setSaved] = useState(false);\n  const { theme, changeTheme } = useTheme();"
)

# Add theme section before Security
old_section = "        {/* Security */}"
new_section = """        {/* Theme */}
        <Section title="Appearance">
          <div style={{ padding: '10px 0' }}>
            <div style={{ color: 'white', fontSize: '11px', fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Palette size={16} color="#6366f1" />
              </div>
              Theme
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {Object.entries(themes).map(([key, t]) => (
                <div key={key} onClick={() => changeTheme(key)} style={{ flex: 1, cursor: 'pointer', borderRadius: '12px', overflow: 'hidden', border: theme === key ? '2px solid #6366f1' : '2px solid rgba(255,255,255,0.08)', transition: 'all 0.2s', boxShadow: theme === key ? '0 0 12px rgba(99,102,241,0.4)' : 'none' }}>
                  {/* Theme preview */}
                  <div style={{ background: t.bg, height: '60px', padding: '8px', position: 'relative' }}>
                    <div style={{ background: t.cardBg, borderRadius: '6px', height: '100%', border: `1px solid ${t.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '60%', height: '4px', borderRadius: '4px', background: t.accent }} />
                      <div style={{ width: '80%', height: '3px', borderRadius: '4px', background: t.subText }} />
                      <div style={{ width: '50%', height: '3px', borderRadius: '4px', background: t.subText }} />
                    </div>
                    {theme === key && (
                      <div style={{ position: 'absolute', top: '4px', right: '4px', width: '16px', height: '16px', borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width='10' height='10' fill='none' stroke='white' viewBox='0 0 24 24' strokeWidth='3'><polyline points='20 6 9 17 4 12'/></svg>
                      </div>
                    )}
                  </div>
                  <div style={{ background: t.cardBg, padding: '6px', textAlign: 'center' }}>
                    <span style={{ color: t.text, fontSize: '9px', fontWeight: theme === key ? '700' : '400' }}>{t.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Security */}"""

content = content.replace(old_section, new_section)

with open('src/pages/Settings.jsx', 'w') as f:
    f.write(content)

print("✅ Theme selector added to Settings!")
