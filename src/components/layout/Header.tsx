'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { label: 'Industrias',      href: '/#industrias'      },
  { label: 'Cómo trabajamos', href: '/#como-trabajamos' },
  { label: 'Contacto',        href: '/#contacto'        },
]

function scrollToContacto() {
  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-240 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-borde shadow-card'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-container mx-auto px-6 flex items-center justify-between h-[72px] md:h-[88px]">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/dataria-logo-header.png" alt="Dataria" width={495} height={167} priority className="h-9 md:h-11 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[15px] font-medium tracking-[0.01em] text-carbon hover:text-azul-nucleo transition-colors duration-160"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            onClick={scrollToContacto}
            className="inline-flex items-center justify-center gap-2 h-[46px] px-6 rounded-[10px] bg-azul-nucleo text-white font-semibold tracking-[0.02em] text-[15px] hover:bg-azul-accion hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(48,110,207,0.35)] active:translate-y-0 transition-all duration-150 shadow-primary"
          >
            Solicitar demo
            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold leading-none normal-case tracking-normal">
              Gratis
            </span>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-sm text-carbon hover:bg-fondo-suave transition-colors"
          aria-label="Menú"
        >
          <span className="block w-5 h-0.5 bg-current mb-1.5 transition-all" />
          <span className={`block w-5 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className="block w-5 h-0.5 bg-current transition-all" />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-borde shadow-soft animate-fade-in">
          <nav className="flex flex-col px-5 py-4 gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-[15px] font-medium tracking-[0.01em] text-carbon hover:text-azul-nucleo py-3 border-b border-borde/50 last:border-0"
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => { setMenuOpen(false); scrollToContacto() }}
              className="mt-3 inline-flex items-center justify-center gap-2 h-[46px] px-6 rounded-[10px] bg-azul-nucleo text-white font-semibold tracking-[0.02em] text-[15px] hover:bg-azul-accion active:translate-y-0 transition-all duration-150"
            >
              Solicitar demo
              <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold leading-none normal-case tracking-normal">
                Gratis
              </span>
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
