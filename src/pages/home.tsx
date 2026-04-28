import { useState } from "react";
import { Link } from "wouter";
import { useWallet } from "@/hooks/use-wallet";
import { ConnectWalletDialog } from "@/components/wallet/ConnectWalletDialog";
import {
  ShieldAlert, Ticket, Activity, Coins, MessageSquare,
  Trophy, ArrowRight, Zap, Globe, Lock, ChevronDown,
  Target, Users, TrendingUp, CheckCircle
} from "lucide-react";

export default function Home() {
  const { address, connect } = useWallet();
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050506] text-white overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 border-b border-white/5 bg-[#050506]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-amber-500 overflow-hidden shrink-0">
            <img src="/logo.jpg" alt="FUXEL" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
          <span className="font-bold text-amber-500 tracking-widest text-lg">FUXEL</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#how" className="hover:text-white transition-colors">How It Works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#ecosystem" className="hover:text-white transition-colors">Ecosystem</a>
        </div>
        <div className="flex items-center gap-3">
          {address ? (
            <Link href="/dashboard">
              <button className="bg-amber-500 text-black font-bold uppercase tracking-wider text-xs px-5 py-2.5 hover:bg-amber-400 transition-colors">
                Open App
              </button>
            </Link>
          ) : (
            <button
              onClick={() => setConnectOpen(true)}
              className="bg-amber-500 text-black font-bold uppercase tracking-wider text-xs px-5 py-2.5 hover:bg-amber-400 transition-colors"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[200px] h-[200px] bg-orange-600/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,165,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,165,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/5 px-4 py-1.5 text-xs font-mono text-amber-400 uppercase tracking-widest mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            Now Live on Tempo Chain
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tight mb-6">
            <span className="block text-white">Turn Your</span>
            <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              Activity Into
            </span>
            <span className="block text-white">Value</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            FUXEL is the engagement layer for Web3 communities. Complete operations, build reputation, earn rewards — all tied to your wallet identity across chains.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {address ? (
              <Link href="/dashboard">
                <button className="group flex items-center gap-3 bg-amber-500 text-black font-bold uppercase tracking-wider px-8 py-4 hover:bg-amber-400 transition-all text-sm">
                  Open Command Center
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            ) : (
              <button
                onClick={() => setConnectOpen(true)}
                className="group flex items-center gap-3 bg-amber-500 text-black font-bold uppercase tracking-wider px-8 py-4 hover:bg-amber-400 transition-all text-sm"
              >
                Connect & Start Earning
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
            <a href="#how" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium uppercase tracking-wider border border-white/10 px-8 py-4 hover:border-white/30">
              Learn More
            </a>
          </div>

          {/* Chain badges */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Tempo Mainnet
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              Ethereum
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
              <span className="text-gray-600">+ More chains coming</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a href="#how" className="absolute bottom-8 flex flex-col items-center gap-2 text-gray-600 hover:text-gray-400 transition-colors animate-bounce">
          <ChevronDown className="h-5 w-5" />
        </a>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-amber-500 mb-4">The Problem</p>
          <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight mb-6">
            Web3 Engagement is <span className="text-amber-500">Broken</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mb-16">
            Most communities rely on likes, retweets, and empty participation. Bots farm rewards. Real users go unrecognized. Projects can't tell who actually matters.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {[
              { icon: "🤖", title: "Bot Invasion", desc: "Fake accounts and farmers exploit reward systems, diluting value for real users." },
              { icon: "📉", title: "Shallow Engagement", desc: "Likes and follows don't reflect real commitment. Communities can't identify their best members." },
              { icon: "💸", title: "Unfair Rewards", desc: "Rewards go to whoever games the system fastest, not to the most valuable contributors." },
            ].map((item, i) => (
              <div key={i} className="bg-[#0a0a0c] p-8 text-left">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-white text-lg mb-2 uppercase tracking-wide">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-amber-500 mb-4">How It Works</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight">
              Activity Becomes <span className="text-amber-500">Identity</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {[
              { step: "01", icon: Target, title: "Complete Operations", desc: "Finish on-chain and off-chain tasks. Mint NFTs, stake tokens, join communities, refer friends." },
              { step: "02", icon: Activity, title: "Activity Is Tracked", desc: "Everything is tied to your wallet. Your behavior is recorded transparently on-chain over time." },
              { step: "03", icon: Zap, title: "Earn Rewards", desc: "Accumulate points, enter high-stakes raffles, and unlock exclusive opportunities as you grow." },
              { step: "04", icon: Trophy, title: "Build Reputation", desc: "Your rank reflects your consistency and real contributions — not just how much you hold." },
            ].map((item) => (
              <div key={item.step} className="bg-[#0a0a0c] p-8 group hover:bg-amber-500/5 transition-colors">
                <div className="text-amber-500/30 font-black text-5xl font-mono mb-4 group-hover:text-amber-500/50 transition-colors">{item.step}</div>
                <item.icon className="h-6 w-6 text-amber-500 mb-4" />
                <h3 className="font-bold text-white text-base mb-2 uppercase tracking-wide">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6 border-t border-white/5 bg-[#07070a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-amber-500 mb-4">Core Features</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight">
              Everything Your <span className="text-amber-500">Community Needs</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {[
              { icon: ShieldAlert, title: "Operations", label: "Quests", desc: "Create custom campaigns with on-chain and social tasks. Reward users for real actions, not empty clicks." },
              { icon: Activity, title: "Comms Link", label: "Live Feed", desc: "A real-time stream of ecosystem activity. See mints, completions, rank-ups, and raffle entries as they happen." },
              { icon: Coins, title: "Reserves", label: "Staking", desc: "Lock tokens to increase your reputation multiplier. Higher commitment means higher rewards and better rank." },
              { icon: Ticket, title: "The Vault", label: "Raffles", desc: "Spend reputation points to enter exclusive raffles. Fair, transparent, and driven by real engagement." },
              { icon: Trophy, title: "Standings", label: "Leaderboard", desc: "Global rankings based on activity and holdings. Rise through Scout, Operator, and Insider clearance levels." },
              { icon: MessageSquare, title: "FoxChat", label: "Identity-Gated Chat", desc: "Communication tied to your wallet identity and rank. No bots, no spam — just verified community members." },
            ].map((item) => (
              <div key={item.title} className="bg-[#0a0a0c] p-8 group hover:bg-amber-500/5 transition-colors border-b border-r border-white/0">
                <div className="flex items-start justify-between mb-4">
                  <item.icon className="h-6 w-6 text-amber-500" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500/50 border border-amber-500/20 px-2 py-0.5">{item.label}</span>
                </div>
                <h3 className="font-bold text-white text-lg mb-2 uppercase tracking-wide">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR COMMUNITIES ── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-amber-500 mb-4">For Projects & Communities</p>
              <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight mb-6">
                Know Who Your <span className="text-amber-500">Real Users Are</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                FUXEL gives projects the tools to grow faster, retain users, and reward the people who actually matter — not bots, not farmers.
              </p>
              <div className="space-y-4">
                {[
                  "Create custom quest campaigns in minutes",
                  "Identify your most valuable community members",
                  "Reward engagement fairly and transparently",
                  "Track user activity across on-chain and social",
                  "Build loyalty that compounds over time",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-amber-500 shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5">
              {[
                { icon: Users, label: "Grow Faster", desc: "Structured onboarding turns visitors into active participants." },
                { icon: TrendingUp, label: "Retain Users", desc: "Progress and rank give users reasons to keep coming back." },
                { icon: Target, label: "Reward Fairly", desc: "Points reflect real contributions, not gaming tactics." },
                { icon: Globe, label: "Go Multichain", desc: "Starting on Tempo, expanding across the EVM ecosystem." },
              ].map((item) => (
                <div key={item.label} className="bg-[#0a0a0c] p-6">
                  <item.icon className="h-5 w-5 text-amber-500 mb-3" />
                  <div className="font-bold text-white text-sm uppercase tracking-wide mb-1">{item.label}</div>
                  <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM ── */}
      <section id="ecosystem" className="py-24 px-6 border-t border-white/5 bg-[#07070a]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-amber-500 mb-4">Multichain Vision</p>
          <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight mb-6">
            Starting on Tempo, <span className="text-amber-500">Built for Everyone</span>
          </h2>
          <p className="text-gray-400 leading-relaxed mb-12">
            FUXEL launches as the engagement layer for Tempo communities. Your reputation, history, and rewards follow you as we expand across chains — creating a unified identity for the entire Web3 ecosystem.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "Tempo Mainnet", status: "live", color: "text-green-400 border-green-500/30 bg-green-500/5" },
              { name: "Ethereum", status: "live", color: "text-blue-400 border-blue-500/30 bg-blue-500/5" },
              { name: "Base", status: "soon", color: "text-gray-500 border-gray-700 bg-white/[0.02]" },
              { name: "Arbitrum", status: "soon", color: "text-gray-500 border-gray-700 bg-white/[0.02]" },
              { name: "Polygon", status: "soon", color: "text-gray-500 border-gray-700 bg-white/[0.02]" },
            ].map((chain) => (
              <div key={chain.name} className={`flex items-center gap-2 px-4 py-2 border text-xs font-mono uppercase tracking-wider ${chain.color}`}>
                <div className={`h-1.5 w-1.5 rounded-full ${chain.status === 'live' ? 'bg-current animate-pulse' : 'bg-gray-600'}`} />
                {chain.name}
                {chain.status === 'soon' && <span className="text-[9px] text-gray-600">Soon</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight mb-6">
            Ready to Build Your <span className="text-amber-500">Reputation?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Connect your wallet and start earning on Tempo chain today. Your activity, your identity, your rewards.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {address ? (
              <Link href="/dashboard">
                <button className="group flex items-center gap-3 bg-amber-500 text-black font-bold uppercase tracking-wider px-10 py-4 hover:bg-amber-400 transition-all text-sm">
                  Open Command Center
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            ) : (
              <button
                onClick={() => setConnectOpen(true)}
                className="group flex items-center gap-3 bg-amber-500 text-black font-bold uppercase tracking-wider px-10 py-4 hover:bg-amber-400 transition-all text-sm"
              >
                Connect Wallet
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded bg-amber-500 overflow-hidden">
              <img src="/logo.jpg" alt="FUXEL" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
            <span className="font-bold text-amber-500 tracking-widest text-sm">FUXEL</span>
          </div>
          <div className="text-xs text-gray-600 font-mono">
            Built on Tempo Chain · © 2026 FUXEL
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors uppercase tracking-wider">Twitter</a>
            <a href="#" className="hover:text-white transition-colors uppercase tracking-wider">Discord</a>
            <a href="#" className="hover:text-white transition-colors uppercase tracking-wider">Docs</a>
          </div>
        </div>
      </footer>

      <ConnectWalletDialog open={connectOpen} onOpenChange={setConnectOpen} />
    </div>
  );
}
