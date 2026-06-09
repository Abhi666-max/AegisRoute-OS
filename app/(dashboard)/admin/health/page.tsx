import { Server, CheckCircle2 } from 'lucide-react';

export default function HealthPage() {
  const services = [
    { name: "Gemini Inference Engine", uptime: "99.999%", latency: "14ms", status: "ONLINE" },
    { name: "PostgreSQL Vector DB", uptime: "99.980%", latency: "4ms", status: "ONLINE" },
    { name: "BIMSTEC Edge Sync Node", uptime: "99.995%", latency: "22ms", status: "ONLINE" },
    { name: "Global Auth Validator", uptime: "100.00%", latency: "8ms", status: "ONLINE" }
  ];

  return (
    <div className="p-8 min-h-screen bg-[#020202] text-white">
      <div className="flex items-center gap-3 mb-2">
        <Server className="w-8 h-8 text-emerald-500" />
        <h1 className="text-3xl font-bold tracking-tighter text-emerald-500">System Uptime Matrix</h1>
      </div>
      <p className="text-zinc-500 mb-8">Global SaaS infrastructure health. Displaying 90-day operational history.</p>
      
      <div className="flex flex-col gap-6 max-w-4xl border border-zinc-800 rounded-2xl bg-[#050505] p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-10 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent"></div>
        
        <div className="flex justify-end mb-2">
          <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-3 py-1.5 rounded-md border border-emerald-500/20 text-xs font-mono tracking-widest uppercase">
            <CheckCircle2 className="w-4 h-4" /> 100% Operational
          </div>
        </div>

        {services.map((service, i) => (
          <div key={i} className="flex flex-col border border-zinc-800 bg-zinc-950/80 p-5 rounded-xl relative z-10 group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#020202] border border-zinc-800 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse"></div>
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
            {/* Uptime Blocks */}
            <div className="flex gap-[2px] w-full">
              {Array.from({length: 60}).map((_, idx) => (
                <div 
                  key={idx} 
                  className={`flex-1 h-8 rounded-sm ${Math.random() > 0.05 ? 'bg-emerald-500/80 hover:bg-emerald-400' : 'bg-zinc-800 hover:bg-zinc-700'} transition-colors cursor-pointer`}
                  title={Math.random() > 0.05 ? '100% Uptime' : 'Minor Degraded Performance'}
                ></div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-2 text-[10px] text-zinc-600 font-mono">
              <span>90 days ago</span>
              <span>Today</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
