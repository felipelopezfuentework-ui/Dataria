'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen  = 'splash' | 'main'
type TabId   = 'clientes' | 'segmentos'
type Segmento = 'VIP' | 'Regular' | 'En riesgo' | 'Inactivo'

interface Compra { producto: string; monto: number; fecha: string }
interface Cliente {
  id: number
  nombre: string
  email: string
  telefono: string
  segmento: Segmento
  compras: number
  totalGastado: number
  diasUltimaCompra: number
  canalPreferido: string
  categorias: string[]
  historial: Compra[]
  score: number
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CLIENTES: Cliente[] = [
  {
    id: 1, nombre: 'Lucía Fernández', email: 'lucia@gmail.com', telefono: '11-6611-2233',
    segmento: 'VIP', compras: 12, totalGastado: 284000, diasUltimaCompra: 3,
    canalPreferido: 'Tienda online', categorias: ['Ropa deportiva', 'Calzado'],
    historial: [
      { producto: 'Zapatillas Running Pro x2', monto: 84000, fecha: '15/6' },
      { producto: 'Campera Impermeable',        monto: 40000, fecha: '2/7'  },
      { producto: 'Mochila Urban',               monto: 30000, fecha: '7/7'  },
    ],
    score: 94,
  },
  {
    id: 2, nombre: 'Martín García', email: 'martin@gmail.com', telefono: '11-4523-0011',
    segmento: 'Regular', compras: 4, totalGastado: 68000, diasUltimaCompra: 18,
    canalPreferido: 'Instagram', categorias: ['Ropa casual'],
    historial: [
      { producto: 'Remera Básica x3', monto: 15000, fecha: '12/5' },
      { producto: 'Buzo Canguro',     monto: 30000, fecha: '19/6' },
    ],
    score: 52,
  },
  {
    id: 3, nombre: 'Ana Pérez', email: 'ana@hotmail.com', telefono: '11-9988-7766',
    segmento: 'En riesgo', compras: 7, totalGastado: 142000, diasUltimaCompra: 47,
    canalPreferido: 'MercadoLibre', categorias: ['Calzado', 'Accesorios'],
    historial: [
      { producto: 'Zapatillas Running Pro', monto: 42000, fecha: '21/5' },
      { producto: 'Mochila Urban',          monto: 30000, fecha: '22/5' },
    ],
    score: 38,
  },
  {
    id: 4, nombre: 'Carlos Méndez', email: 'carlos@gmail.com', telefono: '11-3310-5599',
    segmento: 'Inactivo', compras: 2, totalGastado: 29000, diasUltimaCompra: 94,
    canalPreferido: 'Tienda online', categorias: ['Ropa casual'],
    historial: [
      { producto: 'Remera Básica x2', monto: 10000, fecha: '5/4' },
      { producto: 'Buzo Canguro',     monto: 19000, fecha: '5/4' },
    ],
    score: 12,
  },
  {
    id: 5, nombre: 'Sofía Romero', email: 'sofia@gmail.com', telefono: '11-5544-3322',
    segmento: 'VIP', compras: 9, totalGastado: 198000, diasUltimaCompra: 7,
    canalPreferido: 'Instagram', categorias: ['Ropa deportiva', 'Calzado'],
    historial: [
      { producto: 'Campera Impermeable',     monto: 40000, fecha: '1/7'  },
      { producto: 'Zapatillas Running Pro', monto: 42000, fecha: '28/6' },
    ],
    score: 81,
  },
]

const SEGMENTOS: Segmento[] = ['VIP', 'Regular', 'En riesgo', 'Inactivo']

const SEGMENTO_COLOR: Record<Segmento, string> = {
  'VIP':       '#f5a623',
  'Regular':   '#306ECF',
  'En riesgo': '#e67e22',
  'Inactivo':  '#5A6871',
}

const SEGMENTO_SUGERENCIA: Record<Segmento, string> = {
  'VIP':       'Cliente de alto valor. Invitalo a un programa de fidelidad o acceso anticipado a nuevos productos.',
  'Regular':   'Cliente activo. Un descuento del 10% en su categoría preferida puede aumentar su frecuencia de compra.',
  'En riesgo': 'Sin compras hace más de 30 días. Enviá un cupón de reactivación antes de que se vaya a la competencia.',
  'Inactivo':  'Cliente perdido. Campaña de reactivación con descuento agresivo (20-30%) o dar de baja para no inflar la base.',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return Math.round(n).toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
}
function ticketPromedio(c: Cliente) {
  return Math.round(c.totalGastado / c.compras)
}
function statsSegmento(segmento: Segmento) {
  const clientes = CLIENTES.filter(c => c.segmento === segmento)
  const totalGastado = clientes.reduce((a, c) => a + c.totalGastado, 0)
  const totalCompras = clientes.reduce((a, c) => a + c.compras, 0)
  return {
    segmento,
    count: clientes.length,
    totalGastado,
    ticketPromedio: totalCompras ? Math.round(totalGastado / totalCompras) : 0,
  }
}
const SEGMENTO_STATS = SEGMENTOS.map(statsSegmento)
const MAX_SEGMENTO_TOTAL = Math.max(...SEGMENTO_STATS.map(s => s.totalGastado))

// ─── Splash ───────────────────────────────────────────────────────────────────

function Splash({ onBack, onEnter }: { onBack: () => void; onEnter: () => void }) {
  return (
    <div
      className="min-h-[480px] flex flex-col"
      style={{ background: 'linear-gradient(160deg, #1B5BC1 0%, #2a6fd4 50%, #45B5F3 100%)' }}
    >
      <div className="p-4">
        <button onClick={onBack}
          className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Volver
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8 pb-8">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl font-extrabold"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
          d
        </div>
        <div className="text-center">
          <p className="text-2xl font-extrabold text-white mb-1.5">
            <span style={{ color: '#56BCFA' }}>d</span>ataria
          </p>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.6)' }}>
            E-commerce · Clientes
          </p>
        </div>
        <button onClick={onEnter}
          className="px-8 py-3 bg-white text-azul-nucleo font-bold text-sm rounded-sm hover:bg-white/90 transition-colors shadow-soft">
          Ver herramienta
        </button>
      </div>
    </div>
  )
}

// ─── Topbar ───────────────────────────────────────────────────────────────────

function Topbar({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 shrink-0" style={{ backgroundColor: '#1B5BC1' }}>
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-xl shrink-0"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)', fontStyle: 'italic', lineHeight: 1 }}
        >
          d
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">dataria</p>
          <p className="text-[11px] leading-tight" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Panel de clientes
          </p>
        </div>
      </div>
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-medium transition-colors"
        style={{ color: 'rgba(255,255,255,0.7)' }}
        onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = '#fff')}
        onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.7)')}
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Inicio
      </button>
    </div>
  )
}

// ─── Tab bar ──────────────────────────────────────────────────────────────────

const TABS: { id: TabId; label: string }[] = [
  { id: 'clientes',  label: 'Clientes' },
  { id: 'segmentos', label: 'Segmentos' },
]

function TabBar({ tab, setTab }: { tab: TabId; setTab: (t: TabId) => void }) {
  return (
    <div style={{ backgroundColor: '#1B5BC1' }} className="flex shrink-0">
      {TABS.map(t => (
        <button key={t.id} onClick={() => setTab(t.id)}
          className={`px-5 py-2.5 text-sm font-semibold transition-all border-b-2 -mb-px ${
            tab === t.id ? 'text-white border-white' : 'text-white/45 border-transparent hover:text-white/70'
          }`}>
          {t.label}
        </button>
      ))}
    </div>
  )
}

// ─── Segment badge ────────────────────────────────────────────────────────────

function SegmentBadge({ segmento }: { segmento: Segmento }) {
  const color = SEGMENTO_COLOR[segmento]
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap"
      style={{ backgroundColor: `${color}1F`, color }}
    >
      {segmento}
    </span>
  )
}

// ─── Score bar ────────────────────────────────────────────────────────────────

function ScoreBar({ score }: { score: number }) {
  const color = score >= 70 ? '#16a34a' : score >= 40 ? '#d97706' : '#dc2626'
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 bg-[#EAF5FD] rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-bold tabular-nums" style={{ color }}>{score}</span>
    </div>
  )
}

// ─── Client detail modal ──────────────────────────────────────────────────────

function ClienteDetalleModal({ cliente, onClose }: { cliente: Cliente | null; onClose: () => void }) {
  if (!cliente) return null
  const scoreColor = cliente.score >= 70 ? '#16a34a' : cliente.score >= 40 ? '#d97706' : '#dc2626'

  return (
    <Modal open={!!cliente} onClose={onClose} title={cliente.nombre} maxWidth="max-w-2xl">
      <div className="space-y-5">
        {/* Header info */}
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div className="space-y-1">
            <p className="text-sm text-[#5A6871]">{cliente.email} · {cliente.telefono}</p>
            <SegmentBadge segmento={cliente.segmento} />
          </div>
          <div className="text-right">
            <p className="text-xs text-[#5A6871] mb-1">Score de fidelidad</p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-28 bg-[#EAF5FD] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${cliente.score}%`, backgroundColor: scoreColor }} />
              </div>
              <span className="text-sm font-extrabold tabular-nums" style={{ color: scoreColor }}>{cliente.score}/100</span>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#F3F6F5] rounded-lg p-3">
            <p className="text-[11px] text-[#5A6871] mb-1">Total compras</p>
            <p className="text-lg font-extrabold text-[#353C42]">{cliente.compras}</p>
          </div>
          <div className="bg-[#F3F6F5] rounded-lg p-3">
            <p className="text-[11px] text-[#5A6871] mb-1">Total gastado</p>
            <p className="text-lg font-extrabold text-[#353C42]">{fmt(cliente.totalGastado)}</p>
          </div>
          <div className="bg-[#F3F6F5] rounded-lg p-3">
            <p className="text-[11px] text-[#5A6871] mb-1">Ticket promedio</p>
            <p className="text-lg font-extrabold text-[#353C42]">{fmt(ticketPromedio(cliente))}</p>
          </div>
          <div className="bg-[#F3F6F5] rounded-lg p-3">
            <p className="text-[11px] text-[#5A6871] mb-1">Última compra</p>
            <p className="text-lg font-extrabold text-[#353C42]">hace {cliente.diasUltimaCompra}d</p>
          </div>
        </div>

        {/* Channel & categories */}
        <div>
          <p className="text-xs font-semibold text-[#353C42] mb-2">Canal y categorías preferidas</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ backgroundColor: '#EAF5FD', color: '#1B5BC1' }}>
              {cliente.canalPreferido}
            </span>
            {cliente.categorias.map(cat => (
              <span key={cat} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#F3F6F5] text-[#5A6871]">
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Purchase history */}
        <div>
          <p className="text-xs font-semibold text-[#353C42] mb-2">Historial de compras</p>
          <div className="border border-[#DCE5E9] rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F3F6F5] text-left text-[11px] uppercase tracking-wide text-[#5A6871]">
                  <th className="py-2 px-3 font-semibold">Producto</th>
                  <th className="py-2 px-3 font-semibold text-right">Monto</th>
                  <th className="py-2 px-3 font-semibold text-right">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {cliente.historial.map((h, i) => (
                  <tr key={i} className="border-t border-[#DCE5E9]">
                    <td className="py-2 px-3 text-[#353C42]">{h.producto}</td>
                    <td className="py-2 px-3 text-right tabular-nums font-semibold text-[#1B5BC1]">{fmt(h.monto)}</td>
                    <td className="py-2 px-3 text-right text-[#5A6871]">{h.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Marketing suggestion */}
        <div className="rounded-xl p-4 text-white" style={{ background: 'linear-gradient(135deg, #1B5BC1, #45B5F3)' }}>
          <div className="flex items-start gap-3">
            <div className="shrink-0 mt-0.5 opacity-90">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Sugerencia de acción de marketing
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.93)' }}>
                {SEGMENTO_SUGERENCIA[cliente.segmento]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

// ─── Tab: Clientes ────────────────────────────────────────────────────────────

const FILTROS: (Segmento | 'Todos')[] = ['Todos', 'VIP', 'Regular', 'En riesgo', 'Inactivo']

function ClientesTab() {
  const [search, setSearch] = useState('')
  const [filtro, setFiltro] = useState<Segmento | 'Todos'>('Todos')
  const [seleccionado, setSeleccionado] = useState<Cliente | null>(null)

  const filtrados = CLIENTES.filter(c => {
    const matchSearch = c.nombre.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
    const matchFiltro = filtro === 'Todos' || c.segmento === filtro
    return matchSearch && matchFiltro
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nombre o email..."
          className="flex-1 bg-white border border-[#DCE5E9] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#306ECF]"
        />
        <div className="flex flex-wrap gap-1.5">
          {FILTROS.map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
              style={{
                backgroundColor: filtro === f ? '#306ECF' : '#EAF5FD',
                color: filtro === f ? '#fff' : '#1B5BC1',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#DCE5E9] shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wide text-[#5A6871] bg-[#F3F6F5]">
              <th className="py-2.5 px-4 font-semibold">Nombre</th>
              <th className="py-2.5 px-4 font-semibold">Segmento</th>
              <th className="py-2.5 px-4 font-semibold text-right">Compras</th>
              <th className="py-2.5 px-4 font-semibold text-right">Total gastado</th>
              <th className="py-2.5 px-4 font-semibold text-right">Última compra</th>
              <th className="py-2.5 px-4 font-semibold">Score</th>
              <th className="py-2.5 px-4 font-semibold text-right"></th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map(c => (
              <tr key={c.id} className="border-t border-[#DCE5E9]">
                <td className="py-3 px-4">
                  <p className="font-semibold text-[#353C42]">{c.nombre}</p>
                  <p className="text-xs text-[#5A6871]">{c.email}</p>
                </td>
                <td className="py-3 px-4"><SegmentBadge segmento={c.segmento} /></td>
                <td className="py-3 px-4 text-right tabular-nums text-[#353C42]">{c.compras}</td>
                <td className="py-3 px-4 text-right tabular-nums font-bold text-[#1B5BC1]">{fmt(c.totalGastado)}</td>
                <td className="py-3 px-4 text-right text-[#5A6871]">hace {c.diasUltimaCompra}d</td>
                <td className="py-3 px-4"><ScoreBar score={c.score} /></td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => setSeleccionado(c)}
                    className="text-xs font-bold uppercase tracking-wide text-[#306ECF] hover:opacity-70 transition-opacity"
                  >
                    Ver detalle
                  </button>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-sm text-[#5A6871]">No se encontraron clientes.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ClienteDetalleModal cliente={seleccionado} onClose={() => setSeleccionado(null)} />
    </div>
  )
}

// ─── Tab: Segmentos ───────────────────────────────────────────────────────────

function SegmentosTab() {
  const [toast, setToast] = useState<string | null>(null)

  const simularCampana = (s: typeof SEGMENTO_STATS[number]) => {
    setToast(`Campaña lista para enviar a ${s.count} cliente${s.count === 1 ? '' : 's'} del segmento ${s.segmento}.`)
    setTimeout(() => setToast(null), 3200)
  }

  return (
    <div className="space-y-4 relative">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {SEGMENTO_STATS.map(s => (
          <div key={s.segmento} className="bg-white rounded-xl border border-[#DCE5E9] p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: SEGMENTO_COLOR[s.segmento] }} />
              <p className="text-xs font-bold text-[#353C42]">{s.segmento}</p>
            </div>
            <p className="text-lg font-extrabold text-[#353C42]">{s.count} cliente{s.count === 1 ? '' : 's'}</p>
            <p className="text-xs text-[#5A6871] mt-1">{fmt(s.totalGastado)} total</p>
            <p className="text-xs text-[#5A6871]">Ticket prom. {fmt(s.ticketPromedio)}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#DCE5E9] p-4 shadow-sm">
        <p className="text-sm font-semibold text-[#353C42] mb-4">Distribución por segmento</p>
        <div className="space-y-4">
          {SEGMENTO_STATS.map(s => (
            <div key={s.segmento}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-[#353C42]">{s.segmento} · {s.count} cliente{s.count === 1 ? '' : 's'}</span>
                <span className="text-xs font-bold tabular-nums" style={{ color: SEGMENTO_COLOR[s.segmento] }}>{fmt(s.totalGastado)}</span>
              </div>
              <div className="h-3 bg-[#EAF5FD] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(s.totalGastado / MAX_SEGMENTO_TOTAL) * 100}%`, backgroundColor: SEGMENTO_COLOR[s.segmento] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#DCE5E9] p-4 shadow-sm">
        <p className="text-sm font-semibold text-[#353C42] mb-4">Acciones de marketing sugeridas</p>
        <div className="space-y-3">
          {SEGMENTO_STATS.map(s => (
            <div key={s.segmento} className="flex items-start justify-between gap-4 rounded-lg p-3" style={{ backgroundColor: '#F3F6F5' }}>
              <div className="flex items-start gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: SEGMENTO_COLOR[s.segmento] }} />
                <div>
                  <p className="text-xs font-bold text-[#353C42] mb-0.5">{s.segmento}</p>
                  <p className="text-xs text-[#5A6871] leading-relaxed">{SEGMENTO_SUGERENCIA[s.segmento]}</p>
                </div>
              </div>
              <button
                onClick={() => simularCampana(s)}
                className="shrink-0 inline-flex items-center justify-center h-8 px-4 rounded-lg text-white font-bold tracking-[0.03em] uppercase text-[11px] transition-opacity hover:opacity-85"
                style={{ backgroundColor: '#306ECF' }}
              >
                Simular campaña
              </button>
            </div>
          ))}
        </div>
      </div>

      {toast && (
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white shadow-lg z-10 max-w-[90%] text-center"
          style={{ backgroundColor: '#353C42' }}
        >
          {toast}
        </div>
      )}
    </div>
  )
}

// ─── Main panel ───────────────────────────────────────────────────────────────

function MainPanel({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<TabId>('clientes')

  return (
    <div className="flex flex-col min-h-[480px]">
      <Topbar onBack={onBack} />
      <TabBar tab={tab} setTab={setTab} />
      <div className="flex-1 overflow-auto p-4" style={{ backgroundColor: '#F3F6F5' }}>
        {tab === 'clientes' ? <ClientesTab /> : <SegmentosTab />}
      </div>
    </div>
  )
}

// ─── Root export ──────────────────────────────────────────────────────────────

export default function ClientesDemo({ onBack }: { onBack: () => void }) {
  const [screen, setScreen] = useState<Screen>('splash')
  if (screen === 'splash') return <Splash onBack={onBack} onEnter={() => setScreen('main')} />
  return <MainPanel onBack={() => setScreen('splash')} />
}
