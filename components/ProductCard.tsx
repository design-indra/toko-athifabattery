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
      {/* Image */}
      <Link href={`/produk/${product.id}`} className="relative block h-24 bg-slate-100 dark:bg-slate-700">
        <Image
          src={product.image_url || 'https://placehold.co/400x300/f59e0b/white?text=🔋'}
          alt={product.name}
          fill
          className="object-contain p-2"
          sizes="33vw"
        />
        {hasDiscount && (
          <span className="absolute top-1 left-1 badge-discount text-[10px] px-1.5 py-0.5">-{product.discount_percent}%</span>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-xs">Habis</span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-2 flex flex-col gap-1 flex-1">
        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium truncate">
          {product.brand} · {product.category}
        </span>
        <Link href={`/produk/${product.id}`}>
          <h3 className="font-semibold text-xs leading-snug hover:text-amber-600 dark:hover:text-amber-400 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-auto">
          {hasDiscount && (
            <span className="text-[10px] text-slate-400 line-through block">
              {formatRupiah(product.price)}
            </span>
          )}
          <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
            {formatRupiah(finalPrice)}
          </span>
          <div className="flex items-center gap-1">
            <Star size={9} className="text-amber-400 fill-amber-400" />
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              Stok: {product.stock}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-1 mt-1">
          <button
            onClick={handleAddCart}
            disabled={isOutOfStock}
            className="flex-1 flex items-center justify-center gap-1 btn-outline text-[10px] py-1.5 px-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={11} />
            {added ? '✓' : 'Keranjang'}
          </button>
          <a
            href={generateSingleWALink(product.name, product.price, product.discount_percent)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1 btn-primary text-[10px] py-1.5 px-1"
          >
            <MessageCircle size={11} />
            Pesan
          </a>
        </div>
      </div>
    </div>
  )
}
