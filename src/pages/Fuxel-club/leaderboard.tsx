import { useState, useEffect } from "react";
import { Link } from "wouter";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, RefreshCw } from "lucide-react";

interface LeaderboardPlayer {
  x_username: string;
  x_avatar: string;
  chips: number;
  rank: number;
  card_count: number;
}

export default function ClubLeaderboard() {
  const [players, setPlayers] = useState<LeaderboardPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => { fetchBoard(); }, []);

  const fetchBoard = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const { data } = await supabase
        .from("users")
        .select("x_username, x_avatar, chips")
        .order("chips", { ascending: false })
        .limit(200);

      if (data) {
        const enriched = await Promise.all(data.map(async (u, i) => {
          const { count } = await supabase
            .from("player_cards")
            .select("id", { count: "exact" })
            .eq("user_id", u.x_username);
          return { ...u, rank: i + 1, card_count: count ?? 0 };
        }));
        setPlayers(enriched);
      }
    } catch (e) {}
    finally { setLoading(false); setRefreshing(false); }
  };

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
      <div className="fixed inset-0 opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 30%, #0d3b1e 0%, #000 70%)" }} />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 border-b border-yellow-600/10 bg-black/80 backdrop-blur-md">
        <Link href="/club/home">
          <button className="flex items-center gap-2 text-gray-500 hover:text-yellow-500 transition-colors text-xs uppercase tracking-widest font-mono">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </button>
        </Link>
        <span className="font-black tracking-widest text-sm" style={{ color: "#D4AF37" }}>LEADERBOARD</span>
        <button onClick={() => fetchBoard(true)} className="text-gray-600 hover:text-yellow-500 transition-colors">
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
        </button>
      </nav>

      <main className="relative z-10 pt-20 pb-12 px-4 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-[10px] tracking-[0.3em] text-yellow-600/40 uppercase font-mono mb-2">Rankings</p>
          <h1 className="text-4xl font-black uppercase" style={{ color: "#D4AF37" }}>The Board</h1>
          <p className="text-xs text-gray-600 font-mono mt-2">Top 500 earn mint rights. Ranked by chip balance.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-px bg-yellow-600/10 border border-yellow-600/10 mb-6">
          {[
            { label: "Players", value: players.length },
            { label: "Surviving", value: Math.min(players.length, 500) },
            { label: "Eliminated", value: Math.max(0, players.length - 500) },
          ].map(s => (
            <div key={s.label} className="bg-black px-4 py-3 text-center">
              <div className="text-xl font-black" style={{ color: "#D4AF37", fontFamily: "Georgia" }}>{s.value}</div>
              <div className="text-[10px] text-gray-700 uppercase tracking-widest font-mono">{s.label}</div>
            </div>
          ))}
        </div>

        {/* GTD zone label */}
        <div className="flex items-center gap-3 mb-2">
          <div className="text-[10px] text-yellow-600/40 uppercase tracking-widest font-mono">Survival Zone — Top 500</div>
          <div className="flex-1 h-px bg-yellow-600/10" />
          <span className="text-yellow-600/20">♦</span>
        </div>

        {/* Table */}
        <div className="border border-yellow-600/10">
          <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-black/60 border-b border-yellow-600/10">
            <div className="col-span-1 text-[10px] text-gray-700 uppercase tracking-widest font-mono text-center">#</div>
            <div className="col-span-6 text-[10px] text-gray-700 uppercase tracking-widest font-mono">Player</div>
            <div className="col-span-3 text-[10px] text-gray-700 uppercase tracking-widest font-mono text-center">Cards</div>
            <div className="col-span-2 text-[10px] text-gray-700 uppercase tracking-widest font-mono text-right">Chips</div>
          </div>

          {loading && (
            <div className="py-16 text-center">
              <div className="text-yellow-600/30 text-2xl animate-pulse">♦</div>
            </div>
          )}

          {!loading && players.length === 0 && (
            <div className="py-16 text-center">
              <div className="text-3xl mb-3">🃏</div>
              <div className="text-xs text-gray-700 font-mono uppercase tracking-wider">No players yet. The table is empty.</div>
            </div>
          )}

          {players.map((p) => {
            const isSurviving = p.rank <= 500;
            const isTop3 = p.rank <= 3;
            const medal = p.rank === 1 ? "🥇" : p.rank === 2 ? "🥈" : p.rank === 3 ? "🥉" : null;

            return (
              <div key={p.x_username}
                className={`grid grid-cols-12 gap-2 px-4 py-3 border-b border-yellow-600/5 items-center transition-colors
                  ${isSurviving ? "hover:bg-yellow-600/5" : "opacity-40 hover:bg-white/[0.01]"}`}>
                <div className="col-span-1 text-center">
                  {medal ? <span>{medal}</span> : (
                    <span className={`font-black text-sm font-mono ${isSurviving ? "text-yellow-600/60" : "text-gray-700"}`}>
                      {p.rank}
                    </span>
                  )}
                </div>
                <div className="col-span-6 flex items-center gap-2 min-w-0">
                  {p.x_avatar && <img src={p.x_avatar} alt="" className="h-6 w-6 rounded-full shrink-0 opacity-80" />}
                  <span className={`text-sm font-bold truncate ${isTop3 ? "text-white" : isSurviving ? "text-gray-300" : "text-gray-600"}`}>
                    @{p.x_username}
                  </span>
                  {isSurviving && (
                    <span className="text-[9px] border border-yellow-600/20 text-yellow-600/50 px-1 shrink-0 hidden sm:block font-mono">
                      LIVE
                    </span>
                  )}
                </div>
                <div className="col-span-3 text-center font-mono text-sm text-gray-500">{p.card_count}</div>
                <div className={`col-span-2 text-right font-black text-sm ${isSurviving ? "text-yellow-400" : "text-gray-600"}`}
                  style={{ fontFamily: "Georgia" }}>
                  {p.chips.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-6 text-[10px] text-gray-700 font-mono uppercase tracking-wider">
          Rankings update in real time · Top 500 survive
        </div>
      </main>
    </div>
  );
}
