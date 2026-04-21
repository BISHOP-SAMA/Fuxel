import React, { createContext, useContext, useState, useEffect } from "react";
import { useConnectWallet, useGetUser } from "@workspace/api-client-react";

interface WalletContextType {
  address: string | null;
  connect: (address: string) => Promise<void>;
  disconnect: () => void;
  user: any | null; // from useGetUser
  isLoading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(() => {
    return localStorage.getItem("fuxel_wallet_address");
  });

  const { mutateAsync: connectWallet } = useConnectWallet();
  const { data: user, isLoading } = useGetUser(address || "", {
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (address) {
      localStorage.setItem("fuxel_wallet_address", address);
    } else {
      localStorage.removeItem("fuxel_wallet_address");
    }
  }, [address]);

  const connect = async (newAddress: string) => {
    try {
      await connectWallet({ data: { address: newAddress } });
      setAddress(newAddress);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    }
  };

  const disconnect = () => {
    setAddress(null);
  };

  return (
    <WalletContext.Provider value={{ address, connect, disconnect, user, isLoading }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
