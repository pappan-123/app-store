import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { teal } from "@mui/material/colors";
import "./index.css";

// Theme with teal gradient vibes like your design
const theme = createTheme({
  palette: {
    primary: {
      main: "#0e4b48",
    },
    secondary: {
      main: "#0a9ea8",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial",
  },
});

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
