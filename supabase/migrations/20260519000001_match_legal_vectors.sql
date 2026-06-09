-- supabase/migrations/20260519000001_match_legal_vectors.sql

-- Creates a PostgreSQL function to match user query embeddings
-- against the DriveLegal legal_vectors RAG table via Cosine Distance.

CREATE OR REPLACE FUNCTION match_legal_vectors(
  query_embedding vector(1536),
  match_country_code text,
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id uuid,
  content text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    legal_vectors.id,
    legal_vectors.content,
    1 - (legal_vectors.embedding <=> query_embedding) AS similarity
  FROM legal_vectors
  -- RLS is bypassed slightly in RPCs if SECURITY DEFINER is used.
  -- Here we rely on standard RLS (SECURITY INVOKER is default)
  -- but we explicitly filter by country_code for exact multi-tenancy.
  WHERE legal_vectors.country_code = match_country_code
    AND 1 - (legal_vectors.embedding <=> query_embedding) > match_threshold
  ORDER BY legal_vectors.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
