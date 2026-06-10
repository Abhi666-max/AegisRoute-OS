'use client';
import { motion } from 'framer-motion';

export default function IncidentsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 min-h-[80vh] bg-[#020202] border border-zinc-800 rounded-3xl flex items-center justify-center text-center">
      <div>
         <h1 className="text-3xl font-bold tracking-tighter text-white mb-2">LIVE FEED & INCIDENTS</h1>
         <p className="text-zinc-500 font-mono tracking-widest uppercase text-sm">Real-time geospatial mapping loading...</p>
      </div>
    </motion.div>
  );
}
