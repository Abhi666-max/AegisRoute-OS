'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Bot, Zap, Plus } from 'lucide-react';

const fleetData = [
  { id: 'RT-11', type: 'Rapid Triage Unit', status: 'DISPATCHED', loc: 'NH-48, Panvel Node', fuel: '78%' },
  { id: 'TOW-4B', type: 'Heavy Towing Infra', status: 'STANDBY', loc: 'Central Station Block B', fuel: '95%' },
  { id: 'AI-LGL-1', type: 'Legal AI Node', status: 'PROCESSING', loc: 'Server Cluster X', fuel: 'N/A' },
  { id: 'RT-09', type: 'Rapid Triage Unit', status: 'EN ROUTE', loc: 'Mumbra Bypass Corridor', fuel: '45%' },
  { id: 'TOW-1A', type: 'Light Towing Infra', status: 'STANDBY', loc: 'Sector 14 Deployment', fuel: '100%' },
];

export default function FleetMatrixPage() {
  const [fleet, setFleet] = useState(fleetData);
  const [allocationModal, setAllocationModal] = useState<string | null>(null);

  const confirmAllocation = () => {
    if (!allocationModal) return;
    setFleet(prev => prev.map(f => f.id === allocationModal ? { ...f, status: 'DISPATCHED' } : f));
    setAllocationModal(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 min-h-[80vh] bg-[#020205] border border-[#18181b] rounded-3xl relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
      
      <div className="relative z-10 mb-8 flex items-center justify-between">
         <div>
           <h1 className="text-3xl font-bold tracking-tighter text-white mb-2 flex items-center gap-3">
             <Truck className="text-blue-500" /> FLEET MATRIX
           </h1>
           <p className="text-zinc-500 font-mono tracking-widest uppercase text-xs">Resource Allocation & Infra Tracking</p>
         </div>
      </div>

      <div className="relative z-10 bg-[#05050a] border border-[#18181b] rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#020205] text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-[#18181b]">
            <tr>
              <th className="px-6 py-4 font-medium">RESOURCE ID</th>
              <th className="px-6 py-4 font-medium">TYPE CLASSIFICATION</th>
              <th className="px-6 py-4 font-medium">STATE</th>
              <th className="px-6 py-4 font-medium">ENERGY/FUEL</th>
              <th className="px-6 py-4 font-medium text-right">DEPLOYMENT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#18181b] text-zinc-300">
            <AnimatePresence>
              {fleet.map((unit) => (
                <motion.tr layout key={unit.id} className="hover:bg-blue-900/10 transition-colors group">
                  <td className="px-6 py-5 font-mono font-bold text-white flex items-center gap-2">
                    {unit.id.includes('AI') ? <Bot className="w-4 h-4 text-blue-500" /> : <Truck className="w-4 h-4 text-zinc-500" />}
                    {unit.id}
                  </td>
                  <td className="px-6 py-5 text-zinc-300">{unit.type}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest border ${
                      unit.status === 'STANDBY' ? 'bg-[#18181b] text-zinc-400 border-[#18181b]' :
                      unit.status === 'PROCESSING' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                      'bg-blue-500/10 text-blue-500 border-blue-500/20'
                    }`}>
                      {unit.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-mono text-xs flex items-center gap-2">
                    <Zap className="w-3 h-3 text-emerald-500" /> {unit.fuel}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setAllocationModal(unit.id)}
                      disabled={unit.status !== 'STANDBY'}
                      className="bg-blue-600/20 hover:bg-blue-600/40 disabled:bg-zinc-900 disabled:text-zinc-600 border border-blue-500/30 disabled:border-transparent text-blue-400 px-4 py-2 rounded-lg text-[10px] font-bold font-mono uppercase tracking-widest transition-all inline-flex items-center gap-2"
                    >
                      <Plus className="w-3 h-3" /> ALLOCATE
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Centered Glassmorphic Modal */}
      <AnimatePresence>
        {allocationModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setAllocationModal(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#020205]/90 backdrop-blur-2xl border border-[#18181b] p-8 rounded-3xl shadow-[0_0_50px_rgba(37,99,235,0.1)] text-center"
            >
              <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                <Truck className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold tracking-tighter text-white mb-2">ALLOCATE RESOURCE</h2>
              <p className="text-sm text-zinc-400 mb-8">Deploying infrastructure <span className="text-blue-400 font-mono">{allocationModal}</span> to active operational grid. Confirm deployment parameters.</p>
              
              <div className="flex gap-4">
                <button onClick={() => setAllocationModal(null)} className="flex-1 py-3 bg-[#18181b] hover:bg-zinc-800 text-white rounded-xl font-mono text-xs tracking-widest uppercase transition-colors">Abort</button>
                <button onClick={confirmAllocation} className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-mono text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-colors">Authorize Allocation</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
