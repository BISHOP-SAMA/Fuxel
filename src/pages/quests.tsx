import { Shell } from "@/components/layout/Shell";
import { useWallet } from "@/hooks/use-wallet";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const mockQuests = [
  { id: 1, title: "Join the Tempo Discord", description: "Join the official Tempo Discord server and get the community role", type: "social", rewardPoints: 100, completionCount: 0, isActive: true, completedByUser: false },
  { id: 2, title: "First On-Chain Transaction", description: "Complete your first on-chain transaction on the Tempo network", type: "on-chain", rewardPoints: 250, completionCount: 0, isActive: true, completedByUser: false },
  { id: 3, title: "Hold a Tempo Fox NFT", description: "Hold at least one Tempo Fox NFT in your connected wallet", type: "on-chain", rewardPoints: 500, completionCount: 0, isActive: true, completedByUser: false },
  { id: 4, title: "Follow Tempo on Twitter", description: "Follow @TempoNFT on Twitter and retweet the pinned post", type: "social", rewardPoints: 75, completionCount: 0, isActive: true, completedByUser: false },
  { id: 5, title: "Stake 10 Tokens", description: "Stake a minimum of 10 tokens to unlock your staking multiplier", type: "on-chain", rewardPoints: 200, completionCount: 0, isActive: true, completedByUser: false },
  { id: 6, title: "Refer a Friend", description: "Refer a friend who successfully connects their wallet to FUXEL", type: "social", rewardPoints: 300, completionCount: 0, isActive: true, completedByUser: false },
];

export default function Quests() {
  const { address } = useWallet();
  const { toast } = useToast();
  const [quests, setQuests] = useState(mockQuests);
  const [completingId, setCompletingId] = useState<number | null>(null);

  const handleComplete = async (id: number) => {
    if (!address) {
      toast({ title: "Connect wallet first", variant: "destructive" });
      return;
    }
    setCompletingId(id);
    await new Promise(r => setTimeout(r, 1000));
    setQuests(prev => prev.map(q => q.id === id ? { ...q, completedByUser: true, completionCount: q.completionCount + 1 } : q));
    toast({ title: "Operation completed", description: "Reward points added to your dossier." });
    setCompletingId(null);
  };

  return (
    <Shell>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Active Operations</h1>
          <p className="text-gray-400 mt-2">Complete tasks to earn reputation and rank up.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quests.map((quest) => (
            <Card key={quest.id} className="bg-black/40 border-amber-500/20 backdrop-blur-md flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg text-white font-bold">{quest.title}</CardTitle>
                    <CardDescription className="text-gray-400">{quest.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className={`ml-2 shrink-0 ${quest.type === 'on-chain' ? 'border-amber-500/50 text-amber-500' : 'border-blue-500/50 text-blue-500'}`}>
                    {quest.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                  <Zap className="h-4 w-4 text-amber-500" />
                  Reward: <span className="font-mono text-amber-500 font-bold">{quest.rewardPoints} PTS</span>
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  Completed by {quest.completionCount} operatives
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t border-white/5">
                {quest.completedByUser ? (
                  <Button disabled className="w-full bg-green-500/10 text-green-500 border border-green-500/20">
                    <CheckCircle2 className="mr-2 h-4 w-4" /> COMPLETED
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleComplete(quest.id)}
                    disabled={!address || completingId === quest.id}
                    className="w-full bg-amber-500 text-black hover:bg-amber-600 font-bold uppercase tracking-wider"
                  >
                    {completingId === quest.id ? "Processing..." : "Execute Operation"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Shell>
  );
}
