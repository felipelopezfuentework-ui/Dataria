'use client'

import { useState } from 'react'
import Image from 'next/image'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Resena {
  id: number
  initials: string
  nombre: string
  estrellas: number
  texto: string
  respondida: boolean
}

type Tono = 'profesional' | 'cercano' | 'empatico'
type MainTab = 'dashboard' | 'respuestas'

// ─── Data ─────────────────────────────────────────────────────────────────────

const RESENAS_INIT: Resena[] = [
  { id: 1, initials: 'MG', nombre: 'Martín G.',  estrellas: 2, texto: 'La espera fue de más de 40 minutos y la comida llegó fría. El mozo no se disculpó.',                                 respondida: false },
  { id: 2, initials: 'LF', nombre: 'Lucía F.',   estrellas: 5, texto: 'Increíble experiencia, la pasta fresca es espectacular. El ambiente acogedor y el servicio, atento.',              respondida: true  },
  { id: 3, initials: 'CM', nombre: 'Carlos M.',  estrellas: 1, texto: 'Encontré un cabello en la comida y no se hicieron cargo. Nunca más vuelvo.',                                        respondida: false },
  { id: 4, initials: 'AP', nombre: 'Ana P.',     estrellas: 4, texto: 'Muy rica la comida, aunque el precio me pareció elevado. El risotto estaba perfecto.',                              respondida: false },
]

const RESPUESTAS: Record<Tono, Record<number, string>> = {
  profesional: {
    1: 'Estimado Martín, lamentamos que tu visita no haya estado a la altura. Los tiempos de espera y la temperatura de los platos son aspectos que mejoraremos. Comunicate con nosotros a datariaai@gmail.com para brindarte una compensación.',
    2: '¡Muchas gracias, Lucía! Nos alegra que hayas disfrutado la pasta fresca, que elaboramos a diario. ¡Hasta pronto!',
    3: 'Estimado Carlos, lo que describís es inaceptable y no refleja nuestros estándares. Por favor comunicate a datariaai@gmail.com para resolver la situación.',
    4: 'Gracias Ana. Nos alegra que el risotto haya estado a la altura. Tomamos nota del comentario sobre las porciones. ¡Hasta pronto!',
  },
  cercano: {
    1: 'Martín, gracias por contarnos — 40 minutos es demasiado y la comida fría no tiene perdón. Ya avisamos al equipo. Escribinos a datariaai@gmail.com.',
    2: '¡Qué lindo leer esto, Lucía! La pasta la hacemos cada día con cariño. ¡Los esperamos!',
    3: 'Carlos, mil disculpas. Eso no debería haber pasado. Escribinos a datariaai@gmail.com y lo resolvemos.',
    4: '¡Gracias Ana! El risotto es nuestro favorito también. Anotamos lo de las porciones. ¡Te esperamos!',
  },
  empatico: {
    1: 'Martín, entendemos tu frustración — esperar tanto y recibir la comida fría es algo que no debería ocurrir. Queremos compensarte: datariaai@gmail.com.',
    2: 'Lucía, leer esto nos llena de orgullo. Saber que volvieron es la mejor señal. ¡Los esperamos!',
    3: 'Carlos, sentimos mucho lo que viviste. Lo ocurrido no refleja quiénes somos. Escribinos a datariaai@gmail.com.',
    4: 'Ana, gracias por la honestidad. Entendemos que la relación precio-porción importa. ¡Ojalá verte pronto!',
  },
}

const STAR_COLORS = ['#e24b4a', '#e67e22', '#f1c40f', '#2ecc71', '#1a7a4a']

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars({ n, size = 11 }: { n: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i <= n ? '#f59e0b' : 'none'}
          stroke={i <= n ? '#f59e0b' : '#DCE5E9'}
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ))}
    </span>
  )
}

// ─── Loading dots ─────────────────────────────────────────────────────────────

function LoadingDots() {
  return (
    <div className="flex items-center gap-2 justify-center py-6">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: '#306ECF', animationDelay: `${i * 180}ms` }}
        />
      ))}
    </div>
  )
}

// ─── Dashboard tab ────────────────────────────────────────────────────────────

function DashboardTab({ resenas }: { resenas: Resena[] }) {
  const total        = resenas.length
  const positivas    = resenas.filter(r => r.estrellas >= 4).length
  const negativas    = resenas.filter(r => r.estrellas <= 2).length
  const sinResponder = resenas.filter(r => !r.respondida).length
  const respondidas  = resenas.filter(r => r.respondida).length
  const tasaResp     = total > 0 ? Math.round((respondidas / total) * 100) : 0

  const distrib  = [5, 4, 3, 2, 1].map(n => ({ star: n, count: resenas.filter(r => r.estrellas === n).length, color: STAR_COLORS[n - 1] }))
  const maxCount = Math.max(...distrib.map(d => d.count), 1)

  const kpis = [
    { label: 'Promedio',      value: '4.8 ★', color: '#1a7a4a' },
    { label: 'Positivas',     value: positivas,  color: '#1a7a4a' },
    { label: 'Negativas',     value: negativas,  color: '#c0392b' },
    { label: 'Sin responder', value: sinResponder, color: '#306ECF' },
  ]

  return (
    <div className="p-4 space-y-4">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-2.5">
        {kpis.map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-[#DCE5E9] p-3.5 flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wide text-[#5A6871]">{k.label}</span>
            <span className="text-xl font-extrabold" style={{ color: k.color }}>{k.value}</span>
          </div>
        ))}
      </div>

      {/* 2 columns */}
      <div className="grid grid-cols-2 gap-3">
        {/* Left */}
        <div className="space-y-3">
          <div className="bg-white rounded-xl border border-[#DCE5E9] p-4">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#5A6871] mb-3">Distribución de estrellas</p>
            <div className="space-y-2">
              {distrib.map(d => (
                <div key={d.star} className="flex items-center gap-2">
                  <span className="text-[10px] text-[#5A6871] w-5 text-right shrink-0">{d.star}★</span>
                  <div className="flex-1 bg-[#DCE5E9] rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${(d.count / maxCount) * 100}%`, backgroundColor: d.color }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-[#353C42] w-3 shrink-0">{d.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#DCE5E9] p-4">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#5A6871] mb-3">Tendencias del mes</p>
            <div className="space-y-2">
              {[
                { label: 'Tiempo de respuesta promedio', value: '4 hs',         green: false },
                { label: 'Reseñas este mes',             value: '4',             green: false },
                { label: 'Tasa de respuesta',            value: `${tasaResp}%`, green: false },
                { label: 'vs mes anterior',              value: '↑ +0.3★',      green: true  },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-[11px] text-[#5A6871]">{item.label}</span>
                  <span className={`text-[11px] font-bold ${item.green ? 'text-[#1a7a4a]' : 'text-[#353C42]'}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-3">
          <div className="bg-white rounded-xl border border-[#DCE5E9] p-4">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#5A6871] mb-3">Lo que destacan</p>
            <div className="flex flex-wrap gap-1.5">
              {['pasta', 'ambiente', 'atento', 'risotto', 'fresca'].map(w => (
                <span key={w} className="px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ backgroundColor: '#dcf5e7', color: '#1a7a4a' }}>{w}</span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#DCE5E9] p-4">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#5A6871] mb-3">Lo que critican</p>
            <div className="flex flex-wrap gap-1.5">
              {['espera', 'frío', 'precio', 'demora'].map(w => (
                <span key={w} className="px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ backgroundColor: '#fde8e8', color: '#c0392b' }}>{w}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Respuestas tab ───────────────────────────────────────────────────────────

function RespuestasTab({ resenas, onResponder }: { resenas: Resena[]; onResponder: (id: number) => void }) {
  const [selected,  setSelected]  = useState<number | null>(null)
  const [tono,      setTono]      = useState<Tono>('profesional')
  const [respuesta, setRespuesta] = useState<string | null>(null)
  const [loading,   setLoading]   = useState(false)
  const [copied,    setCopied]    = useState(false)

  const handleSelect = (id: number) => {
    setSelected(id)
    setRespuesta(null)
    setCopied(false)
  }

  const handleTono = (t: Tono) => {
    setTono(t)
    setRespuesta(null)
    setCopied(false)
  }

  const handleGenerar = () => {
    if (!selected) return
    setLoading(true)
    setRespuesta(null)
    setTimeout(() => {
      setRespuesta(RESPUESTAS[tono][selected])
      setLoading(false)
      onResponder(selected)
    }, 1000)
  }

  const handleCopiar = () => {
    if (!respuesta) return
    navigator.clipboard.writeText(respuesta)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tonoLabels: Record<Tono, string> = { profesional: 'Profesional', cercano: 'Cercano', empatico: 'Empático' }

  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      {/* Left: lista */}
      <div className="space-y-2">
        {resenas.map(r => (
          <button
            key={r.id}
            onClick={() => handleSelect(r.id)}
            className="w-full text-left rounded-xl border p-3 transition-all"
            style={{
              borderColor: selected === r.id ? '#306ECF' : '#DCE5E9',
              backgroundColor: selected === r.id ? '#EAF5FD' : '#fff',
            }}
          >
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-[9px] font-bold"
                style={{ backgroundColor: '#1B5BC1' }}>
                {r.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-xs font-semibold text-[#353C42]">{r.nombre}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
                    style={{ backgroundColor: r.respondida ? '#dcf5e7' : '#fde8e8', color: r.respondida ? '#1a7a4a' : '#c0392b' }}>
                    {r.respondida ? 'Respondida' : 'Pendiente'}
                  </span>
                </div>
                <Stars n={r.estrellas} size={10} />
                <p className="text-[11px] text-[#5A6871] mt-1 leading-snug line-clamp-2">{r.texto}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Right: generador */}
      <div className="flex flex-col gap-3">
        {/* Tono */}
        <div className="flex gap-1.5">
          {(['profesional', 'cercano', 'empatico'] as Tono[]).map(t => (
            <button
              key={t}
              onClick={() => handleTono(t)}
              className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{ backgroundColor: tono === t ? '#306ECF' : '#F3F6F5', color: tono === t ? '#fff' : '#5A6871' }}
            >
              {tonoLabels[t]}
            </button>
          ))}
        </div>

        {/* Preview */}
        <div className="flex-1 rounded-xl p-4 flex flex-col min-h-[180px]" style={{ backgroundColor: '#F3F6F5' }}>
          {loading ? (
            <LoadingDots />
          ) : respuesta ? (
            <div className="flex flex-col h-full justify-between">
              <p className="text-sm text-[#353C42] leading-relaxed">{respuesta}</p>
              <button
                onClick={handleCopiar}
                className="mt-3 self-end flex items-center gap-1.5 text-xs font-semibold transition-colors"
                style={{ color: copied ? '#1a7a4a' : '#306ECF' }}
              >
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.637c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                {copied ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>
          ) : (
            <p className="text-sm text-[#5A6871]">Seleccioná una reseña para generar una respuesta</p>
          )}
        </div>

        {/* Generate */}
        <button
          onClick={handleGenerar}
          disabled={!selected || loading}
          className="w-full h-[46px] rounded-[10px] text-white font-bold text-[13px] tracking-[0.04em] uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#306ECF' }}
        >
          Generar respuesta
        </button>
      </div>
    </div>
  )
}

// ─── Main panel ───────────────────────────────────────────────────────────────

function MainPanel({ onBack }: { onBack: () => void }) {
  const [tab,    setTab]    = useState<MainTab>('dashboard')
  const [resenas, setResenas] = useState<Resena[]>(RESENAS_INIT)

  const marcarRespondida = (id: number) =>
    setResenas(prev => prev.map(r => r.id === id ? { ...r, respondida: true } : r))

  return (
    <div className="flex flex-col min-h-[560px]">
      {/* Topbar */}
      <div style={{ backgroundColor: '#1B5BC1' }} className="flex items-center justify-between px-5 py-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="font-extrabold text-lg text-white leading-none">
            <span style={{ color: '#56BCFA' }}>d</span>ataria
          </span>
          <span className="text-white/40 text-sm">·</span>
          <span className="text-white/75 text-sm">Gastronomía · Gestión de reseñas</span>
        </div>
        <button onClick={onBack}
          className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Inicio
        </button>
      </div>

      {/* Tab bar */}
      <div style={{ backgroundColor: '#1B5BC1' }} className="flex shrink-0">
        {([['dashboard', 'Dashboard'], ['respuestas', 'Respuestas']] as [MainTab, string][]).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id as MainTab)}
            className={`px-5 py-2.5 text-sm font-semibold transition-all border-b-2 -mb-px ${
              tab === id ? 'text-white border-white' : 'text-white/45 border-transparent hover:text-white/70'
            }`}>
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 bg-[#F3F6F5] overflow-auto">
        {tab === 'dashboard'  && <DashboardTab  resenas={resenas} />}
        {tab === 'respuestas' && <RespuestasTab resenas={resenas} onResponder={marcarRespondida} />}
      </div>
    </div>
  )
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
            Gastronomía · Reseñas
          </p>
        </div>
        <button onClick={onEnter}
          className="px-8 py-3 bg-white font-bold text-sm rounded-sm hover:bg-white/90 transition-colors shadow-soft"
          style={{ color: '#1B5BC1' }}>
          Ver herramienta
        </button>
      </div>
    </div>
  )
}

// ─── Root export ──────────────────────────────────────────────────────────────

export default function ResenasDemo({ onBack }: { onBack: () => void }) {
  const [screen, setScreen] = useState<'splash' | 'main'>('splash')
  if (screen === 'splash') return <Splash onBack={onBack} onEnter={() => setScreen('main')} />
  return <MainPanel onBack={() => setScreen('splash')} />
}
