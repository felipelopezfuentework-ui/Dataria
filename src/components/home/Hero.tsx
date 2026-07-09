'use client'

import { useEffect, useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'

// speed tuned so each wave completes a full cycle every ~8-12s (period = 2π / speed)
const WAVES = [
  { yRatio: 0.12, amplitude: 28, frequency: 0.006, speed: 0.70, color: '#45B5F3', opacity: 0.23, lineWidth: 1   },
  { yRatio: 0.27, amplitude: 40, frequency: 0.004, speed: 0.57, color: '#306ECF', opacity: 0.18, lineWidth: 1.5 },
  { yRatio: 0.42, amplitude: 22, frequency: 0.008, speed: 0.79, color: '#56BCFA', opacity: 0.25, lineWidth: 1   },
  { yRatio: 0.57, amplitude: 35, frequency: 0.005, speed: 0.63, color: '#45B5F3', opacity: 0.16, lineWidth: 1.2 },
  { yRatio: 0.70, amplitude: 18, frequency: 0.009, speed: 0.52, color: '#306ECF', opacity: 0.15, lineWidth: 0.8 },
  { yRatio: 0.84, amplitude: 25, frequency: 0.007, speed: 0.66, color: '#56BCFA', opacity: 0.20, lineWidth: 1   },
]

function WavyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf: number

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w   = canvas.offsetWidth
      const h   = canvas.offsetHeight
      canvas.width  = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const observer = new ResizeObserver(() => resize())
    observer.observe(canvas)

    const draw = (now: number) => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      const t = now * 0.001

      ctx.clearRect(0, 0, W, H)

      for (const wave of WAVES) {
        const cy = wave.yRatio * H
        ctx.beginPath()
        ctx.strokeStyle = wave.color
        ctx.globalAlpha = wave.opacity
        ctx.lineWidth   = wave.lineWidth

        for (let x = 0; x <= W; x++) {
          const y = cy + wave.amplitude * Math.sin(wave.frequency * x + t * wave.speed)
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      ctx.globalAlpha = 1
      if (!reduced) raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15)
  const v = visible ? 'is-visible' : ''

  return (
    <section className="relative overflow-hidden pt-[120px] pb-[120px] md:pt-[140px] md:pb-[140px] bg-gradient-hero">
      <WavyBackground />

      <div ref={ref} className="relative z-10 max-w-container mx-auto px-6 text-center">
        {/* Headline */}
        <h1 className="font-display text-5xl md:text-[72px] leading-[1.05] font-extrabold text-carbon mb-6 max-w-4xl mx-auto tracking-[-0.03em]">
          <span className={`block reveal ${v}`} style={{ transitionDelay: '0ms' }}>Menos datos sueltos.</span>
          <span className={`block reveal ${v}`} style={{ transitionDelay: '150ms' }}>
            <span className="bg-gradient-dataria bg-clip-text text-transparent">Mejores decisiones.</span>
          </span>
        </h1>

        {/* Sub */}
        <p className={`font-display font-semibold text-lg md:text-xl mb-10 tracking-[-0.01em] reveal ${v}`} style={{ color: '#5A6871', lineHeight: '1.6', maxWidth: '520px', margin: '0 auto 40px', transitionDelay: '300ms' }}>
          Dataria crea herramientas de IA para que pymes y autónomos optimicen sus operaciones — desde el primer día.
        </p>

        {/* CTAs */}
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
