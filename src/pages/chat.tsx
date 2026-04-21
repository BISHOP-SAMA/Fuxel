import { Shell } from "@/components/layout/Shell";
import { useWallet } from "@/hooks/use-wallet";
import { useGetChatMessages, useSendChatMessage, getGetChatMessagesQueryKey } from "@workspace/api-client-react";
import { RankBadge } from "@/components/ui/rank-badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export default function Chat() {
  const { address, user } = useWallet();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [content, setContent] = useState("");

  const { data: messages, isLoading } = useGetChatMessages(
    { limit: 100 },
    { query: { refetchInterval: 5000, queryKey: getGetChatMessagesQueryKey({ limit: 100 }) } }
  );

  const { mutateAsync: sendMessage, isPending } = useSendChatMessage();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !content.trim()) return;
    
    const currentContent = content;
    setContent(""); // optimistically clear
    
    try {
      await sendMessage({ data: { address, content: currentContent } });
      queryClient.invalidateQueries({ queryKey: getGetChatMessagesQueryKey({ limit: 100 }) });
    } catch (err: any) {
      setContent(currentContent); // revert
      toast({ title: "Transmission failed", description: err.message, variant: "destructive" });
    }
  };

  return (
    <Shell>
      <div className="flex flex-col h-[calc(100vh-6rem)]">
        <div className="shrink-0 mb-4 border-b border-amber-500/10 pb-4">
          <h1 className="text-2xl font-bold text-white uppercase tracking-tight flex items-center gap-2">
             FoxChat <span className="text-xs bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded font-mono">GLOBAL</span>
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-amber-500/50 space-y-4 pb-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-amber-500/50">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : messages?.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500 uppercase tracking-widest text-sm">
              No transmission history.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {[...(messages || [])].reverse().map((msg) => {
                const isMe = msg.address === address;
                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {!isMe && <span className="text-xs font-mono text-gray-500">{msg.shortAddress}</span>}
                      <RankBadge rank={msg.rank} className="text-[9px] py-0 px-1.5" />
                      {isMe && <span className="text-xs font-mono text-amber-500">YOU</span>}
                      <span className="text-[10px] text-gray-600 font-mono">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className={`px-4 py-2 rounded-lg max-w-[80%] text-sm ${
                      isMe 
                        ? 'bg-amber-500/10 text-amber-100 border border-amber-500/20 rounded-tr-none' 
                        : 'bg-black/60 text-gray-200 border border-white/5 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="shrink-0 pt-4 border-t border-amber-500/10 mt-auto">
          {address ? (
            <form onSubmit={handleSend} className="flex gap-2">
              <Input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Transmit message to global channel..."
                className="flex-1 bg-black/50 border-white/10 focus-visible:ring-amber-500 text-white font-mono placeholder:text-gray-600"
                disabled={isPending}
              />
              <Button type="submit" disabled={!content.trim() || isPending} className="bg-amber-500 text-black hover:bg-amber-600 w-12 shrink-0 p-0">
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          ) : (
            <div className="p-3 bg-black/40 border border-red-500/20 rounded text-center text-sm text-red-400 uppercase tracking-widest">
              Connection required to transmit
            </div>
          )}
        </div>
      </div>
    </Shell>
  );
}