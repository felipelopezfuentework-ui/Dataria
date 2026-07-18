import type { Metadata } from 'next'
import { IndustryHero } from '@/components/industry/IndustryHero'
import { Breadcrumb } from '@/components/industry/Breadcrumb'
import { IndustryIntegrations } from '@/components/industry/IndustryIntegrations'
import { IndustryHowItWorks } from '@/components/industry/IndustryHowItWorks'
import { IndustryFAQ } from '@/components/industry/IndustryFAQ'
import { IndustrySchema } from '@/components/industry/IndustrySchema'
import CTAReunion from '@/components/home/CTAReunion'
import { InmobiliariasDemos } from './demos-client'

export const metadata: Metadata = {
  title: 'Inteligencia Artificial para Inmobiliarias en Argentina | Dataria',
  description: 'CRM, agente de consultas y agenda de visitas con IA para inmobiliarias en Argentina. Filtrá interesados y redactá fichas más rápido. Probá la demo antes de contratar.',
  alternates: { canonical: 'https://www.dataria.work/inmobiliarias' },
}

const faqs = [
  {
    q: '¿La IA publica las propiedades directamente en los portales por mí?',
    a: 'No de forma directa, porque portales como Zonaprop o Argenprop tienen sus propias reglas de acceso. Lo que hace Dataria es generarte el título, la descripción optimizada y las etiquetas listas para copiar y pegar en tu CRM o portal.',
  },
  {
    q: '¿Cómo tasa una propiedad la IA si el mercado argentino es tan inestable?',
    a: 'La IA no reemplaza tu criterio. Analiza publicaciones similares activas en la misma zona y te entrega un informe comparativo de precios como punto de partida sólido, no como precio final.',
  },
  {
    q: '¿El bot de WhatsApp para filtrar interesados puede agendar visitas solo?',
    a: 'Sí. Se configura con las preguntas filtro que vos decidas (presupuesto, garantía, mascotas). Si el interesado cumple los requisitos, el bot le ofrece los días y horarios que tengas disponibles en tu agenda.',
  },
]

const steps = [
  {
    num: '01',
    name: 'Setup',
    tag: 'Desarrollo inicial',
    desc: 'Diagnosticamos cómo gestionás hoy tus consultas, propiedades y visitas, y armamos el módulo de CRM, agente de consultas o agenda integrado a tu forma de trabajar. Entregamos en semanas, no en meses.',
    items: ['Diagnóstico de cartera y flujo de consultas actual', 'Capacitación del equipo comercial', 'Carga inicial de propiedades y contactos'],
  },
  {
    num: '02',
    name: 'Seguimiento',
    tag: 'Mensual',
    desc: 'Soporte técnico continuo, actualización de modelos y garantía de funcionamiento 24/7. Vos cerrás operaciones; nosotros mantenemos el sistema al día.',
    items: ['Soporte y monitoreo continuo', 'Optimización de respuestas del agente', 'Cobertura de conexiones y seguridad'],
  },
  {
    num: '03',
    name: 'Expansión',
    tag: 'A demanda',
    desc: 'Sumá agenda de visitas, agente de consultas u otros módulos cuando tu cartera crezca, sin rehacer lo ya implementado.',
    items: ['Nuevos módulos inmobiliarios', 'Integraciones con otras plataformas', 'Misma implementación, más alcance'],
  },
]

export default function InmobiliariasPage() {
  return (
    <main>
      <Breadcrumb current="Inmobiliarias" />
      <IndustryHero
        titleLine1="Inteligencia Artificial para"
        titleLine2="inmobiliarias en Argentina"
        subtitle="Filtrá consultas, redactá fichas y coordiná visitas con IA — más tiempo para cerrar, menos para tareas repetitivas."
      />
      <InmobiliariasDemos />
      <IndustryIntegrations
        heading="Potenciá tu CRM"
        body="Generamos descripciones optimizadas y respuestas listas para que uses en Tokko Broker, o para publicar directamente en Zonaprop y Argenprop."
        tools={['Tokko Broker', 'Zonaprop', 'Argenprop']}
      />
      <IndustryHowItWorks steps={steps} />
      <CTAReunion />
      <IndustryFAQ faqs={faqs} />
      <IndustrySchema
        path="/inmobiliarias"
        serviceName="Herramientas de IA para inmobiliarias"
        serviceDescription="Módulos de inteligencia artificial a medida para inmobiliarias en Argentina: CRM, agente de consultas por WhatsApp y agenda de visitas."
        breadcrumbCurrent="Inmobiliarias"
        faqs={faqs}
      />
    </main>
  )
}
