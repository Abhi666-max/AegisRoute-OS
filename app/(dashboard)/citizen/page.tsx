'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Car, ShieldAlert, CloudRain, Clock, Network, MapPin } from 'lucide-react';
import { RoadWatchReporter } from '@/components/ui/RoadWatchReporter';
import { RoadSOSMap } from '@/components/ui/RoadSOSMap';

export default function CitizenDashboardPage() {
  const [prefilledHazard, setPrefilledHazard] = useState<string | null>(null);

  const quickActions = [
    { title: 'Severe Pothole Cluster', desc: 'Road surface fracture / hazard', icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { title: 'Multi-Vehicle Collision', desc: 'Severe highway obstruction', icon: Car, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
    { title: 'Gridlock Interruption', desc: 'Severe traffic stagnation (>30m)', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { title: 'Flood / Waterlogging', desc: 'Drainage blockage / flood risk', icon: CloudRain, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  ];

  const handleQuickActionTrigger = (hazardTitle: string) => {
    setPrefilledHazard(hazardTitle);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 min-h-[85vh] text-white pb-12">
      {/* Welcome Hero Banner */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-r from-zinc-950 via-[#050b14] to-zinc-950 border border-white/10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Sovereign Citizen Node Active
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            AegisRoute Civic Command.
          </h1>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base leading-relaxed">
            Report civic hazards, upload edge-verified media, and coordinate real-time emergency georouting across regional municipal sectors.
          </p>
        </div>
      </div>

      {/* Top Row: Quick Action Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-400" /> Quick Priority Signal Dispatch (Select to Pre-fill Upload)
          </h2>
          <span className="text-xs text-zinc-500 font-mono">BIMSTEC Mesh Connected</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <motion.div
              key={action.title}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleQuickActionTrigger(action.title)}
              className={`p-5 rounded-2xl border ${action.bg} backdrop-blur-xl cursor-pointer transition-all shadow-lg flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl bg-black/40 ${action.color}`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 text-zinc-400 border border-white/5 group-hover:border-white/20">
                    Pre-fill
                  </span>
                </div>
                <h3 className="font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">{action.title}</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-snug">{action.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Middle Row (Full Width): RoadWatch Telemetry Upload Module */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-xs font-medium tracking-widest uppercase mb-2">
              <Network className="w-3.5 h-3.5 text-emerald-400" />
              Zero Compute Engine
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">RoadWatch Telemetry & Edge Vision</h2>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Analyzes infrastructure hazards instantly on your device. Zero server dependency.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-zinc-400 bg-[#050b14] px-4 py-2 rounded-xl border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Hardware Acceleration Active
          </div>
        </div>

        <RoadWatchReporter 
          prefilledHazard={prefilledHazard}
          onClearPrefilled={() => setPrefilledHazard(null)}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#050b14] border border-white/10 flex items-center gap-3.5 text-xs font-medium text-zinc-300">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono shrink-0 font-bold">01</div>
            <div>
              <p className="font-bold text-white">Capture or Select</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Capture infrastructure hazard imagery from your device.</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#050b14] border border-white/10 flex items-center gap-3.5 text-xs font-medium text-zinc-300">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono shrink-0 font-bold">02</div>
            <div>
              <p className="font-bold text-white">Edge AI Verification</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Scans severity score & structural damage locally.</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#050b14] border border-white/10 flex items-center gap-3.5 text-xs font-medium text-zinc-300">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono shrink-0 font-bold">03</div>
            <div>
              <p className="font-bold text-white">Mesh Broadcast</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Auto-syncs encrypted telemetry upon verification.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row (Full Width): Leaflet Emergency Georouting Map */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" /> RoadSOS Emergency Georouting
            </h2>
            <p className="text-xs text-zinc-400 mt-1">Real-time OpenStreetMap dispatch node & live mesh locator.</p>
          </div>
          <span className="w-fit text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Live OpenStreetMap Array
          </span>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#050b14] shadow-2xl p-2">
          <div className="rounded-2xl overflow-hidden">
            <RoadSOSMap heightClass="h-[430px]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
