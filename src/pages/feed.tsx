import { Shell } from "@/components/layout/Shell";
import { useGetFeed, getGetFeedQueryKey, useGetTrendingFeed } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Ticket, Trophy, ShieldAlert, ArrowUpRight, TrendingUp } from "lucide-react";

export default function Feed() {
  const { data: feedItems, isLoading } = useGetFeed(
    { limit: 50 },
    { query: { refetchInterval: 10000, queryKey: getGetFeedQueryKey({ limit: 50 }) } }
  );

  const { data: trending, isLoading: trendingLoading } = useGetTrendingFeed();

  const getIconForType = (type: string) => {
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

  const getColorForType = (type: string) => {
    switch (type) {
      case 'mint': return "border-blue-500/20 bg-blue-500/5";
      case 'quest_complete': return "border-green-500/20 bg-green-500/5";
      case 'raffle_enter': return "border-gray-500/20 bg-gray-500/5";
      case 'raffle_win': return "border-amber-500/20 bg-amber-500/5";
      case 'stake': return "border-purple-500/20 bg-purple-500/5";
      case 'rank_up': return "border-amber-500/40 bg-amber-500/10";
      default: return "border-gray-500/20 bg-gray-500/5";
    }
  };

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
            <CardContent className="flex-1 overflow-y-auto p-0 scrollbar-none">
              {isLoading ? (
                <div className="p-4 space-y-4">
                  {[1,2,3,4,5].map(i => <div key={i} className="h-10 bg-white/5 animate-pulse rounded" />)}
                </div>
              ) : feedItems?.length === 0 ? (
                <div className="p-8 text-center text-gray-500">Silence on the wire. No recent events.</div>
              ) : (
                <div className="divide-y divide-white/5">
                  {feedItems?.map((item) => (
                    <div key={item.id} className={`flex items-center p-3 text-sm transition-colors hover:bg-white/[0.02] ${getColorForType(item.type)} border-l-2 border-y-0 border-r-0 my-[1px]`}>
                      <div className="w-12 flex justify-center shrink-0">
                        {getIconForType(item.type)}
                      </div>
                      <div className="w-32 font-mono text-gray-400 shrink-0">
                        {item.shortAddress}
                      </div>
                      <div className="flex-1 text-gray-200 truncate pr-4">
                        {item.description}
                      </div>
                      <div className="w-24 text-right text-xs text-gray-500 font-mono shrink-0">
                        {new Date(item.createdAt).toLocaleTimeString([], { hour12: false })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="w-full lg:w-80 flex flex-col shrink-0 gap-6">
          <Card className="bg-black/40 border-amber-500/20 backdrop-blur-md">
            <CardHeader className="border-b border-amber-500/10 pb-4">
              <CardTitle className="text-amber-500 uppercase tracking-widest text-sm font-bold flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Trending Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {trendingLoading ? (
                <div className="p-4 space-y-4">
                  {[1,2,3].map(i => <div key={i} className="h-12 bg-white/5 animate-pulse rounded" />)}
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {trending?.map((item) => (
                    <div key={item.id} className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-gray-800 overflow-hidden border border-white/10 shrink-0">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">IMG</div>
                        )}
                      </div>
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
              )}
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