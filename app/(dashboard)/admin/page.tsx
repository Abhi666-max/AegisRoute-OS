'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Activity, Zap, LogOut, Radio, Check, X } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (user && user.email !== 'abhi.admin.dev@gmail.com') {
      toast.error('Clearance Denied. Intrusion logged.');
      router.push('/');
    }
  }, [user, router]);

  if (!mounted || !user) return <div className="min-h-screen bg-black" />;

  const handleLogout = async () => {
    await auth.signOut();
    window.location.href = '/';
  };

  const toggleAccess = (id: string, currentStatus: boolean) => {
    toast.success(`System access ${currentStatus ? 'revoked' : 'granted'} for user ${id}`);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-zinc-300 font-sans flex flex-col md:flex-row">
      
      {/* Sidebar/Nav */}
      <aside className="w-full md:w-64 bg-[#050505] border-r border-zinc-800 flex flex-col pt-20">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-emerald-500" />
            <span className="font-semibold text-white tracking-tight">OVERSIGHT</span>
          </div>
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Global Mesh Control</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 bg-zinc-900/50 text-white rounded-md border border-zinc-800/50 text-sm font-medium transition-colors">
            <Shield className="w-4 h-4 text-emerald-500" /> Global Mesh State
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-900/50 text-zinc-400 hover:text-white rounded-md transition-colors text-sm font-medium">
            <Radio className="w-4 h-4" /> Live Feed
          </button>
        </nav>
        <div className="p-4 border-t border-zinc-800 mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-red-950/30 text-zinc-400 hover:text-red-400 border border-zinc-800 hover:border-red-900/50 rounded-md transition-all text-xs font-mono uppercase tracking-widest"
          >
            <LogOut className="w-3 h-3" /> Global Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-zinc-800 flex items-center px-8 bg-[#020202]">
          <h1 className="text-sm font-mono tracking-widest uppercase text-emerald-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            SUPER-ADMIN OVERSIGHT: GLOBAL MESH STATE
          </h1>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8">
          {/* Grid: 4 Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Citizens', value: '14,209', icon: Users, trend: '+12% this week' },
              { label: 'Total Authorities', value: '42', icon: Shield, trend: 'Fully Operational' },
              { label: 'Live SOS Incidents', value: '3', icon: Activity, trend: '2 Critical' },
              { label: 'System Latency', value: '12ms / 99.9%', icon: Zap, trend: 'Optimal' }
            ].map((metric, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#050505] border border-zinc-800 rounded-lg p-5 flex flex-col justify-between"
              >
                <div className="flex justify-between items-start mb-4">
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{metric.label}</p>
                  <metric.icon className="w-4 h-4 text-emerald-500/50" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white">{metric.value}</h3>
                  <p className="text-xs text-zinc-500 mt-1 font-mono">{metric.trend}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main View: Premium Data Table */}
          <div className="bg-[#050505] border border-zinc-800 rounded-lg overflow-hidden flex flex-col shadow-2xl">
            <div className="p-5 border-b border-zinc-800 bg-[#020202] flex justify-between items-center">
              <div>
                <h3 className="text-sm font-semibold tracking-wide text-white">Registered Users & Nodes</h3>
                <p className="text-xs text-zinc-500 mt-1">Manage system access across all roles.</p>
              </div>
              <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono rounded-full uppercase tracking-wider">
                Live DB Sync
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#020202] text-xs font-mono text-zinc-500 uppercase border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4 font-medium">User Identifier</th>
                    <th className="px-6 py-4 font-medium">Role Level</th>
                    <th className="px-6 py-4 font-medium">Region/Node</th>
                    <th className="px-6 py-4 font-medium text-right">System Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
                  {[
                    { id: 'user_99x8', email: 'citizen.demo@gmail.com', role: 'Citizen', region: 'Global', access: true },
                    { id: 'auth_m12', email: 'mumbai.traffic@gov.in', role: 'Authority', region: 'Maharashtra West', access: true },
                    { id: 'auth_d44', email: 'dhaka.pwd@gov.bd', role: 'Authority', region: 'Dhaka Central', access: true },
                    { id: 'user_44z2', email: 'flagged.user@temp.com', role: 'Citizen', region: 'Global', access: false },
                  ].map((userNode, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-zinc-200">{userNode.email}</span>
                          <span className="text-[10px] font-mono text-zinc-500 mt-0.5">{userNode.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                          userNode.role === 'Authority' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                        }`}>
                          {userNode.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-400">{userNode.region}</td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => toggleAccess(userNode.id, userNode.access)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors border ${
                            userNode.access 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20' 
                              : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                          }`}
                        >
                          {userNode.access ? <><Check className="w-3.5 h-3.5" /> Granted</> : <><X className="w-3.5 h-3.5" /> Revoked</>}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
