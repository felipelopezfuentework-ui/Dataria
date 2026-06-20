export type EtapaLead = 'Interesado' | 'Visita agendada' | 'Propuesta' | 'Cierre'

export const ETAPAS: EtapaLead[] = [
  'Interesado',
  'Visita agendada',
  'Propuesta',
  'Cierre',
]

export interface Lead {
  id: string
  nombre: string
  contacto: string
  propiedadInteres: string
  presupuesto: string
  etapa: EtapaLead
  fechaIngreso: string
  nota?: string
}

export const leadsIniciales: Lead[] = [
  {
    id: 'l1',
    nombre: 'Sofía Herrera',
    contacto: 'sofiah@email.com · 351-555-2001',
    propiedadInteres: 'Dpto. 3 amb. Nueva Córdoba',
    presupuesto: '[pendiente]',
    etapa: 'Cierre',
    fechaIngreso: '2025-05-20',
    nota: 'Muy interesada, pide documentación para escritura.',
  },
  {
    id: 'l2',
    nombre: 'Diego Ríos',
    contacto: 'diegor@email.com · 351-555-2002',
    propiedadInteres: 'Casa c/ jardín en Cerro de las Rosas',
    presupuesto: '[pendiente]',
    etapa: 'Propuesta',
    fechaIngreso: '2025-05-28',
    nota: 'Quiere revisar propuesta con su contador.',
  },
  {
    id: 'l3',
    nombre: 'Luciana Torres',
    contacto: 'lucit@email.com · 351-555-2003',
    propiedadInteres: 'PH 4 amb. con terraza, Güemes',
    presupuesto: '[pendiente]',
    etapa: 'Visita agendada',
    fechaIngreso: '2025-06-05',
    nota: 'Visita confirmada para el martes.',
  },
  {
    id: 'l4',
    nombre: 'Martín Álvarez',
    contacto: 'martinA@email.com · 351-555-2004',
    propiedadInteres: 'Dpto. 1 amb. + cochera, Centro',
    presupuesto: '[pendiente]',
    etapa: 'Interesado',
    fechaIngreso: '2025-06-10',
  },
  {
    id: 'l5',
    nombre: 'Patricia Vega',
    contacto: 'pvega@email.com · 351-555-2005',
    propiedadInteres: 'Terreno 500m² en Villa Allende',
    presupuesto: '[pendiente]',
    etapa: 'Visita agendada',
    fechaIngreso: '2025-06-12',
    nota: 'Visita el jueves 21/06 a las 11hs.',
  },
  {
    id: 'l6',
    nombre: 'Fernando Castro',
    contacto: 'fcastro@email.com · 351-555-2006',
    propiedadInteres: 'Casa 3 dorm. en Alta Gracia',
    presupuesto: '[pendiente]',
    etapa: 'Interesado',
    fechaIngreso: '2025-06-15',
  },
  {
    id: 'l7',
    nombre: 'Valeria Medina',
    contacto: 'vmedina@email.com · 351-555-2007',
    propiedadInteres: 'Local comercial Av. Colón',
    presupuesto: '[pendiente]',
    etapa: 'Propuesta',
    fechaIngreso: '2025-06-08',
    nota: 'Negocia condiciones de entrega.',
  },
  {
    id: 'l8',
    nombre: 'Alejandro Núñez',
    contacto: 'alexn@email.com · 351-555-2008',
    propiedadInteres: 'Dpto. 2 amb. en Barrio General Paz',
    presupuesto: '[pendiente]',
    etapa: 'Interesado',
    fechaIngreso: '2025-06-18',
  },
]
