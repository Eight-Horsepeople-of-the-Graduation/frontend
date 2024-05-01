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
    text: {
      primary: "#121a69",
      secondary: "#9c9b9d",
    },
  },
  typography: {
    fontFamily: ["Noto Sans", "sans-serif"].join(","),
  },
  components: {
    MuiTextField: {
      defaultProps: {
        InputProps: {
          sx: { borderRadius: "var(--large-border-radius)" },
        },
      },
      styleOverrides: {
        root: {
          borderRadius: "var(--large-border-radius)",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "var(--large-border-radius)",
        },
      },
      defaultProps: {
        MenuProps: {
          PaperProps: {
            sx: {
              borderRadius: "var(--large-border-radius)",
              marginTop: "8px",
            },
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          width: "98%",
          margin: "8px auto",
          borderRadius: "var(--small-border-radius)",
          color: "var(--dark-primary-color)",
          fontWeight: 600,

          "&:first-child": {
            marginTop: 0,
          },
          "&:last-child": {
            marginBottom: 0,
          },

          "&:hover": {
            backgroundColor: "var(--gray-color)",
          },
          "&:focus": {
            backgroundColor: "var(--primary-color) !important",
            color: "white",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "var(--large-border-radius)",
          fontSize: "20px",
          fontWeight: 700,
          "&.MuiButton-textError": {
            color: "var(--dark-gray-color)",
          },
          "&.MuiButton-textError:hover": {
            color: "#da2d2d",
            textDecoration: "underline",
          },
        },
      },
    },
  },
});

const ThemerProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemerProvider;
