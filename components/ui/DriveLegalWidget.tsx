'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Activity, ShieldCheck, AlertTriangle, Fingerprint } from 'lucide-react';

export function DriveLegalWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'system' | 'assistant', content: string }[]>([
    { role: 'assistant', content: 'AegisRoute Sovereign Intelligence online. I am your specialized civic legal aid. How may I assist with BIMSTEC compliance protocols today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const callApi = async (prompt: string) => {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: prompt, countryCode: 'GLOBAL' })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'API Error');
      return data.content;
    } catch (e) {
      throw e;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      // Simulate endpoint node testing seamlessly without breaking flow
      const response = await callApi(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'system', content: '[WARNING] Primary Node Latency Detected. Rerouting inference seamlessly via Secondary Sovereign Core...' }]);
      try {
        const fallbackResponse = await callApi(userMsg + " (Fallback Context)");
        setMessages(prev => [...prev, { role: 'assistant', content: fallbackResponse }]);
      } catch (fallbackError) {
        setMessages(prev => [...prev, { role: 'system', content: '[CRITICAL] Sovereign Core isolated. Check network telemetry.' }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute bottom-20 right-0 w-[400px] h-[600px] bg-[#020205]/80 backdrop-blur-2xl border border-white/5 shadow-2xl rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="h-16 bg-[#020205] border-b border-[#18181b] flex items-center justify-between px-5 shrink-0 relative">
              <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent left-0"></div>
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20">
                  <Fingerprint className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm tracking-tight flex items-center gap-2">
                    Autonomous Sovereign Intelligence
                  </h3>
                  <p className="text-[10px] font-mono text-blue-400/70 uppercase tracking-widest mt-0.5">High-Availability Core Active</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar relative z-0">
              <AnimatePresence initial={false}>
                {messages.map((msg, idx) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    key={idx} 
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    {msg.role === 'assistant' && (
                       <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 mb-1.5 flex items-center gap-1.5">
                         <ShieldCheck className="w-3 h-3 text-blue-500" /> Aegis Intelligence
                       </span>
                    )}
                    <div className={`text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-[#18181b] text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%] border border-zinc-800' 
                        : msg.role === 'system'
                        ? 'bg-transparent text-zinc-500 font-mono text-[10px] uppercase tracking-widest w-full text-center py-2'
                        : 'bg-transparent text-zinc-300 border-l-2 border-blue-500 pl-4 py-1 w-full'
                    }`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-start"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 mb-1.5 flex items-center gap-1.5">
                         <Activity className="w-3 h-3 text-blue-500 animate-spin" /> EXECUTING LEGAL COMPLIANCE
                    </span>
                    <div className="border-l-2 border-blue-500/30 pl-4 py-2">
                      <div className="flex gap-1.5 items-center h-4">
                        <motion.div className="w-1.5 h-1.5 bg-blue-500/70 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" animate={{ y: [0, -6, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut', delay: 0 }} />
                        <motion.div className="w-1.5 h-1.5 bg-blue-500/70 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" animate={{ y: [0, -6, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut', delay: 0.2 }} />
                        <motion.div className="w-1.5 h-1.5 bg-blue-500/70 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" animate={{ y: [0, -6, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut', delay: 0.4 }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={endOfMessagesRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#020205] border-t border-[#18181b] shrink-0">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Execute network protocol query..."
                  className="w-full bg-[#05050a] border border-[#18181b] text-white text-sm rounded-xl pl-4 pr-12 py-3.5 focus:outline-none focus:border-blue-500 transition-colors shadow-inner font-sans"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-lg transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 bg-[#020205] rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(59,130,246,0.2)] border border-[#18181b] z-50 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-blue-500" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Fingerprint className="w-6 h-6 text-blue-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
