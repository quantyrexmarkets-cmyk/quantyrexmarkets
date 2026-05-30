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
    navBg: '#0f172a',
    sidebarBg: '#1e293b',
    inputBg: '#0e1628',
    tableBg: '#1a2e4a',
    dropdownBg: '#1e2538',
    hoverBg: 'rgba(255,255,255,0.05)',
    overlayText: 'rgba(255,255,255,0.8)',
    mutedText: 'rgba(255,255,255,0.4)',
    faintText: 'rgba(255,255,255,0.25)',
    dimText: 'rgba(255,255,255,0.6)',
    subtleBorder: 'rgba(255,255,255,0.06)',
    subtleBg: 'rgba(255,255,255,0.04)',
    glassBg: 'rgba(255,255,255,0.04)',
    glassBorder: 'rgba(255,255,255,0.08)',
    tableDivider: 'rgba(255,255,255,0.15)',
    tableRowBorder: 'rgba(255,255,255,0.04)',
    tableHeaderBg: 'rgba(255,255,255,0.04)',
    tableOuterBorder: 'rgba(255,255,255,0.08)',
    tableAltRow: 'rgba(255,255,255,0.02)',
    tableCellBorder: 'none',
    paginationBg: 'rgba(255,255,255,0.15)',
    paginationBorder: 'rgba(255,255,255,0.08)',
    paginationText: 'rgba(255,255,255,0.6)',
    cardShadow: '0 4px 24px rgba(0,0,0,0.2)',
    sidebarBorder: 'rgba(255,255,255,0.12)',
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
    navBg: '#111111',
    sidebarBg: '#1a1a1a',
    inputBg: '#1a1a1a',
    tableBg: '#1a1a1a',
    dropdownBg: '#1a1a1a',
    hoverBg: 'rgba(255,255,255,0.05)',
    overlayText: 'rgba(255,255,255,0.8)',
    mutedText: 'rgba(255,255,255,0.4)',
    faintText: 'rgba(255,255,255,0.25)',
    dimText: 'rgba(255,255,255,0.6)',
    subtleBorder: 'rgba(255,255,255,0.06)',
    subtleBg: 'rgba(255,255,255,0.04)',
    glassBg: 'rgba(255,255,255,0.04)',
    glassBorder: 'rgba(255,255,255,0.08)',
    tableDivider: 'rgba(255,255,255,0.15)',
    tableRowBorder: 'rgba(255,255,255,0.04)',
    tableHeaderBg: 'rgba(255,255,255,0.04)',
    tableOuterBorder: 'rgba(255,255,255,0.08)',
    tableAltRow: 'rgba(255,255,255,0.02)',
    tableCellBorder: 'none',
    paginationBg: 'rgba(255,255,255,0.15)',
    paginationBorder: 'rgba(255,255,255,0.08)',
    paginationText: 'rgba(255,255,255,0.6)',
    cardShadow: '0 4px 24px rgba(0,0,0,0.4)',
    sidebarBorder: 'rgba(255,255,255,0.12)',
  },
  white: {
    name: 'White',
    bg: '#eef0f4',
    cardBg: '#f7f8fa',
    cardBg2: '#e9ecf1',
    text: '#0f172a',
    subText: '#64748b',
    border: '#d1d5db',
    accent: '#6366f1',
    navBg: '#f4f5f8',
    sidebarBg: '#f4f5f8',
    inputBg: '#eef0f4',
    tableBg: '#eef0f4',
    dropdownBg: '#f7f8fa',
    hoverBg: 'rgba(0,0,0,0.03)',
    overlayText: '#334155',
    mutedText: '#94a3b8',
    faintText: '#cbd5e1',
    dimText: '#475569',
    subtleBorder: '#d1d5db',
    subtleBg: '#eef0f4',
    glassBg: '#f7f8fa',
    glassBorder: '#d1d5db',
    tableDivider: '#d1d5db',
    tableRowBorder: '#d1d5db',
    tableHeaderBg: '#e9ecf1',
    tableOuterBorder: '#9ca3af',
    tableAltRow: '#eef0f4',
    tableCellBorder: '1px solid #e2e8f0',
    paginationBg: '#e9ecf1',
    paginationBorder: '#d1d5db',
    paginationText: '#64748b',
    cardShadow: 'none',
    sidebarBorder: '#d1d5db',
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
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
