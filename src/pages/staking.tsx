import { Shell } from "@/components/layout/Shell";
import { useWallet } from "@/hooks/use-wallet";
import { useGetStakingInfo, useStakeTokens, useUnstakeTokens, getGetStakingInfoQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Coins, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { z } from "zod";

export default function Staking() {
  const { address } = useWallet();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  
  const { data: staking, isLoading } = useGetStakingInfo(address || "", {
    query: { enabled: !!address, queryKey: getGetStakingInfoQueryKey(address || "") }
  });

  const { mutateAsync: stake, isPending: isStaking } = useStakeTokens();
  const { mutateAsync: unstake, isPending: isUnstaking } = useUnstakeTokens();

  const handleStake = async () => {
    if (!address) return;
    const amount = Number(stakeAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({ title: "Invalid amount", variant: "destructive" });
      return;
    }
    
    try {
      await stake({ data: { address, amount } });
      toast({ title: "Reserves Staked", description: `Successfully staked ${amount} FUXEL.` });
      setStakeAmount("");
      queryClient.invalidateQueries({ queryKey: getGetStakingInfoQueryKey(address) });
    } catch (err: any) {
      toast({ title: "Staking failed", description: err.message, variant: "destructive" });
    }
  };

  const handleUnstake = async () => {
    if (!address) return;
    const amount = Number(unstakeAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({ title: "Invalid amount", variant: "destructive" });
      return;
    }
    
    try {
      await unstake({ data: { address, amount } });
      toast({ title: "Reserves Unstaked", description: `Successfully unstaked ${amount} FUXEL.` });
      setUnstakeAmount("");
      queryClient.invalidateQueries({ queryKey: getGetStakingInfoQueryKey(address) });
    } catch (err: any) {
      toast({ title: "Unstaking failed", description: err.message, variant: "destructive" });
    }
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
              <div className="text-gray-500 mb-4">Connect your terminal to access staking protocols.</div>
            </CardContent>
          </Card>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {[1, 2, 3].map(i => (
              <Card key={i} className="bg-black/40 border-amber-500/10">
                <CardHeader className="pb-2"><div className="h-4 w-24 bg-white/5 animate-pulse rounded" /></CardHeader>
                <CardContent><div className="h-8 w-16 bg-white/5 animate-pulse rounded" /></CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-black/40 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.05)] backdrop-blur-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium text-amber-500 uppercase tracking-wider">Total Staked</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold font-mono text-white">{staking?.stakedBalance?.toLocaleString() || 0}</div>
                  <div className="text-sm text-gray-500 mt-1 font-mono">FUXEL</div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/40 border-amber-500/10 backdrop-blur-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium text-gray-400 uppercase tracking-wider">Current Multiplier</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold font-mono text-white">{staking?.multiplier?.toFixed(2) || "1.00"}x</div>
                  <div className="text-sm text-amber-500 mt-1 uppercase tracking-wider">{staking?.tier || "Base Tier"}</div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-amber-500/10 backdrop-blur-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium text-gray-400 uppercase tracking-wider">Pending Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold font-mono text-white">{staking?.pendingRewards?.toLocaleString() || 0}</div>
                  <div className="text-sm text-green-400 mt-1 uppercase tracking-wider">Claimable</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-black/40 border-amber-500/20 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <ArrowUpCircle className="text-amber-500 h-5 w-5" />
                    Initiate Stake
                  </CardTitle>
                  <CardDescription className="text-gray-400">Lock FUXEL to increase your multiplier.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">Amount</label>
                    <div className="relative">
                      <Input 
                        type="number"
                        placeholder="0.00"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        className="font-mono bg-black/50 border-white/10 text-white pl-4 pr-16 h-12"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-500">
                        FUXEL
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={handleStake} 
                    disabled={isStaking || !stakeAmount}
                    className="w-full bg-amber-500 text-black hover:bg-amber-600 font-bold uppercase tracking-wider h-12"
                  >
                    {isStaking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Confirm Stake
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-white/10 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <ArrowDownCircle className="text-gray-400 h-5 w-5" />
                    Withdraw Stake
                  </CardTitle>
                  <CardDescription className="text-gray-400">Withdraw unlocked FUXEL to your wallet.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">Amount</label>
                    <div className="relative">
                      <Input 
                        type="number"
                        placeholder="0.00"
                        value={unstakeAmount}
                        onChange={(e) => setUnstakeAmount(e.target.value)}
                        max={staking?.stakedBalance || 0}
                        className="font-mono bg-black/50 border-white/10 text-white pl-4 pr-16 h-12"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <button 
                          onClick={() => setUnstakeAmount(String(staking?.stakedBalance || 0))}
                          className="text-[10px] uppercase text-amber-500 hover:text-amber-400 font-bold px-2 py-1 bg-amber-500/10 rounded"
                        >
                          MAX
                        </button>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={handleUnstake} 
                    disabled={isUnstaking || !unstakeAmount || Number(unstakeAmount) > (staking?.stakedBalance || 0)}
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/5 font-bold uppercase tracking-wider h-12"
                  >
                    {isUnstaking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Withdraw
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