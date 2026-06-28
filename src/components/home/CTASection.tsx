import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-dataria">
      <div className="max-w-container mx-auto px-5 md:px-10 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight">
          ¿Listo para transformar tu operación?
        </h2>
        <p className="text-lg text-white/80 max-w-xl mx-auto mb-10">
          Agendá una sesión estratégica de 15 minutos para analizar tus cuellos de botella hoy mismo.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center h-[46px] px-6 rounded-[10px] bg-white text-azul-nucleo font-bold tracking-[0.04em] uppercase text-[13px] hover:bg-white/90 transition-colors duration-160 shadow-soft"
          >
            Solicitar asesoría gratuita
          </Link>
          <Link
            href="/demostraciones"
            className="inline-flex items-center justify-center h-[46px] px-6 rounded-[10px] bg-white/10 text-white font-semibold tracking-[0.04em] uppercase text-[13px] border-[1.5px] border-white/20 hover:bg-white/20 transition-colors duration-160"
          >
            Ver demos en vivo
          </Link>
        </div>
      </div>
    </section>
  )
}
