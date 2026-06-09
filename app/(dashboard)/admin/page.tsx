'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Activity, Zap, Check, X, Search, Database, RefreshCw, Key, Building } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const MOCK_NODES = [
  { id: 'auth_m12', name: 'Mumbai Traffic Police', email: 'mumbai.traffic@gov.in', role: 'AUTHORITY', region: 'Maharashtra West', status: 'GRANTED', lastActive: '2 mins ago' },
  { id: 'user_99x8', name: 'Rohan Sharma', email: 'rohan.sharma99@gmail.com', role: 'CITIZEN', region: 'Pune Node', status: 'GRANTED', lastActive: '12 mins ago' },
  { id: 'auth_d44', name: 'Dhaka PWD', email: 'dhaka.pwd@gov.bd', role: 'AUTHORITY', region: 'Dhaka Central', status: 'REVOKED', lastActive: '2 days ago' },
  { id: 'auth_c89', name: 'Colombo Municipal', email: 'traffic@colombo.gov.lk', role: 'AUTHORITY', region: 'Sri Lanka Metro', status: 'GRANTED', lastActive: '45 mins ago' },
  { id: 'user_34k1', name: 'Arun Singh', email: 'arun.singh.01@gmail.com', role: 'CITIZEN', region: 'Delhi NCR', status: 'GRANTED', lastActive: 'Live' }
];

const MOCK_LEADS = [
  { org: 'Colombo Municipal', email: 'admin@colombo.gov.lk', fleetSize: 450, status: 'PENDING APPROVAL' },
  { org: 'Kolkata Transport', email: 'cmd@kolkatatrans.gov.in', fleetSize: 1200, status: 'EVALUATING' },
];

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [nodes, setNodes] = useState(MOCK_NODES);
  const [leads, setLeads] = useState(MOCK_LEADS);

  useEffect(() => {
    setMounted(true);
    if (user && user.email !== 'abhi.admin.dev@gmail.com') {
      toast.error('Clearance Denied. Intrusion logged.');
      router.push('/');
    }
  }, [user, router]);

  if (!mounted || !user) return <div className="min-h-screen bg-[#020202]" />;

  const simulateAction = (actionName: string, duration = 1500) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, duration)),
      {
        loading: `${actionName}...`,
        success: `${actionName} Successful`,
        error: `${actionName} Failed`,
      }
    );
  };

  const toggleUserAccess = (id: string, currentStatus: string) => {
    simulateAction('Updating System Access');
    setNodes(prev => prev.map(n => n.id === id ? { ...n, status: currentStatus === 'GRANTED' ? 'REVOKED' : 'GRANTED' } : n));
  };

  const totalCitizens = nodes.filter(u => u.role === 'CITIZEN').length * 1420; // multiplied for realism
  const totalAuthorities = nodes.filter(u => u.role === 'AUTHORITY').length * 12;

  return (
    <div className="relative w-full min-h-screen bg-[#000000] text-zinc-300 font-sans flex flex-col rounded-xl overflow-hidden border border-zinc-800">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none z-0"></div>
      
      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col overflow-y-auto custom-scrollbar">
        <header className="h-16 border-b border-zinc-800 flex items-center px-8 bg-[#020202]/80 backdrop-blur-md sticky top-0 z-50">
          <h1 className="text-sm font-mono tracking-widest uppercase text-emerald-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            SUPER-ADMIN OVERSIGHT: GLOBAL MESH STATE
          </h1>
        </header>
        
        <div className="flex-1 p-8 space-y-8">
          {/* Grid: 4 Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Citizens', value: totalCitizens.toLocaleString(), icon: Users, trend: 'Live Sync Active' },
              { label: 'Total Authorities', value: totalAuthorities.toLocaleString(), icon: Shield, trend: 'Fully Operational' },
              { label: 'Live SOS Incidents', value: 12, icon: Activity, trend: 'Real-time telemetry' },
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
                    <th className="px-6 py-4 font-medium">Last Active</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50 text-zinc-300 bg-[#050505]">
                  {nodes.map((userNode) => (
                    <tr key={userNode.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium tracking-tight text-zinc-200">{userNode.name}</span>
                          <span className="text-[10px] font-mono text-zinc-600 mt-0.5">{userNode.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                          userNode.role === 'AUTHORITY' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                        }`}>
                          {userNode.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-400 tracking-tight text-xs">{userNode.region}</td>
                      <td className="px-6 py-4 text-zinc-500 font-mono text-[10px] uppercase tracking-wider">{userNode.lastActive}</td>
                      <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                        <button 
                          onClick={() => toggleUserAccess(userNode.id, userNode.status)}
                          className={userNode.status === 'GRANTED' 
                            ? "bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest hover:bg-red-500/20 transition-all inline-flex items-center gap-1.5"
                            : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest hover:bg-emerald-500/20 transition-all inline-flex items-center gap-1.5"
                          }
                        >
                          {userNode.status === 'GRANTED' ? 'Revoke' : 'Grant'}
                        </button>
                        <button 
                          onClick={() => simulateAction('Auditing Node Activity', 2000)}
                          className="bg-blue-500/10 text-blue-500 border border-blue-500/20 px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest hover:bg-blue-500/20 transition-all inline-flex items-center gap-1.5"
                        >
                          <Search className="w-3 h-3" /> Audit Node
                        </button>
                        <button 
                          onClick={() => simulateAction('Deleting Record', 2000)}
                          className="bg-zinc-800 text-zinc-400 border border-zinc-700 px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest hover:bg-zinc-700 hover:text-white transition-all inline-flex items-center gap-1.5"
                        >
                          <X className="w-3 h-3" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enterprise Leads Pipeline */}
            <div className="bg-[#050505] border border-zinc-800 rounded-xl flex flex-col shadow-2xl relative z-10">
              <div className="p-5 border-b border-zinc-800 bg-[#020202]/50 flex items-center gap-3 rounded-t-xl">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <Building className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tighter text-white">Enterprise Leads Pipeline</h3>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mt-1">Pending IaaS API Requests</p>
                </div>
              </div>
              <div className="p-5 space-y-4">
                {leads.map((lead, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-zinc-800/50 bg-[#020202] hover:border-zinc-700 transition-colors gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-zinc-200 tracking-tight">{lead.org}</h4>
                      <p className="text-xs text-zinc-500 font-mono tracking-widest mt-1">{lead.email}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-zinc-900 text-zinc-400 border border-zinc-800 mt-3">
                        Fleet Size: {lead.fleetSize}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <button onClick={() => simulateAction('Generating IaaS API Key', 3000)} className="w-full sm:w-auto bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest hover:bg-emerald-500/20 transition-all inline-flex items-center justify-center gap-1.5">
                        <Key className="w-3 h-3" /> Issue API Key
                      </button>
                      <button onClick={() => simulateAction('Rejecting Lead')} className="w-full sm:w-auto bg-zinc-800 text-zinc-400 border border-zinc-700 px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest hover:bg-zinc-700 hover:text-white transition-all inline-flex items-center justify-center gap-1.5">
                        <X className="w-3 h-3" /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* The Danger Zone */}
            <div className="bg-red-950/10 border border-red-900/50 rounded-xl flex flex-col shadow-2xl relative z-10 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              <div className="p-5 border-b border-red-900/30 bg-red-950/20 flex items-center gap-3 rounded-t-xl relative z-10">
                <div className="w-8 h-8 rounded-lg bg-red-950 border border-red-900/50 flex items-center justify-center">
                  <Database className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tighter text-red-500">THE DANGER ZONE</h3>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-red-500/70 mt-1">Irreversible System Actions</p>
                </div>
              </div>
              <div className="p-5 space-y-4 relative z-10 flex flex-col justify-center h-full">
                <button 
                  onClick={() => toast.error('FATAL EXCEPTION: Override Required.', { description: 'Contact Core Engineers to wipe the Global Mesh.' })}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-bold tracking-widest uppercase text-xs py-4 rounded-md transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                >
                  WIPE ALL MESH DATA
                </button>
                <button 
                  onClick={() => toast.promise(new Promise((r) => setTimeout(r, 4000)), { loading: 'Decrypting Backup Archive...', success: 'Restoration sequence initiated.', error: 'Restoration Failed' })}
                  className="w-full bg-[#050505] text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white px-4 py-4 rounded-md text-xs font-mono uppercase tracking-widest transition-all inline-flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> RESTORE FROM ENCRYPTED BACKUP
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
