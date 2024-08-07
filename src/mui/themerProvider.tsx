import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#525fe1",
      light: "#e8eaff",
      dark: "#121a69",
    },
    secondary: {
      main: "#f86f03",
      light: "#ffc597",
      dark: "#6b2f00",
    },
    error: {
      main: "#e15f5f",
      dark: "#e15f5f",
    },
    warning: {
      main: "#fae19b",
      dark: "#8c691e",
    },
    success: {
      main: "#37BE6E",
      light: "#73D79B",
      dark: "#239B55",
    },
    background: {
      default: "#fff",
    },
    grey: {
      100: "#f5f5f5",
      200: "#9c9b9d",
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
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          borderRadius: "var(--large-border-radius)",
          "& .MuiAutocomplete-inputRoot": {
            borderRadius: "var(--large-border-radius)",
          },
          "& .MuiButtonBase-root:hover": {
            backgroundColor: "var(--light-primary-color)",
          },
        },
      },
      defaultProps: {
        autoComplete: true,
        autoHighlight: true,
        componentsProps: {
          paper: {
            sx: {
              borderRadius: "var(--large-border-radius)",
              padding: "8px",
              marginTop: "8px",
              "& li": {
                borderRadius: "var(--small-border-radius)",
              },
            },
          },
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
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: "var(--large-border-radius)",
          padding: "0 4px",
          boxShadow: "var(--shadow-near)",
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

          "&:first-of-type": {
            marginTop: 0,
          },
          "&:last-child": {
            marginBottom: 0,
          },

          "&:hover": {
            backgroundColor: "var(--gray-color)",
          },
          "&:focus": {
            backgroundColor: "var(--light-primary-color) !important",
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
          boxShadow: "none",

          "&:hover":{
            boxShadow: "none"
          },

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
