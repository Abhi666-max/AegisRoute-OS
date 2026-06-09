import { BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="p-8 min-h-screen bg-[#020202] text-white">
      <div className="flex items-center gap-3 mb-2">
        <BarChart3 className="w-8 h-8 text-emerald-500" />
        <h1 className="text-3xl font-bold tracking-tighter text-emerald-500">Mesh Analytics</h1>
      </div>
      <p className="text-zinc-500 mb-8">System telemetry linked and operational. Live data visualization active.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          { title: "Network Bandwidth (Tbps)", heights: [40, 60, 30, 80, 50, 90, 70] },
          { title: "RAG Inference Load (Req/s)", heights: [20, 30, 80, 40, 100, 60, 40] },
          { title: "Global Latency Variance (ms)", heights: [90, 80, 70, 60, 50, 40, 30] }
        ].map((chart, i) => (
          <div key={i} className="flex flex-col gap-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400">{chart.title}</h3>
            <div className="border border-zinc-800 rounded-xl bg-zinc-950/50 h-64 flex items-end justify-between p-6 space-x-2">
              {chart.heights.map((h, j) => (
                <div 
                  key={j} 
                  className="w-full bg-gradient-to-t from-emerald-900/50 to-emerald-500/80 rounded-t-sm"
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
