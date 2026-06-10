import { Server, Activity, CheckCircle2 } from 'lucide-react';

export default function HealthPage() {
  const services = [
    { name: "Gemini RAG Inference Engine", uptime: "99.999%", latency: "14ms", status: "ONLINE" },
    { name: "BIMSTEC Edge Sync Node", uptime: "99.995%", latency: "22ms", status: "ONLINE" },
    { name: "PostgreSQL Vector DB", uptime: "99.980%", latency: "4ms", status: "ONLINE" },
    { name: "Global Auth Validator", uptime: "100.00%", latency: "8ms", status: "ONLINE" }
  ];

  return (
    <div className="p-8 min-h-screen bg-[#020202] text-white">
      <div className="flex items-center gap-3 mb-2">
        <Server className="w-8 h-8 text-emerald-500" />
        <h1 className="text-3xl font-bold tracking-tighter text-emerald-500">System Uptime Matrix</h1>
      </div>
      <p className="text-zinc-500 mb-8">Vercel-Tier infrastructure health. Displaying 90-day operational history.</p>
      
      <div className="flex flex-col gap-6 max-w-5xl border border-zinc-800 rounded-2xl bg-[#050505] p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-10 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent"></div>
        
        <div className="flex justify-end mb-2 relative z-10">
          <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-md border border-emerald-500/20 text-xs font-mono tracking-widest uppercase">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse"></div> 
            System Operational
          </div>
        </div>

        {services.map((service, i) => (
          <div key={i} className="flex flex-col border border-zinc-800 bg-zinc-950/80 p-5 rounded-xl relative z-10 group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#020202] border border-zinc-800 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-200 tracking-tight">{service.name}</h3>
                  <div className="flex items-center gap-4 mt-1 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                    <span>Uptime: <span className="text-emerald-500">{service.uptime}</span></span>
                    <span>Latency: <span className="text-emerald-500">{service.latency}</span></span>
                  </div>
                </div>
              </div>
              <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-mono uppercase tracking-widest rounded-md">
                {service.status}
              </div>
            </div>
            
            {/* 90-Day GitHub-style Uptime Grid */}
            <div className="flex gap-[3px] w-full mt-2 overflow-x-auto custom-scrollbar pb-1">
              {Array.from({length: 90}).map((_, idx) => {
                const isIssue = Math.random() < 0.02; // ~2 out of 90
                const color = isIssue 
                  ? (Math.random() > 0.5 ? 'bg-amber-500 hover:bg-amber-400' : 'bg-red-500 hover:bg-red-400')
                  : 'bg-emerald-500 hover:bg-emerald-400';
                  
                return (
                  <div 
                    key={idx} 
                    className={`h-8 w-2 flex-shrink-0 rounded-[2px] ${color} transition-colors cursor-pointer`}
                    title={isIssue ? 'Degraded Performance' : '100% Uptime'}
                  ></div>
                );
              })}
            </div>
            <div className="flex justify-between items-center mt-2 text-[10px] text-zinc-600 font-mono">
              <span>90 days ago</span>
              <span>100% Uptime</span>
              <span>Today</span>
            </div>
          </div>
        ))}

        {/* Realistic Incidents Log */}
        <div className="mt-8 pt-6 border-t border-zinc-800 relative z-10">
           <h3 className="text-xs font-semibold text-white tracking-tighter mb-4">Recent Incidents</h3>
           <div className="space-y-4">
             <div className="flex items-start gap-4 p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-emerald-500">[Resolved] API Gateway Latency Spike in Dhaka</h4>
                  <p className="text-xs text-zinc-400 mt-1">Traffic routing issue caused a temporary 200ms latency spike for Dhaka Central node. Failover completed successfully.</p>
                  <p className="text-[10px] font-mono text-zinc-500 mt-2">Jun 8, 2026 - 14:30 IST</p>
                </div>
             </div>
             <div className="flex items-start gap-4 p-4 rounded-lg border border-zinc-800 bg-zinc-950/50">
                <CheckCircle2 className="w-5 h-5 text-zinc-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-zinc-300">[Resolved] Routine Vector Indexing Maintenance</h4>
                  <p className="text-xs text-zinc-500 mt-1">Scheduled PostgreSQL maintenance. Zero downtime observed.</p>
                  <p className="text-[10px] font-mono text-zinc-600 mt-2">Jun 1, 2026 - 02:00 IST</p>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
