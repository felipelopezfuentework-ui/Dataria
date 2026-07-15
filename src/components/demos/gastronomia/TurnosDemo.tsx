'use client'

import { useState } from 'react'
import Image from 'next/image'

// ─── Types & constants ────────────────────────────────────────────────────────

const DIAS    = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'] as const
const TURNOS  = ['Mañana', 'Tarde', 'Noche'] as const
type Dia      = typeof DIAS[number]
type Turno    = typeof TURNOS[number]
type MainTab  = 'planificacion' | 'resumen'

interface Empleado { id: number; nombre: string; tarifa: number; maxHoras: number }
type Asignaciones = Record<Dia, Record<Turno, number[]>>

// ─── Data ─────────────────────────────────────────────────────────────────────

const HORAS: Record<Turno, number>   = { 'Mañana': 7, 'Tarde': 7, 'Noche': 3 }
const HORARIO: Record<Turno, string> = { 'Mañana': '07:00–14:00', 'Tarde': '14:00–21:00', 'Noche': '21:00–00:00' }

const EMPLEADOS: Empleado[] = [
  { id: 1, nombre: 'Sofía M.',     tarifa: 850, maxHoras: 40 },
  { id: 2, nombre: 'Lucas R.',     tarifa: 920, maxHoras: 40 },
  { id: 3, nombre: 'Valentina G.', tarifa: 780, maxHoras: 30 },
  { id: 4, nombre: 'Martín P.',    tarifa: 900, maxHoras: 40 },
]

const ASIG_INIT: Asignaciones = {
  'Lunes':     { 'Mañana': [1, 2], 'Tarde': [3],    'Noche': [4]    },
  'Martes':    { 'Mañana': [2],    'Tarde': [1, 3], 'Noche': []     },
  'Miércoles': { 'Mañana': [4],    'Tarde': [2],    'Noche': [1]    },
  'Jueves':    { 'Mañana': [1, 4], 'Tarde': [2],    'Noche': [3]    },
  'Viernes':   { 'Mañana': [2],    'Tarde': [1, 4], 'Noche': [3]    },
  'Sábado':    { 'Mañana': [],     'Tarde': [3, 4], 'Noche': [2]    },
  'Domingo':   { 'Mañana': [],     'Tarde': [1],    'Noche': []     },
}

const CHIP: Record<number, { bg: string; color: string }> = {
  1: { bg: '#EAF5FD', color: '#1B5BC1' },
  2: { bg: '#ede9fe', color: '#5b21b6' },
  3: { bg: '#dcf5e7', color: '#1a7a4a' },
  4: { bg: '#fff3e0', color: '#c55a11' },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 })

function horasEmp(id: number, asig: Asignaciones) {
  return DIAS.reduce((s, d) =>
    s + TURNOS.reduce((t, tr) => t + (asig[d][tr].includes(id) ? HORAS[tr] : 0), 0), 0)
}

function turnosEmp(id: number, asig: Asignaciones) {
  return DIAS.flatMap(d =>
    TURNOS.filter(tr => asig[d][tr].includes(id)).map(tr => `${d} · ${tr} (${HORARIO[tr]})`))
}

function getLunes() {
  const h = new Date()
  const diff = h.getDay() === 0 ? -6 : 1 - h.getDay()
  const l = new Date(h); l.setDate(h.getDate() + diff); return l
}

function fmtDate(d: Date) {
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

// ─── Solapa Planificación ─────────────────────────────────────────────────────

function PlanificacionTab({ asig, setAsig }: { asig: Asignaciones; setAsig: (a: Asignaciones) => void }) {
  const quitar = (dia: Dia, turno: Turno, id: number) =>
    setAsig({ ...asig, [dia]: { ...asig[dia], [turno]: asig[dia][turno].filter(x => x !== id) } })

  const agregar = (dia: Dia, turno: Turno, id: number) =>
    setAsig({ ...asig, [dia]: { ...asig[dia], [turno]: [...asig[dia][turno], id] } })

  return (
    <div className="p-4 flex gap-3">
      {/* Grid */}
      <div className="flex-1 min-w-0">
        {/* Day headers */}
        <div className="grid mb-1" style={{ gridTemplateColumns: '72px repeat(7, 1fr)' }}>
          <div />
          {DIAS.map(d => (
            <div key={d} className="text-center text-[9px] font-bold uppercase tracking-wide text-[#5A6871] pb-1.5">
              {d.slice(0, 3)}
            </div>
          ))}
        </div>

        {/* Shift rows */}
        {TURNOS.map(turno => (
          <div key={turno} className="grid mb-1.5" style={{ gridTemplateColumns: '72px repeat(7, 1fr)' }}>
            {/* Shift label */}
            <div className="flex flex-col justify-center pr-2 pt-1">
              <span className="text-[10px] font-bold text-[#353C42] leading-tight">{turno}</span>
              <span className="text-[8px] text-[#5A6871]">{HORARIO[turno]}</span>
            </div>

            {/* Day cells */}
            {DIAS.map(dia => {
              const ids        = asig[dia][turno]
              const disponibles = EMPLEADOS.filter(e => !ids.includes(e.id))
              return (
                <div key={dia}
                  className="bg-white border border-[#DCE5E9] rounded-lg p-1.5 mx-0.5 min-h-[68px] flex flex-col gap-0.5">
                  {/* Chips */}
                  <div className="flex flex-wrap gap-0.5">
                    {ids.map(id => {
                      const emp = EMPLEADOS.find(e => e.id === id)!
                      return (
                        <span key={id}
                          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-bold leading-none"
                          style={{ backgroundColor: CHIP[id].bg, color: CHIP[id].color }}>
                          {emp.nombre.split(' ')[0]}
                          <button
                            onClick={() => quitar(dia, turno, id)}
                            className="hover:opacity-60 transition-opacity">×</button>
                        </span>
                      )
                    })}
                  </div>

                  {/* Add select */}
                  {disponibles.length > 0 && (
                    <select
                      value=""
                      onChange={e => { if (e.target.value) agregar(dia, turno, Number(e.target.value)) }}
                      className="mt-auto text-[9px] font-bold bg-transparent border-none outline-none cursor-pointer w-full"
                      style={{ color: '#306ECF' }}
                    >
                      <option value="">+ Agregar</option>
                      {disponibles.map(e => (
                        <option key={e.id} value={String(e.id)}>{e.nombre}</option>
                      ))}
                    </select>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div className="w-40 shrink-0">
        <p className="text-[9px] font-bold uppercase tracking-wide text-[#5A6871] mb-2">Resumen rápido</p>
        <div className="space-y-1.5">
          {EMPLEADOS.map(emp => {
            const horas  = horasEmp(emp.id, asig)
            const excede = horas > emp.maxHoras
            return (
              <div key={emp.id} className="rounded-lg border p-2.5 transition-colors"
                style={{ borderColor: excede ? '#e24b4a' : '#DCE5E9', backgroundColor: excede ? '#fde8e8' : '#fff' }}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] font-bold text-[#353C42]">{emp.nombre}</span>
                  {excede && <span className="text-[10px]" style={{ color: '#c0392b' }}>⚠</span>}
                </div>
                <p className="text-[9px] text-[#5A6871]">{horas} / {emp.maxHoras} hs</p>
                <p className="text-[9px] font-semibold" style={{ color: '#306ECF' }}>{fmt(horas * emp.tarifa)}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Solapa Resumen ───────────────────────────────────────────────────────────

interface ModalInfo { nombre: string; lista: string[] }

function ResumenTab({ asig }: { asig: Asignaciones }) {
  const [sent,  setSent]  = useState<Set<number>>(new Set())
  const [modal, setModal] = useState<ModalInfo | null>(null)

  const lunes   = getLunes()
  const domingo = new Date(lunes); domingo.setDate(lunes.getDate() + 6)

  const handleEnviar = (emp: Empleado) => {
    setModal({ nombre: emp.nombre, lista: turnosEmp(emp.id, asig) })
    setSent(prev => new Set([...prev, emp.id]))
    setTimeout(() => setSent(prev => { const n = new Set(prev); n.delete(emp.id); return n }), 3000)
  }

  const totalHoras  = EMPLEADOS.reduce((s, e) => s + horasEmp(e.id, asig), 0)
  const totalCosto  = EMPLEADOS.reduce((s, e) => s + horasEmp(e.id, asig) * e.tarifa, 0)
  const cubiertos   = DIAS.reduce((s, d) => s + TURNOS.filter(t => asig[d][t].length > 0).length, 0)
  const totalSlots  = DIAS.length * TURNOS.length

  return (
    <div className="p-4">
      {/* Table */}
      <div className="rounded-xl border border-[#DCE5E9] overflow-hidden mb-4">
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: '#F3F6F5' }}>
              {['Empleado', 'Turnos asignados', 'Horas', 'Costo est.', 'Estado', ''].map(h => (
                <th key={h} className="px-3 py-2.5 text-left text-[9px] font-bold uppercase tracking-wide text-[#5A6871]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DCE5E9]">
            {EMPLEADOS.map(emp => {
              const horas  = horasEmp(emp.id, asig)
              const excede = horas > emp.maxHoras
              const isSent = sent.has(emp.id)
              return (
                <tr key={emp.id} className="bg-white">
                  <td className="px-3 py-3 text-[11px] font-semibold text-[#353C42]">{emp.nombre}</td>
                  <td className="px-3 py-3 text-[11px] text-[#5A6871]">{turnosEmp(emp.id, asig).length} turnos</td>
                  <td className="px-3 py-3 text-[11px] font-semibold text-[#353C42]">{horas} hs</td>
                  <td className="px-3 py-3 text-[11px] font-semibold" style={{ color: '#306ECF' }}>{fmt(horas * emp.tarifa)}</td>
                  <td className="px-3 py-3">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold"
                      style={{ backgroundColor: excede ? '#fde8e8' : '#dcf5e7', color: excede ? '#c0392b' : '#1a7a4a' }}>
                      {excede ? 'Excede límite' : 'OK'}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <button
                      onClick={() => handleEnviar(emp)}
                      className="px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap"
                      style={{ backgroundColor: isSent ? '#dcf5e7' : '#306ECF', color: isSent ? '#1a7a4a' : '#fff' }}>
                      {isSent ? '✓ Enviado' : 'Enviar calendario'}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Horas totales',    value: `${totalHoras} hs`             },
          { label: 'Costo semanal',    value: fmt(totalCosto)                },
          { label: 'Turnos cubiertos', value: `${cubiertos} / ${totalSlots}` },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-xl border border-[#DCE5E9] p-3 text-center">
            <p className="text-[9px] font-bold uppercase tracking-wide text-[#5A6871] mb-1">{item.label}</p>
            <p className="text-base font-extrabold" style={{ color: '#1B5BC1' }}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
          onClick={() => setModal(null)}
        >
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <p className="text-sm font-bold text-[#353C42] mb-1">
              📅 Calendario enviado a {modal.nombre}
            </p>
            <p className="text-[11px] text-[#5A6871] mb-4">
              Semana del {fmtDate(lunes)} al {fmtDate(domingo)}
            </p>
            {modal.lista.length > 0 ? (
              <>
                <p className="text-[9px] font-bold uppercase tracking-wide text-[#5A6871] mb-2">Turnos incluidos</p>
                <ul className="space-y-1.5 mb-4">
                  {modal.lista.map(t => (
                    <li key={t} className="flex items-center gap-2 text-[11px] text-[#353C42]">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#306ECF' }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-[11px] text-[#5A6871] mb-4">Sin turnos asignados esta semana.</p>
            )}
            <button
              onClick={() => setModal(null)}
              className="w-full py-2 rounded-lg text-xs font-bold text-white"
              style={{ backgroundColor: '#306ECF' }}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main panel ───────────────────────────────────────────────────────────────

function MainPanel({ onBack }: { onBack: () => void }) {
  const [tab,  setTab]  = useState<MainTab>('planificacion')
  const [asig, setAsig] = useState<Asignaciones>(ASIG_INIT)

  return (
    <div className="flex flex-col min-h-[620px]">
      {/* Topbar */}
      <div style={{ backgroundColor: '#1B5BC1' }} className="flex items-center justify-between px-5 py-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="font-extrabold text-lg text-white leading-none">
            <span style={{ color: '#56BCFA' }}>d</span>ataria
          </span>
          <span className="text-white/40 text-sm">·</span>
          <span className="text-white/75 text-sm">Gastronomía · Planificador de turnos</span>
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
        {([['planificacion', 'Planificación'], ['resumen', 'Resumen']] as [MainTab, string][]).map(([id, label]) => (
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
        {tab === 'planificacion' && <PlanificacionTab asig={asig} setAsig={setAsig} />}
        {tab === 'resumen'       && <ResumenTab asig={asig} />}
      </div>
    </div>
  )
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
            Gastronomía · Turnos
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

export default function TurnosDemo({ onBack }: { onBack: () => void }) {
  const [screen, setScreen] = useState<'splash' | 'main'>('splash')
  if (screen === 'splash') return <Splash onBack={onBack} onEnter={() => setScreen('main')} />
  return <MainPanel onBack={() => setScreen('splash')} />
}
