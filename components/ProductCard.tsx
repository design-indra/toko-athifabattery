'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, MessageCircle, Star } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCart } from '@/hooks/useCart'
import { formatRupiah, getFinalPrice, generateSingleWALink } from '@/lib/whatsapp'
import { useState } from 'react'

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem)
  const [added, setAdded] = useState(false)

  const finalPrice = getFinalPrice(product.price, product.discount_percent)
  const hasDiscount = product.discount_percent > 0
  const isOutOfStock = product.stock === 0

  function handleAddCart() {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="card hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden">
      {/* Image - fixed square */}
      <Link href={`/produk/${product.id}`} className="relative block bg-slate-100 dark:bg-slate-700" style={{ paddingBottom: '100%' }}>
        <Image
          src={product.image_url || 'https://placehold.co/400x400/f59e0b/white?text=🔋'}
          alt={product.name}
          fill
          className="object-contain p-3"
          sizes="50vw"
        />
        {hasDiscount && (
          <span className="absolute top-2 left-2 badge-discount text-xs px-2 py-0.5">-{product.discount_percent}%</span>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-sm">Habis</span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <span className="text-xs text-amber-600 dark:text-amber-400 font-medium truncate">
          {product.brand} · {product.category}
        </span>
        <Link href={`/produk/${product.id}`}>
          <h3 className="font-semibold text-sm leading-snug hover:text-amber-600 dark:hover:text-amber-400 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-auto pt-1">
          {hasDiscount && (
            <span className="text-xs text-slate-400 line-through block">
              {formatRupiah(product.price)}
            </span>
          )}
          <span className="text-base font-bold text-amber-600 dark:text-amber-400">
            {formatRupiah(finalPrice)}
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={10} className="text-amber-400 fill-amber-400" />
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Stok: {product.stock}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleAddCart}
            disabled={isOutOfStock}
            title="Tambah ke keranjang"
            className={`flex items-center justify-center btn-outline p-2 disabled:opacity-40 disabled:cursor-not-allowed ${added ? 'border-green-500 text-green-500' : ''}`}
          >
            {added ? '✓' : <ShoppingCart size={16} />}
          </button>
          <a
            href={generateSingleWALink(product.name, product.price, product.discount_percent)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 btn-primary text-xs py-2"
          >
            <MessageCircle size={14} />
            Pesan
          </a>
        </div>
      </div>
    </div>
  )
}
