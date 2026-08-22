import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Las propuestas comerciales son .html estaticos en public/presupuestos/.
  // Este rewrite permite linkearlas sin la extension:
  //   /presupuestos/<cliente>  ->  /presupuestos/<cliente>.html
  async rewrites() {
    return [
      { source: '/presupuestos/:slug', destination: '/presupuestos/:slug.html' },
    ]
  },
  async redirects() {
    return [
      { source: '/demostraciones',  destination: '/#demos',           permanent: true },
      { source: '/como-trabajamos', destination: '/#como-trabajamos', permanent: true },
      { source: '/nosotros',        destination: '/',                  permanent: true },
      { source: '/contacto',        destination: '/#contacto',        permanent: true },
    ]
  },
}

export default nextConfig
