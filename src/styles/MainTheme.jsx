'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as NextThemesProvider } from "next-themes";

const ColorSchemeContext = createContext();

export const useColorScheme = () => {
  const context = useContext(ColorSchemeContext);
  if (!context) {
    throw new Error('useColorScheme must be used within a ColorSchemeProvider');
  }
  return context;
};

const THEME_COLORS = {
  light: {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#ffffff',
    text: '#000000',
    muted: '#666666',
    border: '#e0e0e0',
    card: '#f5f5f5'
  },
  dark: {
    primary: '#3498db', 
    secondary: '#2ecc71',
    background: '#1a1a1a',
    text: '#ffffff',
    muted: '#888888',
    border: '#333333',
    card: '#2d2d2d'
  }
};

export function ColorSchemeProvider({ children }) {
  const [colorScheme, setColorScheme] = useState('light');

  // Load saved theme preference
  useEffect(() => {
    const savedScheme = localStorage.getItem('colorScheme');
    if (savedScheme) {
      setColorScheme(savedScheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setColorScheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Apply theme colors
  useEffect(() => {
    const colors = THEME_COLORS[colorScheme];
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}-color`, value);
    });
  }, [colorScheme]);

  const changeColorScheme = (newScheme) => {
    if (newScheme === 'light' || newScheme === 'dark') {
      setColorScheme(newScheme);
      localStorage.setItem('colorScheme', newScheme);
    }
  };

  return (
    <ColorSchemeContext.Provider 
      value={{ 
        colorScheme,
        changeColorScheme,
        themeColors: THEME_COLORS
      }}
    >
      {children}
    </ColorSchemeContext.Provider>
  );
}

export function MainThemeProvider({ children }) {
  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <ColorSchemeProvider>{children}</ColorSchemeProvider>
    </NextThemesProvider>
  );
}
