'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, AlertTriangle, CheckCircle2, Clock, MapPin } from 'lucide-react';

const mockLogs = [
  { id: 'SOS-8821', date: '2026-07-03 18:42', type: 'Severe Collision', coords: '23.8103° N, 90.4125° E (Dhaka Corridor)', status: 'RESOLVED', priority: 'HIGH' },
  { id: 'SOS-8754', date: '2026-07-02 14:15', type: 'Pothole Cluster', coords: '18.9894° N, 73.1175° E (Panvel Node)', status: 'PENDING', priority: 'MODERATE' },
  { id: 'SOS-8630', date: '2026-06-29 09:10', type: 'Gridlock Interruption', coords: '6.9271° N, 79.8612° E (Colombo Hub)', status: 'RESOLVED', priority: 'LOW' },
  { id: 'SOS-8512', date: '2026-06-25 21:05', type: 'Waterlogging Hazard', coords: '9.9312° N, 76.2673° E (Kochi Port)', status: 'RESOLVED', priority: 'HIGH' },
];

export default function CitizenLogsPage() {
  const [logs] = useState(mockLogs);

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 min-h-[80vh] text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-2">
            <History className="w-3.5 h-3.5" /> Immutable Citizen Ledger
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">My SOS Logs & Dispatches</h1>
          <p className="text-zinc-400 text-sm mt-1">Encrypted history of all civic hazard reports broadcasted from your identity node.</p>
        </div>
        <div className="text-right font-mono text-xs text-zinc-500">
          Total Broadcasts: <span className="text-emerald-400 font-bold">{logs.length}</span>
        </div>
      </div>

      <div className="bg-[#050b14] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-black/60 text-[10px] font-mono text-zinc-400 uppercase tracking-widest border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium">TIMESTAMP</th>
                <th className="px-6 py-4 font-medium">HAZARD CLASSIFICATION</th>
                <th className="px-6 py-4 font-medium">GEOSPATIAL COORDINATES</th>
                <th className="px-6 py-4 font-medium">PRIORITY</th>
                <th className="px-6 py-4 font-medium">MUNICIPAL STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {logs.map((log) => (
                  <motion.tr
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={log.id}
                    className="hover:bg-emerald-500/5 transition-colors group"
                  >
                    <td className="px-6 py-4 font-mono text-zinc-300 text-xs">{log.date}</td>
                    <td className="px-6 py-4 font-semibold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      {log.type}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-zinc-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      {log.coords}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase ${
                        log.priority === 'HIGH' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                        log.priority === 'MODERATE' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-zinc-800 text-zinc-300'
                      }`}>
                        {log.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {log.status === 'RESOLVED' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" /> RESOLVED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
                          <Clock className="w-3.5 h-3.5" /> PENDING
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
    </motion.div>
  );
}
