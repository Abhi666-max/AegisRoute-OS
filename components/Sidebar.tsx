"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, AlertTriangle, BarChart3, Activity, Settings, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/authority" },
  { icon: AlertTriangle, label: "Live Incidents", href: "/authority/incidents" },
  { icon: BarChart3, label: "Analytics", href: "/authority/analytics" },
  { icon: Activity, label: "System Health", href: "/authority/health" },
  { icon: Settings, label: "Settings", href: "/authority/settings" },
];

export function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

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
              <div className={`flex items-center px-2 py-3 rounded-lg transition-colors ${isActive ? "bg-white/10 text-[#00FF66]" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                <item.icon className="w-6 h-6 shrink-0" />
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                  transition={{ duration: 0.2 }}
                  className="ml-4 whitespace-nowrap font-medium"
                >
                  {item.label}
                </motion.span>
              </div>
            </Link>
          );
        })}
      </nav>
      
      <div className="px-4">
        <div className="flex items-center px-2 py-3 rounded-lg text-gray-400">
           <ChevronRight className="w-6 h-6 shrink-0" />
           <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="ml-4 text-sm whitespace-nowrap"
           >
             AegisRoute OS v0.1
           </motion.span>
        </div>
      </div>
    </motion.aside>
  );
}
