'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Clock, MapPin, Search, Lock, Radio, Ban, ShieldAlert } from 'lucide-react';
import { useIncidentStore } from '@/store/useIncidentStore';
import { toast } from 'sonner';

export default function CitizenLogsPage() {
  const { incidents, revokeIncident } = useIncidentStore();
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'RESOLVED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [revokeModalId, setRevokeModalId] = useState<string | null>(null);

  const filteredLogs = useMemo(() => {
    return incidents.filter((log) => {
      const isPending = log.status === 'PENDING' || log.status === 'UNASSIGNED CITIZEN REPORT' || log.status === 'CRITICAL' || log.status === 'UNIT EN-ROUTE';
      const isResolved = log.status === 'RESOLVED';
      const matchesFilter = filter === 'ALL' || 
                           (filter === 'PENDING' && isPending) || 
                           (filter === 'RESOLVED' && isResolved);
      const matchesSearch = log.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            log.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            log.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [incidents, filter, searchQuery]);

  const handleConfirmRevocation = () => {
    if (revokeModalId) {
      revokeIncident(revokeModalId);
      toast.info(`Signal ${revokeModalId} revoked. Marked as CANCELLED_BY_USER across authority nodes.`);
      setRevokeModalId(null);
    }
  };

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
            Active Broadcasts: <strong className="text-emerald-400 font-semibold text-sm">{incidents.length}</strong>
          </span>
          <span className="w-[1px] h-6 bg-zinc-800"></span>
          <span>Pending: <strong className="text-amber-400 font-semibold text-sm">{incidents.filter(l => l.status === 'PENDING' || logIsActive(l.status)).length}</strong></span>
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
                <th className="px-6 py-4 text-right">Action / Revocation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              <AnimatePresence>
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center text-zinc-500 text-sm font-normal">
                      No matching records located in regional ledger.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log, index) => {
                    const isActive = logIsActive(log.status);
                    const isCancelled = log.status === 'CANCELLED_BY_USER';
                    return (
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
                        <td className="px-6 py-4 text-zinc-400 text-xs">{log.time}</td>
                        <td className="px-6 py-4 font-semibold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-2.5">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                          {log.type}
                        </td>
                        <td className="px-6 py-4 text-xs text-zinc-400">
                          <span className="flex items-center gap-1.5 truncate max-w-xs">
                            <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                            {log.location}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-zinc-300 font-semibold">
                          {log.confidence || '98.4%'}
                        </td>
                        <td className="px-6 py-4">
                          {log.status === 'RESOLVED' ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                            </span>
                          ) : isCancelled ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/30">
                              <Ban className="w-3.5 h-3.5" /> Cancelled by User
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30">
                              <Clock className="w-3.5 h-3.5 animate-pulse" /> {log.status}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {isActive && !isCancelled ? (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setRevokeModalId(log.id)}
                              className="px-3.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-medium tracking-tight transition-all flex items-center gap-1.5 ml-auto shadow-sm"
                            >
                              <Ban className="w-3.5 h-3.5" /> Revoke Signal / False Alarm
                            </motion.button>
                          ) : (
                            <span className="text-xs text-zinc-600 font-normal">No action required</span>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Revocation Warning Modal */}
      <AnimatePresence>
        {revokeModalId && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-[#0a0a0a] border border-red-900/50 p-8 rounded-3xl shadow-2xl text-center space-y-6"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.2)]">
                <ShieldAlert className="w-8 h-8 text-red-500 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                  Revoke Emergency Broadcast?
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                  Are you sure you want to revoke signal <strong className="text-zinc-200">{revokeModalId}</strong>? This will mark the incident as <span className="text-red-400 font-medium">CANCELLED_BY_USER</span> across all Authority dispatch queues and notify fleet units to stand down immediately.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => setRevokeModalId(null)}
                  className="flex-1 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white rounded-xl text-sm font-medium tracking-tight transition-all"
                >
                  Keep Active
                </button>
                <button
                  onClick={handleConfirmRevocation}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-semibold tracking-tight shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all border border-red-400/40"
                >
                  Confirm Revocation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function logIsActive(status: string) {
  return status === 'PENDING' || status === 'UNASSIGNED CITIZEN REPORT' || status === 'CRITICAL' || status === 'UNIT EN-ROUTE';
}
