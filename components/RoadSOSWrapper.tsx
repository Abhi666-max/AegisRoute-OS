'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Leaflet map with SSR disabled. 
// Leaflet requires the 'window' object, which breaks Next.js server-side rendering.
const SOSMapClient = dynamic(() => import('./SOSMapClient'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-4xl mx-auto h-[600px] bg-slate-50 animate-pulse rounded-2xl flex flex-col items-center justify-center gap-4 border border-slate-200">
      <div className="w-10 h-10 rounded-full border-4 border-slate-300 border-t-red-600 animate-spin" />
      <span className="text-slate-500 font-medium tracking-wide">Initializing Map Engine...</span>
    </div>
  ),
});

export function RoadSOSWrapper() {
  return <SOSMapClient />;
}
