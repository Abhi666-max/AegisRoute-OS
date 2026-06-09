'use client';

import Link from 'next/link';
import { Shield, Globe, MessageCircle, Link2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export function Footer() {
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
            <button className="bg-zinc-800 hover:bg-zinc-700 px-4 font-medium text-sm transition-colors text-white">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="mt-8 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600 uppercase tracking-widest">AegisRoute OS</p>
          <p className="text-xs text-zinc-600 transition-colors hover:text-white cursor-pointer">Architected & Founded by <span className="font-semibold text-zinc-300 hover:text-white">Abhijeet Kangane</span></p>
        </div>
      </div>
    </footer>
  );
}
