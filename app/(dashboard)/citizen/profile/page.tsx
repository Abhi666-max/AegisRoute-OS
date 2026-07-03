'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Fingerprint, Lock, CheckCircle2, UserCheck, Activity, Key, Globe, Radio } from 'lucide-react';
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
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 min-h-[85vh] text-white pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Cryptographic Identity Protocol
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Civic Trust Profile</h1>
          <p className="text-zinc-400 text-sm mt-1">Sovereign identity credentials and dynamic BIMSTEC civic reputation telemetry.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#050b14] border border-white/10 font-mono text-xs text-zinc-400">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>TPM 2.0 Enclave Secured</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recharts Trust Score RadialBar Card */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-[#050b14] border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none"></div>
          
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Civic Trust Index</span>
            <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
              Tier 1 Exemplary
            </span>
          </div>

          <div className="w-full h-64 relative flex items-center justify-center my-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="75%"
                outerRadius="100%"
                barSize={16}
                data={trustData}
                startAngle={210}
                endAngle={-30}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar
                  background={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  dataKey="value"
                  cornerRadius={10}
                />
              </RadialBarChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
              <span className="text-5xl font-black text-white tracking-tighter">
                98<span className="text-xl text-emerald-400">/100</span>
              </span>
              <span className="text-xs font-mono text-zinc-400 uppercase mt-1 tracking-widest">Accuracy Percentile</span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 max-w-sm leading-relaxed border-t border-white/5 pt-4">
            Your telemetry reports consistently meet municipal accuracy benchmarks (&gt;97.5%). Verified mesh priority is permanently granted.
          </p>
        </div>

        {/* Right Column: Sleek Digital Identity Card */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-[#050b14] border border-white/10 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">AUTHENTICATED NODE PASSPORT</span>
              <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">{displayName}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center">
              <Fingerprint className="w-6 h-6 text-emerald-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> OPERATOR DISPLAY IDENTITY
              </span>
              <div className="text-base font-bold text-white truncate">{displayName}</div>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400" /> CRYPTOGRAPHIC EMAIL
              </span>
              <div className="text-sm font-mono text-emerald-400 truncate">{emailDisplay}</div>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-400" /> GOVERNMENT LINKED ID
              </span>
              <div className="text-sm font-mono text-zinc-300 flex items-center gap-2">
                UID-IN-****-****-8842
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> ENCLAVE SECURITY LEVEL
              </span>
              <div className="text-sm font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
                Hardware-Backed TPM 2.0
              </div>
            </div>
          </div>

          {/* Badges Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <Award className="w-4.5 h-4.5 text-emerald-400" /> Cryptographic Badge: <strong className="text-white">Exemplary First Responder</strong>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20 font-bold shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              Verification Validated
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
