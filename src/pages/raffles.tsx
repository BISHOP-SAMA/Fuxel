import { Shell } from "@/components/layout/Shell";
import { useWallet } from "@/hooks/use-wallet";
import { useListRaffles, useEnterRaffle, getListRafflesQueryKey, getGetUserQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Ticket, Clock, Trophy } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function Raffles() {
  const { address } = useWallet();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [enteringId, setEnteringId] = useState<number | null>(null);

  const { data: raffles, isLoading } = useListRaffles({
    query: { queryKey: getListRafflesQueryKey() }
  });

  const { mutateAsync: enterRaffle } = useEnterRaffle();

  const handleEnter = async (id: number) => {
    if (!address) return;
    setEnteringId(id);
    try {
      await enterRaffle({ id: id.toString(), data: { address } });
      toast({ title: "Vault entry secured", description: "Good luck." });
      queryClient.invalidateQueries({ queryKey: getListRafflesQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetUserQueryKey(address) });
    } catch (err: any) {
      toast({ title: "Entry failed", description: err.message || "Could not enter vault.", variant: "destructive" });
    } finally {
      setEnteringId(null);
    }
  };

  const activeRaffles = raffles?.filter(r => r.status === 'active') || [];
  const pastRaffles = raffles?.filter(r => r.status !== 'active') || [];

  return (
    <Shell>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-tight">The Vault</h1>
          <p className="text-gray-400 mt-2">Spend reputation points to enter high-stakes raffles.</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map(i => (
              <Card key={i} className="bg-black/40 border-amber-500/10">
                <CardHeader className="pb-2"><div className="h-6 w-1/3 bg-white/5 animate-pulse rounded" /></CardHeader>
                <CardContent><div className="h-4 w-full bg-white/5 animate-pulse rounded mt-2" /></CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-amber-500 uppercase tracking-widest mt-8 border-b border-amber-500/20 pb-2">Active Vaults</h2>
            {activeRaffles.length === 0 ? (
              <div className="text-center py-8 text-gray-500 bg-black/20 border border-white/5 rounded-lg">No active vaults currently open.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeRaffles.map((raffle) => (
                  <Card key={raffle.id} className="bg-black/40 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.05)] backdrop-blur-md flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse uppercase tracking-wider">LIVE</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-white font-bold pr-16">{raffle.title}</CardTitle>
                      <CardDescription className="text-gray-400">{raffle.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                      <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-md flex items-center gap-3">
                        <Trophy className="h-5 w-5 text-amber-500" />
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider">Prize Pool</div>
                          <div className="font-bold text-white">{raffle.prize}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Entry Cost</div>
                          <div className="font-mono text-amber-500">{raffle.entryCost} PTS</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Capacity</div>
                          <div className="font-mono text-gray-300">{raffle.currentEntries} / {raffle.maxEntries}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Ends In
                          </div>
                          <div className="font-mono text-gray-300">{formatDistanceToNow(new Date(raffle.endsAt))}</div>
                        </div>
                      </div>
                      
                      <div className="w-full bg-black/50 rounded-full h-1.5 mt-2">
                        <div 
                          className="bg-amber-500 h-1.5 rounded-full" 
                          style={{ width: `${Math.min(100, (raffle.currentEntries / raffle.maxEntries) * 100)}%` }}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="pt-4 border-t border-white/5">
                      <Button 
                        onClick={() => handleEnter(raffle.id)} 
                        disabled={!address || raffle.currentEntries >= raffle.maxEntries || enteringId === raffle.id}
                        className="w-full bg-amber-500 text-black hover:bg-amber-600 font-bold uppercase tracking-wider"
                      >
                        {enteringId === raffle.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Ticket className="mr-2 h-4 w-4" />
                        {raffle.currentEntries >= raffle.maxEntries ? 'VAULT FULL' : 'SECURE ENTRY'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            <h2 className="text-xl font-bold text-gray-500 uppercase tracking-widest mt-12 border-b border-white/10 pb-2">Sealed Vaults</h2>
            {pastRaffles.length === 0 ? (
              <div className="text-gray-600 text-sm">No past vault records found.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 opacity-70">
                {pastRaffles.map((raffle) => (
                  <Card key={raffle.id} className="bg-black/40 border-white/10 backdrop-blur-md">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base text-gray-300">{raffle.title}</CardTitle>
                        <Badge variant="outline" className="text-[10px] uppercase text-gray-500 border-gray-700">{raffle.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-gray-500 mb-2">{raffle.prize}</div>
                      {raffle.winnerAddress ? (
                        <div className="mt-4 p-2 bg-white/5 rounded border border-white/5">
                          <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Winner</div>
                          <div className="font-mono text-sm text-amber-500/80">{raffle.winnerAddress}</div>
                        </div>
                      ) : (
                        <div className="mt-4 text-sm text-gray-500 italic">Winner pending draw...</div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Shell>
  );
}