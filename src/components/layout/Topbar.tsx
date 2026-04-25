import React, { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";
import { ConnectWalletDialog } from "@/components/wallet/ConnectWalletDialog";
import { RankBadge } from "@/components/ui/rank-badge";
import { Menu, AlertTriangle } from "lucide-react";
import { MobileNav } from "./MobileNav";

export function Topbar() {
  const { address, user, isLoading, isWrongNetwork, switchToTempo } = useWallet();
  const [connectOpen, setConnectOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-amber-500/10 bg-[#0a0a0c]/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 sticky top-0 z-40 shrink-0">

        {/* Left side */}
        <div className="flex items-center gap-3">
          <button
            className="text-gray-400 hover:text-amber-500 transition-colors"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded bg-amber-500 overflow-hidden shrink-0">
              <img src="/logo.jpg" alt="FUXEL" className="h-full w-full object-cover" />
            </div>
            <span className="font-bold text-amber-500 tracking-widest text-sm">FUXEL</span>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-4">
          {isWrongNetwork && (
            <button
              onClick={switchToTempo}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-xs font-bold uppercase tracking-wider hover:bg-red-500/20 transition-colors"
            >
              <AlertTriangle className="h-3 w-3" />
              <span className="hidden sm:inline">Wrong Network</span>
            </button>
          )}

          {address ? (
            <div className="flex items-center gap-2 md:gap-4 bg-black/40 border border-amber-500/20 rounded-lg p-1.5 pr-3 md:pr-4">
              <div className="bg-[#1a1a1c] px-2 md:px-3 py-1 rounded text-xs md:text-sm font-mono text-amber-500">
                {address.slice(0, 6)}...{address.slice(-4)}
              </div>
              {!isLoading && user && (
                <>
                  <div className="hidden md:flex flex-col items-end justify-center">
                    <div className="text-xs text-gray-400">Reputation</div>
                    <div className="text-sm font-bold text-white leading-none">
                      {(user.points ?? 0).toLocaleString()} PTS
                    </div>
                  </div>
                  <RankBadge rank={user.rank} />
                </>
              )}
            </div>
          ) : (
            <Button
              onClick={() => setConnectOpen(true)}
              className="bg-amber-500 text-black hover:bg-amber-600 font-bold uppercase tracking-wider text-xs md:text-sm rounded-none border border-amber-400 px-4 md:px-6 h-9 md:h-10"
            >
              Connect
            </Button>
          )}
        </div>
      </header>

      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <ConnectWalletDialog open={connectOpen} onOpenChange={setConnectOpen} />
    </>
  );
}