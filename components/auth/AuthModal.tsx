'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, User as UserIcon, Building2 } from 'lucide-react';
import { auth, db } from '@/lib/firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDocFromServer } from 'firebase/firestore';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function AuthModal() {
  const { isAuthModalOpen: isOpen, setAuthModalOpen } = useAuthStore();
  const router = useRouter();
  const onClose = () => {
    setAuthModalOpen(false);
    setStep('selection');
  };
  
  const [step, setStep] = useState<'selection' | 'form'>('selection');
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'citizen' | 'authority'>('citizen');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let fetchedRole = role;
      if (isLogin) {
        const loginPromise = signInWithEmailAndPassword(auth, email, password);
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timeout. Retrying...')), 5000));
        const userCredential = await Promise.race([loginPromise, timeoutPromise]) as any;
        const user = userCredential.user;
        
        if (email.includes('@gov.in')) {
          setLoading(false);
          window.location.href = '/authority';
          return;
        } else if (email === 'abhi.admin.dev@gmail.com') {
          setLoading(false);
          window.location.href = '/admin';
          return;
        }
        
        fetchedRole = 'citizen';
        try {
          const docSnap = await getDocFromServer(doc(db, 'users', user.uid));
          if (docSnap.exists()) {
            fetchedRole = docSnap.data().role || 'citizen';
          }
        } catch (e: any) {
           console.warn("Could not fetch user role, defaulting to citizen:", e.message);
        }
      } else {
        const registerPromise = createUserWithEmailAndPassword(auth, email, password);
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timeout. Retrying...')), 5000));
        const userCredential = await Promise.race([registerPromise, timeoutPromise]) as any;
        const user = userCredential.user;
        
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          name,
          role,
          department: role === 'authority' ? department : null,
          createdAt: Date.now()
        });

        if (role === 'authority' || email.includes('@gov.in')) {
          setLoading(false);
          window.location.href = '/authority';
          return;
        }
      }

      onClose();

      // Strict Routing Logic (Fallback)
      if (fetchedRole.toLowerCase() === 'authority' || email.includes('@gov.in')) {
        toast.success('Authority Node Authenticated. Connecting to Mesh...', { icon: '🏛️' });
        window.location.href = '/authority'; // Use window.location to bypass Next.js cache lag
      } else if (email === 'abhi.admin.dev@gmail.com' || fetchedRole === 'admin') {
        window.location.href = '/admin';
      } else {
        toast.success('Citizen Identity Verified.', { icon: '✅' });
        window.location.href = '/';
      }
    } catch (err: any) {
      toast.error('Connection timeout. Retrying...');
    } finally {
      setLoading(false); // CRITICAL: Stop the spinner no matter what
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleOpen = () => setAuthModalOpen(true);
    document.addEventListener('open-auth-modal', handleOpen);
    return () => document.removeEventListener('open-auth-modal', handleOpen);
  }, [setAuthModalOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/90 backdrop-blur-xl w-screen h-screen">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#050505] border border-zinc-800 rounded-2xl p-8 shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-50 text-gray-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {step === 'selection' ? (
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center mb-6">
                  <ShieldCheck className="text-white w-8 h-8" />
                </div>
                <h2 className="text-3xl font-semibold tracking-tighter text-white mb-2">
                  Choose Your Ecosystem Identity
                </h2>
                <p className="text-zinc-500 mb-8">Select your operational clearance level.</p>
                
                <div className="grid grid-cols-1 gap-4 w-full">
                  <button 
                    onClick={() => { setRole('citizen'); setStep('form'); }}
                    className="relative group p-6 border border-zinc-800 rounded-xl bg-zinc-950 hover:bg-zinc-900 transition-all text-left overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <UserIcon className="w-6 h-6 text-emerald-400 mb-3" />
                    <h3 className="text-lg font-bold text-white tracking-tight">Citizen Reporter</h3>
                    <p className="text-sm text-zinc-500 mt-1">Access civilian tools and report road hazards.</p>
                  </button>
                  
                  <button 
                    onClick={() => { setRole('authority'); setStep('form'); }}
                    className="relative group p-6 border border-zinc-800 rounded-xl bg-zinc-950 hover:bg-zinc-900 transition-all text-left overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <Building2 className="w-6 h-6 text-cyan-400 mb-3" />
                    <h3 className="text-lg font-bold text-white tracking-tight">Regional Authority</h3>
                    <p className="text-sm text-zinc-500 mt-1">Access the government intelligence dashboard.</p>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold tracking-tighter text-white">
                    {isLogin ? 'Authenticate Session' : 'Create Identity'}
                  </h2>
                  <p className="text-sm text-zinc-500 mt-1 uppercase tracking-widest font-mono">
                    {role === 'authority' ? 'Authority Portal' : 'Citizen Access'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {!isLogin && (
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase text-zinc-500 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white text-sm outline-none focus:border-emerald-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-zinc-500 mb-1.5">
                      {role === 'authority' ? 'Government Email' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white text-sm outline-none focus:border-emerald-500 transition-colors"
                      placeholder={role === 'authority' ? 'name@gov.in' : 'user@example.com'}
                    />
                  </div>
                  
                  {!isLogin && role === 'authority' && (
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase text-zinc-500 mb-1.5">Department</label>
                      <input
                        type="text"
                        required
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white text-sm outline-none focus:border-emerald-500 transition-colors"
                        placeholder="Traffic Police / PWD"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-zinc-500 mb-1.5">Secure Password</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-white text-sm outline-none focus:border-emerald-500 transition-colors"
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : (
                      isLogin ? 'Authenticate' : 'Register'
                    )}
                  </button>
                </form>

                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={() => setStep('selection')}
                    className="text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-widest font-mono"
                    type="button"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-widest font-mono"
                    type="button"
                  >
                    {isLogin ? "Need an account?" : 'Have an account?'}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
