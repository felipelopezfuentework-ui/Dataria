'use client'

import { useState, type ComponentType, type ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'

export interface IndustryDemo {
  id: string
  label: string
  icon: ReactNode
  Component: ComponentType<{ onBack: () => void }>
}

function DemoLoading() {
  return (
    <div className="min-h-[560px] flex items-center justify-center" style={{ backgroundColor: '#F3F6F5' }}>
      <div className="flex items-center gap-2">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-full animate-pulse"
            style={{ backgroundColor: '#306ECF', animationDelay: `${i * 160}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

function Card({ demo, index, visible, onSelect }: { demo: IndustryDemo; index: number; visible: boolean; onSelect: () => void }) {
  return (
    <div
      className={`rounded-xl p-6 flex flex-col items-center justify-center gap-4 bg-white border border-[#DCE5E9] shadow-sm min-h-[200px] reveal hover:-translate-y-1 hover:shadow-lg transition-[opacity,transform,box-shadow] duration-200 ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-[#EAF5FD] text-[#1B5BC1] [&>svg]:w-12 [&>svg]:h-12">
        {demo.icon}
      </div>
      <p className="text-[#353C42] font-semibold text-center text-[15px] leading-tight">{demo.label}</p>
      <button onClick={onSelect}
        className="inline-flex items-center justify-center h-[46px] px-6 rounded-[10px] text-white font-semibold tracking-[0.02em] text-[15px] hover:!bg-[#1B5BC1] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(48,110,207,0.35)] active:translate-y-0 transition-all duration-150"
        style={{ backgroundColor: '#306ECF' }}>
        Ver demo
      </button>
    </div>
  )
}

function CardsView({ demos, industryLabel, onSelect }: { demos: IndustryDemo[]; industryLabel: string; onSelect: (id: string) => void }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15)
  return (
    <div ref={ref} className="min-h-[560px] flex flex-col p-10" style={{ backgroundColor: '#F3F6F5' }}>
      <p className="text-[13px] font-bold uppercase tracking-[0.1em] mb-8 text-[#306ECF]">
        {industryLabel}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {demos.map((demo, i) => (
          <Card key={demo.id} demo={demo} index={i} visible={visible} onSelect={() => onSelect(demo.id)} />
        ))}
      </div>
    </div>
  )
}

export function IndustryDemoPanel({ demos, industryLabel }: { demos: IndustryDemo[]; industryLabel: string }) {
  const [activeDemoId, setActiveDemoId] = useState<string | null>(null)
  const { ref: panelRef, visible: panelVisible } = useReveal<HTMLDivElement>(0.15)

  const goBack = () => setActiveDemoId(null)
  const active = demos.find(d => d.id === activeDemoId)

  return (
    <section id="demos" className="py-20 bg-[#F0F4F8] scroll-mt-[88px] md:scroll-mt-[104px]">
      <div className="max-w-container mx-auto px-6">
        <div
          ref={panelRef}
          className={`max-w-[1000px] min-h-[560px] mx-auto rounded-[12px] overflow-hidden border reveal-scale ${panelVisible ? 'is-visible' : ''}`}
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#DCE5E9',
            boxShadow: '0 8px 32px rgba(27, 91, 193, 0.08), 0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <div className="h-8 flex items-center gap-1.5 pl-[14px]" style={{ backgroundColor: '#E8EDF2' }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FEBC2E' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#28C840' }} />
          </div>
          <div key={activeDemoId ?? 'cards'} className="panel-content-fade">
            {active ? <active.Component onBack={goBack} /> : <CardsView demos={demos} industryLabel={industryLabel} onSelect={setActiveDemoId} />}
          </div>
        </div>
      </div>
    </section>
  )
}

export { DemoLoading }
