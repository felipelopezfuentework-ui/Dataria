'use client'

function scrollToDemos() {
  document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' })
}

export default function CTAReunion() {
  return (
    <section id="contacto" className="py-20 bg-gradient-dataria">
      <div className="max-w-container mx-auto px-6 text-center">

        <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-[-0.03em]">
          Hablemos de tu operación
        </h2>
        <p className="font-display font-semibold text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-10 tracking-[-0.01em]">
          Agendá una sesión de 15 minutos, sin costo, para analizar tu operación.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://calendar.app.google/64ms78PrrpQv8x4n9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 h-[46px] px-6 rounded-[10px] bg-white text-azul-nucleo font-semibold tracking-[0.02em] text-[15px] hover:bg-white/90 hover:-translate-y-px active:translate-y-0 transition-all duration-150 shadow-soft"
          >
            Agendar reunión
            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold leading-none">
              Gratis
            </span>
          </a>
          <button
            onClick={scrollToDemos}
            className="inline-flex items-center justify-center h-[46px] px-6 rounded-[10px] bg-white/10 border-[1.5px] border-white/30 text-white font-semibold tracking-[0.02em] text-[15px] hover:bg-white/20 hover:-translate-y-px active:translate-y-0 transition-all duration-150"
          >
            Ver demos en vivo
          </button>
        </div>

      </div>
    </section>
  )
}
