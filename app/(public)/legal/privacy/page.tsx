export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto py-32 px-6">
      <h1 className="text-4xl font-clash font-bold text-white mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
        <p>Last Updated: June 2026</p>
        <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Data Collection</h2>
        <p>AegisRoute OS collects telemetry data, location vectors, and user imagery for the purpose of intelligent road safety infrastructure. As an offline-first PWA, much of this data is stored locally via IndexedDB before being transmitted to government authorities.</p>
        <h2 className="text-xl font-bold text-white mt-8 mb-4">2. B2G Compliance</h2>
        <p>All data strictly adheres to BIMSTEC data sovereignty laws. Data is encrypted at rest using AES-256 and transmitted securely via edge nodes.</p>
      </div>
    </div>
  );
}
