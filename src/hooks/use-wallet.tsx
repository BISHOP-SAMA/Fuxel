import React, { createContext, useContext, useState, useEffect } from "react";

interface WalletContextType {
  address: string | null;
  connect: (address: string) => Promise<void>;
  disconnect: () => void;
  user: any | null;
  isLoading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(() => {
    return localStorage.getItem("fuxel_wallet_address");
  });

  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (address) {
      localStorage.setItem("fuxel_wallet_address", address);
      setUser({ address, reputation: 0, rank: "Scout" });
    } else {
      localStorage.removeItem("fuxel_wallet_address");
      setUser(null);
    }
  }, [address]);

  const connect = async (newAddress: string) => {
    try {
      setIsLoading(true);
      setAddress(newAddress);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    } finally {
      setIsLoading(false);
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