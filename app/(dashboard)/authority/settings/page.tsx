'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [encryptedComms, setEncryptedComms] = useState(true);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 min-h-[80vh] bg-[#020202] border border-zinc-800 rounded-3xl">
      <div className="mb-8">
         <h1 className="text-3xl font-bold tracking-tighter text-white mb-2">DEPARTMENT CONFIGURATIONS</h1>
         <p className="text-zinc-500 font-mono tracking-widest uppercase text-sm">Authority system parameters</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center justify-between p-6 bg-[#050505] border border-zinc-800 rounded-2xl">
          <div>
            <h3 className="text-white font-bold tracking-tight">Auto-Dispatch Nearest Unit</h3>
            <p className="text-zinc-500 text-sm mt-1">Automatically assign available fleet units to critical SOS signals.</p>
          </div>
          <button 
            onClick={() => setAutoDispatch(!autoDispatch)}
            className={`w-12 h-6 rounded-full transition-colors relative ${autoDispatch ? 'bg-blue-600' : 'bg-zinc-700'}`}
          >
            <motion.div layout className={`w-5 h-5 bg-white rounded-full absolute top-0.5 ${autoDispatch ? 'right-0.5' : 'left-0.5'}`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-6 bg-[#050505] border border-zinc-800 rounded-2xl">
          <div>
            <h3 className="text-white font-bold tracking-tight">Enforce Encrypted Comms</h3>
            <p className="text-zinc-500 text-sm mt-1">Force military-grade 256-bit encryption on all inter-department chatter.</p>
          </div>
          <button 
            onClick={() => setEncryptedComms(!encryptedComms)}
            className={`w-12 h-6 rounded-full transition-colors relative ${encryptedComms ? 'bg-blue-600' : 'bg-zinc-700'}`}
          >
            <motion.div layout className={`w-5 h-5 bg-white rounded-full absolute top-0.5 ${encryptedComms ? 'right-0.5' : 'left-0.5'}`} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
