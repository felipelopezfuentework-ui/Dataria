'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'

const industries = ['Gastronomía', 'Distribuidoras de Alimentos', 'Inmobiliarias', 'E-commerce', 'Otro']
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

export default function ContactoSection() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', proyecto: '', industria: '', proceso: '' })
  const [industriaOtra, setIndustriaOtra] = useState('')
  const [sent, setSent]    = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [loading, setLoad] = useState(false)
  const [error, setError]  = useState<string | null>(null)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!ACCESS_KEY) {
      const msg = 'Falta configurar NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: no está definida en este entorno (revisá .env.local en desarrollo, o las variables de entorno del hosting en producción).'
      console.error('[ContactoSection]', msg)
      setError('El formulario no está configurado todavía. Escribinos directamente a datariaai@gmail.com mientras tanto.')
      return
    }

    setLoad(true)
    setError(null)

    const industriaFinal = form.industria === 'Otro' ? (industriaOtra.trim() || 'Otro') : form.industria

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Nueva consulta de ${form.nombre} — Dataria`,
          from_name: 'Formulario web — Dataria',
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono,
          proyecto: form.proyecto,
          industria: industriaFinal,
          proceso: form.proceso,
        }),
      })

      let data: { success?: boolean; message?: string } | null = null
      try {
        data = await res.json()
      } catch (parseErr) {
        const raw = await res.clone().text().catch(() => '<no se pudo leer el cuerpo>')
        console.error('[ContactoSection] Respuesta no-JSON de Web3Forms (status ' + res.status + '):', raw.slice(0, 500), parseErr)
        setError('El servicio de envío no respondió correctamente. Probá de nuevo en unos minutos o escribinos a datariaai@gmail.com.')
        return
      }

      if (res.ok && data?.success) {
        setLeaving(true)
        window.setTimeout(() => setSent(true), 200)
      } else {
        console.error('[ContactoSection] Web3Forms rechazó el envío (status ' + res.status + '):', data)
        setError(data?.message || 'No pudimos enviar tu consulta. Probá de nuevo o escribinos a datariaai@gmail.com.')
      }
    } catch (err) {
      console.error('[ContactoSection] Error de red al enviar el formulario:', err)
      setError('No pudimos conectar con el servicio de envío. Probá de nuevo o escribinos a datariaai@gmail.com.')
    } finally {
      setLoad(false)
    }
  }

  return (
    <section id="formulario-contacto" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-azul-nucleo mb-4">Contacto</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-carbon mb-4 tracking-[-0.03em]">
              Hablemos de tu caso
            </h2>
            <p className="font-display font-semibold text-lg text-texto-sec tracking-[-0.01em]">
              Contanos en qué industria operás y qué proceso querés automatizar. Te respondemos en menos de 24hs hábiles.
            </p>
          </div>

          {!sent ? (
            <form onSubmit={submit} className={`bg-white rounded-xl border border-borde shadow-soft p-8 space-y-5 ${leaving ? 'form-fade-out' : ''}`}>
              <div className="grid sm:grid-cols-2 gap-5">
                <Input label="Nombre" required value={form.nombre} onChange={set('nombre')} placeholder="Tu nombre" />
                <Input label="Email" type="email" required value={form.email} onChange={set('email')} placeholder="tucorreo@ejemplo.com" />
              </div>
              <Input label="Teléfono" type="tel" value={form.telefono} onChange={set('telefono')} placeholder="Tu teléfono (opcional)" />
              <Input label="Empresa / Proyecto" value={form.proyecto} onChange={set('proyecto')} placeholder="Nombre de tu proyecto o negocio (opcional)" />
              <Select label="Industria" value={form.industria} onChange={set('industria')}>
                <option value="">Seleccionar</option>
                {industries.map((i) => <option key={i} value={i}>{i}</option>)}
              </Select>
              {form.industria === 'Otro' && (
                <Input
                  label="¿Cuál es tu industria?"
                  value={industriaOtra}
                  onChange={(e) => setIndustriaOtra(e.target.value)}
                  placeholder="Tu industria"
                />
              )}
              <div>
                <label className="text-xs font-semibold text-texto-sec uppercase tracking-wide">
                  ¿Qué proceso querés automatizar?
                </label>
                <textarea
                  value={form.proceso}
                  onChange={set('proceso')}
                  rows={4}
                  className="mt-1 w-full px-3 py-2.5 rounded-sm border border-borde text-sm text-carbon bg-white focus:outline-none focus:border-azul-accion focus:ring-2 focus:ring-azul-accion/15 transition-colors duration-200 resize-none"
                  placeholder="Describí brevemente el proceso que querés resolver..."
                />
              </div>
              {error && (
                <p className="text-sm text-error text-center">{error}</p>
              )}
              <Button type="submit" size="lg" loading={loading} className="w-full !bg-[#306ECF] !bg-none !normal-case !text-[15px]">
                Enviar consulta
              </Button>
            </form>
          ) : (
            <div className="bg-white rounded-xl border border-borde shadow-soft p-10 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-extrabold text-carbon mb-3 tracking-[-0.03em]">¡Gracias! Te contactamos en menos de 24hs.</h2>
              <Button variant="secondary" className="!normal-case !text-[15px]" onClick={() => setSent(false)}>Enviar otra consulta</Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
