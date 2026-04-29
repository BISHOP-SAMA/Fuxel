import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Flame, Trophy, ChevronRight, Skull, Shield, Zap, Clock } from "lucide-react";

const STATS = [
  { label: "Registered", value: "0" },
  { label: "Eliminated", value: "0" },
  { label: "GTD Secured", value: "0" },
  { label: "Days Left", value: "—" },
];

const PATHS = [
  {
    icon: "🃏",
    name: "The Queue",
    desc: "Survive daily eliminations. Stay in the top 1,000 when the game ends and earn your mint spot. Earn chips, play cards, attack rivals, defend yourself.",
    reward: "Standard Mint",
    difficulty: "Hard",
    color: "from-red-900/40 to-black",
    border: "border-red-500/20",
    tag: "border-red-500/40 text-red-400",
  },
  {
    icon: "🦊",
    name: "The Puzzle",
    desc: "Collect all 7 fox portrait fragments. Complete the set and you exit the leaderboard immediately — GTD secured, no elimination risk. The harder path. The smarter play.",
    reward: "Guaranteed Mint — Exit the Queue",
    difficulty: "Harder",
    color: "from-amber-900/40 to-black",
    border: "border-amber-500/30",
    tag: "border-amber-500/50 text-amber-400",
  },
];

const FEED = [
  { icon: "💀", msg: "The game hasn't started yet. The fox is watching.", time: "soon" },
  { icon: "🎰", msg: "Registration opens. The hunt begins.", time: "coming" },
  { icon: "🔒", msg: "1,555 spots. Two paths. No mercy.", time: "—" },
];

export default function SurvivalLanding() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0800] text-white overflow-x-hidden font-mono">

      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)' }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-yellow-600/20">
        <Link href="/">
          <span className="text-xs text-yellow-600/50 uppercase tracking-widest hover:text-yellow-500 transition-colors cursor-pointer">
            ← FUXEL
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs text-red-400 uppercase tracking-widest">Game Not Started</span>
        </div>
        <Link href="/survival/leaderboard">
          <span className="text-xs text-yellow-600/50 uppercase tracking-widest hover:text-yellow-500 transition-colors cursor-pointer">
            The Board →
          </span>
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-20">

        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(180,120,0,0.15) 0%, transparent 70%)' }} />

        {/* Playing card suits decoration */}
        <div className="absolute top-20 left-8 text-6xl opacity-5 select-none">♠</div>
        <div className="absolute top-32 right-8 text-6xl opacity-5 select-none">♦</div>
        <div className="absolute bottom-32 left-12 text-6xl opacity-5 select-none">♣</div>
        <div className="absolute bottom-20 right-12 text-6xl opacity-5 select-none">♥</div>

        <div className="relative z-10 max-w-3xl mx-auto">

          {/* Title */}
          <div className="mb-3">
            <span className="text-xs tracking-[0.4em] text-yellow-600/70 uppercase">FUXEL presents</span>
          </div>

          <h1
            className={`text-6xl md:text-8xl font-black uppercase leading-none mb-2 transition-all duration-75 ${glitch ? 'skew-x-1 text-red-400' : 'text-white'}`}
            style={{
              textShadow: glitch
                ? '3px 0 #ff0000, -3px 0 #00ff00'
                : '0 0 40px rgba(200,150,0,0.3)',
              fontFamily: "'Georgia', serif",
              letterSpacing: '-0.02em'
            }}
          >
            SURVIVAL
          </h1>
          <h1
            className="text-6xl md:text-8xl font-black uppercase leading-none mb-8"
            style={{
              color: '#c8960a',
              textShadow: '0 0 60px rgba(200,150,0,0.5)',
              fontFamily: "'Georgia', serif",
              letterSpacing: '-0.02em'
            }}
          >
            QUEUE
          </h1>

          <div className="w-32 h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto mb-8" />

          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-4 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
            The fox started with nothing. Now he's letting you play his game.
          </p>
          <p className="text-base text-gray-500 max-w-lg mx-auto mb-12 leading-relaxed">
            1,555 NFTs. Two paths. Daily eliminations. Chip wars. Fragment hunts. Only the sharpest survive.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              disabled
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 font-bold uppercase tracking-widest text-sm border border-yellow-600/50 text-yellow-600/50 cursor-not-allowed"
              style={{ background: 'rgba(180,120,0,0.05)' }}
            >
              <Flame className="h-4 w-4" />
              Registration Opening Soon
            </button>
            <Link href="/survival/leaderboard">
              <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 font-bold uppercase tracking-widest text-sm border border-white/10 text-gray-400 hover:border-yellow-600/30 hover:text-yellow-500 transition-all">
                <Trophy className="h-4 w-4" />
                View The Board
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-yellow-600/10 border border-yellow-600/10 max-w-2xl mx-auto">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-[#0a0800] px-6 py-4 text-center">
                <div className="text-2xl font-black text-yellow-500 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                  {stat.value}
                </div>
                <div className="text-[10px] text-gray-600 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 flex items-center gap-4 px-6 py-2">
        <div className="flex-1 h-px bg-yellow-600/10" />
        <span className="text-yellow-600/30 text-lg">♦</span>
        <div className="flex-1 h-px bg-yellow-600/10" />
      </div>

      {/* Two Paths */}
      <section className="relative z-10 px-6 py-20 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] text-yellow-600/50 uppercase mb-3">The Rules</p>
          <h2 className="text-3xl md:text-4xl font-black uppercase" style={{ fontFamily: 'Georgia, serif', color: '#c8960a' }}>
            Two Paths to Mint
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-yellow-600/10 border border-yellow-600/10">
          {PATHS.map((path) => (
            <div key={path.name} className={`bg-gradient-to-b ${path.color} p-8 border ${path.border}`}>
              <div className="text-4xl mb-4">{path.icon}</div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black uppercase tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                  {path.name}
                </h3>
                <span className={`text-[10px] border px-2 py-0.5 uppercase tracking-widest ${path.tag}`}>
                  {path.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">{path.desc}</p>
              <div className="border-t border-white/5 pt-4">
                <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">Reward</div>
                <div className="text-sm font-bold text-white">{path.reward}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How chips work */}
      <section className="relative z-10 px-6 py-16 border-t border-yellow-600/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] text-yellow-600/50 uppercase mb-3">The Economy</p>
            <h2 className="text-3xl font-black uppercase" style={{ fontFamily: 'Georgia, serif', color: '#c8960a' }}>
              The Chip System
            </h2>
            <p className="text-gray-500 text-sm mt-3 max-w-lg mx-auto">
              Chips are the currency of survival. Earn them. Spend them. Guard them. Lose them. They can go negative — and that's when the debt collectors come.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-yellow-600/10 border border-yellow-600/10">
            {[
              {
                icon: "💰", title: "Earn", items: [
                  "Daily check-in → +10",
                  "Tweet #Fuxel → +15",
                  "Refer someone → +25",
                  "Open boxes → Variable",
                  "Bail a friend → +10",
                ]
              },
              {
                icon: "🎰", title: "Spend", items: [
                  "Common Box → 20",
                  "Rare Box → 50",
                  "Fox Box → 150",
                  "Shield → 80",
                  "Bail friend → 100",
                ]
              },
              {
                icon: "⚠️", title: "Lose", items: [
                  "RUG card → -25",
                  "Wallet Drainer → -50",
                  "Go negative → Jail",
                  "No bail in 24h → Eliminated",
                  "No appeals. Ever.",
                ]
              },
            ].map((col) => (
              <div key={col.title} className="bg-[#0a0800] p-6">
                <div className="text-2xl mb-3">{col.icon}</div>
                <h3 className="font-black uppercase tracking-wider text-white mb-4 text-sm">{col.title}</h3>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="text-xs text-gray-500 flex items-center gap-2">
                      <span className="text-yellow-600/50">—</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Cards */}
      <section className="relative z-10 px-6 py-16 border-t border-yellow-600/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] text-yellow-600/50 uppercase mb-3">The Arsenal</p>
            <h2 className="text-3xl font-black uppercase" style={{ fontFamily: 'Georgia, serif', color: '#c8960a' }}>
              The Card Deck
            </h2>
            <p className="text-gray-500 text-sm mt-3">Cards drop from boxes. Play them against anyone in the queue at any time.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { emoji: "🃏", name: "RUG", type: "Attack", desc: "-25 chips + 10% chance to steal a fragment", color: "border-red-500/20 bg-red-900/10" },
              { emoji: "💸", name: "Wallet Drainer", type: "Attack", desc: "-50 chips from target. No fragment risk.", color: "border-red-500/20 bg-red-900/10" },
              { emoji: "🎯", name: "Bounty", type: "Attack", desc: "Community earns +15 chips for rugging the target", color: "border-orange-500/20 bg-orange-900/10" },
              { emoji: "🛡️", name: "Shield", type: "Defense", desc: "24hr full protection from all attacks", color: "border-blue-500/20 bg-blue-900/10" },
              { emoji: "🔓", name: "Bail Token", type: "Defense", desc: "Instantly bail yourself or a friend from jail", color: "border-blue-500/20 bg-blue-900/10" },
              { emoji: "🕵️", name: "Spy", type: "Utility", desc: "Reveals target's fragment count + shield status", color: "border-yellow-500/20 bg-yellow-900/10" },
              { emoji: "🔒", name: "Trade Lock", type: "Utility", desc: "Force a fragment trade at your declared price", color: "border-yellow-500/20 bg-yellow-900/10" },
              { emoji: "💣", name: "Trap Box", type: "Trap", desc: "Looks like a Common Box. It isn't. That's the con.", color: "border-gray-500/20 bg-gray-900/20" },
            ].map((card) => (
              <div key={card.name} className={`border ${card.color} p-4 flex flex-col`}>
                <div className="text-2xl mb-2">{card.emoji}</div>
                <div className="text-[9px] text-gray-600 uppercase tracking-widest mb-1">{card.type}</div>
                <div className="font-black text-white text-xs mb-2 uppercase">{card.name}</div>
                <div className="text-[11px] text-gray-500 leading-relaxed mt-auto">{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Player States */}
      <section className="relative z-10 px-6 py-16 border-t border-yellow-600/10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] text-yellow-600/50 uppercase mb-3">Your Status</p>
            <h2 className="text-3xl font-black uppercase" style={{ fontFamily: 'Georgia, serif', color: '#c8960a' }}>
              Four States
            </h2>
          </div>
          <div className="space-y-px border border-yellow-600/10">
            {[
              { icon: "🟡", state: "Active", desc: "In the top 1,000. You're good. Stay active.", color: "text-yellow-400" },
              { icon: "🛡️", state: "Shielded", desc: "Top 1,000 + protected for 24hrs. Untouchable.", color: "text-blue-400" },
              { icon: "💀", state: "Hunted", desc: "Outside top 1,000. Debt collectors dispatched. 24hrs to recover.", color: "text-red-400" },
              { icon: "🔒", state: "Jailed", desc: "Chips went negative. Get bailed or get permanently eliminated.", color: "text-gray-400" },
            ].map((s) => (
              <div key={s.state} className="flex items-center gap-6 bg-[#0a0800] px-6 py-4 hover:bg-yellow-600/5 transition-colors">
                <span className="text-2xl shrink-0">{s.icon}</span>
                <div>
                  <div className={`font-black uppercase text-sm tracking-wider ${s.color}`}>{s.state}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Feed Preview */}
      <section className="relative z-10 px-6 py-16 border-t border-yellow-600/10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.3em] text-yellow-600/50 uppercase mb-3">Content Engine</p>
            <h2 className="text-3xl font-black uppercase" style={{ fontFamily: 'Georgia, serif', color: '#c8960a' }}>
              Activity Feed
            </h2>
            <p className="text-gray-500 text-sm mt-3">Every attack, jail, bail, and elimination posts publicly. This is the game's heartbeat.</p>
          </div>
          <div className="border border-yellow-600/10 divide-y divide-yellow-600/5">
            {FEED.map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 bg-[#0a0800]">
                <span className="text-xl shrink-0">{item.icon}</span>
                <span className="text-sm text-gray-400 flex-1">{item.msg}</span>
                <span className="text-[10px] text-gray-700 font-mono shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-6 border-t border-yellow-600/10 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 rounded-full blur-[100px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(180,120,0,0.1) 0%, transparent 70%)' }} />
        <div className="relative z-10">
          <div className="text-5xl mb-6">🦊</div>
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-4" style={{ fontFamily: 'Georgia, serif', color: '#c8960a' }}>
            The House Always Has an Edge.
          </h2>
          <p className="text-gray-500 text-sm mb-10 max-w-md mx-auto">
            But the fox rewards the ones sharp enough to keep up. Registration opens soon.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              disabled
              className="px-10 py-4 font-black uppercase tracking-widest text-sm border border-yellow-600/30 text-yellow-600/40 cursor-not-allowed"
            >
              Coming Soon
            </button>
            <Link href="/survival/leaderboard">
              <button className="px-10 py-4 font-black uppercase tracking-widest text-sm border border-white/10 text-gray-500 hover:border-yellow-600/30 hover:text-yellow-500 transition-all">
                View The Board
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-yellow-600/10 px-6 py-6 flex items-center justify-between">
        <span className="text-xs text-gray-700 font-mono">FUXEL SURVIVAL QUEUE</span>
        <span className="text-yellow-600/30 text-lg">♦</span>
        <span className="text-xs text-gray-700 font-mono">1,555 PIECES. TWO PATHS. ONE FOX.</span>
      </footer>

    </div>
  );
}
