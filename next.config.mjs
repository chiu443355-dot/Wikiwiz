/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.tradingview.com s3.tradingview.com tradingview-widget.com; frame-src 'self' *.tradingview.com tradingview-widget.com *.investing.com sslecal2.investing.com; img-src 'self' data: https: *.tradingview.com; connect-src 'self' *.tradingview.com tradingview-widget.com wss:; style-src 'self' 'unsafe-inline' fonts.googleapis.com tradingview-widget.com; font-src 'self' fonts.gstatic.com data:;"
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'ALLOWALL' }
        ]
      }
    ]
  }
}

export default nextConfig
