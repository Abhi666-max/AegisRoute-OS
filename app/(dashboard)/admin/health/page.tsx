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

        {/* Historical Downtime Log Timeline */}
        <div className="mt-10 pt-8 border-t border-zinc-800">
           <h3 className="text-lg font-semibold text-white tracking-tighter mb-8">Historical Downtime Log</h3>
           <div className="relative border-l border-zinc-800 ml-3 space-y-8 pb-4">
             
             <div className="relative pl-8">
                <div className="absolute w-3 h-3 bg-[#050505] border-2 border-emerald-500 rounded-full -left-[6.5px] top-1.5"></div>
                <div className="p-5 rounded-xl border border-zinc-800 bg-[#050505] hover:bg-zinc-900 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                    <h4 className="text-base font-medium text-emerald-500">Edge Node Latency Spike (Dhaka Region)</h4>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest bg-zinc-950 px-2 py-1 rounded border border-zinc-800">May 14, 2026</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">Traffic routing issue caused a temporary 200ms latency spike for Dhaka Central node. Failover completed successfully and traffic normalized.</p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-mono text-zinc-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Resolved in 14m
                  </div>
                </div>
             </div>

             <div className="relative pl-8">
                <div className="absolute w-3 h-3 bg-[#050505] border-2 border-zinc-500 rounded-full -left-[6.5px] top-1.5"></div>
                <div className="p-5 rounded-xl border border-zinc-800 bg-[#050505] hover:bg-zinc-900 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                    <h4 className="text-base font-medium text-zinc-300">Database Read Rejection</h4>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest bg-zinc-950 px-2 py-1 rounded border border-zinc-800">April 02, 2026</span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">Brief rejection of cross-border queries due to strict IP validation rules. Rule adjusted dynamically.</p>
                  <div className="mt-4 flex items-center gap-4 text-xs font-mono text-zinc-500">
                    <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span> Resolved in 4m</div>
                    <a href="#" className="text-blue-500 hover:text-blue-400 underline underline-offset-2 transition-colors">Post-mortem attached</a>
                  </div>
                </div>
             </div>

           </div>
        </div>
      </div>
    </div>
  );
}
