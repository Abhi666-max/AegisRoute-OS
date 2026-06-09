"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, AlertTriangle, BarChart3, Activity, Settings, ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth } from '@/lib/firebase/config';

// Removed static navItems, will calculate dynamically inside component

export function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  
  const basePath = pathname?.startsWith('/admin') ? '/admin' : '/authority';
  const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: `${basePath}` },
    { icon: AlertTriangle, label: "Live Feed/Incidents", href: `${basePath}/feed` },
    { icon: BarChart3, label: "Analytics", href: `${basePath}/analytics` },
    { icon: Activity, label: "System Health", href: `${basePath}/health` },
    { icon: Settings, label: "Settings", href: `${basePath}/settings` },
  ];

  return (
    <motion.aside
      initial={{ width: 80 }}
      animate={{ width: isHovered ? 240 : 80 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed left-0 top-0 h-screen bg-[#050505] border-r border-white/10 z-[100] flex flex-col pt-6 pb-6 overflow-hidden"
    >
      <div className="flex items-center px-6 mb-10 h-10">
        <div className="w-8 h-8 rounded bg-[#00FF66]/20 border border-[#00FF66] flex items-center justify-center shrink-0">
          <Activity className="w-5 h-5 text-[#00FF66]" />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-4 whitespace-nowrap font-clash font-bold tracking-wider text-white"
        >
          AEGIS<span className="text-[#00FF66]">ROUTE</span>
        </motion.div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center px-3 py-2 rounded-md transition-colors ${isActive ? "bg-zinc-900 border border-zinc-800 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]" : "text-zinc-500 hover:text-white"}`}>
                <item.icon className="w-5 h-5 shrink-0" />
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                  transition={{ duration: 0.2 }}
                  className="ml-4 whitespace-nowrap tracking-tighter font-medium"
                >
                  {item.label}
                </motion.span>
              </div>
            </Link>
          );
        })}
      </nav>
      
      <div className="px-4 mt-auto">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800">
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-emerald-500 font-bold text-xs">AK</div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-zinc-950 animate-pulse"></div>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="flex flex-col whitespace-nowrap"
          >
            <span className="text-sm font-semibold text-white">Abhijeet K.</span>
            <span className="text-[10px] text-zinc-500 tracking-widest font-mono">OVERSIGHT ADMIN</span>
          </motion.div>
        </div>
        
        <button 
          onClick={() => { auth.signOut().then(() => window.location.href = '/'); }} 
          className="w-full mt-2 flex items-center justify-center gap-2 text-red-500 hover:bg-red-500/10 py-2 rounded-md transition-colors text-sm font-medium"
        >
          <LogOut size={16} /> 
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="whitespace-nowrap"
          >
            Terminate Session
          </motion.span>
        </button>
      </div>
    </motion.aside>
  );
}
