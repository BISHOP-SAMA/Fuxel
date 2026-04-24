import { Shell } from "@/components/layout/Shell";
import { useWallet } from "@/hooks/use-wallet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle, Ticket, Coins, Activity } from "lucide-react";

const mockSummary = {
  totalUsers: 3,
  totalQuestsCompleted: 0,
  activeRaffles: 2,
  totalStaked: 225,
  userRank: "Scout",
  userPoints: 0,
  recentActivity: [
    { id: 1, shortAddress: "0x1234...5678", description: "minted Tempo Fox #0042", createdAt: new Date().toISOString() },
    { id: 2, shortAddress: "0xabcd...ef12", description: 'completed quest "Join the Tempo Discord" and earned 100 points', createdAt: new Date().toISOString() },
    { id: 3, shortAddress: "0x1234...5678", description: "ranked up to Insider status", createdAt: new Date().toISOString() },
    { id: 4, shortAddress: "0x9876...5432", description: 'entered raffle "Exclusive Fox NFT Drop"', createdAt: new Date().toISOString() },
    { id: 5, shortAddress: "0xabcd...ef12", description: "staked 75 tokens (Gold tier, 1.5x multiplier)", createdAt: new Date().toISOString() },
  ],
};

export default function Dashboard() {
  const { address } = useWallet();

  return (
    <Shell>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Command Center</h1>
          <p className="text-gray-400 mt-2">Network overview and active operations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Active Operatives" value={mockSummary.totalUsers.toLocaleString()} icon={Users} />
          <StatCard title="Ops Completed" value={mockSummary.totalQuestsCompleted.toLocaleString()} icon={CheckCircle} />
          <StatCard title="Active Vaults" value={mockSummary.activeRaffles.toLocaleString()} icon={Ticket} />
          <StatCard title="Reserves Staked" value={mockSummary.totalStaked.toLocaleString()} icon={Coins} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-black/40 border-amber-500/20 backdrop-blur-md">
            <CardHeader className="border-b border-amber-500/10 pb-4">
              <CardTitle className="text-amber-500 uppercase tracking-widest text-sm font-bold flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Network Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {mockSummary.recentActivity.map((item) => (
                  <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    <div className="font-mono text-sm text-gray-400 w-24 shrink-0">{item.shortAddress}</div>
                    <div className="text-sm text-gray-200">{item.description}</div>
                    <div className="ml-auto text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-500/5 border-amber-500/20 backdrop-blur-md">
            <CardHeader className="border-b border-amber-500/10 pb-4">
              <CardTitle className="text-amber-500 uppercase tracking-widest text-sm font-bold">
                Your Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {address ? (
                <>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Clearance Level</div>
                    <div className="text-amber-500 font-bold uppercase tracking-wider">{mockSummary.userRank}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Reputation Score</div>
                    <div className="text-3xl font-bold font-mono text-white">{mockSummary.userPoints.toLocaleString()}</div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Connect terminal to view operative status
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Shell>
  );
}

function StatCard({ title, value, icon: Icon }: { title: string; value: string | number; icon: any }) {
  return (
    <Card className="bg-black/40 border-amber-500/20 hover:border-amber-500/40 transition-colors backdrop-blur-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xs font-medium text-gray-400 uppercase tracking-wider">{title}</CardTitle>
        <Icon className="h-4 w-4 text-amber-500/50" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-mono text-white">{value}</div>
      </CardContent>
    </Card>
  );
}
