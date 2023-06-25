import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "@utils/styles/globals.scss";
import { theme } from "@utils/components/theme";
import CustomLayout from "@utils/components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomLayout>
        <Component {...pageProps} />
      </CustomLayout>
    </ThemeProvider>
  );
}
