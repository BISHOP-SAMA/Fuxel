import { useEffect } from "react";
import { useLocation } from "wouter";
import { useSurvivalAuth } from "@/hooks/use-survival-auth";
import { LogIn } from "lucide-react";

export default function SurvivalLogin() {
  const { isAuthenticated, needsWalletBind, loginWithDiscord, loading } = useSurvivalAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      if (needsWalletBind) {
        setLocation("/survival/bind-wallet");
      } else {
        setLocation("/survival");
      }
    }
  }, [loading, isAuthenticated, needsWalletBind, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0800] flex items-center justify-center">
        <div className="text-yellow-600/30 text-2xl animate-pulse">♦</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0800] text-white font-mono flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)' }} />
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(180,120,0,0.12) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-md w-full text-center">
        <div className="text-5xl mb-6">🦊</div>
        
        <h1 className="text-3xl md:text-4xl font-black uppercase mb-2"
          style={{ fontFamily: 'Georgia, serif', color: '#c8960a', textShadow: '0 0 40px rgba(200,150,0,0.3)' }}>
          Survival Queue
        </h1>
        
        <p className="text-gray-500 text-sm mb-12 leading-relaxed">
          The fox doesn't let strangers sit at his table. Verify yourself to enter the game.
        </p>

        <button
          onClick={loginWithDiscord}
          className="w-full flex items-center justify-center gap-3 px-8 py-4 font-bold uppercase tracking-widest text-sm border border-yellow-600/50 text-yellow-500 hover:bg-yellow-600/10 hover:border-yellow-600 transition-all"
          style={{ background: 'rgba(180,120,0,0.05)' }}
        >
          <LogIn className="h-4 w-4" />
          Connect with Discord
        </button>

        <div className="mt-8 flex items-center gap-3">
          <div className="flex-1 h-px bg-yellow-600/10" />
          <span className="text-[10px] text-gray-700 uppercase tracking-widest">1,555 spots. two paths. one fox.</span>
          <div className="flex-1 h-px bg-yellow-600/10" />
        </div>
      </div>
    </div>
  );
}
