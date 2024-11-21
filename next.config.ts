import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'c1.scryfall.com',
      },
    ],
  },
}

export default nextConfig
