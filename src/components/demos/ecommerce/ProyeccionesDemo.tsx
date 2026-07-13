'use client'

import { useState } from 'react'
import Image from 'next/image'

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen  = 'splash' | 'main'
type TabId   = 'ventas' | 'proyecciones'
type Periodo = 'hoy' | 'semana' | 'mes'

// ─── Data ─────────────────────────────────────────────────────────────────────

const DIAS_MES = 30
const OBJETIVO_MENSUAL = 28000000

const VENTAS_DIAS = [
  820000, 945000, 712000, 1180000, 1340000, 1620000, 980000,
  1050000, 890000, 1420000, 1580000, 1100000, 760000, 1290000,
  1450000, 1710000, 930000, 1060000,
]
const DIA_ACTUAL = VENTAS_DIAS.length // 18
const DIAS_RESTANTES = DIAS_MES - DIA_ACTUAL

const ACUMULADO = VENTAS_DIAS.reduce((a, b) => a + b, 0)
const PROMEDIO_DIARIO = ACUMULADO / DIA_ACTUAL
const PROYECCION_CIERRE = PROMEDIO_DIARIO * DIAS_MES
const PCT_OBJETIVO = (ACUMULADO / OBJETIVO_MENSUAL) * 100
const OBJETIVO_DIARIO = OBJETIVO_MENSUAL / DIAS_MES
const DIF_PROYECCION_PCT = ((PROYECCION_CIERRE - OBJETIVO_MENSUAL) / OBJETIVO_MENSUAL) * 100

const ULTIMOS_7 = VENTAS_DIAS.slice(-7)
const ACUMULADO_ULTIMOS_7 = ULTIMOS_7.reduce((a, b) => a + b, 0)
const PROMEDIO_ULTIMOS_7 = ACUMULADO_ULTIMOS_7 / ULTIMOS_7.length

const PRODUCTOS = [
  { nombre: 'Zapatillas Running Pro', unidades: 84,  ingresos: 1260000 },
  { nombre: 'Mochila Urban 20L',      unidades: 61,  ingresos: 915000  },
  { nombre: 'Campera Impermeable',    unidades: 47,  ingresos: 940000  },
  { nombre: 'Remera Básica Algodón',  unidades: 112, ingresos: 560000  },
  { nombre: 'Buzo Canguro',           unidades: 39,  ingresos: 585000  },
]
const MAX_UNIDADES = Math.max(...PRODUCTOS.map(p => p.unidades))

const CANALES = [
  { nombre: 'Tienda online', pct: 62, color: '#1B5BC1' },
  { nombre: 'Instagram',     pct: 24, color: '#306ECF' },
  { nombre: 'MercadoLibre',  pct: 14, color: '#45B5F3' },
]

const NUEVOS = 156
const RECURRENTES = 98
const TOTAL_CLIENTES = NUEVOS + RECURRENTES
const PCT_NUEVOS = Math.round((NUEVOS / TOTAL_CLIENTES) * 100)

const PEDIDOS_MES    = 280
const PEDIDOS_SEMANA = Math.round(PEDIDOS_MES * 7 / DIAS_MES)
const PEDIDOS_DIA    = Math.round(PEDIDOS_MES / DIAS_MES)

// Mejor / peor semana: ventana de 7 días consecutivos con mayor / menor venta
function calcularSemanas() {
  let mejor = { inicio: 0, total: -Infinity }
  let peor  = { inicio: 0, total: Infinity }
  for (let i = 0; i <= VENTAS_DIAS.length - 7; i++) {
    const total = VENTAS_DIAS.slice(i, i + 7).reduce((a, b) => a + b, 0)
    if (total > mejor.total) mejor = { inicio: i, total }
    if (total < peor.total)  peor  = { inicio: i, total }
  }
  return { mejor, peor }
}
const { mejor: MEJOR_SEMANA, peor: PEOR_SEMANA } = calcularSemanas()

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return Math.round(n).toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
}
function fmtShort(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
  return `$${Math.round(n / 1000)}K`
}
function datosPeriodo(periodo: Periodo) {
  if (periodo === 'hoy') {
    return {
      data: [VENTAS_DIAS[DIA_ACTUAL - 1]],
      labels: [`Día ${DIA_ACTUAL}`],
      total: VENTAS_DIAS[DIA_ACTUAL - 1],
      pedidos: PEDIDOS_DIA,
    }
  }
  if (periodo === 'semana') {
    return {
      data: ULTIMOS_7,
      labels: ULTIMOS_7.map((_, i) => `${DIA_ACTUAL - 6 + i}`),
      total: ACUMULADO_ULTIMOS_7,
      pedidos: PEDIDOS_SEMANA,
    }
  }
  return {
    data: VENTAS_DIAS,
    labels: VENTAS_DIAS.map((_, i) => `${i + 1}`),
    total: ACUMULADO,
    pedidos: PEDIDOS_MES,
  }
}

// ─── Splash ───────────────────────────────────────────────────────────────────

function Splash({ onBack, onEnter }: { onBack: () => void; onEnter: () => void }) {
  return (
    <div
      className="min-h-[560px] flex flex-col"
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
        <div className="w-20 h-20 rounded-2xl bg-white shadow-soft p-3 flex items-center justify-center">
          <Image src="/isologo-dataria.png" alt="Dataria" width={64} height={64} className="w-full h-full object-contain" />
        </div>
        <div className="text-center">
          <p className="text-2xl font-extrabold text-white mb-1.5">
            <span style={{ color: '#56BCFA' }}>d</span>ataria
          </p>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.6)' }}>
            E-commerce · Proyecciones
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
    <div style={{ backgroundColor: '#1B5BC1' }} className="flex items-center justify-between px-5 py-3 shrink-0">
      <div className="flex items-center gap-2.5">
        <span className="font-extrabold text-lg text-white leading-none">
          <span style={{ color: '#56BCFA' }}>d</span>ataria
        </span>
        <span className="text-white/40 text-sm">·</span>
        <span className="text-white/75 text-sm">E-commerce · Proyecciones de ventas</span>
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

// ─── Tab bar ──────────────────────────────────────────────────────────────────

const TABS: { id: TabId; label: string }[] = [
  { id: 'ventas',       label: 'Ventas' },
  { id: 'proyecciones', label: 'Proyecciones' },
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

// ─── KPI card ─────────────────────────────────────────────────────────────────

function KpiCard({ label, value, sub, subColor }: { label: string; value: string; sub?: string; subColor?: string }) {
  return (
    <div className="bg-white rounded-xl border border-[#DCE5E9] p-4 shadow-sm">
      <p className="text-xs text-[#5A6871] mb-1.5">{label}</p>
      <p className="text-xl font-extrabold text-[#353C42] leading-tight">{value}</p>
      {sub && (
        <p className="text-xs mt-1.5 leading-snug" style={{ color: subColor ?? '#5A6871' }}>{sub}</p>
      )}
    </div>
  )
}

// ─── Period selector ──────────────────────────────────────────────────────────

const PERIODOS: { id: Periodo; label: string }[] = [
  { id: 'hoy',    label: 'Hoy' },
  { id: 'semana', label: 'Esta semana' },
  { id: 'mes',    label: 'Este mes' },
]

function PeriodoSelector({ periodo, setPeriodo }: { periodo: Periodo; setPeriodo: (p: Periodo) => void }) {
  return (
    <div className="inline-flex rounded-lg p-1 gap-1" style={{ backgroundColor: '#EAF5FD' }}>
      {PERIODOS.map(p => (
        <button
          key={p.id}
          onClick={() => setPeriodo(p.id)}
          className="px-4 py-1.5 rounded-md text-xs font-semibold transition-colors"
          style={{
            backgroundColor: periodo === p.id ? '#306ECF' : 'transparent',
            color: periodo === p.id ? '#fff' : '#5A6871',
          }}
        >
          {p.label}
        </button>
      ))}
    </div>
  )
}

// ─── Bar chart (ventas por período) ────────────────────────────────────────────

function BarChart({ data, labels }: { data: number[]; labels: string[] }) {
  const CW = 560, CH = 200
  const PL = 52, PR = 16, PT = 24, PB = 32
  const PW = CW - PL - PR
  const PH = CH - PT - PB
  const maxVal = Math.max(...data)
  const cap = maxVal * 1.2
  const idxMax = data.indexOf(maxVal)
  const slotW = PW / data.length
  const barW = Math.min(slotW * 0.58, 56)
  const yTicks = [0, cap * 0.33, cap * 0.66, cap]

  return (
    <div className="bg-white rounded-xl border border-[#DCE5E9] p-4 shadow-sm">
      <p className="text-sm font-semibold text-[#353C42] mb-1">Ventas diarias del período</p>
      <p className="text-xs text-[#5A6871] mb-4">Pesos argentinos (ARS)</p>
      <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full" style={{ maxHeight: 220 }}>
        {yTicks.map(v => {
          const y = PT + (1 - v / cap) * PH
          return (
            <g key={v}>
              <line x1={PL} y1={y} x2={CW - PR} y2={y} stroke="#DCE5E9" strokeWidth={1} strokeDasharray="4 3" />
              <text x={PL - 6} y={y + 4} textAnchor="end" fontSize={10} fill="#5A6871">{fmtShort(v)}</text>
            </g>
          )
        })}
        {data.map((v, i) => {
          const x = PL + i * slotW + (slotW - barW) / 2
          const barH = (v / cap) * PH
          const y = PT + PH - barH
          const isMax = i === idxMax
          return (
            <g key={i}>
              <rect x={x} y={y} width={barW} height={barH} rx={4}
                fill={isMax ? '#1B5BC1' : '#306ECF'} opacity={isMax ? 1 : 0.62} />
              {isMax && (
                <text x={x + barW / 2} y={y - 7} textAnchor="middle" fontSize={9.5} fontWeight="700" fill="#1B5BC1">
                  {fmt(v)}
                </text>
              )}
              <text x={x + barW / 2} y={PT + PH + 18} textAnchor="middle" fontSize={10}
                fill={isMax ? '#1B5BC1' : '#5A6871'} fontWeight={isMax ? '700' : '400'}>
                {labels[i]}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ─── Products table ───────────────────────────────────────────────────────────

function ProductosTable() {
  return (
    <div className="bg-white rounded-xl border border-[#DCE5E9] p-4 shadow-sm">
      <p className="text-sm font-semibold text-[#353C42] mb-4">Top 5 productos</p>
      <div className="space-y-3.5">
        {PRODUCTOS.map((p, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[11px] font-bold text-[#5A6871] w-4 shrink-0 text-center">{i + 1}</span>
                <span className="text-xs font-semibold text-[#353C42] truncate">{p.nombre}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-2">
                <span className="text-xs text-[#5A6871]">{p.unidades} u.</span>
                <span className="text-xs font-bold text-[#1B5BC1] tabular-nums">{fmt(p.ingresos)}</span>
              </div>
            </div>
            <div className="h-1.5 bg-[#EAF5FD] rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{
                width: `${(p.unidades / MAX_UNIDADES) * 100}%`,
                backgroundColor: '#306ECF',
                opacity: 0.45 + (p.unidades / MAX_UNIDADES) * 0.55,
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Channels ─────────────────────────────────────────────────────────────────

function CanalesChart() {
  return (
    <div className="bg-white rounded-xl border border-[#DCE5E9] p-4 shadow-sm">
      <p className="text-sm font-semibold text-[#353C42] mb-4">Ventas por canal</p>
      <div className="space-y-4">
        {CANALES.map(c => (
          <div key={c.nombre}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-[#353C42]">{c.nombre}</span>
              <span className="text-xs font-bold tabular-nums" style={{ color: c.color }}>{c.pct}%</span>
            </div>
            <div className="h-2.5 bg-[#EAF5FD] rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${c.pct}%`, backgroundColor: c.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── New vs recurring customers ────────────────────────────────────────────────

function ClientesSection() {
  return (
    <div className="bg-white rounded-xl border border-[#DCE5E9] p-4 shadow-sm">
      <p className="text-sm font-semibold text-[#353C42] mb-4">Clientes nuevos vs. recurrentes</p>
      <div className="flex gap-3 mb-4">
        <div className="flex-1 rounded-lg p-3 text-center" style={{ backgroundColor: '#EAF5FD' }}>
          <p className="text-2xl font-extrabold text-[#1B5BC1]">{NUEVOS}</p>
          <p className="text-xs text-[#5A6871] mt-0.5">Nuevos ({PCT_NUEVOS}%)</p>
        </div>
        <div className="flex-1 rounded-lg p-3 text-center" style={{ backgroundColor: '#F3F6F5' }}>
          <p className="text-2xl font-extrabold text-[#353C42]">{RECURRENTES}</p>
          <p className="text-xs text-[#5A6871] mt-0.5">Recurrentes ({100 - PCT_NUEVOS}%)</p>
        </div>
      </div>
      <div className="flex h-3 rounded-full overflow-hidden">
        <div style={{ width: `${PCT_NUEVOS}%`, backgroundColor: '#1B5BC1' }} />
        <div style={{ width: `${100 - PCT_NUEVOS}%`, backgroundColor: '#DCE5E9' }} />
      </div>
    </div>
  )
}

// ─── Insight card ─────────────────────────────────────────────────────────────

function InsightCard() {
  return (
    <div className="rounded-xl p-5 text-white" style={{ background: 'linear-gradient(135deg, #1B5BC1, #45B5F3)' }}>
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5 opacity-90">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
          </svg>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Insight de Dataria
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.93)' }}>
            💡 El sábado pasado tus ventas superaron en un 38% el promedio diario. El producto que más impulsó ese pico
            fue <strong>Zapatillas Running Pro</strong>. Considerá reforzar stock para este fin de semana.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Tab: Ventas ──────────────────────────────────────────────────────────────

function VentasTab() {
  const [periodo, setPeriodo] = useState<Periodo>('mes')
  const { data, labels, total, pedidos } = datosPeriodo(periodo)
  const ticketPromedio = total / pedidos

  return (
    <div className="space-y-4">
      <PeriodoSelector periodo={periodo} setPeriodo={setPeriodo} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard label="Ventas del período" value={fmt(total)} />
        <KpiCard label="Ticket promedio" value={fmt(ticketPromedio)} sub={`${pedidos} pedidos en el período`} />
        <KpiCard label="Pedidos" value={`${pedidos}`} />
        <KpiCard label="Conversión" value="3.4%" sub="↑ +0.6% vs período anterior" subColor="#16a34a" />
      </div>

      <BarChart data={data} labels={labels} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProductosTable />
        <CanalesChart />
      </div>

      <ClientesSection />

      <InsightCard />
    </div>
  )
}

// ─── Objetivo progress ──────────────────────────────────────────────────────

function ObjetivoProgress() {
  const pct = Math.min(PCT_OBJETIVO, 100)
  const superaObjetivo = DIF_PROYECCION_PCT >= 0

  return (
    <div className="bg-white rounded-xl border border-[#DCE5E9] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-[#353C42]">Objetivo mensual</p>
        <p className="text-xs font-bold tabular-nums" style={{ color: '#1B5BC1' }}>{PCT_OBJETIVO.toFixed(1)}%</p>
      </div>
      <div className="h-3 bg-[#EAF5FD] rounded-full overflow-hidden mb-3">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: '#306ECF' }} />
      </div>
      <div className="flex items-center justify-between text-xs text-[#5A6871] mb-4">
        <span>Acumulado: <strong className="text-[#353C42]">{fmt(ACUMULADO)}</strong></span>
        <span>Objetivo: <strong className="text-[#353C42]">{fmt(OBJETIVO_MENSUAL)}</strong></span>
      </div>
      <div className="flex items-center justify-between text-xs text-[#5A6871] mb-4">
        <span>Días transcurridos: <strong className="text-[#353C42]">{DIA_ACTUAL}</strong></span>
        <span>Días restantes: <strong className="text-[#353C42]">{DIAS_RESTANTES}</strong></span>
      </div>
      <div className="rounded-lg p-3 text-sm font-medium" style={{
        backgroundColor: superaObjetivo ? '#EAF5FD' : '#FDECEC',
        color: superaObjetivo ? '#1B5BC1' : '#C0392B',
      }}>
        {superaObjetivo
          ? `✅ Vas camino a superar el objetivo mensual en un ${DIF_PROYECCION_PCT.toFixed(0)}% (proyección: ${fmt(PROYECCION_CIERRE)})`
          : `⚠️ Proyectás cerrar un ${Math.abs(DIF_PROYECCION_PCT).toFixed(0)}% por debajo del objetivo mensual (proyección: ${fmt(PROYECCION_CIERRE)})`}
      </div>
    </div>
  )
}

// ─── Line chart (real + proyección) ────────────────────────────────────────────

function ProyeccionLineChart() {
  const CW = 640, CH = 220
  const PL = 56, PR = 16, PT = 20, PB = 28
  const PW = CW - PL - PR
  const PH = CH - PT - PB
  const maxVal = Math.max(...VENTAS_DIAS, PROMEDIO_ULTIMOS_7, OBJETIVO_DIARIO) * 1.15

  const x = (day: number) => PL + ((day - 1) / (DIAS_MES - 1)) * PW
  const y = (val: number) => PT + PH - (val / maxVal) * PH

  const realPoints = VENTAS_DIAS.map((v, i) => `${x(i + 1)},${y(v)}`).join(' ')

  const projDays = Array.from({ length: DIAS_MES - DIA_ACTUAL + 1 }, (_, i) => DIA_ACTUAL + i)
  const projPoints = projDays
    .map(d => `${x(d)},${y(d === DIA_ACTUAL ? VENTAS_DIAS[DIA_ACTUAL - 1] : PROMEDIO_ULTIMOS_7)}`)
    .join(' ')

  const objY = y(OBJETIVO_DIARIO)
  const xTicks = [1, 5, 10, 15, 18, 20, 25, 30]

  return (
    <div className="bg-white rounded-xl border border-[#DCE5E9] p-4 shadow-sm">
      <p className="text-sm font-semibold text-[#353C42] mb-1">Ventas reales y proyección — días 1 a 30</p>
      <p className="text-xs text-[#5A6871] mb-4">Pesos argentinos (ARS)</p>
      <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full" style={{ maxHeight: 240 }}>
        <line x1={PL} y1={objY} x2={CW - PR} y2={objY} stroke="#E14B4B" strokeWidth={1.5} strokeDasharray="5 4" />
        <text x={CW - PR} y={objY - 6} textAnchor="end" fontSize={10} fontWeight="700" fill="#E14B4B">
          Objetivo diario: {fmtShort(OBJETIVO_DIARIO)}
        </text>

        <polyline points={realPoints} fill="none" stroke="#306ECF" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
        <polyline points={projPoints} fill="none" stroke="#45B5F3" strokeWidth={2.5} strokeDasharray="6 4" strokeLinejoin="round" strokeLinecap="round" />

        {VENTAS_DIAS.map((v, i) => (
          <circle key={i} cx={x(i + 1)} cy={y(v)} r={2.2} fill="#306ECF" />
        ))}

        {xTicks.map(d => (
          <text key={d} x={x(d)} y={CH - 6} textAnchor="middle" fontSize={9.5} fill="#5A6871">{d}</text>
        ))}
      </svg>
      <div className="flex flex-wrap gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 rounded-full" style={{ backgroundColor: '#306ECF' }} />
          <span className="text-[11px] text-[#5A6871]">Ventas reales</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 rounded-full" style={{ backgroundColor: '#45B5F3' }} />
          <span className="text-[11px] text-[#5A6871]">Proyección</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 rounded-full" style={{ backgroundColor: '#E14B4B' }} />
          <span className="text-[11px] text-[#5A6871]">Objetivo diario</span>
        </div>
      </div>
    </div>
  )
}

// ─── Best / worst week ────────────────────────────────────────────────────────

function SemanasCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-xl border border-[#DCE5E9] p-4 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#16a34a' }}>Mejor semana</p>
        <p className="text-sm text-[#5A6871] mb-1">Días {MEJOR_SEMANA.inicio + 1} al {MEJOR_SEMANA.inicio + 7}</p>
        <p className="text-xl font-extrabold text-[#353C42]">{fmt(MEJOR_SEMANA.total)}</p>
      </div>
      <div className="bg-white rounded-xl border border-[#DCE5E9] p-4 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#C0392B' }}>Peor semana</p>
        <p className="text-sm text-[#5A6871] mb-1">Días {PEOR_SEMANA.inicio + 1} al {PEOR_SEMANA.inicio + 7}</p>
        <p className="text-xl font-extrabold text-[#353C42]">{fmt(PEOR_SEMANA.total)}</p>
      </div>
    </div>
  )
}

// ─── Channel projection table ───────────────────────────────────────────────

function CanalProyeccionTable() {
  return (
    <div className="bg-white rounded-xl border border-[#DCE5E9] p-4 shadow-sm overflow-x-auto">
      <p className="text-sm font-semibold text-[#353C42] mb-4">Proyección por canal</p>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wide text-[#5A6871]">
            <th className="pb-2 font-semibold">Canal</th>
            <th className="pb-2 font-semibold text-right">Ventas actuales</th>
            <th className="pb-2 font-semibold text-right">Proyección al cierre</th>
            <th className="pb-2 font-semibold text-right">% del objetivo</th>
          </tr>
        </thead>
        <tbody>
          {CANALES.map(c => {
            const ventasActuales = ACUMULADO * (c.pct / 100)
            const proyeccionCierre = PROYECCION_CIERRE * (c.pct / 100)
            const objetivoCanal = OBJETIVO_MENSUAL * (c.pct / 100)
            const pctObjetivo = (proyeccionCierre / objetivoCanal) * 100
            return (
              <tr key={c.nombre} className="border-t border-[#DCE5E9]">
                <td className="py-2.5">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#353C42]">
                    <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: c.color }} />
                    {c.nombre}
                  </span>
                </td>
                <td className="py-2.5 text-right tabular-nums text-[#353C42]">{fmt(ventasActuales)}</td>
                <td className="py-2.5 text-right tabular-nums font-bold" style={{ color: c.color }}>{fmt(proyeccionCierre)}</td>
                <td className="py-2.5 text-right tabular-nums font-semibold text-[#353C42]">{pctObjetivo.toFixed(0)}%</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ─── Tab: Proyecciones ────────────────────────────────────────────────────────

function ProyeccionesTab() {
  return (
    <div className="space-y-4">
      <ObjetivoProgress />
      <ProyeccionLineChart />
      <SemanasCards />
      <CanalProyeccionTable />
    </div>
  )
}

// ─── Main panel ───────────────────────────────────────────────────────────────

function MainPanel({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<TabId>('ventas')

  return (
    <div className="flex flex-col min-h-[560px]">
      <Topbar onBack={onBack} />
      <TabBar tab={tab} setTab={setTab} />
      <div className="flex-1 overflow-auto p-4" style={{ backgroundColor: '#F3F6F5' }}>
        {tab === 'ventas' ? <VentasTab /> : <ProyeccionesTab />}
      </div>
    </div>
  )
}

// ─── Root export ──────────────────────────────────────────────────────────────

export default function ProyeccionesDemo({ onBack }: { onBack: () => void }) {
  const [screen, setScreen] = useState<Screen>('splash')
  if (screen === 'splash') return <Splash onBack={onBack} onEnter={() => setScreen('main')} />
  return <MainPanel onBack={() => setScreen('splash')} />
}
