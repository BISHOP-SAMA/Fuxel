import React from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, ShieldAlert, Ticket, Activity,
  Coins, MessageSquare, UserCircle, Trophy, X, LogOut
} from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/quests", label: "Operations", icon: ShieldAlert },
  { path: "/raffles", label: "Vault", icon: Ticket },
  { path: "/feed", label: "Comms Link", icon: Activity },
  { path: "/staking", label: "Reserves", icon: Coins },
  { path: "/chat", label: "FoxChat", icon: MessageSquare },
  { path: "/leaderboard", label: "Standings", icon: Trophy },
  { path: "/profile", label: "Dossier", icon: UserCircle },
];

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const [location] = useLocation();
  const { disconnect, address } = useWallet();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute left-0 top-0 bottom-0 w-72 bg-[#0a0a0c] border-r border-amber-500/10 flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-amber-500/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded bg-amber-500 overflow-hidden shrink-0">
              <img src="/logo.jpg" alt="FUXEL" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
            <span className="font-bold text-amber-500 tracking-widest">FUXEL</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors p-1"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-4 px-2">
            Navigation
          </div>
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium ${
                  isActive
                    ? "bg-amber-500/10 text-amber-500"
                    : "text-gray-400 hover:text-amber-500 hover:bg-white/5"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Disconnect */}
        {address && (
          <div className="p-4 border-t border-amber-500/10 shrink-0">
            <div className="text-xs font-mono text-gray-600 mb-3 px-1 truncate">{address}</div>
            <button
              onClick={() => { disconnect(); onClose(); }}
              className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
            >
              <LogOut className="h-4 w-4" />
              Disconnect
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
