'use client';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const responseData = [
  { time: '00:00', timeMin: 8 },
  { time: '04:00', timeMin: 6 },
  { time: '08:00', timeMin: 14 },
  { time: '12:00', timeMin: 9 },
  { time: '16:00', timeMin: 12 },
  { time: '20:00', timeMin: 5 },
  { time: '24:00', timeMin: 3 },
];

const heatData = [
  { sector: 'North', signals: 45 },
  { sector: 'South', signals: 80 },
  { sector: 'East', signals: 25 },
  { sector: 'West', signals: 110 },
  { sector: 'Central', signals: 150 },
];

export default function AnalyticsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 min-h-[80vh] bg-[#020202] border border-zinc-800 rounded-3xl">
      <div className="mb-8">
         <h1 className="text-3xl font-bold tracking-tighter text-white mb-2">JURISDICTION ANALYTICS</h1>
         <p className="text-zinc-500 font-mono tracking-widest uppercase text-sm">Regional risk metrics and fleet efficiency</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#050505] border border-zinc-800 p-6 rounded-2xl h-[400px]">
          <h2 className="text-white font-bold mb-6 font-mono uppercase tracking-widest text-xs text-zinc-400">Jurisdiction Response Time (Avg. Mins)</h2>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={responseData}>
              <defs>
                <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="time" stroke="#666" fontSize={10} />
              <YAxis stroke="#666" fontSize={10} />
              <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333' }} itemStyle={{ color: '#fff' }} />
              <Area type="monotone" dataKey="timeMin" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTime)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#050505] border border-zinc-800 p-6 rounded-2xl h-[400px]">
          <h2 className="text-white font-bold mb-6 font-mono uppercase tracking-widest text-xs text-zinc-400">SOS Heatmaps by Sector</h2>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={heatData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="sector" stroke="#666" fontSize={10} />
              <YAxis stroke="#666" fontSize={10} />
              <Tooltip cursor={{ fill: '#111' }} contentStyle={{ backgroundColor: '#000', borderColor: '#333' }} itemStyle={{ color: '#fff' }} />
              <Bar dataKey="signals" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
