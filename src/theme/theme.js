import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#7D3C98",
      light: "#A569BD",
      dark: "#5B2C6F",
      contrastText: "#fff",
    },
    secondary: {
      main: "#F39C12",
      light: "#F8C471",
      dark: "#D68910",
      contrastText: "#000",
    },
    tertiary: {
      main: "#2ECC71",
      light: "#82E0AA",
      dark: "#239B56",
      contrastText: "#000",
    },
    accent1: {
      main: "#E74C3C",
      light: "#F1948A",
      dark: "#B03A2E",
    },
    accent2: {
      main: "#3498DB",
      light: "#85C1E9",
      dark: "#2874A6",
    },
    background: {
      default: "#F8F9FA",
      paper: "#FFFFFF",
      card: "#F0F2F5",
      gradient: "linear-gradient(145deg, #f5f7fa 0%, #e4eaf1 100%)",
    },
    text: {
      primary: "#2C3E50",
      secondary: "#566573",
      disabled: "#95A5A6",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      "@media (min-width:600px)": {
        fontSize: "3.5rem",
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      "@media (min-width:600px)": {
        fontSize: "2.5rem",
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      "@media (min-width:600px)": {
        fontSize: "1.75rem",
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.1rem",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1rem",
    },
    subtitle1: {
      fontSize: "0.9rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 2px 4px rgba(0, 0, 0, 0.05)",
    "0px 4px 8px rgba(0, 0, 0, 0.05)",
    "0px 8px 16px rgba(0, 0, 0, 0.05)",
    "0px 12px 24px rgba(0, 0, 0, 0.05)",
    "0px 16px 32px rgba(0, 0, 0, 0.05)",
    ...Array(19).fill("none"),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: "10px 24px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
          },
          transition: "all 0.3s ease",
        },
        contained: {
          "&:hover": {
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
          "&:last-child": {
            paddingBottom: 24,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "none",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },

  rainbowTheme: {
    gradients: {
      rainbow:
        "linear-gradient(90deg, #E74C3C 0%, #F39C12 20%, #F1C40F 40%, #2ECC71 60%, #3498DB 80%, #9B59B6 100%)",
    },
  },
});

const extendedTheme = {
  ...theme,
  palette: {
    ...theme.palette,
    pride: {
      red: "#E74C3C",
      orange: "#F39C12",
      yellow: "#F1C40F",
      green: "#2ECC71",
      blue: "#3498DB",
      purple: "#9B59B6",
    },
    gradients: {
      primary: "linear-gradient(135deg, #7D3C98 0%, #A569BD 100%)",
      secondary: "linear-gradient(135deg, #F39C12 0%, #F8C471 100%)",
      rainbow:
        "linear-gradient(90deg, #E74C3C, #F39C12, #F1C40F, #2ECC71, #3498DB, #9B59B6)",
    },
  },
};

export default extendedTheme;
