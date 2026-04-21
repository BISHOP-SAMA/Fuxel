import { Shell } from "@/components/layout/Shell";
import { useWallet } from "@/hooks/use-wallet";
import { useGetUserStats, getGetUserStatsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RankBadge } from "@/components/ui/rank-badge";
import { UserCircle, Award, Target, Ticket, Zap } from "lucide-react";

export default function Profile() {
  const { address } = useWallet();
  const { data: stats, isLoading } = useGetUserStats(address || "", {
    query: { enabled: !!address, queryKey: getGetUserStatsQueryKey(address || "") }
  });

  if (!address) {
    return (
      <Shell>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center max-w-md mx-auto">
          <UserCircle className="h-16 w-16 text-gray-600 mb-4" />
          <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-2">Unidentified Operative</h2>
          <p className="text-gray-500">Initialize terminal connection to view dossier and service record.</p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="flex items-start justify-between border-b border-amber-500/20 pb-8">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded bg-black border border-amber-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.15)] relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
               <UserCircle className="h-12 w-12 text-amber-500/50" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white font-mono tracking-tight">{address}</h1>
              <div className="flex items-center gap-3 mt-3">
                <RankBadge rank={stats?.rank} className="text-sm px-3 py-1" />
                <span className="text-sm text-gray-500 uppercase tracking-widest">Active Operative</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatBox title="Total Reputation" value={stats?.totalPoints?.toLocaleString()} icon={Award} loading={isLoading} highlight />
          <StatBox title="Ops Completed" value={stats?.questsCompleted?.toLocaleString()} icon={Target} loading={isLoading} />
          <StatBox title="Vault Entries" value={stats?.rafflesEntered?.toLocaleString()} icon={Ticket} loading={isLoading} />
          <StatBox title="Vault Wins" value={stats?.rafflesWon?.toLocaleString()} icon={Zap} loading={isLoading} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <Card className="bg-black/40 border-amber-500/10 backdrop-blur-md">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle className="text-sm text-gray-400 uppercase tracking-widest font-bold">Financial Standing</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
               <div>
                 <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Staked Reserves</div>
                 <div className="text-2xl font-mono text-white">
                   {isLoading ? "..." : stats?.stakingBalance?.toLocaleString()} <span className="text-sm text-gray-500">FUXEL</span>
                 </div>
               </div>
               <div>
                 <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Reputation Multiplier</div>
                 <div className="text-xl font-mono text-amber-500">
                   {isLoading ? "..." : `${stats?.stakingMultiplier?.toFixed(2)}x`}
                 </div>
               </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/40 border-amber-500/10 backdrop-blur-md">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle className="text-sm text-gray-400 uppercase tracking-widest font-bold">Clearance Requirements</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-amber-500/20 before:via-white/10 before:to-transparent">
                 <RankTier current={stats?.rank} name="Insider" req="Top Tier / Staking required" color="text-amber-500" />
                 <RankTier current={stats?.rank} name="Operator" req="Medium Activity" color="text-blue-500" />
                 <RankTier current={stats?.rank} name="Scout" req="Initial Clearance" color="text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Shell>
  );
}

function StatBox({ title, value, icon: Icon, loading, highlight = false }: any) {
  return (
    <Card className={`bg-black/40 backdrop-blur-md ${highlight ? 'border-amber-500/30' : 'border-white/5'}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Icon className={`h-5 w-5 ${highlight ? 'text-amber-500' : 'text-gray-500'}`} />
        </div>
        <div className="space-y-1">
          <h3 className="text-xs text-gray-500 uppercase tracking-wider">{title}</h3>
          <div className={`text-2xl font-mono font-bold ${highlight ? 'text-amber-500' : 'text-white'}`}>
            {loading ? "..." : value || 0}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RankTier({ current, name, req, color }: any) {
  const isCurrent = current === name;
  const isPassed = current === "Insider" && name !== "Insider" || current === "Operator" && name === "Scout";
  
  return (
    <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
      <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 ${isCurrent ? 'border-amber-500 bg-black' : isPassed ? 'border-green-500 bg-green-500/20' : 'border-white/10 bg-black'} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2`}>
        {isCurrent && <div className="h-2 w-2 rounded-full bg-amber-500" />}
      </div>
      <div className={`w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] border ${isCurrent ? 'border-amber-500/30 bg-amber-500/5' : 'border-white/5 bg-black/40'} p-3 rounded-md`}>
        <div className={`font-bold uppercase tracking-wider text-sm ${isCurrent ? color : 'text-gray-500'}`}>{name}</div>
        <div className="text-xs text-gray-500 mt-1">{req}</div>
      </div>
    </div>
  );
}