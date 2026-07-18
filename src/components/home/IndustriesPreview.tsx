'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'

// Cada industria vive ahora en su propia página (SEO/GEO: ver .agents/gemini-consultas/001-*).
// Las demos interactivas se mudaron ahí — acá solo queda la vidriera que linkea a cada una.
const industryRoutes: Record<string, string> = {
  gastronomia: '/gastronomia',
  distribuidoras: '/distribuidoras',
  inmobiliarias: '/inmobiliarias',
  ecommerce: '/ecommerce',
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface DemoCard { id: string; label: string; icon: React.ReactNode; enabled: boolean }
interface Industry { id: string; label: string; icon: React.ReactNode; demos: DemoCard[] }

// ─── Icons ────────────────────────────────────────────────────────────────────

const IcoGastro = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 11.5c-1.5-.5-2.5-2-2.5-3.75A3.75 3.75 0 019.75 4c.5 0 1 .1 1.4.3A3.5 3.5 0 0115 3c1.7 0 3.1 1.2 3.4 2.85.15-.02.3-.03.45-.03a3.25 3.25 0 013.25 3.25c0 1.65-.9 3.1-2.35 3.65M8.5 11.5h9M8.5 11.5v6.75c0 .69.56 1.25 1.25 1.25h4.5c.69 0 1.25-.56 1.25-1.25V11.5" />
  </svg>
)
const IcoDist = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V6.75A.75.75 0 013.75 6h9a.75.75 0 01.75.75v9.75M3 16.5h10.5M3 16.5H2.25m11.25 0h4.19a.75.75 0 00.61-.315l1.83-2.562a.75.75 0 00.12-.408V10.5a.75.75 0 00-.75-.75h-3.5m-2.5 0h2.5m0 0V7.5" />
    <circle cx="6.75" cy="16.5" r="1.75" />
    <circle cx="16.5" cy="16.5" r="1.75" />
  </svg>
)
const IcoInmo = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V20.25a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V9.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20.25V12h6v8.25" />
  </svg>
)
const IcoEcom = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
)
const IcoOtros = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m-7.5-7.5h15" />
  </svg>
)

// Card icons
const IcoCoin = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)
const IcoRoute = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
  </svg>
)
const IcoKanban = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
)
const IcoHeart = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
)
const IcoCRM = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
)
const IcoLock = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
)
const IcoStar = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
)
const IcoTrendingUp = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <polyline strokeLinecap="round" strokeLinejoin="round" points="3 17 9 11 13 15 21 7" />
    <polyline strokeLinecap="round" strokeLinejoin="round" points="14 7 21 7 21 14" />
  </svg>
)
const IcoUsers = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
)
const IcoPackage = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
)
const IcoBrandWhatsapp = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
)
const IcoCalendar = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
)
const IcoMessageCircle = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 20l1.3-3.9C2 12.76 2.9 8.32 6.4 5.8c3.5-2.5 8.6-2.3 11.8.5s3.7 7.3 1 10.5c-2.6 3.2-7.6 4.2-11.6 2.3L3 20" />
  </svg>
)
// ─── Data ─────────────────────────────────────────────────────────────────────

const disabledCards = (labels: string[]): DemoCard[] =>
  labels.map((label, i) => ({ id: `d${i}`, label, icon: <IcoLock />, enabled: false }))

const industries: Industry[] = [
  {
    id: 'gastronomia', label: 'Gastronomía', icon: <IcoGastro />,
    demos: [
      { id: 'food-cost', label: 'Food cost',               icon: <IcoCoin />,     enabled: true  },
      { id: 'resenas',   label: 'Gestión de reseñas',    icon: <IcoStar />,     enabled: true  },
      { id: 'turnos',    label: 'Planificador de turnos', icon: <IcoCalendar />, enabled: true  },
    ],
  },
  {
    id: 'distribuidoras', label: 'Distribuidoras', icon: <IcoDist />,
    demos: [
      { id: 'rutas',    label: 'Rutas',                  icon: <IcoRoute />,          enabled: true  },
      { id: 'demanda',  label: 'Predictor de demanda',   icon: <IcoTrendingUp />,     enabled: true  },
      { id: 'agente',   label: 'Agente de pedidos',      icon: <IcoBrandWhatsapp />,  enabled: true  },
    ],
  },
  {
    id: 'inmobiliarias', label: 'Inmobiliarias', icon: <IcoInmo />,
    demos: [
      { id: 'crm',          label: 'CRM',                      icon: <IcoUsers />,          enabled: true },
      { id: 'respondedor',  label: 'Agente de consultas',      icon: <IcoMessageCircle />,  enabled: true },
      { id: 'agenda',       label: 'Agenda de visitas',        icon: <IcoCalendar />,       enabled: true },
    ],
  },
  {
    id: 'ecommerce', label: 'E-commerce', icon: <IcoEcom />,
    demos: [
      { id: 'clientes', label: 'Panel de clientes', icon: <IcoUsers />, enabled: true },
      { id: 'stock', label: 'Stock e inventario', icon: <IcoPackage />, enabled: true },
      { id: 'proyecciones', label: 'Proyecciones de ventas', icon: <IcoTrendingUp />, enabled: true },
    ],
  },
  { id: 'otros', label: 'Otros', icon: <IcoOtros />, demos: [] },
]

// ─── Card component ───────────────────────────────────────────────────────────

function Card({ demo, index, visible, href }: { demo: DemoCard; index: number; visible: boolean; href: string }) {
  return (
    <div
      className={`rounded-xl p-6 flex flex-col items-center justify-center gap-4 bg-white border border-[#DCE5E9] shadow-sm min-h-[200px] reveal hover:-translate-y-1 hover:shadow-lg transition-[opacity,transform,box-shadow] duration-200 ${visible ? 'is-visible' : ''}`}
      style={{ opacity: demo.enabled ? undefined : 0.5, transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-[#EAF5FD] text-[#1B5BC1] [&>svg]:w-12 [&>svg]:h-12">
        {demo.icon}
      </div>
      <p className="text-[#353C42] font-semibold text-center text-[15px] leading-tight">{demo.label}</p>
      {demo.enabled ? (
        <Link href={href}
          className="inline-flex items-center justify-center h-[46px] px-6 rounded-[10px] text-white font-semibold tracking-[0.02em] text-[15px] hover:!bg-[#1B5BC1] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(48,110,207,0.35)] active:translate-y-0 transition-all duration-150"
          style={{ backgroundColor: '#306ECF' }}>
          Ver demo
        </Link>
      ) : (
        <span className="text-xs font-medium text-[#5A6871]">Próximamente</span>
      )}
    </div>
  )
}

// ─── Level 2: cards grid ──────────────────────────────────────────────────────

function CardsView({ industry }: { industry: Industry }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15)
  const industryHref = industryRoutes[industry.id] ?? '/'
  return (
    <div ref={ref} className="min-h-[560px] flex flex-col p-10" style={{ backgroundColor: '#F3F6F5' }}>
      <p className="text-[13px] font-bold uppercase tracking-[0.1em] mb-8 text-[#306ECF]">
        {industry.label}
      </p>
      <div className="grid grid-cols-3 gap-4">
        {industry.demos.map((demo, i) => (
          <Card key={demo.id} demo={demo} index={i} visible={visible} href={`${industryHref}#demos`} />
        ))}
      </div>
    </div>
  )
}

// ─── "Otros" industry: inline contact form ─────────────────────────────────────

const OTROS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

function OtrosForm() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', proyecto: '', industria: '', descripcion: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!OTROS_ACCESS_KEY) {
      console.error('[OtrosForm] Falta NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY')
      setError('El formulario no está configurado todavía. Escribinos a datariaai@gmail.com mientras tanto.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: OTROS_ACCESS_KEY,
          subject: `Nueva consulta (Otros) de ${form.nombre} — Dataria`,
          from_name: 'Formulario web — Dataria (Otros)',
          ...form,
        }),
      })
      const data = await res.json().catch(() => null)
      if (res.ok && data?.success) {
        setSent(true)
      } else {
        console.error('[OtrosForm] Web3Forms rechazó el envío:', res.status, data)
        setError(data?.message || 'No pudimos enviar tu consulta. Probá de nuevo o escribinos a datariaai@gmail.com.')
      }
    } catch (err) {
      console.error('[OtrosForm] Error de red:', err)
      setError('No pudimos conectar con el servicio de envío. Probá de nuevo o escribinos a datariaai@gmail.com.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[560px] flex flex-col p-10" style={{ backgroundColor: '#F3F6F5' }}>
      <div className="max-w-lg mx-auto w-full">
        <div className="text-center mb-6">
          <h3 className="font-display text-2xl font-extrabold text-[#353C42] mb-2 tracking-[-0.03em]">¿Tenés un proceso que querés automatizar?</h3>
          <p className="font-display font-semibold text-base text-[#5A6871] tracking-[-0.01em]">Contanos de qué se trata y te mostramos cómo Dataria puede ayudarte.</p>
        </div>

        {!sent ? (
          <form onSubmit={submit} className="bg-white rounded-xl border border-[#DCE5E9] shadow-sm p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#5A6871] uppercase tracking-wide">Nombre</label>
                <input required value={form.nombre} onChange={set('nombre')} placeholder="Tu nombre"
                  className="mt-1 w-full h-10 px-3 rounded-sm border border-[#DCE5E9] text-sm text-[#353C42] bg-white focus:outline-none focus:border-[#306ECF] transition-colors duration-200" />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#5A6871] uppercase tracking-wide">Email</label>
                <input required type="email" value={form.email} onChange={set('email')} placeholder="tucorreo@ejemplo.com"
                  className="mt-1 w-full h-10 px-3 rounded-sm border border-[#DCE5E9] text-sm text-[#353C42] bg-white focus:outline-none focus:border-[#306ECF] transition-colors duration-200" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#5A6871] uppercase tracking-wide">Teléfono</label>
              <input type="tel" value={form.telefono} onChange={set('telefono')} placeholder="Tu teléfono (opcional)"
                className="mt-1 w-full h-10 px-3 rounded-sm border border-[#DCE5E9] text-sm text-[#353C42] bg-white focus:outline-none focus:border-[#306ECF] transition-colors duration-200" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#5A6871] uppercase tracking-wide">Empresa / Proyecto</label>
              <input value={form.proyecto} onChange={set('proyecto')} placeholder="Nombre de tu empresa o proyecto"
                className="mt-1 w-full h-10 px-3 rounded-sm border border-[#DCE5E9] text-sm text-[#353C42] bg-white focus:outline-none focus:border-[#306ECF] transition-colors duration-200" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#5A6871] uppercase tracking-wide">Industria</label>
              <input value={form.industria} onChange={set('industria')} placeholder="¿A qué industria pertenece tu negocio?"
                className="mt-1 w-full h-10 px-3 rounded-sm border border-[#DCE5E9] text-sm text-[#353C42] bg-white focus:outline-none focus:border-[#306ECF] transition-colors duration-200" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#5A6871] uppercase tracking-wide">Descripción del proceso</label>
              <textarea rows={4} value={form.descripcion} onChange={set('descripcion')} placeholder="Contanos qué proceso te gustaría automatizar..."
                className="mt-1 w-full px-3 py-2.5 rounded-sm border border-[#DCE5E9] text-sm text-[#353C42] bg-white focus:outline-none focus:border-[#306ECF] transition-colors duration-200 resize-none" />
            </div>
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full h-[46px] rounded-[10px] text-white font-semibold text-[15px] tracking-[0.02em] hover:!bg-[#1B5BC1] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(48,110,207,0.35)] active:translate-y-0 transition-all duration-150 disabled:opacity-50"
              style={{ backgroundColor: '#306ECF' }}>
              {loading ? 'Enviando…' : 'Enviar consulta'}
            </button>
          </form>
        ) : (
          <div className="bg-white rounded-xl border border-[#DCE5E9] shadow-sm p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-extrabold text-[#353C42] tracking-[-0.03em]">¡Gracias! Te contactamos en menos de 24hs.</h3>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function IndustriesPreview() {
  const [activeId, setActiveId] = useState('gastronomia')

  const selectIndustry = (id: string) => { setActiveId(id) }

  const activeIndustry = industries.find(i => i.id === activeId)!
  const { ref: panelRef, visible: panelVisible } = useReveal<HTMLDivElement>(0.15)
  const { ref: barRef, visible: barVisible } = useReveal<HTMLDivElement>(0.15)

  return (
    <>
      <section id="industrias" className="py-20 bg-[#F0F4F8] scroll-mt-[88px] md:scroll-mt-[104px]">
        <div className="max-w-container mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-carbon mb-4 tracking-[-0.03em]">
              Tu negocio optimizado
            </h2>
            <p className="font-display font-semibold text-xl text-texto-sec max-w-xl mx-auto tracking-[-0.01em]">
              Elegí tu industria y probá cómo Dataria transforma tu negocio.
            </p>
          </div>

          {/* Anchor for "ver demo" CTAs: jumps straight to panel + industry tabs, skipping the title */}
          <div id="demos" className="scroll-mt-[88px] md:scroll-mt-[104px]">

            {/* Panel — styled like a browser/desktop window floating over the section */}
            <div ref={panelRef} className={`max-w-[1000px] min-h-[560px] mx-auto rounded-[12px] overflow-hidden border reveal-scale ${panelVisible ? 'is-visible' : ''}`}
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#DCE5E9',
                boxShadow: '0 8px 32px rgba(27, 91, 193, 0.08), 0 2px 8px rgba(0,0,0,0.06)',
              }}>
              {/* Window chrome bar */}
              <div className="h-8 flex items-center gap-1.5 pl-[14px]" style={{ backgroundColor: '#E8EDF2' }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FEBC2E' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#28C840' }} />
              </div>
              {/* key forces a remount on every industry switch, replaying the crossfade */}
              <div key={activeId} className="panel-content-fade">
                {activeId === 'otros'
                  ? <OtrosForm />
                  : <CardsView industry={activeIndustry} />
                }
              </div>
            </div>

            {/* Industry bar — below the panel */}
            <div ref={barRef} className={`max-w-[1000px] mx-auto mt-0 flex flex-wrap justify-center reveal ${barVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
            {industries.map(ind => {
              const isActive = ind.id === activeId
              return (
                <button
                  key={ind.id}
                  onClick={() => selectIndustry(ind.id)}
                  className="flex flex-col items-center gap-1.5 px-4 py-3 text-base font-medium transition-all border-t-2"
                  style={{
                    borderTopColor: isActive ? '#306ECF' : 'transparent',
                    color: isActive ? '#306ECF' : '#5A6871',
                    backgroundColor: isActive ? '#EAF5FD' : 'transparent',
                  }}
                >
                  <span style={{ color: isActive ? '#306ECF' : '#5A6871' }}>{ind.icon}</span>
                  {ind.label}
                </button>
              )
            })}
            </div>

          </div>

        </div>
      </section>
    </>
  )
}
