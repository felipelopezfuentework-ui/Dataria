'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Insumo {
  id: string; nombre: string; proveedor: string
  formato: string; precioFormato: number; kgFormato: number
}
interface ComponenteSub {
  insumoId: string; kgNeto: number; merma: number
}
interface Subproducto {
  id: string; nombre: string; componentes: ComponenteSub[]
}
interface ComponentePlato {
  tipo: 'insumo' | 'subproducto'; referenciaId: string; kg: number
}
interface Plato {
  id: string; nombre: string; componentes: ComponentePlato[]
}
interface Proveedor {
  id: string; rubro: string; nombre: string; contacto: string; telefono: string
}

// ─── Initial data ─────────────────────────────────────────────────────────────

const initInsumos: Insumo[] = [
  { id: 'i1', nombre: 'Aceite de oliva',  proveedor: 'El Criollo',        formato: 'Botella 1L',  precioFormato: 4200,  kgFormato: 1    },
  { id: 'i2', nombre: 'Harina 000',       proveedor: 'Molinera Sur',      formato: 'Bolsa 25kg',  precioFormato: 18500, kgFormato: 25   },
  { id: 'i3', nombre: 'Huevos',           proveedor: 'Granja Alta',       formato: 'Docena',      precioFormato: 1800,  kgFormato: 0.72 },
  { id: 'i4', nombre: 'Tomate perita',    proveedor: 'Mercado Central',   formato: 'Caja 10kg',   precioFormato: 6500,  kgFormato: 10   },
  { id: 'i5', nombre: 'Mozzarella',       proveedor: 'Lácteos Norte',     formato: 'Horma 2kg',   precioFormato: 9800,  kgFormato: 2    },
  { id: 'i6', nombre: 'Albahaca fresca',  proveedor: 'Verdulería Local',  formato: 'Atado 100g',  precioFormato: 800,   kgFormato: 0.1  },
  { id: 'i7', nombre: 'Sal fina',         proveedor: 'Distribuidora ABC', formato: 'Bolsa 1kg',   precioFormato: 450,   kgFormato: 1    },
]

const initSubproductos: Subproducto[] = [
  { id: 's1', nombre: 'Salsa de tomate', componentes: [
    { insumoId: 'i4', kgNeto: 0.5,  merma: 10 },
    { insumoId: 'i6', kgNeto: 0.05, merma: 0  },
  ]},
  { id: 's2', nombre: 'Masa para pizza', componentes: [
    { insumoId: 'i2', kgNeto: 0.3,   merma: 5 },
    { insumoId: 'i1', kgNeto: 0.02,  merma: 0 },
    { insumoId: 'i7', kgNeto: 0.005, merma: 0 },
  ]},
]

const initPlatos: Plato[] = [
  { id: 'p1', nombre: 'Pizza Margherita', componentes: [
    { tipo: 'subproducto', referenciaId: 's2', kg: 0.3  },
    { tipo: 'subproducto', referenciaId: 's1', kg: 0.15 },
    { tipo: 'insumo',      referenciaId: 'i5', kg: 0.12 },
  ]},
  { id: 'p2', nombre: 'Ensalada caprese', componentes: [
    { tipo: 'insumo', referenciaId: 'i4', kg: 0.2  },
    { tipo: 'insumo', referenciaId: 'i5', kg: 0.15 },
    { tipo: 'insumo', referenciaId: 'i6', kg: 0.05 },
    { tipo: 'insumo', referenciaId: 'i1', kg: 0.02 },
  ]},
]

const initProveedores: Proveedor[] = [
  { id: 'pv1', rubro: 'Aceites',  nombre: 'El Criollo',      contacto: 'Marcelo R.', telefono: '11-4523-0011' },
  { id: 'pv2', rubro: 'Harinas',  nombre: 'Molinera Sur',    contacto: 'Paula V.',   telefono: '11-3310-5599' },
  { id: 'pv3', rubro: 'Lácteos',  nombre: 'Lácteos Norte',   contacto: 'Roberto P.', telefono: '11-6611-2233' },
  { id: 'pv4', rubro: 'Verduras', nombre: 'Mercado Central', contacto: '—',          telefono: '—'            },
]

// ─── Calc helpers ─────────────────────────────────────────────────────────────

const fmt = (n: number) => n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 })
const pxkg = (i: Insumo) => i.precioFormato / i.kgFormato

function costoCompSub(c: ComponenteSub, ins: Insumo[]) {
  const i = ins.find(x => x.id === c.insumoId)
  if (!i) return 0
  return pxkg(i) * (c.kgNeto / (1 - c.merma / 100))
}
function costoSub(s: Subproducto, ins: Insumo[]) {
  return s.componentes.reduce((a, c) => a + costoCompSub(c, ins), 0)
}
function kgTotalesSub(s: Subproducto) {
  return s.componentes.reduce((a, c) => a + c.kgNeto / (1 - c.merma / 100), 0)
}
function costoPxKgSub(s: Subproducto, ins: Insumo[]) {
  const kg = kgTotalesSub(s)
  return kg === 0 ? 0 : costoSub(s, ins) / kg
}
function costoCompPlato(c: ComponentePlato, ins: Insumo[], subs: Subproducto[]) {
  if (c.tipo === 'insumo') {
    const i = ins.find(x => x.id === c.referenciaId)
    return i ? pxkg(i) * c.kg : 0
  }
  const s = subs.find(x => x.id === c.referenciaId)
  return s ? costoPxKgSub(s, ins) * c.kg : 0
}
function costoPlato(p: Plato, ins: Insumo[], subs: Subproducto[]) {
  return p.componentes.reduce((a, c) => a + costoCompPlato(c, ins, subs), 0)
}

// ─── Delete icon ──────────────────────────────────────────────────────────────

const IconTrash = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
)

const IconChevron = ({ open }: { open: boolean }) => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
    className={`text-texto-sec transition-transform ${open ? 'rotate-180' : ''}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
)

// ─── Tab: Insumos ─────────────────────────────────────────────────────────────

function InsumosTab({ insumos, setInsumos, proveedores }: {
  insumos: Insumo[]; setInsumos: (v: Insumo[]) => void; proveedores: Proveedor[]
}) {
  const [search, setSearch] = useState('')
  const [modal, setModal]   = useState(false)
  const [nombre, setNombre] = useState(''); const [proveedor, setProveedor] = useState('')
  const [formato, setFormato] = useState(''); const [precio, setPrecio] = useState('')
  const [kg, setKg] = useState('')

  const reset = () => { setNombre(''); setProveedor(''); setFormato(''); setPrecio(''); setKg('') }
  const save = () => {
    if (!nombre || !formato || !precio || !kg) return
    setInsumos([...insumos, { id: `i${Date.now()}`, nombre, proveedor, formato, precioFormato: +precio, kgFormato: +kg }])
    setModal(false); reset()
  }
  const filtered = insumos.filter(i => i.nombre.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <div className="flex items-center justify-between mb-4 gap-3">
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Buscar insumo..."
          className="border border-borde rounded-sm px-3 py-1.5 text-sm w-56 focus:outline-none focus:border-azul-accion"
        />
        <Button size="sm" onClick={() => setModal(true)}>+ Agregar</Button>
      </div>

      <div className="rounded-lg border border-borde overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="bg-fondo-suave text-left">
              {['#','Nombre','Formato','$ / Formato','Kg','$ / kg','Proveedor',''].map(h => (
                <th key={h} className="px-3 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-borde">
            {filtered.map((ins, idx) => (
              <tr key={ins.id} className="hover:bg-fondo-suave/40">
                <td className="px-3 py-2.5 text-texto-sec">{idx + 1}</td>
                <td className="px-3 py-2.5 font-medium text-carbon">{ins.nombre}</td>
                <td className="px-3 py-2.5 text-texto-sec">{ins.formato}</td>
                <td className="px-3 py-2.5 text-carbon">{fmt(ins.precioFormato)}</td>
                <td className="px-3 py-2.5 text-carbon">{ins.kgFormato}</td>
                <td className="px-3 py-2.5 font-semibold text-azul-nucleo">{fmt(pxkg(ins))}</td>
                <td className="px-3 py-2.5 text-texto-sec">{ins.proveedor}</td>
                <td className="px-3 py-2.5">
                  <button onClick={() => setInsumos(insumos.filter(i => i.id !== ins.id))}
                    className="p-1 rounded text-texto-sec hover:text-error hover:bg-error-container transition-colors">
                    <IconTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modal} onClose={() => { setModal(false); reset() }} title="Nuevo insumo">
        <div className="flex flex-col gap-3">
          <Input label="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="ej: Harina 000" />
          <Select label="Proveedor" value={proveedor} onChange={e => setProveedor(e.target.value)}>
            <option value="">Seleccionar proveedor</option>
            {proveedores.map(p => <option key={p.id} value={p.nombre}>{p.nombre}</option>)}
          </Select>
          <Input label="Formato" value={formato} onChange={e => setFormato(e.target.value)} placeholder="ej: Bolsa 25kg" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="$ por formato" type="number" value={precio} onChange={e => setPrecio(e.target.value)} placeholder="18500" />
            <Input label="Kg por formato" type="number" value={kg} onChange={e => setKg(e.target.value)} placeholder="25" />
          </div>
          <div className="flex gap-2 justify-end pt-1">
            <Button variant="ghost" size="sm" onClick={() => { setModal(false); reset() }}>Cancelar</Button>
            <Button size="sm" onClick={save}>Guardar</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

// ─── Tab: Subproductos ────────────────────────────────────────────────────────

function SubproductosTab({ subs, setSubs, insumos }: {
  subs: Subproducto[]; setSubs: (v: Subproducto[]) => void; insumos: Insumo[]
}) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [modalNew, setModalNew] = useState(false)
  const [modalComp, setModalComp] = useState<string | null>(null)
  const [nombre, setNombre] = useState('')
  const [compInsumoId, setCompInsumoId] = useState(''); const [compKgNeto, setCompKgNeto] = useState(''); const [compMerma, setCompMerma] = useState('0')

  const saveSub = () => {
    if (!nombre) return
    setSubs([...subs, { id: `s${Date.now()}`, nombre, componentes: [] }])
    setModalNew(false); setNombre('')
  }
  const saveComp = (subId: string) => {
    if (!compInsumoId || !compKgNeto) return
    setSubs(subs.map(s => s.id === subId
      ? { ...s, componentes: [...s.componentes, { insumoId: compInsumoId, kgNeto: +compKgNeto, merma: +compMerma }] }
      : s))
    setModalComp(null); setCompInsumoId(''); setCompKgNeto(''); setCompMerma('0')
  }
  const removeComp = (subId: string, insId: string) =>
    setSubs(subs.map(s => s.id === subId ? { ...s, componentes: s.componentes.filter(c => c.insumoId !== insId) } : s))

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-texto-sec">{subs.length} subproductos configurados</p>
        <Button size="sm" onClick={() => setModalNew(true)}>+ Nuevo</Button>
      </div>

      <div className="space-y-3">
        {subs.map(sub => {
          const costo = costoSub(sub, insumos)
          const open = expanded === sub.id
          return (
            <div key={sub.id} className="rounded-lg border border-borde overflow-hidden">
              <button onClick={() => setExpanded(open ? null : sub.id)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-fondo-suave/40 transition-colors text-left">
                <span className="text-sm font-semibold text-carbon">{sub.nombre}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-azul-nucleo">{fmt(costo)}</span>
                  <IconChevron open={open} />
                </div>
              </button>

              {open && (
                <div className="border-t border-borde bg-fondo-suave">
                  {sub.componentes.length > 0 && (
                    <table className="w-full text-xs mb-2">
                      <thead>
                        <tr>
                          {['Insumo','Kg neto','% Merma','Costo',''].map(h => (
                            <th key={h} className="px-4 py-2 text-left font-semibold text-texto-sec uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-borde/50">
                        {sub.componentes.map(comp => {
                          const ins = insumos.find(i => i.id === comp.insumoId)
                          return (
                            <tr key={comp.insumoId}>
                              <td className="px-4 py-2 text-carbon">{ins?.nombre ?? '—'}</td>
                              <td className="px-4 py-2 text-texto-sec">{comp.kgNeto} kg</td>
                              <td className="px-4 py-2 text-texto-sec">{comp.merma}%</td>
                              <td className="px-4 py-2 font-medium text-carbon">{fmt(costoCompSub(comp, insumos))}</td>
                              <td className="px-4 py-2">
                                <button onClick={() => removeComp(sub.id, comp.insumoId)}
                                  className="p-0.5 rounded text-texto-sec hover:text-error transition-colors">
                                  <IconTrash />
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                      <tfoot>
                        <tr className="border-t border-borde">
                          <td colSpan={3} className="px-4 py-2 text-right font-bold text-xs text-carbon uppercase tracking-wide">Total</td>
                          <td className="px-4 py-2 font-extrabold text-azul-nucleo">{fmt(costo)}</td>
                          <td />
                        </tr>
                      </tfoot>
                    </table>
                  )}
                  <div className="px-4 pb-3">
                    <button onClick={() => setModalComp(sub.id)}
                      className="text-xs font-semibold text-azul-nucleo hover:text-azul-accion flex items-center gap-1">
                      + Agregar componente
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <Modal open={modalNew} onClose={() => setModalNew(false)} title="Nuevo subproducto">
        <div className="flex flex-col gap-3">
          <Input label="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="ej: Salsa de tomate" />
          <div className="flex gap-2 justify-end pt-1">
            <Button variant="ghost" size="sm" onClick={() => setModalNew(false)}>Cancelar</Button>
            <Button size="sm" onClick={saveSub}>Crear</Button>
          </div>
        </div>
      </Modal>

      {modalComp && (
        <Modal open={!!modalComp} onClose={() => setModalComp(null)} title="Agregar componente">
          <div className="flex flex-col gap-3">
            <Select label="Insumo" value={compInsumoId} onChange={e => setCompInsumoId(e.target.value)}>
              <option value="">Seleccionar insumo</option>
              {insumos.map(i => <option key={i.id} value={i.id}>{i.nombre}</option>)}
            </Select>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Kg neto" type="number" value={compKgNeto} onChange={e => setCompKgNeto(e.target.value)} placeholder="0.5" />
              <Input label="% Merma" type="number" value={compMerma} onChange={e => setCompMerma(e.target.value)} placeholder="10" />
            </div>
            <div className="flex gap-2 justify-end pt-1">
              <Button variant="ghost" size="sm" onClick={() => setModalComp(null)}>Cancelar</Button>
              <Button size="sm" onClick={() => saveComp(modalComp)}>Agregar</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

// ─── Tab: Platos ──────────────────────────────────────────────────────────────

function PlatosTab({ platos, setPlatos, insumos, subs }: {
  platos: Plato[]; setPlatos: (v: Plato[]) => void; insumos: Insumo[]; subs: Subproducto[]
}) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [modalNew, setModalNew] = useState(false)
  const [modalComp, setModalComp] = useState<string | null>(null)
  const [nombre, setNombre] = useState('')
  const [compTipo, setCompTipo] = useState<'insumo' | 'subproducto'>('insumo')
  const [compRefId, setCompRefId] = useState(''); const [compKg, setCompKg] = useState('')

  const savePlato = () => {
    if (!nombre) return
    setPlatos([...platos, { id: `p${Date.now()}`, nombre, componentes: [] }])
    setModalNew(false); setNombre('')
  }
  const saveComp = (platoId: string) => {
    if (!compRefId || !compKg) return
    setPlatos(platos.map(p => p.id === platoId
      ? { ...p, componentes: [...p.componentes, { tipo: compTipo, referenciaId: compRefId, kg: +compKg }] }
      : p))
    setModalComp(null); setCompTipo('insumo'); setCompRefId(''); setCompKg('')
  }
  const removeComp = (platoId: string, idx: number) =>
    setPlatos(platos.map(p => p.id === platoId ? { ...p, componentes: p.componentes.filter((_, i) => i !== idx) } : p))

  const getNombre = (tipo: 'insumo' | 'subproducto', id: string) =>
    tipo === 'insumo' ? insumos.find(i => i.id === id)?.nombre : subs.find(s => s.id === id)?.nombre

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-texto-sec">{platos.length} platos configurados</p>
        <Button size="sm" onClick={() => setModalNew(true)}>+ Nuevo</Button>
      </div>

      <div className="space-y-3">
        {platos.map(plato => {
          const costo = costoPlato(plato, insumos, subs)
          const open = expanded === plato.id
          return (
            <div key={plato.id} className="rounded-lg border border-borde overflow-hidden">
              <button onClick={() => setExpanded(open ? null : plato.id)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-fondo-suave/40 transition-colors text-left">
                <span className="text-sm font-semibold text-carbon">{plato.nombre}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-azul-nucleo">{fmt(costo)}</span>
                  <IconChevron open={open} />
                </div>
              </button>

              {open && (
                <div className="border-t border-borde bg-fondo-suave">
                  {plato.componentes.length > 0 && (
                    <table className="w-full text-xs mb-2">
                      <thead>
                        <tr>
                          {['Componente','Tipo','Kg','Costo',''].map(h => (
                            <th key={h} className="px-4 py-2 text-left font-semibold text-texto-sec uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-borde/50">
                        {plato.componentes.map((comp, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-2 text-carbon">{getNombre(comp.tipo, comp.referenciaId) ?? '—'}</td>
                            <td className="px-4 py-2">
                              <span className={`px-1.5 py-0.5 rounded-xs text-[10px] font-semibold ${
                                comp.tipo === 'subproducto' ? 'bg-tinte-interfaz text-azul-nucleo' : 'bg-fondo-suave text-texto-sec'
                              }`}>
                                {comp.tipo === 'subproducto' ? 'SUB' : 'INS'}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-texto-sec">{comp.kg} kg</td>
                            <td className="px-4 py-2 font-medium text-carbon">{fmt(costoCompPlato(comp, insumos, subs))}</td>
                            <td className="px-4 py-2">
                              <button onClick={() => removeComp(plato.id, idx)}
                                className="p-0.5 rounded text-texto-sec hover:text-error transition-colors">
                                <IconTrash />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t border-borde">
                          <td colSpan={3} className="px-4 py-2 text-right font-bold text-xs text-carbon uppercase tracking-wide">Costo total</td>
                          <td className="px-4 py-2 font-extrabold text-azul-nucleo">{fmt(costo)}</td>
                          <td />
                        </tr>
                      </tfoot>
                    </table>
                  )}
                  <div className="px-4 pb-3">
                    <button onClick={() => setModalComp(plato.id)}
                      className="text-xs font-semibold text-azul-nucleo hover:text-azul-accion flex items-center gap-1">
                      + Agregar componente
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <Modal open={modalNew} onClose={() => setModalNew(false)} title="Nuevo plato">
        <div className="flex flex-col gap-3">
          <Input label="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="ej: Pizza Margherita" />
          <div className="flex gap-2 justify-end pt-1">
            <Button variant="ghost" size="sm" onClick={() => setModalNew(false)}>Cancelar</Button>
            <Button size="sm" onClick={savePlato}>Crear</Button>
          </div>
        </div>
      </Modal>

      {modalComp && (
        <Modal open={!!modalComp} onClose={() => setModalComp(null)} title="Agregar componente">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-xs font-semibold text-texto-sec uppercase tracking-wide mb-1.5">Tipo</p>
              <div className="flex gap-2">
                {(['insumo', 'subproducto'] as const).map(t => (
                  <button key={t} onClick={() => { setCompTipo(t); setCompRefId('') }}
                    className={`px-3 py-1.5 rounded-sm text-sm font-semibold transition-all ${
                      compTipo === t ? 'bg-azul-nucleo text-white' : 'bg-fondo-suave text-texto-sec hover:bg-borde/60'
                    }`}>
                    {t === 'insumo' ? 'Insumo' : 'Subproducto'}
                  </button>
                ))}
              </div>
            </div>
            <Select label={compTipo === 'insumo' ? 'Insumo' : 'Subproducto'} value={compRefId} onChange={e => setCompRefId(e.target.value)}>
              <option value="">Seleccionar</option>
              {compTipo === 'insumo'
                ? insumos.map(i => <option key={i.id} value={i.id}>{i.nombre}</option>)
                : subs.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)
              }
            </Select>
            <Input label="Kg a usar" type="number" value={compKg} onChange={e => setCompKg(e.target.value)} placeholder="0.3" />
            <div className="flex gap-2 justify-end pt-1">
              <Button variant="ghost" size="sm" onClick={() => setModalComp(null)}>Cancelar</Button>
              <Button size="sm" onClick={() => saveComp(modalComp)}>Agregar</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

// ─── Tab: Proveedores ─────────────────────────────────────────────────────────

function ProveedoresTab({ proveedores, setProveedores }: {
  proveedores: Proveedor[]; setProveedores: (v: Proveedor[]) => void
}) {
  const [modal, setModal] = useState(false)
  const [rubro, setRubro] = useState(''); const [nombre, setNombre] = useState('')
  const [contacto, setContacto] = useState(''); const [tel, setTel] = useState('')

  const reset = () => { setRubro(''); setNombre(''); setContacto(''); setTel('') }
  const save = () => {
    if (!nombre) return
    setProveedores([...proveedores, { id: `pv${Date.now()}`, rubro, nombre, contacto: contacto || '—', telefono: tel || '—' }])
    setModal(false); reset()
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-texto-sec">{proveedores.length} proveedores registrados</p>
        <Button size="sm" onClick={() => setModal(true)}>+ Agregar</Button>
      </div>

      <div className="rounded-lg border border-borde overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-fondo-suave text-left">
              {['#','Rubro','Nombre','Contacto','Teléfono',''].map(h => (
                <th key={h} className="px-3 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-borde">
            {proveedores.map((pv, idx) => (
              <tr key={pv.id} className="hover:bg-fondo-suave/40">
                <td className="px-3 py-2.5 text-texto-sec">{idx + 1}</td>
                <td className="px-3 py-2.5 text-texto-sec">{pv.rubro}</td>
                <td className="px-3 py-2.5 font-medium text-carbon">{pv.nombre}</td>
                <td className="px-3 py-2.5 text-texto-sec">{pv.contacto}</td>
                <td className="px-3 py-2.5 text-texto-sec">{pv.telefono}</td>
                <td className="px-3 py-2.5">
                  <button onClick={() => setProveedores(proveedores.filter(p => p.id !== pv.id))}
                    className="p-1 rounded text-texto-sec hover:text-error hover:bg-error-container transition-colors">
                    <IconTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modal} onClose={() => { setModal(false); reset() }} title="Nuevo proveedor">
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="ej: Molinera Sur" />
            <Input label="Rubro" value={rubro} onChange={e => setRubro(e.target.value)} placeholder="ej: Harinas" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Contacto" value={contacto} onChange={e => setContacto(e.target.value)} placeholder="ej: Juan P." />
            <Input label="Teléfono" value={tel} onChange={e => setTel(e.target.value)} placeholder="11-0000-0000" />
          </div>
          <div className="flex gap-2 justify-end pt-1">
            <Button variant="ghost" size="sm" onClick={() => { setModal(false); reset() }}>Cancelar</Button>
            <Button size="sm" onClick={save}>Guardar</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

// ─── Main panel (4 tabs) ──────────────────────────────────────────────────────

type Tab = 'insumos' | 'subproductos' | 'platos' | 'proveedores'
const TABS: { id: Tab; label: string }[] = [
  { id: 'insumos',      label: 'Insumos'      },
  { id: 'subproductos', label: 'Subproductos' },
  { id: 'platos',       label: 'Platos'       },
  { id: 'proveedores',  label: 'Proveedores'  },
]

function MainPanel({ onBack }: { onBack: () => void }) {
  const [tab, setTab]         = useState<Tab>('insumos')
  const [insumos, setInsumos] = useState(initInsumos)
  const [subs, setSubs]       = useState(initSubproductos)
  const [platos, setPlatos]   = useState(initPlatos)
  const [provs, setProvs]     = useState(initProveedores)

  return (
    <div className="flex flex-col min-h-[480px]">
      {/* Header */}
      <div style={{ backgroundColor: '#1B5BC1' }} className="flex items-center justify-between px-5 py-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="font-extrabold text-lg text-white leading-none">
            <span style={{ color: '#56BCFA' }}>d</span>ataria
          </span>
          <span className="text-white/40 text-sm">·</span>
          <span className="text-white/75 text-sm">Gastronomía · Food cost</span>
        </div>
        <button onClick={onBack}
          className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Inicio
        </button>
      </div>

      {/* Tabs */}
      <div style={{ backgroundColor: '#1B5BC1' }} className="flex shrink-0">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-5 py-2.5 text-sm font-semibold transition-all border-b-2 -mb-px ${
              tab === t.id ? 'text-white border-white' : 'text-white/45 border-transparent hover:text-white/70'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 bg-white overflow-auto p-5">
        {tab === 'insumos'      && <InsumosTab insumos={insumos} setInsumos={setInsumos} proveedores={provs} />}
        {tab === 'subproductos' && <SubproductosTab subs={subs} setSubs={setSubs} insumos={insumos} />}
        {tab === 'platos'       && <PlatosTab platos={platos} setPlatos={setPlatos} insumos={insumos} subs={subs} />}
        {tab === 'proveedores'  && <ProveedoresTab proveedores={provs} setProveedores={setProvs} />}
      </div>
    </div>
  )
}

// ─── Splash ───────────────────────────────────────────────────────────────────

function Splash({ onBack, onEnter }: { onBack: () => void; onEnter: () => void }) {
  return (
    <div
      className="min-h-[480px] flex flex-col"
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
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl font-extrabold"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
          d
        </div>
        <div className="text-center">
          <p className="text-2xl font-extrabold text-white mb-1.5">
            <span style={{ color: '#56BCFA' }}>d</span>ataria
          </p>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Gastronomía · Food cost
          </p>
        </div>
        <button onClick={onEnter}
          className="px-8 py-3 bg-white text-azul-nucleo font-bold text-sm rounded-sm hover:bg-white/90 transition-colors shadow-soft">
          Ver herramienta
        </button>
      </div>
    </div>
  )
}

// ─── Root export ──────────────────────────────────────────────────────────────

export default function FoodCostDemo({ onBack }: { onBack: () => void }) {
  const [screen, setScreen] = useState<'splash' | 'main'>('splash')
  if (screen === 'splash') return <Splash onBack={onBack} onEnter={() => setScreen('main')} />
  return <MainPanel onBack={() => setScreen('splash')} />
}
