import { Shell } from "@/components/layout/Shell";
import { ShieldAlert } from "lucide-react";

export default function Admin() {
  return (
    <Shell>
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <ShieldAlert className="h-16 w-16 text-amber-500/50 mb-4" />
        <h1 className="text-2xl font-bold text-white uppercase tracking-widest">Command Override</h1>
        <p className="text-gray-400 mt-2">Admin panel — coming soon.</p>
      </div>
    </Shell>
  );
}
