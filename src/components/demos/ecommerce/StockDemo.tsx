'use client'

import { useState } from 'react'
import Image from 'next/image'
import Modal from '@/components/ui/Modal'

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = 'splash' | 'main'
type TabId  = 'inventario' | 'movimientos'
type Estado = 'Quiebre' | 'Pedido urgente' | 'Pedir pronto' | 'OK'
type TipoMov = 'Entrada' | 'Salida'

interface Producto {
  id: number
  nombre: string
  stock: number
  stockMinimo: number
  leadTime: number
  ventaDiaria: number
  proveedor: string
}
interface Movimiento {
  id: string
  fecha: string
  tipo: TipoMov
  productoId: number
  cantidad: number
  motivo: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCTOS_INICIALES: Producto[] = [
  { id: 1, nombre: 'Zapatillas Running Pro', stock: 8,  stockMinimo: 15, leadTime: 12, ventaDiaria: 4, proveedor: 'Nike Dist.'    },
  { id: 2, nombre: 'Mochila Urban 20L',      stock: 23, stockMinimo: 10, leadTime: 7,  ventaDiaria: 2, proveedor: 'Accesorios BA' },
  { id: 3, nombre: 'Campera Impermeable',    stock: 5,  stockMinimo: 8,  leadTime: 15, ventaDiaria: 2, proveedor: 'TextilSur'     },
  { id: 4, nombre: 'Remera Básica Algodón',  stock: 67, stockMinimo: 20, leadTime: 5,  ventaDiaria: 6, proveedor: 'TextilSur'     },
  { id: 5, nombre: 'Buzo Canguro',           stock: 4,  stockMinimo: 10, leadTime: 10, ventaDiaria: 2, proveedor: 'TextilSur'     },
]

const MOVIMIENTOS_INICIALES: Movimiento[] = [
  { id: 'm1', fecha: 'Hoy',         tipo: 'Salida',  productoId: 1, cantidad: 6,  motivo: 'Ventas del día'        },
  { id: 'm2', fecha: 'Ayer',        tipo: 'Salida',  productoId: 4, cantidad: 8,  motivo: 'Ventas del día'        },
  { id: 'm3', fecha: 'Ayer',        tipo: 'Entrada', productoId: 2, cantidad: 30, motivo: 'Reposición proveedor'  },
  { id: 'm4', fecha: 'Hace 2 días', tipo: 'Salida',  productoId: 3, cantidad: 4,  motivo: 'Ventas del día'        },
  { id: 'm5', fecha: 'Hace 2 días', tipo: 'Salida',  productoId: 5, cantidad: 3,  motivo: 'Ventas del día'        },
  { id: 'm6', fecha: 'Hace 3 días', tipo: 'Entrada', productoId: 1, cantidad: 20, motivo: 'Reposición proveedor'  },
  { id: 'm7', fecha: 'Hace 4 días', tipo: 'Salida',  productoId: 4, cantidad: 12, motivo: 'Ventas del día'        },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ESTADO_COLOR: Record<Estado, string> = {
  'Quiebre':         '#dc2626',
  'Pedido urgente':  '#e67e22',
  'Pedir pronto':    '#eab308',
  'OK':              '#16a34a',
}
const ESTADO_EMOJI: Record<Estado, string> = {
  'Quiebre': '🔴', 'Pedido urgente': '🟠', 'Pedir pronto': '🟡', 'OK': '🟢',
}

function diasStock(p: Producto) {
  return p.stock / p.ventaDiaria
}
function calcEstado(p: Producto): Estado {
  const dias = diasStock(p)
  if (p.stock < p.stockMinimo) return 'Quiebre'
  if (dias <= p.leadTime) return 'Pedido urgente'
  if (dias <= p.leadTime + 5) return 'Pedir pronto'
  return 'OK'
}
function sugerencia(p: Producto): string {
  const dias = diasStock(p)
  const estado = calcEstado(p)
  if (estado === 'Quiebre' || estado === 'Pedido urgente') {
    return `Pedí hoy — el proveedor tarda ${p.leadTime} días y el stock se agota en ${Math.round(dias)} días`
  }
  const buffer = Math.max(0, Math.floor(dias - p.leadTime))
  const fechaLimite = new Date()
  fechaLimite.setDate(fechaLimite.getDate() + buffer)
  const fechaStr = fechaLimite.toLocaleDateString('es-AR', { day: 'numeric', month: 'numeric' })
  return `Tenés stock para ${Math.round(dias)} días · Podés esperar hasta ${fechaStr} para hacer el pedido`
}
function cantidadSugerida(p: Producto) {
  return Math.max(p.stockMinimo, Math.ceil(p.ventaDiaria * p.leadTime * 1.5) - p.stock)
}
function mailtoPedido(p: Producto) {
  const subject = encodeURIComponent('Solicitud de reposición de stock')
  const body = encodeURIComponent(
    `Producto: ${p.nombre} | Cantidad sugerida: ${cantidadSugerida(p)} | Proveedor: ${p.proveedor}`
  )
  return `mailto:datariaai@gmail.com?subject=${subject}&body=${body}`
}
function todayInput() {
  return new Date().toISOString().slice(0, 10)
}
function formatFechaInput(dateStr: string) {
  if (dateStr === todayInput()) return 'Hoy'
  const [y, m, d] = dateStr.split('-')
  return `${+d}/${+m}`
}

// ─── Splash ───────────────────────────────────────────────────────────────────

function Splash({ onBack, onEnter }: { onBack: () => void; onEnter: () => void }) {
  return (
    <div
      className="min-h-[620px] flex flex-col"
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
            E-commerce · Stock
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
        <span className="text-white/75 text-sm">E-commerce · Stock e inventario</span>
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
  { id: 'inventario',  label: 'Inventario' },
  { id: 'movimientos', label: 'Movimientos' },
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

// ─── Estado badge ─────────────────────────────────────────────────────────────

function EstadoBadge({ estado }: { estado: Estado }) {
  const color = ESTADO_COLOR[estado]
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap"
      style={{ backgroundColor: `${color}1F`, color }}
    >
      {ESTADO_EMOJI[estado]} {estado}
    </span>
  )
}

// ─── Registrar entrada modal ──────────────────────────────────────────────────

function RegistrarEntradaModal({
  producto, onClose, onConfirm,
}: {
  producto: Producto | null
  onClose: () => void
  onConfirm: (cantidad: number, fecha: string) => void
}) {
  const [cantidad, setCantidad] = useState('')
  const [fecha, setFecha] = useState(todayInput())

  if (!producto) return null

  const save = () => {
    const n = Number(cantidad)
    if (!n || n <= 0) return
    onConfirm(n, fecha)
    setCantidad('')
    setFecha(todayInput())
  }

  return (
    <Modal open={!!producto} onClose={onClose} title={`Registrar entrada — ${producto.nombre}`}>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#5A6871] mb-1.5">Cantidad recibida</label>
          <input
            type="number" min={1} value={cantidad} onChange={e => setCantidad(e.target.value)}
            placeholder="Ej: 20"
            className="w-full border border-[#DCE5E9] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#306ECF]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#5A6871] mb-1.5">Fecha</label>
          <input
            type="date" value={fecha} onChange={e => setFecha(e.target.value)}
            className="w-full border border-[#DCE5E9] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#306ECF]"
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose}
            className="h-9 px-4 rounded-lg text-xs font-bold uppercase tracking-wide text-[#5A6871] hover:bg-[#F3F6F5] transition-colors">
            Cancelar
          </button>
          <button onClick={save}
            className="h-9 px-5 rounded-lg text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-85"
            style={{ backgroundColor: '#306ECF' }}>
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  )
}

// ─── Alert card ───────────────────────────────────────────────────────────────

function AlertaCard({ count }: { count: number }) {
  if (count <= 0) return null
  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: '#FDECEC', border: '1px solid #f5b5b5' }}>
      <p className="text-sm font-semibold" style={{ color: '#C0392B' }}>
        ⚠️ Tenés {count} producto{count === 1 ? '' : 's'} que necesita{count === 1 ? '' : 'n'} atención inmediata. Revisá las sugerencias de reposición.
      </p>
    </div>
  )
}

// ─── Tab: Inventario ──────────────────────────────────────────────────────────

function InventarioTab({
  productos, registrarEntrada,
}: {
  productos: Producto[]
  registrarEntrada: (productoId: number, cantidad: number, fecha: string) => void
}) {
  const [modalProducto, setModalProducto] = useState<Producto | null>(null)

  const estados = productos.map(p => ({ p, estado: calcEstado(p) }))
  const quiebreCount   = productos.filter(p => p.stock < p.stockMinimo).length
  const urgentesCount  = productos.filter(p => diasStock(p) <= p.leadTime).length
  const okCount        = estados.filter(x => x.estado === 'OK').length
  const alertaCount     = estados.filter(x => x.estado === 'Quiebre' || x.estado === 'Pedido urgente').length

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-[#DCE5E9] p-4 shadow-sm">
          <p className="text-xs text-[#5A6871] mb-1.5">Productos en quiebre</p>
          <p className="text-2xl font-extrabold" style={{ color: '#dc2626' }}>{quiebreCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-[#DCE5E9] p-4 shadow-sm">
          <p className="text-xs text-[#5A6871] mb-1.5">Pedidos urgentes</p>
          <p className="text-2xl font-extrabold" style={{ color: '#e67e22' }}>{urgentesCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-[#DCE5E9] p-4 shadow-sm">
          <p className="text-xs text-[#5A6871] mb-1.5">Productos OK</p>
          <p className="text-2xl font-extrabold" style={{ color: '#16a34a' }}>{okCount}</p>
        </div>
      </div>

      <AlertaCard count={alertaCount} />

      <div className="bg-white rounded-xl border border-[#DCE5E9] shadow-sm overflow-hidden">
        <table className="w-full text-sm table-fixed">
          <colgroup>
            <col style={{ width: '19%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '9%' }} />
            <col style={{ width: '14%' }} />
            <col style={{ width: '28%' }} />
            <col style={{ width: '20%' }} />
          </colgroup>
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wide text-[#5A6871] bg-[#F3F6F5]">
              <th className="py-2.5 px-3 font-semibold">Producto</th>
              <th className="py-2.5 px-3 font-semibold text-right">Stock</th>
              <th className="py-2.5 px-3 font-semibold text-right">Días rest.</th>
              <th className="py-2.5 px-3 font-semibold">Estado</th>
              <th className="py-2.5 px-3 font-semibold">Sugerencia</th>
              <th className="py-2.5 px-3 font-semibold text-right"></th>
            </tr>
          </thead>
          <tbody>
            {estados.map(({ p, estado }) => (
              <tr key={p.id} className="border-t border-[#DCE5E9] align-top">
                <td className="py-3 px-3">
                  <p className="font-semibold text-[#353C42]">{p.nombre}</p>
                  <p className="text-xs text-[#5A6871]">{p.proveedor}</p>
                </td>
                <td className="py-3 px-3 text-right">
                  <p className="tabular-nums font-bold text-[#353C42]">{p.stock}</p>
                  <p className="text-xs text-[#5A6871]">mín. {p.stockMinimo}</p>
                </td>
                <td className="py-3 px-3 text-right tabular-nums text-[#353C42]">{Math.round(diasStock(p))}d</td>
                <td className="py-3 px-3"><EstadoBadge estado={estado} /></td>
                <td className="py-3 px-3 text-xs text-[#5A6871] leading-relaxed">{sugerencia(p)}</td>
                <td className="py-3 px-3 text-right space-y-1.5">
                  <button
                    onClick={() => setModalProducto(p)}
                    className="w-full h-auto min-h-8 px-2 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide text-white leading-tight transition-opacity hover:opacity-85"
                    style={{ backgroundColor: '#306ECF' }}
                  >
                    Registrar entrada
                  </button>
                  <a
                    href={mailtoPedido(p)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-auto min-h-8 px-2 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide leading-tight transition-colors hover:bg-[#EAF5FD]"
                    style={{ color: '#1B5BC1', border: '1px solid rgba(27,91,193,0.25)' }}
                  >
                    Hacer pedido
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RegistrarEntradaModal
        producto={modalProducto}
        onClose={() => setModalProducto(null)}
        onConfirm={(cantidad, fecha) => {
          if (modalProducto) registrarEntrada(modalProducto.id, cantidad, fecha)
          setModalProducto(null)
        }}
      />
    </div>
  )
}

// ─── Tipo chip ────────────────────────────────────────────────────────────────

function TipoChip({ tipo }: { tipo: TipoMov }) {
  const isEntrada = tipo === 'Entrada'
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap"
      style={{ backgroundColor: isEntrada ? '#dcfce7' : '#fde2e2', color: isEntrada ? '#16a34a' : '#dc2626' }}
    >
      {isEntrada ? 'Entrada' : 'Salida'}
    </span>
  )
}

// ─── Registrar movimiento modal ───────────────────────────────────────────────

function RegistrarMovimientoModal({
  open, productos, onClose, onConfirm,
}: {
  open: boolean
  productos: Producto[]
  onClose: () => void
  onConfirm: (productoId: number, tipo: TipoMov, cantidad: number, motivo: string) => void
}) {
  const [productoId, setProductoId] = useState(productos[0]?.id ?? 0)
  const [tipo, setTipo] = useState<TipoMov>('Entrada')
  const [cantidad, setCantidad] = useState('')
  const [motivo, setMotivo] = useState('')

  const save = () => {
    const n = Number(cantidad)
    if (!n || n <= 0 || !motivo.trim()) return
    onConfirm(productoId, tipo, n, motivo.trim())
    setCantidad(''); setMotivo(''); setTipo('Entrada')
  }

  return (
    <Modal open={open} onClose={onClose} title="Registrar movimiento">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#5A6871] mb-1.5">Producto</label>
          <select
            value={productoId} onChange={e => setProductoId(Number(e.target.value))}
            className="w-full border border-[#DCE5E9] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#306ECF] bg-white"
          >
            {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#5A6871] mb-1.5">Tipo</label>
          <div className="flex gap-2">
            {(['Entrada', 'Salida'] as TipoMov[]).map(t => (
              <button
                key={t} onClick={() => setTipo(t)}
                className="flex-1 h-9 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors"
                style={{
                  backgroundColor: tipo === t ? '#306ECF' : '#EAF5FD',
                  color: tipo === t ? '#fff' : '#1B5BC1',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#5A6871] mb-1.5">Cantidad</label>
          <input
            type="number" min={1} value={cantidad} onChange={e => setCantidad(e.target.value)}
            placeholder="Ej: 10"
            className="w-full border border-[#DCE5E9] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#306ECF]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#5A6871] mb-1.5">Motivo</label>
          <input
            value={motivo} onChange={e => setMotivo(e.target.value)}
            placeholder="Ej: Ventas del día"
            className="w-full border border-[#DCE5E9] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#306ECF]"
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose}
            className="h-9 px-4 rounded-lg text-xs font-bold uppercase tracking-wide text-[#5A6871] hover:bg-[#F3F6F5] transition-colors">
            Cancelar
          </button>
          <button onClick={save}
            className="h-9 px-5 rounded-lg text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-85"
            style={{ backgroundColor: '#306ECF' }}>
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  )
}

// ─── Tab: Movimientos ─────────────────────────────────────────────────────────

function MovimientosTab({
  productos, movimientos, registrarMovimiento,
}: {
  productos: Producto[]
  movimientos: Movimiento[]
  registrarMovimiento: (productoId: number, tipo: TipoMov, cantidad: number, motivo: string) => void
}) {
  const [filtroProducto, setFiltroProducto] = useState<number | 'todos'>('todos')
  const [filtroTipo, setFiltroTipo] = useState<'todos' | TipoMov>('todos')
  const [modalOpen, setModalOpen] = useState(false)

  const nombreProducto = (id: number) => productos.find(p => p.id === id)?.nombre ?? '—'

  const filtrados = movimientos.filter(m =>
    (filtroProducto === 'todos' || m.productoId === filtroProducto) &&
    (filtroTipo === 'todos' || m.tipo === filtroTipo)
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <select
          value={filtroProducto === 'todos' ? 'todos' : String(filtroProducto)}
          onChange={e => setFiltroProducto(e.target.value === 'todos' ? 'todos' : Number(e.target.value))}
          className="border border-[#DCE5E9] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#306ECF]"
        >
          <option value="todos">Todos los productos</option>
          {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
        </select>

        <div className="flex gap-1.5">
          {(['todos', 'Entrada', 'Salida'] as const).map(t => (
            <button
              key={t}
              onClick={() => setFiltroTipo(t)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
              style={{
                backgroundColor: filtroTipo === t ? '#306ECF' : '#EAF5FD',
                color: filtroTipo === t ? '#fff' : '#1B5BC1',
              }}
            >
              {t === 'todos' ? 'Todos' : t === 'Entrada' ? 'Entradas' : 'Salidas'}
            </button>
          ))}
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="sm:ml-auto h-9 px-4 rounded-lg text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-85 whitespace-nowrap"
          style={{ backgroundColor: '#306ECF' }}
        >
          + Registrar movimiento
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#DCE5E9] shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wide text-[#5A6871] bg-[#F3F6F5]">
              <th className="py-2.5 px-4 font-semibold">Fecha</th>
              <th className="py-2.5 px-4 font-semibold">Tipo</th>
              <th className="py-2.5 px-4 font-semibold">Producto</th>
              <th className="py-2.5 px-4 font-semibold text-right">Cantidad</th>
              <th className="py-2.5 px-4 font-semibold">Motivo</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map(m => (
              <tr key={m.id} className="border-t border-[#DCE5E9]">
                <td className="py-3 px-4 text-[#5A6871]">{m.fecha}</td>
                <td className="py-3 px-4"><TipoChip tipo={m.tipo} /></td>
                <td className="py-3 px-4 font-semibold text-[#353C42]">{nombreProducto(m.productoId)}</td>
                <td className="py-3 px-4 text-right tabular-nums font-bold" style={{ color: m.tipo === 'Entrada' ? '#16a34a' : '#dc2626' }}>
                  {m.tipo === 'Entrada' ? '+' : '-'}{m.cantidad} u
                </td>
                <td className="py-3 px-4 text-[#5A6871]">{m.motivo}</td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-sm text-[#5A6871]">No hay movimientos para este filtro.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <RegistrarMovimientoModal
        open={modalOpen}
        productos={productos}
        onClose={() => setModalOpen(false)}
        onConfirm={(productoId, tipo, cantidad, motivo) => {
          registrarMovimiento(productoId, tipo, cantidad, motivo)
          setModalOpen(false)
        }}
      />
    </div>
  )
}

// ─── Main panel ───────────────────────────────────────────────────────────────

function MainPanel({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<TabId>('inventario')
  const [productos, setProductos] = useState<Producto[]>(PRODUCTOS_INICIALES)
  const [movimientos, setMovimientos] = useState<Movimiento[]>(MOVIMIENTOS_INICIALES)

  const registrarEntrada = (productoId: number, cantidad: number, fecha: string) => {
    setProductos(prev => prev.map(p => p.id === productoId ? { ...p, stock: p.stock + cantidad } : p))
    setMovimientos(prev => [
      { id: `m${Date.now()}`, fecha: formatFechaInput(fecha), tipo: 'Entrada', productoId, cantidad, motivo: 'Reposición proveedor' },
      ...prev,
    ])
  }

  const registrarMovimiento = (productoId: number, tipo: TipoMov, cantidad: number, motivo: string) => {
    setProductos(prev => prev.map(p => p.id === productoId
      ? { ...p, stock: Math.max(0, tipo === 'Entrada' ? p.stock + cantidad : p.stock - cantidad) }
      : p
    ))
    setMovimientos(prev => [
      { id: `m${Date.now()}`, fecha: 'Hoy', tipo, productoId, cantidad, motivo },
      ...prev,
    ])
  }

  return (
    <div className="flex flex-col min-h-[620px]">
      <Topbar onBack={onBack} />
      <TabBar tab={tab} setTab={setTab} />
      <div className="flex-1 overflow-auto p-4" style={{ backgroundColor: '#F3F6F5' }}>
        {tab === 'inventario'
          ? <InventarioTab productos={productos} registrarEntrada={registrarEntrada} />
          : <MovimientosTab productos={productos} movimientos={movimientos} registrarMovimiento={registrarMovimiento} />
        }
      </div>
    </div>
  )
}

// ─── Root export ──────────────────────────────────────────────────────────────

export default function StockDemo({ onBack }: { onBack: () => void }) {
  const [screen, setScreen] = useState<Screen>('splash')
  if (screen === 'splash') return <Splash onBack={onBack} onEnter={() => setScreen('main')} />
  return <MainPanel onBack={() => setScreen('splash')} />
}
