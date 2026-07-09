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
          {/* Connecting line: "dibuja" left-to-right, echoing a process that flows */}
          <svg className="hidden md:block absolute left-0 right-0 pointer-events-none" style={{ top: '52px', height: 2, width: '100%' }}
            viewBox="0 0 100 2" preserveAspectRatio="none">
            <line x1="0" y1="1" x2="100" y2="1" pathLength="100" stroke="#45B5F3" strokeOpacity="0.5" strokeWidth="2"
              style={{
                strokeDasharray: 100,
                strokeDashoffset: gridVisible ? 0 : 100,
                transition: 'stroke-dashoffset 700ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </svg>

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

              {/* Connector arrow between cards */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 bg-white rounded-full border border-borde flex items-center justify-center shadow-card">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="text-azul-nucleo">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
