import { RoadSOSMap } from "@/components/ui/RoadSOSMap";
import { Shield } from "lucide-react";

export default function SOSPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-3xl font-semibold tracking-tighter text-white">Emergency Georouting</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-center mt-4">Zero-latency emergency routing via OpenStreetMap.</p>
        </div>

        <RoadSOSMap />
      </div>
    </div>
  );
}
