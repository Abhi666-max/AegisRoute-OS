import { Activity } from 'lucide-react';

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6">
      <div className="max-w-4xl mx-auto py-12 text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
          <Activity className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-4">System Status</h1>
        <div className="flex justify-center items-center gap-2 mb-12">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
          <p className="text-sm font-medium text-emerald-500 tracking-wide">All Systems Operational</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 bg-zinc-900 border border-white/10 rounded-xl">
            <h3 className="text-white font-medium mb-1">DriveLegal Engine</h3>
            <p className="text-xs text-zinc-500 mb-4">Gemini RAG API</p>
            <div className="flex items-center gap-2 text-zinc-300 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 100% Uptime
            </div>
          </div>
          <div className="p-6 bg-zinc-900 border border-white/10 rounded-xl">
            <h3 className="text-white font-medium mb-1">RoadWatch AI</h3>
            <p className="text-xs text-zinc-500 mb-4">Edge Inference Sync</p>
            <div className="flex items-center gap-2 text-zinc-300 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 100% Uptime
            </div>
          </div>
          <div className="p-6 bg-zinc-900 border border-white/10 rounded-xl">
            <h3 className="text-white font-medium mb-1">RoadSOS Router</h3>
            <p className="text-xs text-zinc-500 mb-4">Firestore Real-time</p>
            <div className="flex items-center gap-2 text-zinc-300 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 100% Uptime
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
