'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const GastronomiaDemo   = dynamic(() => import('./gastronomia/GastronomiaDemo'),   { ssr: false })
const DistribuidorasDemo = dynamic(() => import('./distribuidoras/DistribuidorasDemo'), { ssr: false })
const TalleresDemo      = dynamic(() => import('./talleres/TalleresDemo'),          { ssr: false })
const InmobiliariasDemo = dynamic(() => import('./inmobiliarias/InmobiliariasDemo'), { ssr: false })
const EcommerceDemo     = dynamic(() => import('./ecommerce/EcommerceDemo'),         { ssr: false })

const industries = [
  {
    id: 'gastronomia',
    label: 'Gastronomía',
    tag: 'Food cost',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 100 18A9 9 0 0012 3zm0 0v9m0 0H3m9 0l6.364-6.364" />
      </svg>
    ),
  },
  {
    id: 'distribuidoras',
    label: 'Distribuidoras',
    tag: 'Rutas',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13V7m0 0l6-3m-6 3l6 3m6-3v13.5a.5.5 0 01-.5.5H15" />
      </svg>
    ),
  },
  {
    id: 'talleres',
    label: 'Talleres',
    tag: 'Reparaciones',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    id: 'salud',
    label: 'Salud',
    tag: 'Próximamente',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    id: 'inmobiliarias',
    label: 'Inmobiliarias',
    tag: 'CRM',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V20.25a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V9.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20.25V12h6v8.25" />
      </svg>
    ),
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    tag: 'Suite',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
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

export default function DemoHub() {
  const [active, setActive] = useState('gastronomia')

  const renderDemo = () => {
    switch (active) {
      case 'gastronomia':    return <GastronomiaDemo />
      case 'distribuidoras': return <DistribuidorasDemo />
      case 'talleres':       return <TalleresDemo />
      case 'inmobiliarias':  return <InmobiliariasDemo />
      case 'ecommerce':      return <EcommerceDemo />
      case 'salud':          return <SaludPlaceholder />
      default:               return null
    }
  }

  const currentInd = industries.find((i) => i.id === active)!

  return (
    <div className="flex flex-col lg:flex-row min-h-[700px] bg-white rounded-xl border border-borde shadow-soft overflow-hidden">
      {/* Sidebar */}
      <aside className="lg:w-56 xl:w-64 shrink-0 bg-fondo-suave border-b lg:border-b-0 lg:border-r border-borde">
        <div className="p-4 lg:p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-texto-sec/60 mb-4">Industrias</p>
          <nav className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0">
            {industries.map((ind) => {
              const isActive  = active === ind.id
              const isPending = ind.id === 'salud'
              return (
                <button
                  key={ind.id}
                  onClick={() => setActive(ind.id)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-sm text-left w-full shrink-0 transition-all duration-160
                    ${isActive
                      ? 'bg-azul-nucleo text-white shadow-primary'
                      : 'text-texto-sec hover:bg-surface-container'
                    }
                  `}
                >
                  <span className={`shrink-0 ${isActive ? 'text-white' : isPending ? 'text-texto-sec/40' : 'text-azul-nucleo'}`}>
                    {ind.icon}
                  </span>
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold leading-tight truncate ${isPending && !isActive ? 'text-texto-sec/50' : ''}`}>
                      {ind.label}
                    </p>
                    <p className={`text-xs leading-tight ${isActive ? 'text-white/70' : 'text-texto-sec/60'}`}>
                      {ind.tag}
                    </p>
                  </div>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="hidden lg:block px-5 pb-5 pt-2">
          <div className="rounded-lg bg-tinte-interfaz border border-azul-nucleo/10 p-3">
            <p className="text-xs font-semibold text-azul-nucleo mb-1">¿Qué son estas demos?</p>
            <p className="text-xs text-texto-sec leading-relaxed">
              Herramientas reales que podés usar ahora. Todos los datos son ejemplos de simulación.
            </p>
          </div>
        </div>
      </aside>

      {/* Demo area */}
      <main className="flex-1 min-w-0">
        {/* Demo header bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-borde bg-white">
          <div className="flex items-center gap-2">
            <span className="text-azul-nucleo">{currentInd.icon}</span>
            <h2 className="text-sm font-bold text-carbon">{currentInd.label}</h2>
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
          <div key={active} className="animate-fade-in">
            {renderDemo()}
          </div>
        </div>
      </main>
    </div>
  )
}
