'use client';
import { Settings, ShieldAlert, KeyRound } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [bio2FA, setBio2FA] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState(false);
  const [rateLimit, setRateLimit] = useState(true);

  return (
    <div className="p-8 min-h-screen bg-[#020202] text-white">
      <div className="flex items-center gap-3 mb-2">
        <Settings className="w-8 h-8 text-emerald-500" />
        <h1 className="text-3xl font-bold tracking-tighter text-emerald-500">Founder Security Settings</h1>
      </div>
      <p className="text-zinc-500 mb-8">Manage strict global mesh security rules and cryptography.</p>
      
      <div className="max-w-3xl space-y-8">
        <div className="border border-zinc-800 rounded-2xl bg-[#050505] p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-800">
            <ShieldAlert className="w-5 h-5 text-zinc-400" />
            <h2 className="text-sm font-semibold tracking-tighter text-zinc-200">Access Protocols</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-white">Enforce Biometric 2FA for Authorities</h4>
                <p className="text-xs text-zinc-500 mt-1 font-mono">Require FaceID/TouchID upon every active login.</p>
              </div>
              <button 
                onClick={() => setBio2FA(!bio2FA)}
                className={`w-12 h-6 rounded-full transition-colors relative ${bio2FA ? 'bg-emerald-500' : 'bg-zinc-800'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${bio2FA ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-white">Strict IP Whitelisting (BIMSTEC Region Only)</h4>
                <p className="text-xs text-zinc-500 mt-1 font-mono">Block all traffic originating outside of authorized zones.</p>
              </div>
              <button 
                onClick={() => setIpWhitelist(!ipWhitelist)}
                className={`w-12 h-6 rounded-full transition-colors relative ${ipWhitelist ? 'bg-emerald-500' : 'bg-zinc-800'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${ipWhitelist ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-white">Global Rate Limiting (1000 req/s)</h4>
                <p className="text-xs text-zinc-500 mt-1 font-mono">Aggressively throttle excessive requests per node.</p>
              </div>
              <button 
                onClick={() => setRateLimit(!rateLimit)}
                className={`w-12 h-6 rounded-full transition-colors relative ${rateLimit ? 'bg-emerald-500' : 'bg-zinc-800'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${rateLimit ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </div>

        <div className="border border-red-900/30 rounded-2xl bg-red-950/10 p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <KeyRound className="w-5 h-5 text-red-500" />
            <h2 className="text-sm font-semibold tracking-tighter text-red-500">Cryptography</h2>
          </div>
          <p className="text-xs text-red-500/70 font-mono mb-6">Master encryption keys secure the entire BIMSTEC data grid. Rotating keys will temporarily disconnect all nodes.</p>
          <button className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)]">
            Rotate Master Encryption Keys
          </button>
        </div>
      </div>
    </div>
  );
}
