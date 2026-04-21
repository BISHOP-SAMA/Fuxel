import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";
import { ConnectWalletDialog } from "@/components/wallet/ConnectWalletDialog";
import { RankBadge } from "@/components/ui/rank-badge";

export function Topbar() {
  const { address, user, isLoading } = useWallet();
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <header className="h-16 border-b border-amber-500/10 bg-[#0a0a0c]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50 shrink-0">
      <div className="flex items-center gap-4">
        {/* Breadcrumb or context could go here */}
        <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
        <span className="text-xs uppercase tracking-widest text-amber-500/70 font-mono">Secure Connection Active</span>
      </div>

      <div className="flex items-center gap-4">
        {address ? (
          <div className="flex items-center gap-4 bg-black/40 border border-amber-500/20 rounded-lg p-1.5 pr-4">
            <div className="bg-[#1a1a1c] px-3 py-1 rounded text-sm font-mono text-amber-500">
              {address.slice(0, 6)}...{address.slice(-4)}
            </div>
            
            {isLoading ? (
              <div className="h-4 w-16 bg-white/5 animate-pulse rounded" />
            ) : user ? (
              <>
                <div className="flex flex-col items-end justify-center">
                  <div className="text-xs text-gray-400">Reputation</div>
                  <div className="text-sm font-bold text-white leading-none">{user.points.toLocaleString()} PTS</div>
                </div>
                <RankBadge rank={user.rank} />
              </>
            ) : null}
          </div>
        ) : (
          <Button onClick={() => setConnectOpen(true)} className="bg-amber-500 text-black hover:bg-amber-600 font-bold uppercase tracking-wider text-sm rounded-none border border-amber-400 px-6">
            Connect
          </Button>
        )}
      </div>

      <ConnectWalletDialog open={connectOpen} onOpenChange={setConnectOpen} />
    </header>
  );
}
