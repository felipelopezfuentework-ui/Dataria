'use client'

import { openCookiePreferences } from '@/lib/consent'

export default function BotonPreferenciasCookies({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className="text-azul-accion underline underline-offset-2 hover:no-underline"
    >
      {children}
    </button>
  )
}
