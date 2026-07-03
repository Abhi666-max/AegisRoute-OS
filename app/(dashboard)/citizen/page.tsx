'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Car, ShieldAlert, CloudRain, CheckCircle2, Navigation, Clock } from 'lucide-react';
import { RoadWatchReporter } from '@/components/ui/RoadWatchReporter';
import { toast } from 'sonner';

export default function CitizenDashboardPage() {
  const [activeQuickReport, setActiveQuickReport] = useState<string | null>(null);

  const quickActions = [
    { title: 'Report Pothole', desc: 'Severe road surface degradation', icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { title: 'Report Accident', desc: 'Multi-vehicle collision or roadblock', icon: Car, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
    { title: 'Report Gridlock', desc: 'Severe traffic stagnation (>30m)', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { title: 'Report Flood Hazard', desc: 'Waterlogging or drainage blockage', icon: CloudRain, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  ];

  const handleQuickTrigger = (title: string) => {
    setActiveQuickReport(title);
    toast.success(`${title} priority signal broadcasted to Regional Authority Ingress Queue.`, { icon: '📡' });
    setTimeout(() => setActiveQuickReport(null), 3000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-10 min-h-[85vh] text-white">
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
              onClick={() => handleQuickTrigger(action.title)}
              className={`p-5 rounded-2xl border ${action.bg} backdrop-blur-xl cursor-pointer transition-all shadow-lg flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl bg-black/40 ${action.color}`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  {activeQuickReport === action.title && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 animate-pulse">
                      <CheckCircle2 className="w-3 h-3" /> SENT
                    </span>
                  )}
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
