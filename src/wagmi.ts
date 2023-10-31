import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, mainnet  } from "wagmi";
import { fantom, fantomTestnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  // [fantom, ...(process.env.NODE_ENV === 'development' ? [fantomTestnet] : [])],
  [fantomTestnet],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY! }),
    publicProvider(),
  ]
);

// const { chains, provider, webSocketProvider } = configureChains(
//   [mainnet],
//   [publicProvider()],
// )

const { connectors } = getDefaultWallets({
  appName: "Ghost Casino",
  chains,
});

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

// const client = createClient({
//   autoConnect: true,
//   provider,
//   webSocketProvider,
// })

export { chains };
