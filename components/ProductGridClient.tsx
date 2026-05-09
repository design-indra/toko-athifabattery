'use client'
import { useState } from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/lib/types'
import { Search, X } from 'lucide-react'

export default function ProductGridClient({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [search, setSearch] = useState('')

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

  const filtered = products.filter((p) => {
    const matchCategory = activeCategory === 'Semua' || p.category === activeCategory
    const matchSearch = search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari produk... contoh: NS60, Yuasa, Motor"
          className="input pl-9 pr-9 text-sm"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
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

      {/* Hasil pencarian */}
      {filtered.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          <p className="text-3xl mb-2">🔍</p>
          <p className="font-medium">Produk tidak ditemukan</p>
          <p className="text-sm">Coba kata kunci lain</p>
          <button onClick={() => { setSearch(''); setActiveCategory('Semua') }}
            className="btn-outline text-xs px-4 py-2 mt-3">
            Reset Pencarian
          </button>
        </div>
      ) : (
        <>
          {search && (
            <p className="text-xs text-slate-500">
              Menampilkan <span className="font-semibold text-amber-600">{filtered.length}</span> produk untuk "<span className="font-semibold">{search}</span>"
            </p>
          )}
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
