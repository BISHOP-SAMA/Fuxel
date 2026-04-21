import { Shell } from "@/components/layout/Shell";
import { useListUsers, getListUsersQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RankBadge } from "@/components/ui/rank-badge";
import { Trophy, Medal, Shield } from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";

export default function Leaderboard() {
  const { address } = useWallet();
  const { data: users, isLoading } = useListUsers({
    query: { queryKey: getListUsersQueryKey() }
  });

  return (
    <Shell>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white uppercase tracking-widest mb-4">Global Standings</h1>
          <p className="text-gray-400 max-w-xl mx-auto">Top operatives ranked by reputation score. Stake reserves and complete operations to rise in rank.</p>
        </div>

        <Card className="bg-black/60 border-amber-500/20 backdrop-blur-xl shadow-[0_0_30px_rgba(245,158,11,0.05)] overflow-hidden">
          <CardHeader className="bg-white/[0.02] border-b border-amber-500/10">
            <div className="grid grid-cols-12 gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest px-4">
              <div className="col-span-2 md:col-span-1 text-center">Rank</div>
              <div className="col-span-10 md:col-span-6">Operative</div>
              <div className="hidden md:block col-span-3 text-center">Clearance</div>
              <div className="col-span-12 md:col-span-2 text-right">Reputation</div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="divide-y divide-white/5">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="p-6 flex items-center"><div className="h-6 w-full bg-white/5 animate-pulse rounded" /></div>
                ))}
              </div>
            ) : users?.length === 0 ? (
              <div className="p-12 text-center text-gray-500">No operatives found in database.</div>
            ) : (
              <div className="divide-y divide-white/5">
                {users?.map((user, idx) => {
                  const isTop3 = idx < 3;
                  const isMe = user.address === address;
                  
                  return (
                    <div 
                      key={user.id} 
                      className={`grid grid-cols-12 gap-4 p-4 md:p-6 items-center transition-colors hover:bg-white/[0.02] ${isMe ? 'bg-amber-500/5 relative' : ''}`}
                    >
                      {isMe && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />}
                      
                      <div className="col-span-2 md:col-span-1 flex justify-center">
                        {idx === 0 ? <Trophy className="h-6 w-6 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" /> : 
                         idx === 1 ? <Medal className="h-6 w-6 text-gray-300 drop-shadow-[0_0_8px_rgba(209,213,219,0.8)]" /> : 
                         idx === 2 ? <Medal className="h-6 w-6 text-amber-700 drop-shadow-[0_0_8px_rgba(180,83,9,0.8)]" /> : 
                         <span className="font-mono text-gray-500 text-lg font-bold">{(idx + 1).toString().padStart(2, '0')}</span>}
                      </div>
                      
                      <div className="col-span-10 md:col-span-6 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <div className="font-mono text-sm md:text-base text-gray-200">
                          {user.address.slice(0, 8)}...{user.address.slice(-6)}
                        </div>
                        {isMe && <span className="text-[10px] bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded font-bold uppercase tracking-wider self-start md:self-auto">You</span>}
                      </div>
                      
                      <div className="hidden md:flex col-span-3 justify-center">
                        <RankBadge rank={user.rank} />
                      </div>
                      
                      <div className="col-span-12 md:col-span-2 text-right mt-2 md:mt-0">
                        <div className="font-mono text-xl font-bold text-amber-500">{user.points.toLocaleString()}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
}