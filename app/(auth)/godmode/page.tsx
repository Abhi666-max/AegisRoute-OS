"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Terminal, Lock, ShieldCheck } from "lucide-react";

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
      window.location.href = "/admin";
    } catch (error) {
      toast.error("Clearance Denied");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>
      
      <div className="absolute top-6 left-6 z-50 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Encrypted Connection Active</span>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md bg-[#050505] border border-zinc-800 rounded-2xl p-10 shadow-2xl flex flex-col items-center"
      >
        <div className="flex flex-col items-center mb-8 w-full">
          <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 mb-6">
             <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-white text-center uppercase">Classified Access:<br/>Founder Override</h1>
          <p className="text-zinc-500 text-sm font-mono mt-2 tracking-widest uppercase flex items-center gap-2">
            <Terminal className="w-3 h-3" />
            Vault Terminal
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 w-full">
          <div className="space-y-2">
            <input
              type="password"
              placeholder="ENTER SECURE KEY"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#020202] border border-zinc-800 text-white text-center font-mono py-3 rounded-md focus:outline-none hover:border-zinc-700 focus:border-white transition-all tracking-widest"
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-white text-black font-bold tracking-widest uppercase rounded-lg px-4 py-3 hover:bg-zinc-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? "Authenticating..." : "EXECUTE"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
