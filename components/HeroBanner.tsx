'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const banners = [
  {
    title: '🔋 Aki Mobil Terbaik',
    subtitle: 'GS Astra, Yuasa, Massiv tersedia. Harga langsung dari distributor!',
    image: '/banner1.jpg',
    cta: 'Lihat Produk',
    href: '#produk',
  },
  {
    title: '⚡ Diskon s/d 15%',
    subtitle: 'Promo aki motor & mobil pilihan. Stok terbatas, pesan sekarang!',
    image: '/banner2.jpg',
    cta: 'Pesan Sekarang',
    href: `https://wa.me/6287882385071?text=${encodeURIComponent('Halo, saya ingin tanya promo aki 👋')}`,
  },
  {
    title: '🚗 COD & Antar Lokasi',
    subtitle: 'Bayar di tempat, transfer bank, atau datang langsung ke toko kami.',
    image: '/banner3.jpg',
    cta: 'Lihat Lokasi',
    href: '/lokasi',
  },
  {
    title: '🔧 Servis & Ganti Aki',
    subtitle: 'Teknisi berpengalaman, ganti aki cepat di tempat.',
    image: '/banner4.jpg',
    cta: 'Hubungi Kami',
    href: `https://wa.me/6287882385071?text=${encodeURIComponent('Halo, mau tanya servis aki 👋')}`,
  },
  {
    title: '🏍️ Aki Motor Murah',
    subtitle: 'Tersedia aki motor semua merk. Garansi resmi pabrik.',
    image: '/banner5.jpg',
    cta: 'Lihat Motor',
    href: '#produk',
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
    <div className="relative rounded-2xl overflow-hidden h-56 md:h-72">
      <Image
        src={b.image}
        alt={b.title}
        fill
        className="object-cover transition-all duration-500"
        priority
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 px-6 py-10 md:py-14 flex flex-col gap-3 h-full justify-center">
        <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight slide-in">
          {b.title}
        </h1>
        <p className="text-white/90 text-sm md:text-base max-w-lg slide-in">
          {b.subtitle}
        </p>
        <Link
          href={b.href}
          className="self-start mt-2 bg-white text-slate-900 font-bold px-6 py-2.5 rounded-xl hover:scale-105 transition-transform shadow-lg text-sm"
        >
          {b.cta} →
        </Link>
      </div>

      <div className="absolute bottom-4 left-6 flex gap-2 z-10">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white w-6' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  )
}
