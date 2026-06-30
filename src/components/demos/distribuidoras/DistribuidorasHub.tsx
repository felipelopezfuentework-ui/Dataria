'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const DistribuidorasDemo = dynamic(() => import('./DistribuidorasDemo'), { ssr: false })
const DemandaDemo        = dynamic(() => import('./DemandaDemo'),        { ssr: false })
const AgenteDemo         = dynamic(() => import('./AgenteDemo'),         { ssr: false })

type Sel = null | 'rutas' | 'demanda' | 'agente'

const DEMOS: Array<{
  id: string
  label: string
  tag: string
  desc: string
  icon: React.ReactNode
  comingSoon?: boolean
}> = [
  {
    id: 'rutas',
    label: 'Planificador de rutas',
    tag: 'Logística',
    desc: 'Trazá rutas de reparto, calculá costos de combustible y gestioná tu cartera de clientes.',
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13V7m0 0l6-3m-6 3l6 3m6-3v13.5a.5.5 0 01-.5.5H15" />
      </svg>
    ),
  },
  {
    id: 'demanda',
    label: 'Predictor de demanda',
    tag: 'Stock · Proyección',
    desc: 'Proyectá demanda semanal por producto, controlá stock y recibí alertas automáticas de reposición.',
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <polyline strokeLinecap="round" strokeLinejoin="round" points="3 17 9 11 13 15 21 7" />
        <polyline strokeLinecap="round" strokeLinejoin="round" points="14 7 21 7 21 14" />
      </svg>
    ),
  },
  {
    id: 'agente',
    label: 'Agente de pedidos',
    tag: 'WhatsApp · IA',
    desc: 'Recibí y procesá pedidos de clientes por WhatsApp con un agente de inteligencia artificial.',
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
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

export default function DistribuidorasHub() {
  const [sel, setSel] = useState<Sel>(null)

  if (sel === 'rutas') {
    return (
      <div>
        <BackBtn onClick={() => setSel(null)} />
        <DistribuidorasDemo />
      </div>
    )
  }

  if (sel === 'demanda') {
    return <DemandaDemo onBack={() => setSel(null)} />
  }

  if (sel === 'agente') {
    return <AgenteDemo onBack={() => setSel(null)} />
  }

  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(90,104,113,0.6)' }}>
        Herramientas disponibles
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {DEMOS.map(d =>
          d.comingSoon ? (
            <div
              key={d.id}
              className="text-left rounded-xl border border-borde bg-white p-5 opacity-55 cursor-default select-none"
            >
              <div className="w-11 h-11 rounded-lg bg-fondo-suave text-texto-sec flex items-center justify-center mb-4">
                {d.icon}
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <p className="text-sm font-bold text-carbon">{d.label}</p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-tinte-interfaz text-azul-nucleo text-[10px] font-bold uppercase tracking-wide border border-azul-nucleo/15">
                  Próximamente
                </span>
              </div>
              <p className="text-xs text-texto-sec leading-relaxed mb-3">{d.desc}</p>
              <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-fondo-suave text-texto-sec text-[10px] font-semibold uppercase tracking-wide border border-borde">
                {d.tag}
              </span>
            </div>
          ) : (
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
          )
        )}
      </div>
    </div>
  )
}
