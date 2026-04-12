import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  dark: {
    name: 'Dark',
    bg: '#0f172a',
    cardBg: '#1e293b',
    text: '#ffffff',
    subText: 'rgba(255,255,255,0.5)',
    border: 'rgba(255,255,255,0.08)',
    accent: '#6366f1',
  },
  black: {
    name: 'Black',
    bg: '#000000',
    cardBg: '#0a0a0a',
    text: '#ffffff',
    subText: 'rgba(255,255,255,0.5)',
    border: 'rgba(255,255,255,0.06)',
    accent: '#6366f1',
  },
  white: {
    name: 'White',
    bg: '#f1f5f9',
    cardBg: '#ffffff',
    text: '#0f172a',
    subText: 'rgba(0,0,0,0.5)',
    border: 'rgba(0,0,0,0.08)',
    accent: '#6366f1',
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
