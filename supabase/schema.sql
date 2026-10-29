-- =======================================================
-- NENYAHOME SUPABASE DATABASE SCHEMA
-- Execute this script in your Supabase SQL Editor
-- =======================================================

-- 1. Create Properties Table
CREATE TABLE IF NOT EXISTS public.properties (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    price TEXT NOT NULL,
    price_num NUMERIC NOT NULL DEFAULT 0,
    category TEXT NOT NULL DEFAULT 'cantilever',
    location TEXT NOT NULL DEFAULT 'South Ridge Boulevard',
    land_area NUMERIC NOT NULL DEFAULT 0,
    building_area NUMERIC NOT NULL DEFAULT 0,
    bedrooms INTEGER NOT NULL DEFAULT 1,
    bathrooms INTEGER NOT NULL DEFAULT 1,
    image TEXT NOT NULL,
    badge TEXT,
    description TEXT,
    features TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Create Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    villa TEXT NOT NULL,
    preferred_date TEXT,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies for Public Read
CREATE POLICY "Allow public read access to properties" 
    ON public.properties FOR SELECT USING (true);

CREATE POLICY "Allow public insert to inquiries" 
    ON public.inquiries FOR INSERT WITH CHECK (true);

-- 5. Create Policies for Service Role / Authenticated Write
CREATE POLICY "Allow full access for service role on properties" 
    ON public.properties FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow full access for service role on inquiries" 
    ON public.inquiries FOR ALL USING (true) WITH CHECK (true);

-- 6. Storage Bucket for Property Images
INSERT INTO storage.buckets (id, name, public)
VALUES ('real-estate-assets', 'real-estate-assets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow public read on real-estate-assets bucket"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'real-estate-assets');

CREATE POLICY "Allow public upload on real-estate-assets bucket"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'real-estate-assets');
