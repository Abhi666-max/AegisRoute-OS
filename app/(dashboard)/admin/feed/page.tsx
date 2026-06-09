import { Terminal as TerminalIcon, Search } from 'lucide-react';

export default function FeedPage() {
  const simulatedLogs = Array.from({ length: 20 }).map((_, i) => {
    const actions = ['AUTH_SUCCESS', 'EDGE_INFERENCE', 'DB_SYNC', 'VECTOR_INDEXED', 'NODE_HEARTBEAT', 'UNAUTHORIZED_ACCESS'];
    const ips = ['192.168.1.104', '10.0.0.44', '172.16.254.1', '8.8.8.8', '142.250.190.46'];
    const nodes = ['mumbai_auth', 'dhaka_central', 'colombo_metro', 'bkk_patrol', 'sys_root'];
    
    const action = actions[Math.floor(Math.random() * actions.length)];
    const isError = action === 'UNAUTHORIZED_ACCESS';
    
    return {
      id: i,
      time: new Date(Date.now() - i * 14000).toISOString().split('T')[1].slice(0, -1),
      action: action,
      ip: ips[Math.floor(Math.random() * ips.length)],
      node: nodes[Math.floor(Math.random() * nodes.length)],
      latency: Math.floor(Math.random() * 40) + 5,
      status: isError ? 401 : 200,
      statusText: isError ? 'DENIED' : 'OK'
    };
  });

  return (
    <div className="p-8 min-h-screen bg-[#020202] text-white">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <TerminalIcon className="w-8 h-8 text-emerald-500" />
          <h1 className="text-3xl font-bold tracking-tighter text-emerald-500">Live SIEM Feed</h1>
        </div>
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-1.5">
          <Search className="w-4 h-4 text-zinc-500" />
          <input type="text" placeholder="Filter logs..." className="bg-transparent text-xs text-white outline-none w-48 font-mono" />
        </div>
      </div>
      
      <div className="border border-zinc-800 rounded-xl bg-[#050505] shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap font-mono">
            <thead className="bg-[#020202] text-[10px] text-zinc-500 uppercase tracking-widest border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium">Timestamp</th>
                <th className="px-6 py-4 font-medium">IP Address</th>
                <th className="px-6 py-4 font-medium">Node Identifier</th>
                <th className="px-6 py-4 font-medium">Event Type</th>
                <th className="px-6 py-4 font-medium">Latency</th>
                <th className="px-6 py-4 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {simulatedLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group cursor-default">
                  <td className="px-6 py-3 text-zinc-500">[{log.time}]</td>
                  <td className="px-6 py-3 text-zinc-400 group-hover:text-white transition-colors">{log.ip}</td>
                  <td className="px-6 py-3 text-blue-400">{log.node}</td>
                  <td className="px-6 py-3 text-zinc-300">{log.action}</td>
                  <td className="px-6 py-3 text-zinc-500">{log.latency}ms</td>
                  <td className="px-6 py-3 text-right">
                    <span className={log.status === 200 ? 'text-emerald-500' : 'text-red-500'}>
                      [{log.status} {log.statusText}]
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
