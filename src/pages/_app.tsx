import { GlobalStyle } from "../styles/globals";
import type { AppProps } from "next/app";
import { TemaProvider } from "../contexts/TemaCtx";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TemaProvider>
      <Component {...pageProps} />
      <GlobalStyle />
    </TemaProvider>
  );
}

export default MyApp;
