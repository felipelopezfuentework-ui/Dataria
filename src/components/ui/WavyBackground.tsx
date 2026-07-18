'use client'

import { useEffect, useRef } from 'react'

// speed tuned so each wave completes a full cycle every ~8-12s (period = 2π / speed)
const WAVES = [
  { yRatio: 0.12, amplitude: 28, frequency: 0.006, speed: 0.70, color: '#45B5F3', opacity: 0.23, lineWidth: 1   },
  { yRatio: 0.27, amplitude: 40, frequency: 0.004, speed: 0.57, color: '#306ECF', opacity: 0.18, lineWidth: 1.5 },
  { yRatio: 0.42, amplitude: 22, frequency: 0.008, speed: 0.79, color: '#56BCFA', opacity: 0.25, lineWidth: 1   },
  { yRatio: 0.57, amplitude: 35, frequency: 0.005, speed: 0.63, color: '#45B5F3', opacity: 0.16, lineWidth: 1.2 },
  { yRatio: 0.70, amplitude: 18, frequency: 0.009, speed: 0.52, color: '#306ECF', opacity: 0.15, lineWidth: 0.8 },
  { yRatio: 0.84, amplitude: 25, frequency: 0.007, speed: 0.66, color: '#56BCFA', opacity: 0.20, lineWidth: 1   },
]

export function WavyBackground() {
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
