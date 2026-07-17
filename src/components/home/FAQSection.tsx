'use client'

import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

const faqs = [
  { q: '¿Cuánto tiempo lleva el setup?', a: 'Depende de la complejidad de la integración, pero en la mayoría de los casos entregamos el primer módulo funcionando en 2 a 4 semanas. Arrancamos con una reunión de diagnóstico gratuita para entender tu operación, y desde ahí armamos un presupuesto y un cronograma concreto — no vas a estar meses esperando sin saber en qué etapa estás.' },
  { q: '¿Necesito un equipo técnico interno?', a: 'No. Nos encargamos de todo: configuración, integración con tus sistemas actuales y capacitación de tu equipo. Vos y tu gente solo tienen que saber usar la herramienta del día a día — nosotros mantenemos las conexiones, actualizamos los modelos y resolvemos cualquier problema técnico por vos.' },
  { q: '¿Mis datos están seguros?', a: 'Sí. Tus datos se procesan de forma segura, no se comparten con terceros ni se usan para entrenar modelos ajenos a tu operación. Toda la información que cargamos (costos, clientes, rutas, stock) queda disponible exclusivamente para tu negocio.' },
  { q: '¿Puedo empezar con una sola herramienta?', a: 'Sí, el modelo está diseñado para crecer de a módulos. Empezás con la herramienta que más necesitás hoy (por ejemplo, food cost si sos un restaurante) y expandís cuando tu operación lo requiera, sin tener que rehacer nada de lo ya implementado.' },
  { q: '¿Cuánto cuesta?', a: 'Depende del alcance de tu proyecto — no hay un precio fijo publicado porque cada implementación se adapta a tu operación. Después de la reunión de diagnóstico gratuita te pasamos un presupuesto concreto para el Setup inicial, y luego hay una cuota mensual de Seguimiento que cubre soporte, actualizaciones y mantenimiento de las conexiones.' },
  { q: '¿Qué pasa si mi negocio no es gastronomía, distribuidoras, inmobiliarias o e-commerce?', a: 'Esos son los 4 rubros donde ya tenemos módulos armados y demostrables, pero no son los únicos que atendemos. Si tu negocio es de otro rubro, contanos tu caso desde el formulario de contacto — evaluamos cada proyecto según el problema puntual que quieras resolver.' },
  { q: '¿Por qué no uso directamente ChatGPT o una planilla de Excel?', a: 'Podés hacerlo, y de hecho es un buen punto de partida gratuito. La diferencia es que un prompt suelto no queda conectado a tus datos reales ni se actualiza solo — tenés que volver a cargar todo cada vez. Dataria te arma un módulo integrado a tu operación (tus costos, tus proveedores, tus clientes) que se mantiene actualizado sin que tengas que hacerlo vos a mano cada semana.' },
  { q: '¿Qué pasa si mi negocio crece y necesito más funciones?', a: 'Es la tercera etapa de nuestro modelo: Expansión. Podemos sumar nuevos módulos, integrar otros sistemas o abrir nuevas áreas del negocio a medida que crecés, sin tener que empezar de cero — el mismo acompañamiento que tuviste en el Setup se mantiene en cada etapa nueva.' },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-lg border border-borde">
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full px-5 py-4 font-medium text-carbon cursor-pointer select-none flex items-center justify-between text-base"
      >
        {q}
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          className={`text-texto-sec shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div className={`accordion-content ${open ? 'is-open' : ''}`}>
        <div>
          <p className="px-5 pb-4 text-sm text-texto-sec leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  )
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

export default function FAQSection() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15)

  return (
    <section className="py-20 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-container mx-auto px-6">
        <div ref={ref} className={`max-w-3xl mx-auto reveal ${visible ? 'is-visible' : ''}`}>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-carbon mb-8 text-center tracking-[-0.03em]">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
