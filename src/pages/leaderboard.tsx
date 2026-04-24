import { Shell } from "@/components/layout/Shell";
import { useWallet } from "@/hooks/use-wallet";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Trophy, Medal } from "lucide-react";

const mockUsers = [
  { id: 1, address: "0x123456...345678", rank: "Insider", points: 5500 },
  { id: 2, address: "0xabcdef...cdef12", rank: "Operator", points: 2300 },
  { id: 3, address: "0x987654...765432", rank: "Scout", points: 850 },
];

export default function Leaderboard() {
  const { address } = useWallet();

  return (
    <Shell>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white uppercase tracking-widest mb-4">Global Standings</h1>
          <p className="text-gray-400 max-w-xl mx-auto">Top operatives ranked by reputation score. Stake reserves and complete operations to rise in rank.</p>
        </div>

        <Card className="bg-black/60 border-amber-500/20 backdrop-blur-xl overflow-hidden">
          <CardHeader className="bg-white/[0.02] border-b border-amber-500/10">
            <div className="grid grid-cols-12 gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest px-4">
              <div className="col-span-2 text-center">Rank</div>
              <div className="col-span-5">Operative</div>
              <div className="col-span-3 text-center">Clearance</div>
              <div className="col-span-2 text-right">Reputation</div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {mockUsers.map((user, idx) => {
                const isMe = user.address === address;
                return (
                  <div key={user.id} className={`grid grid-cols-12 gap-4 p-6 items-center hover:bg-white/[0.02] transition-colors ${isMe ? 'bg-amber-500/5' : ''}`}>
                    <div className="col-span-2 flex justify-center">
                      {idx === 0 ? <Trophy className="h-6 w-6 text-amber-400" /> :
                       idx === 1 ? <Medal className="h-6 w-6 text-gray-300" /> :
                       idx === 2 ? <Medal className="h-6 w-6 text-amber-700" /> :
                       <span className="font-mono text-gray-500 text-lg font-bold">{(idx + 1).toString().padStart(2, '0')}</span>}
                    </div>
                    <div className="col-span-5 font-mono text-sm text-gray-200">{user.address}</div>
                    <div className="col-span-3 flex justify-center">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 border ${user.rank === 'Insider' ? 'border-amber-500/50 text-amber-500 bg-amber-500/10' : user.rank === 'Operator' ? 'border-blue-500/50 text-blue-400 bg-blue-500/10' : 'border-gray-500/50 text-gray-400 bg-gray-500/10'}`}>{user.rank}</span>
                    </div>
                    <div className="col-span-2 text-right font-mono text-xl font-bold text-amber-500">{user.points.toLocaleString()}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
}
