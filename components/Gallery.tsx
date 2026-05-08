'use client'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

const photos = Array.from({ length: 20 }, (_, i) => ({
  src: `/gallery/foto${i + 1}.jpg`,
  alt: `Galeri Athifa Battery ${i + 1}`,
}))

export default function Gallery() {
  const [selected, setSelected] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const interval = setInterval(() => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: 160, behavior: 'smooth' })
      }
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold">📸 Galeri Toko</h2>

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scroll-smooth pb-1"
        style={{ scrollbarWidth: 'none' }}
      >
        {photos.map((p) => (
          <button
            key={p.src}
            onClick={() => setSelected(p.src)}
            className="relative shrink-0 w-36 h-36 rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
          >
            <Image src={p.src} alt={p.alt} fill className="object-cover" sizes="144px" />
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="relative w-full max-w-lg aspect-square">
            <Image src={selected} alt="Preview" fill className="object-contain" />
          </div>
          <button className="absolute top-4 right-4 text-white text-3xl font-bold">✕</button>
        </div>
      )}
    </section>
  )
}
