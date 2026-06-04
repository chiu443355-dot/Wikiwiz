import type { Metadata, Viewport } from 'next'
import { Inter, Crimson_Pro, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const crimson = Crimson_Pro({ subsets: ["latin"], variable: '--font-serif', weight: ['400', '600', '700'] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: '--font-mono', weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: 'WikiWiz : Financial Geeta — Uncompromising Wisdom for the Modern Trader',
  description: 'Master trading through Bhagavad Gita wisdom. Learn investment philosophy, technical analysis, and risk management with professional financial education.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: light)' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/icon-dark-32x32.png',
  },
  openGraph: {
    title: 'WikiWiz : Financial Geeta',
    description: '15 phases of financial education guided by the Bhagavad Gita.',
    url: 'https://wikiwiz.vercel.app',
    siteName: 'WikiWiz',
    locale: 'en_IN',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: 'oklch(0.08 0 0)',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${crimson.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background font-sans antialiased text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
