import type { Metadata } from 'next'
import { IndustryHero } from '@/components/industry/IndustryHero'
import { Breadcrumb } from '@/components/industry/Breadcrumb'
import { IndustryIntegrations } from '@/components/industry/IndustryIntegrations'
import { IndustryHowItWorks } from '@/components/industry/IndustryHowItWorks'
import { IndustryFAQ } from '@/components/industry/IndustryFAQ'
import { IndustrySchema } from '@/components/industry/IndustrySchema'
import CTAReunion from '@/components/home/CTAReunion'
import { DistribuidorasDemos } from './demos-client'

export const metadata: Metadata = {
  title: 'Inteligencia Artificial para Distribuidoras en Argentina | Dataria',
  description: 'Optimización de rutas, predicción de demanda y agente de pedidos por WhatsApp con IA para distribuidoras mayoristas en Argentina. Probá la demo antes de contratar.',
  alternates: { canonical: 'https://www.dataria.work/distribuidoras' },
}

const faqs = [
  {
    q: '¿Cómo se conecta la IA con nuestro sistema de facturación (por ejemplo Tango)?',
    a: 'No tocamos tu base de datos directamente. Solo necesitamos que exportes un reporte diario en Excel o CSV (un proceso de dos minutos) y lo subas a la plataforma — la IA hace el resto.',
  },
  {
    q: '¿La optimización de rutas sirve para cualquier zona de Argentina?',
    a: 'Sí. El sistema usa mapas locales actualizados y tiene en cuenta variables como restricciones de tránsito pesado, horarios de entrega específicos de tus clientes y la capacidad de carga de cada camión.',
  },
  {
    q: '¿Qué pasa si un cliente manda un pedido por WhatsApp de forma desordenada?',
    a: 'Nuestra IA de procesamiento de pedidos está entrenada para entender el lenguaje coloquial y las abreviaturas típicas de WhatsApp: identifica los productos de tu catálogo y te lo traduce a un formato limpio, listo para facturar.',
  },
]

const steps = [
  {
    num: '01',
    name: 'Setup',
    tag: 'Desarrollo inicial',
    desc: 'Diagnosticamos tus rutas, tu flota y cómo te llegan los pedidos hoy (WhatsApp, planillas, tu sistema de facturación), y armamos el módulo de rutas, demanda o pedidos integrado a esos datos. Entregamos en semanas, no en meses.',
    items: ['Diagnóstico de rutas y volumen de pedidos actual', 'Capacitación del equipo de logística', 'Carga inicial de clientes y zonas de reparto'],
  },
  {
    num: '02',
    name: 'Seguimiento',
    tag: 'Mensual',
    desc: 'Soporte técnico continuo, ajuste de rutas y predicciones, y garantía de funcionamiento 24/7. Vos repartís; nosotros mantenemos el sistema al día.',
    items: ['Soporte y monitoreo continuo', 'Ajuste de rutas y predicciones', 'Cobertura de conexiones y seguridad'],
  },
  {
    num: '03',
    name: 'Expansión',
    tag: 'A demanda',
    desc: 'Sumá predicción de demanda, el agente de pedidos u otros módulos cuando tu operación lo necesite, sin rehacer lo ya implementado.',
    items: ['Nuevos módulos logísticos', 'Integraciones con otras plataformas', 'Misma implementación, más alcance'],
  },
]

export default function DistribuidorasPage() {
  return (
    <main>
      <Breadcrumb current="Distribuidoras" />
      <IndustryHero
        titleLine1="Inteligencia Artificial para"
        titleLine2="distribuidoras en Argentina"
        subtitle="Optimizá rutas, predecí demanda y automatizá pedidos por WhatsApp sin cambiar tu sistema actual."
      />
      <DistribuidorasDemos />
      <IndustryIntegrations
        heading="Compatible con lo que ya usás"
        body="Trabajamos con la información que ya tenés. Exportá tus datos de Tango, Bejerman o tus planillas de Excel diarias — nuestra IA los procesa en segundos para optimizar tus rutas y stock, sin instalaciones complejas."
        tools={['Tango', 'Bejerman', 'Excel / CSV']}
      />
      <IndustryHowItWorks steps={steps} />
      <CTAReunion />
      <IndustryFAQ faqs={faqs} />
      <IndustrySchema
        path="/distribuidoras"
        serviceName="Herramientas de IA para distribuidoras"
        serviceDescription="Módulos de inteligencia artificial a medida para distribuidoras mayoristas en Argentina: optimización de rutas, predicción de demanda y agente de pedidos por WhatsApp."
        breadcrumbCurrent="Distribuidoras"
        faqs={faqs}
      />
    </main>
  )
}
