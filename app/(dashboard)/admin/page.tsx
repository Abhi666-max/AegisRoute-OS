"use client";

import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldAlert, Users, Database, Terminal } from "lucide-react";

export default function AdminGodMode() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 p-6"
    >
      <div className="flex items-center justify-between border-b border-red-500/20 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <ShieldAlert className="text-red-500 w-10 h-10" />
            <h1 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Founder Oversight Protocol
            </h1>
          </div>
          <p className="text-zinc-500 mt-2 font-mono text-sm tracking-widest uppercase">Global Access Terminal // Admin: abhi.admin.dev@gmail.com</p>
          <p className="text-red-500 mt-1 font-bold text-lg tracking-tight">Super-Admin Console: Global View</p>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-xs font-mono font-bold tracking-widest uppercase animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Superuser Active
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ scale: 1.02 }} className="relative p-1 rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-950 group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
          <div className="relative h-full bg-[#050505] p-6 rounded-xl border border-white/5 z-10">
            <Users className="w-6 h-6 text-zinc-400 mb-4" />
            <p className="text-sm text-zinc-500 font-mono tracking-widest uppercase mb-1">Total Citizens</p>
            <h3 className="text-3xl font-bold text-white">124,592</h3>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="relative p-1 rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-950 group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
          <div className="relative h-full bg-[#050505] p-6 rounded-xl border border-white/5 z-10">
            <ShieldAlert className="w-6 h-6 text-zinc-400 mb-4" />
            <p className="text-sm text-zinc-500 font-mono tracking-widest uppercase mb-1">Active Authorities</p>
            <h3 className="text-3xl font-bold text-white">45</h3>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="relative p-1 rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-950 group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
          <div className="relative h-full bg-[#050505] p-6 rounded-xl border border-red-500/30 z-10">
            <Database className="w-6 h-6 text-red-500 mb-4" />
            <p className="text-sm text-red-500/70 font-mono tracking-widest uppercase mb-1">System Errors (0)</p>
            <h3 className="text-3xl font-bold text-red-500">0</h3>
          </div>
        </motion.div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden mt-8">
        <div className="p-4 border-b border-zinc-800 bg-black flex items-center gap-2">
          <Terminal className="w-4 h-4 text-zinc-500" />
          <h3 className="text-sm font-mono tracking-widest uppercase text-zinc-400">Global Authority Directory</h3>
        </div>
        <Table>
          <TableHeader className="bg-zinc-900/50">
            <TableRow className="border-b border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-500 font-mono text-xs">ID</TableHead>
              <TableHead className="text-zinc-500 font-mono text-xs">REGION</TableHead>
              <TableHead className="text-zinc-500 font-mono text-xs">STATUS</TableHead>
              <TableHead className="text-right text-zinc-500 font-mono text-xs">CLEARANCE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b border-zinc-800 hover:bg-zinc-900/50">
              <TableCell className="font-mono text-xs text-zinc-400">AUTH-01</TableCell>
              <TableCell className="text-zinc-300">New Delhi Municipal Council</TableCell>
              <TableCell><span className="text-[#00FF66] text-xs font-mono uppercase">Online</span></TableCell>
              <TableCell className="text-right text-zinc-500 text-xs">Level 4</TableCell>
            </TableRow>
            <TableRow className="border-b border-zinc-800 hover:bg-zinc-900/50">
              <TableCell className="font-mono text-xs text-zinc-400">AUTH-02</TableCell>
              <TableCell className="text-zinc-300">Mumbai Traffic Police</TableCell>
              <TableCell><span className="text-[#00FF66] text-xs font-mono uppercase">Online</span></TableCell>
              <TableCell className="text-right text-zinc-500 text-xs">Level 4</TableCell>
            </TableRow>
            <TableRow className="border-b border-zinc-800 hover:bg-zinc-900/50">
              <TableCell className="font-mono text-xs text-zinc-400">AUTH-03</TableCell>
              <TableCell className="text-zinc-300">Dhaka Metropolitan Authority</TableCell>
              <TableCell><span className="text-yellow-500 text-xs font-mono uppercase">Syncing</span></TableCell>
              <TableCell className="text-right text-zinc-500 text-xs">Level 3</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
