import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";
import { ConnectWalletDialog } from "@/components/wallet/ConnectWalletDialog";
import { RankBadge } from "@/components/ui/rank-badge";
import { Menu } from "lucide-react";
import { MobileNav } from "./MobileNav";

export function Topbar() {
  const { address, user, isLoading } = useWallet();
  const [connectOpen, setConnectOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-amber-500/10 bg-[#0a0a0c]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-4">
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden text-gray-400 hover:text-amber-500 transition-colors mr-2"
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse hidden md:block" />
          <span className="text-xs uppercase tracking-widest text-amber-500/70 font-mono hidden md:block">
            Secure Connection Active
          </span>
        </div>

        <div className="flex items-center gap-4">
          {address ? (
            <div className="flex items-center gap-2 md:gap-4 bg-black/40 border border-amber-500/20 rounded-lg p-1.5 pr-3 md:pr-4">
              <div className="bg-[#1a1a1c] px-2 md:px-3 py-1 rounded text-xs md:text-sm font-mono text-amber-500">
                {address.slice(0, 6)}...{address.slice(-4)}
              </div>
              {!isLoading && user && (
                <>
                  <div className="hidden md:flex flex-col items-end justify-center">
                    <div className="text-xs text-gray-400">Reputation</div>
                    <div className="text-sm font-bold text-white leading-none">{user.points?.toLocaleString() ?? 0} PTS</div>
                  </div>
                  <RankBadge rank={user.rank} />
                </>
              )}
            </div>
          ) : (
            <Button
              onClick={() => setConnectOpen(true)}
              className="bg-amber-500 text-black hover:bg-amber-600 font-bold uppercase tracking-wider text-sm rounded-none border border-amber-400 px-4 md:px-6"
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
}import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";
import { ConnectWalletDialog } from "@/components/wallet/ConnectWalletDialog";
import { RankBadge } from "@/components/ui/rank-badge";
import { Menu } from "lucide-react";
import { MobileNav } from "./MobileNav";

export function Topbar() {
  const { address, user, isLoading } = useWallet();
  const [connectOpen, setConnectOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-amber-500/10 bg-[#0a0a0c]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-4">
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden text-gray-400 hover:text-amber-500 transition-colors mr-2"
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse hidden md:block" />
          <span className="text-xs uppercase tracking-widest text-amber-500/70 font-mono hidden md:block">
            Secure Connection Active
          </span>
        </div>

        <div className="flex items-center gap-4">
          {address ? (
            <div className="flex items-center gap-2 md:gap-4 bg-black/40 border border-amber-500/20 rounded-lg p-1.5 pr-3 md:pr-4">
              <div className="bg-[#1a1a1c] px-2 md:px-3 py-1 rounded text-xs md:text-sm font-mono text-amber-500">
                {address.slice(0, 6)}...{address.slice(-4)}
              </div>
              {!isLoading && user && (
                <>
                  <div className="hidden md:flex flex-col items-end justify-center">
                    <div className="text-xs text-gray-400">Reputation</div>
                    <div className="text-sm font-bold text-white leading-none">{user.points?.toLocaleString() ?? 0} PTS</div>
                  </div>
                  <RankBadge rank={user.rank} />
                </>
              )}
            </div>
          ) : (
            <Button
              onClick={() => setConnectOpen(true)}
              className="bg-amber-500 text-black hover:bg-amber-600 font-bold uppercase tracking-wider text-sm rounded-none border border-amber-400 px-4 md:px-6"
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