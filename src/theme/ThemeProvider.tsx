import { ReactNode, createContext, useContext, useMemo } from 'react';
import { colors } from './colors';
import { typography } from './typography';

interface ThemeContextValue {
  colors: typeof colors;
  typography: typeof typography;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const value = useMemo(
    () => ({
      colors,
      typography,
    }),
    [],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return ctx;
};
