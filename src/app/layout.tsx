import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Dataria — Menos datos sueltos. Mejores decisiones.',
  description:
    'Dataria crea herramientas de inteligencia artificial para pymes y autónomos — gastronomía, distribución, inmobiliarias y e-commerce.',
  keywords: ['inteligencia artificial', 'pymes', 'automatización', 'gastronomía', 'distribuidoras'],
  openGraph: {
    title: 'Dataria',
    description: 'Herramientas de IA para negocios reales.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <div className="pt-[72px] md:pt-[88px]">{children}</div>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
