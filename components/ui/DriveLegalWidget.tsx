"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

export function DriveLegalWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    role: 'ai',
    content: 'Greetings. I am the AegisRoute OS DriveLegal AI. How may I assist you with traffic compliance today?'
  }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/drivelegal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
          country: 'BIMSTEC nations'
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: data.response }]);
      } else {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: "AI routing congested. Retrying connection to BIMSTEC legal nodes..." }]);
      }
    } catch (error) {
      console.error("Widget API Error:", error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: "AI routing congested. Retrying connection to BIMSTEC legal nodes..." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-[#050505] border border-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.3)] flex items-center justify-center text-[#00FF66] hover:bg-[#00FF66]/10 transition-colors"
          >
            <Bot className="w-7 h-7" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-0 right-0 w-[350px] h-[500px] bg-[#050505]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-black/40">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#00FF66]/20 flex items-center justify-center border border-[#00FF66]/50">
                  <Bot className="w-4 h-4 text-[#00FF66]" />
                </div>
                <div>
                  <h3 className="font-clash font-bold text-sm tracking-wide text-white">DriveLegal AI</h3>
                  <p className="text-[10px] text-[#00FF66] font-mono tracking-widest uppercase">System Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gradient-to-b from-transparent to-black/20">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                >
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${
                    msg.role === 'user' ? 'bg-[#00FF66]/10 border border-[#00FF66]' : 'bg-[#0070F3]/10 border border-[#0070F3]'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-[#00FF66]" /> : <Bot className="w-4 h-4 text-[#0070F3]" />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-black/60 border border-[#00FF66]/30 text-white rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 max-w-[85%] mr-auto"
                >
                  <div className="w-8 h-8 shrink-0 rounded-full bg-[#0070F3]/10 border border-[#0070F3] flex items-center justify-center">
                    <Bot className="w-4 h-4 text-[#0070F3]" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 rounded-tl-none flex items-center gap-1.5">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1.5 h-1.5 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66]" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66]" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66]" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black/60 border-t border-white/10">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  placeholder="Ask DriveLegal AI..."
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF66]/50 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 w-8 h-8 flex items-center justify-center rounded-full bg-[#00FF66]/10 text-[#00FF66] hover:bg-[#00FF66]/20 disabled:opacity-50 disabled:hover:bg-[#00FF66]/10 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
