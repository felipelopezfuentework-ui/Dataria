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
          Armar la vuelta de reparto todas las mañanas a mano —a criterio del chofer, con una lista de pedidos y un
          mapa mental de la zona— funciona hasta que dos o tres clientes tienen ventanas horarias que se pisan entre
          sí. Ahí aparece el problema real de cualquier distribuidora: no alcanza con encontrar el camino más corto,
          hay que respetar el horario en el que cada cliente puede recibir la entrega, sin dejar a nadie afuera ni
          hacer esperar al camión. A eso se le suma que el combustible viene subiendo con fuerza: según la{' '}
          <a href="https://www.fadeeac.org.ar/2026/04/01/los-costos-de-transporte-saltan-un-1015-en-marzo-la-cifra-mas-alta-en-dos-anos/" target="_blank" rel="noopener noreferrer">
            Federación Argentina de Entidades Empresarias del Autotransporte de Cargas (FADEEAC)
          </a>
          , los costos de transporte de cargas subieron 10,15% solo en marzo de 2026 —la suba mensual más alta en dos
          años— empujados principalmente por el combustible. Cada recorrido de más, cada vuelta mal coordinada, pesa
          más que antes.
        </p>

        <h2>Qué es la "ventana horaria" y por qué arruina una ruta armada a mano</h2>
        <p>
          La ventana horaria es, simplemente, el rango de tiempo en el que un cliente puede recibir su pedido —
          porque abre a determinada hora, porque tiene su propio delivery a coordinar, o porque no tiene a nadie que
          reciba mercadería fuera de ese horario. Cuando la ruta se arma a mano, es fácil perder de vista estas
          restricciones y terminar armando un recorrido que, aunque parezca lógico en el mapa, obliga al camión a
          esperar en un lugar o a volver más tarde a otro. Cada una de esas ineficiencias es tiempo y combustible que
          se podrían haber evitado.
        </p>

        <h2>Los costos de transporte no dan tregua</h2>
        <p>
          El combustible representa entre 33% y 35% de la estructura de costos de una distribuidora, según el mismo
          informe de FADEEAC, que también señala que los costos logísticos acumularon una suba de 22,2% en el primer
          semestre de 2026 (índice CEDOL-UTN). No es un solo componente el que empuja: detrás del combustible, los
          peajes subieron 8,26% en marzo por los incrementos en los accesos a CABA. Es la combinación de varios
          costos moviéndose al mismo tiempo lo que explica por qué una ruta ineficiente, que antes pasaba
          desapercibida, hoy se nota en el cierre del mes.
        </p>

        <h2>Qué cambia con una ruta armada por IA en vez de a mano</h2>
        <p>
          El módulo de rutas de Dataria no reemplaza el conocimiento de tus choferes sobre la calle — cruza los
          pedidos del día, la ventana horaria de cada cliente y la capacidad de carga de cada camión, teniendo en
          cuenta restricciones reales como el tránsito pesado, para armar la vuelta más corta posible sin perder
          entregas ni forzar horarios que tus clientes no aceptan. Con los costos de transporte en los niveles
          actuales, ese ajuste de recorrido deja de ser un detalle y pasa a ser parte del margen operativo de la
          distribuidora.
        </p>
      </ArticleProse>
      <BlogCTA industria={meta.industria} industriaHref={meta.industriaHref} />
      <BlogSchema slug={meta.slug} title={meta.title} excerpt={meta.excerpt} date={meta.date} />
    </main>
  )
}
