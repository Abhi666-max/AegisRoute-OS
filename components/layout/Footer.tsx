'use client';

import Link from 'next/link';
import { Shield, Globe, MessageCircle, Link2 } from 'lucide-react';

const Github = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
);
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/authority') || pathname?.startsWith('/citizen') || pathname?.startsWith('/godmode')) return null;
  return (
    <footer className="w-full bg-black border-t border-zinc-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
        
        <div className="col-span-1 lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="p-1.5 border border-zinc-800 bg-zinc-950 rounded-lg">
              <Shield className="text-white w-5 h-5" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-white">AegisRoute OS</span>
          </Link>
          <p className="text-zinc-500 mb-6 max-w-sm text-sm">
            The premium IaaS and SaaS ecosystem for intelligent road safety, routing, and compliance across BIMSTEC nations.
          </p>
        </div>

        <div>
          <h4 className="text-white font-medium mb-6">Product</h4>
          <ul className="flex flex-col gap-4 text-sm text-zinc-500">
            <li><Link href="/developers" className="hover:text-white transition-colors">DriveLegal Engine</Link></li>
            <li><Link href="/report" className="hover:text-white transition-colors">RoadWatch AI</Link></li>
            <li><Link href="/sos" className="hover:text-white transition-colors">RoadSOS Router</Link></li>
            <li><Link href="/developers" className="hover:text-white transition-colors">Enterprise Security</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-6">Developers</h4>
          <ul className="flex flex-col gap-4 text-sm text-zinc-500">
            <li><Link href="/developers" className="hover:text-white transition-colors">IaaS API Docs</Link></li>
            <li><Link href="/developers" className="hover:text-white transition-colors">SDKs</Link></li>
            <li><Link href="/status" className="hover:text-white transition-colors">System Status</Link></li>
            <li><a href="https://github.com/abhi666-max" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub Repository</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-6">Stay Updated</h4>
          <p className="text-sm text-zinc-500 mb-4">Join our enterprise mailing list for IaaS updates.</p>
          <div className="flex bg-zinc-900 rounded-md border border-zinc-800 overflow-hidden focus-within:border-zinc-500 transition-colors">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-transparent w-full px-4 py-2 text-sm text-white outline-none"
            />
            <button onClick={() => toast.success('Subscribed to AegisRoute OS Enterprise updates.')} className="bg-zinc-800 hover:bg-zinc-700 px-4 font-medium text-sm transition-colors text-white">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center mt-12 pb-8">
          <div className="flex items-center gap-4 px-6 py-2.5 rounded-full bg-zinc-950/50 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(0,255,102,0.05)] hover:shadow-[0_0_30px_rgba(0,255,102,0.15)] transition-all duration-500">
            <span className="text-zinc-400 text-sm tracking-wide">ARCHITECTED & FOUNDED BY</span>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tight">ABHIJEET KANGANE</span>
            <div className="w-[1px] h-4 bg-zinc-800 mx-2"></div>
            <div className="flex items-center gap-3">
              <Github className="w-4 h-4 text-zinc-400 hover:text-white hover:scale-125 transition-all cursor-pointer" />
              <Linkedin className="w-4 h-4 text-zinc-400 hover:text-white hover:scale-125 transition-all cursor-pointer" />
              <Twitter className="w-4 h-4 text-zinc-400 hover:text-white hover:scale-125 transition-all cursor-pointer" />
              <Instagram className="w-4 h-4 text-zinc-400 hover:text-white hover:scale-125 transition-all cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
