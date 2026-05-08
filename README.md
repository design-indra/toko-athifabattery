# 🔋 Toko Athifabattery

Toko online aki mobil & motor berbasis **Next.js 14 + Supabase**.

## ✨ Fitur
- 🌙 Dark / Light Mode
- 📱 Mobile Responsive + PWA (install ke HP)
- 🔋 Grid etalase produk 3 kolom
- 🛒 Keranjang belanja (Zustand)
- 💬 Order via WhatsApp (auto message lengkap)
- ⭐ Review & Rating produk
- 📍 Lokasi toko + Google Maps
- 💳 COD / Transfer / Datang Langsung
- 🔐 Admin panel (CRUD produk, kelola pesanan)
- 📈 Laporan penjualan + chart
- 🔔 Notifikasi pesanan via Telegram Bot
- 🌍 SEO Schema.org LocalBusiness

---

## 🚀 Setup Lokal

### 1. Clone & Install
```bash
git clone https://github.com/USERNAME/toko-athifabattery.git
cd toko-athifabattery
npm install
```

### 2. Setup Supabase
1. Buka [supabase.com](https://supabase.com) → buat project baru
2. Buka **SQL Editor** → paste isi file `supabase/schema.sql` → Run
3. Buka **Storage** → buat bucket baru bernama `products`, set ke **Public**
4. Buka **Authentication → Users** → tambah user admin (email + password)

### 3. Environment Variables
```bash
cp .env.example .env.local
```
Isi `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
TELEGRAM_BOT_TOKEN=         # Opsional
TELEGRAM_CHAT_ID=           # Opsional
```

### 4. Jalankan
```bash
npm run dev
```
Buka: http://localhost:3000

---

## 🗺️ Update Lokasi Toko (Wajib!)

Edit file `components/MapEmbed.tsx`:
```ts
const LAT = -6.2088   // ← ganti latitude toko kamu
const LNG = 106.8456  // ← ganti longitude toko kamu
```

Cara dapat koordinat:
1. Buka Google Maps
2. Klik titik lokasi toko
3. Copy angka lat,lng dari URL

---

## 🔔 Setup Telegram Bot (Opsional)

1. Buka Telegram → cari `@BotFather`
2. Ketik `/newbot` → ikuti instruksi → copy **token**
3. Cari `@userinfobot` → kirim pesan → copy **chat_id** kamu
4. Masukkan ke `.env.local`:
   ```
   TELEGRAM_BOT_TOKEN=123456789:ABCdef...
   TELEGRAM_CHAT_ID=123456789
   ```

---

## 🌐 Deploy ke Vercel

### 1. Push ke GitHub
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/USERNAME/toko-athifabattery.git
git push -u origin main
```

### 2. Deploy di Vercel
1. Buka [vercel.com](https://vercel.com) → Import repository
2. Di **Environment Variables**, masukkan semua isi `.env.local`
3. Klik **Deploy** → tunggu selesai
4. Domain otomatis: `toko-athifabattery.vercel.app`

### 3. Update URL
Setelah dapat domain Vercel, update di `.env.local` (untuk production):
```
NEXT_PUBLIC_APP_URL=https://toko-athifabattery.vercel.app
```

---

## 📁 Struktur Penting

```
app/
  page.tsx              # Beranda + etalase produk
  produk/[id]/          # Detail produk + review
  keranjang/            # Keranjang + order WA
  lokasi/               # Lokasi + Maps + pembayaran
  admin/                # Panel admin (login, dashboard, produk, pesanan)
components/             # UI components
lib/                    # Supabase, WhatsApp, Telegram utils
hooks/                  # useCart (Zustand)
supabase/schema.sql     # SQL setup database
```

---

## ✏️ Kustomisasi

| Yang diubah | File |
|---|---|
| Nama toko, nomor WA | `lib/whatsapp.ts`, `app/layout.tsx` |
| Alamat toko | `components/Footer.tsx`, `app/lokasi/page.tsx` |
| Koordinat Maps | `components/MapEmbed.tsx` |
| Warna brand | `tailwind.config.ts` |
| Banner promo | `components/HeroBanner.tsx` |
| SEO / Schema | `app/layout.tsx` |

---

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **Supabase** (PostgreSQL + Auth + Storage + Realtime)
- **Tailwind CSS** (dark mode)
- **Zustand** (cart state)
- **Recharts** (grafik admin)
- **next-themes** (dark/light toggle)
- **Vercel** (hosting)

---

Dibuat untuk **Toko Athifabattery** 🔋  
WA: [0878-8238-5071](https://wa.me/6287882385071)
