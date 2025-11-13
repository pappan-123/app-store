// src/context/LayoutContext.jsx
import React, { createContext, useContext, useState } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [themeMode, setThemeMode] = useState("light");

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleTheme = () =>
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = createTheme({
    palette: {
      mode: themeMode,
      ...(themeMode === "light"
        ? {
            background: { default: "#f4f6f8" },
            primary: { main: "#0e4b48" },
          }
        : {
            background: { default: "#121212" },
            primary: { main: "#0a9ea8" },
          }),
    },
    typography: {
      fontFamily: "Inter, Roboto, sans-serif",
    },
  });

  return (
    <LayoutContext.Provider
      value={{ isSidebarOpen, toggleSidebar, themeMode, toggleTheme }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
