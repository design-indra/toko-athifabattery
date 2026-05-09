'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Star } from 'lucide-react'

export default function ReviewForm() {
  const [form, setForm] = useState({ name: '', lokasi: '', judul: '', pesan: '', rating: 5 })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await supabase.from('reviews_toko').insert([form])
    setSuccess(true)
    setLoading(false)
    setForm({ name: '', lokasi: '', judul: '', pesan: '', rating: 5 })
  }

  if (success) return (
    <div className="card p-5 text-center space-y-2">
      <p className="text-2xl">🎉</p>
      <p className="font-semibold">Terima kasih atas ulasannya!</p>
      <p className="text-sm text-slate-500">Ulasan sedang menunggu persetujuan admin.</p>
      <button onClick={() => setSuccess(false)} className="btn-outline text-xs px-4 py-2 mt-2">Tulis Ulasan Lagi</button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="card p-5 space-y-3">
      <h3 className="font-semibold text-sm">✍️ Tulis Ulasan Anda</h3>

      {/* Rating */}
      <div className="flex gap-1">
        {[1,2,3,4,5].map((s) => (
          <button key={s} type="button" onClick={() => setForm({...form, rating: s})}>
            <Star size={20} className={s <= form.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'} />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input className="input text-sm" placeholder="Nama Anda" value={form.name}
          onChange={e => setForm({...form, name: e.target.value})} required />
        <input className="input text-sm" placeholder="Kota/Kecamatan" value={form.lokasi}
          onChange={e => setForm({...form, lokasi: e.target.value})} />
      </div>

      <input className="input text-sm" placeholder="Judul ulasan" value={form.judul}
        onChange={e => setForm({...form, judul: e.target.value})} required />

      <textarea className="input text-sm resize-none" rows={3} placeholder="Ceritakan pengalaman Anda..."
        value={form.pesan} onChange={e => setForm({...form, pesan: e.target.value})} required />

      <button type="submit" disabled={loading} className="btn-primary w-full py-2 text-sm disabled:opacity-60">
        {loading ? 'Mengirim...' : '📨 Kirim Ulasan'}
      </button>
    </form>
  )
}
