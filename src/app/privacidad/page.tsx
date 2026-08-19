import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/industry/Breadcrumb'
import BotonPreferenciasCookies from '@/components/consent/BotonPreferenciasCookies'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Dataria',
  description:
    'Cómo Dataria recolecta, usa, comparte y protege los datos personales en dataria.work. Derechos del titular según la Ley 25.326 de Argentina.',
  alternates: { canonical: 'https://www.dataria.work/privacidad' },
}

const ULTIMA_ACTUALIZACION = '19 de agosto de 2026'

function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="font-display text-2xl md:text-3xl font-bold text-carbon mt-14 mb-4 tracking-[-0.02em] scroll-mt-24"
    >
      {children}
    </h2>
  )
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display text-lg font-bold text-carbon mt-8 mb-3">{children}</h3>
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

export default function PrivacidadPage() {
  return (
    <main>
      <Breadcrumb current="Política de Privacidad" />

      <section className="pt-10 pb-12 bg-gradient-hero">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-carbon mb-4 tracking-[-0.03em]">
            Política de Privacidad
          </h1>
          <p className="text-lg text-texto-sec">
            Qué datos recolectamos en dataria.work, para qué los usamos, con quién los compartimos y cómo podés
            controlarlos.
          </p>
          <p className="text-sm text-texto-sec mt-4">Última actualización: {ULTIMA_ACTUALIZACION}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="rounded-xl border border-borde bg-white p-6 mb-10 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-widest text-azul-accion mb-3">En resumen</p>
            <UL>
              <li>Solo recolectamos los datos que nos dejás en el formulario de contacto y datos de navegación anónimos o seudonimizados.</li>
              <li>No vendemos ni alquilamos datos personales a nadie, bajo ninguna circunstancia.</li>
              <li>Usamos Google Analytics 4 para entender qué contenido sirve y medir nuestras campañas, pero <strong>no cargamos ninguna etiqueta hasta que lo aceptes</strong> en el banner de cookies. Si rechazás, el sitio funciona igual.</li>
              <li>Las demos de la web funcionan con datos ficticios: no te pedimos información real para probarlas.</li>
              <li>Podés pedirnos acceso, corrección o eliminación de tus datos escribiendo a <A href="mailto:datariaai@gmail.com">datariaai@gmail.com</A>.</li>
            </UL>
          </div>

          <H2>1. Quién es responsable de tus datos</H2>
          <P>
            Dataria (en adelante, «Dataria», «nosotros») es responsable del tratamiento de los datos personales
            recolectados a través del sitio web{' '}
            <A href="https://www.dataria.work">https://www.dataria.work</A> y sus subpáginas.
          </P>
          <P>
            Dataria desarrolla módulos de inteligencia artificial a medida para pymes y autónomos en Argentina. Nuestro
            domicilio de actividad principal está en la Provincia de Buenos Aires, Argentina.
          </P>
          <P>
            <strong>Contacto en materia de privacidad:</strong>{' '}
            <A href="mailto:datariaai@gmail.com">datariaai@gmail.com</A> ·{' '}
            <A href="https://wa.me/5491134881235">WhatsApp +54 9 11 3488 1235</A>
          </P>

          <H2>2. Qué datos recolectamos</H2>

          <H3>2.1. Datos que nos das voluntariamente</H3>
          <P>
            Cuando completás el formulario de contacto de cualquier página del sitio, recolectamos los siguientes
            campos:
          </P>
          <UL>
            <li><strong>Nombre</strong> (obligatorio)</li>
            <li><strong>Correo electrónico</strong> (obligatorio)</li>
            <li><strong>Teléfono o WhatsApp</strong> (obligatorio)</li>
            <li><strong>Empresa o proyecto</strong> (opcional)</li>
            <li><strong>Industria</strong> (opcional)</li>
            <li><strong>Descripción del proceso que querés resolver</strong> (texto libre)</li>
          </UL>
          <P>
            Te pedimos que <strong>no incluyas datos sensibles</strong> en el campo de texto libre: no necesitamos
            información sobre salud, origen racial o étnico, opiniones políticas, convicciones religiosas o filosóficas,
            afiliación sindical, ni datos referentes a la vida sexual. Tampoco necesitamos datos de terceros, números de
            documento, ni información financiera.
          </P>
          <P>
            Si agendás una reunión mediante el botón «Agendar reunión», los datos que cargues quedan registrados en
            Google Calendar bajo las condiciones de Google.
          </P>

          <H3>2.2. Datos de navegación</H3>
          <P>
            <strong>Solo si aceptaste las cookies</strong> en el banner, recolectamos mediante Google Analytics 4 los
            siguientes datos de navegación. Si todavía no decidiste, o si rechazaste, nada de esto se registra:
          </P>
          <UL>
            <li>Páginas visitadas, tiempo de permanencia y recorrido dentro del sitio</li>
            <li>Origen de la visita (buscador, anuncio, enlace directo, red social)</li>
            <li>Tipo de dispositivo, sistema operativo, navegador e idioma</li>
            <li>Ubicación geográfica aproximada, a nivel ciudad o región, derivada de la dirección IP</li>
            <li>Identificadores seudonimizados almacenados en cookies</li>
            <li>Interacciones puntuales que medimos como eventos: envío del formulario, clic en «Agendar reunión» y clic en el enlace de WhatsApp</li>
          </UL>
          <P>
            Google Analytics 4 no almacena la dirección IP completa: la anonimiza antes de registrarla. Nosotros no
            tenemos acceso a direcciones IP individuales de visitantes a través de esa herramienta.
          </P>

          <H3>2.3. Demos interactivas</H3>
          <P>
            Las demostraciones de la web (food cost, control de stock, rutas de reparto, CRM, agente de pedidos y demás)
            funcionan con <strong>datos ficticios de ejemplo</strong>. No te pedimos ni guardamos información real de tu
            negocio para probarlas.
          </P>
          <P>
            La demo del agente de pedidos por WhatsApp procesa los mensajes que escribís mediante la API de{' '}
            <A href="https://www.anthropic.com/legal/privacy">Anthropic</A> para generar la respuesta. Esos mensajes se
            procesan de forma transitoria para producir la respuesta que ves en pantalla y no se asocian a tu identidad.
            Para evitar abuso del servicio aplicamos una limitación por dirección IP, que se conserva únicamente en
            memoria y durante un período breve. <strong>No escribas datos personales reales en esas demos.</strong>
          </P>

          <H2>3. Para qué usamos los datos</H2>
          <UL>
            <li><strong>Responder tu consulta</strong> y coordinar una reunión o propuesta comercial.</li>
            <li><strong>Entender qué contenido resulta útil</strong> y mejorar la estructura y los textos del sitio.</li>
            <li><strong>Medir y optimizar nuestras campañas publicitarias</strong> en Google Ads: saber qué anuncios y qué búsquedas derivan en consultas reales.</li>
            <li><strong>Proteger el sitio</strong> frente a usos abusivos o automatizados.</li>
            <li><strong>Cumplir obligaciones legales</strong> cuando corresponda.</li>
          </UL>
          <P>
            <strong>No</strong> usamos tus datos para tomar decisiones automatizadas que produzcan efectos jurídicos
            sobre vos, ni construimos perfiles individuales de comportamiento con fines distintos a los descriptos.
          </P>

          <H2>4. Base del tratamiento</H2>
          <P>
            El tratamiento se basa en tu <strong>consentimiento libre, expreso e informado</strong>, conforme a los
            artículos 5 y 6 de la Ley N° 25.326 de Protección de los Datos Personales de la República Argentina. Ese
            consentimiento se presta de dos formas distintas e independientes:
          </P>
          <UL>
            <li>
              <strong>Para tus datos de contacto:</strong> al completar y enviar voluntariamente el formulario, después
              de leer el aviso que figura al pie del mismo.
            </li>
            <li>
              <strong>Para las cookies de análisis y publicidad:</strong> al pulsar «Aceptar» en el banner de cookies.
              Hasta ese momento no se carga ninguna etiqueta de terceros. <strong>Seguir navegando no equivale a
              aceptar</strong>, y rechazar no limita el acceso a ninguna parte del sitio.
            </li>
          </UL>
          <P>
            Podés retirar tu consentimiento en cualquier momento, sin que ello afecte la licitud del tratamiento previo:
            para las cookies, desde el enlace «Cookies» del pie de página; para tus datos de contacto, escribiéndonos a{' '}
            <A href="mailto:datariaai@gmail.com">datariaai@gmail.com</A>.
          </P>

          <H2>5. Con quién compartimos los datos</H2>
          <P>
            No vendemos, alquilamos ni cedemos datos personales. Compartimos información únicamente con proveedores que
            actúan como encargados del tratamiento y que necesitamos para que el sitio funcione:
          </P>
          <div className="overflow-x-auto rounded-xl border border-borde mb-6">
            <table className="w-full text-sm min-w-[34rem]">
              <thead>
                <tr className="bg-fondo-suave">
                  <th className="text-left font-bold text-carbon px-4 py-3">Proveedor</th>
                  <th className="text-left font-bold text-carbon px-4 py-3">Para qué</th>
                  <th className="text-left font-bold text-carbon px-4 py-3">Política</th>
                </tr>
              </thead>
              <tbody className="text-texto-sec">
                <tr className="border-t border-borde">
                  <td className="px-4 py-3">Web3Forms</td>
                  <td className="px-4 py-3">Procesar el envío del formulario y remitirlo a nuestro correo</td>
                  <td className="px-4 py-3"><A href="https://web3forms.com/privacy">Ver</A></td>
                </tr>
                <tr className="border-t border-borde">
                  <td className="px-4 py-3">Google (Analytics, Ads, Calendar)</td>
                  <td className="px-4 py-3">Analítica del sitio, medición de campañas y agenda de reuniones</td>
                  <td className="px-4 py-3"><A href="https://policies.google.com/privacy">Ver</A></td>
                </tr>
                <tr className="border-t border-borde">
                  <td className="px-4 py-3">Anthropic</td>
                  <td className="px-4 py-3">Generar las respuestas de la demo del agente de pedidos</td>
                  <td className="px-4 py-3"><A href="https://www.anthropic.com/legal/privacy">Ver</A></td>
                </tr>
                <tr className="border-t border-borde">
                  <td className="px-4 py-3">Vercel</td>
                  <td className="px-4 py-3">Alojamiento del sitio y registros técnicos del servidor</td>
                  <td className="px-4 py-3"><A href="https://vercel.com/legal/privacy-policy">Ver</A></td>
                </tr>
              </tbody>
            </table>
          </div>
          <P>
            También podríamos divulgar información si una autoridad competente nos lo requiere por vía legal, o si
            resulta necesario para ejercer o defender derechos ante un reclamo.
          </P>

          <H2>6. Transferencia internacional de datos</H2>
          <P>
            Los proveedores mencionados almacenan y procesan información en servidores ubicados fuera de la República
            Argentina, principalmente en los Estados Unidos y en la Unión Europea. En el caso de las etiquetas de
            Google, y solo si aceptaste las cookies, los datos de navegación se envían a los dominios{' '}
            <code className="text-xs bg-fondo-suave px-1.5 py-0.5 rounded">analytics.google.com</code> y{' '}
            <code className="text-xs bg-fondo-suave px-1.5 py-0.5 rounded">stats.g.doubleclick.net</code>, operados por
            Google. Al utilizar el sitio y enviar el
            formulario, prestás tu consentimiento para esa transferencia internacional, conforme al artículo 12 de la
            Ley N° 25.326. Estos proveedores aplican cláusulas contractuales y estándares de seguridad reconocidos
            internacionalmente.
          </P>

          <H2 id="cookies">7. Cookies y tecnologías similares</H2>

          <H3>7.1. Nada se carga hasta que aceptás</H3>
          <P>
            Al entrar por primera vez al sitio verás un banner con dos opciones equivalentes: <strong>Aceptar</strong> y{' '}
            <strong>Rechazar</strong>. Hasta que pulses una de las dos, el sitio{' '}
            <strong>no carga ninguna etiqueta de terceros</strong>: no se pide nada a los servidores de Google y no se
            escribe ninguna cookie de análisis ni de publicidad en tu navegador.
          </P>
          <P>
            Técnicamente lo implementamos con el <strong>Modo de consentimiento v2 de Google</strong>: apenas se abre la
            página declaramos como <em>denegados</em> los cuatro estados de consentimiento{' '}
            (<code className="text-xs bg-fondo-suave px-1.5 py-0.5 rounded">analytics_storage</code>,{' '}
            <code className="text-xs bg-fondo-suave px-1.5 py-0.5 rounded">ad_storage</code>,{' '}
            <code className="text-xs bg-fondo-suave px-1.5 py-0.5 rounded">ad_user_data</code> y{' '}
            <code className="text-xs bg-fondo-suave px-1.5 py-0.5 rounded">ad_personalization</code>), y recién si
            aceptás enviamos la actualización que los habilita y se descarga el script de medición.
          </P>
          <P>
            Tu decisión se guarda en el <strong>almacenamiento local de tu navegador</strong>, en la clave{' '}
            <code className="text-xs bg-fondo-suave px-1.5 py-0.5 rounded">dataria-consent-v1</code>. Es un dato técnico
            que queda en tu dispositivo, no se envía a ningún servidor y solo sirve para no volver a preguntarte en cada
            página.
          </P>

          <H3>7.2. Qué cookies se usan, una por una</H3>
          <P>
            Si aceptás, se cargan las siguientes. Ninguna de ellas es necesaria para que el sitio funcione, y podés
            revocarlas cuando quieras:
          </P>
          <div className="overflow-x-auto rounded-xl border border-borde mb-6">
            <table className="w-full text-sm min-w-[42rem]">
              <thead>
                <tr className="bg-fondo-suave">
                  <th className="text-left font-bold text-carbon px-4 py-3">Cookie</th>
                  <th className="text-left font-bold text-carbon px-4 py-3">Servicio y finalidad</th>
                  <th className="text-left font-bold text-carbon px-4 py-3">Duración</th>
                  <th className="text-left font-bold text-carbon px-4 py-3">Quién la trata y dónde</th>
                </tr>
              </thead>
              <tbody className="text-texto-sec align-top">
                <tr className="border-t border-borde">
                  <td className="px-4 py-3"><code className="text-xs">_ga</code></td>
                  <td className="px-4 py-3">
                    <strong>Google Analytics 4</strong> — genera un identificador seudónimo para distinguir visitantes y
                    contar visitas únicas.
                  </td>
                  <td className="px-4 py-3">400 días</td>
                  <td className="px-4 py-3">
                    Google LLC / Google Ireland Ltd. Servidores en Estados Unidos y otros países donde Google opera.
                  </td>
                </tr>
                <tr className="border-t border-borde">
                  <td className="px-4 py-3"><code className="text-xs">_ga_J2675ZE6DY</code></td>
                  <td className="px-4 py-3">
                    <strong>Google Analytics 4</strong> — mantiene el estado de la sesión para la propiedad{' '}
                    <code className="text-xs">G-J2675ZE6DY</code>, la única propiedad de analítica del sitio.
                  </td>
                  <td className="px-4 py-3">400 días</td>
                  <td className="px-4 py-3">
                    Google LLC / Google Ireland Ltd. Servidores en Estados Unidos y otros países donde Google opera.
                  </td>
                </tr>
                <tr className="border-t border-borde">
                  <td className="px-4 py-3"><code className="text-xs">_gcl_au</code></td>
                  <td className="px-4 py-3">
                    <strong>Google Ads</strong> — vinculador de conversiones: permite atribuir una consulta al anuncio
                    que la originó. La deja el mismo script de Google cuando la cuenta de Analytics está vinculada a la
                    de Ads.
                  </td>
                  <td className="px-4 py-3">90 días</td>
                  <td className="px-4 py-3">
                    Google LLC / Google Ireland Ltd. Servidores en Estados Unidos y otros países donde Google opera.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <P>
            Google declara para las dos primeras cookies una duración de 2 años, pero los navegadores actuales la
            recortan: medido sobre este sitio, se guardan por <strong>400 días</strong>.
          </P>
          <P>
            <strong>Sobre Google Ads:</strong> el sitio <strong>no</strong> tiene instalada una etiqueta propia de
            remarketing ni de conversión de Google Ads. La medición de campañas se hace a partir de los eventos de
            Google Analytics 4 descriptos más arriba, con la propiedad vinculada a nuestra cuenta de Google Ads. Por esa
            vinculación, y siempre <strong>después</strong> de que aceptes, el script de Google contacta —además de{' '}
            <code className="text-xs bg-fondo-suave px-1.5 py-0.5 rounded">googletagmanager.com</code>— los dominios{' '}
            <code className="text-xs bg-fondo-suave px-1.5 py-0.5 rounded">analytics.google.com</code> y{' '}
            <code className="text-xs bg-fondo-suave px-1.5 py-0.5 rounded">stats.g.doubleclick.net</code>, este último
            para atribuir conversiones a los anuncios. Si rechazás, ninguno de esos dominios recibe una sola petición.
            Si en el futuro incorporáramos una etiqueta publicitaria adicional, quedaría sujeta exactamente al mismo
            consentimiento previo —no se cargaría sin tu aceptación— y actualizaríamos esta tabla.
          </P>
          <P>
            <strong>Cookies necesarias:</strong> el sitio no usa cookies propias de sesión, de inicio de sesión ni de
            carrito. La única información técnica que guardamos en tu dispositivo es la decisión sobre cookies descripta
            en el punto 7.1, que vive en el almacenamiento local y no viaja en las peticiones al servidor.
          </P>
          <P>
            Podés leer cómo utiliza Google la información de los sitios que usan sus servicios en{' '}
            <A href="https://policies.google.com/technologies/partner-sites">
              Cómo usa Google la información de sitios y apps que usan sus servicios
            </A>{' '}
            y en la <A href="https://policies.google.com/privacy">Política de Privacidad de Google</A>.
          </P>

          <H3>7.3. Cómo revocar o cambiar tu decisión</H3>
          <UL>
            <li>
              <strong>Desde el sitio, en cualquier momento:</strong> pulsá «Cookies» en el pie de página —o{' '}
              <BotonPreferenciasCookies>abrí el banner desde acá</BotonPreferenciasCookies>— y elegí la otra opción. El
              cambio tiene efecto inmediato.
            </li>
            <li>
              <strong>Si rechazás después de haber aceptado</strong>, dejamos de enviar datos y borramos del navegador
              las cookies <code className="text-xs">_ga</code>, <code className="text-xs">_ga_J2675ZE6DY</code>,{' '}
              <code className="text-xs">_gcl_au</code> y cualquier otra que empiece con esos prefijos. Los datos ya
              registrados en Google Analytics permanecen en esa plataforma hasta cumplirse el plazo de retención del
              punto 8; podés pedirnos su eliminación escribiéndonos.
            </li>
            <li>Desde la configuración de tu navegador podés bloquear o eliminar cookies en cualquier momento.</li>
            <li>
              Podés instalar el{' '}
              <A href="https://tools.google.com/dlpage/gaoptout">complemento de inhabilitación de Google Analytics</A>{' '}
              para impedir que tu navegación se registre en cualquier sitio.
            </li>
            <li>
              Podés desactivar la personalización de anuncios de Google desde{' '}
              <A href="https://adssettings.google.com/">Configuración de anuncios de Google</A>, y gestionar la
              publicidad basada en intereses de múltiples proveedores en{' '}
              <A href="https://optout.aboutads.info/">YourAdChoices</A> y{' '}
              <A href="https://www.youronlinechoices.com/">Your Online Choices</A>.
            </li>
          </UL>
          <P>
            Rechazar las cookies <strong>no</strong> limita ninguna función del sitio: podés navegar todas las páginas,
            usar todas las demos y enviarnos una consulta exactamente igual.
          </P>

          <H2>8. Cuánto tiempo conservamos los datos</H2>
          <UL>
            <li>
              <strong>Consultas del formulario:</strong> mientras dure la relación comercial y hasta 5 años después del
              último contacto, plazo razonable para atender reclamos y obligaciones legales.
            </li>
            <li>
              <strong>Datos de Google Analytics:</strong> según la retención configurada en la propiedad, con un máximo
              de 14 meses para datos a nivel de usuario y evento.
            </li>
            <li>
              <strong>Datos de medición de campañas en Google Ads:</strong> según los plazos de conversión configurados,
              hasta 90 días desde el clic.
            </li>
            <li>
              <strong>Mensajes de las demos:</strong> no se conservan luego de generar la respuesta.
            </li>
          </UL>
          <P>Cumplido el plazo, los datos se eliminan o se anonimizan de forma irreversible.</P>

          <H2>9. Tus derechos</H2>
          <P>
            Como titular de los datos, tenés derecho a solicitar el <strong>acceso</strong>, la{' '}
            <strong>rectificación</strong>, la <strong>actualización</strong> y la <strong>supresión</strong> de tus
            datos personales, así como a oponerte a determinados tratamientos y a retirar tu consentimiento.
          </P>
          <P>
            Para ejercerlos, escribinos a <A href="mailto:datariaai@gmail.com">datariaai@gmail.com</A> indicando tu
            nombre y el correo con el que nos contactaste. Respondemos dentro de los 10 días corridos para las
            solicitudes de acceso y dentro de los 5 días hábiles para las de rectificación, actualización o supresión,
            conforme a los artículos 14 y 16 de la Ley N° 25.326.
          </P>
          <div className="rounded-xl border border-borde bg-fondo-suave p-5 mb-4">
            <P>
              El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma
              gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto,
              conforme lo establecido en el artículo 14, inciso 3 de la Ley N° 25.326.
            </P>
            <p className="text-texto-sec leading-relaxed mb-0">
              La <strong>Agencia de Acceso a la Información Pública</strong>, en su carácter de órgano de control de la
              Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten
              afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos
              personales. Podés contactarla en{' '}
              <A href="https://www.argentina.gob.ar/aaip">argentina.gob.ar/aaip</A>.
            </p>
          </div>

          <H2>10. Seguridad de la información</H2>
          <P>
            Aplicamos medidas técnicas y organizativas razonables para proteger los datos: el sitio se sirve
            íntegramente por conexión cifrada HTTPS, el acceso a la casilla que recibe las consultas está protegido con
            verificación en dos pasos, y limitamos el acceso a la información al personal que la necesita para
            responderte.
          </P>
          <P>
            Ningún sistema es completamente infalible. Si tomáramos conocimiento de un incidente de seguridad que afecte
            tus datos personales, te lo notificaremos y daremos aviso a la autoridad de control cuando corresponda.
          </P>

          <H2>11. Menores de edad</H2>
          <P>
            El sitio está dirigido a personas mayores de 18 años que actúan en el marco de una actividad comercial o
            profesional. No recolectamos intencionalmente datos de menores. Si detectamos que recibimos datos de un
            menor sin autorización de sus representantes legales, los eliminamos.
          </P>

          <H2>12. Enlaces a sitios de terceros</H2>
          <P>
            El sitio contiene enlaces a servicios externos, como WhatsApp, Google Calendar, LinkedIn y las políticas de
            los proveedores mencionados. Esta política no cubre esos sitios: te recomendamos revisar sus propias
            condiciones antes de compartir información con ellos.
          </P>

          <H2>13. Cambios en esta política</H2>
          <P>
            Podemos actualizar esta política para reflejar cambios en nuestros servicios o en la normativa aplicable.
            Publicaremos la versión vigente en esta misma dirección y actualizaremos la fecha del encabezado. Si el
            cambio fuera sustancial y afectara tratamientos ya consentidos, te lo comunicaremos por correo electrónico
            cuando tengamos forma de contactarte.
          </P>

          <H2>14. Contacto</H2>
          <P>
            Ante cualquier duda sobre esta política o sobre el tratamiento de tus datos, escribinos a{' '}
            <A href="mailto:datariaai@gmail.com">datariaai@gmail.com</A> o por{' '}
            <A href="https://wa.me/5491134881235">WhatsApp al +54 9 11 3488 1235</A>. Respondemos todas las consultas.
          </P>

          <div className="mt-14 pt-8 border-t border-borde">
            <Link
              href="/"
              className="text-azul-accion font-bold hover:underline underline-offset-4"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
