'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { auth } from '@/lib/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function Navbar() {
  const { user, userData, initializeAuth, setAuthModalOpen } = useAuthStore();
  const router = useRouter();

  const handleFounderLogin = async () => {
    try {
      const passcode = window.prompt('ENTER FOUNDER OVERRIDE KEY:');
      if (passcode === 'Admin@AegisRoute2026') {
        await signInWithEmailAndPassword(auth, 'abhi.admin.dev@gmail.com', passcode);
        toast.success('God Mode Unlocked');
        router.push('/admin');
      } else {
        toast.error('Clearance Denied');
      }
    } catch (error) {
      toast.error("Founder bypass failed.");
    }
  };

  const getDashboardRoute = () => {
    if (user?.email === 'abhi.admin.dev@gmail.com') return '/admin';
    return '/authority';
  };

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe();
  }, [initializeAuth]);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 w-full z-[8000] bg-black/60 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 border border-zinc-800 bg-zinc-950 rounded-lg group-hover:border-zinc-700 transition-colors">
            <Shield className="text-white w-5 h-5" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-white">
            AegisRoute
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-300">
          <Link href="/#solutions" scroll={true} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Solutions</Link>
          <Link href="/developers" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">IaaS API</Link>
          {user ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
              <UserIcon size={14} className="text-zinc-400" />
              <span className="text-white text-xs font-medium capitalize">
                {userData?.role || 'User'}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button onClick={() => setAuthModalOpen(true)} className="hover:text-white transition-colors">Login</button>
              <button onClick={handleFounderLogin} className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 hover:border-red-500/50 transition-all text-xs font-semibold text-zinc-400 hover:text-white">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/> Founder
              </button>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          {user && (
            <button 
              onClick={() => auth.signOut()}
              className="text-sm font-medium text-gray-400 hover:text-red-400 transition-colors"
            >
              Sign Out
            </button>
          )}
          {user ? (
            <Link 
              href={getDashboardRoute()}
              className="relative inline-flex h-9 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-zinc-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Enter Dashboard
              </span>
            </Link>
          ) : (
            <button 
              onClick={() => toast.success("Demo request queued. Our Enterprise Sales team will contact you.", { style: { background: '#000000', color: '#ffffff', border: '1px solid #333333' } })}
              className="px-4 py-1.5 text-sm font-medium border border-zinc-700 rounded-md bg-zinc-900 text-zinc-300 hover:bg-white hover:text-black transition-all"
            >
              Request Enterprise Demo
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
