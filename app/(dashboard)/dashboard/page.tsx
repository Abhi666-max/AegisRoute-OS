import { AdminDashboardClient } from '@/components/AdminDashboardClient';

export const metadata = {
  title: 'Authority Grid | AegisRoute OS',
  description: 'Enterprise dashboard for government authorities to monitor RoadWatch telemetry.',
};

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-8 pb-16">
      <AdminDashboardClient />
    </div>
  );
}
