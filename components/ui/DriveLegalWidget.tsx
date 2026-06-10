'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Activity, ShieldCheck, AlertTriangle } from 'lucide-react';

export function DriveLegalWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "AegisRoute Legal Intelligence active. How can I assist with civic legalities today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [systemToast, setSystemToast] = useState<{message: string, type: 'error' | 'warning' | 'success'} | null>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const showSystemToast = (message: string, type: 'error' | 'warning' | 'success' = 'warning') => {
    setSystemToast({ message, type });
    setTimeout(() => setSystemToast(null), 3000);
  };

  const callApi = async (prompt: string) => {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.8) {
           reject(new Error("Congestion"));
        } else {
           resolve("According to South Asian Transit Protocol 2.1, specialized transport requires hardware 2FA validation at all border checkpoints.");
        }
      }, 1500);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await callApi(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.warn("Primary node failed, attempting fallback...");
      showSystemToast("Primary node congested. Rerouting inference...", "warning");
      
      try {
        const fallbackResponse = await callApi(userMsg);
        setMessages(prev => [...prev, { role: 'assistant', content: fallbackResponse }]);
      } catch (geminiError) {
        showSystemToast("Critical: All AI inference nodes are currently congested.", "error");
        setMessages(prev => [...prev, { role: 'assistant', content: "Error: Could not connect to the intelligence grid. Please try again." }]);
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
            className="absolute bottom-20 right-0 w-[380px] h-[550px] bg-[#050505]/95 backdrop-blur-3xl border border-zinc-800 shadow-[0_0_50px_rgba(16,185,129,0.1)] rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="h-16 bg-[#000] border-b border-zinc-800 flex items-center justify-between px-5 shrink-0 relative">
              <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent left-0"></div>
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm tracking-tight flex items-center gap-2">
                    AegisRoute Legal Intelligence
                  </h3>
                  <p className="text-[10px] font-mono text-emerald-500/70 uppercase tracking-widest mt-0.5">HA-Inference Grid Active</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* System Toasts */}
            <AnimatePresence>
              {systemToast && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`absolute top-16 left-0 w-full px-4 py-2 text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2 z-10 ${
                    systemToast.type === 'error' ? 'bg-red-500/90 text-white' : 
                    systemToast.type === 'warning' ? 'bg-amber-500/90 text-black font-bold' : 
                    'bg-emerald-500/90 text-black font-bold'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                  {systemToast.message}
                </motion.div>
              )}
            </AnimatePresence>

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
                       <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-500/70 mb-1.5 flex items-center gap-1.5">
                         <ShieldCheck className="w-3 h-3 text-emerald-500" /> Aegis Intelligence
                       </span>
                    )}
                    <div className={`text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-zinc-800 text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%]' 
                        : 'bg-transparent text-zinc-300 border-l-2 border-emerald-500 pl-4 py-1 w-full'
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
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-500/70 mb-1.5 flex items-center gap-1.5">
                         <Activity className="w-3 h-3 text-emerald-500 animate-spin" /> Synthesizing Legal Precedent
                    </span>
                    <div className="border-l-2 border-emerald-500/30 pl-4 py-2">
                      <div className="flex gap-1.5 items-center h-4">
                        <motion.div className="w-1.5 h-1.5 bg-emerald-500/70 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut', delay: 0 }} />
                        <motion.div className="w-1.5 h-1.5 bg-emerald-500/70 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut', delay: 0.15 }} />
                        <motion.div className="w-1.5 h-1.5 bg-emerald-500/70 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut', delay: 0.3 }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={endOfMessagesRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#020202] border-t border-zinc-800 shrink-0">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Query civic frameworks..."
                  className="w-full bg-[#050505] border border-zinc-800 text-white text-sm rounded-xl pl-4 pr-12 py-3.5 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner font-sans"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-black rounded-lg transition-colors"
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
        className="relative w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-emerald-400 z-50 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
