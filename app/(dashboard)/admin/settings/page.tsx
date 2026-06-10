'use client';
import { Settings, ShieldAlert, KeyRound, Activity, Check, X, Lock, Users, Globe, Database } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsPage() {
  const [bio2FA, setBio2FA] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState(false);
  const [activeMenu, setActiveMenu] = useState('security');
  
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
    }, 2000);
  };

  const Toggle = ({ active, onClick }: { active: boolean, onClick: () => void }) => (
    <button 
      onClick={onClick}
      className={`w-14 h-7 rounded-full transition-colors duration-300 relative shadow-inner ${active ? 'bg-emerald-500' : 'bg-zinc-800'}`}
    >
      <motion.div 
        layout
        initial={false}
        animate={{ x: active ? 28 : 4 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="w-5 h-5 bg-white rounded-full absolute top-1 shadow-md" 
      />
    </button>
  );

  return (
    <div className="p-8 min-h-screen bg-[#020202] text-white flex gap-8 transition-all duration-300">
      
      {/* Settings Sidebar */}
      <div className="w-64 flex flex-col gap-2 shrink-0">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4 px-3">Configuration</h2>
        {[
          { id: 'security', label: 'Security & Access', icon: ShieldAlert },
          { id: 'crypto', label: 'Cryptography', icon: KeyRound },
          { id: 'network', label: 'Network Grid', icon: Globe },
          { id: 'database', label: 'Database Sync', icon: Database },
          { id: 'users', label: 'Personnel', icon: Users },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${activeMenu === item.id ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-950'}`}
          >
            <item.icon className={`w-4 h-4 ${activeMenu === item.id ? 'text-emerald-500' : ''}`} />
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-4xl relative">
        <AnimatePresence>
          {actionModal.isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 transition-all duration-300"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-[#050505] border border-zinc-800 p-10 rounded-3xl w-full max-w-md text-center shadow-[0_0_80px_rgba(0,0,0,0.8)]"
              >
                {actionModal.loading ? (
                  <div className="flex flex-col items-center gap-8">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-red-500 rounded-full border-t-transparent animate-spin"></div>
                      <Lock className="w-8 h-8 text-red-500 animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-white mb-2">{actionModal.message}</h2>
                      <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase">Propagating zero-knowledge keys...</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-8">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                    >
                      <Check className="w-10 h-10" />
                    </motion.div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">{actionModal.message}</h2>
                    <button 
                      onClick={() => setActionModal({ isOpen: false, loading: false, success: false, message: '' })}
                      className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Acknowledge
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {activeMenu === 'security' && (
            <motion.div 
              key="security"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-3xl font-bold tracking-tighter text-white mb-2">Security & Access</h1>
                <p className="text-zinc-500">Manage strict global mesh security rules and access protocols.</p>
              </div>
              
              <div className="border border-zinc-800 rounded-2xl bg-[#050505] p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>
                
                <div className="space-y-8 relative z-10">
                  <div className="flex items-center justify-between group">
                    <div>
                      <h4 className="text-base font-semibold text-white group-hover:text-emerald-500 transition-colors">Biometric 2FA Enforcement</h4>
                      <p className="text-sm text-zinc-500 mt-1">Require FaceID/TouchID upon every active login.</p>
                    </div>
                    <Toggle active={bio2FA} onClick={() => setBio2FA(!bio2FA)} />
                  </div>
                  
                  <div className="h-px bg-zinc-800/50 w-full"></div>
                  
                  <div className="flex items-center justify-between group">
                    <div>
                      <h4 className="text-base font-semibold text-white group-hover:text-emerald-500 transition-colors">Strict IP Whitelisting (BIMSTEC)</h4>
                      <p className="text-sm text-zinc-500 mt-1">Block all traffic originating outside of authorized zones.</p>
                    </div>
                    <Toggle active={ipWhitelist} onClick={() => setIpWhitelist(!ipWhitelist)} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeMenu === 'crypto' && (
            <motion.div 
              key="crypto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-3xl font-bold tracking-tighter text-white mb-2">Cryptography Control</h1>
                <p className="text-zinc-500">Manage master encryption keys and security hashes.</p>
              </div>

              <div className="border border-red-900/30 rounded-2xl bg-[#050505] p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[120px] rounded-full pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-500/10 rounded-lg">
                      <KeyRound className="w-6 h-6 text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tighter text-red-500">Master Key Rotation</h2>
                  </div>
                  <p className="text-sm text-zinc-400 mb-8 max-w-2xl leading-relaxed">
                    Master encryption keys secure the entire BIMSTEC data grid. Rotating keys will temporarily disconnect all nodes and force re-authentication across the mesh. This action is heavily audited.
                  </p>
                  <button 
                    onClick={handleRotate} 
                    className="w-full bg-red-600 hover:bg-red-500 text-white px-8 py-5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] flex items-center justify-center gap-3"
                  >
                    <RefreshCw className="w-5 h-5" /> Execute Key Rotation
                  </button>

                  <div className="mt-10 pt-8 border-t border-zinc-800">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-6">Key Rotation Log</h3>
                    <div className="space-y-3">
                      {rotationLogs.map((log, i) => (
                        <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 transition-colors">
                          <div className="flex items-center gap-3">
                            <ShieldAlert className="w-4 h-4 text-zinc-500" />
                            <span className="text-sm font-mono text-zinc-300">{log.hash}</span>
                          </div>
                          <span className="text-xs text-zinc-500 uppercase font-mono tracking-wider">{log.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Placeholders for other menus */}
          {['network', 'database', 'users'].includes(activeMenu) && (
            <motion.div 
              key="placeholder"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center h-96 border border-dashed border-zinc-800 rounded-2xl bg-[#050505]"
            >
              <Settings className="w-10 h-10 text-zinc-700 mb-4 animate-spin-slow" />
              <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Module under construction</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
