import Link from 'next/link'

export function BlogCTA({ industria, industriaHref }: { industria: string; industriaHref: string }) {
  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-display text-2xl font-bold text-carbon mb-3 tracking-[-0.01em]">
          ¿Querés ver esto funcionando en tu negocio?
        </h2>
        <p className="text-texto-sec mb-6">
          Probá la demo en vivo del módulo de {industria.toLowerCase()} de Dataria, sin costo y sin registrarte.
        </p>
        <Link
          href={`${industriaHref}#demos`}
          className="inline-flex items-center justify-center h-[46px] px-6 rounded-[10px] bg-gradient-dataria text-white font-semibold tracking-[0.02em] text-[15px] shadow-primary hover:!bg-[#1B5BC1] hover:!bg-none transition-all duration-150"
        >
          Ver demo de {industria}
        </Link>
      </div>
    </section>
  )
}
