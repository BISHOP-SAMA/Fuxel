import React from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, ShieldAlert, Ticket, Activity, Coins, MessageSquare, UserCircle, Settings, Trophy, LogOut } from "lucide-react";
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

  return (
    <aside className="w-64 border-r border-amber-500/10 bg-[#0a0a0c] flex flex-col h-full overflow-hidden shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-amber-500/10 shrink-0">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-amber-500 flex items-center justify-center overflow-hidden shrink-0">
            <img src="/logo.jpg" alt="FUXEL" className="h-full w-full object-cover" />
          </div>
          <span className="font-bold text-amber-500 tracking-widest text-lg">FUXEL</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-none">
        <div className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-4 px-2">Navigation</div>
        {navItems.map((item) => {
          const isActive = location === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
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
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                location === "/admin" ? "bg-amber-500/10 text-amber-500" : "text-gray-400 hover:text-amber-500 hover:bg-white/5"
              }`}
            >
              <Settings className="h-4 w-4" />
              Admin Override
            </Link>
          </>
        )}
      </div>

      {address && (
        <div className="p-4 border-t border-amber-500/10 shrink-0">
          <button
            onClick={disconnect}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
          >
            <LogOut className="h-4 w-4" />
            Disconnect
          </button>
        </div>
      )}
    </aside>
  );
}
