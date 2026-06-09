'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Terminal, Activity, Zap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="relative w-full overflow-hidden" ref={containerRef}>
      
      {/* Abstract Background Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center min-h-[90vh] justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-zinc-500 animate-pulse" />
            <span className="text-sm font-medium text-zinc-400">AegisRoute Platform v2.0 Now Live</span>
          </motion.div>
  
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 text-balance text-center max-w-5xl leading-[1.1] mb-8"
          >
            Intelligent Road Safety Infrastructure for the Modern World.
          </motion.h1>
  
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-zinc-400 max-w-2xl mx-auto mt-6 mb-12 font-light"
          >
            An enterprise-grade B2G and C2G ecosystem powering edge AI triage, real-time georouting, and legal compliance across BIMSTEC nations.
          </motion.p>
  
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              href="/report"
              className="px-6 py-2.5 rounded-md bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-all"
            >
              Start for Free
            </Link>
            <Link 
              href="/developers"
              className="px-6 py-2.5 rounded-md bg-transparent border border-zinc-800 text-white font-medium text-sm hover:bg-zinc-900 transition-colors flex items-center gap-2"
            >
              <Terminal className="w-4 h-4" />
              Explore IaaS APIs
            </Link>
          </motion.div>
      </section>

      {/* Live Stats Banner */}
      <section className="relative z-10 border-y border-white/10 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
          <div className="flex flex-col items-center justify-center text-center px-4">
            <h3 className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-white via-zinc-400 to-white bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] bg-clip-text text-transparent mb-2">0ms</h3>
            <span className="text-sm text-gray-400 font-medium tracking-wide uppercase">Edge API Latency</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-4">
            <h3 className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-white via-zinc-400 to-white bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] bg-clip-text text-transparent mb-2">99.9%</h3>
            <span className="text-sm text-gray-400 font-medium tracking-wide uppercase">Guaranteed Uptime</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-4">
            <h3 className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-white via-zinc-400 to-white bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] bg-clip-text text-transparent mb-2">256bit</h3>
            <span className="text-sm text-gray-400 font-medium tracking-wide uppercase">AES Encryption</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-4">
            <h3 className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-white via-zinc-400 to-white bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] bg-clip-text text-transparent mb-2">5M+</h3>
            <span className="text-sm text-gray-400 font-medium tracking-wide uppercase">Vectors Analyzed</span>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="solutions" className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-semibold tracking-tighter text-white mb-4">Ecosystem Architecture</h2>
          <p className="text-xl text-gray-400">Three pillars of next-generation civic infrastructure.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* DriveLegal */}
          <Link href="/developers" className="block md:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative h-full w-full overflow-hidden rounded-2xl p-[1px] group"
            >
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#00FF66_50%,#000000_100%)] opacity-100" />
              <div className="relative h-full w-full bg-zinc-950 rounded-2xl p-6 flex flex-col justify-between z-10 border border-white/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-aegis-neon/10 rounded-full blur-[80px] group-hover:bg-aegis-neon/20 transition-colors" />
                <div>
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                    <ShieldCheck className="text-aegis-neon w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tighter text-white mb-3 relative z-10">DriveLegal</h3>
                  <p className="text-gray-400 max-w-md relative z-10">An AI Legal Engine utilizing RAG and pgvector to deliver localized compliance protocols across BIMSTEC legal frameworks instantly.</p>
                </div>
                <div className="text-emerald-400 font-bold flex items-center gap-2 cursor-pointer group/link relative z-10 mt-6">
                  Explore Documentation <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>

          {/* RoadWatch */}
          <Link href="/report" className="block">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-full w-full overflow-hidden rounded-2xl p-[1px] group"
            >
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#00FF66_50%,#000000_100%)] opacity-100" />
              <div className="relative h-full w-full bg-zinc-950 rounded-2xl p-6 flex flex-col justify-between z-10 border border-white/5">
                <div>
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                    <Activity className="text-emerald-400 w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tighter text-white mb-3">RoadWatch</h3>
                  <p className="text-gray-400 text-sm">Edge AI powered civic reporting. Offline-first PWA sync capabilities via IndexedDB.</p>
                </div>
                <div className="text-emerald-400 font-bold flex items-center gap-2 cursor-pointer group/link mt-6">
                  Launch Tool <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>

          {/* RoadSOS */}
          <Link href="/sos" className="block md:col-span-3">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative h-full w-full overflow-hidden rounded-2xl p-[1px] group cursor-pointer"
            >
               <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#00FF66_50%,#000000_100%)] opacity-100" />
               <div className="relative h-full w-full bg-[#050505] rounded-xl overflow-hidden z-10 flex flex-col justify-between p-6" style={{ transform: 'translateZ(0)' }}>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
                <div className="max-w-xl relative z-10">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                    <Zap className="text-cyan-400 w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-semibold tracking-tighter text-white mb-4">RoadSOS Live Georouting</h3>
                  <p className="text-gray-400 text-lg mb-8">Zero-cost emergency dispatch logic. Native integration with OpenStreetMap to map citizen coordinates to the nearest medical authorities in real-time.</p>
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-400 text-black font-bold rounded-full transition-colors shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                    Launch Tool <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                
                {/* Abstract Data Visualization Mock */}
                <div className="hidden lg:flex flex-1 items-center justify-center relative z-10">
                   <div className="w-full max-w-sm aspect-square rounded-full border border-cyan-400/30 relative flex items-center justify-center animate-[spin_60s_linear_infinite]">
                      <div className="w-3/4 h-3/4 rounded-full border border-emerald-400/30 border-dashed animate-[spin_40s_reverse_linear_infinite]" />
                      <div className="absolute w-4 h-4 bg-emerald-400 rounded-full top-0 shadow-[0_0_15px_#34d399]" />
                      <div className="absolute w-3 h-3 bg-cyan-400 rounded-full bottom-0 right-10 shadow-[0_0_15px_#22d3ee]" />
                   </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl p-[1px] group">
          <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#0070F3_50%,#000000_100%)] opacity-100" />
          <div className="relative h-full w-full bg-zinc-950 rounded-3xl p-10 md:p-16 text-center z-10 border border-white/5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-neon/5 to-transparent pointer-events-none" />
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white text-center mb-6 relative z-10">Deploy AegisRoute in your municipality.</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Request an enterprise API key to integrate our routing and legal logic directly into your smart city infrastructure.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto relative z-10" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="government.email@gov.in" 
              className="flex-1 bg-black/50 border border-white/10 rounded-full px-6 py-4 text-white outline-none focus:border-brand-neon transition-colors"
            />
            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors shadow-xl relative z-50 cursor-pointer">
              Request Access
            </button>
          </form>
        </div>
        </div>
      </section>

    </div>
  );
}
