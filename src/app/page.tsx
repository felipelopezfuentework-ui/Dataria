import Hero from '@/components/home/Hero'
import ClientLogos from '@/components/home/ClientLogos'
import IndustriesPreview from '@/components/home/IndustriesPreview'
import HowItWorks from '@/components/home/HowItWorks'
import CTAReunion from '@/components/home/CTAReunion'
import FAQSection from '@/components/home/FAQSection'
import ContactoSection from '@/components/home/ContactoSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <IndustriesPreview />

      {/* Cómo trabajamos */}
      <section id="como-trabajamos">
        <HowItWorks />
      </section>

      <ClientLogos />

      <CTAReunion />

      <FAQSection />

      <ContactoSection />

    </main>
  )
}
