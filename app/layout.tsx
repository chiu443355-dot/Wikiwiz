import type { Metadata, Viewport } from 'next'
import { Inter, Crimson_Pro, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const crimson = Crimson_Pro({ subsets: ["latin"], variable: '--font-serif', weight: ['400', '600', '700'] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: '--font-mono', weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: 'WikiWiz : Financial Geeta - Uncompromising Wisdom for the Modern Trader',
  description: 'Master trading through Bhagavad Gita wisdom. Learn investment philosophy, technical analysis, and risk management with professional financial education.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
