import { Terminal as TerminalIcon } from 'lucide-react';

export default function FeedPage() {
  const simulatedLogs = Array.from({ length: 20 }).map((_, i) => {
    const actions = ['AUTH_SUCCESS', 'ROUTE_CALCULATED', 'DB_SYNC', 'VECTOR_INDEXED', 'NODE_HEARTBEAT', 'SOS_PING_REJECTED'];
    const ips = ['192.168.1.104', '10.0.0.44', '172.16.254.1', '8.8.8.8', '142.250.190.46'];
    return {
      id: i,
      time: new Date(Date.now() - i * 14000).toISOString().split('T')[1].slice(0, -1),
      action: actions[Math.floor(Math.random() * actions.length)],
      ip: ips[Math.floor(Math.random() * ips.length)],
      latency: Math.floor(Math.random() * 40) + 5
    };
  });

  return (
    <div className="p-8 min-h-screen bg-[#020202] text-white">
      <div className="flex items-center gap-3 mb-2">
        <TerminalIcon className="w-8 h-8 text-emerald-500" />
        <h1 className="text-3xl font-bold tracking-tighter text-emerald-500">Live Incident Feed</h1>
      </div>
      <p className="text-zinc-500 mb-8">System telemetry linked and operational. Real-time network stream active.</p>
      
      <div className="mt-8 border border-zinc-800 rounded-xl h-[600px] bg-black p-6 font-mono text-xs text-zinc-500 overflow-hidden relative shadow-[0_0_50px_rgba(16,185,129,0.05)]">
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex flex-col gap-2 h-full overflow-y-auto custom-scrollbar relative z-0 pr-4">
          {simulatedLogs.map((log) => (
            <div key={log.id} className="flex items-center gap-4 py-1 hover:bg-zinc-900/50 transition-colors px-2 rounded">
              <span className="text-zinc-600">[{log.time}]</span>
              <span className="text-zinc-400 w-32">{log.ip}</span>
              <span className={
                log.action.includes('REJECTED') ? 'text-red-500 font-bold w-48' : 
                log.action.includes('SUCCESS') ? 'text-emerald-500 w-48' : 'text-blue-400 w-48'
              }>{log.action}</span>
              <span className="text-zinc-600 ml-auto">executed in {log.latency}ms</span>
            </div>
          ))}
          <div className="flex items-center gap-4 py-1 px-2 mt-4 text-emerald-500 animate-pulse">
            <span className="w-2 h-4 bg-emerald-500"></span> Waiting for incoming packets...
          </div>
        </div>
      </div>
    </div>
  );
}
