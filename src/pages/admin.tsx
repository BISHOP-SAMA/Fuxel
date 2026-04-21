import { Shell } from "@/components/layout/Shell";
import { useWallet } from "@/hooks/use-wallet";
import { 
  useCreateQuest, useUpdateQuest, useDeleteQuest, 
  useCreateRaffle, useDrawRaffleWinner,
  useListQuests, useListRaffles,
  getListQuestsQueryKey, getListRafflesQueryKey 
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ShieldAlert, Trash2, Plus, Loader2, Trophy } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const questSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10),
  type: z.enum(["on-chain", "social"]),
  rewardPoints: z.coerce.number().min(1),
  isActive: z.boolean().default(true)
});

const raffleSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  prize: z.string().min(3),
  entryCost: z.coerce.number().min(1),
  maxEntries: z.coerce.number().min(1),
  endsAt: z.string() // datetime-local string
});

export default function Admin() {
  const { user } = useWallet();
  
  if (user?.rank !== "Insider") {
    return (
      <Shell>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <ShieldAlert className="h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-red-500 uppercase tracking-widest">Access Denied</h1>
          <p className="text-gray-400 mt-2">Maximum clearance (Insider rank) required to access command overrides.</p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-tight text-red-500">Command Override</h1>
          <p className="text-gray-400 mt-2">Manage operations and vault allocations.</p>
        </div>

        <Tabs defaultValue="quests" className="w-full">
          <TabsList className="bg-black/50 border border-white/10 mb-8 p-1 h-12">
            <TabsTrigger value="quests" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black uppercase tracking-widest text-xs px-8">Operations</TabsTrigger>
            <TabsTrigger value="raffles" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black uppercase tracking-widest text-xs px-8">Vaults</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quests">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <CreateQuestForm />
              </div>
              <div className="lg:col-span-2">
                <QuestList />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="raffles">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <CreateRaffleForm />
              </div>
              <div className="lg:col-span-2">
                <RaffleList />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Shell>
  );
}

function CreateQuestForm() {
  const { mutateAsync: createQuest, isPending } = useCreateQuest();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof questSchema>>({
    resolver: zodResolver(questSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "on-chain",
      rewardPoints: 100,
      isActive: true
    }
  });

  const onSubmit = async (data: z.infer<typeof questSchema>) => {
    try {
      await createQuest({ data });
      toast({ title: "Operation created" });
      form.reset();
      queryClient.invalidateQueries({ queryKey: getListQuestsQueryKey() });
    } catch (err: any) {
      toast({ title: "Failed to create", description: err.message, variant: "destructive" });
    }
  };

  return (
    <Card className="bg-black/40 border-amber-500/20 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-amber-500 uppercase tracking-widest text-sm">Deploy New Operation</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-400">Title</FormLabel>
                <FormControl><Input {...field} className="bg-black/50 border-white/10" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-400">Description</FormLabel>
                <FormControl><Textarea {...field} className="bg-black/50 border-white/10" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="type" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-black/50 border-white/10">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="on-chain">On-Chain</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="rewardPoints" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Reward (PTS)</FormLabel>
                  <FormControl><Input type="number" {...field} className="bg-black/50 border-white/10 font-mono" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <Button type="submit" disabled={isPending} className="w-full bg-amber-500 text-black hover:bg-amber-600 mt-4">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Plus className="mr-2 h-4 w-4" /> Deploy
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function QuestList() {
  const { data: quests, isLoading } = useListQuests();
  const { mutateAsync: deleteQuest } = useDeleteQuest();
  const { mutateAsync: updateQuest } = useUpdateQuest();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    setLoadingId(`del-${id}`);
    try {
      await deleteQuest({ id: id.toString() });
      toast({ title: "Operation terminated" });
      queryClient.invalidateQueries({ queryKey: getListQuestsQueryKey() });
    } catch (err: any) {
      toast({ title: "Failed", description: err.message, variant: "destructive" });
    } finally {
      setLoadingId(null);
    }
  };

  const handleToggleActive = async (quest: any) => {
    setLoadingId(`upd-${quest.id}`);
    try {
      // Must pass full body according to schema
      await updateQuest({ id: quest.id.toString(), data: { 
        title: quest.title,
        description: quest.description,
        type: quest.type as "on-chain" | "social",
        rewardPoints: quest.rewardPoints,
        isActive: !quest.isActive 
      } });
      toast({ title: `Operation ${!quest.isActive ? 'activated' : 'deactivated'}` });
      queryClient.invalidateQueries({ queryKey: getListQuestsQueryKey() });
    } catch (err: any) {
      toast({ title: "Failed", description: err.message, variant: "destructive" });
    } finally {
      setLoadingId(null);
    }
  };

  if (isLoading) return <div>Loading records...</div>;

  return (
    <div className="space-y-4">
      {quests?.map(quest => (
        <Card key={quest.id} className={`bg-black/40 border-white/5 ${!quest.isActive && 'opacity-50'}`}>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{quest.title}</span>
                <span className="text-[10px] uppercase font-mono text-amber-500 bg-amber-500/10 px-2 rounded">{quest.rewardPoints} PTS</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">Completed: {quest.completionCount}</div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white/10 bg-transparent text-gray-300"
                onClick={() => handleToggleActive(quest)}
                disabled={loadingId === `upd-${quest.id}`}
              >
                {loadingId === `upd-${quest.id}` ? <Loader2 className="h-4 w-4 animate-spin" /> : quest.isActive ? 'Deactivate' : 'Activate'}
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleDelete(quest.id)}
                disabled={loadingId === `del-${quest.id}`}
              >
                {loadingId === `del-${quest.id}` ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CreateRaffleForm() {
  const { mutateAsync: createRaffle, isPending } = useCreateRaffle();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof raffleSchema>>({
    resolver: zodResolver(raffleSchema),
    defaultValues: {
      title: "",
      description: "",
      prize: "",
      entryCost: 100,
      maxEntries: 100,
      endsAt: new Date(Date.now() + 86400000).toISOString().slice(0, 16) // Tomorrow default
    }
  });

  const onSubmit = async (data: z.infer<typeof raffleSchema>) => {
    try {
      await createRaffle({ data: { ...data, endsAt: new Date(data.endsAt).toISOString() } });
      toast({ title: "Vault deployed" });
      form.reset();
      queryClient.invalidateQueries({ queryKey: getListRafflesQueryKey() });
    } catch (err: any) {
      toast({ title: "Failed to create", description: err.message, variant: "destructive" });
    }
  };

  return (
    <Card className="bg-black/40 border-amber-500/20 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-amber-500 uppercase tracking-widest text-sm">Deploy New Vault</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-400">Title</FormLabel>
                <FormControl><Input {...field} className="bg-black/50 border-white/10" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="prize" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-400">Prize Details</FormLabel>
                <FormControl><Input {...field} className="bg-black/50 border-white/10" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-400">Description</FormLabel>
                <FormControl><Textarea {...field} className="bg-black/50 border-white/10" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="entryCost" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Cost (PTS)</FormLabel>
                  <FormControl><Input type="number" {...field} className="bg-black/50 border-white/10 font-mono" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="maxEntries" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Max Entries</FormLabel>
                  <FormControl><Input type="number" {...field} className="bg-black/50 border-white/10 font-mono" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="endsAt" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-400">Ends At (Local Time)</FormLabel>
                <FormControl><Input type="datetime-local" {...field} className="bg-black/50 border-white/10" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" disabled={isPending} className="w-full bg-amber-500 text-black hover:bg-amber-600 mt-4">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Plus className="mr-2 h-4 w-4" /> Deploy Vault
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function RaffleList() {
  const { data: raffles, isLoading } = useListRaffles();
  const { mutateAsync: drawWinner } = useDrawRaffleWinner();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleDraw = async (id: number) => {
    if (!confirm("Execute draw sequence? This cannot be undone.")) return;
    setLoadingId(id);
    try {
      await drawWinner({ id: id.toString() });
      toast({ title: "Winner drawn successfully" });
      queryClient.invalidateQueries({ queryKey: getListRafflesQueryKey() });
    } catch (err: any) {
      toast({ title: "Draw failed", description: err.message, variant: "destructive" });
    } finally {
      setLoadingId(null);
    }
  };

  if (isLoading) return <div>Loading vault data...</div>;

  return (
    <div className="space-y-4">
      {raffles?.map(raffle => (
        <Card key={raffle.id} className="bg-black/40 border-white/5">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{raffle.title}</span>
                <span className={`text-[10px] uppercase font-mono px-2 rounded ${
                  raffle.status === 'active' ? 'text-green-500 bg-green-500/10' :
                  raffle.status === 'drawing' ? 'text-yellow-500 bg-yellow-500/10' :
                  'text-gray-500 bg-gray-500/10'
                }`}>{raffle.status}</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">Prize: {raffle.prize} | Entries: {raffle.currentEntries}/{raffle.maxEntries}</div>
              {raffle.winnerAddress && (
                <div className="text-xs text-amber-500 mt-1 font-mono flex items-center gap-1">
                  <Trophy className="h-3 w-3" /> Winner: {raffle.winnerAddress}
                </div>
              )}
            </div>
            <div>
              {raffle.status === 'active' && new Date(raffle.endsAt) < new Date() && (
                 <Button 
                   onClick={() => handleDraw(raffle.id)}
                   disabled={loadingId === raffle.id}
                   className="bg-amber-500 text-black hover:bg-amber-600 uppercase text-xs tracking-wider"
                 >
                   {loadingId === raffle.id ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Execute Draw'}
                 </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
                }
