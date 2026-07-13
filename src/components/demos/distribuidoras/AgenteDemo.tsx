'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = 'splash' | 'chat'

interface Msg {
  id: string
  role: 'user' | 'agent'
  content: string
  streaming?: boolean
}

interface OrderItem {
  nombre: string
  cantidad: number
  neto: number
  iva: number
  subtotal: number
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATALOGO: Record<string, number> = {
  'Aceite de girasol 1L':   1250,
  'Harina 000 x 25kg':      8900,
  'Azúcar x 50kg':          14500,
  'Arroz largo fino x 5kg': 3200,
  'Yerba mate x 1kg':       2100,
}
const IVA_RATE = 0.21

const TRACKER_STEPS = ['Pedido recibido', 'En preparación', 'En camino', 'Entregado']

const CAPABILITIES = [
  'IA conversacional',
  'Reconoce clientes recurrentes',
  'Desglose neto + IVA',
  'Resumen automático',
  'Tracker en tiempo real',
]

const INIT_MSGS: Msg[] = [
  {
    id: 'a0',
    role: 'agent',
    content: '¡Hola! Soy el asistente de Distribuidora Central. Estoy acá para ayudarte a gestionar tu pedido. 😊',
  },
  {
    id: 'u1',
    role: 'user',
    content: 'Hola, necesito hacer un pedido',
  },
  {
    id: 'a2',
    role: 'agent',
    content: '¡Perfecto! ¿Qué productos necesitás? Tenemos aceite de girasol, harina, azúcar, arroz y yerba mate.',
  },
]

const RECURRING_ORDER = [
  { nombre: 'Aceite de girasol 1L', cantidad: 20 },
  { nombre: 'Harina 000 x 25kg',    cantidad: 10 },
  { nombre: 'Azúcar x 50kg',        cantidad: 5  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computeItem(nombre: string, cantidad: number): OrderItem {
  const precioUnitario = CATALOGO[nombre] ?? 0
  const neto = precioUnitario * cantidad
  const iva = Math.round(neto * IVA_RATE)
  return { nombre, cantidad, neto, iva, subtotal: neto + iva }
}

// La API de Claude exige que la conversación empiece con role 'user' — los mensajes
// de bienvenida hardcodeados (role 'agent') no cuentan como historial real.
function toApiMessages(msgs: Msg[]): { role: 'user' | 'assistant'; content: string }[] {
  const firstUserIdx = msgs.findIndex(m => m.role === 'user')
  const trimmed = firstUserIdx === -1 ? [] : msgs.slice(firstUserIdx)
  return trimmed.filter(m => m.content).map(m => ({ role: m.role === 'agent' ? 'assistant' : 'user', content: m.content }))
}

// Extrae el resumen de pedido que Claude devuelve en el formato acordado
// (ver system prompt en /api/anthropic) para actualizar el panel en vivo.
function parseOrderFromText(text: string): OrderItem[] | null {
  const re = /^-\s*(.+?)\s*x\s*(\d+)\s*=\s*\$?\s*([\d.,]+)/i
  const items: OrderItem[] = []
  for (const line of text.split('\n')) {
    const m = line.match(re)
    if (!m) continue
    const nombre = m[1].trim()
    const cantidad = parseInt(m[2], 10)
    const neto = parseFloat(m[3].replace(/\./g, '').replace(',', '.')) || 0
    const iva = Math.round(neto * IVA_RATE)
    items.push({ nombre, cantidad, neto, iva, subtotal: neto + iva })
  }
  return items.length > 0 ? items : null
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IcoBack({ light, onClick }: { light?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-sm font-medium transition-colors"
      style={{ color: light ? 'rgba(255,255,255,0.6)' : '#5A6871' }}
      onMouseEnter={e => (e.currentTarget.style.color = light ? '#fff' : '#306ECF')}
      onMouseLeave={e => (e.currentTarget.style.color = light ? 'rgba(255,255,255,0.6)' : '#5A6871')}
    >
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
      Volver
    </button>
  )
}

// ─── Splash ───────────────────────────────────────────────────────────────────

function SplashScreen({ onBack, onStart }: { onBack: () => void; onStart: () => void }) {
  return (
    <div
      className="min-h-[560px] flex flex-col"
      style={{ background: 'linear-gradient(160deg, #1B5BC1 0%, #2a6fd4 50%, #45B5F3 100%)' }}
    >
      <div className="p-4">
        <IcoBack onClick={onBack} light />
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
            Distribuidoras · Demo
          </p>
          <h2 className="text-3xl font-bold text-white mb-3">Agente de pedidos</h2>
          <p className="text-base max-w-xs mx-auto leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Tomá pedidos por WhatsApp con IA conversacional real. Reconoce clientes recurrentes, calcula neto + IVA
            y genera resúmenes automáticos.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center max-w-sm">
          {CAPABILITIES.map(c => (
            <span
              key={c}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
            >
              {c}
            </span>
          ))}
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

// ─── Chat bubble ──────────────────────────────────────────────────────────────

function ChatBubble({ msg }: { msg: Msg }) {
  if (msg.role === 'agent') {
    return (
      <div className="flex items-end gap-2">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold text-white"
          style={{ backgroundColor: '#306ECF' }}
        >
          D
        </div>
        <div
          className="max-w-[78%] px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm leading-relaxed text-white"
          style={{ backgroundColor: '#306ECF' }}
        >
          {msg.streaming && !msg.content ? (
            <span className="flex gap-1 items-center" style={{ height: 18 }}>
              {[0, 150, 300].map(delay => (
                <span
                  key={delay}
                  className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </span>
          ) : (
            <span style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</span>
          )}
        </div>
      </div>
    )
  }
  return (
    <div className="flex justify-end">
      <div
        className="max-w-[78%] px-4 py-2.5 rounded-2xl rounded-br-sm text-sm leading-relaxed"
        style={{ backgroundColor: '#fff', color: '#1a2530', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
      >
        {msg.content}
      </div>
    </div>
  )
}

// ─── Recurring chip ───────────────────────────────────────────────────────────

function RecurringChip({ onAccept, onReject }: { onAccept: () => void; onReject: () => void }) {
  return (
    <div
      className="mx-auto max-w-[88%] rounded-xl p-3 text-center"
      style={{
        backgroundColor: 'rgba(255,255,255,0.92)',
        border: '1px solid rgba(48,110,207,0.2)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <p className="text-[11px] font-bold mb-0.5" style={{ color: '#306ECF' }}>
        Cliente recurrente detectado
      </p>
      <p className="text-xs font-semibold mb-0.5" style={{ color: '#1B3A5C' }}>
        ¿Repetir tu pedido habitual?
      </p>
      <p className="text-[11px] mb-2.5" style={{ color: '#5A6871' }}>
        Aceite ×20 · Harina ×10 · Azúcar ×5
      </p>
      <div className="flex gap-2 justify-center">
        <button
          onClick={onAccept}
          className="px-4 py-1.5 rounded-lg text-white font-semibold text-xs transition-opacity hover:opacity-85"
          style={{ backgroundColor: '#306ECF' }}
        >
          Sí, repetir
        </button>
        <button
          onClick={onReject}
          className="px-4 py-1.5 rounded-lg font-semibold text-xs"
          style={{ backgroundColor: '#f3f4f6', color: '#5A6871' }}
        >
          No, otro pedido
        </button>
      </div>
    </div>
  )
}

// ─── Complementary chips ──────────────────────────────────────────────────────

function ComplementaryChips({
  products,
  onSelect,
}: {
  products: string[]
  onSelect: (p: string) => void
}) {
  return (
    <div className="pl-9 flex flex-col gap-1.5">
      <p className="text-[11px] font-semibold" style={{ color: 'rgba(30,70,130,0.6)' }}>
        También te puede interesar:
      </p>
      <div className="flex flex-wrap gap-2">
        {products.map(p => (
          <button
            key={p}
            onClick={() => onSelect(p)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-opacity hover:opacity-85"
            style={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              color: '#306ECF',
              border: '1px solid rgba(48,110,207,0.3)',
            }}
          >
            + {p}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Tracker step ─────────────────────────────────────────────────────────────

function StepDot({ done, active }: { done: boolean; active: boolean }) {
  if (done) {
    return (
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: '#306ECF' }}
      >
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    )
  }
  if (active) {
    return (
      <div
        className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
        style={{ borderColor: '#306ECF' }}
      >
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#306ECF' }} />
      </div>
    )
  }
  return (
    <div
      className="w-6 h-6 rounded-full border-2 flex-shrink-0"
      style={{ borderColor: '#e5e7eb' }}
    />
  )
}

// ─── Order panel ──────────────────────────────────────────────────────────────

function OrderPanel({
  items,
  step,
  onDownload,
}: {
  items: OrderItem[]
  step: number
  onDownload: () => void
}) {
  const totalNeto = items.reduce((a, i) => a + i.neto, 0)
  const totalIva  = items.reduce((a, i) => a + i.iva, 0)
  const totalFinal = totalNeto + totalIva

  return (
    <div className="flex flex-col h-full">
      <p
        className="text-[10px] font-bold uppercase tracking-widest mb-4 flex-shrink-0"
        style={{ color: 'rgba(90,104,113,0.55)' }}
      >
        Pedido actual
      </p>

      {/* Items or empty state */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-6 flex-shrink-0">
          <div
            className="w-11 h-11 rounded-xl mb-3 flex items-center justify-center"
            style={{ backgroundColor: '#EAF5FD' }}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#306ECF" strokeWidth={1.5}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <p className="text-xs font-semibold text-carbon mb-1">Sin items aún</p>
          <p className="text-[11px]" style={{ color: '#5A6871' }}>
            Conversá con el agente para armar tu pedido.
          </p>
        </div>
      ) : (
        <div className="flex-shrink-0 mb-3">
          <div className="space-y-2.5 mb-3">
            {items.map((item, i) => (
              <div key={i} className="text-xs">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <p className="font-medium text-carbon leading-tight truncate flex-1 min-w-0">{item.nombre}</p>
                  <p className="font-bold flex-shrink-0" style={{ color: '#306ECF' }}>
                    ${item.subtotal.toLocaleString('es-AR')}
                  </p>
                </div>
                <p style={{ color: '#5A6871' }}>
                  ×{item.cantidad} · neto ${item.neto.toLocaleString('es-AR')} + IVA ${item.iva.toLocaleString('es-AR')}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-2.5 space-y-1" style={{ backgroundColor: '#EAF5FD' }}>
            <div className="flex items-center justify-between">
              <p className="text-[11px]" style={{ color: '#5A6871' }}>Neto</p>
              <p className="text-xs font-semibold text-carbon">${totalNeto.toLocaleString('es-AR')}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[11px]" style={{ color: '#5A6871' }}>IVA (21%)</p>
              <p className="text-xs font-semibold text-carbon">${totalIva.toLocaleString('es-AR')}</p>
            </div>
            <div className="flex items-center justify-between pt-1 border-t" style={{ borderColor: 'rgba(48,110,207,0.2)' }}>
              <p className="text-xs font-bold text-carbon">Total</p>
              <p className="text-sm font-bold" style={{ color: '#306ECF' }}>
                ${totalFinal.toLocaleString('es-AR')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tracker */}
      <div className="flex-shrink-0">
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-3"
          style={{ color: 'rgba(90,104,113,0.55)' }}
        >
          Estado del pedido
        </p>
        <div className="space-y-3">
          {TRACKER_STEPS.map((label, i) => {
            const done = step > i
            const active = step === i
            return (
              <div key={label} className="flex items-center gap-2.5">
                <StepDot done={done} active={active} />
                <p
                  className="text-xs font-semibold flex-1"
                  style={{ color: done || active ? '#1a2530' : '#D1D5DB' }}
                >
                  {label}
                </p>
                {active && (
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: 'rgba(48,110,207,0.1)', color: '#306ECF' }}
                  >
                    Ahora
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Download */}
      {items.length > 0 && (
        <button
          onClick={onDownload}
          className="mt-auto pt-4 w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-opacity hover:opacity-85 flex items-center justify-center gap-1.5 flex-shrink-0"
          style={{
            backgroundColor: '#EAF5FD',
            color: '#306ECF',
            border: '1px solid rgba(48,110,207,0.2)',
          }}
        >
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Descargar resumen
        </button>
      )}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AgenteDemo({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState<Phase>('splash')
  const [messages, setMessages] = useState<Msg[]>(INIT_MSGS)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [trackerStep, setTrackerStep] = useState(-1)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [showRecurring, setShowRecurring] = useState(true)
  const [complementary, setComplementary] = useState<string[]>([])

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = chatContainerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, showRecurring, complementary])

  // Auto-advance tracker steps when order is confirmed
  useEffect(() => {
    if (!orderConfirmed) return
    setTrackerStep(0)
    const t1 = setTimeout(() => setTrackerStep(1), 3000)
    const t2 = setTimeout(() => setTrackerStep(2), 6000)
    const t3 = setTimeout(() => setTrackerStep(3), 10000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [orderConfirmed])

  const applyConfirmedOrder = (items: OrderItem[]) => {
    setOrderItems(items)
    setOrderConfirmed(true)
    const ordered = items.map(i => i.nombre)
    setComplementary(Object.keys(CATALOGO).filter(p => !ordered.includes(p)).slice(0, 2))
  }

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    setShowRecurring(false)
    setComplementary([])

    const userMsg: Msg = { id: String(Date.now()), role: 'user', content }
    const historyForApi = [...messages, userMsg]
    setMessages(prev => [...prev, userMsg])
    setInputValue('')
    setIsLoading(true)

    const agentId = String(Date.now() + 1)
    setMessages(prev => [...prev, { id: agentId, role: 'agent', content: '', streaming: true }])

    try {
      const res = await fetch('/api/anthropic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: toApiMessages(historyForApi) }),
      })
      if (!res.ok || !res.body) throw new Error(`API respondió ${res.status}`)

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        setMessages(prev => prev.map(m => m.id === agentId ? { ...m, content: acc, streaming: true } : m))
      }
      if (!acc) console.error('[AgenteDemo] La API devolvió una respuesta vacía.')
      setMessages(prev => prev.map(m => m.id === agentId
        ? { ...m, content: acc || 'No pude generar una respuesta. Probá de nuevo.', streaming: false }
        : m))

      if (!orderConfirmed) {
        const parsed = parseOrderFromText(acc)
        if (parsed) applyConfirmedOrder(parsed)
      }
    } catch (err) {
      console.error('[AgenteDemo] Error al conectar con la IA:', err)
      setMessages(prev => prev.map(m => m.id === agentId
        ? { ...m, content: 'Hubo un error de conexión con el asistente. Probá de nuevo en unos segundos.', streaming: false }
        : m))
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleAcceptRecurring = () => {
    setShowRecurring(false)
    const items = RECURRING_ORDER.map(o => computeItem(o.nombre, o.cantidad))
    applyConfirmedOrder(items)
    const userMsg: Msg = {
      id: String(Date.now()),
      role: 'user',
      content: 'Sí, repetir mi pedido habitual: Aceite de girasol 1L x20, Harina 000 x 25kg x10, Azúcar x 50kg x5',
    }
    setMessages(prev => [...prev, userMsg])
    void sendFollowupConfirmation(userMsg, items)
  }

  // Pide a Claude una confirmación conversacional del pedido recurrente ya cargado.
  const sendFollowupConfirmation = async (userMsg: Msg, items: OrderItem[]) => {
    setIsLoading(true)
    const agentId = String(Date.now() + 1)
    setMessages(prev => [...prev, { id: agentId, role: 'agent', content: '', streaming: true }])
    try {
      const totalFinal = items.reduce((a, i) => a + i.subtotal, 0)
      const res = await fetch('/api/anthropic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: toApiMessages([...messages, userMsg]) }),
      })
      if (!res.ok || !res.body) throw new Error(`API respondió ${res.status}`)
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        setMessages(prev => prev.map(m => m.id === agentId ? { ...m, content: acc, streaming: true } : m))
      }
      setMessages(prev => prev.map(m => m.id === agentId
        ? { ...m, content: acc || `¡Listo! Repetimos tu pedido habitual. Total con IVA: $${totalFinal.toLocaleString('es-AR')}.`, streaming: false }
        : m))
    } catch (err) {
      console.error('[AgenteDemo] Error al conectar con la IA:', err)
      setMessages(prev => prev.map(m => m.id === agentId ? { ...m, content: 'Pedido registrado. (No pudimos conectar con el asistente para la confirmación por chat.)', streaming: false } : m))
    } finally {
      setIsLoading(false)
    }
  }

  const downloadOrder = () => {
    if (!orderItems.length) return
    const totalNeto = orderItems.reduce((a, i) => a + i.neto, 0)
    const totalIva  = orderItems.reduce((a, i) => a + i.iva, 0)
    const lines = [
      'DISTRIBUIDORA CENTRAL',
      '='.repeat(30),
      `Fecha: ${new Date().toLocaleString('es-AR')}`,
      '',
      'PEDIDO:',
      ...orderItems.map(i => `- ${i.nombre} x${i.cantidad}  neto $${i.neto.toLocaleString('es-AR')}  IVA $${i.iva.toLocaleString('es-AR')}  subtotal $${i.subtotal.toLocaleString('es-AR')}`),
      '',
      `NETO: $${totalNeto.toLocaleString('es-AR')}`,
      `IVA (21%): $${totalIva.toLocaleString('es-AR')}`,
      `TOTAL: $${(totalNeto + totalIva).toLocaleString('es-AR')}`,
      '',
      `Estado: ${trackerStep >= 0 ? TRACKER_STEPS[trackerStep] : 'Procesando'}`,
    ].join('\n')

    const url = URL.createObjectURL(new Blob([lines], { type: 'text/plain; charset=utf-8' }))
    const a = Object.assign(document.createElement('a'), { href: url, download: 'pedido-distribuidora.txt' })
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (phase === 'splash') {
    return <SplashScreen onBack={onBack} onStart={() => setPhase('chat')} />
  }

  return (
    <div className="flex flex-col min-h-[560px]">
      {/* Header */}
      <div style={{ backgroundColor: '#1B5BC1' }} className="flex items-center justify-between px-5 py-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="font-extrabold text-lg text-white leading-none">
            <span style={{ color: '#56BCFA' }}>d</span>ataria
          </span>
          <span className="text-white/40 text-sm">·</span>
          <span className="text-white/75 text-sm">Distribuidoras · Agente de pedidos</span>
        </div>
        <button onClick={onBack}
          className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Inicio
        </button>
      </div>

      <div className="flex" style={{ height: 580 }}>
      {/* ── Chat column (60%) ── */}
      <div className="flex flex-col" style={{ width: '60%', borderRight: '1px solid #e5e7eb' }}>
        {/* Contact bar */}
        <div
          className="flex items-center gap-2.5 px-3 py-2.5 flex-shrink-0"
          style={{ backgroundColor: '#306ECF', borderBottom: '1px solid #2558A8' }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.18)', color: '#fff' }}
          >
            DC
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white leading-tight truncate">
              Distribuidora Central
            </p>
            <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
              ● En línea
            </p>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-3 space-y-3"
          style={{
            backgroundColor: '#EAF5FD',
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        >
          {messages.map(msg => (
            <ChatBubble key={msg.id} msg={msg} />
          ))}

          {showRecurring && !isLoading && (
            <RecurringChip
              onAccept={handleAcceptRecurring}
              onReject={() => setShowRecurring(false)}
            />
          )}

          {complementary.length > 0 && !isLoading && (
            <ComplementaryChips
              products={complementary}
              onSelect={p => sendMessage(`¿Podés agregar ${p} al pedido?`)}
            />
          )}

        </div>

        {/* Input */}
        <div
          className="flex items-center gap-2 px-3 py-2.5 flex-shrink-0"
          style={{ backgroundColor: '#fff', borderTop: '1px solid #e5e7eb' }}
        >
          <input
            ref={inputRef}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(inputValue)}
            placeholder="Escribí tu pedido..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded-full text-sm outline-none disabled:opacity-60"
            style={{
              backgroundColor: '#f3f4f6',
              color: '#1a2530',
              border: '1px solid transparent',
            }}
          />
          <button
            onClick={() => sendMessage(inputValue)}
            disabled={isLoading || !inputValue.trim()}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-85 disabled:opacity-35 flex-shrink-0"
            style={{ backgroundColor: '#306ECF' }}
          >
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Order panel (40%) ── */}
      <div className="overflow-y-auto p-4" style={{ width: '40%', backgroundColor: '#f9fafb' }}>
        <OrderPanel
          items={orderItems}
          step={trackerStep}
          onDownload={downloadOrder}
        />
      </div>
      </div>
    </div>
  )
}
