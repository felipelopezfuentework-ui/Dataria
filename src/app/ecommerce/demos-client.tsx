'use client'

import dynamic from 'next/dynamic'
import { IndustryDemoPanel, DemoLoading, type IndustryDemo } from '@/components/industry/IndustryDemoPanel'
import { IcoUsers, IcoPackage, IcoTrendingUp } from '@/components/industry/icons'

const ClientesDemo     = dynamic(() => import('@/components/demos/ecommerce/ClientesDemo'),     { ssr: false, loading: DemoLoading })
const StockDemo        = dynamic(() => import('@/components/demos/ecommerce/StockDemo'),        { ssr: false, loading: DemoLoading })
const ProyeccionesDemo = dynamic(() => import('@/components/demos/ecommerce/ProyeccionesDemo'), { ssr: false, loading: DemoLoading })

const demos: IndustryDemo[] = [
  { id: 'clientes',     label: 'Panel de clientes',      icon: <IcoUsers />,      Component: ClientesDemo     },
  { id: 'stock',        label: 'Stock e inventario',     icon: <IcoPackage />,    Component: StockDemo        },
  { id: 'proyecciones', label: 'Proyecciones de ventas', icon: <IcoTrendingUp />, Component: ProyeccionesDemo },
]

export function EcommerceDemos() {
  return <IndustryDemoPanel demos={demos} industryLabel="E-commerce" industryId="ecommerce" />
}
