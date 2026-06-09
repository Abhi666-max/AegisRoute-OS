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
          <h1 className="text-xl font-medium tracking-widest text-white text-center uppercase mb-2">FOUNDER MANAGEMENT PORTAL</h1>
          <p className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase">
            RESTRICTED INFRASTRUCTURE ACCESS
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 w-full">
          <div className="space-y-4">
            <div className="w-full bg-[#020202] border border-zinc-800 text-zinc-500 text-center font-mono py-3 rounded-md uppercase tracking-widest text-sm opacity-50 select-none">
              abhi.admin.dev@gmail.com
            </div>
            <input
              type="password"
              placeholder="ENTER EXECUTIVE KEY"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#020202] border border-zinc-800 text-white text-center font-mono py-3 rounded-md focus:outline-none focus:border-zinc-500 transition-all tracking-widest text-sm"
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-white text-black font-semibold tracking-widest uppercase rounded-md px-4 py-3 hover:bg-zinc-200 transition-all disabled:opacity-50 text-sm"
          >
            {isLoading ? "VERIFYING..." : "INITIALIZE DASHBOARD"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
