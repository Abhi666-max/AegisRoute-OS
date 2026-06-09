"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { toast } from 'sonner';

// Dynamic import with SSR disabled is critical for react-leaflet in Next.js App Router
const MapContent = dynamic(() => import('./MapContent'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-zinc-950 text-zinc-500">Initializing Geolocation Array...</div>
});

export function RoadSOSMap() {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isDispatching, setIsDispatching] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSOS = async () => {
    if (!location) return;
    setIsDispatching(true);

    try {
      await addDoc(collection(db, 'incidents'), {
        type: 'SOS_Emergency',
        severity: 'Critical',
        severityScore: 100, // Important for Phase 3 hook parsing
        location: `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`,
        status: 'Pending',
        timestamp: Date.now()
      });

      setShowSuccess(true);
      toast.success("SOS Dispatched Successfully.");
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error("SOS Trigger Failed:", error);
      toast.error("Dispatch Failed. Retrying...");
    } finally {
      setIsDispatching(false);
    }
  };

  return (
    <div className="relative w-full h-[700px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
      <MapContent onLocationFound={setLocation} />
      
      {/* HUD Overlay */}
      <div className="absolute top-6 left-6 z-[1000] pointer-events-none">
        <h2 className="text-3xl font-clash font-bold tracking-wider text-white drop-shadow-md">
          AegisRoute <span className="text-[#00FF66]">SOS</span>
        </h2>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse shadow-[0_0_8px_#00FF66]" />
          <span className="text-xs font-mono text-gray-300 tracking-widest uppercase drop-shadow-md">Global Satellite Uplink Active</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000]">
        <button
          disabled={!location || isDispatching}
          onClick={handleSOS}
          className={`px-6 py-3 bg-white text-black font-semibold rounded-md transition-all ${(!location || isDispatching) ? 'opacity-50 cursor-not-allowed' : 'shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105'}`}
        >
          {isDispatching ? 'DISPATCHING...' : 'TRIGGER EMERGENCY SOS'}
        </button>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 20, scale: 0.9, x: '-50%' }}
            className="absolute bottom-28 left-1/2 z-[1001] bg-[#050505]/90 backdrop-blur-md border border-[#00FF66]/50 rounded-xl p-4 flex items-center gap-4 shadow-[0_0_30px_rgba(0,255,102,0.2)]"
          >
            <CheckCircle2 className="w-8 h-8 text-[#00FF66]" />
            <div>
              <p className="font-clash font-bold text-white text-lg">Emergency Services Dispatched</p>
              <p className="font-mono text-xs text-[#00FF66] tracking-widest">Regional Authority Notified</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Global styles for glowing route line */}
      <style dangerouslySetInnerHTML={{__html: `
        .glowing-line {
          filter: drop-shadow(0 0 10px #0070F3);
        }
      `}} />
    </div>
  );
}
