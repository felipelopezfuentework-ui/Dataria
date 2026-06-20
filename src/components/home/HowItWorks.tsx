const steps = [
  {
    num: '01',
    name: 'Setup',
    tag: 'Pago único',
    desc: 'Configuramos las herramientas de IA desde cero, integradas con tus datos y adaptadas a tu operación específica. Entregamos en semanas, no en meses.',
    items: ['Diagnóstico de cuellos de botella', 'Configuración e integración de datos', 'Capacitación del equipo'],
  },
  {
    num: '02',
    name: 'Mantenimiento',
    tag: 'Mensual',
    desc: 'Soporte técnico continuo, actualizaciones de modelos y garantía de funcionamiento 24/7. Vos operás; nosotros mantenemos.',
    items: ['Soporte y monitoreo continuo', 'Actualizaciones del modelo de IA', 'Cobertura de costos de API'],
  },
  {
    num: '03',
    name: 'Expansión',
    tag: 'A demanda',
    desc: 'Nuevas funciones, integraciones con otros sistemas o nuevas áreas del negocio. Escalás a medida que crecés.',
    items: ['Nuevos módulos y funcionalidades', 'Integraciones con otras plataformas', 'Nuevo Setup + fee de mantenimiento'],
  },
]

export default function HowItWorks() {
  return (
    <section id="metodo" className="py-20 md:py-28 bg-fondo-suave">
      <div className="max-w-container mx-auto px-5 md:px-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-carbon mb-4 tracking-tight">Tu camino hacia la IA</h2>
          <p className="text-lg text-texto-sec">Modelo de implementación por etapas, sin fricciones.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="relative bg-white rounded-xl border border-borde p-8 shadow-card overflow-hidden"
            >
              {/* Step number background */}
              <span
                aria-hidden
                className="absolute -top-4 -right-2 text-[88px] font-extrabold text-fondo-suave leading-none pointer-events-none select-none"
              >
                {step.num}
              </span>

              {/* Content */}
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-gradient-dataria flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <p className="font-bold text-carbon text-lg leading-tight">{step.name}</p>
                    <p className="text-xs text-texto-sec font-medium">{step.tag}</p>
                  </div>
                </div>

                <p className="text-sm text-texto-sec leading-relaxed mb-5">{step.desc}</p>

                <ul className="space-y-2">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-carbon">
                      <svg className="mt-0.5 shrink-0 text-azul-nucleo" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connector arrow (between cards) */}
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
