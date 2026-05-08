// Ganti koordinat sesuai lokasi toko Anda
// Cara dapat koordinat: buka Google Maps → klik lokasi → copy lat,lng dari URL
const LAT = -5.971362
const LNG = 106.095145
const STORE_NAME = 'Toko Athifabattery'

export default function MapEmbed() {
  const mapsUrl = `https://www.google.com/maps?q=${LAT},${LNG}`
  const embedUrl = `https://maps.google.com/maps?q=${LAT},${LNG}&z=16&output=embed`

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
      <iframe
        src={embedUrl}
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Lokasi ${STORE_NAME}`}
      />
      <div className="p-4 bg-white dark:bg-slate-800 flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          📍 Koordinat: {LAT}, {LNG}
        </p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm py-2"
        >
          Buka di Google Maps →
        </a>
      </div>
    </div>
  )
}
