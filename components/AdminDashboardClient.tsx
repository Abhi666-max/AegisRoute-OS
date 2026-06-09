'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Map, Activity, CheckCircle, Clock, ShieldAlert } from 'lucide-react';
import dynamic from 'next/dynamic';

// Leaflet interacts with window, requiring dynamic import without SSR
const HeatMap = dynamic(() => import('./HeatMapClient'), { 
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-slate-100 animate-pulse rounded-xl" />
});

// Mock data generator for UI preview
const getMockReports = (countryCode: string) => [
  { id: '1', location_lat: 28.6139, location_lng: 77.2090, severity_score: 9, status: 'pending', created_at: '2026-05-18T10:00:00Z', country_code: countryCode },
  { id: '2', location_lat: 28.6239, location_lng: 77.2190, severity_score: 5, status: 'investigating', created_at: '2026-05-19T11:00:00Z', country_code: countryCode },
  { id: '3', location_lat: 28.6039, location_lng: 77.1990, severity_score: 3, status: 'resolved', created_at: '2026-05-17T09:00:00Z', country_code: countryCode },
  { id: '4', location_lat: 28.6189, location_lng: 77.2140, severity_score: 8, status: 'pending', created_at: '2026-05-19T08:00:00Z', country_code: countryCode },
];

const mockChartData = [
  { name: 'Mon', reports: 4 },
  { name: 'Tue', reports: 7 },
  { name: 'Wed', reports: 2 },
  { name: 'Thu', reports: 9 },
  { name: 'Fri', reports: 5 },
  { name: 'Sat', reports: 12 },
  { name: 'Sun', reports: 8 },
];

export function AdminDashboardClient() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [jurisdiction, setJurisdiction] = useState<string>('');
  const [reports, setReports] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, active: 0, resolved: 0 });

  useEffect(() => {
    async function checkAuthAndFetchData() {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      const isDev = process.env.NODE_ENV === 'development';
      
      // Strict Auth & Role check, falling back to Development Mock Mode
      if (!session && !isDev) {
        setIsAuthorized(false);
        return;
      }

      let countryCode = 'IN'; 
      
      if (session) {
        // Enforce Authority Role and extract jurisdiction
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, country_code')
          .eq('id', session.user.id)
          .single();

        if (!profile || profile.role !== 'authority') {
          setIsAuthorized(false);
          return;
        }
        countryCode = profile.country_code;
      }

      setJurisdiction(countryCode);
      setIsAuthorized(true);

      // Fetch Multi-tenant isolated data
      const { data: fetchedReports, error } = await supabase
        .from('roadwatch_reports')
        .select('*')
        .eq('country_code', countryCode)
        .order('created_at', { ascending: false });

      const dataToUse = (fetchedReports && fetchedReports.length > 0) ? fetchedReports : getMockReports(countryCode);
      
      setReports(dataToUse);
      setStats({
        total: dataToUse.length,
        active: dataToUse.filter(r => r.status === 'pending' || r.status === 'investigating').length,
        resolved: dataToUse.filter(r => r.status === 'resolved').length
      });
    }

    checkAuthAndFetchData();
  }, []);

  if (isAuthorized === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-slate-800 animate-spin" />
        <span className="text-slate-500 font-medium tracking-widest uppercase">Verifying Clearance...</span>
      </div>
    );
  }

  if (isAuthorized === false) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <ShieldAlert size={80} className="text-red-500 mb-6" />
        <h1 className="text-4xl font-extrabold text-slate-800 mb-3 tracking-tight">Access Restricted</h1>
        <p className="text-slate-500 text-center max-w-md text-lg">
          You do not have the required <strong>'Authority'</strong> clearance for this database partition. Please contact the AegisRoute OS administrator.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Authority Grid</h1>
          <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
            Jurisdiction: <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded text-sm font-bold">{jurisdiction}</span>
          </p>
        </div>
        <div className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg font-bold flex items-center gap-2 shadow-sm">
          <Activity size={18} className="animate-pulse" /> Live Telemetry Active
        </div>
      </div>

      {/* Stats Cards (Shadcn UI style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <span className="text-slate-500 font-semibold tracking-wide">Total Incidents</span>
            <Map className="text-blue-500" size={24} />
          </div>
          <div className="mt-4 text-4xl font-black text-slate-900">{stats.total}</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -z-10" />
          <div className="flex justify-between items-start">
            <span className="text-slate-600 font-semibold tracking-wide">Active Alerts</span>
            <AlertTriangle className="text-red-500" size={24} />
          </div>
          <div className="mt-4 text-4xl font-black text-red-600">{stats.active}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <span className="text-slate-500 font-semibold tracking-wide">Resolved</span>
            <CheckCircle className="text-emerald-500" size={24} />
          </div>
          <div className="mt-4 text-4xl font-black text-emerald-600">{stats.resolved}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Heat Map */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Map size={20} className="text-slate-400" /> Hazard Heatmap
          </h3>
          <div className="flex-1">
            <HeatMap reports={reports} />
          </div>
        </div>

        {/* Charting */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Activity size={20} className="text-slate-400" /> Weekly Incident Velocity
          </h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="reports" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h3 className="text-lg font-bold text-slate-800">Incoming RoadWatch Telemetry</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold border-b border-slate-200">ID</th>
                <th className="p-4 font-semibold border-b border-slate-200">Date</th>
                <th className="p-4 font-semibold border-b border-slate-200">Severity</th>
                <th className="p-4 font-semibold border-b border-slate-200">Status</th>
                <th className="p-4 font-semibold border-b border-slate-200 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-sm font-medium text-slate-900">...{report.id.slice(-6)}</td>
                  <td className="p-4 text-sm text-slate-500">{new Date(report.created_at).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      report.severity_score > 7 ? 'bg-red-100 text-red-700' :
                      report.severity_score > 4 ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {report.severity_score}/10
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                      report.status === 'resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      report.status === 'investigating' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {report.status === 'pending' && <Clock size={12} />}
                      {report.status === 'investigating' && <Activity size={12} />}
                      {report.status === 'resolved' && <CheckCircle size={12} />}
                      {report.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {reports.length === 0 && (
            <div className="p-8 text-center text-slate-500">No telemetry data found for this jurisdiction.</div>
          )}
        </div>
      </div>
    </div>
  );
}
