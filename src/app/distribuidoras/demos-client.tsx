'use client'

import dynamic from 'next/dynamic'
import { IndustryDemoPanel, DemoLoading, type IndustryDemo } from '@/components/industry/IndustryDemoPanel'
import { IcoRoute, IcoTrendingUp, IcoBrandWhatsapp } from '@/components/industry/icons'

const RutasDemo   = dynamic(() => import('@/components/demos/distribuidoras/RutasDemo'),   { ssr: false, loading: DemoLoading })
const DemandaDemo = dynamic(() => import('@/components/demos/distribuidoras/DemandaDemo'), { ssr: false, loading: DemoLoading })
const AgenteDemo  = dynamic(() => import('@/components/demos/distribuidoras/AgenteDemo'),  { ssr: false, loading: DemoLoading })

const demos: IndustryDemo[] = [
  { id: 'rutas',   label: 'Rutas',                 icon: <IcoRoute />,         Component: RutasDemo   },
  { id: 'demanda', label: 'Predictor de demanda',  icon: <IcoTrendingUp />,    Component: DemandaDemo },
  { id: 'agente',  label: 'Agente de pedidos',     icon: <IcoBrandWhatsapp />, Component: AgenteDemo  },
]

export function DistribuidorasDemos() {
  return <IndustryDemoPanel demos={demos} industryLabel="Distribuidoras" industryId="distribuidoras" />
}
