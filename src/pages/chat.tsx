// chat.tsx
import { Shell } from "@/components/layout/Shell";
import { useWallet } from "@/hooks/use-wallet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const initialMessages = [
  { id: 1, address: "0x1234...5678", shortAddress: "0x1234...5678", rank: "Insider", content: "gm operatives", createdAt: new Date(Date.now() - 300000).toISOString() },
  { id: 2, address: "0xabcd...ef12", shortAddress: "0xabcd...ef12", rank: "Operator", content: "any alpha on the next raffle drop?", createdAt: new Date(Date.now() - 200000).toISOString() },
  { id: 3, address: "0x9876...5432", shortAddress: "0x9876...5432", rank: "Scout", content: "just completed the discord quest, 100 pts easy", createdAt: new Date(Date.now() - 100000).toISOString() },
];

export default function Chat() {
  const { address } = useWallet();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);
  const [content, setContent] = useState("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !content.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(),
      address,
      shortAddress: address.slice(0, 8) + "..." + address.slice(-4),
      rank: "Scout",
      content: content.trim(),
      createdAt: new Date().toISOString(),
    }]);
    setContent("");
  };

  return (
    <Shell>
      <div className="flex flex-col h-[calc(100vh-6rem)]">
        <div className="shrink-0 mb-4 border-b border-amber-500/10 pb-4">
          <h1 className="text-2xl font-bold text-white uppercase tracking-tight flex items-center gap-2">
            FoxChat <span className="text-xs bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded font-mono">GLOBAL</span>
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto pr-4 space-y-4 pb-4">
          {messages.map((msg) => {
            const isMe = msg.address === address;
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1">
                  {!isMe && <span className="text-xs font-mono text-gray-500">{msg.shortAddress}</span>}
                  <span className={`text-[9px] uppercase tracking-wider px-1.5 border ${msg.rank === 'Insider' ? 'border-amber-500/50 text-amber-500' : msg.rank === 'Operator' ? 'border-blue-500/50 text-blue-400' : 'border-gray-500/50 text-gray-400'}`}>{msg.rank}</span>
                  {isMe && <span className="text-xs font-mono text-amber-500">YOU</span>}
                  <span className="text-[10px] text-gray-600 font-mono">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className={`px-4 py-2 rounded-lg max-w-[80%] text-sm ${isMe ? 'bg-amber-500/10 text-amber-100 border border-amber-500/20 rounded-tr-none' : 'bg-black/60 text-gray-200 border border-white/5 rounded-tl-none'}`}>
                  {msg.content}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="shrink-0 pt-4 border-t border-amber-500/10">
          {address ? (
            <form onSubmit={handleSend} className="flex gap-2">
              <Input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Transmit message to global channel..." className="flex-1 bg-black/50 border-white/10 text-white font-mono placeholder:text-gray-600" />
              <Button type="submit" disabled={!content.trim()} className="bg-amber-500 text-black hover:bg-amber-600 w-12 p-0">
                <Send className="h-4 w-4" />
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
