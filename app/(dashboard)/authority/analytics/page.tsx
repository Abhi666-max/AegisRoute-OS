'use client';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';
import { Activity, BarChart3, Database } from 'lucide-react';

const hazardTrends = [
  { time: '00:00', peak: 12, mitigation: 4 },
  { time: '04:00', peak: 8, mitigation: 3 },
  { time: '08:00', peak: 45, mitigation: 30 },
  { time: '12:00', peak: 30, mitigation: 25 },
  { time: '16:00', peak: 55, mitigation: 48 },
  { time: '20:00', peak: 20, mitigation: 15 },
  { time: '24:00', peak: 10, mitigation: 8 },
];

const fleetPerformance = [
  { sector: 'Dhaka', response: 4.2 },
  { sector: 'Panvel', response: 2.1 },
  { sector: 'Colombo', response: 5.5 },
  { sector: 'Kochi', response: 3.8 },
  { sector: 'Surat', response: 6.0 },
];

const apiFailures = [
  { time: '10:00', failureRate: 0.1 },
  { time: '11:00', failureRate: 0.05 },
  { time: '12:00', failureRate: 0.8 },
  { time: '13:00', failureRate: 0.2 },
  { time: '14:00', failureRate: 0.0 },
];

export default function AnalyticsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 min-h-[80vh] bg-[#020205] border border-[#18181b] rounded-3xl relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="relative z-10 mb-8 flex items-center justify-between">
         <div>
           <h1 className="text-3xl font-bold tracking-tighter text-white mb-2 flex items-center gap-3">
             <BarChart3 className="text-blue-500" /> BENTO-GRID TELEMETRY
           </h1>
           <p className="text-zinc-500 font-mono tracking-widest uppercase text-xs">Premium Data Analytics & Operational Metrics</p>
         </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-[#05050a] border border-[#18181b] p-6 rounded-2xl h-[400px] shadow-[0_0_50px_rgba(37,99,235,0.05)] relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
          <h2 className="text-white font-bold mb-6 font-mono uppercase tracking-widest text-xs text-zinc-400 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500" /> Localized Hazard Concentration Trends
          </h2>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={hazardTrends}>
              <defs>
                <linearGradient id="colorPeak" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMitigation" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
              <XAxis dataKey="time" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#020205', borderColor: '#18181b', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
              <Area type="monotone" dataKey="peak" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPeak)" />
              <Area type="monotone" dataKey="mitigation" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorMitigation)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-[#05050a] border border-[#18181b] p-6 rounded-2xl h-[400px] shadow-[0_0_50px_rgba(37,99,235,0.05)] relative overflow-hidden">
          <h2 className="text-white font-bold mb-6 font-mono uppercase tracking-widest text-xs text-zinc-400 flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-500" /> Fleet Response Grids (Mins)
          </h2>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={fleetPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#18181b" horizontal={false} />
              <XAxis type="number" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis dataKey="sector" type="category" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} width={60} />
              <Tooltip cursor={{ fill: '#18181b' }} contentStyle={{ backgroundColor: '#020205', borderColor: '#18181b', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
              <Bar dataKey="response" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Small Line Chart */}
        <div className="lg:col-span-3 bg-[#05050a] border border-[#18181b] p-6 rounded-2xl h-[250px] shadow-[0_0_50px_rgba(37,99,235,0.05)] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-red-600/5 blur-[120px] pointer-events-none"></div>
          <h2 className="text-white font-bold mb-6 font-mono uppercase tracking-widest text-xs text-zinc-400 flex items-center gap-2">
            <Activity className="w-4 h-4 text-red-500" /> API Request Failure Isolation (Live)
          </h2>
          <ResponsiveContainer width="100%" height="70%">
            <LineChart data={apiFailures}>
              <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
              <XAxis dataKey="time" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#020205', borderColor: '#18181b', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
              <Line type="step" dataKey="failureRate" stroke="#ef4444" strokeWidth={2} dot={{ r: 4, fill: '#ef4444' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </motion.div>
  );
}
