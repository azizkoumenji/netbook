import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
  DarkModeContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [theme, setTheme] = useState(
    localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : window.matchMedia("prefers-color-scheme: dark")
      ? "dark"
      : "light"
  );

  useEffect(() => {
    document.body.setAttribute("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const result = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", result);
    setTheme(result);
  };

  return (
    <DarkModeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};
