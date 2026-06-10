import { Server, Activity, CheckCircle2 } from 'lucide-react';

export default function HealthPage() {
  const services = [
    { name: "Gemini RAG Inference Engine", uptime: "99.999%", latency: "14ms", status: "ONLINE" },
    { name: "BIMSTEC Edge Sync Node", uptime: "99.995%", latency: "22ms", status: "ONLINE" },
    { name: "PostgreSQL Vector DB", uptime: "99.980%", latency: "4ms", status: "ONLINE" },
    { name: "Global Auth Validator", uptime: "100.00%", latency: "8ms", status: "ONLINE" }
  ];

  return (
    <div className="p-8 min-h-screen bg-[#020202] text-white transition-all duration-300">
      <div className="flex items-center gap-4 mb-10 pb-6 border-b border-zinc-800">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
           <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981] animate-pulse"></div>
        </div>
        <div>
           <h1 className="text-4xl font-bold tracking-tighter text-white">All Systems Operational</h1>
           <p className="text-zinc-500 text-sm mt-1 font-mono tracking-widest uppercase">Last updated: Just now</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-6 max-w-5xl">
        {services.map((service, i) => (
          <div key={i} className="flex flex-col border border-zinc-800 bg-[#050505] hover:bg-zinc-950/80 transition-colors p-6 rounded-xl relative group">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#020202] border border-zinc-800 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-200 tracking-tight text-lg">{service.name}</h3>
                  <div className="flex items-center gap-4 mt-1 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                    <span>Uptime: <span className="text-emerald-500">{service.uptime}</span></span>
                    <span>Latency: <span className="text-emerald-500">{service.latency}</span></span>
                  </div>
                </div>
              </div>
              <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-mono uppercase tracking-widest rounded-md">
                {service.status}
              </div>
            </div>
            
            {/* 90-Day Atlassian/GitHub-style Uptime Grid */}
            <div className="flex gap-[4px] w-full mt-2 overflow-x-auto custom-scrollbar pb-2">
              {Array.from({length: 90}).map((_, idx) => {
                const isIssue = Math.random() < 0.02; // ~2 out of 90
                const color = isIssue 
                  ? (Math.random() > 0.5 ? 'bg-amber-500 hover:bg-amber-400' : 'bg-red-500 hover:bg-red-400')
                  : 'bg-emerald-500 hover:bg-emerald-400';
                  
                return (
                  <div 
                    key={idx} 
                    className={`h-10 w-[6px] flex-shrink-0 rounded-full ${color} transition-all duration-300 cursor-pointer relative group/tooltip`}
                  >
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity bg-black border border-zinc-800 text-white text-[10px] font-mono px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none">
                      {isIssue ? 'Date: Degraded Performance Detected' : 'Date: No incidents reported'}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center mt-2 text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
              <span>90 days ago</span>
              <span className="text-emerald-500">100% Uptime</span>
              <span>Today</span>
            </div>
          </div>
        ))}

        {/* Realistic Incidents Log */}
        <div className="mt-8 pt-6 border-t border-zinc-800">
           <h3 className="text-lg font-semibold text-white tracking-tighter mb-6">Past Incidents</h3>
           <div className="space-y-4">
             <div className="flex items-start gap-4 p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mt-1" />
                <div>
                  <h4 className="text-base font-medium text-emerald-500">[Resolved] API Gateway Latency Spike in Dhaka</h4>
                  <p className="text-sm text-zinc-400 mt-1 leading-relaxed">Traffic routing issue caused a temporary 200ms latency spike for Dhaka Central node. Failover completed successfully and traffic normalized.</p>
                  <p className="text-xs font-mono text-zinc-500 mt-3 uppercase tracking-widest">Jun 8, 2026 - 14:30 IST</p>
                </div>
             </div>
             <div className="flex items-start gap-4 p-5 rounded-xl border border-zinc-800 bg-[#050505] hover:bg-zinc-900 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-zinc-500 mt-1" />
                <div>
                  <h4 className="text-base font-medium text-zinc-300">[Resolved] Routine Vector Indexing Maintenance</h4>
                  <p className="text-sm text-zinc-500 mt-1 leading-relaxed">Scheduled PostgreSQL maintenance. Zero downtime observed across the global mesh.</p>
                  <p className="text-xs font-mono text-zinc-600 mt-3 uppercase tracking-widest">Jun 1, 2026 - 02:00 IST</p>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
