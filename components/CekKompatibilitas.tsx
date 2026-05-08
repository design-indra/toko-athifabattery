'use client'
import { useState } from 'react'

const data: Record<string, Record<string, Record<string, string[]>>> = {
  Mobil: {
    Toyota: {
      'Avanza': ['NS60L', 'NS60LS'],
      'Kijang Innova': ['NS70', 'NS70Z'],
      'Fortuner': ['DIN66', 'DIN66L'],
      'Rush': ['NS60L', 'NS60LS'],
      'Calya': ['NS40Z', 'NS40ZL'],
      'Yaris': ['NS40Z', 'NS60L'],
      'Camry': ['DIN66', 'DIN70'],
    },
    Honda: {
      'Brio': ['NS40Z', 'NS40ZL'],
      'Mobilio': ['NS60L', 'NS60LS'],
      'HRV': ['NS60L', 'NS60LS'],
      'CRV': ['DIN66', 'DIN66L'],
      'BRV': ['NS60L', 'NS60LS'],
      'Jazz': ['NS40Z', 'NS60L'],
    },
    Mitsubishi: {
      'Xpander': ['NS60L', 'NS60LS'],
      'Pajero Sport': ['DIN100', 'DIN66'],
      'L300': ['NS70', 'NS70Z'],
      'Outlander': ['DIN66', 'DIN70'],
    },
    Suzuki: {
      'Ertiga': ['NS60L', 'NS60LS'],
      'XL7': ['NS60L', 'NS60LS'],
      'Carry': ['NS40Z', 'NS60L'],
      'Jimny': ['NS40Z', 'NS60L'],
    },
    Daihatsu: {
      'Xenia': ['NS60L', 'NS60LS'],
      'Terios': ['NS60L', 'NS70'],
      'Sigra': ['NS40Z', 'NS40ZL'],
      'Granmax': ['NS70', 'NS70Z'],
    },
    Nissan: {
      'Livina': ['NS60L', 'NS60LS'],
      'X-Trail': ['DIN66', 'DIN66L'],
      'Serena': ['DIN66', 'NS70'],
      'Terra': ['DIN66', 'DIN100'],
    },
  },
  Motor: {
    Honda: {
      'Beat': ['YTZ5S', 'GTZ5S', 'FTZ5S'],
      'Vario 125': ['YTZ7S', 'GTZ7S'],
      'Vario 150': ['YTZ7S', 'GTZ7S'],
      'PCX': ['YTZ12S', 'GTZ12S'],
      'Scoopy': ['YTZ5S', 'GTZ5S'],
      'Genio': ['YTZ5S', 'GTZ5S'],
      'ADV 150': ['YTZ12S', 'GTZ12S'],
      'CBR 150': ['YB7C-A', 'GB7C-A'],
    },
    Yamaha: {
      'Mio M3': ['YTZ5S', 'GTZ5S'],
      'Mio Soul': ['YTZ5S', 'GTZ5S'],
      'NMAX': ['YTZ12S', 'GTZ12S'],
      'Aerox': ['YTZ12S', 'GTZ12S'],
      'Lexi': ['YTZ7S', 'GTZ7S'],
      'Xmax': ['YTZ14S', 'GTZ14S'],
      'R15': ['YTZ10S', 'GTZ10S'],
      'MT25': ['YTZ10S', 'GTZ10S'],
    },
    Suzuki: {
      'Satria FU': ['YB5L-B', 'GB5L-B'],
      'Address': ['YTZ5S', 'GTZ5S'],
      'Nex': ['YTZ5S', 'GTZ5S'],
      'GSX 150': ['YTZ10S', 'GTZ10S'],
    },
    Kawasaki: {
      'KLX 150': ['YB5L-B', 'GB5L-B'],
      'Ninja 250': ['YTZ10S', 'GTZ10S'],
      'Z250': ['YTZ10S', 'GTZ10S'],
      'Versys': ['YTZ14S', 'GTZ14S'],
    },
  },
  Truk: {
    Mitsubishi: {
      'Colt Diesel': ['NS200', 'NS150'],
      'Fuso': ['DIN200', 'DIN150'],
      'Tronton': ['DIN200', 'DIN220'],
    },
    Hino: {
      'Dutro': ['NS200', 'NS150'],
      'Ranger': ['DIN200', 'DIN150'],
      'Profia': ['DIN200', 'DIN220'],
    },
    Isuzu: {
      'Elf': ['NS150', 'NS120'],
      'Giga': ['DIN200', 'DIN220'],
      'NMR': ['NS150', 'NS200'],
    },
    Toyota: {
      'Dyna': ['NS150', 'NS200'],
      'Hilux': ['NS70', 'DIN66'],
    },
  },
}

export default function CekKompatibilitas() {
  const [jenis, setJenis] = useState('')
  const [merk, setMerk] = useState('')
  const [tipe, setTipe] = useState('')
  const [hasil, setHasil] = useState<string[] | null>(null)

  const merkList = jenis ? Object.keys(data[jenis]) : []
  const tipeList = jenis && merk ? Object.keys(data[jenis][merk]) : []

  function handleCek() {
    if (!jenis || !merk || !tipe) return
    setHasil(data[jenis][merk][tipe] || [])
  }

  function handleReset() {
    setJenis(''); setMerk(''); setTipe(''); setHasil(null)
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">🔍 Cek Kompatibilitas Aki</h2>
      <div className="card p-5 space-y-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Pilih kendaraan Anda untuk mengetahui jenis aki yang sesuai
        </p>

        {/* Step 1 */}
        <div className="space-y-2">
          <p className="text-sm font-medium">1. Jenis Kendaraan</p>
          <div className="flex gap-2">
            {Object.keys(data).map((j) => (
              <button key={j} onClick={() => { setJenis(j); setMerk(''); setTipe(''); setHasil(null) }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  jenis === j ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                {j === 'Mobil' ? '🚗' : j === 'Motor' ? '🏍️' : '🚛'} {j}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 */}
        {jenis && (
          <div className="space-y-2">
            <p className="text-sm font-medium">2. Merk Kendaraan</p>
            <div className="flex gap-2 flex-wrap">
              {merkList.map((m) => (
                <button key={m} onClick={() => { setMerk(m); setTipe(''); setHasil(null) }}
                  className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                    merk === m ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                  {m}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 */}
        {merk && (
          <div className="space-y-2">
            <p className="text-sm font-medium">3. Tipe Kendaraan</p>
            <div className="flex gap-2 flex-wrap">
              {tipeList.map((t) => (
                <button key={t} onClick={() => { setTipe(t); setHasil(null) }}
                  className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                    tipe === t ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tombol Cek */}
        {tipe && !hasil && (
          <button onClick={handleCek} className="btn-primary w-full py-3">
            🔍 Cek Aki yang Cocok
          </button>
        )}

        {/* Hasil */}
        {hasil && (
          <div className="space-y-3 pt-2">
            <p className="text-sm font-semibold">
              ✅ Aki yang cocok untuk <span className="text-amber-600">{merk} {tipe}</span>:
            </p>
            <div className="flex gap-2 flex-wrap">
              {hasil.map((aki, i) => (
                <span key={i} className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-bold px-4 py-2 rounded-xl text-sm">
                  🔋 {aki}
                </span>
              ))}
            </div>
            <a
              href={`https://wa.me/6287882385071?text=Halo,%20saya%20butuh%20aki%20untuk%20${merk}%20${tipe}.%20Tipe%20aki:%20${hasil.join(', ')}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-primary w-full py-3 flex items-center justify-center gap-2"
            >
              💬 Tanya Harga via WhatsApp
            </a>
            <button onClick={handleReset} className="btn-outline w-full py-2 text-sm">
              🔄 Cek Kendaraan Lain
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
