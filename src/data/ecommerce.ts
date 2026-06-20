export interface CompraHistorica {
  producto: string
  fecha: string
  monto: number
  categoria: string
}

export interface ClienteEco {
  id: string
  nombre: string
  email: string
  telefono: string
  historialCompras: CompraHistorica[]
}

export interface ItemCarrito {
  nombre: string
  precio: number
  cantidad: number
}

export interface CarritoAbandonado {
  id: string
  clienteId: string
  productos: ItemCarrito[]
  tiempoDesdeAbandono: string
}

export interface ProductoCotizar {
  id: string
  nombre: string
  precioBase: number
  unidad: string
}

export interface MensajeChat {
  id: string
  rol: 'usuario' | 'agente'
  texto: string
  timestamp: string
}

export interface RespuestaAgente {
  patron: string
  respuesta: string
}

export const clientesEcoIniciales: ClienteEco[] = [
  {
    id: 'ce1',
    nombre: 'Laura Gómez',
    email: 'laurag@email.com',
    telefono: '351-555-3001',
    historialCompras: [
      { producto: 'Auriculares BT Pro',     fecha: '2025-04-10', monto: 42000, categoria: 'Electrónica' },
      { producto: 'Funda notebook 15"',     fecha: '2025-05-02', monto: 8500,  categoria: 'Accesorios'  },
      { producto: 'Mouse inalámbrico',      fecha: '2025-06-01', monto: 12000, categoria: 'Electrónica' },
    ],
  },
  {
    id: 'ce2',
    nombre: 'Tomás Vera',
    email: 'tomasv@email.com',
    telefono: '351-555-3002',
    historialCompras: [
      { producto: 'Teclado mecánico RGB',   fecha: '2025-03-15', monto: 58000, categoria: 'Electrónica' },
      { producto: 'Pad XL gaming',          fecha: '2025-03-15', monto: 9000,  categoria: 'Gaming'       },
    ],
  },
  {
    id: 'ce3',
    nombre: 'Camila Rojas',
    email: 'camirojas@email.com',
    telefono: '351-555-3003',
    historialCompras: [
      { producto: 'Smart Watch Fit Band',   fecha: '2025-05-20', monto: 35000, categoria: 'Wearables'   },
      { producto: 'Cable USB-C x3',         fecha: '2025-06-10', monto: 4500,  categoria: 'Accesorios'  },
    ],
  },
  {
    id: 'ce4',
    nombre: 'Nicolás Blanco',
    email: 'nicoB@email.com',
    telefono: '351-555-3004',
    historialCompras: [
      { producto: 'Webcam Full HD',         fecha: '2025-04-01', monto: 22000, categoria: 'Electrónica' },
    ],
  },
]

export const carritosAbandonadosIniciales: CarritoAbandonado[] = [
  {
    id: 'ca1',
    clienteId: 'ce1',
    productos: [
      { nombre: 'Hub USB-C 7 en 1',  precio: 18000, cantidad: 1 },
      { nombre: 'Cable HDMI 2m',     precio: 3500,  cantidad: 2 },
    ],
    tiempoDesdeAbandono: 'hace 2 horas',
  },
  {
    id: 'ca2',
    clienteId: 'ce2',
    productos: [
      { nombre: 'Monitor 24" IPS',   precio: 185000, cantidad: 1 },
    ],
    tiempoDesdeAbandono: 'hace 1 día',
  },
  {
    id: 'ca3',
    clienteId: 'ce3',
    productos: [
      { nombre: 'Soporte celular auto', precio: 4200, cantidad: 1 },
      { nombre: 'Cargador rápido 65W', precio: 9800, cantidad: 1 },
    ],
    tiempoDesdeAbandono: 'hace 3 días',
  },
]

export const productosCotizarIniciales: ProductoCotizar[] = [
  { id: 'p1', nombre: 'Auriculares BT Pro',    precioBase: 42000,  unidad: 'unidad' },
  { id: 'p2', nombre: 'Mouse inalámbrico',     precioBase: 12000,  unidad: 'unidad' },
  { id: 'p3', nombre: 'Teclado mecánico RGB',  precioBase: 58000,  unidad: 'unidad' },
  { id: 'p4', nombre: 'Monitor 24" IPS',       precioBase: 185000, unidad: 'unidad' },
  { id: 'p5', nombre: 'Hub USB-C 7 en 1',      precioBase: 18000,  unidad: 'unidad' },
  { id: 'p6', nombre: 'Webcam Full HD',        precioBase: 22000,  unidad: 'unidad' },
  { id: 'p7', nombre: 'Cable USB-C',           precioBase: 1500,   unidad: 'unidad' },
  { id: 'p8', nombre: 'Smart Watch Fit Band',  precioBase: 35000,  unidad: 'unidad' },
]

export const respuestasAgente: RespuestaAgente[] = [
  { patron: 'envio|entrega|demora',           respuesta: 'Los envíos dentro de Córdoba capital demoran entre 24 y 48hs hábiles. Para el interior, 3-5 días hábiles. ¿Querés que te pasemos el tracking de tu pedido?' },
  { patron: 'devolucion|cambio|devolución',   respuesta: 'Tenemos 30 días para cambios y devoluciones desde la fecha de entrega. El producto debe estar sin uso y en su embalaje original. ¿Necesitás iniciar un cambio?' },
  { patron: 'garantia|garantía',              respuesta: 'Todos nuestros productos tienen garantía oficial del fabricante: 1 año en electrónica, 6 meses en accesorios. ¿Tenés algún problema con tu compra?' },
  { patron: 'precio|costo|cuanto',            respuesta: 'Podés usar nuestro cotizador para ver el precio exacto por volumen. ¿Querés que te lo facilite?' },
  { patron: 'factura|facturacion',            respuesta: 'Emitimos factura A y B. Podés solicitar factura A indicando tu CUIT al momento de la compra.' },
  { patron: 'hola|buenas|buenos',             respuesta: '¡Hola! Soy el asistente virtual de Dataria Store. ¿En qué te puedo ayudar hoy?' },
  { patron: 'gracias|ok|listo',               respuesta: 'Con gusto. ¿Hay algo más en lo que pueda ayudarte?' },
]
