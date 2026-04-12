import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  dark: {
    name: 'Dark',
    bg: '#0f172a',
    cardBg: '#1e293b',
    cardBg2: '#1a2e4a',
    text: '#ffffff',
    subText: 'rgba(255,255,255,0.5)',
    border: 'rgba(255,255,255,0.08)',
    accent: '#6366f1',
    navBg: 'linear-gradient(90deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.9) 100%)',
    sidebarBg: '#0f172a',
    inputBg: '#0e1628',
    tableBg: '#1a2e4a',
  },
  black: {
    name: 'Black',
    bg: '#111111',
    cardBg: '#1a1a1a',
    cardBg2: '#222222',
    text: '#ffffff',
    subText: 'rgba(255,255,255,0.5)',
    border: 'rgba(255,255,255,0.08)',
    accent: '#6366f1',
    navBg: 'linear-gradient(90deg, rgba(10,10,10,0.95) 0%, rgba(20,20,20,0.9) 100%)',
    sidebarBg: '#111111',
    inputBg: '#1a1a1a',
    tableBg: '#1a1a1a',
  },
  white: {
    name: 'White',
    bg: '#f8fafc',
    cardBg: '#ffffff',
    cardBg2: '#f1f5f9',
    text: '#0f172a',
    subText: '#64748b',
    border: '#e2e8f0',
    accent: '#6366f1',
    navBg: 'linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.95) 100%)',
    sidebarBg: '#ffffff',
    inputBg: '#f8fafc',
    tableBg: '#f8fafc',
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    document.body.style.backgroundColor = themes[theme].bg;
    document.body.style.color = themes[theme].text;
  }, [theme]);

  const changeTheme = (t) => {
    setTheme(t);
    localStorage.setItem('theme', t);
    document.documentElement.setAttribute('data-theme', t);
    document.body.style.backgroundColor = themes[t].bg;
    document.body.style.color = themes[t].text;
  };

  return (
    <ThemeContext.Provider value={{ theme, themes, changeTheme, current: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
