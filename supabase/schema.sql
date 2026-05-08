-- =============================================
-- TOKO ATHIFABATTERY — Supabase Schema
-- Jalankan di: Supabase Dashboard → SQL Editor
-- =============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =============================================
-- TABEL PRODUCTS
-- =============================================
create table if not exists products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price integer not null default 0,
  discount_percent integer not null default 0,
  stock integer not null default 0,
  category text not null default 'Umum',
  brand text not null default '',
  image_url text default '',
  is_featured boolean default false,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =============================================
-- TABEL ORDERS
-- =============================================
create table if not exists orders (
  id uuid default uuid_generate_v4() primary key,
  customer_name text not null,
  customer_phone text not null,
  items jsonb not null default '[]',
  total_price integer not null default 0,
  payment_method text not null default 'COD',
  status text not null default 'pending',
  notes text,
  created_at timestamptz default now()
);

-- =============================================
-- TABEL REVIEWS
-- =============================================
create table if not exists reviews (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references products(id) on delete cascade,
  reviewer_name text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamptz default now()
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

-- Products: public read, admin write
alter table products enable row level security;
create policy "Public read products" on products for select using (true);
create policy "Admin insert products" on products for insert with check (auth.role() = 'authenticated');
create policy "Admin update products" on products for update using (auth.role() = 'authenticated');
create policy "Admin delete products" on products for delete using (auth.role() = 'authenticated');

-- Orders: public insert, admin read
alter table orders enable row level security;
create policy "Public insert orders" on orders for insert with check (true);
create policy "Admin read orders" on orders for select using (auth.role() = 'authenticated');
create policy "Admin update orders" on orders for update using (auth.role() = 'authenticated');

-- Reviews: public read/insert, admin delete
alter table reviews enable row level security;
create policy "Public read reviews" on reviews for select using (true);
create policy "Public insert reviews" on reviews for insert with check (true);
create policy "Admin delete reviews" on reviews for delete using (auth.role() = 'authenticated');

-- =============================================
-- STORAGE BUCKET (jalankan terpisah)
-- =============================================
-- insert into storage.buckets (id, name, public) values ('products', 'products', true);

-- =============================================
-- SEED DATA — Produk Contoh
-- =============================================
insert into products (name, description, price, discount_percent, stock, category, brand, is_featured, is_active) values
('Aki GS Astra MF NS60L', 'Aki kering maintenance free untuk mobil. Kapasitas 45Ah. Cocok untuk Toyota, Honda, Daihatsu.', 650000, 10, 15, 'Mobil', 'GS Astra', true, true),
('Aki Yuasa YB12AL-A2', 'Aki motor 12V 12Ah. Maintenance free. Cocok untuk Honda, Yamaha, Suzuki.', 185000, 0, 30, 'Motor', 'Yuasa', true, true),
('Aki Massiv NS40ZL', 'Aki basah untuk mobil. Kapasitas 35Ah. Harga terjangkau berkualitas.', 420000, 5, 20, 'Mobil', 'Massiv', false, true),
('Aki GS Astra MF 55B24L', 'Aki mobil 45Ah untuk Avanza, Xenia, Innova generasi lama.', 720000, 8, 10, 'Mobil', 'GS Astra', true, true),
('Aki Yuasa YTX14-BS', 'Aki motor sport 12V 12Ah. Cocok Ninja, CBR, R15, MT series.', 320000, 0, 25, 'Motor', 'Yuasa', false, true),
('Aki Truk NS200', 'Aki besar 200Ah untuk truk dan alat berat. Daya tahan tinggi.', 1850000, 5, 5, 'Truk', 'Massiv', false, true);
