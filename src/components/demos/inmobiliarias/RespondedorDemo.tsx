'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase        = 'splash' | 'tool'
type Calificacion = 'Frío' | 'Tibio' | 'Caliente'
type EtapaCRM     = null | 'Interesado' | 'Visita agendada'
type ChatState    = 'idle' | 'waitingForDay'

interface Msg {
  id: string
  role: 'user' | 'agent'
  content: string
  streaming?: boolean
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

const VISIT_SLOTS = [
  { label: 'Miércoles 11:00hs', day: 'miércoles' },
  { label: 'Jueves 16:00hs',    day: 'jueves'    },
  { label: 'Viernes 10:00hs',   day: 'viernes'   },
]

const INIT_MSGS: Msg[] = [
  {
    id: 'a0',
    role: 'agent',
    content: '¡Hola! Soy el asistente de la inmobiliaria. Contanos qué tipo de propiedad estás buscando y te mostramos las opciones disponibles.',
  },
]

const LIMITE_MENSAJES = 10
const CALENDAR_URL = 'https://calendar.app.google/64ms78PrrpQv8x4n9'

function fmtUSD(n: number) {
  return `USD ${n.toLocaleString('es-AR')}`
}

// La API de Claude exige que la conversación empiece con role 'user' — el mensaje
// de bienvenida hardcodeado (role 'agent') no cuenta como historial real.
function toApiMessages(msgs: Msg[]): { role: 'user' | 'assistant'; content: string }[] {
  const firstUserIdx = msgs.findIndex(m => m.role === 'user')
  const trimmed = firstUserIdx === -1 ? [] : msgs.slice(firstUserIdx)
  return trimmed.filter(m => m.content).map(m => ({ role: m.role === 'agent' ? 'assistant' : 'user', content: m.content }))
}

// ─── Local heuristic — drives only the side panel (calificación / CRM / props) ──
// La respuesta real del chat la genera Claude; esto sólo clasifica la intención
// del mensaje del usuario para actualizar el panel de la derecha en vivo.

interface TriggerResult {
  calificacion: Calificacion
  addPropIds: number[]
  etapa: EtapaCRM
  showDayChips: boolean
  nextState: ChatState
}

function matchTrigger(text: string, state: ChatState): TriggerResult {
  const t = text.toLowerCase()

  if (state === 'waitingForDay') {
    const slot = VISIT_SLOTS.find(s => t.includes(s.day))
    if (slot) {
      return { calificacion: 'Caliente', addPropIds: [], etapa: 'Visita agendada', showDayChips: false, nextState: 'idle' }
    }
  }

  if (['visita', 'ver ', 'conocer', 'cuándo', 'cuando'].some(kw => t.includes(kw))) {
    return { calificacion: 'Caliente', addPropIds: [], etapa: null, showDayChips: true, nextState: 'waitingForDay' }
  }

  if (t.includes('palermo')) {
    return { calificacion: 'Caliente', addPropIds: [1], etapa: 'Interesado', showDayChips: false, nextState: 'idle' }
  }
  if (t.includes('belgrano') || t.includes('3 amb')) {
    return { calificacion: 'Tibio', addPropIds: [2, 5], etapa: 'Interesado', showDayChips: false, nextState: 'idle' }
  }
  if (t.includes('olivos') || t.includes('casa')) {
    return { calificacion: 'Tibio', addPropIds: [3], etapa: 'Interesado', showDayChips: false, nextState: 'idle' }
  }
  if (t.includes('caballito') || t.includes('1 amb')) {
    return { calificacion: 'Tibio', addPropIds: [4], etapa: 'Interesado', showDayChips: false, nextState: 'idle' }
  }
  if (t.includes('núñez') || t.includes('nunez')) {
    return { calificacion: 'Tibio', addPropIds: [5], etapa: 'Interesado', showDayChips: false, nextState: 'idle' }
  }
  if (t.includes('presupuesto') || t.includes('hasta ') || /usd|\$/.test(t) || /\d{5,}/.test(t)) {
    return { calificacion: 'Caliente', addPropIds: [], etapa: 'Interesado', showDayChips: false, nextState: 'idle' }
  }

  return { calificacion: 'Frío', addPropIds: [], etapa: null, showDayChips: false, nextState: 'idle' }
}

// ─── Splash ───────────────────────────────────────────────────────────────────

function Splash({ onBack, onStart }: { onBack: () => void; onStart: () => void }) {
  return (
    <div
      className="min-h-[620px] flex flex-col"
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
            Inmobiliarias · Consultas
          </p>
          <h2 className="text-3xl font-bold text-white mb-3">Agente de consultas</h2>
          <p className="text-base max-w-xs mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Respondé consultas del portal inmobiliario con IA real, calificá leads y agendá visitas sin intervención manual.
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
        <span className="text-white/75 text-sm">Inmobiliarias · Agente de consultas</span>
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

// ─── Chat bubble ──────────────────────────────────────────────────────────────

function ChatBubble({ msg }: { msg: Msg }) {
  if (msg.role === 'agent') {
    return (
      <div className="flex items-end gap-2">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[11px] font-black text-white"
          style={{ backgroundColor: '#306ECF', fontStyle: 'italic' }}
        >d</div>
        <div
          className="max-w-[78%] px-3.5 py-2.5 rounded-2xl rounded-bl-sm text-sm leading-relaxed text-white"
          style={{ backgroundColor: '#306ECF' }}
        >
          {msg.streaming && !msg.content ? (
            <span className="flex gap-1 items-center" style={{ height: 18 }}>
              {[0, 150, 300].map(d => (
                <span key={d} className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: `${d}ms` }} />
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
        className="max-w-[78%] px-3.5 py-2.5 rounded-2xl rounded-br-sm text-sm leading-relaxed"
        style={{ backgroundColor: '#fff', color: '#1a2530', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
      >
        {msg.content}
      </div>
    </div>
  )
}

// ─── Side panel ───────────────────────────────────────────────────────────────

function SidePanel({
  calificacion,
  etapaCRM,
  propIds,
}: {
  calificacion: Calificacion
  etapaCRM: EtapaCRM
  propIds: number[]
}) {
  const [pipelineMsg, setPipelineMsg] = useState(false)

  const calStyle: Record<Calificacion, { bg: string; color: string; dot: string }> = {
    'Caliente': { bg: 'rgba(239,68,68,0.08)',    color: '#dc2626', dot: '#ef4444'  },
    'Tibio':    { bg: 'rgba(245,158,11,0.1)',     color: '#b45309', dot: '#f59e0b'  },
    'Frío':     { bg: '#EAF5FD',                  color: '#1B5BC1', dot: '#45B5F3'  },
  }
  const cs = calStyle[calificacion]
  const matchedProps = PROPS.filter(p => propIds.includes(p.id))

  const handlePipeline = () => {
    setPipelineMsg(true)
    setTimeout(() => setPipelineMsg(false), 3000)
  }

  return (
    <div
      className="shrink-0 flex flex-col gap-4 p-4 border-l overflow-y-auto"
      style={{ width: 260, borderColor: '#DCE5E9', backgroundColor: '#F3F6F5' }}
    >
      {/* Calificación */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: '#5A6871' }}>
          Calificación del lead
        </p>
        <div
          className="rounded-xl px-4 py-3 flex items-center gap-3"
          style={{ backgroundColor: cs.bg }}
        >
          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cs.dot }} />
          <div>
            <p className="font-black text-xl leading-none" style={{ color: cs.color }}>{calificacion}</p>
            <p className="text-[11px] mt-0.5" style={{ color: cs.color, opacity: 0.75 }}>
              {calificacion === 'Caliente' ? 'Alto interés detectado' :
               calificacion === 'Tibio'    ? 'Interés moderado'       :
                                             'Consulta inicial'}
            </p>
          </div>
        </div>
      </div>

      {/* Propiedades sugeridas */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: '#5A6871' }}>
          Propiedades sugeridas
        </p>
        {matchedProps.length === 0 ? (
          <p className="text-xs" style={{ color: 'rgba(90,104,113,0.5)' }}>
            Aparecen a medida que la conversación avanza.
          </p>
        ) : (
          <div className="space-y-2">
            {matchedProps.map(p => (
              <div
                key={p.id}
                className="rounded-lg p-2.5 flex items-center gap-2.5"
                style={{ backgroundColor: '#fff', border: '1px solid #DCE5E9' }}
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#EAF5FD' }}
                >
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#1B5BC1" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V20.25a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V9.75z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20.25V12h6v8.25" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold leading-tight truncate" style={{ color: '#353C42' }}>{p.desc}</p>
                  <p className="text-[10px]" style={{ color: '#5A6871' }}>{p.metros} · {fmtUSD(p.precio)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Estado en CRM */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: '#5A6871' }}>
          Estado en el CRM
        </p>
        {etapaCRM ? (
          <div
            className="rounded-lg p-3"
            style={{ backgroundColor: '#EAF5FD', border: '1px solid rgba(27,91,193,0.15)' }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#1B5BC1" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-[11px] font-bold" style={{ color: '#1B5BC1' }}>Lead creado en CRM</p>
            </div>
            <p className="text-xs font-semibold mb-2.5" style={{ color: '#353C42' }}>
              Etapa: {etapaCRM}
            </p>
            <div className="relative">
              <button
                onClick={handlePipeline}
                className="w-full py-1.5 text-[11px] font-bold rounded-xs transition-opacity hover:opacity-85"
                style={{ backgroundColor: '#1B5BC1', color: '#fff' }}
              >
                Ver en el pipeline
              </button>
              {pipelineMsg && (
                <div
                  className="absolute bottom-full mb-1.5 left-0 right-0 text-center text-[11px] font-medium px-2 py-1.5 rounded-xs animate-fade-in"
                  style={{ backgroundColor: '#353C42', color: '#fff' }}
                >
                  Disponible en la demo de CRM
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-xs" style={{ color: 'rgba(90,104,113,0.5)' }}>
            Se registra automáticamente al detectar interés.
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function RespondedorDemo({ onBack }: { onBack: () => void }) {
  const [phase, setPhase]             = useState<Phase>('splash')
  const [msgs, setMsgs]               = useState<Msg[]>(INIT_MSGS)
  const [input, setInput]             = useState('')
  const [chatState, setChatState]     = useState<ChatState>('idle')
  const [isStreaming, setIsStreaming]  = useState(false)
  const [calificacion, setCalificacion] = useState<Calificacion>('Frío')
  const [etapaCRM, setEtapaCRM]       = useState<EtapaCRM>(null)
  const [propIds, setPropIds]         = useState<number[]>([])
  const [showDayChips, setShowDayChips] = useState(false)
  const [userMsgCount, setUserMsgCount] = useState(0)

  const msgsRef  = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const limitReached = userMsgCount >= LIMITE_MENSAJES

  useEffect(() => {
    const el = msgsRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [msgs])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreaming || limitReached) return

    const userMsg: Msg = { id: `u${Date.now()}`, role: 'user', content: text.trim() }
    const streamId     = `a${Date.now()}`
    const historyForApi = [...msgs, userMsg]

    setMsgs(prev => [...prev, userMsg, { id: streamId, role: 'agent', content: '', streaming: true }])
    setInput('')
    setIsStreaming(true)
    setShowDayChips(false)
    setUserMsgCount(c => c + 1)

    // Heurística local — sólo alimenta el panel derecho (calificación / CRM / props)
    const local = matchTrigger(text, chatState)
    setChatState(local.nextState)
    setCalificacion(local.calificacion)
    if (local.etapa) setEtapaCRM(local.etapa)
    if (local.addPropIds.length > 0) {
      setPropIds(prev => {
        const next = [...prev]
        local.addPropIds.forEach(id => { if (!next.includes(id)) next.push(id) })
        return next
      })
    }
    if (local.showDayChips) setShowDayChips(true)

    try {
      const res = await fetch('/api/anthropic/inmobiliaria', {
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
        setMsgs(prev => prev.map(m => m.id === streamId ? { ...m, content: acc, streaming: true } : m))
      }
      setMsgs(prev => prev.map(m => m.id === streamId ? { ...m, content: acc || 'No pude generar una respuesta. Probá de nuevo.', streaming: false } : m))
    } catch (err) {
      console.error('[RespondedorDemo] Error al conectar con la IA:', err)
      setMsgs(prev => prev.map(m => m.id === streamId
        ? { ...m, content: 'Hubo un error de conexión con el asistente. Probá de nuevo en unos segundos.', streaming: false }
        : m))
    } finally {
      setIsStreaming(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage(input)
  }

  if (phase === 'splash') {
    return <Splash onBack={onBack} onStart={() => setPhase('tool')} />
  }

  return (
    <div className="flex flex-col" style={{ minHeight: 580 }}>
      <Topbar onBack={() => setPhase('splash')} />

      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* ── Chat column ─────────────────────────────────────────────────── */}
        <div className="flex flex-col flex-1 min-w-0">

          {/* Portal-style thread header */}
          <div
            className="flex items-center gap-3 px-4 py-2.5 border-b shrink-0"
            style={{ backgroundColor: '#fff', borderColor: '#DCE5E9' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#EAF5FD' }}
            >
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#1B5BC1" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V20.25a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V9.75z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20.25V12h6v8.25" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold leading-tight" style={{ color: '#353C42' }}>Consulta por propiedades</p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-[10px]" style={{ color: '#5A6871' }}>Asistente en línea</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={msgsRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            style={{ backgroundColor: '#F8FAFB' }}
          >
            {msgs.map(m => <ChatBubble key={m.id} msg={m} />)}
          </div>

          {/* Day chips (shown when waitingForDay) */}
          {showDayChips && !limitReached && (
            <div
              className="px-4 py-2 flex gap-2 flex-wrap border-t shrink-0"
              style={{ borderColor: '#DCE5E9', backgroundColor: '#fff' }}
            >
              {VISIT_SLOTS.map(slot => (
                <button
                  key={slot.day}
                  onClick={() => sendMessage(slot.label)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                  style={{
                    backgroundColor: '#EAF5FD',
                    color: '#1B5BC1',
                    border: '1px solid rgba(27,91,193,0.2)',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#d0e6f7')}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#EAF5FD')}
                >
                  🗓️ {slot.label}
                </button>
              ))}
            </div>
          )}

          {/* Input / rate limit */}
          {limitReached ? (
            <div
              className="flex flex-col items-center gap-3 px-4 py-4 border-t shrink-0 text-center"
              style={{ borderColor: '#DCE5E9', backgroundColor: '#fff' }}
            >
              <p className="text-sm font-medium" style={{ color: '#353C42' }}>
                Llegaste al límite de mensajes de la demo. Para continuar, agendá una reunión con nuestro equipo.
              </p>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-[42px] px-6 rounded-[10px] text-white font-bold tracking-[0.04em] uppercase text-[12px] transition-opacity hover:opacity-85"
                style={{ backgroundColor: '#306ECF' }}
              >
                Agendar reunión
              </a>
            </div>
          ) : (
            <div
              className="flex items-center gap-2 px-4 py-3 border-t shrink-0"
              style={{ borderColor: '#DCE5E9', backgroundColor: '#fff' }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isStreaming}
                placeholder={
                  chatState === 'waitingForDay'
                    ? 'Escribí el día de tu preferencia...'
                    : 'Escribí tu consulta...'
                }
                className="flex-1 text-sm px-3 py-2 rounded-lg outline-none"
                style={{
                  border: '1px solid #DCE5E9',
                  backgroundColor: isStreaming ? '#F3F6F5' : '#fff',
                  color: '#353C42',
                }}
                onFocus={e => (e.target.style.borderColor = '#306ECF')}
                onBlur={e => (e.target.style.borderColor = '#DCE5E9')}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isStreaming}
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-opacity"
                style={{
                  backgroundColor: input.trim() && !isStreaming ? '#1B5BC1' : '#DCE5E9',
                  cursor: input.trim() && !isStreaming ? 'pointer' : 'not-allowed',
                }}
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* ── Side panel ──────────────────────────────────────────────────── */}
        <SidePanel calificacion={calificacion} etapaCRM={etapaCRM} propIds={propIds} />
      </div>
    </div>
  )
}
