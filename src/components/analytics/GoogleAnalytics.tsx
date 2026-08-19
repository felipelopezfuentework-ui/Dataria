'use client'

/**
 * Cargador de Google Analytics 4.
 *
 * Este módulo NO se auto-ejecuta: exporta `loadGoogleAnalytics()`, que solo
 * debe llamarse cuando el visitante aceptó las cookies analíticas y
 * publicitarias en el banner de consentimiento (`CookieConsent`).
 *
 * El default de Consent Mode v2 ('denied') se envía en el <head> del layout,
 * antes de que este script pueda cargarse.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

const SCRIPT_ID = 'gtag-js'

export function isGoogleAnalyticsLoaded() {
  return typeof document !== 'undefined' && document.getElementById(SCRIPT_ID) !== null
}

export function loadGoogleAnalytics() {
  if (typeof window === 'undefined') return
  if (!GA_MEASUREMENT_ID) return
  if (isGoogleAnalyticsLoaded()) return

  const script = document.createElement('script')
  script.id = SCRIPT_ID
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.gtag?.('js', new Date())
  window.gtag?.('config', GA_MEASUREMENT_ID, { anonymize_ip: true })
}
