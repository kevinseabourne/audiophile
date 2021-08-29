import { ThemeProvider } from "styled-components";
import { AppProps } from "next/app";
import { GlobalStyle } from "../globalStyle";
import Header from ".././components/header";

export type MyTheme = {
  colors: {
    orange: string;
    black: string;
    silver: string;
    cream: string;
    liteOrange: string;
    white: string;
    darkerBlack: string;
  };
};

const theme: MyTheme = {
  colors: {
    orange: "#D87D4A",
    black: "#101010",
    silver: "#F1F1F1",
    cream: "#FAFAFA",
    liteOrange: "#FBAF85",
    white: "#FFFFFF",
    darkerBlack: "#000000",
  },
};

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default App;
