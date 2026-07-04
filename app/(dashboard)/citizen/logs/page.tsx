'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, AlertTriangle, CheckCircle2, Clock, MapPin, Filter, Search, ShieldAlert, Lock, Radio } from 'lucide-react';

const mockLogs = [
  { id: 'SOS-8942', date: '2026-07-04 13:15', type: 'Severe Collision & Blockade', coords: '23.8103° N, 90.4125° E (Dhaka Corridor Node)', status: 'PENDING', priority: 'HIGH', confidence: '99.2%' },
  { id: 'SOS-8891', date: '2026-07-03 19:40', type: 'Structural Pothole Fracture', coords: '18.9894° N, 73.1175° E (Panvel Sector 4)', status: 'RESOLVED', priority: 'MODERATE', confidence: '96.8%' },
  { id: 'SOS-8821', date: '2026-07-03 15:10', type: 'Highway Gridlock Stagnation', coords: '6.9271° N, 79.8612° E (Colombo Port Mesh)', status: 'RESOLVED', priority: 'LOW', confidence: '94.5%' },
  { id: 'SOS-8754', date: '2026-07-02 11:32', type: 'Flash Flood Waterlogging', coords: '9.9312° N, 76.2673° E (Kochi Marine Drive)', status: 'RESOLVED', priority: 'HIGH', confidence: '98.1%' },
  { id: 'SOS-8690', date: '2026-07-01 08:20', type: 'Traffic Signal Power Grid Failure', coords: '22.5726° N, 88.3639° E (Kolkata Central Hub)', status: 'PENDING', priority: 'HIGH', confidence: '97.9%' },
  { id: 'SOS-8630', date: '2026-06-29 14:05', type: 'Road Surface Degradation', coords: '13.0827° N, 80.2707° E (Chennai IT Expressway)', status: 'RESOLVED', priority: 'MODERATE', confidence: '95.4%' },
  { id: 'SOS-8512', date: '2026-06-25 21:50', type: 'Bridge Expansion Joint Gap', coords: '21.1458° N, 79.0882° E (Nagpur Zero Mile Array)', status: 'RESOLVED', priority: 'HIGH', confidence: '99.5%' },
];

export default function CitizenLogsPage() {
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'RESOLVED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = useMemo(() => {
    return mockLogs.filter((log) => {
      const matchesFilter = filter === 'ALL' || log.status === filter;
      const matchesSearch = log.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            log.coords.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            log.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-10 min-h-[85vh] text-white pb-16 bg-black">
      {/* Header Banner */}
      <motion.div 
        whileHover={{ scale: 1.01 }} 
        transition={{ duration: 0.2 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 border border-zinc-800 bg-gradient-to-r from-zinc-950 via-black to-zinc-950 p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.9)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Lock className="w-3.5 h-3.5" /> Cryptographic Ledger Array
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">Immutable Citizen Ledger</h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 font-mono">Verifiable history of all hazard telemetries committed from your enclave node.</p>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs text-zinc-400 bg-black/80 px-6 py-4 rounded-2xl border border-zinc-800 shadow-inner relative z-10">
          <span className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            Active Broadcasts: <strong className="text-emerald-400 font-bold text-sm">{mockLogs.length}</strong>
          </span>
          <span className="w-[1px] h-6 bg-zinc-800"></span>
          <span>Pending: <strong className="text-amber-400 font-bold text-sm">{mockLogs.filter(l => l.status === 'PENDING').length}</strong></span>
        </div>
      </motion.div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-zinc-950/80 p-5 rounded-3xl border border-zinc-800 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search ledger by ID, classification, or coordinates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black border border-zinc-800 rounded-2xl pl-11 pr-4 py-3 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60 transition-colors shadow-inner"
          />
        </div>

        <div className="flex items-center gap-2 bg-black p-1.5 rounded-2xl border border-zinc-800 self-start sm:self-auto">
          {(['ALL', 'PENDING', 'RESOLVED'] as const).map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                filter === status
                  ? status === 'PENDING' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                    : status === 'RESOLVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : 'bg-zinc-800 text-white shadow border border-zinc-700'
                  : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
              }`}
            >
              {status}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Immutable Ledger Table */}
      <div className="bg-black border border-zinc-800 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-950 text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-800">
              <tr>
                <th className="px-6 py-5 font-bold">DISPATCH ID</th>
                <th className="px-6 py-5 font-bold">TIMESTAMP</th>
                <th className="px-6 py-5 font-bold">HAZARD CLASSIFICATION</th>
                <th className="px-6 py-5 font-bold">GEOSPATIAL NODE</th>
                <th className="px-6 py-5 font-bold">CV CONFIDENCE</th>
                <th className="px-6 py-5 font-bold">MUNICIPAL STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              <AnimatePresence>
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-zinc-600 font-mono text-xs uppercase tracking-wider">
                      No matching cryptographic records located in regional ledger.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log, index) => (
                    <motion.tr
                      layout
                      whileHover={{ scale: 1.006, backgroundColor: 'rgba(16, 185, 129, 0.05)' }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.07, duration: 0.25 }}
                      key={log.id}
                      className="bg-zinc-950/50 hover:bg-zinc-900/60 transition-colors group cursor-default"
                    >
                      <td className="px-6 py-5 font-mono text-emerald-400 font-bold text-xs tracking-wider">{log.id}</td>
                      <td className="px-6 py-5 font-mono text-zinc-400 text-xs">{log.date}</td>
                      <td className="px-6 py-5 font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        {log.type}
                      </td>
                      <td className="px-6 py-5 font-mono text-xs text-zinc-400">
                        <span className="flex items-center gap-1.5 truncate max-w-xs">
                          <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                          {log.coords}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-mono text-xs text-zinc-300 font-black">
                        {log.confidence}
                      </td>
                      <td className="px-6 py-5">
                        {log.status === 'RESOLVED' ? (
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> RESOLVED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.3)] animate-pulse">
                            <Clock className="w-3.5 h-3.5" /> PENDING
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
