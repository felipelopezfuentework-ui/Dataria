import Hero from '@/components/home/Hero'
import ClientLogos from '@/components/home/ClientLogos'
import IndustriesPreview from '@/components/home/IndustriesPreview'
import HowItWorks from '@/components/home/HowItWorks'
import CTAReunion from '@/components/home/CTAReunion'
import ContactoSection from '@/components/home/ContactoSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <IndustriesPreview />

      {/* Cómo trabajamos */}
      <section id="como-trabajamos">
        <HowItWorks />
      </section>

      <ClientLogos />
      <CTAReunion />


      {/* Preguntas frecuentes */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-container mx-auto px-5 md:px-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-carbon mb-8 text-center tracking-[-0.02em]">Preguntas frecuentes</h2>
            <div className="space-y-4">
              {[
                { q: '¿Cuánto tiempo lleva el setup?', a: 'Depende de la complejidad de la integración. Para la mayoría de los casos entregamos en 2 a 4 semanas.' },
                { q: '¿Necesito un equipo técnico interno?', a: 'No. Nos encargamos de todo: configuración, integración y capacitación. Tu equipo solo tiene que saber usar la herramienta.' },
                { q: '¿Mis datos están seguros?', a: 'Sí. Tus datos se procesan de forma segura, no se comparten con terceros ni se usan para entrenar modelos ajenos a tu operación.' },
                { q: '¿Puedo empezar con una sola herramienta?', a: 'Sí, el modelo está diseñado para crecer de a módulos. Empezás con lo que más necesitás y expandís cuando tu operación lo requiera.' },
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

      <ContactoSection />

    </main>
  )
}
