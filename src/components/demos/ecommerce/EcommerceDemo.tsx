'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const VentasDemo        = dynamic(() => import('./VentasDemo'),         { ssr: false })
const EcommerceSuiteDemo = dynamic(() => import('./EcommerceSuiteDemo'), { ssr: false })

type Sel = null | 'ventas' | 'suite'

const DEMOS: Array<{
  id: string
  label: string
  tag: string
  desc: string
  icon: React.ReactNode
}> = [
  {
    id: 'ventas',
    label: 'Panel de ventas',
    tag: 'KPIs · Métricas',
    desc: 'Seguí tus ventas diarias, productos más vendidos, canales de captación e insights automáticos.',
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <circle cx="5" cy="18" r="1" fill="currentColor" stroke="none" />
        <circle cx="10" cy="13" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="9" r="1" fill="currentColor" stroke="none" />
        <circle cx="20" cy="5" r="1" fill="currentColor" stroke="none" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 18l5-5 5-4 5-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 20h18M3 4v16" />
      </svg>
    ),
  },
  {
    id: 'suite',
    label: 'Suite de herramientas',
    tag: 'Clientes · Carritos · IA',
    desc: 'Gestioná tu base de clientes, respondé carritos abandonados, analizá usuarios y cotizá productos.',
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
  },
]

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-sm font-medium text-texto-sec hover:text-azul-nucleo transition-colors mb-5"
    >
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
      Volver a herramientas
    </button>
  )
}

export default function EcommerceDemo() {
  const [sel, setSel] = useState<Sel>(null)

  if (sel === 'ventas') {
    return <VentasDemo onBack={() => setSel(null)} />
  }

  if (sel === 'suite') {
    return (
      <div>
        <BackBtn onClick={() => setSel(null)} />
        <EcommerceSuiteDemo />
      </div>
    )
  }

  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(90,104,113,0.6)' }}>
        Herramientas disponibles
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {DEMOS.map((d) => (
          <button
            key={d.id}
            onClick={() => setSel(d.id as Sel)}
            className="group text-left rounded-xl border border-borde bg-white p-5 hover:border-azul-nucleo/30 hover:shadow-md transition-all duration-160"
          >
            <div className="w-11 h-11 rounded-lg bg-tinte-interfaz text-azul-nucleo flex items-center justify-center mb-4 group-hover:bg-azul-nucleo group-hover:text-white transition-all duration-160">
              {d.icon}
            </div>
            <p className="text-sm font-bold text-carbon mb-1.5">{d.label}</p>
            <p className="text-xs text-texto-sec leading-relaxed mb-3">{d.desc}</p>
            <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-fondo-suave text-texto-sec text-[10px] font-semibold uppercase tracking-wide border border-borde">
              {d.tag}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
