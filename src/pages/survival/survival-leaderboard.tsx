import { useState } from "react";
import { Link } from "wouter";
import { Search, Trophy, Flame } from "lucide-react";

const STATUS = {
  active: { label: "Active", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20", dot: "bg-yellow-400" },
  shielded: { label: "Shielded", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20", dot: "bg-blue-400" },
  hunted: { label: "Hunted", color: "text-red-400", bg: "bg-red-400/10 border-red-400/20", dot: "bg-red-500 animate-ping" },
  jailed: { label: "Jailed", color: "text-gray-500", bg: "bg-gray-500/10 border-gray-500/20", dot: "bg-gray-500" },
} as const;

type StatusKey = keyof typeof STATUS;

interface Player {
  rank: number;
  username: string;
  chips: number;
  status: StatusKey;
  fragments: number;
  gtd: boolean;
  eliminated?: boolean;
}

const MOCK_PLAYERS: Player[] = [
  { rank: 1, username: "TheSmoothFox", chips: 4820, status: "shielded", fragments: 7, gtd: true },
  { rank: 2, username: "RugMaster99", chips: 3940, status: "shielded", fragments: 5, gtd: true },
  { rank: 3, username: "ChipHunter", chips: 3710, status: "active", fragments: 4, gtd: true },
  { rank: 4, username: "0xPhantom", chips: 3500, status: "shielded", fragments: 6, gtd: true },
  { rank: 5, username: "NightOwlNFT", chips: 3280, status: "active", fragments: 3, gtd: true },
  { rank: 6, username: "DegenKing", chips: 3100, status: "active", fragments: 2, gtd: true },
  { rank: 7, username: "SilentBlade", chips: 2940, status: "shielded", fragments: 4, gtd: true },
  { rank: 8, username: "WalletWatcher", chips: 2810, status: "active", fragments: 1, gtd: true },
  { rank: 9, username: "FragmentFox", chips: 2670, status: "active", fragments: 5, gtd: true },
  { rank: 10, username: "CryptoConArtist", chips: 2500, status: "active", fragments: 2, gtd: true },
  { rank: 11, username: "MidnightRugger", chips: 2340, status: "active", fragments: 0, gtd: false },
  { rank: 12, username: "StackedSats", chips: 2200, status: "active", fragments: 3, gtd: false },
  { rank: 13, username: "TheHouseWins", chips: 2050, status: "active", fragments: 1, gtd: false },
  { rank: 14, username: "FoxTail", chips: 1920, status: "active", fragments: 0, gtd: false },
  { rank: 15, username: "OnChainGhost", chips: 1800, status: "active", fragments: 2, gtd: false },
  { rank: 16, username: "ChipDropper", chips: 1650, status: "active", fragments: 0, gtd: false },
  { rank: 17, username: "BountyHunter", chips: 1500, status: "active", fragments: 1, gtd: false },
  { rank: 18, username: "VaultBreaker", chips: 1340, status: "active", fragments: 0, gtd: false },
  { rank: 19, username: "ShadowPlayer", chips: 1200, status: "hunted", fragments: 0, gtd: false },
  { rank: 20, username: "LastStanding", chips: 980, status: "hunted", fragments: 1, gtd: false },
  { rank: 21, username: "DebtCollector", chips: 820, status: "hunted", fragments: 0, gtd: false },
  { rank: 22, username: "JailBait", chips: -40, status: "jailed", fragments: 0, gtd: false },
  { rank: 23, username: "BrokeAndHunted", chips: -120, status: "jailed", fragments: 0, gtd: false },
];

const GTD_THRESHOLD = 500;

export default function SurvivalLeaderboard() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<StatusKey | "all">("all");

  const filtered = MOCK_PLAYERS.filter((p) => {
    const matchSearch = p.username.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-[#0a0800] text-white font-mono">

      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)' }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-yellow-600/20">
        <Link href="/survival">
          <span className="text-xs text-yellow-600/50 uppercase tracking-widest hover:text-yellow-500 transition-colors cursor-pointer">
            ← Survival Queue
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-yellow-600" />
          <span className="text-xs text-yellow-600 uppercase tracking-widest font-bold">The Board</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs text-gray-600 uppercase tracking-widest">Mock Data</span>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] text-yellow-600/50 uppercase mb-3">Live Rankings</p>
          <h1 className="text-4xl md:text-6xl font-black uppercase mb-3"
            style={{ fontFamily: 'Georgia, serif', color: '#c8960a', textShadow: '0 0 40px rgba(200,150,0,0.3)' }}>
            The Board
          </h1>
          <p className="text-gray-600 text-sm">Top 1,000 earn mint rights. Top 500 are GTD. Complete 7 fragments to exit the queue entirely.</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-yellow-600/10 border border-yellow-600/10 mb-8">
          {[
            { label: "In Queue", value: MOCK_PLAYERS.filter(p => p.status !== 'jailed').length.toString(), color: "text-white" },
            { label: "GTD Secured", value: "0", color: "text-yellow-400" },
            { label: "Hunted", value: MOCK_PLAYERS.filter(p => p.status === 'hunted').length.toString(), color: "text-red-400" },
            { label: "Jailed", value: MOCK_PLAYERS.filter(p => p.status === 'jailed').length.toString(), color: "text-gray-500" },
          ].map((s) => (
            <div key={s.label} className="bg-[#0a0800] px-4 py-4 text-center">
              <div className={`text-2xl font-black mb-1 ${s.color}`} style={{ fontFamily: 'Georgia, serif' }}>{s.value}</div>
              <div className="text-[10px] text-gray-700 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-600" />
            <input
              type="text"
              placeholder="Search operative..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/40 border border-yellow-600/10 text-white text-sm pl-9 pr-4 py-2.5 placeholder-gray-700 focus:outline-none focus:border-yellow-600/30 transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {(["all", "active", "shielded", "hunted", "jailed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 text-[10px] uppercase tracking-widest whitespace-nowrap border transition-colors ${
                  filter === f
                    ? "border-yellow-600/50 text-yellow-500 bg-yellow-600/10"
                    : "border-yellow-600/10 text-gray-600 hover:border-yellow-600/20 hover:text-gray-400"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* GTD Zone indicator */}
        <div className="flex items-center gap-3 mb-2 px-1">
          <div className="text-[10px] text-yellow-600/50 uppercase tracking-widest">GTD Zone — Top {GTD_THRESHOLD}</div>
          <div className="flex-1 h-px bg-yellow-600/10" />
          <Flame className="h-3 w-3 text-yellow-600/30" />
        </div>

        {/* Leaderboard */}
        <div className="border border-yellow-600/10">

          {/* Header row */}
          <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-black/40 border-b border-yellow-600/10">
            <div className="col-span-1 text-[10px] text-gray-700 uppercase tracking-widest text-center">#</div>
            <div className="col-span-4 text-[10px] text-gray-700 uppercase tracking-widest">Operative</div>
            <div className="col-span-3 text-[10px] text-gray-700 uppercase tracking-widest text-center">Status</div>
            <div className="col-span-2 text-[10px] text-gray-700 uppercase tracking-widest text-center">Frags</div>
            <div className="col-span-2 text-[10px] text-gray-700 uppercase tracking-widest text-right">Chips</div>
          </div>

          {/* Player rows */}
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-700 text-sm">No operatives found.</div>
          ) : (
            filtered.map((player, idx) => {
              const status = STATUS[player.status];
              const isGTD = player.rank <= GTD_THRESHOLD;
              const isTop3 = player.rank <= 3;
              const rankEmoji = player.rank === 1 ? "🥇" : player.rank === 2 ? "🥈" : player.rank === 3 ? "🥉" : null;

              return (
                <div
                  key={player.username}
                  className={`grid grid-cols-12 gap-2 px-4 py-3 border-b border-yellow-600/5 items-center transition-colors
                    ${player.status === 'jailed' ? 'opacity-40' : ''}
                    ${player.status === 'hunted' ? 'bg-red-900/5' : ''}
                    ${isGTD && player.status !== 'jailed' ? 'hover:bg-yellow-600/5' : 'hover:bg-white/[0.02]'}
                  `}
                >
                  {/* Rank */}
                  <div className="col-span-1 text-center">
                    {rankEmoji ? (
                      <span className="text-base">{rankEmoji}</span>
                    ) : (
                      <span className={`font-black text-sm ${isGTD ? 'text-yellow-600/70' : 'text-gray-700'}`}>
                        {player.rank}
                      </span>
                    )}
                  </div>

                  {/* Username */}
                  <div className="col-span-4 flex items-center gap-2 min-w-0">
                    <span className={`font-bold text-sm truncate ${isTop3 ? 'text-white' : isGTD ? 'text-gray-300' : 'text-gray-500'}`}>
                      {player.username}
                    </span>
                    {isGTD && player.status !== 'jailed' && (
                      <span className="text-[9px] border border-yellow-600/30 text-yellow-600/60 px-1 py-0.5 uppercase tracking-wider shrink-0 hidden sm:block">
                        GTD
                      </span>
                    )}
                  </div>

                  {/* Status */}
                  <div className="col-span-3 flex justify-center">
                    <div className={`flex items-center gap-1.5 border px-2 py-0.5 ${status.bg}`}>
                      <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${status.dot}`} />
                      <span className={`text-[10px] uppercase tracking-wider font-bold ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                  </div>

                  {/* Fragments */}
                  <div className="col-span-2 flex justify-center gap-0.5">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 w-2 rounded-sm ${i < player.fragments ? 'bg-yellow-500' : 'bg-gray-800'}`}
                      />
                    ))}
                  </div>

                  {/* Chips */}
                  <div className={`col-span-2 text-right font-black text-sm ${
                    player.chips < 0 ? 'text-red-500' : isGTD ? 'text-yellow-400' : 'text-gray-400'
                  }`} style={{ fontFamily: 'Georgia, serif' }}>
                    {player.chips < 0 ? player.chips : player.chips.toLocaleString()}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom note */}
        <div className="flex items-center gap-4 mt-6 px-1">
          <div className="flex-1 h-px bg-yellow-600/5" />
          <span className="text-[10px] text-gray-700 uppercase tracking-widest">Snapshot every 24hrs at midnight</span>
          <div className="flex-1 h-px bg-yellow-600/5" />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {Object.entries(STATUS).map(([key, val]) => (
            <div key={key} className={`flex items-center gap-2 border ${val.bg} px-3 py-2`}>
              <div className={`h-2 w-2 rounded-full shrink-0 ${key === 'hunted' ? 'bg-red-500' : val.dot}`} />
              <div>
                <div className={`text-[10px] font-bold uppercase tracking-wider ${val.color}`}>{val.label}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-yellow-600/10 px-6 py-6 mt-12 flex items-center justify-between">
        <Link href="/survival">
          <span className="text-xs text-gray-700 uppercase tracking-widest hover:text-yellow-600/50 transition-colors cursor-pointer">
            ← Back to Survival Queue
          </span>
        </Link>
        <span className="text-yellow-600/20 text-lg">♦</span>
        <span className="text-xs text-gray-700 font-mono">THE FOX DOESN'T NEGOTIATE</span>
      </footer>

    </div>
  );
}
