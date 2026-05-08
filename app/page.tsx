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

        {/* Deskripsi Toko */}
        <section className="card p-5 border-l-4 border-amber-500">
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            <span className="font-semibold text-slate-800 dark:text-white">Toko Aki Athifa Battery</span> melayani jual beli Accu / Aki motor dan mobil baru maupun second. Produk kami original dan bergaransi dengan harga terjangkau. Selain jual beli Aki, kami pun membeli aki bekas Anda dan menerima tukar tambah Aki juga setroom Aki. Dengan cabang yang tersebar di Banten, kami memberikan layanan antar dan pasang di wilayah Banten, khususnya <span className="font-medium text-amber-600 dark:text-amber-400">Serang – Cilegon</span>.
          </p>
        </section>

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
{/* Tentang Toko */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">🏪 Tentang Toko Athifabattery</h2>
          <div className="card p-5 space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              Kami hadir memenuhi kebutuhan kendaraan anda yang memerlukan Aki seperti mobil dan motor. Kami juga menyediakan Aki kering untuk <span className="font-medium text-slate-800 dark:text-white">UPS, Genset, PLTS (Pembangkit Listrik Tenaga Surya), Aki Tower</span> dan juga Aki untuk alat-alat berat lainnya.
            </p>
            <p>
              Dengan teknisi yang berpengalaman di bidangnya, kami didukung dengan penyediaan produk asli dan bergaransi dan juga terlengkap di <span className="font-medium text-amber-600 dark:text-amber-400">Kota Serang – Cilegon dan sekitarnya</span> karena kami distributor resmi dari beberapa merk ternama seperti <span className="font-medium text-slate-800 dark:text-white">GS dan Yuasa</span>.
            </p>
            <p>
              Untuk meningkatkan pelayanan kami kepada pelanggan, kami memberikan <span className="font-medium text-slate-800 dark:text-white">service antar pasang</span> sesuai lokasi permintaan anda. Selain itu, Toko Athifa Battery menerima <span className="font-medium text-slate-800 dark:text-white">Aki bekas dengan harga yang bersaing</span>. Segera hubungi CS kami untuk kebutuhan kendaraan anda, kami akan melayani anda dengan cepat.
            </p>
            <a
              href="https://wa.me/6287882385071?text=Halo,%20saya%20ingin%20tanya%20tentang%20produk%20aki%20👋"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 mt-2"
            >
              💬 Hubungi CS Sekarang
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
