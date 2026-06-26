'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const GastronomiaDemo    = dynamic(() => import('@/components/demos/gastronomia/GastronomiaDemo'),     { ssr: false })
const DistribuidorasDemo = dynamic(() => import('@/components/demos/distribuidoras/DistribuidorasDemo'), { ssr: false })
const TalleresDemo       = dynamic(() => import('@/components/demos/talleres/TalleresDemo'),             { ssr: false })
const InmobiliariasDemo  = dynamic(() => import('@/components/demos/inmobiliarias/InmobiliariasDemo'),   { ssr: false })
const EcommerceDemo      = dynamic(() => import('@/components/demos/ecommerce/EcommerceDemo'),           { ssr: false })

const industries = [
  {
    id: 'gastronomia',
    label: 'Gastronomía',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    problema: 'No sabés exactamente cuánto te cuesta cada plato.',
  },
  {
    id: 'distribuidoras',
    label: 'Distribuidoras',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 17l-1.5-1.5M8 17l1.5-1.5M8 17V7m8 10l-1.5-1.5M16 17l1.5-1.5M16 17V7M3 12h18" />
      </svg>
    ),
    problema: 'Las rutas de reparto se definen de cabeza, sin saber el costo real de cada viaje.',
  },
  {
    id: 'talleres',
    label: 'Talleres',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63" />
      </svg>
    ),
    problema: 'El estado de los vehículos en reparación vive en papeles o en la cabeza del encargado.',
  },
  {
    id: 'salud',
    label: 'Salud',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    problema: '[contenido pendiente de definir]',
  },
  {
    id: 'inmobiliarias',
    label: 'Inmobiliarias',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V20.25a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V9.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20.25V12h6v8.25" />
      </svg>
    ),
    problema: 'Los leads se pierden entre WhatsApp, mails y anotaciones.',
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
    problema: 'Carritos abandonados, clientes sin segmentar y respuestas lentas a consultas.',
  },
]

function SaludPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[420px] text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-pink-50 flex items-center justify-center mb-5 text-pink-400">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-carbon mb-2">Demo Salud</h3>
      <p className="text-sm text-texto-sec max-w-xs">
        Esta demo está en proceso de definición. Próximamente vas a poder explorar las herramientas de IA para clínicas y consultorios.
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-fondo-suave text-xs font-semibold text-texto-sec border border-borde">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
        Demo pendiente de definir
      </span>
    </div>
  )
}

function renderDemo(id: string) {
  switch (id) {
    case 'gastronomia':    return <GastronomiaDemo />
    case 'distribuidoras': return <DistribuidorasDemo />
    case 'talleres':       return <TalleresDemo />
    case 'inmobiliarias':  return <InmobiliariasDemo />
    case 'ecommerce':      return <EcommerceDemo />
    case 'salud':          return <SaludPlaceholder />
    default:               return null
  }
}

export default function IndustriesPreview() {
  const [active, setActive] = useState('gastronomia')
  const current = industries.find((i) => i.id === active)!

  return (
    <>
      {/* Alias anchor so both /#industrias and /#demos scroll here */}
      <div id="demos" />
      <section id="industrias" className="py-20 md:py-28 bg-white">
        <div className="max-w-container mx-auto px-5 md:px-10">

          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-carbon mb-4 tracking-tight">
              Tu negocio optimizado
            </h2>
            <p className="text-lg text-texto-sec max-w-xl mx-auto">
              Elegí tu industria y probá cómo Dataria transforma tu negocio.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {industries.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setActive(ind.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-semibold transition-all duration-160 ${
                  active === ind.id
                    ? 'bg-azul-nucleo text-white shadow-primary'
                    : 'bg-fondo-suave text-texto-sec hover:bg-borde/60'
                }`}
              >
                {ind.icon}
                {ind.label}
              </button>
            ))}
          </div>

          {/* Problem + embedded demo */}
          <div key={active} className="animate-fade-in space-y-4">

            {/* Problem statement */}
            <div className="flex gap-3 items-start px-5 py-4 rounded-lg bg-fondo-suave border border-borde">
              <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-error/10 flex items-center justify-center">
                <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24" className="text-error">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
              </span>
              <p className="text-sm text-texto-sec leading-relaxed">{current.problema}</p>
            </div>

            {/* Demo panel */}
            <div className="bg-white rounded-xl border border-borde shadow-soft overflow-hidden">
              {/* Demo header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-borde bg-white">
                <div className="flex items-center gap-2">
                  <span className="text-azul-nucleo">{current.icon}</span>
                  <h3 className="text-sm font-bold text-carbon">
                    Demo · {current.label}, tu solución
                  </h3>
                  <span className="px-2 py-0.5 rounded-xs bg-tinte-interfaz text-azul-nucleo text-xs font-medium border border-azul-nucleo/10">
                    Simulación
                  </span>
                </div>
                <span className="hidden sm:flex items-center gap-1.5 text-xs text-texto-sec/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Datos de ejemplo — no conectado a backend
                </span>
              </div>

              {/* Demo content */}
              <div className="p-4 md:p-6 overflow-auto">
                {renderDemo(active)}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
