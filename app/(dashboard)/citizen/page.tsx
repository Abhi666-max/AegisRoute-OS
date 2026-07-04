'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Car, ShieldAlert, CloudRain, Clock, Camera, MapPin, Radio, Sparkles } from 'lucide-react';
import { RoadWatchReporter } from '@/components/ui/RoadWatchReporter';
import { RoadSOSMap } from '@/components/ui/RoadSOSMap';

const MOCK_IMAGES: Record<string, string> = {
  'Severe Pothole Cluster': 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
  'Multi-Vehicle Collision': 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&w=800&q=80',
  'Gridlock Interruption': 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80',
  'Flood / Waterlogging': 'https://images.unsplash.com/photo-1518241353330-0f797f83560f?auto=format&fit=crop&w=800&q=80',
};

export default function CitizenDashboardPage() {
  const [activeTab, setActiveTab] = useState<'upload' | 'sos'>('upload');
  const [prefilledHazard, setPrefilledHazard] = useState<string | null>(null);
  const [prefilledImage, setPrefilledImage] = useState<string | null>(null);

  const quickActions = [
    { title: 'Severe Pothole Cluster', desc: 'Road surface fracture / hazard', icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
    { title: 'Multi-Vehicle Collision', desc: 'Severe highway obstruction', icon: Car, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' },
    { title: 'Gridlock Interruption', desc: 'Severe traffic stagnation (>30m)', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
    { title: 'Flood / Waterlogging', desc: 'Drainage blockage / flood risk', icon: CloudRain, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
  ];

  const handleQuickActionTrigger = (hazardTitle: string) => {
    setPrefilledHazard(hazardTitle);
    setPrefilledImage(MOCK_IMAGES[hazardTitle] || null);
    setActiveTab('upload');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 min-h-[85vh] text-white pb-16 bg-black">
      {/* Welcome Hero Banner */}
      <motion.div 
        whileHover={{ scale: 1.01 }} 
        transition={{ duration: 0.2 }}
        className="relative p-8 rounded-3xl bg-gradient-to-r from-zinc-950 via-black to-zinc-950 border border-zinc-800 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Sovereign Citizen Node Active
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-white uppercase">
            AegisRoute Civic Command.
          </h1>
          <p className="text-zinc-400 mt-2 text-xs sm:text-sm leading-relaxed font-mono">
            Report civic hazards, upload edge-verified media, and coordinate real-time emergency georouting across regional municipal sectors.
          </p>
        </div>
      </motion.div>

      {/* Top Row: Quick Action Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2 font-bold">
            <ShieldAlert className="w-4 h-4 text-emerald-400" /> Quick Priority Signal Dispatch (Select to Pre-fill Upload)
          </h2>
          <span className="text-xs text-zinc-500 font-mono">BIMSTEC Mesh Connected</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <motion.div
              key={action.title}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleQuickActionTrigger(action.title)}
              className={`p-6 rounded-3xl border ${action.bg} bg-zinc-950/90 backdrop-blur-xl cursor-pointer transition-all shadow-[0_0_30px_rgba(0,0,0,0.8)] flex flex-col justify-between group h-44`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-3 rounded-2xl bg-black/60 border border-zinc-800 ${action.color} shadow-inner`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/80 text-zinc-400 border border-zinc-800 group-hover:border-white/30 font-bold group-hover:text-white transition-colors">
                    Pre-fill
                  </span>
                </div>
                <h3 className="font-extrabold text-white tracking-tight group-hover:text-emerald-300 transition-colors text-base">{action.title}</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-snug font-mono">{action.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Step 1: Sleek Apple-style Floating Segmented Tabs with layoutId */}
      <div className="flex flex-col items-center justify-center pt-2">
        <div className="inline-flex p-1.5 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-[0_0_40px_rgba(0,0,0,0.9)] gap-2 w-full sm:w-auto relative">
          {(['upload', 'sos'] as const).map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab)}
              className={`relative z-10 flex-1 sm:flex-initial px-8 py-4 rounded-2xl font-black text-xs font-mono tracking-wider uppercase transition-colors flex items-center justify-center gap-3 ${
                activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className={`absolute inset-0 rounded-2xl ${
                    tab === 'upload'
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 border border-emerald-400/50 shadow-[0_0_30px_rgba(16,185,129,0.5)]'
                      : 'bg-gradient-to-r from-red-600 to-red-500 border border-red-400/50 shadow-[0_0_30px_rgba(220,38,38,0.5)]'
                  }`}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab === 'upload' ? <Camera className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                {tab === 'upload' ? '[ 📷 Smart Civic Camera ]' : '[ 🚨 Zero-Click SOS Map ]'}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Content Area with AnimatePresence */}
      <div className="min-h-[550px]">
        <AnimatePresence mode="wait">
          {activeTab === 'upload' ? (
            <motion.div
              key="tab-upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              {/* Step 1: Premium Bento Grid - Left 60% Camera UI, Right 40% 01,02,03 Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Left Side (60% width) */}
                <div className="lg:col-span-7 flex flex-col">
                  <RoadWatchReporter 
                    prefilledHazard={prefilledHazard}
                    prefilledImage={prefilledImage}
                    onClearPrefilled={() => { setPrefilledHazard(null); setPrefilledImage(null); }}
                  />
                </div>

                {/* Right Side (40% width): Vertically stacked glowing instruction cards */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    transition={{ duration: 0.2 }}
                    className="p-6 rounded-3xl bg-zinc-950/90 border border-zinc-800 shadow-[0_0_30px_rgba(0,0,0,0.8)] flex-1 flex flex-col justify-center gap-4 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none"></div>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono font-black text-sm shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      01
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white tracking-tight uppercase flex items-center gap-2">
                        Capture or Select Media
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1 font-mono leading-relaxed">
                        Capture infrastructure hazard imagery directly from your device or select pre-verified telemetry from quick actions.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    transition={{ duration: 0.2 }}
                    className="p-6 rounded-3xl bg-zinc-950/90 border border-zinc-800 shadow-[0_0_30px_rgba(0,0,0,0.8)] flex-1 flex flex-col justify-center gap-4 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none"></div>
                    <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono font-black text-sm shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                      02
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white tracking-tight uppercase flex items-center gap-2">
                        Edge AI Vision Layer
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1 font-mono leading-relaxed">
                        Local WebGL neural network scans severity score, structural fracture depth, and spatial coordinates locally.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    transition={{ duration: 0.2 }}
                    className="p-6 rounded-3xl bg-zinc-950/90 border border-zinc-800 shadow-[0_0_30px_rgba(0,0,0,0.8)] flex-1 flex flex-col justify-center gap-4 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[60px] pointer-events-none"></div>
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono font-black text-sm shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                      03
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white tracking-tight uppercase flex items-center gap-2">
                        Mesh Ledger Broadcast
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1 font-mono leading-relaxed">
                        Auto-syncs encrypted cryptographic telemetry to regional municipal authorities immediately upon verification.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tab-sos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              <RoadSOSMap heightClass="h-[480px]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
