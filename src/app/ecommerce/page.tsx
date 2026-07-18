import type { Metadata } from 'next'
import { IndustryHero } from '@/components/industry/IndustryHero'
import { Breadcrumb } from '@/components/industry/Breadcrumb'
import { IndustryIntegrations } from '@/components/industry/IndustryIntegrations'
import { IndustryHowItWorks } from '@/components/industry/IndustryHowItWorks'
import { IndustryFAQ } from '@/components/industry/IndustryFAQ'
import { IndustrySchema } from '@/components/industry/IndustrySchema'
import CTAReunion from '@/components/home/CTAReunion'
import { EcommerceDemos } from './demos-client'

export const metadata: Metadata = {
  title: 'Inteligencia Artificial para E-commerce en Argentina | Dataria',
  description: 'Panel de clientes, stock e inventario y proyecciones de ventas con IA para tiendas online en Argentina. Compatible con Tiendanube y Mercado Libre. Probá la demo.',
  alternates: { canonical: 'https://www.dataria.work/ecommerce' },
}

const faqs = [
  {
    q: '¿Tengo que darle acceso total a mi cuenta de Mercado Libre o Tiendanube?',
    a: 'No es necesario. Podemos trabajar con la exportación de tus reportes de ventas, o con accesos de solo lectura, sin comprometer la seguridad de tu cuenta.',
  },
  {
    q: '¿Cómo evito que las respuestas de la IA suenen robóticas o frías para mis clientes?',
    a: 'Entrenamos a la IA con el tono de voz de tu marca. El vocabulario y el estilo se adaptan según lo que vendas, para que las respuestas parezcan escritas por tu mejor vendedor.',
  },
  {
    q: '¿La predicción de stock sirve para eventos de alta demanda como el Hot Sale?',
    a: 'Sí. Analiza el comportamiento de tus ventas en eventos anteriores, la estacionalidad del producto y la tendencia reciente para sugerirte qué stock preparar y evitar perder ventas por falta de mercadería.',
  },
]

const steps = [
  {
    num: '01',
    name: 'Setup',
    tag: 'Desarrollo inicial',
    desc: 'Diagnosticamos tu catálogo, tu historial de ventas y cómo atendés hoy a tus clientes, y armamos el módulo de stock, proyecciones o panel de clientes integrado a esos datos. Entregamos en semanas, no en meses.',
    items: ['Diagnóstico de catálogo y ventas actuales', 'Capacitación del equipo de atención', 'Carga inicial de productos y stock'],
  },
  {
    num: '02',
    name: 'Seguimiento',
    tag: 'Mensual',
    desc: 'Soporte técnico continuo, actualización de modelos de predicción y garantía de funcionamiento 24/7. Vos vendés; nosotros mantenemos los números al día.',
    items: ['Soporte y monitoreo continuo', 'Actualización de modelos de predicción', 'Cobertura de conexiones y seguridad'],
  },
  {
    num: '03',
    name: 'Expansión',
    tag: 'A demanda',
    desc: 'Sumá panel de clientes, proyecciones u otros módulos cuando tu tienda crezca, sin rehacer lo ya implementado.',
    items: ['Nuevos módulos de e-commerce', 'Integraciones con otras plataformas', 'Misma implementación, más alcance'],
  },
]

export default function EcommercePage() {
  return (
    <main>
      <Breadcrumb current="E-commerce" />
      <IndustryHero
        titleLine1="Inteligencia Artificial para"
        titleLine2="e-commerce en Argentina"
        subtitle="Predecí stock, entendé a tus clientes y proyectá ventas con IA aplicada a tu Tiendanube o Mercado Libre."
      />
      <EcommerceDemos />
      <IndustryIntegrations
        heading="Sin configuraciones difíciles"
        body="Analizamos las exportaciones de tus ventas de Tiendanube o Mercado Libre para predecir tu stock y automatizar tus respuestas, cuidando la seguridad de tus cuentas."
        tools={['Tiendanube', 'Mercado Libre', 'Excel / CSV']}
      />
      <IndustryHowItWorks steps={steps} />
      <CTAReunion />
      <IndustryFAQ faqs={faqs} />
      <IndustrySchema
        path="/ecommerce"
        serviceName="Herramientas de IA para e-commerce"
        serviceDescription="Módulos de inteligencia artificial a medida para tiendas online en Argentina: panel de clientes, stock e inventario y proyecciones de ventas."
        breadcrumbCurrent="E-commerce"
        faqs={faqs}
      />
    </main>
  )
}
