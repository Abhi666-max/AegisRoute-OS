'use client';
import { Settings, ShieldAlert, KeyRound, Activity, Check, X, Lock, Users, Globe, Database, UserPlus, HardDriveDownload, Server } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsPage() {
  const [bio2FA, setBio2FA] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState(false);
  const [geoLock, setGeoLock] = useState(true);
  const [yubiKey, setYubiKey] = useState(false);
  const [activeMenu, setActiveMenu] = useState('personnel');
  
  const [actionModal, setActionModal] = useState({ isOpen: false, loading: false, success: false, message: '' });
  
  const rotationLogs = [
    { hash: 'SHA-256: 0x8F4A9B2E...99BC', time: '10:45 AM, Jun 8' },
    { hash: 'SHA-256: 0x3C9F1A0B...9D4E', time: '02:12 AM, May 15' },
    { hash: 'SHA-256: 0x7B2D5F8C...1A0B', time: '11:30 PM, Apr 22' },
  ];

  const handleAction = (message: string, duration: number = 2000, loadingMsg: string = 'Propagating zero-knowledge keys...') => {
    setActionModal({ isOpen: true, loading: true, success: false, message: loadingMsg });
    setTimeout(() => {
      setActionModal({ isOpen: true, loading: false, success: true, message: message });
    }, duration);
  };

  const Toggle = ({ active, onClick }: { active: boolean, onClick: () => void }) => (
    <button 
      onClick={onClick}
      className={`w-14 h-7 rounded-full transition-colors duration-300 relative shadow-inner shrink-0 ${active ? 'bg-emerald-500' : 'bg-zinc-800'}`}
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
    <div className="p-8 min-h-screen bg-[#000000] text-white flex flex-col md:flex-row gap-8 transition-all duration-300">
      
      {/* Settings Sidebar */}
      <div className="w-full md:w-64 flex flex-col gap-2 shrink-0">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4 px-3">Configuration</h2>
        {[
          { id: 'personnel', label: 'Personnel', icon: Users },
          { id: 'network', label: 'Network Grid', icon: Globe },
          { id: 'database', label: 'Database Sync', icon: Database },
          { id: 'crypto', label: 'Cryptography', icon: KeyRound },
          { id: 'security', label: 'Security & Access', icon: ShieldAlert },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${activeMenu === item.id ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'}`}
          >
            <item.icon className={`w-4 h-4 transition-colors ${activeMenu === item.id ? 'text-emerald-500' : ''}`} />
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
                className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl w-full max-w-md text-center shadow-[0_0_80px_rgba(0,0,0,0.8)]"
              >
                {actionModal.loading ? (
                  <div className="flex flex-col items-center gap-8">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
                      <Lock className="w-8 h-8 text-emerald-500 animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-white mb-2">{actionModal.message}</h2>
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
                      className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg"
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
          
          {/* Personnel View */}
          {activeMenu === 'personnel' && (
            <motion.div 
              key="personnel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tighter text-white mb-2">Oversight Access Control</h1>
                  <p className="text-zinc-500 text-sm">Manage high-clearance administrators and Super-Admin tokens.</p>
                </div>
                <button 
                  onClick={() => handleAction('Super-Admin Invite Sent Successfully', 1500, 'Generating secure invitation token...')}
                  className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-500 px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" /> Invite Super-Admin
                </button>
              </div>
              
              <div className="border border-zinc-800 rounded-2xl bg-zinc-900 p-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between group mb-6">
                  <div>
                    <h4 className="text-base font-semibold text-white group-hover:text-emerald-500 transition-colors">Require YubiKey/Hardware 2FA</h4>
                    <p className="text-sm text-zinc-500 mt-1">Enforce physical hardware keys for all Super-Admin accounts.</p>
                  </div>
                  <Toggle active={yubiKey} onClick={() => setYubiKey(!yubiKey)} />
                </div>

                <div className="overflow-x-auto border-t border-zinc-800 pt-6">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-[#000000]/50 text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-800">
                      <tr>
                        <th className="px-4 py-3 font-medium">Administrator</th>
                        <th className="px-4 py-3 font-medium">Clearance Level</th>
                        <th className="px-4 py-3 font-medium">Hardware 2FA</th>
                        <th className="px-4 py-3 font-medium text-right">Last Login</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
                      <tr className="hover:bg-zinc-800/50 transition-colors">
                        <td className="px-4 py-4 font-medium text-white">Abhijeet K. <span className="text-zinc-500 font-normal ml-1">abhi@aegis.gov</span></td>
                        <td className="px-4 py-4"><span className="bg-red-500/10 text-red-500 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-widest border border-red-500/20">God-Mode</span></td>
                        <td className="px-4 py-4 text-emerald-500"><Check className="w-4 h-4" /></td>
                        <td className="px-4 py-4 text-right text-xs text-zinc-500 font-mono">Current Session</td>
                      </tr>
                      <tr className="hover:bg-zinc-800/50 transition-colors">
                        <td className="px-4 py-4 font-medium text-white">Security Ops <span className="text-zinc-500 font-normal ml-1">secops@aegis.gov</span></td>
                        <td className="px-4 py-4"><span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-widest border border-emerald-500/20">Super-Admin</span></td>
                        <td className="px-4 py-4 text-emerald-500"><Check className="w-4 h-4" /></td>
                        <td className="px-4 py-4 text-right text-xs text-zinc-500 font-mono">2 days ago</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Network Grid View */}
          {activeMenu === 'network' && (
            <motion.div 
              key="network"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-3xl font-bold tracking-tighter text-white mb-2">Geo-Fencing & IP Rules</h1>
                <p className="text-zinc-500 text-sm">Control regional access and infrastructure edge-routing.</p>
              </div>

              <div className="border border-zinc-800 rounded-2xl bg-zinc-900 p-8 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between group mb-8 border-b border-zinc-800 pb-8">
                  <div>
                    <h4 className="text-base font-semibold text-white group-hover:text-emerald-500 transition-colors">Strict BIMSTEC Geo-Lock</h4>
                    <p className="text-sm text-zinc-500 mt-1">Block all network requests originating outside of authorized South Asian jurisdictions.</p>
                  </div>
                  <Toggle active={geoLock} onClick={() => setGeoLock(!geoLock)} />
                </div>

                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">Whitelisted Government IP Blocks</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['164.100.0.0/16 (India NIC)', '103.247.238.0/24 (Bangladesh Gov)', '222.165.160.0/20 (Sri Lanka Gov)', '202.79.32.0/20 (Nepal Gov)'].map((ip, i) => (
                      <div key={i} className="bg-[#000] border border-zinc-800 p-3 rounded-lg flex items-center justify-between">
                        <span className="text-xs font-mono text-zinc-300">{ip}</span>
                        <Check className="w-4 h-4 text-emerald-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Database Sync View */}
          {activeMenu === 'database' && (
            <motion.div 
              key="database"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-3xl font-bold tracking-tighter text-white mb-2">Database Sync Grid</h1>
                <p className="text-zinc-500 text-sm">Monitor multi-region database replication and Vector sync.</p>
              </div>

              <div className="border border-zinc-800 rounded-2xl bg-zinc-900 p-8 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center py-16">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
                
                <div className="flex items-center gap-6 mb-8 w-full max-w-md justify-between">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-2xl bg-[#000] border border-zinc-800 flex items-center justify-center">
                      <Database className="w-8 h-8 text-amber-500" />
                    </div>
                    <span className="text-xs font-mono text-zinc-400">Firestore (Live)</span>
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-full h-px bg-zinc-800 relative">
                       <motion.div 
                         className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-emerald-500 -translate-y-1/2 shadow-[0_0_10px_#10b981]"
                         animate={{ x: [0, 160] }}
                         transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                       />
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border border-emerald-500/20 mt-4 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> SYNCED
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-2xl bg-[#000] border border-zinc-800 flex items-center justify-center">
                      <Server className="w-8 h-8 text-blue-500" />
                    </div>
                    <span className="text-xs font-mono text-zinc-400">Postgres Vector</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleAction('Snapshot Created Successfully', 2500, 'Generating global database snapshot...')}
                  className="bg-[#000] hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 text-white px-6 py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-lg flex items-center justify-center gap-3 w-full max-w-md mt-6"
                >
                  <HardDriveDownload className="w-5 h-5" /> Trigger Manual Snapshot
                </button>
              </div>
            </motion.div>
          )}

          {/* Cryptography View */}
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
                <p className="text-zinc-500 text-sm">Manage master encryption keys and security hashes.</p>
              </div>

              <div className="border border-red-900/30 rounded-2xl bg-zinc-900 p-8 shadow-2xl relative overflow-hidden">
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
                    onClick={() => handleAction('AES-256 Keys Rotated Successfully', 3000, 'Propagating zero-knowledge keys across mesh...')} 
                    className="w-full bg-red-600 hover:bg-red-500 text-white px-8 py-5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] flex items-center justify-center gap-3"
                  >
                    <RefreshCw className="w-5 h-5" /> Execute Key Rotation
                  </button>

                  <div className="mt-10 pt-8 border-t border-zinc-800">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-6">Key Ledger (Recent Rotations)</h3>
                    <div className="space-y-3">
                      {rotationLogs.map((log, i) => (
                        <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-[#000] border border-zinc-800 hover:border-zinc-700 transition-colors">
                          <div className="flex items-center gap-3">
                            <ShieldAlert className="w-4 h-4 text-zinc-500" />
                            <span className="text-sm font-mono text-emerald-500">{log.hash}</span>
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

          {/* Security View */}
          {activeMenu === 'security' && (
            <motion.div 
              key="security"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-3xl font-bold tracking-tighter text-white mb-2">Security Protocols</h1>
                <p className="text-zinc-500 text-sm">Global access requirements and enforcement policies.</p>
              </div>
              
              <div className="border border-zinc-800 rounded-2xl bg-zinc-900 p-8 shadow-2xl relative overflow-hidden">
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
                      <h4 className="text-base font-semibold text-white group-hover:text-emerald-500 transition-colors">Strict IP Whitelisting</h4>
                      <p className="text-sm text-zinc-500 mt-1">Block all traffic originating outside of authorized zones.</p>
                    </div>
                    <Toggle active={ipWhitelist} onClick={() => setIpWhitelist(!ipWhitelist)} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
