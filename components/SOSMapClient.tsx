'use client';

import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { AlertCircle, ShieldAlert } from 'lucide-react';

// Fix Leaflet's default icon path issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icons for distinction
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const hospitalIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function SOSMapClient() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch High-Accuracy GPS on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      (err) => setErrorMsg('Could not fetch GPS coordinates for SOS routing. Please enable location services.'),
      { enableHighAccuracy: true }
    );
  }, []);

  const emergencySpots = useMemo(() => {
    if (!position) return [];
    // Generate 3 mock nearby locations within a ~1-2km radius from user's actual position
    return [
      { id: 1, name: 'City General Hospital', lat: position[0] + 0.004, lng: position[1] + 0.007, type: 'Hospital' },
      { id: 2, name: 'Central Police Station', lat: position[0] - 0.005, lng: position[1] + 0.002, type: 'Police' },
      { id: 3, name: 'Highway Trauma Center', lat: position[0] + 0.001, lng: position[1] - 0.006, type: 'Hospital' },
    ];
  }, [position]);

  // Determine the nearest facility for routing
  const nearestSpot = useMemo(() => {
    if (!position || emergencySpots.length === 0) return null;
    let minDistance = Infinity;
    let nearest = emergencySpots[0];
    
    emergencySpots.forEach(spot => {
      // Basic euclidean calculation to mock routing distance
      const dist = Math.sqrt(Math.pow(spot.lat - position[0], 2) + Math.pow(spot.lng - position[1], 2));
      if (dist < minDistance) {
        minDistance = dist;
        nearest = spot;
      }
    });
    return nearest;
  }, [position, emergencySpots]);

  if (errorMsg) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 font-medium flex items-center gap-2">
        <AlertCircle size={20} />
        {errorMsg}
      </div>
    );
  }

  if (!position) {
    return (
      <div className="w-full max-w-4xl mx-auto h-[600px] bg-slate-50 animate-pulse rounded-2xl border border-slate-200 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-slate-300 border-t-blue-600 animate-spin" />
        <span className="text-slate-500 font-medium tracking-wide">Acquiring GPS Satellite Signal...</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-5 rounded-2xl shadow-2xl border border-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-100 rounded-xl">
            <ShieldAlert className="text-red-600" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">RoadSOS Router</h2>
            <p className="text-sm text-slate-500 font-medium mt-0.5">Zero-cost Emergency Logistics Protocol</p>
          </div>
        </div>
        
        <button 
          onClick={() => setIsSOSActive(true)}
          disabled={isSOSActive}
          className={`px-8 py-3.5 rounded-xl font-bold text-white transition-all shadow-lg flex items-center gap-2 justify-center
            ${isSOSActive 
              ? 'bg-emerald-500 shadow-emerald-500/20 cursor-default' 
              : 'bg-red-600 hover:bg-red-700 shadow-red-600/30 hover:-translate-y-0.5 active:translate-y-0 animate-[pulse_2s_infinite]'}`}
        >
          <AlertCircle size={20} />
          {isSOSActive ? 'SOS Dispatched' : 'TRIGGER SOS'}
        </button>
      </div>

      {/* Map Container - Z-index fixed so the DriveLegal widget stays on top */}
      <div className="w-full h-[450px] md:h-[550px] rounded-xl overflow-hidden border border-slate-200 relative z-10 shadow-inner">
        <MapContainer center={position} zoom={14} style={{ width: '100%', height: '100%' }}>
          {/* 100% Free OpenStreetMap Tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Real-time User Marker */}
          <Marker position={position} icon={userIcon}>
            <Popup className="font-bold">You are here</Popup>
          </Marker>

          {/* Dummy Emergency Markers */}
          {emergencySpots.map(spot => (
            <Marker key={spot.id} position={[spot.lat, spot.lng]} icon={hospitalIcon}>
              <Popup>
                <div className="font-bold text-slate-800">{spot.name}</div>
                <div className="text-xs text-slate-500 uppercase font-bold mt-1">{spot.type}</div>
              </Popup>
            </Marker>
          ))}

          {/* SOS Dynamic Routing Polyline */}
          {isSOSActive && nearestSpot && (
            <Polyline 
              positions={[position, [nearestSpot.lat, nearestSpot.lng]]} 
              color="#ef4444" 
              weight={5}
              opacity={0.8}
              dashArray="10, 10" 
              className="animate-pulse"
            />
          )}
        </MapContainer>
      </div>
      
      {/* Active Dispatch Notification Banner */}
      {isSOSActive && nearestSpot && (
        <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 flex flex-col sm:flex-row sm:items-center gap-4 animate-in slide-in-from-bottom-2">
          <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full shrink-0">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-ping" />
          </div>
          <p className="font-medium text-sm sm:text-base leading-relaxed">
            Emergency broadcast transmitted! Dispatching medical logistics to your coordinates. 
            Nearest facility is <span className="font-bold underline decoration-red-400 underline-offset-2">{nearestSpot.name}</span>. Remain at your location.
          </p>
        </div>
      )}
    </div>
  );
}
