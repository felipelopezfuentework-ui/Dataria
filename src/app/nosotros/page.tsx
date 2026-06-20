import type { Metadata } from 'next'
import CTASection from '@/components/home/CTASection'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Nosotros — Dataria',
  description: 'El equipo detrás de Dataria y nuestra forma de trabajar.',
}

export default function NosotrosPage() {
  return (
    <main>
      <section className="py-16 md:py-24 bg-gradient-hero text-center">
        <div className="max-w-container mx-auto px-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-widest text-azul-nucleo mb-5">El equipo</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-carbon mb-5 tracking-tight">
            Construimos herramientas<br className="hidden md:block" /> que nosotros mismos usaríamos
          </h1>
          <p className="text-lg text-texto-sec max-w-2xl mx-auto">
            [contenido pendiente — se carga con el equipo real de Dataria]
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-container mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Clientes operando', metric: '[pendiente]', desc: 'Herramientas en producción con clientes reales.' },
              { title: 'Industrias cubiertas', metric: '6', desc: 'Gastronomía, distribución, talleres, salud, inmobiliarias y e-commerce.' },
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
      </section>

      <CTASection />
    </main>
  )
}
