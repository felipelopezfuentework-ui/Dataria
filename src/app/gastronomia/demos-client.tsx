'use client'

import dynamic from 'next/dynamic'
import { IndustryDemoPanel, DemoLoading, type IndustryDemo } from '@/components/industry/IndustryDemoPanel'
import { IcoCoin, IcoPackage, IcoCalendar } from '@/components/industry/icons'

const FoodCostDemo = dynamic(() => import('@/components/demos/gastronomia/FoodCostDemo'), { ssr: false, loading: DemoLoading })
const StockDemo    = dynamic(() => import('@/components/demos/gastronomia/StockDemo'),    { ssr: false, loading: DemoLoading })
const TurnosDemo   = dynamic(() => import('@/components/demos/gastronomia/TurnosDemo'),   { ssr: false, loading: DemoLoading })

const demos: IndustryDemo[] = [
  { id: 'food-cost', label: 'Food cost',                    icon: <IcoCoin />,     Component: FoodCostDemo },
  { id: 'stock',     label: 'Control de stock',              icon: <IcoPackage />,  Component: StockDemo    },
  { id: 'turnos',    label: 'Planificador de turnos',       icon: <IcoCalendar />, Component: TurnosDemo   },
]

export function GastronomiaDemos() {
  return <IndustryDemoPanel demos={demos} industryLabel="Gastronomía" industryId="gastronomia" />
}
