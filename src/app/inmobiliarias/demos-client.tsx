'use client'

import dynamic from 'next/dynamic'
import { IndustryDemoPanel, DemoLoading, type IndustryDemo } from '@/components/industry/IndustryDemoPanel'
import { IcoUsers, IcoMessageCircle, IcoCalendar } from '@/components/industry/icons'

const CRMDemo         = dynamic(() => import('@/components/demos/inmobiliarias/CRMDemo'),         { ssr: false, loading: DemoLoading })
const RespondedorDemo = dynamic(() => import('@/components/demos/inmobiliarias/RespondedorDemo'), { ssr: false, loading: DemoLoading })
const VisitasDemo     = dynamic(() => import('@/components/demos/inmobiliarias/VisitasDemo'),     { ssr: false, loading: DemoLoading })

const demos: IndustryDemo[] = [
  { id: 'crm',         label: 'CRM',                    icon: <IcoUsers />,         Component: CRMDemo         },
  { id: 'respondedor', label: 'Agente de consultas',    icon: <IcoMessageCircle />, Component: RespondedorDemo },
  { id: 'agenda',      label: 'Agenda de visitas',      icon: <IcoCalendar />,      Component: VisitasDemo     },
]

export function InmobiliariasDemos() {
  return <IndustryDemoPanel demos={demos} industryLabel="Inmobiliarias" industryId="inmobiliarias" />
}
