import { Shell } from "@/components/layout/Shell";
import { useWallet } from "@/hooks/use-wallet";
import { useListQuests, useCompleteQuest, getListQuestsQueryKey, getGetDashboardSummaryQueryKey, getGetUserQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Zap, CheckCircle2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Quests() {
  const { address } = useWallet();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [completingId, setCompletingId] = useState<number | null>(null);

  const { data: quests, isLoading } = useListQuests(
    { address: address || undefined },
    { query: { queryKey: getListQuestsQueryKey({ address: address || undefined }) } }
  );

  const { mutateAsync: completeQuest } = useCompleteQuest();

  const handleComplete = async (id: number) => {
    if (!address) return;
    setCompletingId(id);
    try {
      await completeQuest({ id: id.toString(), data: { address } });
      toast({ title: "Operation completed", description: "Reward points added to your dossier." });
      queryClient.invalidateQueries({ queryKey: getListQuestsQueryKey({ address }) });
      queryClient.invalidateQueries({ queryKey: getGetUserQueryKey(address) });
      queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey({ address }) });
    } catch (err: any) {
      toast({ title: "Operation failed", description: err.message || "Could not complete operation.", variant: "destructive" });
    } finally {
      setCompletingId(null);
    }
  };

  return (
    <Shell>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Active Operations</h1>
          <p className="text-gray-400 mt-2">Complete tasks to earn reputation and rank up.</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <Card key={i} className="bg-black/40 border-amber-500/10">
                <CardHeader className="pb-2"><div className="h-6 w-1/3 bg-white/5 animate-pulse rounded" /></CardHeader>
                <CardContent><div className="h-4 w-full bg-white/5 animate-pulse rounded mt-2" /></CardContent>
              </Card>
            ))}
          </div>
        ) : quests?.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No active operations at this time.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quests?.map((quest) => (
              <Card key={quest.id} className={`bg-black/40 border-amber-500/20 backdrop-blur-md flex flex-col ${!quest.isActive ? 'opacity-50' : ''}`}>
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
                      disabled={!quest.isActive || !address || completingId === quest.id}
                      className="w-full bg-amber-500 text-black hover:bg-amber-600 font-bold uppercase tracking-wider"
                    >
                      {completingId === quest.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Execute Operation
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Shell>
  );
}