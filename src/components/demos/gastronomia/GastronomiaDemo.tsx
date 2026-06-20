'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Modal from '@/components/ui/Modal'
import {
  insumosIniciales, recetasIniciales, ingresosIniciales,
  Insumo, Receta, IngresoMercaderia, ComponenteReceta,
} from '@/data/gastronomia'

const fmt = (n: number) =>
  n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 })

function calcCostoReceta(receta: Receta, insumos: Insumo[]): number {
  return receta.componentes.reduce((acc, comp) => {
    const ins = insumos.find((i) => i.id === comp.insumoId)
    return acc + (ins ? ins.costoUnitario * comp.cantidad : 0)
  }, 0)
}

// ─── Insumos sub-panel ────────────────────────────────────────────────────────
function InsumosPanel({
  insumos, onUpdate,
}: {
  insumos: Insumo[]
  onUpdate: (updated: Insumo[]) => void
}) {
  const [modal, setModal]     = useState(false)
  const [nombre, setNombre]   = useState('')
  const [unidad, setUnidad]   = useState('')
  const [costo, setCosto]     = useState('')
  const [editing, setEditing] = useState<string | null>(null)

  const openAdd = () => {
    setEditing(null); setNombre(''); setUnidad(''); setCosto(''); setModal(true)
  }
  const openEdit = (ins: Insumo) => {
    setEditing(ins.id); setNombre(ins.nombre); setUnidad(ins.unidad); setCosto(String(ins.costoUnitario)); setModal(true)
  }
  const save = () => {
    if (!nombre || !unidad || !costo) return
    if (editing) {
      onUpdate(insumos.map((i) => i.id === editing ? { ...i, nombre, unidad, costoUnitario: Number(costo) } : i))
    } else {
      onUpdate([...insumos, { id: `i${Date.now()}`, nombre, unidad, costoUnitario: Number(costo) }])
    }
    setModal(false)
  }
  const remove = (id: string) => onUpdate(insumos.filter((i) => i.id !== id))

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-carbon">Costos de insumos</p>
          <p className="text-xs text-texto-sec">{insumos.length} insumos registrados</p>
        </div>
        <Button size="sm" onClick={openAdd}>+ Agregar insumo</Button>
      </div>
      <div className="rounded-lg border border-borde overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-fondo-suave text-left">
              <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide">Insumo</th>
              <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide">Unidad</th>
              <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide text-right">Costo/unidad</th>
              <th className="px-4 py-2.5 w-16" />
            </tr>
          </thead>
          <tbody className="divide-y divide-borde">
            {insumos.map((ins) => (
              <tr key={ins.id} className="hover:bg-fondo-suave/50 transition-colors">
                <td className="px-4 py-3 font-medium text-carbon">{ins.nombre}</td>
                <td className="px-4 py-3 text-texto-sec">{ins.unidad}</td>
                <td className="px-4 py-3 text-right font-semibold text-carbon">{fmt(ins.costoUnitario)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    <button onClick={() => openEdit(ins)} className="p-1 rounded text-texto-sec hover:text-azul-nucleo hover:bg-tinte-interfaz transition-colors">
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" /></svg>
                    </button>
                    <button onClick={() => remove(ins.id)} className="p-1 rounded text-texto-sec hover:text-error hover:bg-error-container transition-colors">
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Editar insumo' : 'Nuevo insumo'}>
        <div className="flex flex-col gap-4">
          <Input label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="ej: Harina 000" />
          <Input label="Unidad" value={unidad} onChange={(e) => setUnidad(e.target.value)} placeholder="ej: kg, lt, unidad" />
          <Input label="Costo por unidad (ARS)" type="number" value={costo} onChange={(e) => setCosto(e.target.value)} placeholder="850" />
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" size="sm" onClick={() => setModal(false)}>Cancelar</Button>
            <Button size="sm" onClick={save}>Guardar</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

// ─── Recetas sub-panel ────────────────────────────────────────────────────────
function RecetasPanel({ recetas, insumos, onUpdate }: {
  recetas: Receta[]
  insumos: Insumo[]
  onUpdate: (r: Receta[]) => void
}) {
  const [modal, setModal]         = useState(false)
  const [nombre, setNombre]       = useState('')
  const [comps, setComps]         = useState<ComponenteReceta[]>([{ insumoId: '', cantidad: 1 }])
  const [expanded, setExpanded]   = useState<string | null>(null)

  const openAdd = () => { setNombre(''); setComps([{ insumoId: '', cantidad: 1 }]); setModal(true) }

  const addComp = () => setComps([...comps, { insumoId: '', cantidad: 1 }])
  const removeComp = (idx: number) => setComps(comps.filter((_, i) => i !== idx))
  const updateComp = (idx: number, field: keyof ComponenteReceta, val: string) =>
    setComps(comps.map((c, i) => i === idx ? { ...c, [field]: field === 'cantidad' ? Number(val) : val } : c))

  const save = () => {
    if (!nombre || comps.some((c) => !c.insumoId)) return
    onUpdate([...recetas, { id: `r${Date.now()}`, nombre, componentes: comps }])
    setModal(false)
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-carbon">Costos de recetas</p>
          <p className="text-xs text-texto-sec">{recetas.length} recetas configuradas</p>
        </div>
        <Button size="sm" onClick={openAdd}>+ Agregar receta</Button>
      </div>

      <div className="space-y-3">
        {recetas.map((rec) => {
          const costo = calcCostoReceta(rec, insumos)
          const isOpen = expanded === rec.id
          return (
            <div key={rec.id} className="rounded-lg border border-borde overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : rec.id)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-fondo-suave/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-carbon">{rec.nombre}</span>
                  <span className="text-xs text-texto-sec">{rec.componentes.length} ingredientes</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-azul-nucleo">{fmt(costo)}</span>
                  <svg
                    width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    className={`text-texto-sec transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-borde bg-fondo-suave">
                  <table className="w-full text-xs">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold text-texto-sec uppercase tracking-wide">Insumo</th>
                        <th className="px-4 py-2 text-right font-semibold text-texto-sec uppercase tracking-wide">Cant.</th>
                        <th className="px-4 py-2 text-right font-semibold text-texto-sec uppercase tracking-wide">Costo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-borde/50">
                      {rec.componentes.map((comp) => {
                        const ins = insumos.find((i) => i.id === comp.insumoId)
                        return (
                          <tr key={comp.insumoId + comp.cantidad}>
                            <td className="px-4 py-2 text-carbon">{ins?.nombre ?? '—'}</td>
                            <td className="px-4 py-2 text-right text-texto-sec">{comp.cantidad} {ins?.unidad}</td>
                            <td className="px-4 py-2 text-right font-medium text-carbon">
                              {ins ? fmt(ins.costoUnitario * comp.cantidad) : '—'}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-borde">
                        <td colSpan={2} className="px-4 py-2 text-right font-bold text-xs text-carbon uppercase tracking-wide">Total receta</td>
                        <td className="px-4 py-2 text-right font-extrabold text-azul-nucleo">{fmt(costo)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Nueva receta" maxWidth="max-w-xl">
        <div className="flex flex-col gap-4">
          <Input label="Nombre de la receta" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="ej: Pizza Margherita" />
          <div>
            <p className="text-xs font-semibold text-texto-sec uppercase tracking-wide mb-2">Ingredientes</p>
            {comps.map((comp, idx) => (
              <div key={idx} className="flex items-end gap-2 mb-2">
                <Select
                  className="flex-1"
                  value={comp.insumoId}
                  onChange={(e) => updateComp(idx, 'insumoId', e.target.value)}
                >
                  <option value="">Seleccionar insumo</option>
                  {insumos.map((ins) => (
                    <option key={ins.id} value={ins.id}>{ins.nombre} ({ins.unidad})</option>
                  ))}
                </Select>
                <Input
                  className="w-24"
                  type="number"
                  placeholder="Cant."
                  value={comp.cantidad}
                  onChange={(e) => updateComp(idx, 'cantidad', e.target.value)}
                />
                <button onClick={() => removeComp(idx)} className="mb-0.5 p-2 rounded text-texto-sec hover:text-error hover:bg-error-container transition-colors">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
            <button onClick={addComp} className="text-xs font-semibold text-azul-nucleo hover:text-azul-accion flex items-center gap-1 mt-1">
              + Agregar ingrediente
            </button>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" size="sm" onClick={() => setModal(false)}>Cancelar</Button>
            <Button size="sm" onClick={save}>Guardar receta</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

// ─── Ingresos sub-panel ───────────────────────────────────────────────────────
function IngresosPanel({ insumos, ingresos, onAdd }: {
  insumos: Insumo[]
  ingresos: IngresoMercaderia[]
  onAdd: (ingreso: IngresoMercaderia) => void
}) {
  const [insumoId, setInsumoId]   = useState('')
  const [cantidad, setCantidad]   = useState('')
  const [precio, setPrecio]       = useState('')
  const [saved, setSaved]         = useState(false)

  const handleAdd = () => {
    if (!insumoId || !cantidad || !precio) return
    onAdd({
      id: `im${Date.now()}`,
      insumoId,
      cantidad: Number(cantidad),
      precioPagado: Number(precio),
      fecha: new Date().toISOString().split('T')[0],
    })
    setSaved(true)
    setInsumoId(''); setCantidad(''); setPrecio('')
    setTimeout(() => setSaved(false), 2000)
  }

  // Costo actualizado por insumo (último precio pagado por unidad)
  const costoPorInsumo = insumos.map((ins) => {
    const ultIngreso = [...ingresos]
      .filter((ig) => ig.insumoId === ins.id)
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())[0]
    return {
      ins,
      costoActual: ultIngreso ? ultIngreso.precioPagado / ultIngreso.cantidad : ins.costoUnitario,
      ultimoIngreso: ultIngreso,
    }
  })

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="bg-fondo-suave rounded-lg border border-borde p-5">
        <p className="text-sm font-semibold text-carbon mb-4">Registrar ingreso de mercadería</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Select label="Insumo" value={insumoId} onChange={(e) => setInsumoId(e.target.value)}>
            <option value="">Seleccionar</option>
            {insumos.map((ins) => (
              <option key={ins.id} value={ins.id}>{ins.nombre}</option>
            ))}
          </Select>
          <Input label="Cantidad comprada" type="number" placeholder="ej: 10" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
          <Input label="Precio total pagado (ARS)" type="number" placeholder="ej: 8500" value={precio} onChange={(e) => setPrecio(e.target.value)} />
        </div>
        <div className="flex items-center gap-3 mt-4">
          <Button size="sm" onClick={handleAdd}>Registrar ingreso</Button>
          {saved && <span className="text-xs text-green-600 font-semibold animate-fade-in">✓ Ingreso registrado</span>}
        </div>
      </div>

      {/* Cost per ingredient updated view */}
      <div>
        <p className="text-sm font-semibold text-carbon mb-3">Costo actualizado por insumo</p>
        <div className="rounded-lg border border-borde overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-fondo-suave text-left">
                <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide">Insumo</th>
                <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide text-right">Costo/unidad actual</th>
                <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide text-right">Últ. ingreso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borde">
              {costoPorInsumo.map(({ ins, costoActual, ultimoIngreso }) => (
                <tr key={ins.id} className="hover:bg-fondo-suave/50">
                  <td className="px-4 py-3 font-medium text-carbon">{ins.nombre}</td>
                  <td className="px-4 py-3 text-right font-bold text-azul-nucleo">{fmt(costoActual)} / {ins.unidad}</td>
                  <td className="px-4 py-3 text-right text-xs text-texto-sec">
                    {ultimoIngreso ? ultimoIngreso.fecha : 'Sin ingresos'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* History */}
      {ingresos.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-carbon mb-3">Historial de ingresos</p>
          <div className="rounded-lg border border-borde overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-fondo-suave text-left">
                  <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide">Fecha</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide">Insumo</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide text-right">Cantidad</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide text-right">Precio pagado</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide text-right">$/unidad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borde">
                {[...ingresos].reverse().map((ig) => {
                  const ins = insumos.find((i) => i.id === ig.insumoId)
                  return (
                    <tr key={ig.id} className="hover:bg-fondo-suave/50">
                      <td className="px-4 py-3 text-texto-sec">{ig.fecha}</td>
                      <td className="px-4 py-3 font-medium text-carbon">{ins?.nombre ?? '—'}</td>
                      <td className="px-4 py-3 text-right text-carbon">{ig.cantidad} {ins?.unidad}</td>
                      <td className="px-4 py-3 text-right font-medium text-carbon">{fmt(ig.precioPagado)}</td>
                      <td className="px-4 py-3 text-right font-bold text-azul-nucleo">{fmt(ig.precioPagado / ig.cantidad)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Root component ───────────────────────────────────────────────────────────
export default function GastronomiaDemo() {
  const [tab, setTab]           = useState<'costos' | 'ingresos'>('costos')
  const [subTab, setSubTab]     = useState<'insumos' | 'recetas'>('insumos')
  const [insumos, setInsumos]   = useState(insumosIniciales)
  const [recetas, setRecetas]   = useState(recetasIniciales)
  const [ingresos, setIngresos] = useState(ingresosIniciales)

  return (
    <div className="space-y-5">
      {/* Top-level tabs */}
      <div className="flex gap-1 bg-fondo-suave rounded-sm p-1 w-fit">
        {(['costos', 'ingresos'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xs text-sm font-semibold transition-all duration-160 ${
              tab === t ? 'bg-white text-azul-nucleo shadow-card' : 'text-texto-sec hover:text-carbon'
            }`}
          >
            {t === 'costos' ? 'Costos' : 'Ingresos de mercadería'}
          </button>
        ))}
      </div>

      {tab === 'costos' && (
        <>
          {/* Sub-tabs */}
          <div className="flex gap-1 border-b border-borde pb-0">
            {(['insumos', 'recetas'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setSubTab(st)}
                className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all duration-160 -mb-px ${
                  subTab === st
                    ? 'text-azul-nucleo border-azul-nucleo'
                    : 'text-texto-sec border-transparent hover:text-carbon'
                }`}
              >
                {st === 'insumos' ? 'Insumos' : 'Recetas'}
              </button>
            ))}
          </div>

          <div className="animate-fade-in">
            {subTab === 'insumos'
              ? <InsumosPanel insumos={insumos} onUpdate={setInsumos} />
              : <RecetasPanel recetas={recetas} insumos={insumos} onUpdate={setRecetas} />
            }
          </div>
        </>
      )}

      {tab === 'ingresos' && (
        <div className="animate-fade-in">
          <IngresosPanel
            insumos={insumos}
            ingresos={ingresos}
            onAdd={(ig) => setIngresos((prev) => [...prev, ig])}
          />
        </div>
      )}
    </div>
  )
}
