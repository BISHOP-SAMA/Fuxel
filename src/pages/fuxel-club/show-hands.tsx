import { useState, useEffect } from "react";
import { Link } from "wouter";
import { supabase } from "@/lib/supabase";
import { useClubAuth } from "@/hooks/use-club-auth";
import { ArrowLeft, CheckCircle } from "lucide-react";

const SUIT_COLOR: Record<string, string> = {
  "♠": "#e2e8f0", "♣": "#e2e8f0",
  "♥": "#ef4444", "♦": "#ef4444",
};

interface PlayerCard { id: string; card_rank: string; card_suit: string; }

const HANDS = [
  { name: "Royal Flush", rank: 1, desc: "A K Q J 10 — same suit", emoji: "👑" },
  { name: "Straight Flush", rank: 2, desc: "Five consecutive — same suit", emoji: "🔥" },
  { name: "Four of a Kind", rank: 3, desc: "Four cards same rank", emoji: "💎" },
  { name: "Full House", rank: 4, desc: "Three of a kind + a pair", emoji: "🏠" },
  { name: "Flush", rank: 5, desc: "Five same suit", emoji: "♠" },
  { name: "Straight", rank: 6, desc: "Five consecutive cards", emoji: "➡️" },
  { name: "Three of a Kind", rank: 7, desc: "Three same rank", emoji: "3️⃣" },
  { name: "Two Pair", rank: 8, desc: "Two different pairs", emoji: "2️⃣" },
];

export default function ShowHands() {
  const { clubUser } = useClubAuth();
  const [cards, setCards] = useState<PlayerCard[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [wallet, setWallet] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [detectedHand, setDetectedHand] = useState<string>("");

  useEffect(() => { if (clubUser) loadCards(); }, [clubUser]);

  const loadCards = async () => {
    const { data } = await supabase
      .from("player_cards")
      .select("id, card_rank, card_suit")
      .eq("user_id", clubUser!.id)
      .eq("listed_on_deck", false);
    if (data) setCards(data);
  };

  const toggleCard = (id: string) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < 5 ? [...prev, id] : prev
    );
    setError("");
    setDetectedHand("");
  };

  const detectHand = () => {
    if (selected.length < 2) return;
    const hand = cards.filter(c => selected.includes(c.id));
    const ranks = hand.map(c => c.card_rank);
    const suits = hand.map(c => c.card_suit);
    const rankCounts: Record<string, number> = {};
    ranks.forEach(r => rankCounts[r] = (rankCounts[r] || 0) + 1);
    const counts = Object.values(rankCounts).sort((a, b) => b - a);
    const allSameSuit = new Set(suits).size === 1;
    const rankOrder = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
    const rankIdxs = ranks.map(r => rankOrder.indexOf(r)).sort((a,b) => a-b);
    const isConsecutive = rankIdxs.every((v,i) => i === 0 || v === rankIdxs[i-1] + 1);

    if (selected.length === 5) {
      const isRoyal = allSameSuit && ["A","K","Q","J","10"].every(r => ranks.includes(r));
      if (isRoyal) { setDetectedHand("👑 Royal Flush"); return; }
      if (allSameSuit && isConsecutive) { setDetectedHand("🔥 Straight Flush"); return; }
      if (counts[0] === 4) { setDetectedHand("💎 Four of a Kind"); return; }
      if (counts[0] === 3 && counts[1] === 2) { setDetectedHand("🏠 Full House"); return; }
      if (allSameSuit) { setDetectedHand("♠ Flush"); return; }
      if (isConsecutive) { setDetectedHand("➡️ Straight"); return; }
    }
    if (counts[0] === 3) { setDetectedHand("3️⃣ Three of a Kind"); return; }
    if (counts[0] === 2 && counts[1] === 2) { setDetectedHand("2️⃣ Two Pair"); return; }
    setDetectedHand("");
  };

  useEffect(() => { detectHand(); }, [selected]);

  const handleSubmit = async () => {
    if (selected.length < 2) { setError("Select at least 2 cards to form a hand."); return; }
    if (!wallet.trim()) { setError("Enter your wallet address."); return; }
    if (!wallet.startsWith("0x") || wallet.length < 40) { setError("Invalid wallet address format."); return; }
    if (!detectedHand) { setError("Your selected cards don't form a valid hand."); return; }

    setSubmitting(true);
    try {
      await supabase.from("users").update({ wallet_address: wallet.trim() }).eq("id", clubUser!.id);
      await supabase.from("activity_feed").insert({
        x_username: clubUser!.x_username,
        event_type: "show_hands",
        message: `@${clubUser!.x_username} showed their hand — ${detectedHand}. Wallet submitted.`,
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-center px-6"
      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
      <div>
        <div className="text-6xl mb-6">🦊</div>
        <h2 className="text-3xl font-black mb-3" style={{ color: "#D4AF37" }}>Hand Submitted</h2>
        <p className="text-gray-500 text-sm font-mono mb-2">The fox has your cards.</p>
        <p className="text-gray-600 text-xs font-mono mb-8">Your wallet has been recorded. Stay in the top 500.</p>
        <Link href="/club/home">
          <button className="text-xs font-mono uppercase tracking-widest text-yellow-600/50 hover:text-yellow-500 transition-colors border border-yellow-600/20 px-6 py-3">
            Back to Table
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
      <div className="fixed inset-0 opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 30%, #0d3b1e 0%, #000 70%)" }} />

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 border-b border-yellow-600/10 bg-black/80 backdrop-blur-md">
        <Link href="/club/home">
          <button className="flex items-center gap-2 text-gray-500 hover:text-yellow-500 transition-colors text-xs uppercase tracking-widest font-mono">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </button>
        </Link>
        <span className="font-black tracking-widest text-sm" style={{ color: "#D4AF37" }}>SHOW HANDS</span>
        <div />
      </nav>

      <main className="relative z-10 pt-20 pb-12 px-4 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-[10px] tracking-[0.3em] text-yellow-600/40 uppercase font-mono mb-2">Submit to the House</p>
          <h1 className="text-4xl font-black uppercase" style={{ color: "#D4AF37" }}>Show Hands</h1>
          <p className="text-xs text-gray-600 font-mono mt-2">Select your best hand (2–5 cards) and submit your wallet.</p>
        </div>

        {/* Hand rankings reference */}
        <div className="border border-yellow-600/10 bg-black/40 p-4 mb-6">
          <div className="text-[10px] text-yellow-600/40 uppercase tracking-widest font-mono mb-3">Qualifying Hands</div>
          <div className="grid grid-cols-2 gap-2">
            {HANDS.map(h => (
              <div key={h.name} className="flex items-center gap-2">
                <span className="text-sm">{h.emoji}</span>
                <div>
                  <div className="text-xs font-bold text-gray-300">{h.name}</div>
                  <div className="text-[10px] text-gray-600 font-mono">{h.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card selection */}
        <div className="border border-yellow-600/10 bg-black/40 p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[10px] text-yellow-600/40 uppercase tracking-widest font-mono">
              Select Your Hand ({selected.length}/5)
            </div>
            {detectedHand && (
              <div className="text-xs font-bold text-green-400 font-mono">{detectedHand}</div>
            )}
          </div>

          {cards.length === 0 ? (
            <div className="text-center py-8 text-gray-700 text-sm font-mono">
              No cards in hand yet. Pick from the shuffle.
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {cards.map(c => {
                const isSelected = selected.includes(c.id);
                const color = SUIT_COLOR[c.card_suit] || "#e2e8f0";
                return (
                  <button
                    key={c.id}
                    onClick={() => toggleCard(c.id)}
                    className={`w-14 h-20 rounded-sm bg-white flex flex-col p-1 transition-all ${
                      isSelected ? "ring-2 ring-yellow-500 scale-105" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="text-xs font-black leading-none" style={{ color }}>{c.card_rank}</div>
                    <div className="text-xs leading-none" style={{ color }}>{c.card_suit}</div>
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-xl font-black" style={{ color }}>{c.card_suit}</span>
                    </div>
                    <div className="text-xs font-black leading-none rotate-180" style={{ color }}>{c.card_rank}</div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Wallet input */}
        <div className="border border-yellow-600/10 bg-black/40 p-5 mb-4">
          <div className="text-[10px] text-yellow-600/40 uppercase tracking-widest font-mono mb-3">Wallet Address</div>
          <input
            type="text"
            value={wallet}
            onChange={e => { setWallet(e.target.value); setError(""); }}
            placeholder="0x..."
            className="w-full bg-black/60 border border-yellow-600/20 text-white text-sm font-mono py-3 px-4 placeholder-gray-700 focus:outline-none focus:border-yellow-600/40 transition-colors"
          />
          <p className="text-[10px] text-gray-700 font-mono mt-2">
            This wallet will receive your NFT if you qualify. Cannot be changed after submission.
          </p>
        </div>

        {error && (
          <div className="border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-400 font-mono mb-4">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitting || selected.length < 2 || !wallet}
          className="w-full py-4 font-black uppercase tracking-[0.2em] text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, #8B0000, #4a0000)",
            border: "1px solid rgba(212,175,55,0.3)",
            color: "#D4AF37",
          }}
        >
          {submitting ? "Submitting..." : "Show Hands to the House"}
        </button>

        <p className="text-center text-[10px] text-gray-700 font-mono mt-4 uppercase tracking-wider">
          The fox doesn't negotiate. Choose wisely.
        </p>
      </main>
    </div>
  );
}
