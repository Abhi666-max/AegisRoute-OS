"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Key, Copy, Terminal, Server, Shield, CheckCircle2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DevelopersPortal() {
  const [apiKey, setApiKey] = useState("aegis_live_*******************");
  const [isCopied, setIsCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("aegis_live_x89aZ2pQ1Lmn0Rv3Xy7Bwq4Hk9Jc5Vf6M");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setApiKey("aegis_live_*******************");
      setIsRegenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-clash font-bold tracking-tight mb-4 flex items-center gap-4">
            <Server className="w-10 h-10 text-[#00FF66]" />
            AegisRoute OS <span className="text-[#00FF66]">IaaS API</span>
          </h1>
          <p className="text-gray-400 text-lg font-medium max-w-2xl">
            Powering National Road Safety. Integrate real-time civic intelligence and edge AI routing directly into your regional authority infrastructure.
          </p>
        </div>

        {/* Section 1: API Keys */}
        <section className="mb-16">
          <h2 className="text-2xl font-clash font-bold mb-6 flex items-center gap-2">
            <Key className="w-6 h-6 text-[#0070F3]" />
            Your API Keys
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 w-full">
              <label className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-2">Production Key</label>
              <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-xl p-4">
                <code className="text-[#00FF66] font-mono text-lg flex-1 tracking-wider">{apiKey}</code>
                <button 
                  onClick={handleCopy}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  {isCopied ? <CheckCircle2 className="w-5 h-5 text-[#00FF66]" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <motion.button
              disabled={isRegenerating}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRegenerate}
              className="w-full md:w-auto px-8 py-4 rounded-xl font-bold bg-[#0070F3]/10 text-[#0070F3] border border-[#0070F3]/30 hover:bg-[#0070F3]/20 hover:shadow-[0_0_20px_rgba(0,112,243,0.3)] transition-all flex items-center justify-center gap-2"
            >
              {isRegenerating ? (
                <div className="w-5 h-5 border-2 border-[#0070F3] border-t-transparent rounded-full animate-spin" />
              ) : (
                <Shield className="w-5 h-5" />
              )}
              {isRegenerating ? "GENERATING..." : "REGENERATE KEY"}
            </motion.button>
          </div>
        </section>

        {/* Section 2: API Endpoints */}
        <section>
          <h2 className="text-2xl font-clash font-bold mb-6 flex items-center gap-2">
            <Terminal className="w-6 h-6 text-gray-300" />
            API Endpoints
          </h2>
          
          <Tabs defaultValue="drivelegal" className="w-full">
            <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl mb-6 inline-flex border-none">
              <TabsTrigger value="drivelegal" className="data-[state=active]:bg-[#00FF66] data-[state=active]:text-black rounded-lg px-6 py-2.5 font-medium transition-all">POST /api/v1/drivelegal</TabsTrigger>
              <TabsTrigger value="incidents" className="data-[state=active]:bg-[#0070F3] data-[state=active]:text-white rounded-lg px-6 py-2.5 font-medium transition-all">GET /api/v1/incidents/live</TabsTrigger>
            </TabsList>
            
            <TabsContent value="drivelegal" className="mt-0">
              <div className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="ml-4 text-xs font-mono text-gray-500 tracking-widest uppercase">Request: DriveLegal RAG Chatbot</span>
                </div>
                <div className="p-6 overflow-x-auto custom-scrollbar">
                  <pre className="text-sm font-mono leading-relaxed">
                    <span className="text-[#0070F3]">curl</span> -X POST https://api.aegisroute.os/v1/drivelegal \<br/>
                    <span className="text-gray-400">  -H "Authorization: Bearer aegis_live_x89..." \</span><br/>
                    <span className="text-gray-400">  -H "Content-Type: application/json" \</span><br/>
                    <span className="text-gray-400">  -d '&#123;</span><br/>
                    <span className="text-[#00FF66]">    "country"</span><span className="text-white">: </span><span className="text-yellow-300">"India"</span><span className="text-white">,</span><br/>
                    <span className="text-[#00FF66]">    "messages"</span><span className="text-white">: [</span><br/>
                    <span className="text-white">      &#123; </span><span className="text-[#00FF66]">"role"</span><span className="text-white">: </span><span className="text-yellow-300">"user"</span><span className="text-white">, </span><span className="text-[#00FF66]">"content"</span><span className="text-white">: </span><span className="text-yellow-300">"What is the fine for speeding?"</span><span className="text-white"> &#125;</span><br/>
                    <span className="text-white">    ]</span><br/>
                    <span className="text-gray-400">  &#125;'</span>
                  </pre>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="incidents" className="mt-0">
              <div className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="ml-4 text-xs font-mono text-gray-500 tracking-widest uppercase">Request: Fetch Real-Time RoadWatch Data</span>
                </div>
                <div className="p-6 overflow-x-auto custom-scrollbar">
                  <pre className="text-sm font-mono leading-relaxed">
                    <span className="text-[#0070F3]">const</span> response = <span className="text-[#0070F3]">await</span> fetch(<span className="text-yellow-300">'https://api.aegisroute.os/v1/incidents/live?status=Pending'</span>, &#123;<br/>
                    <span className="text-white">  method: </span><span className="text-yellow-300">'GET'</span>,<br/>
                    <span className="text-white">  headers: &#123;</span><br/>
                    <span className="text-[#00FF66]">    'Authorization'</span><span className="text-white">: </span><span className="text-yellow-300">'Bearer aegis_live_x89...'</span><br/>
                    <span className="text-white">  &#125;</span><br/>
                    <span className="text-white">&#125;);</span><br/><br/>
                    <span className="text-[#0070F3]">const</span> data = <span className="text-[#0070F3]">await</span> response.json();<br/>
                    <span className="text-gray-400">// Returns: Array of incidents with Edge AI severityScore & location</span>
                  </pre>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}
