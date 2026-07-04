'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase/config';
import { User } from 'firebase/auth';
import { motion } from 'framer-motion';

export default function CitizenLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      if (!u) {
        window.location.href = '/';
      } else {
        setUser(u);
        setChecking(false);
      }
    });
    const timer = setTimeout(() => {
      if (auth.currentUser) {
        setUser(auth.currentUser);
        setChecking(false);
      } else if (checking) {
        window.location.href = '/';
      }
    }, 400);
    return () => { unsub(); clearTimeout(timer); };
  }, []);

  if (checking || !user) {
    return (
      <div className="fixed inset-0 z-[99999] bg-[#050b14] flex flex-col items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-16 h-16 rounded-full border-4 border-t-emerald-400 border-r-emerald-400 border-b-transparent border-l-transparent animate-spin"
        />
        <div className="mt-8 text-emerald-400 font-mono tracking-widest text-sm uppercase animate-pulse">
          Verifying Citizen Identity Node...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {children}
    </div>
  );
}
