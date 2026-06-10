'use client';
import { Terminal as TerminalIcon, Search, Pause, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ACTIONS = ['AUTH_SUCCESS', 'EDGE_INFERENCE', 'DB_SYNC', 'VECTOR_INDEXED', 'NODE_HEARTBEAT', 'UNAUTHORIZED_ACCESS', 'RAG_QUERY'];
const IPS = ['192.168.1.104', '10.0.0.44', '172.16.254.1', '8.8.8.8', '142.250.190.46', '10.21.4.15'];
const NODES = ['mumbai_auth', 'dhaka_central', 'colombo_metro', 'bkk_patrol', 'sys_root', 'api_gateway'];

const generateLog = (id: number) => {
  const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
  const isError = action === 'UNAUTHORIZED_ACCESS';
  return {
    id,
    time: new Date().toISOString().split('T')[1].slice(0, -1),
    action: action,
    ip: IPS[Math.floor(Math.random() * IPS.length)],
    node: NODES[Math.floor(Math.random() * NODES.length)],
    latency: Math.floor(Math.random() * 40) + 5,
    status: isError ? (Math.random() > 0.5 ? 401 : 500) : 200,
    statusText: isError ? 'DENIED' : 'OK'
  };
};

export default function FeedPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // Initial logs
    const initial = Array.from({ length: 15 }).map((_, i) => generateLog(i)).reverse();
    setLogs(initial);
  }, []);

  useEffect(() => {
    if (!isLive) return;
    
    let counter = 15;
    const interval = setInterval(() => {
      counter++;
      const newLog = generateLog(counter);
      setLogs(prev => [newLog, ...prev].slice(0, 50));
    }, 1500);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="p-8 min-h-screen bg-[#020202] text-white">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <TerminalIcon className="w-8 h-8 text-emerald-500" />
          <h1 className="text-3xl font-bold tracking-tighter text-emerald-500">Live SIEM Feed</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-widest transition-colors ${isLive ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'}`}
          >
            {isLive ? <><Pause className="w-4 h-4" /> Live Stream: Active</> : <><Play className="w-4 h-4" /> Live Stream: Paused</>}
          </button>
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-zinc-500" />
            <input type="text" placeholder="Filter logs..." className="bg-transparent text-xs text-white outline-none w-48 font-mono" />
          </div>
        </div>
      </div>
      
      <div className="border border-zinc-800 rounded-xl bg-[#050505] shadow-2xl overflow-hidden h-[600px] flex flex-col relative">
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#020202] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#020202] to-transparent z-10 pointer-events-none"></div>
        
        <div className="overflow-x-auto flex-1 overflow-y-auto custom-scrollbar relative z-0">
          <table className="w-full text-left text-xs whitespace-nowrap font-mono">
            <thead className="bg-[#020202]/90 text-[10px] text-zinc-500 uppercase tracking-widest border-b border-zinc-800 sticky top-0 backdrop-blur-sm z-20">
              <tr>
                <th className="px-6 py-4 font-medium">Timestamp</th>
                <th className="px-6 py-4 font-medium">IP Address</th>
                <th className="px-6 py-4 font-medium">Node Identifier</th>
                <th className="px-6 py-4 font-medium">Event Type</th>
                <th className="px-6 py-4 font-medium">Latency</th>
                <th className="px-6 py-4 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 relative">
              <AnimatePresence initial={false}>
                {logs.map((log) => (
                  <motion.tr 
                    key={log.id} 
                    initial={{ opacity: 0, y: -20, backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
                    animate={{ opacity: 1, y: 0, backgroundColor: 'rgba(0, 0, 0, 0)' }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-white/[0.02] transition-colors group cursor-default"
                  >
                    <td className="px-6 py-3 text-zinc-500">[{log.time}]</td>
                    <td className="px-6 py-3 text-zinc-400 group-hover:text-white transition-colors">{log.ip}</td>
                    <td className="px-6 py-3 text-blue-400">{log.node}</td>
                    <td className="px-6 py-3 text-zinc-300">{log.action}</td>
                    <td className="px-6 py-3 text-zinc-500">{log.latency}ms</td>
                    <td className="px-6 py-3 text-right">
                      <span className={log.status === 200 ? 'text-emerald-500' : 'text-red-500 font-bold'}>
                        [{log.status} {log.statusText}]
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
