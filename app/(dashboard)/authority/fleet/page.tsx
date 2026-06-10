'use client';
import { motion } from 'framer-motion';

const fleetData = [
  { id: 'UNIT-ALPHA-1', type: 'Police Cruiser', status: 'DISPATCHED', loc: 'NH-48, Panvel' },
  { id: 'MED-772', type: 'Ambulance', status: 'STANDBY', loc: 'Central Station' },
  { id: 'UNIT-BETA-4', type: 'Police Interceptor', status: 'EN ROUTE', loc: 'Mumbra Bypass' },
  { id: 'FIRE-ENGINE-9', type: 'Fire Brigade', status: 'STANDBY', loc: 'Sector 14 Firehouse' },
];

export default function FleetPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 min-h-[80vh] bg-[#020202] border border-zinc-800 rounded-3xl">
      <div className="mb-8">
         <h1 className="text-3xl font-bold tracking-tighter text-white mb-2">FLEET MANAGEMENT</h1>
         <p className="text-zinc-500 font-mono tracking-widest uppercase text-sm">Real-time municipal unit tracking</p>
      </div>

      <div className="bg-[#050505] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#000] text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4 font-medium">UNIT ID</th>
              <th className="px-6 py-4 font-medium">TYPE</th>
              <th className="px-6 py-4 font-medium">STATUS</th>
              <th className="px-6 py-4 font-medium text-right">LOCATION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 text-zinc-300">
            {fleetData.map((unit) => (
              <tr key={unit.id} className="hover:bg-zinc-900/50 transition-colors">
                <td className="px-6 py-5 font-mono font-bold text-white">{unit.id}</td>
                <td className="px-6 py-5">{unit.type}</td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest border ${
                    unit.status === 'STANDBY' ? 'bg-zinc-800 text-zinc-400 border-zinc-700' :
                    'bg-blue-500/10 text-blue-500 border-blue-500/20'
                  }`}>
                    {unit.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right font-mono text-xs text-zinc-500">{unit.loc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
