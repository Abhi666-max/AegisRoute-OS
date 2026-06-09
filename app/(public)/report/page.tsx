import { RoadWatchReporter } from "@/components/ui/RoadWatchReporter";
import { Network } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function RoadWatchPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      toast.error("Enterprise authentication required.");
      router.push("/?login=true");
    }
  }, [user, router]);

  if (!user) return <div className="h-screen bg-black flex items-center justify-center text-zinc-500 tracking-widest font-mono text-sm uppercase">Securing environment...</div>;
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        <div className="lg:w-1/2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-xs font-medium tracking-widest uppercase mb-6">
            <Network className="w-4 h-4" />
            Edge AI Activated
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white">Zero Compute.</h1>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-zinc-500 mt-2 mb-6">Maximum Action.</h2>
          <p className="text-gray-400 text-lg font-medium leading-relaxed mb-8 max-w-lg">
            AegisRoute OS RoadWatch analyzes infrastructure hazards instantly on your device. Zero server dependency. Full offline resilience. Help secure the BIMSTEC highway grid.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm font-medium text-gray-300">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">01</div>
              Capture imagery of hazards.
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-gray-300">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">02</div>
              Edge AI scans severity instantly.
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-gray-300">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">03</div>
              Auto-syncs to authorities when online.
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 w-full">
          <RoadWatchReporter />
        </div>
        
      </div>
    </div>
  );
}
