'use client'

import { useReveal } from '@/hooks/useReveal'
import { WavyBackground } from '@/components/ui/WavyBackground'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function IndustryHero({
  titleLine1,
  titleLine2,
  subtitle,
}: {
  titleLine1: string
  titleLine2: string
  subtitle: string
}) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15)
  const v = visible ? 'is-visible' : ''

  return (
    <section className="relative overflow-hidden pt-[64px] pb-[100px] md:pt-[80px] md:pb-[120px] bg-gradient-hero">
      <WavyBackground />

      <div ref={ref} className="relative z-10 max-w-container mx-auto px-6 text-center">
        <h1 className="font-display text-4xl md:text-[64px] leading-[1.08] font-extrabold text-carbon mb-6 max-w-4xl mx-auto tracking-[-0.03em]">
          <span className={`block reveal ${v}`} style={{ transitionDelay: '0ms' }}>{titleLine1}</span>
          <span className={`block reveal ${v}`} style={{ transitionDelay: '150ms' }}>
            <span className="bg-gradient-dataria bg-clip-text text-transparent">{titleLine2}</span>
          </span>
        </h1>

        <p className={`font-display font-semibold text-lg md:text-xl mb-10 tracking-[-0.01em] reveal ${v}`} style={{ color: '#5A6871', lineHeight: '1.6', maxWidth: '560px', margin: '0 auto 40px', transitionDelay: '300ms' }}>
          {subtitle}
        </p>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 reveal ${v}`} style={{ transitionDelay: '450ms' }}>
          <button
            onClick={() => scrollTo('demos')}
            className="inline-flex items-center justify-center h-[46px] px-6 rounded-[10px] bg-gradient-dataria text-white font-semibold tracking-[0.02em] text-[15px] shadow-primary hover:!bg-[#1B5BC1] hover:!bg-none hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(48,110,207,0.35)] active:translate-y-0 transition-all duration-150"
          >
            Ver demostraciones en vivo
          </button>
          <a
            href="https://calendar.app.google/64ms78PrrpQv8x4n9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-[46px] px-6 rounded-[10px] bg-white text-azul-nucleo font-semibold tracking-[0.02em] text-[15px] border-[1.5px] border-borde hover:bg-[#EAF5FD] hover:border-azul-accion transition-all duration-150"
          >
            Agendar reunión
          </a>
        </div>
      </div>
    </section>
  )
}
