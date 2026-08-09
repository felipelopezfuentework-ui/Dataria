import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/industry/Breadcrumb'

export const metadata: Metadata = {
  title: 'Condiciones del Servicio | Dataria',
  description:
    'Condiciones de uso del sitio dataria.work y de los servicios de Dataria: alcance de las demos, propiedad intelectual, responsabilidad y jurisdicción aplicable.',
  alternates: { canonical: 'https://www.dataria.work/terminos' },
}

const ULTIMA_ACTUALIZACION = '9 de agosto de 2026'

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl md:text-3xl font-bold text-carbon mt-14 mb-4 tracking-[-0.02em] scroll-mt-24">
      {children}
    </h2>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-texto-sec leading-relaxed mb-4">{children}</p>
}

function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 space-y-2 text-texto-sec leading-relaxed mb-4">{children}</ul>
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-azul-accion underline underline-offset-2 hover:no-underline"
    >
      {children}
    </a>
  )
}

export default function TerminosPage() {
  return (
    <main>
      <Breadcrumb current="Condiciones del Servicio" />

      <section className="pt-10 pb-12 bg-gradient-hero">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-carbon mb-4 tracking-[-0.03em]">
            Condiciones del Servicio
          </h1>
          <p className="text-lg text-texto-sec">
            Las reglas de uso del sitio dataria.work, qué alcance tienen las demos y qué podés esperar si contratás
            nuestros servicios.
          </p>
          <p className="text-sm text-texto-sec mt-4">Última actualización: {ULTIMA_ACTUALIZACION}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="rounded-xl border border-borde bg-white p-6 mb-10 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-widest text-azul-accion mb-3">En resumen</p>
            <UL>
              <li>El sitio y sus demos son informativos y gratuitos: probarlos no genera ninguna obligación para vos.</li>
              <li>Las demos usan datos ficticios de ejemplo. No son una herramienta de producción ni sirven para tomar decisiones reales.</li>
              <li>Cada proyecto se rige por su propio presupuesto y acuerdo firmado, que prevalece sobre esta página.</li>
              <li>El contenido del sitio es de Dataria; lo que vos nos contás sobre tu negocio sigue siendo tuyo.</li>
            </UL>
          </div>

          <H2>1. Quiénes somos y qué alcanzan estas condiciones</H2>
          <P>
            Estas Condiciones del Servicio regulan el acceso y uso del sitio web{' '}
            <A href="https://www.dataria.work">https://www.dataria.work</A> y de sus subpáginas, operado por Dataria
            («Dataria», «nosotros»), con actividad en la Provincia de Buenos Aires, Argentina.
          </P>
          <P>
            Al navegar el sitio, usar las demostraciones interactivas o enviarnos una consulta, aceptás estas
            condiciones. Si no estás de acuerdo, por favor no uses el sitio.
          </P>
          <P>
            Estas condiciones aplican al <strong>sitio web</strong>. La prestación de servicios contratados se rige por
            el presupuesto y el acuerdo particular que firmemos en cada caso, que prevalece sobre este documento en caso
            de discrepancia.
          </P>

          <H2>2. Qué ofrece Dataria</H2>
          <P>
            Dataria desarrolla módulos de inteligencia artificial a medida para pymes y autónomos en Argentina,
            organizados por industria: gastronomía, distribuidoras, inmobiliarias y e-commerce. El sitio cumple una
            función informativa y comercial: mostrar qué hacemos, permitirte probar demostraciones y ofrecerte un canal
            para contactarnos.
          </P>
          <P>
            El uso del sitio y de sus demostraciones es <strong>gratuito y sin registro</strong>. No genera ninguna
            obligación de contratación de tu parte ni de prestación de servicios de la nuestra.
          </P>

          <H2>3. Las demostraciones interactivas</H2>
          <P>Este punto es importante y queremos que quede claro:</P>
          <UL>
            <li>
              Las demos (food cost, control de stock, rutas de reparto, planificador de turnos, CRM, agente de pedidos y
              demás) funcionan con <strong>datos ficticios de ejemplo</strong>. Los insumos, precios, clientes y rutas
              que ves son inventados para ilustrar el funcionamiento.
            </li>
            <li>
              Los resultados que arrojan <strong>no constituyen asesoramiento profesional</strong> de ningún tipo:
              ni contable, ni impositivo, ni logístico, ni comercial. No tomes decisiones de tu negocio basándote en
              ellos.
            </li>
            <li>
              No cargues información real, confidencial ni datos personales de terceros en las demos. Están pensadas
              para explorar, no para operar.
            </li>
            <li>
              Las demos pueden modificarse, limitarse o discontinuarse en cualquier momento y sin aviso previo, porque
              son material de muestra y no un servicio contratado.
            </li>
            <li>
              Algunas demos se apoyan en modelos de lenguaje de terceros. Como toda tecnología de este tipo, pueden
              producir respuestas imprecisas. No garantizamos exactitud en sus resultados.
            </li>
          </UL>

          <H2>4. Uso permitido del sitio</H2>
          <P>Te pedimos que uses el sitio de buena fe. En particular, no está permitido:</P>
          <UL>
            <li>Intentar acceder a áreas o sistemas no destinados al público.</li>
            <li>Interferir con el funcionamiento normal del sitio, sobrecargarlo o hacer un uso automatizado abusivo de las demos o del formulario.</li>
            <li>Extraer contenido de forma masiva y automatizada con fines comerciales.</li>
            <li>Suplantar la identidad de otra persona o empresa al contactarnos.</li>
            <li>Usar el sitio con cualquier finalidad ilícita o contraria a estas condiciones.</li>
          </UL>
          <P>
            Aplicamos límites de uso por dirección IP en las demos para prevenir el abuso. Podemos restringir el acceso
            a quien incumpla estas reglas.
          </P>

          <H2>5. Propiedad intelectual</H2>
          <P>
            El contenido del sitio —textos, diseño, marca, logotipo, código, demostraciones y material del blog— es
            propiedad de Dataria o se usa con autorización. No se permite su reproducción, distribución ni explotación
            comercial sin nuestro consentimiento previo por escrito.
          </P>
          <P>
            Podés citar fragmentos del blog mencionando la fuente y enlazando a la página original. Eso nos parece bien
            y no requiere permiso.
          </P>
          <P>
            <strong>Tu información sigue siendo tuya.</strong> Lo que nos contás sobre tu negocio, tus procesos y tus
            datos al consultarnos o durante un proyecto no pasa a ser nuestro. En los proyectos contratados, la
            titularidad de los datos y los alcances sobre los desarrollos se definen en el acuerdo particular.
          </P>

          <H2>6. Testimonios y casos mencionados</H2>
          <P>
            Los testimonios publicados corresponden a clientes reales de Dataria y fueron autorizados por ellos. Los
            resultados descriptos son los de esos negocios en particular y{' '}
            <strong>no constituyen una promesa de resultados equivalentes</strong> para otros: cada operación tiene su
            propio punto de partida, sus datos y su contexto.
          </P>

          <H2>7. Disponibilidad y cambios</H2>
          <P>
            Procuramos que el sitio esté disponible de forma continua, pero no garantizamos ausencia de interrupciones.
            Puede haber cortes por mantenimiento, actualizaciones o fallas de los proveedores de infraestructura.
          </P>
          <P>
            Podemos modificar, agregar o retirar contenidos, demostraciones y funcionalidades en cualquier momento.
          </P>

          <H2>8. Limitación de responsabilidad</H2>
          <P>
            El sitio y sus demostraciones se ofrecen «tal como están», con fines informativos. En la máxima medida
            permitida por la legislación argentina, Dataria no será responsable por daños indirectos, lucro cesante ni
            pérdida de datos derivados del uso del sitio o de decisiones tomadas a partir de la información o de las
            demostraciones publicadas.
          </P>
          <P>
            Nada en estas condiciones limita los derechos que la legislación de defensa del consumidor te reconozca
            cuando resulte aplicable, ni la responsabilidad por dolo o culpa grave.
          </P>

          <H2>9. Enlaces y servicios de terceros</H2>
          <P>
            El sitio enlaza a servicios externos como WhatsApp, Google Calendar y LinkedIn, y se apoya en proveedores de
            infraestructura y análisis. No controlamos esos servicios ni respondemos por sus contenidos o
            disponibilidad. El uso que hagas de ellos se rige por sus propias condiciones.
          </P>

          <H2>10. Privacidad</H2>
          <P>
            El tratamiento de datos personales está descripto en nuestra{' '}
            <Link href="/privacidad" className="text-azul-accion underline underline-offset-2 hover:no-underline">
              Política de Privacidad
            </Link>
            , que forma parte integrante de estas condiciones.
          </P>

          <H2>11. Contratación de servicios</H2>
          <P>
            Los contenidos del sitio no constituyen una oferta contractual vinculante. Toda contratación requiere un
            presupuesto específico aceptado por escrito, donde se detallan alcance, plazos, precio, condiciones de pago
            y responsabilidades de cada parte. Los precios se informan en cada propuesta; el sitio no publica una lista
            de precios.
          </P>

          <H2>12. Modificaciones de estas condiciones</H2>
          <P>
            Podemos actualizar estas condiciones para reflejar cambios en nuestros servicios o en la normativa
            aplicable. La versión vigente será siempre la publicada en esta dirección, con su fecha de actualización.
            El uso del sitio con posterioridad a una modificación implica su aceptación.
          </P>

          <H2>13. Ley aplicable y jurisdicción</H2>
          <P>
            Estas condiciones se rigen por las leyes de la República Argentina. Ante cualquier controversia, las partes
            se someten a los tribunales ordinarios competentes de la Provincia de Buenos Aires, sin perjuicio del fuero
            que corresponda cuando resulte aplicable la normativa de defensa del consumidor.
          </P>

          <H2>14. Contacto</H2>
          <P>
            Ante cualquier duda sobre estas condiciones, escribinos a{' '}
            <A href="mailto:datariaai@gmail.com">datariaai@gmail.com</A> o por{' '}
            <A href="https://wa.me/5491134881235">WhatsApp al +54 9 11 3488 1235</A>.
          </P>

          <div className="mt-14 pt-8 border-t border-borde flex flex-wrap gap-6">
            <Link href="/" className="text-azul-accion font-bold hover:underline underline-offset-4">
              ← Volver al inicio
            </Link>
            <Link href="/privacidad" className="text-azul-accion font-bold hover:underline underline-offset-4">
              Política de Privacidad →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
