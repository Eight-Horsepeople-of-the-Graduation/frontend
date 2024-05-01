import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#525fe1",
      light: "#b1b8ff",
      dark: "#121a69",
    },
    secondary: {
      main: "#f86f03",
      light: "#f8a766",
      dark: "#6b2f00",
    },
    error: {
      main: "#f0a5a5",
      dark: "#da2d2d",
    },
    warning: {
      main: "#fae19b",
      dark: "#8c691e",
    },
    success: {
      main: "#a5ebbe",
      dark: "#52c982",
    },
    background: {
      default: "#fff",
    },
    grey: {
      500: "#f5f5f5",
      600: "#e0e0e0",
    },
    text: {
      primary: "#121a69",
      secondary: "#9c9b9d",
    },
  },
  typography: {
    fontFamily: ["Noto Sans", "sans-serif"].join(","),
  },
});

const ThemerProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemerProvider;
