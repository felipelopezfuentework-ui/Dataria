function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function BlogHeader({ title, date, industria }: { title: string; date: string; industria: string }) {
  return (
    <section className="pt-10 pb-8 bg-gradient-hero">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-azul-accion mb-3">{industria} · Blog</p>
        <h1 className="font-display text-3xl md:text-[44px] font-extrabold text-carbon mb-4 tracking-[-0.03em] leading-[1.15]">
          {title}
        </h1>
        <p className="text-sm text-texto-sec">{formatDate(date)}</p>
      </div>
    </section>
  )
}
