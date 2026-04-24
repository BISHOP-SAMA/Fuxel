import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, ShieldAlert, Ticket, Activity, Coins, MessageSquare, UserCircle, Settings, Trophy, LogOut, Menu, X } from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/quests", label: "Operations", icon: ShieldAlert },
  { path: "/raffles", label: "Vault", icon: Ticket },
  { path: "/feed", label: "Comms Link", icon: Activity },
  { path: "/staking", label: "Reserves", icon: Coins },
  { path: "/chat", label: "FoxChat", icon: MessageSquare },
  { path: "/leaderboard", label: "Standings", icon: Trophy },
  { path: "/profile", label: "Dossier", icon: UserCircle },
];

export function Sidebar() {
  const [location] = useLocation();
  const { disconnect, address, user } = useWallet();
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <>
      <div className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-4 px-2">Navigation</div>
      {navItems.map((item) => {
        const isActive = location === item.path;
        return (
          <Link
            key={item.path}
            href={item.path}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium ${
              isActive ? "bg-amber-500/10 text-amber-500" : "text-gray-400 hover:text-amber-500 hover:bg-white/5"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
      {user?.rank === "Insider" && (
        <>
          <div className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mt-8 mb-4 px-2">Command</div>
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium ${
              location === "/admin" ? "bg-amber-500/10 text-amber-500" : "text-gray-400 hover:text-amber-500 hover:bg-white/5"
            }`}
          >
            <Settings className="h-4 w-4" />
            Admin Override
          </Link>
        </>
      )}
    </>
  );

  return (
    <>
      {/* Mobile topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-[#0a0a0c] border-b border-amber-500/10 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded bg-amber-500 overflow-hidden shrink-0">
            <img src="/logo.jpg" alt="FUXEL" className="h-full w-full object-cover" />
          </div>
          <span className="font-bold text-amber-500 tracking-widest">FUXEL</span>
        </Link>
        <button onClick={() => setOpen(!open)} className="text-gray-400 hover:text-amber-500 transition-colors">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/60" onClick={() => setOpen(false)}>
          <div className="w-64 h-full bg-[#0a0a0c] border-r border-amber-500/10 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="h-14 border-b border-amber-500/10 flex items-center px-4">
              <span className="font-bold text-amber-500 tracking-widest">FUXEL</span>
            </div>
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
              <NavLinks />
            </div>
            {address && (
              <div className="p-4 border-t border-amber-500/10">
                <button onClick={disconnect} className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium">
                  <LogOut className="h-4 w-4" /> Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 border-r border-amber-500/10 bg-[#0a0a0c] flex-col h-full overflow-hidden shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-amber-500/10 shrink-0">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-amber-500 overflow-hidden shrink-0">
              <img src="/logo.jpg" alt="FUXEL" className="h-full w-full object-cover" />
            </div>
            <span className="font-bold text-amber-500 tracking-widest text-lg">FUXEL</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-none">
          <NavLinks />
        </div>
        {address && (
          <div className="p-4 border-t border-amber-500/10 shrink-0">
            <button onClick={disconnect} className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium">
              <LogOut className="h-4 w-4" /> Disconnect
            </button>
          </div>
        )}
      </aside>
    </>
  );
}