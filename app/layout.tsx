import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Toaster } from '@/components/ui/sonner';
import { Footer } from '@/components/layout/Footer';
import { DriveLegalWidget } from '@/components/ui/DriveLegalWidget';
import { AuthModal } from '@/components/auth/AuthModal';
import { DemoModal } from '@/components/ui/DemoModal';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'AegisRoute OS | Intelligent Road Safety',
  description: 'Enterprise IaaS & SaaS platform for BIMSTEC countries.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* Remote CDN for Clash Display Premium Typography */}
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00FF66" />
      </head>
      <body className={`${inter.variable} font-inter selection:bg-zinc-800 selection:text-white flex flex-col min-h-screen bg-transparent`}>
        <div className="fixed inset-0 z-[-1] bg-[#000000] overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full animate-[pulse_10s_ease-in-out_infinite_reverse]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <AuthModal />
        <DemoModal />
        <Toaster theme="dark" />
      </body>
    </html>
  );
}
