'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Activity, Crosshair, Navigation, CheckCircle2, X, ShieldAlert, Radio } from 'lucide-react';
import { useIncidentStore } from '@/store/useIncidentStore';

export default function IngressQueuePage() {
  const [activeTab, setActiveTab] = useState<'queue' | 'dispatched'>('queue');
  const { incidents, updateStatus, logMetric } = useIncidentStore();
  const [dispatchModal, setDispatchModal] = useState<string | null>(null);

  const activeQueue = incidents.filter(inc => !inc.status.includes('RESOLVED'));
  const dispatchedQueue = incidents.filter(inc => inc.status.includes('EN-ROUTE') || inc.status.includes('RESOLVED'));

  const confirmDispatch = () => {
    if (!dispatchModal) return;
    updateStatus(dispatchModal, 'UNIT EN-ROUTE');
    logMetric('FLEET_DISPATCH', `Unit deployed for incident ${dispatchModal}`);
    setDispatchModal(null);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen text-white relative font-sans">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">INGRESS QUEUE</h1>
          <p className="text-zinc-500 font-mono tracking-widest uppercase text-sm mt-1">Real-Time Integrated Mesh Triage</p>
        </div>

        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#05050a] border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.15)]">
          <Radio className="w-5 h-5 text-blue-400 animate-pulse" />
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Live Triage Telemetry</div>
            <div className="text-sm font-bold text-white">Active Queue Badge: <span className="text-blue-400">{activeQueue.length} Incidents</span></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 mb-6 border-b border-[#18181b] pb-4">
        <button 
          onClick={() => setActiveTab('queue')}
          className={`px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all ${activeTab === 'queue' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.2)]' : 'bg-[#050505] text-zinc-500 border border-[#18181b] hover:text-white'}`}
        >
          Active Queue ({activeQueue.length})
        </button>
        <button 
          onClick={() => setActiveTab('dispatched')}
          className={`px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all ${activeTab === 'dispatched' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.2)]' : 'bg-[#050505] text-zinc-500 border border-[#18181b] hover:text-white'}`}
        >
          Dispatched Tracking ({dispatchedQueue.length})
        </button>
      </div>

      {/* Triage Table */}
      <div className="bg-[#020205] border border-[#18181b] rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none"></div>
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#05050a] text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-[#18181b]">
              <tr>
                <th className="px-6 py-4 font-medium">HAZARD STAMP</th>
                <th className="px-6 py-4 font-medium">CLASSIFICATION</th>
                <th className="px-6 py-4 font-medium">COORDINATE NODE</th>
                <th className="px-6 py-4 font-medium">STATE</th>
                <th className="px-6 py-4 font-medium text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18181b]">
              <AnimatePresence mode="popLayout">
                {(activeTab === 'queue' ? activeQueue : dispatchedQueue).map((inc) => {
                  const isCancelled = inc.status === 'CANCELLED_BY_USER';
                  const isDispatched = inc.status.includes('EN-ROUTE') || inc.status === 'RESOLVED';
                  return (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, x: 50 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      key={inc.id} 
                      className="hover:bg-blue-900/10 transition-colors group"
                    >
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-3">
                           {inc.severity === 'CRITICAL' && <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />}
                           {inc.severity !== 'CRITICAL' && <Crosshair className="w-4 h-4 text-zinc-500" />}
                           <span className="font-mono text-zinc-300 font-bold group-hover:text-blue-400 transition-colors">{inc.id}</span>
                         </div>
                      </td>
                      <td className="px-6 py-5 text-zinc-300 font-medium flex items-center gap-2">
                        {inc.type}
                        {inc.sourceImage && (
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
                            [MEDIA ATTACHED]
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5 text-zinc-500 font-mono text-xs">
                        <span className="flex items-center gap-1.5 truncate max-w-xs">
                          <Navigation className="w-3 h-3 text-zinc-600 shrink-0" /> {inc.location}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest border ${
                          isCancelled ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse font-bold' :
                          inc.status.includes('UNASSIGNED') || inc.status === 'CRITICAL' || inc.status === 'PENDING' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                          inc.status.includes('EN-ROUTE') ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 font-bold' :
                          'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>
                          {isCancelled ? 'REVOKED BY CITIZEN' : inc.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        {isCancelled ? (
                          <span className="text-red-400 font-mono text-[10px] uppercase tracking-widest bg-red-500/10 px-3 py-1.5 rounded border border-red-500/20 inline-flex items-center gap-1.5">
                            <X className="w-3 h-3 text-red-500" /> STAND DOWN (REVOKED)
                          </span>
                        ) : isDispatched ? (
                          <span className="text-blue-400 font-mono text-[10px] uppercase tracking-widest bg-blue-500/10 px-3 py-1.5 rounded border border-blue-500/20 inline-flex items-center gap-1.5">
                            <Activity className="w-3 h-3 text-blue-400 animate-spin" /> FLEET EN ROUTE (Unit dispatched)
                          </span>
                        ) : (
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setDispatchModal(inc.id)}
                            className="bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-lg text-[10px] font-bold font-mono uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(37,99,235,0.1)]"
                          >
                            DISPATCH FLEET
                          </motion.button>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Centered Glassmorphic Modal */}
      <AnimatePresence>
        {dispatchModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setDispatchModal(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#020205]/90 backdrop-blur-2xl border border-[#18181b] p-8 rounded-3xl shadow-[0_0_50px_rgba(37,99,235,0.1)] text-center"
            >
              <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                <Navigation className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold tracking-tighter text-white mb-2">CONFIRM DISPATCH</h2>
              <p className="text-sm text-zinc-400 mb-8">Deploying immediate rapid response unit to coordinate node <span className="text-blue-400 font-mono">{dispatchModal}</span>. Do you authorize this action?</p>
              
              <div className="flex gap-4">
                <button onClick={() => setDispatchModal(null)} className="flex-1 py-3 bg-[#18181b] hover:bg-zinc-800 text-white rounded-xl font-mono text-xs tracking-widest uppercase transition-colors">Abort</button>
                <button onClick={confirmDispatch} className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-mono text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-colors">Authorize Deploy</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
