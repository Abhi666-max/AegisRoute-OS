"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ShieldAlert, Terminal, Lock } from "lucide-react";

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
    <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff000010_1px,transparent_1px),linear-gradient(to_bottom,#ff000010_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md bg-black/50 backdrop-blur-2xl border border-red-500/20 rounded-2xl p-8 shadow-[0_0_80px_rgba(255,0,0,0.1)]"
      >
        <div className="flex flex-col items-center mb-8 w-full">
          <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/30 mb-6 relative">
             <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
             <Lock className="w-8 h-8 text-red-500 relative z-10" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 text-center uppercase">Classified:<br/>Founder Override</h1>
          <p className="text-red-500 text-sm font-mono mt-2 tracking-widest uppercase flex items-center gap-2">
            <Terminal className="w-3 h-3" />
            Terminal Access
          </p>
          <div className="mt-6 p-3 bg-red-500/5 border border-red-500/10 rounded-lg w-full text-center">
            <p className="text-red-500/80 font-mono text-xs tracking-widest uppercase overflow-hidden whitespace-nowrap animate-[typing_3s_steps(40,end)_infinite]">
              AUTHORIZED PERSONNEL ONLY... AWAITING OVERRIDE KEY.
            </p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 w-full">
          <div className="space-y-2">
            <input
              type="password"
              placeholder="ENTER CLASSIFIED KEY"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-red-500/20 text-red-500 text-center font-mono py-3 rounded-md focus:outline-none hover:border-red-500/50 focus:border-red-500 focus:shadow-[0_0_20px_rgba(255,0,0,0.3)] transition-all"
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-black border border-red-500/20 hover:border-red-500 hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] text-red-500 font-black tracking-widest uppercase rounded-lg px-4 py-3 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? "Authenticating..." : "EXECUTE OVERRIDE"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
