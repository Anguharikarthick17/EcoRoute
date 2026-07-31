-- ============================================================
-- EcoRoute — Supabase PostgreSQL Database Schema
-- Government E-Waste Management Platform
-- Copy and execute this entire script in Supabase SQL Editor
-- ============================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Custom Role Enum Type
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('CITIZEN', 'RECYCLER', 'OFFICER', 'ADMIN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Users Table (Core Auth Table linked with Supabase Auth or Custom Auth)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role user_role DEFAULT 'CITIZEN',
    citizen_id TEXT UNIQUE,
    recycler_license_no TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Citizen Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pin_code TEXT NOT NULL,
    aadhaar_linked BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Recycler Profiles Table (Verified Recycler / Buyer Details)
CREATE TABLE IF NOT EXISTS public.recycler_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    shop_name TEXT NOT NULL,
    owner_name TEXT NOT NULL,
    aadhaar_number VARCHAR(12) NOT NULL,
    aadhaar_verified BOOLEAN DEFAULT true,
    shop_address TEXT NOT NULL,
    city TEXT NOT NULL,
    district TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    latitude TEXT,
    longitude TEXT,
    business_type TEXT NOT NULL DEFAULT 'Recycler',
    accepted_ewaste TEXT[] DEFAULT '{}',
    shop_photo TEXT,
    shop_license TEXT,
    owner_id_proof TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. E-Waste Scrap Listings Table (Live Marketplace Items)
CREATE TABLE IF NOT EXISTS public.ewaste_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_name TEXT NOT NULL,
    brand TEXT NOT NULL DEFAULT 'Generic',
    category TEXT NOT NULL,
    condition TEXT NOT NULL,
    estimated_age TEXT DEFAULT '3 years',
    description TEXT,
    image_url TEXT NOT NULL,
    price TEXT NOT NULL,
    weight_kg NUMERIC(8,2) DEFAULT 2.50,
    seller_name TEXT NOT NULL,
    seller_city TEXT NOT NULL,
    seller_role TEXT DEFAULT 'Citizen',
    status TEXT DEFAULT 'AVAILABLE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Indexes for Query Performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_ewaste_category ON public.ewaste_listings(category);
CREATE INDEX IF NOT EXISTS idx_ewaste_status ON public.ewaste_listings(status);
CREATE INDEX IF NOT EXISTS idx_recycler_city ON public.recycler_profiles(city);

-- 8. Row Level Security (RLS) Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recycler_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ewaste_listings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active e-waste listings for marketplace
CREATE POLICY "Allow public read active listings" ON public.ewaste_listings
    FOR SELECT USING (true);

-- Allow authenticated users to insert listings
CREATE POLICY "Allow authenticated insert listings" ON public.ewaste_listings
    FOR INSERT WITH CHECK (true);

-- Allow public access to users and profiles for auth & lookup
CREATE POLICY "Allow public read users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow public insert users" ON public.users FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read recycler profiles" ON public.recycler_profiles FOR SELECT USING (true);
CREATE POLICY "Allow public insert recycler profiles" ON public.recycler_profiles FOR INSERT WITH CHECK (true);

-- Initial Demo E-Waste Seed Data
INSERT INTO public.ewaste_listings (id, device_name, brand, category, condition, estimated_age, description, image_url, price, weight_kg, seller_name, seller_city, seller_role, status)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'HP Pavilion g6 Laptop (Core i5, 8GB)', 'HP', 'Laptops & Mobiles', 'Non-working / Damaged', '4 years', 'Motherboard fault. Screen, casing, keyboard intact for raw metal/part extraction.', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80', '₹1,800', 2.40, 'Rajesh Kumar', 'New Delhi', 'Citizen', 'AVAILABLE'),
  ('22222222-2222-2222-2222-222222222222', 'Samsung Galaxy S10 Plus (Dual SIM)', 'Samsung', 'Mobile Phones', 'Partially Working', '3 years', 'Display cracked, powers on. Precious metal recovery candidate (Gold/Copper).', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80', '₹950', 0.18, 'Anbu Chezhian', 'Salem', 'Citizen', 'AVAILABLE'),
  ('33333333-3333-3333-3333-333333333333', 'LG Double Door Frost Free Refrigerator 260L', 'LG', 'Home Appliances', 'Non-working / Damaged', '7 years', 'Compressor failure. Heavy steel, copper coil and motor scrap.', 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80', '₹3,500', 52.00, 'Priya Sharma', 'Bengaluru', 'Citizen', 'GOV_RESERVED')
ON CONFLICT (id) DO NOTHING;
