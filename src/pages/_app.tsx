import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import { chains, client } from "../wagmi";
import Favicon from "../assets/logo-image.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../global.css";

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <>
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains}>
          <NextHead>
            <title>Ghost Casino</title>
            <link rel="icon" type="image/png" href={Favicon.src} />
          </NextHead>

          {mounted && <Component {...pageProps} />}
          <ToastContainer />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default App;
