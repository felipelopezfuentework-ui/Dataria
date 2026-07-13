'use client'

import { useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = 'splash' | 'tool'

// ─── Data ─────────────────────────────────────────────────────────────────────

const DIAS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const VENTAS_DIAS = [820000, 945000, 712000, 1180000, 1340000, 1620000, 980000]
const TOTAL_VENTAS = VENTAS_DIAS.reduce((a, b) => a + b, 0)
const PEDIDOS = 280
const TICKET_PROMEDIO = Math.round(TOTAL_VENTAS / PEDIDOS)
const MAX_VENTA = Math.max(...VENTAS_DIAS)
const IDX_MAX = VENTAS_DIAS.indexOf(MAX_VENTA)

const PRODUCTOS = [
  { nombre: 'Zapatillas Running Pro',   unidades: 84,  ingresos: 1260000 },
  { nombre: 'Mochila Urban 20L',        unidades: 61,  ingresos: 915000  },
  { nombre: 'Campera Impermeable',      unidades: 47,  ingresos: 940000  },
  { nombre: 'Remera Básica Algodón',    unidades: 112, ingresos: 560000  },
  { nombre: 'Buzo Canguro',            unidades: 39,  ingresos: 585000  },
]

const MAX_UNIDADES = Math.max(...PRODUCTOS.map(p => p.unidades))

const CANALES = [
  { nombre: 'Tienda online',  pct: 62, color: '#1B5BC1' },
  { nombre: 'Instagram',      pct: 24, color: '#306ECF' },
  { nombre: 'MercadoLibre',  pct: 14, color: '#45B5F3' },
]

const NUEVOS = 156
const RECURRENTES = 98
const TOTAL_CLIENTES = NUEVOS + RECURRENTES
const PCT_NUEVOS = Math.round((NUEVOS / TOTAL_CLIENTES) * 100)

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 })
}

// ─── Splash ───────────────────────────────────────────────────────────────────

function Splash({ onBack, onStart }: { onBack: () => void; onStart: () => void }) {
  return (
    <div
      className="relative flex flex-col overflow-hidden"
      style={{
        minHeight: 520,
        background: 'linear-gradient(140deg, #0A1829 0%, #0F2847 45%, #0A1E35 100%)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(48,110,207,0.18) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />
      <div className="relative p-5">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ color: 'rgba(255,255,255,0.6)' }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = '#fff')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)')}
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Volver
        </button>
      </div>
      <div className="relative flex-1 flex flex-col items-center justify-center gap-6 text-center px-8 pb-10">
        <div>
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-black text-4xl mx-auto mb-2"
            style={{ backgroundColor: '#306ECF', fontStyle: 'italic', letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            d
          </div>
          <p className="text-white font-bold text-lg" style={{ letterSpacing: '0.06em' }}>dataria</p>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: '#5B9BF5' }}>
            E-commerce · Ventas
          </p>
          <h2 className="text-3xl font-bold text-white mb-3">Panel de ventas</h2>
          <p className="text-sm max-w-xs mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Visualizá tus métricas de ventas, productos destacados y rendimiento por canal en tiempo real.
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
        <span className="text-white/75 text-sm">E-commerce · Ventas</span>
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

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KpiCard({
  label, value, sub, subColor,
}: { label: string; value: string; sub?: string; subColor?: string }) {
  return (
    <div className="bg-white rounded-xl border border-[#DCE5E9] p-4 shadow-sm">
      <p className="text-xs text-[#5A6871] mb-1.5">{label}</p>
      <p className="text-xl font-extrabold text-[#353C42] leading-tight">{value}</p>
      {sub && (
        <p className="text-xs mt-1.5 leading-snug" style={{ color: subColor ?? '#5A6871' }}>
          {sub}
        </p>
      )}
    </div>
  )
}

// ─── Bar Chart ────────────────────────────────────────────────────────────────

const CW = 560, CH = 200
const PL = 52, PR = 16, PT = 20, PB = 36
const PW = CW - PL - PR
const PH = CH - PT - PB
const CHART_CAP = 1800000
const Y_TICKS = [0, 400000, 800000, 1200000, 1600000]

function BarChart() {
  const slotW = PW / VENTAS_DIAS.length
  const barW = slotW * 0.58

  return (
    <div className="bg-white rounded-xl border border-[#DCE5E9] p-4 shadow-sm">
      <p className="text-sm font-semibold text-[#353C42] mb-1">Evolución de ventas — últimos 7 días</p>
      <p className="text-xs text-[#5A6871] mb-4">Pesos argentinos (ARS)</p>
      <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full" style={{ maxHeight: 220 }}>
        {Y_TICKS.map((v) => {
          const y = PT + (1 - v / CHART_CAP) * PH
          const label = v === 0 ? '$0' : v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}K`
          return (
            <g key={v}>
              <line x1={PL} y1={y} x2={CW - PR} y2={y} stroke="#DCE5E9" strokeWidth={1} strokeDasharray="4 3" />
              <text x={PL - 6} y={y + 4} textAnchor="end" fontSize={10} fill="#5A6871">{label}</text>
            </g>
          )
        })}
        {VENTAS_DIAS.map((v, i) => {
          const x = PL + i * slotW + (slotW - barW) / 2
          const barH = (v / CHART_CAP) * PH
          const y = PT + PH - barH
          const isMax = i === IDX_MAX
          return (
            <g key={i}>
              <rect
                x={x} y={y} width={barW} height={barH} rx={4}
                fill={isMax ? '#1B5BC1' : '#306ECF'}
                opacity={isMax ? 1 : 0.62}
              />
              {isMax && (
                <text x={x + barW / 2} y={y - 7} textAnchor="middle" fontSize={9.5} fontWeight="700" fill="#1B5BC1">
                  {fmt(v)}
                </text>
              )}
              <text
                x={x + barW / 2} y={PT + PH + 18}
                textAnchor="middle" fontSize={10}
                fill={isMax ? '#1B5BC1' : '#5A6871'}
                fontWeight={isMax ? '700' : '400'}
              >
                {DIAS[i]}
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
      <p className="text-sm font-semibold text-[#353C42] mb-4">Productos más vendidos</p>
      <div className="space-y-3.5">
        {PRODUCTOS.map((p, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[11px] font-bold text-[#5A6871] w-4 shrink-0 text-center">
                  {i + 1}
                </span>
                <span className="text-xs font-semibold text-[#353C42] truncate">{p.nombre}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-2">
                <span className="text-xs text-[#5A6871]">{p.unidades} u.</span>
                <span className="text-xs font-bold text-[#1B5BC1] tabular-nums">{fmt(p.ingresos)}</span>
              </div>
            </div>
            <div className="h-1.5 bg-[#EAF5FD] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(p.unidades / MAX_UNIDADES) * 100}%`,
                  backgroundColor: '#306ECF',
                  opacity: 0.45 + (p.unidades / MAX_UNIDADES) * 0.55,
                }}
              />
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
      <p className="text-sm font-semibold text-[#353C42] mb-4">Distribución por canal</p>
      <div className="space-y-4 mb-5">
        {CANALES.map((c) => (
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
      <div className="flex h-3 rounded-full overflow-hidden mb-3">
        {CANALES.map((c) => (
          <div key={c.nombre} style={{ width: `${c.pct}%`, backgroundColor: c.color }} />
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {CANALES.map((c) => (
          <div key={c.nombre} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c.color }} />
            <span className="text-[11px] text-[#5A6871]">{c.nombre}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── New vs Recurring ─────────────────────────────────────────────────────────

function ClientesSection() {
  return (
    <div className="bg-white rounded-xl border border-[#DCE5E9] p-4 shadow-sm">
      <p className="text-sm font-semibold text-[#353C42] mb-4">Clientes nuevos vs. recurrentes</p>
      <div className="flex gap-3 mb-4">
        <div className="flex-1 rounded-lg p-3 text-center" style={{ backgroundColor: '#EAF5FD' }}>
          <p className="text-2xl font-extrabold text-[#1B5BC1]">{NUEVOS}</p>
          <p className="text-xs text-[#5A6871] mt-0.5">Nuevos</p>
        </div>
        <div className="flex-1 rounded-lg p-3 text-center" style={{ backgroundColor: '#F3F6F5' }}>
          <p className="text-2xl font-extrabold text-[#353C42]">{RECURRENTES}</p>
          <p className="text-xs text-[#5A6871] mt-0.5">Recurrentes</p>
        </div>
      </div>
      <div className="flex h-3 rounded-full overflow-hidden mb-2">
        <div style={{ width: `${PCT_NUEVOS}%`, backgroundColor: '#1B5BC1' }} />
        <div style={{ width: `${100 - PCT_NUEVOS}%`, backgroundColor: '#DCE5E9' }} />
      </div>
      <p className="text-xs text-[#5A6871]">
        El{' '}
        <span className="font-bold text-[#1B5BC1]">{PCT_NUEVOS}%</span>
        {' '}de tus ventas esta semana vinieron de clientes nuevos.
      </p>
    </div>
  )
}

// ─── Insight card ─────────────────────────────────────────────────────────────

function InsightCard() {
  return (
    <div
      className="rounded-xl p-5 text-white"
      style={{ background: 'linear-gradient(135deg, #1B5BC1, #45B5F3)' }}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5 opacity-90">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
          </svg>
        </div>
        <div>
          <p
            className="text-[10px] font-bold uppercase tracking-widest mb-2"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            Insight de Dataria
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.93)' }}>
            Tus ventas crecieron <strong>38%</strong> el sábado respecto al promedio semanal.
            El producto que más impulsó ese pico fue <strong>"Zapatillas Running Pro"</strong>.
            Considerá reforzar stock de ese producto para el próximo fin de semana.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col" style={{ minHeight: 600 }}>
      <Topbar onBack={onBack} />
      <div className="flex-1 overflow-auto p-4 space-y-4" style={{ backgroundColor: '#F3F6F5' }}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard
            label="Ventas del período"
            value={fmt(TOTAL_VENTAS)}
          />
          <KpiCard
            label="Ticket promedio"
            value={fmt(TICKET_PROMEDIO)}
            sub={`${PEDIDOS} pedidos en el período`}
          />
          <KpiCard
            label="Tasa de conversión"
            value="3.4%"
            sub="↑ +0.6% vs semana anterior"
            subColor="#16a34a"
          />
          <KpiCard
            label="Carritos abandonados"
            value="47"
            sub="~$680.000 en ventas potenciales"
            subColor="#d97706"
          />
        </div>

        <BarChart />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProductosTable />
          <CanalesChart />
        </div>

        <ClientesSection />

        <InsightCard />
      </div>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function VentasDemo({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState<Phase>('splash')

  if (phase === 'splash') {
    return <Splash onBack={onBack} onStart={() => setPhase('tool')} />
  }

  return <Dashboard onBack={() => setPhase('splash')} />
}
