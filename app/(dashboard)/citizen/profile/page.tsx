'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Fingerprint, Lock, CheckCircle2, UserCheck, Activity } from 'lucide-react';
import { auth } from '@/lib/firebase/config';
import { User } from 'firebase/auth';

export default function CitizenProfilePage() {
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 min-h-[80vh] text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Sovereign Identity Protocol
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Civic Trust Profile</h1>
          <p className="text-zinc-400 text-sm mt-1">Verified reputation metrics and cryptographic civic credentials.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trust Score Radial Card */}
        <div className="p-8 rounded-3xl bg-[#050b14] border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px]"></div>
          
          <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-6">Civic Trust Index</h3>
          
          <div className="relative w-44 h-44 flex items-center justify-center mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="88" cy="88" r="76" stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="transparent" />
              <circle
                cx="88" cy="88" r="76"
                stroke="#10b981"
                strokeWidth="12"
                strokeDasharray={477}
                strokeDashoffset={477 * (1 - 0.98)}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-extrabold text-white tracking-tighter">98<span className="text-lg text-emerald-400">/100</span></span>
              <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase mt-1">Tier 1 Exemplary</span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 max-w-xs">
            Your verified telemetry reports consistently meet municipal accuracy benchmarks (&gt;97.5%).
          </p>
        </div>

        {/* Identity Info Card */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-[#050b14] border border-white/10 space-y-6 shadow-2xl">
          <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-400" /> Authenticated Node Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-black/50 border border-white/5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">OPERATOR DISPLAY NAME</span>
              <div className="text-base font-bold text-white mt-1">{user?.displayName || 'Sovereign Citizen Node'}</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/50 border border-white/5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">CRYPTOGRAPHIC EMAIL</span>
              <div className="text-base font-mono text-emerald-400 mt-1 truncate">{user?.email || 'citizen@node.aegisroute'}</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/50 border border-white/5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">GOVERNMENT LINKED ID (MASKED)</span>
              <div className="text-base font-mono text-zinc-300 mt-1 flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-emerald-400" /> UID-IN-****-****-8842
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-black/50 border border-white/5">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">NODE SECURITY LEVEL</span>
              <div className="text-base font-mono text-emerald-400 mt-1 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Hardware-Backed TPM 2.0
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <Award className="w-4 h-4 text-emerald-400" /> Badge: <span className="text-white font-bold">First Responder Contributor</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Verification Validated
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
