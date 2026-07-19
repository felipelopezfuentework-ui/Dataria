export interface PostMeta {
  slug: string
  title: string
  excerpt: string
  date: string
  industria: string
  industriaHref: string
}

export const posts: PostMeta[] = [
  {
    slug: 'food-cost-restaurantes-argentina',
    title: 'Food cost en Argentina: por qué calcularlo "a ojo" te puede estar costando el margen del mes',
    excerpt: 'El consumo en restaurantes cayó hasta 40% en dos años, mientras la carne y el aceite subieron más de 50% interanual. Cómo calcular el food cost real, plato por plato, sin perder rentabilidad.',
    date: '2026-07-19',
    industria: 'Gastronomía',
    industriaHref: '/gastronomia',
  },
  {
    slug: 'costo-combustible-rutas-reparto-distribuidoras',
    title: 'Ventana horaria: el problema logístico que las distribuidoras siguen resolviendo de forma manual',
    excerpt: 'Cada cliente espera su pedido en un horario distinto, y planificar la ruta sin herramientas automatizadas genera recorridos ineficientes. Con el combustible pesando cada vez más en la estructura de costos, optimizar la ruta ya no es un detalle menor.',
    date: '2026-07-19',
    industria: 'Distribuidoras',
    industriaHref: '/distribuidoras',
  },
  {
    slug: 'whatsapp-inmobiliarias-argentina',
    title: 'WhatsApp lleno, escrituras que no suben: la paradoja de las inmobiliarias argentinas en 2026',
    excerpt: 'Las ventas de inmuebles cayeron casi 8% en la Provincia, pero las consultas por WhatsApp no paran de llegar. El problema no es la cantidad de consultas — es filtrar cuáles son reales.',
    date: '2026-07-19',
    industria: 'Inmobiliarias',
    industriaHref: '/inmobiliarias',
  },
  {
    slug: 'evitar-quiebre-stock-hot-sale-ecommerce',
    title: 'Predicción de stock: cómo no quedarte sin mercadería, sin un equipo de datos propio',
    excerpt: 'Cada cliente de tu tienda online compra más caro y es más exigente que antes. Por qué anticipar la demanda, y no solo mirar el stock de hoy, es lo que evita perder la venta más grande del mes.',
    date: '2026-07-19',
    industria: 'E-commerce',
    industriaHref: '/ecommerce',
  },
]
