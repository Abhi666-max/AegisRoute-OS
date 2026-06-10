'use client';
import { motion } from 'framer-motion';

export default function IncidentsMapPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 min-h-[80vh] bg-[#020202] border border-zinc-800 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center">
      {/* Mock Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Pulsing Dots */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_20px_red] animate-ping"></div>
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_20px_red]"></div>

      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_20px_blue] animate-pulse"></div>
      
      <div className="absolute top-1/2 left-2/3 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_20px_red] animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-2/3 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_20px_red]"></div>

      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_20px_blue] animate-pulse" style={{ animationDelay: '0.5s' }}></div>

      <div className="relative z-10 text-center bg-[#050505]/80 p-8 backdrop-blur-md border border-zinc-800 rounded-2xl">
         <h1 className="text-3xl font-bold tracking-tighter text-white mb-2">LIVE MAP TELEMETRY</h1>
         <p className="text-zinc-500 font-mono tracking-widest uppercase text-sm">Geospatial Grid Active. Monitoring sector...</p>
      </div>
    </motion.div>
  );
}
