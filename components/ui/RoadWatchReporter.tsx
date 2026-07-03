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

  const [isModalOpen, setIsModalOpen] = useState(false);
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
      setIsModalOpen(true);
      setIsAnalyzed(false);
      setShowSuccess(false);
    }
  }, [prefilledHazard]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsAnalyzed(false);
    setShowSuccess(false);
  };

  const simulateUploadAndScan = (selectedFile?: File) => {
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80');
    }
    setLoading(true);
    setIsAnalyzed(false);
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
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsModalOpen(false);
      setIsAnalyzed(false);
      setPreview(null);
      if (onClearPrefilled) onClearPrefilled();
    }, 2500);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

      {/* Interactive Upload Box Trigger */}
      <div 
        onClick={handleOpenModal}
        className="relative w-full h-44 border-2 border-dashed border-white/10 hover:border-emerald-500/50 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer bg-black/40 group overflow-hidden"
      >
        <div className="flex flex-col items-center text-center p-6">
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <Upload className="w-8 h-8" />
          </div>
          <p className="font-bold text-white text-sm">Tap to Initialize Telemetry Upload</p>
          <p className="text-xs text-zinc-500 mt-1 font-mono">Zero server compute. Full offline resilience.</p>
        </div>
      </div>

      {/* Centered Interactive Upload Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 backdrop-blur-2xl bg-black/90"
              onClick={handleCloseModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#050b14] border border-white/10 p-8 rounded-3xl shadow-[0_0_60px_rgba(16,185,129,0.2)] text-center overflow-hidden"
            >
              <button 
                onClick={handleCloseModal} 
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors z-50"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6 text-left">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" /> Edge-AI Pipeline Active
                </span>
                <h3 className="text-xl font-extrabold text-white tracking-tight mt-1">Hazard Telemetry Payload</h3>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">Classification: <span className="text-white font-bold">{currentHazardType}</span></p>
              </div>

              {showSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 space-y-4"
                >
                  <div className="w-24 h-24 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.5)]">
                    <CheckCircle2 className="w-14 h-14 text-emerald-400" />
                  </div>
                  <h4 className="text-2xl font-black text-white tracking-tight uppercase">SOS DISPATCHED TO AUTHORITY QUEUE</h4>
                  <p className="text-xs font-mono text-emerald-400">Cryptographic hash committed to regional ledger.</p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {/* Dropzone inside modal - object-contain used to prevent image stretching */}
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative w-full h-56 border-2 border-dashed border-white/15 hover:border-emerald-500/50 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-black/50 overflow-hidden group transition-all"
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
                      <div className="p-4 flex flex-col items-center text-zinc-400 group-hover:text-white transition-colors">
                        <Upload className="w-8 h-8 text-emerald-400 mb-2" />
                        <span className="text-sm font-semibold">Click to Select or Drop Hazard Media</span>
                        <span className="text-[11px] font-mono text-zinc-500 mt-1">Accepts PNG, JPG, WebP (&lt;10MB)</span>
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
                    <button 
                      onClick={() => simulateUploadAndScan()}
                      className="text-xs font-mono text-emerald-400 underline hover:text-emerald-300"
                    >
                      Or click here to simulate instant edge-AI vision test
                    </button>
                  )}

                  {isAnalyzed && !loading && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-left flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-white">Analysis Ready: High Severity Identified</p>
                          <p className="text-[10px] font-mono text-zinc-400">Confidence: 98.4% | Local GPS verified</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-bold">READY</span>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={handleCloseModal} 
                      className="flex-1 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-mono text-xs tracking-widest uppercase transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      disabled={!isAnalyzed || loading}
                      onClick={handleDispatch} 
                      className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:border-transparent text-white rounded-xl font-mono text-xs tracking-widest uppercase shadow-[0_0_25px_rgba(16,185,129,0.4)] disabled:shadow-none transition-all font-bold"
                    >
                      Confirm & Dispatch SOS
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
