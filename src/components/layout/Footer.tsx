import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  Producto: [
    { label: 'Industrias',     href: '/#industrias'     },
    { label: 'Demostraciones', href: '/demostraciones'  },
  ],
  Compañía: [
    { label: 'Nosotros',       href: '/nosotros'        },
    { label: 'Cómo trabajamos',href: '/como-trabajamos' },
    { label: 'Contacto',       href: '/contacto'        },
  ],
  Legal: [
    { label: 'Privacidad',     href: '/privacidad'      },
    { label: 'Términos',       href: '/terminos'        },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-carbon text-white">
      <div className="max-w-container mx-auto px-5 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Image src="/logo.png" alt="Dataria" width={110} height={32} className="h-7 w-auto brightness-0 invert mb-4" />
            <p className="text-sm text-white/60 leading-relaxed">
              Inteligencia Artificial aplicada a negocios reales. Sobria, precisa y ágil en cada implementación.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">{section}</p>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/70 hover:text-white transition-colors duration-160">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Dataria. Todos los derechos reservados.</span>
          <span>Córdoba, Argentina</span>
        </div>
      </div>
    </footer>
  )
}
