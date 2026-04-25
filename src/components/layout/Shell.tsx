import React from "react";
import { Topbar } from "./Topbar";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-[#050506] text-gray-100 overflow-hidden selection:bg-amber-500/30 selection:text-amber-200">
      <Topbar />
      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute inset-0 bg-[#050506] [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none" />
        <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}