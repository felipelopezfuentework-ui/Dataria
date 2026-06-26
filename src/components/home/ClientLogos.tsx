import Image from 'next/image'

const clients = [
  { name: 'Hibent',         src: '/clients/hibent.jpg'         },
  { name: 'Padella',        src: '/clients/padella.jpg'        },
  { name: 'Pastas Pariggi', src: '/clients/pastas-pariggi.jpg' },
  { name: 'Pollo Cocido',   src: '/clients/pollo-cocido.png'   },
  { name: 'Ragú',           src: '/clients/ragu.jpg'           },
  { name: 'MP Catering',    src: '/clients/mp-catering.jpg'    },
]

function ClientCard({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex flex-col items-center gap-2.5 w-28">
      <div className="relative w-20 h-12">
        <Image src={src} alt={name} fill className="object-contain" />
      </div>
      <span className="text-[11px] font-semibold uppercase tracking-widest text-texto-sec/50 text-center leading-tight">
        {name}
      </span>
    </div>
  )
}

export default function ClientLogos() {
  return (
    <section className="py-10 border-y border-borde bg-white overflow-hidden">
      <div className="max-w-container mx-auto px-5 md:px-10 mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-texto-sec/60 text-center">
          Empresas que confían en nosotros
        </p>
      </div>
      {/* Single track: each item owns its right padding so translateX(-50%) loops perfectly */}
      <div className="overflow-hidden">
        <div className="flex animate-scroll w-max">
          {[...clients, ...clients].map((c, i) => (
            <div key={i} className="pr-20">
              <ClientCard name={c.name} src={c.src} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
