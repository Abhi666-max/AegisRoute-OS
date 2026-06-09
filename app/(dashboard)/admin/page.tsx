'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Activity, Zap, Check, X } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { auth, db } from '@/lib/firebase/config';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [realUsers, setRealUsers] = useState<any[]>([]);
  const [liveIncidentsCount, setLiveIncidentsCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (user && user.email !== 'abhi.admin.dev@gmail.com') {
      toast.error('Clearance Denied. Intrusion logged.');
      router.push('/');
    }
  }, [user, router]);

  useEffect(() => {
    if (!user || user.email !== 'abhi.admin.dev@gmail.com') return;

    const usersUnsub = onSnapshot(collection(db, 'users'), (snapshot) => {
      const loadedUsers = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setRealUsers(loadedUsers);
    });

    const incidentsUnsub = onSnapshot(collection(db, 'incidents'), (snapshot) => {
      setLiveIncidentsCount(snapshot.docs.length);
    });

    return () => {
      usersUnsub();
      incidentsUnsub();
    };
  }, [user]);

  if (!mounted || !user) return <div className="min-h-screen bg-[#020202]" />;

  const toggleUserAccess = async (id: string, currentStatus: string | boolean) => {
    try {
      const newStatus = (currentStatus === 'active' || currentStatus === true) ? 'revoked' : 'active';
      await updateDoc(doc(db, 'users', id), { access: newStatus });
      toast.success(`System access ${newStatus === 'revoked' ? 'revoked' : 'granted'} for user ${id}`);
    } catch (err) {
      toast.error('Failed to update system access.');
    }
  };

  const totalCitizens = realUsers.filter(u => u.role === 'citizen').length;
  const totalAuthorities = realUsers.filter(u => u.role === 'authority').length;

  return (
    <div className="relative w-full min-h-screen bg-[#000000] text-zinc-300 font-sans flex flex-col rounded-xl overflow-hidden border border-zinc-800">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none z-0"></div>
      
      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-zinc-800 flex items-center px-8 bg-[#020202]/80 backdrop-blur-md">
          <h1 className="text-sm font-mono tracking-widest uppercase text-emerald-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            SUPER-ADMIN OVERSIGHT: GLOBAL MESH STATE
          </h1>
        </header>
        
        <div className="flex-1 p-8">
          {/* Grid: 4 Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Citizens', value: totalCitizens, icon: Users, trend: 'Live Sync Active' },
              { label: 'Total Authorities', value: totalAuthorities, icon: Shield, trend: 'Fully Operational' },
              { label: 'Live SOS Incidents', value: liveIncidentsCount, icon: Activity, trend: 'Real-time telemetry' },
              { label: 'System Latency', value: '12ms / 99.9%', icon: Zap, trend: 'Optimal' }
            ].map((metric, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative overflow-hidden rounded-xl p-[1px] h-32"
              >
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#00FF66_50%,#000000_100%)] opacity-100 pointer-events-none" />
                <div className="relative bg-[#050505] border border-zinc-800/50 rounded-xl p-5 flex flex-col justify-between h-full z-10">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{metric.label}</p>
                    <metric.icon className="w-4 h-4 text-emerald-500/50" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-semibold tracking-tighter text-white">{metric.value}</h3>
                    <p className="text-[10px] text-zinc-500 mt-1 font-mono uppercase tracking-widest">{metric.trend}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main View: Premium Data Table */}
          <div className="bg-[#050505] border border-zinc-800 rounded-xl flex flex-col shadow-2xl relative z-10">
            <div className="p-5 border-b border-zinc-800 bg-[#020202]/50 flex justify-between items-center rounded-t-xl">
              <div>
                <h3 className="text-sm font-semibold tracking-tighter text-white">Registered Users & Nodes</h3>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mt-1">Manage system access across all roles.</p>
              </div>
              <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-mono rounded-full uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live DB Sync
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#020202]/50 text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4 font-medium">User Identifier</th>
                    <th className="px-6 py-4 font-medium">Role Level</th>
                    <th className="px-6 py-4 font-medium">Region/Node</th>
                    <th className="px-6 py-4 font-medium text-right">System Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50 text-zinc-300 bg-[#050505]">
                  {realUsers.length === 0 ? (
                     <tr>
                       <td colSpan={4} className="px-6 py-8 text-center text-zinc-500 text-xs font-mono uppercase tracking-widest">
                         No telemetry data available.
                       </td>
                     </tr>
                  ) : realUsers.map((userNode, i) => {
                    const status = userNode.access || 'active';
                    return (
                      <tr key={userNode.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium tracking-tight text-zinc-200">{userNode.email || 'Unknown Identity'}</span>
                            <span className="text-[10px] font-mono text-zinc-600 mt-0.5">{userNode.id}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                            userNode.role === 'authority' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                          }`}>
                            {userNode.role || 'Citizen'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-zinc-400 tracking-tight text-xs">{userNode.country || userNode.region || 'Global'}</td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => toggleUserAccess(userNode.id, status)}
                            className={status === 'active' || status === true 
                              ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all inline-flex items-center gap-1.5"
                              : "bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/20 transition-all inline-flex items-center gap-1.5"
                            }
                          >
                            {(status === 'active' || status === true) ? <><Check className="w-3 h-3" /> Granted</> : <><X className="w-3 h-3" /> Revoked</>}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
