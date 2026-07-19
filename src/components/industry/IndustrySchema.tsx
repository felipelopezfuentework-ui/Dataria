import { breadcrumbSchema } from './Breadcrumb'
import { faqPageSchema, type FAQItemData } from './faq-schema'
import type { Testimonial } from './TestimonialQuotes'

export function IndustrySchema({
  path,
  serviceName,
  serviceDescription,
  breadcrumbCurrent,
  faqs,
  reviews,
}: {
  path: string
  serviceName: string
  serviceDescription: string
  breadcrumbCurrent: string
  faqs: FAQItemData[]
  reviews?: Testimonial[]
}) {
  const service: Record<string, unknown> = {
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    provider: { '@type': 'Organization', name: 'Dataria', url: 'https://www.dataria.work' },
    areaServed: 'AR',
    url: `https://www.dataria.work${path}`,
  }

  if (reviews?.length) {
    service.review = reviews.map((r) => ({
      '@type': 'Review',
      reviewBody: r.quote,
      author: { '@type': 'Person', name: r.name, worksFor: { '@type': 'Organization', name: r.company } },
    }))
  }

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      service,
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
