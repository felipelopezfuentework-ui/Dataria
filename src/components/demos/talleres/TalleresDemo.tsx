'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Modal from '@/components/ui/Modal'
import Badge from '@/components/ui/Badge'
import { ordenesIniciales, ESTADOS, EstadoOrden, OrdenTaller } from '@/data/talleres'

const estadoBadge: Record<EstadoOrden, { variant: 'gray' | 'yellow' | 'blue' | 'green'; label: string }> = {
  'Recibido':           { variant: 'gray',   label: 'Recibido'         },
  'En diagnóstico':     { variant: 'yellow', label: 'En diagnóstico'   },
  'En reparación':      { variant: 'blue',   label: 'En reparación'    },
  'Listo para retirar': { variant: 'green',  label: 'Listo para retirar' },
}

const estadoIdx = (e: EstadoOrden) => ESTADOS.indexOf(e)

// ─── Panel de clientes ────────────────────────────────────────────────────────
function ClientesPanel({ ordenes, onUpdate }: { ordenes: OrdenTaller[]; onUpdate: (o: OrdenTaller[]) => void }) {
  const [modal, setModal] = useState(false)
  const [form, setForm]   = useState({
    cliente: '', telefono: '', marca: '', modelo: '', patente: '',
    problema: '', tiempoEst: '', estado: 'Recibido' as EstadoOrden,
  })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const save = () => {
    if (!form.cliente || !form.problema) return
    onUpdate([...ordenes, {
      id: `ot${Date.now()}`,
      cliente: form.cliente,
      telefono: form.telefono,
      vehiculo: { marca: form.marca, modelo: form.modelo, patente: form.patente },
      problema: form.problema,
      tiempoEstimado: form.tiempoEst,
      estado: form.estado,
      fechaIngreso: new Date().toISOString().split('T')[0],
    }])
    setModal(false)
  }

  const advanceEstado = (id: string) => {
    onUpdate(ordenes.map((o) => {
      if (o.id !== id) return o
      const idx = estadoIdx(o.estado)
      return idx < ESTADOS.length - 1 ? { ...o, estado: ESTADOS[idx + 1] } : o
    }))
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-carbon">Órdenes activas</p>
          <p className="text-xs text-texto-sec">{ordenes.length} ingresos registrados</p>
        </div>
        <Button size="sm" onClick={() => setModal(true)}>+ Nuevo ingreso</Button>
      </div>

      <div className="space-y-3">
        {ordenes.map((orden) => {
          const badge  = estadoBadge[orden.estado]
          const canAdv = estadoIdx(orden.estado) < ESTADOS.length - 1
          return (
            <div key={orden.id} className="rounded-lg border border-borde bg-white p-4 shadow-card">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-carbon text-sm">{orden.cliente}</span>
                    <span className="text-xs text-texto-sec">{orden.telefono}</span>
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                  </div>
                  <p className="text-xs font-medium text-carbon mb-0.5">
                    {orden.vehiculo.marca} {orden.vehiculo.modelo} — {orden.vehiculo.patente}
                  </p>
                  <p className="text-xs text-texto-sec leading-relaxed">{orden.problema}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="text-right">
                    <p className="text-xs text-texto-sec">Ingresó: {orden.fechaIngreso}</p>
                    <p className="text-xs text-texto-sec">Est: {orden.tiempoEstimado}</p>
                  </div>
                  {canAdv && (
                    <Button size="sm" variant="secondary" onClick={() => advanceEstado(orden.id)}>
                      → {ESTADOS[estadoIdx(orden.estado) + 1]}
                    </Button>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 flex items-center gap-1">
                {ESTADOS.map((est, i) => {
                  const done = i <= estadoIdx(orden.estado)
                  return (
                    <div key={est} className="flex-1 flex items-center gap-1">
                      <div className={`h-1.5 flex-1 rounded-full transition-all duration-280 ${done ? 'bg-azul-nucleo' : 'bg-borde'}`} />
                      {i === ESTADOS.length - 1 && null}
                    </div>
                  )
                })}
              </div>
              <div className="flex justify-between mt-1">
                {ESTADOS.map((est, i) => (
                  <span key={est} className={`text-[10px] ${i <= estadoIdx(orden.estado) ? 'text-azul-nucleo font-medium' : 'text-texto-sec/50'}`}>
                    {est.split(' ')[0]}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Nuevo ingreso al taller" maxWidth="max-w-xl">
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Cliente" value={form.cliente} onChange={set('cliente')} placeholder="Juan Pérez" />
            <Input label="Teléfono" value={form.telefono} onChange={set('telefono')} placeholder="351-555-0000" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Input label="Marca" value={form.marca} onChange={set('marca')} placeholder="Toyota" />
            <Input label="Modelo" value={form.modelo} onChange={set('modelo')} placeholder="Corolla" />
            <Input label="Patente" value={form.patente} onChange={set('patente')} placeholder="AB 123 CD" />
          </div>
          <div>
            <label className="text-xs font-semibold text-texto-sec uppercase tracking-wide">Descripción del problema</label>
            <textarea
              value={form.problema}
              onChange={set('problema')}
              rows={2}
              className="mt-1 w-full px-3 py-2 rounded-sm border border-borde text-sm text-carbon bg-white focus:outline-none focus:border-azul-accion focus:ring-2 focus:ring-azul-accion/15 resize-none"
              placeholder="Describí el problema..."
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Tiempo estimado" value={form.tiempoEst} onChange={set('tiempoEst')} placeholder="2-3 días" />
            <Select label="Estado inicial" value={form.estado} onChange={set('estado')}>
              {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
            </Select>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" size="sm" onClick={() => setModal(false)}>Cancelar</Button>
            <Button size="sm" onClick={save}>Guardar</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

// ─── Kanban / Agenda ──────────────────────────────────────────────────────────
function AgendaKanban({ ordenes, onUpdate }: { ordenes: OrdenTaller[]; onUpdate: (o: OrdenTaller[]) => void }) {
  const moveEstado = (id: string, direction: -1 | 1) => {
    onUpdate(ordenes.map((o) => {
      if (o.id !== id) return o
      const idx = estadoIdx(o.estado)
      const newIdx = idx + direction
      if (newIdx < 0 || newIdx >= ESTADOS.length) return o
      return { ...o, estado: ESTADOS[newIdx] }
    }))
  }

  return (
    <div>
      <p className="text-sm font-semibold text-carbon mb-4">Agenda — Vista por estado</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {ESTADOS.map((estado) => {
          const cards = ordenes.filter((o) => o.estado === estado)
          const badge = estadoBadge[estado]
          return (
            <div key={estado} className="bg-fondo-suave rounded-lg border border-borde overflow-hidden">
              <div className="px-3 py-2.5 border-b border-borde flex items-center justify-between">
                <Badge variant={badge.variant}>{estado}</Badge>
                <span className="text-xs font-bold text-texto-sec">{cards.length}</span>
              </div>
              <div className="p-2 space-y-2 min-h-[120px]">
                {cards.length === 0 && (
                  <p className="text-xs text-texto-sec/60 text-center py-4">Sin vehículos</p>
                )}
                {cards.map((orden) => (
                  <div key={orden.id} className="bg-white rounded-md border border-borde p-3 shadow-card">
                    <p className="text-xs font-bold text-carbon mb-0.5">{orden.cliente}</p>
                    <p className="text-xs text-texto-sec mb-1">{orden.vehiculo.marca} {orden.vehiculo.modelo}</p>
                    <p className="text-[11px] text-texto-sec/80 leading-snug line-clamp-2">{orden.problema}</p>
                    <p className="text-[11px] text-texto-sec/60 mt-1">Ingresó: {orden.fechaIngreso}</p>
                    <div className="flex gap-1 mt-2">
                      <button
                        disabled={estadoIdx(orden.estado) === 0}
                        onClick={() => moveEstado(orden.id, -1)}
                        className="flex-1 py-1 text-[11px] font-semibold rounded-xs bg-fondo-suave text-texto-sec hover:bg-borde disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        ← Prev
                      </button>
                      <button
                        disabled={estadoIdx(orden.estado) === ESTADOS.length - 1}
                        onClick={() => moveEstado(orden.id, 1)}
                        className="flex-1 py-1 text-[11px] font-semibold rounded-xs bg-tinte-interfaz text-azul-nucleo hover:bg-azul-nucleo/15 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function TalleresDemo() {
  const [tab, setTab]         = useState<'clientes' | 'agenda'>('clientes')
  const [ordenes, setOrdenes] = useState(ordenesIniciales)

  return (
    <div className="space-y-5">
      <div className="flex gap-1 bg-fondo-suave rounded-sm p-1 w-fit">
        {(['clientes', 'agenda'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xs text-sm font-semibold transition-all duration-160 ${
              tab === t ? 'bg-white text-azul-nucleo shadow-card' : 'text-texto-sec hover:text-carbon'
            }`}
          >
            {t === 'clientes' ? 'Panel de órdenes' : 'Agenda Kanban'}
          </button>
        ))}
      </div>

      <div className="animate-fade-in" key={tab}>
        {tab === 'clientes'
          ? <ClientesPanel ordenes={ordenes} onUpdate={setOrdenes} />
          : <AgendaKanban ordenes={ordenes} onUpdate={setOrdenes} />
        }
      </div>
    </div>
  )
}
