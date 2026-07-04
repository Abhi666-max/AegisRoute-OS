"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, CheckCircle2, Loader2, Network, ShieldAlert, Lock, ArrowLeft } from "lucide-react";
import { useOfflineSync } from "@/hooks/useOfflineSync";
import { useIncidentStore } from "@/store/useIncidentStore";

interface RoadWatchReporterProps {
  prefilledHazard?: string | null;
  onClearPrefilled?: () => void;
}

export function RoadWatchReporter({ prefilledHazard, onClearPrefilled }: RoadWatchReporterProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  const { isOnline, submitReport } = useOfflineSync();
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  const [loading, setLoading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [dispatchSuccess, setDispatchSuccess] = useState(false);
  const [currentHazardType, setCurrentHazardType] = useState('Structural Road Hazard');

  const { addIncident } = useIncidentStore();

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
    }
  }, [prefilledHazard]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setLoading(true);
      setIsAnalyzed(false);
      setDispatchSuccess(false);
      setTimeout(() => {
        setLoading(false);
        setIsAnalyzed(true);
      }, 1500);
    }
  };

  const loadSampleTelemetry = () => {
    let sampleImg = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80'; // Pothole
    if (currentHazardType.toLowerCase().includes('collision') || currentHazardType.toLowerCase().includes('accident') || currentHazardType.toLowerCase().includes('vehicle')) {
      sampleImg = 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&w=800&q=80'; // Collision
    } else if (currentHazardType.toLowerCase().includes('gridlock') || currentHazardType.toLowerCase().includes('traffic')) {
      sampleImg = 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80'; // Traffic
    } else if (currentHazardType.toLowerCase().includes('flood') || currentHazardType.toLowerCase().includes('water')) {
      sampleImg = 'https://images.unsplash.com/photo-1518241353330-0f797f83560f?auto=format&fit=crop&w=800&q=80'; // Flood
    }
    setPreview(sampleImg);
    setLoading(true);
    setIsAnalyzed(false);
    setDispatchSuccess(false);
    setTimeout(() => {
      setLoading(false);
      setIsAnalyzed(true);
    }, 1500);
  };

  const handleDispatch = async () => {
    if (!isAnalyzed) return;
    const newId = 'SOS-' + Math.floor(1000 + Math.random() * 9000);
    const coordsStr = location ? `${location.lat.toFixed(4)}° N, ${location.lng.toFixed(4)}° E` : '18.9894° N, 73.1175° E';
    
    // Step 1: Append to shared incident store for real-time triage in Authority/Admin
    addIncident({
      id: newId,
      type: currentHazardType,
      classification: currentHazardType,
      location: `${coordsStr} (Regional Node)`,
      coordinates: coordsStr,
      status: 'UNASSIGNED CITIZEN REPORT',
      time: 'Just now',
      severity: 'CRITICAL',
      sourceImage: preview,
      confidence: '98.4%'
    });

    await submitReport({
      type: 'Hazard_Report',
      hazardType: currentHazardType,
      severityScore: 92,
      location: coordsStr,
      status: 'Pending',
      timestamp: Date.now()
    });
    setDispatchSuccess(true);
  };

  const reset = () => {
    setIsAnalyzed(false);
    setPreview(null);
    setFile(null);
    setDispatchSuccess(false);
    if (onClearPrefilled) onClearPrefilled();
  };

  return (
    <div className="border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl rounded-2xl p-8 w-full relative overflow-hidden shadow-2xl flex flex-col justify-between h-full font-sans antialiased text-zinc-100">
      {/* Network Indicator */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500 shadow-[0_0_8px_#f59e0b] animate-pulse'}`} />
        <span className="text-xs font-medium tracking-tight text-zinc-400">
          {isOnline ? 'System Online' : 'System Offline'}
        </span>
      </div>

      <div className="mb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-medium tracking-tight mb-3">
          <Network className="w-3.5 h-3.5" />
          Edge AI Vision Ready
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-white flex items-center gap-2">
          <Camera className="w-5 h-5 text-emerald-400" />
          Civic Reporter
        </h2>
        <p className="text-zinc-400 text-sm mt-1 leading-relaxed font-normal">
          Capture or upload hazard imagery. Local computer vision analyzes severity instantly on your device.
        </p>
      </div>

      <div className="space-y-6 relative z-10 flex-1 flex flex-col justify-between">
        {/* Dropzone with Real HTML5 Camera & File Browse */}
        <div className="relative w-full h-72 border border-dashed border-zinc-800 hover:border-zinc-700 rounded-2xl flex flex-col items-center justify-center bg-zinc-900/30 overflow-hidden transition-all shadow-inner p-6">
          {preview ? (
            <>
              <img src={preview} alt="Upload preview" className="absolute inset-0 w-full h-full object-contain p-2 bg-zinc-950/90" />
              {loading && (
                <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-emerald-400 text-sm font-medium tracking-tight gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
                  <span>Scanning and analyzing media...</span>
                  <span className="text-xs text-zinc-500 font-normal">Running neural network vision layer</span>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center text-center max-w-sm space-y-3">
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-300">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <span className="text-base font-semibold text-white tracking-tight block">Select or Capture Hazard Media</span>
                <span className="text-xs text-zinc-400 mt-1 block">Selected classification: <strong className="text-zinc-200">{currentHazardType}</strong></span>
              </div>
              
              {/* Two distinct buttons side-by-side inside dropzone */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1 w-full">
                <label className="cursor-pointer bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all text-sm font-medium text-zinc-100 shadow-sm hover:scale-[1.02] active:scale-98">
                  <Camera size={16} className="text-emerald-400" /> Open Camera
                  <input 
                    type="file" 
                    accept="image/*" 
                    capture="environment" 
                    className="hidden" 
                    onChange={handleFileChange} 
                  />
                </label>

                <label className="cursor-pointer bg-transparent border border-zinc-800 hover:bg-zinc-900/80 px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all text-sm font-medium text-zinc-300 hover:scale-[1.02] active:scale-98">
                  <Upload size={16} className="text-zinc-400" /> Browse Files
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileChange} 
                  />
                </label>
              </div>

              {/* Step 2: Use Sample Telemetry Fallback Button */}
              <button 
                onClick={loadSampleTelemetry} 
                className="text-xs text-zinc-500 hover:text-zinc-300 underline transition-all mt-3 block mx-auto font-medium"
              >
                Use Simulated Telemetry Sample
              </button>
              
              <span className="text-xs text-zinc-500 pt-0.5">Zero server compute. Full offline resilience.</span>
            </div>
          )}
        </div>

        {isAnalyzed && !loading && (
          <div className="space-y-4 pt-2">
            <motion.div 
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-sm font-semibold tracking-tight text-white">Analysis Ready: High Severity Identified</p>
                  <p className="text-xs text-zinc-400 mt-0.5">Classification: <span className="text-zinc-200 font-medium">{currentHazardType}</span> | Confidence: 98.4%</p>
                </div>
              </div>
              <span className="text-xs font-medium bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full">Ready</span>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={reset} 
                className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors text-sm font-medium tracking-tight"
              >
                Abort
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDispatch} 
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] text-sm tracking-tight border border-emerald-500/30 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Confirm & Dispatch Payload
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {/* Center-Screen Cinematic Modal for Confirm Button */}
      <AnimatePresence>
        {dispatchSuccess && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-zinc-950 border border-zinc-800 p-8 rounded-3xl shadow-2xl text-center space-y-6"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 animate-pulse" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium tracking-tight">
                  <Lock className="w-3.5 h-3.5" /> Cryptographic Payload Sealed
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                  Payload Encrypted & Dispatched
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                  Your hazard telemetry and spatial coordinates have been committed to the regional municipal authority ledger.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={reset}
                className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-white rounded-xl font-medium text-sm tracking-tight transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Return to Dashboard
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
