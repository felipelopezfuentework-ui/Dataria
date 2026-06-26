'use client'

function scrollToDemos() {
  document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' })
}

export default function CTAReunion() {
  return (
    <section id="contacto" className="py-20 md:py-24 bg-gradient-dataria">
      <div className="max-w-container mx-auto px-5 md:px-10 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/25 mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-green-300" />
          <span className="text-xs font-bold uppercase tracking-widest text-white">Sin costo</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
          Hablemos de tu operación
        </h2>
        <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-10">
          Agendá una sesión de 15 minutos, sin costo, para analizar tu operación.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://calendar.app.google/64ms78PrrpQv8x4n9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-sm bg-white text-azul-nucleo font-bold text-sm hover:bg-white/90 transition-colors shadow-soft"
          >
            Agendar reunión gratis
            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold leading-none">
              Gratis
            </span>
          </a>
          <button
            onClick={scrollToDemos}
            className="inline-flex items-center justify-center h-12 px-7 rounded-sm bg-white/10 border border-white/30 text-white font-semibold text-sm hover:bg-white/20 transition-colors"
          >
            Ver demos en vivo
          </button>
        </div>

      </div>
    </section>
  )
}
