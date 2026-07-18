'use client'

import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import type { FAQItemData } from './faq-schema'

export type { FAQItemData }

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-lg border border-borde">
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full px-5 py-4 font-medium text-carbon cursor-pointer select-none flex items-center justify-between text-base"
      >
        {q}
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          className={`text-texto-sec shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div className={`accordion-content ${open ? 'is-open' : ''}`}>
        <div>
          <p className="px-5 pb-4 text-sm text-texto-sec leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  )
}

export function IndustryFAQ({ faqs, title = 'Preguntas frecuentes' }: { faqs: FAQItemData[]; title?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-container mx-auto px-6">
        <div ref={ref} className={`max-w-3xl mx-auto reveal ${visible ? 'is-visible' : ''}`}>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-carbon mb-8 text-center tracking-[-0.03em]">{title}</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
