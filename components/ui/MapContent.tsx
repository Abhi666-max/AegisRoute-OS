"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icons
const createIcon = (color: string) => L.divIcon({
  className: 'custom-leaflet-icon',
  html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid #050505; box-shadow: 0 0 15px ${color};"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

const userIcon = createIcon('#ffffff');
const facilityIcon = createIcon('#a1a1aa');

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 14, { animate: true, duration: 1.5 });
  }, [center, map]);
  return null;
}

export default function MapContent({ 
  onLocationFound 
}: { 
  onLocationFound: (loc: { lat: number, lng: number }) => void 
}) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [facilities, setFacilities] = useState<[number, number][]>([]);
  const [activeRoute, setActiveRoute] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setPosition([lat, lng]);
          onLocationFound({ lat, lng });

          // Generate mock facilities within ~3-5km
          const generateOffset = () => (Math.random() - 0.5) * 0.05;
          setFacilities([
            [lat + generateOffset(), lng + generateOffset()],
            [lat + generateOffset(), lng + generateOffset()],
            [lat + generateOffset(), lng + generateOffset()],
          ]);
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Fallback to a default location if user denies permission
          const defaultLat = 28.6139;
          const defaultLng = 77.2090;
          setPosition([defaultLat, defaultLng]);
          onLocationFound({ lat: defaultLat, lng: defaultLng });
        }
      );
    }
  }, [onLocationFound]);

  if (!position) {
    return (
      <div className="w-full h-full bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-t-white border-r-white border-b-transparent border-l-transparent animate-spin mb-4" />
          <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase animate-pulse">Acquiring GPS Signal...</p>
        </div>
      </div>
    );
  }

  return (
    <MapContainer 
      center={position} 
      zoom={14} 
      style={{ height: '100%', width: '100%', background: '#050505' }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <MapUpdater center={position} />
      
      <Marker position={position} icon={userIcon} />
      
      {facilities.map((fac, idx) => (
        <Marker 
          key={idx} 
          position={fac} 
          icon={facilityIcon} 
          eventHandlers={{
            click: () => setActiveRoute(fac)
          }}
        />
      ))}

      {activeRoute && (
        <Polyline 
          positions={[position, activeRoute]} 
          pathOptions={{ color: '#ffffff', weight: 4, opacity: 0.8, className: 'glowing-line' }} 
        />
      )}
    </MapContainer>
  );
}
