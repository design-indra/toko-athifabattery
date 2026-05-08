'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Product } from '@/lib/types'
import Link from 'next/link'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, ArrowLeft, Upload, Zap, LogOut } from 'lucide-react'
import Image from 'next/image'
import { formatRupiah, getFinalPrice } from '@/lib/whatsapp'
import { useRouter } from 'next/navigation'

const emptyForm = {
  name: '', description: '', price: 0, discount_percent: 0,
  stock: 0, category: 'Mobil', brand: '', image_url: '', is_featured: false, is_active: true,
}
const categories = ['Mobil', 'Motor', 'Truk', 'Alat Berat', 'Lainnya']

export default function AdminProdukPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => { loadProducts() }, [])

  async function loadProducts() {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setProducts(data ?? [])
    setLoading(false)
  }

  async function handleSave() {
    setSaving(true)
    if (editId) {
      await supabase.from('products').update(form).eq('id', editId)
    } else {
      await supabase.from('products').insert(form)
    }
    setForm(emptyForm); setEditId(null); setShowForm(false)
    await loadProducts()
    setSaving(false)
  }

  function handleEdit(p: Product) {
    setForm({
      name: p.name, description: p.description, price: p.price,
      discount_percent: p.discount_percent, stock: p.stock,
      category: p.category, brand: p.brand, image_url: p.image_url,
      is_featured: p.is_featured, is_active: p.is_active,
    })
    setEditId(p.id); setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleDelete(id: string) {
    if (!confirm('Hapus produk ini?')) return
    await supabase.from('products').delete().eq('id', id)
    await loadProducts()
  }

  async function handleToggleActive(p: Product) {
    await supabase.from('products').update({ is_active: !p.is_active }).eq('id', p.id)
    await loadProducts()
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const filename = `${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage.from('products').upload(filename, file)
    if (!error && data) {
      const { data: urlData } = supabase.storage.from('products').getPublicUrl(data.path)
      setForm(f => ({ ...f, image_url: urlData.publicUrl }))
    }
    setUploading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen">
      <nav className="bg-slate-900 text-white px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold">
          <Zap size={18} className="text-amber-400" />
          <span>Admin — Kelola Produk</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/admin" className="text-slate-400 hover:text-white">Dashboard</Link>
          <Link href="/admin/pesanan" className="text-slate-400 hover:text-white">Pesanan</Link>
          <button onClick={handleLogout} className="flex items-center gap-1 text-red-400 hover:text-red-300">
            <LogOut size={15} /> Keluar
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">📦 Kelola Produk</h1>
          <button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true) }} className="btn-primary flex items-center gap-2">
            <Plus size={16} /> Tambah Produk
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="card p-6 space-y-4">
            <h2 className="font-bold text-lg">{editId ? '✏️ Edit Produk' : '➕ Tambah Produk Baru'}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1">Nama Produk</label>
                <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Aki GS Astra MF NS60L" /></div>

              <div><label className="block text-sm font-medium mb-1">Merek</label>
                <input className="input" value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} placeholder="GS Astra" /></div>

              <div><label className="block text-sm font-medium mb-1">Kategori</label>
                <select className="input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select></div>

              <div><label className="block text-sm font-medium mb-1">Stok</label>
                <input type="number" className="input" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: +e.target.value }))} /></div>

              <div><label className="block text-sm font-medium mb-1">Harga Normal (Rp)</label>
                <input type="number" className="input" value={form.price} onChange={e => setForm(f => ({ ...f, price: +e.target.value }))} /></div>

              <div><label className="block text-sm font-medium mb-1">Diskon (%)</label>
                <input type="number" className="input" min={0} max={100} value={form.discount_percent} onChange={e => setForm(f => ({ ...f, discount_percent: +e.target.value }))} />
                {form.discount_percent > 0 && (
                  <p className="text-xs text-green-600 mt-1">Harga final: {formatRupiah(getFinalPrice(form.price, form.discount_percent))}</p>
                )}</div>
            </div>

            <div><label className="block text-sm font-medium mb-1">Deskripsi</label>
              <textarea className="input resize-none h-24" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Deskripsi produk..." /></div>

            {/* Image upload */}
            <div>
              <label className="block text-sm font-medium mb-1">Foto Produk</label>
              <div className="flex items-center gap-4">
                {form.image_url && (
                  <Image src={form.image_url} alt="preview" width={80} height={80} className="rounded-xl object-contain bg-slate-100 p-2" />
                )}
                <label className="btn-outline cursor-pointer flex items-center gap-2 text-sm py-2" onClick={e => e.stopPropagation()}>
                  <Upload size={15} />
                  {uploading ? 'Mengupload...' : 'Upload Foto'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                </label>
              </div>
              {form.image_url && <input className="input mt-2 text-xs" value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="URL foto" />}
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} className="accent-amber-500 w-4 h-4" />
                <span className="text-sm">Aktif di etalase</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_featured} onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))} className="accent-amber-500 w-4 h-4" />
                <span className="text-sm">Tampil di banner</span>
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} disabled={saving || !form.name} className="btn-primary disabled:opacity-60 flex items-center gap-2">
                {saving ? 'Menyimpan...' : editId ? '💾 Update Produk' : '✅ Simpan Produk'}
              </button>
              <button onClick={() => { setShowForm(false); setForm(emptyForm); setEditId(null) }} className="btn-outline">
                Batal
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => <div key={i} className="card h-16 animate-pulse bg-slate-100 dark:bg-slate-800" />)}
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left">Produk</th>
                    <th className="px-4 py-3 text-left">Harga</th>
                    <th className="px-4 py-3 text-center">Stok</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden shrink-0">
                            <Image src={p.image_url || 'https://placehold.co/100x100/f59e0b/white?text=🔋'} alt={p.name} width={40} height={40} className="object-contain p-1" />
                          </div>
                          <div>
                            <p className="font-medium line-clamp-1">{p.name}</p>
                            <p className="text-xs text-slate-400">{p.brand} · {p.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-amber-600 dark:text-amber-400">{formatRupiah(getFinalPrice(p.price, p.discount_percent))}</p>
                        {p.discount_percent > 0 && <p className="text-xs text-slate-400 line-through">{formatRupiah(p.price)}</p>}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`font-semibold ${p.stock === 0 ? 'text-red-500' : 'text-green-600'}`}>{p.stock}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => handleToggleActive(p)} title="Toggle aktif">
                          {p.is_active
                            ? <ToggleRight size={24} className="text-green-500 mx-auto" />
                            : <ToggleLeft size={24} className="text-slate-400 mx-auto" />
                          }
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handleEdit(p)} className="p-1.5 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-600 transition-colors">
                            <Pencil size={15} />
                          </button>
                          <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {products.length === 0 && (
                <p className="text-center py-10 text-slate-400 text-sm">Belum ada produk. Klik "Tambah Produk" untuk mulai.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
