'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, AlertTriangle, CheckCircle2, Clock, MapPin, Filter, Search, ShieldAlert } from 'lucide-react';

const mockLogs = [
  { id: 'SOS-8942', date: '2026-07-03 22:15', type: 'Severe Collision & Blockade', coords: '23.8103° N, 90.4125° E (Dhaka Corridor Node)', status: 'PENDING', priority: 'HIGH', confidence: '99.2%' },
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
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 min-h-[85vh] text-white pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-2">
            <History className="w-3.5 h-3.5" /> Cryptographic Ledger
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">My SOS Logs & Dispatches</h1>
          <p className="text-zinc-400 text-sm mt-1">Immutable history of all hazard reports broadcasted from your verified identity node.</p>
        </div>
        <div className="flex items-center gap-4 font-mono text-xs text-zinc-400 bg-[#050b14] px-4 py-2.5 rounded-2xl border border-white/10">
          <span>Active Broadcasts: <strong className="text-emerald-400">{mockLogs.length}</strong></span>
          <span className="w-[1px] h-4 bg-zinc-800"></span>
          <span>Pending Resolution: <strong className="text-amber-400">{mockLogs.filter(l => l.status === 'PENDING').length}</strong></span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#050b14] p-4 rounded-2xl border border-white/10 shadow-xl">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by ID, classification, or coordinates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 bg-black/60 p-1 rounded-xl border border-white/10 self-start sm:self-auto">
          {(['ALL', 'PENDING', 'RESOLVED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                filter === status
                  ? status === 'PENDING' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                    : status === 'RESOLVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'bg-zinc-800 text-white shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Aceternity Table Container */}
      <div className="bg-[#050b14] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-black/80 text-[10px] font-mono text-zinc-400 uppercase tracking-widest border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium">DISPATCH ID</th>
                <th className="px-6 py-4 font-medium">TIMESTAMP</th>
                <th className="px-6 py-4 font-medium">HAZARD CLASSIFICATION</th>
                <th className="px-6 py-4 font-medium">GEOSPATIAL NODE</th>
                <th className="px-6 py-4 font-medium">CV CONFIDENCE</th>
                <th className="px-6 py-4 font-medium">MUNICIPAL STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-500 font-mono text-xs">
                      No matching records located in regional ledger.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <motion.tr
                      layout
                      whileHover={{ scale: 1.006, backgroundColor: 'rgba(16, 185, 129, 0.04)' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={log.id}
                      className="transition-colors group cursor-default"
                    >
                      <td className="px-6 py-4 font-mono text-emerald-400 font-bold text-xs">{log.id}</td>
                      <td className="px-6 py-4 font-mono text-zinc-400 text-xs">{log.date}</td>
                      <td className="px-6 py-4 font-semibold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        {log.type}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-zinc-400">
                        <span className="flex items-center gap-1.5 truncate max-w-xs">
                          <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                          {log.coords}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-zinc-300 font-bold">
                        {log.confidence}
                      </td>
                      <td className="px-6 py-4">
                        {log.status === 'RESOLVED' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.25)]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> RESOLVED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.25)] animate-pulse">
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
