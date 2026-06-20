export interface ClienteDist {
  id: string
  nombre: string
  contacto: string
  direccion: string
  lat: number
  lng: number
}

export interface Vehiculo {
  id: string
  nombre: string
  consumoPor100km: number
}

export interface EmpleadoDist {
  id: string
  nombre: string
  sueldoMensual: number
}

export const clientesIniciales: ClienteDist[] = [
  { id: 'c1', nombre: 'Supermercado El Ahorro',   contacto: '351-555-0101', direccion: 'Av. Colón 1200, Córdoba',          lat: -31.4135, lng: -64.1899 },
  { id: 'c2', nombre: 'Almacén La Esquina',        contacto: '351-555-0202', direccion: 'San Martín 450, Villa Allende',    lat: -31.2918, lng: -64.2944 },
  { id: 'c3', nombre: 'Restaurante Sabor Casero',  contacto: '351-555-0303', direccion: 'Belgrano 800, Río Ceballos',       lat: -31.1747, lng: -64.3161 },
  { id: 'c4', nombre: 'Mini market Centro',        contacto: '351-555-0404', direccion: 'Rivadavia 200, Córdoba Centro',    lat: -31.4200, lng: -64.1880 },
  { id: 'c5', nombre: 'Kiosco y Más',              contacto: '351-555-0505', direccion: 'Laprida 340, Barrio Nueva Córdoba',lat: -31.4370, lng: -64.1850 },
  { id: 'c6', nombre: 'Club Deportivo Ceballos',   contacto: '351-555-0606', direccion: 'Av. Intendente Saguier 600',      lat: -31.1510, lng: -64.3200 },
  { id: 'c7', nombre: 'Hotel Boutique Sierras',    contacto: '351-555-0707', direccion: 'Ruta 38 km 45, La Falda',          lat: -31.0910, lng: -64.4860 },
  { id: 'c8', nombre: 'Pizzería Don Carlos',       contacto: '351-555-0808', direccion: 'Mitre 120, Alta Gracia',           lat: -31.6550, lng: -64.4287 },
]

export const vehiculosIniciales: Vehiculo[] = [
  { id: 'v1', nombre: 'Ford Transit 2019',   consumoPor100km: 10.5 },
  { id: 'v2', nombre: 'Renault Kangoo 2021', consumoPor100km: 7.8  },
  { id: 'v3', nombre: 'VW Amarok 2022',      consumoPor100km: 12.0 },
]

export const empleadosIniciales: EmpleadoDist[] = [
  { id: 'e1', nombre: 'Marcos Ibáñez',   sueldoMensual: 380000 },
  { id: 'e2', nombre: 'Verónica Suárez', sueldoMensual: 350000 },
  { id: 'e3', nombre: 'Pablo Rueda',     sueldoMensual: 410000 },
]

export const precioNaftaInicial = 1180
