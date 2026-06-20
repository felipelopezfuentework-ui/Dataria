'use client'

import { useState } from 'react'
import Link from 'next/link'

const industries = [
  {
    id: 'gastronomia',
    label: 'Gastronomía',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    problema: 'No sabés exactamente cuánto te cuesta cada plato.',
    solucion: 'Calculadora de food cost en tiempo real: cargás tus insumos y el sistema te dice el costo exacto de cada receta.',
    demo: 'Calculadora de food cost',
  },
  {
    id: 'distribuidoras',
    label: 'Distribuidoras',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 17l-1.5-1.5M8 17l1.5-1.5M8 17V7m8 10l-1.5-1.5M16 17l1.5-1.5M16 17V7M3 12h18" />
      </svg>
    ),
    problema: 'Las rutas de reparto se definen de cabeza, sin saber el costo real de cada viaje.',
    solucion: 'Panel de planificación de rutas con mapa en vivo y cálculo automático de costo por recorrido.',
    demo: 'Planificador de rutas',
  },
  {
    id: 'talleres',
    label: 'Talleres',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63" />
      </svg>
    ),
    problema: 'El estado de los vehículos en reparación vive en papeles o en la cabeza del encargado.',
    solucion: 'Seguimiento en tiempo real de cada orden: desde el ingreso hasta la entrega, con vista kanban.',
    demo: 'Panel de órdenes',
  },
  {
    id: 'salud',
    label: 'Salud',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    problema: '[contenido pendiente de definir]',
    solucion: '[contenido pendiente de definir]',
    demo: 'Demo pendiente',
  },
  {
    id: 'inmobiliarias',
    label: 'Inmobiliarias',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V20.25a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V9.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20.25V12h6v8.25" />
      </svg>
    ),
    problema: 'Los leads se pierden entre WhatsApp, mails y anotaciones.',
    solucion: 'CRM visual con pipeline de etapas: de "interesado" a "cierre" en un solo panel.',
    demo: 'CRM de leads',
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
    problema: 'Carritos abandonados, clientes sin segmentar y respuestas lentas a consultas.',
    solucion: 'CRM + recuperación de carritos + agente de respuestas + cotizador integrado.',
    demo: 'Suite e-commerce',
  },
]

export default function IndustriesPreview() {
  const [active, setActive] = useState('gastronomia')
  const current = industries.find((i) => i.id === active)!

  return (
    <section id="industrias" className="py-20 md:py-28 bg-white">
      <div className="max-w-container mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-carbon mb-4 tracking-tight">Verticales de impacto</h2>
          <p className="text-lg text-texto-sec max-w-xl mx-auto">
            Seleccioná tu industria para ver cómo resolvemos tus cuellos de botella.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {industries.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActive(ind.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-semibold transition-all duration-160 ${
                active === ind.id
                  ? 'bg-azul-nucleo text-white shadow-primary'
                  : 'bg-fondo-suave text-texto-sec hover:bg-borde/60'
              }`}
            >
              {ind.icon}
              {ind.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div
          key={active}
          className="grid md:grid-cols-2 gap-8 items-center bg-fondo-suave rounded-xl p-8 md:p-12 animate-fade-in"
        >
          {/* Left: copy */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-carbon mb-5 tracking-tight">
              {current.label}
            </h3>
            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-error/10 flex items-center justify-center">
                  <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24" className="text-error">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                </span>
                <p className="text-sm text-texto-sec leading-relaxed">{current.problema}</p>
              </div>
              <div className="flex gap-3">
                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                  <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} className="text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <p className="text-sm text-carbon leading-relaxed font-medium">{current.solucion}</p>
              </div>
            </div>
            <Link
              href="/demostraciones"
              className="inline-flex items-center gap-2 text-sm font-semibold text-azul-nucleo hover:text-azul-accion transition-colors duration-160"
            >
              Probar {current.demo} en vivo
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* Right: mini-mockup placeholder */}
          <div className="rounded-lg bg-white border border-borde shadow-soft overflow-hidden min-h-[220px] flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-12 h-12 rounded-xl bg-tinte-interfaz flex items-center justify-center mx-auto mb-3 text-azul-nucleo">
                {current.icon}
              </div>
              <p className="text-sm font-semibold text-carbon mb-1">{current.demo}</p>
              <p className="text-xs text-texto-sec">Demo interactiva disponible en la página de demostraciones</p>
              <Link
                href="/demostraciones"
                className="mt-4 inline-flex items-center justify-center h-8 px-4 rounded-xs bg-tinte-interfaz text-azul-nucleo text-xs font-semibold hover:bg-azul-nucleo/15 transition-colors duration-160"
              >
                Ir a demostraciones →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
