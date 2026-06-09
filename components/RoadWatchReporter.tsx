'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { saveOfflineReport } from '@/lib/indexedDB';
import { MapPin, UploadCloud, AlertTriangle, CheckCircle, WifiOff } from 'lucide-react';

export function RoadWatchReporter() {
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [severityScore, setSeverityScore] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'submitting' | 'success' | 'offline_saved' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCaptureLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setErrorMsg('');
      },
      (error) => setErrorMsg('Unable to retrieve your location. Please ensure location permissions are granted.')
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setStatus('idle');
        setSeverityScore(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateEdgeAIAnalysis = async (imgBase64: string) => {
    // Mocking TensorFlow.js MobileNet/Custom model inference
    setStatus('analyzing');
    // Simulated inference delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Simulate calculating severity (1-10) based on hazard analysis
    const mockSeverity = Math.floor(Math.random() * 10) + 1;
    setSeverityScore(mockSeverity);
    return mockSeverity;
  };

  const handleSubmit = async () => {
    if (!image || !location) {
      setErrorMsg('Please capture an image and location first.');
      return;
    }

    try {
      setErrorMsg('');
      const severity = await simulateEdgeAIAnalysis(image);
      setStatus('submitting');
      
      const payload = {
        location_lat: location.lat,
        location_lng: location.lng,
        image_url: image, // In production, upload blob to Supabase Storage first
        severity_score: severity,
        country_code: 'IN', // Mocking country code for Multi-tenancy RLS
        status: 'pending' as const,
      };

      if (!navigator.onLine) {
        // PWA Offline-first logic via IndexedDB
        await saveOfflineReport({
          id: crypto.randomUUID(),
          ...payload,
          timestamp: Date.now(),
        });
        setStatus('offline_saved');
      } else {
        const supabase = createClient();
        
        // Push to Supabase backend
        // Note: Assumes authenticated context or public insert policy depending on hackathon rules
        const { error } = await supabase
          .from('roadwatch_reports')
          .insert([payload]);

        if (error) throw error;
        setStatus('success');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during submission.');
      setStatus('error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl border border-slate-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
          <AlertTriangle size={24} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Report Hazard</h2>
      </div>
      
      {/* Geolocation Section */}
      <div className="mb-6">
        <button 
          onClick={handleCaptureLocation}
          className={`w-full py-3.5 px-4 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 ${
            location 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <MapPin size={18} />
          {location ? `Location Captured: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Capture GPS Location'}
        </button>
      </div>

      {/* Image Upload Section */}
      <div className="mb-6">
        <label className="block w-full cursor-pointer text-center py-10 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 hover:bg-slate-50 transition-all">
          <div className="flex flex-col items-center gap-2">
            <UploadCloud size={32} className="text-slate-400" />
            <span className="text-slate-600 font-medium">{image ? 'Change Image' : 'Take Photo or Upload'}</span>
          </div>
          <input 
            type="file" 
            accept="image/*" 
            capture="environment"
            className="hidden" 
            onChange={handleImageChange}
          />
        </label>
        {image && (
          <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative group">
            <img src={image} alt="Hazard preview" className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
              Image Preview
            </div>
          </div>
        )}
      </div>

      {/* Edge AI Simulation Status */}
      {status === 'analyzing' && (
        <div className="mb-6 py-3 px-4 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium flex items-center justify-center gap-3">
          <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
          Edge AI computing hazard severity...
        </div>
      )}
      
      {severityScore !== null && status !== 'analyzing' && (
        <div className="mb-6 flex justify-center">
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
            severityScore > 7 ? 'bg-red-100 text-red-700' : 
            severityScore > 4 ? 'bg-amber-100 text-amber-700' : 
            'bg-emerald-100 text-emerald-700'
          }`}>
            <AlertTriangle size={16} />
            Detected Severity: {severityScore}/10
          </span>
        </div>
      )}

      {/* Feedback Messages */}
      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-100 rounded-xl text-sm flex items-start gap-2">
          <AlertTriangle size={18} className="shrink-0 mt-0.5" />
          {errorMsg}
        </div>
      )}

      {status === 'success' && (
        <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl text-sm font-medium flex items-start gap-2">
          <CheckCircle size={18} className="shrink-0 mt-0.5" />
          Hazard report successfully uploaded to the central grid!
        </div>
      )}

      {status === 'offline_saved' && (
        <div className="mb-6 p-4 bg-amber-50 text-amber-700 border border-amber-100 rounded-xl text-sm font-medium flex items-start gap-2">
          <WifiOff size={18} className="shrink-0 mt-0.5" />
          You are offline. Report securely saved locally via IndexedDB and will sync when network is restored.
        </div>
      )}

      {/* Action Button */}
      <button 
        onClick={handleSubmit}
        disabled={status === 'analyzing' || status === 'submitting' || !image || !location}
        className="w-full py-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
      >
        {status === 'submitting' ? (
          <>
            <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            Transmitting...
          </>
        ) : 'Submit Hazard Report'}
      </button>
    </div>
  );
}
