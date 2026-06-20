export interface Insumo {
  id: string
  nombre: string
  unidad: string
  costoUnitario: number
}

export interface ComponenteReceta {
  insumoId: string
  cantidad: number
}

export interface Receta {
  id: string
  nombre: string
  componentes: ComponenteReceta[]
}

export interface IngresoMercaderia {
  id: string
  insumoId: string
  cantidad: number
  precioPagado: number
  fecha: string
}

export const insumosIniciales: Insumo[] = [
  { id: 'i1', nombre: 'Harina 000',       unidad: 'kg',  costoUnitario: 850  },
  { id: 'i2', nombre: 'Aceite de girasol', unidad: 'lt',  costoUnitario: 2100 },
  { id: 'i3', nombre: 'Tomate perita',     unidad: 'kg',  costoUnitario: 1200 },
  { id: 'i4', nombre: 'Mozzarella',        unidad: 'kg',  costoUnitario: 6500 },
  { id: 'i5', nombre: 'Albahaca fresca',   unidad: 'atado', costoUnitario: 450 },
  { id: 'i6', nombre: 'Huevos',            unidad: 'unidad', costoUnitario: 180 },
  { id: 'i7', nombre: 'Azúcar',            unidad: 'kg',  costoUnitario: 1100 },
  { id: 'i8', nombre: 'Manteca',           unidad: 'kg',  costoUnitario: 5200 },
  { id: 'i9', nombre: 'Levadura',          unidad: 'g',   costoUnitario: 12   },
  { id: 'i10', nombre: 'Sal',              unidad: 'kg',  costoUnitario: 300  },
]

export const recetasIniciales: Receta[] = [
  {
    id: 'r1',
    nombre: 'Pizza Margherita (30cm)',
    componentes: [
      { insumoId: 'i1', cantidad: 0.25 },
      { insumoId: 'i3', cantidad: 0.15 },
      { insumoId: 'i4', cantidad: 0.20 },
      { insumoId: 'i5', cantidad: 0.5  },
      { insumoId: 'i2', cantidad: 0.03 },
      { insumoId: 'i9', cantidad: 5    },
      { insumoId: 'i10', cantidad: 0.01 },
    ],
  },
  {
    id: 'r2',
    nombre: 'Tarta de manzana (8 porciones)',
    componentes: [
      { insumoId: 'i1', cantidad: 0.30 },
      { insumoId: 'i8', cantidad: 0.15 },
      { insumoId: 'i7', cantidad: 0.20 },
      { insumoId: 'i6', cantidad: 2    },
    ],
  },
  {
    id: 'r3',
    nombre: 'Milanesa napolitana',
    componentes: [
      { insumoId: 'i3', cantidad: 0.10 },
      { insumoId: 'i4', cantidad: 0.08 },
      { insumoId: 'i1', cantidad: 0.05 },
      { insumoId: 'i6', cantidad: 1    },
      { insumoId: 'i2', cantidad: 0.08 },
    ],
  },
  {
    id: 'r4',
    nombre: 'Focaccia con romero',
    componentes: [
      { insumoId: 'i1', cantidad: 0.40 },
      { insumoId: 'i2', cantidad: 0.05 },
      { insumoId: 'i9', cantidad: 8    },
      { insumoId: 'i10', cantidad: 0.015 },
    ],
  },
]

export const ingresosIniciales: IngresoMercaderia[] = [
  { id: 'im1', insumoId: 'i1', cantidad: 25, precioPagado: 850,  fecha: '2025-06-01' },
  { id: 'im2', insumoId: 'i4', cantidad: 5,  precioPagado: 6500, fecha: '2025-06-02' },
  { id: 'im3', insumoId: 'i3', cantidad: 10, precioPagado: 1200, fecha: '2025-06-03' },
]
