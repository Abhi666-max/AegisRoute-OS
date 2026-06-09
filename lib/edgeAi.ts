export interface EdgeAIResult {
  hazardType: string;
  primaryHazard: string;
  severityScore: number;
  analysis: string[];
}

/**
 * Simulates a TensorFlow.js MobileNet client-side inference pipeline.
 * Performs zero backend computation.
 */
export async function analyzeImageLocal(file: File): Promise<EdgeAIResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fileName = file.name.toLowerCase();
      if (fileName.includes("face") || fileName.includes("person") || fileName.includes("profile")) {
        return resolve({
          hazardType: 'Invalid',
          primaryHazard: 'Invalid Input',
          severityScore: 0,
          analysis: ['Image rejected: Contains PII/Faces']
        });
      }

      // Simulate deterministic-like randomness based on file size for demo
      const seed = file.size;
      let primaryHazard = 'Clear';
      let severityScore = 0;
      let analysis: string[] = [];

      if (seed % 3 === 0) {
        primaryHazard = 'Pothole';
        severityScore = 45 + (seed % 40); // 45-85
        analysis = ['Depth: Moderate', 'Width: ~2ft', 'Surface Crack Detected'];
      } else if (seed % 3 === 1) {
        primaryHazard = 'Infrastructure Damage';
        severityScore = 70 + (seed % 30); // 70-100
        analysis = ['Structural integrity compromised', 'Water Accumulation: High', 'Immediate attention required'];
      } else {
        primaryHazard = 'Fallen Tree';
        severityScore = 60 + (seed % 40); // 60-100
        analysis = ['Debris blocking lane', 'Visibility: Low', 'Organic matter detected'];
      }

      resolve({
        hazardType: primaryHazard,
        primaryHazard,
        severityScore,
        analysis
      });
    }, 1500);
  });
}
