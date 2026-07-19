export interface Testimonial {
  quote: string
  name: string
  company: string
}

export function TestimonialQuotes({ items }: { items: Testimonial[] }) {
  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div
        className={`max-w-container mx-auto px-6 grid gap-10 ${
          items.length > 1 ? 'md:grid-cols-2' : 'max-w-2xl'
        }`}
      >
        {items.map((t) => (
          <div key={t.name} className="text-center md:text-left">
            <p className="font-display text-lg md:text-xl font-medium text-carbon leading-relaxed mb-4">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="text-sm font-bold text-azul-nucleo">
              {t.name} <span className="font-normal text-texto-sec">— {t.company}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
