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
          Quedarte sin stock de un producto justo cuando más se vende no es un detalle menor — es perder la venta más
          grande del mes, además de una posible cancelación y un cliente que probablemente no vuelva a comprarte.
          Sobrestockearte "por las dudas" tampoco es gratis: es plata inmovilizada que tu pyme podría estar usando
          para otra cosa. Según el Estudio Anual 2025 de la Cámara Argentina de Comercio Electrónico (CACE), el
          e-commerce argentino sigue creciendo, pero sobre todo en lo que cada cliente gasta por compra — la cantidad
          de órdenes casi no se mueve. En criollo: el comprador de hoy compra más caro y es más exigente con lo que
          recibe, así que cada error de stock —de más o de menos— sale más caro que antes.
        </p>

        <h2>Crecer en facturación no es lo mismo que crecer en volumen</h2>
        <p>
          Si la cantidad de ventas casi no cambia pero cada una vale más, cada decisión sobre qué tener en el
          depósito pesa más que antes. Ya no alcanza con mirar el stock de hoy y reaccionar cuando algo se agota —
          hace falta anticipar, con la mayor precisión posible, qué productos puntuales se van a mover en los
          próximos días.
        </p>

        <h2>El momento en el que un error de stock sale más caro</h2>
        <p>
          En fechas de alta demanda como el Hot Sale o el CyberMonday, las ventas de una pyme pueden multiplicarse
          varias veces en apenas 48 horas. Vender ahí un producto que en ese momento no tenés en el depósito no es
          solo una venta perdida: implica cancelar el pedido, una posible sanción de la plataforma por incumplir la
          entrega, y un cliente que probablemente no vuelva. El mismo error de stock, en un día común, pesa mucho
          menos que en esos picos.
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
