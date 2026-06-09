import { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export interface OfflineReport {
  id: string;
  type: string;
  hazardType: string;
  severityScore: number;
  status: string;
  location: string;
  timestamp: number;
}

const STORAGE_KEY = 'aegis_offline_reports';

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Set initial status securely
    setIsOnline(navigator.onLine);

    const handleOnline = async () => {
      setIsOnline(true);
      await syncOfflineQueue();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncOfflineQueue = async () => {
    const queueString = localStorage.getItem(STORAGE_KEY);
    if (!queueString) return;

    try {
      const queue: OfflineReport[] = JSON.parse(queueString);
      if (queue.length === 0) return;

      console.log(`Syncing ${queue.length} offline reports to AegisRoute OS Core...`);

      for (const report of queue) {
        // Omitting 'id' as Firestore generates it
        const { id, ...payload } = report;
        await addDoc(collection(db, 'incidents'), payload);
      }

      // Clear queue upon successful sync
      localStorage.removeItem(STORAGE_KEY);
      console.log('Offline queue synchronized successfully.');
    } catch (error) {
      console.error('Error syncing offline queue:', error);
    }
  };

  const queueReportOffline = (report: Omit<OfflineReport, 'id'>) => {
    const queueString = localStorage.getItem(STORAGE_KEY);
    const queue: OfflineReport[] = queueString ? JSON.parse(queueString) : [];
    
    queue.push({
      ...report,
      id: Date.now().toString()
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
  };

  const submitReport = async (payload: Omit<OfflineReport, 'id'>) => {
    if (isOnline) {
      try {
        await addDoc(collection(db, 'incidents'), payload);
      } catch (error) {
        console.error('Failed online write, falling back to local queue:', error);
        queueReportOffline(payload);
      }
    } else {
      queueReportOffline(payload);
    }
  };

  return { isOnline, submitReport };
}
