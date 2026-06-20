import type { Metadata } from 'next'
import DemoHub from '@/components/demos/DemoHub'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Demostraciones en vivo — Dataria',
  description: 'Probá las herramientas de IA de Dataria en tiempo real, sin registrarte.',
}

export default function DemostracionesPage() {
  return (
    <main className="min-h-screen bg-fondo-suave py-10 md:py-16">
      <div className="max-w-container mx-auto px-5 md:px-10">
        {/* Page header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-azul-nucleo/8 border border-azul-nucleo/15 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-azul-nucleo">Demo en vivo</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-carbon mb-4 tracking-tight">
            Herramientas que podés usar ahora mismo
          </h1>
          <p className="text-lg text-texto-sec max-w-2xl mx-auto">
            Cada panel es una versión real de las herramientas que implementamos.
            Todos los datos son ejemplos de simulación — sin registro ni backend.
          </p>
        </div>

        {/* Main hub */}
        <DemoHub />

        {/* Footer CTA */}
        <div className="mt-12 rounded-xl bg-gradient-dataria p-8 md:p-10 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            ¿Querés esto funcionando en tu negocio?
          </h2>
          <p className="text-white/80 mb-6 text-sm md:text-base">
            Agendamos una sesión de diagnóstico gratuita de 15 minutos para entender tu operación.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center h-11 px-7 rounded-sm bg-white text-azul-nucleo font-bold text-sm hover:bg-white/90 transition-colors shadow-soft"
          >
            Agendar diagnóstico gratuito
          </Link>
        </div>
      </div>
    </main>
  )
}
