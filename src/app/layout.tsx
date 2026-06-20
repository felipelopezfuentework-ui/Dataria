import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Dataria — Menos datos sueltos. Mejores decisiones.',
  description:
    'Dataria crea herramientas de inteligencia artificial para pymes y autónomos — gastronomía, distribución, talleres, salud, inmobiliarias y e-commerce.',
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
      <body>
        <Header />
        <div className="pt-16 md:pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
