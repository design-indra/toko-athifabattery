'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Order } from '@/lib/types'
import Link from 'next/link'
import { Zap, LogOut, MessageCircle } from 'lucide-react'
import { formatRupiah } from '@/lib/whatsapp'
import { useRouter } from 'next/navigation'

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  done: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'Menunggu', confirmed: 'Dikonfirmasi', done: 'Selesai', cancelled: 'Dibatalkan'
}

export default function AdminPesananPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => { loadOrders() }, [])

  async function loadOrders() {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    setOrders((data as Order[]) ?? [])
    setLoading(false)
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from('orders').update({ status }).eq('id', id)
    await loadOrders()
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
          <span>Admin — Pesanan</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/admin" className="text-slate-400 hover:text-white">Dashboard</Link>
          <Link href="/admin/produk" className="text-slate-400 hover:text-white">Produk</Link>
          <button onClick={handleLogout} className="flex items-center gap-1 text-red-400 hover:text-red-300">
            <LogOut size={15} /> Keluar
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold">🛍️ Kelola Pesanan</h1>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => <div key={i} className="card h-20 animate-pulse bg-slate-100 dark:bg-slate-800" />)}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-4xl mb-3">📭</p>
            <p>Belum ada pesanan masuk.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => {
              const items = Array.isArray(order.items) ? order.items : []
              return (
                <div key={order.id} className="card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold">{order.customer_name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[order.status] ?? ''}`}>
                          {STATUS_LABELS[order.status] ?? order.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {new Date(order.created_at).toLocaleString('id-ID')} · {order.payment_method}
                      </p>
                      <a
                        href={`https://wa.me/${order.customer_phone.replace(/\D/g, '')}`}
                        target="_blank" rel="noopener noreferrer"
                        className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1 mt-1 hover:underline"
                      >
                        <MessageCircle size={13} /> {order.customer_phone}
                      </a>
                    </div>
                    <p className="font-bold text-amber-600 dark:text-amber-400 text-lg">
                      {formatRupiah(order.total_price)}
                    </p>
                  </div>

                  {/* Items */}
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-sm space-y-1 mb-4">
                    {items.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between">
                        <span>{item.product?.name ?? 'Produk'} × {item.quantity}</span>
                        <span className="font-medium">{formatRupiah((item.product?.price ?? 0) * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Status update */}
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(STATUS_LABELS).map(s => (
                      <button
                        key={s}
                        onClick={() => updateStatus(order.id, s)}
                        disabled={order.status === s}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${order.status === s
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 cursor-default'
                          : 'bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-700'
                        }`}
                      >
                        {STATUS_LABELS[s]}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
