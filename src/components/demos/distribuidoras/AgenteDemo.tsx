'use client'

import { useState, useRef, useEffect } from 'react'

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
  subtotal: number
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATALOG_NAMES = [
  'Aceite de girasol 1L',
  'Harina 000 x 25kg',
  'Azúcar x 50kg',
  'Arroz largo fino x 5kg',
  'Yerba mate x 1kg',
]

const TRACKER_STEPS = ['Pedido recibido', 'En preparación', 'En camino', 'Entregado']

const CAPABILITIES = [
  'IA conversacional',
  'Reconoce clientes recurrentes',
  'Sugiere complementarios',
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

// ─── Icons ────────────────────────────────────────────────────────────────────

function IcoWA() {
  return (
    <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  )
}

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
      className="relative flex flex-col overflow-hidden"
      style={{
        minHeight: 520,
        background: 'linear-gradient(140deg, #0A1829 0%, #0F2847 45%, #0A1E35 100%)',
      }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(48,110,207,0.18) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />
      <div className="relative p-5">
        <IcoBack onClick={onBack} light />
      </div>
      <div className="relative flex-1 flex flex-col items-center justify-center gap-6 text-center px-8 pb-10">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-white"
          style={{ backgroundColor: '#306ECF' }}
        >
          <IcoWA />
        </div>
        <div>
          <p
            className="text-[11px] font-bold uppercase tracking-widest mb-2"
            style={{ color: '#5B9BF5' }}
          >
            Distribuidoras · Demo
          </p>
          <h2 className="text-3xl font-bold text-white mb-3">Agente de pedidos</h2>
          <p className="text-sm max-w-xs mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Tomá pedidos por WhatsApp con IA conversacional. Reconoce clientes recurrentes, sugiere
            productos y genera resúmenes automáticos.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center max-w-sm">
          {CAPABILITIES.map(c => (
            <span
              key={c}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: 'rgba(48,110,207,0.15)',
                color: '#7BB3F0',
                border: '1px solid rgba(48,110,207,0.25)',
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
  total,
  step,
  onDownload,
}: {
  items: OrderItem[]
  total: number
  step: number
  onDownload: () => void
}) {
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
          <div className="space-y-2 mb-3">
            {items.map((item, i) => (
              <div key={i} className="flex items-start justify-between gap-2 text-xs">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-carbon leading-tight truncate">{item.nombre}</p>
                  <p style={{ color: '#5A6871' }}>×{item.cantidad}</p>
                </div>
                <p className="font-bold flex-shrink-0" style={{ color: '#306ECF' }}>
                  ${item.subtotal.toLocaleString('es-AR')}
                </p>
              </div>
            ))}
          </div>
          <div
            className="rounded-xl p-2.5 flex items-center justify-between"
            style={{ backgroundColor: '#EAF5FD' }}
          >
            <p className="text-xs font-bold text-carbon">Total</p>
            <p className="text-sm font-bold" style={{ color: '#306ECF' }}>
              ${total.toLocaleString('es-AR')}
            </p>
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

// ─── Predefined bot responses ────────────────────────────────────────────────

const RESP_CATALOG =
  `¡Perfecto! Anotamos tu pedido. Tenemos disponible:\n• Aceite de girasol 1L → $1.250/u (stock: 48)\n• Harina 000 x 25kg → $8.900/bolsa (stock: 12)\n• Azúcar x 50kg → $14.500/saco (stock: 8)\n• Arroz largo fino x 5kg → $3.200/paquete (stock: 35)\n• Yerba mate x 1kg → $2.100/paquete (stock: 60)\n\n¿Qué productos y cantidades necesitás? Te confirmo el total al instante.`

const RESP_PRICE =
  `¡Claro! Estos son nuestros precios actualizados:\n• Aceite de girasol 1L → $1.250/u ✅ disponible\n• Harina 000 x 25kg → $8.900/bolsa ✅ disponible\n• Azúcar x 50kg → $14.500/saco ⚠️ stock limitado (8 unidades)\n• Arroz largo fino x 5kg → $3.200/paquete ✅ disponible\n• Yerba mate x 1kg → $2.100/paquete ✅ disponible\n\nLos precios incluyen IVA. ¿Querés hacer un pedido?`

const RESP_CONFIRM =
  `¡Pedido confirmado! 🎉\n\nResumen:\n• Aceite de girasol x10 → $12.500\n• Harina 000 x5 → $44.500\n• Yerba mate x20 → $42.000\nTotal: $99.000\n\nNúmero de pedido: #0047\nEntrega estimada: mañana entre 9 y 13hs.\n\nTe vamos a avisar por este mismo chat cuando el camión salga. ¡Gracias por tu pedido!`

const RESP_DEFAULT =
  `Hola, soy el asistente de Distribuidora Central. Puedo ayudarte con:\n• Consultar precios y disponibilidad de productos\n• Hacer un pedido\n• Confirmar una entrega\n\n¿En qué te puedo ayudar?`

type BotType = 'catalog' | 'price' | 'confirm' | 'default'

function getBotResponse(input: string): { text: string; type: BotType } {
  const t = input.toLowerCase()
  if (/\bsí\b|\bsi\b|confirmo|confirmar|listo|dale|\bok\b|perfecto|entrega|cuando|cuándo|despacho|envío|envio|dirección|direccion/.test(t))
    return { type: 'confirm',  text: RESP_CONFIRM  }
  if (/precio|costo|cuánto|cuanto|\bstock\b|\bhay\b|tenés|tienen|disponible|disponibilidad/.test(t))
    return { type: 'price',   text: RESP_PRICE   }
  if (/aceite|harina|azúcar|azucar|\barroz\b|yerba|necesito|quiero|\bpedido\b|\bpedir\b|cantidad|unidades|\bbolsas\b|\bsacos\b/.test(t))
    return { type: 'catalog', text: RESP_CATALOG  }
  return { type: 'default', text: RESP_DEFAULT }
}

const CONFIRM_ITEMS: OrderItem[] = [
  { nombre: 'Aceite de girasol 1L', cantidad: 10, subtotal: 12500 },
  { nombre: 'Harina 000 x 25kg',    cantidad: 5,  subtotal: 44500 },
  { nombre: 'Yerba mate x 1kg',     cantidad: 20, subtotal: 42000 },
]
const CONFIRM_TOTAL = 99000
const CONFIRM_COMP  = ['Azúcar x 50kg', 'Arroz largo fino x 5kg']

// ─── Main component ───────────────────────────────────────────────────────────

export default function AgenteDemo({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState<Phase>('splash')
  const [messages, setMessages] = useState<Msg[]>(INIT_MSGS)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [orderTotal, setOrderTotal] = useState(0)
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

  const sendMessage = (content: string) => {
    if (!content.trim() || isLoading) return

    setShowRecurring(false)
    setComplementary([])

    const userMsg: Msg = { id: String(Date.now()), role: 'user', content }
    setMessages(prev => [...prev, userMsg])
    setInputValue('')
    setIsLoading(true)

    const agentId = String(Date.now() + 1)
    setMessages(prev => [...prev, { id: agentId, role: 'agent', content: '', streaming: true }])

    const { text, type } = getBotResponse(content)

    setTimeout(() => {
      setMessages(prev =>
        prev.map(m => m.id === agentId ? { ...m, content: text, streaming: false } : m)
      )
      if (type === 'confirm' && !orderConfirmed) {
        setOrderItems(CONFIRM_ITEMS)
        setOrderTotal(CONFIRM_TOTAL)
        setOrderConfirmed(true)
        setComplementary(CONFIRM_COMP)
      }
      setIsLoading(false)
      inputRef.current?.focus()
    }, 1000)
  }

  const downloadOrder = () => {
    if (!orderItems.length) return
    const lines = [
      'DISTRIBUIDORA CENTRAL',
      '='.repeat(30),
      `Fecha: ${new Date().toLocaleString('es-AR')}`,
      '',
      'PEDIDO:',
      ...orderItems.map(i => `- ${i.nombre} x${i.cantidad}  $${i.subtotal.toLocaleString('es-AR')}`),
      '',
      `TOTAL: $${orderTotal.toLocaleString('es-AR')}`,
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
    <div className="flex" style={{ height: 520 }}>
      {/* ── Chat column (60%) ── */}
      <div className="flex flex-col" style={{ width: '60%', borderRight: '1px solid #e5e7eb' }}>
        {/* Header */}
        <div
          className="flex items-center gap-2.5 px-3 py-2.5 flex-shrink-0"
          style={{ backgroundColor: '#306ECF', borderBottom: '1px solid #2558A8' }}
        >
          <IcoBack onClick={onBack} light />
          <div className="w-px h-4 flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }} />
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
              onAccept={() =>
                sendMessage(
                  'Sí, repetir mi pedido habitual: Aceite de girasol 1L x20, Harina 000 x 25kg x10, Azúcar x 50kg x5'
                )
              }
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
          total={orderTotal}
          step={trackerStep}
          onDownload={downloadOrder}
        />
      </div>
    </div>
  )
}
