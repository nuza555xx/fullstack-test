import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "@utils/styles/globals.scss";
import { theme } from "@utils/components/theme";
import CustomLayout from "@utils/components/layout";
import { Provider } from "react-redux";
import store from "@utils/store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <CustomLayout>
          <Component {...pageProps} />
        </CustomLayout>
      </Provider>
    </ThemeProvider>
  );
}
