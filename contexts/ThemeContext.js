import React, { useContext, useState } from "react";
import { DARKMODE, LIGHTMODE } from "../assets/constants";
const ThemeContext = React.createContext();

export function useThemeContext() {
  return useContext(ThemeContext);
}
export default function Theme({ children }) {
  const [themeColor, setInvert] = useState(false);

  const toggleTheme = () => {
    if (themeColor) setInvert(LIGHTMODE);
    else setInvert(DARKMODE);
  };

  return (
    <ThemeContext.Provider value={{ theme: themeColor, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
