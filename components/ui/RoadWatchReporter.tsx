"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import { analyzeImageLocal, EdgeAIResult } from "@/lib/edgeAi";
import { useOfflineSync } from "@/hooks/useOfflineSync";

export function RoadWatchReporter() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<EdgeAIResult | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { isOnline, submitReport } = useOfflineSync();
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
    setIsSubmitted(false);
    
    // Begin scanning automatically
    setIsScanning(true);
    const analysis = await analyzeImageLocal(selectedFile);
    setResult(analysis);
    setIsScanning(false);
  };

  const handleSubmit = async () => {
    if (!result) return;
    
    const payload = {
      type: 'Hazard_Report',
      hazardType: result.hazardType,
      severityScore: result.severityScore,
      location: location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Unknown Location',
      status: 'Pending',
      timestamp: Date.now()
    };

    await submitReport(payload);
    setIsSubmitted(true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return '#EF4444'; // Red
    if (score >= 40) return '#F97316'; // Orange
    return '#00FF66'; // Green
  };

  return (
    <div className="border border-zinc-800 bg-zinc-950/50 backdrop-blur-md rounded-xl p-6 w-full max-w-xl mx-auto relative overflow-hidden">
      
      {/* Network Indicator */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-[#00FF66] shadow-[0_0_8px_#00FF66]' : 'bg-yellow-500 shadow-[0_0_8px_#EAB308] animate-pulse'}`} />
        <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400">
          {isOnline ? 'SYS_ONLINE' : 'SYS_OFFLINE (QUEUING)'}
        </span>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tighter flex items-center gap-2">
          <Camera className="w-6 h-6 text-white" />
          CIVIC <span className="text-zinc-500">REPORTER</span>
        </h2>
        <p className="text-zinc-400 text-sm mt-2 font-medium">Upload hazard imagery. Edge AI will analyze severity locally.</p>
      </div>

      {/* Upload Zone */}
      <div 
        onClick={() => !isScanning && fileInputRef.current?.click()}
        className={`relative w-full h-64 border border-dashed rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden
          ${preview ? 'border-zinc-800' : 'border-zinc-700 hover:border-zinc-500 bg-zinc-900/50'}
        `}
      >
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none" />
            
            {/* Scanning Laser Animation */}
            {isScanning && (
              <motion.div
                initial={{ top: 0 }}
                animate={{ top: '100%' }}
                transition={{ duration: 1.5, ease: "linear", repeat: Infinity, repeatType: 'reverse' }}
                className="absolute inset-0 left-0 w-full h-0.5 bg-white shadow-[0_0_20px_4px_rgba(255,255,255,0.5)] z-10 pointer-events-none"
              />
            )}
            
            {isScanning && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/60 backdrop-blur-sm pointer-events-none">
                <div className="w-10 h-10 border-4 border-t-white border-r-white border-b-transparent border-l-transparent rounded-full animate-spin mb-2" />
                <span className="text-white font-mono text-sm tracking-widest font-bold">ANALYZING...</span>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center text-center p-6">
            <Upload className="w-10 h-10 text-zinc-500 mb-4" />
            <p className="font-medium text-zinc-300">Tap to Capture or Upload</p>
            <p className="text-xs text-zinc-500 mt-2">Maximum file size: 5MB</p>
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

      {/* AI Results */}
      <AnimatePresence>
        {result && !isScanning && !isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-6 p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between"
          >
            <div>
              <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase mb-1">Detected Hazard</p>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                {result.primaryHazard}
                {result.severityScore >= 75 && <ShieldAlert className="w-4 h-4 text-red-500" />}
              </h3>
              {result.analysis && result.analysis.length > 0 && (
                <ul className="mt-2 flex flex-col gap-1">
                  {result.analysis.map((item, idx) => (
                    <li key={idx} className="text-xs text-zinc-400 font-mono flex items-center gap-2">
                      <span className="w-1 h-1 bg-zinc-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Score Ring */}
            <div className="relative flex items-center justify-center w-16 h-16">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r="28" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                <motion.circle 
                  cx="32" cy="32" r="28" 
                  fill="transparent" 
                  stroke={getScoreColor(result.severityScore)} 
                  strokeWidth="6"
                  strokeDasharray="175"
                  initial={{ strokeDashoffset: 175 }}
                  animate={{ strokeDashoffset: 175 - (175 * result.severityScore) / 100 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              <span className="absolute text-sm font-bold">{result.severityScore}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 bg-[#00FF66]/10 border border-[#00FF66]/30 rounded-2xl flex items-center gap-4 text-[#00FF66]"
          >
            <CheckCircle2 className="w-8 h-8 shrink-0" />
            <div>
              <p className="font-bold">Report Secured</p>
              <p className="text-xs opacity-80">{isOnline ? 'Transmitted to Authority Core.' : 'Stored locally. Will transmit upon reconnection.'}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="mt-8 relative z-50">
        <button
          disabled={!result || isScanning || isSubmitted}
          onClick={handleSubmit}
          className={`relative z-[9999] pointer-events-auto cursor-pointer w-full py-3 bg-white text-black font-medium rounded-md hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitted ? 'Report Logged' : 'Submit to Authority'}
        </button>
      </div>
    </div>
  );
}
