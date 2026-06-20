'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import Badge from '@/components/ui/Badge'
import { leadsIniciales, ETAPAS, EtapaLead, Lead } from '@/data/inmobiliarias'

const etapaBadge: Record<EtapaLead, { variant: 'gray' | 'yellow' | 'blue' | 'green' }> = {
  'Interesado':       { variant: 'gray'   },
  'Visita agendada':  { variant: 'yellow' },
  'Propuesta':        { variant: 'blue'   },
  'Cierre':           { variant: 'green'  },
}

export default function InmobiliariasDemo() {
  const [leads, setLeads]       = useState(leadsIniciales)
  const [modal, setModal]       = useState(false)
  const [view, setView]         = useState<'pipeline' | 'lista'>('pipeline')
  const [form, setForm]         = useState({
    nombre: '', contacto: '', propiedadInteres: '', nota: '',
  })
  const [selected, setSelected] = useState<Lead | null>(null)
  const [detModal, setDetModal] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const addLead = () => {
    if (!form.nombre) return
    setLeads([...leads, {
      id: `l${Date.now()}`,
      nombre: form.nombre,
      contacto: form.contacto,
      propiedadInteres: form.propiedadInteres,
      presupuesto: '[pendiente]',
      etapa: 'Interesado',
      fechaIngreso: new Date().toISOString().split('T')[0],
      nota: form.nota || undefined,
    }])
    setForm({ nombre: '', contacto: '', propiedadInteres: '', nota: '' })
    setModal(false)
  }

  const moveEtapa = (id: string, direction: -1 | 1) => {
    setLeads((prev) => prev.map((l) => {
      if (l.id !== id) return l
      const idx = ETAPAS.indexOf(l.etapa)
      const newIdx = idx + direction
      if (newIdx < 0 || newIdx >= ETAPAS.length) return l
      return { ...l, etapa: ETAPAS[newIdx] }
    }))
  }

  const openDetail = (lead: Lead) => { setSelected(lead); setDetModal(true) }

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-1 bg-fondo-suave rounded-sm p-1">
          {(['pipeline', 'lista'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded-xs text-sm font-semibold transition-all duration-160 ${
                view === v ? 'bg-white text-azul-nucleo shadow-card' : 'text-texto-sec hover:text-carbon'
              }`}
            >
              {v === 'pipeline' ? 'Pipeline' : 'Lista'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-3 text-xs text-texto-sec">
            {ETAPAS.map((e) => (
              <span key={e} className="flex items-center gap-1">
                <Badge variant={etapaBadge[e].variant}>{leads.filter((l) => l.etapa === e).length}</Badge>
                <span className="hidden sm:inline">{e}</span>
              </span>
            ))}
          </div>
          <Button size="sm" onClick={() => setModal(true)}>+ Nuevo lead</Button>
        </div>
      </div>

      {/* Pipeline view */}
      {view === 'pipeline' && (
        <div className="animate-fade-in grid grid-cols-2 lg:grid-cols-4 gap-3">
          {ETAPAS.map((etapa) => {
            const etapaLeads = leads.filter((l) => l.etapa === etapa)
            const badge = etapaBadge[etapa]
            return (
              <div key={etapa} className="bg-fondo-suave rounded-lg border border-borde overflow-hidden flex flex-col">
                <div className="px-3 py-2.5 border-b border-borde flex items-center justify-between">
                  <Badge variant={badge.variant}>{etapa}</Badge>
                  <span className="text-xs font-bold text-texto-sec">{etapaLeads.length}</span>
                </div>
                <div className="flex-1 p-2 space-y-2 min-h-[160px]">
                  {etapaLeads.length === 0 && (
                    <p className="text-xs text-texto-sec/60 text-center py-6">Sin leads</p>
                  )}
                  {etapaLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-white rounded-md border border-borde p-3 shadow-card cursor-pointer hover:border-azul-nucleo/30 transition-colors"
                      onClick={() => openDetail(lead)}
                    >
                      <p className="text-xs font-bold text-carbon mb-0.5">{lead.nombre}</p>
                      <p className="text-[11px] text-texto-sec mb-1 line-clamp-1">{lead.propiedadInteres}</p>
                      <p className="text-[10px] text-texto-sec/60">{lead.fechaIngreso}</p>
                      {lead.nota && (
                        <p className="text-[11px] text-texto-sec/80 mt-1 line-clamp-2 italic">"{lead.nota}"</p>
                      )}
                      <div className="flex gap-1 mt-2">
                        <button
                          disabled={ETAPAS.indexOf(lead.etapa) === 0}
                          onClick={(e) => { e.stopPropagation(); moveEtapa(lead.id, -1) }}
                          className="flex-1 py-1 text-[11px] font-semibold rounded-xs bg-fondo-suave text-texto-sec hover:bg-borde disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >← Prev</button>
                        <button
                          disabled={ETAPAS.indexOf(lead.etapa) === ETAPAS.length - 1}
                          onClick={(e) => { e.stopPropagation(); moveEtapa(lead.id, 1) }}
                          className="flex-1 py-1 text-[11px] font-semibold rounded-xs bg-tinte-interfaz text-azul-nucleo hover:bg-azul-nucleo/15 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >Next →</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Lista view */}
      {view === 'lista' && (
        <div className="animate-fade-in rounded-lg border border-borde overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-fondo-suave text-left">
                <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide">Lead</th>
                <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide hidden md:table-cell">Propiedad</th>
                <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide">Etapa</th>
                <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide hidden sm:table-cell">Ingresó</th>
                <th className="px-4 py-2.5 w-28" />
              </tr>
            </thead>
            <tbody className="divide-y divide-borde">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-fondo-suave/50 cursor-pointer" onClick={() => openDetail(lead)}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-carbon">{lead.nombre}</p>
                    <p className="text-xs text-texto-sec">{lead.contacto}</p>
                  </td>
                  <td className="px-4 py-3 text-texto-sec text-xs hidden md:table-cell">{lead.propiedadInteres}</td>
                  <td className="px-4 py-3">
                    <Badge variant={etapaBadge[lead.etapa].variant}>{lead.etapa}</Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-texto-sec hidden sm:table-cell">{lead.fechaIngreso}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        disabled={ETAPAS.indexOf(lead.etapa) === 0}
                        onClick={() => moveEtapa(lead.id, -1)}
                        className="px-2 py-1 text-[11px] font-semibold rounded-xs bg-fondo-suave text-texto-sec hover:bg-borde disabled:opacity-30 transition-colors"
                      >←</button>
                      <button
                        disabled={ETAPAS.indexOf(lead.etapa) === ETAPAS.length - 1}
                        onClick={() => moveEtapa(lead.id, 1)}
                        className="px-2 py-1 text-[11px] font-semibold rounded-xs bg-tinte-interfaz text-azul-nucleo hover:bg-azul-nucleo/15 disabled:opacity-30 transition-colors"
                      >→</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add lead modal */}
      <Modal open={modal} onClose={() => setModal(false)} title="Nuevo lead">
        <div className="flex flex-col gap-3">
          <Input label="Nombre" value={form.nombre} onChange={set('nombre')} placeholder="Sofía Herrera" />
          <Input label="Contacto" value={form.contacto} onChange={set('contacto')} placeholder="email o teléfono" />
          <Input label="Propiedad de interés" value={form.propiedadInteres} onChange={set('propiedadInteres')} placeholder="Dpto. 3 amb. Nueva Córdoba" />
          <div>
            <label className="text-xs font-semibold text-texto-sec uppercase tracking-wide">Nota (opcional)</label>
            <textarea
              value={form.nota}
              onChange={set('nota')}
              rows={2}
              className="mt-1 w-full px-3 py-2 rounded-sm border border-borde text-sm text-carbon bg-white focus:outline-none focus:border-azul-accion focus:ring-2 focus:ring-azul-accion/15 resize-none"
              placeholder="Observaciones..."
            />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" size="sm" onClick={() => setModal(false)}>Cancelar</Button>
            <Button size="sm" onClick={addLead}>Guardar lead</Button>
          </div>
        </div>
      </Modal>

      {/* Detail modal */}
      {selected && (
        <Modal open={detModal} onClose={() => setDetModal(false)} title="Detalle del lead">
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div><p className="text-xs text-texto-sec uppercase tracking-wide font-semibold mb-1">Nombre</p><p className="text-carbon font-medium">{selected.nombre}</p></div>
              <div><p className="text-xs text-texto-sec uppercase tracking-wide font-semibold mb-1">Etapa</p><Badge variant={etapaBadge[selected.etapa].variant}>{selected.etapa}</Badge></div>
              <div><p className="text-xs text-texto-sec uppercase tracking-wide font-semibold mb-1">Contacto</p><p className="text-carbon">{selected.contacto}</p></div>
              <div><p className="text-xs text-texto-sec uppercase tracking-wide font-semibold mb-1">Ingresó</p><p className="text-carbon">{selected.fechaIngreso}</p></div>
            </div>
            <div><p className="text-xs text-texto-sec uppercase tracking-wide font-semibold mb-1">Propiedad de interés</p><p className="text-carbon">{selected.propiedadInteres}</p></div>
            {selected.nota && <div><p className="text-xs text-texto-sec uppercase tracking-wide font-semibold mb-1">Nota</p><p className="text-carbon italic">{selected.nota}</p></div>}
            <div className="flex gap-2 pt-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={ETAPAS.indexOf(selected.etapa) === 0}
                onClick={() => { moveEtapa(selected.id, -1); setDetModal(false) }}
              >← Etapa anterior</Button>
              <Button
                size="sm"
                disabled={ETAPAS.indexOf(selected.etapa) === ETAPAS.length - 1}
                onClick={() => { moveEtapa(selected.id, 1); setDetModal(false) }}
              >Avanzar etapa →</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
