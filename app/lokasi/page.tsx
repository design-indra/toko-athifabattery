import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MapEmbed from '@/components/MapEmbed'
import { MapPin, Phone, Clock, Banknote, Car, Truck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lokasi Toko & Cara Pembayaran',
  description: 'Lokasi Toko Athifabattery, jam operasional, dan metode pembayaran: transfer bank, COD, atau datang langsung.',
}

const paymentMethods = [
  {
    icon: Banknote,
    title: 'Transfer Bank',
    desc: 'Transfer ke rekening toko, kirim bukti via WA. Produk dikirim/disiapkan setelah konfirmasi.',
    detail: 'BCA / BRI / BSI (hubungi admin untuk nomor rekening)',
  },
  {
    icon: Truck,
    title: 'COD (Bayar di Tempat)',
    desc: 'Pesan via WA, admin konfirmasi, bayar saat barang diterima di lokasi yang disepakati.',
    detail: 'Area & ongkos kirim sesuai kesepakatan dengan admin',
  },
  {
    icon: Car,
    title: 'Datang Langsung',
    desc: 'Kunjungi toko kami langsung. Cek fisik produk, bayar di kasir, langsung bawa pulang.',
    detail: 'Senin–Sabtu: 08.00–17.00 WIB',
  },
]

export default function LokasiPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        <div>
          <h1 className="text-2xl font-bold mb-1">📍 Lokasi Toko</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Temukan kami di sini</p>
        </div>

        {/* Map */}
        <MapEmbed />

        {/* Store info */}
        <div className="card p-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="flex items-start gap-3">
            <MapPin className="text-amber-500 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-sm">Alamat</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Athifa Battery<br />
                Jl. Raya Bojonegara, Kp. Gedong, Kec. Bojonegara, Kab. Serang, Banten 42161<br />
                <em className="text-xs">(lokasi toko)</em>
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="text-amber-500 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-sm">Kontak</p>
              <a href="tel:+6287882385071" className="text-sm text-amber-600 dark:text-amber-400 hover:underline block mt-1">
                0878-8238-5071
              </a>
              <a
                href="https://wa.me/6287882385071"
                target="_blank" rel="noopener noreferrer"
                className="text-sm text-green-600 dark:text-green-400 hover:underline"
              >
                Chat WhatsApp →
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="text-amber-500 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-sm">Jam Operasional</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Senin – Sabtu<br />
                08.00 – 17.00 WIB
              </p>
              <p className="text-xs text-red-400 mt-1">Minggu: Tutup</p>
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <section>
          <h2 className="text-xl font-bold mb-5">💳 Metode Pembayaran</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {paymentMethods.map((m) => (
              <div key={m.title} className="card p-5 hover:shadow-md transition-shadow">
                <m.icon className="text-amber-500 mb-3" size={28} />
                <h3 className="font-bold mb-2">{m.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{m.desc}</p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-3 font-medium">{m.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-center text-white">
          <p className="font-bold text-lg mb-2">Siap memesan? 🔋</p>
          <p className="text-white/80 text-sm mb-4">Hubungi admin kami via WhatsApp untuk pemesanan cepat</p>
          <a
            href={`https://wa.me/6287882385071?text=${encodeURIComponent('Halo Athifabattery, saya ingin memesan aki 👋')}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-block bg-white text-amber-700 font-bold px-6 py-2.5 rounded-xl hover:scale-105 transition-transform shadow-md"
          >
            💬 Hubungi via WhatsApp
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}
