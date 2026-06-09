import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client for the API Route
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const { query, countryCode } = await request.json();

    if (!query || !countryCode) {
      return NextResponse.json({ error: 'Missing query or country code' }, { status: 400 });
    }

    // 1. Simulate embedding generation (Adhering to Zero Cost Constraint)
    // In production: const embedding = await openai.embeddings.create({ input: query })
    const mockEmbedding = Array(1536).fill(0).map(() => Math.random() * 2 - 1);

    // 2. Query Supabase Vector DB using our RPC function
    const { data: documents, error } = await supabase.rpc('match_legal_vectors', {
      query_embedding: mockEmbedding,
      match_country_code: countryCode,
      match_threshold: 0.5,
      match_count: 3,
    });

    if (error) {
      console.warn('RPC Error (Expected if DB is not live yet):', error);
    }

    // 3. Simulate RAG LLM Inference (Zero cost)
    // In production: pass `documents` as context to Gemini/OpenAI
    const simulatedResponse = `Based on the ${countryCode} traffic and compliance regulations, regarding your query: "${query}", the legal framework stipulates strict adherence to local road safety protocols. Authorities are mandated to address severe hazards within 48 hours as per section 4(b) of the Municipal Code. (Mocked RAG response)`;

    return NextResponse.json({
      role: 'assistant',
      content: simulatedResponse,
      sources: documents || []
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
