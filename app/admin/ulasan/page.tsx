'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Zap, LogOut, CheckCircle, Trash2, Clock } from 'lucide-react'

interface Review {
  id: string
  name: string
  lokasi: string
  judul: string
  pesan: string
  rating: number
  is_approved: boolean
  created_at: string
}

export default function AdminUlasan() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'semua' | 'pending' | 'approved'>('pending')
  const router = useRouter()

  useEffect(() => { loadReviews() }, [])

  async function loadReviews() {
    const { data } = await supabase.from('reviews_toko').select('*').order('created_at', { ascending: false })
    setReviews(data ?? [])
    setLoading(false)
  }

  async function approve(id: string) {
    await supabase.from('reviews_toko').update({ is_approved: true }).eq('id', id)
    setReviews(reviews.map(r => r.id === id ? { ...r, is_approved: true } : r))
  }

  async function remove(id: string) {
    if (!confirm('Hapus ulasan ini?')) return
    await supabase.from('reviews_toko').delete().eq('id', id)
    setReviews(reviews.filter(r => r.id !== id))
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const filtered = reviews.filter(r =>
    filter === 'semua' ? true :
    filter === 'pending' ? !r.is_approved :
    r.is_approved
  )

  const pendingCount = reviews.filter(r => !r.is_approved).length

  return (
    <div className="min-h-screen">
      <nav className="bg-slate-900 text-white px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold">
          <Zap size={18} className="text-amber-400" />
          <span>Admin — Athifabattery</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="text-slate-400 hover:text-white">Lihat Toko</Link>
          <Link href="/admin" className="text-slate-400 hover:text-white">Dashboard</Link>
          <Link href="/admin/produk" className="text-slate-400 hover:text-white">Produk</Link>
          <Link href="/admin/pesanan" className="text-slate-400 hover:text-white">Pesanan</Link>
          <button onClick={handleLogout} className="flex items-center gap-1 text-red-400 hover:text-red-300">
            <LogOut size={15} /> Keluar
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">⭐ Kelola Ulasan</h1>
          <p className="text-sm text-slate-500 mt-1">{pendingCount} ulasan menunggu persetujuan</p>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          {(['pending', 'approved', 'semua'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                filter === f ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
              {f === 'pending' ? `⏳ Pending (${pendingCount})` : f === 'approved' ? '✅ Disetujui' : '📋 Semua'}
            </button>
          ))}
        </div>

        {loading ? <p className="text-slate-400 text-sm">Memuat...</p> : filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p className="text-3xl mb-2">📭</p>
            <p>Tidak ada ulasan</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(r => (
              <div key={r.id} className="card p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm">{r.name}</span>
                      {r.lokasi && <span className="text-xs text-slate-400">/ {r.lokasi}</span>}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${r.is_approved ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                        {r.is_approved ? '✅ Disetujui' : '⏳ Pending'}
                      </span>
                    </div>
                    <div className="flex gap-0.5 mt-1">
                      {[1,2,3,4,5].map(s => <span key={s} className={s <= r.rating ? 'text-amber-400 text-sm' : 'text-slate-200 text-sm'}>★</span>)}
                    </div>
                    <p className="font-medium text-sm mt-1">{r.judul}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 italic">"{r.pesan}"</p>
                    <p className="text-xs text-slate-400 mt-1">{new Date(r.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  {!r.is_approved && (
                    <button onClick={() => approve(r.id)}
                      className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg transition-colors">
                      <CheckCircle size={13} /> Setujui
                    </button>
                  )}
                  <button onClick={() => remove(r.id)}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg transition-colors">
                    <Trash2 size={13} /> Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
