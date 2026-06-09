import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Toaster } from '@/components/ui/sonner';
import { Footer } from '@/components/layout/Footer';
import { DriveLegalWidget } from '@/components/ui/DriveLegalWidget';
import { AuthModal } from '@/components/auth/AuthModal';

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
      <body className={`${inter.variable} font-inter selection:bg-zinc-800 selection:text-white flex flex-col min-h-screen bg-black`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <DriveLegalWidget />
        <AuthModal />
        <Toaster theme="dark" />
      </body>
    </html>
  );
}
