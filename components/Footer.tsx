import Link from 'next/link'
import { Zap, MapPin, Phone, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </span>
            <span className="font-bold text-xl text-white">
              Athifa<span className="text-amber-400">battery</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Toko aki terpercaya untuk mobil, motor, dan truk. Merk GS Astra, Yuasa, Massiv, dan lainnya.
          </p>
        </div>

        {/* Info */}
        <div>
          <h3 className="font-semibold text-white mb-3">Informasi Toko</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={15} className="text-amber-400 mt-0.5 shrink-0" />
              <span>Jl. Contoh No. 123, Jl. Raya Bojonegara, Kp. Gedong, Kec. Bojonegara, Kab. Serang, Banten 42161 (Update di kode)</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} className="text-amber-400 shrink-0" />
              <a href="tel:+6287882385071" className="hover:text-amber-400 transition-colors">
                0878-8238-5071
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={15} className="text-amber-400 shrink-0" />
              <span>Sen–Sab: 08.00 – 17.00 WIB</span>
            </li>
          </ul>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold text-white mb-3">Menu</h3>
          <ul className="space-y-2 text-sm">
            {[
              { href: '/', label: 'Beranda' },
              { href: '/lokasi', label: 'Lokasi & Pembayaran' },
              { href: '/keranjang', label: 'Keranjang' },
              { href: 'https://wa.me/6287882385071', label: 'Hubungi via WhatsApp', external: true },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  target={l.external ? '_blank' : undefined}
                  className="hover:text-amber-400 transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 text-center py-4 text-xs text-slate-500">
        © {new Date().getFullYear()} Toko Athifabattery. Semua hak dilindungi.
      </div>
    </footer>
  )
}
