'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Activity, Crosshair, Navigation, CheckCircle2, X } from 'lucide-react';

const initialQueue = [
  { id: 'SOS-1001', type: 'Severe Collision', location: 'Dhaka Transit Corridor', status: 'UNASSIGNED CITIZEN REPORT', time: 'Just now', severity: 'CRITICAL' },
  { id: 'SOS-1002', type: 'Bridge Structural Failure', location: 'Colombo Hub, Section 4', status: 'UNASSIGNED CITIZEN REPORT', time: '2 mins ago', severity: 'CRITICAL' },
  { id: 'SOS-1003', type: 'Landslide Debris', location: 'BIMSTEC Route 7', status: 'UNASSIGNED CITIZEN REPORT', time: '5 mins ago', severity: 'HIGH' },
  { id: 'SOS-1004', type: 'Gridlock Interruption', location: 'Panvel Node', status: 'UNASSIGNED CITIZEN REPORT', time: '8 mins ago', severity: 'MODERATE' },
  { id: 'SOS-1005', type: 'Signal Malfunction', location: 'NH-48 Sector', status: 'UNASSIGNED CITIZEN REPORT', time: '11 mins ago', severity: 'MODERATE' },
  { id: 'SOS-1006', type: 'Multi-Vehicle Accident', location: 'Mumbai-Pune Expressway', status: 'UNASSIGNED CITIZEN REPORT', time: '15 mins ago', severity: 'CRITICAL' },
  { id: 'SOS-1007', type: 'Chemical Spill', location: 'Surat Industrial Transit', status: 'UNASSIGNED CITIZEN REPORT', time: '18 mins ago', severity: 'CRITICAL' },
  { id: 'SOS-1008', type: 'Flooding', location: 'Kochi Port Entry', status: 'UNASSIGNED CITIZEN REPORT', time: '21 mins ago', severity: 'HIGH' },
  { id: 'SOS-1009', type: 'Pothole Cluster', location: 'BIMSTEC Route 2', status: 'UNASSIGNED CITIZEN REPORT', time: '25 mins ago', severity: 'LOW' },
  { id: 'SOS-1010', type: 'Animal on Highway', location: 'NH-10 Sector', status: 'UNASSIGNED CITIZEN REPORT', time: '30 mins ago', severity: 'LOW' },
];

export default function IngressQueuePage() {
  const [activeTab, setActiveTab] = useState<'queue' | 'dispatched'>('queue');
  const [queue, setQueue] = useState(initialQueue);
  const [dispatched, setDispatched] = useState<{ id: string, type: string, location: string, status: string, time: string, severity: string }[]>([]);
  
  const [dispatchModal, setDispatchModal] = useState<string | null>(null);

  const confirmDispatch = () => {
    if (!dispatchModal) return;
    const incident = queue.find(inc => inc.id === dispatchModal);
    if (incident) {
      setQueue(prev => prev.filter(inc => inc.id !== dispatchModal));
      setDispatched(prev => [{ ...incident, status: 'UNIT EN-ROUTE' }, ...prev]);
    }
    setDispatchModal(null);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen text-white relative">
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tighter text-white">INGRESS QUEUE</h1>
        <p className="text-zinc-500 font-mono tracking-widest uppercase text-sm mt-1">Real-Time Integrated Stream</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 mb-6 border-b border-[#18181b] pb-4">
        <button 
          onClick={() => setActiveTab('queue')}
          className={`px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all ${activeTab === 'queue' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.2)]' : 'bg-[#050505] text-zinc-500 border border-[#18181b] hover:text-white'}`}
        >
          Active Queue ({queue.length})
        </button>
        <button 
          onClick={() => setActiveTab('dispatched')}
          className={`px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all ${activeTab === 'dispatched' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.2)]' : 'bg-[#050505] text-zinc-500 border border-[#18181b] hover:text-white'}`}
        >
          Dispatched Tracking ({dispatched.length})
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
                {(activeTab === 'queue' ? queue : dispatched).map((inc) => (
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
                    <td className="px-6 py-5 text-zinc-300 font-medium">{inc.type}</td>
                    <td className="px-6 py-5 text-zinc-500 font-mono text-xs flex items-center gap-2">
                      <Navigation className="w-3 h-3 text-zinc-600" /> {inc.location}
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest border ${
                        inc.status.includes('UNASSIGNED') ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                        inc.status.includes('EN-ROUTE') ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                        'bg-[#18181b] text-zinc-400 border-[#18181b]'
                      }`}>
                        {inc.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      {activeTab === 'queue' ? (
                        <motion.button 
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setDispatchModal(inc.id)}
                          className="bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-lg text-[10px] font-bold font-mono uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(37,99,235,0.1)]"
                        >
                          DISPATCH EMERGENCY UNIT
                        </motion.button>
                      ) : (
                        <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest flex items-center justify-end gap-2">
                          <Activity className="w-3 h-3 text-blue-500 animate-spin" /> TRACKING ACTIVE
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
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
