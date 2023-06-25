import { createTheme } from "@mui/material";
import styles from "@utils/styles/_variables.module.scss";
import { blue } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: blue[700],
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body:
          themeParam.palette.mode === "dark"
            ? themeParam.palette.background.default
            : null,
      }),
    },
  },
  shape: {
    borderRadius: Number(styles.defaultBorderRadius),
  },
  typography: {
    allVariants: { fontFamily: styles.defaultFontFamily },
  },
});
