import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/industry/Breadcrumb'
import { posts } from './posts-meta'

export const metadata: Metadata = {
  title: 'Blog | Dataria — IA a medida para pymes argentinas',
  description: 'Datos reales, análisis y casos sobre cómo la IA aplica a gastronomía, distribuidoras, inmobiliarias y e-commerce en Argentina.',
  alternates: { canonical: 'https://www.dataria.work/blog' },
}

export default function BlogIndexPage() {
  return (
    <main>
      <Breadcrumb current="Blog" />
      <section className="pt-10 pb-16 bg-gradient-hero">
        <div className="max-w-container mx-auto px-6 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-carbon mb-4 tracking-[-0.03em]">
            Blog de Dataria
          </h1>
          <p className="text-lg text-texto-sec max-w-xl mx-auto">
            Datos reales del mercado argentino y cómo la IA aplica de verdad a cada tipo de negocio — sin humo.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 grid gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-xl border border-borde p-6 md:p-8 bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-[transform,box-shadow] duration-200"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-azul-accion mb-2">{post.industria}</p>
              <h2 className="font-display text-xl md:text-2xl font-bold text-carbon mb-2 tracking-[-0.01em]">
                {post.title}
              </h2>
              <p className="text-texto-sec leading-relaxed">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
