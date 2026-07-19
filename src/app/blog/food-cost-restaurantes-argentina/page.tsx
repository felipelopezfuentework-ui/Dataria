import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/industry/Breadcrumb'
import { BlogHeader } from '@/components/blog/BlogHeader'
import { ArticleProse } from '@/components/blog/ArticleProse'
import { BlogCTA } from '@/components/blog/BlogCTA'
import { BlogSchema } from '@/components/blog/BlogSchema'
import { posts } from '../posts-meta'

const meta = posts.find((p) => p.slug === 'food-cost-restaurantes-argentina')!

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
          El consumo en bares y restaurantes de Argentina cayó hasta un 40% en los últimos dos años, según el
          vicepresidente de la Asociación de Hoteles, Restaurantes, Confiterías y Cafés (AHRCC), Carlos Yanelli,
          citado por{' '}
          <a href="https://www.ambito.com/negocios/bares-y-restaurantes-pierden-40-clientes-dos-anos-no-vemos-una-luz-al-final-del-tunel-advierten-el-sector-n6300343" target="_blank" rel="noopener noreferrer">
            Ámbito Financiero
          </a>
          : &ldquo;Hay una merma de un 40%. Estamos muy desconcertados y muy preocupados porque no vemos una luz al
          final del túnel&rdquo;. En simultáneo, según el Índice de Precios al Consumidor del INDEC, la carne picada
          subió más de 55% interanual y el aceite de girasol más de 51% — muy por encima de la inflación general. El
          resultado es una tijera que aprieta desde los dos lados: menos clientes, y cada uno de los que quedan
          cuesta más servirlo. En ese escenario, calcular el food cost &ldquo;a ojo&rdquo; una vez por mes ya no
          alcanza: hace falta saber, plato por plato, qué está perdiendo margen antes de que termine el mes, no
          después.
        </p>

        <h2>Por qué no alcanza con subir los precios de la carta</h2>
        <p>
          La respuesta clásica ante el aumento de costos —subir precios— choca con un problema: la demanda ya viene
          cayendo. Si un plato sube de precio y el cliente que hoy dudaba entre ir o no, decide no ir, terminás
          vendiendo menos unidades a un precio más alto y perdiendo igual. Por eso el sector viene ajustando por otro
          lado: menús ejecutivos, promociones con bancos y tarjetas, y sobre todo, un control mucho más fino de qué
          insumos están realmente pegando en cada plato — no en la carta en general, sino plato por plato.
        </p>

        <h2>La carne y el aceite no esperan a fin de mes</h2>
        <p>
          Los datos del INDEC muestran algo más incómodo todavía: en los primeros cinco meses de 2026, los precios al
          productor de carne subieron 14,1%, mientras que al consumidor subieron 20,6% en el mismo período — y en el
          acumulado de los últimos doce meses, la brecha se agranda (45,6% productor vs. 57,1% consumidor, según
          datos recopilados por{' '}
          <a href="https://www.infobae.com/economia/2026/06/12/la-inflacion-de-mayo-cuales-son-los-diez-alimentos-que-mas-aumentaron/" target="_blank" rel="noopener noreferrer">
            Infobae
          </a>
          ). En criollo: lo que te llega en la factura del proveedor se mueve más rápido y más fuerte que el número
          de inflación general que sale una vez al mes. Si tu escandallo se actualiza recién cuando sale el dato
          oficial, ya estás un paso atrás — el mes ya lo perdiste.
        </p>

        <h2>El food cost no debería ser una tarea de fin de mes</h2>
        <p>
          La solución no es dejar de mirar la carta, sino mirarla más seguido y con menos esfuerzo manual. El módulo
          de food cost de Dataria lee las facturas de tus proveedores (Excel, PDF o los reportes de tu sistema de
          gestión) y recalcula automáticamente el costo real de cada receta cada vez que cambia un precio —
          detectando qué insumos subieron por encima del promedio y qué platos puntuales están perdiendo margen,
          antes de que termine el mes. No reemplaza tu criterio como dueño del local: te da el dato a tiempo para
          decidir con eso.
        </p>
      </ArticleProse>
      <BlogCTA industria={meta.industria} industriaHref={meta.industriaHref} />
      <BlogSchema slug={meta.slug} title={meta.title} excerpt={meta.excerpt} date={meta.date} />
    </main>
  )
}
