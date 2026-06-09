"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ShieldAlert, Terminal } from "lucide-react";

export default function GodModeLogin() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, "abhi.admin.dev@gmail.com", password);
      toast.success("God Mode Unlocked");
      router.push("/admin");
    } catch (error) {
      toast.error("Clearance Denied");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black z-0 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md bg-zinc-950/80 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(239,68,68,0.1)]"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/30 mb-6 relative">
             <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
             <ShieldAlert className="w-8 h-8 text-red-500 relative z-10" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 text-center uppercase">Classified:<br/>Founder Override</h1>
          <p className="text-zinc-500 text-sm font-mono mt-2 tracking-widest uppercase flex items-center gap-2">
            <Terminal className="w-3 h-3" />
            Terminal Access
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <input
              type="password"
              placeholder="ENTER OVERRIDE KEY"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-zinc-800 focus:border-red-500/50 rounded-lg px-4 py-3 text-center text-red-500 font-mono tracking-widest outline-none transition-colors"
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-red-500 hover:bg-red-600 text-black font-black tracking-widest uppercase rounded-lg px-4 py-3 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? "Authenticating..." : "Execute Override"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
