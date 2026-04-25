import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { mainnet, base, arbitrum, polygon, bsc } from "wagmi/chains";

// Tempo Chain — update with real values
export const tempoChain = {
  id: 1337, // ← Replace with actual Tempo chain ID
  name: "Tempo",
  nativeCurrency: {
    name: "Tempo",
    symbol: "TEMPO",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.tempo.network"], // ← Replace with actual RPC
    },
  },
  blockExplorers: {
    default: {
      name: "Tempo Explorer",
      url: "https://explorer.tempo.network",
    },
  },
} as const;

// All supported chains — just add more here as FUXEL expands
export const supportedChains = [
  tempoChain,
  base,
  arbitrum,
  polygon,
  bsc,
  mainnet,
] as const;

export const wagmiConfig = createConfig({
  chains: supportedChains,
  connectors: [
    injected(),
  ],
  transports: {
    [tempoChain.id]: http(),
    [base.id]: http(),
    [arbitrum.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
    [mainnet.id]: http(),
  },
});

// Helper to get chain by ID
export const getChainById = (id: number) =>
  supportedChains.find((c) => c.id === id);

export type SupportedChainId = typeof supportedChains[number]["id"];