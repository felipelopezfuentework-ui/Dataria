const clients = [
  'Padella', 'Ragú', 'Pollo Cocido', 'Pastas Parodi', 'Pizza Press',
  'Padella', 'Ragú', 'Pollo Cocido', 'Pastas Parodi', 'Pizza Press',
]

export default function ClientLogos() {
  return (
    <section className="py-10 border-y border-borde bg-white overflow-hidden">
      <div className="max-w-container mx-auto px-5 md:px-10 mb-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-texto-sec/60 text-center">
          Empresas que ya optimizan su proceso
        </p>
      </div>
      <div className="relative flex">
        <div className="flex animate-scroll gap-16 items-center whitespace-nowrap">
          {clients.map((name, i) => (
            <span
              key={i}
              className="text-base font-bold text-texto-sec/30 tracking-wide uppercase"
            >
              {name}
            </span>
          ))}
        </div>
        <div className="flex animate-scroll gap-16 items-center whitespace-nowrap" aria-hidden>
          {clients.map((name, i) => (
            <span
              key={`dup-${i}`}
              className="text-base font-bold text-texto-sec/30 tracking-wide uppercase"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
