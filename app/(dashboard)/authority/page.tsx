'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Activity, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AuthorityDashboard() {
  const [activeTab, setActiveTab] = useState<'active' | 'archive'>('active');
  const [incidents, setIncidents] = useState([
    { id: 'SOS-991', type: 'Severe Accident', location: 'NH-48, Panvel', status: 'CRITICAL', time: 'Just now' },
    { id: 'SOS-992', type: 'Bridge Collapse', location: 'NH-10, Kharghar', status: 'SEVERE', time: '4 mins ago' },
    { id: 'SOS-993', type: 'Traffic Gridlock', location: 'Mumbra Bypass', status: 'MODERATE', time: '12 mins ago' }
  ]);
  const [archived, setArchived] = useState<{ id: string, type: string, location: string, status: string, time: string }[]>([]);

  const handleDispatch = (id: string) => {
    toast.success('Ambulance Unit Dispatched.', { icon: '🚑' });
    setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, status: 'DISPATCHED' } : inc));
  };

  const handleResolve = (incident: any) => {
    setIncidents(prev => prev.filter(inc => inc.id !== incident.id));
    setArchived(prev => [{ ...incident, status: 'RESOLVED', time: 'Archived' }, ...prev]);
    toast.success('Incident marked as RESOLVED.', { icon: '✅' });
  };

  const handleReopen = (incident: any) => {
    setArchived(prev => prev.filter(inc => inc.id !== incident.id));
    setIncidents(prev => [{ ...incident, status: 'CRITICAL', time: 'Re-opened' }, ...prev]);
    toast.error('Case re-opened and escalated.', { icon: '⚠️' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen text-white">
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tighter text-white">COMMAND CENTER</h1>
        <p className="text-zinc-500 font-mono tracking-widest uppercase text-sm mt-1">Regional Authority Dispatch Protocol</p>
      </div>

      {/* Bento Grid Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div whileHover={{ scale: 1.02 }} className="bg-[#050505] border border-zinc-800 p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between h-48">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="flex items-center gap-3 relative z-10">
            <AlertTriangle className="text-red-500 w-6 h-6" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Active SOS Signals</span>
          </div>
          <div className="text-6xl font-black text-red-500 animate-pulse relative z-10">{incidents.length}</div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-[#050505] border border-zinc-800 p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between h-48">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="flex items-center gap-3 relative z-10">
            <Activity className="text-blue-500 w-6 h-6" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Fleet Units Available</span>
          </div>
          <div className="text-6xl font-black text-blue-500 relative z-10">142</div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-[#050505] border border-zinc-800 p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between h-48">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="flex items-center gap-3 relative z-10">
            <Clock className="text-emerald-500 w-6 h-6" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Avg Response Time</span>
          </div>
          <div className="text-6xl font-black text-emerald-500 relative z-10">3.4<span className="text-xl ml-2 text-zinc-500">min</span></div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 mb-6 border-b border-zinc-800 pb-4">
        <button 
          onClick={() => setActiveTab('active')}
          className={`px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all ${activeTab === 'active' ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'bg-[#050505] text-zinc-500 border border-zinc-800 hover:text-white'}`}
        >
          Live Triage ({incidents.length})
        </button>
        <button 
          onClick={() => setActiveTab('archive')}
          className={`px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all ${activeTab === 'archive' ? 'bg-zinc-800 text-white' : 'bg-[#050505] text-zinc-500 border border-zinc-800 hover:text-white'}`}
        >
          Archive ({archived.length})
        </button>
      </div>

      {/* Triage Table */}
      <div className="bg-[#050505] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#000000] text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium">INCIDENT ID</th>
                <th className="px-6 py-4 font-medium">CLASSIFICATION</th>
                <th className="px-6 py-4 font-medium">COORDINATES</th>
                <th className="px-6 py-4 font-medium">STATUS</th>
                <th className="px-6 py-4 font-medium text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              <AnimatePresence>
                {(activeTab === 'active' ? incidents : archived).map((inc) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    key={inc.id} 
                    className="hover:bg-zinc-900/50 transition-colors"
                  >
                    <td className="px-6 py-5">
                       <div className="flex items-center gap-3">
                         {inc.status === 'CRITICAL' && <ShieldAlert className="w-4 h-4 text-red-500" />}
                         {inc.status === 'RESOLVED' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                         <span className="font-mono text-white font-bold">{inc.id}</span>
                       </div>
                    </td>
                    <td className="px-6 py-5 text-zinc-300 font-medium">{inc.type}</td>
                    <td className="px-6 py-5 text-zinc-500 font-mono text-xs">{inc.location}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest border ${
                        inc.status === 'CRITICAL' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                        inc.status === 'DISPATCHED' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                        inc.status === 'RESOLVED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}>
                        {inc.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      {activeTab === 'active' ? (
                        <div className="flex justify-end gap-3">
                          <motion.button 
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDispatch(inc.id)}
                            disabled={inc.status === 'DISPATCHED'}
                            className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900/50 disabled:text-blue-500/50 text-white px-4 py-2 rounded-lg text-[10px] font-bold font-mono uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] disabled:shadow-none"
                          >
                            {inc.status === 'DISPATCHED' ? 'UNIT EN ROUTE' : 'DISPATCH FLEET'}
                          </motion.button>
                          <motion.button 
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleResolve(inc)}
                            className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-[10px] font-bold font-mono uppercase tracking-widest transition-all"
                          >
                            MARK RESOLVED
                          </motion.button>
                        </div>
                      ) : (
                        <motion.button 
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleReopen(inc)}
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg text-[10px] font-bold font-mono uppercase tracking-widest transition-all inline-flex items-center gap-2"
                        >
                          <AlertTriangle className="w-3 h-3" /> RE-OPEN CASE
                        </motion.button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
