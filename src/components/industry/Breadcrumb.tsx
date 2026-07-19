import Link from 'next/link'

export interface BreadcrumbParent {
  label: string
  href: string
}

export function Breadcrumb({ current, parents }: { current: string; parents?: BreadcrumbParent[] }) {
  return (
    <nav aria-label="Breadcrumb" className="max-w-container mx-auto px-6 pt-6">
      <ol className="flex items-center gap-2 text-sm text-texto-sec">
        <li>
          <Link href="/" className="hover:text-azul-nucleo transition-colors duration-160">Inicio</Link>
        </li>
        {(parents ?? []).map((p) => (
          <li key={p.href} className="flex items-center gap-2">
            <span aria-hidden className="text-borde">/</span>
            <Link href={p.href} className="hover:text-azul-nucleo transition-colors duration-160">{p.label}</Link>
          </li>
        ))}
        <li aria-hidden className="text-borde">/</li>
        <li className="text-carbon font-medium">{current}</li>
      </ol>
    </nav>
  )
}

export function breadcrumbSchema(current: string, path: string, parents?: BreadcrumbParent[]) {
  const parentItems = (parents ?? []).map((p, i) => ({
    '@type': 'ListItem',
    position: i + 2,
    name: p.label,
    item: `https://www.dataria.work${p.href}`,
  }))
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.dataria.work' },
      ...parentItems,
      { '@type': 'ListItem', position: parentItems.length + 2, name: current, item: `https://www.dataria.work${path}` },
    ],
  }
}
