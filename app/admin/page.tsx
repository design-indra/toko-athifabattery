'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Package, ShoppingBag, TrendingUp, LogOut, Zap, Users, Star } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { formatRupiah } from '@/lib/whatsapp'

interface Stats {
  totalProducts: number
  activeProducts: number
  totalOrders: number
  pendingOrders: number
  totalRevenue: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [chartData, setChartData] = useState<{ date: string; total: number }[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    const [{ count: totalProducts }, { count: activeProducts }, { data: orders }] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_active', true),
      supabase.from('orders').select('total_price, status, created_at'),
    ])

    const totalRevenue = orders?.filter(o => o.status !== 'cancelled').reduce((s, o) => s + (o.total_price ?? 0), 0) ?? 0
    const pendingOrders = orders?.filter(o => o.status === 'pending').length ?? 0

    // Chart: last 7 days
    const now = new Date()
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now)
      d.setDate(d.getDate() - (6 - i))
      return d.toISOString().split('T')[0]
    })
    const chart = days.map(date => ({
      date: date.slice(5),
      total: orders?.filter(o => o.created_at?.startsWith(date) && o.status !== 'cancelled').reduce((s, o) => s + (o.total_price ?? 0), 0) ?? 0,
    }))

    setStats({ totalProducts: totalProducts ?? 0, activeProducts: activeProducts ?? 0, totalOrders: orders?.length ?? 0, pendingOrders, totalRevenue })
    setChartData(chart)
    setLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const statCards = stats ? [
    { icon: Package, label: 'Total Produk', value: stats.totalProducts, sub: `${stats.activeProducts} aktif`, color: 'text-blue-500' },
    { icon: ShoppingBag, label: 'Total Pesanan', value: stats.totalOrders, sub: `${stats.pendingOrders} pending`, color: 'text-amber-500' },
    { icon: TrendingUp, label: 'Total Pendapatan', value: formatRupiah(stats.totalRevenue), sub: 'semua waktu', color: 'text-green-500' },
  ] : []

  return (
    <div className="min-h-screen">
      {/* Admin Navbar */}
      <nav className="bg-slate-900 text-white px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold">
          <Zap size={18} className="text-amber-400" />
          <span>Admin — Athifabattery</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors">Lihat Toko</Link>
          <Link href="/admin/produk" className="text-slate-400 hover:text-white transition-colors">Produk</Link>
          <Link href="/admin/pesanan" className="text-slate-400 hover:text-white transition-colors">Pesanan</Link>
          <Link href="/admin/ulasan" className="text-slate-400 hover:text-white transition-colors">Ulasan</Link>
          <button onClick={handleLogout} className="flex items-center gap-1 text-red-400 hover:text-red-300">
            <LogOut size={15} /> Keluar
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold">📊 Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Ringkasan toko Athifabattery</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => <div key={i} className="card h-24 animate-pulse bg-slate-100 dark:bg-slate-800" />)}
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {statCards.map(s => (
                <div key={s.label} className="card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <s.icon size={22} className={s.color} />
                    <span className="text-sm text-slate-500 dark:text-slate-400">{s.label}</span>
                  </div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-slate-400 mt-1">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="card p-6">
              <h2 className="font-bold mb-4">📈 Pendapatan 7 Hari Terakhir</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v: number) => formatRupiah(v)} />
                  <Bar dataKey="total" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/admin/produk" className="card p-5 hover:shadow-md transition-shadow flex items-center gap-4">
                <Package size={32} className="text-amber-500" />
                <div>
                  <p className="font-bold">Kelola Produk</p>
                  <p className="text-sm text-slate-500">Tambah, edit, hapus produk</p>
                </div>
              </Link>
              <Link href="/admin/pesanan" className="card p-5 hover:shadow-md transition-shadow flex items-center gap-4">
                <ShoppingBag size={32} className="text-amber-500" />
                <div>
                  <p className="font-bold">Kelola Pesanan</p>
                  <p className="text-sm text-slate-500">Lihat dan update status pesanan</p>
                </div>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
