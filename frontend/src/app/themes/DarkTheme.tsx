import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff724c",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#141414",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#bdbdbd",
    },
    error: {
      main: "#b71c1c",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    body1: {
      color: "#ffffff",
    },
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
      color: "#ff724c",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      color: "#ff724c",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      color: "#ff724c",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: "#ff724c",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: "#ff724c",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      color: "#ff724c",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#64b5f6",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 600,
      lg: 900,
      xl: 1200,
    },
  },
});

export default darkTheme;
