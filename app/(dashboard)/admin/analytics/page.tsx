import { BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="p-8 min-h-screen bg-[#020202] text-white">
      <div className="flex items-center gap-3 mb-2">
        <BarChart3 className="w-8 h-8 text-emerald-500" />
        <h1 className="text-3xl font-bold tracking-tighter text-emerald-500">Mesh Analytics</h1>
      </div>
      <p className="text-zinc-500 mb-8">Enterprise SIEM telemetry linked and operational. Live data visualization active.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400">Network Bandwidth (Tbps)</h3>
          <div className="border border-zinc-800 rounded-xl bg-zinc-950/50 h-64 flex items-center justify-center p-6 relative">
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,50 L0,30 Q10,10 20,25 T40,20 T60,35 T80,15 T100,25 L100,50 Z" fill="url(#areaGradient)" />
              <path d="M0,30 Q10,10 20,25 T40,20 T60,35 T80,15 T100,25" fill="none" stroke="#10b981" strokeWidth="1" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </svg>
          </div>
        </div>

        {/* Scatter Chart */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400">API Latency Distribution</h3>
          <div className="border border-zinc-800 rounded-xl bg-zinc-950/50 h-64 flex items-center justify-center p-6 relative">
             <svg viewBox="0 0 100 50" className="w-full h-full">
               {Array.from({length: 40}).map((_, i) => (
                 <circle key={i} cx={Math.random()*100} cy={Math.random()*40+10} r="1" fill="#3b82f6" opacity={Math.random()*0.5 + 0.5} className="drop-shadow-[0_0_4px_rgba(59,130,246,0.8)]" />
               ))}
             </svg>
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400">Node Identity Distribution</h3>
          <div className="border border-zinc-800 rounded-xl bg-zinc-950/50 h-64 flex items-center justify-center p-6 relative">
            <svg viewBox="0 0 100 100" className="w-32 h-32 transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#27272a" strokeWidth="20" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="20" strokeDasharray="213.6 251.2" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="20" strokeDasharray="35.2 251.2" strokeDashoffset="-213.6" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="20" strokeDasharray="2.5 251.2" strokeDashoffset="-248.8" />
            </svg>
            <div className="absolute flex flex-col items-center">
               <span className="text-2xl font-bold text-white tracking-tighter">85%</span>
               <span className="text-[8px] text-zinc-500 font-mono uppercase tracking-widest">Citizens</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
