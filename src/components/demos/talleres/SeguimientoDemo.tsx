'use client'

import { useState, useEffect, useRef } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase  = 'splash' | 'main'
type Tab    = 'ordenes' | 'cliente'
type Estado = 'Recibido' | 'En diagnóstico' | 'En reparación' | 'Listo para retirar'

interface Historial { year: number; desc: string; costo: number }

interface Orden {
  id: number
  cliente: string
  tel: string
  marca: string
  modelo: string
  año: number
  patente: string
  problema: string
  estado: Estado
  tiempoEstimado: string
  presupuesto: number | null
  historial: Historial[]
  estadoTs: Partial<Record<Estado, number>>
}

interface WaToast { cliente: string; marca: string; modelo: string; patente: string }

// ─── Constants ────────────────────────────────────────────────────────────────

const ESTADOS: Estado[] = ['Recibido', 'En diagnóstico', 'En reparación', 'Listo para retirar']

const EST: Record<Estado, { text: string; bg: string; dot: string }> = {
  'Recibido':           { text: '#5A6871', bg: '#F3F6F5', dot: '#9CA3AF' },
  'En diagnóstico':     { text: '#92400E', bg: '#FEF3C7', dot: '#F59E0B' },
  'En reparación':      { text: '#1B5BC1', bg: '#EAF5FD', dot: '#45B5F3' },
  'Listo para retirar': { text: '#065F46', bg: '#ECFDF5', dot: '#10B981' },
}

const FRIENDLY: Record<Estado, string> = {
  'Recibido':           'Tu vehículo ingresó al taller. Pronto comenzaremos a revisarlo.',
  'En diagnóstico':     'Estamos revisando tu vehículo para identificar el problema.',
  'En reparación':      'Tu vehículo está siendo reparado por nuestros técnicos.',
  'Listo para retirar': '✅ ¡Tu vehículo está listo! Podés venir a buscarlo.',
}

const H = 3_600_000
const D = 86_400_000

function makeOrdenes(): Orden[] {
  const t = Date.now()
  return [
    {
      id: 1, cliente: 'Martín García', tel: '11-4523-0011',
      marca: 'Toyota', modelo: 'Corolla', año: 2019, patente: 'ABC 123',
      problema: 'Ruido en frenos delanteros + revisión general',
      estado: 'Listo para retirar', tiempoEstimado: '2 días', presupuesto: 85000,
      historial: [
        { year: 2023, desc: 'Cambio de aceite y filtros', costo: 12000 },
        { year: 2022, desc: 'Pastillas de freno', costo: 28000 },
      ],
      estadoTs: {
        'Recibido': t - 3 * D,
        'En diagnóstico': t - 2.5 * D,
        'En reparación': t - 2 * D,
        'Listo para retirar': t - D,
      },
    },
    {
      id: 2, cliente: 'Lucía Fernández', tel: '11-6611-2233',
      marca: 'Volkswagen', modelo: 'Gol', año: 2017, patente: 'DEF 456',
      problema: 'Motor no arranca, posible falla en batería o alternador',
      estado: 'En diagnóstico', tiempoEstimado: '1 día', presupuesto: null,
      historial: [{ year: 2024, desc: 'Cambio de batería', costo: 18500 }],
      estadoTs: { 'Recibido': t - D, 'En diagnóstico': t - 20 * H },
    },
    {
      id: 3, cliente: 'Carlos Méndez', tel: '11-3310-5599',
      marca: 'Ford', modelo: 'Ranger', año: 2021, patente: 'GHI 789',
      problema: 'Service 20.000 km + cambio de correa',
      estado: 'En reparación', tiempoEstimado: '3 días', presupuesto: 124000,
      historial: [{ year: 2023, desc: 'Service 10.000 km', costo: 65000 }],
      estadoTs: { 'Recibido': t - 2 * D, 'En diagnóstico': t - 1.7 * D, 'En reparación': t - D },
    },
    {
      id: 4, cliente: 'Ana Pérez', tel: '11-9988-7766',
      marca: 'Renault', modelo: 'Kangoo', año: 2015, patente: 'JKL 012',
      problema: 'Falla en sistema de dirección, vibración al girar',
      estado: 'Recibido', tiempoEstimado: '2 días', presupuesto: null,
      historial: [],
      estadoTs: { 'Recibido': t - 4 * H },
    },
  ]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtElapsed(ms: number): string {
  if (ms < 60_000) return '< 1m'
  const mins = Math.floor(ms / 60_000)
  const dys  = Math.floor(mins / 1440)
  const hrs  = Math.floor((mins % 1440) / 60)
  const mns  = mins % 60
  if (dys > 0) return `${dys}d ${hrs}h`
  if (hrs > 0) return `${hrs}h ${mns}m`
  return `${mns}m`
}

function fmtTs(ts: number): string {
  return new Date(ts).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}

function nextEst(e: Estado): Estado | null {
  const i = ESTADOS.indexOf(e)
  return i < ESTADOS.length - 1 ? ESTADOS[i + 1] : null
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IcoCar({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6-6h15m-6 0v-5" />
    </svg>
  )
}

function IcoX({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function IcoBack() {
  return (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  )
}

// ─── Splash ───────────────────────────────────────────────────────────────────

function Splash({ onBack, onStart }: { onBack: () => void; onStart: () => void }) {
  return (
    <div className="relative flex flex-col overflow-hidden"
      style={{ minHeight: 520, background: 'linear-gradient(140deg, #0A1829 0%, #0F2847 50%, #0A1E35 100%)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(27,91,193,0.2) 1px, transparent 1px)', backgroundSize: '26px 26px' }} />
      <div className="relative p-5">
        <button onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ color: 'rgba(255,255,255,0.55)' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>
          <IcoBack /> Volver
        </button>
      </div>
      <div className="relative flex-1 flex flex-col items-center justify-center gap-6 text-center px-8 pb-10">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: '#1B5BC1' }}>
          <IcoCar size={32} />
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: '#5B9BF5' }}>
            Talleres · Demo
          </p>
          <h2 className="text-3xl font-bold text-white mb-3">Seguimiento de reparación</h2>
          <p className="text-sm max-w-xs mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Tablero Kanban de órdenes de trabajo. El cliente ve el estado de su vehículo en tiempo real y recibe notificaciones automáticas por WhatsApp.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center max-w-sm">
          {['Kanban de órdenes', 'Historial del vehículo', 'Vista del cliente', 'Notificación WhatsApp', 'Cronómetro por etapa'].map(c => (
            <span key={c} className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: 'rgba(27,91,193,0.18)', color: '#7BB3F0', border: '1px solid rgba(27,91,193,0.28)' }}>
              {c}
            </span>
          ))}
        </div>
        <button onClick={onStart}
          className="inline-flex items-center justify-center h-[46px] px-8 rounded-[10px] text-white font-bold tracking-[0.04em] uppercase text-[13px] transition-opacity hover:opacity-85"
          style={{ backgroundColor: '#1B5BC1' }}>
          Ver herramienta
        </button>
      </div>
    </div>
  )
}

// ─── Kanban card ──────────────────────────────────────────────────────────────

function KanbanCard({ orden, now, onDetalle, onAvanzar }: {
  orden: Orden; now: number; onDetalle: () => void; onAvanzar: () => void
}) {
  const ts = orden.estadoTs[orden.estado] ?? 0
  const st = EST[orden.estado]
  const next = nextEst(orden.estado)

  return (
    <div className="rounded-xl border bg-white p-2.5 flex flex-col gap-2" style={{ borderColor: '#DCE5E9' }}>
      <div className="flex items-start justify-between gap-1">
        <p className="text-[11px] font-bold leading-tight" style={{ color: '#353C42' }}>{orden.cliente}</p>
        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0" style={{ backgroundColor: st.bg, color: st.text }}>
          {orden.patente}
        </span>
      </div>
      <p className="text-[10px] leading-tight" style={{ color: '#5A6871' }}>{orden.marca} {orden.modelo} {orden.año}</p>
      <p className="text-[10px] leading-snug line-clamp-2" style={{ color: '#353C42' }}>{orden.problema}</p>
      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1" style={{ color: '#5A6871' }}>
          <span style={{ color: st.dot }}>●</span>
          {fmtElapsed(now - ts)}
        </span>
        <span className="font-semibold" style={{ color: orden.presupuesto ? '#1B5BC1' : '#9CA3AF' }}>
          {orden.presupuesto ? `$${orden.presupuesto.toLocaleString('es-AR')}` : 'A confirmar'}
        </span>
      </div>
      <div className="flex gap-1">
        <button onClick={onDetalle}
          className="flex-1 text-[10px] py-1 rounded-lg font-medium"
          style={{ backgroundColor: '#F3F6F5', color: '#5A6871', border: '1px solid #DCE5E9' }}>
          Ver detalle
        </button>
        {next && (
          <button onClick={onAvanzar}
            className="px-2 py-1 rounded-lg text-white text-[11px] font-bold transition-opacity hover:opacity-85 flex-shrink-0"
            style={{ backgroundColor: '#1B5BC1' }}
            title={`Mover a: ${next}`}>
            →
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Detail modal ─────────────────────────────────────────────────────────────

function DetailModal({ orden, now, onClose }: { orden: Orden; now: number; onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#DCE5E9' }}>
          <div>
            <p className="font-bold" style={{ color: '#353C42' }}>{orden.cliente}</p>
            <p className="text-xs" style={{ color: '#5A6871' }}>{orden.tel}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors" style={{ color: '#5A6871' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F3F6F5')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
            <IcoX />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Vehículo + problema */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(90,104,113,0.55)' }}>Vehículo</p>
              <p className="text-sm font-semibold" style={{ color: '#353C42' }}>{orden.marca} {orden.modelo} {orden.año}</p>
              <p className="text-xs" style={{ color: '#5A6871' }}>Patente: {orden.patente}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(90,104,113,0.55)' }}>Presupuesto</p>
              <p className="text-sm font-bold" style={{ color: orden.presupuesto ? '#1B5BC1' : '#9CA3AF' }}>
                {orden.presupuesto ? `$${orden.presupuesto.toLocaleString('es-AR')}` : 'A confirmar'}
              </p>
              <p className="text-xs" style={{ color: '#5A6871' }}>Estimado: {orden.tiempoEstimado}</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(90,104,113,0.55)' }}>Problema reportado</p>
            <p className="text-sm" style={{ color: '#353C42' }}>{orden.problema}</p>
          </div>

          {/* Cronómetro por etapa */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(90,104,113,0.55)' }}>Cronómetro por etapa</p>
            <div className="space-y-2.5">
              {ESTADOS.map((e, i) => {
                const entryTs = orden.estadoTs[e]
                if (!entryTs) return null
                const nextE = ESTADOS[i + 1]
                const exitTs = nextE ? orden.estadoTs[nextE] : null
                const duration = exitTs ? exitTs - entryTs : (orden.estado === e ? now - entryTs : null)
                const isCurrent = orden.estado === e
                const st = EST[e]
                return (
                  <div key={e} className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: isCurrent ? st.dot : exitTs ? '#D1FAE5' : '#E5E7EB' }} />
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold" style={{ color: isCurrent ? '#353C42' : exitTs ? '#6B7280' : '#D1D5DB' }}>{e}</span>
                      <span className="text-[10px] ml-2" style={{ color: '#9CA3AF' }}>{fmtTs(entryTs)}</span>
                    </div>
                    {duration !== null && (
                      <span className="font-medium flex-shrink-0" style={{ color: isCurrent ? st.text : '#9CA3AF' }}>
                        {fmtElapsed(duration)}{isCurrent ? '' : ''}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Historial */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(90,104,113,0.55)' }}>Historial del vehículo</p>
            {orden.historial.length === 0 ? (
              <p className="text-xs" style={{ color: '#9CA3AF' }}>Sin historial previo en este taller.</p>
            ) : (
              <div className="space-y-1.5">
                {orden.historial.map((h, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b last:border-0"
                    style={{ borderColor: '#F3F6F5' }}>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold" style={{ color: '#1B5BC1' }}>{h.year}</span>
                      <span style={{ color: '#353C42' }}>{h.desc}</span>
                    </div>
                    <span className="font-medium" style={{ color: '#5A6871' }}>${h.costo.toLocaleString('es-AR')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── WhatsApp toast ───────────────────────────────────────────────────────────

function WAToastEl({ data, onClose }: { data: WaToast; onClose: () => void }) {
  return (
    <div className="absolute bottom-4 right-4 z-50 w-72 rounded-2xl shadow-2xl overflow-hidden"
      style={{ border: '1px solid #DCE5E9', backgroundColor: '#fff' }}>
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ backgroundColor: '#25D366' }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        </svg>
        <span className="text-white font-bold text-xs flex-1">Mensaje enviado</span>
        <button onClick={onClose} className="text-white/80 hover:text-white font-bold text-base leading-none">×</button>
      </div>
      <div className="p-3">
        <p className="text-[11px] mb-1.5" style={{ color: '#5A6871' }}>
          📱 Enviado a <span className="font-semibold" style={{ color: '#353C42' }}>{data.cliente}</span>
        </p>
        <p className="text-[11px] leading-relaxed rounded-xl p-2.5" style={{ backgroundColor: '#F3F6F5', color: '#353C42' }}>
          &ldquo;Hola {data.cliente}, te avisamos que tu {data.marca} {data.modelo} (patente {data.patente}) ya está listo para retirar en nuestro taller. Horario: Lun–Vie 8–18hs · Sáb 8–13hs. ¡Gracias!&rdquo;
        </p>
      </div>
    </div>
  )
}

// ─── Client view ──────────────────────────────────────────────────────────────

function ClientView({ ordenes }: { ordenes: Orden[] }) {
  const [selId, setSelId] = useState(1)
  const orden = ordenes.find(o => o.id === selId) ?? ordenes[0]
  const idx   = ESTADOS.indexOf(orden.estado)
  const st    = EST[orden.estado]

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      {/* Demo selector */}
      <div className="flex items-center gap-2 w-full max-w-sm">
        <label className="text-xs font-semibold flex-shrink-0" style={{ color: '#5A6871' }}>Ver como cliente:</label>
        <select value={selId} onChange={e => setSelId(Number(e.target.value))}
          className="flex-1 text-xs rounded-lg border px-2 py-1.5 outline-none bg-white"
          style={{ borderColor: '#DCE5E9', color: '#353C42' }}>
          {ordenes.map(o => <option key={o.id} value={o.id}>{o.cliente}</option>)}
        </select>
      </div>

      {/* Client card */}
      <div className="w-full max-w-sm rounded-2xl border overflow-hidden" style={{ borderColor: '#DCE5E9', backgroundColor: '#fff' }}>
        {/* Header */}
        <div className="px-5 py-4 border-b" style={{ borderColor: '#DCE5E9', backgroundColor: '#F9FAFB' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-black" style={{ backgroundColor: '#1B5BC1' }}>d</div>
            <span className="text-xs font-bold" style={{ color: '#1B5BC1' }}>dataria</span>
            <span className="mx-1" style={{ color: '#DCE5E9' }}>·</span>
            <span className="text-xs" style={{ color: '#5A6871' }}>Taller Central</span>
          </div>
          <p className="font-bold" style={{ color: '#353C42' }}>{orden.cliente}</p>
          <p className="text-sm" style={{ color: '#5A6871' }}>{orden.marca} {orden.modelo} {orden.año} · {orden.patente}</p>
        </div>

        {/* Progress tracker */}
        <div className="px-5 py-4 border-b" style={{ borderColor: '#DCE5E9' }}>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(90,104,113,0.55)' }}>Estado del servicio</p>
          <div className="flex items-center mb-3">
            {ESTADOS.map((e, i) => {
              const done   = i < idx
              const active = i === idx
              const color  = done || active ? '#1B5BC1' : '#E5E7EB'
              return (
                <div key={e} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full flex items-center">
                    {i > 0 && <div className="flex-1 h-0.5" style={{ backgroundColor: done ? '#1B5BC1' : '#E5E7EB' }} />}
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                      style={{ backgroundColor: color }}>
                      {done ? (
                        <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3} strokeLinecap="round">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      ) : active ? (
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      ) : null}
                    </div>
                    {i < ESTADOS.length - 1 && <div className="flex-1 h-0.5" style={{ backgroundColor: done ? '#1B5BC1' : '#E5E7EB' }} />}
                  </div>
                  <p className="text-[9px] text-center leading-tight max-w-[48px]"
                    style={{ color: active ? '#1B5BC1' : done ? '#5A6871' : '#D1D5DB', fontWeight: active ? 700 : 400 }}>
                    {e}
                  </p>
                </div>
              )
            })}
          </div>
          <p className="text-sm font-semibold" style={{ color: st.text }}>{FRIENDLY[orden.estado]}</p>
        </div>

        {/* Details */}
        <div className="px-5 py-4 space-y-2.5">
          <div className="flex items-center justify-between text-sm">
            <span style={{ color: '#5A6871' }}>Tiempo estimado</span>
            <span className="font-semibold" style={{ color: '#353C42' }}>{orden.tiempoEstimado}</span>
          </div>
          {orden.presupuesto && (
            <div className="flex items-center justify-between text-sm">
              <span style={{ color: '#5A6871' }}>Presupuesto aprobado</span>
              <span className="font-semibold" style={{ color: '#1B5BC1' }}>${orden.presupuesto.toLocaleString('es-AR')}</span>
            </div>
          )}
          <p className="text-[10px] pt-2 border-t" style={{ borderColor: '#F3F6F5', color: '#9CA3AF' }}>
            Esta vista se actualiza en tiempo real. No necesitás llamar para consultar el estado.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SeguimientoDemo({ onBack }: { onBack: () => void }) {
  const [phase, setPhase]   = useState<Phase>('splash')
  const [tab, setTab]       = useState<Tab>('ordenes')
  const [ordenes, setOrdenes] = useState<Orden[]>(() => makeOrdenes())
  const [modal, setModal]   = useState<Orden | null>(null)
  const [toast, setToast]   = useState<WaToast | null>(null)
  const [now, setNow]       = useState(Date.now())
  const toastRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => () => { if (toastRef.current) clearTimeout(toastRef.current) }, [])

  const advanceEstado = (id: number) => {
    setOrdenes(prev => prev.map(o => {
      if (o.id !== id) return o
      const next = nextEst(o.estado)
      if (!next) return o
      const updated: Orden = { ...o, estado: next, estadoTs: { ...o.estadoTs, [next]: Date.now() } }
      if (next === 'Listo para retirar') {
        if (toastRef.current) clearTimeout(toastRef.current)
        setToast({ cliente: o.cliente, marca: o.marca, modelo: o.modelo, patente: o.patente })
        toastRef.current = setTimeout(() => setToast(null), 5000)
      }
      return updated
    }))
  }

  if (phase === 'splash') return <Splash onBack={onBack} onStart={() => setPhase('main')} />

  return (
    <div className="relative flex flex-col overflow-hidden" style={{ height: 520, backgroundColor: '#F3F6F5' }}>
      {/* Topbar */}
      <div className="flex items-center gap-3 px-4 py-2.5 flex-shrink-0" style={{ backgroundColor: '#1B5BC1' }}>
        <button onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-75"
          style={{ color: 'rgba(255,255,255,0.75)' }}>
          <IcoBack /> Inicio
        </button>
        <div className="w-px h-4" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }} />
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center font-black text-xs" style={{ backgroundColor: '#fff', color: '#1B5BC1' }}>d</div>
          <span className="text-white font-bold text-sm">dataria</span>
          <span className="text-white/40 mx-0.5">·</span>
          <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>Seguimiento de reparación</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-shrink-0 border-b" style={{ backgroundColor: '#fff', borderColor: '#DCE5E9' }}>
        {(['ordenes', 'cliente'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="px-5 py-2.5 text-xs font-semibold border-b-2 transition-colors"
            style={{
              borderBottomColor: tab === t ? '#1B5BC1' : 'transparent',
              color: tab === t ? '#1B5BC1' : '#5A6871',
              backgroundColor: tab === t ? '#EAF5FD' : 'transparent',
            }}>
            {t === 'ordenes' ? 'Órdenes' : 'Vista del cliente'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-3">
        {tab === 'ordenes' ? (
          <div className="grid grid-cols-4 gap-2.5 h-full">
            {ESTADOS.map(estado => {
              const col = ordenes.filter(o => o.estado === estado)
              const st  = EST[estado]
              return (
                <div key={estado} className="flex flex-col gap-2 min-w-0">
                  {/* Column header */}
                  <div className="flex items-center gap-1.5 px-1">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: st.dot }} />
                    <p className="text-[10px] font-bold uppercase tracking-wide truncate flex-1" style={{ color: st.text }}>
                      {estado}
                    </p>
                    <span className="text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: st.bg, color: st.text }}>
                      {col.length}
                    </span>
                  </div>
                  {/* Cards */}
                  {col.map(o => (
                    <KanbanCard key={o.id} orden={o} now={now}
                      onDetalle={() => setModal(o)}
                      onAvanzar={() => advanceEstado(o.id)} />
                  ))}
                  {col.length === 0 && (
                    <div className="rounded-xl border-2 border-dashed p-4 text-center text-[10px]"
                      style={{ borderColor: '#E5E7EB', color: '#D1D5DB' }}>
                      Sin órdenes
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <ClientView ordenes={ordenes} />
        )}
      </div>

      {/* Detail modal */}
      {modal && (
        <DetailModal
          orden={ordenes.find(o => o.id === modal.id) ?? modal}
          now={now}
          onClose={() => setModal(null)} />
      )}

      {/* WhatsApp toast */}
      {toast && <WAToastEl data={toast} onClose={() => { setToast(null); if (toastRef.current) clearTimeout(toastRef.current) }} />}
    </div>
  )
}
