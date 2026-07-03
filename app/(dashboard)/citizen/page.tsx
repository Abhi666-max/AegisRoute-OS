'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Car, ShieldAlert, CloudRain, CheckCircle2, Navigation, Clock, Activity, Radar } from 'lucide-react';
import { RoadWatchReporter } from '@/components/ui/RoadWatchReporter';

export default function CitizenDashboardPage() {
  const [actionModal, setActionModal] = useState<{ isOpen: boolean; type: string; step: number }>({
    isOpen: false,
    type: '',
    step: 0,
  });

  const quickActions = [
    { title: 'Report Pothole', desc: 'Severe road surface degradation', icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { title: 'Report Accident', desc: 'Multi-vehicle collision or roadblock', icon: Car, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
    { title: 'Report Gridlock', desc: 'Severe traffic stagnation (>30m)', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { title: 'Report Flood Hazard', desc: 'Waterlogging or drainage blockage', icon: CloudRain, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  ];

  const triggerActionModal = (title: string) => {
    setActionModal({ isOpen: true, type: title, step: 0 });
  };

  useEffect(() => {
    if (!actionModal.isOpen) return;
    if (actionModal.step === 0) {
      const timer1 = setTimeout(() => setActionModal(prev => ({ ...prev, step: 1 })), 1500);
      return () => clearTimeout(timer1);
    } else if (actionModal.step === 1) {
      const timer2 = setTimeout(() => setActionModal(prev => ({ ...prev, step: 2 })), 1500);
      return () => clearTimeout(timer2);
    } else if (actionModal.step === 2) {
      const timer3 = setTimeout(() => setActionModal({ isOpen: false, type: '', step: 0 }), 1500);
      return () => clearTimeout(timer3);
    }
  }, [actionModal.isOpen, actionModal.step]);

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-10 min-h-[85vh] text-white relative">
      {/* Welcome Hero Banner */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-r from-zinc-950 via-[#050b14] to-zinc-950 border border-white/10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Sovereign Citizen Node Active
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            AegisRoute Civic Interface.
          </h1>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base leading-relaxed">
            Report civic hazards and road infrastructure emergencies directly to regional municipal authorities with automated edge-AI validation.
          </p>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-400" /> Quick Priority Signal Dispatch
          </h2>
          <span className="text-xs text-zinc-500 font-mono">BIMSTEC Mesh Connected</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <motion.div
              key={action.title}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => triggerActionModal(action.title)}
              className={`p-5 rounded-2xl border ${action.bg} backdrop-blur-xl cursor-pointer transition-all shadow-lg flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl bg-black/40 ${action.color}`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">{action.title}</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-snug">{action.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500 group-hover:text-zinc-300">
                <span>Instant Ingress</span>
                <Navigation className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Centered Action Simulation Modal */}
      <AnimatePresence>
        {actionModal.isOpen && (
          <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 backdrop-blur-xl bg-black/90"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-[#050b14] border border-white/10 p-8 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.15)] text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-pulse"></div>

              {actionModal.step === 0 && (
                <motion.div key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <Activity className="w-10 h-10 text-emerald-400 animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-white tracking-tight">Acquiring Encrypted GPS Coordinates...</h3>
                    <p className="text-xs font-mono text-zinc-400 mt-2">Triangulating local sector nodes for [{actionModal.type}]</p>
                  </div>
                </motion.div>
              )}

              {actionModal.step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center relative shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                    <span className="absolute inset-0 rounded-full border-2 border-blue-400/50 animate-ping"></span>
                    <Radar className="w-10 h-10 text-blue-400 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-white tracking-tight">Transmitting Payload to Regional Authority...</h3>
                    <p className="text-xs font-mono text-blue-400 mt-2">Broadcasting priority SOS telemetry package</p>
                  </div>
                </motion.div>
              )}

              {actionModal.step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-6 space-y-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.5)]">
                    <CheckCircle2 className="w-14 h-14 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight">SOS Dispatched Successfully</h3>
                    <p className="text-xs font-mono text-emerald-400 mt-2">Regional authorities notified. Immutable log generated.</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edge AI Telemetry Reporter Section */}
      <div className="pt-4">
        <div className="mb-4">
          <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-400">
            Automated Edge-AI Telemetry & Media Submission
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">Upload geospatial media for zero-latency client-side hazard verification.</p>
        </div>
        <RoadWatchReporter />
      </div>
    </motion.div>
  );
}
