'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Empleado { id: string; nombre: string; sueldoHora: number }
interface Vehiculo { id: string; nombre: string; consumo: number }
interface Cliente  { id: number; nombre: string; direccion: string; lat: number; lng: number }
interface RutaLog  {
  id: number; fecha: string
  empleadoNombre: string; vehiculoNombre: string
  clientesNombres: string[]
  distanciaKm: number; costoCombustible: number; costoEmpleado: number; costoTotal: number
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CLIENTES: Cliente[] = [
  { id: 1, nombre: 'Supermercado Don Juan',   direccion: 'Av. Corrientes 2500', lat: -34.604, lng: -58.413 },
  { id: 2, nombre: 'Almacén El Bueno',         direccion: 'Av. Santa Fe 3800',   lat: -34.588, lng: -58.426 },
  { id: 3, nombre: 'Distribuidora Pacífico',   direccion: 'Av. Cabildo 1200',    lat: -34.572, lng: -58.446 },
  { id: 4, nombre: 'Restaurant La Buena Mesa', direccion: 'Av. Las Heras 2100',  lat: -34.581, lng: -58.403 },
  { id: 5, nombre: 'Hotel Central',            direccion: 'Av. Callao 900',      lat: -34.598, lng: -58.393 },
  { id: 6, nombre: 'Cafetería El Sol',         direccion: 'Av. Rivadavia 5400',  lat: -34.617, lng: -58.455 },
]

const DEPOSITO = { lat: -34.620, lng: -58.430 }

const initEmpleados: Empleado[] = [
  { id: 'e1', nombre: 'Roberto F.',  sueldoHora: 950 },
  { id: 'e2', nombre: 'Diego M.',    sueldoHora: 880 },
  { id: 'e3', nombre: 'Patricia L.', sueldoHora: 920 },
]

const initVehiculos: Vehiculo[] = [
  { id: 'v1', nombre: 'Fiat Fiorino',   consumo: 10.5 },
  { id: 'v2', nombre: 'Renault Master', consumo: 13.0 },
  { id: 'v3', nombre: 'VW Amarok',      consumo: 11.5 },
]

function buildInitHistorial(): RutaLog[] {
  const fmtDate = (d: Date) =>
    d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const now = new Date()
  const d2 = new Date(now); d2.setDate(d2.getDate() - 2)
  const d1 = new Date(now); d1.setDate(d1.getDate() - 1)
  return [
    {
      id: 1, fecha: fmtDate(d2),
      empleadoNombre: 'Roberto F.', vehiculoNombre: 'Fiat Fiorino',
      clientesNombres: ['Don Juan', 'El Bueno', 'Pacífico'],
      distanciaKm: 18.4, costoCombustible: 2415, costoEmpleado: 5510, costoTotal: 7925,
    },
    {
      id: 2, fecha: fmtDate(d1),
      empleadoNombre: 'Diego M.', vehiculoNombre: 'Renault Master',
      clientesNombres: ['La Buena Mesa', 'Hotel Central'],
      distanciaKm: 12.1, costoCombustible: 1970, costoEmpleado: 4224, costoTotal: 6194,
    },
  ]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 })

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.asin(Math.sqrt(a))
}

function calcRuta(ids: number[], veh?: Vehiculo, emp?: Empleado, precio = 0) {
  const puntos = ids.map(id => CLIENTES.find(c => c.id === id)!).filter(Boolean)
  let km = 0
  if (puntos.length > 0) {
    km += haversineKm(DEPOSITO.lat, DEPOSITO.lng, puntos[0].lat, puntos[0].lng)
    for (let i = 0; i < puntos.length - 1; i++)
      km += haversineKm(puntos[i].lat, puntos[i].lng, puntos[i + 1].lat, puntos[i + 1].lng)
    km += haversineKm(puntos[puntos.length - 1].lat, puntos[puntos.length - 1].lng, DEPOSITO.lat, DEPOSITO.lng)
  }
  const liters    = (km / 100) * (veh?.consumo ?? 0)
  const costoComb = liters * precio
  const tiempoH   = km / 30
  const costoEmp  = tiempoH * (emp?.sueldoHora ?? 0)
  return { km, liters, costoComb, tiempoH, costoEmp, total: costoComb + costoEmp }
}

// ─── Trash icon ───────────────────────────────────────────────────────────────

const IcoTrash = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
)

// ─── Mini modal helper ────────────────────────────────────────────────────────

function MiniModal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-[320px]">
        <p className="text-sm font-bold text-carbon mb-4">{title}</p>
        {children}
      </div>
    </div>
  )
}

// ─── Map component ────────────────────────────────────────────────────────────

function MapaRutas({ selectedIds }: { selectedIds: number[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef       = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return
    mapRef.current = L.map(containerRef.current, {
      center: [-34.597, -58.424],
      zoom: 13,
      scrollWheelZoom: false,
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current)
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    map.eachLayer(layer => { if (!(layer instanceof L.TileLayer)) map.removeLayer(layer) })

    // Depot marker
    L.marker([DEPOSITO.lat, DEPOSITO.lng], {
      icon: L.divIcon({
        className: '',
        html: `<div style="width:14px;height:14px;background:#353C42;border-radius:3px;border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.35)"></div>`,
        iconSize: [14, 14], iconAnchor: [7, 7], popupAnchor: [0, -9],
      }),
    })
      .bindPopup('<b>Depósito</b><br><small style="color:#6b7280">Punto de partida / llegada</small>')
      .addTo(map)

    // Client markers
    CLIENTES.forEach(c => {
      const sel   = selectedIds.includes(c.id)
      const order = selectedIds.indexOf(c.id) + 1
      const icon  = sel
        ? L.divIcon({
            className: '',
            html: `<div style="width:26px;height:26px;background:#1B5BC1;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2.5px solid white;box-shadow:0 2px 8px rgba(27,91,193,0.45);display:flex;align-items:center;justify-content:center"><span style="transform:rotate(45deg);color:white;font-size:11px;font-weight:700;line-height:1">${order}</span></div>`,
            iconSize: [26, 26], iconAnchor: [13, 26], popupAnchor: [0, -28],
          })
        : L.divIcon({
            className: '',
            html: `<div style="width:10px;height:10px;background:#306ECF;border-radius:50%;border:2.5px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.25)"></div>`,
            iconSize: [10, 10], iconAnchor: [5, 5], popupAnchor: [0, -7],
          })

      L.marker([c.lat, c.lng], { icon })
        .bindPopup(`<b>${c.nombre}</b><br><small style="color:#6b7280">${c.direccion}</small>${sel ? `<br><small style="color:#1B5BC1;font-weight:600">Parada #${order}</small>` : ''}`)
        .addTo(map)
    })

    // Polyline depot → clients → depot
    if (selectedIds.length > 0) {
      const pts: [number, number][] = [
        [DEPOSITO.lat, DEPOSITO.lng],
        ...selectedIds.map(id => { const c = CLIENTES.find(x => x.id === id)!; return [c.lat, c.lng] as [number, number] }),
        [DEPOSITO.lat, DEPOSITO.lng],
      ]
      L.polyline(pts, { color: '#1B5BC1', weight: 2.5, opacity: 0.85 }).addTo(map)
    }
  }, [selectedIds])

  return <div ref={containerRef} style={{ height: '100%', width: '100%', minHeight: 290 }} />
}

// ─── Tab: Rutas ───────────────────────────────────────────────────────────────

function RutasTab({ empleados, vehiculos, precioCombustible, onConfirmar }: {
  empleados: Empleado[]
  vehiculos: Vehiculo[]
  precioCombustible: number
  onConfirmar: (log: Omit<RutaLog, 'id' | 'fecha'>) => void
}) {
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [vehiculoId, setVehiculoId]   = useState(vehiculos[0]?.id ?? '')
  const [empleadoId, setEmpleadoId]   = useState(empleados[0]?.id ?? '')

  const veh = vehiculos.find(v => v.id === vehiculoId)
  const emp = empleados.find(e => e.id === empleadoId)
  const { km, liters, costoComb, tiempoH, costoEmp, total } = calcRuta(selectedIds, veh, emp, precioCombustible)

  const toggle = (id: number) =>
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const confirmar = () => {
    if (!selectedIds.length || !veh || !emp) return
    onConfirmar({
      empleadoNombre:  emp.nombre,
      vehiculoNombre:  veh.nombre,
      clientesNombres: selectedIds.map(id => CLIENTES.find(x => x.id === id)?.nombre ?? ''),
      distanciaKm:     km,
      costoCombustible: costoComb,
      costoEmpleado:   costoEmp,
      costoTotal:      total,
    })
    setSelectedIds([])
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Map */}
      <div className="flex-1 rounded-lg overflow-hidden border border-borde" style={{ minHeight: 290 }}>
        <MapaRutas selectedIds={selectedIds} />
      </div>

      {/* Right panel */}
      <div className="w-full md:w-[228px] md:shrink-0 flex flex-col gap-3 overflow-y-auto">

        {/* Client list */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide mb-1.5" style={{ color: '#5A6871' }}>
            Clientes ({selectedIds.length} sel.)
          </p>
          <div className="rounded-lg border border-borde divide-y overflow-hidden" style={{ borderColor: '#DCE5E9' }}>
            {CLIENTES.map(c => (
              <label key={c.id} className="flex items-start gap-2.5 px-3 py-2 cursor-pointer hover:bg-[#F3F6F5]/70">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(c.id)}
                  onChange={() => toggle(c.id)}
                  className="mt-0.5 w-3.5 h-3.5 shrink-0 accent-[#1B5BC1]"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-carbon leading-tight truncate">{c.nombre}</p>
                  <p className="text-[10px] truncate" style={{ color: '#5A6871' }}>{c.direccion}</p>
                </div>
                {selectedIds.includes(c.id) && (
                  <span className="shrink-0 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                    style={{ backgroundColor: '#1B5BC1' }}>
                    {selectedIds.indexOf(c.id) + 1}
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Vehicle & Employee */}
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: '#5A6871' }}>Vehículo</p>
            <select value={vehiculoId} onChange={e => setVehiculoId(e.target.value)}
              className="w-full h-8 px-2 text-xs text-carbon border rounded-sm bg-white focus:outline-none focus:border-[#306ECF]"
              style={{ borderColor: '#DCE5E9' }}>
              {vehiculos.map(v => <option key={v.id} value={v.id}>{v.nombre}</option>)}
            </select>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: '#5A6871' }}>Empleado</p>
            <select value={empleadoId} onChange={e => setEmpleadoId(e.target.value)}
              className="w-full h-8 px-2 text-xs text-carbon border rounded-sm bg-white focus:outline-none focus:border-[#306ECF]"
              style={{ borderColor: '#DCE5E9' }}>
              {empleados.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
            </select>
          </div>
        </div>

        {/* Cost panel */}
        <div className={`rounded-lg border p-3 transition-all ${selectedIds.length > 0 ? '' : 'opacity-50'}`}
          style={{ borderColor: selectedIds.length > 0 ? 'rgba(27,91,193,0.2)' : '#DCE5E9', backgroundColor: selectedIds.length > 0 ? '#EAF5FD' : '#F3F6F5' }}>
          <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: '#306ECF' }}>
            Costo del viaje
          </p>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span style={{ color: '#5A6871' }}>Distancia</span>
              <span className="font-semibold text-carbon">{km.toFixed(1)} km</span>
            </div>
            <div className="flex justify-between text-xs">
              <span style={{ color: '#5A6871' }}>Combustible ({liters.toFixed(1)} L)</span>
              <span className="font-semibold text-carbon">{fmt(costoComb)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span style={{ color: '#5A6871' }}>Tiempo est.</span>
              <span className="font-semibold text-carbon">{(tiempoH * 60).toFixed(0)} min</span>
            </div>
            <div className="flex justify-between text-xs">
              <span style={{ color: '#5A6871' }}>Empleado</span>
              <span className="font-semibold text-carbon">{fmt(costoEmp)}</span>
            </div>
            <div className="flex justify-between pt-1.5 mt-0.5 border-t" style={{ borderColor: 'rgba(27,91,193,0.15)' }}>
              <span className="text-xs font-bold text-carbon">Total</span>
              <span className="text-sm font-extrabold" style={{ color: '#306ECF' }}>{fmt(total)}</span>
            </div>
          </div>
        </div>

        {/* Confirm button */}
        <button
          onClick={confirmar}
          disabled={selectedIds.length === 0}
          className="w-full h-[38px] rounded-[8px] text-[12px] font-bold tracking-[0.04em] uppercase text-white transition-all"
          style={{
            backgroundColor: selectedIds.length > 0 ? '#306ECF' : '#DCE5E9',
            color: selectedIds.length > 0 ? 'white' : '#5A6871',
            cursor: selectedIds.length > 0 ? 'pointer' : 'not-allowed',
          }}>
          Confirmar ruta
        </button>
      </div>
    </div>
  )
}

// ─── Tab: Recursos ────────────────────────────────────────────────────────────

function RecursosTab({ empleados, setEmpleados, vehiculos, setVehiculos, precioCombu, setPrecioCombu }: {
  empleados: Empleado[]; setEmpleados: (v: Empleado[]) => void
  vehiculos: Vehiculo[]; setVehiculos: (v: Vehiculo[]) => void
  precioCombu: number; setPrecioCombu: (n: number) => void
}) {
  const [empModal, setEmpModal] = useState(false)
  const [vehModal, setVehModal] = useState(false)
  const [empForm, setEmpForm]   = useState({ nombre: '', sueldoHora: '' })
  const [vehForm, setVehForm]   = useState({ nombre: '', consumo: '' })

  const BtnAdd = ({ onClick, label }: { onClick: () => void; label: string }) => (
    <button onClick={onClick}
      className="h-8 px-3 rounded-[8px] text-xs font-bold tracking-[0.03em] uppercase text-white"
      style={{ backgroundColor: '#1B5BC1' }}>
      {label}
    </button>
  )

  return (
    <div className="space-y-6">
      {/* Precio combustible */}
      <div className="flex items-center gap-4 p-4 rounded-lg border" style={{ backgroundColor: '#F3F6F5', borderColor: '#DCE5E9' }}>
        <div className="flex-1">
          <p className="text-sm font-semibold text-carbon">Precio del litro de combustible</p>
          <p className="text-xs mt-0.5" style={{ color: '#5A6871' }}>Recalcula el costo de todos los viajes en tiempo real</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-carbon">$</span>
          <input
            type="number"
            value={precioCombu}
            onChange={e => setPrecioCombu(+e.target.value)}
            className="w-24 h-9 border rounded-sm px-2.5 text-sm font-semibold text-carbon focus:outline-none focus:border-[#306ECF] text-right"
            style={{ borderColor: '#DCE5E9' }}
          />
        </div>
      </div>

      {/* Empleados */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-carbon">{empleados.length} empleados</p>
          <BtnAdd onClick={() => setEmpModal(true)} label="+ Agregar empleado" />
        </div>
        <div className="rounded-lg border overflow-hidden" style={{ borderColor: '#DCE5E9' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#F3F6F5' }}>
                {['Nombre', 'Sueldo/hora', ''].map(h => (
                  <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: '#5A6871' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: '#DCE5E9' }}>
              {empleados.map(e => (
                <tr key={e.id} className="hover:bg-[#F3F6F5]/50">
                  <td className="px-3 py-2.5 font-medium text-carbon">{e.nombre}</td>
                  <td className="px-3 py-2.5 font-semibold" style={{ color: '#1B5BC1' }}>{fmt(e.sueldoHora)}/h</td>
                  <td className="px-3 py-2.5">
                    <button onClick={() => setEmpleados(empleados.filter(x => x.id !== e.id))}
                      className="p-1 rounded hover:text-red-500 transition-colors" style={{ color: '#5A6871' }}>
                      <IcoTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vehículos */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-carbon">{vehiculos.length} vehículos</p>
          <BtnAdd onClick={() => setVehModal(true)} label="+ Agregar vehículo" />
        </div>
        <div className="rounded-lg border overflow-hidden" style={{ borderColor: '#DCE5E9' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#F3F6F5' }}>
                {['Vehículo', 'Consumo', 'Costo/km', ''].map(h => (
                  <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: '#5A6871' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: '#DCE5E9' }}>
              {vehiculos.map(v => (
                <tr key={v.id} className="hover:bg-[#F3F6F5]/50">
                  <td className="px-3 py-2.5 font-medium text-carbon">{v.nombre}</td>
                  <td className="px-3 py-2.5" style={{ color: '#5A6871' }}>{v.consumo} L/100km</td>
                  <td className="px-3 py-2.5 font-semibold" style={{ color: '#1B5BC1' }}>
                    {fmt((precioCombu * v.consumo) / 100)}/km
                  </td>
                  <td className="px-3 py-2.5">
                    <button onClick={() => setVehiculos(vehiculos.filter(x => x.id !== v.id))}
                      className="p-1 rounded hover:text-red-500 transition-colors" style={{ color: '#5A6871' }}>
                      <IcoTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {empModal && (
        <MiniModal title="Nuevo empleado" onClose={() => setEmpModal(false)}>
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#5A6871' }}>Nombre</p>
              <input value={empForm.nombre} onChange={e => setEmpForm(f => ({ ...f, nombre: e.target.value }))}
                className="w-full h-9 border rounded-sm px-3 text-sm focus:outline-none focus:border-[#306ECF]"
                style={{ borderColor: '#DCE5E9' }} placeholder="ej: Juan García" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#5A6871' }}>Sueldo por hora (ARS)</p>
              <input type="number" value={empForm.sueldoHora} onChange={e => setEmpForm(f => ({ ...f, sueldoHora: e.target.value }))}
                className="w-full h-9 border rounded-sm px-3 text-sm focus:outline-none focus:border-[#306ECF]"
                style={{ borderColor: '#DCE5E9' }} placeholder="950" />
            </div>
            <div className="flex gap-2 justify-end pt-1">
              <button onClick={() => setEmpModal(false)}
                className="h-8 px-4 rounded-[8px] text-xs font-semibold border hover:bg-[#F3F6F5] transition-colors"
                style={{ borderColor: '#DCE5E9', color: '#5A6871' }}>
                Cancelar
              </button>
              <button onClick={() => {
                if (!empForm.nombre) return
                setEmpleados([...empleados, { id: `e${Date.now()}`, nombre: empForm.nombre, sueldoHora: +empForm.sueldoHora || 0 }])
                setEmpForm({ nombre: '', sueldoHora: '' }); setEmpModal(false)
              }} className="h-8 px-4 rounded-[8px] text-xs font-bold text-white" style={{ backgroundColor: '#1B5BC1' }}>
                Guardar
              </button>
            </div>
          </div>
        </MiniModal>
      )}

      {vehModal && (
        <MiniModal title="Nuevo vehículo" onClose={() => setVehModal(false)}>
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#5A6871' }}>Nombre</p>
              <input value={vehForm.nombre} onChange={e => setVehForm(f => ({ ...f, nombre: e.target.value }))}
                className="w-full h-9 border rounded-sm px-3 text-sm focus:outline-none focus:border-[#306ECF]"
                style={{ borderColor: '#DCE5E9' }} placeholder="ej: Ford Transit" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#5A6871' }}>Consumo (L/100km)</p>
              <input type="number" value={vehForm.consumo} onChange={e => setVehForm(f => ({ ...f, consumo: e.target.value }))}
                className="w-full h-9 border rounded-sm px-3 text-sm focus:outline-none focus:border-[#306ECF]"
                style={{ borderColor: '#DCE5E9' }} placeholder="10.5" />
            </div>
            <div className="flex gap-2 justify-end pt-1">
              <button onClick={() => setVehModal(false)}
                className="h-8 px-4 rounded-[8px] text-xs font-semibold border hover:bg-[#F3F6F5] transition-colors"
                style={{ borderColor: '#DCE5E9', color: '#5A6871' }}>
                Cancelar
              </button>
              <button onClick={() => {
                if (!vehForm.nombre) return
                setVehiculos([...vehiculos, { id: `v${Date.now()}`, nombre: vehForm.nombre, consumo: +vehForm.consumo || 0 }])
                setVehForm({ nombre: '', consumo: '' }); setVehModal(false)
              }} className="h-8 px-4 rounded-[8px] text-xs font-bold text-white" style={{ backgroundColor: '#1B5BC1' }}>
                Guardar
              </button>
            </div>
          </div>
        </MiniModal>
      )}
    </div>
  )
}

// ─── Tab: Costos ──────────────────────────────────────────────────────────────

function CostosTab({ historial }: { historial: RutaLog[] }) {
  const totKm   = historial.reduce((a, r) => a + r.distanciaKm, 0)
  const totComb = historial.reduce((a, r) => a + r.costoCombustible, 0)
  const totEmp  = historial.reduce((a, r) => a + r.costoEmpleado, 0)
  const totAll  = historial.reduce((a, r) => a + r.costoTotal, 0)

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#5A6871' }}>
        {historial.length} rutas registradas en el período
      </p>
      <div className="rounded-lg border overflow-x-auto" style={{ borderColor: '#DCE5E9' }}>
        <table className="w-full text-xs min-w-[700px]">
          <thead>
            <tr style={{ backgroundColor: '#F3F6F5' }}>
              {['Fecha', 'Empleado', 'Vehículo', 'Clientes visitados', 'Distancia', 'Combustible', 'Empleado', 'Total'].map(h => (
                <th key={h} className="px-3 py-2.5 text-left font-semibold uppercase tracking-wide whitespace-nowrap" style={{ color: '#5A6871' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: '#DCE5E9' }}>
            {historial.map(r => (
              <tr key={r.id} className="hover:bg-[#F3F6F5]/50">
                <td className="px-3 py-2.5 whitespace-nowrap" style={{ color: '#5A6871' }}>{r.fecha}</td>
                <td className="px-3 py-2.5 font-medium text-carbon">{r.empleadoNombre}</td>
                <td className="px-3 py-2.5" style={{ color: '#5A6871' }}>{r.vehiculoNombre}</td>
                <td className="px-3 py-2.5 text-carbon max-w-[160px] truncate" title={r.clientesNombres.join(', ')}>
                  {r.clientesNombres.join(', ')}
                </td>
                <td className="px-3 py-2.5 text-carbon">{r.distanciaKm.toFixed(1)} km</td>
                <td className="px-3 py-2.5 text-carbon">{fmt(r.costoCombustible)}</td>
                <td className="px-3 py-2.5 text-carbon">{fmt(r.costoEmpleado)}</td>
                <td className="px-3 py-2.5 font-bold" style={{ color: '#1B5BC1' }}>{fmt(r.costoTotal)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2" style={{ borderColor: '#DCE5E9', backgroundColor: '#F3F6F5' }}>
              <td colSpan={4} className="px-3 py-2.5 font-bold text-carbon text-xs uppercase tracking-wide">Totales del período</td>
              <td className="px-3 py-2.5 font-bold text-carbon">{totKm.toFixed(1)} km</td>
              <td className="px-3 py-2.5 font-bold text-carbon">{fmt(totComb)}</td>
              <td className="px-3 py-2.5 font-bold text-carbon">{fmt(totEmp)}</td>
              <td className="px-3 py-2.5 font-extrabold" style={{ color: '#1B5BC1' }}>{fmt(totAll)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

// ─── Main panel ───────────────────────────────────────────────────────────────

type Tab = 'rutas' | 'recursos' | 'costos'
const TABS: { id: Tab; label: string }[] = [
  { id: 'rutas',    label: 'Rutas'    },
  { id: 'recursos', label: 'Recursos' },
  { id: 'costos',   label: 'Costos'   },
]

function MainPanel({ onBack }: { onBack: () => void }) {
  const [tab, setTab]                  = useState<Tab>('rutas')
  const [empleados, setEmpleados]      = useState<Empleado[]>(initEmpleados)
  const [vehiculos, setVehiculos]      = useState<Vehiculo[]>(initVehiculos)
  const [precioCombu, setPrecioCombu]  = useState(1250)
  const [historial, setHistorial]      = useState<RutaLog[]>(() => buildInitHistorial())
  const [toast, setToast]              = useState<string | null>(null)

  const handleConfirmar = (log: Omit<RutaLog, 'id' | 'fecha'>) => {
    const fecha = new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    setHistorial(prev => [...prev, { ...log, id: Date.now(), fecha }])
    setToast(`✓ Ruta confirmada · ${log.vehiculoNombre} · ${log.empleadoNombre} · ${log.clientesNombres.length} clientes · ${fmt(log.costoTotal)}`)
    setTimeout(() => setToast(null), 3500)
  }

  return (
    <div className="flex flex-col min-h-[620px]">
      {/* Header */}
      <div style={{ backgroundColor: '#1B5BC1' }} className="flex items-center justify-between px-5 py-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="font-extrabold text-lg text-white leading-none">
            <span style={{ color: '#56BCFA' }}>d</span>ataria
          </span>
          <span className="text-white/40 text-sm">·</span>
          <span className="text-white/75 text-sm">Distribuidoras · Planificación de rutas</span>
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
        {tab === 'rutas'    && <RutasTab empleados={empleados} vehiculos={vehiculos} precioCombustible={precioCombu} onConfirmar={handleConfirmar} />}
        {tab === 'recursos' && <RecursosTab empleados={empleados} setEmpleados={setEmpleados} vehiculos={vehiculos} setVehiculos={setVehiculos} precioCombu={precioCombu} setPrecioCombu={setPrecioCombu} />}
        {tab === 'costos'   && <CostosTab historial={historial} />}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] max-w-[calc(100%-32px)] px-5 py-3 rounded-xl shadow-xl text-white text-sm font-semibold text-center"
          style={{ backgroundColor: '#1a7a4a' }}>
          {toast}
        </div>
      )}
    </div>
  )
}

// ─── Splash ───────────────────────────────────────────────────────────────────

function Splash({ onBack, onEnter }: { onBack: () => void; onEnter: () => void }) {
  return (
    <div className="min-h-[620px] flex flex-col"
      style={{ background: 'linear-gradient(160deg, #1B5BC1 0%, #2a6fd4 50%, #45B5F3 100%)' }}>
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
            Distribuidoras · Rutas
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

export default function RutasDemo({ onBack }: { onBack: () => void }) {
  const [screen, setScreen] = useState<'splash' | 'main'>('splash')
  if (screen === 'splash') return <Splash onBack={onBack} onEnter={() => setScreen('main')} />
  return <MainPanel onBack={() => setScreen('splash')} />
}
