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
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 min-h-[85vh] text-zinc-100 pb-16 font-sans antialiased">
      {/* Header Banner */}
      <motion.div 
        whileHover={{ scale: 1.005 }} 
        transition={{ duration: 0.2 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 border border-zinc-800/80 bg-gradient-to-r from-zinc-950 via-zinc-900/80 to-zinc-950 p-8 rounded-3xl shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-emerald-400 text-xs font-medium tracking-tight mb-3">
            <ShieldCheck className="w-3.5 h-3.5" /> Cryptographic Passport Protocol
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">Sovereign Digital Identity Passport</h1>
          <p className="text-zinc-400 text-sm mt-1 font-normal">Hardware-enclave backed credentials and dynamic civic reputation telemetry.</p>
        </div>

        <div className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-zinc-950 border border-zinc-800 font-medium text-xs text-zinc-400 shadow-inner relative z-10">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="font-semibold text-zinc-200">TPM 2.0 Enclave Secured</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recharts Radial Progress Ring Card */}
        <motion.div 
          whileHover={{ scale: 1.005 }} 
          transition={{ duration: 0.2 }}
          className="lg:col-span-5 p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800/80 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-lg"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="w-full flex items-center justify-between mb-4 relative z-10">
            <span className="text-xs font-medium tracking-tight text-zinc-400">Civic Trust Index</span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
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
                  background={{ fill: 'rgba(255, 255, 255, 0.03)' }}
                  dataKey="value"
                  cornerRadius={12}
                />
              </RadialBarChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
              <span className="text-5xl font-semibold text-white tracking-tight">
                98<span className="text-xl text-emerald-400 font-normal">/100</span>
              </span>
              <span className="text-xs text-zinc-400 mt-1 tracking-tight font-medium">Accuracy Percentile</span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 max-w-sm leading-relaxed border-t border-zinc-900 pt-4 font-normal relative z-10">
            Your telemetry reports consistently meet municipal accuracy benchmarks (&gt;97.5%). Verified mesh priority is permanently granted.
          </p>
        </motion.div>

        {/* Right Column: Sovereign Digital Identity Passport */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800/80 space-y-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          {/* Simulated sheen */}
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/[0.015] to-transparent rotate-45 pointer-events-none"></div>

          <div className="flex items-center justify-between pb-6 border-b border-zinc-900 relative z-10">
            <div>
              <span className="text-xs font-medium text-emerald-400 tracking-tight flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Authenticated Node Passport
              </span>
              {/* Step 1: Specifically fix ABHIJEET666K text to text-2xl font-semibold tracking-tight text-white capitalize */}
              <h3 className="text-2xl font-semibold tracking-tight text-white capitalize mt-1">{displayName}</h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-md">
              <Fingerprint className="w-7 h-7 text-emerald-400" />
            </div>
          </div>

          {/* ID cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            <motion.div 
              whileHover={{ scale: 1.01 }} 
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-1 shadow-md relative overflow-hidden group"
            >
              <span className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> Operator Display Identity
              </span>
              <div className="text-base font-semibold text-white truncate capitalize">{displayName}</div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.01 }} 
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-1 shadow-md relative overflow-hidden group"
            >
              <span className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400" /> Cryptographic Email
              </span>
              <div className="text-sm font-medium text-emerald-400 truncate">{emailDisplay}</div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.01 }} 
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-1 shadow-md relative overflow-hidden group"
            >
              <span className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-400" /> Government Linked ID
              </span>
              <div className="text-sm font-mono text-zinc-200 flex items-center gap-2 font-medium">
                UID-IN-****-****-8842
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.01 }} 
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-1 shadow-md relative overflow-hidden group"
            >
              <span className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> Enclave Security Level
              </span>
              <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                Hardware-Backed TPM 2.0
              </div>
            </motion.div>
          </div>

          {/* Badges Footer */}
          <div className="pt-4 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
              <Award className="w-5 h-5 text-emerald-400 shrink-0" /> Cryptographic Badge: <span className="text-white font-semibold">Exemplary First Responder</span>
            </div>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/30">
              Verification Validated
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
