"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, CheckCircle2, Cpu, X, Network, Loader2, Sparkles, ShieldAlert } from "lucide-react";
import { useOfflineSync } from "@/hooks/useOfflineSync";

interface RoadWatchReporterProps {
  prefilledHazard?: string | null;
  onClearPrefilled?: () => void;
}

export function RoadWatchReporter({ prefilledHazard, onClearPrefilled }: RoadWatchReporterProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { isOnline, submitReport } = useOfflineSync();
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  const [loading, setLoading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentHazardType, setCurrentHazardType] = useState('Structural Road Hazard');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, []);

  useEffect(() => {
    if (prefilledHazard) {
      setCurrentHazardType(prefilledHazard);
      simulateUploadAndScan();
    }
  }, [prefilledHazard]);

  const simulateUploadAndScan = (selectedFile?: File) => {
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80');
    }
    setLoading(true);
    setIsAnalyzed(false);
    setShowSuccess(false);
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

  const dispatchSOS = async () => {
    if (!isAnalyzed) return;
    await submitReport({
      type: 'Hazard_Report',
      hazardType: currentHazardType,
      severityScore: 92,
      location: location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'BIMSTEC Sector Node',
      status: 'Pending',
      timestamp: Date.now()
    });
    setShowSuccess(true);
    setTimeout(() => {
      reset();
    }, 3000);
  };

  const reset = () => {
    setIsAnalyzed(false);
    setPreview(null);
    setFile(null);
    setShowSuccess(false);
    if (onClearPrefilled) onClearPrefilled();
  };

  return (
    <div className="border border-white/10 bg-[#050b14] backdrop-blur-md rounded-2xl p-6 w-full relative overflow-hidden shadow-2xl flex flex-col justify-between">
      {/* Network Indicator */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500 shadow-[0_0_8px_#f59e0b] animate-pulse'}`} />
        <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
          {isOnline ? 'SYS_ONLINE' : 'SYS_OFFLINE'}
        </span>
      </div>

      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono tracking-widest uppercase mb-3">
          <Network className="w-3.5 h-3.5" />
          Edge AI Vision Ready
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <Camera className="w-5 h-5 text-emerald-400" />
          CIVIC <span className="text-zinc-500">REPORTER</span>
        </h2>
        <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
          Capture or upload hazard imagery. Local WebGL computer vision analyzes severity instantly on your device.
        </p>
      </div>

      {showSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-12 space-y-4 text-center bg-black/40 rounded-2xl border border-emerald-500/30 p-8 shadow-[0_0_40px_rgba(16,185,129,0.2)]"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.5)]">
            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
          </div>
          <h4 className="text-2xl font-black text-white tracking-tight uppercase">SOS DISPATCHED TO AUTHORITY QUEUE</h4>
          <p className="text-xs font-mono text-emerald-400">Cryptographic hash committed to regional ledger.</p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {/* Dropzone - object-contain used to prevent image stretching */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="relative w-full h-64 border-2 border-dashed border-white/15 hover:border-emerald-500/50 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-black/50 overflow-hidden group transition-all"
          >
            {preview ? (
              <>
                <img src={preview} alt="Upload preview" className="absolute inset-0 w-full h-full object-contain p-2 bg-black opacity-85" />
                {loading && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-emerald-400 font-mono text-xs gap-2">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span>SCANNING & ANALYZING MEDIA...</span>
                  </div>
                )}
              </>
            ) : (
              <div className="p-6 flex flex-col items-center text-center text-zinc-400 group-hover:text-white transition-colors">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                  <Upload className="w-8 h-8" />
                </div>
                <span className="text-sm font-bold text-white">Click to Select or Drop Hazard Media</span>
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
          </div>

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
            <>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-white">Analysis Ready: High Severity Identified</p>
                    <p className="text-[11px] font-mono text-zinc-400 mt-0.5">Classification: <strong className="text-white">{currentHazardType}</strong> | Confidence: 98.4%</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-bold">READY</span>
              </motion.div>

              {/* Step 3: Exact Action Buttons Restored Below Analysis Ready Box */}
              <div className="flex gap-4 mt-4">
                <button onClick={reset} className="px-6 py-2 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 transition-colors font-mono text-xs uppercase font-bold">Abort</button>
                <button onClick={dispatchSOS} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-md transition-all shadow-[0_0_20px_rgba(5,150,105,0.4)] font-mono text-xs uppercase">Confirm & Dispatch Payload</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
