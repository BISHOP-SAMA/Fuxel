import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";
import { Loader2 } from "lucide-react";

export function ConnectWalletDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [address, setAddress] = useState("");
  const { connect } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    if (!address) return;
    setIsLoading(true);
    try {
      await connect(address);
      onOpenChange(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRandom = () => {
    const randomAddress = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    setAddress(randomAddress);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] border-amber-500/20 bg-[#0c0c0e] text-white">
        <DialogHeader>
          <DialogTitle className="text-amber-500 uppercase tracking-widest text-lg">Connect Terminal</DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter your wallet address to access FUXEL command center.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex gap-2">
            <Input
              placeholder="0x..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="font-mono bg-black/50 border-gray-800 text-amber-500 placeholder:text-gray-600 focus-visible:ring-amber-500"
            />
            <Button variant="outline" onClick={handleRandom} className="border-gray-800 text-gray-400 hover:text-amber-500 hover:bg-amber-500/10">
              Random
            </Button>
          </div>
          <Button onClick={handleConnect} disabled={isLoading || !address} className="w-full bg-amber-500 text-black hover:bg-amber-600 font-bold uppercase tracking-wider">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Initialize Connection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
