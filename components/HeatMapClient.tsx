'use client';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Report {
  id: string;
  location_lat: number;
  location_lng: number;
  severity_score: number;
  status: string;
}

export default function HeatMapClient({ reports }: { reports: Report[] }) {
  // Default to a central location if no reports exist
  const center = reports.length > 0 
    ? [reports[0].location_lat, reports[0].location_lng] as [number, number]
    : [28.6139, 77.2090] as [number, number]; // New Delhi coordinates as fallback
  
  return (
    <div className="w-full h-full min-h-[400px] z-0 rounded-xl overflow-hidden relative border border-slate-200 shadow-inner">
      <MapContainer center={center} zoom={13} style={{ width: '100%', height: '100%' }}>
        <TileLayer 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        />
        {reports.map((report) => (
          <CircleMarker
            key={report.id}
            center={[report.location_lat, report.location_lng]}
            radius={Math.max(report.severity_score * 3, 8)}
            pathOptions={{ 
              color: report.severity_score > 7 ? '#ef4444' : report.severity_score > 4 ? '#f59e0b' : '#10b981',
              fillColor: report.severity_score > 7 ? '#ef4444' : report.severity_score > 4 ? '#f59e0b' : '#10b981',
              fillOpacity: 0.6,
              weight: 2
            }}
          >
            <Popup className="font-semibold text-slate-800">
              Severity: {report.severity_score}/10 <br/> 
              <span className="uppercase text-xs tracking-wider">{report.status}</span>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
