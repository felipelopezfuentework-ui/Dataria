import Hero from '@/components/home/Hero'
import ClientLogos from '@/components/home/ClientLogos'
import IndustriesPreview from '@/components/home/IndustriesPreview'
import HowItWorks from '@/components/home/HowItWorks'
import CTAReunion from '@/components/home/CTAReunion'

export default function Home() {
  return (
    <main>
      <Hero />
      <IndustriesPreview />
      <ClientLogos />
      <CTAReunion />

      {/* Cómo trabajamos */}
      <section id="como-trabajamos">
        <HowItWorks />
      </section>

      {/* Nosotros */}
      <section id="nosotros">
        <div className="py-16 md:py-24 bg-gradient-hero text-center">
          <div className="max-w-container mx-auto px-5 md:px-10">
            <p className="text-xs font-bold uppercase tracking-widest text-azul-nucleo mb-5">El equipo</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-carbon mb-5 tracking-tight">
              Construimos herramientas<br className="hidden md:block" /> que nosotros mismos usaríamos
            </h2>
            <p className="text-lg text-texto-sec max-w-2xl mx-auto">
              [contenido pendiente — se carga con el equipo real de Dataria]
            </p>
          </div>
        </div>
        <div className="py-16 md:py-20 bg-white">
          <div className="max-w-container mx-auto px-5 md:px-10">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Clientes operando',        metric: '[pendiente]', desc: 'Herramientas en producción con clientes reales.' },
                { title: 'Industrias cubiertas',     metric: '6',           desc: 'Gastronomía, distribución, talleres, salud, inmobiliarias y e-commerce.' },
                { title: 'Tiempo de setup promedio', metric: '[pendiente]', desc: 'De diagnóstico a herramienta funcionando.' },
              ].map((item) => (
                <div key={item.title} className="text-center p-8 rounded-xl bg-fondo-suave border border-borde">
                  <p className="text-4xl font-extrabold text-azul-nucleo mb-2">{item.metric}</p>
                  <p className="font-bold text-carbon mb-2">{item.title}</p>
                  <p className="text-sm text-texto-sec">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-container mx-auto px-5 md:px-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-carbon mb-8 text-center tracking-tight">Preguntas frecuentes</h2>
            <div className="space-y-4">
              {[
                { q: '¿Cuánto tiempo lleva el setup?', a: 'Depende de la complejidad de la integración. Para la mayoría de los casos entregamos en 2 a 4 semanas.' },
                { q: '¿Necesito un equipo técnico interno?', a: 'No. Nos encargamos de todo: configuración, integración y capacitación. Tu equipo solo tiene que saber usar la herramienta.' },
                { q: '¿Qué pasa si quiero cancelar el mantenimiento?', a: 'Podés cancelar en cualquier momento. Las herramientas siguen funcionando; simplemente dejan de tener soporte activo ni actualizaciones de modelo.' },
                { q: '¿Puedo empezar con una sola herramienta?', a: 'Sí. El modelo está diseñado para crecer de a módulos. Empezás con lo que más necesitás y expandís cuando tenga sentido.' },
              ].map(({ q, a }) => (
                <details key={q} className="rounded-lg border border-borde group">
                  <summary className="px-5 py-4 font-semibold text-carbon cursor-pointer select-none flex items-center justify-between text-sm list-none">
                    {q}
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="text-texto-sec shrink-0 transition-transform group-open:rotate-180">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </summary>
                  <p className="px-5 pb-4 text-sm text-texto-sec leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
