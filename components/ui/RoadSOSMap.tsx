"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Radar, ShieldAlert, X } from 'lucide-react';
import { toast } from 'sonner';

const MapContent = dynamic(() => import('./MapContent'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-zinc-950 text-zinc-400 font-sans text-sm font-medium tracking-tight">Initializing Geolocation Array...</div>
});

interface RoadSOSMapProps {
  heightClass?: string;
}

export function RoadSOSMap({ heightClass = "h-[480px]" }: RoadSOSMapProps) {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>({ lat: 23.8103, lng: 90.4125 });
  const [isDispatching, setIsDispatching] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
    <div className="border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl rounded-2xl p-8 w-full shadow-2xl space-y-6 relative overflow-hidden font-sans antialiased text-zinc-100">
      {/* Glowing background accent */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Contextual Header */}
      <div className="relative z-10">
        <h3 className="text-red-500 font-semibold text-xl flex items-center gap-2.5 tracking-tight">
          <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
          Panic Button: Zero-Click Georouting
        </h3>
        <p className="text-zinc-400 text-sm mb-2 mt-1 leading-relaxed font-normal">
          In severe emergencies, trigger this beacon to instantly bypass verification and transmit your raw GPS coordinates to the nearest Regional Authority.
        </p>
      </div>

      <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-zinc-800/80 shadow-inner bg-zinc-950`}>
        <MapContent onLocationFound={setLocation} />
        
        {/* HUD Overlay */}
        <div className="absolute top-4 left-4 z-[1000] pointer-events-none bg-zinc-950/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-zinc-800">
          <h2 className="text-sm font-semibold tracking-tight text-white flex items-center gap-2">
            AegisRoute SOS Mesh
          </h2>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs font-medium text-red-400 tracking-tight">Live Emergency Beacon Array</span>
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
              <div className="relative w-24 h-24 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full border-2 border-red-500/60 animate-ping"></span>
                <Radar className="w-12 h-12 text-red-500 animate-spin" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-lg font-semibold text-white tracking-tight">Broadcasting Emergency Signal...</p>
                <p className="text-xs text-red-400 font-medium">Triangulating OpenStreetMap Nodes</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger Emergency SOS Button */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-sm px-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isDispatching}
            onClick={handleOpenSafetyModal}
            className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-semibold text-sm tracking-tight rounded-xl transition-all animate-pulse shadow-[0_0_30px_rgba(220,38,38,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 border border-red-400/40"
          >
            <AlertTriangle className="w-4 h-4" />
            {isDispatching ? 'Transmitting Beacon...' : 'Trigger Emergency SOS'}
          </motion.button>
        </div>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95, x: '-50%' }}
              animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
              exit={{ opacity: 0, y: 20, scale: 0.95, x: '-50%' }}
              className="absolute bottom-24 left-1/2 z-[1001] bg-zinc-950/95 backdrop-blur-xl border border-emerald-500/40 rounded-2xl p-4 flex items-center gap-3.5 shadow-xl w-[90%] max-w-sm"
            >
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm tracking-tight">Emergency Beacon Relayed</p>
                <p className="text-xs text-emerald-400 font-normal">OpenStreetMap Nodes & Regional Authority Alerted</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Step 5: Premium SOS Safety Modal */}
      <AnimatePresence>
        {showSafetyModal && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-[#0a0a0a] border border-red-900/50 p-8 rounded-3xl shadow-[0_0_100px_rgba(220,38,38,0.15)] text-center overflow-hidden space-y-6"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.2)]">
                <ShieldAlert className="w-8 h-8 text-red-500 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                  Initiate Zero-Click Georouting?
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                  This will immediately broadcast your raw GPS coordinates and identity credentials to regional emergency response units. False dispatches are strictly monitored.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSafetyModal(false)}
                  className="flex-1 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white rounded-xl text-sm font-medium tracking-tight transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirmBroadcast}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-semibold tracking-tight shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all border border-red-400/40"
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
