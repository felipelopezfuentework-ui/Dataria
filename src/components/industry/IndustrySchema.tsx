import { breadcrumbSchema } from './Breadcrumb'
import { faqPageSchema, type FAQItemData } from './faq-schema'

export function IndustrySchema({
  path,
  serviceName,
  serviceDescription,
  breadcrumbCurrent,
  faqs,
}: {
  path: string
  serviceName: string
  serviceDescription: string
  breadcrumbCurrent: string
  faqs: FAQItemData[]
}) {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: serviceName,
        description: serviceDescription,
        provider: { '@type': 'Organization', name: 'Dataria', url: 'https://www.dataria.work' },
        areaServed: 'AR',
        url: `https://www.dataria.work${path}`,
      },
      faqPageSchema(faqs),
      breadcrumbSchema(breadcrumbCurrent, path),
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
