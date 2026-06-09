-- Enable pgvector extension for DriveLegal RAG
CREATE EXTENSION IF NOT EXISTS vector;

-- Create Enums
CREATE TYPE user_role AS ENUM ('citizen', 'authority', 'admin');
CREATE TYPE report_status AS ENUM ('pending', 'investigating', 'resolved', 'rejected');

-- 1. Profiles Table (Extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role user_role NOT NULL DEFAULT 'citizen',
  country_code VARCHAR(2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. RoadWatch Reports Table
CREATE TABLE roadwatch_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  location_lat DOUBLE PRECISION NOT NULL,
  location_lng DOUBLE PRECISION NOT NULL,
  image_url TEXT,
  severity_score INTEGER CHECK (severity_score >= 1 AND severity_score <= 10),
  status report_status NOT NULL DEFAULT 'pending',
  country_code VARCHAR(2) NOT NULL, -- Multi-tenancy partition key
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Legal Vectors Table (DriveLegal RAG Database)
CREATE TABLE legal_vectors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  embedding VECTOR(1536), -- 1536 dimensions (compatible with standard embeddings)
  country_code VARCHAR(2) NOT NULL, -- Multi-tenancy partition key
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadwatch_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_vectors ENABLE ROW LEVEL SECURITY;

-----------------------------------------
-- RLS POLICIES FOR 'profiles'
-----------------------------------------
-- Users can view their own profile
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" 
ON profiles FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-----------------------------------------
-- RLS POLICIES FOR 'roadwatch_reports'
-----------------------------------------
-- 1. Citizens can view their own reports
CREATE POLICY "Citizens can view own reports" 
ON roadwatch_reports FOR SELECT 
USING (auth.uid() = user_id);

-- 2. Authorities can view all reports for their specific country (Multi-tenancy)
CREATE POLICY "Authorities can view country reports" 
ON roadwatch_reports FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
      AND profiles.role = 'authority' 
      AND profiles.country_code = roadwatch_reports.country_code
  )
);

-- 3. Admins can view all reports across all countries
CREATE POLICY "Admins can view all reports" 
ON roadwatch_reports FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 4. Citizens can create reports (tied to their auth ID)
CREATE POLICY "Citizens can insert own reports" 
ON roadwatch_reports FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 5. Citizens can update ONLY their own reports
CREATE POLICY "Citizens can update own reports" 
ON roadwatch_reports FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 6. Authorities can update reports (e.g., change status) for their country
CREATE POLICY "Authorities can update country reports" 
ON roadwatch_reports FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
      AND profiles.role = 'authority' 
      AND profiles.country_code = roadwatch_reports.country_code
  )
);

-----------------------------------------
-- RLS POLICIES FOR 'legal_vectors'
-----------------------------------------
-- 1. All authenticated users can view legal data for their own country (For the RAG Widget)
CREATE POLICY "Users can view country legal vectors" 
ON legal_vectors FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
      AND profiles.country_code = legal_vectors.country_code
  )
);

-- 2. Admins can manage legal vectors (Insert/Update/Delete)
CREATE POLICY "Admins can manage legal vectors" 
ON legal_vectors FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() AND role = 'admin'
  )
);
