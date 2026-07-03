'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { auth } from '@/lib/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';

export function Navbar() {
  const { user, userData, initializeAuth, setAuthModalOpen, setDemoModalOpen } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const getDashboardInfo = () => {
    if (user?.email === 'abhi.admin.dev@gmail.com' || userData?.role?.toUpperCase() === 'SUPER_ADMIN') {
      return { label: 'God Mode Vault', route: '/admin' };
    }
    if (userData?.role?.toLowerCase() === 'authority' || user?.email?.endsWith('@gov.in')) {
      return { label: 'Command Center', route: '/authority' };
    }
    return { label: 'Citizen Portal', route: '/citizen' };
  };

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe();
  }, [initializeAuth]);

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/authority') || pathname?.startsWith('/citizen') || pathname?.startsWith('/godmode')) return null;

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
          <Link href="/developers" onClick={(e) => { if (!user) { e.preventDefault(); document.dispatchEvent(new CustomEvent('open-auth-modal')); } }} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">IaaS API</Link>
          {!user && (
            <div className="flex items-center gap-4">
              <button onClick={() => setAuthModalOpen(true)} className="hover:text-white transition-colors">Login</button>
              <Link href="/godmode" className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 hover:border-red-500/50 transition-all text-xs font-semibold text-zinc-400 hover:text-white">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/> Founder
              </Link>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link 
                href={getDashboardInfo().route}
                className="relative inline-flex h-9 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#1d4ed8_50%,#3b82f6_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-zinc-950 px-5 py-1 text-sm font-semibold text-white backdrop-blur-3xl hover:bg-zinc-900 transition-colors">
                  {getDashboardInfo().label}
                </span>
              </Link>
              <button 
                onClick={() => { auth.signOut(); router.push('/'); }}
                className="px-3 py-1.5 text-xs font-semibold rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-red-400 hover:border-red-500/30 transition-all"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setAuthModalOpen(true)}
              className="px-5 py-1.5 text-sm font-semibold border border-zinc-700 rounded-full bg-white text-black hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              Login / Start for Free
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
