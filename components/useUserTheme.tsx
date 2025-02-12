import { useState, useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemePreference = 'light' | 'dark' | 'auto';

export function useUserTheme (): [ThemePreference, (theme: ThemePreference) => void] {
  const [theme, setTheme] = useState<ThemePreference>('auto');

  useEffect(() => {
    AsyncStorage.getItem('theme').then((storedTheme) => {
      if (storedTheme) setTheme(storedTheme as ThemePreference);
    });
  }, []);

  const updateTheme = (newTheme: ThemePreference) => {
    setTheme(newTheme);
    AsyncStorage.setItem('theme', newTheme);
  };

  return [theme, updateTheme];
}









// import React, { createContext, useState, useContext } from "react";
// import { useColorScheme } from '@/hooks/useColorScheme';

// const themes = {
//   light: {
//     background: "#FFFFFF",
//     text: "#212121",
//   },
//   dark: {
//     background: "#212121",
//     text: "#FFFFFF",
//   },
// };

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const systemColorScheme = useColorScheme();
//   const [theme, setTheme] = useState(themes[systemColorScheme || "light"]);

//   const toggleTheme = () => {
//     setTheme((prevTheme) =>
//       prevTheme === themes.light ? themes.dark : themes.light
//     );
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);
