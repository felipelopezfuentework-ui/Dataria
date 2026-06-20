import Hero from '@/components/home/Hero'
import ClientLogos from '@/components/home/ClientLogos'
import IndustriesPreview from '@/components/home/IndustriesPreview'
import HowItWorks from '@/components/home/HowItWorks'
import CTASection from '@/components/home/CTASection'

export default function Home() {
  return (
    <main>
      <Hero />
      <ClientLogos />
      <IndustriesPreview />
      <HowItWorks />
      <CTASection />
    </main>
  )
}
