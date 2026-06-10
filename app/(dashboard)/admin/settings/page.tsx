'use client';
import { Settings, ShieldAlert, KeyRound, Activity, Check, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsPage() {
  const [bio2FA, setBio2FA] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState(false);
  const [actionModal, setActionModal] = useState({ isOpen: false, loading: false, success: false, message: '' });
  
  const rotationLogs = [
    { hash: 'SHA-256: 8f4a9b2e...5c1d', time: '10:45 AM, Jun 8' },
    { hash: 'SHA-256: 3c9f1a0b...9d4e', time: '02:12 AM, May 15' },
    { hash: 'SHA-256: 7b2d5f8c...1a0b', time: '11:30 PM, Apr 22' },
  ];

  const handleRotate = () => {
    setActionModal({ isOpen: true, loading: true, success: false, message: 'Initiating Key Rotation...' });
    setTimeout(() => {
      setActionModal({ isOpen: true, loading: false, success: true, message: 'AES-256 Keys Rotated Successfully' });
    }, 1500);
  };

  return (
    <div className="p-8 min-h-screen bg-[#020202] text-white">
      <div className="flex items-center gap-3 mb-2">
        <Settings className="w-8 h-8 text-emerald-500" />
        <h1 className="text-3xl font-bold tracking-tighter text-emerald-500">Founder Security Settings</h1>
      </div>
      <p className="text-zinc-500 mb-8">Manage strict global mesh security rules and cryptography.</p>
      
      <AnimatePresence>
        {actionModal.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#050505] border border-zinc-800 p-8 rounded-2xl w-full max-w-md text-center shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
              {actionModal.loading ? (
                <div className="flex flex-col items-center gap-6">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-red-500 rounded-full border-t-transparent animate-spin"></div>
                    <KeyRound className="w-6 h-6 text-red-500 animate-pulse" />
                  </div>
                  <h2 className="text-xl font-semibold tracking-tight text-white">{actionModal.message}</h2>
                  <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase">Propagating new keys across mesh...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center bg-emerald-500/20 text-emerald-500"
                  >
                    <Check className="w-8 h-8" />
                  </motion.div>
                  <h2 className="text-xl font-semibold tracking-tight text-white">{actionModal.message}</h2>
                  <button 
                    onClick={() => setActionModal({ isOpen: false, loading: false, success: false, message: '' })}
                    className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-white font-semibold transition-all mt-2"
                  >
                    Acknowledge
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-3xl space-y-8 relative z-10">
        <div className="border border-zinc-800 rounded-2xl bg-[#050505] p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-800">
            <ShieldAlert className="w-5 h-5 text-zinc-400" />
            <h2 className="text-sm font-semibold tracking-tighter text-zinc-200">Access Protocols</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-white">Biometric 2FA Enforcement</h4>
                <p className="text-xs text-zinc-500 mt-1 font-mono">Require FaceID/TouchID upon every active login.</p>
              </div>
              <button 
                onClick={() => setBio2FA(!bio2FA)}
                className={`w-12 h-6 rounded-full transition-colors relative shadow-inner ${bio2FA ? 'bg-emerald-500' : 'bg-zinc-800'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow-md ${bio2FA ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-white">Strict IP Whitelisting (BIMSTEC)</h4>
                <p className="text-xs text-zinc-500 mt-1 font-mono">Block all traffic originating outside of authorized zones.</p>
              </div>
              <button 
                onClick={() => setIpWhitelist(!ipWhitelist)}
                className={`w-12 h-6 rounded-full transition-colors relative shadow-inner ${ipWhitelist ? 'bg-emerald-500' : 'bg-zinc-800'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow-md ${ipWhitelist ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </div>

        <div className="border border-red-900/30 rounded-2xl bg-red-950/10 p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="flex items-center gap-3 mb-4">
            <KeyRound className="w-5 h-5 text-red-500" />
            <h2 className="text-sm font-semibold tracking-tighter text-red-500">Cryptography Control</h2>
          </div>
          <p className="text-xs text-red-500/70 font-mono mb-6 max-w-2xl">
            Master encryption keys secure the entire BIMSTEC data grid. Rotating keys will temporarily disconnect all nodes and force re-authentication across the mesh.
          </p>
          <button 
            onClick={handleRotate} 
            className="w-full bg-red-600 hover:bg-red-500 text-white px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] flex items-center justify-center"
          >
            Rotate Master Encryption Keys
          </button>

          <div className="mt-8 border-t border-red-900/30 pt-6">
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-4">Key Rotation Log</h3>
            <div className="space-y-3">
              {rotationLogs.map((log, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded bg-zinc-950/50 border border-zinc-800">
                  <span className="text-xs font-mono text-zinc-400">{log.hash}</span>
                  <span className="text-[10px] text-zinc-600 uppercase font-mono">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
