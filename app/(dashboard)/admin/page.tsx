'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Activity, Zap, Terminal, Database, ServerCrash, CheckCircle2, AlertTriangle, Eye, ShieldAlert } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
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

  const handleAction = (action: string, node: string) => {
    toast.success(`${action} command executed for ${node}.`);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white pt-24 pb-20 px-6 font-inter">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">Global Override Active</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tighter text-white">God-Mode Dashboard</h1>
            <p className="text-zinc-500 mt-2 font-mono text-xs uppercase tracking-widest">Multi-Tenant Infrastructure Control</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-xs font-mono uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center gap-2">
              <Database className="w-4 h-4" /> Export Logs
            </button>
            <button className="px-4 py-2 bg-white text-black font-bold rounded-md text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors">
              Deploy Patch
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total Citizens', value: '14,209', icon: Users, color: 'text-blue-400' },
            { label: 'Active Authorities', value: '42', icon: Shield, color: 'text-emerald-400' },
            { label: 'Global SOS Events', value: '891', icon: Activity, color: 'text-red-400' },
            { label: 'Network Latency', value: '12ms', icon: Zap, color: 'text-amber-400' }
          ].map((metric, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#050505] border border-zinc-800 rounded-xl p-6 relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-current opacity-5 blur-[50px] rounded-full group-hover:opacity-10 transition-opacity ${metric.color}`} />
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{metric.label}</p>
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              <h3 className="text-3xl font-semibold tracking-tight text-white">{metric.value}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Authority Node Table */}
          <div className="lg:col-span-2 bg-[#050505] border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
            <div className="p-5 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
              <h3 className="text-sm font-semibold tracking-wide text-white">Authority Node Topology</h3>
              <span className="text-xs font-mono text-zinc-500 uppercase">Live Sync</span>
            </div>
            <div className="p-0 overflow-x-auto flex-1">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-zinc-900/50 text-xs font-mono text-zinc-500 uppercase">
                  <tr>
                    <th className="px-5 py-3 font-medium">Department</th>
                    <th className="px-5 py-3 font-medium">Region</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
                  {[
                    { dept: 'mumbai.traffic@gov.in', region: 'Maharashtra West', status: 'Online' },
                    { dept: 'dhaka.pwd@gov.bd', region: 'Dhaka Central', status: 'Online' },
                    { dept: 'colombo.emergency@gov.lk', region: 'Western Province', status: 'Degraded' },
                  ].map((node, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4 font-mono text-xs">{node.dept}</td>
                      <td className="px-5 py-4">{node.region}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider ${node.status === 'Online' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                          {node.status === 'Online' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                          {node.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right flex items-center justify-end gap-2">
                        <button onClick={() => handleAction('Audit', node.dept)} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded transition-colors"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => handleAction('Broadcast Signal', node.dept)} className="p-1.5 text-zinc-500 hover:text-cyan-400 hover:bg-cyan-950 rounded transition-colors"><Zap className="w-4 h-4" /></button>
                        <button onClick={() => handleAction('Revoke Access', node.dept)} className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-950 rounded transition-colors"><ShieldAlert className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Citizen Activity Feed */}
          <div className="bg-[#050505] border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
            <div className="p-5 border-b border-zinc-800 bg-zinc-950">
              <h3 className="text-sm font-semibold tracking-wide text-white">Citizen Event Stream</h3>
            </div>
            <div className="p-5 flex-1 overflow-y-auto space-y-4">
              {[
                { user: 'user_89x2', action: 'Reported Pothole', time: 'Just now', severity: 'low' },
                { user: 'user_41b9', action: 'Triggered SOS Georoute', time: '2m ago', severity: 'critical' },
                { user: 'user_77c1', action: 'Queried DriveLegal AI', time: '5m ago', severity: 'low' },
                { user: 'user_92a4', action: 'Uploaded Dashcam Evidence', time: '12m ago', severity: 'medium' },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 border-b border-zinc-800/50 pb-4 last:border-0 last:pb-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${log.severity === 'critical' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : log.severity === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                  <div>
                    <p className="text-sm text-zinc-300">{log.action}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] font-mono text-zinc-500">{log.user}</span>
                      <span className="text-[10px] text-zinc-600">•</span>
                      <span className="text-[10px] text-zinc-500">{log.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
