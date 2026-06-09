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
import { DemoModal } from '@/components/ui/DemoModal';

export function Navbar() {
  const { user, userData, initializeAuth, setAuthModalOpen } = useAuthStore();
  const router = useRouter();
  const [isDemoOpen, setIsDemoOpen] = useState(false);



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
            <>
              {(userData?.role === 'citizen' && user.email !== 'abhi.admin.dev@gmail.com') ? (
                <motion.div whileHover="hover" className="relative cursor-pointer z-50">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
                    <UserIcon size={14} className="text-zinc-400" />
                    <span className="text-white text-xs font-medium capitalize">Citizen</span>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10, pointerEvents: 'none' }}
                    variants={{ hover: { opacity: 1, y: 0, pointerEvents: 'auto' } }}
                    className="absolute right-0 top-full mt-2 w-64 bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl"
                  >
                    <p className="text-white text-sm font-semibold truncate">{user.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-xs text-emerald-500 font-mono">Live Sync Active</span>
                    </div>
                    <p className="text-xs text-zinc-500 font-mono mt-3">Current Node:<br/>Dhumalwadi, MH (18.1, 73.2)</p>
                  </motion.div>
                </motion.div>
              ) : (
                <Link 
                  href={getDashboardRoute()}
                  className="relative inline-flex h-9 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-50"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-zinc-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Enter Dashboard
                  </span>
                </Link>
              )}
              <button 
                onClick={() => { auth.signOut(); router.push('/'); }}
                className="text-sm font-medium text-gray-400 hover:text-red-400 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (


            <button 
              onClick={() => setIsDemoOpen(true)}
              className="px-4 py-1.5 text-sm font-medium border border-zinc-700 rounded-md bg-zinc-900 text-zinc-300 hover:bg-white hover:text-black transition-all"
            >
              Request Enterprise Demo
            </button>
          )}
        </div>
      </div>
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </motion.nav>
  );
}
