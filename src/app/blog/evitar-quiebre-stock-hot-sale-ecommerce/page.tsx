import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/industry/Breadcrumb'
import { BlogHeader } from '@/components/blog/BlogHeader'
import { ArticleProse } from '@/components/blog/ArticleProse'
import { BlogCTA } from '@/components/blog/BlogCTA'
import { BlogSchema } from '@/components/blog/BlogSchema'
import { posts } from '../posts-meta'

const meta = posts.find((p) => p.slug === 'evitar-quiebre-stock-hot-sale-ecommerce')!

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
          El comercio electrónico argentino facturó cerca de $35 billones de pesos durante 2025 — un 55% más que en
          2024 y por encima de la inflación anual, según el{' '}
          <a href="https://cace.org.ar/blogs/news/el-ecommerce-alcanzo-los-35-3-billones-de-pesos-durante-2025-y-crecio-por-encima-de-la-inflacion" target="_blank" rel="noopener noreferrer">
            Estudio Anual 2025 de la Cámara Argentina de Comercio Electrónico (CACE)
          </a>
          . Pero el dato que más importa para una pyme no es la facturación total: las órdenes de compra crecieron
          apenas 3% interanual, mientras que el ticket promedio subió 46% (a $134.519). El comprador argentino no
          compra más veces — compra más caro cada vez, y es más exigente con lo que recibe. En ese contexto, quedarte
          sin stock de un producto que se vendió en un pico de demanda (como el Hot Sale) ya no es perder una venta
          chica: es perder una venta grande, además de una cancelación, una posible penalización de la plataforma y
          un cliente que no vuelve.
        </p>

        <h2>Crecer en facturación no es lo mismo que crecer en volumen</h2>
        <p>
          Si el número de órdenes casi no se mueve pero cada una vale mucho más, cada decisión de stock pesa más que
          antes. Sobrestockearte inmoviliza plata que una pyme necesita para otras cosas; quedarte corto en el
          momento equivocado te hace perder exactamente las ventas grandes que explican el crecimiento del sector.
          Ya no alcanza con mirar el stock de hoy — hace falta anticipar qué se va a mover en los próximos días.
        </p>

        <h2>El costo real de un quiebre de stock en el pico de demanda</h2>
        <p>
          En fechas como el Hot Sale o el CyberMonday, las ventas de una pyme pueden multiplicarse varias veces en
          apenas 48 horas. Vender un producto que en ese momento no tenés en el depósito no es solo una venta
          perdida: implica cancelar el pedido, una posible sanción de la plataforma (Mercado Libre penaliza el
          incumplimiento de entregas) y un cliente que probablemente no vuelva a comprarte a vos la próxima vez.
        </p>

        <h2>Predecir, no solo registrar, lo que tenés en depósito</h2>
        <p>
          El panel de stock de Dataria no se limita a mostrar cuánto tenés hoy — analiza tu historial de ventas, la
          estacionalidad de cada producto y cómo se comportó tu catálogo en eventos anteriores para sugerirte qué
          stock preparar antes de un pico de demanda. La idea no es acertar a la perfección, es reducir el margen de
          error entre lo que vas a necesitar y lo que realmente tenés en el depósito.
        </p>
      </ArticleProse>
      <BlogCTA industria={meta.industria} industriaHref={meta.industriaHref} />
      <BlogSchema slug={meta.slug} title={meta.title} excerpt={meta.excerpt} date={meta.date} />
    </main>
  )
}
