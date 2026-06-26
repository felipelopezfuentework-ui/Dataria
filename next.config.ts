import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
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
