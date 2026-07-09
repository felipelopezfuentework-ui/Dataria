'use client'

import { useState } from 'react'
import Image from 'next/image'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Producto {
  id: number; nombre: string; stock: number; unit: string
  vidaUtil: number; diasDesdeCompra: number
}

type Estado = 'urgente' | 'pronto' | 'ok'

// ─── Data ─────────────────────────────────────────────────────────────────────

const initProductos: Producto[] = [
  { id: 1, nombre: 'Aceite de girasol 1L',   stock: 280, unit: 'unidades', vidaUtil: 180, diasDesdeCompra: 20 },
  { id: 2, nombre: 'Harina 000 x 25kg',      stock: 12,  unit: 'bolsas',   vidaUtil: 90,  diasDesdeCompra: 5  },
  { id: 3, nombre: 'Azúcar x 50kg',          stock: 17,  unit: 'sacos',    vidaUtil: 365, diasDesdeCompra: 30 },
  { id: 4, nombre: 'Arroz largo fino x 5kg', stock: 220, unit: 'paquetes', vidaUtil: 270, diasDesdeCompra: 10 },
  { id: 5, nombre: 'Yerba mate x 1kg',       stock: 235, unit: 'paquetes', vidaUtil: 365, diasDesdeCompra: 8  },
]

const HISTORIAL: Record<number, number[]> = {
  1: [42, 38, 45, 51, 47, 53],
  2: [18, 22, 19, 25, 21, 28],
  3: [9,  11, 8,  12, 10, 14],
  4: [30, 28, 33, 31, 36, 38],
  5: [25, 27, 24, 29, 26, 31],
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getHist(id: number): number[] {
  return HISTORIAL[id] ?? [0, 0, 0, 0, 0, 0]
}

function proyectar(h: number[]): number {
  const n = h.length
  return Math.round((h[n - 1] * 3 + h[n - 2] * 2 + h[n - 3] * 1) / 6)
}

function diasDeStockFn(stock: number, proj: number): number {
  if (proj === 0) return Infinity
  return (stock / proj) * 7
}

function calcEstado(dias: number, vidaRestante: number): Estado {
  if (dias < 7 || vidaRestante < 7) return 'urgente'
  if (dias < 14) return 'pronto'
  return 'ok'
}

function addDays(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() + Math.round(n))
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

// ─── SVG line chart ───────────────────────────────────────────────────────────

const CW = 520, CH = 190, PL = 44, PR = 20, PT = 22, PB = 32
const PW = CW - PL - PR, PH = CH - PT - PB

function pX(i: number) { return PL + (i / 6) * PW }
function pY(v: number, mn: number, mx: number) { return PT + (1 - (v - mn) / (mx - mn)) * PH }

function Grafico({ hist, proj }: { hist: number[]; proj: number }) {
  const all = [...hist, proj]
  const rawMin = Math.min(...all), rawMax = Math.max(...all)
  const range = rawMax - rawMin || 4
  const mn = Math.max(0, rawMin - range * 0.18)
  const mx = rawMax + range * 0.18

  const hPts = hist.map((v, i) => ({ x: pX(i), y: pY(v, mn, mx) }))
  const projX = pX(6), projY = pY(proj, mn, mx)
  const btm = PT + PH

  const areaD =
    `M ${pX(0)} ${btm} ` +
    hPts.map(p => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') +
    ` L ${pX(5).toFixed(1)} ${btm} Z`

  const histPoly = hPts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const dashPoly = `${pX(5).toFixed(1)},${hPts[5].y.toFixed(1)} ${projX.toFixed(1)},${projY.toFixed(1)}`

  const step = Math.ceil((mx - mn) / 4)
  const yTicks = Array.from({ length: 5 }, (_, i) => mn + i * step).filter(v => v <= mx + 0.5)
  const labels = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7']

  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full" style={{ height: 180 }}>
      {/* Grid */}
      {yTicks.map((v, i) => {
        const y = pY(v, mn, mx)
        return (
          <g key={i}>
            <line x1={PL} y1={y} x2={CW - PR} y2={y} stroke="#DCE5E9" strokeWidth={1} />
            <text x={PL - 5} y={y + 4} textAnchor="end" fontSize={9} fill="#5A6871">{Math.round(v)}</text>
          </g>
        )
      })}

      {/* X labels */}
      {labels.map((l, i) => (
        <text key={l} x={pX(i)} y={CH - 8} textAnchor="middle" fontSize={10}
          fill={i === 6 ? '#45B5F3' : '#5A6871'} fontWeight={i === 6 ? '700' : '400'}>
          {l}
        </text>
      ))}

      {/* S7 label */}
      <text x={pX(6)} y={PT - 6} textAnchor="middle" fontSize={9} fill="#45B5F3" fontWeight="700">
        Proyectado
      </text>

      {/* Area fill */}
      <path d={areaD} fill="rgba(48,110,207,0.07)" />

      {/* Historical line */}
      <polyline points={histPoly} fill="none" stroke="#306ECF" strokeWidth={2.5}
        strokeLinejoin="round" strokeLinecap="round" />

      {/* Historical dots */}
      {hPts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3.5} fill="white" stroke="#306ECF" strokeWidth={2} />
      ))}

      {/* Dashed line S6 → S7 */}
      <polyline points={dashPoly} fill="none" stroke="#45B5F3" strokeWidth={2} strokeDasharray="6 4" />

      {/* Projected dot */}
      <circle cx={projX} cy={projY} r={5.5} fill="#45B5F3" stroke="white" strokeWidth={2.5} />

      {/* Projected value */}
      <text x={projX} y={projY - 11} textAnchor="middle" fontSize={12} fill="#45B5F3" fontWeight="700">
        {proj}
      </text>
    </svg>
  )
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function KpiCard({ label, value, color = '#353C42' }: { label: string; value: string; color?: string }) {
  return (
    <div className="rounded-lg border p-3" style={{ borderColor: '#DCE5E9', backgroundColor: '#F3F6F5' }}>
      <p className="text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: '#5A6871' }}>{label}</p>
      <p className="text-base font-extrabold leading-tight" style={{ color }}>{value}</p>
    </div>
  )
}

function EstadoBadge({ estado }: { estado: Estado }) {
  const cfg: Record<Estado, { label: string; bg: string; text: string; border: string }> = {
    urgente: { label: 'Urgente',       bg: '#fff5f5', text: '#e24b4a', border: '#fca5a5' },
    pronto:  { label: 'Reponer pronto', bg: '#fffbeb', text: '#b45309', border: '#fcd34d' },
    ok:      { label: 'OK',            bg: '#f0fdf4', text: '#1a7a4a', border: '#86efac' },
  }
  const c = cfg[estado]
  return (
    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap"
      style={{ backgroundColor: c.bg, color: c.text, borderColor: c.border }}>
      {c.label}
    </span>
  )
}

function FieldInput({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide mb-1" style={{ color: '#5A6871' }}>{label}</p>
      <input className="w-full h-9 border rounded-sm px-3 text-sm focus:outline-none focus:border-[#306ECF]"
        style={{ borderColor: '#DCE5E9' }} {...rest} />
    </div>
  )
}

// ─── Tab: Proyección ─────────────────────────────────────────────────────────

function ProyeccionTab({ productos }: { productos: Producto[] }) {
  const [selId, setSelId] = useState(productos[0]?.id ?? 1)

  const prod    = productos.find(p => p.id === selId) ?? productos[0]
  const hist    = getHist(prod.id)
  const proj    = proyectar(hist)
  const dias    = diasDeStockFn(prod.stock, proj)
  const vidaR   = prod.vidaUtil - prod.diasDesdeCompra
  const suficiente = prod.stock >= proj
  const comprar = suficiente ? 0 : Math.round(proj * 1.1)
  const dif     = prod.stock - proj

  return (
    <div className="space-y-4">
      {/* Selector */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide mb-1.5" style={{ color: '#5A6871' }}>
          Producto a analizar
        </p>
        <select value={selId} onChange={e => setSelId(+e.target.value)}
          className="h-9 px-3 border rounded-sm text-sm text-carbon bg-white focus:outline-none focus:border-[#306ECF]"
          style={{ borderColor: '#DCE5E9', minWidth: 240 }}>
          {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
        </select>
      </div>

      {/* Chart */}
      <div className="rounded-lg border px-3 pt-2 pb-1" style={{ borderColor: '#DCE5E9' }}>
        <div className="flex items-center gap-4 mb-1 px-1">
          <span className="flex items-center gap-1.5 text-xs" style={{ color: '#5A6871' }}>
            <span className="inline-block w-6 h-0.5 rounded" style={{ backgroundColor: '#306ECF' }} /> Historial
          </span>
          <span className="flex items-center gap-1.5 text-xs" style={{ color: '#5A6871' }}>
            <span className="inline-block w-6 h-0.5 rounded" style={{ backgroundColor: '#45B5F3', opacity: 0.7, borderTop: '2px dashed #45B5F3' }} /> Proyección S7
          </span>
        </div>
        <Grafico hist={hist} proj={proj} />
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-3 gap-3">
        <KpiCard label="Demanda proyectada S7" value={`${proj} ${prod.unit}`} color="#306ECF" />
        <KpiCard label="Stock actual"          value={`${prod.stock} ${prod.unit}`} />
        <KpiCard
          label="Diferencia"
          value={`${dif >= 0 ? '+' : ''}${dif} ${prod.unit}`}
          color={dif >= 0 ? '#1a7a4a' : '#e24b4a'}
        />
        <KpiCard
          label="Vida útil restante"
          value={`${vidaR} días`}
          color={vidaR < 14 ? '#e24b4a' : '#353C42'}
        />
        <KpiCard
          label="Stock disponible hasta"
          value={isFinite(dias) ? addDays(dias) : '—'}
        />
        <div className={`rounded-lg border p-3 ${suficiente ? '' : ''}`}
          style={{
            borderColor: suficiente ? '#86efac' : '#fca5a5',
            backgroundColor: suficiente ? '#f0fdf4' : '#fff5f5',
          }}>
          <p className="text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: '#5A6871' }}>
            Compra sugerida
          </p>
          <p className="text-base font-extrabold leading-tight"
            style={{ color: suficiente ? '#1a7a4a' : '#e24b4a' }}>
            {suficiente ? 'Stock suficiente' : `Comprar ${comprar} ${prod.unit}`}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Tab: Productos ───────────────────────────────────────────────────────────

function ProductosTab({ productos, setProductos }: {
  productos: Producto[]; setProductos: (v: Producto[]) => void
}) {
  const [modal, setModal] = useState(false)
  const [form, setForm]   = useState({ nombre: '', stock: '', unit: '', vidaUtil: '', diasDesdeCompra: '' })

  const sf = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const save = () => {
    if (!form.nombre || !form.stock) return
    setProductos([...productos, {
      id: Date.now(),
      nombre: form.nombre,
      stock: +form.stock,
      unit: form.unit || 'unidades',
      vidaUtil: +form.vidaUtil || 180,
      diasDesdeCompra: +form.diasDesdeCompra || 0,
    }])
    setForm({ nombre: '', stock: '', unit: '', vidaUtil: '', diasDesdeCompra: '' })
    setModal(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-carbon">{productos.length} productos</p>
        <button onClick={() => setModal(true)}
          className="h-8 px-3 rounded-[8px] text-xs font-bold tracking-[0.03em] uppercase text-white"
          style={{ backgroundColor: '#1B5BC1' }}>
          + Agregar producto
        </button>
      </div>

      <div className="rounded-lg border overflow-x-auto" style={{ borderColor: '#DCE5E9' }}>
        <table className="w-full text-xs min-w-[700px]">
          <thead>
            <tr style={{ backgroundColor: '#F3F6F5' }}>
              {['Producto', 'Stock', 'Vida útil', 'Días restantes', 'Última compra', 'Próx. reposición', 'Estado'].map(h => (
                <th key={h} className="px-3 py-2.5 text-left font-semibold uppercase tracking-wide whitespace-nowrap"
                  style={{ color: '#5A6871' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: '#DCE5E9' }}>
            {productos.map(p => {
              const hist   = getHist(p.id)
              const proj   = proyectar(hist)
              const dias   = diasDeStockFn(p.stock, proj)
              const vidaR  = p.vidaUtil - p.diasDesdeCompra
              const estado = calcEstado(dias, vidaR)

              return (
                <tr key={p.id} className="hover:bg-[#F3F6F5]/50">
                  <td className="px-3 py-2.5 font-medium text-carbon">{p.nombre}</td>
                  <td className="px-3 py-2.5 text-carbon">{p.stock} {p.unit}</td>
                  <td className="px-3 py-2.5" style={{ color: '#5A6871' }}>{p.vidaUtil} días</td>
                  <td className="px-3 py-2.5 font-semibold"
                    style={{ color: vidaR < 14 ? '#e24b4a' : '#353C42' }}>
                    {vidaR} días
                  </td>
                  <td className="px-3 py-2.5" style={{ color: '#5A6871' }}>Hace {p.diasDesdeCompra} días</td>
                  <td className="px-3 py-2.5 text-carbon">{isFinite(dias) ? addDays(dias) : '—'}</td>
                  <td className="px-3 py-2.5"><EstadoBadge estado={estado} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[380px]">
            <p className="text-sm font-bold text-carbon mb-4">Nuevo producto</p>
            <div className="flex flex-col gap-3">
              <FieldInput label="Nombre del producto" placeholder="ej: Aceite de girasol 1L"
                value={form.nombre} onChange={sf('nombre')} />
              <div className="grid grid-cols-2 gap-3">
                <FieldInput label="Stock actual" type="number" placeholder="48"
                  value={form.stock} onChange={sf('stock')} />
                <FieldInput label="Unidad" placeholder="unidades"
                  value={form.unit} onChange={sf('unit')} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FieldInput label="Vida útil (días)" type="number" placeholder="180"
                  value={form.vidaUtil} onChange={sf('vidaUtil')} />
                <FieldInput label="Días desde última compra" type="number" placeholder="5"
                  value={form.diasDesdeCompra} onChange={sf('diasDesdeCompra')} />
              </div>
              <div className="flex gap-2 justify-end pt-1">
                <button onClick={() => setModal(false)}
                  className="h-8 px-4 rounded-[8px] text-xs font-semibold border hover:bg-[#F3F6F5] transition-colors"
                  style={{ borderColor: '#DCE5E9', color: '#5A6871' }}>
                  Cancelar
                </button>
                <button onClick={save}
                  className="h-8 px-4 rounded-[8px] text-xs font-bold text-white"
                  style={{ backgroundColor: '#1B5BC1' }}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Tab: Alertas ─────────────────────────────────────────────────────────────

function AlertasTab({ productos }: { productos: Producto[] }) {
  const alertas = productos
    .map(p => {
      const hist   = getHist(p.id)
      const proj   = proyectar(hist)
      const dias   = diasDeStockFn(p.stock, proj)
      const vidaR  = p.vidaUtil - p.diasDesdeCompra
      const estado = calcEstado(dias, vidaR)
      const semsStr = dias >= 14
        ? `${Math.round(dias / 7)} semanas`
        : `${Math.round(dias)} días`

      let descripcion: string
      let accion: string

      if (estado === 'urgente') {
        descripcion = `Stock para ${Math.round(dias)} días. Reposición urgente.`
        accion = `Comprar ${Math.round(proj * 1.1)} ${p.unit}`
      } else if (estado === 'pronto') {
        const diasReo = Math.max(0, Math.round((p.stock - proj) / (proj / 7)))
        descripcion  = `Stock para ${Math.round(dias)} días.`
        accion       = `Próxima reposición en ${diasReo} días`
      } else {
        descripcion = `Stock suficiente para ${semsStr}.`
        if (vidaR < 60 && vidaR > 0) descripcion += ` Vence en ${vidaR} días.`
        accion = 'Sin acción necesaria'
      }

      return { p, estado, descripcion, accion, agota: isFinite(dias) ? addDays(dias) : '—' }
    })
    .sort((a, b) => {
      const ord: Record<Estado, number> = { urgente: 0, pronto: 1, ok: 2 }
      return ord[a.estado] - ord[b.estado]
    })

  const iconMap: Record<Estado, string>  = { urgente: '🔴', pronto: '🟡', ok: '🟢' }
  const colorMap: Record<Estado, { bg: string; border: string; text: string; label: string }> = {
    urgente: { bg: '#fff5f5', border: '#fca5a5', text: '#e24b4a', label: 'Urgente'       },
    pronto:  { bg: '#fffbeb', border: '#fcd34d', text: '#b45309', label: 'Atención'      },
    ok:      { bg: '#f0fdf4', border: '#86efac', text: '#1a7a4a', label: 'Sin novedad'   },
  }

  return (
    <div className="space-y-2.5">
      {alertas.map(({ p, estado, descripcion, accion, agota }) => {
        const c = colorMap[estado]
        return (
          <div key={p.id} className="rounded-lg border p-4 flex items-start gap-3"
            style={{ backgroundColor: c.bg, borderColor: c.border }}>
            <span className="text-lg shrink-0 mt-0.5">{iconMap[estado]}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-bold text-carbon">{p.nombre}</p>
                <span className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full border"
                  style={{ backgroundColor: c.bg, color: c.text, borderColor: c.border }}>
                  {c.label}
                </span>
              </div>
              <p className="text-xs mb-1 text-carbon">{descripcion}</p>
              <p className="text-xs font-semibold" style={{ color: c.text }}>{accion}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#5A6871' }}>
                Se agota
              </p>
              <p className="text-xs font-bold text-carbon">{agota}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Main panel ───────────────────────────────────────────────────────────────

type Tab = 'proyeccion' | 'productos' | 'alertas'
const TABS: { id: Tab; label: string }[] = [
  { id: 'proyeccion', label: 'Proyección' },
  { id: 'productos',  label: 'Productos'  },
  { id: 'alertas',    label: 'Alertas'    },
]

function MainPanel({ onBack }: { onBack: () => void }) {
  const [tab, setTab]               = useState<Tab>('proyeccion')
  const [productos, setProductos]   = useState<Producto[]>(initProductos)

  return (
    <div className="flex flex-col min-h-[560px]">
      {/* Header */}
      <div style={{ backgroundColor: '#1B5BC1' }} className="flex items-center justify-between px-5 py-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="font-extrabold text-lg text-white leading-none">
            <span style={{ color: '#56BCFA' }}>d</span>ataria
          </span>
          <span className="text-white/40 text-sm">·</span>
          <span className="text-white/75 text-sm">Distribuidoras · Predictor de demanda</span>
        </div>
        <button onClick={onBack}
          className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Inicio
        </button>
      </div>

      {/* Tabs */}
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

      {/* Content */}
      <div className="flex-1 bg-white overflow-auto p-5">
        {tab === 'proyeccion' && <ProyeccionTab productos={productos} />}
        {tab === 'productos'  && <ProductosTab  productos={productos} setProductos={setProductos} />}
        {tab === 'alertas'    && <AlertasTab    productos={productos} />}
      </div>
    </div>
  )
}

// ─── Splash ───────────────────────────────────────────────────────────────────

function Splash({ onBack, onEnter }: { onBack: () => void; onEnter: () => void }) {
  return (
    <div className="min-h-[560px] flex flex-col"
      style={{ background: 'linear-gradient(160deg, #1B5BC1 0%, #2a6fd4 50%, #45B5F3 100%)' }}>
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
            Distribuidoras · Demanda
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

// ─── Root export ──────────────────────────────────────────────────────────────

export default function DemandaDemo({ onBack }: { onBack: () => void }) {
  const [screen, setScreen] = useState<'splash' | 'main'>('splash')
  if (screen === 'splash') return <Splash onBack={onBack} onEnter={() => setScreen('main')} />
  return <MainPanel onBack={() => setScreen('splash')} />
}
