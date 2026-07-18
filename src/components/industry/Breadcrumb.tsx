import Link from 'next/link'

export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="max-w-container mx-auto px-6 pt-6">
      <ol className="flex items-center gap-2 text-sm text-texto-sec">
        <li>
          <Link href="/" className="hover:text-azul-nucleo transition-colors duration-160">Inicio</Link>
        </li>
        <li aria-hidden className="text-borde">/</li>
        <li className="text-carbon font-medium">{current}</li>
      </ol>
    </nav>
  )
}

export function breadcrumbSchema(current: string, path: string) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.dataria.work' },
      { '@type': 'ListItem', position: 2, name: current, item: `https://www.dataria.work${path}` },
    ],
  }
}
