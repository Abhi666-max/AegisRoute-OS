'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Shield, Activity, Users, Bot, MapPin } from 'lucide-react';

const personnelData = [
  { id: 'OP-77A', name: 'Agent K. Sharma', role: 'Field Commander', sector: 'Dhaka Transit Corridor', status: 'ON-DUTY' },
  { id: 'OP-12B', name: 'Officer J. Singh', role: 'Traffic Enforcement', sector: 'Panvel Node', status: 'EN-ROUTE' },
  { id: 'AI-99X', name: 'Aegis Sentinel v2', role: 'AI Dispatch Bot', sector: 'Colombo Hub', status: 'ON-DUTY' },
  { id: 'OP-44C', name: 'Agent R. Menon', role: 'Rapid Response', sector: 'NH-48 Sector', status: 'STANDBY' },
  { id: 'OP-88D', name: 'Officer T. Patel', role: 'Traffic Enforcement', sector: 'BIMSTEC Route 4', status: 'ON-DUTY' },
  { id: 'AI-44Y', name: 'Aegis Drone Node', role: 'Aerial Recon', sector: 'Mumbai-Pune Expressway', status: 'STANDBY' },
];

export default function PersonnelControlPage() {
  const [personnel, setPersonnel] = useState(personnelData);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 min-h-[80vh] bg-[#020205] border border-[#18181b] rounded-3xl relative overflow-hidden">
      {/* Micro-zinc grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
      
      <div className="relative z-10 mb-8 flex items-center justify-between">
         <div>
           <h1 className="text-3xl font-bold tracking-tighter text-white mb-2 flex items-center gap-3">
             <Users className="text-blue-500" /> OPERATIONAL DEPLOYMENT
           </h1>
           <p className="text-zinc-500 font-mono tracking-widest uppercase text-xs">Personnel Control Matrix</p>
         </div>
         <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div> Active Nodes: {personnel.filter(p => p.status === 'ON-DUTY').length}
           </div>
         </div>
      </div>

      <div className="relative z-10 bg-[#05050a] border border-[#18181b] rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#020205] text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-[#18181b]">
            <tr>
              <th className="px-6 py-4 font-medium">IDENTIFIER</th>
              <th className="px-6 py-4 font-medium">OPERATIVE NAME</th>
              <th className="px-6 py-4 font-medium">CLASSIFICATION</th>
              <th className="px-6 py-4 font-medium">SECTOR</th>
              <th className="px-6 py-4 font-medium">DEPLOYMENT STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#18181b] text-zinc-300">
            <AnimatePresence>
              {personnel.map((p) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={p.id} 
                  className="hover:bg-blue-900/10 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-5 font-mono font-bold text-white flex items-center gap-2">
                    {p.id.startsWith('AI') ? <Bot className="w-4 h-4 text-blue-400" /> : <Shield className="w-4 h-4 text-zinc-500" />}
                    {p.id}
                  </td>
                  <td className="px-6 py-5 font-medium text-zinc-200 group-hover:text-blue-400 transition-colors">{p.name}</td>
                  <td className="px-6 py-5 font-mono text-xs text-zinc-500">{p.role}</td>
                  <td className="px-6 py-5 font-mono text-xs text-zinc-400 flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-zinc-600" /> {p.sector}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest border ${
                      p.status === 'ON-DUTY' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                      p.status === 'EN-ROUTE' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      'bg-[#18181b] text-zinc-400 border-zinc-800'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
