'use client'

import { useState } from 'react'
import Image from 'next/image'

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = 'splash' | 'tool'
type Tab   = 'pipeline' | 'conversion'
type Etapa = 'Interesado' | 'Visita agendada' | 'Propuesta' | 'Cierre'

const ETAPAS: Etapa[] = ['Interesado', 'Visita agendada', 'Propuesta', 'Cierre']
const CONTACT_TYPES   = ['Llamada', 'WhatsApp', 'Visita', 'Propuesta']

interface HistEntry { id: number; label: string; diasAtras: number }
interface Lead {
  id: number
  nombre: string
  telefono: string
  busca: string
  etapa: Etapa
  diasSinContacto: number
  historial: HistEntry[]
  propMatches: number[]
}
interface Propiedad { id: number; desc: string; metros: string; precio: number }

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROPS: Propiedad[] = [
  { id: 1, desc: 'Depto 2 amb · Palermo',   metros: '55m²',  precio: 145000 },
  { id: 2, desc: 'Depto 3 amb · Belgrano',  metros: '78m²',  precio: 210000 },
  { id: 3, desc: 'Casa · Olivos',           metros: '180m²', precio: 320000 },
  { id: 4, desc: 'Depto 1 amb · Caballito', metros: '38m²',  precio: 89000  },
  { id: 5, desc: 'Depto 2 amb · Núñez',     metros: '60m²',  precio: 158000 },
]

const INIT_LEADS: Lead[] = [
  {
    id: 1, nombre: 'Martín García', telefono: '11-4523-0011',
    busca: '2 amb · Palermo / Belgrano · hasta USD 160.000',
    etapa: 'Interesado', diasSinContacto: 9,
    historial: [{ id: 1, label: 'Llamada inicial', diasAtras: 9 }],
    propMatches: [1],
  },
  {
    id: 2, nombre: 'Lucía Fernández', telefono: '11-6611-2233',
    busca: '3 amb · Belgrano · hasta USD 220.000',
    etapa: 'Visita agendada', diasSinContacto: 2,
    historial: [
      { id: 1, label: 'Llamada inicial', diasAtras: 6 },
      { id: 2, label: 'Mensaje WhatsApp', diasAtras: 2 },
    ],
    propMatches: [2],
  },
  {
    id: 3, nombre: 'Carlos Méndez', telefono: '11-3310-5599',
    busca: 'Casa · zona norte · hasta USD 350.000',
    etapa: 'Propuesta', diasSinContacto: 1,
    historial: [
      { id: 1, label: 'Llamada inicial', diasAtras: 12 },
      { id: 2, label: 'Visita Casa Olivos', diasAtras: 4 },
      { id: 3, label: 'Envío de propuesta', diasAtras: 1 },
    ],
    propMatches: [3],
  },
  {
    id: 4, nombre: 'Ana Pérez', telefono: '11-9988-7766',
    busca: '1 amb · Caballito · hasta USD 95.000',
    etapa: 'Interesado', diasSinContacto: 11,
    historial: [{ id: 1, label: 'Llamada inicial', diasAtras: 11 }],
    propMatches: [4],
  },
  {
    id: 5, nombre: 'Roberto Díaz', telefono: '11-2244-5566',
    busca: '2 amb · Núñez · hasta USD 165.000',
    etapa: 'Cierre', diasSinContacto: 1,
    historial: [
      { id: 1, label: 'Llamada inicial', diasAtras: 20 },
      { id: 2, label: 'Visita Depto Núñez', diasAtras: 8 },
      { id: 3, label: 'Propuesta enviada', diasAtras: 5 },
      { id: 4, label: 'Firma de boleto', diasAtras: 1 },
    ],
    propMatches: [5],
  },
]

// Funnel: historical leads that passed through each stage
const FUNNEL: { etapa: Etapa; total: number; rate: number | null }[] = [
  { etapa: 'Interesado',      total: 5, rate: null },
  { etapa: 'Visita agendada', total: 3, rate: 60   },
  { etapa: 'Propuesta',       total: 2, rate: 67   },
  { etapa: 'Cierre',          total: 1, rate: 50   },
]
const MIN_RATE = 50  // Propuesta → Cierre is the "punto de fuga"

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtUSD(n: number) {
  return `USD ${n.toLocaleString('es-AR')}`
}

function fmtDias(n: number) {
  if (n === 0) return 'Hoy'
  if (n === 1) return 'Hace 1 día'
  return `Hace ${n} días`
}

function entryIcon(label: string): string {
  const l = label.toLowerCase()
  if (l.includes('whatsapp') || l.includes('mensaje')) return '💬'
  if (l.includes('visita'))                             return '🏠'
  if (l.includes('propuesta') || l.includes('envío'))  return '📄'
  if (l.includes('firma') || l.includes('boleto'))     return '✍️'
  return '📞'
}

function etapaBadgeStyle(etapa: Etapa): React.CSSProperties {
  const map: Record<Etapa, React.CSSProperties> = {
    'Interesado':       { backgroundColor: '#F3F6F5',                   color: '#5A6871' },
    'Visita agendada':  { backgroundColor: 'rgba(245,158,11,0.12)',     color: '#b45309' },
    'Propuesta':        { backgroundColor: '#EAF5FD',                   color: '#1B5BC1' },
    'Cierre':           { backgroundColor: 'rgba(34,197,94,0.12)',      color: '#15803d' },
  }
  return { ...map[etapa], fontWeight: 600, fontSize: 11, padding: '2px 8px', borderRadius: 4 }
}

// ─── Splash ───────────────────────────────────────────────────────────────────

function Splash({ onBack, onStart }: { onBack: () => void; onStart: () => void }) {
  return (
    <div
      className="min-h-[560px] flex flex-col"
      style={{ background: 'linear-gradient(160deg, #1B5BC1 0%, #2a6fd4 50%, #45B5F3 100%)' }}
    >
      <div className="p-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Volver
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-8 pb-10">
        <div className="w-20 h-20 rounded-2xl bg-white shadow-soft p-3 flex items-center justify-center">
          <Image src="/isologo-dataria.png" alt="Dataria" width={64} height={64} className="w-full h-full object-contain" />
        </div>
        <div>
          <p className="text-2xl font-extrabold text-white mb-1.5">
            <span style={{ color: '#56BCFA' }}>d</span>ataria
          </p>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Inmobiliarias · CRM
          </p>
          <h2 className="text-3xl font-bold text-white mb-3">CRM</h2>
          <p className="text-base max-w-xs mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Gestioná tu cartera de clientes, seguí el pipeline de ventas y detectá oportunidades de seguimiento automáticamente.
          </p>
        </div>
        <button
          onClick={onStart}
          className="inline-flex items-center justify-center h-[46px] px-8 rounded-[10px] text-white font-bold tracking-[0.04em] uppercase text-[13px] transition-opacity hover:opacity-85"
          style={{ backgroundColor: '#306ECF' }}
        >
          Ver herramienta
        </button>
      </div>
    </div>
  )
}

// ─── Topbar ───────────────────────────────────────────────────────────────────

function Topbar({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ backgroundColor: '#1B5BC1' }} className="flex items-center justify-between px-5 py-3 shrink-0">
      <div className="flex items-center gap-2.5">
        <span className="font-extrabold text-lg text-white leading-none">
          <span style={{ color: '#56BCFA' }}>d</span>ataria
        </span>
        <span className="text-white/40 text-sm">·</span>
        <span className="text-white/75 text-sm">Inmobiliarias · CRM</span>
      </div>
      <button onClick={onBack}
        className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Inicio
      </button>
    </div>
  )
}

// ─── Lead card (kanban) ───────────────────────────────────────────────────────

function LeadCard({
  lead, onMove, onOpen,
}: {
  lead: Lead
  onMove: (id: number, dir: -1 | 1) => void
  onOpen: (lead: Lead) => void
}) {
  const hasAlert  = lead.diasSinContacto > 7
  const etapaIdx  = ETAPAS.indexOf(lead.etapa)

  return (
    <div
      onClick={() => onOpen(lead)}
      className="bg-white rounded-lg p-3 cursor-pointer transition-shadow duration-160 hover:shadow-md"
      style={{
        border: hasAlert ? '1.5px solid #ef4444' : '1px solid #DCE5E9',
        boxShadow: hasAlert ? '0 0 0 3px rgba(239,68,68,0.07)' : '0 1px 4px rgba(53,60,66,0.05)',
      }}
    >
      {hasAlert && (
        <div className="flex items-center gap-1 mb-1.5 text-[11px] font-semibold" style={{ color: '#ef4444' }}>
          <span>⚠️</span>
          <span>Sin seguimiento hace {lead.diasSinContacto} días</span>
        </div>
      )}
      <p className="text-sm font-bold leading-tight" style={{ color: '#353C42' }}>{lead.nombre}</p>
      <p className="text-xs mt-0.5 mb-1.5 line-clamp-2 leading-snug" style={{ color: '#5A6871' }}>{lead.busca}</p>
      <p className="text-[11px]" style={{ color: hasAlert ? '#ef4444' : '#5A6871' }}>
        {fmtDias(lead.diasSinContacto)}
      </p>
      <div className="flex gap-1 mt-2.5" onClick={e => e.stopPropagation()}>
        <button
          disabled={etapaIdx === 0}
          onClick={() => onMove(lead.id, -1)}
          className="flex-1 py-1 text-[11px] font-semibold rounded-xs transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#F3F6F5', color: '#5A6871' }}
          onMouseEnter={e => { if (!(e.currentTarget as HTMLButtonElement).disabled) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#DCE5E9' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F3F6F5' }}
        >← Prev</button>
        <button
          disabled={etapaIdx === ETAPAS.length - 1}
          onClick={() => onMove(lead.id, 1)}
          className="flex-1 py-1 text-[11px] font-semibold rounded-xs transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#EAF5FD', color: '#1B5BC1' }}
          onMouseEnter={e => { if (!(e.currentTarget as HTMLButtonElement).disabled) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#d0e6f7' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#EAF5FD' }}
        >Next →</button>
      </div>
    </div>
  )
}

// ─── Pipeline tab ─────────────────────────────────────────────────────────────

function PipelineTab({
  leads, onMove, onOpen,
}: {
  leads: Lead[]
  onMove: (id: number, dir: -1 | 1) => void
  onOpen: (lead: Lead) => void
}) {
  return (
    <div className="overflow-x-auto -mx-1 px-1">
      <div className="flex gap-3 pb-1" style={{ minWidth: 560 }}>
        {ETAPAS.map(etapa => {
          const col        = leads.filter(l => l.etapa === etapa)
          const alertCount = col.filter(l => l.diasSinContacto > 7).length
          return (
            <div key={etapa} className="flex-1" style={{ minWidth: 130 }}>
              <div className="flex items-center justify-between mb-2 px-0.5">
                <p className="text-xs font-bold truncate" style={{ color: '#353C42' }}>{etapa}</p>
                <div className="flex items-center gap-1 shrink-0">
                  {alertCount > 0 && (
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444' }}
                    >
                      {alertCount}⚠
                    </span>
                  )}
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: '#EAF5FD', color: '#1B5BC1' }}
                  >
                    {col.length}
                  </span>
                </div>
              </div>
              <div
                className="rounded-lg p-2 space-y-2 min-h-[100px]"
                style={{ backgroundColor: '#F3F6F5' }}
              >
                {col.length === 0 && (
                  <p className="text-xs text-center py-6" style={{ color: 'rgba(90,104,113,0.45)' }}>
                    Sin leads
                  </p>
                )}
                {col.map(l => (
                  <LeadCard key={l.id} lead={l} onMove={onMove} onOpen={onOpen} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Lead detail modal ────────────────────────────────────────────────────────

function LeadModal({
  lead, onClose, onRegister,
}: {
  lead: Lead
  onClose: () => void
  onRegister: (leadId: number, tipo: string) => void
}) {
  const [showForm,     setShowForm]     = useState(false)
  const [contactType,  setContactType]  = useState('Llamada')

  const matchedProps = PROPS.filter(p => lead.propMatches.includes(p.id))

  const handleRegister = () => {
    onRegister(lead.id, contactType)
    setShowForm(false)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full max-w-md rounded-xl overflow-hidden animate-fade-in"
        style={{
          backgroundColor: '#fff',
          boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 border-b" style={{ borderColor: '#DCE5E9' }}>
          <div>
            <h3 className="font-bold text-base" style={{ color: '#353C42' }}>{lead.nombre}</h3>
            <p className="text-xs" style={{ color: '#5A6871' }}>{lead.telefono}</p>
          </div>
          <button onClick={onClose} className="ml-3 transition-colors hover:text-carbon" style={{ color: '#5A6871' }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Info row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: '#5A6871' }}>Busca</p>
              <p className="text-sm leading-snug" style={{ color: '#353C42' }}>{lead.busca}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide mb-1.5" style={{ color: '#5A6871' }}>Etapa</p>
              <span style={etapaBadgeStyle(lead.etapa)}>{lead.etapa}</span>
            </div>
          </div>

          {/* Historial */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: '#5A6871' }}>
                Historial de contacto
              </p>
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-xs transition-colors"
                  style={{ backgroundColor: '#EAF5FD', color: '#1B5BC1' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#d0e6f7')}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#EAF5FD')}
                >
                  + Registrar contacto
                </button>
              )}
            </div>

            {showForm && (
              <div
                className="flex gap-2 items-center rounded-lg p-3 mb-2"
                style={{ backgroundColor: '#EAF5FD', border: '1px solid rgba(27,91,193,0.2)' }}
              >
                <select
                  value={contactType}
                  onChange={e => setContactType(e.target.value)}
                  className="flex-1 text-sm px-2 py-1.5 rounded-xs"
                  style={{ border: '1px solid #DCE5E9', color: '#353C42', backgroundColor: '#fff' }}
                >
                  {CONTACT_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
                <button
                  onClick={handleRegister}
                  className="px-3 py-1.5 text-xs font-bold text-white rounded-xs transition-opacity hover:opacity-85 shrink-0"
                  style={{ backgroundColor: '#1B5BC1' }}
                >
                  Registrar
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-[11px] font-medium shrink-0"
                  style={{ color: '#5A6871' }}
                >
                  ✕
                </button>
              </div>
            )}

            <div className="space-y-1.5">
              {[...lead.historial].reverse().map(h => (
                <div
                  key={h.id}
                  className="flex items-center justify-between py-1.5 px-2 rounded-xs"
                  style={{ backgroundColor: '#F3F6F5' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{entryIcon(h.label)}</span>
                    <span className="text-xs font-medium" style={{ color: '#353C42' }}>{h.label}</span>
                  </div>
                  <span className="text-[11px] shrink-0 ml-2" style={{ color: '#5A6871' }}>
                    {fmtDias(h.diasAtras)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Match automático */}
          {matchedProps.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: '#5A6871' }}>
                Match automático
              </p>
              <div className="space-y-2">
                {matchedProps.map(p => (
                  <div
                    key={p.id}
                    className="rounded-lg p-3 flex items-center gap-3"
                    style={{ backgroundColor: '#EAF5FD', border: '1px solid rgba(27,91,193,0.15)' }}
                  >
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
                      style={{ backgroundColor: '#306ECF' }}
                    >
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V20.25a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V9.75z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20.25V12h6v8.25" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold leading-tight truncate" style={{ color: '#353C42' }}>{p.desc}</p>
                      <p className="text-[11px]" style={{ color: '#5A6871' }}>{p.metros} · {fmtUSD(p.precio)}</p>
                    </div>
                    <span
                      className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: '#306ECF' }}
                    >
                      ✓ Match
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] mt-1.5" style={{ color: '#5A6871' }}>
                Coincide con tu búsqueda
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Conversion tab ───────────────────────────────────────────────────────────

function ConversionTab({ leads }: { leads: Lead[] }) {
  const alertCount = leads.filter(l => l.diasSinContacto > 7).length

  return (
    <div className="space-y-5">
      {/* Funnel */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(90,104,113,0.7)' }}>
          Embudo de conversión
        </p>
        <div className="space-y-1.5">
          {FUNNEL.map((f, i) => {
            const pct          = (f.total / 5) * 100
            const isWorstRate  = f.rate === MIN_RATE
            const barColors    = ['#1B5BC1', '#306ECF', '#45B5F3', '#56BCFA']
            return (
              <div key={f.etapa}>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold shrink-0 w-32 truncate" style={{ color: '#353C42' }}>
                    {f.etapa}
                  </span>
                  <div className="flex-1 rounded-full overflow-hidden" style={{ backgroundColor: '#F3F6F5', height: 26 }}>
                    <div
                      className="h-full rounded-full flex items-center px-2.5 transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: barColors[i], minWidth: 28 }}
                    >
                      <span className="text-[11px] font-bold text-white">{f.total}</span>
                    </div>
                  </div>
                </div>
                {i < FUNNEL.length - 1 && (
                  <div className="flex items-center ml-32 pl-4 my-1">
                    <span
                      className="text-[11px] font-bold px-2.5 py-0.5 rounded-sm"
                      style={
                        isWorstRate || FUNNEL[i + 1]?.rate === MIN_RATE
                          ? { backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444' }
                          : { backgroundColor: '#F3F6F5', color: '#5A6871' }
                      }
                    >
                      {FUNNEL[i + 1].rate}% conversión
                      {FUNNEL[i + 1].rate === MIN_RATE && ' · Punto de fuga'}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t" style={{ borderColor: '#DCE5E9' }}>
        <div className="rounded-lg p-3 text-center" style={{ backgroundColor: '#F3F6F5' }}>
          <p className="text-2xl font-black" style={{ color: '#1B5BC1' }}>{leads.length}</p>
          <p className="text-[11px] font-semibold mt-0.5 leading-tight" style={{ color: '#5A6871' }}>
            Leads activos
          </p>
        </div>
        <div
          className="rounded-lg p-3 text-center"
          style={{
            backgroundColor: alertCount > 0 ? 'rgba(239,68,68,0.06)' : '#F3F6F5',
            border: alertCount > 0 ? '1px solid rgba(239,68,68,0.2)' : '1px solid transparent',
          }}
        >
          <p className="text-2xl font-black" style={{ color: alertCount > 0 ? '#ef4444' : '#353C42' }}>
            {alertCount}
          </p>
          <p className="text-[11px] font-semibold mt-0.5 leading-tight" style={{ color: '#5A6871' }}>
            Sin seguimiento
          </p>
        </div>
        <div className="rounded-lg p-3 text-center" style={{ backgroundColor: '#F3F6F5' }}>
          <p className="text-2xl font-black" style={{ color: '#1B5BC1' }}>18d</p>
          <p className="text-[11px] font-semibold mt-0.5 leading-tight" style={{ color: '#5A6871' }}>
            Interesado → Cierre
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function CRMDemo({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState<Phase>('splash')
  const [tab,   setTab]   = useState<Tab>('pipeline')
  const [leads, setLeads] = useState<Lead[]>(INIT_LEADS)
  const [modal, setModal] = useState<number | null>(null)  // lead id

  const moveStage = (id: number, dir: -1 | 1) => {
    setLeads(prev => prev.map(l => {
      if (l.id !== id) return l
      const idx  = ETAPAS.indexOf(l.etapa)
      const next = idx + dir
      if (next < 0 || next >= ETAPAS.length) return l
      return { ...l, etapa: ETAPAS[next] }
    }))
  }

  const registerContact = (leadId: number, tipo: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id !== leadId) return l
      return {
        ...l,
        diasSinContacto: 0,
        historial: [...l.historial, { id: l.historial.length + 1, label: tipo, diasAtras: 0 }],
      }
    }))
  }

  const modalLead = modal !== null ? leads.find(l => l.id === modal) : null

  if (phase === 'splash') {
    return <Splash onBack={onBack} onStart={() => setPhase('tool')} />
  }

  return (
    <div className="flex flex-col" style={{ minHeight: 560 }}>
      <Topbar onBack={() => setPhase('splash')} />

      {/* Tabs */}
      <div className="flex gap-0 border-b px-4" style={{ borderColor: '#DCE5E9' }}>
        {(['pipeline', 'conversion'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2.5 text-sm font-semibold transition-all duration-160 -mb-px border-b-2"
            style={
              tab === t
                ? { color: '#1B5BC1', borderBottomColor: '#1B5BC1' }
                : { color: '#5A6871', borderBottomColor: 'transparent' }
            }
          >
            {t === 'pipeline' ? 'Pipeline' : 'Conversión'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        <div key={tab} className="animate-fade-in">
          {tab === 'pipeline'
            ? <PipelineTab leads={leads} onMove={moveStage} onOpen={l => setModal(l.id)} />
            : <ConversionTab leads={leads} />
          }
        </div>
      </div>

      {/* Modal */}
      {modalLead && (
        <LeadModal
          lead={modalLead}
          onClose={() => setModal(null)}
          onRegister={registerContact}
        />
      )}
    </div>
  )
}
