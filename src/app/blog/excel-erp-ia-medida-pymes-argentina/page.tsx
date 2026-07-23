import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/industry/Breadcrumb'
import { BlogHeader } from '@/components/blog/BlogHeader'
import { ArticleProse } from '@/components/blog/ArticleProse'
import { BlogSchema } from '@/components/blog/BlogSchema'
import { posts } from '../posts-meta'

const meta = posts.find((p) => p.slug === 'excel-erp-ia-medida-pymes-argentina')!

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
          Un estudio de FUNDAR, la Universidad Torcuato Di Tella, el Observatorio PYME y el BID, hecho sobre más de
          400 empresas, encontró que el 42% de las pymes argentinas ya usa inteligencia artificial en alguna etapa de
          su operación. Suena a buena noticia, pero el detalle importa: casi el 80% de ese uso es para generar
          contenido (textos, imágenes, redes), y apenas un 18% automatiza decisiones productivas de verdad. En
          logística, el área con más tareas manuales repetitivas de todas, la adopción cae al 6%, según{' '}
          <a href="https://www.infobae.com/economia/2026/05/05/las-pymes-argentinas-apuestan-por-la-inteligencia-artificial-para-agilizar-gestiones/" target="_blank" rel="noopener noreferrer">
            Infobae
          </a>
          . La brecha no es de interés — es de foco: la mayoría de las pymes están usando IA para lo más visible
          (marketing) y dejando afuera lo que más tiempo y plata les cuesta (operaciones).
        </p>

        <h2>Por qué las planillas sueltas no aguantan más</h2>
        <p>
          El punto de partida típico sigue siendo Excel. Un estudio ya clásico del profesor Ray Panko, de la
          Universidad de Hawaii, encontró que el 88% de las hojas de cálculo en uso real contienen al menos un
          error — y en las planillas grandes, con miles de fórmulas, los errores no detectados se cuentan de a
          docenas. En una pyme, eso se traduce en algo muy concreto: ventas, depósito y administración terminan
          operando sobre datos sueltos, cada área con su propia versión de la realidad, en archivos que no se cruzan
          entre sí. No es un problema de prolijidad — es estructural: Excel no fue pensado para centralizar datos
          operativos de un negocio completo, fue pensado para calcular.
        </p>

        <h2>Por qué un ERP tampoco es la respuesta automática</h2>
        <p>
          La alternativa clásica al Excel desordenado es contratar un ERP. El problema es que la mayoría de los ERP
          tradicionales se diseñaron para empresas grandes con procesos ya estandarizados — asumen que tu negocio
          funciona como el de otros miles de clientes del mismo software. En una pyme, donde los procesos se arman a
          criterio del dueño y van cambiando, esa asunción falla seguido: según el reporte anual de{' '}
          <a href="https://www.erp-spain.com/articulo/65877/erp/un-estudio-realizado-por-panorama-consulting-group-revelo-que-las-implementaciones-erp-suelen-llevar-mas-tiempo-y-dinero-del-previsto" target="_blank" rel="noopener noreferrer">
            Panorama Consulting
          </a>
          , el 21% de las empresas describe su implementación de ERP más reciente como fallida, el 75% se pasa del
          tiempo planeado y más del 55% se pasa del presupuesto — en empresas chicas, la implementación suele llevar
          entre 3 y 6 meses igual. No es que el ERP sea malo — es que termina adaptando el negocio al software, en
          vez de al revés.
        </p>

        <h2>Cuándo conviene cada alternativa</h2>
        <div className="overflow-x-auto my-6 rounded-xl border border-borde">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-borde">
                <th className="p-3 font-semibold text-carbon">Criterio</th>
                <th className="p-3 font-semibold text-carbon">Excel / planillas sueltas</th>
                <th className="p-3 font-semibold text-carbon">ERP tradicional</th>
                <th className="p-3 font-semibold text-carbon">Módulo de IA a medida</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-borde">
                <td className="p-3 font-medium text-carbon">Ideal para</td>
                <td className="p-3 text-texto-sec">Operaciones muy chicas o recién arrancando</td>
                <td className="p-3 text-texto-sec">Empresas grandes con procesos ya estandarizados</td>
                <td className="p-3 text-texto-sec">Pymes que quieren automatizar sin rehacer todo de cero</td>
              </tr>
              <tr className="border-b border-borde">
                <td className="p-3 font-medium text-carbon">Punto débil</td>
                <td className="p-3 text-texto-sec">88% de las planillas tiene errores; datos sueltos entre áreas</td>
                <td className="p-3 text-texto-sec">Costo alto, 75% se atrasa, 55% se pasa de presupuesto</td>
                <td className="p-3 text-texto-sec">Necesita datos mínimos de partida (Excel, PDF o un sistema actual)</td>
              </tr>
              <tr className="border-b border-borde">
                <td className="p-3 font-medium text-carbon">Tiempo típico</td>
                <td className="p-3 text-texto-sec">Inmediato (a mano)</td>
                <td className="p-3 text-texto-sec">3 a 6 meses en empresas chicas</td>
                <td className="p-3 text-texto-sec">2 a 4 semanas por módulo</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-carbon">Acompañamiento</td>
                <td className="p-3 text-texto-sec">Ninguno, es manual</td>
                <td className="p-3 text-texto-sec">Consultoría cara o autoservicio</td>
                <td className="p-3 text-texto-sec">Configuración, integración y capacitación incluidas</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          En resumen: Excel sirve para calcular, un ERP sirve para estandarizar procesos rígidos, y un módulo de IA
          a medida sirve para automatizar decisiones operativas sobre la forma real en que ya trabaja tu negocio.
        </p>

        <h2>El camino intermedio: un módulo que arranca donde ya estás</h2>
        <p>
          Acá está el dato que más explica por qué la adopción de IA en pymes argentinas se estancó en marketing y
          no llegó a operaciones: una de las analistas del estudio de FUNDAR, María Migliore, lo resume así: &ldquo;es
          mucho más fácil incorporar inteligencia artificial cuando las empresas ya están digitalizadas de alguna
          manera&rdquo;. El problema no es que las pymes no quieran automatizar sus operaciones — es que saltar
          directo de una planilla suelta a un sistema complejo es un salto demasiado grande, sin apoyo estatal,
          capacitación ni fondos dedicados, según la misma Migliore.
        </p>
        <p>
          En Dataria trabajamos justamente con esa lógica: en vez de forzar una migración completa de sistemas que
          lleva meses, armamos e integramos un módulo de IA específico para resolver un cuello de botella concreto
          (costos, rutas, CRM, stock) sobre los datos que tu pyme ya tiene hoy — una planilla de Excel, un reporte de
          tu sistema de gestión, una factura en PDF. Nos encargamos de toda la configuración, integración y
          capacitación: tu equipo no necesita programar ni administrar nada técnico.
        </p>
      </ArticleProse>
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-carbon mb-3 tracking-[-0.01em]">
            ¿Querés ver un módulo funcionando en tu negocio?
          </h2>
          <p className="text-texto-sec mb-6">
            Elegí tu rubro y probá la demo en vivo de Dataria, sin costo y sin registrarte.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center h-[46px] px-6 rounded-[10px] bg-gradient-dataria text-white font-semibold tracking-[0.02em] text-[15px] shadow-primary hover:!bg-[#1B5BC1] hover:!bg-none transition-all duration-150"
          >
            Ver los 4 módulos
          </Link>
        </div>
      </section>
      <BlogSchema slug={meta.slug} title={meta.title} excerpt={meta.excerpt} date={meta.date} />
    </main>
  )
}
