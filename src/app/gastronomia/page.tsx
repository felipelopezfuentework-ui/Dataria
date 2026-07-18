import type { Metadata } from 'next'
import { IndustryHero } from '@/components/industry/IndustryHero'
import { Breadcrumb } from '@/components/industry/Breadcrumb'
import { IndustryIntegrations } from '@/components/industry/IndustryIntegrations'
import { IndustryHowItWorks } from '@/components/industry/IndustryHowItWorks'
import { IndustryFAQ } from '@/components/industry/IndustryFAQ'
import { IndustrySchema } from '@/components/industry/IndustrySchema'
import ClientLogos from '@/components/home/ClientLogos'
import CTAReunion from '@/components/home/CTAReunion'
import { GastronomiaDemos } from './demos-client'

export const metadata: Metadata = {
  title: 'Inteligencia Artificial para Gastronomía en Argentina | Dataria',
  description: 'Food cost, gestión de reseñas y planificador de turnos con IA para restaurantes y locales gastronómicos en Argentina. Probá la demo antes de contratar.',
  alternates: { canonical: 'https://www.dataria.work/gastronomia' },
}

const faqs = [
  {
    q: '¿Tengo que cargar todas mis recetas e ingredientes a mano en Dataria?',
    a: 'No. Nosotros nos encargamos de leer tus planillas de Excel actuales, PDFs de proveedores o los reportes de tu sistema de gestión para estructurar tu base de datos de recetas en la IA.',
  },
  {
    q: '¿La IA realmente puede predecir cuánto voy a vender el fin de semana?',
    a: 'Sí, cruzando tu histórico de ventas reales con factores externos como el clima, feriados y eventos en tu zona, para darte un estimado de producción más preciso y evitar tirar mercadería o quedarte sin stock.',
  },
  {
    q: '¿Cómo me ayuda la IA a no perder margen con la inflación de los proveedores?',
    a: 'Analiza las facturas de compra que subís al sistema, detecta qué insumos aumentaron por encima del promedio y te alerta qué platos de tu menú están perdiendo rentabilidad para que puedas ajustar precios a tiempo.',
  },
]

const steps = [
  {
    num: '01',
    name: 'Setup',
    tag: 'Desarrollo inicial',
    desc: 'Diagnosticamos tu carta, tus recetas y tus proveedores actuales, y armamos el módulo de food cost, reseñas o turnos integrado a los datos que ya tenés (Excel, tu sistema de gestión o reportes de proveedores). Entregamos en semanas, no en meses.',
    items: ['Diagnóstico de recetas y costos actuales', 'Capacitación del equipo de cocina y salón', 'Carga inicial de insumos y proveedores'],
  },
  {
    num: '02',
    name: 'Seguimiento',
    tag: 'Mensual',
    desc: 'Soporte técnico continuo, actualización de costos de insumos y garantía de funcionamiento 24/7. Vos cocinás; nosotros mantenemos los números al día.',
    items: ['Soporte y monitoreo continuo', 'Actualización de costos de insumos', 'Cobertura de conexiones y seguridad'],
  },
  {
    num: '03',
    name: 'Expansión',
    tag: 'A demanda',
    desc: 'Sumá reseñas, turnos u otros módulos cuando tu operación lo necesite, sin rehacer lo ya implementado.',
    items: ['Nuevos módulos gastronómicos', 'Integraciones con otras plataformas', 'Misma implementación, más alcance'],
  },
]

export default function GastronomiaPage() {
  return (
    <main>
      <Breadcrumb current="Gastronomía" />
      <IndustryHero
        titleLine1="Inteligencia Artificial para"
        titleLine2="gastronomía en Argentina"
        subtitle="Calculá food cost, gestioná reseñas y armá turnos sin perder tiempo en planillas — probá la demo antes de hablar con nosotros."
      />
      <GastronomiaDemos />
      <IndustryIntegrations
        heading="Compatible con lo que ya usás"
        body="No necesitás cambiar de sistema de gestión. Dataria es compatible con los reportes que ya exportás de Fudo, Maxirest o tus planillas de Excel — nosotros tomamos esa información y nuestra IA la transforma en decisiones."
        tools={['Fudo', 'Maxirest', 'Excel / CSV']}
      />
      <IndustryHowItWorks steps={steps} />
      <ClientLogos />
      <CTAReunion />
      <IndustryFAQ faqs={faqs} />
      <IndustrySchema
        path="/gastronomia"
        serviceName="Herramientas de IA para gastronomía"
        serviceDescription="Módulos de inteligencia artificial a medida para restaurantes y locales gastronómicos en Argentina: cálculo de food cost, gestión de reseñas y planificador de turnos."
        breadcrumbCurrent="Gastronomía"
        faqs={faqs}
      />
    </main>
  )
}
