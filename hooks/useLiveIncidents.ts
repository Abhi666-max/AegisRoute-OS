import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export interface Incident {
  id: string;
  location: string;
  severityScore: number;
  status: 'Pending' | 'In Progress' | 'Resolved';
  timestamp: number;
  type: string;
}

export function useLiveIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalActive: 0,
    criticalSeverity: 0,
    avgResolutionTime: '0h',
    activeSOS: 0
  });

  useEffect(() => {
    const q = query(collection(db, 'incidents'), orderBy('timestamp', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveData: Incident[] = [];
      let totalActive = 0;
      let criticalSeverity = 0;
      let activeSOS = 0;
      
      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<Incident, 'id'>;
        const incident = { id: doc.id, ...data };
        liveData.push(incident);
        
        if (incident.status !== 'Resolved') {
          totalActive++;
          if (incident.severityScore >= 80) criticalSeverity++;
          if (incident.type === 'SOS') activeSOS++;
        }
      });
      
      setIncidents(liveData);
      setMetrics({
        totalActive,
        criticalSeverity,
        avgResolutionTime: '2.4h', // Mocked as resolution time tracking requires start/end timestamps
        activeSOS
      });
      setLoading(false);
    }, (error) => {
      console.error("Error fetching live incidents: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { incidents, metrics, loading };
}
