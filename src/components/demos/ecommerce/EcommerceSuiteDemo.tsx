'use client'

import { useState, useRef, useEffect } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Badge from '@/components/ui/Badge'
import {
  clientesEcoIniciales, carritosAbandonadosIniciales, productosCotizarIniciales,
  respuestasAgente, MensajeChat,
} from '@/data/ecommerce'

const fmt = (n: number) => n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 })

// ─── Clientes ─────────────────────────────────────────────────────────────────
function ClientesPanel() {
  const [expanded, setExpanded] = useState<string | null>(null)
  return (
    <div>
      <p className="text-sm font-semibold text-carbon mb-4">Base de clientes</p>
      <div className="space-y-2">
        {clientesEcoIniciales.map((c) => {
          const isOpen = expanded === c.id
          const totalCompras = c.historialCompras.reduce((a, b) => a + b.monto, 0)
          return (
            <div key={c.id} className="rounded-lg border border-borde overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : c.id)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-fondo-suave/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-dataria flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {c.nombre.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-carbon">{c.nombre}</p>
                    <p className="text-xs text-texto-sec">{c.email} · {c.telefono}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-texto-sec">{c.historialCompras.length} compras</p>
                    <p className="text-sm font-bold text-azul-nucleo">{fmt(totalCompras)}</p>
                  </div>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className={`text-texto-sec transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </button>
              {isOpen && (
                <div className="border-t border-borde bg-fondo-suave p-4">
                  <div className="grid sm:grid-cols-3 gap-3 mb-3">
                    <div className="bg-white rounded-lg border border-borde p-3 text-center">
                      <p className="text-xs text-texto-sec mb-1">Total gastado</p>
                      <p className="text-sm font-bold text-azul-nucleo">{fmt(totalCompras)}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-borde p-3 text-center">
                      <p className="text-xs text-texto-sec mb-1">Frecuencia</p>
                      <p className="text-sm font-bold text-carbon">{c.historialCompras.length} compras</p>
                    </div>
                    <div className="bg-white rounded-lg border border-borde p-3 text-center">
                      <p className="text-xs text-texto-sec mb-1">Cat. principal</p>
                      <p className="text-sm font-bold text-carbon">
                        {Object.entries(
                          c.historialCompras.reduce((acc, h) => { acc[h.categoria] = (acc[h.categoria] || 0) + 1; return acc }, {} as Record<string, number>)
                        ).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'}
                      </p>
                    </div>
                  </div>
                  <table className="w-full text-xs">
                    <thead><tr className="text-left"><th className="py-1.5 text-texto-sec font-semibold uppercase tracking-wide">Producto</th><th className="py-1.5 text-texto-sec font-semibold uppercase tracking-wide">Categoría</th><th className="py-1.5 text-texto-sec font-semibold uppercase tracking-wide">Fecha</th><th className="py-1.5 text-texto-sec font-semibold uppercase tracking-wide text-right">Monto</th></tr></thead>
                    <tbody className="divide-y divide-borde">
                      {c.historialCompras.map((h, i) => (
                        <tr key={i}><td className="py-2 text-carbon font-medium">{h.producto}</td><td className="py-2 text-texto-sec">{h.categoria}</td><td className="py-2 text-texto-sec">{h.fecha}</td><td className="py-2 text-right font-semibold text-carbon">{fmt(h.monto)}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Carritos ─────────────────────────────────────────────────────────────────
function CarritosPanel() {
  const [carritos, setCarritos] = useState(carritosAbandonadosIniciales)
  const [notified, setNotified] = useState<string[]>([])

  const notify = (id: string) => {
    setNotified((prev) => [...prev, id])
    setTimeout(() => setCarritos((prev) => prev.filter((c) => c.id !== id)), 1500)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-carbon">Carritos sin accionar</p>
        <Badge variant="yellow">{carritos.length} pendientes</Badge>
      </div>
      {carritos.length === 0 && (
        <div className="text-center py-12 text-texto-sec text-sm">
          ✓ No hay carritos abandonados pendientes
        </div>
      )}
      <div className="space-y-3">
        {carritos.map((carrito) => {
          const cliente = clientesEcoIniciales.find((c) => c.id === carrito.clienteId)
          const total = carrito.productos.reduce((a, p) => a + p.precio * p.cantidad, 0)
          const isNotified = notified.includes(carrito.id)
          return (
            <div key={carrito.id} className="rounded-lg border border-borde bg-white p-4 shadow-card">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-sm font-semibold text-carbon">{cliente?.nombre ?? '—'}</p>
                    <Badge variant="yellow">{carrito.tiempoDesdeAbandono}</Badge>
                  </div>
                  <div className="space-y-1">
                    {carrito.productos.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="text-texto-sec">{p.cantidad}× {p.nombre}</span>
                        <span className="font-medium text-carbon">{fmt(p.precio * p.cantidad)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-texto-sec mb-1">Valor del carrito</p>
                  <p className="text-lg font-extrabold text-azul-nucleo">{fmt(total)}</p>
                  <Button
                    size="sm"
                    variant={isNotified ? 'ghost' : 'primary'}
                    className="mt-2"
                    disabled={isNotified}
                    onClick={() => notify(carrito.id)}
                  >
                    {isNotified ? '✓ Notificado' : 'Enviar recordatorio'}
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Análisis ─────────────────────────────────────────────────────────────────
function AnalisisPanel() {
  return (
    <div>
      <p className="text-sm font-semibold text-carbon mb-4">Análisis de usuarios</p>
      <div className="space-y-4">
        {clientesEcoIniciales.map((c) => {
          const total = c.historialCompras.reduce((a, b) => a + b.monto, 0)
          const catMap = c.historialCompras.reduce((acc, h) => {
            acc[h.categoria] = (acc[h.categoria] || 0) + 1; return acc
          }, {} as Record<string, number>)
          const topCat = Object.entries(catMap).sort((a, b) => b[1] - a[1])[0]
          const avg = total / (c.historialCompras.length || 1)
          return (
            <div key={c.id} className="rounded-lg border border-borde bg-white p-4 shadow-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-dataria flex items-center justify-center text-white text-xs font-bold">
                  {c.nombre.charAt(0)}
                </div>
                <p className="font-semibold text-carbon text-sm">{c.nombre}</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-fondo-suave rounded-md p-3 text-center">
                  <p className="text-[11px] text-texto-sec mb-1">Ticket promedio</p>
                  <p className="text-sm font-bold text-azul-nucleo">{fmt(avg)}</p>
                </div>
                <div className="bg-fondo-suave rounded-md p-3 text-center">
                  <p className="text-[11px] text-texto-sec mb-1">Cat. favorita</p>
                  <p className="text-sm font-bold text-carbon">{topCat?.[0] ?? '—'}</p>
                </div>
                <div className="bg-fondo-suave rounded-md p-3 text-center">
                  <p className="text-[11px] text-texto-sec mb-1">Última compra</p>
                  <p className="text-sm font-bold text-carbon">
                    {[...c.historialCompras].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())[0]?.fecha ?? '—'}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Agente ───────────────────────────────────────────────────────────────────
function AgentePanel() {
  const [messages, setMessages] = useState<MensajeChat[]>([
    { id: 'init', rol: 'agente', texto: '¡Hola! Soy el asistente virtual de Dataria Store. ¿En qué te puedo ayudar hoy?', timestamp: 'ahora' },
  ])
  const [input, setInput]   = useState('')
  const bottomRef           = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    const text = input.trim()
    if (!text) return
    const userMsg: MensajeChat = { id: `u${Date.now()}`, rol: 'usuario', texto: text, timestamp: 'ahora' }
    const lc = text.toLowerCase()
    const match = respuestasAgente.find((r) => r.patron.split('|').some((p) => lc.includes(p)))
    const reply: MensajeChat = {
      id: `a${Date.now() + 1}`,
      rol: 'agente',
      texto: match?.respuesta ?? 'Entiendo tu consulta. Te voy a poner en contacto con un asesor para darte la mejor respuesta. ¿Podés dejarnos tu nombre y teléfono?',
      timestamp: 'ahora',
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTimeout(() => setMessages((prev) => [...prev, reply]), 700)
  }

  return (
    <div>
      <p className="text-sm font-semibold text-carbon mb-1">Agente de respuestas</p>
      <p className="text-xs text-texto-sec mb-4">Simulación de respuestas automáticas. Probá: "envío", "devolución", "garantía", "factura".</p>
      <div className="rounded-xl border border-borde overflow-hidden flex flex-col" style={{ maxHeight: 480 }}>
        <div className="bg-azul-nucleo px-4 py-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-celeste-luz animate-pulse" />
          <span className="text-white text-sm font-semibold">Asistente Dataria Store</span>
          <Badge variant="celeste" className="ml-auto">Simulación</Badge>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-fondo-suave" style={{ minHeight: 280 }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.rol === 'usuario' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                  msg.rol === 'usuario'
                    ? 'bg-azul-nucleo text-white rounded-xl rounded-br-sm'
                    : 'bg-white text-carbon border border-borde rounded-xl rounded-bl-sm shadow-card'
                }`}
              >
                {msg.texto}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="p-3 border-t border-borde bg-white flex gap-2">
          <input
            className="flex-1 h-10 px-3 rounded-sm border border-borde text-sm text-carbon focus:outline-none focus:border-azul-accion focus:ring-2 focus:ring-azul-accion/15 transition-all"
            placeholder="Escribí tu consulta..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
          />
          <Button size="md" onClick={send}>Enviar</Button>
        </div>
      </div>
    </div>
  )
}

// ─── Cotizador ────────────────────────────────────────────────────────────────
function CotizadorPanel() {
  const [productoId, setProductoId] = useState('')
  const [cantidad, setCantidad]     = useState(1)
  const [result, setResult]         = useState<null | { nombre: string; precio: number; desc: number }>(null)

  const descuento = (qty: number) => qty >= 10 ? 0.15 : qty >= 5 ? 0.08 : qty >= 3 ? 0.05 : 0

  const cotizar = () => {
    const prod = productosCotizarIniciales.find((p) => p.id === productoId)
    if (!prod) return
    const desc = descuento(cantidad)
    setResult({ nombre: prod.nombre, precio: prod.precioBase * cantidad * (1 - desc), desc })
  }

  return (
    <div>
      <p className="text-sm font-semibold text-carbon mb-4">Cotizador de productos</p>
      <div className="max-w-md">
        <div className="bg-fondo-suave rounded-xl border border-borde p-6 space-y-4">
          <Select label="Producto" value={productoId} onChange={(e) => { setProductoId(e.target.value); setResult(null) }}>
            <option value="">Seleccionar producto</option>
            {productosCotizarIniciales.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre} — {fmt(p.precioBase)}/unidad</option>
            ))}
          </Select>
          <Input
            label="Cantidad"
            type="number"
            min={1}
            value={cantidad}
            onChange={(e) => { setCantidad(Number(e.target.value)); setResult(null) }}
          />
          {cantidad >= 3 && (
            <div className="text-xs text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">
              ✓ Descuento por volumen: {(descuento(cantidad) * 100).toFixed(0)}%
            </div>
          )}
          <Button onClick={cotizar} disabled={!productoId} className="w-full" size="lg">Cotizar</Button>

          {result && (
            <div className="rounded-xl bg-tinte-interfaz border border-azul-nucleo/20 p-5 text-center animate-fade-in">
              <p className="text-xs text-texto-sec mb-1">{result.nombre} × {cantidad}</p>
              {result.desc > 0 && (
                <p className="text-xs text-green-600 mb-2 font-semibold">Descuento {(result.desc * 100).toFixed(0)}% aplicado</p>
              )}
              <p className="text-3xl font-extrabold text-azul-nucleo">{fmt(result.precio)}</p>
              <p className="text-xs text-texto-sec/70 mt-2">Este precio es una estimación de ejemplo</p>
              <Button variant="secondary" size="sm" className="mt-3">Solicitar cotización formal</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'clientes',  label: 'Clientes'  },
  { id: 'carritos',  label: 'Carritos'  },
  { id: 'analisis',  label: 'Análisis'  },
  { id: 'agente',    label: 'Agente'    },
  { id: 'cotizador', label: 'Cotizador' },
] as const

type TabId = typeof TABS[number]['id']

export default function EcommerceSuiteDemo() {
  const [tab, setTab] = useState<TabId>('carritos')

  return (
    <div className="space-y-5">
      <div className="flex gap-1 flex-wrap border-b border-borde pb-0">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all duration-160 -mb-px ${
              tab === t.id
                ? 'text-azul-nucleo border-azul-nucleo'
                : 'text-texto-sec border-transparent hover:text-carbon'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="animate-fade-in" key={tab}>
        {tab === 'clientes'  && <ClientesPanel />}
        {tab === 'carritos'  && <CarritosPanel />}
        {tab === 'analisis'  && <AnalisisPanel />}
        {tab === 'agente'    && <AgentePanel />}
        {tab === 'cotizador' && <CotizadorPanel />}
      </div>
    </div>
  )
}
