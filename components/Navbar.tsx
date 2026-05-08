'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import ThemeToggle from './ThemeToggle'
import { useState } from 'react'

export default function Navbar() {
  const totalItems = useCart((s) => s.totalItems)
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/lokasi', label: 'Lokasi & Bayar' },
    { href: '/keranjang', label: 'Keranjang' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/athifabattery-logo.png"
            alt="Athifa Battery"
            width={160}
            height={48}
            className="h-10 w-auto object-contain dark:brightness-90"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link
            href="/keranjang"
            className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-slate-600 transition-all"
          >
            <ShoppingCart size={18} className="text-slate-700 dark:text-slate-200" />
            {totalItems() > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems()}
              </span>
            )}
          </Link>

          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 flex flex-col gap-3">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-amber-500 py-1"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
