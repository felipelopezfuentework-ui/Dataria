import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    {
      url: 'https://www.dataria.work',
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.dataria.work/gastronomia',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.dataria.work/distribuidoras',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.dataria.work/inmobiliarias',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.dataria.work/ecommerce',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]
}
