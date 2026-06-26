'use client'

import { useEffect, useRef } from 'react'

const WAVES = [
  { yRatio: 0.12, amplitude: 28, frequency: 0.006, speed: 0.25, color: '#45B5F3', opacity: 0.45, lineWidth: 1   },
  { yRatio: 0.27, amplitude: 40, frequency: 0.004, speed: 0.18, color: '#306ECF', opacity: 0.35, lineWidth: 1.5 },
  { yRatio: 0.42, amplitude: 22, frequency: 0.008, speed: 0.30, color: '#56BCFA', opacity: 0.50, lineWidth: 1   },
  { yRatio: 0.57, amplitude: 35, frequency: 0.005, speed: 0.22, color: '#45B5F3', opacity: 0.30, lineWidth: 1.2 },
  { yRatio: 0.70, amplitude: 18, frequency: 0.009, speed: 0.38, color: '#306ECF', opacity: 0.28, lineWidth: 0.8 },
  { yRatio: 0.84, amplitude: 25, frequency: 0.007, speed: 0.20, color: '#56BCFA', opacity: 0.40, lineWidth: 1   },
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
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 bg-gradient-hero">
      <WavyBackground />

      <div className="relative z-10 max-w-container mx-auto px-5 md:px-10 text-center">
        {/* Headline */}
        <h1 className="text-5xl md:text-[72px] leading-[1.05] font-extrabold text-carbon mb-6 max-w-4xl mx-auto tracking-tight">
          Menos datos sueltos.<br />
          <span className="bg-gradient-dataria bg-clip-text text-transparent">Mejores decisiones.</span>
        </h1>

        {/* Sub */}
        <p className="text-xl md:text-2xl text-texto-sec max-w-2xl mx-auto leading-relaxed mb-10">
          Dataria crea herramientas de IA para que pymes y autónomos optimicen sus operaciones — desde el primer día.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => scrollTo('demos')}
            className="inline-flex items-center justify-center h-12 px-7 rounded-sm bg-gradient-dataria text-white font-bold text-sm shadow-primary hover:opacity-90 transition-opacity duration-160"
          >
            Ver demostraciones en vivo
          </button>
          <a
            href="https://calendar.app.google/64ms78PrrpQv8x4n9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-12 px-7 rounded-sm bg-white text-azul-nucleo font-semibold text-sm border border-borde hover:border-azul-nucleo/30 transition-colors duration-160"
          >
            Agendar reunión gratis
          </a>
        </div>
      </div>
    </section>
  )
}
