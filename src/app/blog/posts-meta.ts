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
    title: 'Gasoil a USD 1,60: por qué ya no alcanza con planificar las rutas de reparto a mano',
    excerpt: 'El combustible representa hasta 35% del costo de una distribuidora y ya está entre los más caros de la región. Qué significa esto para las rutas de reparto de una pyme argentina.',
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
    title: 'Cómo no quedarte sin stock (ni con stock de más) en el Hot Sale, sin un equipo de datos propio',
    excerpt: 'El e-commerce argentino factura por encima de la inflación, pero el volumen de ventas casi no crece — cada cliente compra más caro y es más exigente. Por qué el quiebre de stock hoy sale más caro que nunca.',
    date: '2026-07-19',
    industria: 'E-commerce',
    industriaHref: '/ecommerce',
  },
]
