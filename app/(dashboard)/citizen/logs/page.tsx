'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Clock, MapPin, Search, Lock, Radio } from 'lucide-react';

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
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 min-h-[85vh] text-zinc-100 pb-16 font-sans antialiased">
      {/* Header Banner */}
      <motion.div 
        whileHover={{ scale: 1.005 }} 
        transition={{ duration: 0.2 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 border border-zinc-800/80 bg-gradient-to-r from-zinc-950 via-zinc-900/80 to-zinc-950 p-8 rounded-3xl shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-emerald-400 text-xs font-medium tracking-tight mb-3">
            <Lock className="w-3.5 h-3.5" /> Cryptographic Ledger Array
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">Immutable Citizen Ledger</h1>
          <p className="text-zinc-400 text-sm mt-1 font-normal">Verifiable history of all hazard telemetries committed from your enclave node.</p>
        </div>

        <div className="flex items-center gap-6 font-medium text-xs text-zinc-400 bg-zinc-950 px-6 py-3.5 rounded-2xl border border-zinc-800 shadow-inner relative z-10">
          <span className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            Active Broadcasts: <strong className="text-emerald-400 font-semibold text-sm">{mockLogs.length}</strong>
          </span>
          <span className="w-[1px] h-6 bg-zinc-800"></span>
          <span>Pending: <strong className="text-amber-400 font-semibold text-sm">{mockLogs.filter(l => l.status === 'PENDING').length}</strong></span>
        </div>
      </motion.div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800/80 shadow-md">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search ledger by ID, classification, or coordinates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-zinc-900/50 p-1 rounded-xl border border-zinc-800/80 self-start sm:self-auto">
          {(['ALL', 'PENDING', 'RESOLVED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium tracking-tight transition-all ${
                filter === status
                  ? status === 'PENDING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : status === 'RESOLVED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-zinc-800 text-white shadow-sm border border-zinc-700'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              {status === 'ALL' ? 'All Records' : status === 'PENDING' ? 'Pending' : 'Resolved'}
            </button>
          ))}
        </div>
      </div>

      {/* Immutable Ledger Table */}
      <div className="bg-zinc-950/90 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-900/60 text-xs font-medium text-zinc-400 border-b border-zinc-800/80">
              <tr>
                <th className="px-6 py-4">Dispatch ID</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Hazard Classification</th>
                <th className="px-6 py-4">Geospatial Node</th>
                <th className="px-6 py-4">CV Confidence</th>
                <th className="px-6 py-4">Municipal Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              <AnimatePresence>
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-zinc-500 text-sm font-normal">
                      No matching records located in regional ledger.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log, index) => (
                    <motion.tr
                      layout
                      whileHover={{ scale: 1.003, backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      key={log.id}
                      className="bg-zinc-950/40 hover:bg-zinc-900/50 transition-colors group cursor-default"
                    >
                      <td className="px-6 py-4 font-mono text-emerald-400 font-medium text-xs">{log.id}</td>
                      <td className="px-6 py-4 text-zinc-400 text-xs">{log.date}</td>
                      <td className="px-6 py-4 font-semibold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        {log.type}
                      </td>
                      <td className="px-6 py-4 text-xs text-zinc-400">
                        <span className="flex items-center gap-1.5 truncate max-w-xs">
                          <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                          {log.coords}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-zinc-300 font-semibold">
                        {log.confidence}
                      </td>
                      <td className="px-6 py-4">
                        {log.status === 'RESOLVED' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30">
                            <Clock className="w-3.5 h-3.5 animate-pulse" /> Pending
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
