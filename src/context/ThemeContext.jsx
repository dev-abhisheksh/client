import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const getEffectiveTheme = () => {
    try {
      const saved = localStorage.getItem('bctTheme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (_) {}
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  const [theme, setTheme] = useState(getEffectiveTheme);

  // Sync theme to document.documentElement and meta tag
  const applyTheme = (newTheme, withTransition = false) => {
    const root = document.documentElement;

    if (withTransition) {
      root.classList.add('tx');
    }

    root.setAttribute('data-theme', newTheme);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', newTheme === 'dark' ? '#0f1a2e' : '#153a78');
    }

    if (withTransition) {
      setTimeout(() => {
        root.classList.remove('tx');
      }, 600);
    }
  };

  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem('bctTheme');
    } catch (_) {}

    const initial = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initial);
    applyTheme(initial, false);

    // Listen for system theme changes if user hasn't set an explicit preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      try {
        if (!localStorage.getItem('bctTheme')) {
          const sysTheme = e.matches ? 'dark' : 'light';
          setTheme(sysTheme);
          applyTheme(sysTheme, true);
        }
      } catch (_) {}
    };

    try {
      mediaQuery.addEventListener('change', handleChange);
    } catch (_) {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      try {
        mediaQuery.removeEventListener('change', handleChange);
      } catch (_) {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme, true);
    try {
      localStorage.setItem('bctTheme', nextTheme);
    } catch (_) {}
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
