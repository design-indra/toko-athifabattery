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
    <div className="card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden">
      {/* Image */}
      <Link href={`/produk/${product.id}`} className="relative block h-44 bg-slate-100 dark:bg-slate-700">
        <Image
          src={product.image_url || 'https://placehold.co/400x300/f59e0b/white?text=🔋+Aki'}
          alt={product.name}
          fill
          className="object-contain p-3"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {hasDiscount && (
          <span className="absolute top-2 left-2 badge-discount">-{product.discount_percent}%</span>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-sm">Stok Habis</span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
          {product.brand} · {product.category}
        </span>
        <Link href={`/produk/${product.id}`}>
          <h3 className="font-semibold text-sm leading-snug hover:text-amber-600 dark:hover:text-amber-400 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-auto">
          {hasDiscount && (
            <span className="text-xs text-slate-400 line-through block">
              {formatRupiah(product.price)}
            </span>
          )}
          <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
            {formatRupiah(finalPrice)}
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={11} className="text-amber-400 fill-amber-400" />
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
            className="flex-1 flex items-center justify-center gap-1.5 btn-outline text-xs py-2 px-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={14} />
            {added ? '✓ Ditambah' : 'Keranjang'}
          </button>
          <a
            href={generateSingleWALink(product.name, product.price, product.discount_percent)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 btn-primary text-xs py-2 px-2"
          >
            <MessageCircle size={14} />
            Pesan
          </a>
        </div>
      </div>
    </div>
  )
}
