import { Shell } from "@/components/layout/Shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Ticket, Trophy, ShieldAlert, ArrowUpRight, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

const initialFeed = [
  { id: 1, type: "mint", shortAddress: "0x1234...5678", description: "minted Tempo Fox #0042", createdAt: new Date().toISOString() },
  { id: 2, type: "quest_complete", shortAddress: "0xabcd...ef12", description: 'completed quest "Join the Tempo Discord" and earned 100 points', createdAt: new Date().toISOString() },
  { id: 3, type: "rank_up", shortAddress: "0x1234...5678", description: "ranked up to Insider status", createdAt: new Date().toISOString() },
  { id: 4, type: "raffle_enter", shortAddress: "0x9876...5432", description: 'entered raffle "Exclusive Fox NFT Drop"', createdAt: new Date().toISOString() },
  { id: 5, type: "stake", shortAddress: "0xabcd...ef12", description: "staked 75 tokens (Gold tier, 1.5x multiplier)", createdAt: new Date().toISOString() },
  { id: 6, type: "quest_complete", shortAddress: "0x9876...5432", description: 'completed quest "Follow Tempo on Twitter" and earned 75 points', createdAt: new Date().toISOString() },
  { id: 7, type: "mint", shortAddress: "0xabcd...ef12", description: "minted Tempo Fox #0117", createdAt: new Date().toISOString() },
  { id: 8, type: "raffle_win", shortAddress: "0x1234...5678", description: 'won the "Alpha Pass Giveaway" raffle!', createdAt: new Date().toISOString() },
];

const trending = [
  { id: 1, name: "Tempo Foxes", floorPrice: "0.85 ETH", change24h: 12.4 },
  { id: 2, name: "Midnight Owls", floorPrice: "0.42 ETH", change24h: -3.1 },
  { id: 3, name: "Neo Punks", floorPrice: "2.1 ETH", change24h: 8.7 },
  { id: 4, name: "Void Cats", floorPrice: "0.22 ETH", change24h: -1.2 },
  { id: 5, name: "Solar Bears", floorPrice: "0.67 ETH", change24h: 22.1 },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'mint': return <ArrowUpRight className="h-4 w-4 text-blue-400" />;
    case 'quest_complete': return <ShieldAlert className="h-4 w-4 text-green-400" />;
    case 'raffle_enter': return <Ticket className="h-4 w-4 text-gray-400" />;
    case 'raffle_win': return <Trophy className="h-4 w-4 text-amber-400" />;
    case 'stake': return <Zap className="h-4 w-4 text-purple-400" />;
    case 'rank_up': return <Trophy className="h-4 w-4 text-amber-500" />;
    default: return <Zap className="h-4 w-4 text-gray-400" />;
  }
};

const getColor = (type: string) => {
  switch (type) {
    case 'mint': return "border-l-blue-500/50";
    case 'quest_complete': return "border-l-green-500/50";
    case 'raffle_win': return "border-l-amber-500/50";
    case 'stake': return "border-l-purple-500/50";
    case 'rank_up': return "border-l-amber-500/80";
    default: return "border-l-gray-500/30";
  }
};

export default function Feed() {
  const [feed, setFeed] = useState(initialFeed);

  return (
    <Shell>
      <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-8rem)]">
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="shrink-0 mb-6">
            <h1 className="text-3xl font-bold text-white uppercase tracking-tight flex items-center gap-3">
              <ActivityPulse /> Comms Link
            </h1>
            <p className="text-gray-400 mt-2">Live stream of network operations.</p>
          </div>

          <Card className="flex-1 bg-black/40 border-amber-500/20 backdrop-blur-md overflow-hidden flex flex-col">
            <CardHeader className="border-b border-amber-500/10 shrink-0 py-3">
              <div className="flex text-xs uppercase tracking-widest text-gray-500 font-bold">
                <div className="w-12 text-center">Type</div>
                <div className="w-32">Operative</div>
                <div className="flex-1">Event Detail</div>
                <div className="w-24 text-right">Timestamp</div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0">
              <div className="divide-y divide-white/5">
                {feed.map((item) => (
                  <div key={item.id} className={`flex items-center p-3 text-sm hover:bg-white/[0.02] border-l-2 border-y-0 border-r-0 ${getColor(item.type)}`}>
                    <div className="w-12 flex justify-center shrink-0">{getIcon(item.type)}</div>
                    <div className="w-32 font-mono text-gray-400 shrink-0">{item.shortAddress}</div>
                    <div className="flex-1 text-gray-200 truncate pr-4">{item.description}</div>
                    <div className="w-24 text-right text-xs text-gray-500 font-mono shrink-0">
                      {new Date(item.createdAt).toLocaleTimeString([], { hour12: false })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full lg:w-80 shrink-0">
          <Card className="bg-black/40 border-amber-500/20 backdrop-blur-md">
            <CardHeader className="border-b border-amber-500/10 pb-4">
              <CardTitle className="text-amber-500 uppercase tracking-widest text-sm font-bold flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Trending Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {trending.map((item) => (
                  <div key={item.id} className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-gray-800 border border-white/10 shrink-0 flex items-center justify-center text-xs text-gray-600">IMG</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white truncate text-sm">{item.name}</div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-400 font-mono">{item.floorPrice}</span>
                        <span className={`text-xs font-mono ${item.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {item.change24h > 0 ? '+' : ''}{item.change24h}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Shell>
  );
}

function ActivityPulse() {
  return (
    <div className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
    </div>
  );
}
