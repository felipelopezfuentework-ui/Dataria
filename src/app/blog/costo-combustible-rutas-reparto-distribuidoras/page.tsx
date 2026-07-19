import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/industry/Breadcrumb'
import { BlogHeader } from '@/components/blog/BlogHeader'
import { ArticleProse } from '@/components/blog/ArticleProse'
import { BlogCTA } from '@/components/blog/BlogCTA'
import { BlogSchema } from '@/components/blog/BlogSchema'
import { posts } from '../posts-meta'

const meta = posts.find((p) => p.slug === 'costo-combustible-rutas-reparto-distribuidoras')!

export const metadata: Metadata = {
  title: `${meta.title} | Dataria`,
  description: meta.excerpt,
  alternates: { canonical: `https://www.dataria.work/blog/${meta.slug}` },
}

export default function Page() {
  return (
    <main>
      <Breadcrumb current={meta.title} parents={[{ label: 'Blog', href: '/blog' }]} />
      <BlogHeader title={meta.title} date={meta.date} industria={meta.industria} />
      <ArticleProse>
        <p>
          En marzo de 2026, los costos del transporte de cargas en Argentina subieron 10,15% en un solo mes — la
          suba mensual más alta en dos años, según la{' '}
          <a href="https://www.fadeeac.org.ar/2026/04/01/los-costos-de-transporte-saltan-un-1015-en-marzo-la-cifra-mas-alta-en-dos-anos/" target="_blank" rel="noopener noreferrer">
            Federación Argentina de Entidades Empresarias del Autotransporte de Cargas (FADEEAC)
          </a>
          . El principal responsable fue el combustible: el gasoil aumentó 24,7% en marzo y llegó a los USD 1,60 por
          litro, uno de los valores más altos de la última década y de toda la región. En el primer trimestre de
          2026 el combustible ya acumulaba una suba de 29%, y los costos logísticos totales treparon 22,2% en el
          primer semestre, según el índice CEDOL-UTN. El combustible representa entre 33% y 35% de la estructura de
          costos de una distribuidora — así que cada kilómetro de más, cada camión que sale medio vacío, pesa directo
          en el margen del mes.
        </p>

        <h2>Un costo que ya no perdona la ruta improvisada</h2>
        <p>
          Cuando el combustible pesaba menos en la estructura de costos, ir 10 kilómetros de más por una ruta mal
          planificada no se sentía tanto en el bolsillo. Con el gasoil en dólares en uno de sus niveles más altos de
          la última década, ese margen de error desapareció: cada recorrido ineficiente, cada vuelta que se podría
          haber evitado agrupando pedidos de la misma zona, hoy cuesta real y se nota en el cierre del mes.
        </p>

        <h2>No es solo el combustible: los peajes también empujan</h2>
        <p>
          Detrás del combustible, el segundo componente que más subió en marzo fue Peajes, con un 8,26% — impulsado
          por nuevos incrementos en los accesos a CABA, según el mismo informe de FADEEAC. Es la combinación de varios
          costos moviéndose al mismo tiempo lo que hace que el índice acumulado de seis meses (22,2%) sea más
          representativo del golpe real que cualquier aumento puntual.
        </p>

        <h2>Qué cambia con una ruta armada por IA en vez de a mano</h2>
        <p>
          El módulo de rutas de Dataria no reemplaza el conocimiento de tus choferes sobre la calle — cruza los
          pedidos del día, la ventana horaria de cada cliente y la capacidad de carga de cada camión, teniendo en
          cuenta restricciones reales como el tránsito pesado, para armar la vuelta más corta posible sin perder
          entregas ni forzar horarios que tus clientes no aceptan. Con el combustible en los valores actuales, ese
          ajuste de recorrido deja de ser un detalle y pasa a ser parte del margen operativo de la distribuidora.
        </p>
      </ArticleProse>
      <BlogCTA industria={meta.industria} industriaHref={meta.industriaHref} />
      <BlogSchema slug={meta.slug} title={meta.title} excerpt={meta.excerpt} date={meta.date} />
    </main>
  )
}
