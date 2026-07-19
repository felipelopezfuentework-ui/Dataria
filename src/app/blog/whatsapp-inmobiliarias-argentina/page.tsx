import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/industry/Breadcrumb'
import { BlogHeader } from '@/components/blog/BlogHeader'
import { ArticleProse } from '@/components/blog/ArticleProse'
import { BlogCTA } from '@/components/blog/BlogCTA'
import { BlogSchema } from '@/components/blog/BlogSchema'
import { posts } from '../posts-meta'

const meta = posts.find((p) => p.slug === 'whatsapp-inmobiliarias-argentina')!

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
          Las ventas de inmuebles cayeron casi 8% en la Provincia de Buenos Aires durante el primer semestre de 2026:
          se escrituraron 55.035 propiedades, contra 59.672 en el mismo período de 2025, según el{' '}
          <a href="https://www.laplata1.com/2026-07-17/las-ventas-de-inmuebles-cayeron-casi-8-en-la-provincia-y-se-desploman-los-creditos-hipotecarios-124870/" target="_blank" rel="noopener noreferrer">
            Colegio de Escribanos bonaerense
          </a>
          . La caída fue mucho más marcada en las operaciones con crédito hipotecario, que bajaron 32,6% (6.913
          contra 10.261). Guillermo Longhi, presidente del Colegio, señaló que sigue siendo necesario fortalecer el
          crédito hipotecario para lograr una consolidación de las estadísticas del sector. Mientras tanto, el
          WhatsApp de cualquier inmobiliaria sigue recibiendo consultas todo el día — la mayoría de gente que mira
          precios, compara zonas o recién está averiguando, sin ninguna intención inmediata de comprar. La paradoja
          es esa: más mensajes, menos operaciones. El problema no es la cantidad de consultas — es no poder
          distinguir cuáles son reales.
        </p>

        <h2>Por qué el freno del crédito complica más de lo que parece</h2>
        <p>
          Durante 2025, el regreso del crédito hipotecario UVA impulsó una recuperación fuerte del mercado
          inmobiliario. La otra cara de esa historia es que, cuando el crédito se enfría como en este primer semestre
          de 2026, buena parte de la gente que sigue escribiendo por WhatsApp ya no califica para comprar — está
          averiguando, comparando, o esperando que las condiciones cambien. La cantidad de consultas no baja, pero la
          proporción de consultas que realmente pueden convertirse en una operación, sí.
        </p>

        <h2>Responder rápido no es lo mismo que vender</h2>
        <p>
          Cuando entrar en contacto es tan fácil como mandar un WhatsApp, el compromiso de quien pregunta es mínimo.
          El error común es tratar cada consulta con la misma dedicación: un agente inmobiliario puede pasar horas
          respondiendo preguntas repetidas sobre precio, ubicación o disponibilidad a personas que todavía no tienen
          ni presupuesto definido ni intención real de avanzar — tiempo comercial que no está disponible para el lead
          que sí está en condiciones de comprar.
        </p>

        <h2>Filtrar antes de responder, no responder más rápido</h2>
        <p>
          El agente de IA de Dataria conversa por WhatsApp de forma natural y hace las preguntas que un vendedor
          haría de entrada: presupuesto, zona, si tiene crédito preaprobado o paga en efectivo. Recién ahí deriva al
          agente humano — y solo a los leads con intención real de compra, agendando la visita directamente. En un
          mercado donde las operaciones bajaron casi 8%, no hace falta más consultas: hace falta no gastar el tiempo
          comercial en las que no van a cerrar.
        </p>
      </ArticleProse>
      <BlogCTA industria={meta.industria} industriaHref={meta.industriaHref} />
      <BlogSchema slug={meta.slug} title={meta.title} excerpt={meta.excerpt} date={meta.date} />
    </main>
  )
}
