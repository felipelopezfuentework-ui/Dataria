import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-carbon text-white">
      <div className="max-w-container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1 flex flex-col gap-3">
            <Image
              src="/dataria-sin-fondo.png"
              alt="Dataria"
              width={670}
              height={373}
              className="w-auto object-contain brightness-0 invert"
              style={{ height: '54px', width: 'auto' }}
            />
            <p className="leading-relaxed" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', maxWidth: '280px' }}>
              Inteligencia Artificial aplicada a negocios reales. Precisa y ágil en cada implementación.
            </p>
          </div>

          {/* Producto */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Producto</p>
            <ul className="space-y-3">
              <li>
                <Link href="/#industrias" className="text-sm text-white/70 hover:text-white transition-colors duration-160">
                  Industrias
                </Link>
              </li>
              <li>
                <Link href="/#demos" className="text-sm text-white/70 hover:text-white transition-colors duration-160">
                  Demos en vivo
                </Link>
              </li>
            </ul>
          </div>

          {/* Compañía */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Compañía</p>
            <ul className="space-y-3">
              <li>
                <Link href="/#como-trabajamos" className="text-sm text-white/70 hover:text-white transition-colors duration-160">
                  Cómo trabajamos
                </Link>
              </li>
              <li>
                <Link href="/#contacto" className="text-sm text-white/70 hover:text-white transition-colors duration-160">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Contacto</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:datariaai@gmail.com"
                  className="text-sm text-white/70 hover:text-white transition-colors duration-160"
                >
                  datariaai@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Dataria. Todos los derechos reservados.</span>
          <span>Buenos Aires, Argentina</span>
        </div>
      </div>
    </footer>
  )
}
