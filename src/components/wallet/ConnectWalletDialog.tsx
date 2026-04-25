import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";
import { Wallet, AlertTriangle, Loader2, ExternalLink } from "lucide-react";
import { tempoChain } from "@/lib/wagmi";

interface ConnectWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConnectWalletDialog({ open, onOpenChange }: ConnectWalletDialogProps) {
  const { connect, isConnecting, isConnected, isWrongNetwork, switchToTempo } = useWallet();

  const handleConnect = () => {
    connect();
    onOpenChange(false);
  };

  if (isConnected && isWrongNetwork) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-[#0a0a0c] border border-amber-500/20 text-white max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-amber-500 uppercase tracking-widest text-sm font-bold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Wrong Network
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-gray-400 text-sm">
              You're connected to the wrong network. Switch to <span className="text-amber-500 font-bold">{tempoChain.name}</span> to continue.
            </p>
            <Button
              onClick={switchToTempo}
              className="w-full bg-amber-500 text-black hover:bg-amber-600 font-bold uppercase tracking-wider"
            >
              Switch to {tempoChain.name}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0a0a0c] border border-amber-500/20 text-white max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-white uppercase tracking-widest text-sm font-bold">
            Connect Terminal
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <p className="text-gray-400 text-sm">
            Connect your wallet to access FUXEL and start earning reputation on {tempoChain.name}.
          </p>

          {/* MetaMask / Injected */}
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full flex items-center gap-4 p-4 bg-white/5 border border-white/10 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all rounded-md group"
          >
            <div className="w-10 h-10 rounded bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
              <Wallet className="h-5 w-5 text-orange-400" />
            </div>
            <div className="text-left flex-1">
              <div className="font-bold text-white text-sm group-hover:text-amber-500 transition-colors">
                Browser Wallet
              </div>
              <div className="text-xs text-gray-500">MetaMask, Rabby, or any injected wallet</div>
            </div>
            {isConnecting ? (
              <Loader2 className="h-4 w-4 text-amber-500 animate-spin" />
            ) : (
              <ExternalLink className="h-4 w-4 text-gray-600 group-hover:text-amber-500 transition-colors" />
            )}
          </button>

          {/* Network info */}
          <div className="p-3 bg-black/40 border border-white/5 rounded-md">
            <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Network</div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-mono text-gray-300">{tempoChain.name}</span>
              <span className="text-xs text-gray-600 font-mono">Chain ID: {tempoChain.id}</span>
            </div>
          </div>

          <p className="text-[11px] text-gray-600 text-center">
            By connecting, you agree to FUXEL's terms. Your wallet will be prompted to sign a message to verify ownership.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
