'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  CONSENT_OPEN_EVENT,
  clearGoogleCookies,
  readConsent,
  updateGtagConsent,
  writeConsent,
  type ConsentDecision,
} from '@/lib/consent'
import { loadGoogleAnalytics } from '@/components/analytics/GoogleAnalytics'

export default function CookieConsent() {
  const [decision, setDecision] = useState<ConsentDecision | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = readConsent()
    setDecision(stored)

    if (stored === 'granted') {
      updateGtagConsent('granted')
      loadGoogleAnalytics()
    } else if (stored === null) {
      setVisible(true)
    }

    const abrir = () => setVisible(true)
    window.addEventListener(CONSENT_OPEN_EVENT, abrir)
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, abrir)
  }, [])

  const decidir = useCallback((valor: ConsentDecision) => {
    writeConsent(valor)
    setDecision(valor)
    setVisible(false)
    updateGtagConsent(valor)

    if (valor === 'granted') {
      loadGoogleAnalytics()
    } else {
      clearGoogleCookies()
    }
  }, [])

  if (!visible) return null

  return (
    <div
      id="cookie-consent"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-titulo"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up"
    >
      <div className="max-w-container mx-auto rounded-xl border border-borde bg-white shadow-soft p-6 md:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1">
            <p id="cookie-consent-titulo" className="font-display text-base font-bold text-carbon mb-2 tracking-[-0.01em]">
              Cookies de análisis y publicidad
            </p>
            <p className="text-sm text-texto-sec leading-relaxed">
              Usamos Google Analytics 4 para saber qué páginas se leen, y las etiquetas de Google Ads para medir
              nuestras campañas. <strong className="font-semibold text-carbon">No se carga ninguna hasta que aceptes</strong>, y el
              sitio funciona igual si rechazás. Podés cambiar la decisión cuando quieras desde «Cookies», en el pie de
              página.{' '}
              <Link
                href="/privacidad#cookies"
                className="text-azul-accion underline underline-offset-2 hover:no-underline"
              >
                Qué cookies usamos y cómo revocar
              </Link>
              .
            </p>
            {decision && (
              <p className="text-xs text-texto-sec mt-3">
                Tu decisión actual: {decision === 'granted' ? 'aceptadas' : 'rechazadas'}.
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 lg:shrink-0">
            <button
              type="button"
              onClick={() => decidir('denied')}
              className="h-11 px-8 sm:min-w-[150px] rounded-[10px] bg-carbon text-white font-semibold text-[15px] tracking-[0.01em] hover:opacity-90 transition-opacity duration-160"
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={() => decidir('granted')}
              className="h-11 px-8 sm:min-w-[150px] rounded-[10px] bg-azul-accion text-white font-semibold text-[15px] tracking-[0.01em] hover:opacity-90 transition-opacity duration-160"
            >
              Aceptar
            </button>
          </div>
        </div>

        {decision && (
          <div className="mt-4 text-center lg:text-right">
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="text-xs text-texto-sec underline underline-offset-2 hover:text-carbon transition-colors duration-160"
            >
              Cerrar sin cambiar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
