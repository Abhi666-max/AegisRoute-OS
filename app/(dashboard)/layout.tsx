"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Sidebar } from "@/components/Sidebar";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, userData, loading } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      if (useAuthStore.getState().loading) {
        useAuthStore.setState({ loading: false });
      }
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const pathname = usePathname();

  useEffect(() => {
    if (mounted && !loading) {
      if (!user) {
        router.push("/");
      } else {
        const isAuthorityRoute = pathname?.startsWith("/authority") || pathname?.startsWith("/admin");
        const isAuthorityUser = user.email === "abhi.admin.dev@gmail.com" || user.email?.endsWith("@gov.in") || userData?.role?.toLowerCase() === "authority";
        if (isAuthorityRoute && !isAuthorityUser) {
          router.push("/citizen");
        }
      }
    }
  }, [user, loading, router, mounted, pathname, userData]);

  const isAuthorityRoute = pathname?.startsWith("/authority") || pathname?.startsWith("/admin");
  const isAuthorityUser = user?.email === "abhi.admin.dev@gmail.com" || user?.email?.endsWith("@gov.in") || userData?.role?.toLowerCase() === "authority";

  // Show neon loader while determining auth state or if not mounted
  if (!mounted || loading || (!user) || (isAuthorityRoute && !isAuthorityUser)) {
    return (
      <div className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-16 h-16 rounded-full border-4 border-t-[#00FF66] border-r-[#00FF66] border-b-transparent border-l-transparent animate-spin"
        />
        <div className="mt-8 text-[#00FF66] font-mono tracking-widest text-sm uppercase animate-pulse">
          Verifying Authorization
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar />
      <main className="flex-1 ml-[80px] transition-all duration-300 relative z-10">
        <div className="max-w-7xl mx-auto p-8 pt-24 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
