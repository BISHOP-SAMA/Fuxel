import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { mainnet } from "wagmi/chains";

export const tempoChain = {
  id: 4217,
  name: "Tempo Mainnet",
  nativeCurrency: {
    name: "USD",
    symbol: "USD",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.tempo.xyz"],
      webSocket: ["wss://rpc.tempo.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "Tempo Explorer",
      url: "https://explore.tempo.xyz",
    },
  },
} as const;

export const supportedChains = [tempoChain, mainnet] as const;

export const wagmiConfig = createConfig({
  chains: supportedChains,
  connectors: [injected()],
  transports: {
    [tempoChain.id]: http("https://rpc.tempo.xyz"),
    [mainnet.id]: http(),
  },
});

export const getChainById = (id: number) =>
  supportedChains.find((c) => c.id === id);

export type SupportedChainId = typeof supportedChains[number]["id"];