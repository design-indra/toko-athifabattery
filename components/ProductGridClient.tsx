'use client'
import { useState } from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/lib/types'

export default function ProductGridClient({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState('Semua')

  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400">
        <p className="text-4xl mb-3">🔋</p>
        <p className="font-medium">Belum ada produk tersedia.</p>
        <p className="text-sm">Silakan cek kembali nanti.</p>
      </div>
    )
  }

  const categories = ['Semua', ...Array.from(new Set(products.map((p) => p.category)))]
  const filtered = activeCategory === 'Semua'
    ? products
    : products.filter((p) => p.category === activeCategory)

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeCategory === cat
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
