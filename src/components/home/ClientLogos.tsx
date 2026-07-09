'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useReveal } from '@/hooks/useReveal'

const clients = [
  { name: 'Hibent',         src: '/clients/hibent.jpg'         },
  { name: 'Padella',        src: '/clients/padella.jpg'        },
  { name: 'Pastas Pariggi', src: '/clients/pastas-pariggi.jpg' },
  { name: 'Pollo Cocido',   src: '/clients/pollo-cocido.png'   },
  { name: 'Ragú',           src: '/clients/ragu.jpg'           },
  { name: 'MP Catering',    src: '/clients/mp-catering.jpg'    },
]

function ClientCard({
  name, src, index, visible, hoveredIdx, onHover,
}: {
  name: string; src: string; index: number; visible: boolean
  hoveredIdx: number | null; onHover: (i: number | null) => void
}) {
  const dimmed = hoveredIdx !== null && hoveredIdx !== index
  const scaled = hoveredIdx === index

  return (
    <div
      className={`flex flex-col items-center gap-2.5 w-36 reveal transition-[opacity,transform] duration-200 ${visible ? 'is-visible' : ''}`}
      style={{
        transitionDelay: `${Math.floor(index / 2) * 80}ms`,
        opacity: visible && dimmed ? 0.6 : undefined,
        transform: scaled ? 'scale(1.05)' : undefined,
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="relative w-28 h-20">
        <Image src={src} alt={name} fill className="object-contain" />
      </div>
      <span className="text-[11px] font-medium uppercase tracking-widest text-texto-sec text-center leading-tight">
        {name}
      </span>
    </div>
  )
}

export default function ClientLogos() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <section className="py-20 border-y border-borde bg-white overflow-hidden">
      <div className="max-w-container mx-auto px-6 mb-8">
        <h2 className="font-display text-[22px] font-bold tracking-[-0.01em] text-carbon text-center">
          Empresas que ya optimizan sus procesos
        </h2>
      </div>
      {/* Single track: each item owns its right padding so translateX(-50%) loops perfectly */}
      <div ref={ref} className="overflow-hidden">
        <div className="flex animate-scroll w-max">
          {[...clients, ...clients].map((c, i) => (
            <div key={i} className="pr-20">
              <ClientCard name={c.name} src={c.src} index={i} visible={visible} hoveredIdx={hoveredIdx} onHover={setHoveredIdx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
