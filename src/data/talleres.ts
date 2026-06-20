export type EstadoOrden = 'Recibido' | 'En diagnóstico' | 'En reparación' | 'Listo para retirar'

export const ESTADOS: EstadoOrden[] = [
  'Recibido',
  'En diagnóstico',
  'En reparación',
  'Listo para retirar',
]

export interface Vehiculo {
  marca: string
  modelo: string
  patente: string
}

export interface OrdenTaller {
  id: string
  cliente: string
  telefono: string
  vehiculo: Vehiculo
  problema: string
  tiempoEstimado: string
  estado: EstadoOrden
  fechaIngreso: string
}

export const ordenesIniciales: OrdenTaller[] = [
  {
    id: 'ot1',
    cliente: 'Juan Pérez',
    telefono: '351-555-1001',
    vehiculo: { marca: 'Toyota', modelo: 'Corolla', patente: 'AB 123 CD' },
    problema: 'Frenos con ruido al frenar y pedal blando.',
    tiempoEstimado: '1-2 días',
    estado: 'Listo para retirar',
    fechaIngreso: '2025-06-16',
  },
  {
    id: 'ot2',
    cliente: 'María García',
    telefono: '351-555-1002',
    vehiculo: { marca: 'Volkswagen', modelo: 'Golf', patente: 'EF 456 GH' },
    problema: 'Check engine encendido, pérdida de potencia en autopista.',
    tiempoEstimado: '2-3 días',
    estado: 'En diagnóstico',
    fechaIngreso: '2025-06-17',
  },
  {
    id: 'ot3',
    cliente: 'Carlos Rodríguez',
    telefono: '351-555-1003',
    vehiculo: { marca: 'Ford', modelo: 'Ranger', patente: 'IJ 789 KL' },
    problema: 'Ruido en la caja de velocidades al cambiar a 3ra.',
    tiempoEstimado: '4-5 días',
    estado: 'En reparación',
    fechaIngreso: '2025-06-15',
  },
  {
    id: 'ot4',
    cliente: 'Ana Martínez',
    telefono: '351-555-1004',
    vehiculo: { marca: 'Fiat', modelo: 'Cronos', patente: 'MN 012 OP' },
    problema: 'Aceite consumiéndose rápido, revisión general.',
    tiempoEstimado: '1 día',
    estado: 'Recibido',
    fechaIngreso: '2025-06-19',
  },
  {
    id: 'ot5',
    cliente: 'Roberto Sosa',
    telefono: '351-555-1005',
    vehiculo: { marca: 'Peugeot', modelo: '208', patente: 'QR 345 ST' },
    problema: 'Batería descargada repetidamente, posible problema eléctrico.',
    tiempoEstimado: '2 días',
    estado: 'En diagnóstico',
    fechaIngreso: '2025-06-18',
  },
]
