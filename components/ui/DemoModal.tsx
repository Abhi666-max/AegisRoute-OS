"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Building2, User, Mail, ShieldCheck, Zap, Activity } from "lucide-react";
import { toast } from "sonner";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Demo request submitted. Our Enterprise Sales team will contact you shortly.");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/90 backdrop-blur-md overflow-hidden p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="max-h-[90vh] overflow-y-auto w-full max-w-2xl bg-[#050505] border border-zinc-800 rounded-2xl shadow-2xl relative flex flex-col md:flex-row"
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>

            {/* Left Side - Stats */}
            <div className="w-full md:w-5/12 bg-zinc-900 p-8 md:p-12 relative overflow-hidden flex flex-col justify-between border-r border-white/5">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] z-0 pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-500/10 to-transparent opacity-50 z-0 pointer-events-none" />
              
              <div className="relative z-10">
                <ShieldCheck className="w-10 h-10 text-emerald-400 mb-6" />
                <h2 className="text-3xl font-semibold tracking-tighter text-white mb-4">Transform your municipal road safety.</h2>
                <p className="text-zinc-400 text-sm">Integrate AegisRoute OS directly into your traffic control centers for zero-latency georouting.</p>
              </div>

              <div className="relative z-10 space-y-6 mt-12">
                <div>
                  <h4 className="text-3xl font-black text-white tracking-tighter">0ms</h4>
                  <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest mt-1">Edge Latency</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-white tracking-tighter">5M+</h4>
                  <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest mt-1">Vectors Processed</p>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-7/12 p-8 md:p-12 bg-[#050505]">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white tracking-tight">Request Enterprise Demo</h3>
                <p className="text-zinc-500 text-sm mt-1">Fill out the form below to receive API keys.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Government ID / Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input required type="text" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-white text-sm outline-none focus:border-emerald-500/50 transition-colors" placeholder="John Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Gov Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input required type="email" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-white text-sm outline-none focus:border-emerald-500/50 transition-colors" placeholder="name@gov.in" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Municipality / Department</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input required type="text" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-white text-sm outline-none focus:border-emerald-500/50 transition-colors" placeholder="Mumbai Traffic Police" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Fleet Size (Vehicles)</label>
                  <div className="relative">
                    <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input required type="number" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-white text-sm outline-none focus:border-emerald-500/50 transition-colors" placeholder="500" />
                  </div>
                </div>

                <button type="submit" className="w-full bg-white text-black font-bold rounded-lg py-3 hover:bg-zinc-200 transition-colors mt-4">
                  Request Access
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
