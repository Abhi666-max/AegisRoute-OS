'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, Activity, Zap, Check, X, Search, Database, RefreshCw, Key, Building, Terminal, ShieldCheck, AlertTriangle, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

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
  
  // State
  const [nodes, setNodes] = useState(BIMSTEC_MOCK_NODES);
  const [leads, setLeads] = useState(PIPELINE_MOCK_LEADS);
  const [activeTab, setActiveTab] = useState('nodes'); 
  const [historyMode, setHistoryMode] = useState(false); // [Active Nodes] | [Audit History]
  
  const [auditNode, setAuditNode] = useState<any>(null);

  // Center Cinematic Modal State
  const [actionModal, setActionModal] = useState<{ isOpen: boolean, type: string, target?: any, loading: boolean, success: boolean, message: string }>({
    isOpen: false, type: '', loading: false, success: false, message: ''
  });
  const [wipeConfirmText, setWipeConfirmText] = useState("");

  useEffect(() => {
    setMounted(true);
    if (user && user.email !== 'abhi.admin.dev@gmail.com') {
      router.push('/');
    }
  }, [user, router]);

  if (!mounted || !user) return <div className="min-h-screen bg-[#020202]" />;

  const executeCinematicAction = (actionType: string, target?: any) => {
    setActionModal({ isOpen: true, type: actionType, target, loading: true, success: false, message: `Executing ${actionType}...` });
    
    setTimeout(() => {
      // Soft deletes / mutations
      if (actionType === 'TERMINATE_NODE' && target) {
        setNodes(prev => prev.map(n => n.id === target.id ? { ...n, status: 'TERMINATED' } : n));
      } else if (actionType === 'ISSUE_KEY' && target) {
        setLeads(prev => prev.map(l => l.id === target.id ? { ...l, status: 'PROVISIONED' } : l));
      } else if (actionType === 'REJECT_LEAD' && target) {
        setLeads(prev => prev.map(l => l.id === target.id ? { ...l, status: 'REJECTED' } : l));
      } else if (actionType === 'TOGGLE_ACCESS' && target) {
        setNodes(prev => prev.map(n => n.id === target.id ? { ...n, status: target.status === 'GRANTED' ? 'REVOKED' : 'GRANTED' } : n));
      } else if (actionType === 'WIPE_DATA') {
        setNodes(prev => prev.map(n => ({...n, status: 'TERMINATED'})));
        setLeads(prev => prev.map(l => ({...l, status: 'REJECTED'})));
        setWipeConfirmText("");
      } else if (actionType === 'RESTORE_DATA') {
        setNodes(BIMSTEC_MOCK_NODES);
        setLeads(PIPELINE_MOCK_LEADS);
      }

      setActionModal(prev => ({ ...prev, loading: false, success: true, message: 'Action Completed Successfully' }));
    }, 1500);
  };

  const activeNodes = nodes.filter(n => n.status === 'GRANTED' || n.status === 'PENDING');
  const historyNodes = nodes.filter(n => n.status === 'REVOKED' || n.status === 'TERMINATED');
  
  const activeLeads = leads.filter(l => l.status === 'PENDING APPROVAL' || l.status === 'EVALUATING');
  const historyLeads = leads.filter(l => l.status === 'PROVISIONED' || l.status === 'REJECTED');

  const totalCitizens = nodes.filter(u => u.role === 'CITIZEN' && u.status !== 'TERMINATED').length * 1420; 
  const totalAuthorities = nodes.filter(u => u.role === 'AUTHORITY' && u.status !== 'TERMINATED').length * 12;

  return (
    <div className="relative w-full min-h-screen bg-[#000000] text-zinc-300 font-sans flex flex-col rounded-xl overflow-hidden border border-zinc-800">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none z-0"></div>
      
      {/* Center-Screen Cinematic Modal */}
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
                    <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
                    <Activity className="w-6 h-6 text-emerald-500 animate-pulse" />
                  </div>
                  <h2 className="text-xl font-semibold tracking-tight text-white">{actionModal.message}</h2>
                  <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase">Awaiting cryptographic signature...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${actionModal.type === 'TERMINATE_NODE' || actionModal.type === 'WIPE_DATA' || actionModal.type === 'REJECT_LEAD' ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'}`}
                  >
                    {actionModal.type === 'TERMINATE_NODE' || actionModal.type === 'WIPE_DATA' || actionModal.type === 'REJECT_LEAD' ? <X className="w-8 h-8" /> : <Check className="w-8 h-8" />}
                  </motion.div>
                  <h2 className="text-xl font-semibold tracking-tight text-white">{actionModal.message}</h2>
                  <button 
                    onClick={() => setActionModal({ isOpen: false, type: '', loading: false, success: false, message: '' })}
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

      {/* Wipe Confirmation Specific Logic */}
      <AnimatePresence>
        {wipeModalOpen && !actionModal.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-red-950/40 border border-red-900 p-8 rounded-2xl max-w-lg w-full shadow-[0_0_100px_rgba(220,38,38,0.2)]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-900/50 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-500 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tighter text-white">CRITICAL WARNING</h2>
                  <p className="text-red-500 font-mono text-xs uppercase tracking-widest mt-1">Irreversible System Action</p>
                </div>
              </div>
              <p className="text-zinc-300 mb-6 font-medium">
                This will permanently mark all nodes as TERMINATED and purge active tracking profiles across the BIMSTEC grid.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Type 'CONFIRM' to proceed</label>
                  <input 
                    type="text" 
                    value={wipeConfirmText}
                    onChange={(e) => setWipeConfirmText(e.target.value)}
                    placeholder="CONFIRM"
                    className="w-full bg-black border border-red-900/50 rounded-lg px-4 py-3 text-white font-mono uppercase focus:outline-none focus:border-red-500 transition-colors text-center"
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
                    onClick={() => { setWipeModalOpen(false); executeCinematicAction('WIPE_DATA'); }}
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

      {/* Delete Confirmation Specific Logic */}
      <AnimatePresence>
        {nodeToDelete && !actionModal.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#050505] border border-zinc-800 rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-16 h-16 rounded-full bg-red-900/20 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-xl font-bold tracking-tighter text-white mb-2">Terminate Node?</h2>
              <p className="text-zinc-400 mb-8 text-sm">
                Are you sure you want to terminate <span className="text-white font-medium">{nodeToDelete.name}</span>? This status will be permanently logged in Audit History.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setNodeToDelete(null)}
                  className="flex-1 px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-medium transition-colors border border-zinc-800"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    const target = nodeToDelete;
                    setNodeToDelete(null);
                    executeCinematicAction('TERMINATE_NODE', target);
                  }}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium transition-colors shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                >
                  Terminate
                </button>
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
                <p className="text-zinc-300">Status: <span className={auditNode.status === 'GRANTED' || auditNode.status === 'PROVISIONED' ? 'text-emerald-500' : 'text-red-500'}>{auditNode.status}</span></p>
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
        <header className="h-20 border-b border-zinc-800 flex flex-col justify-center px-8 bg-[#020202]/80 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-sm font-mono tracking-widest uppercase text-emerald-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SUPER-ADMIN OVERSIGHT
            </h1>
            
            <div className="flex items-center gap-1 bg-zinc-900/50 p-1 rounded-lg border border-zinc-800">
              {['nodes', 'leads', 'danger'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors ${
                    activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-zinc-800 border border-zinc-700 rounded-md shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{tab === 'nodes' ? 'Mesh Nodes' : tab === 'leads' ? 'Pipeline' : 'Danger Zone'}</span>
                </button>
              ))}
            </div>
          </div>
        </header>
        
        <div className="flex-1 p-8 space-y-8">
          {/* Top Metric Cards */}
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

          {/* Toggle for History */}
          <div className="flex justify-end">
            <div className="flex items-center gap-1 bg-zinc-900/50 p-1 rounded-lg border border-zinc-800">
              <button
                onClick={() => setHistoryMode(false)}
                className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors ${!historyMode ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Active Nodes
              </button>
              <button
                onClick={() => setHistoryMode(true)}
                className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors ${historyMode ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Audit History
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'nodes' && (
              <motion.div 
                key="nodes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-[#050505] border border-zinc-800 rounded-xl flex flex-col shadow-2xl relative z-10"
              >
                <div className="p-5 border-b border-zinc-800 bg-[#020202]/50 flex justify-between items-center rounded-t-xl">
                  <div>
                    <h3 className="text-sm font-semibold tracking-tighter text-white">{historyMode ? 'Historical Archive' : 'Registered Users & Nodes'}</h3>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mt-1">{historyMode ? 'Read-only audit trail.' : 'Manage system access across all roles.'}</p>
                  </div>
                  {!historyMode && (
                    <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-mono rounded-full uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live DB Sync
                    </div>
                  )}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-[#020202]/50 text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-800">
                      <tr>
                        <th className="px-6 py-4 font-medium">User Identifier</th>
                        <th className="px-6 py-4 font-medium">Role Level</th>
                        <th className="px-6 py-4 font-medium">Region/Node</th>
                        <th className="px-6 py-4 font-medium">Status / Last Active</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50 text-zinc-300 bg-[#050505]">
                      <AnimatePresence>
                        {(historyMode ? historyNodes : activeNodes).map((userNode) => (
                          <motion.tr 
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={userNode.id} 
                            className={`transition-colors ${historyMode ? 'opacity-50 hover:opacity-100 grayscale' : 'hover:bg-white/[0.02]'}`}
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
                            <td className="px-6 py-4 flex flex-col gap-1">
                               <span className={`text-[10px] font-mono uppercase tracking-widest ${
                                  userNode.status === 'GRANTED' ? 'text-emerald-500' :
                                  userNode.status === 'REVOKED' || userNode.status === 'TERMINATED' ? 'text-red-500' : 'text-zinc-500'
                               }`}>
                                 {userNode.status}
                               </span>
                               <span className="text-zinc-500 font-mono text-[10px] tracking-wider">{userNode.lastActive}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {!historyMode && (
                                  <>
                                    <button 
                                      onClick={() => executeCinematicAction('TOGGLE_ACCESS', userNode)}
                                      className="bg-zinc-800/50 text-zinc-300 border border-zinc-700 px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest hover:bg-zinc-700 transition-all"
                                    >
                                      Toggle Access
                                    </button>
                                    <button 
                                      onClick={() => setNodeToDelete(userNode)}
                                      className="bg-red-950/30 text-red-500 border border-red-900/50 px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest hover:bg-red-900/50 transition-all inline-flex items-center gap-1.5"
                                    >
                                      <X className="w-3 h-3" /> Delete
                                    </button>
                                  </>
                                )}
                                <button 
                                  onClick={() => setAuditNode(userNode)}
                                  className="bg-blue-950/30 text-blue-400 border border-blue-900/50 px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest hover:bg-blue-900/50 transition-all inline-flex items-center gap-1.5"
                                >
                                  <Search className="w-3 h-3" /> Audit Log
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                      {(historyMode ? historyNodes : activeNodes).length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-zinc-500 text-xs font-mono uppercase tracking-widest">
                            No records found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'leads' && (
              <motion.div 
                key="leads"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-[#050505] border border-zinc-800 rounded-xl flex flex-col shadow-2xl relative z-10"
              >
                <div className="p-5 border-b border-zinc-800 bg-[#020202]/50 flex items-center gap-3 rounded-t-xl">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <Building className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold tracking-tighter text-white">{historyMode ? 'Processed Leads Archive' : 'Enterprise Leads Pipeline'}</h3>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mt-1">Pending IaaS API Requests</p>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <AnimatePresence>
                    {(historyMode ? historyLeads : activeLeads).map((lead) => (
                      <motion.div 
                        initial={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={lead.id} 
                        className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-zinc-800/50 transition-colors gap-4 ${historyMode ? 'bg-zinc-950/30 opacity-60 grayscale' : 'bg-[#020202] hover:border-zinc-700'}`}
                      >
                        <div>
                          <h4 className="text-sm font-medium text-zinc-200 tracking-tight">{lead.org}</h4>
                          <p className="text-xs text-zinc-500 font-mono tracking-widest mt-1">{lead.email}</p>
                          <div className="flex gap-2 mt-3">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-zinc-900 text-zinc-400 border border-zinc-800">
                              Fleet Size: {lead.fleetSize}
                            </span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                              lead.status === 'PROVISIONED' ? 'text-emerald-500 bg-emerald-500/10' :
                              lead.status === 'REJECTED' ? 'text-red-500 bg-red-500/10' : 'text-amber-500 bg-amber-500/10'
                            }`}>
                              {lead.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                          {!historyMode && (
                            <>
                              <button onClick={() => executeCinematicAction('ISSUE_KEY', lead)} className="w-full sm:w-auto bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-4 py-2 rounded-lg text-[10px] font-bold font-mono uppercase tracking-widest hover:bg-emerald-500/20 transition-all inline-flex items-center justify-center gap-1.5">
                                <Key className="w-3 h-3" /> Issue API Key
                              </button>
                              <button onClick={() => executeCinematicAction('REJECT_LEAD', lead)} className="w-full sm:w-auto bg-zinc-800 text-zinc-300 border border-zinc-700 px-4 py-2 rounded-lg text-[10px] font-bold font-mono uppercase tracking-widest hover:bg-zinc-700 transition-all inline-flex items-center justify-center gap-1.5">
                                <X className="w-3 h-3" /> Reject
                              </button>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {(historyMode ? historyLeads : activeLeads).length === 0 && (
                    <div className="w-full h-32 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-xl bg-zinc-950/30 text-zinc-500">
                      <ShieldCheck className="w-8 h-8 text-emerald-500 mb-2 opacity-50" />
                      <span className="text-xs font-mono uppercase tracking-widest">Pipeline clear.</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'danger' && (
              <motion.div 
                key="danger"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-red-950/10 border border-red-900/50 rounded-xl flex flex-col shadow-2xl relative z-10 overflow-hidden"
              >
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
                <div className="p-8 space-y-4 relative z-10 flex flex-col justify-center h-full max-w-2xl mx-auto w-full">
                  <button 
                    onClick={() => setWipeModalOpen(true)}
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-bold tracking-widest uppercase text-sm py-5 rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                  >
                    WIPE ALL MESH DATA
                  </button>
                  <button 
                    onClick={() => executeCinematicAction('RESTORE_DATA')}
                    className="w-full bg-[#050505] text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white px-4 py-5 rounded-xl text-sm font-mono uppercase tracking-widest transition-all inline-flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" /> RESTORE FROM ENCRYPTED BACKUP
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      </div>
    </div>
  );
}
