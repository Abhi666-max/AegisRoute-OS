'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';
import { auth, db } from '@/lib/firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthStore } from '@/store/useAuthStore';

export function AuthModal() {
  const { isAuthModalOpen: isOpen, setAuthModalOpen } = useAuthStore();
  const onClose = () => setAuthModalOpen(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'citizen' | 'authority'>('citizen');
  const [country, setCountry] = useState('India');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const bimstecCountries = ['India', 'Bangladesh', 'Bhutan', 'Myanmar', 'Nepal', 'Sri Lanka', 'Thailand'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          role,
          country,
          createdAt: Date.now()
        });
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-2xl">
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
            className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl p-8 shadow-2xl"
          >
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-2">
              <div className="flex flex-col items-center text-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center">
                  <ShieldCheck className="text-white w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tighter text-white">
                    {isLogin ? 'Enterprise Login' : 'Secure Registration'}
                  </h2>
                  <p className="text-sm text-zinc-400 mt-2">
                    {isLogin ? 'Access your AegisRoute dashboard.' : 'Join the civic intelligence network.'}
                  </p>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Work Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-4 py-2.5 text-white outline-none focus:border-zinc-500 transition-colors"
                    placeholder="user@gov.in"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Secure Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-4 py-2.5 text-white outline-none focus:border-zinc-500 transition-colors"
                    placeholder="••••••••"
                  />
                </div>

                {!isLogin && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1.5">Clearance Level (Role)</label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as any)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-4 py-2.5 text-white outline-none focus:border-zinc-500 transition-colors"
                      >
                        <option value="citizen">Citizen Reporter</option>
                        <option value="authority">Government Authority</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1.5">Operating Region (BIMSTEC)</label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-4 py-2.5 text-white outline-none focus:border-zinc-500 transition-colors"
                      >
                        {bimstecCountries.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full py-2.5 bg-white text-black font-medium text-sm rounded-md hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    isLogin ? 'Authenticate Session' : 'Create Identity'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                  type="button"
                >
                  {isLogin ? "Don't have an enterprise identity? Register" : 'Already have an identity? Login'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
