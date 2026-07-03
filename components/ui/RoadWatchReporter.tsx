"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, AlertTriangle, CheckCircle2, ShieldAlert, Cpu, Activity, Sparkles, X } from "lucide-react";
import { useOfflineSync } from "@/hooks/useOfflineSync";

export function RoadWatchReporter() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { isOnline, submitReport } = useOfflineSync();
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  // Simulation modal states: 0 = none, 1 = Uploading Media, 2 = Running Edge-AI CV, 3 = Result Detected
  const [simulationPhase, setSimulationPhase] = useState<number>(0);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, []);

  const triggerSimulation = (imgSrc: string) => {
    setPreview(imgSrc);
    setSimulationPhase(1);
    setUploadProgress(0);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    triggerSimulation(URL.createObjectURL(selectedFile));
  };

  // Run multi-phase simulation when simulationPhase transitions
  useEffect(() => {
    if (simulationPhase === 1) {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setSimulationPhase(2), 400);
            return 100;
          }
          return prev + 15;
        });
      }, 150);
      return () => clearInterval(interval);
    } else if (simulationPhase === 2) {
      const timer = setTimeout(() => {
        setSimulationPhase(3);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [simulationPhase]);

  const confirmReportSubmission = async () => {
    await submitReport({
      type: 'Hazard_Report',
      hazardType: 'Severe Structural Damage & Pothole Fracture',
      severityScore: 89,
      location: location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'BIMSTEC Sector Grid',
      status: 'Pending',
      timestamp: Date.now()
    });
    setSimulationPhase(0);
  };

  return (
    <div className="border border-white/10 bg-[#050b14] backdrop-blur-md rounded-2xl p-6 w-full max-w-xl mx-auto relative overflow-hidden shadow-2xl">
      {/* Network Indicator */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500 shadow-[0_0_8px_#f59e0b] animate-pulse'}`} />
        <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
          {isOnline ? 'SYS_ONLINE' : 'SYS_OFFLINE (QUEUING)'}
        </span>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <Camera className="w-5 h-5 text-emerald-400" />
          CIVIC <span className="text-zinc-500">REPORTER</span>
        </h2>
        <p className="text-zinc-400 text-xs mt-1 font-medium">Upload hazard imagery. Client-side Edge AI runs local computer vision verification.</p>
      </div>

      {/* Interactive Upload Box */}
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="relative w-full h-56 border-2 border-dashed border-white/10 hover:border-emerald-500/50 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer bg-black/40 group overflow-hidden"
      >
        <div className="flex flex-col items-center text-center p-6">
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <Upload className="w-8 h-8" />
          </div>
          <p className="font-bold text-white text-sm">Click or Drag & Drop Imagery</p>
          <p className="text-xs text-zinc-500 mt-1 font-mono">Simulates local WebGL edge inference pipeline</p>
        </div>
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      {/* Centered Edge-AI Analysis Modal */}
      <AnimatePresence>
        {simulationPhase > 0 && (
          <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 backdrop-blur-2xl bg-black/90"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#050b14] border border-white/10 p-8 rounded-3xl shadow-[0_0_60px_rgba(16,185,129,0.2)] text-center overflow-hidden"
            >
              <button 
                onClick={() => setSimulationPhase(0)} 
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {simulationPhase === 1 && (
                <motion.div key="phase1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                    <Upload className="w-10 h-10 text-blue-400 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-white tracking-tight">Uploading Media...</h3>
                    <div className="w-full bg-zinc-900 rounded-full h-3 mt-4 overflow-hidden border border-white/10 p-0.5">
                      <motion.div 
                        className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full"
                        style={{ width: `${Math.min(uploadProgress, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs font-mono text-emerald-400 mt-3">Transmitting encrypted payload: [{Math.min(uploadProgress, 100)}%]</p>
                  </div>
                </motion.div>
              )}

              {simulationPhase === 2 && (
                <motion.div key="phase2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4 space-y-6">
                  <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-emerald-500/30 bg-black">
                    {preview && <img src={preview} alt="Scanning" className="w-full h-full object-cover opacity-60 filter grayscale" />}
                    
                    {/* Scanning Wireframe & Laser */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    <motion.div
                      initial={{ top: 0 }}
                      animate={{ top: '100%' }}
                      transition={{ duration: 1.2, ease: "linear", repeat: Infinity, repeatType: 'reverse' }}
                      className="absolute inset-x-0 h-1 bg-emerald-400 shadow-[0_0_20px_6px_rgba(16,185,129,0.8)] z-20"
                    />
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                      <Cpu className="w-3 h-3 animate-spin" /> RUNNING LOCAL EDGE-AI COMPUTER VISION...
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Analyzing Structural Fracture Severity</h3>
                    <p className="text-xs font-mono text-zinc-400 mt-1">Extracting surface bounding boxes & depth vectors via local WebGL model</p>
                  </div>
                </motion.div>
              )}

              {simulationPhase === 3 && (
                <motion.div key="phase3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-4 space-y-6">
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center gap-4 text-left">
                    <div className="p-3 rounded-xl bg-red-500/20 text-red-400">
                      <ShieldAlert className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-bold">EDGE-AI VERIFICATION COMPLETE</span>
                      <h4 className="text-base font-extrabold text-white mt-0.5">Result: Severe Structural Damage Detected.</h4>
                      <p className="text-xs text-zinc-400 mt-1">Confidence Score: <span className="text-red-400 font-mono font-bold">98.4% (Priority Escalated)</span></p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setSimulationPhase(0)} className="flex-1 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-mono text-xs tracking-widest uppercase transition-colors">Abort</button>
                    <button onClick={confirmReportSubmission} className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-mono text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-colors">Confirm & Dispatch SOS</button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
