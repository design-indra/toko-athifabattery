'use client'
import Image from 'next/image'
import { useState } from 'react'
import { ShoppingCart, MessageCircle, Star, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Product, Review } from '@/lib/types'
import { useCart } from '@/hooks/useCart'
import { formatRupiah, getFinalPrice, generateSingleWALink } from '@/lib/whatsapp'
import { supabase } from '@/lib/supabase'

interface Props { product: Product; reviews: Review[] }

export default function ProductDetailClient({ product, reviews }: Props) {
  const addItem = useCart((s) => s.addItem)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [reviewName, setReviewName] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [localReviews, setLocalReviews] = useState<Review[]>(reviews)

  const finalPrice = getFinalPrice(product.price, product.discount_percent)
  const hasDiscount = product.discount_percent > 0
  const avgRating = localReviews.length
    ? localReviews.reduce((s, r) => s + r.rating, 0) / localReviews.length
    : 0

  function handleAddCart() {
    for (let i = 0; i < qty; i++) addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  async function handleReviewSubmit() {
    if (!reviewName.trim()) return
    setSubmitting(true)
    const { data, error } = await supabase.from('reviews').insert({
      product_id: product.id,
      reviewer_name: reviewName,
      rating: reviewRating,
      comment: reviewComment,
    }).select().single()
    if (!error && data) {
      setLocalReviews([data, ...localReviews])
      setReviewName(''); setReviewComment(''); setReviewRating(5)
    }
    setSubmitting(false)
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-amber-500 mb-6 transition-colors">
        <ArrowLeft size={16} /> Kembali ke Beranda
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="card p-6 flex items-center justify-center h-72 md:h-96">
          <Image
            src={product.image_url || 'https://placehold.co/400x300/f59e0b/white?text=🔋+Aki'}
            alt={product.name}
            width={400} height={400}
            className="object-contain max-h-full"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <div>
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
              {product.brand} · {product.category}
            </span>
            <h1 className="text-2xl font-bold mt-1">{product.name}</h1>
            {avgRating > 0 && (
              <div className="flex items-center gap-1 mt-1">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={14} className={s <= Math.round(avgRating) ? 'text-amber-400 fill-amber-400' : 'text-slate-300'} />
                ))}
                <span className="text-xs text-slate-500 ml-1">({localReviews.length} ulasan)</span>
              </div>
            )}
          </div>

          <div>
            {hasDiscount && <p className="text-sm text-slate-400 line-through">{formatRupiah(product.price)}</p>}
            <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{formatRupiah(finalPrice)}</p>
            {hasDiscount && <span className="badge-discount">Hemat {product.discount_percent}%</span>}
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{product.description}</p>

          <div className="text-sm text-slate-500 dark:text-slate-400">
            Stok tersedia: <strong className="text-slate-800 dark:text-slate-200">{product.stock} unit</strong>
          </div>

          {/* Qty */}
          <div className="flex items-center gap-3">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-600 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 font-bold">−</button>
            <span className="font-bold w-8 text-center">{qty}</span>
            <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-600 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 font-bold">+</button>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <button onClick={handleAddCart} disabled={product.stock === 0} className="flex-1 btn-outline flex items-center justify-center gap-2">
              <ShoppingCart size={16} />
              {added ? '✓ Ditambahkan!' : 'Keranjang'}
            </button>
            <a
              href={generateSingleWALink(product.name, product.price, product.discount_percent)}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 btn-primary flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              Pesan Sekarang
            </a>
          </div>

          {/* Payment info */}
          <div className="card p-4 text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <p>✅ Pembayaran: Transfer Bank / COD / Datang Langsung</p>
            <p>✅ Garansi produk resmi pabrik</p>
            <p>✅ Respon WA cepat dalam hitungan menit</p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-12">
        <h2 className="text-lg font-bold mb-6">⭐ Ulasan Produk</h2>

        {/* Review form */}
        <div className="card p-5 mb-6">
          <h3 className="font-semibold mb-4 text-sm">Tulis Ulasan</h3>
          <input className="input mb-3" placeholder="Nama Anda" value={reviewName} onChange={e => setReviewName(e.target.value)} />
          <div className="flex gap-1 mb-3">
            {[1,2,3,4,5].map(s => (
              <button key={s} onClick={() => setReviewRating(s)}>
                <Star size={22} className={s <= reviewRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'} />
              </button>
            ))}
          </div>
          <textarea className="input mb-3 resize-none h-20" placeholder="Komentar (opsional)" value={reviewComment} onChange={e => setReviewComment(e.target.value)} />
          <button onClick={handleReviewSubmit} disabled={submitting || !reviewName.trim()} className="btn-primary text-sm">
            {submitting ? 'Mengirim...' : 'Kirim Ulasan'}
          </button>
        </div>

        {/* Review list */}
        {localReviews.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-8">Belum ada ulasan. Jadilah yang pertama! 🙌</p>
        ) : (
          <div className="space-y-4">
            {localReviews.map(r => (
              <div key={r.id} className="card p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">{r.reviewer_name}</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={12} className={s <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'} />
                    ))}
                  </div>
                </div>
                {r.comment && <p className="text-sm text-slate-600 dark:text-slate-300">{r.comment}</p>}
                <p className="text-xs text-slate-400 mt-1">{new Date(r.created_at).toLocaleDateString('id-ID')}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
