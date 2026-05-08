'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const banners = [
  {
    title: '🔋 Aki Mobil Terbaik',
    subtitle: 'GS Astra, Yuasa, Massiv tersedia. Harga langsung dari distributor!',
    bg: 'from-amber-500 to-orange-600',
    cta: 'Lihat Produk',
    href: '#produk',
  },
  {
    title: '⚡ Diskon s/d 15%',
    subtitle: 'Promo aki motor & mobil pilihan. Stok terbatas, pesan sekarang!',
    bg: 'from-blue-600 to-indigo-700',
    cta: 'Pesan Sekarang',
    href: `https://wa.me/6287882385071?text=${encodeURIComponent('Halo, saya ingin tanya promo aki 👋')}`,
  },
  {
    title: '🚗 COD & Antar Lokasi',
    subtitle: 'Bayar di tempat, transfer bank, atau datang langsung ke toko kami.',
    bg: 'from-emerald-500 to-teal-600',
    cta: 'Lihat Lokasi',
    href: '/lokasi',
  },
]

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % banners.length), 4000)
    return () => clearInterval(t)
  }, [])

  const b = banners[current]

  return (
    <div className={`relative bg-gradient-to-r ${b.bg} rounded-2xl overflow-hidden transition-all duration-500`}>
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 flex flex-col gap-4">
        <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight slide-in">
          {b.title}
        </h1>
        <p className="text-white/80 text-sm md:text-base max-w-lg slide-in">
          {b.subtitle}
        </p>
        <Link
          href={b.href}
          className="self-start mt-2 bg-white text-slate-900 font-bold px-6 py-2.5 rounded-xl hover:scale-105 transition-transform shadow-lg text-sm"
        >
          {b.cta} →
        </Link>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-6 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white w-6' : 'bg-white/40'}`}
          />
        ))}
      </div>

      {/* Decorative */}
      <div className="absolute -right-8 -top-8 w-48 h-48 bg-white/10 rounded-full" />
      <div className="absolute -right-4 bottom-0 w-32 h-32 bg-white/5 rounded-full" />
    </div>
  )
}
