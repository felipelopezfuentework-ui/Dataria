'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const FoodCostDemo = dynamic(() => import('@/components/demos/gastronomia/FoodCostDemo'),       { ssr: false })
const ResenasDemo  = dynamic(() => import('@/components/demos/gastronomia/ResenasDemo'),        { ssr: false })
const TurnosDemo   = dynamic(() => import('@/components/demos/gastronomia/TurnosDemo'),         { ssr: false })
const RutasDemo    = dynamic(() => import('@/components/demos/distribuidoras/RutasDemo'),       { ssr: false })
const DemandaDemo  = dynamic(() => import('@/components/demos/distribuidoras/DemandaDemo'),     { ssr: false })
const AgenteDemo      = dynamic(() => import('@/components/demos/distribuidoras/AgenteDemo'),      { ssr: false })
const SeguimientoDemo = dynamic(() => import('@/components/demos/talleres/SeguimientoDemo'),       { ssr: false })

// ─── Types ────────────────────────────────────────────────────────────────────

interface DemoCard { id: string; label: string; icon: React.ReactNode; enabled: boolean }
interface Industry { id: string; label: string; icon: React.ReactNode; demos: DemoCard[] }

// ─── Icons ────────────────────────────────────────────────────────────────────

const IcoGastro = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    <circle cx="12" cy="12" r="10" />
  </svg>
)
const IcoDist = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 17l-1.5-1.5M8 17l1.5-1.5M8 17V7m8 10l-1.5-1.5M16 17l1.5-1.5M16 17V7M3 12h18" />
  </svg>
)
const IcoTaller = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63" />
  </svg>
)
const IcoSalud = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)
const IcoInmo = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V20.25a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V9.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20.25V12h6v8.25" />
  </svg>
)
const IcoEcom = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
)

// Card icons
const IcoCoin = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)
const IcoRoute = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
  </svg>
)
const IcoKanban = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
)
const IcoCar = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6-6h15m-6 0v-5" />
  </svg>
)
const IcoHeart = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
)
const IcoCRM = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
)
const IcoGrid = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
)
const IcoLock = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
)
const IcoStar = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
)
const IcoTrendingUp = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <polyline strokeLinecap="round" strokeLinejoin="round" points="3 17 9 11 13 15 21 7" />
    <polyline strokeLinecap="round" strokeLinejoin="round" points="14 7 21 7 21 14" />
  </svg>
)
const IcoBrandWhatsapp = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
)
const IcoCalendar = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
)

// ─── Data ─────────────────────────────────────────────────────────────────────

const disabledCards = (labels: string[]): DemoCard[] =>
  labels.map((label, i) => ({ id: `d${i}`, label, icon: <IcoLock />, enabled: false }))

const industries: Industry[] = [
  {
    id: 'gastronomia', label: 'Gastronomía', icon: <IcoGastro />,
    demos: [
      { id: 'food-cost', label: 'Food cost',               icon: <IcoCoin />,     enabled: true  },
      { id: 'resenas',   label: 'Gestión de reseñas',    icon: <IcoStar />,     enabled: true  },
      { id: 'turnos',    label: 'Planificador de turnos', icon: <IcoCalendar />, enabled: true  },
    ],
  },
  {
    id: 'distribuidoras', label: 'Distribuidoras', icon: <IcoDist />,
    demos: [
      { id: 'rutas',    label: 'Rutas',                  icon: <IcoRoute />,          enabled: true  },
      { id: 'demanda',  label: 'Predictor de demanda',   icon: <IcoTrendingUp />,     enabled: true  },
      { id: 'agente',   label: 'Agente de pedidos',      icon: <IcoBrandWhatsapp />,  enabled: true  },
    ],
  },
  {
    id: 'talleres', label: 'Talleres', icon: <IcoTaller />,
    demos: [
      { id: 'seguimiento', label: 'Seguimiento de reparación', icon: <IcoCar />, enabled: true  },
      ...disabledCards(['Demo 2', 'Demo 3']),
    ],
  },
  {
    id: 'salud', label: 'Salud', icon: <IcoSalud />,
    demos: disabledCards(['Demo próximamente', 'Demo 2', 'Demo 3']),
  },
  {
    id: 'inmobiliarias', label: 'Inmobiliarias', icon: <IcoInmo />,
    demos: [
      { id: 'crm', label: 'CRM', icon: <IcoCRM />, enabled: true },
      ...disabledCards(['Demo 2', 'Demo 3']),
    ],
  },
  {
    id: 'ecommerce', label: 'E-commerce', icon: <IcoEcom />,
    demos: [
      { id: 'suite', label: 'Suite', icon: <IcoGrid />, enabled: true },
      ...disabledCards(['Demo 2', 'Demo 3']),
    ],
  },
]

// ─── Próximamente placeholder ─────────────────────────────────────────────────

function ProximamenteScreen({ label, onBack }: { label: string; onBack: () => void }) {
  return (
    <div className="min-h-[480px] flex flex-col" style={{ backgroundColor: '#1a1f2e' }}>
      <div className="p-4">
        <button onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ color: 'rgba(255,255,255,0.6)' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Volver
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-8 pb-8">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.4)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="font-bold text-lg mb-1" style={{ color: 'rgba(255,255,255,0.85)' }}>{label}</p>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Esta demo estará disponible próximamente.</p>
        </div>
      </div>
    </div>
  )
}

// ─── Card component ───────────────────────────────────────────────────────────

function Card({ demo, onSelect }: { demo: DemoCard; onSelect: () => void }) {
  return (
    <div
      className="rounded-xl p-6 flex flex-col items-center gap-4 transition-all"
      style={{ backgroundColor: '#25313B', opacity: demo.enabled ? 1 : 0.45 }}
    >
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.75)' }}>
        {demo.icon}
      </div>
      <p className="text-white font-semibold text-center text-sm leading-tight">{demo.label}</p>
      {demo.enabled ? (
        <button onClick={onSelect}
          className="inline-flex items-center justify-center h-[46px] px-6 rounded-[10px] text-white font-bold tracking-[0.04em] uppercase text-[13px] transition-opacity hover:opacity-85"
          style={{ backgroundColor: '#306ECF' }}>
          Ver demo
        </button>
      ) : (
        <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.25)' }}>Próximamente</span>
      )}
    </div>
  )
}

// ─── Level 2: cards grid ──────────────────────────────────────────────────────

function CardsView({ industry, onSelect }: { industry: Industry; onSelect: (demoId: string) => void }) {
  return (
    <div className="min-h-[480px] flex flex-col p-8" style={{ backgroundColor: '#1a1f2e' }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-8"
        style={{ color: 'rgba(255,255,255,0.35)' }}>
        {industry.label}
      </p>
      <div className="grid grid-cols-3 gap-4">
        {industry.demos.map(demo => (
          <Card key={demo.id} demo={demo} onSelect={() => onSelect(demo.id)} />
        ))}
      </div>
    </div>
  )
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function IndustriesPreview() {
  const [activeId, setActiveId]       = useState('gastronomia')
  const [level, setLevel]             = useState<'cards' | 'demo'>('cards')
  const [activeDemoId, setActiveDemoId] = useState<string | null>(null)

  const selectIndustry = (id: string) => { setActiveId(id); setLevel('cards'); setActiveDemoId(null) }
  const selectDemo = (demoId: string) => { setActiveDemoId(demoId); setLevel('demo') }
  const goBack = () => { setLevel('cards'); setActiveDemoId(null) }

  const activeIndustry = industries.find(i => i.id === activeId)!

  const renderDemo = () => {
    if (activeId === 'gastronomia'    && activeDemoId === 'food-cost') return <FoodCostDemo onBack={goBack} />
    if (activeId === 'gastronomia'    && activeDemoId === 'resenas')   return <ResenasDemo  onBack={goBack} />
    if (activeId === 'gastronomia'    && activeDemoId === 'turnos')    return <TurnosDemo   onBack={goBack} />
    if (activeId === 'distribuidoras' && activeDemoId === 'rutas')   return <RutasDemo   onBack={goBack} />
    if (activeId === 'distribuidoras' && activeDemoId === 'demanda') return <DemandaDemo onBack={goBack} />
    if (activeId === 'distribuidoras' && activeDemoId === 'agente')  return <AgenteDemo       onBack={goBack} />
    if (activeId === 'talleres'       && activeDemoId === 'seguimiento') return <SeguimientoDemo onBack={goBack} />
    const demo = activeIndustry.demos.find(d => d.id === activeDemoId)
    return <ProximamenteScreen label={demo?.label ?? ''} onBack={goBack} />
  }

  return (
    <>
      <div id="demos" />
      <section id="industrias" className="py-20 md:py-28 bg-white">
        <div className="max-w-container mx-auto px-5 md:px-10">

          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-carbon mb-4 tracking-tight">
              Tu negocio optimizado
            </h2>
            <p className="text-lg text-texto-sec max-w-xl mx-auto">
              Elegí tu industria y probá cómo Dataria transforma tu negocio.
            </p>
          </div>

          {/* Panel */}
          <div className="max-w-[860px] mx-auto rounded-2xl overflow-hidden shadow-soft"
            style={{ boxShadow: '0 8px 48px rgba(0,0,0,0.18)' }}>
            {level === 'cards'
              ? <CardsView industry={activeIndustry} onSelect={selectDemo} />
              : renderDemo()
            }
          </div>

          {/* Industry bar — below the panel */}
          <div className="max-w-[860px] mx-auto mt-0 flex justify-center">
            {industries.map(ind => {
              const isActive = ind.id === activeId
              return (
                <button
                  key={ind.id}
                  onClick={() => selectIndustry(ind.id)}
                  className="flex flex-col items-center gap-1.5 px-4 py-3 text-xs font-semibold transition-all border-t-2"
                  style={{
                    borderTopColor: isActive ? '#306ECF' : 'transparent',
                    color: isActive ? '#306ECF' : '#5A6871',
                    backgroundColor: isActive ? '#EAF5FD' : 'transparent',
                  }}
                >
                  <span style={{ color: isActive ? '#306ECF' : '#5A6871' }}>{ind.icon}</span>
                  {ind.label}
                </button>
              )
            })}
          </div>

        </div>
      </section>
    </>
  )
}
