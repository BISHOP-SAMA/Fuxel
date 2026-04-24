import { Shell } from "@/components/layout/Shell";
import { useWallet } from "@/hooks/use-wallet";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Staking() {
  const { address } = useWallet();
  const { toast } = useToast();
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [staked, setStaked] = useState(0);
  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);

  const multiplier = staked >= 100 ? 1.5 : staked >= 50 ? 1.25 : 1.0;
  const tier = staked >= 100 ? "Gold Tier" : staked >= 50 ? "Silver Tier" : "Base Tier";

  const handleStake = async () => {
    if (!address) return;
    const amount = Number(stakeAmount);
    if (isNaN(amount) || amount <= 0) { toast({ title: "Invalid amount", variant: "destructive" }); return; }
    setIsStaking(true);
    await new Promise(r => setTimeout(r, 1000));
    setStaked(prev => prev + amount);
    toast({ title: "Reserves Staked", description: `Successfully staked ${amount} FUXEL.` });
    setStakeAmount("");
    setIsStaking(false);
  };

  const handleUnstake = async () => {
    if (!address) return;
    const amount = Number(unstakeAmount);
    if (isNaN(amount) || amount <= 0 || amount > staked) { toast({ title: "Invalid amount", variant: "destructive" }); return; }
    setIsUnstaking(true);
    await new Promise(r => setTimeout(r, 1000));
    setStaked(prev => prev - amount);
    toast({ title: "Reserves Unstaked", description: `Successfully unstaked ${amount} FUXEL.` });
    setUnstakeAmount("");
    setIsUnstaking(false);
  };

  return (
    <Shell>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Reserves & Staking</h1>
          <p className="text-gray-400 mt-2">Lock your assets to increase your reputation multiplier and rank.</p>
        </div>

        {!address ? (
          <Card className="bg-black/40 border-amber-500/20 backdrop-blur-md text-center py-12">
            <CardContent>
              <div className="text-gray-500">Connect your terminal to access staking protocols.</div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-black/40 border-amber-500/30 backdrop-blur-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium text-amber-500 uppercase tracking-wider">Total Staked</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold font-mono text-white">{staked.toLocaleString()}</div>
                  <div className="text-sm text-gray-500 mt-1 font-mono">FUXEL</div>
                </CardContent>
              </Card>
              <Card className="bg-black/40 border-amber-500/10 backdrop-blur-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium text-gray-400 uppercase tracking-wider">Current Multiplier</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold font-mono text-white">{multiplier.toFixed(2)}x</div>
                  <div className="text-sm text-amber-500 mt-1 uppercase tracking-wider">{tier}</div>
                </CardContent>
              </Card>
              <Card className="bg-black/40 border-amber-500/10 backdrop-blur-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium text-gray-400 uppercase tracking-wider">Pending Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold font-mono text-white">0</div>
                  <div className="text-sm text-green-400 mt-1 uppercase tracking-wider">Claimable</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-black/40 border-amber-500/20 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <ArrowUpCircle className="text-amber-500 h-5 w-5" /> Initiate Stake
                  </CardTitle>
                  <CardDescription className="text-gray-400">Lock FUXEL to increase your multiplier.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Input type="number" placeholder="0.00" value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} className="font-mono bg-black/50 border-white/10 text-white pr-16 h-12" />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-500">FUXEL</div>
                  </div>
                  <Button onClick={handleStake} disabled={isStaking || !stakeAmount} className="w-full bg-amber-500 text-black hover:bg-amber-600 font-bold uppercase tracking-wider h-12">
                    {isStaking ? "Processing..." : "Confirm Stake"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-white/10 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <ArrowDownCircle className="text-gray-400 h-5 w-5" /> Withdraw Stake
                  </CardTitle>
                  <CardDescription className="text-gray-400">Withdraw unlocked FUXEL to your wallet.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Input type="number" placeholder="0.00" value={unstakeAmount} onChange={(e) => setUnstakeAmount(e.target.value)} max={staked} className="font-mono bg-black/50 border-white/10 text-white pr-20 h-12" />
                    <button onClick={() => setUnstakeAmount(String(staked))} className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] uppercase text-amber-500 font-bold px-2 py-1 bg-amber-500/10 rounded">MAX</button>
                  </div>
                  <Button onClick={handleUnstake} disabled={isUnstaking || !unstakeAmount || Number(unstakeAmount) > staked} variant="outline" className="w-full border-white/20 text-white hover:bg-white/5 font-bold uppercase tracking-wider h-12">
                    {isUnstaking ? "Processing..." : "Withdraw"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </Shell>
  );
}
