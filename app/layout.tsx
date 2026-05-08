import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://athifabattery.vercel.app'),
  title: {
    default: 'Toko Athifabattery — Aki Mobil & Motor Terpercaya',
    template: '%s | Toko Athifabattery',
  },
  description:
    'Toko aki terpercaya. Jual aki mobil, motor, truk: GS Astra, Yuasa, Massiv. Harga terbaik, COD, transfer, atau datang langsung. WA: 087882385071',
  keywords: [
    'toko aki', 'aki mobil', 'aki motor', 'GS Astra', 'Yuasa', 'Massiv',
    'aki murah', 'aki terdekat', 'Athifabattery', 'beli aki online',
  ],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Toko Athifabattery',
    title: 'Toko Athifabattery — Aki Mobil & Motor Terpercaya',
    description: 'Jual aki mobil, motor, truk. GS, Yuasa, Massiv. COD & Transfer. WA: 087882385071',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Toko Athifabattery' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toko Athifabattery',
    description: 'Jual aki mobil & motor. Harga terbaik, COD & Transfer.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/icon-192.png',
  },
}

// Schema.org LocalBusiness
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoPartsStore',
  name: 'Toko Athifabattery',
  description: 'Toko aki mobil, motor, dan truk. GS Astra, Yuasa, Massiv.',
  telephone: '+6287882385071',
  url: 'https://athifabattery.vercel.app',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kota Anda',
    addressRegion: 'Provinsi Anda',
    addressCountry: 'ID',
  },
  openingHours: 'Mo-Sa 08:00-17:00',
  priceRange: '$$',
  paymentAccepted: 'Cash, Transfer Bank, COD',
  currenciesAccepted: 'IDR',
  hasMap: 'https://maps.google.com/?q=-6.2,106.8',
  sameAs: [`https://wa.me/6287882385071`],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <meta name="theme-color" content="#f59e0b" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
