import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Incident {
  id: string;
  type: string;
  classification?: string;
  location: string;
  coordinates?: string;
  status: string; // 'UNASSIGNED CITIZEN REPORT' | 'PENDING' | 'CRITICAL' | 'UNIT EN-ROUTE' | 'RESOLVED' | 'CANCELLED_BY_USER'
  time: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  sourceImage?: string | null;
  confidence?: string;
  timestamp: number;
}

const initialIncidents: Incident[] = [
  { id: 'SOS-8942', type: 'Severe Collision & Blockade', classification: 'Severe Collision & Blockade', location: 'Dhaka Transit Corridor Node', coordinates: '23.8103° N, 90.4125° E', status: 'UNASSIGNED CITIZEN REPORT', time: 'Just now', severity: 'CRITICAL', confidence: '99.2%', timestamp: Date.now() - 60000 },
  { id: 'SOS-8891', type: 'Structural Pothole Fracture', classification: 'Structural Pothole Fracture', location: 'Panvel Sector 4 Node', coordinates: '18.9894° N, 73.1175° E', status: 'RESOLVED', time: '2 mins ago', severity: 'MODERATE', confidence: '96.8%', timestamp: Date.now() - 120000 },
  { id: 'SOS-8821', type: 'Highway Gridlock Stagnation', classification: 'Highway Gridlock Stagnation', location: 'Colombo Port Mesh', coordinates: '6.9271° N, 79.8612° E', status: 'RESOLVED', time: '5 mins ago', severity: 'LOW', confidence: '94.5%', timestamp: Date.now() - 300000 },
  { id: 'SOS-8754', type: 'Flash Flood Waterlogging', classification: 'Flash Flood Waterlogging', location: 'Kochi Marine Drive', coordinates: '9.9312° N, 76.2673° E', status: 'RESOLVED', time: '11 mins ago', severity: 'HIGH', confidence: '98.1%', timestamp: Date.now() - 660000 },
  { id: 'SOS-8690', type: 'Traffic Signal Power Grid Failure', classification: 'Traffic Signal Power Grid Failure', location: 'Kolkata Central Hub', coordinates: '22.5726° N, 88.3639° E', status: 'UNASSIGNED CITIZEN REPORT', time: '15 mins ago', severity: 'HIGH', confidence: '97.9%', timestamp: Date.now() - 900000 },
  { id: 'SOS-8630', type: 'Road Surface Degradation', classification: 'Road Surface Degradation', location: 'Chennai IT Expressway', coordinates: '13.0827° N, 80.2707° E', status: 'RESOLVED', time: '25 mins ago', severity: 'MODERATE', confidence: '95.4%', timestamp: Date.now() - 1500000 },
  { id: 'SOS-8512', type: 'Bridge Expansion Joint Gap', classification: 'Bridge Expansion Joint Gap', location: 'Nagpur Zero Mile Array', coordinates: '21.1458° N, 79.0882° E', status: 'RESOLVED', time: '30 mins ago', severity: 'HIGH', confidence: '99.5%', timestamp: Date.now() - 1800000 },
];

interface IncidentStore {
  incidents: Incident[];
  metricsLog: { time: string; action: string; details: string }[];
  addIncident: (incident: Omit<Incident, 'timestamp'>) => Incident;
  updateStatus: (id: string, status: string) => void;
  revokeIncident: (id: string) => void;
  logMetric: (action: string, details: string) => void;
}

export const useIncidentStore = create<IncidentStore>()(
  persist(
    (set) => ({
      incidents: initialIncidents,
      metricsLog: [
        { time: 'Just now', action: 'SYSTEM_INIT', details: 'BIMSTEC Mesh Array Synchronized' },
      ],
      addIncident: (inc) => {
        const newIncident: Incident = {
          ...inc,
          timestamp: Date.now(),
        };
        set((state) => ({
          incidents: [newIncident, ...state.incidents],
          metricsLog: [{ time: new Date().toLocaleTimeString(), action: 'NEW_TELEMETRY', details: `Received ${inc.id} (${inc.type})` }, ...state.metricsLog],
        }));
        if (typeof window !== 'undefined') {
          localStorage.setItem('aegis_incident_sync', Date.now().toString());
        }
        return newIncident;
      },
      updateStatus: (id, status) => {
        set((state) => ({
          incidents: state.incidents.map((inc) => (inc.id === id ? { ...inc, status } : inc)),
          metricsLog: [{ time: new Date().toLocaleTimeString(), action: 'STATUS_UPDATE', details: `Incident ${id} -> ${status}` }, ...state.metricsLog],
        }));
        if (typeof window !== 'undefined') {
          localStorage.setItem('aegis_incident_sync', Date.now().toString());
        }
      },
      revokeIncident: (id) => {
        set((state) => ({
          incidents: state.incidents.map((inc) => (inc.id === id ? { ...inc, status: 'CANCELLED_BY_USER' } : inc)),
          metricsLog: [{ time: new Date().toLocaleTimeString(), action: 'SIGNAL_REVOKED', details: `Citizen revoked ${id} (False Alarm)` }, ...state.metricsLog],
        }));
        if (typeof window !== 'undefined') {
          localStorage.setItem('aegis_incident_sync', Date.now().toString());
        }
      },
      logMetric: (action, details) => {
        set((state) => ({
          metricsLog: [{ time: new Date().toLocaleTimeString(), action, details }, ...state.metricsLog],
        }));
        if (typeof window !== 'undefined') {
          localStorage.setItem('aegis_incident_sync', Date.now().toString());
        }
      },
    }),
    {
      name: 'aegis-incident-storage',
    }
  )
);

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'aegis-incident-storage' || e.key === 'aegis_incident_sync') {
      useIncidentStore.persist.rehydrate();
    }
  });
}
