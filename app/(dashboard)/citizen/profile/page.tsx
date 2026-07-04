'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Fingerprint, Lock, CheckCircle2, UserCheck, Activity, Key, Globe, Radio, Sparkles } from 'lucide-react';
import { auth } from '@/lib/firebase/config';
import { User } from 'firebase/auth';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

export default function CitizenProfilePage() {
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const trustData = [
    {
      name: 'Trust Index',
      value: 98,
      fill: '#10b981',
    },
  ];

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Authenticated Citizen Node';
  const emailDisplay = user?.email || 'citizen@node.aegisroute';

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-10 min-h-[85vh] text-white pb-16 bg-black">
      {/* Header Banner */}
      <motion.div 
        whileHover={{ scale: 1.01 }} 
        transition={{ duration: 0.2 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 border border-zinc-800 bg-gradient-to-r from-zinc-950 via-black to-zinc-950 p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.9)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <ShieldCheck className="w-3.5 h-3.5" /> Cryptographic Passport Protocol
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">Sovereign Digital Identity Passport</h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 font-mono">Hardware-enclave backed credentials and dynamic BIMSTEC civic reputation telemetry.</p>
        </div>

        <div className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-black/80 border border-zinc-800 font-mono text-xs text-zinc-400 shadow-inner relative z-10">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="font-bold">TPM 2.0 Enclave Secured</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Highly Complex Recharts Radial Progress Ring Card */}
        <motion.div 
          whileHover={{ scale: 1.01 }} 
          transition={{ duration: 0.2 }}
          className="lg:col-span-5 p-8 rounded-3xl bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="w-full flex items-center justify-between mb-4 relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">Civic Trust Index</span>
            <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-black shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              Tier 1 Exemplary
            </span>
          </div>

          <div className="w-full h-72 relative flex items-center justify-center my-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="72%"
                outerRadius="100%"
                barSize={20}
                data={trustData}
                startAngle={220}
                endAngle={-40}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar
                  background={{ fill: 'rgba(255, 255, 255, 0.04)' }}
                  dataKey="value"
                  cornerRadius={12}
                />
              </RadialBarChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
              <span className="text-6xl font-black text-white tracking-tighter drop-shadow-lg">
                98<span className="text-2xl text-emerald-400 font-mono">/100</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase mt-1 tracking-widest font-bold">Accuracy Percentile</span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 max-w-sm leading-relaxed border-t border-zinc-900 pt-4 font-mono relative z-10">
            Your telemetry reports consistently meet municipal accuracy benchmarks (&gt;97.5%). Verified mesh priority is permanently granted.
          </p>
        </motion.div>

        {/* Right Column: Sovereign Digital Identity Passport with Simulated Holographic Overlays */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          {/* Holographic simulated sheen */}
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent rotate-45 pointer-events-none"></div>

          <div className="flex items-center justify-between pb-6 border-b border-zinc-900 relative z-10">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-black flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> AUTHENTICATED NODE PASSPORT
              </span>
              <h3 className="text-2xl font-black text-white tracking-tight mt-1 uppercase">{displayName}</h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-zinc-700 flex items-center justify-center shadow-lg">
              <Fingerprint className="w-7 h-7 text-emerald-400" />
            </div>
          </div>

          {/* Step 5: Holographic overlay ID cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            <motion.div 
              whileHover={{ scale: 1.02 }} 
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-zinc-800 to-black border border-zinc-700 space-y-1.5 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors"></div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase flex items-center gap-1.5 font-bold">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> OPERATOR DISPLAY IDENTITY
              </span>
              <div className="text-base font-black text-white truncate">{displayName}</div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }} 
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-zinc-800 to-black border border-zinc-700 space-y-1.5 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors"></div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase flex items-center gap-1.5 font-bold">
                <Globe className="w-3.5 h-3.5 text-blue-400" /> CRYPTOGRAPHIC EMAIL
              </span>
              <div className="text-sm font-mono text-emerald-400 truncate font-bold">{emailDisplay}</div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }} 
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-zinc-800 to-black border border-zinc-700 space-y-1.5 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors"></div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase flex items-center gap-1.5 font-bold">
                <Key className="w-3.5 h-3.5 text-amber-400" /> GOVERNMENT LINKED ID
              </span>
              <div className="text-sm font-mono text-zinc-200 flex items-center gap-2 font-bold">
                UID-IN-****-****-8842
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }} 
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-zinc-800 to-black border border-zinc-700 space-y-1.5 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors"></div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase flex items-center gap-1.5 font-bold">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> ENCLAVE SECURITY LEVEL
              </span>
              <div className="text-sm font-mono text-emerald-400 flex items-center gap-1.5 font-black">
                Hardware-Backed TPM 2.0
              </div>
            </motion.div>
          </div>

          {/* Badges Footer */}
          <div className="pt-4 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <Award className="w-5 h-5 text-emerald-400 shrink-0" /> Cryptographic Badge: <strong className="text-white font-black uppercase">Exemplary First Responder</strong>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/15 px-4 py-1.5 rounded-full border border-emerald-500/30 font-black shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              Verification Validated
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
