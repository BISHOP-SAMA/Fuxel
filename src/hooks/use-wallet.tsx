import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from "wagmi";
import { injected } from "wagmi/connectors";
import { tempoChain } from "@/lib/wagmi";

export function useWallet() {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, isPending: isConnectPending } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const isWrongNetwork = isConnected && chainId !== tempoChain.id;

  const connectWallet = () => {
    connect({ connector: injected() });
  };

  const switchToTempo = () => {
    switchChain({ chainId: tempoChain.id });
  };

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  return {
    address: address ?? null,
    shortAddress,
    isConnected,
    isConnecting: isConnecting || isConnectPending,
    isWrongNetwork,
    connect: connectWallet,
    disconnect,
    switchToTempo,
    // Legacy compat fields (mock until you build reputation system)
    user: address
      ? { address, points: 0, rank: "Scout" as const }
      : null,
    isLoading: isConnecting,
  };
}

// Re-export WalletProvider as a passthrough — wagmi's WagmiProvider handles this
// Import WagmiProvider in App.tsx instead
export { WalletProvider } from "./WalletProvider";
