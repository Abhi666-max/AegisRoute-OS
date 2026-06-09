'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { auth } from '@/lib/firebase/config';
import { toast } from 'sonner';

export function Navbar() {
  const { user, userData, initializeAuth, setAuthModalOpen } = useAuthStore();

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
            <button onClick={() => setAuthModalOpen(true)} className="hover:text-white transition-colors">Login</button>
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
              href="/dashboard" 
              className="px-4 py-1.5 text-sm font-medium border border-zinc-700 rounded-md bg-zinc-900 text-zinc-300 hover:bg-white hover:text-black transition-all"
            >
              Enter Dashboard
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
