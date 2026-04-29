import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useSurvivalAuth } from "@/hooks/use-survival-auth";
import { Wallet, AlertTriangle, Check, ArrowRight } from "lucide-react";

export default function SurvivalBindWallet() {
  const { player, isAuthenticated, needsWalletBind, bindWallet, loading } = useSurvivalAuth();
  const [, setLocation] = useLocation();
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setLocation("/survival/login");
    }
    if (!loading && isAuthenticated && !needsWalletBind) {
      setLocation("/survival");
    }
  }, [loading, isAuthenticated, needsWalletBind, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmed) return;
    
    setSubmitting(true);
    setError("");
    
    const result = await bindWallet(address);
    
    if (result.success) {
      setLocation("/survival");
    } else {
      setError(result.error || "Failed to bind wallet");
    }
    
    setSubmitting(false);
  };

  if (loading || !player) {
    return (
      <div className="min-h-screen bg-[#0a0800] flex items-center justify-center">
        <div className="text-yellow-600/30 text-2xl animate-pulse">♦</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0800] text-white font-mono flex flex-col items-center justify-center px-6 relative">
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)' }} />

      <div className="relative z-10 max-w-lg w-full">
        <div className="text-center mb-10">
          <div className="text-4xl mb-4">🦊</div>
          <h1 className="text-2xl md:text-3xl font-black uppercase mb-2"
            style={{ fontFamily: 'Georgia, serif', color: '#c8960a' }}>
            The Fox Needs an Address
          </h1>
          <p className="text-gray-500 text-sm">
            This wallet will be used for minting. Bind it once. No changes later.
          </p>
        </div>

        <div className="border border-yellow-600/20 bg-black/40 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-yellow-600/10">
            <div className="h-10 w-10 rounded bg-yellow-600/10 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">Operative</div>
              <div className="text-sm font-bold text-white">{player.discord_username}</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 block">
                Wallet Address (EVM)
              </label>
              <input
                type="text"
                placeholder="0x..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-black/60 border border-yellow-600/20 text-white text-sm px-4 py-3 placeholder-gray-700 focus:outline-none focus:border-yellow-600/50 transition-colors font-mono"
              />
              {address && !/^0x[a-fA-F0-9]{40}$/.test(address) && (
                <p className="text-[10px] text-red-500 mt-2">Invalid Ethereum address format</p>
              )}
            </div>

            <div 
              className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${
                confirmed ? 'border-yellow-600/30 bg-yellow-600/5' : 'border-white/5 bg-black/20'
              }`}
              onClick={() => setConfirmed(!confirmed)}
            >
              <div className={`h-4 w-4 border flex items-center justify-center shrink-0 mt-0.5 ${
                confirmed ? 'border-yellow-600 bg-yellow-600/20' : 'border-gray-600'
              }`}>
                {confirmed && <Check className="h-3 w-3 text-yellow-500" />}
              </div>
              <div className="text-xs text-gray-400 leading-relaxed">
                I understand this address is permanent and will be used for all mint claims. 
                The fox doesn't do refunds or address changes.
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs text-red-400">
                <AlertTriangle className="h-3 w-3" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!confirmed || !address || submitting || !/^0x[a-fA-F0-9]{40}$/.test(address)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 font-bold uppercase tracking-widest text-xs border border-yellow-600/50 text-yellow-500 hover:bg-yellow-600/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="animate-pulse">Binding...</span>
              ) : (
                <>
                  Confirm & Enter
                  <ArrowRight className="h-3 w-3" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-yellow-600/10" />
          <span className="text-[10px] text-gray-700 uppercase tracking-widest">This cannot be undone</span>
          <div className="flex-1 h-px bg-yellow-600/10" />
        </div>
      </div>
    </div>
  );
}
