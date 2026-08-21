import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import CookieConsent from '@/components/consent/CookieConsent'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-jakarta',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Dataria — Menos datos sueltos. Mejores decisiones.',
  description:
    'Dataria crea herramientas con inteligencia artificial para pymes y autónomos — gastronomía, distribución, inmobiliarias y e-commerce.',
  keywords: ['inteligencia artificial', 'pymes', 'automatización', 'gastronomía', 'distribuidoras'],
  openGraph: {
    title: 'Dataria',
    description: 'Herramientas con IA para negocios reales.',
    type: 'website',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Dataria',
  url: 'https://www.dataria.work',
  description:
    'Dataria crea herramientas con inteligencia artificial a medida para pymes y autónomos en gastronomía, distribución, inmobiliarias y e-commerce.',
  email: 'datariaai@gmail.com',
  areaServed: 'AR',
}

/**
 * Google Consent Mode v2 — default denegado.
 *
 * Se inyecta como primer elemento del <head>, antes de cualquier otra etiqueta,
 * para que el estado 'denied' quede registrado antes de que exista la
 * posibilidad de cargar gtag.js. gtag.js solo se carga si el visitante acepta
 * en el banner (`CookieConsent` → `loadGoogleAnalytics`).
 */
const consentModeDefault = `
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted'
});
`.trim()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${jakarta.variable} ${inter.variable}`}>
      <head>
        <script id="consent-mode-default" dangerouslySetInnerHTML={{ __html: consentModeDefault }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <Header />
        <div className="pt-[72px] md:pt-[88px]">{children}</div>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
      </body>
    </html>
  )
}
