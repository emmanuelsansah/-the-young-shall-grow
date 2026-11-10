-- ==============================================================================
-- THE YOUNG SHALL GROW - SUPABASE POSTGRESQL DATABASE SCHEMA & SEED SCRIPT
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  unit TEXT DEFAULT 'per piece',
  description TEXT,
  image TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  stock_count INTEGER DEFAULT 10,
  rating NUMERIC(2, 1) DEFAULT 5.0,
  colors TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  is_best_seller BOOLEAN DEFAULT false,
  is_new_arrival BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Customer Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp_phone TEXT,
  delivery_town TEXT NOT NULL,
  region TEXT NOT NULL,
  street_address TEXT,
  items JSONB NOT NULL,
  subtotal NUMERIC(10, 2) NOT NULL,
  discount NUMERIC(5, 2) DEFAULT 0,
  delivery_fee NUMERIC(10, 2) NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT DEFAULT 'Pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW())
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 5. Public Access Policies
-- Anyone can view products
CREATE POLICY "Allow public read access to products" 
  ON public.products FOR SELECT USING (true);

-- Allow insert/update/delete on products for admin operations (or authenticated users)
CREATE POLICY "Allow write access to products" 
  ON public.products FOR ALL USING (true) WITH CHECK (true);

-- Anyone can insert an order when placing it from the website
CREATE POLICY "Allow public insert on orders" 
  ON public.orders FOR INSERT WITH CHECK (true);

-- Allow reading and updating orders (store manager/admin)
CREATE POLICY "Allow full access to orders" 
  ON public.orders FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- 6. Initial Seed Data (THE YOUNG SHALL GROW Store Catalog)
-- ==============================================================================
INSERT INTO public.products (
  id, name, category, price, unit, description, image, in_stock, stock_count, rating, colors, is_featured, is_best_seller, is_new_arrival
) VALUES
(
  'ankara-01',
  'Royal GTP Super Wax Ankara (6 Yards)',
  'Ankara Fabrics',
  320.00,
  '6 yards full piece',
  '100% pure cotton high-density African Ankara wax print fabric. Rich vibrant color fastness ideal for engagement attire, fashion dresses, and traditional Ghanaian tailoring.',
  '/src/assets/images/product_ankara_wax_1794342370831.jpg',
  true,
  45,
  4.9,
  ARRAY['Gold & Crimson', 'Royal Blue', 'Emerald Green'],
  true,
  true,
  false
),
(
  'ankara-02',
  'Hitarget Original Dutch Wax Ankara',
  'Ankara Fabrics',
  195.00,
  '6 yards full piece',
  'Soft-touch breathable Ankara fabric printed with traditional Ghanaian heritage symbols. Perfect for tailors, fashion designers, and festive family uniforms.',
  '/src/assets/images/product_ankara_wax_1794342370831.jpg',
  true,
  30,
  4.8,
  ARRAY['Terracotta Red', 'Sun Gold', 'Dark Navy'],
  true,
  false,
  true
),
(
  'kente-01',
  'Handwoven Royal Bonwire Kente Strips',
  'Kente Fabrics',
  850.00,
  'Full 2-piece traditional wrap',
  'Authentic Ghanaian hand-woven royal Kente cloth crafted by master weavers. Intricate geometric motifs symbolizing prestige, leadership, and prosperity for weddings and traditional events.',
  '/src/assets/images/product_kente_woven_1794342371018.jpg',
  true,
  12,
  5.0,
  ARRAY['Gold, Green & Blue', 'Yellow & Maroon'],
  true,
  true,
  false
),
(
  'kente-02',
  'Printed Kente Pattern Cotton Material',
  'Kente Fabrics',
  160.00,
  '6 yards',
  'Affordable high-grade cotton print recreating traditional Kente weave patterns. Ideal for church wear, graduation gowns, and everyday cultural outfits.',
  '/src/assets/images/product_kente_woven_1794342371018.jpg',
  true,
  50,
  4.7,
  ARRAY['Royal Gold Pattern', 'Bright Orange Blend'],
  false,
  false,
  true
),
(
  'lining-01',
  'Premium Silk Satin Fabric Lining',
  'Lining Materials',
  25.00,
  'per yard',
  'Ultra-smooth anti-static silk lining material for suits, evening gowns, jackets, and traditional dresses. Adds luxury structure and sweat-barrier comfort.',
  '/src/assets/images/product_sewing_materials_1794342383514.jpg',
  true,
  200,
  4.9,
  ARRAY['Pure White', 'Deep Black', 'Golden Beige', 'Navy Blue'],
  false,
  true,
  false
),
(
  'lining-02',
  'Heavy Cotton Interfacing Lining',
  'Lining Materials',
  18.00,
  'per yard',
  'Firm structural stiffening lining for collars, kaftan chest panels, shirt cuffs, and dress waistbands. Essential for tailors in Tarkwa and beyond.',
  '/src/assets/images/product_sewing_materials_1794342383514.jpg',
  true,
  150,
  4.8,
  ARRAY['White', 'Black'],
  false,
  false,
  false
),
(
  'sewing-01',
  'Master Tailor Golden Shears & Sewing Kit',
  'Sewing Materials',
  120.00,
  'Full Kit',
  'Heavy-duty carbon steel dressmaker shears, 24 vibrant thread spools, measuring tape, tailor chalks, seam rippers, and stainless steel dress pins.',
  '/src/assets/images/product_sewing_materials_1794342383514.jpg',
  true,
  25,
  4.9,
  ARRAY['Brass Gold Shears'],
  true,
  true,
  false
),
(
  'sewing-02',
  'High-Strength Industrial Thread Spools (Set of 10)',
  'Sewing Materials',
  45.00,
  '10 Spools Box',
  'Durable 100% polyester core threads engineered for high-speed sewing machines and hand tailoring without snapping.',
  '/src/assets/images/product_sewing_materials_1794342383514.jpg',
  true,
  80,
  4.8,
  ARRAY[]::TEXT[],
  false,
  false,
  false
),
(
  'mens-01',
  'Polished Cashmerette Wool Suit Material',
  'Men''s Fabrics',
  280.00,
  '4 yards (Full Senator Set)',
  'Smooth wrinkle-resistant polished cashmerette fabric tailored for Ghanaian men’s senator suits, kaftans, and corporate agbada attire.',
  '/src/assets/images/hero_african_fabrics_1794342370468.jpg',
  true,
  35,
  4.9,
  ARRAY['Midnight Navy', 'Charcoal Grey', 'Deep Wine', 'Dark Olive'],
  true,
  true,
  false
),
(
  'womens-01',
  'Luxury French Lace & Organza Embroidery',
  'Women''s Fabrics',
  450.00,
  '5 yards piece',
  'Intricate crystal corded lace fabric embellished with sequence beads. Designed for bridal wear, wedding receptions, and high-fashion Ghanaian dresses.',
  '/src/assets/images/hero_african_fabrics_1794342370468.jpg',
  true,
  20,
  5.0,
  ARRAY['Champagne Gold', 'Emerald Green', 'Royal Purple', 'Pure White'],
  true,
  false,
  true
),
(
  'corp-01',
  'Italian Crepe & Corporate Dress Material',
  'Corporate and Occasional Outfit Materials',
  75.00,
  'per yard',
  'Premium stretch Italian crepe material for executive blazers, pencil skirts, corporate dresses, and formal uniforms.',
  '/src/assets/images/hero_african_fabrics_1794342370468.jpg',
  true,
  60,
  4.8,
  ARRAY['Jet Black', 'Crimson Red', 'Navy Blue', 'Mustard Yellow'],
  false,
  false,
  false
),
(
  'bag-01',
  'Original Ecolac Hard-Shell Luggage Set (3 Pcs)',
  'Ecolac Bags',
  1450.00,
  '3-Piece Suitecase Set (20", 24", 28")',
  'Ultra-durable polycarbonate Ecolac travel suitcase set with TSA combination lock, 360-degree silent spinner wheels, and scratch-resistant casing.',
  '/src/assets/images/product_ecolac_bag_1794342383072.jpg',
  true,
  8,
  5.0,
  ARRAY['Midnight Navy', 'Matte Black', 'Silver Metallic'],
  true,
  true,
  false
),
(
  'bag-02',
  'Ecolac Executive Business Laptop Backpack',
  'Ecolac Bags',
  280.00,
  'per piece',
  'Water-resistant anti-theft Ecolac backpack with padded 15.6" laptop compartment, USB charging port, and ergonomic lumbar support.',
  '/src/assets/images/product_ecolac_bag_1794342383072.jpg',
  true,
  15,
  4.9,
  ARRAY['Dark Charcoal', 'Navy Blue'],
  false,
  false,
  true
),
(
  'gas-01',
  'Standard 14.5kg LPG Household Gas Cylinder',
  'Gas Cylinders',
  350.00,
  'Full Cylinder unit',
  'Safety-certified thick steel LPG gas cylinder with brass explosion-proof valve. Essential for Tarkwa Pepesa households and catering businesses.',
  '/src/assets/images/product_gas_cylinder_1794342382917.jpg',
  true,
  25,
  4.9,
  ARRAY['Ocean Blue with Yellow Cap'],
  true,
  true,
  false
),
(
  'gas-02',
  'Compact 6kg Camping & Kitchen Gas Cylinder',
  'Gas Cylinders',
  220.00,
  'Compact Cylinder unit',
  'Portable heavy-gauge steel LPG cylinder complete with safety burner attachment. Perfect for students, small kitchens, and outdoor catering.',
  '/src/assets/images/product_gas_cylinder_1794342382917.jpg',
  true,
  18,
  4.8,
  ARRAY['Sky Blue'],
  false,
  false,
  false
),
(
  'other-01',
  'Stainless Steel Measuring Tape & Pattern Curves',
  'Other Available Products',
  35.00,
  'Set',
  'Flexible 150cm double-sided measuring tape with acrylic armhole and hip pattern curve rulers for fashion designing.',
  '/src/assets/images/product_sewing_materials_1794342383514.jpg',
  true,
  40,
  4.7,
  ARRAY[]::TEXT[],
  false,
  false,
  false
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  stock_count = EXCLUDED.stock_count,
  in_stock = EXCLUDED.in_stock;
