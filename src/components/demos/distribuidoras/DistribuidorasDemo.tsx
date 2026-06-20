'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import {
  clientesIniciales, vehiculosIniciales, empleadosIniciales, precioNaftaInicial,
  ClienteDist, Vehiculo, EmpleadoDist,
} from '@/data/distribuidoras'

const RouteMap = dynamic(() => import('./RouteMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-80 bg-fondo-suave rounded-lg border border-borde">
      <span className="text-sm text-texto-sec">Cargando mapa…</span>
    </div>
  ),
})

const fmt = (n: number) => n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 })

// Haversine distance in km
function dist(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// ─── Clientes panel ───────────────────────────────────────────────────────────
function ClientesPanel({ clientes, onUpdate }: { clientes: ClienteDist[]; onUpdate: (c: ClienteDist[]) => void }) {
  const [modal, setModal] = useState(false)
  const [form, setForm]   = useState({ nombre: '', contacto: '', direccion: '', lat: '', lng: '' })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const save = () => {
    if (!form.nombre) return
    onUpdate([...clientes, {
      id: `c${Date.now()}`,
      nombre: form.nombre,
      contacto: form.contacto,
      direccion: form.direccion,
      lat: Number(form.lat) || -31.42,
      lng: Number(form.lng) || -64.19,
    }])
    setForm({ nombre: '', contacto: '', direccion: '', lat: '', lng: '' })
    setModal(false)
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-carbon">Panel de clientes</p>
          <p className="text-xs text-texto-sec">{clientes.length} clientes registrados</p>
        </div>
        <Button size="sm" onClick={() => setModal(true)}>+ Nuevo cliente</Button>
      </div>
      <div className="rounded-lg border border-borde overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-fondo-suave text-left">
              <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide">Nombre</th>
              <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide hidden md:table-cell">Contacto</th>
              <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide hidden lg:table-cell">Dirección</th>
              <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide text-right">Coords</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borde">
            {clientes.map((c) => (
              <tr key={c.id} className="hover:bg-fondo-suave/50">
                <td className="px-4 py-3 font-medium text-carbon">{c.nombre}</td>
                <td className="px-4 py-3 text-texto-sec hidden md:table-cell">{c.contacto}</td>
                <td className="px-4 py-3 text-texto-sec text-xs hidden lg:table-cell">{c.direccion}</td>
                <td className="px-4 py-3 text-right text-xs text-texto-sec font-mono">{c.lat.toFixed(3)}, {c.lng.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={modal} onClose={() => setModal(false)} title="Nuevo cliente">
        <div className="flex flex-col gap-3">
          <Input label="Nombre" value={form.nombre} onChange={set('nombre')} placeholder="Supermercado ..." />
          <Input label="Contacto" value={form.contacto} onChange={set('contacto')} placeholder="351-555-0000" />
          <Input label="Dirección" value={form.direccion} onChange={set('direccion')} placeholder="Av. Colón 1200, Córdoba" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Latitud" type="number" value={form.lat} onChange={set('lat')} placeholder="-31.42" />
            <Input label="Longitud" type="number" value={form.lng} onChange={set('lng')} placeholder="-64.19" />
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

// ─── Costos panel ─────────────────────────────────────────────────────────────
function CostosPanel({
  vehiculos, empleados, precioNafta,
  onUpdateVehiculos, onUpdateEmpleados, onUpdateNafta,
}: {
  vehiculos: Vehiculo[]
  empleados: EmpleadoDist[]
  precioNafta: number
  onUpdateVehiculos: (v: Vehiculo[]) => void
  onUpdateEmpleados: (e: EmpleadoDist[]) => void
  onUpdateNafta: (p: number) => void
}) {
  const [addVModal, setAddVModal] = useState(false)
  const [addEModal, setAddEModal] = useState(false)
  const [vForm, setVForm] = useState({ nombre: '', consumo: '' })
  const [eForm, setEForm] = useState({ nombre: '', sueldo: '' })

  return (
    <div className="space-y-8">
      {/* Precio nafta */}
      <div className="bg-fondo-suave rounded-lg border border-borde p-5">
        <p className="text-sm font-semibold text-carbon mb-3">Precio de combustible</p>
        <div className="flex items-end gap-3">
          <Input
            label="Precio litro nafta (ARS)"
            type="number"
            value={precioNafta}
            onChange={(e) => onUpdateNafta(Number(e.target.value))}
            className="w-48"
          />
          <p className="text-xs text-texto-sec mb-2 leading-relaxed">
            Este valor recalcula el costo de combustible de todos los vehículos en vivo.
          </p>
        </div>
      </div>

      {/* Vehiculos */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-carbon">Vehículos</p>
          <Button size="sm" onClick={() => setAddVModal(true)}>+ Agregar</Button>
        </div>
        <div className="rounded-lg border border-borde overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-fondo-suave text-left">
                <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide">Vehículo</th>
                <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide text-right">Consumo (L/100km)</th>
                <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide text-right">Costo/km (nafta actual)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borde">
              {vehiculos.map((v) => (
                <tr key={v.id} className="hover:bg-fondo-suave/50">
                  <td className="px-4 py-3 font-medium text-carbon">{v.nombre}</td>
                  <td className="px-4 py-3 text-right text-carbon">{v.consumoPor100km} L/100km</td>
                  <td className="px-4 py-3 text-right font-bold text-azul-nucleo">
                    {fmt((precioNafta * v.consumoPor100km) / 100)}/km
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empleados */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-carbon">Empleados</p>
          <Button size="sm" onClick={() => setAddEModal(true)}>+ Agregar</Button>
        </div>
        <div className="rounded-lg border border-borde overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-fondo-suave text-left">
                <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide">Empleado</th>
                <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide text-right">Sueldo mensual</th>
                <th className="px-4 py-2.5 text-xs font-semibold text-texto-sec uppercase tracking-wide text-right">Costo/hora (220hs)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borde">
              {empleados.map((e) => (
                <tr key={e.id} className="hover:bg-fondo-suave/50">
                  <td className="px-4 py-3 font-medium text-carbon">{e.nombre}</td>
                  <td className="px-4 py-3 text-right text-carbon">{fmt(e.sueldoMensual)}</td>
                  <td className="px-4 py-3 text-right font-bold text-azul-nucleo">{fmt(e.sueldoMensual / 220)}/hs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={addVModal} onClose={() => setAddVModal(false)} title="Nuevo vehículo">
        <div className="flex flex-col gap-3">
          <Input label="Nombre" value={vForm.nombre} onChange={(e) => setVForm((f) => ({ ...f, nombre: e.target.value }))} placeholder="Ford Transit 2020" />
          <Input label="Consumo (L/100km)" type="number" value={vForm.consumo} onChange={(e) => setVForm((f) => ({ ...f, consumo: e.target.value }))} placeholder="10.5" />
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" size="sm" onClick={() => setAddVModal(false)}>Cancelar</Button>
            <Button size="sm" onClick={() => {
              if (!vForm.nombre) return
              onUpdateVehiculos([...vehiculos, { id: `v${Date.now()}`, nombre: vForm.nombre, consumoPor100km: Number(vForm.consumo) }])
              setVForm({ nombre: '', consumo: '' }); setAddVModal(false)
            }}>Guardar</Button>
          </div>
        </div>
      </Modal>

      <Modal open={addEModal} onClose={() => setAddEModal(false)} title="Nuevo empleado">
        <div className="flex flex-col gap-3">
          <Input label="Nombre" value={eForm.nombre} onChange={(e) => setEForm((f) => ({ ...f, nombre: e.target.value }))} placeholder="Juan Pérez" />
          <Input label="Sueldo mensual (ARS)" type="number" value={eForm.sueldo} onChange={(e) => setEForm((f) => ({ ...f, sueldo: e.target.value }))} placeholder="380000" />
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" size="sm" onClick={() => setAddEModal(false)}>Cancelar</Button>
            <Button size="sm" onClick={() => {
              if (!eForm.nombre) return
              onUpdateEmpleados([...empleados, { id: `e${Date.now()}`, nombre: eForm.nombre, sueldoMensual: Number(eForm.sueldo) }])
              setEForm({ nombre: '', sueldo: '' }); setAddEModal(false)
            }}>Guardar</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

// ─── Rutas panel ──────────────────────────────────────────────────────────────
function RutasPanel({ clientes, vehiculos, empleados, precioNafta }: {
  clientes: ClienteDist[]
  vehiculos: Vehiculo[]
  empleados: EmpleadoDist[]
  precioNafta: number
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [vehiculoId, setVehiculoId]   = useState(vehiculos[0]?.id ?? '')
  const [empleadoId, setEmpleadoId]   = useState(empleados[0]?.id ?? '')
  const [horasEst, setHorasEst]       = useState(3)

  const toggleCliente = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )

  const { distanciaKm, costoCombustible, costoEmpleado, costoTotal } = useMemo(() => {
    const points = selectedIds.map((id) => clientes.find((c) => c.id === id)).filter(Boolean) as ClienteDist[]
    let km = 0
    for (let i = 0; i < points.length - 1; i++) {
      km += dist(points[i].lat, points[i].lng, points[i + 1].lat, points[i + 1].lng)
    }
    const veh = vehiculos.find((v) => v.id === vehiculoId)
    const emp = empleados.find((e) => e.id === empleadoId)
    const comb = veh ? (precioNafta * veh.consumoPor100km * km) / 100 : 0
    const empl = emp ? (emp.sueldoMensual / 220) * horasEst : 0
    return {
      distanciaKm: km,
      costoCombustible: comb,
      costoEmpleado: empl,
      costoTotal: comb + empl,
    }
  }, [selectedIds, vehiculoId, empleadoId, horasEst, clientes, vehiculos, empleados, precioNafta])

  return (
    <div className="space-y-5">
      <div className="grid lg:grid-cols-5 gap-5">
        {/* Left: config */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <p className="text-xs font-semibold text-texto-sec uppercase tracking-wide mb-2">
              Clientes a visitar ({selectedIds.length} seleccionados)
            </p>
            <div className="rounded-lg border border-borde divide-y divide-borde overflow-hidden max-h-64 overflow-y-auto">
              {clientes.map((c, idx) => (
                <label key={c.id} className="flex items-center gap-3 px-4 py-3 hover:bg-fondo-suave/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(c.id)}
                    onChange={() => toggleCliente(c.id)}
                    className="w-4 h-4 rounded accent-azul-nucleo"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-carbon truncate">{c.nombre}</p>
                    <p className="text-xs text-texto-sec truncate">{c.direccion}</p>
                  </div>
                  {selectedIds.includes(c.id) && (
                    <span className="shrink-0 w-5 h-5 rounded-full bg-azul-nucleo text-white text-xs font-bold flex items-center justify-center">
                      {selectedIds.indexOf(c.id) + 1}
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-semibold text-texto-sec uppercase tracking-wide mb-1.5">Vehículo</p>
              <select
                value={vehiculoId}
                onChange={(e) => setVehiculoId(e.target.value)}
                className="w-full h-10 px-3 rounded-sm border border-borde text-sm text-carbon bg-white focus:outline-none focus:border-azul-accion"
              >
                {vehiculos.map((v) => <option key={v.id} value={v.id}>{v.nombre}</option>)}
              </select>
            </div>
            <div>
              <p className="text-xs font-semibold text-texto-sec uppercase tracking-wide mb-1.5">Empleado</p>
              <select
                value={empleadoId}
                onChange={(e) => setEmpleadoId(e.target.value)}
                className="w-full h-10 px-3 rounded-sm border border-borde text-sm text-carbon bg-white focus:outline-none focus:border-azul-accion"
              >
                {empleados.map((e) => <option key={e.id} value={e.id}>{e.nombre}</option>)}
              </select>
            </div>
          </div>

          <Input
            label="Horas estimadas de ruta"
            type="number"
            value={horasEst}
            onChange={(e) => setHorasEst(Number(e.target.value))}
          />

          {/* Cost summary */}
          <div className={`rounded-lg border p-4 transition-all duration-240 ${
            selectedIds.length > 0 ? 'bg-tinte-interfaz border-azul-nucleo/20' : 'bg-fondo-suave border-borde opacity-50'
          }`}>
            <p className="text-xs font-bold uppercase tracking-wide text-azul-nucleo mb-3">Costo estimado del viaje</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-texto-sec">Distancia recorrida</span>
                <span className="font-semibold text-carbon">{distanciaKm.toFixed(1)} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-texto-sec">Combustible</span>
                <span className="font-semibold text-carbon">{fmt(costoCombustible)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-texto-sec">Empleado ({horasEst}hs)</span>
                <span className="font-semibold text-carbon">{fmt(costoEmpleado)}</span>
              </div>
              <div className="border-t border-azul-nucleo/20 pt-2 flex justify-between font-bold">
                <span className="text-carbon">Total viaje</span>
                <span className="text-azul-nucleo text-base">{fmt(costoTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: map */}
        <div className="lg:col-span-3 rounded-lg overflow-hidden border border-borde" style={{ minHeight: 380 }}>
          <RouteMap allClients={clientes} selectedIds={selectedIds} />
        </div>
      </div>

      {selectedIds.length === 0 && (
        <p className="text-sm text-texto-sec text-center py-3">
          Seleccioná clientes de la lista para trazar la ruta y calcular el costo.
        </p>
      )}
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function DistribuidorasDemo() {
  const [tab, setTab]               = useState<'clientes' | 'rutas' | 'costos'>('rutas')
  const [clientes, setClientes]     = useState(clientesIniciales)
  const [vehiculos, setVehiculos]   = useState(vehiculosIniciales)
  const [empleados, setEmpleados]   = useState(empleadosIniciales)
  const [precioNafta, setNafta]     = useState(precioNaftaInicial)

  return (
    <div className="space-y-5">
      <div className="flex gap-1 bg-fondo-suave rounded-sm p-1 w-fit">
        {(['rutas', 'clientes', 'costos'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xs text-sm font-semibold capitalize transition-all duration-160 ${
              tab === t ? 'bg-white text-azul-nucleo shadow-card' : 'text-texto-sec hover:text-carbon'
            }`}
          >
            {t === 'rutas' ? 'Planificar ruta' : t === 'clientes' ? 'Clientes' : 'Costos'}
          </button>
        ))}
      </div>

      <div className="animate-fade-in" key={tab}>
        {tab === 'rutas' && (
          <RutasPanel clientes={clientes} vehiculos={vehiculos} empleados={empleados} precioNafta={precioNafta} />
        )}
        {tab === 'clientes' && (
          <ClientesPanel clientes={clientes} onUpdate={setClientes} />
        )}
        {tab === 'costos' && (
          <CostosPanel
            vehiculos={vehiculos}
            empleados={empleados}
            precioNafta={precioNafta}
            onUpdateVehiculos={setVehiculos}
            onUpdateEmpleados={setEmpleados}
            onUpdateNafta={setNafta}
          />
        )}
      </div>
    </div>
  )
}
