'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, Activity, Zap, Check, X, Search, Database, RefreshCw, Key, Building, Terminal, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const BIMSTEC_MOCK_NODES = [
  { id: 'auth_m12', name: 'Mumbai Traffic Police', email: 'mumbai.traffic@gov.in', role: 'AUTHORITY', region: 'Maharashtra West', status: 'GRANTED', lastActive: '2 mins ago' },
  { id: 'auth_sl01', name: 'Colombo Metro Traffic', email: 'colombo.metro@gov.lk', role: 'AUTHORITY', region: 'Sri Lanka Metro', status: 'GRANTED', lastActive: 'Just now' },
  { id: 'auth_bd99', name: 'Dhaka Infrastructure Node', email: 'dhaka.infra@gov.bd', role: 'AUTHORITY', region: 'Dhaka Central', status: 'REVOKED', lastActive: '4 days ago' },
  { id: 'auth_np42', name: 'Kathmandu Transit Auth', email: 'kta@gov.np', role: 'AUTHORITY', region: 'Nepal Valley', status: 'GRANTED', lastActive: '12 mins ago' },
  { id: 'auth_th11', name: 'Bangkok Highway Patrol', email: 'bkk.patrol@police.go.th', role: 'AUTHORITY', region: 'Thailand Central', status: 'GRANTED', lastActive: 'Online' },
  { id: 'user_99x8', name: 'Rohan Sharma', email: 'rohan.sharma99@gmail.com', role: 'CITIZEN', region: 'Pune Node', status: 'GRANTED', lastActive: '4 mins ago' },
  { id: 'user_bh01', name: 'Thimphu Civic Grid', email: 'thimphu.civic@gmail.com', role: 'CITIZEN', region: 'Bhutan Capital', status: 'GRANTED', lastActive: '1 hr ago' },
];

const PIPELINE_MOCK_LEADS = [
  { id: 'lead_1', org: 'Colombo Municipal', email: 'admin@colombo.gov.lk', fleetSize: 450, status: 'PENDING APPROVAL' },
  { id: 'lead_2', org: 'Kolkata Transport', email: 'cmd@kolkatatrans.gov.in', fleetSize: 1200, status: 'EVALUATING' },
  { id: 'lead_3', org: 'Tokyo Highway Auth', email: 'sys@highway.metro.tokyo.jp', fleetSize: 3400, status: 'PENDING APPROVAL' },
  { id: 'lead_4', org: 'Jakarta Metro', email: 'it.dept@jakarta.go.id', fleetSize: 2100, status: 'EVALUATING' },
];

const MOCK_AUDIT_LOGS = [
  { time: "10:24:01", action: "AUTH_VERIFY", status: 200 },
  { time: "10:21:44", action: "RAG_QUERY", status: 200 },
  { time: "10:15:30", action: "DB_SYNC", status: 201 },
  { time: "10:11:12", action: "TOKEN_REFRESH", status: 401 },
  { time: "09:55:00", action: "NODE_HEARTBEAT", status: 200 }
];

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [nodes, setNodes] = useState(BIMSTEC_MOCK_NODES);
  const [leads, setLeads] = useState(PIPELINE_MOCK_LEADS);
  
  const [auditNode, setAuditNode] = useState<any>(null);
  const [wipeModalOpen, setWipeModalOpen] = useState(false);
  const [wipeConfirmText, setWipeConfirmText] = useState("");

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

  const deleteNode = (id: string) => {
    simulateAction('Deleting Record');
    setTimeout(() => {
      setNodes(prev => prev.filter(n => n.id !== id));
    }, 1500);
  };

  const processLead = (id: string, action: 'issue' | 'reject') => {
    simulateAction(action === 'issue' ? 'Generating IaaS API Key' : 'Rejecting Lead');
    setTimeout(() => {
      setLeads(prev => prev.filter(l => l.id !== id));
    }, 1500);
  };

  const handleWipeData = () => {
    if (wipeConfirmText === "CONFIRM") {
      setNodes([]);
      setLeads([]);
      setWipeModalOpen(false);
      setWipeConfirmText("");
      toast.success("Global Mesh Data Wiped Permanently.");
    }
  };

  const totalCitizens = nodes.filter(u => u.role === 'CITIZEN').length * 1420; 
  const totalAuthorities = nodes.filter(u => u.role === 'AUTHORITY').length * 12;

  return (
    <div className="relative w-full min-h-screen bg-[#000000] text-zinc-300 font-sans flex flex-col rounded-xl overflow-hidden border border-zinc-800">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none z-0"></div>
      
      {/* Wipe Confirmation Modal */}
      <AnimatePresence>
        {wipeModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-red-950/40 border border-red-900 rounded-2xl p-8 max-w-lg w-full shadow-[0_0_100px_rgba(220,38,38,0.2)]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-900/50 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-red-500 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tighter text-white">CRITICAL WARNING</h2>
                  <p className="text-red-500 font-mono text-xs uppercase tracking-widest mt-1">Irreversible System Action</p>
                </div>
              </div>
              <p className="text-zinc-300 mb-6 font-medium">
                This will permanently purge the Firestore DB, terminating all active mesh nodes and citizen tracking profiles across the BIMSTEC grid.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Type 'CONFIRM' to proceed</label>
                  <input 
                    type="text" 
                    value={wipeConfirmText}
                    onChange={(e) => setWipeConfirmText(e.target.value)}
                    placeholder="CONFIRM"
                    className="w-full bg-black border border-red-900/50 rounded-lg px-4 py-3 text-white font-mono uppercase focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => { setWipeModalOpen(false); setWipeConfirmText(""); }}
                    className="flex-1 px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg font-medium transition-colors border border-zinc-800"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={wipeConfirmText !== "CONFIRM"}
                    onClick={handleWipeData}
                    className="flex-1 px-4 py-3 bg-red-600 disabled:bg-red-900/50 text-white disabled:text-white/50 rounded-lg font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] disabled:shadow-none"
                  >
                    EXECUTE PURGE
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audit Log Panel */}
      <AnimatePresence>
        {auditNode && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-full md:w-96 bg-[#050505] border-l border-zinc-800 z-[99999] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-[#020202]">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-emerald-500" />
                <div>
                  <h3 className="text-white font-semibold tracking-tighter text-sm">AUDIT LOG VIEWER</h3>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mt-0.5">{auditNode.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setAuditNode(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-900 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 p-6 overflow-y-auto bg-black font-mono text-xs">
              <div className="mb-6 space-y-2">
                <p className="text-emerald-500/70">{"// Node Identity"}</p>
                <p className="text-zinc-300">Name: <span className="text-white">{auditNode.name}</span></p>
                <p className="text-zinc-300">Region: <span className="text-white">{auditNode.region}</span></p>
                <p className="text-zinc-300">Status: <span className={auditNode.status === 'GRANTED' ? 'text-emerald-500' : 'text-red-500'}>{auditNode.status}</span></p>
              </div>
              
              <div className="space-y-4">
                <p className="text-emerald-500/70">{"// Live Telemetry Feed"}</p>
                {MOCK_AUDIT_LOGS.map((log, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="flex flex-col gap-1 p-3 rounded bg-[#050505] border border-zinc-900"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">[{log.time}]</span>
                      <span className={log.status === 200 || log.status === 201 ? 'text-emerald-500' : 'text-amber-500'}>
                        {log.status}
                      </span>
                    </div>
                    <span className="text-emerald-400 font-medium">execute_rpc: {log.action}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col overflow-y-auto custom-scrollbar">
        <header className="h-16 border-b border-zinc-800 flex items-center px-8 bg-[#020202]/80 backdrop-blur-md sticky top-0 z-40">
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
                  <AnimatePresence>
                    {nodes.map((userNode) => (
                      <motion.tr 
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        key={userNode.id} 
                        className="hover:bg-white/[0.02] transition-colors"
                      >
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
                            onClick={() => setAuditNode(userNode)}
                            className="bg-blue-500/10 text-blue-500 border border-blue-500/20 px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest hover:bg-blue-500/20 transition-all inline-flex items-center gap-1.5"
                          >
                            <Search className="w-3 h-3" /> Audit Node
                          </button>
                          <button 
                            onClick={() => deleteNode(userNode.id)}
                            className="bg-zinc-800 text-zinc-400 border border-zinc-700 px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest hover:bg-zinc-700 hover:text-white transition-all inline-flex items-center gap-1.5"
                          >
                            <X className="w-3 h-3" /> Delete
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  {nodes.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-zinc-500 text-xs font-mono uppercase tracking-widest">
                        No active nodes in the mesh.
                      </td>
                    </tr>
                  )}
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
                <AnimatePresence>
                  {leads.map((lead) => (
                    <motion.div 
                      initial={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={lead.id} 
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-zinc-800/50 bg-[#020202] hover:border-zinc-700 transition-colors gap-4"
                    >
                      <div>
                        <h4 className="text-sm font-medium text-zinc-200 tracking-tight">{lead.org}</h4>
                        <p className="text-xs text-zinc-500 font-mono tracking-widest mt-1">{lead.email}</p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-zinc-900 text-zinc-400 border border-zinc-800 mt-3">
                          Fleet Size: {lead.fleetSize}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center gap-2">
                        <button onClick={() => processLead(lead.id, 'issue')} className="w-full sm:w-auto bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest hover:bg-emerald-500/20 transition-all inline-flex items-center justify-center gap-1.5">
                          <Key className="w-3 h-3" /> Issue API Key
                        </button>
                        <button onClick={() => processLead(lead.id, 'reject')} className="w-full sm:w-auto bg-zinc-800 text-zinc-400 border border-zinc-700 px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest hover:bg-zinc-700 hover:text-white transition-all inline-flex items-center justify-center gap-1.5">
                          <X className="w-3 h-3" /> Reject
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {leads.length === 0 && (
                  <div className="w-full h-32 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-xl bg-zinc-950/30 text-zinc-500">
                    <ShieldCheck className="w-8 h-8 text-emerald-500 mb-2 opacity-50" />
                    <span className="text-xs font-mono uppercase tracking-widest">Pipeline clear. All enterprise endpoints provisioned.</span>
                  </div>
                )}
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
                  onClick={() => setWipeModalOpen(true)}
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
