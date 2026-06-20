import type { Metadata } from 'next'
import HowItWorks from '@/components/home/HowItWorks'
import CTASection from '@/components/home/CTASection'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cómo trabajamos — Dataria',
  description: 'Setup, Mantenimiento y Expansión: el modelo de implementación de IA de Dataria.',
}

export default function ComoTrabajamosPage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-hero text-center">
        <div className="max-w-container mx-auto px-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-widest text-azul-nucleo mb-5">El método Dataria</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-carbon mb-5 tracking-tight">
            Implementación por etapas,<br className="hidden md:block" /> sin fricciones
          </h1>
          <p className="text-lg text-texto-sec max-w-2xl mx-auto mb-8">
            No vendemos software genérico. Configuramos herramientas de IA que se integran con tu operación existente y funcionan desde el día 1.
          </p>
          <Link href="/contacto" className="inline-flex items-center justify-center h-12 px-7 rounded-sm bg-gradient-dataria text-white font-bold text-sm shadow-primary hover:opacity-90 transition-opacity">
            Solicitar diagnóstico gratuito
          </Link>
        </div>
      </section>

      <HowItWorks />

      {/* FAQ Placeholder */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-container mx-auto px-5 md:px-10 max-w-3xl">
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
      </section>

      <CTASection />
    </main>
  )
}
