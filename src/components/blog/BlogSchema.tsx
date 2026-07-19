import { breadcrumbSchema } from '@/components/industry/Breadcrumb'

export function BlogSchema({
  slug,
  title,
  excerpt,
  date,
}: {
  slug: string
  title: string
  excerpt: string
  date: string
}) {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: title,
        description: excerpt,
        datePublished: date,
        dateModified: date,
        author: { '@type': 'Organization', name: 'Dataria', url: 'https://www.dataria.work' },
        publisher: {
          '@type': 'Organization',
          name: 'Dataria',
          url: 'https://www.dataria.work',
          logo: { '@type': 'ImageObject', url: 'https://www.dataria.work/isologo-dataria.png' },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.dataria.work/blog/${slug}` },
      },
      breadcrumbSchema(title, `/blog/${slug}`, [{ label: 'Blog', href: '/blog' }]),
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
