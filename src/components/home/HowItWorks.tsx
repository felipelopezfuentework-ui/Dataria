'use client'

import { useReveal } from '@/hooks/useReveal'

const steps = [
  {
    num: '01',
    name: 'Setup',
    tag: 'Desarrollo inicial',
    desc: 'Configuramos las herramientas de IA desde cero, integradas con tus datos y adaptadas a tu operación específica. Entregamos en semanas, no en meses.',
    items: ['Diagnóstico de puntos críticos', 'Capacitación de equipos', 'Desarrollo interactivo'],
  },
  {
    num: '02',
    name: 'Seguimiento',
    tag: 'Mensual',
    desc: 'Soporte técnico continuo, actualizaciones de modelos y garantía de funcionamiento 24/7. Vos operás; nosotros mantenemos.',
    items: ['Soporte y monitoreo continuo', 'Optimización de modelos', 'Cobertura de conexiones y seguridad'],
  },
  {
    num: '03',
    name: 'Expansión',
    tag: 'A demanda',
    desc: 'Nuevas funciones, integraciones con otros sistemas o nuevas áreas del negocio. Escalás a medida que crecés.',
    items: ['Nuevos módulos y funcionalidades', 'Integraciones con otras plataformas', 'Nueva etapa, mismo respaldo'],
  },
]

export default function HowItWorks() {
  const { ref: headerRef, visible: headerVisible } = useReveal<HTMLDivElement>(0.15)
  const { ref: gridRef, visible: gridVisible } = useReveal<HTMLDivElement>(0.15)

  return (
    <section id="metodo" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-container mx-auto px-6">
        <div ref={headerRef} className={`text-center mb-16 reveal ${headerVisible ? 'is-visible' : ''}`}>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-carbon mb-4 tracking-[-0.03em]">Así se construye tu solución</h2>
          <p className="text-xl text-texto-sec font-normal">Modelo de implementación por etapas, sin fricciones.</p>
        </div>

        <div ref={gridRef} className="relative grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`relative z-10 bg-white rounded-xl border border-borde p-8 shadow-card overflow-hidden reveal ${gridVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Content */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-gradient-dataria flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {step.num}
                </div>
                <div>
                  <p className="font-bold text-carbon text-xl leading-tight">{step.name}</p>
                  <p className="text-sm text-texto-sec font-medium">{step.tag}</p>
                </div>
              </div>

              <p className="text-base text-texto-sec leading-relaxed mb-5">{step.desc}</p>

              <ul className="space-y-2">
                {step.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base text-carbon">
                    <svg className="mt-0.5 shrink-0 text-azul-nucleo" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
