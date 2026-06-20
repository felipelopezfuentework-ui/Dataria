import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 bg-gradient-hero">
      {/* Subtle gradient orb */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #45B5F3 0%, transparent 70%)' }}
      />

      <div className="max-w-container mx-auto px-5 md:px-10 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-azul-nucleo/8 border border-azul-nucleo/15 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-azul-accion animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-azul-nucleo">Agencia de IA aplicada</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-[72px] leading-[1.05] font-extrabold text-carbon mb-6 max-w-4xl mx-auto tracking-tight">
          Menos datos sueltos.<br />
          <span className="bg-gradient-dataria bg-clip-text text-transparent">Mejores decisiones.</span>
        </h1>

        {/* Sub */}
        <p className="text-xl md:text-2xl text-texto-sec max-w-2xl mx-auto leading-relaxed mb-10">
          Dataria crea herramientas de IA para que pymes y autónomos operen mejor — desde el primer día.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/demostraciones"
            className="inline-flex items-center justify-center h-12 px-7 rounded-sm bg-gradient-dataria text-white font-bold text-sm shadow-primary hover:opacity-90 transition-opacity duration-160"
          >
            Ver demostraciones en vivo
          </Link>
          <Link
            href="/como-trabajamos"
            className="inline-flex items-center justify-center h-12 px-7 rounded-sm bg-white text-azul-nucleo font-semibold text-sm border border-borde hover:border-azul-nucleo/30 transition-colors duration-160"
          >
            Conocé el método
          </Link>
        </div>

        {/* Social proof teaser */}
        <p className="mt-10 text-sm text-texto-sec/70">
          Ya operan con herramientas Dataria: gastronomía · distribución · talleres · salud · inmobiliarias
        </p>
      </div>
    </section>
  )
}
