"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Key, Copy, Terminal, Server, Shield, CheckCircle2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DevelopersPortal() {
  const [apiKey, setApiKey] = useState("aegis_live_*******************");
  const [isCopied, setIsCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const { user } = useAuthStore();
  const router = useRouter();
  
  useEffect(() => {
    if (!user) {
      toast.error("Enterprise authentication required.");
      router.push("/?login=true");
    }
  }, [user, router]);

  if (!user) return <div className="h-screen bg-black flex items-center justify-center text-zinc-500 tracking-widest font-mono text-sm uppercase">Securing environment...</div>;

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
          <h1 className="text-3xl font-semibold tracking-tighter text-white">IaaS API Reference</h1>
          <p className="text-zinc-500 mt-2 text-sm">Integrate real-time civic intelligence securely.</p>
        </div>

        {/* Section 1: API Keys */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold tracking-tighter mb-4 text-white">Your API Keys</h2>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 w-full">
              <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-2">Production Key</label>
              <div className="flex items-center gap-2 bg-black border border-zinc-800 rounded-md p-3">
                <code className="text-zinc-300 font-mono text-sm flex-1 tracking-wider">{apiKey}</code>
                <button 
                  onClick={handleCopy}
                  className="p-2 hover:bg-zinc-900 rounded-md transition-colors text-zinc-400 hover:text-white"
                >
                  {isCopied ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              disabled={isRegenerating}
              onClick={handleRegenerate}
              className="w-full md:w-auto px-6 py-2.5 rounded-md font-medium text-sm bg-white text-black hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
            >
              {isRegenerating ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <Key className="w-4 h-4" />
              )}
              {isRegenerating ? "GENERATING..." : "REGENERATE KEY"}
            </button>
          </div>
        </section>

        {/* Section 2: API Endpoints */}
        <section>
          <h2 className="text-xl font-semibold tracking-tighter mb-4 text-white">
            API Endpoints
          </h2>
          
          <Tabs defaultValue="drivelegal" className="w-full">
            <TabsList className="bg-transparent border-none p-0 mb-6 flex h-auto">
              <div className="flex gap-2 p-1 bg-zinc-900 border border-zinc-800 rounded-lg w-max">
                <TabsTrigger value="drivelegal" className="px-4 py-1.5 text-sm font-medium data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400 hover:text-white rounded-md transition-all">POST /api/v1/drivelegal</TabsTrigger>
                <TabsTrigger value="incidents" className="px-4 py-1.5 text-sm font-medium data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400 hover:text-white rounded-md transition-all">GET /api/v1/incidents/live</TabsTrigger>
              </div>
            </TabsList>
            
            <TabsContent value="drivelegal" className="mt-0">
              <div className="bg-black border border-zinc-800 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950 border-b border-zinc-800">
                  <span className="text-xs font-mono text-zinc-500 tracking-widest uppercase">Request: DriveLegal RAG Chatbot</span>
                </div>
                <div className="p-6 overflow-x-auto custom-scrollbar relative group">
                  <button onClick={() => { navigator.clipboard.writeText(`curl -X POST https://api.aegisroute.os/v1/drivelegal \\\n  -H "Authorization: Bearer aegis_live_x89..." \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "country": "India",\n    "messages": [\n      { "role": "user", "content": "What is the fine for speeding?" }\n    ]\n  }'`); toast.success("Copied to clipboard"); }} className="absolute top-3 right-3 p-2 rounded-md bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 opacity-0 group-hover:opacity-100 transition-all border border-zinc-700">
                    <Copy className="w-4 h-4" />
                  </button>
                  <pre className="text-sm font-mono leading-relaxed text-zinc-300">
                    <span className="text-white">curl</span> -X POST https://api.aegisroute.os/v1/drivelegal \<br/>
                    <span className="text-zinc-500">  -H "Authorization: Bearer aegis_live_x89..." \</span><br/>
                    <span className="text-zinc-500">  -H "Content-Type: application/json" \</span><br/>
                    <span className="text-zinc-500">  -d '&#123;</span><br/>
                    <span className="text-white">    "country"</span><span className="text-zinc-500">: </span><span className="text-zinc-300">"India"</span><span className="text-zinc-500">,</span><br/>
                    <span className="text-white">    "messages"</span><span className="text-zinc-500">: [</span><br/>
                    <span className="text-zinc-500">      &#123; </span><span className="text-white">"role"</span><span className="text-zinc-500">: </span><span className="text-zinc-300">"user"</span><span className="text-zinc-500">, </span><span className="text-white">"content"</span><span className="text-zinc-500">: </span><span className="text-zinc-300">"What is the fine for speeding?"</span><span className="text-zinc-500"> &#125;</span><br/>
                    <span className="text-zinc-500">    ]</span><br/>
                    <span className="text-zinc-500">  &#125;'</span>
                  </pre>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="incidents" className="mt-0">
              <div className="bg-black border border-zinc-800 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950 border-b border-zinc-800">
                  <span className="text-xs font-mono text-zinc-500 tracking-widest uppercase">Request: Fetch Real-Time RoadWatch Data</span>
                </div>
                <div className="p-6 overflow-x-auto custom-scrollbar relative group">
                  <button onClick={() => { navigator.clipboard.writeText(`const response = await fetch('https://api.aegisroute.os/v1/incidents/live?status=Pending', {\n  method: 'GET',\n  headers: {\n    'Authorization': 'Bearer aegis_live_x89...'\n  }\n});\n\nconst data = await response.json();`); toast.success("Copied to clipboard"); }} className="absolute top-3 right-3 p-2 rounded-md bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 opacity-0 group-hover:opacity-100 transition-all border border-zinc-700">
                    <Copy className="w-4 h-4" />
                  </button>
                  <pre className="text-sm font-mono leading-relaxed text-zinc-300">
                    <span className="text-white">const</span> response = <span className="text-white">await</span> fetch(<span className="text-zinc-300">'https://api.aegisroute.os/v1/incidents/live?status=Pending'</span>, &#123;<br/>
                    <span className="text-zinc-500">  method: </span><span className="text-zinc-300">'GET'</span>,<br/>
                    <span className="text-zinc-500">  headers: &#123;</span><br/>
                    <span className="text-white">    'Authorization'</span><span className="text-zinc-500">: </span><span className="text-zinc-300">'Bearer aegis_live_x89...'</span><br/>
                    <span className="text-zinc-500">  &#125;</span><br/>
                    <span className="text-zinc-500">&#125;);</span><br/><br/>
                    <span className="text-white">const</span> data = <span className="text-white">await</span> response.json();<br/>
                    <span className="text-zinc-600">// Returns: Array of incidents with Edge AI severityScore & location</span>
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
