'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'

const industries = ['Gastronomía', 'Distribuidoras de Alimentos', 'Salud', 'Inmobiliarias', 'E-commerce', 'Otro']

export default function ContactoSection() {
  const [form, setForm]    = useState({ nombre: '', email: '', empresa: '', industria: '', mensaje: '' })
  const [sent, setSent]    = useState(false)
  const [loading, setLoad] = useState(false)
  const [error, setError]  = useState<string | null>(null)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoad(true)
    setError(null)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: `Nueva consulta de ${form.nombre} — Dataria`,
          from_name: 'Formulario web — Dataria',
          nombre: form.nombre,
          email: form.email,
          empresa: form.empresa,
          industria: form.industria,
          mensaje: form.mensaje,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
      } else {
        setError('No pudimos enviar tu consulta. Probá de nuevo o escribinos a datariaai@gmail.com.')
      }
    } catch {
      setError('No pudimos enviar tu consulta. Probá de nuevo o escribinos a datariaai@gmail.com.')
    } finally {
      setLoad(false)
    }
  }

  return (
    <section id="formulario-contacto" className="py-16 md:py-20 bg-fondo-suave">
      <div className="max-w-container mx-auto px-5 md:px-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-azul-nucleo mb-4">Contacto</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-carbon mb-4 tracking-tight">
              Hablemos de tu caso
            </h2>
            <p className="text-lg text-texto-sec">
              Contanos en qué industria operás y cuál es tu cuello de botella principal. Te respondemos en menos de 24hs hábiles.
            </p>
          </div>

          {!sent ? (
            <form onSubmit={submit} className="bg-white rounded-xl border border-borde shadow-soft p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Input label="Nombre" required value={form.nombre} onChange={set('nombre')} placeholder="Tu nombre" />
                <Input label="Email" type="email" required value={form.email} onChange={set('email')} placeholder="tucorreo@ejemplo.com" />
              </div>
              <Input label="Empresa / Negocio" value={form.empresa} onChange={set('empresa')} placeholder="Nombre del negocio (opcional)" />
              <Select label="Industria" value={form.industria} onChange={set('industria')}>
                <option value="">Seleccionar</option>
                {industries.map((i) => <option key={i} value={i}>{i}</option>)}
              </Select>
              <div>
                <label className="text-xs font-semibold text-texto-sec uppercase tracking-wide">
                  ¿Cuál es tu principal cuello de botella?
                </label>
                <textarea
                  value={form.mensaje}
                  onChange={set('mensaje')}
                  rows={4}
                  className="mt-1 w-full px-3 py-2.5 rounded-sm border border-borde text-sm text-carbon bg-white focus:outline-none focus:border-azul-accion focus:ring-2 focus:ring-azul-accion/15 resize-none"
                  placeholder="Describí brevemente el problema que querés resolver..."
                />
              </div>
              {error && (
                <p className="text-sm text-error text-center">{error}</p>
              )}
              <Button type="submit" size="lg" loading={loading} className="w-full">
                Enviar y agendar diagnóstico
              </Button>
              <p className="text-xs text-texto-sec/70 text-center">
                Sin spam. Sin venta agresiva. Sólo una conversación de 15 minutos.
              </p>
            </form>
          ) : (
            <div className="bg-white rounded-xl border border-borde shadow-soft p-10 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-carbon mb-3">¡Recibimos tu consulta!</h2>
              <p className="text-texto-sec mb-6">
                Te contactamos en menos de 24hs hábiles para coordinar el diagnóstico.
              </p>
              <Button variant="secondary" onClick={() => setSent(false)}>Enviar otra consulta</Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
