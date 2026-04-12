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
    bg: '#f1f5f9',
    cardBg: '#ffffff',
    cardBg2: '#f8fafc',
    text: '#0f172a',
    subText: 'rgba(15,23,42,0.5)',
    border: 'rgba(15,23,42,0.1)',
    accent: '#6366f1',
    navBg: 'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(241,245,249,0.9) 100%)',
    sidebarBg: '#ffffff',
    inputBg: '#f1f5f9',
    tableBg: '#f8fafc',
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const changeTheme = (t) => {
    setTheme(t);
    localStorage.setItem('theme', t);
  };

  return (
    <ThemeContext.Provider value={{ theme, themes, changeTheme, current: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
