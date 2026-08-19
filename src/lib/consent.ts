/**
 * Consentimiento de cookies — Ley 25.326 (Argentina), art. 5 y 6, y
 * Google Consent Mode v2.
 *
 * Regla: hasta que el visitante acepta, ninguna etiqueta de terceros se carga.
 * El default 'denied' de Consent Mode se envía en el <head> del layout.
 */

export type ConsentDecision = 'granted' | 'denied'

export const CONSENT_STORAGE_KEY = 'dataria-consent-v1'
export const CONSENT_OPEN_EVENT = 'dataria:abrir-preferencias-cookies'

type StoredConsent = {
  decision: ConsentDecision
  fecha: string
}

/** Prefijos de las cookies que dejan las etiquetas de Google. */
const GOOGLE_COOKIE_PREFIXES = ['_ga', '_gid', '_gat', '_gcl']

export function readConsent(): ConsentDecision | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredConsent
    return parsed.decision === 'granted' || parsed.decision === 'denied' ? parsed.decision : null
  } catch {
    // localStorage bloqueado (modo privado, cookies de terceros deshabilitadas):
    // sin decisión guardada, se vuelve a preguntar.
    return null
  }
}

export function writeConsent(decision: ConsentDecision) {
  if (typeof window === 'undefined') return
  try {
    const value: StoredConsent = { decision, fecha: new Date().toISOString() }
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value))
  } catch {
    // Si no se puede persistir, la decisión igual se respeta en esta sesión.
  }
}

export function clearConsent() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY)
  } catch {
    /* no-op */
  }
}

/** gtag('consent','update', ...) con los cuatro señalizadores de Consent Mode v2. */
export function updateGtagConsent(decision: ConsentDecision) {
  if (typeof window === 'undefined') return
  window.gtag?.('consent', 'update', {
    ad_storage: decision,
    ad_user_data: decision,
    ad_personalization: decision,
    analytics_storage: decision,
  })
}

/** Borra las cookies _ga*, _gid, _gat* y _gcl* que hubieran quedado. */
export function clearGoogleCookies() {
  if (typeof document === 'undefined') return

  const host = window.location.hostname
  const domains = new Set<string>(['', host, `.${host}`])
  const parts = host.split('.')
  for (let i = 1; i < parts.length - 1; i++) {
    domains.add(`.${parts.slice(i).join('.')}`)
  }

  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0]?.trim()
    if (!name) continue
    if (!GOOGLE_COOKIE_PREFIXES.some((prefix) => name.startsWith(prefix))) continue

    for (const domain of domains) {
      const domainPart = domain ? `; domain=${domain}` : ''
      document.cookie = `${name}=; path=/${domainPart}; expires=Thu, 01 Jan 1970 00:00:01 GMT`
    }
  }
}

/** Reabre el banner para cambiar la decisión (enlace «Cookies» del pie). */
export function openCookiePreferences() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))
}
