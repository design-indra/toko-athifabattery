'use client'
import Image from 'next/image'
import { useState } from 'react'

const photos = [
  { src: '/gallery/foto1.jpg', alt: 'Toko Athifa Battery' },
  { src: '/gallery/foto2.jpg', alt: 'Produk Aki' },
  { src: '/gallery/foto3.jpg', alt: 'Proses Pemasangan' },
  { src: '/gallery/foto4.jpg', alt: 'Stok Aki' },
  { src: '/gallery/foto5.jpg', alt: 'Layanan Toko' },
]

export default function Gallery() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">📸 Galeri Toko</h2>
      
      {/* Grid */}
      <div className="grid grid-cols-3 gap-2">
        {photos.map((p) => (
          <button
            key={p.src}
            onClick={() => setSelected(p.src)}
            className="relative aspect-square rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              className="object-cover"
              sizes="33vw"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="relative w-full max-w-lg aspect-square">
            <Image
              src={selected}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold"
            onClick={() => setSelected(null)}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  )
}
