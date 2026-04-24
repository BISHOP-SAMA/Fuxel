import { Shell } from "@/components/layout/Shell";
import { useWallet } from "@/hooks/use-wallet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle, Award, Target, Ticket, Zap } from "lucide-react";

export default function Profile() {
  const { address } = useWallet();

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

  const shortAddress = address.slice(0, 6) + "..." + address.slice(-4);

  return (
    <Shell>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="flex items-start border-b border-amber-500/20 pb-8">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded bg-black border border-amber-500/30 flex items-center justify-center">
              <UserCircle className="h-12 w-12 text-amber-500/50" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-mono tracking-tight">{shortAddress}</h1>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs border border-gray-500/50 text-gray-400 px-2 py-1 uppercase tracking-wider">Scout</span>
                <span className="text-sm text-gray-500 uppercase tracking-widest">Active Operative</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBox title="Total Reputation" value="0" icon={Award} highlight />
          <StatBox title="Ops Completed" value="0" icon={Target} />
          <StatBox title="Vault Entries" value="0" icon={Ticket} />
          <StatBox title="Vault Wins" value="0" icon={Zap} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-black/40 border-amber-500/10 backdrop-blur-md">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle className="text-sm text-gray-400 uppercase tracking-widest font-bold">Financial Standing</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Staked Reserves</div>
                <div className="text-2xl font-mono text-white">0 <span className="text-sm text-gray-500">FUXEL</span></div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Reputation Multiplier</div>
                <div className="text-xl font-mono text-amber-500">1.00x</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-amber-500/10 backdrop-blur-md">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle className="text-sm text-gray-400 uppercase tracking-widest font-bold">Clearance Requirements</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[
                { name: "Insider", req: "Top Tier / Staking required", color: "text-amber-500", active: false },
                { name: "Operator", req: "Medium Activity", color: "text-blue-500", active: false },
                { name: "Scout", req: "Initial Clearance", color: "text-gray-400", active: true },
              ].map((tier) => (
                <div key={tier.name} className={`p-3 rounded border ${tier.active ? 'border-amber-500/30 bg-amber-500/5' : 'border-white/5 bg-black/40'}`}>
                  <div className={`font-bold uppercase tracking-wider text-sm ${tier.active ? tier.color : 'text-gray-500'}`}>{tier.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{tier.req}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Shell>
  );
}

function StatBox({ title, value, icon: Icon, highlight = false }: any) {
  return (
    <Card className={`bg-black/40 backdrop-blur-md ${highlight ? 'border-amber-500/30' : 'border-white/5'}`}>
      <CardContent className="p-6">
        <Icon className={`h-5 w-5 mb-4 ${highlight ? 'text-amber-500' : 'text-gray-500'}`} />
        <div className="text-xs text-gray-500 uppercase tracking-wider">{title}</div>
        <div className={`text-2xl font-mono font-bold mt-1 ${highlight ? 'text-amber-500' : 'text-white'}`}>{value}</div>
      </CardContent>
    </Card>
  );
}
