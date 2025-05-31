import React, { createContext, useContext, useState } from 'react';

const ThemeContext = React.createContext();

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      bg: {
        primary: isDarkMode ? 'bg-gray-950' : 'bg-white',
        secondary: isDarkMode ? 'bg-zinc-900' : 'bg-gray-50',
        tertiary: isDarkMode ? 'bg-zinc-800' : 'bg-white',
        input: isDarkMode ? 'bg-zinc-800' : 'bg-gray-50',
        card: isDarkMode ? 'bg-zinc-800' : 'bg-gray-50',
        accent: isDarkMode ? 'bg-gradient-to-r from-[#2F82EF] to-[#FF3B3B]' : 'bg-gradient-to-r from-[#2F82EF] to-[#FF3B3B]',
      },
      text: {
        primary: isDarkMode ? 'text-white' : 'text-gray-900',
        secondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
        tertiary: isDarkMode ? 'text-gray-400' : 'text-gray-500',
        muted: isDarkMode ? 'text-gray-500' : 'text-gray-400',
        accent: 'text-blue-500',
      },
      border: {
        primary: isDarkMode ? 'border-gray-700' : 'border-gray-200',
        secondary: isDarkMode ? 'border-gray-600' : 'border-gray-300',
        accent: 'border-blue-500',
      },
      button: {
        primary: 'bg-blue-500 hover:bg-blue-600',
        secondary: isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50',
        icon: isDarkMode ? 'text-gray-300 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800',
        iconnonactive: isDarkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-500',
      },
      hover: {
        bg: isDarkMode ? 'hover:bg-zinc-800/80' : 'hover:bg-gray-100',
        bgSecondary: isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-50',
      }
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};