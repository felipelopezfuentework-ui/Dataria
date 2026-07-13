'use client'

import { useState } from 'react'
import Image from 'next/image'

// ─── Types & Constants ─────────────────────────────────────────────────────────

type Phase = 'splash' | 'tool'
type AgenteId = 1 | 2

const AGENTES: Record<AgenteId, { name: string; specialty: string }> = {
  1: { name: 'Lic. Valeria Suárez',  specialty: 'Agente comercial · Zona Norte'  },
  2: { name: 'Lic. Joaquín Beltrán', specialty: 'Agente comercial · Zona Centro' },
}

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']

const TIMES = Array.from({ length: 18 }, (_, i) => {
  const h = 9 + Math.floor(i / 2)
  const m = i % 2 === 0 ? '00' : '30'
  return `${h.toString().padStart(2, '0')}:${m}`
})

type ApptRecord = Record<string, string>

const INIT_APPTS: ApptRecord = {
  '1-0-09:00': 'Martín García',
  '1-0-10:30': 'Lucía Fernández',
  '1-0-14:00': 'Carlos Méndez',
  '1-1-09:30': 'Ana Pérez',
  '1-1-11:00': 'Roberto Díaz',
  '1-2-10:00': 'Sofía Romero',
  '1-3-09:00': 'Diego Molina',
  '1-3-15:30': 'Patricia López',
  '1-4-11:30': 'Valentina Castro',
  '2-0-11:00': 'Martín García',
  '2-1-14:30': 'Lucía Fernández',
  '2-2-09:00': 'Carlos Méndez',
  '2-2-16:00': 'Ana Pérez',
  '2-3-10:30': 'Roberto Díaz',
  '2-4-09:30': 'Sofía Romero',
}

function getWeekDates(): Date[] {
  const today = new Date()
  const dow = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1))
  monday.setHours(0, 0, 0, 0)
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d
  })
}

function fmtShort(d: Date): string {
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })
}

// ─── Splash ───────────────────────────────────────────────────────────────────

function Splash({ onBack, onStart }: { onBack: () => void; onStart: () => void }) {
  return (
    <div
      className="min-h-[580px] flex flex-col"
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
      <div className="relative flex-1 flex flex-col items-center justify-center gap-6 text-center px-8 pb-10">
        <div className="w-20 h-20 rounded-2xl bg-white shadow-soft p-3 flex items-center justify-center">
          <Image src="/isologo-dataria.png" alt="Dataria" width={64} height={64} className="w-full h-full object-contain" />
        </div>
        <div>
          <p className="text-2xl font-extrabold text-white mb-1.5">
            <span style={{ color: '#56BCFA' }}>d</span>ataria
          </p>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Inmobiliarias · Visitas
          </p>
          <h2 className="text-3xl font-bold text-white mb-3">Agenda de visitas</h2>
          <p className="text-base max-w-xs mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Gestioná las visitas a propiedades de tu inmobiliaria, agendá nuevos interesados y enviá confirmaciones automáticas.
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
        <span className="text-white/75 text-sm">Inmobiliarias · Agenda de visitas</span>
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

// ─── Main component ───────────────────────────────────────────────────────────

interface SelectedSlot { dayIdx: number; time: string }
interface ConfirmedAppt extends SelectedSlot {
  agenteId: AgenteId
  interesado: string
  phone: string
}

export default function VisitasDemo({ onBack }: { onBack: () => void }) {
  const [phase, setPhase]   = useState<Phase>('splash')
  const [agente, setAgente] = useState<AgenteId>(1)
  const [appts, setAppts]   = useState<ApptRecord>(INIT_APPTS)
  const [newKeys, setNewKeys] = useState<Set<string>>(new Set())
  const [slot, setSlot]     = useState<SelectedSlot | null>(null)
  const [form, setForm]     = useState({ name: '', phone: '', reason: '' })
  const [modal, setModal]   = useState<ConfirmedAppt | null>(null)
  const [showReschedule, setShowReschedule] = useState(false)

  const weekDates = getWeekDates()

  const key = (a: AgenteId, d: number, t: string) => `${a}-${d}-${t}`

  const handleCellClick = (dayIdx: number, time: string) => {
    if (appts[key(agente, dayIdx, time)]) return
    setSlot({ dayIdx, time })
  }

  const handleConfirm = () => {
    if (!slot || !form.name.trim() || !form.phone.trim()) return
    const k = key(agente, slot.dayIdx, slot.time)
    setAppts(prev => ({ ...prev, [k]: form.name.trim() }))
    setNewKeys(prev => new Set([...prev, k]))
    setModal({ ...slot, agenteId: agente, interesado: form.name.trim(), phone: form.phone.trim() })
    setSlot(null)
    setForm({ name: '', phone: '', reason: '' })
  }

  const handleCancelAppt = () => {
    if (!modal) return
    const k = key(modal.agenteId, modal.dayIdx, modal.time)
    setAppts(prev => { const n = { ...prev }; delete n[k]; return n })
    setNewKeys(prev => { const n = new Set(prev); n.delete(k); return n })
    setModal(null)
    setShowReschedule(false)
  }

  const handleCloseModal = () => {
    setModal(null)
    setShowReschedule(false)
  }

  if (phase === 'splash') {
    return <Splash onBack={onBack} onStart={() => setPhase('tool')} />
  }

  const canConfirm = !!slot && !!form.name.trim() && !!form.phone.trim()

  return (
    <div className="flex flex-col" style={{ minHeight: 580 }}>
      <style>{`
        @keyframes cellPop {
          0%   { opacity: 0; transform: scale(0.82); }
          100% { opacity: 1; transform: scale(1); }
        }
        .appt-new { animation: cellPop 0.32s ease-out; }
      `}</style>

      <Topbar onBack={() => setPhase('splash')} />

      <div className="flex flex-col lg:flex-row flex-1 min-w-0">

        {/* ── Calendar ──────────────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0 p-4 flex flex-col gap-3">

          {/* Agente tabs */}
          <div className="flex gap-1 rounded-sm p-1 w-fit" style={{ backgroundColor: '#F3F6F5' }}>
            {([1, 2] as AgenteId[]).map(aid => (
              <button
                key={aid}
                onClick={() => { setAgente(aid); setSlot(null) }}
                className="px-3 py-1.5 rounded-xs text-sm font-semibold transition-all duration-160 whitespace-nowrap"
                style={
                  agente === aid
                    ? { backgroundColor: '#1B5BC1', color: '#fff' }
                    : { color: '#5A6871', backgroundColor: 'transparent' }
                }
              >
                {AGENTES[aid].name}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="overflow-auto rounded-lg border" style={{ maxHeight: 460, borderColor: '#DCE5E9' }}>
            <table className="border-collapse" style={{ minWidth: 520, width: '100%' }}>
              <thead>
                <tr>
                  <th
                    className="sticky top-0 z-10 text-right pr-3 py-2 text-[11px] font-semibold w-14"
                    style={{ backgroundColor: '#fff', color: '#5A6871', borderBottom: '1px solid #DCE5E9' }}
                  />
                  {DAYS.map((d, i) => (
                    <th
                      key={d}
                      className="sticky top-0 z-10 py-2 text-center text-[11px]"
                      style={{ backgroundColor: '#fff', borderBottom: '1px solid #DCE5E9' }}
                    >
                      <div className="font-bold" style={{ color: '#353C42' }}>{d}</div>
                      <div style={{ color: '#5A6871', fontWeight: 400 }}>{fmtShort(weekDates[i])}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIMES.map((time, ti) => (
                  <tr key={time} style={{ borderBottom: ti < TIMES.length - 1 ? '1px solid #F3F6F5' : undefined }}>
                    <td
                      className="pr-3 py-0.5 text-right font-mono text-[11px]"
                      style={{ color: '#5A6871', width: 56, verticalAlign: 'middle', whiteSpace: 'nowrap' }}
                    >
                      {time}
                    </td>
                    {DAYS.map((_, dayIdx) => {
                      const k       = key(agente, dayIdx, time)
                      const interesado = appts[k]
                      const occupied = !!interesado
                      const selected = slot?.dayIdx === dayIdx && slot.time === time
                      const isNew    = newKeys.has(k)

                      let cellStyle: React.CSSProperties
                      if (occupied) {
                        cellStyle = {
                          backgroundColor: '#306ECF',
                          color: '#fff',
                          fontWeight: 600,
                          cursor: 'default',
                          border: '2px solid transparent',
                        }
                      } else if (selected) {
                        cellStyle = {
                          backgroundColor: '#EAF5FD',
                          color: '#1B5BC1',
                          fontWeight: 600,
                          cursor: 'pointer',
                          border: '2px solid #1B5BC1',
                        }
                      } else {
                        cellStyle = {
                          backgroundColor: '#F3F6F5',
                          color: 'transparent',
                          cursor: 'pointer',
                          border: '2px solid transparent',
                        }
                      }

                      return (
                        <td key={dayIdx} className="p-0.5">
                          <div
                            className={`rounded text-center text-[11px] leading-tight transition-colors duration-160 truncate px-1 py-1.5${isNew ? ' appt-new' : ''}`}
                            style={cellStyle}
                            onClick={() => handleCellClick(dayIdx, time)}
                            onMouseEnter={e => {
                              if (!occupied && !selected) {
                                (e.currentTarget as HTMLDivElement).style.backgroundColor = '#EAF5FD'
                              }
                            }}
                            onMouseLeave={e => {
                              if (!occupied && !selected) {
                                (e.currentTarget as HTMLDivElement).style.backgroundColor = '#F3F6F5'
                              }
                            }}
                          >
                            {interesado ?? ' '}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Booking panel ─────────────────────────────────────────────────── */}
        <div
          className="shrink-0 border-t lg:border-t-0 lg:border-l p-4 flex flex-col gap-3"
          style={{ width: 284, borderColor: '#DCE5E9', backgroundColor: '#F3F6F5' }}
        >
          <h3 className="text-sm font-bold" style={{ color: '#353C42' }}>Agendar visita</h3>

          {/* Agente info */}
          <div
            className="rounded-md p-3"
            style={{ backgroundColor: '#EAF5FD', border: '1px solid rgba(48,110,207,0.15)' }}
          >
            <p className="text-[10px] font-bold uppercase tracking-wide mb-0.5" style={{ color: '#5A6871' }}>
              Agente inmobiliario
            </p>
            <p className="text-sm font-semibold leading-tight" style={{ color: '#1B5BC1' }}>
              {AGENTES[agente].name}
            </p>
            <p className="text-xs" style={{ color: '#5A6871' }}>{AGENTES[agente].specialty}</p>
          </div>

          {/* Slot info */}
          <div
            className="rounded-md p-3 transition-colors duration-160"
            style={{
              backgroundColor: slot ? '#EAF5FD' : '#fff',
              border: `1px solid ${slot ? 'rgba(48,110,207,0.2)' : '#DCE5E9'}`,
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-wide mb-0.5" style={{ color: '#5A6871' }}>
              Horario
            </p>
            {slot ? (
              <>
                <p className="text-sm font-semibold leading-tight" style={{ color: '#1B5BC1' }}>
                  {DAYS[slot.dayIdx]} {fmtShort(weekDates[slot.dayIdx])}
                </p>
                <p className="text-xs" style={{ color: '#5A6871' }}>{slot.time} hs</p>
              </>
            ) : (
              <p className="text-xs" style={{ color: '#5A6871' }}>
                Seleccioná una celda libre en el calendario
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: '#5A6871' }}>
              Nombre del interesado
            </label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Ej: Juan Rodríguez"
              disabled={!slot}
              className="w-full px-3 py-2 rounded-sm text-sm"
              style={{
                border: '1px solid #DCE5E9',
                backgroundColor: slot ? '#fff' : '#F3F6F5',
                color: '#353C42',
                outline: 'none',
                opacity: slot ? 1 : 0.6,
              }}
              onFocus={e => (e.target.style.borderColor = '#306ECF')}
              onBlur={e => (e.target.style.borderColor = '#DCE5E9')}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: '#5A6871' }}>
              Teléfono
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              placeholder="11-0000-0000"
              disabled={!slot}
              className="w-full px-3 py-2 rounded-sm text-sm"
              style={{
                border: '1px solid #DCE5E9',
                backgroundColor: slot ? '#fff' : '#F3F6F5',
                color: '#353C42',
                outline: 'none',
                opacity: slot ? 1 : 0.6,
              }}
              onFocus={e => (e.target.style.borderColor = '#306ECF')}
              onBlur={e => (e.target.style.borderColor = '#DCE5E9')}
            />
          </div>

          {/* Property of interest */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: '#5A6871' }}>
              Propiedad de interés{' '}
              <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(opcional)</span>
            </label>
            <textarea
              value={form.reason}
              onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
              placeholder="Depto 2 amb Palermo, Casa Olivos..."
              disabled={!slot}
              rows={2}
              className="w-full px-3 py-2 rounded-sm text-sm resize-none"
              style={{
                border: '1px solid #DCE5E9',
                backgroundColor: slot ? '#fff' : '#F3F6F5',
                color: '#353C42',
                outline: 'none',
                opacity: slot ? 1 : 0.6,
              }}
              onFocus={e => (e.target.style.borderColor = '#306ECF')}
              onBlur={e => (e.target.style.borderColor = '#DCE5E9')}
            />
          </div>

          {/* Confirm */}
          <button
            onClick={handleConfirm}
            disabled={!canConfirm}
            className="w-full py-2.5 rounded-sm text-sm font-bold uppercase tracking-wide transition-all duration-160"
            style={
              canConfirm
                ? { backgroundColor: '#1B5BC1', color: '#fff', cursor: 'pointer' }
                : { backgroundColor: '#DCE5E9', color: '#5A6871', cursor: 'not-allowed' }
            }
          >
            Confirmar visita
          </button>
        </div>
      </div>

      {/* ── Confirmation modal ──────────────────────────────────────────────── */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
          onClick={e => { if (e.target === e.currentTarget) handleCloseModal() }}
        >
          <div
            className="w-full max-w-sm rounded-xl p-5 animate-fade-in"
            style={{ backgroundColor: '#fff', boxShadow: '0 8px 32px rgba(53,60,66,0.18)' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0"
                style={{ backgroundColor: '#EAF5FD' }}
              >
                📱
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold leading-tight truncate" style={{ color: '#353C42' }}>
                  Mensaje enviado a {modal.interesado}
                </p>
                <p className="text-xs" style={{ color: '#5A6871' }}>{modal.phone}</p>
              </div>
            </div>

            {/* Message bubble */}
            <div
              className="rounded-lg p-4 mb-4"
              style={{ backgroundColor: '#F3F6F5', border: '1px solid #DCE5E9' }}
            >
              {showReschedule ? (
                <p className="text-sm text-center" style={{ color: '#5A6871' }}>
                  Función disponible en la versión completa.
                </p>
              ) : (
                <div className="text-sm leading-relaxed space-y-1" style={{ color: '#353C42' }}>
                  <p className="font-semibold mb-2" style={{ color: '#1B5BC1' }}>
                    ¡Hola {modal.interesado.split(' ')[0]}! Tu visita con {AGENTES[modal.agenteId].name} quedó confirmada:
                  </p>
                  <p>📅 {DAYS[modal.dayIdx]} {fmtShort(weekDates[modal.dayIdx])}</p>
                  <p>🕐 {modal.time} hs</p>
                  <p className="mt-2 text-xs" style={{ color: '#5A6871' }}>
                    Si necesitás cancelar o reprogramar, respondé este mensaje.
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            {showReschedule ? (
              <button
                onClick={handleCloseModal}
                className="w-full py-2.5 rounded-sm text-sm font-bold uppercase tracking-wide transition-opacity hover:opacity-85"
                style={{ backgroundColor: '#1B5BC1', color: '#fff' }}
              >
                Cerrar
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancelAppt}
                  className="flex-1 py-2.5 rounded-sm text-sm font-semibold transition-colors"
                  style={{ border: '1px solid #DCE5E9', color: '#5A6871', backgroundColor: '#fff' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F3F6F5')}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#fff')}
                >
                  Cancelar visita
                </button>
                <button
                  onClick={() => setShowReschedule(true)}
                  className="flex-1 py-2.5 rounded-sm text-sm font-semibold transition-colors"
                  style={{ backgroundColor: '#EAF5FD', color: '#1B5BC1', border: '1px solid rgba(27,91,193,0.15)' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#d8eaf7')}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#EAF5FD')}
                >
                  Reprogramar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
