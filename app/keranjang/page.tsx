'use client'
import { useCart } from '@/hooks/useCart'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, ShoppingBag, MessageCircle } from 'lucide-react'
import { formatRupiah, getFinalPrice, generateWALink } from '@/lib/whatsapp'
import { useState } from 'react'

const methods = ['COD (Bayar di Tempat)', 'Transfer Bank', 'Datang Langsung ke Toko']

export default function KeranjangPage() {
  const { items, removeItem, updateQty, clearCart, totalPrice } = useCart()
  const [method, setMethod] = useState(methods[0])

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 py-20 text-center">
          <ShoppingBag size={64} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
          <h1 className="text-xl font-bold mb-2">Keranjang Kosong</h1>
          <p className="text-slate-500 mb-6 text-sm">Yuk, tambahkan produk aki ke keranjang dulu!</p>
          <Link href="/" className="btn-primary">Lihat Produk</Link>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">🛒 Keranjang Belanja</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Items */}
          <div className="md:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => {
              const finalPrice = getFinalPrice(product.price, product.discount_percent)
              return (
                <div key={product.id} className="card p-4 flex gap-4">
                  <div className="relative w-20 h-20 shrink-0 bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden">
                    <Image
                      src={product.image_url || 'https://placehold.co/200x200/f59e0b/white?text=🔋'}
                      alt={product.name} fill className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm leading-snug line-clamp-2">{product.name}</h3>
                    <p className="text-amber-600 dark:text-amber-400 font-bold text-sm mt-1">
                      {formatRupiah(finalPrice)}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(product.id, quantity - 1)} className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 flex items-center justify-center text-sm hover:bg-slate-100 dark:hover:bg-slate-700 font-bold">−</button>
                        <span className="text-sm font-medium w-6 text-center">{quantity}</span>
                        <button onClick={() => updateQty(product.id, quantity + 1)} className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 flex items-center justify-center text-sm hover:bg-slate-100 dark:hover:bg-slate-700 font-bold">+</button>
                      </div>
                      <button onClick={() => removeItem(product.id)} className="text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold">{formatRupiah(finalPrice * quantity)}</p>
                  </div>
                </div>
              )
            })}

            <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600 transition-colors flex items-center gap-1">
              <Trash2 size={14} /> Kosongkan Keranjang
            </button>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="card p-5">
              <h2 className="font-bold mb-4">Ringkasan</h2>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Subtotal ({items.reduce((s,i) => s+i.quantity,0)} item)</span>
                <span className="font-semibold">{formatRupiah(totalPrice())}</span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-3 mt-3 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold text-amber-600 dark:text-amber-400 text-lg">{formatRupiah(totalPrice())}</span>
              </div>
            </div>

            {/* Payment method */}
            <div className="card p-5">
              <h2 className="font-bold mb-3 text-sm">Metode Pembayaran</h2>
              <div className="space-y-2">
                {methods.map(m => (
                  <label key={m} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="method" value={m} checked={method === m} onChange={() => setMethod(m)} className="accent-amber-500" />
                    <span className="text-sm">{m}</span>
                  </label>
                ))}
              </div>
            </div>

            <a
              href={generateWALink(items, method)}
              target="_blank" rel="noopener noreferrer"
              className="btn-primary w-full flex items-center justify-center gap-2 py-3"
            >
              <MessageCircle size={18} />
              Order via WhatsApp
            </a>
            <p className="text-xs text-slate-400 text-center">
              Pesanan dikirim ke admin WA: 0878-8238-5071
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
