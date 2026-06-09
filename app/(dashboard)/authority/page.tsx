"use client";

import { motion } from "framer-motion";
import { useLiveIncidents } from "@/hooks/useLiveIncidents";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, Clock, Activity, ShieldAlert, CheckCircle2 } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

const chartData = [
  { time: "00:00", incidents: 12 },
  { time: "04:00", incidents: 8 },
  { time: "08:00", incidents: 24 },
  { time: "12:00", incidents: 35 },
  { time: "16:00", incidents: 42 },
  { time: "20:00", incidents: 28 },
  { time: "24:00", incidents: 15 },
]; // Static data for chart since historic data might not exist

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function AuthorityDashboard() {
  const { incidents, metrics, loading } = useLiveIncidents();

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "incidents", id), { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return <div className="animate-pulse flex items-center justify-center h-[50vh] text-[#00FF66] font-mono uppercase tracking-widest text-sm">Syncing with AegisRoute OS Core...</div>;
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-clash font-bold tracking-wider">AUTHORITY <span className="text-[#00FF66]">DASHBOARD</span></h1>
          <p className="text-gray-400 mt-2 font-mono text-sm uppercase">Live System Overview & Incident Triage</p>
        </div>
      </div>

      {/* ROW 1: Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#00FF66]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Activity className="text-blue-500 w-6 h-6" />
            </div>
          </div>
          <p className="text-gray-400 text-sm font-medium mb-1">Total Active</p>
          <h3 className="text-3xl font-bold font-clash">{metrics.totalActive}</h3>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
          <div className={`absolute inset-0 bg-red-500/5 transition-opacity ${metrics.criticalSeverity > 0 ? 'animate-pulse opacity-100' : 'opacity-0'}`} />
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-red-500/10 rounded-xl">
              <ShieldAlert className="text-red-500 w-6 h-6" />
            </div>
          </div>
          <p className="text-gray-400 text-sm font-medium mb-1">Critical Severity</p>
          <h3 className="text-3xl font-bold font-clash text-red-500">{metrics.criticalSeverity}</h3>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#00FF66]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#00FF66]/10 rounded-xl">
              <Clock className="text-[#00FF66] w-6 h-6" />
            </div>
          </div>
          <p className="text-gray-400 text-sm font-medium mb-1">Avg Resolution</p>
          <h3 className="text-3xl font-bold font-clash text-[#00FF66]">{metrics.avgResolutionTime}</h3>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
          <div className={`absolute inset-0 bg-orange-500/5 transition-opacity ${metrics.activeSOS > 0 ? 'animate-pulse opacity-100' : 'opacity-0'}`} />
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-500/10 rounded-xl">
              <AlertCircle className="text-orange-500 w-6 h-6" />
            </div>
          </div>
          <p className="text-gray-400 text-sm font-medium mb-1">Active SOS</p>
          <h3 className="text-3xl font-bold font-clash text-orange-500">{metrics.activeSOS}</h3>
        </motion.div>
      </div>

      {/* ROW 2: Chart & Live Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="font-clash font-bold text-lg mb-6">Incident Trends (24h)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FF66" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00FF66" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#00FF66' }}
                />
                <Area type="monotone" dataKey="incidents" stroke="#00FF66" fillOpacity={1} fill="url(#colorIncidents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col h-[400px]">
          <h3 className="font-clash font-bold text-lg mb-6 flex items-center justify-between">
            Live Feed
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF66] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FF66]"></span>
            </span>
          </h3>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {incidents.slice(0, 10).map((inc) => (
              <div key={inc.id} className="p-3 bg-black/40 border border-white/5 rounded-xl text-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    inc.severityScore >= 80 ? 'bg-red-500/20 text-red-500 border border-red-500/20' :
                    inc.severityScore >= 50 ? 'bg-orange-500/20 text-orange-500 border border-orange-500/20' :
                    'bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/20'
                  }`}>
                    {inc.severityScore >= 80 ? 'CRITICAL' : inc.severityScore >= 50 ? 'MODERATE' : 'LOW'}
                  </span>
                  <span className="text-gray-500 text-xs font-mono">
                    {new Date(inc.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
                <p className="text-gray-300 font-medium truncate">{inc.type || 'Hazard Report'}</p>
                <p className="text-gray-500 text-xs truncate mt-1">{inc.location}</p>
              </div>
            ))}
            {incidents.length === 0 && (
              <div className="text-gray-500 text-sm text-center py-10">No live incidents reported.</div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ROW 3: Table */}
      <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="font-clash font-bold text-lg mb-6">Active Infrastructure Hazards</h3>
        <div className="rounded-md border border-white/10 overflow-hidden">
          <Table>
            <TableHeader className="bg-black/60">
              <TableRow className="border-b border-white/10 hover:bg-transparent">
                <TableHead className="text-gray-400 font-mono">ID</TableHead>
                <TableHead className="text-gray-400 font-mono">LOCATION</TableHead>
                <TableHead className="text-gray-400 font-mono">SEVERITY</TableHead>
                <TableHead className="text-gray-400 font-mono">STATUS</TableHead>
                <TableHead className="text-right text-gray-400 font-mono">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((inc) => (
                <TableRow key={inc.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell className="font-mono text-xs text-gray-500">{inc.id.slice(0, 8)}</TableCell>
                  <TableCell className="text-gray-300">{inc.location}</TableCell>
                  <TableCell>
                    <span className={`font-bold ${inc.severityScore >= 80 ? 'text-red-500' : inc.severityScore >= 50 ? 'text-orange-500' : 'text-[#00FF66]'}`}>
                      {inc.severityScore}/100
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`flex items-center gap-2 text-sm ${
                      inc.status === 'Resolved' ? 'text-gray-500' :
                      inc.status === 'In Progress' ? 'text-blue-500' : 'text-orange-500'
                    }`}>
                      {inc.status === 'Resolved' && <CheckCircle2 className="w-4 h-4" />}
                      {inc.status === 'In Progress' && <Activity className="w-4 h-4 animate-pulse" />}
                      {inc.status === 'Pending' && <AlertCircle className="w-4 h-4" />}
                      {inc.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {inc.status === 'Pending' && (
                      <button 
                        onClick={() => updateStatus(inc.id, 'In Progress')}
                        className="text-xs font-bold text-blue-500 hover:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded transition-colors"
                      >
                        Start Work
                      </button>
                    )}
                    {inc.status === 'In Progress' && (
                      <button 
                        onClick={() => updateStatus(inc.id, 'Resolved')}
                        className="text-xs font-bold text-[#00FF66] hover:text-[#00FF66]/80 bg-[#00FF66]/10 hover:bg-[#00FF66]/20 px-3 py-1.5 rounded transition-colors"
                      >
                        Resolve
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {incidents.length === 0 && (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                    No active incidents. System clear.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </motion.div>
  );
}
