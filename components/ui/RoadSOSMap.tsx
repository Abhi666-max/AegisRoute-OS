"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Radar, ShieldAlert, X } from 'lucide-react';
import { toast } from 'sonner';

const MapContent = dynamic(() => import('./MapContent'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-black text-zinc-500 font-mono text-xs tracking-widest uppercase">Initializing OpenStreetMap Geolocation Array...</div>
});

interface RoadSOSMapProps {
  heightClass?: string;
}

export function RoadSOSMap({ heightClass = "h-[480px]" }: RoadSOSMapProps) {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>({ lat: 23.8103, lng: 90.4125 });
  const [isDispatching, setIsDispatching] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Step 3: Safety net confirmation modal state
  const [showSafetyModal, setShowSafetyModal] = useState(false);

  const handleOpenSafetyModal = () => {
    setShowSafetyModal(true);
  };

  const handleConfirmBroadcast = async () => {
    setShowSafetyModal(false);
    setIsDispatching(true);

    setTimeout(() => {
      setIsDispatching(false);
      setShowSuccess(true);
      toast.success("Emergency Signal Relayed via OpenStreetMap nodes.");
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1800);
  };

  return (
    <div className="border border-zinc-800 bg-black backdrop-blur-xl rounded-3xl p-8 w-full shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-6 relative overflow-hidden">
      {/* Glowing background accent */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Panic Button Contextual Header */}
      <div className="relative z-10">
        <h3 className="text-red-500 font-black text-2xl flex items-center gap-2.5 tracking-tight uppercase">
          <AlertTriangle className="w-6 h-6 text-red-500 animate-pulse" />
          Panic Button: Zero-Click Georouting
        </h3>
        <p className="text-zinc-400 text-xs sm:text-sm mb-2 mt-1 leading-relaxed font-mono">
          In severe emergencies, trigger this beacon to instantly bypass verification and transmit your raw GPS coordinates to the nearest Regional Authority.
        </p>
      </div>

      <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-zinc-800 shadow-inner bg-black`}>
        <MapContent onLocationFound={setLocation} />
        
        {/* HUD Overlay */}
        <div className="absolute top-4 left-4 z-[1000] pointer-events-none bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-zinc-800">
          <h2 className="text-sm font-bold tracking-tight text-white flex items-center gap-2 uppercase font-mono">
            AegisRoute SOS Mesh
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-[9px] font-mono text-red-400 tracking-widest uppercase font-bold">Live Emergency Beacon Array</span>
          </div>
        </div>

        {/* Pulsing Radar Overlay during dispatch */}
        <AnimatePresence>
          {isDispatching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[1002] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center gap-5"
            >
              <div className="relative w-28 h-28 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full border-2 border-red-500/60 animate-ping"></span>
                <Radar className="w-14 h-14 text-red-500 animate-spin" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-xl font-black text-white tracking-tight uppercase">Broadcasting Emergency Signal...</p>
                <p className="text-xs font-mono text-red-400">Triangulating BIMSTEC OpenStreetMap Nodes</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Button opens Safety Confirmation Net instead of instant trigger */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-sm px-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={isDispatching}
            onClick={handleOpenSafetyModal}
            className={`w-full py-4 bg-red-600 hover:bg-red-500 text-white font-mono text-xs tracking-widest font-black uppercase rounded-xl transition-all animate-pulse shadow-[0_0_35px_rgba(220,38,38,0.7)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 border border-red-400/50`}
          >
            <AlertTriangle className="w-5 h-5" />
            {isDispatching ? 'TRANSMITTING BEACON...' : 'TRIGGER EMERGENCY SOS'}
          </motion.button>
        </div>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9, x: '-50%' }}
              animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
              exit={{ opacity: 0, y: 20, scale: 0.9, x: '-50%' }}
              className="absolute bottom-24 left-1/2 z-[1001] bg-black/95 backdrop-blur-xl border border-emerald-500/50 rounded-2xl p-5 flex items-center gap-4 shadow-[0_0_50px_rgba(16,185,129,0.5)] w-[90%] max-w-sm"
            >
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-white text-sm tracking-tight uppercase">Emergency Beacon Relayed</p>
                <p className="font-mono text-[10px] text-emerald-400 tracking-wider">OpenStreetMap Nodes & Regional Authority Alerted</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Step 3: Terrifying Red Cinematic Safety Modal */}
      <AnimatePresence>
        {showSafetyModal && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-black border-2 border-red-600 p-10 rounded-3xl shadow-[0_0_120px_rgba(220,38,38,0.6)] text-center overflow-hidden space-y-8"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-red-600 to-transparent animate-pulse" />

              <div className="relative w-28 h-28 mx-auto rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center shadow-[0_0_60px_rgba(220,38,38,0.7)]">
                <span className="absolute inset-0 rounded-full border-2 border-red-500/60 animate-ping"></span>
                <Radar className="w-14 h-14 text-red-500 animate-spin" />
              </div>

              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 font-mono text-xs tracking-widest uppercase font-black animate-pulse">
                  <ShieldAlert className="w-4 h-4" /> Safety Confirmation Net
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tighter uppercase leading-tight">
                  CRITICAL: INITIATE ZERO-CLICK GEOROUTING?
                </h3>
                <p className="text-xs font-mono text-zinc-400 leading-relaxed max-w-md mx-auto pt-1">
                  This action will instantly broadcast your raw geospatial coordinates and identity passport to all BIMSTEC Regional Authorities and Emergency Dispatch nodes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSafetyModal(false)}
                  className="flex-1 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white rounded-xl font-mono text-xs tracking-widest uppercase font-bold transition-all"
                >
                  Cancel / Abort
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleConfirmBroadcast}
                  className="flex-1 py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-mono text-xs tracking-widest uppercase font-black shadow-[0_0_40px_rgba(220,38,38,0.8)] transition-all border border-red-400"
                >
                  Confirm & Broadcast
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
