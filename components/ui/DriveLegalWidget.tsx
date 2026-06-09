"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User } from "lucide-react";
import { createPortal } from "react-dom";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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

  const widgetContent = (
    <div className="fixed bottom-6 right-6 z-[99999999] pointer-events-none flex flex-col items-end">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-white border border-zinc-200 shadow-2xl flex items-center justify-center text-black hover:bg-zinc-200 transition-colors pointer-events-auto"
          >
            <Bot className="w-7 h-7" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <div className="relative z-[99999999] w-80 h-[28rem] bg-zinc-950 border border-zinc-800 shadow-2xl rounded-2xl p-4 flex flex-col pointer-events-auto mt-4 opacity-100 animate-in fade-in slide-in-from-bottom-4">
            {/* Header */}
            <div className="h-14 border-b border-zinc-800 flex items-center justify-between px-4 bg-zinc-950">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-zinc-900 flex items-center justify-center border border-zinc-800">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-sm tracking-tighter text-white">DriveLegal AI</h3>
                  <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">System Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto mt-4 space-y-4 custom-scrollbar bg-zinc-950">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                >
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${
                    msg.role === 'user' ? 'bg-zinc-800' : 'bg-transparent border border-zinc-800'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`p-3 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-zinc-800 text-white rounded-tr-none' 
                      : 'bg-transparent text-zinc-400 rounded-tl-none'
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
                  <div className="w-8 h-8 shrink-0 rounded-full bg-transparent border border-zinc-800 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="p-4 rounded-xl bg-transparent border border-zinc-800 rounded-tl-none flex items-center gap-1.5">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="mt-4 bg-zinc-950 border-t border-zinc-800 pt-4">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  placeholder="Ask DriveLegal AI..."
                  className="w-full bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none rounded-md pl-4 pr-12 py-2 placeholder-zinc-500 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 w-8 h-8 flex items-center justify-center rounded-md bg-white text-black hover:bg-zinc-200 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  if (!mounted) return null;
  return createPortal(widgetContent, document.body);
}
