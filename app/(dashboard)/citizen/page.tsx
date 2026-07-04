'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Car, ShieldAlert, CloudRain, Clock, Camera, MapPin, Radio } from 'lucide-react';
import { RoadWatchReporter } from '@/components/ui/RoadWatchReporter';
import { RoadSOSMap } from '@/components/ui/RoadSOSMap';

export default function CitizenDashboardPage() {
  const [activeTab, setActiveTab] = useState<'upload' | 'sos'>('upload');
  const [prefilledHazard, setPrefilledHazard] = useState<string | null>(null);

  const quickActions = [
    { title: 'Severe Pothole Cluster', desc: 'Road surface fracture / hazard', icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-zinc-900/60 border-zinc-800' },
    { title: 'Multi-Vehicle Collision', desc: 'Severe highway obstruction', icon: Car, color: 'text-red-400', bg: 'bg-zinc-900/60 border-zinc-800' },
    { title: 'Gridlock Interruption', desc: 'Severe traffic stagnation (>30m)', icon: Clock, color: 'text-blue-400', bg: 'bg-zinc-900/60 border-zinc-800' },
    { title: 'Flood / Waterlogging', desc: 'Drainage blockage / flood risk', icon: CloudRain, color: 'text-emerald-400', bg: 'bg-zinc-900/60 border-zinc-800' },
  ];

  const handleQuickActionTrigger = (hazardTitle: string) => {
    setPrefilledHazard(hazardTitle);
    setActiveTab('upload');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-10 min-h-[85vh] text-zinc-100 pb-16 font-sans antialiased">
      {/* Welcome Hero Banner */}
      <motion.div 
        whileHover={{ scale: 1.005 }} 
        transition={{ duration: 0.2 }}
        className="relative p-8 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900/80 to-zinc-950 border border-zinc-800/80 overflow-hidden shadow-xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-emerald-400 text-xs font-medium tracking-tight mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Sovereign Citizen Node Active
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            AegisRoute Civic Command
          </h1>
          <p className="text-zinc-400 mt-2 text-sm leading-relaxed font-normal">
            Report civic hazards, capture real-time device imagery, and coordinate emergency georouting across regional municipal sectors.
          </p>
        </div>
      </motion.div>

      {/* Top Row: Quick Action Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold tracking-tight text-zinc-300 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-400" /> Quick Priority Classification (Select to Pre-fill Hazard)
          </h2>
          <span className="text-xs text-zinc-500 font-medium">BIMSTEC Mesh Connected</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <motion.div
              key={action.title}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleQuickActionTrigger(action.title)}
              className={`p-6 rounded-2xl border ${action.bg} backdrop-blur-xl cursor-pointer transition-all shadow-md flex flex-col justify-between group h-40`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 ${action.color}`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-zinc-950 text-zinc-400 border border-zinc-800 group-hover:border-zinc-700 group-hover:text-zinc-200 transition-colors">
                    Pre-fill
                  </span>
                </div>
                <h3 className="font-semibold text-white tracking-tight group-hover:text-emerald-400 transition-colors text-base">{action.title}</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-snug font-normal">{action.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Step 2: Aceternity Segmented Control Tabs */}
      <div className="flex flex-col items-center justify-center pt-2">
        <div className="flex space-x-2 bg-zinc-900/50 p-1.5 rounded-2xl w-fit mx-auto border border-zinc-800/50 backdrop-blur-md relative">
          {(['upload', 'sos'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-medium px-6 py-2 rounded-xl z-10 relative transition-colors flex items-center gap-2.5 ${
                activeTab === tab ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-zinc-800 rounded-xl shadow-lg border border-zinc-700/50 -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              {tab === 'upload' ? <Camera className="w-4 h-4 text-emerald-400" /> : <MapPin className="w-4 h-4 text-red-400" />}
              {tab === 'upload' ? 'Smart Civic Camera' : 'Zero-Click SOS Map'}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Area */}
      <div className="min-h-[550px]">
        <AnimatePresence mode="wait">
          {activeTab === 'upload' ? (
            <motion.div
              key="tab-upload"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              {/* Bento Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Left Side (60% width) */}
                <div className="lg:col-span-7 flex flex-col">
                  <RoadWatchReporter 
                    prefilledHazard={prefilledHazard}
                    onClearPrefilled={() => setPrefilledHazard(null)}
                  />
                </div>

                {/* Right Side (40% width): Vertically stacked instruction cards */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.01 }} 
                    transition={{ duration: 0.2 }}
                    className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 shadow-md flex-1 flex flex-col justify-center gap-3 relative overflow-hidden"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-semibold text-sm">
                      01
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white tracking-tight">
                        Capture or Select Media
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-normal">
                        Use your device camera directly or browse existing photos to document infrastructure hazards.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.01 }} 
                    transition={{ duration: 0.2 }}
                    className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 shadow-md flex-1 flex flex-col justify-center gap-3 relative overflow-hidden"
                  >
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-semibold text-sm">
                      02
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white tracking-tight">
                        Edge AI Vision Layer
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-normal">
                        Local neural network layer scans structural damage depth and calculates severity score locally.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.01 }} 
                    transition={{ duration: 0.2 }}
                    className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 shadow-md flex-1 flex flex-col justify-center gap-3 relative overflow-hidden"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-semibold text-sm">
                      03
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white tracking-tight">
                        Mesh Ledger Broadcast
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-normal">
                        Automatically transmits encrypted telemetry to regional municipal authorities upon verification.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tab-sos"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <RoadSOSMap heightClass="h-[480px]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
