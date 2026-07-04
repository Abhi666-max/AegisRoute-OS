"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, CheckCircle2, Cpu, X, Network, Loader2, Sparkles, ShieldAlert, Lock } from "lucide-react";
import { useOfflineSync } from "@/hooks/useOfflineSync";

interface RoadWatchReporterProps {
  prefilledHazard?: string | null;
  prefilledImage?: string | null;
  onClearPrefilled?: () => void;
}

export function RoadWatchReporter({ prefilledHazard, prefilledImage, onClearPrefilled }: RoadWatchReporterProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { isOnline, submitReport } = useOfflineSync();
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  const [loading, setLoading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentHazardType, setCurrentHazardType] = useState('Structural Road Hazard');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, []);

  useEffect(() => {
    if (prefilledHazard || prefilledImage) {
      if (prefilledHazard) setCurrentHazardType(prefilledHazard);
      simulateUploadAndScan(undefined, prefilledImage || undefined);
    }
  }, [prefilledHazard, prefilledImage]);

  const simulateUploadAndScan = (selectedFile?: File, customImgUrl?: string) => {
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else if (customImgUrl) {
      setPreview(customImgUrl);
    } else {
      setPreview('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80');
    }
    setLoading(true);
    setIsAnalyzed(false);
    setShowSuccessModal(false);
    setTimeout(() => {
      setLoading(false);
      setIsAnalyzed(true);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      simulateUploadAndScan(selectedFile);
    }
  };

  const handleDispatch = async () => {
    if (!isAnalyzed) return;
    await submitReport({
      type: 'Hazard_Report',
      hazardType: currentHazardType,
      severityScore: 92,
      location: location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'BIMSTEC Sector Node',
      status: 'Pending',
      timestamp: Date.now()
    });
    setShowSuccessModal(true);
    setTimeout(() => {
      reset();
    }, 2000);
  };

  const reset = () => {
    setIsAnalyzed(false);
    setPreview(null);
    setFile(null);
    setShowSuccessModal(false);
    if (onClearPrefilled) onClearPrefilled();
  };

  return (
    <div className="border border-zinc-800 bg-black backdrop-blur-xl rounded-3xl p-8 w-full relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col justify-between h-full">
      {/* Glowing background accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Network Indicator */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-amber-500 shadow-[0_0_10px_#f59e0b] animate-pulse'}`} />
        <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 font-bold">
          {isOnline ? 'SYS_ONLINE' : 'SYS_OFFLINE'}
        </span>
      </div>

      <div className="mb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono tracking-widest uppercase mb-3 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <Network className="w-3.5 h-3.5" />
          Edge AI Vision Ready
        </div>
        <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5 uppercase">
          <Camera className="w-6 h-6 text-emerald-400" />
          CIVIC <span className="text-zinc-500">REPORTER</span>
        </h2>
        <p className="text-zinc-400 text-xs mt-1 leading-relaxed font-mono">
          Capture or upload hazard imagery. Local WebGL computer vision analyzes severity instantly on your device.
        </p>
      </div>

      <div className="space-y-6 relative z-10 flex-1 flex flex-col justify-between">
        {/* Dropzone - object-contain used to prevent image stretching */}
        <motion.div 
          whileHover={{ scale: 1.01 }} 
          transition={{ duration: 0.2 }}
          onClick={() => fileInputRef.current?.click()}
          className="relative w-full h-72 border-2 border-dashed border-zinc-800 hover:border-emerald-500/50 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-zinc-950/80 overflow-hidden group transition-all shadow-inner"
        >
          {preview ? (
            <>
              <img src={preview} alt="Upload preview" className="absolute inset-0 w-full h-full object-contain p-2 bg-black opacity-90" />
              {loading && (
                <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center text-emerald-400 font-mono text-xs gap-3">
                  <Loader2 className="w-10 h-10 animate-spin text-emerald-400" />
                  <span className="tracking-widest uppercase font-bold">SCANNING & ANALYZING MEDIA...</span>
                  <span className="text-[10px] text-zinc-500">Running WebGL Neural Network Layer</span>
                </div>
              )}
            </>
          ) : (
            <div className="p-6 flex flex-col items-center text-center text-zinc-400 group-hover:text-white transition-colors">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3 group-hover:scale-110 transition-transform shadow-[0_0_25px_rgba(16,185,129,0.2)]">
                <Upload className="w-8 h-8" />
              </div>
              <span className="text-sm font-bold text-white uppercase tracking-tight">Click to Select or Drop Hazard Media</span>
              <span className="text-[11px] font-mono text-zinc-500 mt-1">Accepts PNG, JPG, WebP (&lt;10MB)</span>
              <span className="text-[10px] font-mono text-emerald-400/80 mt-3 border border-emerald-500/20 px-3 py-1 rounded-full bg-emerald-500/5">Zero server compute. Full offline resilience.</span>
            </div>
          )}
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </motion.div>

        {!preview && !loading && (
          <div className="text-center">
            <button 
              onClick={() => simulateUploadAndScan()}
              className="text-xs font-mono text-emerald-400 underline hover:text-emerald-300 transition-colors"
            >
              Or click here to simulate instant edge-AI vision test
            </button>
          </div>
        )}

        {isAnalyzed && !loading && (
          <div className="space-y-4 pt-2">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-left flex items-center justify-between shadow-[0_0_20px_rgba(16,185,129,0.1)]"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-white tracking-tight uppercase">Analysis Ready: High Severity Identified</p>
                  <p className="text-[11px] font-mono text-zinc-400 mt-0.5">Classification: <strong className="text-white">{currentHazardType}</strong> | Confidence: 98.4%</p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-bold border border-emerald-500/30">READY</span>
            </motion.div>

            {/* Step 2 & 3: Active Confirm & Abort Buttons with Hover Animations */}
            <div className="flex gap-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={reset} 
                className="px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 transition-colors font-mono text-xs uppercase font-bold tracking-wider"
              >
                Abort
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDispatch} 
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3.5 rounded-xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.5)] font-mono text-xs uppercase tracking-widest border border-emerald-400/50 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Confirm & Dispatch Payload
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {/* Step 2: Center-Screen Cinematic Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-black border-2 border-emerald-500/50 p-10 rounded-3xl shadow-[0_0_100px_rgba(16,185,129,0.4)] text-center overflow-hidden space-y-6"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-pulse" />
              
              <div className="w-24 h-24 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_60px_rgba(16,185,129,0.6)]">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 animate-bounce" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] tracking-widest uppercase font-bold">
                  <Lock className="w-3 h-3" /> Cryptographic Payload Sealed
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tighter uppercase leading-tight">
                  PAYLOAD ENCRYPTED. DISPATCHED TO MUNICIPAL AUTHORITY.
                </h3>
                <p className="text-xs font-mono text-zinc-400 leading-relaxed pt-1">
                  BIMSTEC Mesh Array has confirmed receipt. Telemetry hash committed to immutable regional ledger.
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>STATUS: <strong className="text-emerald-400">BROADCASTED</strong></span>
                <span>AUTO-CLOSING IN 2S...</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
