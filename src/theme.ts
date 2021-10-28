import { createMuiTheme } from "@material-ui/core/styles";

export const ssColors = {
  primary : {
    main : "#5F9EA0",
    contrastText: "#ffffff"
  },
  secondary: {
    main : "#6495ed",
    contrastText: "#ffffff"
  },
  background: {
    default: "rgb(95,158,160, 0.6)"
  },
  danger: {
    main: "#F08080",
    hover: "#CD5C5C",
    contrastText: "#ffffff"
  },
}

export const loginTheme = createMuiTheme({
  palette: {
    primary: ssColors.primary,
    secondary: ssColors.secondary,
    background: ssColors.background,
  }
});

export const defaultTheme = createMuiTheme({
  palette: {
    primary: ssColors.primary,
    secondary: ssColors.secondary,
  }
});
