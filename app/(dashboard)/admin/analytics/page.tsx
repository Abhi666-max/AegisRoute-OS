'use client';
import { BarChart3, Activity, ShieldAlert, Globe, Server } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalyticsPage() {
  const container: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item: any = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="p-8 min-h-screen bg-[#020202] text-white overflow-hidden transition-all duration-300">
      <div className="flex items-center gap-3 mb-2">
        <BarChart3 className="w-8 h-8 text-emerald-500" />
        <h1 className="text-3xl font-bold tracking-tighter text-emerald-500">Infrastructure Telemetry</h1>
      </div>
      <p className="text-zinc-500 mb-8">Comprehensive Enterprise IaaS Telemetry.</p>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[240px] gap-6"
      >
        {/* Card 1: Wide AreaChart */}
        <motion.div variants={item} whileHover={{ scale: 1.02 }} className="md:col-span-3 lg:col-span-3 row-span-1 bg-[#050505] border border-zinc-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden group transition-all duration-300 cursor-default">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 relative z-10 flex justify-between">
            <span>Live API Bandwidth (Tbps)</span>
            <span className="text-emerald-500">14.2 Tbps Peak</span>
          </h3>
          <div className="absolute bottom-0 left-0 w-full h-[80%]">
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradientBandwidth" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                d="M0,50 L0,30 Q15,10 30,25 T60,20 T80,35 T100,15 L100,50 Z" 
                fill="url(#gradientBandwidth)" 
              />
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M0,30 Q15,10 30,25 T60,20 T80,35 T100,15" 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="1.5" 
                className="drop-shadow-[0_0_10px_rgba(16,185,129,0.9)]" 
              />
            </svg>
          </div>
        </motion.div>

        {/* Card 2: Threat Detection Rate */}
        <motion.div variants={item} whileHover={{ scale: 1.02 }} className="md:col-span-1 lg:col-span-1 row-span-1 bg-[#050505] border border-zinc-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400">Threat Mitigation</h3>
          </div>
          <div className="flex-1 flex items-end gap-2 justify-between">
            {[40, 25, 60, 30, 80, 50].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                className="w-full bg-red-500/80 rounded-t-sm hover:bg-red-400 transition-colors cursor-pointer relative group"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-white bg-black px-1.5 py-0.5 rounded">
                  {h}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 border-t border-zinc-800 pt-2">
            <span className="text-2xl font-bold tracking-tighter text-white">412</span>
            <span className="text-[10px] text-zinc-500 ml-2 font-mono">BLOCKED / 24H</span>
          </div>
        </motion.div>

        {/* Card 3: Database Radial Progress */}
        <motion.div variants={item} whileHover={{ scale: 1.02 }} className="md:col-span-1 lg:col-span-1 row-span-1 bg-[#050505] border border-zinc-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center transition-all duration-300">
          <div className="absolute top-4 left-4 flex items-center gap-2">
             <Server className="w-4 h-4 text-blue-500" />
             <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Node DB Load</span>
          </div>
          <div className="relative w-32 h-32 flex items-center justify-center mt-4">
             <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#27272a" strokeWidth="8" />
                <motion.circle 
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 - (251.2 * 0.45) }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="8" strokeDasharray="251.2" 
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                />
             </svg>
             <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold text-white tracking-tighter">45%</span>
                <span className="text-[8px] text-zinc-500 font-mono uppercase tracking-widest">CAPACITY</span>
             </div>
          </div>
        </motion.div>

        {/* Card 4: User Distribution Doughnut */}
        <motion.div variants={item} whileHover={{ scale: 1.02 }} className="md:col-span-1 lg:col-span-1 row-span-1 bg-[#050505] border border-zinc-800 rounded-2xl p-6 shadow-2xl relative flex flex-col justify-center transition-all duration-300">
          <h3 className="absolute top-4 left-4 text-xs font-mono uppercase tracking-widest text-zinc-400">Node Demographics</h3>
          <div className="flex items-center gap-6 mt-4">
            <motion.svg 
               initial={{ rotate: -180, opacity: 0 }}
               animate={{ rotate: -90, opacity: 1 }}
               transition={{ duration: 1, ease: "easeOut" }}
               viewBox="0 0 100 100" className="w-24 h-24"
            >
               <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="16" strokeDasharray="213.6 251.2" />
               <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="16" strokeDasharray="37.6 251.2" strokeDashoffset="-213.6" />
            </motion.svg>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-emerald-500"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white leading-none">85%</span>
                  <span className="text-[10px] text-zinc-500 font-mono">CITIZENS</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-amber-500"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white leading-none">15%</span>
                  <span className="text-[10px] text-zinc-500 font-mono">AUTHORITY</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 5: Global Latency Heatmap List */}
        <motion.div variants={item} whileHover={{ scale: 1.02 }} className="md:col-span-2 lg:col-span-2 row-span-1 bg-[#050505] border border-zinc-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col transition-all duration-300">
           <div className="flex items-center gap-2 mb-4 border-b border-zinc-800 pb-2">
             <Globe className="w-5 h-5 text-emerald-500" />
             <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400">Global Latency Heatmap</h3>
           </div>
           <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2">
             {[
               { city: 'Mumbai', ping: 12, status: 'text-emerald-500' },
               { city: 'Colombo', ping: 24, status: 'text-emerald-500' },
               { city: 'Dhaka', ping: 48, status: 'text-amber-500' },
               { city: 'Bangkok', ping: 15, status: 'text-emerald-500' },
               { city: 'Kathmandu', ping: 85, status: 'text-red-500' },
               { city: 'Tokyo (Edge)', ping: 120, status: 'text-red-500' },
             ].map((node, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.1 + 0.5 }}
                 className="flex items-center justify-between py-1.5 px-3 hover:bg-zinc-900 rounded-md transition-colors"
               >
                 <span className="text-sm font-medium text-zinc-300">{node.city}</span>
                 <div className="flex items-center gap-3">
                   <span className={`font-mono text-xs ${node.status}`}>{node.ping}ms</span>
                   <div className="w-16 h-1 bg-zinc-800 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(node.ping / 150 * 100, 100)}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full ${node.ping < 30 ? 'bg-emerald-500' : node.ping < 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                     />
                   </div>
                 </div>
               </motion.div>
             ))}
           </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
