'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const AgendaDemo = dynamic(() => import('./AgendaDemo'), { ssr: false })

type Sel = null | 'agenda'

function IcoCalendar() {
  return (
    <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 3l0 4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 3l0 4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 11l16 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 15h2v2h-2z" />
    </svg>
  )
}

export default function SaludHub() {
  const [sel, setSel] = useState<Sel>(null)

  if (sel === 'agenda') {
    return <AgendaDemo onBack={() => setSel(null)} />
  }

  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(90,104,113,0.6)' }}>
        Herramientas disponibles
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => setSel('agenda')}
          className="group text-left rounded-xl border border-borde bg-white p-5 hover:border-azul-nucleo/30 hover:shadow-md transition-all duration-160"
        >
          <div className="w-11 h-11 rounded-lg bg-tinte-interfaz text-azul-nucleo flex items-center justify-center mb-4 group-hover:bg-azul-nucleo group-hover:text-white transition-all duration-160">
            <IcoCalendar />
          </div>
          <p className="text-sm font-bold text-carbon mb-1.5">Agenda de turnos</p>
          <p className="text-xs text-texto-sec leading-relaxed mb-3">
            Gestioná los turnos de tu consultorio, agendá nuevos pacientes y enviá confirmaciones automáticas.
          </p>
          <span className="inline-flex items-center px-2 py-0.5 rounded-xs bg-fondo-suave text-texto-sec text-[10px] font-semibold uppercase tracking-wide border border-borde">
            Agenda · Turnos
          </span>
        </button>
      </div>
    </div>
  )
}
