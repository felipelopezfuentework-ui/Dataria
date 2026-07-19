import type { MetadataRoute } from 'next'
import { posts } from './blog/posts-meta'

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
    {
      url: 'https://www.dataria.work/blog',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `https://www.dataria.work/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
