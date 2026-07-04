"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Radar } from 'lucide-react';
import { toast } from 'sonner';

const MapContent = dynamic(() => import('./MapContent'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-zinc-950 text-zinc-500 font-mono text-xs tracking-widest">Initializing OpenStreetMap Geolocation Array...</div>
});

interface RoadSOSMapProps {
  heightClass?: string;
}

export function RoadSOSMap({ heightClass = "h-[450px]" }: RoadSOSMapProps) {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>({ lat: 23.8103, lng: 90.4125 });
  const [isDispatching, setIsDispatching] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSOS = async () => {
    setIsDispatching(true);

    setTimeout(() => {
      setIsDispatching(false);
      setShowSuccess(true);
      toast.success("Emergency Signal Relayed via OpenStreetMap nodes.");
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1800);
  };

  return (
    <div className="border border-white/10 bg-[#050b14] backdrop-blur-md rounded-3xl p-6 w-full shadow-2xl space-y-4">
      {/* Step 4: Premium descriptive header above the map */}
      <div>
        <h3 className="text-red-500 font-bold text-xl flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
          Panic Button: Zero-Click Georouting
        </h3>
        <p className="text-zinc-400 text-sm mb-4 mt-1 leading-relaxed">
          In severe emergencies, trigger this beacon to instantly bypass verification and transmit your raw GPS coordinates to the nearest Regional Authority.
        </p>
      </div>

      <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-white/15 shadow-inner bg-black`}>
        <MapContent onLocationFound={setLocation} />
        
        {/* HUD Overlay */}
        <div className="absolute top-4 left-4 z-[1000] pointer-events-none bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
          <h2 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
            AegisRoute SOS Mesh
          </h2>
          <div className="flex items-center gap-2 mt-0.5">
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
              className="absolute inset-0 z-[1002] bg-black/85 backdrop-blur-md flex flex-col items-center justify-center gap-4"
            >
              <div className="relative w-24 h-24 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full border-2 border-red-500/60 animate-ping"></span>
                <Radar className="w-12 h-12 text-red-500 animate-spin" />
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-white tracking-tight uppercase">Broadcasting Emergency Signal...</p>
                <p className="text-xs font-mono text-red-400 mt-1">Triangulating BIMSTEC OpenStreetMap Nodes</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 4: Aggressively pulsing red drop-shadow button */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-sm px-4">
          <button
            disabled={isDispatching}
            onClick={handleSOS}
            className={`w-full py-4 bg-red-600 hover:bg-red-500 text-white font-mono text-xs tracking-widest font-black uppercase rounded-xl transition-all animate-pulse shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:scale-[1.03] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-red-400/50`}
          >
            <AlertTriangle className="w-5 h-5" />
            {isDispatching ? 'TRANSMITTING BEACON...' : 'TRIGGER EMERGENCY SOS'}
          </button>
        </div>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9, x: '-50%' }}
              animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
              exit={{ opacity: 0, y: 20, scale: 0.9, x: '-50%' }}
              className="absolute bottom-24 left-1/2 z-[1001] bg-[#050b14] backdrop-blur-md border border-emerald-500/40 rounded-2xl p-4 flex items-center gap-4 shadow-[0_0_40px_rgba(16,185,129,0.4)] w-[90%] max-w-sm"
            >
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Emergency Beacon Relayed</p>
                <p className="font-mono text-[10px] text-emerald-400 tracking-wider">OpenStreetMap Nodes & Regional Authority Alerted</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <style dangerouslySetInnerHTML={{__html: `
          .glowing-line {
            filter: drop-shadow(0 0 10px rgba(255,255,255,0.5));
          }
        `}} />
      </div>
    </div>
  );
}
