import { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroBanner from '@/components/HeroBanner'
import ProductGrid from '@/components/ProductGrid'
import { Zap, ShieldCheck, Truck, Headphones } from 'lucide-react'

const features = [
  { icon: ShieldCheck, title: 'Produk Bergaransi', desc: 'Semua aki bergaransi resmi pabrik' },
  { icon: Truck, title: 'COD Tersedia', desc: 'Bayar di tempat, tidak perlu transfer dulu' },
  { icon: Zap, title: 'Harga Grosir', desc: 'Harga bersaing langsung dari distributor' },
  { icon: Headphones, title: 'Respon Cepat', desc: 'Chat WA dibalas dalam hitungan menit' },
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-10">
        {/* Hero */}
        <HeroBanner />

        {/* Features */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title} className="card p-4 text-center hover:shadow-md transition-shadow">
              <f.icon className="mx-auto mb-2 text-amber-500" size={28} />
              <h3 className="font-semibold text-sm">{f.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* Products */}
        <section id="produk">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">🔋 Etalase Produk</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Aki mobil, motor, dan truk pilihan terbaik
              </p>
            </div>
          </div>
          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card h-72 animate-pulse bg-slate-100 dark:bg-slate-800" />
                ))}
              </div>
            }
          >
            <ProductGrid />
          </Suspense>
        </section>

        {/* CTA WA */}
        <section className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Ada pertanyaan? Chat langsung!</h2>
          <p className="text-white/80 text-sm mb-5">
            Admin kami siap membantu Anda memilih aki yang tepat.
          </p>
          <a
            href={`https://wa.me/6287882385071?text=${encodeURIComponent('Halo Athifabattery, saya ingin tanya tentang produk aki 👋')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-green-700 font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform shadow-lg"
          >
            💬 Chat WhatsApp Sekarang
          </a>
        </section>
      </main>
      <Footer />
    </>
  )
}
